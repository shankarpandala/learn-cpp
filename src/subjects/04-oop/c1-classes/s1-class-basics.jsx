import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S1ClassBasics() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Classes are the foundation of object-oriented programming in C++. A class bundles data
        (member variables) and behavior (member functions) into a single user-defined type,
        allowing you to model real-world concepts directly in code.
      </p>

      <DefinitionBlock title="What is a Class?">
        <p>
          A <strong>class</strong> is a user-defined type that encapsulates data members and member
          functions into a single unit. Objects are instances of a class. By default, members of a
          class are <code>private</code>, whereas members of a <code>struct</code> are <code>public</code>.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Defining a Class</h2>

      <SyntaxBlock title="Class Declaration Syntax">
        <p>
          A class is declared with the <code>class</code> keyword, followed by the class name and a
          body enclosed in braces. The declaration must end with a semicolon.
        </p>
        <CppCode>{`class ClassName {
    // data members and member functions
};  // <-- semicolon required`}</CppCode>
      </SyntaxBlock>

      <CppCode title="A simple Rectangle class">{`#include <iostream>

class Rectangle {
public:
    double width;
    double height;

    double area() {
        return width * height;
    }

    void print() {
        std::cout << width << " x " << height
                  << " = " << area() << std::endl;
    }
};

int main() {
    Rectangle r;
    r.width = 5.0;
    r.height = 3.0;
    r.print();
    return 0;
}`}</CppCode>

      <OutputBlock>{`5 x 3 = 15`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">The this Pointer</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Inside any non-static member function, the <code>this</code> pointer is an implicit pointer
        to the object on which the function was called. It is useful when a parameter name shadows
        a data member.
      </p>

      <CppCode title="Using the this pointer">{`#include <iostream>

class Point {
    double x, y;
public:
    Point& set(double x, double y) {
        this->x = x;  // this-> disambiguates member from parameter
        this->y = y;
        return *this;  // return the current object for chaining
    }

    void print() const {
        std::cout << "(" << x << ", " << y << ")" << std::endl;
    }
};

int main() {
    Point p;
    p.set(3.0, 4.0).print();
    return 0;
}`}</CppCode>

      <OutputBlock>{`(3, 4)`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">struct vs class</h2>

      <NoteBlock type="info" title="struct vs class in C++">
        <p>
          In C++, <code>struct</code> and <code>class</code> are nearly identical. The only
          difference is default access: <code>struct</code> members are <code>public</code> by
          default, while <code>class</code> members are <code>private</code> by default. By
          convention, <code>struct</code> is used for plain data aggregates and <code>class</code> for
          types with invariants and behavior.
        </p>
      </NoteBlock>

      <CppCode title="struct vs class defaults">{`struct PublicByDefault {
    int x;       // public
    void f();    // public
};

class PrivateByDefault {
    int x;       // private
    void f();    // private
};`}</CppCode>

      <BestPracticeBlock title="Use class for types with invariants">
        <p>
          Use <code>struct</code> for simple data holders where all members are public.
          Use <code>class</code> when you need to enforce invariants through access control,
          constructors, or member functions that maintain internal consistency.
        </p>
      </BestPracticeBlock>

      <NoteBlock type="tip" title="Separate declaration and definition">
        <p>
          For larger projects, declare the class in a header file (<code>.h</code>) and define
          member functions in a source file (<code>.cpp</code>) using the scope resolution
          operator: <code>void Rectangle::print() {'{'}...{'}'}</code>.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Create a Circle Class"
        difficulty="beginner"
        prompt="Define a Circle class with a radius data member and member functions area() and circumference(). Create an object, set the radius, and print both values."
        hints={[
          "Use M_PI or 3.14159 for pi",
          "Area = pi * r * r, circumference = 2 * pi * r",
          "Remember to make the members public or provide setters",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <cmath>

class Circle {
public:
    double radius;

    double area() const {
        return M_PI * radius * radius;
    }

    double circumference() const {
        return 2.0 * M_PI * radius;
    }
};

int main() {
    Circle c;
    c.radius = 5.0;
    std::cout << "Area: " << c.area() << std::endl;
    std::cout << "Circumference: " << c.circumference() << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Classes', url: 'https://en.cppreference.com/w/cpp/language/classes', description: 'Class declaration and definition' },
        { type: 'cppreference', title: 'this pointer', url: 'https://en.cppreference.com/w/cpp/language/this', description: 'The this pointer in member functions' },
        { type: 'textbook', title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', description: 'Chapter 16: Classes' },
      ]} />
    </div>
  )
}
