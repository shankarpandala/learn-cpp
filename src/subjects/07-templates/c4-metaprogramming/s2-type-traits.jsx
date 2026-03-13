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

export default function S2TypeTraits() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The <code>&lt;type_traits&gt;</code> header provides a comprehensive set of compile-time utilities
        for querying and transforming types. Type traits are the building blocks of template
        metaprogramming, enabling conditional compilation, static assertions, and type-safe generic code.
      </p>

      <DefinitionBlock title="Type Traits">
        <p>
          <strong>Type traits</strong> are template structs that provide compile-time information about
          types. <strong>Unary type traits</strong> query properties of a single type (e.g., is it an
          integer?). <strong>Type transformations</strong> modify types (e.g., remove const). Each trait
          exposes its result as a <code>::value</code> (for predicates) or <code>::type</code> (for transformations).
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Type Classification Traits</h2>

      <CppCode title="Querying type properties">{`#include <iostream>
#include <type_traits>

template<typename T>
void classify() {
    std::cout << std::boolalpha;
    std::cout << "is_integral:       " << std::is_integral_v<T> << std::endl;
    std::cout << "is_floating_point: " << std::is_floating_point_v<T> << std::endl;
    std::cout << "is_pointer:        " << std::is_pointer_v<T> << std::endl;
    std::cout << "is_reference:      " << std::is_reference_v<T> << std::endl;
    std::cout << "is_const:          " << std::is_const_v<T> << std::endl;
    std::cout << "---" << std::endl;
}

int main() {
    classify<int>();
    classify<const double>();
    classify<int*>();
    return 0;
}`}</CppCode>

      <OutputBlock>{`is_integral:       true
is_floating_point: false
is_pointer:        false
is_reference:      false
is_const:          false
---
is_integral:       false
is_floating_point: true
is_pointer:        false
is_reference:      false
is_const:          true
---
is_integral:       false
is_floating_point: false
is_pointer:        true
is_reference:      false
is_const:          false
---`}</OutputBlock>

      <SyntaxBlock title="Trait value access">
        <p>
          Every predicate trait has a <code>::value</code> member and a C++17 variable template shorthand
          with the <code>_v</code> suffix.
        </p>
        <CppCode>{`// Verbose form (C++11)
std::is_integral<int>::value       // true

// Shorthand (C++17)
std::is_integral_v<int>            // true

// Similarly for type transformations:
typename std::remove_const<const int>::type  // int
std::remove_const_t<const int>               // int (C++14)`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Type Relationship Traits</h2>

      <CppCode title="Checking type relationships">{`#include <iostream>
#include <type_traits>
#include <string>

struct Base {};
struct Derived : Base {};

int main() {
    std::cout << std::boolalpha;
    std::cout << "same: " << std::is_same_v<int, int> << std::endl;
    std::cout << "same: " << std::is_same_v<int, long> << std::endl;
    std::cout << "base_of: " << std::is_base_of_v<Base, Derived> << std::endl;
    std::cout << "convertible: "
              << std::is_convertible_v<int, double> << std::endl;
    std::cout << "convertible: "
              << std::is_convertible_v<std::string, int> << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`same: true
same: false
base_of: true
convertible: true
convertible: false`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Type Transformations</h2>

      <CppCode title="Modifying types at compile time">{`#include <iostream>
#include <type_traits>

template<typename T>
void showTransforms() {
    using NoConst = std::remove_const_t<T>;
    using NoRef   = std::remove_reference_t<T>;
    using Ptr     = std::add_pointer_t<T>;

    std::cout << std::boolalpha;
    std::cout << "remove_const same as T: "
              << std::is_same_v<NoConst, T> << std::endl;
    std::cout << "remove_ref same as T: "
              << std::is_same_v<NoRef, T> << std::endl;
}

int main() {
    std::cout << "--- const int ---" << std::endl;
    showTransforms<const int>();

    std::cout << "--- int& ---" << std::endl;
    showTransforms<int&>();
    return 0;
}`}</CppCode>

      <OutputBlock>{`--- const int ---
remove_const same as T: false
remove_ref same as T: true
--- int& ---
remove_const same as T: true
remove_ref same as T: false`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::conditional</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>std::conditional</code> selects one of two types based on a compile-time boolean condition.
        It is the type-level equivalent of the ternary operator.
      </p>

      <CppCode title="Compile-time type selection">{`#include <iostream>
#include <type_traits>

template<typename T>
void store(T val) {
    // Use double for small types, T itself for larger types
    using StorageType = std::conditional_t<(sizeof(T) < 4), double, T>;
    StorageType stored = static_cast<StorageType>(val);
    std::cout << "sizeof(T)=" << sizeof(T)
              << " sizeof(stored)=" << sizeof(stored) << std::endl;
}

int main() {
    store('A');          // char -> stored as double
    store(short(42));    // short -> stored as double
    store(3.14);         // double -> stored as double
    store(42L);          // long -> stored as long
    return 0;
}`}</CppCode>

      <OutputBlock>{`sizeof(T)=1 sizeof(stored)=8
sizeof(T)=2 sizeof(stored)=8
sizeof(T)=8 sizeof(stored)=8
sizeof(T)=8 sizeof(stored)=8`}</OutputBlock>

      <NoteBlock type="tip" title="static_assert with type traits">
        <p>
          Combine type traits with <code>static_assert</code> to produce compile-time errors with
          clear messages: <code>static_assert(std::is_integral_v&lt;T&gt;, "T must be an integral type");</code>.
          This is simpler than SFINAE when you want to reject types outright rather than provide alternatives.
        </p>
      </NoteBlock>

      <WarningBlock title="decay strips qualifiers">
        <p>
          <code>std::decay_t&lt;T&gt;</code> removes references, const/volatile qualifiers, and converts
          arrays to pointers and functions to function pointers. Be aware of this when comparing types --
          <code>std::is_same_v&lt;const int&amp;, int&gt;</code> is false, but
          <code>std::is_same_v&lt;std::decay_t&lt;const int&amp;&gt;, int&gt;</code> is true.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Use _v and _t suffixes">
        <p>
          Always prefer the C++17 <code>_v</code> variable templates and C++14 <code>_t</code> alias
          templates over the verbose <code>::value</code> and <code>::type</code> syntax. They reduce
          clutter and make metaprogramming code significantly more readable.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Safe Numeric Cast"
        difficulty="intermediate"
        prompt="Write a function template safeCast that converts a value from type From to type To, but only compiles if both types are arithmetic. Use static_assert with type traits. Print a message indicating if the cast is narrowing (sizeof(To) < sizeof(From))."
        hints={[
          "Use static_assert with std::is_arithmetic_v for both types",
          "Compare sizeof(To) and sizeof(From) for the narrowing check",
          "Use if constexpr for the compile-time size comparison",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <type_traits>

template<typename To, typename From>
To safeCast(From val) {
    static_assert(std::is_arithmetic_v<From>, "From must be arithmetic");
    static_assert(std::is_arithmetic_v<To>, "To must be arithmetic");

    if constexpr (sizeof(To) < sizeof(From)) {
        std::cout << "Warning: narrowing cast" << std::endl;
    }
    return static_cast<To>(val);
}

int main() {
    int i = safeCast<int>(3.14);
    std::cout << i << std::endl;

    double d = safeCast<double>(42);
    std::cout << d << std::endl;

    short s = safeCast<short>(100000L);
    std::cout << s << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Type traits library', url: 'https://en.cppreference.com/w/cpp/header/type_traits', description: 'Complete list of type traits' },
        { type: 'cppreference', title: 'std::conditional', url: 'https://en.cppreference.com/w/cpp/types/conditional', description: 'Compile-time type selection' },
        { type: 'cppreference', title: 'std::is_same', url: 'https://en.cppreference.com/w/cpp/types/is_same', description: 'Type identity check' },
      ]} />
    </div>
  )
}
