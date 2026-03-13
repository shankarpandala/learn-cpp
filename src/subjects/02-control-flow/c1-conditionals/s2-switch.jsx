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

export default function S2Switch() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The <code>switch</code> statement provides a clean way to select one of many code paths
        based on the value of an integral or enumeration expression. It is often more readable than
        long <code>if</code>/<code>else if</code> chains when comparing a single variable against
        multiple constant values.
      </p>

      <DefinitionBlock title="switch Statement">
        <p>
          A <code>switch</code> statement transfers control to one of several labeled statements
          based on the value of its controlling expression. Each label is a compile-time constant.
          Execution continues until a <code>break</code> statement or the end of the switch block.
        </p>
      </DefinitionBlock>

      <SyntaxBlock title="switch Syntax">
        <CppCode>{`switch (expression) {
    case constant1:
        // code for constant1
        break;
    case constant2:
        // code for constant2
        break;
    default:
        // code if no case matches
        break;
}`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic switch Example</h2>

      <CppCode title="day_of_week.cpp">{`#include <iostream>

int main() {
    int day = 3;

    switch (day) {
        case 1: std::cout << "Monday" << std::endl; break;
        case 2: std::cout << "Tuesday" << std::endl; break;
        case 3: std::cout << "Wednesday" << std::endl; break;
        case 4: std::cout << "Thursday" << std::endl; break;
        case 5: std::cout << "Friday" << std::endl; break;
        case 6: std::cout << "Saturday" << std::endl; break;
        case 7: std::cout << "Sunday" << std::endl; break;
        default: std::cout << "Invalid day" << std::endl; break;
    }

    return 0;
}`}</CppCode>

      <OutputBlock>{`Wednesday`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Fallthrough Behavior</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Without a <code>break</code>, execution "falls through" to the next case. This can be
        intentional -- for example, grouping multiple cases that share the same logic.
      </p>

      <CppCode title="fallthrough.cpp">{`#include <iostream>

int main() {
    int day = 6;

    switch (day) {
        case 1: case 2: case 3: case 4: case 5:
            std::cout << "Weekday" << std::endl;
            break;
        case 6: case 7:
            std::cout << "Weekend" << std::endl;
            break;
        default:
            std::cout << "Invalid" << std::endl;
            break;
    }

    return 0;
}`}</CppCode>

      <OutputBlock>{`Weekend`}</OutputBlock>

      <WarningBlock title="Accidental fallthrough">
        <p>
          Forgetting <code>break</code> is a common bug. In C++17, use the <code>[[fallthrough]]</code> attribute
          to indicate that fallthrough is intentional. Compilers can then warn about unmarked fallthroughs.
        </p>
      </WarningBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">switch with Enums</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The <code>switch</code> statement pairs naturally with enumerations. The compiler can even
        warn you if you forget to handle a case.
      </p>

      <CppCode title="enum_switch.cpp">{`#include <iostream>

enum class Color { Red, Green, Blue };

int main() {
    Color c = Color::Green;

    switch (c) {
        case Color::Red:
            std::cout << "Red: #FF0000" << std::endl;
            break;
        case Color::Green:
            std::cout << "Green: #00FF00" << std::endl;
            break;
        case Color::Blue:
            std::cout << "Blue: #0000FF" << std::endl;
            break;
    }

    return 0;
}`}</CppCode>

      <OutputBlock>{`Green: #00FF00`}</OutputBlock>

      <CompilerNoteBlock compiler="gcc" title="Missing case warnings">
        <p>
          Compile with <code>-Wswitch</code> (enabled by <code>-Wall</code>) to receive warnings
          when an <code>enum class</code> switch does not cover all enumerators.
        </p>
      </CompilerNoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">C++17 Init-Statement in switch</h2>

      <CppCode title="switch_init.cpp">{`#include <iostream>
#include <string>

int main() {
    std::string input = "quit";

    // C++17: variable scoped to the switch block
    switch (int len = input.length(); len) {
        case 1: case 2: case 3:
            std::cout << "Short command (" << len << " chars)" << std::endl;
            break;
        case 4:
            std::cout << "Standard command (" << len << " chars)" << std::endl;
            break;
        default:
            std::cout << "Long command (" << len << " chars)" << std::endl;
            break;
    }

    return 0;
}`}</CppCode>

      <OutputBlock>{`Standard command (4 chars)`}</OutputBlock>

      <BestPracticeBlock title="switch vs if-else">
        <p>
          Use <code>switch</code> when comparing a single variable against multiple compile-time
          constants, especially with enums. Use <code>if</code>/<code>else</code> for range checks,
          floating-point comparisons, or conditions involving multiple variables. Compilers often
          optimize <code>switch</code> into efficient jump tables.
        </p>
      </BestPracticeBlock>

      <NoteBlock type="info" title="Limitations of switch">
        <p>
          The <code>switch</code> expression must be of integral or enumeration type. You cannot
          switch on strings, floating-point values, or non-constant expressions. Case labels must
          be compile-time constant expressions.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Simple Calculator"
        difficulty="beginner"
        prompt="Write a program that takes two numbers and an operator (+, -, *, /) as input and uses a switch statement to perform the correct operation."
        hints={[
          "Use a char variable for the operator",
          "Switch on the char: '+', '-', '*', '/'",
          "Handle division by zero in the '/' case",
        ]}
        solution={
          <CppCode>{`#include <iostream>

int main() {
    double a = 10.0, b = 3.0;
    char op = '*';

    switch (op) {
        case '+': std::cout << a + b << std::endl; break;
        case '-': std::cout << a - b << std::endl; break;
        case '*': std::cout << a * b << std::endl; break;
        case '/':
            if (b != 0) std::cout << a / b << std::endl;
            else std::cout << "Division by zero!" << std::endl;
            break;
        default:
            std::cout << "Unknown operator" << std::endl;
            break;
    }

    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'switch statement', url: 'https://en.cppreference.com/w/cpp/language/switch', description: 'Full switch statement documentation including C++17 init-statement' },
        { type: 'cppreference', title: '[[fallthrough]] attribute', url: 'https://en.cppreference.com/w/cpp/language/attributes/fallthrough', description: 'C++17 attribute to mark intentional fallthrough' },
        { type: 'cppreference', title: 'enum class', url: 'https://en.cppreference.com/w/cpp/language/enum', description: 'Scoped enumerations in C++11' },
      ]} />
    </div>
  )
}
