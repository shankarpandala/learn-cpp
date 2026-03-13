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

export default function S1Vector() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>std::vector</code> is the most commonly used container in C++. It provides a dynamic array
        that manages its own memory, grows automatically when elements are added, and provides fast
        random access to elements. If you need a collection of elements and are unsure which container
        to use, <code>std::vector</code> is almost always the right default choice.
      </p>

      <DefinitionBlock title="std::vector">
        <p>
          A sequence container that encapsulates a dynamic-size array. Elements are stored contiguously
          in memory, which means pointer arithmetic and cache-friendly traversal work just as they do
          with raw arrays. Defined in the <code>&lt;vector&gt;</code> header.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Creating and Using Vectors</h2>

      <CppCode title="vector_basics.cpp">{`#include <iostream>
#include <vector>

int main() {
    std::vector<int> nums = {10, 20, 30, 40, 50};

    // Element access
    std::cout << "First: " << nums[0] << std::endl;
    std::cout << "At(2): " << nums.at(2) << std::endl;
    std::cout << "Front: " << nums.front() << std::endl;
    std::cout << "Back:  " << nums.back() << std::endl;

    // Size information
    std::cout << "Size:     " << nums.size() << std::endl;
    std::cout << "Capacity: " << nums.capacity() << std::endl;

    // Iteration
    for (const auto& n : nums) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`First: 10
At(2): 30
Front: 10
Back:  50
Size:     5
Capacity: 5
10 20 30 40 50`}</OutputBlock>

      <SyntaxBlock title="Element Access">
        <p>
          <code>operator[]</code> provides unchecked access (undefined behavior on out-of-bounds).
          <code>at()</code> performs bounds checking and throws <code>std::out_of_range</code> if the
          index is invalid. Use <code>at()</code> when safety matters more than speed.
        </p>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Adding Elements: push_back vs emplace_back</h2>

      <CppCode title="push_vs_emplace.cpp">{`#include <iostream>
#include <vector>
#include <string>

struct Point {
    double x, y;
    Point(double x, double y) : x(x), y(y) {
        std::cout << "Constructed (" << x << ", " << y << ")" << std::endl;
    }
};

int main() {
    std::vector<Point> points;
    points.reserve(4);

    // push_back: constructs then copies/moves into vector
    points.push_back(Point(1.0, 2.0));

    // emplace_back: constructs in-place inside the vector
    points.emplace_back(3.0, 4.0);

    std::cout << "Size: " << points.size() << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Constructed (1, 2)
Constructed (3, 4)
Size: 2`}</OutputBlock>

      <NoteBlock type="tip" title="Size vs Capacity">
        <p>
          <code>size()</code> returns the number of elements currently stored. <code>capacity()</code> returns
          the total number of elements the vector can hold before it needs to reallocate. When size exceeds
          capacity, the vector allocates a new, larger buffer (typically 1.5x or 2x) and moves all elements.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Use reserve() when you know the count">
        <p>
          If you know how many elements you will insert, call <code>reserve(n)</code> before adding them.
          This avoids repeated reallocations and copies, and can dramatically improve performance for
          large collections.
        </p>
      </BestPracticeBlock>

      <WarningBlock title="Iterator Invalidation">
        <p>
          Any operation that changes a vector's size (such as <code>push_back</code>, <code>insert</code>,
          or <code>erase</code>) may invalidate all iterators, pointers, and references to its elements
          if a reallocation occurs. Never hold iterators across insertion or removal operations unless
          you are certain the capacity is sufficient.
        </p>
      </WarningBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Iterators and Erasure</h2>

      <CppCode title="vector_iterators.cpp">{`#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> v = {5, 3, 8, 1, 9, 2, 7};

    // Sort using iterators
    std::sort(v.begin(), v.end());

    // Erase elements greater than 7
    v.erase(
        std::remove_if(v.begin(), v.end(), [](int x) { return x > 7; }),
        v.end()
    );

    for (auto it = v.begin(); it != v.end(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`1 2 3 5 7`}</OutputBlock>

      <ExerciseBlock
        title="Vector Statistics"
        difficulty="beginner"
        prompt="Create a vector of doubles, populate it with at least 5 values, then compute and print the minimum, maximum, and average of the elements."
        hints={[
          "Use std::min_element and std::max_element from <algorithm>",
          "Use std::accumulate from <numeric> to compute the sum",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
    std::vector<double> vals = {3.5, 1.2, 7.8, 4.6, 9.1};
    double minVal = *std::min_element(vals.begin(), vals.end());
    double maxVal = *std::max_element(vals.begin(), vals.end());
    double avg = std::accumulate(vals.begin(), vals.end(), 0.0) / vals.size();
    std::cout << "Min: " << minVal << "  Max: " << maxVal
              << "  Avg: " << avg << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::vector', url: 'https://en.cppreference.com/w/cpp/container/vector', description: 'Complete vector class reference' },
        { type: 'cppreference', title: 'std::vector::emplace_back', url: 'https://en.cppreference.com/w/cpp/container/vector/emplace_back', description: 'In-place element construction' },
        { type: 'textbook', title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', description: 'Chapter 31: STL Containers' },
      ]} />
    </div>
  )
}
