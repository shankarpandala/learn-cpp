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

export default function S3PackagedTask() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>std::packaged_task</code> wraps a callable and automatically connects it to a
        <code>std::future</code>. Unlike <code>std::async</code>, it does not launch execution
        automatically, giving you control over <em>when</em> and <em>where</em> the task runs.
        This makes it a key building block for thread pools and task queues.
      </p>

      <DefinitionBlock title="What is std::packaged_task?">
        <p>
          <code>std::packaged_task&lt;R(Args...)&gt;</code> is a callable wrapper that packages a
          function with a promise. When invoked, the return value (or exception) is stored in the
          associated future. It is move-only and defined in <code>&lt;future&gt;</code>.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic Usage</h2>

      <SyntaxBlock title="packaged_task Pattern">
        <p>
          Create the task, extract the future, then invoke the task (either directly or in a thread).
          The result becomes available through the future.
        </p>
        <CppCode>{`std::packaged_task<int(int, int)> task(callable);
std::future<int> fut = task.get_future();
task(arg1, arg2);            // Invoke directly, or
std::thread t(std::move(task), arg1, arg2);  // In a thread
int result = fut.get();`}</CppCode>
      </SyntaxBlock>

      <CppCode title="packaged_task_demo.cpp">{`#include <iostream>
#include <future>
#include <thread>

int add(int a, int b) {
    std::this_thread::sleep_for(std::chrono::milliseconds(100));
    return a + b;
}

int main() {
    std::packaged_task<int(int, int)> task(add);
    std::future<int> result = task.get_future();

    std::thread t(std::move(task), 10, 20);

    std::cout << "Waiting for result..." << std::endl;
    std::cout << "10 + 20 = " << result.get() << std::endl;

    t.join();
    return 0;
}`}</CppCode>

      <OutputBlock>{`Waiting for result...
10 + 20 = 30`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Task Queue Pattern</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The real power of <code>packaged_task</code> is the ability to enqueue tasks for later
        execution. This is the foundation of thread pool designs: tasks are submitted to a queue,
        and worker threads pull and execute them.
      </p>

      <CppCode title="task_queue.cpp">{`#include <iostream>
#include <future>
#include <thread>
#include <queue>
#include <mutex>
#include <functional>

std::queue<std::packaged_task<int()>> task_queue;
std::mutex queue_mutex;

void worker() {
    while (true) {
        std::packaged_task<int()> task;
        {
            std::lock_guard<std::mutex> lock(queue_mutex);
            if (task_queue.empty()) break;
            task = std::move(task_queue.front());
            task_queue.pop();
        }
        task();  // Execute the task
    }
}

int main() {
    std::vector<std::future<int>> futures;

    // Enqueue tasks
    for (int i = 1; i <= 5; ++i) {
        std::packaged_task<int()> task([i]() {
            return i * i;
        });
        futures.push_back(task.get_future());
        std::lock_guard<std::mutex> lock(queue_mutex);
        task_queue.push(std::move(task));
    }

    // Process all tasks on a worker thread
    std::thread t(worker);
    t.join();

    for (int i = 0; i < 5; ++i)
        std::cout << (i + 1) << "^2 = " << futures[i].get() << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`1^2 = 1
2^2 = 4
3^2 = 9
4^2 = 16
5^2 = 25`}</OutputBlock>

      <NoteBlock type="info" title="packaged_task vs async vs promise">
        <p>
          <code>std::async</code> creates and runs a task immediately. <code>std::promise</code>
          gives manual control over value delivery. <code>std::packaged_task</code> sits in between:
          it wraps a callable with a future but lets you decide when to execute it. Use it when you
          need to decouple task creation from execution.
        </p>
      </NoteBlock>

      <WarningBlock title="packaged_task is Move-Only">
        <p>
          A <code>std::packaged_task</code> cannot be copied. Use <code>std::move()</code> when
          passing it to threads, queues, or containers. Calling a task more than once without
          <code>reset()</code> throws <code>std::future_error</code>.
        </p>
      </WarningBlock>

      <NoteBlock type="tip" title="reset() for Reuse">
        <p>
          Calling <code>task.reset()</code> creates a new shared state, allowing the task to be
          invoked again with a new future. The old future becomes invalid. This is useful for
          recurring computations in task pool scenarios.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Use packaged_task for Task Queues">
        <p>
          When building thread pools or task schedulers, prefer <code>std::packaged_task</code> over
          raw promise-thread combinations. It cleanly bundles the callable and its promise, making
          queue management straightforward and type-safe.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Simple Thread Pool"
        difficulty="advanced"
        prompt="Implement a simple thread pool with 2 worker threads that process packaged_tasks from a shared queue. Submit 6 tasks that each return their input doubled. Collect and print all results."
        hints={[
          "Use a std::queue<std::packaged_task<int()>> protected by a mutex",
          "Use a condition_variable to notify workers of new tasks",
          "Add a 'done' flag to signal workers to exit when all tasks are submitted",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <future>
#include <thread>
#include <queue>
#include <mutex>
#include <condition_variable>
#include <vector>

std::queue<std::packaged_task<int()>> tasks;
std::mutex mtx;
std::condition_variable cv;
bool done = false;

void pool_worker() {
    while (true) {
        std::packaged_task<int()> task;
        {
            std::unique_lock<std::mutex> lock(mtx);
            cv.wait(lock, []{ return !tasks.empty() || done; });
            if (tasks.empty() && done) return;
            task = std::move(tasks.front());
            tasks.pop();
        }
        task();
    }
}

int main() {
    std::thread w1(pool_worker), w2(pool_worker);
    std::vector<std::future<int>> results;

    for (int i = 1; i <= 6; ++i) {
        std::packaged_task<int()> t([i]{ return i * 2; });
        results.push_back(t.get_future());
        {
            std::lock_guard<std::mutex> lock(mtx);
            tasks.push(std::move(t));
        }
        cv.notify_one();
    }
    { std::lock_guard<std::mutex> lock(mtx); done = true; }
    cv.notify_all();
    w1.join(); w2.join();

    for (auto& f : results)
        std::cout << f.get() << " ";
    std::cout << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::packaged_task', url: 'https://en.cppreference.com/w/cpp/thread/packaged_task', description: 'Packaged task wrapper documentation' },
        { type: 'cppreference', title: 'std::future', url: 'https://en.cppreference.com/w/cpp/thread/future', description: 'Future for retrieving task results' },
        { type: 'textbook', title: 'C++ Concurrency in Action', author: 'Anthony Williams', description: 'Chapter 9: Advanced thread management and thread pools' },
      ]} />
    </div>
  )
}
