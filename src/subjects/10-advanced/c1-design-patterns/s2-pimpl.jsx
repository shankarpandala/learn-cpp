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

export default function S2Pimpl() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The Pimpl (Pointer to Implementation) idiom hides a class's implementation details behind
        a forward-declared pointer. This creates a compilation firewall, reducing build dependencies
        and preserving ABI stability when implementation details change.
      </p>

      <DefinitionBlock title="Pimpl Idiom">
        <p>
          The Pimpl idiom separates a class's public interface from its private implementation by
          storing all private members in a separate class accessed through an opaque pointer.
          Changes to the implementation do not require recompilation of dependent code.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">The Problem: Header Dependencies</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        When private members change in a header, all translation units that include that header must
        be recompiled. The Pimpl idiom eliminates this by moving private members into a source file.
      </p>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Pimpl with unique_ptr</h2>

      <CppCode title="widget.h - Public header">{`#pragma once
#include <memory>
#include <string>

class Widget {
public:
    Widget(const std::string& name);
    ~Widget();  // Must be declared - defined in .cpp

    // Move operations
    Widget(Widget&& other) noexcept;
    Widget& operator=(Widget&& other) noexcept;

    // Public interface
    void doWork();
    std::string name() const;

private:
    struct Impl;                    // Forward declaration
    std::unique_ptr<Impl> pImpl_;   // Opaque pointer
};`}</CppCode>

      <CppCode title="widget.cpp - Implementation">{`#include "widget.h"
#include <iostream>
#include <vector>  // Heavy headers only in .cpp

struct Widget::Impl {
    std::string name;
    std::vector<int> data;
    int counter = 0;

    void internalProcess() {
        ++counter;
        std::cout << name << " processed " << counter << " times\\n";
    }
};

Widget::Widget(const std::string& name)
    : pImpl_(std::make_unique<Impl>()) {
    pImpl_->name = name;
}

Widget::~Widget() = default;
Widget::Widget(Widget&&) noexcept = default;
Widget& Widget::operator=(Widget&&) noexcept = default;

void Widget::doWork() {
    pImpl_->internalProcess();
}

std::string Widget::name() const {
    return pImpl_->name;
}`}</CppCode>

      <CppCode title="main.cpp - Usage">{`#include "widget.h"
#include <iostream>

int main() {
    Widget w("MyWidget");
    w.doWork();
    w.doWork();
    std::cout << "Name: " << w.name() << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`MyWidget processed 1 times
MyWidget processed 2 times
Name: MyWidget`}</OutputBlock>

      <SyntaxBlock title="Why Destructor Must Be in .cpp">
        <p>
          <code>std::unique_ptr</code> requires the complete type at the point where the destructor is
          defined. Since <code>Impl</code> is only forward-declared in the header, the destructor
          must be defined in the <code>.cpp</code> file where <code>Impl</code> is fully defined.
        </p>
      </SyntaxBlock>

      <WarningBlock title="Copy Semantics">
        <p>
          A class using Pimpl with <code>std::unique_ptr</code> is not copyable by default. If you
          need copy semantics, you must implement the copy constructor and copy assignment operator
          manually, performing a deep copy of the Impl object.
        </p>
      </WarningBlock>

      <NoteBlock type="info" title="ABI Stability">
        <p>
          Because the class size never changes (it only contains a pointer), you can modify the
          <code>Impl</code> struct freely without breaking binary compatibility. This is critical
          for shared libraries where recompilation of client code is not always possible.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Use Pimpl for stable library interfaces">
        <p>
          Apply Pimpl to classes that form part of a public API or are included widely across a
          large codebase. The small runtime cost (heap allocation, pointer indirection) is usually
          outweighed by faster compile times and ABI stability.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Add Copy Semantics to Pimpl"
        difficulty="intermediate"
        prompt="Extend the Widget class above to support deep copy: implement a copy constructor and copy assignment operator that duplicate the Impl object."
        hints={[
          "The copy constructor should create a new unique_ptr<Impl> by copying the other's Impl",
          "Use std::make_unique<Impl>(*other.pImpl_) for the deep copy",
          "Remember the copy-and-swap idiom for exception-safe assignment",
        ]}
        solution={
          <CppCode>{`// Add to widget.h:
// Widget(const Widget& other);
// Widget& operator=(const Widget& other);

// In widget.cpp:
Widget::Widget(const Widget& other)
    : pImpl_(std::make_unique<Impl>(*other.pImpl_)) {}

Widget& Widget::operator=(const Widget& other) {
    if (this != &other) {
        pImpl_ = std::make_unique<Impl>(*other.pImpl_);
    }
    return *this;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'PImpl idiom', url: 'https://en.cppreference.com/w/cpp/language/pimpl', description: 'Pimpl idiom reference' },
        { type: 'article', title: 'GotW #100: Compilation Firewalls', url: 'https://herbsutter.com/gotw/_100/', author: 'Herb Sutter', description: 'Detailed Pimpl discussion' },
        { type: 'textbook', title: 'Effective Modern C++', author: 'Scott Meyers', description: 'Item 22: Using Pimpl with unique_ptr' },
      ]} />
    </div>
  )
}
