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

export default function S1StructuredBindings() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Structured bindings, introduced in C++17, allow you to decompose an object into its
        constituent parts and bind each part to a named variable in a single declaration. They
        work with pairs, tuples, arrays, and structs with public members.
      </p>

      <DefinitionBlock title="Structured Bindings">
        <p>
          A structured binding declaration introduces all identifiers in the bracket list as names
          bound to the elements of the initializer expression. The syntax
          <code>auto [a, b] = expr;</code> decomposes <code>expr</code> into its components and
          binds them to <code>a</code> and <code>b</code>.
        </p>
      </DefinitionBlock>

      <SyntaxBlock title="Structured Binding Syntax">
        <p>
          The declaration can use <code>auto</code>, <code>const auto&</code>, or <code>auto&&</code>
          to control how the values are bound.
        </p>
        <CppCode>{`auto  [a, b] = expr;       // copies
const auto& [a, b] = expr; // const references
auto&& [a, b] = expr;      // forwarding references`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Binding to Pairs, Tuples, and Structs</h2>

      <CppCode title="structured_bindings.cpp">{`#include <iostream>
#include <tuple>
#include <map>
#include <string>

struct Point {
    double x, y;
};

std::pair<bool, std::string> validate(int age) {
    if (age >= 0 && age <= 150)
        return {true, "Valid"};
    return {false, "Invalid age"};
}

int main() {
    // Binding to a pair
    auto [ok, message] = validate(25);
    std::cout << ok << ": " << message << "\\n";

    // Binding to a tuple
    auto [name, score, passed] = std::make_tuple("Alice", 95.5, true);
    std::cout << name << " scored " << score << "\\n";

    // Binding to a struct
    Point p{3.0, 4.0};
    auto [x, y] = p;
    std::cout << "Point: (" << x << ", " << y << ")\\n";

    // Binding to an array
    int arr[] = {10, 20, 30};
    auto [a, b, c] = arr;
    std::cout << a << " " << b << " " << c << "\\n";

    return 0;
}`}</CppCode>

      <OutputBlock>{`1: Valid
Alice scored 95.5
Point: (3, 4)
10 20 30`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Iterating Maps with Structured Bindings</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        One of the most common uses of structured bindings is iterating over <code>std::map</code>,
        where each element is a <code>std::pair&lt;const Key, Value&gt;</code>.
      </p>

      <CppCode title="map_iteration.cpp">{`#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> scores = {
        {"Alice", 95}, {"Bob", 87}, {"Carol", 92}
    };

    // Clean iteration with structured bindings
    for (const auto& [name, score] : scores) {
        std::cout << name << ": " << score << "\\n";
    }

    // Modify values through non-const reference
    for (auto& [name, score] : scores) {
        score += 5;  // bonus points
    }

    std::cout << "After bonus:\\n";
    for (const auto& [name, score] : scores) {
        std::cout << name << ": " << score << "\\n";
    }

    return 0;
}`}</CppCode>

      <OutputBlock>{`Alice: 95
Bob: 87
Carol: 92
After bonus:
Alice: 100
Bob: 92
Carol: 97`}</OutputBlock>

      <NoteBlock type="tip" title="const auto& for read-only access">
        <p>
          Use <code>const auto&</code> when you only need to read values. This avoids unnecessary
          copies and makes your intent clear. Use <code>auto&</code> when you need to modify the
          bound variables in place.
        </p>
      </NoteBlock>

      <NoteBlock type="info" title="How it works under the hood">
        <p>
          Structured bindings work by decomposing the initializer using either <code>std::tuple_size</code>
          and <code>std::get</code> (for tuple-like types), direct member access (for simple structs),
          or element access (for arrays). The number of identifiers must match the number of elements exactly.
        </p>
      </NoteBlock>

      <CompilerNoteBlock compiler="all" title="Requires C++17">
        <p>
          Structured bindings require C++17 or later. Compile with <code>-std=c++17</code> (GCC/Clang)
          or <code>/std:c++17</code> (MSVC).
        </p>
      </CompilerNoteBlock>

      <BestPracticeBlock title="Use structured bindings to improve readability">
        <p>
          Structured bindings replace verbose patterns like <code>pair.first</code> and
          <code>std::get&lt;0&gt;(tuple)</code> with meaningful names. They make code self-documenting
          and are especially valuable when iterating over maps or unpacking function return values.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Structured Binding with Custom Type"
        difficulty="beginner"
        prompt="Create a function that returns a struct with three fields (name, age, email). Use structured bindings to decompose the return value and print each field."
        hints={[
          "Define a struct with the three fields",
          "Return the struct from the function using brace initialization",
          "Use auto [name, age, email] = functionCall() to decompose",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <string>

struct Person {
    std::string name;
    int age;
    std::string email;
};

Person getPerson() {
    return {"Alice", 30, "alice@example.com"};
}

int main() {
    auto [name, age, email] = getPerson();
    std::cout << "Name:  " << name << "\\n";
    std::cout << "Age:   " << age << "\\n";
    std::cout << "Email: " << email << "\\n";
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Structured bindings', url: 'https://en.cppreference.com/w/cpp/language/structured_binding', description: 'Structured binding declaration (C++17)' },
        { type: 'cppreference', title: 'std::tuple', url: 'https://en.cppreference.com/w/cpp/utility/tuple', description: 'Fixed-size heterogeneous collection' },
        { type: 'textbook', title: 'C++17 - The Complete Guide', author: 'Nicolai Josuttis', description: 'Chapter 1: Structured Bindings' },
      ]} />
    </div>
  )
}
