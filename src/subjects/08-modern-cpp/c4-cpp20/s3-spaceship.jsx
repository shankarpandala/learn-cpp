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

export default function S3Spaceship() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The three-way comparison operator <code>&lt;=&gt;</code>, commonly called the
        <strong> spaceship operator</strong>, was introduced in C++20. A single
        <code>operator&lt;=&gt;</code> definition can automatically generate all six comparison
        operators (<code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>,
        <code>&lt;=</code>, <code>&gt;=</code>), drastically reducing boilerplate.
      </p>

      <DefinitionBlock title="Three-Way Comparison">
        <p>
          The expression <code>a &lt;=&gt; b</code> returns an ordering value: negative if
          <code>a &lt; b</code>, zero if <code>a == b</code>, and positive if <code>a &gt; b</code>.
          The return type determines the kind of ordering: <code>strong_ordering</code>,
          <code>weak_ordering</code>, or <code>partial_ordering</code>.
        </p>
      </DefinitionBlock>

      <SyntaxBlock title="Ordering Categories">
        <p>
          C++20 defines three ordering categories in <code>&lt;compare&gt;</code>:
        </p>
        <CppCode>{`#include <compare>

// strong_ordering:  equal values are indistinguishable
// weak_ordering:    equal values may differ in some way
// partial_ordering: some values may be incomparable (e.g., NaN)

auto result = a <=> b;
// result < 0   means a < b
// result == 0  means a == b
// result > 0   means a > b`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Auto-Generated Operators</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Defaulting <code>operator&lt;=&gt;</code> performs memberwise comparison and automatically
        generates all six relational operators. Defaulting <code>operator==</code> separately is
        needed for <code>==</code> and <code>!=</code>.
      </p>

      <CppCode title="spaceship_basic.cpp">{`#include <iostream>
#include <compare>
#include <string>

struct Version {
    int major;
    int minor;
    int patch;

    // Default: memberwise comparison in declaration order
    auto operator<=>(const Version&) const = default;
};

int main() {
    Version v1{2, 1, 0};
    Version v2{2, 3, 1};
    Version v3{2, 1, 0};

    std::cout << std::boolalpha;
    std::cout << "v1 < v2:  " << (v1 < v2) << "\\n";
    std::cout << "v1 == v3: " << (v1 == v3) << "\\n";
    std::cout << "v2 >= v1: " << (v2 >= v1) << "\\n";
    std::cout << "v1 != v2: " << (v1 != v2) << "\\n";

    auto cmp = v1 <=> v2;
    if (cmp < 0) std::cout << "v1 comes before v2\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`v1 < v2:  true
v1 == v3: true
v2 >= v1: true
v1 != v2: true
v1 comes before v2`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Custom Three-Way Comparison</h2>

      <CppCode title="custom_spaceship.cpp">{`#include <iostream>
#include <compare>
#include <string>
#include <cmath>

// Case-insensitive string wrapper
struct CIString {
    std::string value;

    std::weak_ordering operator<=>(const CIString& other) const {
        auto toLower = [](char c) { return std::tolower(c); };
        auto it1 = value.begin(), it2 = other.value.begin();
        for (; it1 != value.end() && it2 != other.value.end(); ++it1, ++it2) {
            char c1 = toLower(*it1), c2 = toLower(*it2);
            if (c1 < c2) return std::weak_ordering::less;
            if (c1 > c2) return std::weak_ordering::greater;
        }
        if (value.size() < other.value.size()) return std::weak_ordering::less;
        if (value.size() > other.value.size()) return std::weak_ordering::greater;
        return std::weak_ordering::equivalent;
    }

    bool operator==(const CIString& other) const {
        return (*this <=> other) == 0;
    }
};

int main() {
    CIString a{"Hello"}, b{"hello"}, c{"World"};
    std::cout << std::boolalpha;
    std::cout << "Hello == hello: " << (a == b) << "\\n";
    std::cout << "Hello < World:  " << (a < c) << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`Hello == hello: true
Hello < World:  true`}</OutputBlock>

      <NoteBlock type="info" title="strong vs weak vs partial ordering">
        <p>
          Use <code>strong_ordering</code> when equal values are truly identical (like integers).
          Use <code>weak_ordering</code> when values can be equivalent but distinguishable (like
          case-insensitive strings). Use <code>partial_ordering</code> when some values are
          incomparable (like floating-point numbers with NaN).
        </p>
      </NoteBlock>

      <NoteBlock type="tip" title="Separate operator== for efficiency">
        <p>
          When you default <code>operator&lt;=&gt;</code>, the compiler generates <code>==</code>
          using <code>&lt;=&gt;</code>. For types like <code>std::string</code> where equality can
          be checked faster (e.g., comparing lengths first), defaulting <code>operator==</code>
          separately allows the compiler to use the more efficient memberwise equality check.
        </p>
      </NoteBlock>

      <CompilerNoteBlock compiler="all" title="Requires C++20">
        <p>
          The spaceship operator requires <code>-std=c++20</code> (GCC/Clang) or
          <code>/std:c++20</code> (MSVC). Include <code>&lt;compare&gt;</code> for the ordering types.
        </p>
      </CompilerNoteBlock>

      <BestPracticeBlock title="Default operator<=> when possible">
        <p>
          For value types with straightforward comparison semantics, use <code>auto
          operator&lt;=&gt;(const T&) const = default;</code>. This generates correct, efficient
          comparison operators with minimal code and no risk of inconsistencies between operators.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Comparable Point Class"
        difficulty="intermediate"
        prompt="Create a Point3D class with x, y, z coordinates. Use the defaulted spaceship operator for comparison. Demonstrate sorting a vector of points."
        hints={[
          "Default operator<=> compares members in declaration order",
          "Include <algorithm> for std::sort",
          "Points will sort by x first, then y, then z",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <compare>
#include <vector>
#include <algorithm>

struct Point3D {
    double x, y, z;
    auto operator<=>(const Point3D&) const = default;
};

int main() {
    std::vector<Point3D> points = {
        {3, 1, 0}, {1, 2, 3}, {1, 2, 1}, {2, 0, 0}
    };
    std::sort(points.begin(), points.end());
    for (const auto& p : points) {
        std::cout << "(" << p.x << "," << p.y << "," << p.z << ")\\n";
    }
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Three-way comparison', url: 'https://en.cppreference.com/w/cpp/language/operator_comparison#Three-way_comparison', description: 'Spaceship operator specification' },
        { type: 'cppreference', title: 'std::strong_ordering', url: 'https://en.cppreference.com/w/cpp/utility/compare/strong_ordering', description: 'Strong ordering type' },
        { type: 'textbook', title: 'C++20 - The Complete Guide', author: 'Nicolai Josuttis', description: 'Chapter 5: operator<=>' },
      ]} />
    </div>
  )
}
