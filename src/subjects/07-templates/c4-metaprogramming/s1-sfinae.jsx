import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import WarningBlock from '../../../components/content/WarningBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S1Sfinae() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        SFINAE -- Substitution Failure Is Not An Error -- is one of the most important principles in
        C++ template metaprogramming. It allows the compiler to silently discard template overloads
        that would result in invalid code, rather than producing a hard error. Before C++20 concepts,
        SFINAE was the primary mechanism for constraining templates.
      </p>

      <DefinitionBlock title="SFINAE">
        <p>
          <strong>Substitution Failure Is Not An Error (SFINAE)</strong> is a C++ language rule stating
          that when substituting template arguments into a function template declaration produces an
          invalid type or expression, the template is simply removed from the overload set instead of
          causing a compilation error.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic SFINAE</h2>

      <CppCode title="SFINAE in action">{`#include <iostream>
#include <type_traits>

// Enabled only for integral types
template<typename T>
typename std::enable_if<std::is_integral<T>::value, T>::type
process(T val) {
    std::cout << "Integer: " << val << std::endl;
    return val;
}

// Enabled only for floating-point types
template<typename T>
typename std::enable_if<std::is_floating_point<T>::value, T>::type
process(T val) {
    std::cout << "Float: " << val << std::endl;
    return val;
}

int main() {
    process(42);
    process(3.14);
    // process("hello"); // Error: no matching overload
    return 0;
}`}</CppCode>

      <OutputBlock>{`Integer: 42
Float: 3.14`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::enable_if</h2>

      <SyntaxBlock title="enable_if syntax">
        <p>
          <code>std::enable_if&lt;condition, T&gt;::type</code> is defined as <code>T</code> when
          <code>condition</code> is <code>true</code>, and is undefined (triggering SFINAE) when
          <code>condition</code> is <code>false</code>. The C++14 alias <code>std::enable_if_t</code> is
          more concise.
        </p>
        <CppCode>{`// C++11 verbose form
template<typename T>
typename std::enable_if<condition, ReturnType>::type func(T);

// C++14 alias form
template<typename T>
std::enable_if_t<condition, ReturnType> func(T);

// As default template parameter
template<typename T, std::enable_if_t<condition, int> = 0>
ReturnType func(T);`}</CppCode>
      </SyntaxBlock>

      <CppCode title="enable_if as default template parameter">{`#include <iostream>
#include <type_traits>

template<typename T, std::enable_if_t<std::is_integral_v<T>, int> = 0>
void describe(T val) {
    std::cout << val << " is an integer type" << std::endl;
}

template<typename T, std::enable_if_t<std::is_floating_point_v<T>, int> = 0>
void describe(T val) {
    std::cout << val << " is a floating-point type" << std::endl;
}

int main() {
    describe(42);
    describe(3.14);
    describe(true);
    return 0;
}`}</CppCode>

      <OutputBlock>{`42 is an integer type
3.14 is a floating-point type
1 is an integer type`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Detecting Member Functions</h2>

      <CppCode title="Detecting if a type has a toString method">{`#include <iostream>
#include <string>
#include <type_traits>

// Detection idiom using void_t (C++17)
template<typename, typename = void>
struct has_toString : std::false_type {};

template<typename T>
struct has_toString<T, std::void_t<decltype(std::declval<T>().toString())>>
    : std::true_type {};

template<typename T>
std::enable_if_t<has_toString<T>::value, std::string>
stringify(const T& obj) {
    return obj.toString();
}

template<typename T>
std::enable_if_t<!has_toString<T>::value, std::string>
stringify(const T& val) {
    return "no toString available";
}

struct Widget {
    std::string toString() const { return "Widget"; }
};

int main() {
    Widget w;
    std::cout << stringify(w) << std::endl;
    std::cout << stringify(42) << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Widget
no toString available`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Tag Dispatch</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Tag dispatch is an alternative to SFINAE that uses overload resolution on tag types to select
        the correct implementation. It can be cleaner for dispatching on type categories.
      </p>

      <CppCode title="Tag dispatch example">{`#include <iostream>
#include <type_traits>

template<typename T>
void advanceImpl(T& iter, int n, std::random_access_iterator_tag) {
    iter += n;
    std::cout << "Random access advance" << std::endl;
}

template<typename T>
void advanceImpl(T& iter, int n, std::input_iterator_tag) {
    for (int i = 0; i < n; ++i) ++iter;
    std::cout << "Linear advance" << std::endl;
}

template<typename Iter>
void myAdvance(Iter& iter, int n) {
    advanceImpl(iter, n,
        typename std::iterator_traits<Iter>::iterator_category{});
}

#include <vector>
#include <list>
int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    auto vi = v.begin();
    myAdvance(vi, 3);

    std::list<int> l = {1, 2, 3, 4, 5};
    auto li = l.begin();
    myAdvance(li, 3);
    return 0;
}`}</CppCode>

      <OutputBlock>{`Random access advance
Linear advance`}</OutputBlock>

      <WarningBlock title="SFINAE error messages are cryptic">
        <p>
          When SFINAE-based constraints fail, the compiler reports that no overload matches, but does
          not explain <em>why</em> each candidate was rejected. This makes debugging difficult. In
          C++20 and later, prefer concepts for much clearer diagnostics.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Prefer concepts over SFINAE in C++20">
        <p>
          If you can target C++20, use concepts instead of SFINAE. Concepts provide the same constraining
          power with dramatically better error messages and more readable code. SFINAE remains relevant
          for codebases that must support C++11/14/17.
        </p>
      </BestPracticeBlock>

      <NoteBlock type="history" title="Origin of SFINAE">
        <p>
          SFINAE was not designed as a feature -- it emerged as a consequence of how C++ template
          overload resolution works. The term was coined by David Vandevoorde in the book "C++ Templates."
          Over time, the community discovered powerful metaprogramming patterns built on this behavior.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="SFINAE-based Serialization"
        difficulty="advanced"
        prompt="Write two overloads of a function serialize: one for types that have a .serialize() method (returns std::string), and one fallback that uses std::to_string. Use std::enable_if and the detection idiom."
        hints={[
          "Create a has_serialize trait similar to has_toString above",
          "Use std::void_t and decltype to detect the serialize() method",
          "Use enable_if to select the correct overload",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <string>
#include <type_traits>

template<typename, typename = void>
struct has_serialize : std::false_type {};

template<typename T>
struct has_serialize<T, std::void_t<decltype(std::declval<T>().serialize())>>
    : std::true_type {};

template<typename T>
std::enable_if_t<has_serialize<T>::value, std::string>
serialize(const T& obj) {
    return obj.serialize();
}

template<typename T>
std::enable_if_t<!has_serialize<T>::value, std::string>
serialize(const T& val) {
    return std::to_string(val);
}

struct Data {
    int x;
    std::string serialize() const { return "Data(" + std::to_string(x) + ")"; }
};

int main() {
    Data d{42};
    std::cout << serialize(d) << std::endl;
    std::cout << serialize(100) << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'SFINAE', url: 'https://en.cppreference.com/w/cpp/language/sfinae', description: 'SFINAE rules and examples' },
        { type: 'cppreference', title: 'std::enable_if', url: 'https://en.cppreference.com/w/cpp/types/enable_if', description: 'enable_if utility for SFINAE' },
        { type: 'cppreference', title: 'std::void_t', url: 'https://en.cppreference.com/w/cpp/types/void_t', description: 'Helper for SFINAE detection idiom' },
      ]} />
    </div>
  )
}
