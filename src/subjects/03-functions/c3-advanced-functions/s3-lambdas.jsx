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

export default function S3Lambdas() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Lambdas are anonymous functions you can define inline, right where they are needed. Introduced
        in C++11 and enhanced in every subsequent standard, lambdas have become the idiomatic way
        to write short callbacks, custom comparators, and local helper functions in modern C++.
      </p>

      <DefinitionBlock title="Lambda Expression">
        <p>
          A <strong>lambda</strong> is an unnamed function object defined with the
          syntax <code>[capture](parameters) -&gt; return_type {'{ body }'}</code>. The compiler
          generates a unique closure type behind the scenes. Lambdas can capture variables from
          their enclosing scope, making them more powerful than plain function pointers.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic Syntax</h2>

      <SyntaxBlock title="Lambda Syntax">
        <p>A lambda has four parts. The return type and parameter list are optional.</p>
        <CppCode>{`[capture_list](parameter_list) -> return_type {
    // body
};

// Minimal lambda:
[]() { std::cout << "hello"; };

// With parameters and deduced return type:
[](int a, int b) { return a + b; };`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Lambda basics">{`#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> nums = {5, 2, 8, 1, 9, 3};

    // Sort descending using a lambda comparator
    std::sort(nums.begin(), nums.end(),
              [](int a, int b) { return a > b; });

    for (int n : nums) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`9 8 5 3 2 1`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Capture Modes</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The capture list controls which variables from the enclosing scope the lambda can access
        and whether they are captured by value (copied) or by reference.
      </p>

      <CppCode title="Capture by value vs reference">{`#include <iostream>

int main() {
    int x = 10;
    int y = 20;

    // Capture x by value, y by reference
    auto fn = [x, &y]() {
        // x is a copy — cannot modify the original
        // y is a reference — modifying y changes the original
        std::cout << "x=" << x << " y=" << y << std::endl;
        y = 99;  // modifies the outer y
    };

    fn();
    std::cout << "After lambda: y=" << y << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`x=10 y=20
After lambda: y=99`}</OutputBlock>

      <SyntaxBlock title="Capture Reference">
        <ul className="list-disc ml-6 space-y-1">
          <li><code>[x]</code> — capture <code>x</code> by value (copy).</li>
          <li><code>[&amp;x]</code> — capture <code>x</code> by reference.</li>
          <li><code>[=]</code> — capture all used variables by value.</li>
          <li><code>[&amp;]</code> — capture all used variables by reference.</li>
          <li><code>[=, &amp;x]</code> — capture all by value, but <code>x</code> by reference.</li>
          <li><code>[&amp;, x]</code> — capture all by reference, but <code>x</code> by value.</li>
        </ul>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Mutable Lambdas</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        By default, a lambda's call operator is <code>const</code>, so variables captured by value
        cannot be modified inside the body. The <code>mutable</code> keyword removes this restriction.
      </p>

      <CppCode title="Mutable lambda">{`#include <iostream>

int main() {
    int counter = 0;

    auto increment = [counter]() mutable {
        ++counter;  // modifies the lambda's internal copy
        return counter;
    };

    std::cout << increment() << std::endl;  // 1
    std::cout << increment() << std::endl;  // 2
    std::cout << "Original counter: " << counter << std::endl;  // still 0
    return 0;
}`}</CppCode>

      <OutputBlock>{`1
2
Original counter: 0`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Generic Lambdas (C++14)</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        In C++14, lambda parameters can use <code>auto</code>, creating a generic (template-like)
        lambda that works with any type.
      </p>

      <CppCode title="Generic lambda">{`#include <iostream>
#include <string>

int main() {
    auto print = [](const auto& value) {
        std::cout << value << std::endl;
    };

    print(42);
    print(3.14);
    print(std::string("hello"));
    return 0;
}`}</CppCode>

      <OutputBlock>{`42
3.14
hello`}</OutputBlock>

      <CompilerNoteBlock compiler="all" title="C++14 for auto Parameters">
        <p>
          Generic lambdas with <code>auto</code> parameters require <code>-std=c++14</code> or
          later. In C++20, you can also use explicit template parameter lists on
          lambdas: <code>[]&lt;typename T&gt;(T x) {'{ ... }'}</code>.
        </p>
      </CompilerNoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Storing Lambdas with std::function</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Each lambda has a unique compiler-generated type, so you cannot name it directly.
        Use <code>auto</code> for local variables or <code>std::function</code> when you need to
        store lambdas in containers or pass them across API boundaries.
      </p>

      <CppCode title="Lambda in std::function">{`#include <iostream>
#include <functional>

std::function<int(int)> makeMultiplier(int factor) {
    return [factor](int x) { return x * factor; };
}

int main() {
    auto triple = makeMultiplier(3);
    auto tenX = makeMultiplier(10);

    std::cout << "triple(5) = " << triple(5) << std::endl;
    std::cout << "tenX(5)   = " << tenX(5) << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`triple(5) = 15
tenX(5)   = 50`}</OutputBlock>

      <NoteBlock type="tip" title="IIFE — Immediately Invoked Function Expression">
        <p>
          You can define and call a lambda in one expression. This is useful for initializing
          complex const variables: <code>const auto x = [&amp;]() {'{ /* compute */ return value; }'}();</code>.
          The trailing <code>()</code> invokes the lambda immediately.
        </p>
      </NoteBlock>

      <WarningBlock title="Dangling Reference Captures">
        <p>
          If a lambda captures a local variable by reference and outlives that variable (for
          example, returned from a function), the reference dangles. Capture by value or ensure the
          lambda does not escape the variable's scope.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Prefer Lambdas Over Function Pointers">
        <p>
          Lambdas are more readable, can capture context, and the compiler can often inline them
          for better performance. Use lambdas for short callbacks and predicates. Only fall back to
          function pointers for C API interop or when captures are not needed.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Filter a Vector"
        difficulty="intermediate"
        prompt="Write a function filter that takes a std::vector<int> and a predicate (std::function<bool(int)>) and returns a new vector containing only elements for which the predicate returns true. Demonstrate it with a lambda that keeps only even numbers."
        hints={[
          "The filter function iterates through the input and pushes matching elements to a result vector",
          "An even-number predicate: [](int x) { return x % 2 == 0; }",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <vector>
#include <functional>

std::vector<int> filter(const std::vector<int>& vec,
                        std::function<bool(int)> pred) {
    std::vector<int> result;
    for (int x : vec) {
        if (pred(x)) {
            result.push_back(x);
        }
    }
    return result;
}

int main() {
    std::vector<int> nums = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    auto evens = filter(nums, [](int x) { return x % 2 == 0; });

    for (int n : evens) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ExerciseBlock
        title="Accumulate with a Lambda"
        difficulty="intermediate"
        prompt="Use std::accumulate from <numeric> with a lambda to compute the product of all elements in a vector of integers. Print the result."
        hints={[
          "std::accumulate takes begin, end, initial value, and a binary operation",
          "The initial value for multiplication is 1",
          "The lambda takes two ints and returns their product",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::vector<int> nums = {1, 2, 3, 4, 5};

    int product = std::accumulate(nums.begin(), nums.end(), 1,
                                  [](int a, int b) { return a * b; });

    std::cout << "Product: " << product << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Lambda expressions', url: 'https://en.cppreference.com/w/cpp/language/lambda', description: 'Complete lambda syntax and semantics' },
        { type: 'cppreference', title: 'std::function', url: 'https://en.cppreference.com/w/cpp/utility/functional/function', description: 'Type-erased callable wrapper' },
        { type: 'textbook', title: 'Effective Modern C++', author: 'Scott Meyers', description: 'Item 31: Avoid default capture modes — Item 34: Prefer lambdas to std::bind' },
      ]} />
    </div>
  )
}
