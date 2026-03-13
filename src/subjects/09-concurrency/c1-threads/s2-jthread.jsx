import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import CompilerNoteBlock from '../../../components/content/CompilerNoteBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S2Jthread() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++20 introduced <code>std::jthread</code> (joining thread), which improves
        upon <code>std::thread</code> by automatically joining in its destructor and supporting
        cooperative cancellation through stop tokens. This eliminates an entire class of bugs
        where threads are accidentally left joinable at destruction time.
      </p>

      <DefinitionBlock title="What is std::jthread?">
        <p>
          <code>std::jthread</code> is a RAII-based thread class defined in <code>&lt;thread&gt;</code>.
          When a <code>jthread</code> object is destroyed, it automatically requests a stop and joins
          the thread. It also provides built-in cooperative cancellation via <code>std::stop_token</code>.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Automatic Joining</h2>

      <CppCode title="jthread_basics.cpp">{`#include <iostream>
#include <thread>

int main() {
    {
        std::jthread t([]() {
            std::cout << "Working in jthread..." << std::endl;
        });
        // No explicit join needed!
        // Destructor calls request_stop() then join()
    }
    std::cout << "jthread automatically joined." << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Working in jthread...
jthread automatically joined.`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Cooperative Cancellation</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The key feature of <code>std::jthread</code> is cooperative cancellation. The thread function
        can accept a <code>std::stop_token</code> as its first parameter and periodically check whether
        a stop has been requested.
      </p>

      <SyntaxBlock title="stop_token Pattern">
        <p>
          When the callable's first parameter is <code>std::stop_token</code>, the <code>jthread</code>
          automatically passes its internal stop token. The thread checks
          <code>stop_token.stop_requested()</code> to know when to exit gracefully.
        </p>
        <CppCode>{`std::jthread t([](std::stop_token stoken) {
    while (!stoken.stop_requested()) {
        // do work
    }
});`}</CppCode>
      </SyntaxBlock>

      <CppCode title="cooperative_cancel.cpp">{`#include <iostream>
#include <thread>
#include <chrono>

int main() {
    std::jthread worker([](std::stop_token stoken) {
        int count = 0;
        while (!stoken.stop_requested()) {
            std::cout << "Working... iteration " << ++count << std::endl;
            std::this_thread::sleep_for(std::chrono::milliseconds(200));
        }
        std::cout << "Stop requested, cleaning up." << std::endl;
    });

    std::this_thread::sleep_for(std::chrono::seconds(1));
    worker.request_stop();  // Signal the thread to stop
    // Destructor joins automatically
    std::cout << "Worker stopped gracefully." << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Working... iteration 1
Working... iteration 2
Working... iteration 3
Working... iteration 4
Working... iteration 5
Stop requested, cleaning up.
Worker stopped gracefully.`}</OutputBlock>

      <NoteBlock type="info" title="stop_source and stop_token">
        <p>
          A <code>std::stop_source</code> produces <code>std::stop_token</code> objects. The
          <code>jthread</code> owns a stop source internally. You can also retrieve it via
          <code>get_stop_source()</code> and <code>get_stop_token()</code> to share cancellation
          signals across multiple components.
        </p>
      </NoteBlock>

      <NoteBlock type="tip" title="stop_callback">
        <p>
          You can register a <code>std::stop_callback</code> on a stop token. The callback executes
          when a stop is requested, enabling reactive cleanup patterns such as closing sockets or
          cancelling I/O operations without polling.
        </p>
      </NoteBlock>

      <CompilerNoteBlock compiler="all" title="C++20 Required">
        <p>
          <code>std::jthread</code> requires C++20 or later. Compile with <code>-std=c++20</code> (GCC/Clang)
          or <code>/std:c++20</code> (MSVC). GCC 10+, Clang 14+, and MSVC 19.28+ support jthread.
        </p>
      </CompilerNoteBlock>

      <BestPracticeBlock title="Prefer jthread Over thread">
        <p>
          In C++20 and later, prefer <code>std::jthread</code> over <code>std::thread</code>. It
          prevents resource leaks from forgotten joins and provides a clean cancellation mechanism.
          Use <code>std::thread</code> only when you need compatibility with pre-C++20 codebases.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Periodic Logger with Cancellation"
        difficulty="intermediate"
        prompt="Write a jthread that logs a timestamp every 500ms. Use stop_token to stop it after 2 seconds. Register a stop_callback that prints a farewell message."
        hints={[
          "Use std::stop_token as the first parameter of the lambda",
          "Use std::chrono::steady_clock::now() for timestamps",
          "Create a std::stop_callback before the sleep loop",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <thread>
#include <chrono>

int main() {
    auto start = std::chrono::steady_clock::now();

    std::jthread logger([start](std::stop_token stoken) {
        std::stop_callback cb(stoken, []() {
            std::cout << "Goodbye from logger!" << std::endl;
        });

        while (!stoken.stop_requested()) {
            auto elapsed = std::chrono::steady_clock::now() - start;
            auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(elapsed).count();
            std::cout << "Log at " << ms << "ms" << std::endl;
            std::this_thread::sleep_for(std::chrono::milliseconds(500));
        }
    });

    std::this_thread::sleep_for(std::chrono::seconds(2));
    logger.request_stop();
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::jthread', url: 'https://en.cppreference.com/w/cpp/thread/jthread', description: 'Joining thread with cooperative cancellation' },
        { type: 'cppreference', title: 'std::stop_token', url: 'https://en.cppreference.com/w/cpp/thread/stop_token', description: 'Stop token for cooperative cancellation' },
        { type: 'standard', title: 'P0660R10', author: 'Nicolai Josuttis et al.', description: 'Cooperative interruption proposal for C++20' },
      ]} />
    </div>
  )
}
