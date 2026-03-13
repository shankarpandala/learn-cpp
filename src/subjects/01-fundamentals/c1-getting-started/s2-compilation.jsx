import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import WarningBlock from '../../../components/content/WarningBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import CompilerNoteBlock from '../../../components/content/CompilerNoteBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S2Compilation() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Unlike interpreted languages like Python or JavaScript, C++ is a <strong>compiled language</strong>.
        Your source code goes through several stages of transformation before it becomes an executable
        program. Understanding this process helps you debug errors and write better code.
      </p>

      <DefinitionBlock title="Compilation">
        <p>
          Compilation is the process of translating human-readable source code into machine code
          (binary instructions) that the computer's processor can execute directly. In C++, this is
          a multi-stage pipeline.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">The Four Stages</h2>

      <p className="text-gray-700 dark:text-gray-300">
        The C++ build process has four distinct stages:
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800/40">
        <ol className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">1</span>
            <div>
              <strong className="text-gray-900 dark:text-gray-100">Preprocessing</strong> — The preprocessor handles directives like <code>#include</code>, <code>#define</code>, and <code>#ifdef</code>. It expands macros and includes header file contents.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700 dark:bg-green-900/40 dark:text-green-400">2</span>
            <div>
              <strong className="text-gray-900 dark:text-gray-100">Compilation</strong> — The compiler translates the preprocessed source code into assembly language for the target architecture.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700 dark:bg-orange-900/40 dark:text-orange-400">3</span>
            <div>
              <strong className="text-gray-900 dark:text-gray-100">Assembly</strong> — The assembler converts assembly language into machine code (object files, typically <code>.o</code> or <code>.obj</code>).
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700 dark:bg-purple-900/40 dark:text-purple-400">4</span>
            <div>
              <strong className="text-gray-900 dark:text-gray-100">Linking</strong> — The linker combines object files and libraries into the final executable binary.
            </div>
          </li>
        </ol>
      </div>

      <SyntaxBlock title="Source → Executable Pipeline">
        <CppCode>{`// Source file: hello.cpp
// Stage 1: Preprocessing  →  hello.ii (expanded source)
// Stage 2: Compilation     →  hello.s  (assembly)
// Stage 3: Assembly        →  hello.o  (object file)
// Stage 4: Linking         →  hello    (executable)`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Seeing Each Stage</h2>

      <p className="text-gray-700 dark:text-gray-300">
        You can observe each stage using compiler flags:
      </p>

      <CppCode title="Preprocessing only">{`g++ -E hello.cpp -o hello.ii
# Output: expanded source with all #includes resolved`}</CppCode>

      <CppCode title="Compilation to assembly">{`g++ -S hello.cpp -o hello.s
# Output: human-readable assembly code`}</CppCode>

      <CppCode title="Compilation to object file">{`g++ -c hello.cpp -o hello.o
# Output: binary object file`}</CppCode>

      <CppCode title="Full build (all stages)">{`g++ hello.cpp -o hello
# Output: final executable`}</CppCode>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Compiler Errors vs Linker Errors</h2>

      <p className="text-gray-700 dark:text-gray-300">
        Understanding which stage produces an error helps you fix it faster:
      </p>

      <CppCode title="Compiler error (syntax)">{`#include <iostream>

int main() {
    std::cout << "Hello"  // Missing semicolon!
    return 0;
}`}</CppCode>

      <OutputBlock title="Compiler error output">{`hello.cpp:4:29: error: expected ';' after expression
    std::cout << "Hello"
                        ^
                        ;
1 error generated.`}</OutputBlock>

      <CppCode title="Linker error (undefined reference)">{`// main.cpp
void greet();  // Declared but never defined

int main() {
    greet();
    return 0;
}`}</CppCode>

      <OutputBlock title="Linker error output">{`/tmp/main-abc123.o: In function 'main':
main.cpp:(.text+0x5): undefined reference to 'greet()'
collect2: error: ld returned 1 exit status`}</OutputBlock>

      <WarningBlock title="Common Compilation Mistakes">
        <ul className="list-disc pl-5 space-y-1">
          <li>Forgetting to include the required header (<code>#include</code>)</li>
          <li>Misspelling identifiers (C++ is case-sensitive)</li>
          <li>Missing semicolons at the end of statements</li>
          <li>Mismatched braces or parentheses</li>
        </ul>
      </WarningBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Useful Compiler Flags</h2>

      <CppCode title="Recommended flags for learning">{`# Enable warnings (highly recommended!)
g++ -Wall -Wextra -o hello hello.cpp

# Specify C++ standard version
g++ -std=c++17 -o hello hello.cpp

# All together (recommended for learning)
g++ -std=c++17 -Wall -Wextra -Wpedantic -o hello hello.cpp`}</CppCode>

      <CompilerNoteBlock compiler="gcc">
        <p>
          <code>-Wall</code> enables most warnings. <code>-Wextra</code> enables additional warnings
          not covered by <code>-Wall</code>. <code>-Wpedantic</code> warns about non-standard extensions.
        </p>
      </CompilerNoteBlock>

      <CompilerNoteBlock compiler="msvc" title="MSVC (Windows)">
        <p>
          On Windows with Visual Studio, use <code>cl /W4 /EHsc hello.cpp</code>.
          The <code>/W4</code> flag is the MSVC equivalent of <code>-Wall -Wextra</code>.
        </p>
      </CompilerNoteBlock>

      <BestPracticeBlock title="Always Enable Warnings">
        <p>
          Compile with <code>-Wall -Wextra</code> from day one. Warnings catch bugs that compile
          successfully but behave incorrectly. Treat warnings as errors during development
          with <code>-Werror</code>.
        </p>
      </BestPracticeBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Multiple Source Files</h2>

      <CppCode title="greet.cpp">{`#include <iostream>

void greet() {
    std::cout << "Hello from greet()!" << std::endl;
}`}</CppCode>

      <CppCode title="main.cpp">{`void greet();  // Declaration

int main() {
    greet();
    return 0;
}`}</CppCode>

      <CppCode title="Compiling multiple files">{`g++ -o program main.cpp greet.cpp
./program`}</CppCode>

      <OutputBlock>{`Hello from greet()!`}</OutputBlock>

      <ExerciseBlock
        title="Identify the Error Type"
        difficulty="beginner"
        prompt="For each of these errors, determine if it's a preprocessor error, compiler error, or linker error: (1) misspelled header name, (2) missing semicolon, (3) calling a function that's declared but not defined."
        solution={
          <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <p><strong>1.</strong> Preprocessor error — the #include directive fails</p>
            <p><strong>2.</strong> Compiler error — syntax violation</p>
            <p><strong>3.</strong> Linker error — undefined reference</p>
          </div>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Translation phases', url: 'https://en.cppreference.com/w/cpp/language/translation_phases', description: 'Official phases of C++ translation' },
        { type: 'textbook', title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', description: 'Chapter 2.2: Programs' },
      ]} />
    </div>
  )
}
