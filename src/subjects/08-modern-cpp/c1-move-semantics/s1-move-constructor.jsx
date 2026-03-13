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

export default function S1MoveConstructor() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Move semantics, introduced in C++11, allow resources to be <em>transferred</em> from one
        object to another instead of being copied. The move constructor is the mechanism that makes
        this possible, enabling efficient handling of temporary objects and explicit ownership transfers.
      </p>

      <DefinitionBlock title="Move Constructor">
        <p>
          A move constructor is a special member function that transfers ownership of resources from
          a source object (an rvalue) to a newly constructed object. After the move, the source object
          is left in a valid but unspecified state, often called the <strong>moved-from state</strong>.
        </p>
      </DefinitionBlock>

      <SyntaxBlock title="Move Constructor Syntax">
        <p>
          A move constructor takes an <strong>rvalue reference</strong> (<code>&&</code>) to its own
          type as a parameter. It should be marked <code>noexcept</code> to enable optimizations in
          standard library containers.
        </p>
        <CppCode>{`ClassName(ClassName&& other) noexcept;`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Resource Stealing in Action</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The key idea behind a move constructor is <strong>resource stealing</strong>: instead of
        allocating new memory and copying data, we simply take the pointer from the source object
        and null out the source so it no longer owns the resource.
      </p>

      <CppCode title="move_buffer.cpp">{`#include <iostream>
#include <cstring>
#include <utility>

class Buffer {
    char* data_;
    size_t size_;
public:
    // Regular constructor
    Buffer(const char* str) : size_(std::strlen(str)) {
        data_ = new char[size_ + 1];
        std::strcpy(data_, str);
        std::cout << "Constructed: " << data_ << "\\n";
    }

    // Move constructor - steal resources
    Buffer(Buffer&& other) noexcept
        : data_(other.data_), size_(other.size_) {
        other.data_ = nullptr;  // leave source in valid state
        other.size_ = 0;
        std::cout << "Moved: " << data_ << "\\n";
    }

    ~Buffer() {
        delete[] data_;
        std::cout << "Destroyed\\n";
    }

    const char* c_str() const { return data_ ? data_ : "(empty)"; }
};

int main() {
    Buffer a("Hello");
    Buffer b(std::move(a));  // invoke move constructor
    std::cout << "a: " << a.c_str() << "\\n";
    std::cout << "b: " << b.c_str() << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`Constructed: Hello
Moved: Hello
a: (empty)
b: Hello
Destroyed
Destroyed`}</OutputBlock>

      <NoteBlock type="important" title="The Moved-From State">
        <p>
          After a move, the source object must be in a <strong>valid but unspecified</strong> state.
          This means it must be safe to destroy and safe to assign to, but you should not rely on
          its value. Setting pointers to <code>nullptr</code> ensures the destructor runs safely.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Why noexcept Matters</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Standard library containers like <code>std::vector</code> will only use your move constructor
        during reallocation if it is marked <code>noexcept</code>. Without it, the container falls
        back to copying for exception safety.
      </p>

      <CppCode title="noexcept_vector.cpp">{`#include <iostream>
#include <vector>

class Widget {
    int id_;
public:
    Widget(int id) : id_(id) {}

    // Mark noexcept so vector uses move during reallocation
    Widget(Widget&& other) noexcept : id_(other.id_) {
        other.id_ = -1;
        std::cout << "Move " << id_ << "\\n";
    }

    Widget(const Widget& other) : id_(other.id_) {
        std::cout << "Copy " << id_ << "\\n";
    }
};

int main() {
    std::vector<Widget> v;
    v.reserve(2);
    v.emplace_back(1);
    v.emplace_back(2);
    // This reallocation uses move because of noexcept
    v.emplace_back(3);
    return 0;
}`}</CppCode>

      <OutputBlock>{`Move 1
Move 2`}</OutputBlock>

      <BestPracticeBlock title="Always mark move constructors noexcept">
        <p>
          A move constructor should never throw exceptions because it is merely transferring
          ownership of existing resources, not acquiring new ones. Mark it <code>noexcept</code> to
          enable the standard library to use it in performance-critical operations like vector
          reallocation and <code>std::swap</code>.
        </p>
      </BestPracticeBlock>

      <WarningBlock title="Do not use a moved-from object">
        <p>
          Accessing the value of a moved-from object is a common source of bugs. After moving,
          only destroy or reassign the object. Never read its contents unless the class explicitly
          documents what the moved-from state holds.
        </p>
      </WarningBlock>

      <CompilerNoteBlock compiler="gcc" title="Detecting missing noexcept">
        <p>
          GCC provides <code>-Wnoexcept</code> to warn when a move constructor or move assignment
          operator is not marked <code>noexcept</code>, helping you catch missed annotations early.
        </p>
      </CompilerNoteBlock>

      <ExerciseBlock
        title="Write a Move Constructor"
        difficulty="intermediate"
        prompt="Create a class DynamicArray that manages a heap-allocated int array. Implement a move constructor that transfers ownership of the array."
        hints={[
          "Store a pointer to the array and its size as members",
          "In the move constructor, steal the pointer and size, then null out the source",
          "Remember to mark it noexcept",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <utility>

class DynamicArray {
    int* data_;
    size_t size_;
public:
    DynamicArray(size_t n) : data_(new int[n]()), size_(n) {}

    DynamicArray(DynamicArray&& other) noexcept
        : data_(other.data_), size_(other.size_) {
        other.data_ = nullptr;
        other.size_ = 0;
    }

    ~DynamicArray() { delete[] data_; }
    size_t size() const { return size_; }
};

int main() {
    DynamicArray a(5);
    DynamicArray b(std::move(a));
    std::cout << "a size: " << a.size() << "\\n";
    std::cout << "b size: " << b.size() << "\\n";
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Move constructors', url: 'https://en.cppreference.com/w/cpp/language/move_constructor', description: 'Full specification of move constructors' },
        { type: 'cppreference', title: 'std::move', url: 'https://en.cppreference.com/w/cpp/utility/move', description: 'Casting to rvalue reference' },
        { type: 'textbook', title: 'Effective Modern C++', author: 'Scott Meyers', description: 'Item 17: Understand special member function generation' },
      ]} />
    </div>
  )
}
