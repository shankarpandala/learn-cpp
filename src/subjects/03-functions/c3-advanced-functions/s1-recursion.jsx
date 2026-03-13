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

export default function S1Recursion() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        A <strong>recursive function</strong> is one that calls itself. Recursion is a powerful
        technique for problems that can be broken into smaller instances of the same problem, such
        as tree traversal, divide-and-conquer algorithms, and mathematical sequences.
      </p>

      <DefinitionBlock title="Recursion">
        <p>
          A function is <strong>recursive</strong> when it calls itself, directly or indirectly.
          Every correct recursive function needs a <strong>base case</strong> (a condition that
          stops the recursion) and a <strong>recursive case</strong> (the step that reduces the
          problem and makes the recursive call).
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Factorial</h2>

      <SyntaxBlock title="Structure of a Recursive Function">
        <p>
          Every recursive function follows the same pattern: check for the base case first, then
          make a recursive call on a smaller sub-problem.
        </p>
        <CppCode>{`return_type func(params) {
    if (base_case_condition) {
        return base_value;       // stop recursion
    }
    return combine(func(smaller_params));  // recursive step
}`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Factorial">{`#include <iostream>

long long factorial(int n) {
    if (n <= 1) {        // base case
        return 1;
    }
    return n * factorial(n - 1);  // recursive case
}

int main() {
    for (int i = 0; i <= 10; ++i) {
        std::cout << i << "! = " << factorial(i) << std::endl;
    }
    return 0;
}`}</CppCode>

      <OutputBlock>{`0! = 1
1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
6! = 720
7! = 5040
8! = 40320
9! = 362880
10! = 3628800`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Fibonacci</h2>

      <CppCode title="Naive Fibonacci (exponential time)">{`#include <iostream>

int fibonacci(int n) {
    if (n <= 0) return 0;  // base case 1
    if (n == 1) return 1;  // base case 2
    return fibonacci(n - 1) + fibonacci(n - 2);  // two recursive calls
}

int main() {
    for (int i = 0; i <= 10; ++i) {
        std::cout << "fib(" << i << ") = " << fibonacci(i) << std::endl;
    }
    return 0;
}`}</CppCode>

      <OutputBlock>{`fib(0) = 0
fib(1) = 1
fib(2) = 1
fib(3) = 2
fib(4) = 3
fib(5) = 5
fib(6) = 8
fib(7) = 13
fib(8) = 21
fib(9) = 34
fib(10) = 55`}</OutputBlock>

      <WarningBlock title="Exponential Blowup">
        <p>
          The naive Fibonacci implementation recomputes the same values many times.
          <code>fibonacci(30)</code> makes over a million calls. For production use, prefer
          iteration or memoization.
        </p>
      </WarningBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Stack Depth Limits</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Each recursive call adds a <strong>stack frame</strong> containing local variables and
        the return address. The call stack has a finite size (typically 1-8 MB), so very deep
        recursion causes a <strong>stack overflow</strong> — a crash with no graceful recovery.
      </p>

      <NoteBlock type="important" title="Always Have a Base Case">
        <p>
          Forgetting the base case creates infinite recursion. The program will crash with a
          stack overflow or a segmentation fault. Always verify that the recursive case makes
          progress toward the base case.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Tail Recursion</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        A function is <strong>tail recursive</strong> when the recursive call is the very last
        operation. Some compilers can optimize tail recursion into a loop, eliminating extra stack
        frames. However, C++ does not guarantee tail-call optimization.
      </p>

      <CppCode title="Tail-recursive factorial">{`#include <iostream>

long long factorialTail(int n, long long acc = 1) {
    if (n <= 1) return acc;
    return factorialTail(n - 1, n * acc);  // tail position
}

int main() {
    std::cout << "10! = " << factorialTail(10) << std::endl;
    std::cout << "20! = " << factorialTail(20) << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`10! = 3628800
20! = 2432902008176640000`}</OutputBlock>

      <CompilerNoteBlock compiler="gcc" title="Tail Call Optimization">
        <p>
          GCC can optimize tail calls at <code>-O2</code> and above. Clang also supports this.
          However, MSVC rarely performs tail-call optimization. Since C++ does not mandate it,
          do not rely on it for correctness — if stack depth is a concern, use iteration.
        </p>
      </CompilerNoteBlock>

      <BestPracticeBlock title="When to Prefer Iteration">
        <p>
          Use recursion for problems with natural recursive structure (trees, graphs, parsing).
          For simple counting or accumulation (factorial, Fibonacci), an iterative loop is clearer,
          faster, and immune to stack overflow. When in doubt, start with iteration and switch to
          recursion only if it simplifies the code significantly.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Recursive Sum of Digits"
        difficulty="intermediate"
        prompt="Write a recursive function sumDigits(int n) that returns the sum of all digits in a non-negative integer. For example, sumDigits(1234) returns 10."
        hints={[
          "Base case: when n < 10, return n (it is a single digit)",
          "Recursive case: the last digit is n % 10, the remaining digits are n / 10",
        ]}
        solution={
          <CppCode>{`#include <iostream>

int sumDigits(int n) {
    if (n < 10) return n;             // base case: single digit
    return (n % 10) + sumDigits(n / 10);  // last digit + rest
}

int main() {
    std::cout << "sumDigits(1234) = " << sumDigits(1234) << std::endl;
    std::cout << "sumDigits(9999) = " << sumDigits(9999) << std::endl;
    std::cout << "sumDigits(7)    = " << sumDigits(7) << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Function definitions', url: 'https://en.cppreference.com/w/cpp/language/function', description: 'Function definition and recursive calls' },
        { type: 'textbook', title: 'Programming: Principles and Practice Using C++', author: 'Bjarne Stroustrup', description: 'Chapter 8: Functions — recursion' },
        { type: 'textbook', title: 'Introduction to Algorithms', author: 'Cormen, Leiserson, Rivest, Stein', description: 'Chapter 4: Divide-and-Conquer and recursion' },
      ]} />
    </div>
  )
}
