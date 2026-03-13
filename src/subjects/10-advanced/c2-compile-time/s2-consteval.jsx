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

export default function S2Consteval() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++20 introduced <code>consteval</code> for functions that must be evaluated at compile time, and
        <code> constinit</code> to ensure variables are constant-initialized. Together they provide
        stronger guarantees than <code>constexpr</code> and help eliminate the static initialization
        order fiasco.
      </p>

      <DefinitionBlock title="consteval (Immediate Functions)">
        <p>
          A <code>consteval</code> function must produce a compile-time constant. Unlike
          <code> constexpr</code>, which <em>may</em> run at compile time, <code>consteval</code>
          <em> must</em> run at compile time. Calling a consteval function with runtime values
          is a compilation error.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">consteval: Guaranteed Compile-Time</h2>

      <SyntaxBlock title="consteval Syntax">
        <p>
          Declare a function with the <code>consteval</code> specifier. Every call must be a
          constant expression.
        </p>
        <CppCode>{`consteval int function_name(parameters) {
    // must be evaluable at compile time
}`}</CppCode>
      </SyntaxBlock>

      <CppCode title="consteval vs constexpr">{`#include <iostream>

consteval int sqr(int n) { return n * n; }
constexpr int cube(int n) { return n * n * n; }

int main() {
    constexpr int a = sqr(5);     // OK: compile-time
    constexpr int b = cube(3);    // OK: compile-time

    int x = 4;
    // int c = sqr(x);            // ERROR: x is not a constant
    int d = cube(x);              // OK: constexpr can run at runtime

    std::cout << "sqr(5) = " << a << "\\n";
    std::cout << "cube(3) = " << b << "\\n";
    std::cout << "cube(4) = " << d << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`sqr(5) = 25
cube(3) = 27
cube(4) = 64`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">constinit: Constant Initialization</h2>

      <DefinitionBlock title="constinit">
        <p>
          <code>constinit</code> ensures a variable with static or thread-local storage duration is
          initialized at compile time (constant initialization). Unlike <code>constexpr</code>, the
          variable itself is not const and can be modified after initialization.
        </p>
      </DefinitionBlock>

      <CppCode title="constinit usage">{`#include <iostream>

consteval int computeInitial() { return 42; }

constinit int globalValue = computeInitial();  // Guaranteed compile-time init
constinit thread_local int threadVal = 100;    // Per-thread, compile-time init

int main() {
    std::cout << "globalValue = " << globalValue << "\\n";
    globalValue = 99;  // OK: constinit does NOT make it const
    std::cout << "globalValue = " << globalValue << "\\n";

    threadVal += 5;
    std::cout << "threadVal = " << threadVal << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`globalValue = 42
globalValue = 99
threadVal = 105`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Static Initialization Order Fiasco</h2>

      <WarningBlock title="The Fiasco">
        <p>
          The order of initialization of non-local static variables across translation units is
          undefined. If one static variable depends on another in a different file, you may get
          uninitialized values. <code>constinit</code> prevents this by ensuring compile-time
          initialization, and the Construct on First Use idiom solves it for non-trivial objects.
        </p>
      </WarningBlock>

      <CppCode title="Construct on First Use idiom">{`#include <iostream>
#include <string>

// Instead of: static std::string config = loadConfig();
// Use a function-local static:
const std::string& getConfig() {
    static const std::string config = "default_config";
    return config;  // Initialized on first call, thread-safe since C++11
}

int main() {
    std::cout << "Config: " << getConfig() << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`Config: default_config`}</OutputBlock>

      <NoteBlock type="info" title="consteval and constinit Interaction">
        <p>
          You can use <code>consteval</code> functions to compute the initializer for
          <code> constinit</code> variables, guaranteeing that complex initialization logic still
          happens at compile time with no runtime overhead or ordering issues.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Use constinit for static variables">
        <p>
          Apply <code>constinit</code> to global and static variables whenever possible. This
          guarantees safe initialization ordering and prevents subtle bugs from the static
          initialization order fiasco. Use <code>consteval</code> when you must guarantee a function
          never runs at runtime.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Compile-Time Hash Function"
        difficulty="intermediate"
        prompt="Write a consteval function that computes a simple hash of a string literal (e.g., sum of character values). Use constinit to store the hash of a known string as a global variable."
        hints={[
          "Use a consteval function taking const char* and std::size_t",
          "Loop over characters, accumulating a hash value",
          "Use constinit to declare the global variable with the computed hash",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <cstddef>

consteval unsigned int simpleHash(const char* str, std::size_t len) {
    unsigned int hash = 0;
    for (std::size_t i = 0; i < len; ++i) {
        hash = hash * 31 + static_cast<unsigned int>(str[i]);
    }
    return hash;
}

constinit unsigned int configHash = simpleHash("settings", 8);

int main() {
    std::cout << "Hash: " << configHash << "\\n";
    static_assert(simpleHash("abc", 3) == (('a' * 31 + 'b') * 31 + 'c'));
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'consteval specifier', url: 'https://en.cppreference.com/w/cpp/language/consteval', description: 'Immediate function specifier' },
        { type: 'cppreference', title: 'constinit specifier', url: 'https://en.cppreference.com/w/cpp/language/constinit', description: 'Constant initialization specifier' },
        { type: 'article', title: 'Static Initialization Order Fiasco', url: 'https://isocpp.org/wiki/faq/ctors#static-init-order', description: 'C++ FAQ on the fiasco and solutions' },
      ]} />
    </div>
  )
}
