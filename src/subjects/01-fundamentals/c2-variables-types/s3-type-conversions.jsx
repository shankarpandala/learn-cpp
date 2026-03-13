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

export default function S3TypeConversions() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        When you mix different types in expressions or assignments, C++ converts values from one
        type to another. Some conversions happen automatically (implicit), while others require
        you to be explicit. Understanding these conversions helps you avoid subtle bugs caused
        by data loss or unexpected behavior.
      </p>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Implicit Conversions</h2>

      <DefinitionBlock title="Implicit Conversion (Coercion)">
        <p>
          An implicit conversion is performed automatically by the compiler when a value of one
          type is used where another type is expected. These happen in assignments, function calls,
          and mixed-type expressions.
        </p>
      </DefinitionBlock>

      <CppCode title="Safe implicit conversions (widening)">{`#include <iostream>

int main() {
    int i = 42;
    double d = i;    // int → double (safe, no data loss)
    long l = i;      // int → long (safe, wider type)

    std::cout << "int: " << i << std::endl;
    std::cout << "double: " << d << std::endl;
    std::cout << "long: " << l << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`int: 42
double: 42
long: 42`}</OutputBlock>

      <WarningBlock title="Dangerous Implicit Conversions (Narrowing)">
        <p>
          Narrowing conversions lose data silently. The compiler may warn but will still compile:
        </p>
        <CppCode>{`double pi = 3.14159;
int truncated = pi;     // 3 — fractional part silently lost!

int big = 300;
char c = big;           // Overflow! char can only hold -128 to 127

unsigned int u = -1;    // Wraps to 4294967295!`}</CppCode>
      </WarningBlock>

      <NoteBlock type="tip" title="Brace Initialization Catches Narrowing">
        <p>
          This is why brace initialization is preferred — it makes narrowing conversions a
          compile error:
        </p>
        <CppCode>{`int x{3.14};   // ERROR: narrowing conversion
int y = 3.14;  // OK but truncates (potential bug)`}</CppCode>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Integer Promotion</h2>

      <SyntaxBlock title="Arithmetic Promotion Rules">
        <p>
          In arithmetic expressions, smaller integer types are promoted to <code>int</code> before
          the operation is performed. If the operands have different types, the "narrower" one is
          converted to the "wider" one:
        </p>
        <p className="mt-2 font-mono text-xs text-gray-600 dark:text-gray-400">
          bool → char → short → int → unsigned int → long → unsigned long → long long → float → double → long double
        </p>
      </SyntaxBlock>

      <CppCode>{`#include <iostream>

int main() {
    short a = 10;
    short b = 20;
    // a + b: both promoted to int, result is int
    auto result = a + b;
    std::cout << "sizeof(short): " << sizeof(short) << std::endl;
    std::cout << "sizeof(a + b): " << sizeof(result) << std::endl;

    int i = 7;
    double d = 2.5;
    // i + d: i promoted to double, result is double
    auto mixed = i + d;
    std::cout << "7 + 2.5 = " << mixed << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`sizeof(short): 2
sizeof(a + b): 4
7 + 2.5 = 9.5`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Explicit Casts</h2>

      <p className="text-gray-700 dark:text-gray-300">
        C++ provides four named cast operators. Each serves a specific purpose:
      </p>

      <SyntaxBlock title="static_cast — The Standard Cast">
        <p>
          Use <code>static_cast</code> for well-defined conversions between related types.
          This is the most common cast and should be your default choice.
        </p>
        <CppCode>{`double pi = 3.14159;
int truncated = static_cast<int>(pi);  // Explicit: "I know I'm losing precision"

char c = 'A';
int ascii = static_cast<int>(c);       // char → int (65)`}</CppCode>
      </SyntaxBlock>

      <CppCode title="static_cast examples">{`#include <iostream>

int main() {
    // Integer division vs floating-point division
    int a = 7, b = 2;

    std::cout << "int / int: " << a / b << std::endl;  // 3 (truncated)
    std::cout << "with cast: " << static_cast<double>(a) / b << std::endl;  // 3.5

    // Explicit narrowing
    double value = 99.9;
    int rounded = static_cast<int>(value);
    std::cout << "99.9 → int: " << rounded << std::endl;  // 99 (truncated, not rounded)

    return 0;
}`}</CppCode>

      <OutputBlock>{`int / int: 3
with cast: 3.5
99.9 → int: 99`}</OutputBlock>

      <NoteBlock type="info" title="Other Cast Types">
        <p>
          C++ has three other casts for specialized purposes:
        </p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li><code>const_cast</code> — removes or adds const (rarely needed)</li>
          <li><code>dynamic_cast</code> — safe downcasting in class hierarchies (OOP topic)</li>
          <li><code>reinterpret_cast</code> — low-level bit reinterpretation (advanced/dangerous)</li>
        </ul>
      </NoteBlock>

      <WarningBlock title="Avoid C-Style Casts">
        <p>
          C-style casts like <code>(int)3.14</code> still work in C++ but are dangerous — they
          can perform any cast, including unsafe ones, with no compiler checks. Always
          use C++ named casts.
        </p>
        <CppCode>{`// Bad: C-style cast (avoid)
int x = (int)3.14;

// Good: C++ named cast (preferred)
int y = static_cast<int>(3.14);`}</CppCode>
      </WarningBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Boolean Conversions</h2>

      <CppCode>{`#include <iostream>

int main() {
    // Integers to bool: 0 is false, everything else is true
    bool a = 0;     // false
    bool b = 1;     // true
    bool c = -5;    // true
    bool d = 42;    // true

    // Bool to int: false → 0, true → 1
    int x = true;   // 1
    int y = false;  // 0

    std::cout << std::boolalpha;
    std::cout << "0 → bool: " << a << std::endl;
    std::cout << "42 → bool: " << d << std::endl;
    std::cout << "true → int: " << x << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`0 → bool: false
42 → bool: true
true → int: 1`}</OutputBlock>

      <BestPracticeBlock title="Be Explicit About Conversions">
        <p>
          When you need a type conversion, use <code>static_cast</code> to document your intent.
          This makes the conversion visible to other developers and to code review tools.
          Let narrowing conversions be caught by brace initialization wherever possible.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Safe Division"
        difficulty="beginner"
        prompt="Write a function that performs integer division but returns a double result (e.g., divide(7, 2) should return 3.5, not 3). Use static_cast."
        hints={[
          "Cast at least one operand to double before dividing",
          "If both operands are int, the result will be truncated",
        ]}
        solution={
          <CppCode>{`#include <iostream>

double divide(int a, int b) {
    return static_cast<double>(a) / b;
}

int main() {
    std::cout << "7 / 2 = " << divide(7, 2) << std::endl;
    std::cout << "10 / 3 = " << divide(10, 3) << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Implicit conversions', url: 'https://en.cppreference.com/w/cpp/language/implicit_conversion', description: 'All implicit conversion rules' },
        { type: 'cppreference', title: 'static_cast', url: 'https://en.cppreference.com/w/cpp/language/static_cast', description: 'The standard explicit cast operator' },
        { type: 'textbook', title: 'Effective Modern C++', author: 'Scott Meyers', description: 'Item 2: Understand auto type deduction' },
      ]} />
    </div>
  )
}
