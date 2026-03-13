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

export default function S1Mutex() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        When multiple threads access shared data, you need <strong>mutual exclusion</strong> to
        prevent data races. A <code>std::mutex</code> ensures that only one thread can access a
        critical section at a time, while RAII lock wrappers guarantee the mutex is always released.
      </p>

      <DefinitionBlock title="What is a Mutex?">
        <p>
          A <strong>mutex</strong> (mutual exclusion) is a synchronization primitive that protects
          shared data from concurrent access. A thread must <em>lock</em> the mutex before entering
          a critical section and <em>unlock</em> it upon exit. Defined in <code>&lt;mutex&gt;</code>.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::mutex and lock_guard</h2>

      <SyntaxBlock title="lock_guard (RAII Lock)">
        <p>
          <code>std::lock_guard</code> locks the mutex on construction and unlocks it on destruction.
          This guarantees the mutex is released even if an exception is thrown.
        </p>
        <CppCode>{`std::mutex mtx;
{
    std::lock_guard<std::mutex> lock(mtx);
    // critical section - mutex is held
}  // mutex automatically released here`}</CppCode>
      </SyntaxBlock>

      <CppCode title="safe_counter.cpp">{`#include <iostream>
#include <thread>
#include <mutex>
#include <vector>

std::mutex mtx;
int counter = 0;

void increment(int times) {
    for (int i = 0; i < times; ++i) {
        std::lock_guard<std::mutex> lock(mtx);
        ++counter;
    }
}

int main() {
    std::vector<std::thread> threads;
    for (int i = 0; i < 4; ++i)
        threads.emplace_back(increment, 10000);
    for (auto& t : threads) t.join();

    std::cout << "Counter: " << counter << std::endl;  // Always 40000
    return 0;
}`}</CppCode>

      <OutputBlock>{`Counter: 40000`}</OutputBlock>

      <WarningBlock title="Never Lock Manually Without RAII">
        <p>
          Calling <code>mtx.lock()</code> and <code>mtx.unlock()</code> manually is error-prone.
          If an exception occurs between lock and unlock, the mutex remains locked forever, causing
          a deadlock. Always use <code>lock_guard</code> or <code>unique_lock</code>.
        </p>
      </WarningBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::unique_lock</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>std::unique_lock</code> is more flexible than <code>lock_guard</code>. It supports
        deferred locking, timed locking, manual unlock/relock, and is movable. It is required
        when using condition variables.
      </p>

      <CppCode title="unique_lock_example.cpp">{`#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx;

void work(int id) {
    std::unique_lock<std::mutex> lock(mtx, std::defer_lock);
    // Do some non-critical work first...

    lock.lock();  // Lock when needed
    std::cout << "Thread " << id << " in critical section" << std::endl;
    lock.unlock();  // Can unlock early

    // Do more non-critical work...
}

int main() {
    std::thread t1(work, 1);
    std::thread t2(work, 2);
    t1.join();
    t2.join();
    return 0;
}`}</CppCode>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">shared_mutex (Reader-Writer Lock)</h2>

      <NoteBlock type="info" title="Reader-Writer Pattern">
        <p>
          <code>std::shared_mutex</code> (C++17) allows multiple readers to hold a shared lock
          simultaneously, but only one writer can hold an exclusive lock. Use
          <code>std::shared_lock</code> for reading and <code>std::unique_lock</code> for writing.
        </p>
      </NoteBlock>

      <CppCode title="reader_writer.cpp">{`#include <iostream>
#include <thread>
#include <shared_mutex>
#include <vector>

std::shared_mutex rw_mutex;
int shared_data = 0;

void reader(int id) {
    std::shared_lock<std::shared_mutex> lock(rw_mutex);
    std::cout << "Reader " << id << " sees: " << shared_data << std::endl;
}

void writer(int value) {
    std::unique_lock<std::shared_mutex> lock(rw_mutex);
    shared_data = value;
    std::cout << "Writer set data to " << value << std::endl;
}

int main() {
    std::thread w1(writer, 42);
    w1.join();
    std::thread r1(reader, 1), r2(reader, 2);
    r1.join(); r2.join();
    return 0;
}`}</CppCode>

      <OutputBlock>{`Writer set data to 42
Reader 1 sees: 42
Reader 2 sees: 42`}</OutputBlock>

      <BestPracticeBlock title="Minimize Lock Scope">
        <p>
          Hold locks for the shortest duration possible. Perform computations, I/O, and memory
          allocations outside the critical section. Only protect the actual shared data access.
          This reduces contention and improves throughput.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Thread-Safe Bank Account"
        difficulty="intermediate"
        prompt="Implement a BankAccount class with deposit() and withdraw() methods protected by a mutex. Create multiple threads performing concurrent deposits and withdrawals, and verify the final balance is correct."
        hints={[
          "Use a private std::mutex member in the class",
          "Use std::lock_guard in both deposit() and withdraw()",
          "Track expected final balance to verify correctness",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <thread>
#include <mutex>
#include <vector>

class BankAccount {
    mutable std::mutex mtx;
    double balance;
public:
    BankAccount(double initial) : balance(initial) {}
    void deposit(double amount) {
        std::lock_guard<std::mutex> lock(mtx);
        balance += amount;
    }
    void withdraw(double amount) {
        std::lock_guard<std::mutex> lock(mtx);
        balance -= amount;
    }
    double get_balance() const {
        std::lock_guard<std::mutex> lock(mtx);
        return balance;
    }
};

int main() {
    BankAccount account(1000.0);
    std::vector<std::thread> threads;

    for (int i = 0; i < 5; ++i)
        threads.emplace_back([&]() {
            for (int j = 0; j < 100; ++j) account.deposit(10.0);
        });
    for (int i = 0; i < 5; ++i)
        threads.emplace_back([&]() {
            for (int j = 0; j < 100; ++j) account.withdraw(10.0);
        });

    for (auto& t : threads) t.join();
    std::cout << "Balance: " << account.get_balance() << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::mutex', url: 'https://en.cppreference.com/w/cpp/thread/mutex', description: 'Mutex class documentation' },
        { type: 'cppreference', title: 'std::shared_mutex', url: 'https://en.cppreference.com/w/cpp/thread/shared_mutex', description: 'Reader-writer mutex (C++17)' },
        { type: 'textbook', title: 'C++ Concurrency in Action', author: 'Anthony Williams', description: 'Chapter 3: Sharing data between threads' },
      ]} />
    </div>
  )
}
