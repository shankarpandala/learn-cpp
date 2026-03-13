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

export default function S3ReturnTypes() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        A function's return type specifies what kind of value it sends back to the caller. C++
        offers several ways to return data, from simple values and references to modern features
        like <code>auto</code> deduction and structured bindings for multiple return values.
      </p>

      <DefinitionBlock title="Return Statement">
        <p>
          The <code>return</code> statement exits the function and optionally provides a value
          matching the declared return type. A function declared <code>void</code> returns nothing.
          Control flow must reach a <code>return</code> in every code path for non-void functions.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Returning Values</h2>

      <CppCode title="Returning a value">{`#include <iostream>

int square(int n) {
    return n * n;
}

int main() {
    int result = square(7);
    std::cout << "7 squared = " << result << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`7 squared = 49`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Void Functions</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Functions that perform an action without producing a result use <code>void</code> as the
        return type. You may use a bare <code>return;</code> to exit early but cannot return a value.
      </p>

      <CppCode title="Void function">{`#include <iostream>

void printDivider(int width) {
    for (int i = 0; i < width; ++i) {
        std::cout << '-';
    }
    std::cout << std::endl;
}

int main() {
    printDivider(20);
    std::cout << "  Section Title" << std::endl;
    printDivider(20);
    return 0;
}`}</CppCode>

      <OutputBlock>{`--------------------
  Section Title
--------------------`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Returning References</h2>

      <WarningBlock title="Danger: Returning References to Local Variables">
        <p>
          Returning a reference to a local variable creates a <strong>dangling reference</strong>.
          The local is destroyed when the function exits, leaving the reference pointing to invalid
          memory. This is undefined behavior.
        </p>
      </WarningBlock>

      <CppCode title="Safe vs unsafe reference returns">{`#include <iostream>
#include <vector>

// SAFE: returns reference to element that outlives the function
int& elementAt(std::vector<int>& vec, int index) {
    return vec[index];
}

// UNSAFE: returns reference to a local variable — undefined behavior!
// int& broken() {
//     int local = 42;
//     return local;  // dangling reference!
// }

int main() {
    std::vector<int> nums = {10, 20, 30};
    elementAt(nums, 1) = 99;  // modifies nums[1] directly
    std::cout << "nums[1] = " << nums[1] << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`nums[1] = 99`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Auto Return Type Deduction (C++14)</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Since C++14, you can use <code>auto</code> as the return type and let the compiler deduce
        it from the <code>return</code> statement.
      </p>

      <CppCode title="auto return type">{`#include <iostream>

auto multiply(double a, double b) {
    return a * b;  // compiler deduces return type as double
}

int main() {
    std::cout << "3.5 * 2.0 = " << multiply(3.5, 2.0) << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`3.5 * 2.0 = 7`}</OutputBlock>

      <CompilerNoteBlock compiler="all" title="C++14 Required">
        <p>
          Auto return type deduction requires the <code>-std=c++14</code> flag (or later). If all
          return statements produce different types, the program is ill-formed.
        </p>
      </CompilerNoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Returning Multiple Values</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++ functions return a single value, but you can use <code>std::pair</code>,
        <code>std::tuple</code>, or a struct to package multiple values. C++17 structured bindings
        make unpacking them clean and readable.
      </p>

      <CppCode title="std::pair and structured bindings">{`#include <iostream>
#include <utility>
#include <string>

std::pair<int, std::string> findOldest() {
    return {42, "Alice"};
}

int main() {
    // C++17 structured bindings
    auto [age, name] = findOldest();
    std::cout << name << " is " << age << " years old" << std::endl;

    // Without structured bindings (pre-C++17)
    auto result = findOldest();
    std::cout << result.second << " is " << result.first << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Alice is 42 years old
Alice is 42`}</OutputBlock>

      <NoteBlock type="tip" title="Prefer Structs for Named Fields">
        <p>
          When returning more than two values, a named struct is clearer than <code>std::tuple</code>.
          Fields like <code>result.name</code> are self-documenting, whereas <code>std::get&lt;0&gt;(result)</code> is
          not.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Return by Value for Most Cases">
        <p>
          Modern compilers apply <strong>copy elision</strong> (and Named Return Value Optimization),
          so returning objects by value is efficient. Avoid returning references or pointers unless
          the referenced object is guaranteed to outlive the caller.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Min and Max"
        difficulty="intermediate"
        prompt="Write a function that takes a std::vector<int> by const reference and returns both the minimum and maximum values as a std::pair<int, int>. Use structured bindings to unpack the result in main()."
        hints={[
          "Initialize min and max to the first element of the vector",
          "Use std::pair or std::make_pair to return two values",
          "Compile with -std=c++17 for structured bindings",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <vector>
#include <utility>

std::pair<int, int> minMax(const std::vector<int>& v) {
    int lo = v[0], hi = v[0];
    for (int x : v) {
        if (x < lo) lo = x;
        if (x > hi) hi = x;
    }
    return {lo, hi};
}

int main() {
    std::vector<int> data = {3, 7, 1, 9, 4};
    auto [lo, hi] = minMax(data);
    std::cout << "Min: " << lo << ", Max: " << hi << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::pair', url: 'https://en.cppreference.com/w/cpp/utility/pair', description: 'Pair class template for two-value returns' },
        { type: 'cppreference', title: 'std::tuple', url: 'https://en.cppreference.com/w/cpp/utility/tuple', description: 'Tuple class template for multi-value returns' },
        { type: 'cppreference', title: 'Structured bindings', url: 'https://en.cppreference.com/w/cpp/language/structured_binding', description: 'C++17 structured binding declarations' },
      ]} />
    </div>
  )
}
