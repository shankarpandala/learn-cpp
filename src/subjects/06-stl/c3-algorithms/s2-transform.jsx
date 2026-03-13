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

export default function S2Transform() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The STL provides a family of algorithms for transforming, accumulating, and manipulating
        ranges of elements. These algorithms express common operations declaratively, making code
        more readable and less error-prone than hand-written loops.
      </p>

      <DefinitionBlock title="Transforming Algorithms">
        <p>
          Algorithms like <code>std::transform</code>, <code>std::for_each</code>, <code>std::copy</code>,
          <code> std::fill</code>, and <code>std::generate</code> apply operations across ranges of
          elements. <code>std::accumulate</code> (from <code>&lt;numeric&gt;</code>) reduces a range
          to a single value.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::transform and std::accumulate</h2>

      <CppCode title="transform_accumulate.cpp">{`#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
#include <string>

int main() {
    std::vector<int> nums = {1, 2, 3, 4, 5};

    // Transform: square each element into a new vector
    std::vector<int> squares(nums.size());
    std::transform(nums.begin(), nums.end(), squares.begin(),
                   [](int x) { return x * x; });

    std::cout << "Squares: ";
    for (int s : squares) std::cout << s << " ";
    std::cout << std::endl;

    // Accumulate: sum of squares
    int sum = std::accumulate(squares.begin(), squares.end(), 0);
    std::cout << "Sum of squares: " << sum << std::endl;

    // Accumulate with custom operation: product
    int product = std::accumulate(nums.begin(), nums.end(), 1,
                                  std::multiplies<int>());
    std::cout << "Product: " << product << std::endl;

    // Transform strings to uppercase
    std::string text = "hello world";
    std::transform(text.begin(), text.end(), text.begin(), ::toupper);
    std::cout << text << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Squares: 1 4 9 16 25
Sum of squares: 55
Product: 120
HELLO WORLD`}</OutputBlock>

      <SyntaxBlock title="std::transform Syntax">
        <p>
          The unary form <code>transform(first, last, dest, op)</code> applies <code>op</code> to each
          element in <code>[first, last)</code> and writes the result to <code>dest</code>. The binary
          form <code>transform(first1, last1, first2, dest, op)</code> applies <code>op</code> to
          pairs of elements from two ranges.
        </p>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">copy, fill, generate, and for_each</h2>

      <CppCode title="copy_fill_generate.cpp">{`#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>

int main() {
    // std::fill: set all elements to a value
    std::vector<int> filled(5);
    std::fill(filled.begin(), filled.end(), 42);

    // std::generate: fill with generated values
    std::vector<int> generated(6);
    int counter = 0;
    std::generate(generated.begin(), generated.end(),
                  [&counter]() { return counter++ * 10; });

    // std::copy with ostream_iterator for printing
    std::cout << "Filled:    ";
    std::copy(filled.begin(), filled.end(),
              std::ostream_iterator<int>(std::cout, " "));
    std::cout << std::endl;

    std::cout << "Generated: ";
    std::copy(generated.begin(), generated.end(),
              std::ostream_iterator<int>(std::cout, " "));
    std::cout << std::endl;

    // std::for_each: apply side-effecting operation
    std::cout << "Doubled:   ";
    std::for_each(generated.begin(), generated.end(),
                  [](int x) { std::cout << x * 2 << " "; });
    std::cout << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Filled:    42 42 42 42 42
Generated: 0 10 20 30 40 50
Doubled:   0 20 40 60 80 100`}</OutputBlock>

      <NoteBlock type="tip" title="std::ostream_iterator">
        <p>
          <code>std::ostream_iterator</code> is an output iterator that writes each assigned value
          to a stream with an optional delimiter. Combined with <code>std::copy</code>, it provides
          a concise way to print container contents without writing a loop.
        </p>
      </NoteBlock>

      <WarningBlock title="Ensure Destination Has Enough Space">
        <p>
          <code>std::transform</code> and <code>std::copy</code> write to a destination iterator
          without checking bounds. The destination must have enough space already allocated, or you
          must use <code>std::back_inserter</code> to append elements dynamically.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Prefer algorithms over raw loops">
        <p>
          Using <code>std::transform</code> and <code>std::accumulate</code> communicates intent
          more clearly than equivalent for loops. They also compose well with lambdas and are easier
          for the compiler to optimize. Prefer them when the operation maps cleanly to the algorithm.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Normalize a Vector"
        difficulty="intermediate"
        prompt="Given a vector of doubles, use std::accumulate to compute the sum, then std::transform to divide each element by the sum, producing a vector of normalized values that sum to 1.0."
        hints={[
          "Compute the sum first with std::accumulate",
          "Use std::transform with a lambda that captures the sum",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
    std::vector<double> vals = {10.0, 20.0, 30.0, 40.0};
    double total = std::accumulate(vals.begin(), vals.end(), 0.0);
    std::vector<double> norm(vals.size());
    std::transform(vals.begin(), vals.end(), norm.begin(),
                   [total](double x) { return x / total; });
    for (double v : norm) std::cout << v << " ";
    std::cout << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::transform', url: 'https://en.cppreference.com/w/cpp/algorithm/transform', description: 'Apply a function to a range' },
        { type: 'cppreference', title: 'std::accumulate', url: 'https://en.cppreference.com/w/cpp/algorithm/accumulate', description: 'Reduce a range to a single value' },
        { type: 'textbook', title: 'Effective STL', author: 'Scott Meyers', description: 'Item 43: Prefer algorithm calls to hand-written loops' },
      ]} />
    </div>
  )
}
