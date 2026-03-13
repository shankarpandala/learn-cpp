import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S2Abstract() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Abstract classes define interfaces that derived classes must implement. They cannot be
        instantiated directly and serve as contracts, ensuring that all concrete subclasses provide
        specific functionality. This is the closest C++ gets to interfaces found in other languages.
      </p>

      <DefinitionBlock title="Abstract Class">
        <p>
          An <strong>abstract class</strong> is a class that has at least one <strong>pure virtual
          function</strong> -- a virtual function declared with <code>= 0</code>. Abstract classes
          cannot be instantiated. A derived class must override all pure virtual functions to become
          a concrete (instantiable) class.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Pure Virtual Functions</h2>

      <SyntaxBlock title="Pure Virtual Syntax">
        <p>
          Append <code>= 0</code> to a virtual function declaration to make it pure virtual. This
          tells the compiler that the function has no implementation in this class and must be
          overridden by any concrete derived class.
        </p>
        <CppCode>{`class AbstractBase {
public:
    virtual void doWork() = 0;        // pure virtual
    virtual ~AbstractBase() = default;
};`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Abstract class with concrete derived classes">{`#include <iostream>
#include <vector>
#include <memory>
#include <cmath>

class Shape {
public:
    virtual double area() const = 0;
    virtual double perimeter() const = 0;
    virtual std::string name() const = 0;
    virtual ~Shape() = default;

    void describe() const {  // non-pure: provides default behavior
        std::cout << name() << ": area=" << area()
                  << " perimeter=" << perimeter() << std::endl;
    }
};

class Circle : public Shape {
    double r;
public:
    Circle(double radius) : r(radius) {}
    double area() const override { return M_PI * r * r; }
    double perimeter() const override { return 2.0 * M_PI * r; }
    std::string name() const override { return "Circle"; }
};

class Square : public Shape {
    double side;
public:
    Square(double s) : side(s) {}
    double area() const override { return side * side; }
    double perimeter() const override { return 4.0 * side; }
    std::string name() const override { return "Square"; }
};

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Circle>(5.0));
    shapes.push_back(std::make_unique<Square>(4.0));

    for (const auto& s : shapes) {
        s->describe();
    }
    return 0;
}`}</CppCode>

      <OutputBlock>{`Circle: area=78.5398 perimeter=31.4159
Square: area=16 perimeter=16`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Interfaces in C++</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++ does not have a dedicated <code>interface</code> keyword. Instead, an interface is
        modeled as a class with <strong>only</strong> pure virtual functions and a virtual destructor,
        containing no data members or implemented methods.
      </p>

      <CppCode title="Interface pattern">{`#include <iostream>
#include <string>

class ISerializable {
public:
    virtual std::string serialize() const = 0;
    virtual void deserialize(const std::string& data) = 0;
    virtual ~ISerializable() = default;
};

class ILoggable {
public:
    virtual void log() const = 0;
    virtual ~ILoggable() = default;
};

class Config : public ISerializable, public ILoggable {
    std::string key, value;
public:
    Config(std::string k, std::string v) : key(std::move(k)), value(std::move(v)) {}

    std::string serialize() const override {
        return key + "=" + value;
    }
    void deserialize(const std::string& data) override {
        auto pos = data.find('=');
        key = data.substr(0, pos);
        value = data.substr(pos + 1);
    }
    void log() const override {
        std::cout << "[Config] " << key << " -> " << value << std::endl;
    }
};

int main() {
    Config cfg("timeout", "30");
    cfg.log();
    std::cout << cfg.serialize() << std::endl;

    cfg.deserialize("retries=5");
    cfg.log();
    return 0;
}`}</CppCode>

      <OutputBlock>{`[Config] timeout -> 30
timeout=30
[Config] retries -> 5`}</OutputBlock>

      <NoteBlock type="tip" title="Abstract classes can have implementations">
        <p>
          Unlike pure interfaces, abstract classes can contain implemented (non-pure) methods and
          data members. This lets you provide shared default behavior while still requiring derived
          classes to implement specific operations. The <code>describe()</code> method in the Shape
          example above demonstrates this pattern.
        </p>
      </NoteBlock>

      <NoteBlock type="info" title="Pure virtual functions can have bodies">
        <p>
          A pure virtual function can optionally have an implementation in the base class. Derived
          classes must still override it, but can call the base version
          via <code>Base::function()</code>. This is occasionally used to provide a default
          implementation that derived classes opt into explicitly.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Use the I-prefix convention for interfaces">
        <p>
          When defining a pure interface class, many C++ projects prefix the name with
          <code>I</code> (e.g., <code>ISerializable</code>, <code>IObserver</code>). This
          communicates intent clearly. Always include a virtual destructor, even in interfaces, to
          allow safe deletion through base pointers.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Animal Sound Interface"
        difficulty="beginner"
        prompt="Create an abstract class Animal with pure virtual functions speak() and type(). Derive Cat and Dog classes. Store them in a vector of unique_ptr<Animal> and call speak() on each."
        hints={[
          "Use = 0 for pure virtual functions",
          "Remember virtual ~Animal() = default",
          "Use std::make_unique to create objects",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <vector>
#include <memory>

class Animal {
public:
    virtual void speak() const = 0;
    virtual std::string type() const = 0;
    virtual ~Animal() = default;
};

class Cat : public Animal {
public:
    void speak() const override { std::cout << "Meow!" << std::endl; }
    std::string type() const override { return "Cat"; }
};

class Dog : public Animal {
public:
    void speak() const override { std::cout << "Woof!" << std::endl; }
    std::string type() const override { return "Dog"; }
};

int main() {
    std::vector<std::unique_ptr<Animal>> animals;
    animals.push_back(std::make_unique<Cat>());
    animals.push_back(std::make_unique<Dog>());

    for (const auto& a : animals) {
        std::cout << a->type() << " says: ";
        a->speak();
    }
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Abstract classes', url: 'https://en.cppreference.com/w/cpp/language/abstract_class', description: 'Pure virtual functions and abstract classes' },
        { type: 'cppreference', title: 'Virtual functions', url: 'https://en.cppreference.com/w/cpp/language/virtual', description: 'Virtual function mechanics' },
        { type: 'textbook', title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', description: 'Chapter 20: Derived Classes' },
      ]} />
    </div>
  )
}
