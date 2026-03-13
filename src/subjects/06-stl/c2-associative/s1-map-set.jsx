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

export default function S1MapSet() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>std::map</code> and <code>std::set</code> are ordered associative containers backed by
        balanced binary search trees (typically red-black trees). They keep their elements sorted by
        key, support logarithmic-time lookup, insertion, and deletion, and provide bidirectional
        iterators that traverse elements in sorted order.
      </p>

      <DefinitionBlock title="Ordered Associative Containers">
        <p>
          Containers that store elements in a sorted order determined by a comparison function
          (default: <code>std::less&lt;Key&gt;</code>). <code>std::map</code> stores key-value pairs
          with unique keys. <code>std::set</code> stores unique keys only. Both are defined in
          <code> &lt;map&gt;</code> and <code>&lt;set&gt;</code> respectively.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::map</h2>

      <CppCode title="map_basics.cpp">{`#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> ages;

    // Insert elements
    ages["Alice"] = 30;
    ages["Bob"] = 25;
    ages.insert({"Charlie", 35});
    ages.emplace("Diana", 28);

    // Lookup
    auto it = ages.find("Bob");
    if (it != ages.end()) {
        std::cout << "Bob is " << it->second << std::endl;
    }

    // lower_bound: first element >= key
    auto lb = ages.lower_bound("C");
    std::cout << "First name >= C: " << lb->first << std::endl;

    // C++17 structured bindings
    for (const auto& [name, age] : ages) {
        std::cout << name << ": " << age << std::endl;
    }
    return 0;
}`}</CppCode>

      <OutputBlock>{`Bob is 25
First name >= C: Charlie
Alice: 30
Bob: 25
Charlie: 35
Diana: 28`}</OutputBlock>

      <SyntaxBlock title="lower_bound and upper_bound">
        <p>
          <code>lower_bound(key)</code> returns an iterator to the first element with a key not less
          than the given key. <code>upper_bound(key)</code> returns an iterator to the first element
          with a key greater than the given key. Together they define the range of elements equal to
          the key.
        </p>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::set</h2>

      <CppCode title="set_basics.cpp">{`#include <iostream>
#include <set>

int main() {
    std::set<int> unique_nums = {5, 3, 8, 1, 3, 5, 7};

    std::cout << "Size: " << unique_nums.size() << std::endl;

    // Duplicates are ignored
    auto [it, inserted] = unique_nums.insert(3);
    std::cout << "Insert 3 again: " << (inserted ? "yes" : "no") << std::endl;

    // Check membership
    if (unique_nums.count(7)) {
        std::cout << "7 is in the set" << std::endl;
    }

    // Elements are always sorted
    for (int n : unique_nums) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Size: 5
Insert 3 again: no
7 is in the set
1 3 5 7 8`}</OutputBlock>

      <NoteBlock type="info" title="Red-Black Tree Guarantees">
        <p>
          The underlying red-black tree ensures that insertion, deletion, and lookup all take
          O(log n) time in the worst case. Iteration visits elements in sorted order. These guarantees
          make ordered containers ideal when you need sorted traversal or range queries.
        </p>
      </NoteBlock>

      <WarningBlock title="operator[] on std::map Inserts on Miss">
        <p>
          Using <code>map[key]</code> on a key that does not exist will insert a default-constructed
          value for that key. If you only want to check or read, use <code>find()</code> or
          <code> count()</code> instead.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Use structured bindings for map iteration">
        <p>
          In C++17 and later, use <code>const auto& [key, value]</code> in range-based for loops
          over maps. This is cleaner than accessing <code>it-&gt;first</code> and <code>it-&gt;second</code>.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Word Frequency Counter"
        difficulty="intermediate"
        prompt="Read a list of words from a vector and use std::map to count how many times each word appears. Print the words and their counts in alphabetical order."
        hints={[
          "Use map[word]++ to increment the count",
          "Iteration over a map visits keys in sorted order automatically",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <map>
#include <vector>
#include <string>

int main() {
    std::vector<std::string> words = {
        "apple", "banana", "apple", "cherry", "banana", "apple"
    };
    std::map<std::string, int> freq;
    for (const auto& w : words) {
        freq[w]++;
    }
    for (const auto& [word, count] : freq) {
        std::cout << word << ": " << count << std::endl;
    }
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::map', url: 'https://en.cppreference.com/w/cpp/container/map', description: 'Ordered key-value container' },
        { type: 'cppreference', title: 'std::set', url: 'https://en.cppreference.com/w/cpp/container/set', description: 'Ordered unique-key container' },
        { type: 'textbook', title: 'The C++ Standard Library', author: 'Nicolai Josuttis', description: 'Chapter 7.8: Maps and Multimaps' },
      ]} />
    </div>
  )
}
