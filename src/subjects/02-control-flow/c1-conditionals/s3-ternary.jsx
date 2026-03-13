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

export default function S3Ternary() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The conditional (ternary) operator is a compact way to choose between two values based on a
        condition. It is the only C++ operator that takes three operands, which is why it is called
        "ternary."
      </p>

      <DefinitionBlock title="Ternary Operator">
        <p>
          The ternary operator <code>condition ? expr_if_true : expr_if_false</code> evaluates the
          condition. If <code>true</code>, it yields the first expression; if <code>false</code>, it
          yields the second. Unlike <code>if</code>/<code>else</code>, the ternary operator is an
          expression, so it produces a value.
        </p>
      </DefinitionBlock>

      <SyntaxBlock title="Ternary Syntax">
        <CppCode>{`result = (condition) ? value_if_true : value_if_false;`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic Usage</h2>

      <CppCode title="ternary_basic.cpp">{`#include <iostream>

int main() {
    int age = 20;

    std::string status = (age >= 18) ? "adult" : "minor";
    std::cout << "You are an " << status << "." << std::endl;

    // Ternary directly in output
    std::cout << "Can vote: " << (age >= 18 ? "yes" : "no") << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`You are an adult.
Can vote: yes`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Ternary for Initialization</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        One of the best uses of the ternary operator is initializing <code>const</code> variables.
        Without the ternary, you would need a mutable variable or a helper function.
      </p>

      <CppCode title="const_init.cpp">{`#include <iostream>
#include <string>

int main() {
    int temperature = 35;

    // Without ternary: requires mutable variable
    // std::string weather;
    // if (temperature > 30) weather = "hot";
    // else weather = "comfortable";

    // With ternary: const initialization in one line
    const std::string weather = (temperature > 30) ? "hot" : "comfortable";

    std::cout << "The weather is " << weather << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`The weather is hot`}</OutputBlock>

      <BestPracticeBlock title="Use ternary for simple const initialization">
        <p>
          The ternary operator shines when you need to initialize a <code>const</code> variable
          conditionally. This keeps the variable immutable and the code concise. For anything more
          complex, use an <code>if</code>/<code>else</code> block or an immediately-invoked lambda.
        </p>
      </BestPracticeBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Nested Ternary</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        You can nest ternary operators, but doing so quickly becomes unreadable. Most style guides
        discourage nested ternaries.
      </p>

      <CppCode title="nested_ternary.cpp">{`#include <iostream>

int main() {
    int score = 85;

    // Nested ternary -- hard to read
    std::string grade = (score >= 90) ? "A"
                      : (score >= 80) ? "B"
                      : (score >= 70) ? "C"
                      : "F";

    std::cout << "Grade: " << grade << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`Grade: B`}</OutputBlock>

      <WarningBlock title="Avoid nested ternaries">
        <p>
          Nested ternaries are legal but damage readability. If you have more than one level of
          nesting, use <code>if</code>/<code>else if</code>/<code>else</code> or a <code>switch</code> instead.
          Your teammates (and future you) will thank you.
        </p>
      </WarningBlock>

      <NoteBlock type="info" title="Type matching">
        <p>
          Both branches of the ternary must yield compatible types. The compiler determines a common
          type from the two expressions. If the types are incompatible (e.g., <code>int</code> and
          <code>std::string</code>), the code will not compile.
        </p>
      </NoteBlock>

      <NoteBlock type="tip" title="Ternary as an lvalue">
        <p>
          In C++, ternary expressions can sometimes be used as lvalues (assignable
          targets): <code>(condition ? a : b) = 42;</code> is valid when both <code>a</code> and
          <code>b</code> are lvalues. This is an unusual pattern but can be useful in certain situations.
        </p>
      </NoteBlock>

      <CppCode title="ternary_lvalue.cpp">{`#include <iostream>

int main() {
    int x = 1, y = 2;
    bool pickX = true;

    // Assign to whichever variable is selected
    (pickX ? x : y) = 100;

    std::cout << "x = " << x << ", y = " << y << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`x = 100, y = 2`}</OutputBlock>

      <ExerciseBlock
        title="Absolute Value with Ternary"
        difficulty="beginner"
        prompt="Write a program that computes the absolute value of an integer using the ternary operator, without calling std::abs."
        hints={[
          "If the number is negative, negate it; otherwise keep it",
          "Use: (n < 0) ? -n : n",
        ]}
        solution={
          <CppCode>{`#include <iostream>

int main() {
    int n = -42;

    int absolute = (n < 0) ? -n : n;
    std::cout << "Absolute value of " << n << " is " << absolute << std::endl;

    return 0;
}`}</CppCode>
        }
      />

      <ExerciseBlock
        title="Clamp a Value"
        difficulty="intermediate"
        prompt="Write a program that clamps an integer to the range [0, 100] using ternary operators. If the value is below 0, set it to 0. If above 100, set it to 100."
        hints={[
          "You can chain two ternary operations",
          "First check if value < 0, then check if value > 100",
        ]}
        solution={
          <CppCode>{`#include <iostream>

int main() {
    int value = 150;

    int clamped = (value < 0) ? 0 : (value > 100) ? 100 : value;
    std::cout << value << " clamped to [0,100] = " << clamped << std::endl;

    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Conditional operator', url: 'https://en.cppreference.com/w/cpp/language/operator_other#Conditional_operator', description: 'Full documentation of the ternary conditional operator' },
        { type: 'cppreference', title: 'Value categories', url: 'https://en.cppreference.com/w/cpp/language/value_category', description: 'Understanding lvalues, rvalues, and when ternary yields an lvalue' },
        { type: 'textbook', title: 'C++ Primer', author: 'Stanley Lippman', description: 'Section 4.7: The Conditional Operator' },
      ]} />
    </div>
  )
}
