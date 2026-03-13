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

export default function S2RangeFor() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The range-based <code>for</code> loop, introduced in C++11, iterates over every element in a
        container or range without manual index management. It is safer, more concise, and less
        error-prone than traditional index-based loops.
      </p>

      <DefinitionBlock title="Range-Based for Loop">
        <p>
          A range-based <code>for</code> loop iterates over each element of a range (any object
          that provides <code>begin()</code> and <code>end()</code> iterators). This includes arrays,
          <code>std::vector</code>, <code>std::string</code>, <code>std::map</code>, initializer
          lists, and any user-defined type that satisfies the range concept.
        </p>
      </DefinitionBlock>

      <SyntaxBlock title="Range-for Syntax">
        <CppCode>{`for (declaration : range_expression) {
    // body -- executes once per element
}`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Iterating Over Containers</h2>

      <CppCode title="range_for_basics.cpp">{`#include <iostream>
#include <vector>
#include <string>

int main() {
    // Array
    int numbers[] = {10, 20, 30, 40, 50};
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;

    // Vector
    std::vector<std::string> fruits = {"apple", "banana", "cherry"};
    for (const std::string& fruit : fruits) {
        std::cout << fruit << " ";
    }
    std::cout << std::endl;

    // String (iterates over characters)
    std::string word = "C++";
    for (char c : word) {
        std::cout << "[" << c << "]";
    }
    std::cout << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`10 20 30 40 50
apple banana cherry
[C][+][+]`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">auto& vs const auto&</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        How you capture the loop variable determines whether you can modify the elements and
        whether copies are made.
      </p>

      <CppCode title="capture_modes.cpp">{`#include <iostream>
#include <vector>

int main() {
    std::vector<int> values = {1, 2, 3, 4, 5};

    // By value: copies each element (cannot modify original)
    for (int v : values) {
        v *= 10;  // modifies the copy, not the vector
    }

    // By reference: can modify original elements
    for (int& v : values) {
        v *= 10;
    }

    // By const reference: read-only, no copies
    for (const int& v : values) {
        std::cout << v << " ";
    }
    std::cout << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`10 20 30 40 50`}</OutputBlock>

      <BestPracticeBlock title="Default to const auto&">
        <p>
          Use <code>const auto&</code> when you only need to read elements -- it avoids copies and
          prevents accidental modification. Use <code>auto&</code> when you need to modify elements
          in place. Use plain <code>auto</code> (by value) only for cheap-to-copy types when you
          intentionally want a local copy.
        </p>
      </BestPracticeBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Structured Bindings in Range-for (C++17)</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        When iterating over containers of pairs or tuples (like <code>std::map</code>), C++17
        structured bindings let you unpack each element directly in the loop header.
      </p>

      <CppCode title="structured_bindings.cpp">{`#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> population = {
        {"Tokyo", 14}, {"Delhi", 11}, {"Shanghai", 24}
    };

    // Without structured bindings (pre-C++17)
    for (const auto& pair : population) {
        std::cout << pair.first << ": " << pair.second << "M" << std::endl;
    }

    std::cout << "---" << std::endl;

    // With structured bindings (C++17)
    for (const auto& [city, pop] : population) {
        std::cout << city << ": " << pop << "M" << std::endl;
    }

    return 0;
}`}</CppCode>

      <OutputBlock>{`Delhi: 11M
Shanghai: 24M
Tokyo: 14M
---
Delhi: 11M
Shanghai: 24M
Tokyo: 14M`}</OutputBlock>

      <CompilerNoteBlock compiler="all" title="C++17 Required">
        <p>
          Structured bindings require C++17. Compile with <code>-std=c++17</code> (GCC/Clang)
          or <code>/std:c++17</code> (MSVC).
        </p>
      </CompilerNoteBlock>

      <NoteBlock type="info" title="Initializer lists in range-for">
        <p>
          You can iterate over a brace-enclosed initializer list directly without declaring a
          container: <code>for (int x : {'{'}1, 2, 3, 4, 5{'}'})</code>. The compiler creates a
          temporary <code>std::initializer_list</code> behind the scenes.
        </p>
      </NoteBlock>

      <NoteBlock type="important" title="Do not modify container size during iteration">
        <p>
          Never add or remove elements from a container while iterating over it with a range-based
          for loop. Doing so invalidates the iterators and causes undefined behavior. If you need to
          filter elements, build a new container or use the erase-remove idiom after the loop.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Sum and Average"
        difficulty="beginner"
        prompt="Given a vector of doubles, use a range-based for loop to compute the sum and average of its elements."
        hints={[
          "Use const auto& to avoid copying",
          "Track the count with the vector's .size() method",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <vector>

int main() {
    std::vector<double> data = {3.5, 7.2, 1.8, 9.4, 4.1};
    double sum = 0.0;

    for (const auto& val : data) {
        sum += val;
    }

    double avg = sum / data.size();
    std::cout << "Sum: " << sum << std::endl;
    std::cout << "Average: " << avg << std::endl;

    return 0;
}`}</CppCode>
        }
      />

      <ExerciseBlock
        title="Word Frequency Counter"
        difficulty="intermediate"
        prompt="Given a vector of strings, count how many times each word appears using a std::map, then print the results using structured bindings."
        hints={[
          "Use std::map<std::string, int> to store counts",
          "Increment the count for each word: counts[word]++",
          "Use for (const auto& [word, count] : counts) to print",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <vector>
#include <map>
#include <string>

int main() {
    std::vector<std::string> words = {
        "hello", "world", "hello", "cpp", "world", "hello"
    };

    std::map<std::string, int> counts;
    for (const auto& w : words) {
        counts[w]++;
    }

    for (const auto& [word, count] : counts) {
        std::cout << word << ": " << count << std::endl;
    }

    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Range-based for loop', url: 'https://en.cppreference.com/w/cpp/language/range-for', description: 'Full range-for documentation including C++20 init-statement' },
        { type: 'cppreference', title: 'Structured bindings', url: 'https://en.cppreference.com/w/cpp/language/structured_binding', description: 'C++17 structured binding declarations' },
        { type: 'textbook', title: 'A Tour of C++', author: 'Bjarne Stroustrup', description: 'Chapter 1: range-for and auto' },
      ]} />
    </div>
  )
}
