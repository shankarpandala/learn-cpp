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

export default function S2RvalueRefs() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Rvalue references, introduced in C++11, bind to temporary objects (rvalues). They enable
        <strong> move semantics</strong>, allowing resources to be transferred rather than copied,
        which dramatically improves performance for objects that manage heap memory.
      </p>

      <DefinitionBlock title="Rvalue Reference">
        <p>
          An <strong>rvalue reference</strong> (declared with <code>&&</code>) binds to temporary
          values (rvalues) — objects that are about to be destroyed. This allows the program to
          "steal" their resources instead of making an expensive deep copy.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Binding Rules</h2>

      <SyntaxBlock title="Rvalue Reference Syntax">
        <p>
          An rvalue reference uses <code>&&</code>. It can bind to temporaries but not to lvalues.
          A <code>const&</code> can bind to both.
        </p>
        <CppCode>{`int&& rref = 42;           // OK: binds to temporary
// int&& bad = x;          // ERROR: x is an lvalue
const int& cref = 42;     // OK: const& binds to rvalues too`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Rvalue reference basics">{`#include <iostream>
#include <string>

void process(const std::string& s) {
    std::cout << "lvalue: " << s << std::endl;
}

void process(std::string&& s) {
    std::cout << "rvalue: " << s << std::endl;
}

int main() {
    std::string name = "Alice";
    process(name);              // calls lvalue overload
    process("Bob");             // calls rvalue overload
    process(std::string("C"));  // calls rvalue overload
    return 0;
}`}</CppCode>

      <OutputBlock>{`lvalue: Alice
rvalue: Bob
rvalue: C`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::move</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>std::move</code> does not move anything. It is a cast that converts an lvalue into an
        rvalue reference, signaling that the object's resources may be transferred.
      </p>

      <CppCode title="Using std::move">{`#include <iostream>
#include <string>
#include <utility>

int main() {
    std::string a = "Hello, World!";
    std::cout << "a before move: " << a << std::endl;

    std::string b = std::move(a);  // a's contents transferred to b
    std::cout << "b after move:  " << b << std::endl;
    std::cout << "a after move:  '" << a << "'" << std::endl;
    // a is now in a valid but unspecified state
    return 0;
}`}</CppCode>

      <OutputBlock>{`a before move: Hello, World!
b after move:  Hello, World!
a after move:  ''`}</OutputBlock>

      <WarningBlock title="Moved-From Objects">
        <p>
          After <code>std::move</code>, the source object is in a <strong>valid but unspecified
          state</strong>. You can assign to it or destroy it, but you must not rely on its value.
          Do not use a moved-from object without first resetting it.
        </p>
      </WarningBlock>

      <NoteBlock type="info" title="Move Semantics Motivation">
        <p>
          Without move semantics, returning a <code>std::vector</code> with 10 million elements from
          a function would copy all of them. With move semantics, the internal buffer pointer is
          simply transferred — an O(1) operation instead of O(n).
        </p>
      </NoteBlock>

      <CppCode title="Move semantics with a vector">{`#include <iostream>
#include <vector>
#include <utility>

std::vector<int> makeData() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    return v;  // moved (or elided) automatically
}

int main() {
    std::vector<int> data = makeData();
    std::cout << "Size: " << data.size() << std::endl;

    std::vector<int> other = std::move(data);
    std::cout << "other size: " << other.size() << std::endl;
    std::cout << "data size:  " << data.size() << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Size: 5
other size: 5
data size:  0`}</OutputBlock>

      <NoteBlock type="history" title="C++11 Revolution">
        <p>
          Rvalue references and move semantics were the most impactful feature of C++11. They
          eliminated the need for many copy operations in the standard library, making containers
          and algorithms significantly faster without any changes to user code.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="When to Use std::move">
        <p>
          Use <code>std::move</code> when you are done with an object and want to transfer its
          resources to another. Do not move from objects you still need. The compiler often applies
          move semantics automatically for return values (NRVO), so do not write <code>return
          std::move(x)</code> — it can actually prevent the optimization.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Observe Move vs Copy"
        difficulty="intermediate"
        prompt="Create a class with a copy constructor and move constructor that each print a message. Create instances to trigger both, demonstrating when each is called."
        hints={[
          "Define both MyClass(const MyClass&) and MyClass(MyClass&&)",
          "Use std::move to trigger the move constructor",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <utility>

class MyClass {
public:
    MyClass() { std::cout << "Default ctor" << std::endl; }
    MyClass(const MyClass&) { std::cout << "Copy ctor" << std::endl; }
    MyClass(MyClass&&) noexcept { std::cout << "Move ctor" << std::endl; }
};

int main() {
    MyClass a;               // Default ctor
    MyClass b = a;           // Copy ctor
    MyClass c = std::move(a); // Move ctor
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Rvalue references', url: 'https://en.cppreference.com/w/cpp/language/reference', description: 'Reference declaration including rvalue references' },
        { type: 'cppreference', title: 'std::move', url: 'https://en.cppreference.com/w/cpp/utility/move', description: 'Cast to rvalue reference' },
        { type: 'textbook', title: 'Effective Modern C++', author: 'Scott Meyers', description: 'Items 23-25: Understanding std::move and std::forward' },
      ]} />
    </div>
  )
}
