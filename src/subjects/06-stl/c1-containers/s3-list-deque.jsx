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

export default function S3ListDeque() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        While <code>std::vector</code> is the go-to sequence container, <code>std::list</code> and
        <code> std::deque</code> serve important roles when different access or insertion patterns are
        needed. A list provides constant-time insertion and removal anywhere, while a deque offers
        efficient insertion at both ends with random access.
      </p>

      <DefinitionBlock title="std::list">
        <p>
          A doubly-linked list where each element is stored in a separate node that holds pointers to
          both its predecessor and successor. Insertion and removal at any known position take O(1)
          time, but random access is not supported. Defined in <code>&lt;list&gt;</code>.
        </p>
      </DefinitionBlock>

      <DefinitionBlock title="std::deque">
        <p>
          A double-ended queue that supports fast insertion and removal at both the front and back.
          It provides random access like <code>std::vector</code> but stores elements in non-contiguous
          memory chunks. Defined in <code>&lt;deque&gt;</code>.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::list: Doubly-Linked List</h2>

      <CppCode title="list_basics.cpp">{`#include <iostream>
#include <list>

int main() {
    std::list<int> nums = {10, 20, 30, 40, 50};

    // Insert at the front and back
    nums.push_front(5);
    nums.push_back(55);

    // Insert before the third element
    auto it = nums.begin();
    std::advance(it, 2);
    nums.insert(it, 15);

    // Splice: move elements from one list into another
    std::list<int> extra = {100, 200};
    nums.splice(nums.end(), extra);  // extra is now empty

    for (const auto& n : nums) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    std::cout << "Extra size: " << extra.size() << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`5 10 15 20 30 40 50 55 100 200
Extra size: 0`}</OutputBlock>

      <SyntaxBlock title="splice()">
        <p>
          <code>splice</code> transfers elements from one list to another without copying or moving
          individual elements. It re-links the internal node pointers, making it an O(1) operation
          for single-element or whole-list transfers.
        </p>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::deque: Double-Ended Queue</h2>

      <CppCode title="deque_basics.cpp">{`#include <iostream>
#include <deque>

int main() {
    std::deque<std::string> tasks;

    // Efficient insertion at both ends
    tasks.push_back("Task B");
    tasks.push_front("Task A");
    tasks.push_back("Task C");

    // Random access like vector
    std::cout << "Second task: " << tasks[1] << std::endl;

    // Remove from front (FIFO behavior)
    tasks.pop_front();

    for (const auto& t : tasks) {
        std::cout << t << std::endl;
    }
    return 0;
}`}</CppCode>

      <OutputBlock>{`Second task: Task B
Task B
Task C`}</OutputBlock>

      <NoteBlock type="info" title="When to Use Each Container">
        <p>
          Use <code>std::vector</code> by default. Use <code>std::deque</code> when you need frequent
          insertion or removal at the front. Use <code>std::list</code> when you need constant-time
          insertion or removal at arbitrary positions and you already have an iterator to that position,
          or when you need splice operations.
        </p>
      </NoteBlock>

      <WarningBlock title="std::list and Cache Performance">
        <p>
          Because list nodes are allocated individually on the heap, they are scattered in memory.
          This leads to poor cache locality compared to <code>std::vector</code> and <code>std::deque</code>.
          In practice, <code>std::vector</code> often outperforms <code>std::list</code> even for
          operations where the list has better algorithmic complexity.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Profile before choosing std::list">
        <p>
          The theoretical O(1) insertion advantage of <code>std::list</code> is often outweighed by
          its cache-unfriendly memory layout. Always measure with realistic data before choosing
          a list over a vector.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Task Queue"
        difficulty="intermediate"
        prompt="Use std::deque to implement a simple task queue: push 5 tasks to the back, then process (pop and print) them from the front in FIFO order."
        hints={[
          "Use push_back to enqueue and pop_front to dequeue",
          "Check empty() before popping in a while loop",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <deque>
#include <string>

int main() {
    std::deque<std::string> queue;
    queue.push_back("Email");
    queue.push_back("Report");
    queue.push_back("Code review");
    queue.push_back("Meeting");
    queue.push_back("Deploy");

    while (!queue.empty()) {
        std::cout << "Processing: " << queue.front() << std::endl;
        queue.pop_front();
    }
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::list', url: 'https://en.cppreference.com/w/cpp/container/list', description: 'Doubly-linked list reference' },
        { type: 'cppreference', title: 'std::deque', url: 'https://en.cppreference.com/w/cpp/container/deque', description: 'Double-ended queue reference' },
        { type: 'textbook', title: 'The C++ Standard Library', author: 'Nicolai Josuttis', description: 'Chapter 7: STL Containers' },
      ]} />
    </div>
  )
}
