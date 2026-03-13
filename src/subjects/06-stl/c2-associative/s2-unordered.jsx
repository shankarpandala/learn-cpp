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

export default function S2Unordered() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>std::unordered_map</code> and <code>std::unordered_set</code> use hash tables to provide
        average-case O(1) lookup, insertion, and deletion. They do not maintain any particular order
        among their elements. When you need fast access by key and do not require sorted traversal,
        unordered containers are typically the better choice.
      </p>

      <DefinitionBlock title="Hash Table Containers">
        <p>
          Unordered associative containers store elements in buckets determined by a hash function.
          <code> std::unordered_map</code> stores unique key-value pairs, while <code>std::unordered_set</code> stores
          unique keys only. Both are defined in <code>&lt;unordered_map&gt;</code> and
          <code> &lt;unordered_set&gt;</code> respectively.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic Usage</h2>

      <CppCode title="unordered_basics.cpp">{`#include <iostream>
#include <unordered_map>
#include <unordered_set>
#include <string>

int main() {
    // Unordered map
    std::unordered_map<std::string, double> prices;
    prices["apple"] = 1.50;
    prices["banana"] = 0.75;
    prices["cherry"] = 3.00;
    prices.emplace("date", 5.50);

    if (auto it = prices.find("banana"); it != prices.end()) {
        std::cout << "Banana: $" << it->second << std::endl;
    }

    // Unordered set
    std::unordered_set<int> ids = {101, 205, 301, 101, 205};
    std::cout << "Unique IDs: " << ids.size() << std::endl;

    for (int id : ids) {
        std::cout << id << " ";
    }
    std::cout << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Banana: $0.75
Unique IDs: 3
301 205 101`}</OutputBlock>

      <NoteBlock type="info" title="Order is Not Guaranteed">
        <p>
          The iteration order of unordered containers depends on the hash function and the internal
          bucket layout. It may change when elements are inserted or the container rehashes. Never
          rely on a specific traversal order.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Bucket Interface and Custom Hash</h2>

      <CppCode title="custom_hash.cpp">{`#include <iostream>
#include <unordered_map>
#include <string>

struct Point {
    int x, y;
    bool operator==(const Point& o) const {
        return x == o.x && y == o.y;
    }
};

struct PointHash {
    std::size_t operator()(const Point& p) const {
        auto h1 = std::hash<int>{}(p.x);
        auto h2 = std::hash<int>{}(p.y);
        return h1 ^ (h2 << 1);
    }
};

int main() {
    std::unordered_map<Point, std::string, PointHash> labels;
    labels[{0, 0}] = "origin";
    labels[{1, 2}] = "point A";

    std::cout << "At (0,0): " << labels[{0, 0}] << std::endl;

    // Bucket info
    std::cout << "Bucket count: " << labels.bucket_count() << std::endl;
    std::cout << "Load factor:  " << labels.load_factor() << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`At (0,0): origin
Bucket count: 5
Load factor:  0.4`}</OutputBlock>

      <SyntaxBlock title="Custom Hash Function">
        <p>
          To use a user-defined type as a key, you must provide a hash function (callable that returns
          <code>std::size_t</code>) and an equality operator (<code>operator==</code>). The hash
          function can be passed as a template parameter or as a specialization of <code>std::hash</code>.
        </p>
      </SyntaxBlock>

      <WarningBlock title="Hash Collision Performance">
        <p>
          In the worst case (all elements hash to the same bucket), lookup degrades to O(n). A good
          hash function distributes keys uniformly across buckets. Avoid trivial hash functions like
          returning a constant.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Use unordered containers for pure lookup">
        <p>
          When you only need to check membership or retrieve values by key and do not need sorted
          iteration, prefer <code>std::unordered_map</code> and <code>std::unordered_set</code>.
          They are typically 2-5x faster than their ordered counterparts for large datasets.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Anagram Detector"
        difficulty="intermediate"
        prompt="Write a function that takes two strings and returns true if they are anagrams (same characters, different order). Use std::unordered_map to count character frequencies."
        hints={[
          "Build a frequency map for the first string, then decrement for the second",
          "If all counts are zero at the end, the strings are anagrams",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <unordered_map>
#include <string>

bool isAnagram(const std::string& a, const std::string& b) {
    if (a.size() != b.size()) return false;
    std::unordered_map<char, int> freq;
    for (char c : a) freq[c]++;
    for (char c : b) freq[c]--;
    for (const auto& [ch, count] : freq) {
        if (count != 0) return false;
    }
    return true;
}

int main() {
    std::cout << std::boolalpha;
    std::cout << isAnagram("listen", "silent") << std::endl;
    std::cout << isAnagram("hello", "world") << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::unordered_map', url: 'https://en.cppreference.com/w/cpp/container/unordered_map', description: 'Hash-based key-value container' },
        { type: 'cppreference', title: 'std::hash', url: 'https://en.cppreference.com/w/cpp/utility/hash', description: 'Hash function object' },
        { type: 'textbook', title: 'The C++ Standard Library', author: 'Nicolai Josuttis', description: 'Chapter 7.9: Unordered Containers' },
      ]} />
    </div>
  )
}
