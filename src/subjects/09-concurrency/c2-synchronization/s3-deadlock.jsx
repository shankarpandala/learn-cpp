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

export default function S3Deadlock() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        A deadlock occurs when two or more threads are blocked forever, each waiting for a resource
        the other holds. Deadlocks are among the most insidious concurrency bugs because they cause
        programs to hang silently. C++ provides tools like <code>std::scoped_lock</code> and
        <code>std::lock</code> to prevent them.
      </p>

      <DefinitionBlock title="What is a Deadlock?">
        <p>
          A <strong>deadlock</strong> is a situation where two or more threads are each waiting to
          acquire a lock held by another thread in the cycle. None of the threads can proceed,
          resulting in the program freezing. Deadlocks require four conditions simultaneously:
          mutual exclusion, hold and wait, no preemption, and circular wait.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Classic Deadlock Example</h2>

      <WarningBlock title="Deadlock-Prone Code">
        <p>
          The following code can deadlock because Thread 1 locks <code>mtx_a</code> then waits
          for <code>mtx_b</code>, while Thread 2 locks <code>mtx_b</code> then waits
          for <code>mtx_a</code>.
        </p>
      </WarningBlock>

      <CppCode title="deadlock_example.cpp">{`#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx_a, mtx_b;

void thread1() {
    std::lock_guard<std::mutex> lock_a(mtx_a);  // Locks A
    std::this_thread::sleep_for(std::chrono::milliseconds(1));
    std::lock_guard<std::mutex> lock_b(mtx_b);  // Waits for B -> DEADLOCK
    std::cout << "Thread 1 done" << std::endl;
}

void thread2() {
    std::lock_guard<std::mutex> lock_b(mtx_b);  // Locks B
    std::this_thread::sleep_for(std::chrono::milliseconds(1));
    std::lock_guard<std::mutex> lock_a(mtx_a);  // Waits for A -> DEADLOCK
    std::cout << "Thread 2 done" << std::endl;
}

int main() {
    std::thread t1(thread1), t2(thread2);
    t1.join(); t2.join();  // May hang forever!
    return 0;
}`}</CppCode>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Solution: std::scoped_lock</h2>

      <SyntaxBlock title="std::scoped_lock (C++17)">
        <p>
          <code>std::scoped_lock</code> locks multiple mutexes simultaneously using a deadlock-free
          algorithm. It is the preferred way to lock more than one mutex at a time.
        </p>
        <CppCode>{`std::scoped_lock lock(mtx_a, mtx_b);  // Locks both atomically
// Both mutexes released when lock goes out of scope`}</CppCode>
      </SyntaxBlock>

      <CppCode title="scoped_lock_fix.cpp">{`#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx_a, mtx_b;

void thread1() {
    std::scoped_lock lock(mtx_a, mtx_b);  // Deadlock-free!
    std::cout << "Thread 1 done" << std::endl;
}

void thread2() {
    std::scoped_lock lock(mtx_a, mtx_b);  // Same order doesn't matter
    std::cout << "Thread 2 done" << std::endl;
}

int main() {
    std::thread t1(thread1), t2(thread2);
    t1.join(); t2.join();
    std::cout << "No deadlock!" << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Thread 1 done
Thread 2 done
No deadlock!`}</OutputBlock>

      <NoteBlock type="info" title="std::lock (Pre-C++17)">
        <p>
          Before C++17, use <code>std::lock(mtx_a, mtx_b)</code> to lock multiple mutexes without
          deadlock, then adopt ownership with <code>std::lock_guard</code> using
          <code>std::adopt_lock</code>. <code>std::scoped_lock</code> replaces this pattern.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Deadlock Avoidance Strategies</h2>

      <NoteBlock type="tip" title="Lock Ordering">
        <p>
          If you always acquire mutexes in the same global order (e.g., by memory address or by
          an assigned hierarchy number), circular wait is impossible. This is simple but requires
          discipline across the entire codebase.
        </p>
      </NoteBlock>

      <NoteBlock type="important" title="try_lock for Timeout">
        <p>
          <code>std::unique_lock</code> with <code>std::try_to_lock</code> or
          <code>try_lock_for()</code> allows a thread to back off if a lock is unavailable, breaking
          the hold-and-wait condition. This is useful for building livelock-aware algorithms.
        </p>
      </NoteBlock>

      <CppCode title="try_lock example">{`#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx_a, mtx_b;

void safe_work() {
    while (true) {
        std::unique_lock<std::mutex> la(mtx_a, std::defer_lock);
        std::unique_lock<std::mutex> lb(mtx_b, std::defer_lock);
        if (std::try_lock(la, lb) == -1) {  // -1 means success
            std::cout << "Both locks acquired!" << std::endl;
            break;
        }
        // Back off and retry
    }
}

int main() {
    std::thread t1(safe_work), t2(safe_work);
    t1.join(); t2.join();
    return 0;
}`}</CppCode>

      <BestPracticeBlock title="Use std::scoped_lock for Multiple Mutexes">
        <p>
          Whenever you need to lock more than one mutex, use <code>std::scoped_lock</code>. It uses
          a deadlock avoidance algorithm internally, is exception-safe, and makes intent clear.
          For single mutexes, <code>std::lock_guard</code> or <code>std::unique_lock</code> suffices.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Fix the Deadlock"
        difficulty="intermediate"
        prompt="Given a transfer function between two BankAccount objects that deadlocks, fix it using std::scoped_lock so transfers in both directions work safely."
        hints={[
          "Replace the two separate lock_guard calls with one std::scoped_lock",
          "std::scoped_lock can take multiple mutexes",
          "Each BankAccount needs its own mutex member",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <thread>
#include <mutex>

struct Account {
    std::mutex mtx;
    double balance;
    Account(double b) : balance(b) {}
};

void transfer(Account& from, Account& to, double amount) {
    std::scoped_lock lock(from.mtx, to.mtx);
    if (from.balance >= amount) {
        from.balance -= amount;
        to.balance += amount;
        std::cout << "Transferred " << amount << std::endl;
    }
}

int main() {
    Account a(1000), b(1000);
    // Transfers in opposite directions - no deadlock!
    std::thread t1(transfer, std::ref(a), std::ref(b), 100.0);
    std::thread t2(transfer, std::ref(b), std::ref(a), 50.0);
    t1.join(); t2.join();
    std::cout << "A: " << a.balance << " B: " << b.balance << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::scoped_lock', url: 'https://en.cppreference.com/w/cpp/thread/scoped_lock', description: 'Deadlock-free RAII multi-mutex lock (C++17)' },
        { type: 'cppreference', title: 'std::lock', url: 'https://en.cppreference.com/w/cpp/thread/lock', description: 'Lock multiple mutexes without deadlock' },
        { type: 'textbook', title: 'C++ Concurrency in Action', author: 'Anthony Williams', description: 'Chapter 3: Deadlock and how to avoid it' },
      ]} />
    </div>
  )
}
