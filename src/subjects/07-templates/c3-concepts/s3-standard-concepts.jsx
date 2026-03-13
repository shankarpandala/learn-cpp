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

export default function S3StandardConcepts() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The C++20 standard library provides a rich set of predefined concepts in the <code>&lt;concepts&gt;</code> and
        <code> &lt;ranges&gt;</code> headers. These standard concepts cover common requirements like arithmetic
        operations, comparison, copying, and range-based iteration, saving you from reinventing
        constraints for everyday use cases.
      </p>

      <DefinitionBlock title="Standard Library Concepts">
        <p>
          <strong>Standard library concepts</strong> are predefined concepts in namespace <code>std</code> that
          express fundamental type requirements. They serve as building blocks for constraining your
          own templates and are organized into categories: core language concepts, comparison concepts,
          object concepts, and callable concepts.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Core Language Concepts</h2>

      <SyntaxBlock title="Arithmetic and type concepts">
        <p>
          The <code>&lt;concepts&gt;</code> header provides fundamental type classification concepts
          that mirror the type traits but with cleaner syntax.
        </p>
        <CppCode>{`#include <concepts>

std::integral<T>          // int, long, char, bool, etc.
std::floating_point<T>    // float, double, long double
std::signed_integral<T>   // signed integers only
std::unsigned_integral<T> // unsigned integers only
std::same_as<T, U>        // T and U are exactly the same type
std::convertible_to<From, To>  // From is implicitly convertible to To
std::derived_from<Derived, Base> // Derived inherits from Base`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Using core concepts">{`#include <iostream>
#include <concepts>

template<std::integral T>
T bitwiseOr(T a, T b) {
    return a | b;
}

template<std::floating_point T>
T average(T a, T b) {
    return (a + b) / T(2);
}

int main() {
    std::cout << bitwiseOr(0b1010, 0b1100) << std::endl;  // 14
    std::cout << average(3.0, 7.0) << std::endl;            // 5
    // bitwiseOr(3.5, 2.5);  // Error: double is not integral
    return 0;
}`}</CppCode>

      <OutputBlock>{`14
5`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Object Concepts</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Object concepts describe how types can be constructed, copied, moved, and assigned.
      </p>

      <CppCode title="Object concepts in practice">{`#include <iostream>
#include <concepts>
#include <memory>

// std::copyable: copy constructible and copy assignable
template<std::copyable T>
T duplicate(const T& val) {
    return val;
}

// std::movable: move constructible and move assignable
template<std::movable T>
void transfer(T& dest, T&& src) {
    dest = std::move(src);
}

int main() {
    int x = duplicate(42);
    std::cout << x << std::endl;

    std::string s1, s2 = "hello";
    transfer(s1, std::move(s2));
    std::cout << s1 << std::endl;

    // duplicate(std::make_unique<int>(5)); // Error: unique_ptr not copyable
    return 0;
}`}</CppCode>

      <OutputBlock>{`42
hello`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Comparison Concepts</h2>

      <CppCode title="Comparison concepts">{`#include <iostream>
#include <concepts>
#include <vector>
#include <algorithm>

template<std::totally_ordered T>
T clamp(T val, T lo, T hi) {
    if (val < lo) return lo;
    if (val > hi) return hi;
    return val;
}

template<std::equality_comparable T>
bool contains(const std::vector<T>& vec, const T& target) {
    for (const auto& elem : vec)
        if (elem == target) return true;
    return false;
}

int main() {
    std::cout << clamp(15, 0, 10) << std::endl;
    std::cout << clamp(-5, 0, 10) << std::endl;

    std::vector<std::string> words = {"hello", "world"};
    std::cout << std::boolalpha;
    std::cout << contains(words, std::string("world")) << std::endl;
    std::cout << contains(words, std::string("foo")) << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`10
0
true
false`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Range Concepts</h2>

      <CppCode title="Using std::ranges concepts">{`#include <iostream>
#include <ranges>
#include <vector>
#include <list>

template<std::ranges::range R>
void printRange(const R& r) {
    for (const auto& elem : r)
        std::cout << elem << " ";
    std::cout << std::endl;
}

template<std::ranges::random_access_range R>
auto middle(const R& r) {
    auto sz = std::ranges::size(r);
    return r[sz / 2];
}

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    std::list<double> l = {1.1, 2.2, 3.3};

    printRange(v);
    printRange(l);
    std::cout << "Middle: " << middle(v) << std::endl;
    // middle(l); // Error: list is not random_access_range
    return 0;
}`}</CppCode>

      <OutputBlock>{`1 2 3 4 5
1.1 2.2 3.3
Middle: 3`}</OutputBlock>

      <NoteBlock type="tip" title="Concept hierarchy">
        <p>
          Standard concepts form a hierarchy. For example, <code>std::regular</code> subsumes both
          <code>std::semiregular</code> and <code>std::equality_comparable</code>. Similarly,
          <code>std::random_access_range</code> subsumes <code>std::bidirectional_range</code>,
          which subsumes <code>std::forward_range</code>. Use the most specific concept that fits
          your requirements.
        </p>
      </NoteBlock>

      <WarningBlock title="Do not over-constrain">
        <p>
          Only constrain what your function actually needs. Requiring <code>std::regular</code> when
          you only need <code>std::equality_comparable</code> unnecessarily restricts usable types.
          Over-constraining reduces the generality of your template.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Prefer standard concepts over custom ones">
        <p>
          Before defining your own concept, check if a standard concept already expresses the requirement.
          Standard concepts are well-tested, properly subsume each other for overload resolution, and
          are immediately recognizable to other C++ developers.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Constrained Accumulate"
        difficulty="intermediate"
        prompt="Write a function template accumulate that takes a std::ranges::range and an initial value, and sums all elements. Constrain the range's value type to be convertible to the accumulator type using standard concepts."
        hints={[
          "Use std::ranges::range to constrain the first parameter",
          "Use std::ranges::range_value_t<R> to get the element type",
          "Add a requires clause checking std::convertible_to",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <ranges>
#include <concepts>
#include <vector>
#include <list>

template<std::ranges::range R, typename T>
    requires std::convertible_to<std::ranges::range_value_t<R>, T>
T accumulate(const R& range, T init) {
    for (const auto& elem : range)
        init += static_cast<T>(elem);
    return init;
}

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    std::list<double> l = {1.1, 2.2, 3.3};

    std::cout << accumulate(v, 0) << std::endl;
    std::cout << accumulate(l, 0.0) << std::endl;
    std::cout << accumulate(v, 0.0) << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Standard library concepts', url: 'https://en.cppreference.com/w/cpp/concepts', description: 'Complete list of standard concepts' },
        { type: 'cppreference', title: 'Range concepts', url: 'https://en.cppreference.com/w/cpp/ranges#Range_concepts', description: 'Range-related concepts from <ranges>' },
        { type: 'textbook', title: 'C++20: The Complete Guide', author: 'Nicolai Josuttis', description: 'Standard concepts and their relationships' },
      ]} />
    </div>
  )
}
