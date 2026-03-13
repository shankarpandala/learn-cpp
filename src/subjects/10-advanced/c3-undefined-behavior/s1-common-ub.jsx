import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import WarningBlock from '../../../components/content/WarningBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S1CommonUb() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Undefined behavior (UB) is one of the most important concepts in C++. When a program triggers
        UB, the C++ standard places no requirements on its behavior: it may crash, produce wrong
        results, appear to work correctly, or do anything else. Understanding common sources of UB
        is essential for writing reliable C++ code.
      </p>

      <DefinitionBlock title="Undefined Behavior (UB)">
        <p>
          Undefined behavior occurs when the C++ standard imposes no requirements on the program's
          behavior. The compiler is free to assume UB never happens, which enables aggressive
          optimizations but means UB can cause entirely unpredictable results, including appearing
          to work until it does not.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Buffer Overflow</h2>

      <WarningBlock title="Out-of-Bounds Access">
        <p>Accessing memory outside the bounds of an array or container is undefined behavior.</p>
      </WarningBlock>

      <CppCode title="Buffer overflow examples">{`int arr[5] = {1, 2, 3, 4, 5};
int x = arr[10];        // UB: out of bounds read
arr[-1] = 42;           // UB: out of bounds write

// Safe alternative: use std::array with .at()
#include <array>
std::array<int, 5> safe = {1, 2, 3, 4, 5};
try {
    int y = safe.at(10);  // Throws std::out_of_range
} catch (const std::out_of_range& e) {
    // Handle error
}`}</CppCode>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Dangling References and Use-After-Free</h2>

      <CppCode title="Dangling reference and use-after-free">{`#include <string>
#include <memory>

// Dangling reference
const std::string& getDangling() {
    std::string local = "hello";
    return local;  // UB: returning reference to local variable
}

// Use-after-free
int* useAfterFree() {
    int* p = new int(42);
    delete p;
    *p = 10;  // UB: writing to freed memory
    return p;
}

// Safe alternatives
std::string getSafe() {
    return std::string("hello");  // Return by value
}

auto safeMem() {
    auto p = std::make_unique<int>(42);
    return p;  // Ownership transferred safely
}`}</CppCode>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Signed Integer Overflow</h2>

      <CppCode title="Signed overflow is UB">{`#include <climits>
#include <cstdint>

int a = INT_MAX;
int b = a + 1;       // UB: signed integer overflow

// Unsigned overflow is well-defined (wraps around)
unsigned int c = UINT_MAX;
unsigned int d = c + 1;  // Defined: d == 0

// Safe alternative: check before operating
bool safeAdd(int x, int y, int& result) {
    if (y > 0 && x > INT_MAX - y) return false;
    if (y < 0 && x < INT_MIN - y) return false;
    result = x + y;
    return true;
}`}</CppCode>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Null Pointer Dereference</h2>

      <CppCode title="Null dereference">{`int* ptr = nullptr;
int val = *ptr;        // UB: dereferencing null pointer

// Safe alternative
if (ptr != nullptr) {
    int val = *ptr;    // Safe
}`}</CppCode>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Uninitialized Reads</h2>

      <CppCode title="Reading uninitialized variables">{`int x;              // Uninitialized
int y = x;          // UB: reading uninitialized value

bool flag;          // Uninitialized
if (flag) { ... }   // UB: reading uninitialized bool

// Safe: always initialize
int x = 0;
bool flag = false;`}</CppCode>

      <NoteBlock type="important" title="Data Races">
        <p>
          Accessing a shared variable from multiple threads where at least one thread writes, without
          synchronization, is undefined behavior. Use <code>std::mutex</code>, <code>std::atomic</code>,
          or other synchronization primitives to protect shared data.
        </p>
      </NoteBlock>

      <NoteBlock type="info" title="Why Compilers Exploit UB">
        <p>
          Compilers assume UB never occurs, which allows powerful optimizations. For example, assuming
          signed overflow never happens lets the compiler optimize <code>x + 1 &gt; x</code> to
          <code> true</code>. This is why UB can cause surprising behavior: the compiler optimizes
          based on assumptions your buggy code violates.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Defense against undefined behavior">
        <p>
          Always initialize variables. Use bounds-checked containers (<code>.at()</code>). Prefer smart
          pointers over raw pointers. Enable compiler warnings (<code>-Wall -Wextra</code>). Use
          sanitizers during testing. Treat every compiler warning as a potential UB source.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Identify the UB"
        difficulty="intermediate"
        prompt="The following code has three instances of undefined behavior. Identify each one and rewrite the code to be safe."
        hints={[
          "Look at array access, pointer usage, and arithmetic",
          "Check for uninitialized variables",
          "Consider what happens when the loop counter goes out of bounds",
        ]}
        solution={
          <CppCode>{`// Original (buggy):
// int arr[3] = {1, 2, 3};
// int sum;
// for (int i = 0; i <= 3; ++i) sum += arr[i];
// int* p = nullptr; *p = sum;

// Fixed:
#include <array>
#include <iostream>

int main() {
    std::array<int, 3> arr = {1, 2, 3};
    int sum = 0;  // Fix 1: initialize sum
    for (int i = 0; i < 3; ++i) {  // Fix 2: i < 3, not i <= 3
        sum += arr.at(i);
    }
    int result = sum;  // Fix 3: no null pointer dereference
    std::cout << "Sum: " << result << "\\n";
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Undefined behavior', url: 'https://en.cppreference.com/w/cpp/language/ub', description: 'Complete list of undefined behavior in C++' },
        { type: 'article', title: 'What Every C Programmer Should Know About UB', url: 'https://blog.llvm.org/2011/05/what-every-c-programmer-should-know.html', author: 'Chris Lattner', description: 'Classic article on UB and compiler assumptions' },
        { type: 'textbook', title: 'Effective Modern C++', author: 'Scott Meyers', description: 'Guidelines for avoiding common pitfalls' },
      ]} />
    </div>
  )
}
