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

export default function S1Exceptions() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Exceptions are C++'s primary mechanism for handling runtime errors. When an error occurs,
        you <code>throw</code> an exception object. Execution immediately transfers to the nearest
        matching <code>catch</code> handler, unwinding the call stack along the way.
      </p>

      <DefinitionBlock title="Exception">
        <p>
          An exception is an object that represents an error condition. When thrown, it interrupts
          normal program flow and propagates up the call stack until a <code>catch</code> block
          handles it. If no handler is found, the program calls <code>std::terminate</code> and aborts.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">throw, try, and catch</h2>

      <SyntaxBlock title="Exception Syntax">
        <CppCode>{`try {
    // code that might throw
    throw exception_object;
} catch (const ExceptionType& e) {
    // handle the exception
}`}</CppCode>
      </SyntaxBlock>

      <CppCode title="basic_exception.cpp">{`#include <iostream>
#include <stdexcept>

double divide(double a, double b) {
    if (b == 0.0) {
        throw std::invalid_argument("Division by zero");
    }
    return a / b;
}

int main() {
    try {
        std::cout << divide(10.0, 3.0) << std::endl;
        std::cout << divide(5.0, 0.0) << std::endl;  // throws
        std::cout << "This line never executes" << std::endl;
    } catch (const std::invalid_argument& e) {
        std::cout << "Error: " << e.what() << std::endl;
    }

    std::cout << "Program continues normally." << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`3.33333
Error: Division by zero
Program continues normally.`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">The std::exception Hierarchy</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The standard library defines a hierarchy of exception classes rooted
        at <code>std::exception</code>. The two main branches
        are <code>std::logic_error</code> (programming mistakes) and
        <code>std::runtime_error</code> (conditions detectable only at runtime).
      </p>

      <CppCode title="exception_types.cpp">{`#include <iostream>
#include <stdexcept>
#include <vector>

int main() {
    try {
        std::vector<int> v = {1, 2, 3};
        std::cout << v.at(10) << std::endl;  // throws std::out_of_range
    } catch (const std::out_of_range& e) {
        std::cout << "Out of range: " << e.what() << std::endl;
    } catch (const std::exception& e) {
        // Catches any standard exception not caught above
        std::cout << "Exception: " << e.what() << std::endl;
    }

    return 0;
}`}</CppCode>

      <OutputBlock>{`Out of range: vector::_M_range_check: __n (which is 10) >= this->size() (which is 3)`}</OutputBlock>

      <BestPracticeBlock title="Catch by const reference">
        <p>
          Always catch exceptions by <code>const</code> reference (<code>const std::exception& e</code>).
          Catching by value causes slicing -- derived exception data is lost. Catching by pointer
          raises lifetime issues. Const reference is safe and efficient.
        </p>
      </BestPracticeBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Multiple catch Blocks and Rethrowing</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        You can have multiple <code>catch</code> blocks for different exception types. They are
        tested in order, so put more specific types first. Use <code>throw;</code> (with no operand)
        to rethrow the current exception after partial handling.
      </p>

      <CppCode title="rethrow.cpp">{`#include <iostream>
#include <stdexcept>

void process(int value) {
    try {
        if (value < 0) throw std::out_of_range("Negative value");
        if (value == 0) throw std::runtime_error("Zero value");
        std::cout << "Processing: " << value << std::endl;
    } catch (const std::out_of_range& e) {
        std::cout << "Logging: " << e.what() << std::endl;
        throw;  // rethrow to caller
    }
}

int main() {
    try {
        process(-5);
    } catch (const std::exception& e) {
        std::cout << "Caught in main: " << e.what() << std::endl;
    }

    return 0;
}`}</CppCode>

      <OutputBlock>{`Logging: Negative value
Caught in main: Negative value`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">The noexcept Specifier</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Marking a function <code>noexcept</code> promises it will not throw exceptions. If it does
        throw, the program calls <code>std::terminate</code>. This enables compiler optimizations
        and is important for move operations.
      </p>

      <CppCode title="noexcept_example.cpp">{`#include <iostream>

int safe_add(int a, int b) noexcept {
    return a + b;  // guaranteed not to throw
}

int main() {
    std::cout << safe_add(3, 4) << std::endl;
    std::cout << std::boolalpha;
    std::cout << "safe_add is noexcept: "
              << noexcept(safe_add(1, 2)) << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`7
safe_add is noexcept: true`}</OutputBlock>

      <NoteBlock type="important" title="When to use noexcept">
        <p>
          Mark functions <code>noexcept</code> when they truly cannot fail: move constructors, move
          assignment operators, destructors, swap functions, and simple accessors. The standard
          library uses <code>noexcept</code> information to choose optimized code paths (e.g.,
          <code>std::vector</code> uses move operations only if they are <code>noexcept</code>).
        </p>
      </NoteBlock>

      <WarningBlock title="catch (...) -- the catch-all">
        <p>
          The syntax <code>catch (...)</code> catches any exception, including non-standard types.
          Use it sparingly and only at top-level boundaries. You cannot access the exception object
          with this syntax. Always prefer catching specific types.
        </p>
      </WarningBlock>

      <ExerciseBlock
        title="Safe String to Integer"
        difficulty="intermediate"
        prompt="Write a function that converts a string to an integer using std::stoi, catching std::invalid_argument and std::out_of_range exceptions. Return a default value on failure."
        hints={[
          "std::stoi throws std::invalid_argument for non-numeric strings",
          "std::stoi throws std::out_of_range for values too large",
          "Catch each exception type separately with descriptive messages",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <string>
#include <stdexcept>

int safe_stoi(const std::string& s, int default_val = 0) {
    try {
        return std::stoi(s);
    } catch (const std::invalid_argument& e) {
        std::cout << "Invalid: '" << s << "' is not a number" << std::endl;
    } catch (const std::out_of_range& e) {
        std::cout << "Out of range: '" << s << "'" << std::endl;
    }
    return default_val;
}

int main() {
    std::cout << safe_stoi("42") << std::endl;
    std::cout << safe_stoi("abc") << std::endl;
    std::cout << safe_stoi("99999999999999999999") << std::endl;

    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Exceptions', url: 'https://en.cppreference.com/w/cpp/language/exceptions', description: 'Overview of C++ exception handling' },
        { type: 'cppreference', title: 'std::exception', url: 'https://en.cppreference.com/w/cpp/error/exception', description: 'Base class for all standard exceptions' },
        { type: 'cppreference', title: 'noexcept specifier', url: 'https://en.cppreference.com/w/cpp/language/noexcept_spec', description: 'noexcept specification documentation' },
        { type: 'textbook', title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', description: 'Chapter 13: Exception Handling' },
      ]} />
    </div>
  )
}
