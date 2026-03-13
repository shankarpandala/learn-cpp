import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S3ProgramStructure() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        A well-structured C++ program separates concerns into headers and source files, organizes
        code with namespaces, and uses comments to explain intent. Understanding these structural
        elements is essential before writing larger programs.
      </p>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Headers and Source Files</h2>

      <DefinitionBlock title="Header Files (.h / .hpp)">
        <p>
          Header files contain <strong>declarations</strong> — function prototypes, class definitions,
          constants, and type aliases. They tell the compiler <em>what exists</em> without providing
          the full implementation.
        </p>
      </DefinitionBlock>

      <DefinitionBlock title="Source Files (.cpp)">
        <p>
          Source files contain <strong>definitions</strong> — the actual implementations of functions
          and methods. Each source file is compiled independently into an object file.
        </p>
      </DefinitionBlock>

      <CppCode title="math_utils.h">{`#ifndef MATH_UTILS_H
#define MATH_UTILS_H

// Function declarations (prototypes)
int add(int a, int b);
int multiply(int a, int b);

#endif // MATH_UTILS_H`}</CppCode>

      <CppCode title="math_utils.cpp">{`#include "math_utils.h"

// Function definitions (implementations)
int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}`}</CppCode>

      <CppCode title="main.cpp">{`#include <iostream>
#include "math_utils.h"

int main() {
    std::cout << "3 + 4 = " << add(3, 4) << std::endl;
    std::cout << "3 * 4 = " << multiply(3, 4) << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`3 + 4 = 7
3 * 4 = 12`}</OutputBlock>

      <SyntaxBlock title="Include Guards">
        <p>
          Include guards prevent a header from being included multiple times in the same
          translation unit, which would cause redefinition errors.
        </p>
        <CppCode>{`// Traditional include guard
#ifndef HEADER_NAME_H
#define HEADER_NAME_H
// ... declarations ...
#endif

// Modern alternative (non-standard but widely supported)
#pragma once
// ... declarations ...`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Namespaces</h2>

      <DefinitionBlock title="Namespace">
        <p>
          A namespace is a declarative region that provides a scope for identifiers inside it.
          Namespaces prevent name collisions when combining code from different libraries.
        </p>
      </DefinitionBlock>

      <CppCode title="Using namespaces">{`#include <iostream>

namespace geometry {
    double area(double radius) {
        return 3.14159 * radius * radius;
    }
}

namespace physics {
    double area(double length, double width) {
        return length * width;
    }
}

int main() {
    std::cout << "Circle area: " << geometry::area(5.0) << std::endl;
    std::cout << "Rectangle area: " << physics::area(3.0, 4.0) << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Circle area: 78.5398
Rectangle area: 12`}</OutputBlock>

      <NoteBlock type="important" title="Avoid 'using namespace std;'">
        <p>
          While <code>using namespace std;</code> saves typing, it pulls <em>everything</em> from
          the standard library into the global scope. This can cause name collisions and makes code
          harder to read. Prefer <code>std::</code> prefix or selective <code>using</code> declarations.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Selective using Declarations">
        <p>
          If you want to avoid typing <code>std::</code> repeatedly, use selective declarations
          instead of importing the entire namespace:
        </p>
        <CppCode>{`using std::cout;
using std::endl;
// Now you can write: cout << "Hello" << endl;`}</CppCode>
      </BestPracticeBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Comments</h2>

      <SyntaxBlock title="Comment Syntax">
        <CppCode>{`// Single-line comment

/* Multi-line
   comment */

/// Documentation comment (used by tools like Doxygen)
/// @param x The input value
/// @return The squared value
int square(int x) {
    return x * x;
}`}</CppCode>
      </SyntaxBlock>

      <BestPracticeBlock title="Comment the Why, Not the What">
        <p>
          Good comments explain <em>why</em> code exists, not <em>what</em> it does.
          The code itself should be readable enough to show what it does.
        </p>
        <CppCode>{`// Bad: increment i by 1
i++;

// Good: skip the header row in the CSV data
i++;`}</CppCode>
      </BestPracticeBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Statements and Expressions</h2>

      <DefinitionBlock title="Statement">
        <p>
          A statement is a complete instruction that performs an action. Most statements in C++
          end with a semicolon (<code>;</code>). A compound statement (block) is enclosed in
          braces <code>{'{}'}</code>.
        </p>
      </DefinitionBlock>

      <CppCode title="Types of statements">{`#include <iostream>

int main() {
    // Declaration statement
    int x = 42;

    // Expression statement
    x = x + 1;

    // Output statement
    std::cout << x << std::endl;

    // Compound statement (block)
    {
        int y = 10;
        std::cout << y << std::endl;
    }
    // y is no longer accessible here

    return 0;  // Jump statement
}`}</CppCode>

      <ExerciseBlock
        title="Organize into Files"
        difficulty="beginner"
        prompt="Given a program that converts temperatures, split it into a header file (converter.h), source file (converter.cpp), and main file (main.cpp). The converter should have functions celsius_to_fahrenheit and fahrenheit_to_celsius."
        hints={[
          "The header file should contain function declarations with include guards",
          "The source file should #include the header and provide implementations",
          "The main file should #include the header and call the functions",
        ]}
        solution={
          <div className="space-y-3">
            <CppCode title="converter.h">{`#pragma once

double celsius_to_fahrenheit(double c);
double fahrenheit_to_celsius(double f);`}</CppCode>
            <CppCode title="converter.cpp">{`#include "converter.h"

double celsius_to_fahrenheit(double c) {
    return c * 9.0 / 5.0 + 32.0;
}

double fahrenheit_to_celsius(double f) {
    return (f - 32.0) * 5.0 / 9.0;
}`}</CppCode>
            <CppCode title="main.cpp">{`#include <iostream>
#include "converter.h"

int main() {
    std::cout << "100C = " << celsius_to_fahrenheit(100) << "F" << std::endl;
    std::cout << "212F = " << fahrenheit_to_celsius(212) << "C" << std::endl;
    return 0;
}`}</CppCode>
          </div>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Namespaces', url: 'https://en.cppreference.com/w/cpp/language/namespace', description: 'Namespace declaration and usage' },
        { type: 'cppreference', title: 'Header files', url: 'https://en.cppreference.com/w/cpp/header', description: 'C++ standard library headers' },
        { type: 'textbook', title: 'A Tour of C++', author: 'Bjarne Stroustrup', description: 'Chapter 3: Modularity' },
      ]} />
    </div>
  )
}
