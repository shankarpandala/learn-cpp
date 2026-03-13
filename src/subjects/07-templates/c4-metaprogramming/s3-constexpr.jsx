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

export default function S3Constexpr() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The <code>constexpr</code> keyword enables computation at compile time, blurring the line between
        runtime code and metaprogramming. What once required complex template recursion can now be written
        as straightforward functions that the compiler evaluates during compilation, producing faster
        executables with zero runtime overhead.
      </p>

      <DefinitionBlock title="constexpr">
        <p>
          <strong>constexpr</strong> specifies that the value of a variable or the return value of a
          function <em>can</em> be evaluated at compile time. A <code>constexpr</code> function may also
          be called at runtime. The compiler guarantees compile-time evaluation when the result is used
          in a context that requires a constant expression (e.g., array sizes, template arguments).
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">constexpr Variables</h2>

      <SyntaxBlock title="constexpr variable rules">
        <p>
          A <code>constexpr</code> variable must be initialized with a constant expression and its type
          must be a literal type. Unlike <code>const</code>, <code>constexpr</code> guarantees compile-time
          evaluation.
        </p>
        <CppCode>{`constexpr int maxSize = 100;           // compile-time constant
constexpr double pi = 3.14159265359;  // compile-time constant
constexpr int doubled = maxSize * 2;  // computed at compile time

// const does NOT guarantee compile-time evaluation:
const int runtime = someFunction();   // OK: evaluated at runtime
// constexpr int ct = someFunction(); // Error if someFunction is not constexpr`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">constexpr Functions</h2>

      <CppCode title="Compile-time factorial">{`#include <iostream>

constexpr long long factorial(int n) {
    long long result = 1;
    for (int i = 2; i <= n; ++i)
        result *= i;
    return result;
}

int main() {
    // Compile-time evaluation: used as template argument
    constexpr auto f10 = factorial(10);
    static_assert(f10 == 3628800, "factorial(10) should be 3628800");

    std::cout << "10! = " << f10 << std::endl;

    // Runtime evaluation: argument not constexpr
    int n;
    std::cin >> n;
    std::cout << n << "! = " << factorial(n) << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`10! = 3628800`}</OutputBlock>

      <NoteBlock type="info" title="constexpr evolution across standards">
        <p>
          C++11 constexpr functions were limited to a single return statement. C++14 lifted most
          restrictions, allowing loops, local variables, and multiple statements. C++20 further expanded
          capabilities to include virtual functions, try-catch, and <code>std::string</code>/<code>std::vector</code> in
          constexpr contexts.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">if constexpr (C++17)</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>if constexpr</code> evaluates conditions at compile time and discards the untaken branch
        entirely. This is invaluable in templates where the discarded branch might not compile for
        certain types.
      </p>

      <CppCode title="if constexpr for type-based dispatch">{`#include <iostream>
#include <type_traits>
#include <string>

template<typename T>
std::string describe(T val) {
    if constexpr (std::is_integral_v<T>) {
        return "integer: " + std::to_string(val);
    } else if constexpr (std::is_floating_point_v<T>) {
        return "float: " + std::to_string(val);
    } else if constexpr (std::is_same_v<T, std::string>) {
        return "string: " + val;
    } else {
        return "unknown type";
    }
}

int main() {
    std::cout << describe(42) << std::endl;
    std::cout << describe(3.14) << std::endl;
    std::cout << describe(std::string("hello")) << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`integer: 42
float: 3.140000
string: hello`}</OutputBlock>

      <NoteBlock type="important" title="if constexpr vs regular if">
        <p>
          With a regular <code>if</code>, both branches must compile even if the condition is known at
          compile time. With <code>if constexpr</code>, the discarded branch is not instantiated. This
          replaces many SFINAE and tag dispatch patterns with straightforward conditional logic.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">constexpr Containers (C++20)</h2>

      <CppCode title="constexpr std::vector and std::string">{`#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <numeric>

constexpr int sumOfSquares(int n) {
    std::vector<int> v(n);
    std::iota(v.begin(), v.end(), 1);  // 1, 2, ..., n
    int sum = 0;
    for (int x : v)
        sum += x * x;
    return sum;
}

constexpr int countVowels(std::string_view s) {
    int count = 0;
    for (char c : s) {
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')
            ++count;
    }
    return count;
}

int main() {
    constexpr int result = sumOfSquares(5);  // 1+4+9+16+25 = 55
    static_assert(result == 55);
    std::cout << "Sum of squares(5): " << result << std::endl;

    constexpr int vowels = countVowels("hello world");
    static_assert(vowels == 3);
    std::cout << "Vowels in 'hello world': " << vowels << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Sum of squares(5): 55
Vowels in 'hello world': 3`}</OutputBlock>

      <CompilerNoteBlock compiler="all" title="constexpr allocation limitations">
        <p>
          C++20 allows dynamic allocation in constexpr contexts (transient allocation), but all memory
          allocated during constexpr evaluation must be freed before the evaluation ends. You cannot
          store a constexpr <code>std::vector</code> as a global variable because the heap memory
          would need to persist into runtime.
        </p>
      </CompilerNoteBlock>

      <BestPracticeBlock title="Use constexpr by default">
        <p>
          Mark functions and variables <code>constexpr</code> whenever possible. Even if you do not
          need compile-time evaluation today, it keeps the option open and documents that the function
          has no side effects. The compiler can also optimize constexpr-eligible calls more aggressively.
        </p>
      </BestPracticeBlock>

      <NoteBlock type="tip" title="consteval for guaranteed compile-time">
        <p>
          C++20 introduced <code>consteval</code> for functions that <em>must</em> be evaluated at
          compile time. Unlike <code>constexpr</code>, a <code>consteval</code> function cannot be
          called at runtime. Use it when a runtime call would be a programming error, such as
          computing hash values for string literals.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Compile-Time Fibonacci"
        difficulty="intermediate"
        prompt="Write a constexpr function fibonacci(int n) that returns the nth Fibonacci number using a loop (not recursion). Verify with static_assert that fibonacci(10) == 55 and fibonacci(20) == 6765."
        hints={[
          "Use two variables to track the previous two Fibonacci numbers",
          "A simple for loop from 2 to n works well",
          "Remember: fibonacci(0) = 0, fibonacci(1) = 1",
        ]}
        solution={
          <CppCode>{`#include <iostream>

constexpr long long fibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    long long prev = 0, curr = 1;
    for (int i = 2; i <= n; ++i) {
        long long next = prev + curr;
        prev = curr;
        curr = next;
    }
    return curr;
}

static_assert(fibonacci(10) == 55);
static_assert(fibonacci(20) == 6765);

int main() {
    constexpr auto f10 = fibonacci(10);
    constexpr auto f20 = fibonacci(20);
    std::cout << "fib(10) = " << f10 << std::endl;
    std::cout << "fib(20) = " << f20 << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'constexpr specifier', url: 'https://en.cppreference.com/w/cpp/language/constexpr', description: 'constexpr rules for variables and functions' },
        { type: 'cppreference', title: 'if constexpr', url: 'https://en.cppreference.com/w/cpp/language/if#Constexpr_if', description: 'Compile-time conditional statements' },
        { type: 'cppreference', title: 'consteval specifier', url: 'https://en.cppreference.com/w/cpp/language/consteval', description: 'Immediate functions (C++20)' },
      ]} />
    </div>
  )
}
