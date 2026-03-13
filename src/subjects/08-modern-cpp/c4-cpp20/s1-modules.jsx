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

export default function S1Modules() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++20 modules replace the decades-old header-based inclusion model with a modern system
        that offers faster compilation, better encapsulation, and freedom from macro leakage.
        Instead of textually including headers, you <code>import</code> a module, which provides
        only its explicitly exported declarations.
      </p>

      <DefinitionBlock title="C++20 Modules">
        <p>
          A module is a self-contained unit of code that explicitly controls what it exports.
          Unlike headers, modules are compiled once and their compiled form is reused, eliminating
          redundant parsing. Macros defined in a module do not leak into importers.
        </p>
      </DefinitionBlock>

      <SyntaxBlock title="Module Declaration Syntax">
        <p>
          A module interface file declares the module name and exports its public API.
          The <code>export module</code> declaration must appear at the top of the file.
        </p>
        <CppCode>{`// math.cppm (module interface unit)
export module math;

export int add(int a, int b) {
    return a + b;
}

export int multiply(int a, int b) {
    return a * b;
}`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Creating and Using a Module</h2>

      <CppCode title="math.cppm">{`export module math;

// Exported: visible to importers
export double pi() { return 3.14159265358979; }

export double circleArea(double radius) {
    return pi() * radius * radius;
}

// Not exported: internal to this module
double internalHelper() {
    return 2.0;
}`}</CppCode>

      <CppCode title="main.cpp">{`import math;
#include <iostream>

int main() {
    std::cout << "Pi: " << pi() << "\\n";
    std::cout << "Area: " << circleArea(5.0) << "\\n";
    // internalHelper();  // ERROR: not exported
    return 0;
}`}</CppCode>

      <OutputBlock>{`Pi: 3.14159
Area: 78.5398`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Module Partitions</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Large modules can be split into <strong>partitions</strong>. A partition is a sub-unit
        of a module that can be imported by other parts of the same module.
      </p>

      <CppCode title="Module partitions">{`// geometry-shapes.cppm
export module geometry:shapes;

export struct Circle {
    double radius;
};

export struct Rectangle {
    double width, height;
};

// geometry-area.cppm
export module geometry:area;
import :shapes;

export double area(const Circle& c) {
    return 3.14159 * c.radius * c.radius;
}

export double area(const Rectangle& r) {
    return r.width * r.height;
}

// geometry.cppm (primary module interface)
export module geometry;
export import :shapes;
export import :area;`}</CppCode>

      <NoteBlock type="info" title="import vs #include">
        <p>
          <code>import</code> does not perform textual inclusion. The compiler reads a precompiled
          binary module interface (BMI), which is much faster. Modules also prevent macro pollution:
          a macro defined in module A does not affect code that imports A.
        </p>
      </NoteBlock>

      <CompilerNoteBlock compiler="gcc" title="GCC Module Support">
        <p>
          GCC supports modules with <code>-fmodules-ts</code> and typically uses <code>.cppm</code>
          or <code>.cpp</code> extensions for module interface files. Compile module interfaces
          before their importers.
        </p>
      </CompilerNoteBlock>

      <CompilerNoteBlock compiler="msvc" title="MSVC Module Support">
        <p>
          MSVC has the most mature module support. Use <code>/std:c++20</code> and
          <code>.ixx</code> as the module interface extension. The build system handles
          dependency ordering automatically.
        </p>
      </CompilerNoteBlock>

      <WarningBlock title="Build system support is still evolving">
        <p>
          Module support in CMake (since 3.28), MSBuild, and other build systems is still maturing.
          Dependency scanning and build ordering are more complex than with headers. Check your
          build system's documentation for current module support status.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Start with named modules for new code">
        <p>
          For new projects, consider using modules from the start. For existing codebases, adopt
          modules incrementally by wrapping stable components. Use <code>export import</code> to
          re-export dependencies, keeping the public API clean and discoverable.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Create a String Utilities Module"
        difficulty="intermediate"
        prompt="Write a module 'stringutils' that exports two functions: toUpper(std::string) and contains(std::string_view, std::string_view). Write a main.cpp that imports and uses them."
        hints={[
          "Use 'export module stringutils;' at the top of the module file",
          "Import <string> and <algorithm> inside the module",
          "Mark only the public functions with 'export'",
        ]}
        solution={
          <CppCode>{`// stringutils.cppm
export module stringutils;
import <string>;
import <string_view>;
import <algorithm>;

export std::string toUpper(std::string s) {
    std::transform(s.begin(), s.end(), s.begin(), ::toupper);
    return s;
}

export bool contains(std::string_view haystack, std::string_view needle) {
    return haystack.find(needle) != std::string_view::npos;
}

// main.cpp
import stringutils;
#include <iostream>

int main() {
    std::cout << toUpper("hello") << "\\n";
    std::cout << contains("hello world", "world") << "\\n";
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Modules (C++20)', url: 'https://en.cppreference.com/w/cpp/language/modules', description: 'Module declaration and usage' },
        { type: 'cppreference', title: 'import declaration', url: 'https://en.cppreference.com/w/cpp/language/import', description: 'Import module or header unit' },
        { type: 'textbook', title: 'C++20 - The Complete Guide', author: 'Nicolai Josuttis', description: 'Chapter 17: Modules' },
      ]} />
    </div>
  )
}
