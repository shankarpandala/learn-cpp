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

export default function S3Specialization() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Sometimes a generic template does not produce the correct or optimal behavior for a particular type.
        Template specialization lets you provide a custom implementation for specific type arguments while
        keeping the generic version for everything else.
      </p>

      <DefinitionBlock title="Template Specialization">
        <p>
          <strong>Template specialization</strong> is the mechanism of providing a specific implementation
          of a template for a particular set of template arguments. <strong>Full specialization</strong> fixes
          all parameters; <strong>partial specialization</strong> fixes some parameters (available only for
          class templates).
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Full Specialization</h2>

      <SyntaxBlock title="Specializing a function template">
        <p>
          To fully specialize a function template, write <code>template&lt;&gt;</code> (empty angle brackets)
          followed by the function with concrete types.
        </p>
        <CppCode>{`template<>
return_type functionName<SpecificType>(SpecificType param) {
    // specialized implementation
}`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Full specialization example">{`#include <iostream>
#include <cstring>

template<typename T>
bool isEqual(T a, T b) {
    return a == b;
}

// Full specialization for C-style strings
template<>
bool isEqual<const char*>(const char* a, const char* b) {
    return std::strcmp(a, b) == 0;
}

int main() {
    std::cout << std::boolalpha;
    std::cout << isEqual(3, 3) << std::endl;
    std::cout << isEqual(3.14, 2.72) << std::endl;

    const char* s1 = "hello";
    const char* s2 = "hello";
    // Without specialization, this would compare pointers, not content
    std::cout << isEqual(s1, s2) << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`true
false
true`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Overloading vs Specialization</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        For function templates, you can achieve similar results with overloading instead of specialization.
        Overloading is generally preferred because overload resolution is simpler and more predictable
        than the specialization selection rules.
      </p>

      <CppCode title="Overloading instead of specialization">{`#include <iostream>
#include <cstring>

template<typename T>
bool isEqual(T a, T b) {
    return a == b;
}

// Overload (not specialization) for const char*
bool isEqual(const char* a, const char* b) {
    return std::strcmp(a, b) == 0;
}

int main() {
    std::cout << std::boolalpha;
    std::cout << isEqual(42, 42) << std::endl;
    std::cout << isEqual("cat", "cat") << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`true
true`}</OutputBlock>

      <WarningBlock title="Specialization ordering pitfall">
        <p>
          Function template specializations do not participate in overload resolution. The compiler first
          selects the best base template via overloading, then checks if that template has a matching
          specialization. This can lead to surprising results when multiple base templates exist.
          Prefer overloading for function templates.
        </p>
      </WarningBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Partial Specialization (Class Templates)</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Partial specialization is only available for class templates. It allows you to specialize for
        a pattern of types rather than a single concrete type.
      </p>

      <CppCode title="Partial specialization of a class template">{`#include <iostream>

// Primary template
template<typename T, typename U>
struct Pair {
    void describe() { std::cout << "generic Pair" << std::endl; }
};

// Partial specialization: both types are the same
template<typename T>
struct Pair<T, T> {
    void describe() { std::cout << "same-type Pair" << std::endl; }
};

// Partial specialization: second type is a pointer
template<typename T, typename U>
struct Pair<T, U*> {
    void describe() { std::cout << "pointer Pair" << std::endl; }
};

int main() {
    Pair<int, double> p1;   p1.describe();
    Pair<int, int> p2;      p2.describe();
    Pair<int, double*> p3;  p3.describe();
    return 0;
}`}</CppCode>

      <OutputBlock>{`generic Pair
same-type Pair
pointer Pair`}</OutputBlock>

      <NoteBlock type="important" title="No partial specialization for functions">
        <p>
          C++ does not allow partial specialization of function templates. Use overloading or constexpr
          if with type traits to achieve similar dispatch for functions.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Prefer overloading over function template specialization">
        <p>
          For function templates, prefer providing overloads instead of specializations. Overloads participate
          in normal overload resolution, making behavior more predictable. Reserve full specialization for
          class templates where partial specialization and overloading are not options.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Specialize a Formatter"
        difficulty="intermediate"
        prompt="Write a function template called format that returns a std::string representation of a value. Provide overloads for bool (return 'true'/'false') and for const char* (wrap in quotes). Use std::to_string for the generic case."
        hints={[
          "The primary template can use std::to_string(value)",
          "Write a non-template overload for bool and const char*",
          "Include <string> for std::to_string and std::string",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <string>

template<typename T>
std::string format(T value) {
    return std::to_string(value);
}

// Overload for bool
std::string format(bool value) {
    return value ? "true" : "false";
}

// Overload for C-strings
std::string format(const char* value) {
    return "'" + std::string(value) + "'";
}

int main() {
    std::cout << format(42) << std::endl;
    std::cout << format(true) << std::endl;
    std::cout << format("hello") << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Template specialization', url: 'https://en.cppreference.com/w/cpp/language/template_specialization', description: 'Full and partial specialization rules' },
        { type: 'cppreference', title: 'Partial template specialization', url: 'https://en.cppreference.com/w/cpp/language/partial_specialization', description: 'Class template partial specialization' },
        { type: 'article', title: 'Why Not Specialize Function Templates?', author: 'Herb Sutter', description: 'Explains why overloading is preferred over function template specialization' },
      ]} />
    </div>
  )
}
