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

export default function S1Declaration() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        In C++, a function must be known to the compiler before it can be called. This is where
        the distinction between <strong>declaration</strong> and <strong>definition</strong> becomes
        essential. Understanding this separation is key to organizing larger programs across
        multiple files.
      </p>

      <DefinitionBlock title="Declaration vs Definition">
        <p>
          A <strong>declaration</strong> (also called a <strong>prototype</strong>) tells the compiler
          a function's name, return type, and parameter types — but not its body. A <strong>definition</strong> provides
          the actual implementation. A function can be declared many times but defined only once
          (the One Definition Rule).
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Function Signatures and Prototypes</h2>

      <SyntaxBlock title="Declaration Syntax">
        <p>
          A function declaration includes the return type, function name, and parameter list,
          followed by a semicolon. Parameter names are optional in declarations.
        </p>
        <CppCode>{`return_type function_name(param_type1, param_type2);
return_type function_name(param_type1 name1, param_type2 name2);  // names optional but helpful`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Forward declaration example">{`#include <iostream>

// Declaration (forward declaration / prototype)
int add(int a, int b);

int main() {
    std::cout << "3 + 4 = " << add(3, 4) << std::endl;
    return 0;
}

// Definition (appears after main)
int add(int a, int b) {
    return a + b;
}`}</CppCode>

      <OutputBlock>{`3 + 4 = 7`}</OutputBlock>

      <NoteBlock type="info" title="Why Forward Declare?">
        <p>
          Without the forward declaration above, the compiler would reach the call
          to <code>add(3, 4)</code> inside <code>main()</code> and report an error because it has not
          yet seen any function named <code>add</code>. Forward declarations solve ordering problems
          and are required for mutually recursive functions.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Declarations in Header Files</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        In real projects, declarations live in header files (<code>.h</code> or <code>.hpp</code>)
        and definitions live in source files (<code>.cpp</code>). This lets multiple source files
        share the same function by including the header.
      </p>

      <CppCode title="math_utils.h">{`#ifndef MATH_UTILS_H
#define MATH_UTILS_H

// Declarations only
int add(int a, int b);
int multiply(int a, int b);

#endif`}</CppCode>

      <CppCode title="math_utils.cpp">{`#include "math_utils.h"

// Definitions
int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}`}</CppCode>

      <CppCode title="main.cpp">{`#include <iostream>
#include "math_utils.h"

int main() {
    std::cout << "5 + 3 = " << add(5, 3) << std::endl;
    std::cout << "5 * 3 = " << multiply(5, 3) << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`5 + 3 = 8
5 * 3 = 15`}</OutputBlock>

      <NoteBlock type="important" title="Include Guards">
        <p>
          The <code>#ifndef</code> / <code>#define</code> / <code>#endif</code> pattern is
          an <strong>include guard</strong>. It prevents the header from being included more than once
          in the same translation unit, which would cause redefinition errors. Many compilers also
          support <code>#pragma once</code> as a simpler alternative.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Linkage</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Functions have <strong>external linkage</strong> by default, meaning they can be called from
        other translation units. Marking a function <code>static</code> gives it <strong>internal
        linkage</strong>, restricting it to the file where it is defined.
      </p>

      <CppCode title="Internal linkage with static">{`// helpers.cpp
static int square(int x) {
    return x * x;  // only visible within helpers.cpp
}

int doubleSquare(int x) {
    return 2 * square(x);  // OK: same file
}`}</CppCode>

      <BestPracticeBlock title="Separate Declaration from Definition">
        <p>
          Place declarations in header files and definitions in <code>.cpp</code> files. This
          keeps compilation fast (only changed <code>.cpp</code> files need recompiling), enforces
          clear interfaces, and avoids multiple-definition linker errors.
        </p>
      </BestPracticeBlock>

      <CompilerNoteBlock compiler="all" title="One Definition Rule (ODR)">
        <p>
          If a function is defined in a header without being <code>inline</code>, including that
          header in two <code>.cpp</code> files will produce a linker error for duplicate symbols.
          Mark such definitions <code>inline</code> or move them to a <code>.cpp</code> file.
        </p>
      </CompilerNoteBlock>

      <ExerciseBlock
        title="Write a Forward Declaration"
        difficulty="beginner"
        prompt="Write a program where main() calls a function greet(std::string name) that prints 'Hello, <name>!'. Place the declaration before main and the definition after main."
        hints={[
          "The declaration needs #include <string> for std::string",
          "Remember to end the declaration with a semicolon",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <string>

void greet(std::string name);

int main() {
    greet("Alice");
    return 0;
}

void greet(std::string name) {
    std::cout << "Hello, " << name << "!" << std::endl;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Function declarations', url: 'https://en.cppreference.com/w/cpp/language/function', description: 'Complete reference for function declaration syntax' },
        { type: 'cppreference', title: 'One Definition Rule', url: 'https://en.cppreference.com/w/cpp/language/definition', description: 'Rules governing definitions across translation units' },
        { type: 'textbook', title: 'Programming: Principles and Practice Using C++', author: 'Bjarne Stroustrup', description: 'Chapter 8: Functions' },
      ]} />
    </div>
  )
}
