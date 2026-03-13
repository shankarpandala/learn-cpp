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

export default function S1ForWhile() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Loops let you repeat a block of code multiple times. C++ provides three loop constructs:
        the <code>for</code> loop for counted iteration, the <code>while</code> loop for
        condition-based repetition, and the <code>do-while</code> loop when the body must execute
        at least once.
      </p>

      <DefinitionBlock title="Loop">
        <p>
          A loop is a control flow structure that repeatedly executes a block of code as long as a
          specified condition remains <code>true</code>. Each execution of the loop body is called
          an <strong>iteration</strong>.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">The for Loop</h2>

      <SyntaxBlock title="for Loop Syntax">
        <p>
          The <code>for</code> loop bundles initialization, condition, and increment into one line.
          The loop variable is scoped to the loop body.
        </p>
        <CppCode>{`for (init; condition; increment) {
    // body -- runs while condition is true
}`}</CppCode>
      </SyntaxBlock>

      <CppCode title="for_loop.cpp">{`#include <iostream>

int main() {
    // Print numbers 1 through 5
    for (int i = 1; i <= 5; ++i) {
        std::cout << i << " ";
    }
    std::cout << std::endl;

    // Counting backwards
    for (int i = 5; i >= 1; --i) {
        std::cout << i << " ";
    }
    std::cout << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`1 2 3 4 5
5 4 3 2 1`}</OutputBlock>

      <NoteBlock type="tip" title="Prefer prefix increment">
        <p>
          Use <code>++i</code> rather than <code>i++</code> in loop headers. For integers there is no
          performance difference, but for iterators and custom types, prefix increment avoids creating
          an unnecessary temporary copy.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">The while Loop</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The <code>while</code> loop checks its condition before each iteration. Use it when you do
        not know in advance how many times the loop should run.
      </p>

      <CppCode title="while_loop.cpp">{`#include <iostream>

int main() {
    // Collatz conjecture: repeat until n reaches 1
    int n = 6;
    std::cout << n;

    while (n != 1) {
        if (n % 2 == 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        std::cout << " -> " << n;
    }
    std::cout << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`6 -> 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">The do-while Loop</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The <code>do-while</code> loop executes the body first, then checks the condition. This
        guarantees at least one iteration, which is useful for input validation.
      </p>

      <CppCode title="do_while.cpp">{`#include <iostream>

int main() {
    int guess;

    do {
        std::cout << "Enter a number between 1 and 10: ";
        std::cin >> guess;
    } while (guess < 1 || guess > 10);

    std::cout << "You entered: " << guess << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`Enter a number between 1 and 10: 15
Enter a number between 1 and 10: 7
You entered: 7`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Infinite Loops</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Sometimes you need a loop that runs until explicitly stopped with <code>break</code>. Both
        <code>for(;;)</code> and <code>while(true)</code> create infinite loops.
      </p>

      <CppCode title="infinite_loop.cpp">{`#include <iostream>

int main() {
    int sum = 0;

    while (true) {
        int val;
        std::cout << "Enter a number (0 to stop): ";
        std::cin >> val;

        if (val == 0) break;
        sum += val;
    }

    std::cout << "Total: " << sum << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`Enter a number (0 to stop): 5
Enter a number (0 to stop): 3
Enter a number (0 to stop): 0
Total: 8`}</OutputBlock>

      <WarningBlock title="Avoid accidental infinite loops">
        <p>
          Ensure your loop condition will eventually become <code>false</code>, or that there is a
          <code>break</code> path. A common mistake is forgetting to update the loop variable,
          causing the program to hang.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Choosing the right loop">
        <p>
          Use <code>for</code> when you know the number of iterations. Use <code>while</code> when
          looping until a condition changes. Use <code>do-while</code> when the body must run at
          least once (e.g., menu prompts, input validation). Keep loop variable declarations as
          local as possible.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Factorial Calculator"
        difficulty="beginner"
        prompt="Write a program that calculates the factorial of an integer n (n!) using a for loop."
        hints={[
          "Factorial of 0 is 1, factorial of n is 1 * 2 * ... * n",
          "Use a long long to hold the result for larger values",
        ]}
        solution={
          <CppCode>{`#include <iostream>

int main() {
    int n = 6;
    long long factorial = 1;

    for (int i = 2; i <= n; ++i) {
        factorial *= i;
    }

    std::cout << n << "! = " << factorial << std::endl;

    return 0;
}`}</CppCode>
        }
      />

      <ExerciseBlock
        title="FizzBuzz"
        difficulty="beginner"
        prompt="Print numbers from 1 to 30. For multiples of 3, print 'Fizz' instead. For multiples of 5, print 'Buzz'. For multiples of both, print 'FizzBuzz'."
        hints={[
          "Check divisibility by 15 first (multiples of both 3 and 5)",
          "Use the modulo operator %",
        ]}
        solution={
          <CppCode>{`#include <iostream>

int main() {
    for (int i = 1; i <= 30; ++i) {
        if (i % 15 == 0) std::cout << "FizzBuzz";
        else if (i % 3 == 0) std::cout << "Fizz";
        else if (i % 5 == 0) std::cout << "Buzz";
        else std::cout << i;
        std::cout << " ";
    }
    std::cout << std::endl;

    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'for loop', url: 'https://en.cppreference.com/w/cpp/language/for', description: 'Full for loop documentation' },
        { type: 'cppreference', title: 'while loop', url: 'https://en.cppreference.com/w/cpp/language/while', description: 'while and do-while loop documentation' },
        { type: 'textbook', title: 'Programming: Principles and Practice Using C++', author: 'Bjarne Stroustrup', description: 'Chapter 4: Computation - iteration' },
      ]} />
    </div>
  )
}
