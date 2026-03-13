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

export default function S1ConstexprDeep() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The <code>constexpr</code> specifier enables computations to happen at compile time, moving
        work from runtime to compilation. With each C++ standard revision, constexpr has grown more
        powerful, culminating in constexpr containers and algorithms in C++20.
      </p>

      <DefinitionBlock title="constexpr">
        <p>
          <code>constexpr</code> declares that a variable or function can be evaluated at compile time.
          A constexpr function must produce a constant expression when called with constant arguments.
          At runtime, it behaves like a normal function.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">constexpr Functions In Depth</h2>

      <CppCode title="Compile-time computation">{`#include <iostream>
#include <array>

constexpr int factorial(int n) {
    int result = 1;
    for (int i = 2; i <= n; ++i) {
        result *= i;
    }
    return result;
}

constexpr int fibonacci(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; ++i) {
        int tmp = a + b;
        a = b;
        b = tmp;
    }
    return b;
}

int main() {
    constexpr int f10 = factorial(10);
    constexpr int fib20 = fibonacci(20);
    static_assert(f10 == 3628800, "factorial(10) must be 3628800");

    std::cout << "10! = " << f10 << "\\n";
    std::cout << "fib(20) = " << fib20 << "\\n";

    // Also works at runtime with non-constant args
    int n;
    std::cin >> n;
    std::cout << "fib(" << n << ") = " << fibonacci(n) << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`10! = 3628800
fib(20) = 6765`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">constexpr if (C++17)</h2>

      <SyntaxBlock title="if constexpr Syntax">
        <p>
          <code>if constexpr</code> evaluates a condition at compile time. The discarded branch is
          not instantiated, enabling template code that would otherwise fail to compile.
        </p>
        <CppCode>{`if constexpr (condition) {
    // compiled only if condition is true
} else {
    // compiled only if condition is false
}`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Using if constexpr in templates">{`#include <iostream>
#include <type_traits>
#include <string>

template <typename T>
auto stringify(const T& value) {
    if constexpr (std::is_arithmetic_v<T>) {
        return std::to_string(value);
    } else if constexpr (std::is_same_v<T, std::string>) {
        return value;
    } else {
        return std::string("[unknown type]");
    }
}

int main() {
    std::cout << stringify(42) << "\\n";
    std::cout << stringify(3.14) << "\\n";
    std::cout << stringify(std::string("hello")) << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`42
3.140000
hello`}</OutputBlock>

      <NoteBlock type="info" title="constexpr Containers (C++20)">
        <p>
          C++20 allows <code>std::vector</code> and <code>std::string</code> in constexpr contexts.
          Memory allocated during constant evaluation must be freed before the evaluation ends
          (transient allocation). This enables powerful compile-time data processing.
        </p>
      </NoteBlock>

      <CompilerNoteBlock compiler="gcc" title="C++20 constexpr Support">
        <p>
          GCC 12+ and Clang 15+ fully support constexpr <code>std::vector</code> and
          <code>std::string</code>. Use <code>-std=c++20</code> or later to enable these features.
        </p>
      </CompilerNoteBlock>

      <NoteBlock type="important" title="constexpr Limitations">
        <p>
          constexpr functions cannot use <code>goto</code>, non-literal types (before C++20 relaxations),
          or <code>reinterpret_cast</code>. They cannot have undefined behavior. In C++20+, they can
          use try/catch, virtual functions, and dynamic allocation (with restrictions).
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Prefer constexpr for compile-time constants">
        <p>
          Use <code>constexpr</code> for functions that compute values used as template arguments,
          array sizes, or switch cases. This catches errors earlier, eliminates runtime overhead,
          and makes intent clear.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Compile-Time Lookup Table"
        difficulty="intermediate"
        prompt="Write a constexpr function that generates an std::array of the first N squares (0, 1, 4, 9, ...). Use it to create a compile-time lookup table of 10 squares and verify with static_assert."
        hints={[
          "Use std::array<int, N> as the return type",
          "Build the array in a constexpr function with a loop",
          "Use static_assert to check specific values",
        ]}
        solution={
          <CppCode>{`#include <array>
#include <iostream>

template <std::size_t N>
constexpr std::array<int, N> makeSquares() {
    std::array<int, N> result{};
    for (std::size_t i = 0; i < N; ++i) {
        result[i] = static_cast<int>(i * i);
    }
    return result;
}

int main() {
    constexpr auto squares = makeSquares<10>();
    static_assert(squares[0] == 0);
    static_assert(squares[3] == 9);
    static_assert(squares[9] == 81);

    for (int s : squares) {
        std::cout << s << " ";
    }
    std::cout << "\\n";
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'constexpr specifier', url: 'https://en.cppreference.com/w/cpp/language/constexpr', description: 'Full constexpr reference' },
        { type: 'cppreference', title: 'if constexpr', url: 'https://en.cppreference.com/w/cpp/language/if#Constexpr_if', description: 'Compile-time conditional documentation' },
        { type: 'article', title: 'constexpr Everything', author: 'Jason Turner', url: 'https://www.youtube.com/watch?v=PJwd4JLYJJY', description: 'CppCon talk on constexpr best practices' },
      ]} />
    </div>
  )
}
