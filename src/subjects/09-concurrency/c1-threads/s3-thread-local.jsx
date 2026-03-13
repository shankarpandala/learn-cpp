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

export default function S3ThreadLocal() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The <code>thread_local</code> storage specifier creates a separate instance of a variable
        for each thread. This provides a way to maintain per-thread state without explicit
        synchronization, since each thread accesses its own independent copy of the variable.
      </p>

      <DefinitionBlock title="What is thread_local?">
        <p>
          <code>thread_local</code> is a storage duration specifier introduced in C++11. A
          <code>thread_local</code> variable is created when a thread starts and destroyed when the
          thread exits. Each thread has its own independent instance, eliminating the need for
          locks when accessing the variable.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic Usage</h2>

      <SyntaxBlock title="thread_local Syntax">
        <p>
          The <code>thread_local</code> keyword can be used with global, namespace-scope, or static
          local variables. It can also be combined with <code>static</code> or <code>extern</code>.
        </p>
        <CppCode>{`thread_local int tls_var = 0;          // Global thread-local
static thread_local int stls_var = 0;  // Same as above (static implied)

void func() {
    thread_local int local_tls = 0;    // Static thread-local in function
}`}</CppCode>
      </SyntaxBlock>

      <CppCode title="thread_local_demo.cpp">{`#include <iostream>
#include <thread>
#include <vector>

thread_local int counter = 0;

void increment_counter(int id, int times) {
    for (int i = 0; i < times; ++i) {
        ++counter;
    }
    std::cout << "Thread " << id << ": counter = " << counter << std::endl;
}

int main() {
    std::vector<std::thread> threads;
    for (int i = 0; i < 3; ++i) {
        threads.emplace_back(increment_counter, i, (i + 1) * 100);
    }
    for (auto& t : threads) t.join();

    std::cout << "Main thread: counter = " << counter << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Thread 0: counter = 100
Thread 1: counter = 200
Thread 2: counter = 300
Main thread: counter = 0`}</OutputBlock>

      <NoteBlock type="info" title="Independent Copies">
        <p>
          Each thread starts with its own freshly initialized copy of the variable. In the example
          above, the main thread's <code>counter</code> remains 0 because it never called
          <code>increment_counter</code>. Each worker thread independently accumulated its own count.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Use Cases</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Common use cases for <code>thread_local</code> include per-thread caches, error codes,
        random number generators, memory allocators, and logging context. They avoid synchronization
        overhead while giving each thread its own state.
      </p>

      <CppCode title="Per-thread random generator">{`#include <iostream>
#include <thread>
#include <random>

void generate_random(int id) {
    thread_local std::mt19937 rng(std::hash<std::thread::id>{}(
        std::this_thread::get_id()));
    std::uniform_int_distribution<int> dist(1, 100);

    std::cout << "Thread " << id << ": "
              << dist(rng) << ", " << dist(rng) << std::endl;
}

int main() {
    std::thread t1(generate_random, 1);
    std::thread t2(generate_random, 2);
    t1.join();
    t2.join();
    return 0;
}`}</CppCode>

      <WarningBlock title="Initialization Order">
        <p>
          Thread-local variables with dynamic initialization (constructors, function calls) are
          initialized the first time control passes through their declaration in each thread. Be
          cautious of initialization order dependencies between thread-local variables, as the
          order may differ from static variables.
        </p>
      </WarningBlock>

      <NoteBlock type="tip" title="thread_local and Performance">
        <p>
          Accessing <code>thread_local</code> variables is generally fast but slightly slower than
          accessing regular local variables, since the compiler must look up the thread-specific
          storage. On most platforms, this is implemented via the TLS segment or platform-specific
          mechanisms like <code>__thread</code> (GCC) or <code>__declspec(thread)</code> (MSVC).
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Prefer thread_local Over Global Mutexed State">
        <p>
          When each thread needs its own independent copy of some state, use <code>thread_local</code>
          rather than a global variable protected by a mutex. This eliminates contention entirely and
          simplifies code. Aggregate results after threads complete if needed.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Thread-Local Accumulator"
        difficulty="intermediate"
        prompt="Create a program where 4 threads each accumulate numbers from a shared array into thread_local sums, then store their partial sums into a shared results vector (protected by a mutex)."
        hints={[
          "Divide the array into 4 equal ranges, one per thread",
          "Use thread_local for the partial sum variable",
          "Use std::mutex to protect the shared results vector",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <thread>
#include <vector>
#include <mutex>
#include <numeric>

std::mutex mtx;
std::vector<long long> results;

void partial_sum(const std::vector<int>& data, int start, int end) {
    thread_local long long sum = 0;
    sum = 0;
    for (int i = start; i < end; ++i) sum += data[i];

    std::lock_guard<std::mutex> lock(mtx);
    results.push_back(sum);
}

int main() {
    std::vector<int> data(1000);
    std::iota(data.begin(), data.end(), 1);

    std::vector<std::thread> threads;
    int chunk = data.size() / 4;
    for (int i = 0; i < 4; ++i) {
        int s = i * chunk, e = (i == 3) ? (int)data.size() : s + chunk;
        threads.emplace_back(partial_sum, std::cref(data), s, e);
    }
    for (auto& t : threads) t.join();

    long long total = 0;
    for (auto v : results) total += v;
    std::cout << "Total: " << total << std::endl;  // 500500
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'thread_local', url: 'https://en.cppreference.com/w/cpp/keyword/thread_local', description: 'Thread-local storage duration specifier' },
        { type: 'cppreference', title: 'Storage duration', url: 'https://en.cppreference.com/w/cpp/language/storage_duration', description: 'All storage duration specifiers in C++' },
        { type: 'textbook', title: 'C++ Concurrency in Action', author: 'Anthony Williams', description: 'Chapter 8: Designing concurrent code' },
      ]} />
    </div>
  )
}
