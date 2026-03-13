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

export default function S2Array() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>std::array</code> is a fixed-size container that wraps a C-style array while providing
        the benefits of the standard library interface: bounds-checked access, iterators, and
        compatibility with STL algorithms. Its size is a compile-time constant, so it carries no
        heap allocation overhead.
      </p>

      <DefinitionBlock title="std::array">
        <p>
          A container that encapsulates a fixed-size array whose size is known at compile time.
          Unlike <code>std::vector</code>, it cannot grow or shrink. It is defined in the
          <code> &lt;array&gt;</code> header as <code>std::array&lt;T, N&gt;</code>, where
          <code> T</code> is the element type and <code>N</code> is the number of elements.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic Usage</h2>

      <CppCode title="array_basics.cpp">{`#include <iostream>
#include <array>
#include <algorithm>

int main() {
    std::array<int, 5> nums = {10, 40, 20, 50, 30};

    std::cout << "Size: " << nums.size() << std::endl;
    std::cout << "First: " << nums.front() << std::endl;
    std::cout << "Last:  " << nums.back() << std::endl;

    // Bounds-checked access
    std::cout << "At(2): " << nums.at(2) << std::endl;

    // Works with STL algorithms
    std::sort(nums.begin(), nums.end());

    for (const auto& n : nums) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Size: 5
First: 10
Last:  30
At(2): 20
10 20 30 40 50`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::get and Structured Bindings</h2>

      <CppCode title="array_structured.cpp">{`#include <iostream>
#include <array>

int main() {
    std::array<double, 3> rgb = {0.8, 0.2, 0.5};

    // Compile-time access with std::get
    std::cout << "Red:   " << std::get<0>(rgb) << std::endl;
    std::cout << "Green: " << std::get<1>(rgb) << std::endl;
    std::cout << "Blue:  " << std::get<2>(rgb) << std::endl;

    // C++17 structured bindings
    auto [r, g, b] = rgb;
    std::cout << "RGB = (" << r << ", " << g << ", " << b << ")" << std::endl;

    // Fill all elements
    rgb.fill(0.0);
    std::cout << "After fill: " << rgb[0] << ", " << rgb[1] << ", " << rgb[2] << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Red:   0.8
Green: 0.2
Blue:  0.5
RGB = (0.8, 0.2, 0.5)
After fill: 0, 0, 0`}</OutputBlock>

      <SyntaxBlock title="std::get<N>">
        <p>
          <code>std::get&lt;N&gt;(arr)</code> accesses the element at index <code>N</code> at compile
          time. The index must be a constant expression. This is the same function template used for
          <code>std::tuple</code> and <code>std::pair</code>.
        </p>
      </SyntaxBlock>

      <NoteBlock type="info" title="std::array vs C-style Arrays">
        <p>
          Unlike C-style arrays, <code>std::array</code> does not decay to a pointer when passed to
          a function. It knows its own size, supports copy/move semantics, and works with range-based
          for loops and all STL algorithms. There is zero runtime overhead compared to a raw array.
        </p>
      </NoteBlock>

      <WarningBlock title="No Implicit Size Deduction Before C++17">
        <p>
          Before C++17, you must specify both template parameters: <code>std::array&lt;int, 3&gt;</code>.
          In C++17 and later, class template argument deduction (CTAD) allows writing
          <code> std::array nums = {'{'}1, 2, 3{'}'}</code> and the compiler will deduce the type and size.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Prefer std::array over C-style arrays">
        <p>
          Always prefer <code>std::array</code> to C-style arrays for fixed-size collections. It
          provides the same performance with added safety, a clear interface, and interoperability
          with the rest of the standard library.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Matrix Row Sum"
        difficulty="beginner"
        prompt="Declare a std::array of 4 integers representing a matrix row. Compute and print the sum of its elements using std::accumulate."
        hints={[
          "Include <numeric> for std::accumulate",
          "std::accumulate takes begin, end, and an initial value",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <array>
#include <numeric>

int main() {
    std::array<int, 4> row = {3, 7, 2, 8};
    int sum = std::accumulate(row.begin(), row.end(), 0);
    std::cout << "Sum: " << sum << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::array', url: 'https://en.cppreference.com/w/cpp/container/array', description: 'Fixed-size array container reference' },
        { type: 'cppreference', title: 'std::get (std::array)', url: 'https://en.cppreference.com/w/cpp/container/array/get', description: 'Compile-time element access' },
        { type: 'textbook', title: 'Effective Modern C++', author: 'Scott Meyers', description: 'Item 1: Understand template type deduction' },
      ]} />
    </div>
  )
}
