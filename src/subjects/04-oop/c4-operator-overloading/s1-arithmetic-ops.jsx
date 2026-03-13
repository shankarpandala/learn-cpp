import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S1ArithmeticOps() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Operator overloading lets you define how built-in operators like <code>+</code>, <code>-</code>,
        <code>*</code>, and <code>/</code> work with your custom types. This makes user-defined
        types feel natural and intuitive, reading like mathematical expressions rather than
        verbose function calls.
      </p>

      <DefinitionBlock title="Operator Overloading">
        <p>
          <strong>Operator overloading</strong> is the ability to redefine the behavior of C++
          operators for user-defined types. An overloaded operator is implemented as a function
          named <code>operator@</code> where <code>@</code> is the operator symbol (e.g.,
          <code>operator+</code>). It can be a member function or a free (non-member) function.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Member vs Non-Member Overloading</h2>

      <SyntaxBlock title="Two approaches">
        <p>
          Binary operators can be overloaded as member functions (left operand is <code>this</code>)
          or as non-member functions (both operands are parameters). Non-member functions enable
          symmetry when the left operand is not your type.
        </p>
        <CppCode>{`// Member: a.operator+(b)
Vec operator+(const Vec& rhs) const;

// Non-member: operator+(a, b)
Vec operator+(const Vec& lhs, const Vec& rhs);`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Arithmetic operator overloading">{`#include <iostream>

class Vec2 {
    double x, y;
public:
    Vec2(double x = 0, double y = 0) : x(x), y(y) {}

    // Member operator+
    Vec2 operator+(const Vec2& rhs) const {
        return Vec2(x + rhs.x, y + rhs.y);
    }

    // Member operator- (unary negation)
    Vec2 operator-() const {
        return Vec2(-x, -y);
    }

    // Member operator*= (compound assignment)
    Vec2& operator*=(double scalar) {
        x *= scalar;
        y *= scalar;
        return *this;
    }

    void print() const {
        std::cout << "(" << x << ", " << y << ")" << std::endl;
    }

    friend Vec2 operator*(const Vec2& v, double s);
    friend Vec2 operator*(double s, const Vec2& v);
};

// Non-member: enables both vec*scalar and scalar*vec
Vec2 operator*(const Vec2& v, double s) {
    return Vec2(v.x * s, v.y * s);
}
Vec2 operator*(double s, const Vec2& v) {
    return v * s;  // reuse the above
}

int main() {
    Vec2 a(1, 2), b(3, 4);

    Vec2 c = a + b;
    c.print();

    Vec2 d = a * 3.0;
    d.print();

    Vec2 e = 2.0 * b;
    e.print();

    (-a).print();
    return 0;
}`}</CppCode>

      <OutputBlock>{`(4, 6)
(3, 6)
(6, 8)
(-1, -2)`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Compound Assignment Operators</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Compound assignment operators like <code>+=</code> modify the left operand in place and
        return a reference to it. A common idiom is to implement the binary operator in terms of
        the compound assignment operator to avoid code duplication.
      </p>

      <CppCode title="Implementing + in terms of +=">{`class Fraction {
    int num, den;
public:
    Fraction(int n, int d) : num(n), den(d) {}

    Fraction& operator+=(const Fraction& rhs) {
        num = num * rhs.den + rhs.num * den;
        den = den * rhs.den;
        return *this;
    }

    // Non-member + defined in terms of +=
    friend Fraction operator+(Fraction lhs, const Fraction& rhs) {
        lhs += rhs;        // lhs is a copy, so modifying it is fine
        return lhs;
    }

    void print() const {
        std::cout << num << "/" << den << std::endl;
    }
};

int main() {
    Fraction a(1, 2), b(1, 3);
    Fraction c = a + b;
    c.print();

    a += b;
    a.print();
    return 0;
}`}</CppCode>

      <OutputBlock>{`5/6
5/6`}</OutputBlock>

      <NoteBlock type="tip" title="Return by value for binary operators">
        <p>
          Binary arithmetic operators (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>)
          should return a new object <strong>by value</strong>. Compound assignment
          operators (<code>+=</code>, <code>-=</code>) should modify <code>*this</code> and return
          a reference. Never return a reference to a local object.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Implement binary ops via compound assignment">
        <p>
          Implement compound assignment operators (<code>+=</code>) as members, then define the
          corresponding binary operator (<code>+</code>) as a non-member that takes the left
          operand by value, applies the compound operator, and returns the result. This avoids
          code duplication and ensures consistent behavior.
        </p>
      </BestPracticeBlock>

      <NoteBlock type="important" title="Operators you cannot overload">
        <p>
          The following operators cannot be overloaded: <code>::</code> (scope resolution),
          <code>.</code> (member access), <code>.*</code> (pointer-to-member access),
          <code>?:</code> (ternary), and <code>sizeof</code>. Also, you cannot create new operators
          or change an operator's arity.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Complex Number Class"
        difficulty="intermediate"
        prompt="Create a Complex class with real and imaginary parts. Overload +, -, * operators and provide a print() method. Implement + using +=."
        hints={[
          "Complex multiplication: (a+bi)(c+di) = (ac-bd) + (ad+bc)i",
          "Take the left operand by value for binary operators",
          "Remember to implement both member (+=) and non-member (+) versions",
        ]}
        solution={
          <CppCode>{`#include <iostream>

class Complex {
    double re, im;
public:
    Complex(double r = 0, double i = 0) : re(r), im(i) {}

    Complex& operator+=(const Complex& o) {
        re += o.re; im += o.im; return *this;
    }
    Complex& operator-=(const Complex& o) {
        re -= o.re; im -= o.im; return *this;
    }
    Complex& operator*=(const Complex& o) {
        double r = re * o.re - im * o.im;
        double i = re * o.im + im * o.re;
        re = r; im = i; return *this;
    }

    friend Complex operator+(Complex a, const Complex& b) { return a += b; }
    friend Complex operator-(Complex a, const Complex& b) { return a -= b; }
    friend Complex operator*(Complex a, const Complex& b) { return a *= b; }

    void print() const {
        std::cout << re << (im >= 0 ? "+" : "") << im << "i" << std::endl;
    }
};

int main() {
    Complex a(3, 2), b(1, -1);
    (a + b).print();
    (a * b).print();
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Operator overloading', url: 'https://en.cppreference.com/w/cpp/language/operators', description: 'Full operator overloading reference' },
        { type: 'cppreference', title: 'Arithmetic operators', url: 'https://en.cppreference.com/w/cpp/language/operator_arithmetic', description: 'Arithmetic operator semantics' },
        { type: 'textbook', title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', description: 'Chapter 18: Operator Overloading' },
      ]} />
    </div>
  )
}
