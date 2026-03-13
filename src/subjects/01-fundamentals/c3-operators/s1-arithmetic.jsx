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

export default function S1Arithmetic() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Arithmetic operators let you perform mathematical calculations in C++. Understanding how
        they behave with different data types — especially the difference between integer and
        floating-point division — is essential for writing correct programs.
      </p>

      <DefinitionBlock title="Arithmetic Operators">
        <p>
          C++ provides five basic arithmetic operators: addition (<code>+</code>),
          subtraction (<code>-</code>), multiplication (<code>*</code>),
          division (<code>/</code>), and modulo (<code>%</code>). These work on numeric
          types and follow standard mathematical precedence rules.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic Arithmetic</h2>

      <CppCode title="arithmetic_basics.cpp">{`#include <iostream>

int main() {
    int a = 17, b = 5;

    std::cout << "a + b = " << (a + b) << std::endl;
    std::cout << "a - b = " << (a - b) << std::endl;
    std::cout << "a * b = " << (a * b) << std::endl;
    std::cout << "a / b = " << (a / b) << std::endl;
    std::cout << "a % b = " << (a % b) << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`a + b = 22
a - b = 12
a * b = 85
a / b = 3
a % b = 2`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Integer vs Floating-Point Division</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        When both operands of <code>/</code> are integers, C++ performs <strong>integer division</strong>,
        which truncates the result toward zero. To get a decimal result, at least one operand must
        be a floating-point type.
      </p>

      <CppCode title="division_types.cpp">{`#include <iostream>

int main() {
    std::cout << "Integer:  17 / 5  = " << (17 / 5) << std::endl;
    std::cout << "Float:    17.0 / 5 = " << (17.0 / 5) << std::endl;
    std::cout << "Cast:     " << static_cast<double>(17) / 5 << std::endl;

    // Negative integer division truncates toward zero
    std::cout << "Negative: -17 / 5 = " << (-17 / 5) << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`Integer:  17 / 5  = 3
Float:    17.0 / 5 = 3.4
Cast:     3.4
Negative: -17 / 5 = -3`}</OutputBlock>

      <WarningBlock title="Division by Zero">
        <p>
          Dividing an integer by zero causes <strong>undefined behavior</strong> — your program may
          crash, produce garbage, or behave unpredictably. Floating-point division by zero produces
          infinity or NaN. Always validate divisors before dividing.
        </p>
      </WarningBlock>

      <SyntaxBlock title="The Modulo Operator (%)">
        <p>
          The modulo operator returns the <strong>remainder</strong> of integer division. It only
          works with integer types. The result has the same sign as the dividend (left operand).
        </p>
        <CppCode>{`int remainder = 17 % 5;   // 2
int negative  = -17 % 5;  // -2`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Increment and Decrement</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The <code>++</code> and <code>--</code> operators add or subtract 1 from a variable. The
        prefix form (<code>++x</code>) modifies the variable and returns the <em>new</em> value,
        while the postfix form (<code>x++</code>) returns the <em>original</em> value, then modifies it.
      </p>

      <CppCode title="increment_decrement.cpp">{`#include <iostream>

int main() {
    int x = 5;

    std::cout << "x     = " << x << std::endl;
    std::cout << "++x   = " << ++x << std::endl;  // x is now 6, returns 6
    std::cout << "x++   = " << x++ << std::endl;  // returns 6, then x becomes 7
    std::cout << "x now = " << x << std::endl;

    std::cout << "--x   = " << --x << std::endl;  // x is now 6, returns 6

    return 0;
}`}</CppCode>

      <OutputBlock>{`x     = 5
++x   = 6
x++   = 6
x now = 7
--x   = 6`}</OutputBlock>

      <BestPracticeBlock title="Prefer prefix increment">
        <p>
          When you do not need the old value, prefer <code>++x</code> over <code>x++</code>.
          For built-in types the difference is negligible, but for iterators and user-defined types,
          prefix increment avoids creating an unnecessary temporary copy.
        </p>
      </BestPracticeBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Compound Assignment Operators</h2>

      <SyntaxBlock title="Compound Assignment">
        <p>
          Compound assignment operators combine an arithmetic operation with assignment. They are
          shorthand that makes code more concise and sometimes more efficient.
        </p>
        <CppCode>{`x += 5;   // same as x = x + 5
x -= 3;   // same as x = x - 3
x *= 2;   // same as x = x * 2
x /= 4;   // same as x = x / 4
x %= 3;   // same as x = x % 3`}</CppCode>
      </SyntaxBlock>

      <CppCode title="compound_assignment.cpp">{`#include <iostream>

int main() {
    int score = 100;

    score += 25;
    std::cout << "After +25: " << score << std::endl;

    score -= 10;
    std::cout << "After -10: " << score << std::endl;

    score *= 2;
    std::cout << "After *2:  " << score << std::endl;

    score /= 3;
    std::cout << "After /3:  " << score << std::endl;

    score %= 7;
    std::cout << "After %7:  " << score << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`After +25: 125
After -10: 115
After *2:  230
After /3:  76
After %7:  6`}</OutputBlock>

      <NoteBlock type="tip" title="Operator Precedence">
        <p>
          Multiplication, division, and modulo have higher precedence than addition and subtraction,
          just like in mathematics. Use parentheses to make your intent clear:
          <code> int result = (a + b) * c;</code>
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Temperature Converter"
        difficulty="beginner"
        prompt="Write a program that converts a Celsius temperature of 37 to Fahrenheit using the formula F = C * 9 / 5 + 32. Make sure to use floating-point division to get an accurate result."
        hints={[
          "Use a double variable to store the Celsius value",
          "Multiply by 9.0 (not 9) to force floating-point division",
        ]}
        solution={
          <CppCode>{`#include <iostream>

int main() {
    double celsius = 37.0;
    double fahrenheit = celsius * 9.0 / 5.0 + 32.0;

    std::cout << celsius << " C = " << fahrenheit << " F" << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ExerciseBlock
        title="Digit Extractor"
        difficulty="intermediate"
        prompt="Given the integer 7364, use division and modulo to extract and print each digit separately (ones, tens, hundreds, thousands)."
        hints={[
          "The ones digit is number % 10",
          "Divide by 10 to shift digits right, then use % 10 again",
        ]}
        solution={
          <CppCode>{`#include <iostream>

int main() {
    int number = 7364;

    int ones      = number % 10;
    int tens      = (number / 10) % 10;
    int hundreds  = (number / 100) % 10;
    int thousands = (number / 1000) % 10;

    std::cout << "Thousands: " << thousands << std::endl;
    std::cout << "Hundreds:  " << hundreds << std::endl;
    std::cout << "Tens:      " << tens << std::endl;
    std::cout << "Ones:      " << ones << std::endl;

    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Arithmetic Operators', url: 'https://en.cppreference.com/w/cpp/language/operator_arithmetic', description: 'Complete reference for C++ arithmetic operators' },
        { type: 'cppreference', title: 'Operator Precedence', url: 'https://en.cppreference.com/w/cpp/language/operator_precedence', description: 'Full operator precedence table' },
        { type: 'textbook', title: 'Programming: Principles and Practice Using C++', author: 'Bjarne Stroustrup', description: 'Chapter 3: Objects, Types, and Values' },
      ]} />
    </div>
  )
}
