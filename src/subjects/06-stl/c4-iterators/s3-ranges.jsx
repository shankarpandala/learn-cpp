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

export default function S3Ranges() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++20 introduced the Ranges library, a major evolution of the STL that replaces the
        iterator-pair pattern with range objects and composable view adaptors. Ranges enable a
        pipeline style of programming where transformations are chained using the pipe
        operator (<code>|</code>) and evaluated lazily.
      </p>

      <DefinitionBlock title="Ranges and Views">
        <p>
          A <strong>range</strong> is anything that provides <code>begin()</code> and <code>end()</code> --
          all standard containers are ranges. A <strong>view</strong> is a lightweight, non-owning range
          that applies a transformation lazily. Views are cheap to copy and compose. The library is
          defined in <code>&lt;ranges&gt;</code> and <code>&lt;algorithm&gt;</code>.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Pipe Syntax and View Adaptors</h2>

      <CppCode title="ranges_basics.cpp">{`#include <iostream>
#include <vector>
#include <ranges>

int main() {
    std::vector<int> nums = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    // Pipe syntax: filter even numbers, square them, take first 3
    auto result = nums
        | std::views::filter([](int n) { return n % 2 == 0; })
        | std::views::transform([](int n) { return n * n; })
        | std::views::take(3);

    std::cout << "Result: ";
    for (int val : result) {
        std::cout << val << " ";
    }
    std::cout << std::endl;

    // Views are lazy: nothing is computed until iteration
    // The original vector is unchanged
    std::cout << "Original size: " << nums.size() << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Result: 4 16 36
Original size: 10`}</OutputBlock>

      <SyntaxBlock title="Common View Adaptors">
        <p>
          <code>std::views::filter(pred)</code> -- keep elements where pred is true.<br />
          <code>std::views::transform(fn)</code> -- apply fn to each element.<br />
          <code>std::views::take(n)</code> -- take the first n elements.<br />
          <code>std::views::drop(n)</code> -- skip the first n elements.<br />
          <code>std::views::reverse</code> -- reverse the range.<br />
          <code>std::views::iota(start)</code> -- generate an infinite sequence starting at start.
        </p>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Lazy Evaluation and Infinite Ranges</h2>

      <CppCode title="lazy_infinite.cpp">{`#include <iostream>
#include <ranges>
#include <vector>
#include <algorithm>

int main() {
    // std::views::iota generates an infinite sequence
    // Combined with take, we get the first N values
    auto first_squares = std::views::iota(1)
        | std::views::transform([](int n) { return n * n; })
        | std::views::take(5);

    std::cout << "First 5 squares: ";
    for (int s : first_squares) {
        std::cout << s << " ";
    }
    std::cout << std::endl;

    // Range-based algorithms: no begin/end needed
    std::vector<int> data = {5, 3, 8, 1, 9, 2, 7};
    std::ranges::sort(data);

    std::cout << "Sorted: ";
    for (int d : data) std::cout << d << " ";
    std::cout << std::endl;

    // Find with ranges
    auto it = std::ranges::find(data, 7);
    if (it != data.end()) {
        std::cout << "Found 7 at index "
                  << std::distance(data.begin(), it) << std::endl;
    }
    return 0;
}`}</CppCode>

      <OutputBlock>{`First 5 squares: 1 4 9 16 25
Sorted: 1 2 3 5 7 8 9
Found 7 at index 4`}</OutputBlock>

      <NoteBlock type="info" title="Lazy Evaluation">
        <p>
          Views do not store computed results. Each element is computed on demand during iteration.
          This means chaining multiple views does not create intermediate containers. An element
          flows through the entire pipeline only when requested, making views memory-efficient even
          for large or infinite sequences.
        </p>
      </NoteBlock>

      <NoteBlock type="history" title="Evolution of Ranges">
        <p>
          The Ranges library originated from Eric Niebler's range-v3 library and was standardized
          in C++20. C++23 adds more views like <code>std::views::zip</code>, <code>std::views::chunk</code>,
          and <code>std::views::slide</code>, further expanding the composable toolkit.
        </p>
      </NoteBlock>

      <CompilerNoteBlock compiler="all" title="Compiler Support">
        <p>
          Ranges require a C++20-compliant compiler. GCC 10+, Clang 13+, and MSVC 19.29+ all support
          the core ranges features. Compile with <code>-std=c++20</code> (GCC/Clang) or
          <code> /std:c++20</code> (MSVC).
        </p>
      </CompilerNoteBlock>

      <BestPracticeBlock title="Use ranges for declarative data pipelines">
        <p>
          Ranges let you express data transformations as a sequence of composable steps, similar to
          functional programming. Prefer the pipe syntax for readability when chaining multiple
          operations. Use <code>std::ranges::*</code> algorithm overloads to pass containers directly
          instead of iterator pairs.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="FizzBuzz with Ranges"
        difficulty="intermediate"
        prompt="Use std::views::iota to generate numbers 1 through 20. Use std::views::transform to convert each number to a string: 'Fizz' for multiples of 3, 'Buzz' for multiples of 5, 'FizzBuzz' for both, or the number itself. Print each result."
        hints={[
          "std::views::iota(1, 21) generates integers from 1 to 20",
          "Use std::to_string for converting integers to strings",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <ranges>
#include <string>

int main() {
    auto fizzbuzz = std::views::iota(1, 21)
        | std::views::transform([](int n) -> std::string {
            if (n % 15 == 0) return "FizzBuzz";
            if (n % 3 == 0)  return "Fizz";
            if (n % 5 == 0)  return "Buzz";
            return std::to_string(n);
        });

    for (const auto& s : fizzbuzz) {
        std::cout << s << " ";
    }
    std::cout << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Ranges library', url: 'https://en.cppreference.com/w/cpp/ranges', description: 'C++20 Ranges library overview' },
        { type: 'cppreference', title: 'std::views::filter', url: 'https://en.cppreference.com/w/cpp/ranges/filter_view', description: 'Filter view adaptor' },
        { type: 'textbook', title: 'C++20: The Complete Guide', author: 'Nicolai Josuttis', description: 'Chapter 6: Ranges and Views' },
      ]} />
    </div>
  )
}
