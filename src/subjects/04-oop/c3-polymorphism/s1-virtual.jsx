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

export default function S1Virtual() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Polymorphism allows code to work with objects of different types through a common interface.
        In C++, runtime polymorphism is achieved through <code>virtual</code> functions, which
        enable <strong>dynamic dispatch</strong> -- the correct function is selected at runtime
        based on the actual object type, not the pointer or reference type.
      </p>

      <DefinitionBlock title="Dynamic Dispatch">
        <p>
          <strong>Dynamic dispatch</strong> is the mechanism by which a call to a virtual function
          is resolved at runtime. The compiler uses a <strong>vtable</strong> (virtual function table)
          -- a lookup table of function pointers -- to determine which function implementation to invoke
          based on the actual type of the object.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Virtual Functions</h2>

      <SyntaxBlock title="virtual and override keywords">
        <p>
          Mark a base class function as <code>virtual</code> to enable dynamic dispatch. In derived
          classes, use the <code>override</code> keyword to explicitly indicate you are overriding a
          virtual function -- the compiler will emit an error if no matching base function exists.
        </p>
        <CppCode>{`class Base {
public:
    virtual void method();          // virtual in base
};
class Derived : public Base {
public:
    void method() override;         // override in derived
};`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Polymorphism in action">{`#include <iostream>
#include <vector>
#include <memory>

class Shape {
public:
    virtual double area() const { return 0.0; }
    virtual void describe() const {
        std::cout << "Shape, area = " << area() << std::endl;
    }
    virtual ~Shape() = default;
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
    void describe() const override {
        std::cout << "Circle(r=" << radius << "), area = " << area() << std::endl;
    }
};

class Rectangle : public Shape {
    double w, h;
public:
    Rectangle(double w, double h) : w(w), h(h) {}
    double area() const override { return w * h; }
    void describe() const override {
        std::cout << "Rect(" << w << "x" << h << "), area = " << area() << std::endl;
    }
};

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Circle>(5.0));
    shapes.push_back(std::make_unique<Rectangle>(4.0, 6.0));

    for (const auto& s : shapes) {
        s->describe();  // dynamic dispatch calls the correct version
    }
    return 0;
}`}</CppCode>

      <OutputBlock>{`Circle(r=5), area = 78.5398
Rect(4x6), area = 24`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Virtual Destructors</h2>

      <WarningBlock title="Always use virtual destructors in base classes">
        <p>
          If you delete a derived object through a base pointer without a virtual destructor, only
          the base destructor runs. This causes undefined behavior and resource leaks. Any class
          intended as a base class with virtual functions <strong>must</strong> have a virtual destructor.
        </p>
      </WarningBlock>

      <CppCode title="Virtual destructor importance">{`#include <iostream>

class Base {
public:
    virtual ~Base() { std::cout << "~Base" << std::endl; }
};

class Derived : public Base {
    int* data;
public:
    Derived() : data(new int[100]) { std::cout << "Derived alloc" << std::endl; }
    ~Derived() override {
        delete[] data;
        std::cout << "~Derived (freed)" << std::endl;
    }
};

int main() {
    Base* ptr = new Derived();
    delete ptr;  // correctly calls ~Derived then ~Base
    return 0;
}`}</CppCode>

      <OutputBlock>{`Derived alloc
~Derived (freed)
~Base`}</OutputBlock>

      <NoteBlock type="info" title="How the vtable works">
        <p>
          Each class with virtual functions has a vtable -- an array of function pointers. Each
          object contains a hidden vptr that points to its class's vtable. When a virtual function
          is called through a pointer or reference, the runtime follows the vptr to the vtable and
          calls the function at the appropriate slot. This adds one level of indirection compared
          to a normal function call.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Always use override">
        <p>
          Always use <code>override</code> on derived class virtual functions. Without it, a typo
          or signature mismatch silently creates a new function instead of overriding. The compiler
          catches this when <code>override</code> is present, preventing subtle bugs.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Polymorphic Logger"
        difficulty="intermediate"
        prompt="Create a base class Logger with a virtual log(const std::string&) method. Derive ConsoleLogger (prints to cout) and FileLogger (prints to a file or simulates it). Store both in a vector of Logger pointers and call log() on each."
        hints={[
          "Use std::unique_ptr<Logger> in the vector",
          "Remember to give Logger a virtual destructor",
          "FileLogger can simulate by printing '[FILE] message' to cout",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <string>
#include <vector>
#include <memory>

class Logger {
public:
    virtual void log(const std::string& msg) const = 0;
    virtual ~Logger() = default;
};

class ConsoleLogger : public Logger {
public:
    void log(const std::string& msg) const override {
        std::cout << "[CONSOLE] " << msg << std::endl;
    }
};

class FileLogger : public Logger {
public:
    void log(const std::string& msg) const override {
        std::cout << "[FILE] " << msg << std::endl;
    }
};

int main() {
    std::vector<std::unique_ptr<Logger>> loggers;
    loggers.push_back(std::make_unique<ConsoleLogger>());
    loggers.push_back(std::make_unique<FileLogger>());

    for (const auto& l : loggers) {
        l->log("Application started");
    }
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Virtual functions', url: 'https://en.cppreference.com/w/cpp/language/virtual', description: 'Virtual function declaration and dispatch' },
        { type: 'cppreference', title: 'override specifier', url: 'https://en.cppreference.com/w/cpp/language/override', description: 'Explicit override syntax (C++11)' },
        { type: 'textbook', title: 'Effective C++', author: 'Scott Meyers', description: 'Item 7: Declare destructors virtual in polymorphic base classes' },
      ]} />
    </div>
  )
}
