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

export default function S2MoveAssignment() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The move assignment operator complements the move constructor by allowing an existing object
        to take ownership of another object's resources. Together with the copy constructor, copy
        assignment, move constructor, and destructor, they form the <strong>Rule of Five</strong>.
      </p>

      <DefinitionBlock title="Move Assignment Operator">
        <p>
          The move assignment operator transfers resources from a source rvalue into an already-constructed
          object. It must first release any resources the target currently owns, then steal the source's
          resources and leave the source in a valid moved-from state.
        </p>
      </DefinitionBlock>

      <SyntaxBlock title="Move Assignment Syntax">
        <p>
          Like the move constructor, the move assignment operator takes an rvalue reference and should
          be marked <code>noexcept</code>. It returns a reference to <code>*this</code>.
        </p>
        <CppCode>{`ClassName& operator=(ClassName&& other) noexcept;`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Self-Assignment and Resource Transfer</h2>

      <CppCode title="move_assign.cpp">{`#include <iostream>
#include <cstring>
#include <utility>

class String {
    char* data_;
    size_t len_;
public:
    String(const char* s = "") : len_(std::strlen(s)) {
        data_ = new char[len_ + 1];
        std::strcpy(data_, s);
    }

    // Move assignment operator
    String& operator=(String&& other) noexcept {
        if (this != &other) {       // self-assignment check
            delete[] data_;          // release current resource
            data_ = other.data_;     // steal resource
            len_ = other.len_;
            other.data_ = nullptr;   // leave source valid
            other.len_ = 0;
        }
        return *this;
    }

    // Copy constructor & assignment omitted for brevity
    ~String() { delete[] data_; }
    const char* c_str() const { return data_ ? data_ : "(null)"; }
};

int main() {
    String a("Hello");
    String b("World");
    std::cout << "Before: a=" << a.c_str() << " b=" << b.c_str() << "\\n";

    b = std::move(a);  // move assignment
    std::cout << "After:  a=" << a.c_str() << " b=" << b.c_str() << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`Before: a=Hello b=World
After:  a=(null) b=Hello`}</OutputBlock>

      <WarningBlock title="Self-assignment guard">
        <p>
          Always check for self-assignment (<code>this != &other</code>) in the move assignment
          operator. Without it, <code>a = std::move(a)</code> would delete the resource and then
          try to read from freed memory.
        </p>
      </WarningBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">The Copy-and-Swap Idiom</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        An elegant alternative is the <strong>copy-and-swap idiom</strong>, which unifies the copy
        and move assignment operators into a single function that takes its parameter by value.
      </p>

      <CppCode title="copy_and_swap.cpp">{`#include <iostream>
#include <utility>
#include <algorithm>

class Buffer {
    int* data_;
    size_t size_;
public:
    Buffer(size_t n = 0) : data_(n ? new int[n]() : nullptr), size_(n) {}

    Buffer(const Buffer& other) : data_(new int[other.size_]), size_(other.size_) {
        std::copy(other.data_, other.data_ + size_, data_);
    }

    Buffer(Buffer&& other) noexcept : data_(other.data_), size_(other.size_) {
        other.data_ = nullptr;
        other.size_ = 0;
    }

    // Unified assignment: works for both copy and move
    Buffer& operator=(Buffer other) noexcept {
        swap(*this, other);
        return *this;
    }

    friend void swap(Buffer& a, Buffer& b) noexcept {
        using std::swap;
        swap(a.data_, b.data_);
        swap(a.size_, b.size_);
    }

    ~Buffer() { delete[] data_; }
    size_t size() const { return size_; }
};

int main() {
    Buffer a(5);
    Buffer b(10);
    b = std::move(a);  // calls move ctor for param, then swaps
    std::cout << "b size: " << b.size() << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`b size: 5`}</OutputBlock>

      <NoteBlock type="tip" title="Rule of Five">
        <p>
          If a class defines any one of the following, it should explicitly define all five:
          destructor, copy constructor, copy assignment operator, move constructor, and move
          assignment operator. This is the <strong>Rule of Five</strong>. With copy-and-swap
          you can combine both assignment operators into one.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Prefer copy-and-swap for exception safety">
        <p>
          The copy-and-swap idiom provides the strong exception guarantee: if the copy (or move)
          of the parameter fails, the target object remains unchanged. The swap itself is
          <code>noexcept</code>, so the operation either fully succeeds or has no effect.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Implement Move Assignment"
        difficulty="intermediate"
        prompt="Add a move assignment operator to a class that manages a dynamically allocated array of doubles. Use either the direct approach or copy-and-swap."
        hints={[
          "Release the current resource before stealing the new one",
          "Check for self-assignment if using the direct approach",
          "Mark the operator noexcept",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <utility>

class DoubleArray {
    double* data_;
    size_t size_;
public:
    DoubleArray(size_t n) : data_(new double[n]()), size_(n) {}

    DoubleArray(DoubleArray&& other) noexcept
        : data_(other.data_), size_(other.size_) {
        other.data_ = nullptr;
        other.size_ = 0;
    }

    DoubleArray& operator=(DoubleArray&& other) noexcept {
        if (this != &other) {
            delete[] data_;
            data_ = other.data_;
            size_ = other.size_;
            other.data_ = nullptr;
            other.size_ = 0;
        }
        return *this;
    }

    ~DoubleArray() { delete[] data_; }
    size_t size() const { return size_; }
};

int main() {
    DoubleArray a(3);
    DoubleArray b(7);
    b = std::move(a);
    std::cout << "b size: " << b.size() << "\\n";
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Move assignment operator', url: 'https://en.cppreference.com/w/cpp/language/move_assignment', description: 'Move assignment operator specification' },
        { type: 'cppreference', title: 'Rule of three/five/zero', url: 'https://en.cppreference.com/w/cpp/language/rule_of_three', description: 'Guidelines for special member functions' },
        { type: 'textbook', title: 'Effective Modern C++', author: 'Scott Meyers', description: 'Item 17: Understand special member function generation' },
      ]} />
    </div>
  )
}
