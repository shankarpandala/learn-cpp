import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import WarningBlock from '../../../components/content/WarningBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S3SafeCoding() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Modern C++ offers tools and guidelines to write safer code without sacrificing performance.
        The C++ Core Guidelines, the Guidelines Support Library (GSL), and safer standard library
        abstractions like <code>std::span</code> help prevent entire categories of bugs at compile time.
      </p>

      <DefinitionBlock title="C++ Core Guidelines">
        <p>
          The C++ Core Guidelines are a comprehensive set of rules and best practices edited by
          Bjarne Stroustrup and Herb Sutter. They cover resource management, concurrency, error
          handling, and more, with the goal of making C++ safer and more consistent without
          sacrificing performance.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Guidelines Support Library (GSL)</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The GSL provides types recommended by the Core Guidelines. Key types include
        <code> gsl::not_null</code>, <code>gsl::span</code> (now <code>std::span</code> in C++20),
        <code> gsl::narrow</code>, and <code>gsl::finally</code>.
      </p>

      <CppCode title="gsl::not_null prevents null pointers">{`#include <gsl/gsl>  // Microsoft GSL
#include <iostream>
#include <memory>

// Function guarantees non-null parameter
void process(gsl::not_null<int*> ptr) {
    std::cout << "Value: " << *ptr << "\\n";
}

int main() {
    int value = 42;
    process(&value);           // OK

    // int* null_ptr = nullptr;
    // process(null_ptr);      // Fails at runtime (or compile time)

    auto sp = std::make_shared<int>(99);
    gsl::not_null<std::shared_ptr<int>> safe_sp = sp;
    std::cout << "Shared: " << *safe_sp << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`Value: 42
Shared: 99`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::span for Safe Array Access</h2>

      <CppCode title="std::span replaces pointer+size pairs">{`#include <iostream>
#include <span>
#include <vector>
#include <array>

// Old style: raw pointer + size (error-prone)
// void process(int* data, size_t size);

// Modern: std::span (safe, no ownership)
void printElements(std::span<const int> data) {
    for (int val : data) {
        std::cout << val << " ";
    }
    std::cout << "\\n";
}

double average(std::span<const double> values) {
    double sum = 0.0;
    for (double v : values) sum += v;
    return values.empty() ? 0.0 : sum / values.size();
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    std::vector<int> vec = {10, 20, 30};
    std::array<int, 4> sarr = {100, 200, 300, 400};

    // span works with any contiguous container
    printElements(arr);
    printElements(vec);
    printElements(sarr);

    // Subspans
    std::span<int> full(arr);
    printElements(full.subspan(1, 3));  // {2, 3, 4}

    std::vector<double> vals = {3.0, 4.0, 5.0};
    std::cout << "Average: " << average(vals) << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`1 2 3 4 5
10 20 30
100 200 300 400
2 3 4
Average: 4`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Safe Alternatives Cheat Sheet</h2>

      <NoteBlock type="tip" title="Replace Unsafe Patterns">
        <p>
          <strong>Raw pointers for ownership</strong> -- use <code>std::unique_ptr</code> or
          <code> std::shared_ptr</code>.<br />
          <strong>C arrays</strong> -- use <code>std::array</code> or <code>std::vector</code>.<br />
          <strong>Pointer + size</strong> -- use <code>std::span</code>.<br />
          <strong>Nullable pointers</strong> -- use <code>std::optional</code> or
          <code> gsl::not_null</code>.<br />
          <strong>Narrowing conversions</strong> -- use <code>gsl::narrow</code> or
          <code> static_cast</code> with validation.<br />
          <strong>Manual cleanup</strong> -- use RAII and <code>gsl::finally</code>.
        </p>
      </NoteBlock>

      <WarningBlock title="Narrowing Conversions">
        <p>
          Implicit narrowing conversions (e.g., <code>int</code> to <code>short</code>) silently
          lose data. Use <code>gsl::narrow&lt;T&gt;(value)</code> which throws on data loss, or
          enable compiler warnings with <code>-Wconversion</code>.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Adopt the Core Guidelines incrementally">
        <p>
          You do not need to adopt every guideline at once. Start with resource management (RAII),
          use smart pointers consistently, enable warnings (<code>-Wall -Wextra -Wpedantic</code>),
          and gradually adopt <code>std::span</code>, <code>gsl::not_null</code>, and static analysis.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Refactor to Safe Code"
        difficulty="intermediate"
        prompt="Refactor the following unsafe function to use std::span and remove raw pointer arithmetic: void sum(const int* data, int size, int* result) { *result = 0; for (int i = 0; i < size; ++i) result[0] += data[i]; }"
        hints={[
          "Replace const int* data + int size with std::span<const int>",
          "Return the result instead of using an output pointer",
          "Use a range-based for loop over the span",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <span>
#include <vector>

int sum(std::span<const int> data) {
    int result = 0;
    for (int val : data) {
        result += val;
    }
    return result;
}

int main() {
    std::vector<int> values = {10, 20, 30, 40, 50};
    int total = sum(values);
    std::cout << "Sum: " << total << "\\n";  // 150
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'article', title: 'C++ Core Guidelines', url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines', author: 'Bjarne Stroustrup, Herb Sutter', description: 'The complete C++ Core Guidelines' },
        { type: 'cppreference', title: 'std::span', url: 'https://en.cppreference.com/w/cpp/container/span', description: 'Non-owning contiguous view reference' },
        { type: 'article', title: 'Microsoft GSL', url: 'https://github.com/microsoft/GSL', description: 'Guidelines Support Library implementation' },
      ]} />
    </div>
  )
}
