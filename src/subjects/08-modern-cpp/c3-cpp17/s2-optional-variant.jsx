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

export default function S2OptionalVariant() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++17 introduced vocabulary types that express common patterns in a type-safe way:
        <code>std::optional</code> for nullable values, <code>std::variant</code> for type-safe
        unions, and <code>std::any</code> for type-erased values. These types replace error-prone
        patterns like sentinel values, C unions, and <code>void*</code>.
      </p>

      <DefinitionBlock title="std::optional">
        <p>
          <code>std::optional&lt;T&gt;</code> represents a value that may or may not be present.
          It either contains a value of type <code>T</code> or is empty (<code>std::nullopt</code>).
          It is ideal for functions that can fail without throwing an exception.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::optional</h2>

      <CppCode title="optional_demo.cpp">{`#include <iostream>
#include <optional>
#include <string>
#include <charconv>

std::optional<int> parseInt(const std::string& s) {
    int result;
    auto [ptr, ec] = std::from_chars(s.data(), s.data() + s.size(), result);
    if (ec == std::errc{} && ptr == s.data() + s.size())
        return result;
    return std::nullopt;
}

int main() {
    auto a = parseInt("42");
    auto b = parseInt("abc");

    if (a) std::cout << "Parsed: " << *a << "\\n";
    std::cout << "b has value: " << b.has_value() << "\\n";

    // value_or provides a default
    int val = b.value_or(-1);
    std::cout << "Default: " << val << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`Parsed: 42
b has value: 0
Default: -1`}</OutputBlock>

      <WarningBlock title="Do not dereference an empty optional">
        <p>
          Accessing the value of an empty <code>optional</code> with <code>*opt</code> or
          <code>opt-&gt;</code> is undefined behavior. Use <code>has_value()</code> or a boolean
          check first. <code>value()</code> throws <code>std::bad_optional_access</code> if empty.
        </p>
      </WarningBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::variant</h2>

      <DefinitionBlock title="std::variant">
        <p>
          <code>std::variant&lt;Types...&gt;</code> is a type-safe union that holds exactly one
          value from its list of alternative types. Unlike C unions, it tracks which type is active
          and prevents access through the wrong type.
        </p>
      </DefinitionBlock>

      <CppCode title="variant_demo.cpp">{`#include <iostream>
#include <variant>
#include <string>

using Value = std::variant<int, double, std::string>;

void printValue(const Value& v) {
    std::visit([](const auto& val) {
        std::cout << val << "\\n";
    }, v);
}

std::string typeOf(const Value& v) {
    return std::visit([](const auto& val) -> std::string {
        using T = std::decay_t<decltype(val)>;
        if constexpr (std::is_same_v<T, int>) return "int";
        else if constexpr (std::is_same_v<T, double>) return "double";
        else return "string";
    }, v);
}

int main() {
    Value v1 = 42;
    Value v2 = 3.14;
    Value v3 = std::string("hello");

    for (const auto& v : {v1, v2}) {
        std::cout << typeOf(v) << ": ";
        printValue(v);
    }
    std::cout << typeOf(v3) << ": ";
    printValue(v3);

    // std::get throws bad_variant_access if wrong type
    std::cout << "int value: " << std::get<int>(v1) << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`int: 42
double: 3.14
string: hello
int value: 42`}</OutputBlock>

      <NoteBlock type="info" title="std::visit">
        <p>
          <code>std::visit</code> applies a callable (often a generic lambda) to the active
          alternative of a variant. It ensures at compile time that all alternatives are handled.
          For multiple variants, it generates a dispatch table over all combinations.
        </p>
      </NoteBlock>

      <NoteBlock type="tip" title="std::any for fully type-erased values">
        <p>
          <code>std::any</code> can hold a value of any copyable type. Use <code>std::any_cast</code>
          to retrieve it. Unlike <code>variant</code>, the set of types is open. However, it lacks
          compile-time type checking and is less efficient. Prefer <code>variant</code> when the
          set of types is known.
        </p>
      </NoteBlock>

      <SyntaxBlock title="std::any Quick Reference">
        <p>
          <code>std::any</code> lives in <code>&lt;any&gt;</code> and provides runtime type safety
          through <code>std::any_cast</code>, which throws <code>std::bad_any_cast</code> on type mismatch.
        </p>
        <CppCode>{`#include <any>
std::any a = 42;
int val = std::any_cast<int>(a);     // OK
// std::any_cast<double>(a);         // throws bad_any_cast`}</CppCode>
      </SyntaxBlock>

      <BestPracticeBlock title="Choose the right vocabulary type">
        <p>
          Use <code>std::optional</code> when a value might be absent. Use <code>std::variant</code>
          when a value can be one of a known set of types. Use <code>std::any</code> only when the
          type set is truly open. Prefer these over raw pointers, sentinel values, or C unions.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Shape Area Calculator"
        difficulty="intermediate"
        prompt="Define a variant Shape that can hold a Circle (radius), Rectangle (width, height), or Triangle (base, height). Write a function that uses std::visit to compute the area of any shape."
        hints={[
          "Define structs for Circle, Rectangle, and Triangle",
          "Use std::variant<Circle, Rectangle, Triangle> as the Shape type",
          "In std::visit, use if constexpr or an overloaded lambda to compute area",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <variant>
#include <cmath>

struct Circle    { double radius; };
struct Rectangle { double width, height; };
struct Triangle  { double base, height; };

using Shape = std::variant<Circle, Rectangle, Triangle>;

double area(const Shape& s) {
    return std::visit([](const auto& shape) -> double {
        using T = std::decay_t<decltype(shape)>;
        if constexpr (std::is_same_v<T, Circle>)
            return M_PI * shape.radius * shape.radius;
        else if constexpr (std::is_same_v<T, Rectangle>)
            return shape.width * shape.height;
        else
            return 0.5 * shape.base * shape.height;
    }, s);
}

int main() {
    Shape c = Circle{5.0};
    Shape r = Rectangle{3.0, 4.0};
    Shape t = Triangle{6.0, 3.0};
    std::cout << "Circle: "    << area(c) << "\\n";
    std::cout << "Rectangle: " << area(r) << "\\n";
    std::cout << "Triangle: "  << area(t) << "\\n";
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::optional', url: 'https://en.cppreference.com/w/cpp/utility/optional', description: 'Optional value wrapper (C++17)' },
        { type: 'cppreference', title: 'std::variant', url: 'https://en.cppreference.com/w/cpp/utility/variant', description: 'Type-safe discriminated union (C++17)' },
        { type: 'cppreference', title: 'std::any', url: 'https://en.cppreference.com/w/cpp/utility/any', description: 'Type-safe container for any type (C++17)' },
      ]} />
    </div>
  )
}
