import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import WarningBlock from '../../../components/content/WarningBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import CompilerNoteBlock from '../../../components/content/CompilerNoteBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S2Coroutines() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++20 coroutines allow functions to be suspended and resumed, enabling lazy evaluation,
        generators, and asynchronous programming. A function becomes a coroutine when it uses
        any of the three coroutine keywords: <code>co_await</code>, <code>co_yield</code>,
        or <code>co_return</code>.
      </p>

      <DefinitionBlock title="Coroutine">
        <p>
          A coroutine is a function that can suspend execution at certain points and be resumed
          later. Unlike regular functions that run to completion, coroutines maintain their state
          (local variables, execution position) across suspensions. C++20 provides the language
          primitives; library support is left to the user or third-party libraries.
        </p>
      </DefinitionBlock>

      <SyntaxBlock title="Coroutine Keywords">
        <p>
          Three keywords mark suspension and return points within a coroutine body.
        </p>
        <CppCode>{`co_await expr;    // suspend until expr is ready
co_yield expr;    // suspend and produce a value
co_return expr;   // complete the coroutine with a final value`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Building a Generator</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        A <strong>generator</strong> is the most common coroutine pattern. It lazily produces a
        sequence of values, one at a time, using <code>co_yield</code>.
      </p>

      <CppCode title="generator.cpp">{`#include <iostream>
#include <coroutine>

template <typename T>
struct Generator {
    struct promise_type {
        T current_value;

        Generator get_return_object() {
            return Generator{
                std::coroutine_handle<promise_type>::from_promise(*this)
            };
        }

        std::suspend_always initial_suspend() { return {}; }
        std::suspend_always final_suspend() noexcept { return {}; }
        std::suspend_always yield_value(T value) {
            current_value = value;
            return {};
        }
        void return_void() {}
        void unhandled_exception() { std::terminate(); }
    };

    std::coroutine_handle<promise_type> handle;

    Generator(std::coroutine_handle<promise_type> h) : handle(h) {}
    ~Generator() { if (handle) handle.destroy(); }

    // Move-only
    Generator(const Generator&) = delete;
    Generator(Generator&& other) noexcept : handle(other.handle) {
        other.handle = nullptr;
    }

    bool next() {
        handle.resume();
        return !handle.done();
    }

    T value() const { return handle.promise().current_value; }
};

Generator<int> range(int start, int end) {
    for (int i = start; i < end; ++i) {
        co_yield i;
    }
}

int main() {
    auto gen = range(1, 6);
    while (gen.next()) {
        std::cout << gen.value() << " ";
    }
    std::cout << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`1 2 3 4 5`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Lazy Fibonacci Sequence</h2>

      <CppCode title="fibonacci.cpp">{`#include <iostream>
#include <coroutine>

// Using the Generator template from above

template <typename T>
struct Generator { /* same as above */ };

Generator<long long> fibonacci() {
    long long a = 0, b = 1;
    while (true) {
        co_yield a;
        auto next = a + b;
        a = b;
        b = next;
    }
}

int main() {
    auto fib = fibonacci();
    for (int i = 0; i < 10 && fib.next(); ++i) {
        std::cout << fib.value() << " ";
    }
    std::cout << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`0 1 1 2 3 5 8 13 21 34`}</OutputBlock>

      <NoteBlock type="info" title="The promise_type Contract">
        <p>
          Every coroutine return type must have a nested <code>promise_type</code> that defines how
          the coroutine behaves: <code>get_return_object()</code> creates the return object,
          <code>initial_suspend()</code> controls whether it starts lazily, <code>yield_value()</code>
          handles <code>co_yield</code>, and <code>final_suspend()</code> determines cleanup behavior.
        </p>
      </NoteBlock>

      <WarningBlock title="No standard generator until C++23">
        <p>
          C++20 provides only the coroutine primitives (<code>coroutine_handle</code>,
          <code>suspend_always</code>, etc.). A standard <code>std::generator</code> was added in
          C++23. In C++20, you must write your own generator type or use a library.
        </p>
      </WarningBlock>

      <CompilerNoteBlock compiler="gcc" title="GCC Coroutine Support">
        <p>
          GCC supports coroutines with <code>-std=c++20 -fcoroutines</code>. The coroutine header
          is <code>&lt;coroutine&gt;</code>. Earlier versions used the experimental header.
        </p>
      </CompilerNoteBlock>

      <BestPracticeBlock title="Use generators for lazy sequences">
        <p>
          Generators are ideal when you need to produce values on demand rather than computing an
          entire collection upfront. They save memory for large or infinite sequences, and
          computation only happens when the consumer requests the next value.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Filtered Generator"
        difficulty="advanced"
        prompt="Write a coroutine 'evenNumbers' that yields even numbers from 0 up to a given limit. Use the Generator template shown above."
        hints={[
          "Loop from 0 to the limit",
          "Use co_yield only when the number is even",
          "Test with a limit of 10 to get 0, 2, 4, 6, 8",
        ]}
        solution={
          <CppCode>{`// Assuming Generator<T> template defined as above

Generator<int> evenNumbers(int limit) {
    for (int i = 0; i <= limit; i += 2) {
        co_yield i;
    }
}

int main() {
    auto gen = evenNumbers(10);
    while (gen.next()) {
        std::cout << gen.value() << " ";
    }
    std::cout << "\\n";
    // Output: 0 2 4 6 8 10
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Coroutines (C++20)', url: 'https://en.cppreference.com/w/cpp/language/coroutines', description: 'Coroutine language specification' },
        { type: 'cppreference', title: 'std::coroutine_handle', url: 'https://en.cppreference.com/w/cpp/coroutine/coroutine_handle', description: 'Handle to a suspended coroutine' },
        { type: 'textbook', title: 'C++20 - The Complete Guide', author: 'Nicolai Josuttis', description: 'Chapter 14: Coroutines' },
      ]} />
    </div>
  )
}
