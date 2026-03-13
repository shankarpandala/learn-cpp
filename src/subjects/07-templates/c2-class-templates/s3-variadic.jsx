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

export default function S3Variadic() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Variadic templates accept an arbitrary number of template arguments. Introduced in C++11, they
        enable type-safe functions and classes that work with any number of parameters -- the foundation
        for utilities like <code>std::tuple</code>, <code>std::variant</code>, and <code>std::make_shared</code>.
      </p>

      <DefinitionBlock title="Parameter Pack">
        <p>
          A <strong>parameter pack</strong> is a template parameter that accepts zero or more arguments.
          A <strong>template parameter pack</strong> is declared with <code>typename... Ts</code>, and a
          <strong> function parameter pack</strong> is declared with <code>Ts... args</code>. The pack
          is expanded using the <code>...</code> operator.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic Variadic Templates</h2>

      <SyntaxBlock title="Variadic template syntax">
        <p>
          The ellipsis <code>...</code> appears after <code>typename</code> to declare a parameter pack,
          and after a pattern to expand it.
        </p>
        <CppCode>{`template<typename... Ts>       // Ts is a template parameter pack
void func(Ts... args) {        // args is a function parameter pack
    // sizeof...(Ts) gives the number of types
    // sizeof...(args) gives the number of arguments
}`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Recursive Unpacking</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Before C++17 fold expressions, the standard technique for processing parameter packs was
        recursive template instantiation with a base case.
      </p>

      <CppCode title="Recursive variadic print">{`#include <iostream>

// Base case: no arguments
void print() {
    std::cout << std::endl;
}

// Recursive case: peel off first argument
template<typename T, typename... Rest>
void print(T first, Rest... rest) {
    std::cout << first;
    if constexpr (sizeof...(rest) > 0)
        std::cout << ", ";
    print(rest...);
}

int main() {
    print(1, 2.5, "hello", 'A');
    print(42);
    print();
    return 0;
}`}</CppCode>

      <OutputBlock>{`1, 2.5, hello, A
42
`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">sizeof... Operator</h2>

      <CppCode title="Querying pack size">{`#include <iostream>

template<typename... Ts>
void countTypes() {
    std::cout << "Number of types: " << sizeof...(Ts) << std::endl;
}

template<typename... Ts>
void countArgs(Ts... args) {
    std::cout << "Number of args: " << sizeof...(args) << std::endl;
}

int main() {
    countTypes<int, double, char>();
    countArgs(1, 2, 3, 4, 5);
    countArgs();
    return 0;
}`}</CppCode>

      <OutputBlock>{`Number of types: 3
Number of args: 5
Number of args: 0`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Fold Expressions (C++17)</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++17 fold expressions dramatically simplify operations over parameter packs by letting you
        apply a binary operator across all elements without recursion.
      </p>

      <SyntaxBlock title="Fold expression forms">
        <p>
          There are four forms of fold expressions. <code>pack</code> is an expression containing an
          unexpanded parameter pack, <code>op</code> is a binary operator, and <code>init</code> is an
          initial value.
        </p>
        <CppCode>{`(pack op ...)          // Unary right fold
(... op pack)          // Unary left fold
(pack op ... op init)  // Binary right fold
(init op ... op pack)  // Binary left fold`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Fold expressions in action">{`#include <iostream>
#include <string>

template<typename... Ts>
auto sum(Ts... args) {
    return (args + ...);  // Unary right fold
}

template<typename... Ts>
auto product(Ts... args) {
    return (args * ... * 1);  // Binary right fold with init=1
}

template<typename... Ts>
void printAll(Ts... args) {
    ((std::cout << args << " "), ...);  // Comma fold
    std::cout << std::endl;
}

int main() {
    std::cout << sum(1, 2, 3, 4, 5) << std::endl;
    std::cout << product(2, 3, 4) << std::endl;
    printAll("hello", 42, 3.14, 'X');
    return 0;
}`}</CppCode>

      <OutputBlock>{`15
24
hello 42 3.14 X`}</OutputBlock>

      <NoteBlock type="tip" title="The comma operator fold trick">
        <p>
          Folding over the comma operator <code>((expression), ...)</code> is a powerful pattern that lets
          you execute an expression for each element in the pack. The extra parentheses ensure the comma
          is treated as the fold operator, not a function argument separator.
        </p>
      </NoteBlock>

      <WarningBlock title="Empty packs with unary folds">
        <p>
          Unary folds over an empty parameter pack are only allowed for <code>&&</code> (yields <code>true</code>),
          <code>||</code> (yields <code>false</code>), and <code>,</code> (yields <code>void()</code>).
          For other operators, use a binary fold with an explicit initial value to handle empty packs.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Prefer fold expressions over recursion">
        <p>
          When targeting C++17 or later, use fold expressions instead of recursive unpacking. They produce
          less template instantiation overhead, are more readable, and often compile faster. Reserve
          recursive techniques for complex per-element logic that cannot be expressed as a fold.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Type-Safe Maximum"
        difficulty="intermediate"
        prompt="Write a variadic function template called maxOf that returns the maximum of all its arguments using a C++17 fold expression or recursive approach. It should work with any number of arguments (at least one)."
        hints={[
          "You can use a recursive approach: compare first with maxOf(rest...)",
          "Base case: single argument returns itself",
          "Use std::max or the ternary operator for comparison",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <algorithm>

// Base case
template<typename T>
T maxOf(T val) {
    return val;
}

// Recursive case
template<typename T, typename... Rest>
T maxOf(T first, Rest... rest) {
    auto restMax = maxOf(rest...);
    return (first > restMax) ? first : restMax;
}

int main() {
    std::cout << maxOf(3, 7, 2, 9, 1) << std::endl;
    std::cout << maxOf(1.5, 2.7) << std::endl;
    std::cout << maxOf(42) << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Parameter pack', url: 'https://en.cppreference.com/w/cpp/language/parameter_pack', description: 'Parameter pack syntax and expansion rules' },
        { type: 'cppreference', title: 'Fold expressions', url: 'https://en.cppreference.com/w/cpp/language/fold', description: 'C++17 fold expression syntax and semantics' },
        { type: 'cppreference', title: 'sizeof... operator', url: 'https://en.cppreference.com/w/cpp/language/sizeof...', description: 'Querying the size of parameter packs' },
      ]} />
    </div>
  )
}
