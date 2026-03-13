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

export default function S2CustomIterators() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Writing a custom iterator allows your own classes to work with range-based for loops and
        all STL algorithms. An iterator is any object that supports the required operations for
        its category. By providing <code>begin()</code> and <code>end()</code>, you make your class
        iterable.
      </p>

      <DefinitionBlock title="iterator_traits">
        <p>
          <code>std::iterator_traits&lt;It&gt;</code> is a traits class that extracts the associated
          types of an iterator: <code>value_type</code>, <code>difference_type</code>,
          <code> pointer</code>, <code>reference</code>, and <code>iterator_category</code>. Algorithms
          use these traits to adapt their behavior to the iterator category.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">A Simple Range Iterator</h2>

      <CppCode title="range_iterator.cpp">{`#include <iostream>
#include <iterator>

class IntRange {
    int start_, end_;
public:
    IntRange(int start, int end) : start_(start), end_(end) {}

    class Iterator {
        int current_;
    public:
        // Required type aliases for iterator_traits
        using iterator_category = std::forward_iterator_tag;
        using value_type = int;
        using difference_type = std::ptrdiff_t;
        using pointer = const int*;
        using reference = int;

        explicit Iterator(int val) : current_(val) {}

        int operator*() const { return current_; }
        Iterator& operator++() { ++current_; return *this; }
        Iterator operator++(int) { auto tmp = *this; ++current_; return tmp; }
        bool operator==(const Iterator& o) const { return current_ == o.current_; }
        bool operator!=(const Iterator& o) const { return current_ != o.current_; }
    };

    Iterator begin() const { return Iterator(start_); }
    Iterator end() const { return Iterator(end_); }
};

int main() {
    for (int val : IntRange(1, 6)) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`1 2 3 4 5`}</OutputBlock>

      <SyntaxBlock title="Making a Class Iterable">
        <p>
          A class is iterable if it provides <code>begin()</code> and <code>end()</code> member
          functions (or free functions found via ADL) that return iterators. The iterator must
          support at minimum <code>operator*</code>, <code>operator++</code>, and
          <code> operator!=</code>.
        </p>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Using Custom Iterators with Algorithms</h2>

      <CppCode title="custom_with_algorithm.cpp">{`#include <iostream>
#include <algorithm>
#include <vector>
#include <iterator>

class IntRange {
    int start_, end_;
public:
    class Iterator {
        int current_;
    public:
        using iterator_category = std::forward_iterator_tag;
        using value_type = int;
        using difference_type = std::ptrdiff_t;
        using pointer = const int*;
        using reference = int;
        explicit Iterator(int v) : current_(v) {}
        int operator*() const { return current_; }
        Iterator& operator++() { ++current_; return *this; }
        Iterator operator++(int) { auto t = *this; ++current_; return t; }
        bool operator==(const Iterator& o) const { return current_ == o.current_; }
        bool operator!=(const Iterator& o) const { return current_ != o.current_; }
    };
    IntRange(int s, int e) : start_(s), end_(e) {}
    Iterator begin() const { return Iterator(start_); }
    Iterator end() const { return Iterator(end_); }
};

int main() {
    IntRange range(1, 11);

    // Copy to vector using std::copy
    std::vector<int> vec;
    std::copy(range.begin(), range.end(), std::back_inserter(vec));

    // Use algorithms on copied data
    auto sum = std::accumulate(vec.begin(), vec.end(), 0);
    std::cout << "Sum 1..10: " << sum << std::endl;

    auto count = std::count_if(range.begin(), range.end(),
                               [](int x) { return x % 2 == 0; });
    std::cout << "Even count: " << count << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Sum 1..10: 55
Even count: 5`}</OutputBlock>

      <NoteBlock type="info" title="Type Aliases Are Essential">
        <p>
          The five type aliases (<code>iterator_category</code>, <code>value_type</code>,
          <code> difference_type</code>, <code>pointer</code>, <code>reference</code>) allow
          <code> std::iterator_traits</code> to work with your iterator. Without them, some algorithms
          and library facilities may fail to compile.
        </p>
      </NoteBlock>

      <WarningBlock title="Deprecated std::iterator Base Class">
        <p>
          The <code>std::iterator</code> base class was deprecated in C++17. Instead of inheriting
          from it, define the five type aliases directly inside your iterator class, as shown in the
          examples above.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Start with forward iterators">
        <p>
          When writing a custom iterator, start by implementing a forward iterator. It covers the
          most common use cases including range-based for loops and most algorithms. Only add
          bidirectional or random access operations if your data structure naturally supports them.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Fibonacci Iterator"
        difficulty="advanced"
        prompt="Create a FibRange class whose iterator generates Fibonacci numbers. FibRange(n) should be iterable and yield the first n Fibonacci numbers (1, 1, 2, 3, 5, ...)."
        hints={[
          "Store previous and current values in the iterator",
          "Track the count remaining to know when to stop (equal to end iterator)",
        ]}
        solution={
          <CppCode>{`#include <iostream>

class FibRange {
    int count_;
public:
    explicit FibRange(int n) : count_(n) {}
    class Iterator {
        int remaining_, prev_, curr_;
    public:
        using iterator_category = std::forward_iterator_tag;
        using value_type = int;
        using difference_type = std::ptrdiff_t;
        using pointer = const int*;
        using reference = int;
        Iterator(int r, int p, int c) : remaining_(r), prev_(p), curr_(c) {}
        int operator*() const { return curr_; }
        Iterator& operator++() {
            int next = prev_ + curr_;
            prev_ = curr_;
            curr_ = next;
            --remaining_;
            return *this;
        }
        Iterator operator++(int) { auto t = *this; ++(*this); return t; }
        bool operator!=(const Iterator& o) const { return remaining_ != o.remaining_; }
        bool operator==(const Iterator& o) const { return remaining_ == o.remaining_; }
    };
    Iterator begin() const { return Iterator(count_, 0, 1); }
    Iterator end() const { return Iterator(0, 0, 0); }
};

int main() {
    for (int f : FibRange(8)) {
        std::cout << f << " ";
    }
    std::cout << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::iterator_traits', url: 'https://en.cppreference.com/w/cpp/iterator/iterator_traits', description: 'Iterator traits class' },
        { type: 'cppreference', title: 'Iterator concepts (C++20)', url: 'https://en.cppreference.com/w/cpp/iterator/input_iterator', description: 'C++20 iterator concepts' },
        { type: 'textbook', title: 'The C++ Standard Library', author: 'Nicolai Josuttis', description: 'Chapter 9.4: Writing Custom Iterators' },
      ]} />
    </div>
  )
}
