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

export default function S3ComparisonOps() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++20 introduced the three-way comparison operator <code>&lt;=&gt;</code>, commonly
        called the "spaceship operator." It can replace up to six comparison operators with a
        single definition, and the compiler can automatically generate the rest. This dramatically
        reduces boilerplate for comparable types.
      </p>

      <DefinitionBlock title="Three-Way Comparison (Spaceship Operator)">
        <p>
          The <strong>spaceship operator</strong> (<code>&lt;=&gt;</code>) performs a three-way
          comparison, returning a value that indicates whether the left operand is less than, equal
          to, or greater than the right operand. The return type (from <code>&lt;compare&gt;</code>)
          encodes the comparison category: <code>std::strong_ordering</code>,
          <code>std::weak_ordering</code>, or <code>std::partial_ordering</code>.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Comparison Categories</h2>

      <SyntaxBlock title="Ordering types">
        <p>
          C++20 defines three ordering categories reflecting different equivalence semantics.
        </p>
        <CppCode>{`#include <compare>

// strong_ordering:  equivalent values are indistinguishable
//   values: less, equal, equivalent, greater
std::strong_ordering

// weak_ordering:    equivalent values may differ in some way
//   values: less, equivalent, greater
std::weak_ordering

// partial_ordering: some values may be incomparable (e.g., NaN)
//   values: less, equivalent, greater, unordered
std::partial_ordering`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic Usage</h2>

      <CppCode title="Defaulted spaceship operator">{`#include <iostream>
#include <compare>
#include <string>

class Student {
    std::string name;
    int grade;
public:
    Student(std::string n, int g) : name(std::move(n)), grade(g) {}

    // Compiler generates ==, !=, <, >, <=, >= automatically
    auto operator<=>(const Student&) const = default;

    friend std::ostream& operator<<(std::ostream& os, const Student& s) {
        return os << s.name << " (grade " << s.grade << ")";
    }
};

int main() {
    Student a("Alice", 90), b("Bob", 85), c("Alice", 90);

    std::cout << std::boolalpha;
    std::cout << (a == c) << std::endl;   // true
    std::cout << (a > b) << std::endl;    // true (lexicographic: name first)
    std::cout << (b < a) << std::endl;    // true
    return 0;
}`}</CppCode>

      <OutputBlock>{`true
true
true`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Custom Three-Way Comparison</h2>

      <CppCode title="Custom spaceship with specific ordering">{`#include <iostream>
#include <compare>

class Version {
    int major, minor, patch;
public:
    Version(int ma, int mi, int p) : major(ma), minor(mi), patch(p) {}

    std::strong_ordering operator<=>(const Version& other) const {
        if (auto cmp = major <=> other.major; cmp != 0) return cmp;
        if (auto cmp = minor <=> other.minor; cmp != 0) return cmp;
        return patch <=> other.patch;
    }

    // When you define custom <=>, you must also define == explicitly
    bool operator==(const Version& other) const {
        return (*this <=> other) == 0;
    }

    friend std::ostream& operator<<(std::ostream& os, const Version& v) {
        return os << v.major << "." << v.minor << "." << v.patch;
    }
};

int main() {
    Version v1(2, 1, 0), v2(2, 1, 3), v3(3, 0, 0);

    std::cout << std::boolalpha;
    std::cout << v1 << " < " << v2 << " : " << (v1 < v2) << std::endl;
    std::cout << v3 << " > " << v2 << " : " << (v3 > v2) << std::endl;
    std::cout << v1 << " == " << v1 << " : " << (v1 == v1) << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`2.1.0 < 2.1.3 : true
3.0.0 > 2.1.3 : true
2.1.0 == 2.1.0 : true`}</OutputBlock>

      <NoteBlock type="info" title="Defaulted vs custom operator<=>">
        <p>
          A <code>= default</code> spaceship operator performs memberwise comparison in declaration
          order and also auto-generates <code>operator==</code>. A custom spaceship does
          <strong>not</strong> auto-generate <code>operator==</code> -- you must define it separately.
          This is because the compiler assumes a custom <code>&lt;=&gt;</code> might have different
          equality semantics.
        </p>
      </NoteBlock>

      <NoteBlock type="history" title="Before C++20">
        <p>
          Before C++20, making a type fully comparable required defining all six operators
          (<code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>,
          <code>&lt;=</code>, <code>&gt;=</code>) manually or using CRTP helper bases.
          The spaceship operator reduces this to one or two definitions.
        </p>
      </NoteBlock>

      <CompilerNoteBlock compiler="all" title="C++20 required">
        <p>
          The spaceship operator requires C++20 or later. Compile with <code>-std=c++20</code> (GCC/Clang)
          or <code>/std:c++20</code> (MSVC). Include <code>&lt;compare&gt;</code> for the ordering types.
        </p>
      </CompilerNoteBlock>

      <BestPracticeBlock title="Default whenever possible">
        <p>
          Use <code>auto operator&lt;=&gt;(const T&) const = default;</code> when memberwise
          comparison in declaration order is correct. Only write a custom implementation when you
          need to compare a subset of members, use a different ordering, or apply special logic.
          The defaulted version is shorter, harder to get wrong, and adapts automatically when
          you add new members.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Comparable Point Class"
        difficulty="intermediate"
        prompt="Create a Point2D class with x and y coordinates. Implement operator<=> that orders points by distance from the origin. Since floating-point distances can be unequal for 'equivalent' points, use std::partial_ordering. Also implement operator== that checks exact coordinate equality."
        hints={[
          "Distance = sqrt(x*x + y*y), but you can compare x*x+y*y to avoid sqrt",
          "Use std::partial_ordering because doubles have NaN",
          "operator== should check both x and y for exact equality",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <compare>
#include <cmath>

class Point2D {
    double x, y;
public:
    Point2D(double x, double y) : x(x), y(y) {}

    double distSq() const { return x * x + y * y; }

    std::partial_ordering operator<=>(const Point2D& o) const {
        return distSq() <=> o.distSq();
    }
    bool operator==(const Point2D& o) const {
        return x == o.x && y == o.y;
    }

    friend std::ostream& operator<<(std::ostream& os, const Point2D& p) {
        return os << "(" << p.x << ", " << p.y << ")";
    }
};

int main() {
    Point2D a(3, 4), b(1, 1), c(4, 3);
    std::cout << std::boolalpha;
    std::cout << (a > b) << std::endl;   // true: 25 > 2
    std::cout << (a == c) << std::endl;  // false: different coords
    std::cout << (a < c) << std::endl;   // false: same distance
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Three-way comparison', url: 'https://en.cppreference.com/w/cpp/language/operator_comparison#Three-way_comparison', description: 'Spaceship operator reference' },
        { type: 'cppreference', title: 'std::strong_ordering', url: 'https://en.cppreference.com/w/cpp/utility/compare/strong_ordering', description: 'Strong ordering category' },
        { type: 'cppreference', title: 'Default comparisons', url: 'https://en.cppreference.com/w/cpp/language/default_comparisons', description: 'Auto-generated comparison operators' },
      ]} />
    </div>
  )
}
