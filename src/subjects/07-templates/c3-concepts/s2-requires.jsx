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

export default function S2Requires() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The <code>requires</code> keyword serves dual purposes in C++20: it introduces a <strong>requires
        clause</strong> that constrains a template, and it begins a <strong>requires expression</strong> that
        checks whether a set of expressions are valid for a given type. Requires expressions are the
        building blocks of custom concepts.
      </p>

      <DefinitionBlock title="Requires Expression">
        <p>
          A <strong>requires expression</strong> is a compile-time predicate that tests whether a sequence
          of syntactic requirements are satisfied. It takes the form <code>requires(parameters) {"{"} requirements; {"}"}</code> and
          evaluates to <code>true</code> if all requirements are valid, <code>false</code> otherwise.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Simple Requirements</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        A simple requirement asserts that an expression is valid (it compiles). It does not evaluate
        the expression or check its return type.
      </p>

      <CppCode title="Simple requirements">{`#include <iostream>
#include <concepts>

template<typename T>
concept Addable = requires(T a, T b) {
    a + b;     // must support addition
    a - b;     // must support subtraction
    -a;        // must support unary negation
};

template<Addable T>
T difference(T a, T b) {
    return a - b;
}

int main() {
    std::cout << difference(10, 3) << std::endl;
    std::cout << difference(5.5, 2.2) << std::endl;
    // difference(std::string("a"), std::string("b")); // Error: no operator-
    return 0;
}`}</CppCode>

      <OutputBlock>{`7
3.3`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Type Requirements</h2>

      <SyntaxBlock title="Type requirement syntax">
        <p>
          Type requirements check that a named type exists. They use the <code>typename</code> keyword
          inside a requires expression to verify that a type alias or nested type is valid.
        </p>
        <CppCode>{`template<typename T>
concept HasValueType = requires {
    typename T::value_type;       // T must have a nested value_type
    typename T::iterator;         // T must have a nested iterator type
};`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Type requirements in practice">{`#include <iostream>
#include <vector>
#include <string>

template<typename T>
concept IterableContainer = requires(T t) {
    typename T::value_type;
    typename T::iterator;
    t.begin();
    t.end();
};

template<IterableContainer C>
void printFirst(const C& c) {
    if (c.begin() != c.end())
        std::cout << "First: " << *c.begin() << std::endl;
}

int main() {
    std::vector<int> v = {10, 20, 30};
    std::string s = "hello";
    printFirst(v);
    printFirst(s);
    return 0;
}`}</CppCode>

      <OutputBlock>{`First: 10
First: h`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Compound Requirements</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Compound requirements check that an expression is valid, optionally that it does not throw,
        and optionally that its return type satisfies a type constraint.
      </p>

      <SyntaxBlock title="Compound requirement syntax">
        <p>
          The syntax is <code>{"{"}expression{"}"} noexcept -&gt; ConceptOrType;</code>. Both <code>noexcept</code> and
          the return type constraint are optional.
        </p>
        <CppCode>{`template<typename T>
concept Comparable = requires(T a, T b) {
    { a == b } -> std::convertible_to<bool>;
    { a != b } -> std::convertible_to<bool>;
    { a < b }  -> std::convertible_to<bool>;
};`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Compound requirements example">{`#include <iostream>
#include <concepts>
#include <string>

template<typename T>
concept Stringifiable = requires(T t) {
    { t.toString() } -> std::convertible_to<std::string>;
};

struct Point {
    int x, y;
    std::string toString() const {
        return "(" + std::to_string(x) + ", " + std::to_string(y) + ")";
    }
};

template<Stringifiable T>
void show(const T& obj) {
    std::cout << obj.toString() << std::endl;
}

int main() {
    Point p{3, 4};
    show(p);
    return 0;
}`}</CppCode>

      <OutputBlock>{`(3, 4)`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Nested Requirements</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Nested requirements allow you to embed additional <code>requires</code> clauses inside a
        requires expression, enabling more complex constraint logic.
      </p>

      <CppCode title="Nested requirements">{`#include <iostream>
#include <type_traits>

template<typename T>
concept SignedNumeric = requires {
    requires std::is_arithmetic_v<T>;
    requires std::is_signed_v<T>;
};

template<SignedNumeric T>
T absolute(T val) {
    return val < 0 ? -val : val;
}

int main() {
    std::cout << absolute(-42) << std::endl;
    std::cout << absolute(-3.14) << std::endl;
    // absolute(42u); // Error: unsigned int is not signed
    return 0;
}`}</CppCode>

      <OutputBlock>{`42
3.14`}</OutputBlock>

      <WarningBlock title="requires requires">
        <p>
          When using a requires expression directly in a requires clause, you write <code>requires
          requires</code> -- the first is the clause, the second starts the expression. While syntactically
          valid, this is hard to read. Prefer defining a named concept instead.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Name your concepts">
        <p>
          Avoid inline <code>requires requires</code> expressions. Instead, extract them into named
          concepts. Named concepts are reusable, testable, and make template declarations far more
          readable. A good concept name communicates intent better than a list of raw requirements.
        </p>
      </BestPracticeBlock>

      <NoteBlock type="tip" title="Combining requirement kinds">
        <p>
          A single requires expression can mix all four requirement kinds: simple, type, compound,
          and nested. They are checked independently, and all must be satisfied for the overall
          expression to be <code>true</code>.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Define a Hashable Concept"
        difficulty="intermediate"
        prompt="Define a concept called Hashable that requires: (1) a type can be passed to std::hash, (2) the result is convertible to std::size_t, and (3) the type supports equality comparison. Test it with std::string and int."
        hints={[
          "Use a compound requirement: { std::hash<T>{}(t) } -> std::convertible_to<std::size_t>",
          "Also require { t == t } -> std::convertible_to<bool>",
          "Include <functional> for std::hash",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <functional>
#include <concepts>
#include <string>

template<typename T>
concept Hashable = requires(T t) {
    { std::hash<T>{}(t) } -> std::convertible_to<std::size_t>;
    { t == t } -> std::convertible_to<bool>;
};

template<Hashable T>
std::size_t getHash(const T& val) {
    return std::hash<T>{}(val);
}

int main() {
    std::cout << getHash(42) << std::endl;
    std::cout << getHash(std::string("hello")) << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Requires expression', url: 'https://en.cppreference.com/w/cpp/language/requires', description: 'All four requirement kinds explained' },
        { type: 'cppreference', title: 'Constraints and concepts', url: 'https://en.cppreference.com/w/cpp/language/constraints', description: 'Requires clauses and constraint normalization' },
        { type: 'textbook', title: 'C++20: The Complete Guide', author: 'Nicolai Josuttis', description: 'Chapter on requires expressions' },
      ]} />
    </div>
  )
}
