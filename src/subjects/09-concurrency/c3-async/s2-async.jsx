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

export default function S2Async() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>std::async</code> is the simplest way to run a function asynchronously and retrieve
        its result. It manages thread creation, promise-future wiring, and exception propagation
        automatically, letting you write concurrent code with minimal boilerplate.
      </p>

      <DefinitionBlock title="What is std::async?">
        <p>
          <code>std::async</code> launches a callable asynchronously (potentially in a new thread)
          and returns a <code>std::future</code> holding the eventual result. It abstracts away
          thread management and promise creation. Defined in <code>&lt;future&gt;</code>.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic Usage</h2>

      <SyntaxBlock title="std::async Syntax">
        <p>
          Call <code>std::async</code> with an optional launch policy, a callable, and its arguments.
          The return type is <code>std::future&lt;ReturnType&gt;</code>.
        </p>
        <CppCode>{`auto future = std::async(launch_policy, callable, args...);
T result = future.get();  // Blocks until result is ready`}</CppCode>
      </SyntaxBlock>

      <CppCode title="async_basics.cpp">{`#include <iostream>
#include <future>
#include <cmath>

double heavy_computation(double x) {
    // Simulate expensive work
    double result = 0;
    for (int i = 0; i < 1000000; ++i)
        result += std::sin(x + i) * std::cos(x - i);
    return result;
}

int main() {
    auto fut1 = std::async(std::launch::async, heavy_computation, 1.0);
    auto fut2 = std::async(std::launch::async, heavy_computation, 2.0);

    // Both computations run in parallel
    std::cout << "Computing..." << std::endl;

    double r1 = fut1.get();
    double r2 = fut2.get();
    std::cout << "Result 1: " << r1 << std::endl;
    std::cout << "Result 2: " << r2 << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Computing...
Result 1: -0.210372
Result 2: 0.416147`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Launch Policies</h2>

      <NoteBlock type="info" title="launch::async vs launch::deferred">
        <p>
          <code>std::launch::async</code> runs the function in a new thread immediately.
          <code>std::launch::deferred</code> delays execution until <code>get()</code> or
          <code>wait()</code> is called, running it in the calling thread. The default policy
          is <code>async | deferred</code>, letting the implementation choose.
        </p>
      </NoteBlock>

      <CppCode title="launch_policies.cpp">{`#include <iostream>
#include <future>
#include <thread>

int work(const std::string& label) {
    std::cout << label << " running on thread "
              << std::this_thread::get_id() << std::endl;
    return 42;
}

int main() {
    std::cout << "Main thread: " << std::this_thread::get_id() << std::endl;

    // Guaranteed to run in a new thread
    auto f1 = std::async(std::launch::async, work, "Async");

    // Runs lazily in calling thread when get() is called
    auto f2 = std::async(std::launch::deferred, work, "Deferred");

    f1.get();
    f2.get();  // "Deferred" runs HERE, in main thread
    return 0;
}`}</CppCode>

      <OutputBlock>{`Main thread: 140234567890
Async running on thread 140234567456
Deferred running on thread 140234567890`}</OutputBlock>

      <WarningBlock title="Async Future Destructor Blocks">
        <p>
          The future returned by <code>std::async</code> blocks in its destructor until the
          asynchronous task completes. If you discard the future, the call becomes synchronous.
          Always store the returned future in a variable.
        </p>
      </WarningBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Exception Propagation</h2>

      <CppCode title="Exceptions through async">{`#include <iostream>
#include <future>
#include <stdexcept>

int may_fail(bool should_fail) {
    if (should_fail)
        throw std::runtime_error("Task failed!");
    return 100;
}

int main() {
    auto fut = std::async(std::launch::async, may_fail, true);
    try {
        int val = fut.get();  // Exception rethrown here
    } catch (const std::exception& e) {
        std::cout << "Caught: " << e.what() << std::endl;
    }
    return 0;
}`}</CppCode>

      <OutputBlock>{`Caught: Task failed!`}</OutputBlock>

      <NoteBlock type="tip" title="Default Policy Pitfall">
        <p>
          With the default policy, you cannot predict which thread runs the task. If your code
          relies on thread-local state or assumes parallel execution, explicitly specify
          <code>std::launch::async</code>. Use <code>std::launch::deferred</code> for lazy
          evaluation when parallelism is not needed.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Use std::async for Simple Parallelism">
        <p>
          For straightforward parallel tasks that return a value, <code>std::async</code> is the
          cleanest option. It handles thread lifecycle, exception forwarding, and result delivery.
          Use raw threads and promises only when you need finer control over thread behavior.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Parallel File Processing"
        difficulty="intermediate"
        prompt="Simulate processing three files in parallel using std::async. Each task should return the 'file size' (use a random number). Print all results after all tasks complete."
        hints={[
          "Use std::async(std::launch::async, ...) for each file",
          "Store futures in a vector",
          "Call get() on each future to collect results",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <future>
#include <vector>
#include <string>
#include <random>

int process_file(const std::string& filename) {
    std::mt19937 rng(std::hash<std::string>{}(filename));
    std::uniform_int_distribution<int> dist(100, 10000);
    int size = dist(rng);
    std::this_thread::sleep_for(std::chrono::milliseconds(100));
    std::cout << "Processed " << filename << std::endl;
    return size;
}

int main() {
    std::vector<std::string> files = {"data.csv", "log.txt", "config.json"};
    std::vector<std::future<int>> futures;

    for (const auto& f : files)
        futures.push_back(std::async(std::launch::async, process_file, f));

    for (size_t i = 0; i < files.size(); ++i)
        std::cout << files[i] << ": " << futures[i].get() << " bytes" << std::endl;

    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::async', url: 'https://en.cppreference.com/w/cpp/thread/async', description: 'Asynchronous task launcher' },
        { type: 'cppreference', title: 'std::launch', url: 'https://en.cppreference.com/w/cpp/thread/launch', description: 'Launch policy enumeration' },
        { type: 'textbook', title: 'Effective Modern C++', author: 'Scott Meyers', description: 'Item 36: Specify std::launch::async if asynchronicity is essential' },
      ]} />
    </div>
  )
}
