import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import WarningBlock from '../../../components/content/WarningBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import CompilerNoteBlock from '../../../components/content/CompilerNoteBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S3Alignment() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Every type in C++ has an <strong>alignment requirement</strong> — a restriction on the memory
        addresses where objects of that type can be placed. Understanding alignment is crucial for
        performance optimization, SIMD programming, and interfacing with hardware.
      </p>

      <DefinitionBlock title="Alignment">
        <p>
          Alignment is the number of bytes between successive addresses at which an object can be
          allocated. A type with alignment <em>N</em> must be placed at an address that is a
          multiple of <em>N</em>.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">alignof Operator</h2>

      <CppCode title="Querying alignment requirements">{`#include <iostream>

struct Simple {
    char a;
    int b;
    double c;
};

int main() {
    std::cout << "char:   alignof = " << alignof(char) << std::endl;
    std::cout << "int:    alignof = " << alignof(int) << std::endl;
    std::cout << "double: alignof = " << alignof(double) << std::endl;
    std::cout << "Simple: alignof = " << alignof(Simple) << std::endl;
    std::cout << "Simple: sizeof  = " << sizeof(Simple) << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`char:   alignof = 1
int:    alignof = 4
double: alignof = 8
Simple: alignof = 8
Simple: sizeof  = 16`}</OutputBlock>

      <NoteBlock type="info" title="Why sizeof(Simple) is 16, not 13">
        <p>
          The struct has: <code>char</code> (1) + 3 bytes padding + <code>int</code> (4) +
          <code>double</code> (8) = 16 bytes. The compiler inserts padding to ensure each
          member meets its alignment requirement.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">alignas Specifier</h2>

      <SyntaxBlock title="Specifying Custom Alignment">
        <p>
          <code>alignas(N)</code> requests alignment to at least <em>N</em> bytes. The value
          must be a power of 2.
        </p>
        <CppCode>{`alignas(16) int x;              // 16-byte aligned
alignas(32) float arr[4];       // For AVX instructions

struct alignas(64) CacheLine {  // Cache-line aligned
    int data[16];
};`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Cache-line aligned struct">{`#include <iostream>
#include <cstdint>

struct alignas(64) CacheAligned {
    int value;
};

int main() {
    CacheAligned obj;
    std::cout << "alignof: " << alignof(CacheAligned) << std::endl;
    std::cout << "sizeof:  " << sizeof(CacheAligned) << std::endl;

    auto addr = reinterpret_cast<std::uintptr_t>(&obj);
    std::cout << "aligned to 64? " << (addr % 64 == 0 ? "yes" : "no") << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`alignof: 64
sizeof:  64
aligned to 64? yes`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Why Alignment Matters</h2>

      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800/40">
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5">
          <li><strong>CPU cache lines</strong> — typically 64 bytes. Misaligned data can span two cache lines.</li>
          <li><strong>SIMD instructions</strong> — SSE requires 16-byte, AVX requires 32-byte alignment.</li>
          <li><strong>Atomic operations</strong> — some architectures require natural alignment for lock-free atomics.</li>
        </ul>
      </div>

      <WarningBlock title="Over-Aligned Types and Dynamic Allocation">
        <p>
          Before C++17, <code>new</code> didn't guarantee alignment beyond the default (typically 16 bytes).
          C++17 added aligned <code>new</code> that respects <code>alignas</code>.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Order Struct Members by Size">
        <p>
          Place larger members first to minimize padding:
        </p>
        <CppCode>{`// Bad: 24 bytes (lots of padding)
struct Bad  { char a; double b; char c; int d; };

// Good: 16 bytes (minimal padding)
struct Good { double b; int d; char a; char c; };`}</CppCode>
      </BestPracticeBlock>

      <CompilerNoteBlock compiler="gcc" title="-Wpadded Flag">
        <p>
          Use <code>-Wpadded</code> to get warnings about struct padding, helping identify
          opportunities to reorder members.
        </p>
      </CompilerNoteBlock>

      <ExerciseBlock
        title="Minimize Struct Size"
        difficulty="intermediate"
        prompt="Reorder members of this struct to minimize sizeof: struct S { char a; double b; char c; int d; char e; };"
        hints={[
          "Group members by alignment requirement (largest first)",
          "char=1, int=4, double=8 byte alignment",
        ]}
        solution={
          <CppCode>{`// Optimized: 16 bytes (down from 32)
struct S {
    double b;  // 8
    int d;     // 4
    char a;    // 1
    char c;    // 1
    char e;    // 1 + 1 padding
};`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'alignof operator', url: 'https://en.cppreference.com/w/cpp/language/alignof' },
        { type: 'cppreference', title: 'alignas specifier', url: 'https://en.cppreference.com/w/cpp/language/alignas' },
        { type: 'conference_talk', title: 'Data-Oriented Design and C++', author: 'Mike Acton', description: 'CppCon 2014' },
      ]} />
    </div>
  )
}
