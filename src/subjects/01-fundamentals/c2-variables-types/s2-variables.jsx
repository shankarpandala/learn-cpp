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

export default function S2Variables() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Variables are named storage locations in memory. In C++, every variable has a type, a name,
        and a value. Understanding how to declare, initialize, and use variables — along with the
        difference between variables and constants — is fundamental to writing C++ programs.
      </p>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Declaration and Initialization</h2>

      <SyntaxBlock title="Variable Declaration">
        <CppCode>{`type name;              // Declaration (uninitialized)
type name = value;      // Copy initialization
type name(value);       // Direct initialization
type name{value};       // Brace initialization (C++11) — preferred`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Initialization styles">{`#include <iostream>

int main() {
    int a;              // Uninitialized — contains garbage!
    int b = 42;         // Copy initialization
    int c(42);          // Direct initialization
    int d{42};          // Brace initialization (preferred)
    int e{};            // Value initialization (zero for int)

    std::cout << "b = " << b << std::endl;
    std::cout << "d = " << d << std::endl;
    std::cout << "e = " << e << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`b = 42
d = 42
e = 0`}</OutputBlock>

      <WarningBlock title="Uninitialized Variables">
        <p>
          Reading an uninitialized variable is <strong>undefined behavior</strong>. The variable contains
          whatever was previously in that memory location. Always initialize your variables.
        </p>
        <CppCode>{`int x;
std::cout << x;  // Undefined behavior! Could print anything.`}</CppCode>
      </WarningBlock>

      <BestPracticeBlock title="Prefer Brace Initialization">
        <p>
          Brace initialization <code>{'int x{42}'}</code> is the safest form because it prevents
          <strong> narrowing conversions</strong> — the compiler will error if data would be lost.
        </p>
        <CppCode>{`int x{3.14};     // ERROR: narrowing conversion from double to int
int y = 3.14;    // OK but silently truncates to 3 — potential bug!`}</CppCode>
      </BestPracticeBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Constants</h2>

      <SyntaxBlock title="const and constexpr">
        <CppCode>{`const double PI = 3.14159265358979;      // Runtime constant
constexpr int MAX_SIZE = 100;            // Compile-time constant (C++11)

// const: value set once, then immutable
// constexpr: value must be computable at compile time`}</CppCode>
      </SyntaxBlock>

      <CppCode>{`#include <iostream>

int main() {
    const int max_attempts = 3;
    constexpr double gravity = 9.81;

    // max_attempts = 5;   // ERROR: cannot modify const
    // gravity = 10.0;     // ERROR: cannot modify constexpr

    std::cout << "Max attempts: " << max_attempts << std::endl;
    std::cout << "Gravity: " << gravity << " m/s^2" << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`Max attempts: 3
Gravity: 9.81 m/s^2`}</OutputBlock>

      <BestPracticeBlock title="Prefer constexpr over const for Compile-Time Values">
        <p>
          If a value is known at compile time, use <code>constexpr</code>. This enables compiler
          optimizations and makes your intent clear. Use <code>const</code> for values determined
          at runtime that should not change after initialization.
        </p>
      </BestPracticeBlock>

      <NoteBlock type="history" title="Evolution of Constants">
        <p>
          C used <code>#define PI 3.14</code> (preprocessor macro) for constants. C++ introduced
          <code>const</code> for type-safe constants. C++11 added <code>constexpr</code> for
          guaranteed compile-time evaluation. Modern C++ strongly prefers <code>constexpr</code>.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Type Deduction with auto</h2>

      <DefinitionBlock title="auto (C++11)">
        <p>
          The <code>auto</code> keyword lets the compiler deduce the type from the initializer.
          The variable still has a fixed, static type — it's just inferred by the compiler.
        </p>
      </DefinitionBlock>

      <CppCode>{`#include <iostream>

int main() {
    auto x = 42;          // int
    auto y = 3.14;        // double
    auto z = 'A';         // char
    auto flag = true;     // bool
    auto name = "Alice";  // const char* (not std::string!)

    std::cout << "x: " << x << " (int)" << std::endl;
    std::cout << "y: " << y << " (double)" << std::endl;
    std::cout << "z: " << z << " (char)" << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`x: 42 (int)
y: 3.14 (double)
z: A (char)`}</OutputBlock>

      <NoteBlock type="important" title="auto Requires an Initializer">
        <p>
          <code>auto x;</code> is invalid — the compiler needs an initializer to deduce the type.
          <code>auto</code> doesn't mean "any type" — it means "figure out the type for me."
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Scope and Lifetime</h2>

      <CppCode>{`#include <iostream>

int global = 100;  // Global scope — lives for the entire program

int main() {
    int local = 42;  // Local to main()

    {
        int inner = 10;  // Local to this block
        std::cout << "inner: " << inner << std::endl;
        std::cout << "local: " << local << std::endl;   // Accessible
        std::cout << "global: " << global << std::endl;  // Accessible
    }
    // inner is destroyed here

    // std::cout << inner;  // ERROR: inner not in scope
    std::cout << "local: " << local << std::endl;  // Still accessible

    return 0;
}`}</CppCode>

      <OutputBlock>{`inner: 10
local: 42
global: 100
local: 42`}</OutputBlock>

      <BestPracticeBlock title="Minimize Variable Scope">
        <p>
          Declare variables as close to their first use as possible and in the narrowest scope
          needed. This reduces bugs from accidental reuse and makes code easier to understand.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Constants and Calculations"
        difficulty="beginner"
        prompt="Write a program that calculates the area and circumference of a circle. Use constexpr for PI, const for the radius (set to 5.0), and auto for the computed results. Print both values."
        hints={[
          "Area = PI * r * r",
          "Circumference = 2 * PI * r",
          "Use constexpr double PI = 3.14159265358979;",
        ]}
        solution={
          <CppCode>{`#include <iostream>

int main() {
    constexpr double PI = 3.14159265358979;
    const double radius = 5.0;

    auto area = PI * radius * radius;
    auto circumference = 2.0 * PI * radius;

    std::cout << "Radius: " << radius << std::endl;
    std::cout << "Area: " << area << std::endl;
    std::cout << "Circumference: " << circumference << std::endl;

    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Declarations', url: 'https://en.cppreference.com/w/cpp/language/declarations', description: 'Variable declaration syntax and semantics' },
        { type: 'cppreference', title: 'constexpr specifier', url: 'https://en.cppreference.com/w/cpp/language/constexpr', description: 'Compile-time constant expressions' },
        { type: 'cppreference', title: 'auto specifier', url: 'https://en.cppreference.com/w/cpp/language/auto', description: 'Type deduction for variables' },
      ]} />
    </div>
  )
}
