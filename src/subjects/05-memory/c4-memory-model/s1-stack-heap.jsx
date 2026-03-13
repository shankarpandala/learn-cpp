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

export default function S1StackHeap() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++ programs use two primary memory regions: the <strong>stack</strong> for local variables
        with automatic lifetime, and the <strong>heap</strong> (free store) for dynamically allocated
        objects whose lifetime you control. Understanding the differences is critical for writing
        efficient and correct programs.
      </p>

      <DefinitionBlock title="Stack vs Heap">
        <p>
          The <strong>stack</strong> is a LIFO (last-in, first-out) memory region managed automatically
          by the compiler for local variables and function call frames. The <strong>heap</strong> (free
          store) is a larger, unstructured region where memory is allocated and freed manually
          via <code>new</code>/<code>delete</code> or smart pointers.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Stack Frames</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Each function call creates a <strong>stack frame</strong> containing the function's local
        variables, parameters, and return address. When the function returns, its frame is popped
        and all local variables are destroyed automatically.
      </p>

      <CppCode title="Visualizing stack frames">{`#include <iostream>

void inner() {
    int c = 30;  // stack frame 3
    std::cout << "inner: &c = " << &c << std::endl;
}

void outer() {
    int b = 20;  // stack frame 2
    std::cout << "outer: &b = " << &b << std::endl;
    inner();
}

int main() {
    int a = 10;  // stack frame 1
    std::cout << "main:  &a = " << &a << std::endl;
    outer();
    return 0;
}`}</CppCode>

      <OutputBlock>{`main:  &a = 0x7ffd12340abc
outer: &b = 0x7ffd1234009c
inner: &c = 0x7ffd1233ff7c`}</OutputBlock>

      <NoteBlock type="info" title="Stack Grows Downward">
        <p>
          On most architectures, the stack grows toward lower addresses. Each successive function
          call places its frame at a lower memory address. This is why the addresses in the example
          decrease with each deeper call.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Heap Allocation</h2>

      <CppCode title="Stack vs heap lifetimes">{`#include <iostream>
#include <memory>

int* createOnStack() {
    int local = 42;
    return &local;  // WARNING: dangling pointer!
}

int* createOnHeap() {
    int* p = new int(42);
    return p;  // OK: heap outlives function scope
}

int main() {
    // Heap allocation — lives until explicitly freed
    int* heapVal = createOnHeap();
    std::cout << "Heap value: " << *heapVal << std::endl;
    delete heapVal;

    // Better: use smart pointer
    auto safe = std::make_unique<int>(99);
    std::cout << "Smart ptr:  " << *safe << std::endl;
    // automatically freed when safe goes out of scope
    return 0;
}`}</CppCode>

      <OutputBlock>{`Heap value: 42
Smart ptr:  99`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Performance Comparison</h2>

      <SyntaxBlock title="Speed Differences">
        <p>
          Stack allocation is essentially free — it just adjusts the stack pointer (a single CPU
          instruction). Heap allocation involves a system call or allocator lookup, which is
          orders of magnitude slower. Stack access also benefits from CPU cache locality.
        </p>
        <CppCode>{`// Stack: ~1 CPU instruction (adjusting stack pointer)
int x = 42;

// Heap: calls allocator, may trigger system call
int* p = new int(42);  // much slower`}</CppCode>
      </SyntaxBlock>

      <WarningBlock title="Stack Overflow">
        <p>
          The stack has a limited size (typically 1-8 MB). Allocating very large arrays on the stack
          or deeply recursive calls can cause a <strong>stack overflow</strong>, crashing the program.
          Use heap allocation for large data structures.
        </p>
      </WarningBlock>

      <CppCode title="Stack overflow example">{`#include <iostream>

void infiniteRecursion(int depth) {
    int buffer[1000];  // 4KB per frame
    std::cout << "Depth: " << depth << std::endl;
    infiniteRecursion(depth + 1);  // will crash!
}

// int main() {
//     infiniteRecursion(0);  // DO NOT RUN — stack overflow
//     return 0;
// }`}</CppCode>

      <BestPracticeBlock title="Stack for Small, Heap for Large">
        <p>
          Prefer stack allocation for small, short-lived objects — it is faster and automatically
          managed. Use heap allocation (via smart pointers) for large objects, objects that must
          outlive the creating scope, or objects whose size is not known at compile time.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Compare Addresses"
        difficulty="beginner"
        prompt="Write a program that creates one int on the stack and one on the heap. Print both addresses and determine which region each belongs to based on the address magnitude."
        hints={[
          "Stack addresses are typically very high (near 0x7fff...)",
          "Heap addresses are typically lower",
          "Use std::make_unique for the heap allocation",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <memory>

int main() {
    int stackVar = 10;
    auto heapVar = std::make_unique<int>(20);

    std::cout << "Stack address: " << &stackVar << std::endl;
    std::cout << "Heap address:  " << heapVar.get() << std::endl;

    if (reinterpret_cast<uintptr_t>(&stackVar) >
        reinterpret_cast<uintptr_t>(heapVar.get())) {
        std::cout << "Stack is at higher addresses" << std::endl;
    }
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Storage duration', url: 'https://en.cppreference.com/w/cpp/language/storage_duration', description: 'Automatic, dynamic, static, and thread storage' },
        { type: 'cppreference', title: 'new expression', url: 'https://en.cppreference.com/w/cpp/language/new', description: 'Dynamic memory allocation' },
        { type: 'textbook', title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', description: 'Section 11.2: Free Store (Heap)' },
      ]} />
    </div>
  )
}
