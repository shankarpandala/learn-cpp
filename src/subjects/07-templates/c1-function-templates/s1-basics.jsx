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

export default function S1Basics() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Function templates allow you to write a single function definition that works with any data type.
        Instead of writing separate overloads for <code>int</code>, <code>double</code>, and <code>std::string</code>,
        you write one template and let the compiler generate the specialized versions for you.
      </p>

      <DefinitionBlock title="Function Template">
        <p>
          A <strong>function template</strong> is a blueprint for creating functions. The compiler uses the
          template to generate concrete functions (called <strong>template instantiations</strong>) for each
          set of type arguments the template is used with.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Defining a Function Template</h2>

      <SyntaxBlock title="template&lt;typename T&gt;">
        <p>
          The <code>template</code> keyword followed by angle brackets containing one or more <strong>template
          parameters</strong> introduces a template. <code>typename</code> (or equivalently <code>class</code>)
          declares a type parameter.
        </p>
        <CppCode>{`template<typename T>
T maxValue(T a, T b) {
    return (a > b) ? a : b;
}`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Using a function template">{`#include <iostream>
#include <string>

template<typename T>
T maxValue(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    std::cout << maxValue(3, 7) << std::endl;
    std::cout << maxValue(3.14, 2.72) << std::endl;
    std::cout << maxValue(std::string("apple"), std::string("banana")) << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`7
3.14
banana`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Type Deduction</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        When you call a function template, the compiler can usually <strong>deduce</strong> the template
        arguments from the function arguments. You can also specify them explicitly.
      </p>

      <CppCode title="Implicit vs explicit instantiation">{`#include <iostream>

template<typename T>
T square(T x) {
    return x * x;
}

int main() {
    // Implicit deduction: T = int
    std::cout << square(5) << std::endl;

    // Explicit specification: T = double
    std::cout << square<double>(5) << std::endl;

    // Explicit needed when types differ from arguments
    std::cout << square<long long>(100000) << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`25
25
10000000000`}</OutputBlock>

      <NoteBlock type="info" title="typename vs class">
        <p>
          In template parameter lists, <code>typename</code> and <code>class</code> are interchangeable.
          Modern C++ style prefers <code>typename</code> because the parameter need not be a class type --
          it can be any type including <code>int</code> or <code>double</code>.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Multiple Template Parameters</h2>

      <CppCode title="Two type parameters">{`#include <iostream>

template<typename T, typename U>
auto add(T a, U b) -> decltype(a + b) {
    return a + b;
}

int main() {
    std::cout << add(3, 4.5) << std::endl;    // int + double -> double
    std::cout << add(1.5f, 2) << std::endl;    // float + int -> float
    return 0;
}`}</CppCode>

      <OutputBlock>{`7.5
3.5`}</OutputBlock>

      <BestPracticeBlock title="Keep templates in header files">
        <p>
          Because the compiler needs to see the full template definition at the point of instantiation,
          function templates should be defined in header files, not in <code>.cpp</code> files. This is
          different from ordinary functions, which are typically declared in headers and defined in source files.
        </p>
      </BestPracticeBlock>

      <CompilerNoteBlock compiler="all" title="Template Instantiation Errors">
        <p>
          Template code is only checked for basic syntax when defined. Type-related errors appear only
          when the template is <strong>instantiated</strong> with a specific type. Error messages from
          template instantiation failures can be lengthy -- read from the bottom up for the root cause.
        </p>
      </CompilerNoteBlock>

      <NoteBlock type="history" title="Origins of Templates">
        <p>
          Templates were introduced to C++ in 1990 and standardized in C++98. They form the foundation
          of the Standard Template Library (STL), which provides generic containers and algorithms.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Write a Generic Swap"
        difficulty="beginner"
        prompt="Write a function template called mySwap that takes two references of the same type and swaps their values. Test it with int and std::string."
        hints={[
          "Use T& (reference) parameters so the original values are modified",
          "You need a temporary variable of type T to perform the swap",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <string>

template<typename T>
void mySwap(T& a, T& b) {
    T temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 10, y = 20;
    mySwap(x, y);
    std::cout << x << " " << y << std::endl;

    std::string s1 = "hello", s2 = "world";
    mySwap(s1, s2);
    std::cout << s1 << " " << s2 << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Function templates', url: 'https://en.cppreference.com/w/cpp/language/function_template', description: 'Complete reference for function template syntax and rules' },
        { type: 'cppreference', title: 'Template parameters', url: 'https://en.cppreference.com/w/cpp/language/template_parameters', description: 'Template parameter types and syntax' },
        { type: 'textbook', title: 'C++ Templates: The Complete Guide', author: 'David Vandevoorde, Nicolai Josuttis, Douglas Gregor', description: 'Chapter 1: Function Templates' },
      ]} />
    </div>
  )
}
