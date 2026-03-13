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

export default function S1Overloading() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++ allows multiple functions to share the same name as long as their parameter lists
        differ. This feature, called <strong>function overloading</strong>, lets you provide a
        single intuitive name for operations that work on different types or numbers of arguments.
      </p>

      <DefinitionBlock title="Function Overloading">
        <p>
          <strong>Function overloading</strong> means defining two or more functions with the same
          name but different parameter types or counts. The compiler selects the best match at
          compile time based on the arguments provided. The return type alone is <em>not</em> enough
          to distinguish overloads.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic Overloading</h2>

      <CppCode title="Overloaded print function">{`#include <iostream>
#include <string>

void print(int value) {
    std::cout << "Integer: " << value << std::endl;
}

void print(double value) {
    std::cout << "Double: " << value << std::endl;
}

void print(const std::string& value) {
    std::cout << "String: " << value << std::endl;
}

int main() {
    print(42);
    print(3.14);
    print(std::string("hello"));
    return 0;
}`}</CppCode>

      <OutputBlock>{`Integer: 42
Double: 3.14
String: hello`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Overload Resolution</h2>

      <SyntaxBlock title="How the Compiler Chooses">
        <p>The compiler follows a priority order when matching a call to an overload:</p>
        <ol className="list-decimal ml-6 mt-2 space-y-1">
          <li><strong>Exact match</strong> — no conversion needed.</li>
          <li><strong>Promotion</strong> — e.g., <code>int</code> to <code>long</code>, <code>float</code> to <code>double</code>.</li>
          <li><strong>Standard conversion</strong> — e.g., <code>int</code> to <code>double</code>.</li>
          <li><strong>User-defined conversion</strong> — via converting constructors or conversion operators.</li>
        </ol>
        <p className="mt-2">If two overloads tie at the same priority level, the call is <strong>ambiguous</strong> and the compiler reports an error.</p>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Ambiguous Calls</h2>

      <CppCode title="Ambiguity example">{`#include <iostream>

void process(int x) {
    std::cout << "int: " << x << std::endl;
}

void process(double x) {
    std::cout << "double: " << x << std::endl;
}

int main() {
    process(10);     // OK: exact match to int
    process(3.14);   // OK: exact match to double
    // process(3.14f);  // AMBIGUOUS: float promotes to double
                        // but can also convert to int
    process(static_cast<double>(3.14f));  // OK: explicit cast resolves it
    return 0;
}`}</CppCode>

      <OutputBlock>{`int: 10
double: 3.14
double: 3.14`}</OutputBlock>

      <WarningBlock title="Avoid Ambiguous Overload Sets">
        <p>
          If you see a compiler error about ambiguous overload resolution, consider adding
          an overload for the exact type, or use an explicit cast at the call site. Do not
          rely on implicit conversions across multiple overloads.
        </p>
      </WarningBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Const Overloading</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Member functions can be overloaded on <code>const</code> qualification. A <code>const</code> object
        calls the <code>const</code> overload; a non-const object calls the non-const overload.
      </p>

      <CppCode title="Const member function overload">{`#include <iostream>
#include <string>

class TextBuffer {
    std::string data_;
public:
    TextBuffer(const std::string& s) : data_(s) {}

    char& at(int index) {
        std::cout << "(mutable access) ";
        return data_[index];
    }

    const char& at(int index) const {
        std::cout << "(const access) ";
        return data_[index];
    }
};

int main() {
    TextBuffer buf("Hello");
    buf.at(0) = 'J';  // calls non-const version
    std::cout << buf.at(0) << std::endl;

    const TextBuffer cbuf("World");
    std::cout << cbuf.at(0) << std::endl;  // calls const version
    return 0;
}`}</CppCode>

      <OutputBlock>{`(mutable access) (mutable access) J
(const access) W`}</OutputBlock>

      <NoteBlock type="history" title="Name Mangling">
        <p>
          The linker needs unique names for each overload. C++ compilers use <strong>name
          mangling</strong> to encode the function name and parameter types into a unique symbol.
          For example, <code>print(int)</code> might become <code>_Z5printi</code> while
          <code>print(double)</code> becomes <code>_Z5printd</code>. This is why <code>extern "C"</code> is
          needed when linking C++ functions with C code — C has no name mangling.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Overload for Clarity, Not Cleverness">
        <p>
          Only overload functions when they perform the same logical operation on different types.
          If overloads do fundamentally different things, give them different names. Good
          overloading makes code read naturally; bad overloading creates confusion.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Overload an area() Function"
        difficulty="beginner"
        prompt="Write three overloads of a function called area: one that takes a single double (radius of a circle), one that takes two doubles (width and height of a rectangle), and one that takes three doubles (sides of a triangle using Heron's formula). Print results in main()."
        hints={[
          "Circle area: pi * r * r (use 3.14159265 for pi)",
          "Rectangle area: width * height",
          "Heron's formula: s = (a+b+c)/2, area = sqrt(s*(s-a)*(s-b)*(s-c))",
          "Include <cmath> for std::sqrt",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <cmath>

double area(double radius) {
    return 3.14159265 * radius * radius;
}

double area(double width, double height) {
    return width * height;
}

double area(double a, double b, double c) {
    double s = (a + b + c) / 2.0;
    return std::sqrt(s * (s - a) * (s - b) * (s - c));
}

int main() {
    std::cout << "Circle (r=5): " << area(5.0) << std::endl;
    std::cout << "Rectangle (3x4): " << area(3.0, 4.0) << std::endl;
    std::cout << "Triangle (3,4,5): " << area(3.0, 4.0, 5.0) << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Overload resolution', url: 'https://en.cppreference.com/w/cpp/language/overload_resolution', description: 'Detailed rules for resolving overloaded function calls' },
        { type: 'cppreference', title: 'Function overloading', url: 'https://en.cppreference.com/w/cpp/language/overloaded_address', description: 'Address of overloaded function' },
        { type: 'textbook', title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', description: 'Chapter 12: Functions — overloading' },
      ]} />
    </div>
  )
}
