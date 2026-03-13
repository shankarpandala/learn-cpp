import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import CompilerNoteBlock from '../../../components/content/CompilerNoteBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S1Sorting() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The <code>&lt;algorithm&gt;</code> header provides a rich set of sorting and searching
        algorithms that work with any container through iterators. Understanding these algorithms
        and when to use each variant is essential for writing efficient, expressive C++ code.
      </p>

      <DefinitionBlock title="STL Sorting Algorithms">
        <p>
          The standard library offers multiple sorting functions: <code>std::sort</code> for general
          sorting, <code>std::stable_sort</code> for preserving equal-element order,
          <code> std::partial_sort</code> for sorting only the first N elements, and
          <code> std::nth_element</code> for partitioning around the Nth element. All are defined
          in <code>&lt;algorithm&gt;</code>.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Sorting Variants</h2>

      <CppCode title="sorting_variants.cpp">{`#include <iostream>
#include <vector>
#include <algorithm>

void print(const std::string& label, const std::vector<int>& v) {
    std::cout << label << ": ";
    for (int x : v) std::cout << x << " ";
    std::cout << std::endl;
}

int main() {
    std::vector<int> data = {9, 3, 7, 1, 5, 8, 2, 6, 4};

    // Full sort (ascending)
    auto v1 = data;
    std::sort(v1.begin(), v1.end());
    print("sort", v1);

    // Sort descending with custom comparator
    auto v2 = data;
    std::sort(v2.begin(), v2.end(), std::greater<int>());
    print("desc", v2);

    // Partial sort: only first 3 elements are sorted
    auto v3 = data;
    std::partial_sort(v3.begin(), v3.begin() + 3, v3.end());
    print("partial(3)", v3);

    // nth_element: element at position 4 is correct, rest partitioned
    auto v4 = data;
    std::nth_element(v4.begin(), v4.begin() + 4, v4.end());
    std::cout << "5th smallest: " << v4[4] << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`sort: 1 2 3 4 5 6 7 8 9
desc: 9 8 7 6 5 4 3 2 1
partial(3): 1 2 3 9 7 8 5 6 4
5th smallest: 5`}</OutputBlock>

      <SyntaxBlock title="Custom Comparators">
        <p>
          All sorting algorithms accept an optional comparator. It can be a function pointer, a
          function object, or a lambda. The comparator must define a strict weak ordering: it must
          return <code>true</code> if the first argument should come before the second.
        </p>
        <CppCode>{`// Lambda comparator: sort by absolute value
std::sort(v.begin(), v.end(), [](int a, int b) {
    return std::abs(a) < std::abs(b);
});`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Searching in Sorted Data</h2>

      <CppCode title="search_algorithms.cpp">{`#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> sorted = {1, 3, 5, 7, 9, 11, 13, 15};

    // Binary search: returns bool
    bool found = std::binary_search(sorted.begin(), sorted.end(), 7);
    std::cout << "Found 7: " << std::boolalpha << found << std::endl;

    // lower_bound: iterator to first element >= value
    auto lb = std::lower_bound(sorted.begin(), sorted.end(), 6);
    std::cout << "lower_bound(6): " << *lb << std::endl;

    // find: linear search (works on unsorted data too)
    auto it = std::find(sorted.begin(), sorted.end(), 9);
    if (it != sorted.end()) {
        std::cout << "Found 9 at index " << std::distance(sorted.begin(), it) << std::endl;
    }
    return 0;
}`}</CppCode>

      <OutputBlock>{`Found 7: true
lower_bound(6): 7
Found 9 at index 4`}</OutputBlock>

      <NoteBlock type="important" title="Binary Search Requires Sorted Data">
        <p>
          <code>std::binary_search</code>, <code>std::lower_bound</code>, and <code>std::upper_bound</code> require
          the input range to be sorted according to the same comparator. Using them on unsorted
          data produces undefined behavior.
        </p>
      </NoteBlock>

      <CompilerNoteBlock compiler="all" title="std::sort Complexity">
        <p>
          <code>std::sort</code> is guaranteed to be O(n log n) on average. Most implementations use
          introsort (a hybrid of quicksort, heapsort, and insertion sort). <code>std::stable_sort</code> uses
          merge sort and requires O(n) extra memory.
        </p>
      </CompilerNoteBlock>

      <BestPracticeBlock title="Choose the right sorting algorithm">
        <p>
          Use <code>std::sort</code> for general sorting. Use <code>std::partial_sort</code> when
          you only need the top N elements. Use <code>std::nth_element</code> to find a median or
          partition around a rank. These partial algorithms are faster than a full sort when you
          only need partial ordering.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Top 3 Scores"
        difficulty="intermediate"
        prompt="Given a vector of exam scores, use std::partial_sort to find and print only the top 3 scores in descending order without sorting the entire array."
        hints={[
          "Use std::greater<int>() as the comparator for descending order",
          "partial_sort(begin, begin+3, end, comp) sorts only the first 3",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>

int main() {
    std::vector<int> scores = {72, 95, 88, 61, 99, 84, 77, 93};
    std::partial_sort(scores.begin(), scores.begin() + 3,
                      scores.end(), std::greater<int>());
    std::cout << "Top 3 scores: ";
    for (int i = 0; i < 3; ++i) {
        std::cout << scores[i] << " ";
    }
    std::cout << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::sort', url: 'https://en.cppreference.com/w/cpp/algorithm/sort', description: 'General-purpose sort algorithm' },
        { type: 'cppreference', title: 'std::binary_search', url: 'https://en.cppreference.com/w/cpp/algorithm/binary_search', description: 'Binary search on sorted ranges' },
        { type: 'textbook', title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', description: 'Chapter 32: STL Algorithms' },
      ]} />
    </div>
  )
}
