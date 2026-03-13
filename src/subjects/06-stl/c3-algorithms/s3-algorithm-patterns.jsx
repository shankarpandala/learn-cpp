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

export default function S3AlgorithmPatterns() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Several STL algorithms form well-known patterns that appear frequently in real C++ code.
        Understanding these patterns -- the erase-remove idiom, partitioning, merging, and set
        operations -- lets you write concise, correct code instead of error-prone manual loops.
      </p>

      <DefinitionBlock title="Erase-Remove Idiom">
        <p>
          A two-step pattern for removing elements from a container: <code>std::remove</code> (or
          <code>std::remove_if</code>) moves unwanted elements to the end of the range and returns
          an iterator to the new logical end. Then <code>container.erase()</code> removes them
          from the container. In C++20, <code>std::erase</code> and <code>std::erase_if</code> combine
          both steps.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Erase-Remove and std::unique</h2>

      <CppCode title="erase_remove.cpp">{`#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    // Erase-remove idiom: remove all even numbers
    std::vector<int> nums = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    nums.erase(
        std::remove_if(nums.begin(), nums.end(),
                       [](int x) { return x % 2 == 0; }),
        nums.end()
    );
    std::cout << "Odds: ";
    for (int n : nums) std::cout << n << " ";
    std::cout << std::endl;

    // std::unique: remove consecutive duplicates (must be sorted first)
    std::vector<int> data = {1, 3, 3, 5, 5, 5, 7, 7, 9};
    data.erase(std::unique(data.begin(), data.end()), data.end());
    std::cout << "Unique: ";
    for (int n : data) std::cout << n << " ";
    std::cout << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Odds: 1 3 5 7 9
Unique: 1 3 5 7 9`}</OutputBlock>

      <WarningBlock title="std::unique Only Removes Consecutive Duplicates">
        <p>
          <code>std::unique</code> removes adjacent duplicate elements. If you want to remove all
          duplicates regardless of position, sort the range first, then apply <code>std::unique</code>.
        </p>
      </WarningBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Partition, Merge, and Set Operations</h2>

      <CppCode title="partition_merge.cpp">{`#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>

int main() {
    // std::partition: separate elements by predicate
    std::vector<int> vals = {8, 3, 5, 1, 9, 2, 7, 4, 6};
    auto pivot = std::partition(vals.begin(), vals.end(),
                                [](int x) { return x <= 5; });
    std::cout << "Partition (<= 5 | > 5): ";
    for (int v : vals) std::cout << v << " ";
    std::cout << std::endl;

    // std::merge: merge two sorted ranges
    std::vector<int> a = {1, 3, 5, 7};
    std::vector<int> b = {2, 4, 6, 8};
    std::vector<int> merged;
    std::merge(a.begin(), a.end(), b.begin(), b.end(),
               std::back_inserter(merged));
    std::cout << "Merged: ";
    for (int m : merged) std::cout << m << " ";
    std::cout << std::endl;

    // std::set_intersection: elements common to both sorted ranges
    std::vector<int> s1 = {1, 2, 3, 4, 5};
    std::vector<int> s2 = {3, 4, 5, 6, 7};
    std::vector<int> common;
    std::set_intersection(s1.begin(), s1.end(), s2.begin(), s2.end(),
                          std::back_inserter(common));
    std::cout << "Intersection: ";
    for (int c : common) std::cout << c << " ";
    std::cout << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Partition (<= 5 | > 5): 4 3 5 1 2 9 7 8 6
Merged: 1 2 3 4 5 6 7 8
Intersection: 3 4 5`}</OutputBlock>

      <SyntaxBlock title="Set Operations on Sorted Ranges">
        <p>
          <code>std::set_intersection</code>, <code>std::set_union</code>, <code>std::set_difference</code>,
          and <code>std::set_symmetric_difference</code> all operate on sorted ranges and produce
          sorted output. They work on any sorted sequence, not just <code>std::set</code>.
        </p>
      </SyntaxBlock>

      <NoteBlock type="tip" title="C++20 std::erase and std::erase_if">
        <p>
          C++20 introduced free-function versions <code>std::erase(container, value)</code> and
          <code> std::erase_if(container, pred)</code> that simplify the erase-remove idiom to a
          single call. Use them when targeting C++20 or later.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Use the erase-remove idiom correctly">
        <p>
          Always call <code>erase()</code> after <code>std::remove</code> or <code>std::remove_if</code>.
          Calling <code>std::remove</code> alone leaves the container with the same size -- it only
          moves elements. The actual removal requires the container's <code>erase()</code> method.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Partition and Count"
        difficulty="intermediate"
        prompt="Given a vector of integers, use std::partition to separate positive and negative numbers. Then print both groups and their counts."
        hints={[
          "std::partition returns an iterator to the partition point",
          "Use std::distance to count elements in each partition",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> nums = {-3, 7, -1, 4, -5, 2, 8, -6};
    auto mid = std::partition(nums.begin(), nums.end(),
                              [](int x) { return x >= 0; });
    std::cout << "Positive (" << std::distance(nums.begin(), mid) << "): ";
    for (auto it = nums.begin(); it != mid; ++it)
        std::cout << *it << " ";
    std::cout << std::endl;
    std::cout << "Negative (" << std::distance(mid, nums.end()) << "): ";
    for (auto it = mid; it != nums.end(); ++it)
        std::cout << *it << " ";
    std::cout << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::remove', url: 'https://en.cppreference.com/w/cpp/algorithm/remove', description: 'Remove elements from a range' },
        { type: 'cppreference', title: 'std::partition', url: 'https://en.cppreference.com/w/cpp/algorithm/partition', description: 'Partition a range by predicate' },
        { type: 'cppreference', title: 'std::set_intersection', url: 'https://en.cppreference.com/w/cpp/algorithm/set_intersection', description: 'Set intersection of sorted ranges' },
      ]} />
    </div>
  )
}
