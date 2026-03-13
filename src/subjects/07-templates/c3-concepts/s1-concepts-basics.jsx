import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import CompilerNoteBlock from '../../../components/content/CompilerNoteBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S1ConceptsBasics() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++20 concepts provide a way to constrain template parameters with named, readable requirements.
        Instead of cryptic SFINAE errors, concepts produce clear error messages when a type does not
        meet the requirements, and they make template interfaces self-documenting.
      </p>

      <DefinitionBlock title="Concept">
        <p>
          A <strong>concept</strong> is a named set of constraints that specifies what operations a type
          must support. Concepts are compile-time predicates: they evaluate to <code>true</code> or
          <code>false</code> for a given type and are used to restrict which types can be used with a template.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Defining a Concept</h2>

      <SyntaxBlock title="concept keyword">
        <p>
          A concept is defined with the <code>concept</code> keyword followed by a name and a constraint
          expression that must evaluate to <code>true</code> for the concept to be satisfied.
        </p>
        <CppCode>{`template<typename T>
concept ConceptName = constraint_expression;`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Defining and using a concept">{`#include <iostream>
#include <type_traits>

template<typename T>
concept Numeric = std::is_arithmetic_v<T>;

template<Numeric T>
T square(T x) {
    return x * x;
}

int main() {
    std::cout << square(5) << std::endl;
    std::cout << square(3.14) << std::endl;
    // square(std::string("hi")); // Error: string is not Numeric
    return 0;
}`}</CppCode>

      <OutputBlock>{`25
9.8596`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Ways to Apply Constraints</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++20 provides four syntactic forms for constraining templates, all equivalent in effect.
      </p>

      <CppCode title="Four ways to constrain a template">{`#include <concepts>

// 1. Concept as type constraint (most concise)
template<std::integral T>
T gcd1(T a, T b) { return b == 0 ? a : gcd1(b, a % b); }

// 2. Requires clause after template parameters
template<typename T> requires std::integral<T>
T gcd2(T a, T b) { return b == 0 ? a : gcd2(b, a % b); }

// 3. Trailing requires clause
template<typename T>
T gcd3(T a, T b) requires std::integral<T>
{ return b == 0 ? a : gcd3(b, a % b); }

// 4. Abbreviated function template with auto
std::integral auto gcd4(std::integral auto a, std::integral auto b)
{ return b == 0 ? a : gcd4(b, a % b); }`}</CppCode>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Concepts with Multiple Constraints</h2>

      <CppCode title="Combining constraints">{`#include <iostream>
#include <concepts>
#include <string>

template<typename T>
concept Printable = requires(T t) {
    std::cout << t;
};

template<typename T>
concept PrintableAndCopyable = Printable<T> && std::copyable<T>;

template<PrintableAndCopyable T>
void display(T value) {
    T copy = value;  // guaranteed copyable
    std::cout << "Value: " << copy << std::endl;
}

int main() {
    display(42);
    display(std::string("hello"));
    display(3.14);
    return 0;
}`}</CppCode>

      <OutputBlock>{`Value: 42
Value: hello
Value: 3.14`}</OutputBlock>

      <NoteBlock type="info" title="Concept subsumption">
        <p>
          When multiple constrained overloads match, the compiler selects the most constrained one
          through <strong>subsumption</strong>. If concept A implies concept B (A subsumes B), the
          overload constrained by A is preferred. This provides a cleaner alternative to SFINAE-based
          dispatch.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Name concepts after what they require">
        <p>
          Choose concept names that describe the capability required, such as <code>Sortable</code>,
          <code>Hashable</code>, or <code>Serializable</code>. Avoid naming them after what they are
          (like <code>HasLessThan</code>). Good concept names make template declarations read like
          natural language: <code>template&lt;Sortable T&gt;</code>.
        </p>
      </BestPracticeBlock>

      <CompilerNoteBlock compiler="all" title="Compiler support">
        <p>
          Concepts require a C++20-capable compiler. GCC 10+, Clang 10+, and MSVC 19.30+ all support
          concepts. Compile with <code>-std=c++20</code> (GCC/Clang) or <code>/std:c++20</code> (MSVC).
        </p>
      </CompilerNoteBlock>

      <NoteBlock type="history" title="Long road to concepts">
        <p>
          Concepts were first proposed for C++11 but were deferred due to complexity. A simplified
          version called "Concepts Lite" was developed and eventually standardized in C++20, nearly
          a decade after the original proposal.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Create a Container Concept"
        difficulty="intermediate"
        prompt="Define a concept called Container that requires a type to have begin(), end(), and size() member functions. Write a function template printSize that is constrained by this concept and prints the container's size."
        hints={[
          "Use a requires expression to check for the member functions",
          "t.begin(), t.end(), and t.size() should all be valid expressions",
          "Test with std::vector and std::string (both satisfy the concept)",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <vector>
#include <string>

template<typename T>
concept Container = requires(T t) {
    t.begin();
    t.end();
    t.size();
};

template<Container C>
void printSize(const C& c) {
    std::cout << "Size: " << c.size() << std::endl;
}

int main() {
    std::vector<int> v = {1, 2, 3, 4};
    std::string s = "hello";
    printSize(v);  // Size: 4
    printSize(s);  // Size: 5
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Constraints and concepts', url: 'https://en.cppreference.com/w/cpp/language/constraints', description: 'Complete C++20 concepts reference' },
        { type: 'cppreference', title: 'concept keyword', url: 'https://en.cppreference.com/w/cpp/keyword/concept', description: 'Concept definition syntax' },
        { type: 'textbook', title: 'C++20: The Complete Guide', author: 'Nicolai Josuttis', description: 'Part I: Concepts' },
      ]} />
    </div>
  )
}
