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

export default function S2DeducingThis() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++23 introduces <strong>explicit object parameters</strong>, also known as
        <em> deducing this</em>. This feature allows a member function to take the object it is
        called on as an explicit first parameter, enabling powerful patterns like deduplication
        of const/non-const overloads, CRTP replacement, and recursive lambdas.
      </p>

      <DefinitionBlock title="Deducing this">
        <p>
          An explicit object parameter is declared using <code>this auto&& self</code> as the
          first parameter of a member function. The type of <code>self</code> is deduced from the
          calling expression, capturing whether the object is an lvalue, rvalue, const, or
          derived type.
        </p>
      </DefinitionBlock>

      <SyntaxBlock title="Explicit Object Parameter Syntax">
        <p>
          The keyword <code>this</code> before the parameter name marks it as the explicit
          object parameter. The function cannot be <code>static</code> and cannot have
          <code>const</code>/<code>volatile</code> qualifiers since those are deduced.
        </p>
        <CppCode>{`struct S {
    // Traditional: separate const and non-const overloads
    int& value();
    const int& value() const;

    // With deducing this: single function handles both
    template <typename Self>
    auto&& value(this Self&& self) {
        return std::forward<Self>(self).val_;
    }
};`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Deduplicating const Overloads</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        One of the most common use cases is eliminating the need for separate const and non-const
        member function overloads that have identical logic.
      </p>

      <CppCode title="dedup_const.cpp">{`#include <iostream>
#include <string>
#include <vector>

class TextBuffer {
    std::vector<std::string> lines_;
public:
    TextBuffer(std::initializer_list<std::string> init) : lines_(init) {}

    // Single function handles const and non-const
    template <typename Self>
    auto&& getLine(this Self&& self, size_t index) {
        return std::forward<Self>(self).lines_[index];
    }
};

int main() {
    TextBuffer buf{"Hello", "World"};
    buf.getLine(0) = "Hi";  // non-const: returns string&
    std::cout << buf.getLine(0) << "\\n";

    const TextBuffer& cbuf = buf;
    std::cout << cbuf.getLine(1) << "\\n";  // const: returns const string&
    // cbuf.getLine(1) = "test";  // ERROR: returns const reference
    return 0;
}`}</CppCode>

      <OutputBlock>{`Hi
World`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">CRTP Replacement</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Deducing this can replace the Curiously Recurring Template Pattern (CRTP) for mixins.
        Instead of passing the derived type as a template argument, the base class deduces it
        from the explicit object parameter.
      </p>

      <CppCode title="crtp_replacement.cpp">{`#include <iostream>
#include <string>

// Traditional CRTP requires: class Derived : public Printable<Derived>
// With deducing this, no template parameter needed:

struct Printable {
    template <typename Self>
    void print(this const Self& self) {
        std::cout << self.toString() << "\\n";
    }
};

struct Point : Printable {
    double x, y;
    Point(double x, double y) : x(x), y(y) {}
    std::string toString() const {
        return "(" + std::to_string(x) + ", " + std::to_string(y) + ")";
    }
};

struct Color : Printable {
    std::string name;
    Color(std::string n) : name(std::move(n)) {}
    std::string toString() const { return "Color: " + name; }
};

int main() {
    Point p{3.0, 4.0};
    Color c{"red"};
    p.print();  // deduces Self = Point
    c.print();  // deduces Self = Color
    return 0;
}`}</CppCode>

      <OutputBlock>{`(3.000000, 4.000000)
Color: red`}</OutputBlock>

      <NoteBlock type="info" title="Recursive Lambdas">
        <p>
          Deducing this enables lambdas that can call themselves without needing
          <code>std::function</code> or a Y-combinator. The lambda receives itself as the first
          argument: <code>[](this auto self, int n) -&gt; int {'{'} return n &lt;= 1 ? 1 : n * self(n - 1); {'}'}</code>.
        </p>
      </NoteBlock>

      <NoteBlock type="tip" title="Move-aware member functions">
        <p>
          With deducing this, you can write a single getter that returns by move when called on
          an rvalue: <code>auto&& get(this Self&& self)</code> will move the member out when called
          on a temporary, avoiding unnecessary copies.
        </p>
      </NoteBlock>

      <CompilerNoteBlock compiler="all" title="Compiler support">
        <p>
          Deducing this requires C++23. It is supported in GCC 14+, Clang 18+, and MSVC 19.37+.
          Compile with <code>-std=c++23</code> or <code>/std:c++latest</code>.
        </p>
      </CompilerNoteBlock>

      <WarningBlock title="Cannot mix with trailing qualifiers">
        <p>
          A function with an explicit object parameter cannot use <code>const</code>,
          <code>volatile</code>, <code>&</code>, or <code>&&</code> qualifiers. The value
          category and constness are deduced through the parameter type instead.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Use deducing this to reduce boilerplate">
        <p>
          Deducing this is most valuable when you have multiple const/non-const or lvalue/rvalue
          overloads with identical logic. It also simplifies mixin patterns by removing the need
          for CRTP. Start using it in new code to keep member function sets small and maintainable.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Recursive Lambda with Deducing This"
        difficulty="advanced"
        prompt="Write a recursive lambda using deducing this that computes the nth Fibonacci number. Call it for n=10 and print the result."
        hints={[
          "The lambda takes (this auto self, int n) as parameters",
          "Base case: n <= 1 returns n",
          "Recursive case: self(n-1) + self(n-2)",
        ]}
        solution={
          <CppCode>{`#include <iostream>

int main() {
    auto fib = [](this auto self, int n) -> int {
        if (n <= 1) return n;
        return self(n - 1) + self(n - 2);
    };

    for (int i = 0; i <= 10; ++i) {
        std::cout << "fib(" << i << ") = " << fib(i) << "\\n";
    }
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Deducing this', url: 'https://en.cppreference.com/w/cpp/language/member_functions#Explicit_object_parameter', description: 'Explicit object parameter (C++23)' },
        { type: 'cppreference', title: 'P0847R7', url: 'https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0847r7.html', description: 'Deducing this proposal paper' },
        { type: 'textbook', title: 'C++ Reference Documentation', author: 'cppreference.com', description: 'Member function declarations with explicit object parameter' },
      ]} />
    </div>
  )
}
