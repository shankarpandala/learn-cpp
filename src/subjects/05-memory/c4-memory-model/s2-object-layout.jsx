import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import CompilerNoteBlock from '../../../components/content/CompilerNoteBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S2ObjectLayout() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Understanding how the compiler lays out objects in memory is essential for writing
        cache-friendly, interoperable, and memory-efficient code. The size of a struct is often
        larger than the sum of its members due to <strong>padding</strong> inserted for alignment.
      </p>

      <DefinitionBlock title="Object Layout">
        <p>
          <strong>Object layout</strong> refers to how a compiler arranges a struct or class's data
          members in memory. Members are placed at offsets that satisfy their alignment requirements,
          and the compiler inserts <strong>padding bytes</strong> between members as needed.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">sizeof and Padding</h2>

      <CppCode title="Surprising sizeof results">{`#include <iostream>

struct Padded {
    char a;    // 1 byte
    int  b;    // 4 bytes
    char c;    // 1 byte
};

struct Packed {
    int  b;    // 4 bytes
    char a;    // 1 byte
    char c;    // 1 byte
};

int main() {
    std::cout << "sizeof(Padded): " << sizeof(Padded) << std::endl;
    std::cout << "sizeof(Packed): " << sizeof(Packed) << std::endl;
    std::cout << "sizeof(char):   " << sizeof(char) << std::endl;
    std::cout << "sizeof(int):    " << sizeof(int) << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`sizeof(Padded): 12
sizeof(Packed): 8
sizeof(char):   1
sizeof(int):    4`}</OutputBlock>

      <NoteBlock type="info" title="Why Padding Exists">
        <p>
          CPUs access memory most efficiently when data is <strong>naturally aligned</strong> — that
          is, an N-byte type sits at an address divisible by N. Misaligned access can be slower (or
          even illegal on some architectures). The compiler adds padding to ensure each member meets
          its alignment requirement.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">offsetof</h2>

      <SyntaxBlock title="Using offsetof">
        <p>
          The <code>offsetof</code> macro (from <code>&lt;cstddef&gt;</code>) returns the byte offset
          of a member within a standard-layout struct. It reveals exactly where padding is inserted.
        </p>
        <CppCode>{`#include <cstddef>
offsetof(StructType, memberName)  // returns size_t`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Inspecting member offsets">{`#include <iostream>
#include <cstddef>

struct Example {
    char   a;   // offset 0
    double b;   // offset 8 (7 bytes padding after a)
    char   c;   // offset 16
    int    d;   // offset 20
};

int main() {
    std::cout << "sizeof(Example): " << sizeof(Example) << std::endl;
    std::cout << "offset a: " << offsetof(Example, a) << std::endl;
    std::cout << "offset b: " << offsetof(Example, b) << std::endl;
    std::cout << "offset c: " << offsetof(Example, c) << std::endl;
    std::cout << "offset d: " << offsetof(Example, d) << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`sizeof(Example): 24
offset a: 0
offset b: 8
offset c: 16
offset d: 20`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Optimizing Layout</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Reordering members from largest alignment to smallest minimizes padding. This can
        significantly reduce memory usage in arrays of thousands of objects.
      </p>

      <CppCode title="Optimized member ordering">{`#include <iostream>

struct Bad {
    char   a;   // 1 + 7 padding
    double b;   // 8
    char   c;   // 1 + 3 padding
    int    d;   // 4
};  // total: 24 bytes

struct Good {
    double b;   // 8
    int    d;   // 4
    char   a;   // 1
    char   c;   // 1 + 2 padding
};  // total: 16 bytes

int main() {
    std::cout << "sizeof(Bad):  " << sizeof(Bad) << std::endl;
    std::cout << "sizeof(Good): " << sizeof(Good) << std::endl;
    std::cout << "Saved: " << sizeof(Bad) - sizeof(Good) << " bytes per object" << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`sizeof(Bad):  24
sizeof(Good): 16
Saved: 8 bytes per object`}</OutputBlock>

      <CompilerNoteBlock compiler="gcc" title="Viewing Layout">
        <p>
          Use <code>-Wpadded</code> with GCC to get warnings about padding inserted in your structs.
          The <code>pahole</code> tool can also visualize struct layout and suggest reorderings.
        </p>
      </CompilerNoteBlock>

      <BestPracticeBlock title="Order Members by Decreasing Alignment">
        <p>
          Place larger-aligned members first (e.g., <code>double</code>, pointers) followed by
          smaller ones (<code>int</code>, <code>short</code>, <code>char</code>). This minimizes
          internal padding and can improve cache utilization for arrays of structs.
        </p>
      </BestPracticeBlock>

      <NoteBlock type="tip" title="Impact on Performance">
        <p>
          For an array of 1 million objects, saving 8 bytes each saves ~7.6 MB. Smaller objects mean
          more fit in a cache line, leading to fewer cache misses and faster iteration. This is a
          common optimization in game engines and scientific computing.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Minimize Struct Size"
        difficulty="intermediate"
        prompt="Given a struct with members bool, double, int, char, short, reorder them to minimize sizeof. Verify with sizeof and offsetof."
        hints={[
          "Start with the largest alignment type (double)",
          "Group smaller types together at the end",
          "The struct's total size is rounded up to its largest alignment",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <cstddef>

struct Optimized {
    double d;   // 8 bytes, offset 0
    int    i;   // 4 bytes, offset 8
    short  s;   // 2 bytes, offset 12
    char   c;   // 1 byte,  offset 14
    bool   b;   // 1 byte,  offset 15
};  // total: 16 bytes (no trailing padding needed)

int main() {
    std::cout << "sizeof: " << sizeof(Optimized) << std::endl;
    std::cout << "d: " << offsetof(Optimized, d) << std::endl;
    std::cout << "i: " << offsetof(Optimized, i) << std::endl;
    std::cout << "s: " << offsetof(Optimized, s) << std::endl;
    std::cout << "c: " << offsetof(Optimized, c) << std::endl;
    std::cout << "b: " << offsetof(Optimized, b) << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'sizeof operator', url: 'https://en.cppreference.com/w/cpp/language/sizeof', description: 'Query the size of a type or object' },
        { type: 'cppreference', title: 'offsetof', url: 'https://en.cppreference.com/w/cpp/types/offsetof', description: 'Byte offset of a member in a standard-layout type' },
        { type: 'textbook', title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', description: 'Section 8.2.6: Object Layout' },
      ]} />
    </div>
  )
}
