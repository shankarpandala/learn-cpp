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

export default function S1NewDelete() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++ gives you direct control over memory allocation using <code>new</code> and <code>delete</code>.
        While modern C++ strongly favors smart pointers, understanding manual memory management is
        essential for working with legacy code and grasping how smart pointers work internally.
      </p>

      <DefinitionBlock title="Dynamic Memory Allocation">
        <p>
          <strong>Dynamic memory allocation</strong> creates objects on the heap at runtime
          using <code>new</code>. The programmer is responsible for releasing this memory
          with <code>delete</code>. Failure to do so causes <strong>memory leaks</strong>.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">new and delete</h2>

      <SyntaxBlock title="Single Object Allocation">
        <p>
          <code>new</code> allocates memory on the heap, constructs the object, and returns a
          pointer. <code>delete</code> calls the destructor and frees the memory.
        </p>
        <CppCode>{`Type* ptr = new Type(args);  // allocate and construct
delete ptr;                  // destroy and deallocate
ptr = nullptr;               // prevent dangling pointer`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Basic new/delete usage">{`#include <iostream>

int main() {
    int* p = new int(42);
    std::cout << "Value: " << *p << std::endl;
    delete p;
    p = nullptr;

    double* d = new double(3.14);
    std::cout << "Pi: " << *d << std::endl;
    delete d;
    d = nullptr;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Value: 42
Pi: 3.14`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Array Allocation</h2>

      <CppCode title="new[] and delete[]">{`#include <iostream>

int main() {
    int size = 5;
    int* arr = new int[size]{10, 20, 30, 40, 50};

    for (int i = 0; i < size; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;

    delete[] arr;  // MUST use delete[] for arrays
    arr = nullptr;
    return 0;
}`}</CppCode>

      <OutputBlock>{`10 20 30 40 50`}</OutputBlock>

      <WarningBlock title="Mismatched new/delete">
        <p>
          Using <code>delete</code> on memory allocated with <code>new[]</code> (or vice versa) is
          <strong> undefined behavior</strong>. Always pair <code>new</code> with <code>delete</code> and
          <code> new[]</code> with <code>delete[]</code>.
        </p>
      </WarningBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Common Pitfalls</h2>

      <CppCode title="Memory leak and dangling pointer">{`#include <iostream>

void memoryLeak() {
    int* p = new int(100);
    // forgot delete p; — memory is leaked!
}

void danglingPointer() {
    int* p = new int(200);
    delete p;
    // p still holds the old address (dangling)
    // *p = 5;  // UNDEFINED BEHAVIOR
    p = nullptr;  // safe: prevents accidental use
}

int main() {
    memoryLeak();
    danglingPointer();
    std::cout << "No crash, but memoryLeak() lost memory" << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`No crash, but memoryLeak() lost memory`}</OutputBlock>

      <NoteBlock type="info" title="Placement new">
        <p>
          <strong>Placement new</strong> constructs an object at a specific memory address without
          allocating new memory: <code>new (address) Type(args)</code>. It is used in custom
          allocators and memory pools. You must call the destructor manually and must not
          use <code>delete</code> on placement-new objects.
        </p>
      </NoteBlock>

      <WarningBlock title="Double Delete">
        <p>
          Calling <code>delete</code> on the same pointer twice is undefined behavior. Setting
          a pointer to <code>nullptr</code> after deletion is a common safeguard,
          because <code>delete nullptr</code> is a safe no-op.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Avoid Raw new/delete in Modern C++">
        <p>
          Use <code>std::make_unique</code> and <code>std::make_shared</code> instead of
          raw <code>new</code>. Use <code>std::vector</code> instead of <code>new[]</code>. Reserve
          raw allocation for custom allocators, placement new, and interfacing with C libraries.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Dynamic Array"
        difficulty="beginner"
        prompt="Allocate a dynamic int array of user-specified size, fill it with squares (1, 4, 9, ...), print the values, then properly deallocate. Set the pointer to nullptr afterward."
        hints={[
          "Use new int[size] to allocate",
          "Remember to use delete[] (not delete) for arrays",
        ]}
        solution={
          <CppCode>{`#include <iostream>

int main() {
    int size = 5;
    int* arr = new int[size];

    for (int i = 0; i < size; ++i) {
        arr[i] = (i + 1) * (i + 1);
    }

    for (int i = 0; i < size; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;

    delete[] arr;
    arr = nullptr;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'new expression', url: 'https://en.cppreference.com/w/cpp/language/new', description: 'Dynamic memory allocation with new' },
        { type: 'cppreference', title: 'delete expression', url: 'https://en.cppreference.com/w/cpp/language/delete', description: 'Deallocation with delete and delete[]' },
        { type: 'textbook', title: 'Effective C++', author: 'Scott Meyers', description: 'Item 16: Use the same form in corresponding uses of new and delete' },
      ]} />
    </div>
  )
}
