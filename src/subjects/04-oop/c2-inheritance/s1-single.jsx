import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S1Single() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Inheritance lets a new class (derived) reuse and extend the functionality of an existing
        class (base). It models the "is-a" relationship: a <code>Dog</code> is an <code>Animal</code>,
        a <code>Circle</code> is a <code>Shape</code>. Single inheritance involves exactly one base class.
      </p>

      <DefinitionBlock title="Inheritance">
        <p>
          <strong>Inheritance</strong> is a mechanism where a derived class acquires the data members
          and member functions of a base class. The derived class can add new members and override
          existing behavior. With <code>public</code> inheritance, the public interface of the base
          remains public in the derived class.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Base and Derived Classes</h2>

      <SyntaxBlock title="Public Inheritance Syntax">
        <p>
          Use a colon followed by the access specifier and base class name. Public inheritance
          preserves the access level of base members in the derived class.
        </p>
        <CppCode>{`class Derived : public Base {
    // additional members
};`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Basic inheritance example">{`#include <iostream>
#include <string>

class Animal {
protected:
    std::string name;
public:
    Animal(std::string n) : name(std::move(n)) {
        std::cout << "Animal ctor: " << name << std::endl;
    }
    ~Animal() {
        std::cout << "Animal dtor: " << name << std::endl;
    }
    void eat() const {
        std::cout << name << " is eating." << std::endl;
    }
};

class Dog : public Animal {
    std::string breed;
public:
    Dog(std::string n, std::string b)
        : Animal(std::move(n)), breed(std::move(b)) {
        std::cout << "Dog ctor: " << name << std::endl;
    }
    ~Dog() {
        std::cout << "Dog dtor: " << name << std::endl;
    }
    void bark() const {
        std::cout << name << " (" << breed << ") barks!" << std::endl;
    }
};

int main() {
    Dog d("Rex", "Labrador");
    d.eat();    // inherited from Animal
    d.bark();   // defined in Dog
    return 0;
}`}</CppCode>

      <OutputBlock>{`Animal ctor: Rex
Dog ctor: Rex
Rex is eating.
Rex (Labrador) barks!
Dog dtor: Rex
Animal dtor: Rex`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Constructor Chaining</h2>

      <NoteBlock type="info" title="Construction and destruction order">
        <p>
          Base class constructors run <strong>before</strong> derived class constructors. Destructors
          run in the reverse order: derived first, then base. The derived constructor must call the
          base constructor through the member initializer list.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Method Overriding</h2>

      <CppCode title="Overriding a base class method">{`#include <iostream>

class Shape {
public:
    void describe() const {
        std::cout << "I am a generic shape." << std::endl;
    }
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}

    void describe() const {   // hides Shape::describe
        std::cout << "I am a circle with radius " << radius << std::endl;
    }
};

int main() {
    Circle c(5.0);
    c.describe();              // calls Circle::describe
    c.Shape::describe();       // explicitly calls Shape::describe
    return 0;
}`}</CppCode>

      <OutputBlock>{`I am a circle with radius 5
I am a generic shape.`}</OutputBlock>

      <NoteBlock type="important" title="Hiding vs overriding">
        <p>
          Without <code>virtual</code>, a derived function with the same name <em>hides</em> the
          base version rather than overriding it. Through a base pointer or reference, the base
          version is always called. Use <code>virtual</code> for true polymorphic overriding
          (covered in the polymorphism chapter).
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Model is-a relationships with public inheritance">
        <p>
          Only use public inheritance when the derived class truly "is a" kind of the base class.
          If you just need to reuse code, prefer composition (having a member of the other type)
          over inheritance. Ask: "Does substituting the derived class for the base class always
          make semantic sense?"
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Vehicle Hierarchy"
        difficulty="beginner"
        prompt="Create a base class Vehicle with a speed member and an accelerate() method. Derive an ElectricCar class that adds a batteryLevel member and an override of accelerate() that also decreases the battery."
        hints={[
          "Make speed protected so the derived class can access it",
          "Call the base accelerate from the derived version if you want to reuse logic",
          "Print the state after accelerating to verify behavior",
        ]}
        solution={
          <CppCode>{`#include <iostream>

class Vehicle {
protected:
    double speed = 0;
public:
    void accelerate(double amount) {
        speed += amount;
        std::cout << "Speed: " << speed << " km/h" << std::endl;
    }
    double getSpeed() const { return speed; }
};

class ElectricCar : public Vehicle {
    double batteryLevel = 100.0;
public:
    void accelerate(double amount) {
        Vehicle::accelerate(amount);
        batteryLevel -= amount * 0.5;
        std::cout << "Battery: " << batteryLevel << "%" << std::endl;
    }
};

int main() {
    ElectricCar ec;
    ec.accelerate(30);
    ec.accelerate(20);
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Derived classes', url: 'https://en.cppreference.com/w/cpp/language/derived_class', description: 'Inheritance syntax and semantics' },
        { type: 'cppreference', title: 'Access specifiers in inheritance', url: 'https://en.cppreference.com/w/cpp/language/access', description: 'How inheritance affects access' },
        { type: 'textbook', title: 'Effective C++', author: 'Scott Meyers', description: 'Item 32: Make sure public inheritance models is-a' },
      ]} />
    </div>
  )
}
