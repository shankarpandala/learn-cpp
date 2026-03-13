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

export default function S3Rtti() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Runtime Type Information (RTTI) allows you to query the type of an object at runtime.
        C++ provides two main RTTI mechanisms: <code>typeid</code> for type identification
        and <code>dynamic_cast</code> for safe downcasting. Both require at least one virtual
        function in the class hierarchy.
      </p>

      <DefinitionBlock title="RTTI (Runtime Type Information)">
        <p>
          <strong>RTTI</strong> is a C++ mechanism that exposes type information at runtime for
          polymorphic types (classes with virtual functions). It enables safe type checking
          and casting through <code>typeid</code> and <code>dynamic_cast</code>, stored in
          <code>std::type_info</code> objects.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">typeid and type_info</h2>

      <SyntaxBlock title="typeid Syntax">
        <p>
          The <code>typeid</code> operator returns a reference to a <code>std::type_info</code> object.
          For polymorphic types accessed through a pointer or reference, it returns the dynamic
          (actual) type. Include <code>&lt;typeinfo&gt;</code> to use it.
        </p>
        <CppCode>{`#include <typeinfo>
const std::type_info& ti = typeid(expression);
ti.name();       // implementation-defined name string
ti == typeid(T); // compare types`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Using typeid">{`#include <iostream>
#include <typeinfo>

class Base {
public:
    virtual ~Base() = default;
};

class Derived : public Base {};

int main() {
    Base* b = new Derived();

    std::cout << "Pointer type: " << typeid(b).name() << std::endl;
    std::cout << "Object type:  " << typeid(*b).name() << std::endl;
    std::cout << "Same type?    " << (typeid(*b) == typeid(Derived)) << std::endl;

    delete b;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Pointer type: P4Base
Object type:  7Derived
Same type?    1`}</OutputBlock>

      <NoteBlock type="info" title="type_info::name() is implementation-defined">
        <p>
          The string returned by <code>name()</code> varies between compilers. GCC returns mangled
          names (like <code>7Derived</code>), while MSVC returns human-readable names. Do not rely
          on the exact format. Use <code>typeid</code> comparisons for type checks instead.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">dynamic_cast</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>dynamic_cast</code> safely converts pointers and references within an inheritance
        hierarchy. For pointers, it returns <code>nullptr</code> on failure. For references, it
        throws <code>std::bad_cast</code>.
      </p>

      <CppCode title="Safe downcasting with dynamic_cast">{`#include <iostream>

class Animal {
public:
    virtual ~Animal() = default;
    virtual void speak() const { std::cout << "..." << std::endl; }
};

class Dog : public Animal {
public:
    void speak() const override { std::cout << "Woof!" << std::endl; }
    void fetch() const { std::cout << "Fetching ball!" << std::endl; }
};

class Cat : public Animal {
public:
    void speak() const override { std::cout << "Meow!" << std::endl; }
};

void tryFetch(Animal* a) {
    if (Dog* d = dynamic_cast<Dog*>(a)) {
        d->fetch();   // safe: a is actually a Dog
    } else {
        std::cout << "Not a dog, cannot fetch." << std::endl;
    }
}

int main() {
    Dog dog;
    Cat cat;
    tryFetch(&dog);
    tryFetch(&cat);
    return 0;
}`}</CppCode>

      <OutputBlock>{`Fetching ball!
Not a dog, cannot fetch.`}</OutputBlock>

      <WarningBlock title="Performance cost of RTTI">
        <p>
          RTTI adds overhead: each polymorphic class stores extra type information, and
          <code>dynamic_cast</code> performs a runtime check that walks the inheritance hierarchy.
          In performance-critical code (e.g., game loops, real-time systems), this cost may be
          significant. Some projects disable RTTI entirely via compiler flags.
        </p>
      </WarningBlock>

      <CompilerNoteBlock compiler="gcc" title="Disabling RTTI">
        <p>
          Use <code>-fno-rtti</code> to disable RTTI in GCC and Clang. This prevents use of
          <code>typeid</code> and <code>dynamic_cast</code> but reduces binary size and can
          improve performance. Many game engines and embedded projects use this flag.
        </p>
      </CompilerNoteBlock>

      <BestPracticeBlock title="Prefer virtual functions over RTTI">
        <p>
          If you find yourself using <code>dynamic_cast</code> frequently, it often indicates a
          design problem. Consider using virtual functions or the visitor pattern instead. RTTI
          is appropriate for plugin systems, serialization, or when the type hierarchy is not
          under your control.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Shape Inspector"
        difficulty="intermediate"
        prompt="Given a vector of Shape pointers (Circle, Rectangle, Triangle), write a function that uses dynamic_cast to count how many of each type exist in the collection."
        hints={[
          "Use dynamic_cast<Circle*>(ptr) and check for nullptr",
          "You need at least one virtual function in Shape for RTTI to work",
          "Loop through the vector and try casting to each type",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <vector>
#include <memory>

class Shape { public: virtual ~Shape() = default; };
class Circle : public Shape {};
class Rectangle : public Shape {};
class Triangle : public Shape {};

void inspect(const std::vector<std::unique_ptr<Shape>>& shapes) {
    int circles = 0, rects = 0, tris = 0;
    for (const auto& s : shapes) {
        if (dynamic_cast<Circle*>(s.get())) ++circles;
        else if (dynamic_cast<Rectangle*>(s.get())) ++rects;
        else if (dynamic_cast<Triangle*>(s.get())) ++tris;
    }
    std::cout << "Circles: " << circles << ", Rects: " << rects
              << ", Triangles: " << tris << std::endl;
}

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Circle>());
    shapes.push_back(std::make_unique<Rectangle>());
    shapes.push_back(std::make_unique<Circle>());
    shapes.push_back(std::make_unique<Triangle>());
    inspect(shapes);
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'typeid operator', url: 'https://en.cppreference.com/w/cpp/language/typeid', description: 'Runtime type identification' },
        { type: 'cppreference', title: 'dynamic_cast', url: 'https://en.cppreference.com/w/cpp/language/dynamic_cast', description: 'Safe runtime downcasting' },
        { type: 'cppreference', title: 'std::type_info', url: 'https://en.cppreference.com/w/cpp/types/type_info', description: 'Type information class' },
      ]} />
    </div>
  )
}
