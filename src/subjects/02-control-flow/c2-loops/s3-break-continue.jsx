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

export default function S3BreakContinue() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Sometimes you need finer control over loop execution than the loop condition alone provides.
        The <code>break</code> statement exits a loop immediately, and <code>continue</code> skips
        the rest of the current iteration and moves to the next one.
      </p>

      <DefinitionBlock title="break and continue">
        <p>
          <code>break</code> terminates the innermost enclosing loop or switch statement and
          transfers control to the statement following it. <code>continue</code> skips the remaining
          body of the innermost loop and proceeds to the next iteration (re-evaluating the condition).
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Using break</h2>

      <CppCode title="break_example.cpp">{`#include <iostream>

int main() {
    // Find the first number divisible by 7 above 50
    for (int i = 51; i < 100; ++i) {
        if (i % 7 == 0) {
            std::cout << "First number above 50 divisible by 7: " << i << std::endl;
            break;  // exit the loop immediately
        }
    }

    return 0;
}`}</CppCode>

      <OutputBlock>{`First number above 50 divisible by 7: 56`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Using continue</h2>

      <CppCode title="continue_example.cpp">{`#include <iostream>

int main() {
    // Print only odd numbers from 1 to 10
    for (int i = 1; i <= 10; ++i) {
        if (i % 2 == 0) {
            continue;  // skip even numbers
        }
        std::cout << i << " ";
    }
    std::cout << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`1 3 5 7 9`}</OutputBlock>

      <NoteBlock type="tip" title="continue in different loop types">
        <p>
          In a <code>for</code> loop, <code>continue</code> jumps to the increment expression. In a
          <code>while</code> or <code>do-while</code> loop, it jumps directly to the condition check.
          Be careful with <code>while</code> loops -- if the variable update is after the
          <code>continue</code>, you may create an infinite loop.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Breaking Out of Nested Loops</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Unlike some languages, C++ does not have labeled loops. A <code>break</code> only exits the
        innermost loop. To break out of multiple loops, you have several options.
      </p>

      <CppCode title="nested_break.cpp">{`#include <iostream>

int main() {
    // Approach 1: use a flag variable
    bool found = false;
    for (int i = 0; i < 5 && !found; ++i) {
        for (int j = 0; j < 5; ++j) {
            if (i * j == 12) {
                std::cout << "Found: i=" << i << " j=" << j << std::endl;
                found = true;
                break;  // exits inner loop; flag stops outer loop
            }
        }
    }

    // Approach 2: extract into a function (preferred)
    // The function can simply return when the condition is met.

    return 0;
}`}</CppCode>

      <OutputBlock>{`Found: i=3 j=4`}</OutputBlock>

      <SyntaxBlock title="Lambda for nested loop break">
        <p>
          A clean modern approach uses an immediately-invoked lambda, which lets you
          use <code>return</code> to escape both loops.
        </p>
        <CppCode>{`[&]() {
    for (int i = 0; i < 10; ++i) {
        for (int j = 0; j < 10; ++j) {
            if (someCondition(i, j)) return;  // exits both loops
        }
    }
}();`}</CppCode>
      </SyntaxBlock>

      <BestPracticeBlock title="Prefer extracting functions over goto">
        <p>
          When you need to break out of nested loops, the cleanest solution is extracting the nested
          loops into a separate function and using <code>return</code>. This avoids flags, avoids
          <code>goto</code>, and gives the operation a descriptive name.
        </p>
      </BestPracticeBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">goto: The Last Resort</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++ inherits <code>goto</code> from C. It performs an unconditional jump to a labeled
        statement. While it can break out of deeply nested loops, it makes control flow hard to
        follow and is almost never the right choice.
      </p>

      <CppCode title="goto_example.cpp">{`#include <iostream>

int main() {
    for (int i = 0; i < 5; ++i) {
        for (int j = 0; j < 5; ++j) {
            if (i + j == 6) {
                std::cout << "Found: i=" << i << " j=" << j << std::endl;
                goto done;  // jump to label
            }
        }
    }
done:  // label
    std::cout << "Search complete." << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`Found: i=2 j=4
Search complete.`}</OutputBlock>

      <WarningBlock title="Avoid goto in modern C++">
        <p>
          The <code>goto</code> statement can jump over variable declarations, skip destructors, and
          create spaghetti control flow. The C++ Core Guidelines recommend against using it. Use
          functions, lambdas, or flag variables instead.
        </p>
      </WarningBlock>

      <NoteBlock type="history" title="Dijkstra's famous letter">
        <p>
          In 1968, Edsger Dijkstra published "Go To Statement Considered Harmful," arguing that
          unrestricted use of <code>goto</code> leads to unmaintainable code. This letter was
          influential in promoting structured programming.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Find a Prime"
        difficulty="beginner"
        prompt="Write a program that finds the first prime number greater than 100 using a loop with break."
        hints={[
          "A prime number is only divisible by 1 and itself",
          "For each candidate, check divisibility by 2 through sqrt(candidate)",
          "Use break when you find the first prime",
        ]}
        solution={
          <CppCode>{`#include <iostream>

int main() {
    for (int n = 101; ; ++n) {
        bool isPrime = true;
        for (int d = 2; d * d <= n; ++d) {
            if (n % d == 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            std::cout << "First prime > 100: " << n << std::endl;
            break;
        }
    }

    return 0;
}`}</CppCode>
        }
      />

      <ExerciseBlock
        title="Skip Vowels"
        difficulty="beginner"
        prompt="Write a program that prints all characters of a string except vowels, using continue to skip them."
        hints={[
          "Check if each character is a, e, i, o, or u (consider uppercase too)",
          "Use continue to skip the print statement for vowels",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <string>

int main() {
    std::string text = "Hello World";

    for (char c : text) {
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' ||
            c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U') {
            continue;
        }
        std::cout << c;
    }
    std::cout << std::endl;

    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'break statement', url: 'https://en.cppreference.com/w/cpp/language/break', description: 'Break statement documentation' },
        { type: 'cppreference', title: 'continue statement', url: 'https://en.cppreference.com/w/cpp/language/continue', description: 'Continue statement documentation' },
        { type: 'cppreference', title: 'goto statement', url: 'https://en.cppreference.com/w/cpp/language/goto', description: 'goto and labeled statements' },
      ]} />
    </div>
  )
}
