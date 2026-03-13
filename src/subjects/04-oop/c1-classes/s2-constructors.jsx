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

export default function S2Constructors() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Constructors and destructors manage the lifecycle of objects. Constructors initialize an
        object when it is created, while destructors clean up resources when the object is destroyed.
        Understanding these special member functions is essential for writing correct C++ code.
      </p>

      <DefinitionBlock title="Constructor and Destructor">
        <p>
          A <strong>constructor</strong> is a special member function with the same name as the class,
          called automatically when an object is created. A <strong>destructor</strong> has the same
          name prefixed with <code>~</code> and is called when the object goes out of scope or
          is deleted.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Default and Parameterized Constructors</h2>

      <CppCode title="Constructor types">{`#include <iostream>
#include <string>

class Student {
    std::string name;
    int age;
public:
    Student() : name("Unknown"), age(0) {           // default constructor
        std::cout << "Default ctor" << std::endl;
    }

    Student(std::string n, int a) : name(n), age(a) {  // parameterized
        std::cout << "Param ctor: " << name << std::endl;
    }

    ~Student() {                                     // destructor
        std::cout << "Dtor: " << name << std::endl;
    }

    void print() const {
        std::cout << name << ", age " << age << std::endl;
    }
};

int main() {
    Student s1;
    Student s2("Alice", 20);
    s1.print();
    s2.print();
    return 0;
}`}</CppCode>

      <OutputBlock>{`Default ctor
Param ctor: Alice
Unknown, age 0
Alice, age 20
Dtor: Alice
Dtor: Unknown`}</OutputBlock>

      <SyntaxBlock title="Member Initializer List">
        <p>
          The member initializer list appears after the constructor parameter list, preceded by a
          colon. Members are initialized in declaration order, not the order listed. Always prefer
          initializer lists over assignment in the constructor body.
        </p>
        <CppCode>{`ClassName(params) : member1(val1), member2(val2) {
    // constructor body
}`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Copy and Move Constructors</h2>

      <CppCode title="Copy and move semantics">{`#include <iostream>
#include <string>
#include <utility>

class Buffer {
    std::string data;
public:
    Buffer(std::string d) : data(std::move(d)) {
        std::cout << "Ctor: " << data << std::endl;
    }

    Buffer(const Buffer& other) : data(other.data) {     // copy ctor
        std::cout << "Copy: " << data << std::endl;
    }

    Buffer(Buffer&& other) noexcept : data(std::move(other.data)) {  // move ctor
        std::cout << "Move: " << data << std::endl;
    }

    ~Buffer() { std::cout << "Dtor: " << data << std::endl; }
};

int main() {
    Buffer b1("hello");
    Buffer b2 = b1;              // copy constructor
    Buffer b3 = std::move(b1);   // move constructor
    return 0;
}`}</CppCode>

      <OutputBlock>{`Ctor: hello
Copy: hello
Move: hello
Dtor: hello
Dtor: hello
Dtor: `}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">The Rule of Five</h2>

      <DefinitionBlock title="Rule of Five">
        <p>
          If a class defines or deletes any one of the following special member functions, it should
          explicitly define or delete all five: <strong>destructor</strong>, <strong>copy
          constructor</strong>, <strong>copy assignment operator</strong>, <strong>move
          constructor</strong>, and <strong>move assignment operator</strong>.
        </p>
      </DefinitionBlock>

      <WarningBlock title="Beware of implicit deletion">
        <p>
          Declaring a custom destructor or copy constructor prevents the compiler from implicitly
          generating move operations. This can silently degrade performance by falling back to
          copies instead of moves.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Prefer the Rule of Zero">
        <p>
          Design classes so they do not need custom special member functions. Use RAII wrappers
          like <code>std::unique_ptr</code>, <code>std::vector</code>, and <code>std::string</code> to
          manage resources, letting the compiler generate correct defaults automatically.
        </p>
      </BestPracticeBlock>

      <NoteBlock type="tip" title="= default and = delete">
        <p>
          Use <code>= default</code> to explicitly request the compiler-generated version and
          <code>= delete</code> to prevent a function from being called. For example,
          <code>Buffer(const Buffer&) = delete;</code> forbids copying.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Implement Rule of Five"
        difficulty="intermediate"
        prompt="Create a class IntArray that wraps a dynamically allocated int array. Implement all five special member functions (destructor, copy ctor, copy assignment, move ctor, move assignment) correctly."
        hints={[
          "Use new[] in the constructor and delete[] in the destructor",
          "Copy assignment should handle self-assignment",
          "Move operations should set the source pointer to nullptr",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <algorithm>

class IntArray {
    int* data;
    size_t size;
public:
    IntArray(size_t n) : data(new int[n]()), size(n) {}
    ~IntArray() { delete[] data; }

    IntArray(const IntArray& o) : data(new int[o.size]), size(o.size) {
        std::copy(o.data, o.data + size, data);
    }
    IntArray& operator=(const IntArray& o) {
        if (this != &o) {
            delete[] data;
            size = o.size;
            data = new int[size];
            std::copy(o.data, o.data + size, data);
        }
        return *this;
    }
    IntArray(IntArray&& o) noexcept : data(o.data), size(o.size) {
        o.data = nullptr; o.size = 0;
    }
    IntArray& operator=(IntArray&& o) noexcept {
        if (this != &o) {
            delete[] data;
            data = o.data; size = o.size;
            o.data = nullptr; o.size = 0;
        }
        return *this;
    }
};`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Constructors and member initializer lists', url: 'https://en.cppreference.com/w/cpp/language/constructor', description: 'Full constructor reference' },
        { type: 'cppreference', title: 'Destructors', url: 'https://en.cppreference.com/w/cpp/language/destructor', description: 'Destructor semantics' },
        { type: 'cppreference', title: 'Rule of three/five/zero', url: 'https://en.cppreference.com/w/cpp/language/rule_of_three', description: 'Special member function guidelines' },
      ]} />
    </div>
  )
}
