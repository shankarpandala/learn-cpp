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

export default function S1UniquePtr() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>std::unique_ptr</code> is the workhorse of modern C++ memory management. It represents
        <strong> exclusive ownership</strong> of a dynamically allocated object: exactly one
        <code>unique_ptr</code> owns the resource at any time, and the resource is automatically
        deleted when the pointer goes out of scope.
      </p>

      <DefinitionBlock title="std::unique_ptr">
        <p>
          A smart pointer that owns and manages a heap-allocated object through a pointer, disposing
          of it when the <code>unique_ptr</code> is destroyed. It cannot be copied, only moved,
          enforcing single-ownership semantics at compile time.
        </p>
      </DefinitionBlock>

      <SyntaxBlock title="Creating a unique_ptr">
        <p>
          Use <code>std::make_unique</code> (C++14) to create a <code>unique_ptr</code>. This is
          exception-safe and avoids writing <code>new</code> directly.
        </p>
        <CppCode>{`#include <memory>
auto ptr = std::make_unique<Type>(constructor_args...);`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic Usage</h2>

      <CppCode title="unique_basic.cpp">{`#include <iostream>
#include <memory>
#include <string>

class Resource {
    std::string name_;
public:
    Resource(std::string name) : name_(std::move(name)) {
        std::cout << name_ << " created\\n";
    }
    ~Resource() { std::cout << name_ << " destroyed\\n"; }
    void use() { std::cout << "Using " << name_ << "\\n"; }
};

int main() {
    auto r = std::make_unique<Resource>("Widget");
    r->use();

    // Transfer ownership via move
    auto r2 = std::move(r);
    if (!r) std::cout << "r is now null\\n";
    r2->use();

    // r2 goes out of scope -> Resource is destroyed
    return 0;
}`}</CppCode>

      <OutputBlock>{`Widget created
Using Widget
r is now null
Using Widget
Widget destroyed`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Custom Deleters and Arrays</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>unique_ptr</code> supports custom deleters for special cleanup logic and has a
        partial specialization for arrays (<code>unique_ptr&lt;T[]&gt;</code>).
      </p>

      <CppCode title="unique_advanced.cpp">{`#include <iostream>
#include <memory>
#include <cstdio>

int main() {
    // unique_ptr for arrays
    auto arr = std::make_unique<int[]>(5);
    for (int i = 0; i < 5; ++i) arr[i] = i * 10;
    for (int i = 0; i < 5; ++i) std::cout << arr[i] << " ";
    std::cout << "\\n";

    // Custom deleter for FILE*
    auto file_deleter = [](FILE* f) {
        if (f) {
            std::fclose(f);
            std::cout << "File closed\\n";
        }
    };
    {
        std::unique_ptr<FILE, decltype(file_deleter)> file(
            std::fopen("/dev/null", "w"), file_deleter
        );
        if (file) std::cout << "File opened\\n";
    } // file_deleter called here

    return 0;
}`}</CppCode>

      <OutputBlock>{`0 10 20 30 40
File opened
File closed`}</OutputBlock>

      <NoteBlock type="info" title="Move-only semantics">
        <p>
          <code>unique_ptr</code> cannot be copied. Attempting to copy one is a compile error. This
          design enforces exclusive ownership at the type level. To transfer ownership, use
          <code>std::move</code>. This makes <code>unique_ptr</code> ideal for expressing that a
          function takes or gives up ownership.
        </p>
      </NoteBlock>

      <WarningBlock title="Never use raw new with unique_ptr constructor">
        <p>
          Avoid <code>std::unique_ptr&lt;T&gt;(new T(args))</code>. If an exception is thrown
          between the <code>new</code> and the <code>unique_ptr</code> construction, the memory leaks.
          Always prefer <code>std::make_unique&lt;T&gt;(args)</code>.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Use unique_ptr by default">
        <p>
          When you need dynamic allocation, reach for <code>std::unique_ptr</code> first. Only use
          <code>std::shared_ptr</code> when you truly need shared ownership. <code>unique_ptr</code>
          has zero overhead compared to a raw pointer and clearly communicates ownership intent.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Factory Function with unique_ptr"
        difficulty="intermediate"
        prompt="Write a factory function that returns a std::unique_ptr<Shape> where Shape is a base class with a virtual draw() method. Create a Circle derived class and demonstrate polymorphic use."
        hints={[
          "Define Shape with a virtual draw() and virtual destructor",
          "Derive Circle from Shape overriding draw()",
          "Return std::make_unique<Circle>() from the factory",
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
    double radius_;
public:
    Circle(double r) : radius_(r) {}
    void draw() const override {
        std::cout << "Circle with radius " << radius_ << "\\n";
    }
};

std::unique_ptr<Shape> createShape(double r) {
    return std::make_unique<Circle>(r);
}

int main() {
    auto shape = createShape(5.0);
    shape->draw();
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::unique_ptr', url: 'https://en.cppreference.com/w/cpp/memory/unique_ptr', description: 'Exclusive-ownership smart pointer' },
        { type: 'cppreference', title: 'std::make_unique', url: 'https://en.cppreference.com/w/cpp/memory/unique_ptr/make_unique', description: 'Factory function for unique_ptr' },
        { type: 'textbook', title: 'Effective Modern C++', author: 'Scott Meyers', description: 'Item 18: Use std::unique_ptr for exclusive-ownership resource management' },
      ]} />
    </div>
  )
}
