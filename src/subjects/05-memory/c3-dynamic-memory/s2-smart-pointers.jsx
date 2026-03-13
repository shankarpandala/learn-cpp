import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import WarningBlock from '../../../components/content/WarningBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S2SmartPointers() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Smart pointers are class templates that manage dynamically allocated memory automatically.
        They ensure that memory is freed when the pointer goes out of scope, eliminating memory
        leaks and dangling pointer bugs that plague raw <code>new</code>/<code>delete</code> code.
      </p>

      <DefinitionBlock title="Smart Pointers">
        <p>
          <strong>Smart pointers</strong> are RAII wrappers around raw pointers. C++ provides three
          kinds: <code>std::unique_ptr</code> (exclusive ownership),
          <code> std::shared_ptr</code> (shared ownership), and <code>std::weak_ptr</code> (non-owning
          observer of a <code>shared_ptr</code>).
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::unique_ptr</h2>

      <SyntaxBlock title="unique_ptr Basics">
        <p>
          A <code>unique_ptr</code> has <strong>exclusive ownership</strong>. It cannot be copied,
          only moved. When it goes out of scope, the managed object is automatically deleted.
        </p>
        <CppCode>{`auto ptr = std::make_unique<Type>(args);
// ptr->method();  // use like a raw pointer
// automatically deleted when ptr goes out of scope`}</CppCode>
      </SyntaxBlock>

      <CppCode title="unique_ptr in action">{`#include <iostream>
#include <memory>

struct Widget {
    int id;
    Widget(int i) : id(i) { std::cout << "Widget " << id << " created" << std::endl; }
    ~Widget() { std::cout << "Widget " << id << " destroyed" << std::endl; }
};

int main() {
    auto w1 = std::make_unique<Widget>(1);
    std::cout << "w1 id: " << w1->id << std::endl;

    // auto w2 = w1;  // ERROR: cannot copy unique_ptr
    auto w2 = std::move(w1);  // transfer ownership
    std::cout << "w1 is null: " << (w1 == nullptr) << std::endl;

    return 0;  // w2 destroyed here automatically
}`}</CppCode>

      <OutputBlock>{`Widget 1 created
w1 id: 1
w1 is null: 1
Widget 1 destroyed`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::shared_ptr</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        A <code>shared_ptr</code> uses reference counting. Multiple <code>shared_ptr</code>s can
        own the same object; it is destroyed when the last one goes out of scope.
      </p>

      <CppCode title="shared_ptr with reference counting">{`#include <iostream>
#include <memory>

int main() {
    auto sp1 = std::make_shared<int>(42);
    std::cout << "count: " << sp1.use_count() << std::endl;

    {
        auto sp2 = sp1;  // shared ownership
        std::cout << "count: " << sp1.use_count() << std::endl;
        std::cout << "value: " << *sp2 << std::endl;
    }  // sp2 destroyed, count decrements

    std::cout << "count: " << sp1.use_count() << std::endl;
    return 0;  // sp1 destroyed, object freed
}`}</CppCode>

      <OutputBlock>{`count: 1
count: 2
value: 42
count: 1`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::weak_ptr</h2>

      <NoteBlock type="info" title="Breaking Circular References">
        <p>
          <code>std::weak_ptr</code> observes a <code>shared_ptr</code> without affecting the
          reference count. It is used to break circular references that would otherwise prevent
          objects from being deleted. Call <code>.lock()</code> to obtain a
          temporary <code>shared_ptr</code> if the object still exists.
        </p>
      </NoteBlock>

      <CppCode title="weak_ptr usage">{`#include <iostream>
#include <memory>

int main() {
    std::weak_ptr<int> wp;
    {
        auto sp = std::make_shared<int>(99);
        wp = sp;
        if (auto locked = wp.lock()) {
            std::cout << "Alive: " << *locked << std::endl;
        }
    }  // sp destroyed here

    if (wp.expired()) {
        std::cout << "Object no longer exists" << std::endl;
    }
    return 0;
}`}</CppCode>

      <OutputBlock>{`Alive: 99
Object no longer exists`}</OutputBlock>

      <WarningBlock title="Avoid Circular shared_ptr">
        <p>
          If object A holds a <code>shared_ptr</code> to B and B holds a <code>shared_ptr</code> to
          A, neither will ever be deleted. Use <code>weak_ptr</code> for back-references to break
          the cycle.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Use make_unique and make_shared">
        <p>
          Prefer <code>std::make_unique</code> and <code>std::make_shared</code> over
          raw <code>new</code>. They are exception-safe, more efficient (shared_ptr makes a single
          allocation), and clearly express intent. Default to <code>unique_ptr</code>; only
          use <code>shared_ptr</code> when shared ownership is genuinely needed.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Factory Function with unique_ptr"
        difficulty="intermediate"
        prompt="Write a factory function that returns a std::unique_ptr<Shape> where Shape is a base class with a virtual draw() method. Create a Circle subclass and call draw() through the unique_ptr."
        hints={[
          "The factory returns std::make_unique<Circle>(...)",
          "Use a virtual destructor in the base class",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <memory>

class Shape {
public:
    virtual void draw() const = 0;
    virtual ~Shape() = default;
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    void draw() const override {
        std::cout << "Circle with radius " << radius << std::endl;
    }
};

std::unique_ptr<Shape> createShape() {
    return std::make_unique<Circle>(5.0);
}

int main() {
    auto shape = createShape();
    shape->draw();
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::unique_ptr', url: 'https://en.cppreference.com/w/cpp/memory/unique_ptr', description: 'Exclusive-ownership smart pointer' },
        { type: 'cppreference', title: 'std::shared_ptr', url: 'https://en.cppreference.com/w/cpp/memory/shared_ptr', description: 'Shared-ownership smart pointer' },
        { type: 'textbook', title: 'Effective Modern C++', author: 'Scott Meyers', description: 'Items 18-22: Smart pointer best practices' },
      ]} />
    </div>
  )
}
