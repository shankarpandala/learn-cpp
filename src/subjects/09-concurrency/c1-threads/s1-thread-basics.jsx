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

export default function S1ThreadBasics() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++11 introduced <code>std::thread</code> as a portable, standard way to create and manage
        threads. A thread represents a single sequence of execution that runs concurrently with
        other threads in the same process, sharing the same address space.
      </p>

      <DefinitionBlock title="What is a Thread?">
        <p>
          A <strong>thread</strong> is the smallest unit of execution scheduled by the operating system.
          Multiple threads within a process share memory and resources, enabling concurrent work.
          <code>std::thread</code> is defined in the <code>&lt;thread&gt;</code> header.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Creating a Thread</h2>

      <SyntaxBlock title="std::thread Constructor">
        <p>
          A <code>std::thread</code> is constructed with a callable (function, lambda, or functor)
          and optional arguments. The thread begins execution immediately upon construction.
        </p>
        <CppCode>{`std::thread t(callable, arg1, arg2, ...);`}</CppCode>
      </SyntaxBlock>

      <CppCode title="basic_thread.cpp">{`#include <iostream>
#include <thread>

void greet(const std::string& name) {
    std::cout << "Hello from thread, " << name << "!" << std::endl;
}

int main() {
    std::thread t(greet, "Alice");
    t.join();  // Wait for thread to finish
    std::cout << "Back in main thread." << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Hello from thread, Alice!
Back in main thread.`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">join() and detach()</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Every <code>std::thread</code> must be either <strong>joined</strong> or <strong>detached</strong> before
        it is destroyed. Failing to do so calls <code>std::terminate</code>, crashing the program.
      </p>

      <NoteBlock type="info" title="join() vs detach()">
        <p>
          <code>join()</code> blocks the calling thread until the target thread completes.
          <code>detach()</code> separates the thread from the <code>std::thread</code> object,
          letting it run independently as a daemon thread. Once detached, you cannot rejoin it.
        </p>
      </NoteBlock>

      <WarningBlock title="Detached Thread Dangers">
        <p>
          A detached thread continues running even after <code>main()</code> returns. If it accesses
          local variables or objects that have been destroyed, you get undefined behavior. Prefer
          <code>join()</code> unless you have a clear reason to detach.
        </p>
      </WarningBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Lambda Threads and Arguments</h2>

      <CppCode title="lambda_thread.cpp">{`#include <iostream>
#include <thread>
#include <vector>

int main() {
    std::vector<std::thread> threads;

    for (int i = 0; i < 4; ++i) {
        threads.emplace_back([i]() {
            std::cout << "Thread " << i << " running\\n";
        });
    }

    for (auto& t : threads) {
        t.join();
    }

    std::cout << "All threads finished." << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Thread 0 running
Thread 2 running
Thread 1 running
Thread 3 running
All threads finished.`}</OutputBlock>

      <NoteBlock type="important" title="Passing References to Threads">
        <p>
          Arguments are <strong>copied</strong> into the thread by default. To pass by reference,
          wrap the argument with <code>std::ref()</code>. Without it, the thread receives a copy
          even if the function signature takes a reference.
        </p>
      </NoteBlock>

      <CppCode title="Passing by reference">{`#include <iostream>
#include <thread>

void increment(int& value) {
    ++value;
}

int main() {
    int x = 10;
    std::thread t(increment, std::ref(x));
    t.join();
    std::cout << "x = " << x << std::endl;  // x = 11
    return 0;
}`}</CppCode>

      <OutputBlock>{`x = 11`}</OutputBlock>

      <BestPracticeBlock title="Always Join or Detach">
        <p>
          Use RAII wrappers or scope guards to ensure threads are joined before destruction.
          In C++20, prefer <code>std::jthread</code> which automatically joins in its destructor.
          Never let a joinable <code>std::thread</code> go out of scope.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Parallel Summation"
        difficulty="intermediate"
        prompt="Create two threads that each compute the sum of half an array, then combine the partial sums in main."
        hints={[
          "Use std::ref() to pass the result variables by reference",
          "Split the array index range between the two threads",
          "Join both threads before combining results",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <thread>
#include <vector>

void partial_sum(const std::vector<int>& data, int start, int end, long long& result) {
    result = 0;
    for (int i = start; i < end; ++i)
        result += data[i];
}

int main() {
    std::vector<int> data(1000, 1);  // 1000 ones
    long long sum1 = 0, sum2 = 0;
    int mid = data.size() / 2;

    std::thread t1(partial_sum, std::cref(data), 0, mid, std::ref(sum1));
    std::thread t2(partial_sum, std::cref(data), mid, (int)data.size(), std::ref(sum2));
    t1.join();
    t2.join();

    std::cout << "Total: " << sum1 + sum2 << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::thread', url: 'https://en.cppreference.com/w/cpp/thread/thread', description: 'Thread class documentation' },
        { type: 'cppreference', title: 'std::ref', url: 'https://en.cppreference.com/w/cpp/utility/functional/ref', description: 'Reference wrapper for passing arguments by reference' },
        { type: 'textbook', title: 'C++ Concurrency in Action', author: 'Anthony Williams', description: 'Chapter 2: Managing Threads' },
      ]} />
    </div>
  )
}
