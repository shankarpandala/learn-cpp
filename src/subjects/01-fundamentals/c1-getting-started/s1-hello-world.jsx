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

export default function S1HelloWorld() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Every programming journey starts with a simple program. In C++, the classic first program
        prints "Hello, World!" to the screen. This seemingly trivial program introduces several
        fundamental C++ concepts: the preprocessor, the standard library, the <code>main</code> function,
        and stream output.
      </p>

      <DefinitionBlock title="What is C++?">
        <p>
          C++ is a general-purpose programming language created by Bjarne Stroustrup as an extension
          of C. It supports procedural, object-oriented, and generic programming paradigms, and is
          widely used in systems software, game engines, embedded systems, and high-performance
          applications.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Your First C++ Program</h2>

      <CppCode title="hello.cpp">{`#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Hello, World!`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Line-by-Line Breakdown</h2>

      <SyntaxBlock title="#include Directive">
        <p>
          <code>#include &lt;iostream&gt;</code> is a <strong>preprocessor directive</strong>. It tells the
          compiler to include the contents of the <code>iostream</code> header file, which provides
          input/output stream objects like <code>std::cout</code>.
        </p>
        <CppCode>{`#include <header_name>   // System/standard library header
#include "header_name"  // User-defined header`}</CppCode>
      </SyntaxBlock>

      <SyntaxBlock title="The main() Function">
        <p>
          Every C++ program must have exactly one <code>main()</code> function. This is the entry point —
          the first function called when the program runs. It returns an <code>int</code> to the
          operating system (0 typically means success).
        </p>
        <CppCode>{`int main() {
    // program code here
    return 0;  // 0 = success
}`}</CppCode>
      </SyntaxBlock>

      <SyntaxBlock title="std::cout and the Insertion Operator">
        <p>
          <code>std::cout</code> is the <strong>standard character output</strong> stream.
          The <code>&lt;&lt;</code> operator (called the <strong>insertion operator</strong>) sends
          data to the output stream. Multiple values can be chained.
        </p>
        <CppCode>{`std::cout << "Text" << " " << 42 << std::endl;`}</CppCode>
        <OutputBlock>{`Text 42`}</OutputBlock>
      </SyntaxBlock>

      <NoteBlock type="info" title="What is std::?">
        <p>
          <code>std</code> is a <strong>namespace</strong> — a named scope that groups related identifiers.
          The C++ standard library lives in the <code>std</code> namespace. The <code>::</code> is the
          <strong> scope resolution operator</strong> that accesses members within a namespace.
        </p>
      </NoteBlock>

      <NoteBlock type="tip" title="std::endl vs '\\n'">
        <p>
          <code>std::endl</code> outputs a newline <em>and</em> flushes the output buffer.
          Using <code>'\n'</code> only outputs a newline, which is faster for performance-sensitive code.
          For most learning examples, either works fine.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Compiling and Running</h2>

      <p className="text-gray-700 dark:text-gray-300">
        To compile and run your program from the command line:
      </p>

      <CppCode title="Terminal">{`g++ -o hello hello.cpp
./hello`}</CppCode>

      <OutputBlock>{`Hello, World!`}</OutputBlock>

      <CompilerNoteBlock compiler="gcc" title="GCC Compilation">
        <p>
          <code>g++</code> is the GNU C++ compiler. The <code>-o hello</code> flag specifies the
          output filename. Without it, the default output is <code>a.out</code> on Linux/macOS.
        </p>
      </CompilerNoteBlock>

      <CompilerNoteBlock compiler="clang" title="Clang Compilation">
        <p>
          On macOS, the default <code>g++</code> command often invokes Clang. You can also
          use <code>clang++ -o hello hello.cpp</code> explicitly.
        </p>
      </CompilerNoteBlock>

      <BestPracticeBlock title="Always use return 0">
        <p>
          Although C++ allows omitting <code>return 0;</code> from <code>main()</code> (the compiler
          inserts it implicitly), explicitly writing it makes your intent clear. In <code>main()</code>,
          returning 0 signals successful execution to the operating system.
        </p>
      </BestPracticeBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Variations</h2>

      <CppCode title="Multiple output statements">{`#include <iostream>

int main() {
    std::cout << "Hello, ";
    std::cout << "World!" << std::endl;
    std::cout << "Welcome to C++." << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Hello, World!
Welcome to C++.`}</OutputBlock>

      <ExerciseBlock
        title="Modify the Program"
        difficulty="beginner"
        prompt="Modify the Hello World program to print your name on a separate line after 'Hello, World!'."
        hints={[
          "Add another std::cout statement after the first one",
          "Use std::endl or '\\n' to create a new line",
        ]}
        solution={
          <CppCode>{`#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    std::cout << "My name is Alice." << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ExerciseBlock
        title="Print a Pattern"
        difficulty="beginner"
        prompt="Write a program that prints a simple triangle pattern using asterisks (*)."
        hints={[
          "Use multiple std::cout statements, one per line",
          "Each line should have one more asterisk than the previous",
        ]}
        solution={
          <CppCode>{`#include <iostream>

int main() {
    std::cout << "*" << std::endl;
    std::cout << "**" << std::endl;
    std::cout << "***" << std::endl;
    std::cout << "****" << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::cout', url: 'https://en.cppreference.com/w/cpp/io/cout', description: 'Standard output stream documentation' },
        { type: 'cppreference', title: 'std::endl', url: 'https://en.cppreference.com/w/cpp/io/manip/endl', description: 'End-of-line manipulator' },
        { type: 'textbook', title: 'Programming: Principles and Practice Using C++', author: 'Bjarne Stroustrup', description: 'Chapter 2: Hello, World!' },
      ]} />
    </div>
  )
}
