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

export default function S1ConsoleIO() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Console input and output are how your program communicates with the user. C++ provides
        stream objects in the <code>&lt;iostream&gt;</code> header that make reading input and
        writing output straightforward and type-safe.
      </p>

      <DefinitionBlock title="Standard Stream Objects">
        <p>
          C++ defines three standard streams: <code>std::cout</code> for standard output (typically
          the terminal), <code>std::cin</code> for standard input (typically the keyboard),
          and <code>std::cerr</code> for error output (also the terminal, but unbuffered and
          logically separate from normal output).
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Output with std::cout</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The insertion operator (<code>&lt;&lt;</code>) sends data to <code>std::cout</code>. You
        can chain multiple values in a single statement, and C++ automatically converts built-in
        types to their text representation.
      </p>

      <CppCode title="cout_basics.cpp">{`#include <iostream>

int main() {
    std::string name = "Alice";
    int age = 30;
    double gpa = 3.85;

    std::cout << "Name: " << name << std::endl;
    std::cout << "Age: " << age << ", GPA: " << gpa << std::endl;
    std::cout << "Multiple " << "values " << "chained " << 42 << '\\n';

    return 0;
}`}</CppCode>

      <OutputBlock>{`Name: Alice
Age: 30, GPA: 3.85
Multiple values chained 42`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Input with std::cin</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The extraction operator (<code>&gt;&gt;</code>) reads data from <code>std::cin</code>. It
        automatically skips whitespace and converts the input text into the appropriate type based
        on the variable being read into.
      </p>

      <CppCode title="cin_basics.cpp">{`#include <iostream>
#include <string>

int main() {
    std::string name;
    int age;

    std::cout << "Enter your name: ";
    std::cin >> name;  // reads one word (stops at whitespace)

    std::cout << "Enter your age: ";
    std::cin >> age;

    std::cout << "Hello, " << name << "! You are " << age << " years old." << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`Enter your name: Alice
Enter your age: 30
Hello, Alice! You are 30 years old.`}</OutputBlock>

      <WarningBlock title="std::cin reads words, not lines">
        <p>
          The <code>&gt;&gt;</code> operator stops reading at whitespace. If the user types
          "Alice Smith", only "Alice" is read into <code>name</code>. To read an entire line
          including spaces, use <code>std::getline(std::cin, name)</code> instead.
        </p>
      </WarningBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Error Output with std::cerr</h2>

      <SyntaxBlock title="std::cerr">
        <p>
          Use <code>std::cerr</code> for error messages. It works like <code>std::cout</code> but
          writes to the standard error stream, which is unbuffered (output appears immediately)
          and can be redirected separately from normal output.
        </p>
        <CppCode>{`std::cerr << "Error: file not found!" << std::endl;`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Formatted Output</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The <code>&lt;iomanip&gt;</code> header provides manipulators for controlling output
        formatting, including field width, decimal precision, and alignment.
      </p>

      <CppCode title="formatted_output.cpp">{`#include <iostream>
#include <iomanip>

int main() {
    double pi = 3.14159265358979;
    double price = 9.5;

    // Set decimal precision
    std::cout << "Default:   " << pi << std::endl;
    std::cout << "Precision: " << std::setprecision(4) << pi << std::endl;
    std::cout << "Fixed:     " << std::fixed << std::setprecision(2) << pi << std::endl;

    // Field width and alignment
    std::cout << std::endl << "--- Price List ---" << std::endl;
    std::cout << std::left << std::setw(15) << "Item"
              << std::right << std::setw(8) << "Price" << std::endl;
    std::cout << std::left << std::setw(15) << "Apple"
              << std::right << "$" << std::setw(7) << std::fixed
              << std::setprecision(2) << 1.29 << std::endl;
    std::cout << std::left << std::setw(15) << "Banana"
              << std::right << "$" << std::setw(7) << 0.59 << std::endl;
    std::cout << std::left << std::setw(15) << "Cherry Pie"
              << std::right << "$" << std::setw(7) << 12.99 << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`Default:   3.14159
Precision: 3.142
Fixed:     3.14

--- Price List ---
Item                Price
Apple          $   1.29
Banana         $   0.59
Cherry Pie     $  12.99`}</OutputBlock>

      <NoteBlock type="info" title="Sticky Manipulators">
        <p>
          Most manipulators like <code>std::fixed</code>, <code>std::setprecision</code>,
          and <code>std::left</code> are "sticky" — they remain in effect for all subsequent
          output until changed. The exception is <code>std::setw</code>, which only applies
          to the very next output operation.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Input Validation</h2>

      <CppCode title="input_validation.cpp">{`#include <iostream>
#include <limits>

int main() {
    int number;

    std::cout << "Enter an integer: ";
    std::cin >> number;

    if (std::cin.fail()) {
        std::cerr << "Invalid input! Not an integer." << std::endl;

        // Clear the error state and discard bad input
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n');
    } else {
        std::cout << "You entered: " << number << std::endl;
    }

    return 0;
}`}</CppCode>

      <BestPracticeBlock title="Always Validate User Input">
        <p>
          Never assume user input is correct. Check <code>std::cin.fail()</code> after reading,
          and handle errors gracefully. Clear the error state with <code>std::cin.clear()</code>
          and discard remaining bad input with <code>std::cin.ignore()</code> before attempting
          to read again.
        </p>
      </BestPracticeBlock>

      <NoteBlock type="tip" title="Mixing cin >> and getline">
        <p>
          After using <code>std::cin &gt;&gt;</code>, a newline character remains in the input buffer.
          If you follow with <code>std::getline()</code>, it reads that leftover newline as an
          empty string. Fix this by calling <code>std::cin.ignore()</code> between them.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Simple Calculator"
        difficulty="beginner"
        prompt="Write a program that reads two doubles and an operator character (+, -, *, /) from the user, performs the calculation, and prints the result formatted to 2 decimal places."
        hints={[
          "Use std::cin >> to read two doubles and a char",
          "Use if/else or switch to select the operation",
          "Use std::fixed and std::setprecision(2) for formatting",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <iomanip>

int main() {
    double a, b;
    char op;

    std::cout << "Enter: number operator number" << std::endl;
    std::cin >> a >> op >> b;

    std::cout << std::fixed << std::setprecision(2);

    if (op == '+') std::cout << a << " + " << b << " = " << (a + b) << std::endl;
    else if (op == '-') std::cout << a << " - " << b << " = " << (a - b) << std::endl;
    else if (op == '*') std::cout << a << " * " << b << " = " << (a * b) << std::endl;
    else if (op == '/' && b != 0) std::cout << a << " / " << b << " = " << (a / b) << std::endl;
    else std::cerr << "Invalid operator or division by zero" << std::endl;

    return 0;
}`}</CppCode>
        }
      />

      <ExerciseBlock
        title="Formatted Table"
        difficulty="intermediate"
        prompt="Write a program that prints a multiplication table for numbers 1 through 5, with each column right-aligned and 5 characters wide."
        hints={[
          "Use nested loops: outer for rows, inner for columns",
          "Use std::setw(5) before each number",
          "Remember std::setw only applies to the next output",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <iomanip>

int main() {
    for (int i = 1; i <= 5; ++i) {
        for (int j = 1; j <= 5; ++j) {
            std::cout << std::setw(5) << (i * j);
        }
        std::cout << std::endl;
    }
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::cin', url: 'https://en.cppreference.com/w/cpp/io/cin', description: 'Standard input stream' },
        { type: 'cppreference', title: 'std::cout', url: 'https://en.cppreference.com/w/cpp/io/cout', description: 'Standard output stream' },
        { type: 'cppreference', title: 'Input/Output Manipulators', url: 'https://en.cppreference.com/w/cpp/io/manip', description: 'setw, setprecision, fixed, and other formatting manipulators' },
      ]} />
    </div>
  )
}
