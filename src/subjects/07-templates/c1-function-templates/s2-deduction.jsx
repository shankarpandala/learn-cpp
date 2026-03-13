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

export default function S2Deduction() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Template argument deduction is the process by which the compiler determines the template arguments
        from the types of function arguments. Understanding deduction rules is essential for writing templates
        that behave as expected, especially when references, const qualifiers, and forwarding are involved.
      </p>

      <DefinitionBlock title="Template Argument Deduction">
        <p>
          <strong>Template argument deduction</strong> is the compiler's ability to infer template type
          parameters from the arguments passed to a function template, eliminating the need to
          explicitly specify them at the call site.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic Deduction Rules</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        When a function parameter has type <code>T</code>, <code>T&</code>, or <code>const T&</code>,
        the compiler deduces <code>T</code> differently depending on the form.
      </p>

      <CppCode title="Deduction with value, reference, and const reference">{`#include <iostream>
#include <typeinfo>

template<typename T> void byValue(T param) {
    std::cout << "byValue: " << typeid(T).name() << std::endl;
}

template<typename T> void byRef(T& param) {
    std::cout << "byRef: " << typeid(T).name() << std::endl;
}

template<typename T> void byConstRef(const T& param) {
    std::cout << "byConstRef: " << typeid(T).name() << std::endl;
}

int main() {
    int x = 42;
    const int cx = 42;

    byValue(x);       // T = int (const/ref stripped)
    byValue(cx);      // T = int (const stripped)
    byRef(x);         // T = int
    byRef(cx);        // T = const int
    byConstRef(x);    // T = int
    byConstRef(cx);   // T = int (const already in parameter)
    return 0;
}`}</CppCode>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">auto and decltype</h2>

      <SyntaxBlock title="auto Type Deduction">
        <p>
          The <code>auto</code> keyword uses the same deduction rules as template argument deduction.
          It deduces the type of a variable from its initializer.
        </p>
        <CppCode>{`auto x = 42;          // int
auto y = 3.14;        // double
const auto& z = x;    // const int&
auto* p = &x;         // int*`}</CppCode>
      </SyntaxBlock>

      <SyntaxBlock title="decltype">
        <p>
          <code>decltype</code> inspects the declared type of an expression without evaluating it.
          Unlike <code>auto</code>, it preserves references and const qualifiers exactly.
        </p>
        <CppCode>{`int x = 42;
decltype(x) a = x;       // int (named variable -> declared type)
decltype((x)) b = x;     // int& (parenthesized lvalue -> lvalue ref)
decltype(42) c = 42;     // int (prvalue -> type)`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Trailing Return Types</h2>

      <CppCode title="Trailing return type with decltype">{`#include <iostream>

template<typename T, typename U>
auto multiply(T a, U b) -> decltype(a * b) {
    return a * b;
}

// C++14: auto return type deduction (no trailing type needed)
template<typename T, typename U>
auto divide(T a, U b) {
    return a / b;
}

int main() {
    std::cout << multiply(3, 4.5) << std::endl;   // 13.5
    std::cout << divide(10, 3) << std::endl;       // 3
    std::cout << divide(10.0, 3) << std::endl;     // 3.33333
    return 0;
}`}</CppCode>

      <OutputBlock>{`13.5
3
3.33333`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">decltype(auto)</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++14 introduced <code>decltype(auto)</code>, which deduces a type using <code>decltype</code> rules
        rather than <code>auto</code> rules. This is critical when you need to preserve reference-ness.
      </p>

      <CppCode title="decltype(auto) preserving references">{`#include <iostream>
#include <vector>

std::vector<int> vec = {1, 2, 3};

// auto return: returns by value (copy)
auto getByAuto(size_t i) {
    return vec[i];
}

// decltype(auto) return: returns int& (reference)
decltype(auto) getByDecltype(size_t i) {
    return vec[i];
}

int main() {
    getByDecltype(0) = 99;  // modifies vec[0]
    std::cout << vec[0] << std::endl;  // 99
    return 0;
}`}</CppCode>

      <OutputBlock>{`99`}</OutputBlock>

      <WarningBlock title="decltype(auto) pitfall">
        <p>
          Be careful with parentheses when using <code>decltype(auto)</code>. Adding extra parentheses
          changes the deduced type: <code>decltype(auto) f() {"{"} return x; {"}"}</code> returns by value,
          but <code>decltype(auto) f() {"{"} return (x); {"}"}</code> returns a reference, which can
          create dangling references if <code>x</code> is a local variable.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Use auto for simplicity, decltype(auto) for precision">
        <p>
          Use <code>auto</code> return types for most functions where you want the natural value type.
          Reserve <code>decltype(auto)</code> for generic forwarding functions where preserving the
          exact type (including references) matters, such as in wrapper or proxy functions.
        </p>
      </BestPracticeBlock>

      <NoteBlock type="tip" title="Deduction guides in C++17">
        <p>
          C++17 added class template argument deduction (CTAD), allowing the compiler to deduce class
          template parameters from constructor arguments. For example, <code>std::pair p(1, 2.0);</code> deduces
          to <code>std::pair&lt;int, double&gt;</code>.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Return Type Deduction"
        difficulty="intermediate"
        prompt="Write a function template called safeDiv that takes two parameters of potentially different types and returns the result of dividing them. Use a trailing return type to ensure the correct return type. Handle division by zero by returning 0."
        hints={[
          "Use template<typename T, typename U> with a trailing return type",
          "The trailing return type should be -> decltype(a / b)",
          "Check if b == 0 before dividing",
        ]}
        solution={
          <CppCode>{`#include <iostream>

template<typename T, typename U>
auto safeDiv(T a, U b) -> decltype(a / b) {
    if (b == 0) return 0;
    return a / b;
}

int main() {
    std::cout << safeDiv(10, 3) << std::endl;
    std::cout << safeDiv(10.0, 3.0) << std::endl;
    std::cout << safeDiv(5, 0) << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Template argument deduction', url: 'https://en.cppreference.com/w/cpp/language/template_argument_deduction', description: 'Complete deduction rules' },
        { type: 'cppreference', title: 'decltype specifier', url: 'https://en.cppreference.com/w/cpp/language/decltype', description: 'decltype semantics and examples' },
        { type: 'cppreference', title: 'auto specifier', url: 'https://en.cppreference.com/w/cpp/language/auto', description: 'auto type deduction rules' },
      ]} />
    </div>
  )
}
