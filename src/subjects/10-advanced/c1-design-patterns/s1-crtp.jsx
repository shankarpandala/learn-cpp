import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S1Crtp() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The Curiously Recurring Template Pattern (CRTP) is a C++ idiom where a class derives from a
        template base class, passing itself as the template argument. This enables static (compile-time)
        polymorphism, eliminating the overhead of virtual function dispatch while still providing
        polymorphic behavior.
      </p>

      <DefinitionBlock title="Curiously Recurring Template Pattern (CRTP)">
        <p>
          CRTP is an idiom in which a class <code>Derived</code> inherits from a class template
          instantiated with <code>Derived</code> itself: <code>class Derived : public Base&lt;Derived&gt;</code>.
          The base class can call derived class methods at compile time without virtual functions.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic CRTP Structure</h2>

      <SyntaxBlock title="CRTP Base Pattern">
        <p>
          The base class is templated on the derived type, and uses <code>static_cast</code> to
          access the derived class's implementation at compile time.
        </p>
        <CppCode>{`template <typename Derived>
class Base {
public:
    void interface() {
        static_cast<Derived*>(this)->implementation();
    }
};`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Static polymorphism with CRTP">{`#include <iostream>

template <typename Derived>
class Shape {
public:
    void draw() const {
        static_cast<const Derived*>(this)->drawImpl();
    }
    double area() const {
        return static_cast<const Derived*>(this)->areaImpl();
    }
};

class Circle : public Shape<Circle> {
    double radius_;
public:
    Circle(double r) : radius_(r) {}
    void drawImpl() const { std::cout << "Drawing circle\\n"; }
    double areaImpl() const { return 3.14159 * radius_ * radius_; }
};

class Square : public Shape<Square> {
    double side_;
public:
    Square(double s) : side_(s) {}
    void drawImpl() const { std::cout << "Drawing square\\n"; }
    double areaImpl() const { return side_ * side_; }
};

template <typename T>
void renderShape(const Shape<T>& shape) {
    shape.draw();
    std::cout << "Area: " << shape.area() << "\\n";
}

int main() {
    Circle c(5.0);
    Square s(4.0);
    renderShape(c);
    renderShape(s);
    return 0;
}`}</CppCode>

      <OutputBlock>{`Drawing circle
Area: 78.5398
Drawing square
Area: 16`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">CRTP vs Virtual Functions</h2>

      <NoteBlock type="info" title="Compile-Time vs Run-Time Dispatch">
        <p>
          Virtual functions resolve calls at run time via a vtable lookup, adding indirection overhead.
          CRTP resolves calls at compile time, enabling inlining and eliminating vtable cost. However,
          CRTP cannot store heterogeneous objects in a single container without additional type erasure.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Mixin Classes with CRTP</h2>

      <CppCode title="Adding functionality via CRTP mixins">{`#include <iostream>

template <typename Derived>
class Printable {
public:
    void print() const {
        const auto& self = static_cast<const Derived&>(*this);
        std::cout << self.toString() << "\\n";
    }
};

template <typename Derived>
class Comparable {
public:
    bool operator==(const Derived& other) const {
        const auto& self = static_cast<const Derived&>(*this);
        return self.value() == other.value();
    }
    bool operator<(const Derived& other) const {
        const auto& self = static_cast<const Derived&>(*this);
        return self.value() < other.value();
    }
};

class Temperature : public Printable<Temperature>,
                     public Comparable<Temperature> {
    double celsius_;
public:
    Temperature(double c) : celsius_(c) {}
    std::string toString() const { return std::to_string(celsius_) + " C"; }
    double value() const { return celsius_; }
};

int main() {
    Temperature t1(36.6), t2(37.5);
    t1.print();
    t2.print();
    std::cout << std::boolalpha;
    std::cout << "Equal: " << (t1 == t2) << "\\n";
    std::cout << "t1 < t2: " << (t1 < t2) << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`36.600000 C
37.500000 C
Equal: false
t1 < t2: true`}</OutputBlock>

      <BestPracticeBlock title="Use CRTP for zero-cost abstractions">
        <p>
          Prefer CRTP over virtual functions when the set of types is known at compile time and
          you need maximum performance. Use virtual functions when you need runtime polymorphism
          with heterogeneous collections.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Implement a CRTP Counter Mixin"
        difficulty="intermediate"
        prompt="Create a CRTP mixin class 'Counter' that tracks how many instances of each derived class have been created. Test it with two different derived classes."
        hints={[
          "Use a static variable inside the CRTP base template",
          "Increment the counter in the constructor, decrement in the destructor",
          "Each template instantiation gets its own static counter",
        ]}
        solution={
          <CppCode>{`#include <iostream>

template <typename Derived>
class Counter {
    static int count_;
public:
    Counter() { ++count_; }
    ~Counter() { --count_; }
    static int getCount() { return count_; }
};
template <typename Derived>
int Counter<Derived>::count_ = 0;

class Widget : public Counter<Widget> {};
class Gadget : public Counter<Gadget> {};

int main() {
    Widget w1, w2, w3;
    Gadget g1;
    std::cout << "Widgets: " << Widget::getCount() << "\\n";
    std::cout << "Gadgets: " << Gadget::getCount() << "\\n";
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Curiously Recurring Template Pattern', url: 'https://en.cppreference.com/w/cpp/language/crtp', description: 'CRTP idiom documentation' },
        { type: 'article', title: 'Fluent C++ - The CRTP', url: 'https://www.fluentcpp.com/2017/05/12/curiously-recurring-template-pattern/', author: 'Jonathan Boccara', description: 'In-depth CRTP tutorial' },
        { type: 'textbook', title: 'C++ Templates: The Complete Guide', author: 'Vandevoorde, Josuttis, Gregor', description: 'Chapter on CRTP and static polymorphism' },
      ]} />
    </div>
  )
}
