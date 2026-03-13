import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import WarningBlock from '../../../components/content/WarningBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S3Bitwise() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Bitwise operators work directly on the individual bits of integer values. They are
        essential in systems programming, embedded development, graphics, networking, and
        anywhere you need fine-grained control over data at the binary level.
      </p>

      <DefinitionBlock title="Bitwise Operators">
        <p>
          C++ provides six bitwise operators: AND (<code>&amp;</code>), OR (<code>|</code>),
          XOR (<code>^</code>), NOT (<code>~</code>), left shift (<code>&lt;&lt;</code>),
          and right shift (<code>&gt;&gt;</code>). They operate on each bit of their integer
          operands independently.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Bitwise AND, OR, XOR, and NOT</h2>

      <SyntaxBlock title="Truth Table">
        <p>
          Each bitwise operator applies a logic operation to corresponding bits of two operands
          (or inverts bits for NOT):
        </p>
        <CppCode>{`// A & B  (AND): 1 only if both bits are 1
// A | B  (OR):  1 if either bit is 1
// A ^ B  (XOR): 1 if bits differ
// ~A     (NOT): flips every bit`}</CppCode>
      </SyntaxBlock>

      <CppCode title="bitwise_basics.cpp">{`#include <iostream>
#include <bitset>

int main() {
    unsigned char a = 0b11001010;  // 202
    unsigned char b = 0b10110110;  // 182

    std::cout << "a       = " << std::bitset<8>(a) << std::endl;
    std::cout << "b       = " << std::bitset<8>(b) << std::endl;
    std::cout << "a & b   = " << std::bitset<8>(a & b) << std::endl;
    std::cout << "a | b   = " << std::bitset<8>(a | b) << std::endl;
    std::cout << "a ^ b   = " << std::bitset<8>(a ^ b) << std::endl;
    std::cout << "~a      = " << std::bitset<8>(static_cast<unsigned char>(~a)) << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`a       = 11001010
b       = 10110110
a & b   = 10000010
a | b   = 11111110
a ^ b   = 01111100
~a      = 00110101`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Shift Operators</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The left shift operator (<code>&lt;&lt;</code>) moves bits to the left, filling vacated
        positions with zeros. Each left shift by 1 effectively multiplies by 2. The right shift
        operator (<code>&gt;&gt;</code>) moves bits right, dividing by 2 for unsigned types.
      </p>

      <CppCode title="shift_operators.cpp">{`#include <iostream>
#include <bitset>

int main() {
    unsigned int val = 0b00001101;  // 13

    std::cout << "val      = " << std::bitset<8>(val) << " (" << val << ")" << std::endl;
    std::cout << "val << 1 = " << std::bitset<8>(val << 1) << " (" << (val << 1) << ")" << std::endl;
    std::cout << "val << 3 = " << std::bitset<8>(val << 3) << " (" << (val << 3) << ")" << std::endl;
    std::cout << "val >> 1 = " << std::bitset<8>(val >> 1) << " (" << (val >> 1) << ")" << std::endl;
    std::cout << "val >> 2 = " << std::bitset<8>(val >> 2) << " (" << (val >> 2) << ")" << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`val      = 00001101 (13)
val << 1 = 00011010 (26)
val << 3 = 01101000 (104)
val >> 1 = 00000110 (6)
val >> 2 = 00000011 (3)`}</OutputBlock>

      <WarningBlock title="Shifting Signed Integers">
        <p>
          Right-shifting a negative signed integer is <strong>implementation-defined</strong> behavior
          in C++. The result may vary between compilers. Always use <code>unsigned</code> types
          for bitwise operations to ensure predictable behavior.
        </p>
      </WarningBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Bit Flags and Masking</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        A common use of bitwise operators is storing multiple boolean options in a single integer.
        Each bit represents a flag. You use OR to set flags, AND with a mask to check them, and
        XOR to toggle them.
      </p>

      <CppCode title="bit_flags.cpp">{`#include <iostream>

// Define permission flags as powers of 2
const unsigned int READ    = 1 << 0;  // 0001
const unsigned int WRITE   = 1 << 1;  // 0010
const unsigned int EXECUTE = 1 << 2;  // 0100
const unsigned int ADMIN   = 1 << 3;  // 1000

int main() {
    unsigned int permissions = 0;

    // Set flags using OR
    permissions |= READ;
    permissions |= WRITE;

    // Check flags using AND
    std::cout << "Can read:    " << ((permissions & READ) ? "yes" : "no") << std::endl;
    std::cout << "Can write:   " << ((permissions & WRITE) ? "yes" : "no") << std::endl;
    std::cout << "Can execute: " << ((permissions & EXECUTE) ? "yes" : "no") << std::endl;

    // Toggle a flag using XOR
    permissions ^= WRITE;  // turn off WRITE
    std::cout << "After toggle, can write: "
              << ((permissions & WRITE) ? "yes" : "no") << std::endl;

    // Clear a flag using AND with NOT
    permissions &= ~READ;
    std::cout << "After clear, can read: "
              << ((permissions & READ) ? "yes" : "no") << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`Can read:    yes
Can write:   yes
Can execute: no
After toggle, can write: no
After clear, can read: no`}</OutputBlock>

      <BestPracticeBlock title="Use Named Constants for Bit Flags">
        <p>
          Always define named constants for your bit flags rather than using raw numbers.
          Use <code>constexpr</code> or <code>enum</code> to give each flag a meaningful name.
          This makes the code self-documenting and prevents errors from mistyped values.
        </p>
      </BestPracticeBlock>

      <NoteBlock type="info" title="Practical Uses of Bitwise Operators">
        <p>
          Beyond flags, bitwise operators are used for fast multiplication and division by powers
          of 2, extracting color channels from packed pixel data (e.g., <code>(pixel &gt;&gt; 8) &amp; 0xFF</code>
          for the green channel), implementing hash functions, and working with network protocols.
        </p>
      </NoteBlock>

      <NoteBlock type="history" title="Origins">
        <p>
          Bitwise operators originated in C and were inherited by C++. They map directly to CPU
          instructions, making them extremely fast. In the early days of computing, when memory
          was scarce, packing multiple values into a single integer using bit fields was a
          critical optimization technique.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Swap Without Temporary"
        difficulty="intermediate"
        prompt="Write a program that swaps two integers (a = 5, b = 9) using only XOR bitwise operations, without a temporary variable. Print the values before and after the swap."
        hints={[
          "XOR has the property: a ^ a == 0 and a ^ 0 == a",
          "Step 1: a = a ^ b, Step 2: b = a ^ b, Step 3: a = a ^ b",
        ]}
        solution={
          <CppCode>{`#include <iostream>

int main() {
    int a = 5, b = 9;
    std::cout << "Before: a=" << a << " b=" << b << std::endl;

    a = a ^ b;
    b = a ^ b;
    a = a ^ b;

    std::cout << "After:  a=" << a << " b=" << b << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ExerciseBlock
        title="Check if Power of Two"
        difficulty="intermediate"
        prompt="Write a program that checks whether the number 64 is a power of two using a single bitwise expression. A power of two in binary has exactly one bit set (e.g., 8 = 1000)."
        hints={[
          "If n is a power of 2, then n & (n - 1) equals 0",
          "Also make sure n is greater than 0",
        ]}
        solution={
          <CppCode>{`#include <iostream>

int main() {
    int n = 64;

    bool isPowerOfTwo = (n > 0) && ((n & (n - 1)) == 0);

    std::cout << n << " is "
              << (isPowerOfTwo ? "" : "not ")
              << "a power of two" << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Bitwise Operators', url: 'https://en.cppreference.com/w/cpp/language/operator_arithmetic', description: 'Bitwise AND, OR, XOR, NOT, and shift operators' },
        { type: 'cppreference', title: 'std::bitset', url: 'https://en.cppreference.com/w/cpp/utility/bitset', description: 'Fixed-size bit array for visualizing and manipulating bits' },
        { type: 'textbook', title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', description: 'Chapter 11: Operator Overloading' },
      ]} />
    </div>
  )
}
