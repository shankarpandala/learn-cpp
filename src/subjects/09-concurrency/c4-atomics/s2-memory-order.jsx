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

export default function S2MemoryOrder() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Modern CPUs and compilers reorder memory operations for performance. Memory orderings in
        C++ control how atomic operations synchronize memory between threads. Understanding them
        is essential for writing correct and efficient lock-free code.
      </p>

      <DefinitionBlock title="What are Memory Orderings?">
        <p>
          A <strong>memory ordering</strong> specifies constraints on how memory operations around
          an atomic access can be reordered. C++ defines six orderings in
          <code>&lt;atomic&gt;</code>: <code>memory_order_relaxed</code>,
          <code>memory_order_consume</code>, <code>memory_order_acquire</code>,
          <code>memory_order_release</code>, <code>memory_order_acq_rel</code>, and
          <code>memory_order_seq_cst</code> (the default).
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Sequential Consistency (Default)</h2>

      <SyntaxBlock title="memory_order_seq_cst">
        <p>
          The default ordering. All threads observe all <code>seq_cst</code> operations in the same
          global total order. This is the strongest and easiest to reason about, but may be the
          slowest on weakly-ordered architectures (like ARM).
        </p>
        <CppCode>{`std::atomic<int> x(0);
x.store(1);                                    // seq_cst by default
x.store(1, std::memory_order_seq_cst);         // Explicit`}</CppCode>
      </SyntaxBlock>

      <CppCode title="seq_cst_example.cpp">{`#include <iostream>
#include <atomic>
#include <thread>

std::atomic<bool> x(false), y(false);
std::atomic<int> z(0);

void write_x() { x.store(true, std::memory_order_seq_cst); }
void write_y() { y.store(true, std::memory_order_seq_cst); }

void read_x_then_y() {
    while (!x.load(std::memory_order_seq_cst));
    if (y.load(std::memory_order_seq_cst)) ++z;
}
void read_y_then_x() {
    while (!y.load(std::memory_order_seq_cst));
    if (x.load(std::memory_order_seq_cst)) ++z;
}

int main() {
    std::thread a(write_x), b(write_y);
    std::thread c(read_x_then_y), d(read_y_then_x);
    a.join(); b.join(); c.join(); d.join();
    // z is NEVER 0 with seq_cst (at least one reader sees both writes)
    std::cout << "z = " << z.load() << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`z = 2`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Acquire-Release Semantics</h2>

      <NoteBlock type="info" title="Acquire and Release">
        <p>
          <code>memory_order_release</code> on a store ensures all prior writes are visible to
          a thread that performs an <code>memory_order_acquire</code> load on the same variable.
          This creates a <strong>happens-before</strong> relationship: everything before the release
          store is guaranteed visible after the acquire load.
        </p>
      </NoteBlock>

      <CppCode title="acquire_release.cpp">{`#include <iostream>
#include <atomic>
#include <thread>
#include <cassert>

std::atomic<bool> ready(false);
int data = 0;

void producer() {
    data = 42;                                         // Non-atomic write
    ready.store(true, std::memory_order_release);      // Release
}

void consumer() {
    while (!ready.load(std::memory_order_acquire));    // Acquire
    // Guaranteed to see data == 42
    std::cout << "data = " << data << std::endl;
}

int main() {
    std::thread t1(producer), t2(consumer);
    t1.join(); t2.join();
    return 0;
}`}</CppCode>

      <OutputBlock>{`data = 42`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Relaxed Ordering</h2>

      <NoteBlock type="important" title="memory_order_relaxed">
        <p>
          <code>memory_order_relaxed</code> guarantees only atomicity, not ordering. Other memory
          operations can be freely reordered around it. Use it only when you need a simple counter
          or flag and do not need to synchronize any other data.
        </p>
      </NoteBlock>

      <CppCode title="Relaxed counter">{`#include <iostream>
#include <atomic>
#include <thread>
#include <vector>

std::atomic<int> counter(0);

void count(int n) {
    for (int i = 0; i < n; ++i)
        counter.fetch_add(1, std::memory_order_relaxed);
}

int main() {
    std::vector<std::thread> threads;
    for (int i = 0; i < 4; ++i)
        threads.emplace_back(count, 25000);
    for (auto& t : threads) t.join();
    std::cout << "Counter: " << counter.load() << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Counter: 100000`}</OutputBlock>

      <WarningBlock title="Relaxed Does Not Synchronize">
        <p>
          With <code>memory_order_relaxed</code>, a thread that reads an updated atomic value is
          NOT guaranteed to see updates to other (non-atomic) variables made by the writing thread.
          Never use relaxed ordering when you need to communicate data alongside a flag or pointer.
        </p>
      </WarningBlock>

      <NoteBlock type="tip" title="acq_rel for Read-Modify-Write">
        <p>
          <code>memory_order_acq_rel</code> combines acquire and release semantics in a single
          read-modify-write operation (like <code>fetch_add</code> or <code>compare_exchange</code>).
          The read part is an acquire, and the write part is a release.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Start with seq_cst, Optimize Later">
        <p>
          Use the default <code>memory_order_seq_cst</code> until profiling shows it is a bottleneck.
          Weaker orderings provide performance gains on weakly-ordered architectures but are much
          harder to reason about correctly. Incorrect memory orderings cause extremely subtle bugs
          that are nearly impossible to reproduce.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Acquire-Release Flag"
        difficulty="advanced"
        prompt="Write a producer-consumer pair using acquire-release ordering. The producer fills an array of 10 elements, then sets a ready flag with release. The consumer spins on the flag with acquire, then reads and prints the array."
        hints={[
          "Use a regular array (not atomic) for the data",
          "Use std::atomic<bool> with release store and acquire load",
          "The acquire-release pair guarantees the consumer sees all array writes",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <atomic>
#include <thread>

std::atomic<bool> ready(false);
int arr[10];

void producer() {
    for (int i = 0; i < 10; ++i)
        arr[i] = i * i;
    ready.store(true, std::memory_order_release);
}

void consumer() {
    while (!ready.load(std::memory_order_acquire));
    for (int i = 0; i < 10; ++i)
        std::cout << arr[i] << " ";
    std::cout << std::endl;
}

int main() {
    std::thread p(producer), c(consumer);
    p.join(); c.join();
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::memory_order', url: 'https://en.cppreference.com/w/cpp/atomic/memory_order', description: 'Memory ordering semantics for atomic operations' },
        { type: 'cppreference', title: 'Atomic operations library', url: 'https://en.cppreference.com/w/cpp/atomic', description: 'Overview of all atomic facilities' },
        { type: 'textbook', title: 'C++ Concurrency in Action', author: 'Anthony Williams', description: 'Chapter 5: Memory ordering for atomic operations' },
      ]} />
    </div>
  )
}
