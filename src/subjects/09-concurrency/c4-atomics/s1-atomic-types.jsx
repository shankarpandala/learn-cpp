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

export default function S1AtomicTypes() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>std::atomic</code> provides lock-free (or low-lock) operations on individual variables.
        Atomic operations are indivisible: no other thread can observe a half-completed read or write.
        This enables building concurrent algorithms without mutexes for simple shared state.
      </p>

      <DefinitionBlock title="What is std::atomic?">
        <p>
          <code>std::atomic&lt;T&gt;</code> is a template that wraps a type <code>T</code> and
          guarantees that all operations on it are atomic (indivisible). It prevents data races
          without explicit locks. Defined in <code>&lt;atomic&gt;</code>. Common specializations
          include <code>std::atomic&lt;int&gt;</code>, <code>std::atomic&lt;bool&gt;</code>, and
          pointer types.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic Operations</h2>

      <SyntaxBlock title="load, store, exchange">
        <p>
          <code>load()</code> reads the value atomically. <code>store()</code> writes atomically.
          <code>exchange()</code> atomically replaces the value and returns the old one.
        </p>
        <CppCode>{`std::atomic<int> x(0);
x.store(42);           // Atomic write
int val = x.load();    // Atomic read
int old = x.exchange(100);  // Swap, returns 42`}</CppCode>
      </SyntaxBlock>

      <CppCode title="atomic_counter.cpp">{`#include <iostream>
#include <atomic>
#include <thread>
#include <vector>

std::atomic<int> counter(0);

void increment(int times) {
    for (int i = 0; i < times; ++i) {
        counter.fetch_add(1, std::memory_order_relaxed);
    }
}

int main() {
    std::vector<std::thread> threads;
    for (int i = 0; i < 8; ++i)
        threads.emplace_back(increment, 10000);
    for (auto& t : threads) t.join();

    std::cout << "Counter: " << counter.load() << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Counter: 80000`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Compare and Exchange</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The <code>compare_exchange_weak</code> and <code>compare_exchange_strong</code> operations
        are the foundation of lock-free algorithms. They atomically compare the current value with
        an expected value and, if equal, replace it with a desired value.
      </p>

      <CppCode title="compare_exchange_demo.cpp">{`#include <iostream>
#include <atomic>
#include <thread>
#include <vector>

std::atomic<int> maximum(0);

void update_max(int value) {
    int current = maximum.load();
    while (current < value &&
           !maximum.compare_exchange_weak(current, value)) {
        // current is updated to the actual value on failure
    }
}

int main() {
    std::vector<std::thread> threads;
    int values[] = {3, 7, 2, 9, 5, 1, 8, 4};

    for (int v : values)
        threads.emplace_back(update_max, v);
    for (auto& t : threads) t.join();

    std::cout << "Maximum: " << maximum.load() << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Maximum: 9`}</OutputBlock>

      <NoteBlock type="info" title="weak vs strong">
        <p>
          <code>compare_exchange_weak</code> may fail spuriously (return false even when the value
          matches), but is faster on some architectures. Use it in loops.
          <code>compare_exchange_strong</code> never fails spuriously and is appropriate for
          single-attempt operations.
        </p>
      </NoteBlock>

      <NoteBlock type="tip" title="Arithmetic Operations">
        <p>
          For integer and pointer atomics, use <code>fetch_add()</code>, <code>fetch_sub()</code>,
          <code>fetch_and()</code>, <code>fetch_or()</code>, and <code>fetch_xor()</code>. These
          are more efficient than compare-exchange loops for simple arithmetic.
          Operators like <code>++</code>, <code>--</code>, <code>+=</code> are also overloaded.
        </p>
      </NoteBlock>

      <WarningBlock title="Atomic Does Not Mean Thread-Safe Compound Operations">
        <p>
          Each individual atomic operation is thread-safe, but a sequence of operations is not.
          For example, <code>if (x.load() == 0) x.store(1);</code> is a race condition because
          another thread can modify <code>x</code> between the load and the store.
          Use <code>compare_exchange</code> for check-then-act patterns.
        </p>
      </WarningBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::atomic_flag</h2>

      <NoteBlock type="info" title="atomic_flag: The Simplest Atomic">
        <p>
          <code>std::atomic_flag</code> is the only atomic type guaranteed to be lock-free on all
          platforms. It supports only <code>test_and_set()</code> and <code>clear()</code>,
          making it ideal for building simple spinlocks.
        </p>
      </NoteBlock>

      <CppCode title="Spinlock with atomic_flag">{`#include <iostream>
#include <atomic>
#include <thread>

class SpinLock {
    std::atomic_flag flag = ATOMIC_FLAG_INIT;
public:
    void lock() {
        while (flag.test_and_set(std::memory_order_acquire)) {
            // spin
        }
    }
    void unlock() {
        flag.clear(std::memory_order_release);
    }
};

SpinLock spin;
int shared_data = 0;

int main() {
    auto work = []() {
        for (int i = 0; i < 10000; ++i) {
            spin.lock();
            ++shared_data;
            spin.unlock();
        }
    };
    std::thread t1(work), t2(work);
    t1.join(); t2.join();
    std::cout << "Result: " << shared_data << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Result: 20000`}</OutputBlock>

      <BestPracticeBlock title="Prefer Mutexes for Complex Critical Sections">
        <p>
          Use <code>std::atomic</code> for simple counters, flags, and single-variable updates.
          For complex invariants involving multiple variables, use mutexes. Atomic operations
          are harder to reason about correctly and are best reserved for performance-critical
          low-level code.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Lock-Free Stack Push"
        difficulty="advanced"
        prompt="Implement a thread-safe atomic maximum tracker using compare_exchange_weak. Launch 10 threads, each submitting a random value. Verify the final maximum is correct."
        hints={[
          "Load the current maximum, compare with your value",
          "Use a while loop with compare_exchange_weak",
          "Track the expected maximum separately for verification",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <atomic>
#include <thread>
#include <vector>
#include <algorithm>

std::atomic<int> global_max(0);

void submit(int value) {
    int current = global_max.load();
    while (current < value &&
           !global_max.compare_exchange_weak(current, value)) {}
}

int main() {
    std::vector<int> values = {15, 42, 8, 73, 31, 99, 56, 2, 67, 44};
    std::vector<std::thread> threads;

    for (int v : values)
        threads.emplace_back(submit, v);
    for (auto& t : threads) t.join();

    int expected = *std::max_element(values.begin(), values.end());
    std::cout << "Atomic max: " << global_max.load() << std::endl;
    std::cout << "Expected:   " << expected << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::atomic', url: 'https://en.cppreference.com/w/cpp/atomic/atomic', description: 'Atomic types and operations' },
        { type: 'cppreference', title: 'std::atomic_flag', url: 'https://en.cppreference.com/w/cpp/atomic/atomic_flag', description: 'Lock-free boolean atomic type' },
        { type: 'textbook', title: 'C++ Concurrency in Action', author: 'Anthony Williams', description: 'Chapter 5: The C++ memory model and operations on atomic types' },
      ]} />
    </div>
  )
}
