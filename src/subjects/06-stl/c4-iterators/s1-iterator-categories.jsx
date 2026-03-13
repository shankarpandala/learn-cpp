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

export default function S1IteratorCategories() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Iterators are the glue between containers and algorithms in the STL. They abstract the
        notion of a position in a sequence, allowing algorithms to work generically with any
        container. The STL defines five iterator categories, each building on the capabilities
        of the previous one.
      </p>

      <DefinitionBlock title="Iterator Categories">
        <p>
          The five categories, from least to most powerful, are: <strong>Input</strong> (single-pass read),
          <strong> Output</strong> (single-pass write), <strong>Forward</strong> (multi-pass read/write),
          <strong> Bidirectional</strong> (forward plus backward traversal), and <strong>Random Access</strong> (direct
          jump to any position in constant time). Each algorithm specifies the minimum category it requires.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Category Capabilities</h2>

      <SyntaxBlock title="Iterator Operations by Category">
        <p>
          <strong>Input:</strong> <code>++it</code>, <code>*it</code> (read), <code>==</code>, <code>!=</code>. Single-pass only.
        </p>
        <p>
          <strong>Output:</strong> <code>++it</code>, <code>*it = val</code> (write). Single-pass only.
        </p>
        <p>
          <strong>Forward:</strong> All of Input, plus multi-pass guarantee. Can read and write.
        </p>
        <p>
          <strong>Bidirectional:</strong> All of Forward, plus <code>--it</code>.
        </p>
        <p>
          <strong>Random Access:</strong> All of Bidirectional, plus <code>it + n</code>, <code>it - n</code>,
          <code> it[n]</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>.
        </p>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Containers and Their Iterators</h2>

      <CppCode title="iterator_examples.cpp">{`#include <iostream>
#include <vector>
#include <list>
#include <forward_list>
#include <algorithm>

int main() {
    // vector: random access iterators
    std::vector<int> vec = {10, 20, 30, 40, 50};
    auto vit = vec.begin();
    vit += 3;  // random access: jump directly
    std::cout << "vec[3] via iterator: " << *vit << std::endl;

    // list: bidirectional iterators
    std::list<int> lst = {10, 20, 30, 40, 50};
    auto lit = lst.end();
    --lit;  // bidirectional: can go backward
    std::cout << "list back via --end: " << *lit << std::endl;

    // forward_list: forward iterators only
    std::forward_list<int> fl = {10, 20, 30};
    auto fit = fl.begin();
    ++fit;  // can only go forward
    std::cout << "forward_list second: " << *fit << std::endl;

    // std::advance works with any category
    auto it2 = lst.begin();
    std::advance(it2, 2);  // uses ++ internally for bidirectional
    std::cout << "list[2] via advance: " << *it2 << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`vec[3] via iterator: 40
list back via --end: 50
forward_list second: 20
list[2] via advance: 30`}</OutputBlock>

      <NoteBlock type="info" title="Why Categories Matter">
        <p>
          Algorithms document their minimum iterator requirement. <code>std::sort</code> requires
          random access iterators, so it works with <code>std::vector</code> and <code>std::deque</code> but
          not <code>std::list</code>. The list provides its own <code>sort()</code> member function instead.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::distance and std::advance</h2>

      <CppCode title="distance_advance.cpp">{`#include <iostream>
#include <list>
#include <iterator>

int main() {
    std::list<int> data = {5, 10, 15, 20, 25, 30};

    auto first = data.begin();
    auto last = data.end();

    // std::distance: count elements between iterators
    std::cout << "Distance: " << std::distance(first, last) << std::endl;

    // std::next / std::prev (C++11): non-mutating advance
    auto third = std::next(first, 2);
    std::cout << "Third element: " << *third << std::endl;

    auto before_last = std::prev(last);
    std::cout << "Last element: " << *before_last << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Distance: 6
Third element: 15
Last element: 30`}</OutputBlock>

      <WarningBlock title="Do Not Use Arithmetic on Non-Random-Access Iterators">
        <p>
          Expressions like <code>it + 5</code> only compile for random access iterators.
          For bidirectional or forward iterators, use <code>std::advance(it, 5)</code> or
          <code> std::next(it, 5)</code> instead.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Use std::next and std::prev">
        <p>
          Prefer <code>std::next(it, n)</code> and <code>std::prev(it, n)</code> over manual
          increment loops. They return a new iterator without modifying the original, making code
          clearer and less error-prone.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Find the Middle Element"
        difficulty="intermediate"
        prompt="Write a function that takes a std::list<int> and returns the value of the middle element. Use std::distance and std::advance (do not convert to a vector)."
        hints={[
          "Find the total size with std::distance(begin, end)",
          "Use std::advance(it, size / 2) to reach the middle",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <list>
#include <iterator>

int middle(const std::list<int>& lst) {
    auto size = std::distance(lst.begin(), lst.end());
    auto it = lst.begin();
    std::advance(it, size / 2);
    return *it;
}

int main() {
    std::list<int> data = {10, 20, 30, 40, 50};
    std::cout << "Middle: " << middle(data) << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Iterator categories', url: 'https://en.cppreference.com/w/cpp/iterator', description: 'Iterator library overview' },
        { type: 'cppreference', title: 'std::advance', url: 'https://en.cppreference.com/w/cpp/iterator/advance', description: 'Advance an iterator by N positions' },
        { type: 'textbook', title: 'The C++ Standard Library', author: 'Nicolai Josuttis', description: 'Chapter 9: STL Iterators' },
      ]} />
    </div>
  )
}
