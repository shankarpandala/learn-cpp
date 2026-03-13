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

export default function S1IfElse() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Conditional statements let your program make decisions. The <code>if</code> statement is the
        most fundamental control flow construct in C++ -- it executes a block of code only when a
        given condition is true.
      </p>

      <DefinitionBlock title="Conditional Statement">
        <p>
          A conditional statement evaluates a boolean expression and directs program execution along
          different paths based on whether the expression is <code>true</code> or <code>false</code>.
          In C++, any non-zero value is considered <code>true</code> and zero is <code>false</code>.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic if / else if / else</h2>

      <SyntaxBlock title="if Statement Syntax">
        <p>
          The <code>if</code> keyword is followed by a condition in parentheses. An optional
          <code>else if</code> tests another condition, and <code>else</code> handles the remaining case.
        </p>
        <CppCode>{`if (condition1) {
    // runs when condition1 is true
} else if (condition2) {
    // runs when condition1 is false AND condition2 is true
} else {
    // runs when all conditions above are false
}`}</CppCode>
      </SyntaxBlock>

      <CppCode title="grade_checker.cpp">{`#include <iostream>

int main() {
    int score = 85;

    if (score >= 90) {
        std::cout << "Grade: A" << std::endl;
    } else if (score >= 80) {
        std::cout << "Grade: B" << std::endl;
    } else if (score >= 70) {
        std::cout << "Grade: C" << std::endl;
    } else {
        std::cout << "Grade: F" << std::endl;
    }

    return 0;
}`}</CppCode>

      <OutputBlock>{`Grade: B`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Nested Conditionals</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        You can place <code>if</code> statements inside other <code>if</code> statements. While
        sometimes necessary, deeply nested conditionals hurt readability. Consider restructuring
        with early returns or logical operators when nesting gets deep.
      </p>

      <CppCode title="nested_if.cpp">{`#include <iostream>

int main() {
    int age = 25;
    bool hasLicense = true;

    if (age >= 18) {
        if (hasLicense) {
            std::cout << "You can drive." << std::endl;
        } else {
            std::cout << "You need a license first." << std::endl;
        }
    } else {
        std::cout << "You are too young to drive." << std::endl;
    }

    return 0;
}`}</CppCode>

      <OutputBlock>{`You can drive.`}</OutputBlock>

      <BestPracticeBlock title="Flatten nested conditionals">
        <p>
          Prefer combining conditions with logical operators (<code>&&</code>, <code>||</code>) over
          deep nesting. For example, <code>if (age &gt;= 18 && hasLicense)</code> is clearer than two
          nested <code>if</code> blocks. In functions, use early returns to reduce nesting.
        </p>
      </BestPracticeBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Init-Statement in if (C++17)</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++17 introduced the ability to declare and initialize a variable directly inside the
        <code>if</code> statement. The variable's scope is limited to the <code>if</code>/<code>else</code> block,
        preventing it from leaking into the surrounding scope.
      </p>

      <CppCode title="if_init.cpp">{`#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> ages = {{"Alice", 30}, {"Bob", 25}};

    // C++17: init-statement in if
    if (auto it = ages.find("Alice"); it != ages.end()) {
        std::cout << it->first << " is " << it->second << std::endl;
    } else {
        std::cout << "Name not found" << std::endl;
    }
    // 'it' is not accessible here -- its scope ended with the if/else block

    return 0;
}`}</CppCode>

      <OutputBlock>{`Alice is 30`}</OutputBlock>

      <CompilerNoteBlock compiler="all" title="C++17 Required">
        <p>
          The init-statement in <code>if</code> requires C++17 or later. Compile
          with <code>-std=c++17</code> (GCC/Clang) or <code>/std:c++17</code> (MSVC).
        </p>
      </CompilerNoteBlock>

      <NoteBlock type="important" title="Comparison Pitfalls">
        <p>
          A common mistake is using <code>=</code> (assignment) instead of <code>==</code> (comparison).
          Writing <code>if (x = 5)</code> assigns 5 to <code>x</code> and always evaluates
          to <code>true</code>. Modern compilers warn about this, but you can also place the
          literal on the left: <code>if (5 == x)</code> so that a typo causes a compiler error.
        </p>
      </NoteBlock>

      <NoteBlock type="tip" title="Comparing floating-point values">
        <p>
          Never compare floating-point numbers with <code>==</code>. Due to rounding errors,
          use a tolerance instead: <code>if (std::abs(a - b) &lt; 1e-9)</code>.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Classify a Number"
        difficulty="beginner"
        prompt="Write a program that reads an integer and prints whether it is positive, negative, or zero."
        hints={[
          "Use if / else if / else with comparisons against 0",
          "std::cin >> n reads an integer from the user",
        ]}
        solution={
          <CppCode>{`#include <iostream>

int main() {
    int n;
    std::cout << "Enter a number: ";
    std::cin >> n;

    if (n > 0) {
        std::cout << "Positive" << std::endl;
    } else if (n < 0) {
        std::cout << "Negative" << std::endl;
    } else {
        std::cout << "Zero" << std::endl;
    }

    return 0;
}`}</CppCode>
        }
      />

      <ExerciseBlock
        title="Leap Year Checker"
        difficulty="intermediate"
        prompt="Write a program that determines if a given year is a leap year. A year is a leap year if it is divisible by 4, except century years must also be divisible by 400."
        hints={[
          "A year divisible by 400 is always a leap year",
          "A year divisible by 100 but not 400 is NOT a leap year",
          "A year divisible by 4 but not 100 is a leap year",
        ]}
        solution={
          <CppCode>{`#include <iostream>

int main() {
    int year = 2024;

    if (year % 400 == 0) {
        std::cout << year << " is a leap year" << std::endl;
    } else if (year % 100 == 0) {
        std::cout << year << " is not a leap year" << std::endl;
    } else if (year % 4 == 0) {
        std::cout << year << " is a leap year" << std::endl;
    } else {
        std::cout << year << " is not a leap year" << std::endl;
    }

    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'if statement', url: 'https://en.cppreference.com/w/cpp/language/if', description: 'Full documentation of if, else if, else, and C++17 init-statement' },
        { type: 'cppreference', title: 'Comparison operators', url: 'https://en.cppreference.com/w/cpp/language/operator_comparison', description: 'Equality and relational operators' },
        { type: 'textbook', title: 'A Tour of C++', author: 'Bjarne Stroustrup', description: 'Chapter 1: conditional execution basics' },
      ]} />
    </div>
  )
}
