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

export default function S3PointersArrays() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Arrays and pointers are deeply connected in C++. When passed to a function, an array
        "decays" into a pointer to its first element, losing its size information. Understanding
        this relationship is key to working with C-style arrays and C APIs.
      </p>

      <DefinitionBlock title="Array Decay">
        <p>
          <strong>Array decay</strong> (or array-to-pointer conversion) is the implicit conversion
          of an array name to a pointer to its first element. This happens when an array is passed
          to a function, assigned to a pointer, or used in most expressions.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Array Decay to Pointer</h2>

      <CppCode title="Demonstrating array decay">{`#include <iostream>

void printFirst(int* arr) {
    std::cout << "First element: " << arr[0] << std::endl;
}

int main() {
    int numbers[] = {10, 20, 30, 40};

    int* ptr = numbers;  // decay: array -> pointer
    std::cout << "Via pointer: " << *ptr << std::endl;

    printFirst(numbers);  // array decays when passed

    // Size is lost after decay
    std::cout << "sizeof array:   " << sizeof(numbers) << std::endl;
    std::cout << "sizeof pointer: " << sizeof(ptr) << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Via pointer: 10
First element: 10
sizeof array:   16
sizeof pointer: 8`}</OutputBlock>

      <NoteBlock type="important" title="sizeof Reveals the Difference">
        <p>
          <code>sizeof(array)</code> returns the total size in bytes of the array.
          <code>sizeof(pointer)</code> returns the size of the pointer itself (typically 8 bytes
          on a 64-bit system). After decay, the size information is permanently lost.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Pointer to Array</h2>

      <SyntaxBlock title="Pointer-to-Array Syntax">
        <p>
          A <strong>pointer to an array</strong> preserves the array's size in its type. The
          parentheses are critical: <code>int (*p)[N]</code> is a pointer to an array
          of <code>N</code> ints, while <code>int* p[N]</code> is an array
          of <code>N</code> pointers.
        </p>
        <CppCode>{`int (*ptr)[5];    // pointer to an array of 5 ints
int*  arr[5];    // array of 5 int pointers`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Using pointer-to-array">{`#include <iostream>

void printArray(int (*arr)[4]) {
    for (int i = 0; i < 4; ++i) {
        std::cout << (*arr)[i] << " ";
    }
    std::cout << std::endl;
}

int main() {
    int data[4] = {1, 2, 3, 4};
    printArray(&data);  // pass address of the whole array
    return 0;
}`}</CppCode>

      <OutputBlock>{`1 2 3 4`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Multidimensional Arrays</h2>

      <CppCode title="2D array with pointers">{`#include <iostream>

int main() {
    int matrix[2][3] = {{1, 2, 3}, {4, 5, 6}};

    // matrix decays to int (*)[3] — pointer to array of 3 ints
    for (int i = 0; i < 2; ++i) {
        for (int j = 0; j < 3; ++j) {
            std::cout << *(*(matrix + i) + j) << " ";
        }
        std::cout << std::endl;
    }
    return 0;
}`}</CppCode>

      <OutputBlock>{`1 2 3
4 5 6`}</OutputBlock>

      <WarningBlock title="C-Style Arrays Lose Size Information">
        <p>
          When passing C-style arrays to functions, you must always pass the size separately.
          This is a major source of buffer overflow vulnerabilities. Prefer <code>std::array</code> or
          <code>std::span</code> (C++20) which carry their size.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Prefer std::array and std::vector">
        <p>
          Use <code>std::array&lt;T, N&gt;</code> for fixed-size arrays and <code>std::vector&lt;T&gt;</code> for
          dynamic arrays. They do not decay, carry their size, and work seamlessly with the
          standard library algorithms.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Reverse Array In-Place"
        difficulty="intermediate"
        prompt="Write a function that takes a pointer to an array and its size, then reverses the array in-place using only pointer arithmetic (no subscript operator)."
        hints={[
          "Use two pointers: one at the start and one at the end",
          "Swap elements and move pointers toward each other",
        ]}
        solution={
          <CppCode>{`#include <iostream>

void reverse(int* arr, int size) {
    int* left = arr;
    int* right = arr + size - 1;
    while (left < right) {
        int temp = *left;
        *left = *right;
        *right = temp;
        ++left;
        --right;
    }
}

int main() {
    int data[] = {1, 2, 3, 4, 5};
    reverse(data, 5);
    for (int i = 0; i < 5; ++i) {
        std::cout << data[i] << " ";
    }
    std::cout << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Array-to-pointer decay', url: 'https://en.cppreference.com/w/cpp/language/array#Array-to-pointer_decay', description: 'Implicit conversion from array to pointer' },
        { type: 'cppreference', title: 'std::array', url: 'https://en.cppreference.com/w/cpp/container/array', description: 'Fixed-size array container' },
        { type: 'textbook', title: 'Effective Modern C++', author: 'Scott Meyers', description: 'Item 1: Understand template type deduction (array arguments)' },
      ]} />
    </div>
  )
}
