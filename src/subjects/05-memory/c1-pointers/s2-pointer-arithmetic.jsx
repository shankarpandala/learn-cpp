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

export default function S2PointerArithmetic() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Pointer arithmetic allows you to navigate through contiguous memory by adding or subtracting
        integer values from pointers. The compiler automatically scales the offset by the size of the
        pointed-to type, making array traversal natural and efficient.
      </p>

      <DefinitionBlock title="Pointer Arithmetic">
        <p>
          <strong>Pointer arithmetic</strong> is the set of operations that adjust a pointer's address
          by multiples of the pointed-to type's size. Adding <code>n</code> to
          a <code>T*</code> advances it by <code>n * sizeof(T)</code> bytes.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Adding and Subtracting Integers</h2>

      <SyntaxBlock title="Arithmetic Operations">
        <p>
          Pointers support increment (<code>++</code>), decrement (<code>--</code>), addition
          (<code>ptr + n</code>), and subtraction (<code>ptr - n</code>). Each operation moves
          by <code>sizeof(T)</code> bytes per unit.
        </p>
        <CppCode>{`T* p;
p + n   // address of element n positions forward
p - n   // address of element n positions backward
p++     // advance to next element
p--     // move to previous element`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Traversing an array with pointer arithmetic">{`#include <iostream>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int* ptr = arr;  // points to first element

    for (int i = 0; i < 5; ++i) {
        std::cout << "arr[" << i << "] = " << *(ptr + i) << std::endl;
    }
    return 0;
}`}</CppCode>

      <OutputBlock>{`arr[0] = 10
arr[1] = 20
arr[2] = 30
arr[3] = 40
arr[4] = 50`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Pointer Difference</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Subtracting two pointers of the same type yields the number of elements between them, not the
        number of bytes. The result type is <code>std::ptrdiff_t</code>.
      </p>

      <CppCode title="Pointer subtraction">{`#include <iostream>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int* begin = &arr[0];
    int* end   = &arr[4];

    std::ptrdiff_t diff = end - begin;
    std::cout << "Elements between: " << diff << std::endl;
    std::cout << "Bytes between:    " << diff * sizeof(int) << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Elements between: 4
Bytes between:    16`}</OutputBlock>

      <NoteBlock type="important" title="Only Within the Same Array">
        <p>
          Pointer arithmetic is only defined for pointers that point into the same array (or one
          past the end). Subtracting pointers to unrelated objects is <strong>undefined behavior</strong>.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Iterating with Pointer Increment</h2>

      <CppCode title="Pointer-based loop">{`#include <iostream>

int main() {
    double values[] = {1.1, 2.2, 3.3, 4.4};
    int size = sizeof(values) / sizeof(values[0]);

    double* ptr = values;
    double* end = values + size;

    while (ptr != end) {
        std::cout << *ptr << " ";
        ++ptr;
    }
    std::cout << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`1.1 2.2 3.3 4.4`}</OutputBlock>

      <NoteBlock type="tip" title="One Past the End">
        <p>
          It is valid to form a pointer to one-past-the-last element of an array. You may compare
          against it but must not dereference it. This is exactly how STL iterators such
          as <code>std::end()</code> work.
        </p>
      </NoteBlock>

      <WarningBlock title="Out-of-Bounds Access">
        <p>
          Accessing memory outside the bounds of an array via pointer arithmetic is undefined
          behavior. The compiler will not warn you at runtime. Use <code>std::array</code> or
          <code>std::vector</code> with <code>.at()</code> for bounds checking.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Prefer Iterators or Range-Based For">
        <p>
          While pointer arithmetic is fundamental to understand, modern C++ favors range-based
          for loops and iterators. Use pointer arithmetic primarily when working with
          C APIs, custom allocators, or performance-critical inner loops.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Find Maximum with Pointers"
        difficulty="beginner"
        prompt="Write a function that takes a pointer to an int array and its size, then returns a pointer to the maximum element using pointer arithmetic (no subscript operator [])."
        hints={[
          "Initialize a 'max' pointer to the first element",
          "Advance through the array comparing *current > *max",
        ]}
        solution={
          <CppCode>{`#include <iostream>

int* findMax(int* arr, int size) {
    int* max = arr;
    for (int* p = arr + 1; p != arr + size; ++p) {
        if (*p > *max) {
            max = p;
        }
    }
    return max;
}

int main() {
    int data[] = {3, 7, 2, 9, 5};
    int* m = findMax(data, 5);
    std::cout << "Max value: " << *m << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Pointer arithmetic', url: 'https://en.cppreference.com/w/cpp/language/operator_arithmetic#Additive_operators', description: 'Additive operators on pointers' },
        { type: 'cppreference', title: 'std::ptrdiff_t', url: 'https://en.cppreference.com/w/cpp/types/ptrdiff_t', description: 'Signed integer type for pointer differences' },
        { type: 'textbook', title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', description: 'Section 7.4: Pointers and Arrays' },
      ]} />
    </div>
  )
}
