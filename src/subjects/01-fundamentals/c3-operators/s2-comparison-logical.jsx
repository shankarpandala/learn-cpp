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

export default function S2ComparisonLogical() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Comparison and logical operators are the foundation of decision-making in C++. They
        produce boolean results (<code>true</code> or <code>false</code>) that control program
        flow through conditionals and loops.
      </p>

      <DefinitionBlock title="Comparison Operators">
        <p>
          Comparison operators compare two values and return a <code>bool</code>. C++ provides
          six comparison operators: equal to (<code>==</code>), not equal to (<code>!=</code>),
          less than (<code>&lt;</code>), greater than (<code>&gt;</code>), less than or
          equal (<code>&lt;=</code>), and greater than or equal (<code>&gt;=</code>).
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Comparison Operators</h2>

      <CppCode title="comparisons.cpp">{`#include <iostream>
#include <string>

int main() {
    int a = 10, b = 20;

    std::cout << std::boolalpha;  // print true/false instead of 1/0
    std::cout << "a == b: " << (a == b) << std::endl;
    std::cout << "a != b: " << (a != b) << std::endl;
    std::cout << "a <  b: " << (a < b)  << std::endl;
    std::cout << "a >  b: " << (a > b)  << std::endl;
    std::cout << "a <= b: " << (a <= b) << std::endl;
    std::cout << "a >= b: " << (a >= b) << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`a == b: false
a != b: true
a <  b: true
a >  b: false
a <= b: true
a >= b: false`}</OutputBlock>

      <WarningBlock title="== vs = is a Common Mistake">
        <p>
          Writing <code>if (x = 5)</code> instead of <code>if (x == 5)</code> is a classic bug.
          The single <code>=</code> assigns 5 to <code>x</code> and the expression evaluates
          to <code>true</code> (since 5 is nonzero). Most compilers will warn about this if
          you enable warnings with <code>-Wall</code>.
        </p>
      </WarningBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Logical Operators</h2>

      <DefinitionBlock title="Logical Operators">
        <p>
          Logical operators combine or negate boolean expressions. Logical AND (<code>&&</code>)
          returns <code>true</code> when both operands are true. Logical OR (<code>||</code>)
          returns <code>true</code> when at least one operand is true. Logical NOT (<code>!</code>)
          inverts a boolean value.
        </p>
      </DefinitionBlock>

      <CppCode title="logical_operators.cpp">{`#include <iostream>

int main() {
    int age = 25;
    bool hasLicense = true;
    bool isInsured = false;

    std::cout << std::boolalpha;

    // AND: both must be true
    std::cout << "Can drive (age >= 16 && license): "
              << (age >= 16 && hasLicense) << std::endl;

    // OR: at least one must be true
    std::cout << "Has coverage (license || insured): "
              << (hasLicense || isInsured) << std::endl;

    // NOT: inverts the value
    std::cout << "Not insured: " << !isInsured << std::endl;

    // Combining operators
    bool canRent = (age >= 21) && hasLicense && isInsured;
    std::cout << "Can rent a car: " << canRent << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`Can drive (age >= 16 && license): true
Has coverage (license || insured): true
Not insured: true
Can rent a car: false`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Short-Circuit Evaluation</h2>

      <NoteBlock type="important" title="Short-Circuit Evaluation">
        <p>
          C++ evaluates logical expressions from left to right and <strong>stops as soon as the
          result is determined</strong>. With <code>&&</code>, if the left operand is false, the
          right operand is never evaluated. With <code>||</code>, if the left operand is true,
          the right operand is skipped. This is useful for guarding against errors.
        </p>
      </NoteBlock>

      <CppCode title="short_circuit.cpp">{`#include <iostream>

int main() {
    int denominator = 0;

    // Short-circuit prevents division by zero
    if (denominator != 0 && (100 / denominator) > 5) {
        std::cout << "Result is greater than 5" << std::endl;
    } else {
        std::cout << "Denominator is zero, division skipped" << std::endl;
    }

    // With OR, first true stops evaluation
    bool found = true;
    if (found || (std::cout << "This never prints", false)) {
        std::cout << "Found early, no further checks" << std::endl;
    }

    return 0;
}`}</CppCode>

      <OutputBlock>{`Denominator is zero, division skipped
Found early, no further checks`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Operator Precedence</h2>

      <SyntaxBlock title="Precedence Order (High to Low)">
        <p>
          When mixing operators, precedence determines the order of evaluation. From highest
          to lowest among common operators:
        </p>
        <CppCode>{`!          // NOT (highest among logical)
* / %      // Multiplicative
+ -        // Additive
< <= > >=  // Relational
== !=      // Equality
&&         // Logical AND
||         // Logical OR (lowest)`}</CppCode>
      </SyntaxBlock>

      <BestPracticeBlock title="Use Parentheses for Clarity">
        <p>
          Even when operator precedence gives you the correct result, adding parentheses makes
          your intent explicit and prevents mistakes. Write <code>(a &gt; 0) && (b &lt; 10)</code>
          rather than relying on the reader to know that comparison binds tighter than logical AND.
        </p>
      </BestPracticeBlock>

      <NoteBlock type="tip" title="Comparing Floating-Point Numbers">
        <p>
          Due to rounding errors, avoid comparing floating-point numbers with <code>==</code>.
          Instead, check if the difference is within a small tolerance:
          <code> std::abs(a - b) &lt; 0.0001</code>
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Leap Year Checker"
        difficulty="intermediate"
        prompt="Write a program that checks whether the year 2024 is a leap year. A year is a leap year if it is divisible by 4, except for years divisible by 100, unless also divisible by 400."
        hints={[
          "Use % to check divisibility (year % 4 == 0)",
          "Combine conditions with && and || to match the rule",
          "The full condition: (divisible by 400) OR (divisible by 4 AND NOT divisible by 100)",
        ]}
        solution={
          <CppCode>{`#include <iostream>

int main() {
    int year = 2024;

    bool isLeap = (year % 400 == 0) ||
                  (year % 4 == 0 && year % 100 != 0);

    std::cout << year << " is "
              << (isLeap ? "a leap year" : "not a leap year")
              << std::endl;

    return 0;
}`}</CppCode>
        }
      />

      <ExerciseBlock
        title="Grade Classifier"
        difficulty="beginner"
        prompt="Write a program that takes a score of 85 and prints whether it falls in the A (90-100), B (80-89), C (70-79), D (60-69), or F (below 60) range using comparison and logical operators."
        hints={[
          "Use >= and < to check ranges",
          "Combine with && for range checks like (score >= 80 && score < 90)",
        ]}
        solution={
          <CppCode>{`#include <iostream>

int main() {
    int score = 85;

    if (score >= 90 && score <= 100) {
        std::cout << "Grade: A" << std::endl;
    } else if (score >= 80) {
        std::cout << "Grade: B" << std::endl;
    } else if (score >= 70) {
        std::cout << "Grade: C" << std::endl;
    } else if (score >= 60) {
        std::cout << "Grade: D" << std::endl;
    } else {
        std::cout << "Grade: F" << std::endl;
    }

    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Comparison Operators', url: 'https://en.cppreference.com/w/cpp/language/operator_comparison', description: 'Reference for all comparison operators' },
        { type: 'cppreference', title: 'Logical Operators', url: 'https://en.cppreference.com/w/cpp/language/operator_logical', description: 'Logical AND, OR, and NOT operators' },
        { type: 'cppreference', title: 'Operator Precedence', url: 'https://en.cppreference.com/w/cpp/language/operator_precedence', description: 'Complete precedence and associativity table' },
      ]} />
    </div>
  )
}
