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

export default function S1FuturePromise() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>std::future</code> and <code>std::promise</code> form a one-shot communication channel
        between threads. A promise sets a value (or exception) in one thread, and a future retrieves
        it in another. This decouples the producer of a result from its consumer.
      </p>

      <DefinitionBlock title="Future and Promise">
        <p>
          A <strong>std::promise</strong> is the writing end of a one-time channel: it sets a value
          or an exception. A <strong>std::future</strong> is the reading end: it waits for and
          retrieves the result. Together they provide a thread-safe mechanism for returning
          results from asynchronous operations. Defined in <code>&lt;future&gt;</code>.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic Usage</h2>

      <SyntaxBlock title="Promise-Future Pattern">
        <p>
          Create a <code>std::promise</code>, obtain its associated <code>std::future</code>,
          pass the promise to a worker thread, and call <code>get()</code> on the future
          to retrieve the result. <code>get()</code> blocks until the value is available.
        </p>
        <CppCode>{`std::promise<T> prom;
std::future<T> fut = prom.get_future();
// In worker thread: prom.set_value(result);
// In main thread:   T value = fut.get();`}</CppCode>
      </SyntaxBlock>

      <CppCode title="promise_future.cpp">{`#include <iostream>
#include <thread>
#include <future>

void compute_square(std::promise<int> prom, int value) {
    std::this_thread::sleep_for(std::chrono::milliseconds(200));
    prom.set_value(value * value);
}

int main() {
    std::promise<int> prom;
    std::future<int> fut = prom.get_future();

    std::thread t(compute_square, std::move(prom), 7);

    std::cout << "Waiting for result..." << std::endl;
    int result = fut.get();  // Blocks until value is set
    std::cout << "7 squared = " << result << std::endl;

    t.join();
    return 0;
}`}</CppCode>

      <OutputBlock>{`Waiting for result...
7 squared = 49`}</OutputBlock>

      <NoteBlock type="important" title="Promises are Move-Only">
        <p>
          A <code>std::promise</code> cannot be copied, only moved. When passing to a thread, use
          <code>std::move()</code>. The future associated with a promise can only be retrieved once
          via <code>get_future()</code>, and <code>get()</code> can only be called once on a future.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Exception Propagation</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        If the worker thread encounters an error, it can set an exception on the promise.
        When the consumer calls <code>get()</code>, the exception is rethrown in the consumer's thread.
      </p>

      <CppCode title="exception_propagation.cpp">{`#include <iostream>
#include <thread>
#include <future>
#include <stdexcept>

void risky_work(std::promise<int> prom) {
    try {
        throw std::runtime_error("Something went wrong!");
        prom.set_value(42);
    } catch (...) {
        prom.set_exception(std::current_exception());
    }
}

int main() {
    std::promise<int> prom;
    std::future<int> fut = prom.get_future();

    std::thread t(risky_work, std::move(prom));

    try {
        int val = fut.get();  // Rethrows the exception
        std::cout << val << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Caught: " << e.what() << std::endl;
    }

    t.join();
    return 0;
}`}</CppCode>

      <OutputBlock>{`Caught: Something went wrong!`}</OutputBlock>

      <WarningBlock title="Broken Promises">
        <p>
          If a <code>std::promise</code> is destroyed without setting a value or exception, calling
          <code>get()</code> on the associated future throws <code>std::future_error</code> with
          the error code <code>broken_promise</code>. Always ensure the promise is fulfilled.
        </p>
      </WarningBlock>

      <NoteBlock type="tip" title="wait() and wait_for()">
        <p>
          Use <code>fut.wait()</code> to block without retrieving the value, or
          <code>fut.wait_for(duration)</code> to block with a timeout. The return value indicates
          whether the result is ready, timed out, or deferred.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Prefer std::async Over Raw Promises">
        <p>
          For simple fire-and-forget computations, <code>std::async</code> is simpler than manually
          creating promise-future pairs. Reserve raw promises for cases where you need explicit
          control over when and where the value is set, such as callback-based APIs.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Multi-Worker Aggregation"
        difficulty="intermediate"
        prompt="Create three threads that each compute the sum of a portion of an array. Use promise-future pairs to return partial sums to main, where they are combined into a total."
        hints={[
          "Create three std::promise<long long> objects and get their futures",
          "Move each promise into its respective thread",
          "Call get() on all three futures and sum the results",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <thread>
#include <future>
#include <vector>
#include <numeric>

void partial_sum(std::promise<long long> prom,
                 const std::vector<int>& data, int start, int end) {
    long long sum = 0;
    for (int i = start; i < end; ++i) sum += data[i];
    prom.set_value(sum);
}

int main() {
    std::vector<int> data(900);
    std::iota(data.begin(), data.end(), 1);

    std::vector<std::promise<long long>> proms(3);
    std::vector<std::future<long long>> futs;
    for (auto& p : proms) futs.push_back(p.get_future());

    int chunk = 300;
    std::vector<std::thread> threads;
    for (int i = 0; i < 3; ++i)
        threads.emplace_back(partial_sum, std::move(proms[i]),
            std::cref(data), i * chunk, (i + 1) * chunk);

    long long total = 0;
    for (auto& f : futs) total += f.get();
    for (auto& t : threads) t.join();

    std::cout << "Total: " << total << std::endl;  // 405450
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::future', url: 'https://en.cppreference.com/w/cpp/thread/future', description: 'Future class for asynchronous result retrieval' },
        { type: 'cppreference', title: 'std::promise', url: 'https://en.cppreference.com/w/cpp/thread/promise', description: 'Promise class for setting asynchronous results' },
        { type: 'textbook', title: 'C++ Concurrency in Action', author: 'Anthony Williams', description: 'Chapter 4: Futures and promises' },
      ]} />
    </div>
  )
}
