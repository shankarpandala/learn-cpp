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

export default function S2DefaultArgs() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Default arguments let you call a function with fewer arguments than it has parameters.
        When an argument is omitted, the compiler substitutes the default value specified in the
        function declaration. This reduces the need for multiple overloads that differ only in
        the number of parameters.
      </p>

      <DefinitionBlock title="Default Arguments">
        <p>
          A <strong>default argument</strong> is a value provided in a function's declaration that
          the compiler uses when the caller does not supply that argument. Default arguments must
          appear at the <em>end</em> of the parameter list — you cannot skip a parameter in the
          middle.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic Usage</h2>

      <CppCode title="Default arguments">{`#include <iostream>
#include <string>

void greet(const std::string& name, const std::string& greeting = "Hello") {
    std::cout << greeting << ", " << name << "!" << std::endl;
}

int main() {
    greet("Alice");              // uses default greeting
    greet("Bob", "Good morning"); // overrides default
    return 0;
}`}</CppCode>

      <OutputBlock>{`Hello, Alice!
Good morning, Bob!`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Rules for Default Arguments</h2>

      <SyntaxBlock title="Rightmost Parameters Only">
        <p>
          Default arguments must be specified from right to left with no gaps. Once a parameter
          has a default, every parameter to its right must also have a default.
        </p>
        <CppCode>{`// Valid
void f(int a, int b = 10, int c = 20);

// Invalid — gap in defaults
// void g(int a = 1, int b, int c = 3);  // ERROR`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Multiple defaults">{`#include <iostream>

void drawBox(int width = 10, int height = 5, char fill = '*') {
    for (int r = 0; r < height; ++r) {
        for (int c = 0; c < width; ++c) {
            std::cout << fill;
        }
        std::cout << '\n';
    }
}

int main() {
    std::cout << "Default box:" << std::endl;
    drawBox();

    std::cout << "\nCustom box:" << std::endl;
    drawBox(6, 3, '#');
    return 0;
}`}</CppCode>

      <OutputBlock>{`Default box:
**********
**********
**********
**********
**********

Custom box:
######
######
######`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Declaration vs Definition</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        When a function has both a declaration (in a header) and a definition (in a source file),
        the default arguments should appear only in the <strong>declaration</strong>. Specifying
        them in both places is a compiler error.
      </p>

      <CppCode title="logger.h — defaults in declaration">{`#ifndef LOGGER_H
#define LOGGER_H

#include <string>

void log(const std::string& message, int level = 0);  // default here

#endif`}</CppCode>

      <CppCode title="logger.cpp — no defaults in definition">{`#include <iostream>
#include "logger.h"

void log(const std::string& message, int level) {  // no default here
    std::cout << "[Level " << level << "] " << message << std::endl;
}`}</CppCode>

      <NoteBlock type="important" title="One Place Only">
        <p>
          A default argument can only be specified once per scope. If you write the default in
          both the declaration and the definition, the compiler will reject it. Always prefer
          putting defaults in the declaration so that every caller sees them.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Interaction with Overloading</h2>

      <WarningBlock title="Ambiguity with Overloads">
        <p>
          Default arguments can create ambiguity with overloaded functions. If an overload and a
          default-argument version both match a call, the compiler cannot choose between them.
        </p>
      </WarningBlock>

      <CppCode title="Ambiguity example">{`#include <iostream>

void display(int x) {
    std::cout << "One arg: " << x << std::endl;
}

void display(int x, int y = 100) {
    std::cout << "Two args: " << x << ", " << y << std::endl;
}

int main() {
    // display(5);   // ERROR: ambiguous — matches both overloads
    display(5, 10);  // OK: only matches the two-parameter version
    return 0;
}`}</CppCode>

      <OutputBlock>{`Two args: 5, 10`}</OutputBlock>

      <BestPracticeBlock title="Prefer Defaults Over Trivial Overloads">
        <p>
          When multiple overloads differ only by the presence of trailing parameters with
          obvious default values, a single function with defaults is simpler and easier to
          maintain. Use overloading when the parameter <em>types</em> differ, and default
          arguments when only the <em>count</em> varies with sensible defaults.
        </p>
      </BestPracticeBlock>

      <NoteBlock type="tip" title="Default Arguments Are Evaluated at the Call Site">
        <p>
          Default argument expressions are evaluated each time the function is called, not once
          at definition time. This means you can use function calls as defaults, though this is
          rare and can hurt readability.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Configurable Greeting"
        difficulty="beginner"
        prompt="Write a function formatName(std::string first, std::string last, std::string title = 'Mr.', bool formal = true) that returns a formatted name. If formal is true, return 'Title Last' (e.g., 'Mr. Smith'). Otherwise return 'First Last' (e.g., 'John Smith')."
        hints={[
          "Use an if statement to check the formal flag",
          "Return a std::string by value",
          "Remember: defaults go from right to left",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <string>

std::string formatName(std::string first, std::string last,
                       std::string title = "Mr.", bool formal = true) {
    if (formal) {
        return title + " " + last;
    }
    return first + " " + last;
}

int main() {
    std::cout << formatName("John", "Smith") << std::endl;
    std::cout << formatName("Jane", "Doe", "Dr.") << std::endl;
    std::cout << formatName("Bob", "Jones", "Mr.", false) << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Default arguments', url: 'https://en.cppreference.com/w/cpp/language/default_arguments', description: 'Rules and examples for default function arguments' },
        { type: 'textbook', title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', description: 'Chapter 12: Functions — default arguments' },
      ]} />
    </div>
  )
}
