import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import WarningBlock from '../../../components/content/WarningBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S1BasicTypes() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++ is a <strong>statically typed</strong> language — every variable must have a declared
        type, and that type is checked at compile time. Understanding the fundamental types is
        essential because they determine how much memory is used and what operations are valid.
      </p>

      <DefinitionBlock title="Fundamental Types">
        <p>
          Fundamental (or built-in) types are the basic data types provided directly by the C++
          language. They include integer types, floating-point types, character types, and the
          boolean type.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Integer Types</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 text-left">
              <th className="py-2 pr-4 font-semibold text-gray-900 dark:text-gray-100">Type</th>
              <th className="py-2 pr-4 font-semibold text-gray-900 dark:text-gray-100">Typical Size</th>
              <th className="py-2 pr-4 font-semibold text-gray-900 dark:text-gray-100">Range</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="py-2 pr-4 font-mono text-blue-600 dark:text-blue-400">short</td>
              <td className="py-2 pr-4">2 bytes</td>
              <td className="py-2 pr-4">-32,768 to 32,767</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="py-2 pr-4 font-mono text-blue-600 dark:text-blue-400">int</td>
              <td className="py-2 pr-4">4 bytes</td>
              <td className="py-2 pr-4">-2.1 billion to 2.1 billion</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="py-2 pr-4 font-mono text-blue-600 dark:text-blue-400">long</td>
              <td className="py-2 pr-4">4 or 8 bytes</td>
              <td className="py-2 pr-4">Platform-dependent</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="py-2 pr-4 font-mono text-blue-600 dark:text-blue-400">long long</td>
              <td className="py-2 pr-4">8 bytes</td>
              <td className="py-2 pr-4">-9.2 quintillion to 9.2 quintillion</td>
            </tr>
          </tbody>
        </table>
      </div>

      <CppCode title="Integer types in action">{`#include <iostream>
#include <climits>

int main() {
    int a = 42;
    short s = 100;
    long long big = 9'000'000'000LL;  // Digit separators (C++14)

    std::cout << "int: " << a << std::endl;
    std::cout << "short: " << s << std::endl;
    std::cout << "long long: " << big << std::endl;
    std::cout << "INT_MAX: " << INT_MAX << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`int: 42
short: 100
long long: 9000000000
INT_MAX: 2147483647`}</OutputBlock>

      <NoteBlock type="tip" title="Digit Separators (C++14)">
        <p>
          Use single quotes as digit separators for readability: <code>1'000'000</code> instead
          of <code>1000000</code>. The compiler ignores them entirely.
        </p>
      </NoteBlock>

      <SyntaxBlock title="Unsigned Types">
        <p>
          Adding <code>unsigned</code> before an integer type makes it non-negative, doubling the
          positive range at the cost of no negative values.
        </p>
        <CppCode>{`unsigned int positive = 42;      // 0 to ~4.2 billion
unsigned short small = 65535;    // 0 to 65,535`}</CppCode>
      </SyntaxBlock>

      <WarningBlock title="Unsigned Underflow">
        <p>
          Subtracting from an unsigned value that reaches 0 wraps around to a huge number
          instead of going negative. This is a common source of bugs.
        </p>
        <CppCode>{`unsigned int x = 0;
x = x - 1;  // x is now 4294967295, not -1!`}</CppCode>
      </WarningBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Floating-Point Types</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 text-left">
              <th className="py-2 pr-4 font-semibold text-gray-900 dark:text-gray-100">Type</th>
              <th className="py-2 pr-4 font-semibold text-gray-900 dark:text-gray-100">Size</th>
              <th className="py-2 pr-4 font-semibold text-gray-900 dark:text-gray-100">Precision</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="py-2 pr-4 font-mono text-blue-600 dark:text-blue-400">float</td>
              <td className="py-2 pr-4">4 bytes</td>
              <td className="py-2 pr-4">~7 decimal digits</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="py-2 pr-4 font-mono text-blue-600 dark:text-blue-400">double</td>
              <td className="py-2 pr-4">8 bytes</td>
              <td className="py-2 pr-4">~15 decimal digits</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="py-2 pr-4 font-mono text-blue-600 dark:text-blue-400">long double</td>
              <td className="py-2 pr-4">8-16 bytes</td>
              <td className="py-2 pr-4">~18-33 decimal digits</td>
            </tr>
          </tbody>
        </table>
      </div>

      <CppCode title="Floating-point types">{`#include <iostream>
#include <iomanip>

int main() {
    float f = 3.14159f;       // 'f' suffix for float literals
    double d = 3.141592653589793;
    long double ld = 3.141592653589793238L;  // 'L' suffix

    std::cout << std::setprecision(15);
    std::cout << "float:       " << f << std::endl;
    std::cout << "double:      " << d << std::endl;
    std::cout << "long double: " << ld << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`float:       3.14159011840820
double:      3.14159265358979
long double: 3.14159265358979`}</OutputBlock>

      <BestPracticeBlock title="Prefer double over float">
        <p>
          Use <code>double</code> as your default floating-point type. <code>float</code> has limited
          precision and is mainly useful when memory is constrained (e.g., GPU programming).
          On modern hardware, <code>double</code> operations are often just as fast.
        </p>
      </BestPracticeBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Character and Boolean Types</h2>

      <CppCode>{`#include <iostream>

int main() {
    char letter = 'A';        // Single character (1 byte)
    char newline = '\\n';      // Escape sequence
    bool is_valid = true;     // Boolean: true or false

    std::cout << "char: " << letter << std::endl;
    std::cout << "ASCII value: " << static_cast<int>(letter) << std::endl;
    std::cout << "bool: " << is_valid << std::endl;
    std::cout << "bool (alpha): " << std::boolalpha << is_valid << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`char: A
ASCII value: 65
bool: 1
bool (alpha): true`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">The sizeof Operator</h2>

      <CppCode>{`#include <iostream>

int main() {
    std::cout << "char:      " << sizeof(char) << " bytes" << std::endl;
    std::cout << "short:     " << sizeof(short) << " bytes" << std::endl;
    std::cout << "int:       " << sizeof(int) << " bytes" << std::endl;
    std::cout << "long:      " << sizeof(long) << " bytes" << std::endl;
    std::cout << "long long: " << sizeof(long long) << " bytes" << std::endl;
    std::cout << "float:     " << sizeof(float) << " bytes" << std::endl;
    std::cout << "double:    " << sizeof(double) << " bytes" << std::endl;
    std::cout << "bool:      " << sizeof(bool) << " bytes" << std::endl;
    return 0;
}`}</CppCode>

      <NoteBlock type="info" title="Guaranteed Minimums">
        <p>
          The C++ standard only guarantees <em>minimum</em> sizes: <code>char</code> is at least 1 byte,
          <code>short</code> at least 2, <code>int</code> at least 2, <code>long</code> at least 4,
          <code>long long</code> at least 8. Actual sizes are platform-dependent.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Type Investigation"
        difficulty="beginner"
        prompt="Write a program that prints the size of every fundamental type on your system using sizeof. Also print the maximum value of int and the minimum value of int using <climits>."
        hints={[
          "Include <climits> for INT_MAX and INT_MIN",
          "sizeof returns the size in bytes",
        ]}
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Fundamental types', url: 'https://en.cppreference.com/w/cpp/language/types', description: 'Complete reference for all C++ fundamental types' },
        { type: 'cppreference', title: 'Fixed width integer types', url: 'https://en.cppreference.com/w/cpp/types/integer', description: 'int32_t, uint64_t, etc. from <cstdint>' },
      ]} />
    </div>
  )
}
