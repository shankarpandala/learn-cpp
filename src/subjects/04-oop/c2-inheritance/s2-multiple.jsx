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

export default function S2Multiple() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++ supports multiple inheritance, where a class can derive from more than one base class.
        While powerful, it introduces complexities such as the diamond problem. Virtual inheritance
        provides a solution, but the feature should be used judiciously.
      </p>

      <DefinitionBlock title="Multiple Inheritance">
        <p>
          <strong>Multiple inheritance</strong> allows a derived class to inherit from two or more
          base classes simultaneously. The derived class inherits all members from every base class
          and can access them according to the usual access rules.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic Multiple Inheritance</h2>

      <SyntaxBlock title="Syntax">
        <p>
          List multiple base classes separated by commas, each with its own access specifier.
        </p>
        <CppCode>{`class Derived : public Base1, public Base2 {
    // members
};`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Multiple inheritance example">{`#include <iostream>

class Printable {
public:
    void print() const { std::cout << "Printing document..." << std::endl; }
};

class Scannable {
public:
    void scan() const { std::cout << "Scanning document..." << std::endl; }
};

class MultiFunctionDevice : public Printable, public Scannable {
public:
    void copy() const {
        scan();
        print();
        std::cout << "Copy complete." << std::endl;
    }
};

int main() {
    MultiFunctionDevice mfd;
    mfd.print();
    mfd.scan();
    mfd.copy();
    return 0;
}`}</CppCode>

      <OutputBlock>{`Printing document...
Scanning document...
Scanning document...
Printing document...
Copy complete.`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">The Diamond Problem</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The diamond problem occurs when a class inherits from two classes that share a common base.
        Without virtual inheritance, the derived class contains two copies of the common base,
        leading to ambiguity.
      </p>

      <CppCode title="Diamond problem and virtual inheritance">{`#include <iostream>

class Animal {
public:
    int age = 0;
    void breathe() const { std::cout << "Breathing..." << std::endl; }
};

// virtual inheritance: only one Animal sub-object will exist
class Mammal : virtual public Animal {
public:
    void walk() const { std::cout << "Walking..." << std::endl; }
};

class Bird : virtual public Animal {
public:
    void fly() const { std::cout << "Flying..." << std::endl; }
};

class Bat : public Mammal, public Bird {
public:
    void echolocate() const { std::cout << "Echolocating..." << std::endl; }
};

int main() {
    Bat b;
    b.age = 3;         // unambiguous: only one Animal sub-object
    b.breathe();        // no ambiguity
    b.walk();
    b.fly();
    b.echolocate();
    std::cout << "Age: " << b.age << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Breathing...
Walking...
Flying...
Echolocating...
Age: 3`}</OutputBlock>

      <WarningBlock title="Without virtual inheritance">
        <p>
          If <code>Mammal</code> and <code>Bird</code> did not use <code>virtual</code> inheritance,
          <code>Bat</code> would contain two separate <code>Animal</code> sub-objects. Accessing
          <code>b.age</code> would be ambiguous and require disambiguation:
          <code>b.Mammal::age</code> vs <code>b.Bird::age</code>.
        </p>
      </WarningBlock>

      <NoteBlock type="info" title="Virtual base class construction">
        <p>
          With virtual inheritance, the <strong>most derived class</strong> is responsible for
          constructing the virtual base. Intermediate classes' calls to the virtual base constructor
          are ignored. This means <code>Bat</code> must directly initialize <code>Animal</code> in
          its initializer list.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Prefer composition and interfaces">
        <p>
          Multiple inheritance is most appropriate when combining abstract interfaces (classes with
          only pure virtual functions). For mixing implementation, prefer composition or single
          inheritance with composition. The diamond problem and increased complexity make multiple
          implementation inheritance a code smell.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Interface-Style Multiple Inheritance"
        difficulty="intermediate"
        prompt="Create two interface-like base classes: Drawable (with a pure virtual draw()) and Serializable (with a pure virtual serialize()). Create a Widget class that inherits from both and implements both methods."
        hints={[
          "Pure virtual functions use = 0 syntax",
          "A class with any pure virtual function is abstract and cannot be instantiated",
          "The derived class must implement all pure virtual functions to be concrete",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <string>

class Drawable {
public:
    virtual void draw() const = 0;
    virtual ~Drawable() = default;
};

class Serializable {
public:
    virtual std::string serialize() const = 0;
    virtual ~Serializable() = default;
};

class Widget : public Drawable, public Serializable {
    std::string name;
public:
    Widget(std::string n) : name(std::move(n)) {}

    void draw() const override {
        std::cout << "Drawing widget: " << name << std::endl;
    }
    std::string serialize() const override {
        return "{\\"widget\\": \\"" + name + "\\"}";
    }
};

int main() {
    Widget w("Button");
    w.draw();
    std::cout << w.serialize() << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Multiple inheritance', url: 'https://en.cppreference.com/w/cpp/language/derived_class', description: 'Derived class with multiple bases' },
        { type: 'cppreference', title: 'Virtual base classes', url: 'https://en.cppreference.com/w/cpp/language/derived_class#Virtual_base_classes', description: 'Solving the diamond problem' },
        { type: 'textbook', title: 'Effective C++', author: 'Scott Meyers', description: 'Item 40: Use multiple inheritance judiciously' },
      ]} />
    </div>
  )
}
