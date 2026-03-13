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

export default function S2ConditionVars() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        A <code>std::condition_variable</code> allows threads to wait for a condition to become true
        without busy-waiting. One thread waits until notified by another thread, enabling efficient
        inter-thread communication patterns like producer-consumer queues.
      </p>

      <DefinitionBlock title="What is a Condition Variable?">
        <p>
          A <strong>condition variable</strong> is a synchronization primitive that blocks a thread
          until another thread signals that a shared condition has changed. It is always used with
          a <code>std::mutex</code> and a predicate (boolean condition) to guard against spurious
          wakeups. Defined in <code>&lt;condition_variable&gt;</code>.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic Usage</h2>

      <SyntaxBlock title="wait / notify Pattern">
        <p>
          The waiting thread locks a mutex, then calls <code>wait()</code> with a predicate.
          The notifying thread modifies the shared state under the mutex, then calls
          <code>notify_one()</code> or <code>notify_all()</code>.
        </p>
        <CppCode>{`// Waiter
std::unique_lock<std::mutex> lock(mtx);
cv.wait(lock, []{ return condition; });

// Notifier
{
    std::lock_guard<std::mutex> lock(mtx);
    condition = true;
}
cv.notify_one();`}</CppCode>
      </SyntaxBlock>

      <CppCode title="simple_signal.cpp">{`#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>

std::mutex mtx;
std::condition_variable cv;
bool ready = false;

void worker() {
    std::unique_lock<std::mutex> lock(mtx);
    cv.wait(lock, []{ return ready; });
    std::cout << "Worker proceeding after signal!" << std::endl;
}

int main() {
    std::thread t(worker);

    std::this_thread::sleep_for(std::chrono::milliseconds(500));
    {
        std::lock_guard<std::mutex> lock(mtx);
        ready = true;
    }
    cv.notify_one();
    t.join();
    return 0;
}`}</CppCode>

      <OutputBlock>{`Worker proceeding after signal!`}</OutputBlock>

      <WarningBlock title="Spurious Wakeups">
        <p>
          A condition variable may wake a thread even when no notification was sent. This is called
          a <strong>spurious wakeup</strong>. Always use a predicate with <code>wait()</code> to
          recheck the condition. Never use <code>wait()</code> without a predicate in production code.
        </p>
      </WarningBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Producer-Consumer Pattern</h2>

      <CppCode title="producer_consumer.cpp">{`#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <queue>

std::mutex mtx;
std::condition_variable cv;
std::queue<int> buffer;
bool done = false;

void producer() {
    for (int i = 1; i <= 5; ++i) {
        {
            std::lock_guard<std::mutex> lock(mtx);
            buffer.push(i);
            std::cout << "Produced: " << i << std::endl;
        }
        cv.notify_one();
    }
    {
        std::lock_guard<std::mutex> lock(mtx);
        done = true;
    }
    cv.notify_one();
}

void consumer() {
    while (true) {
        std::unique_lock<std::mutex> lock(mtx);
        cv.wait(lock, []{ return !buffer.empty() || done; });

        while (!buffer.empty()) {
            std::cout << "Consumed: " << buffer.front() << std::endl;
            buffer.pop();
        }
        if (done && buffer.empty()) break;
    }
}

int main() {
    std::thread prod(producer);
    std::thread cons(consumer);
    prod.join();
    cons.join();
    return 0;
}`}</CppCode>

      <OutputBlock>{`Produced: 1
Produced: 2
Consumed: 1
Consumed: 2
Produced: 3
Produced: 4
Produced: 5
Consumed: 3
Consumed: 4
Consumed: 5`}</OutputBlock>

      <NoteBlock type="info" title="notify_one vs notify_all">
        <p>
          <code>notify_one()</code> wakes exactly one waiting thread (chosen by the OS). Use it when
          only one thread should respond. <code>notify_all()</code> wakes all waiting threads. Use it
          when multiple threads may need to re-evaluate the condition, such as when a shared resource
          is released.
        </p>
      </NoteBlock>

      <NoteBlock type="tip" title="Notification Before Wait">
        <p>
          If <code>notify_one()</code> is called before any thread is waiting, the notification is
          lost. This is safe if you use a predicate, because the waiting thread will check the
          condition and proceed immediately without blocking.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Always Use a Predicate with wait()">
        <p>
          Use the two-argument form <code>cv.wait(lock, predicate)</code> instead of the bare
          <code>cv.wait(lock)</code>. The predicate version handles spurious wakeups correctly and
          makes the code's intent clear. The predicate should check the actual shared state.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Bounded Buffer"
        difficulty="advanced"
        prompt="Implement a bounded producer-consumer buffer with a maximum capacity of 3. The producer should block when the buffer is full and the consumer should block when it is empty."
        hints={[
          "Use two condition variables: one for 'not full' and one for 'not empty'",
          "The producer waits on 'not full' and notifies 'not empty'",
          "The consumer waits on 'not empty' and notifies 'not full'",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <queue>

const int MAX_SIZE = 3;
std::queue<int> buffer;
std::mutex mtx;
std::condition_variable not_full, not_empty;

void producer() {
    for (int i = 1; i <= 8; ++i) {
        std::unique_lock<std::mutex> lock(mtx);
        not_full.wait(lock, []{ return buffer.size() < MAX_SIZE; });
        buffer.push(i);
        std::cout << "Produced: " << i
                  << " (size: " << buffer.size() << ")" << std::endl;
        not_empty.notify_one();
    }
}

void consumer() {
    for (int i = 0; i < 8; ++i) {
        std::unique_lock<std::mutex> lock(mtx);
        not_empty.wait(lock, []{ return !buffer.empty(); });
        int val = buffer.front();
        buffer.pop();
        std::cout << "Consumed: " << val << std::endl;
        not_full.notify_one();
    }
}

int main() {
    std::thread p(producer), c(consumer);
    p.join(); c.join();
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::condition_variable', url: 'https://en.cppreference.com/w/cpp/thread/condition_variable', description: 'Condition variable documentation' },
        { type: 'cppreference', title: 'std::condition_variable_any', url: 'https://en.cppreference.com/w/cpp/thread/condition_variable_any', description: 'Works with any lockable type, not just unique_lock' },
        { type: 'textbook', title: 'C++ Concurrency in Action', author: 'Anthony Williams', description: 'Chapter 4: Synchronizing concurrent operations' },
      ]} />
    </div>
  )
}
