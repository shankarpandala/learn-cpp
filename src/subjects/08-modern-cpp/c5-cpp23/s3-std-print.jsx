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

export default function S3StdPrint() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++23 introduces <code>std::print</code> and <code>std::println</code>, bringing
        Python-style formatted output to the standard library. Built on the <code>std::format</code>
        foundation from C++20, these functions combine the type safety of streams with the
        convenience of <code>printf</code>-style formatting.
      </p>

      <DefinitionBlock title="std::print and std::println">
        <p>
          <code>std::print</code> writes formatted text to standard output (or a specified stream).
          <code>std::println</code> does the same but appends a newline. Both use the same format
          string syntax as <code>std::format</code>, with compile-time format string validation.
        </p>
      </DefinitionBlock>

      <SyntaxBlock title="Format String Syntax">
        <p>
          Replacement fields use curly braces. Positional arguments, fill, alignment, width,
          precision, and type specifiers are all supported.
        </p>
        <CppCode>{`#include <print>
std::println("Hello, {}!", name);           // basic
std::println("{0} + {0} = {1}", x, x + x);  // positional
std::println("{:>10}", "right");             // right-aligned
std::println("{:.2f}", 3.14159);             // precision`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic Usage</h2>

      <CppCode title="print_basic.cpp">{`#include <print>
#include <string>
#include <vector>

int main() {
    // Simple printing
    std::println("Hello, World!");

    // Variable substitution
    std::string name = "C++23";
    int version = 23;
    std::println("Welcome to {} (version {})", name, version);

    // Numbers with formatting
    double pi = 3.14159265358979;
    std::println("Pi = {:.4f}", pi);
    std::println("Hex: {:#x}, Oct: {:#o}, Bin: {:#b}", 255, 255, 255);

    // std::print without newline
    std::print("Loading");
    for (int i = 0; i < 3; ++i) std::print(".");
    std::println(" done!");

    return 0;
}`}</CppCode>

      <OutputBlock>{`Hello, World!
Welcome to C++23 (version 23)
Pi = 3.1416
Hex: 0xff, Oct: 0377, Bin: 0b11111111
Loading... done!`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Comparison with cout and printf</h2>

      <CppCode title="comparison.cpp">{`#include <print>
#include <iostream>
#include <cstdio>
#include <string>

int main() {
    std::string item = "Widget";
    int count = 42;
    double price = 9.99;

    // printf: fast but not type-safe, no std::string support
    std::printf("%-10s x%d = $%.2f\\n", item.c_str(), count, price);

    // cout: type-safe but verbose
    std::cout << std::left << std::setw(10) << item
              << " x" << count << " = $"
              << std::fixed << std::setprecision(2) << price << "\\n";

    // std::println: type-safe, concise, and fast
    std::println("{:<10} x{} = \${:.2f}", item, count, price);

    return 0;
}`}</CppCode>

      <OutputBlock>{`Widget     x42 = $9.99
Widget     x42 = $9.99
Widget     x42 = $9.99`}</OutputBlock>

      <NoteBlock type="info" title="Compile-time format checking">
        <p>
          Format strings in <code>std::print</code> and <code>std::println</code> are validated at
          compile time. If the format string has mismatched braces, wrong argument indices, or
          incompatible format specifiers, you get a clear compile error rather than a runtime crash
          or silent corruption, unlike <code>printf</code>.
        </p>
      </NoteBlock>

      <NoteBlock type="history" title="Evolution of C++ output">
        <p>
          C++ output has evolved through three eras: C-inherited <code>printf</code> (fast, unsafe),
          C++98 <code>iostream</code> (safe, verbose), and now C++23 <code>std::print</code> (fast,
          safe, concise). The <code>std::format</code> library in C++20 laid the groundwork by
          providing the formatting engine.
        </p>
      </NoteBlock>

      <NoteBlock type="tip" title="Formatting alignment and fill">
        <p>
          Use <code>&lt;</code> for left-align, <code>&gt;</code> for right-align, and
          <code>^</code> for center. Any character can be the fill:
          <code>{'{'}:*^20{'}'}</code> centers within 20 characters filled with asterisks.
        </p>
      </NoteBlock>

      <CompilerNoteBlock compiler="gcc" title="GCC support">
        <p>
          <code>std::print</code> is available in GCC 14+ with <code>-std=c++23</code>. Earlier
          versions support <code>std::format</code> (C++20) which can be used with
          <code>std::cout &lt;&lt; std::format(...)</code> as a workaround.
        </p>
      </CompilerNoteBlock>

      <WarningBlock title="Format string must be a compile-time constant">
        <p>
          The format string passed to <code>std::print</code> must be a compile-time constant
          expression. You cannot pass a runtime string variable as the format string. Use
          <code>std::vformat</code> and <code>std::vprint_unicode</code> for runtime format strings.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Use std::println for new code">
        <p>
          For new C++23 projects, prefer <code>std::println</code> over <code>std::cout</code> and
          <code>printf</code>. It combines the best aspects of both: type safety, concise syntax,
          good performance, and compile-time validation. The format string syntax is also compatible
          with Python and Rust, making it familiar to polyglot programmers.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Formatted Table"
        difficulty="beginner"
        prompt="Use std::println to print a formatted table of student names and their scores, right-aligning the scores in a column of width 6."
        hints={[
          "Use {:<15} for left-aligned names with width 15",
          "Use {:>6} for right-aligned scores with width 6",
          "Print a header row and a separator line",
        ]}
        solution={
          <CppCode>{`#include <print>
#include <string>
#include <vector>
#include <utility>

int main() {
    std::vector<std::pair<std::string, int>> students = {
        {"Alice", 95}, {"Bob", 87}, {"Carol", 100}, {"Dave", 72}
    };

    std::println("{:<15} {:>6}", "Name", "Score");
    std::println("{:-<15} {:->6}", "", "");
    for (const auto& [name, score] : students) {
        std::println("{:<15} {:>6}", name, score);
    }
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::print', url: 'https://en.cppreference.com/w/cpp/io/print', description: 'Formatted output to stdout (C++23)' },
        { type: 'cppreference', title: 'std::format', url: 'https://en.cppreference.com/w/cpp/utility/format/format', description: 'Format string library (C++20)' },
        { type: 'cppreference', title: 'Format specification', url: 'https://en.cppreference.com/w/cpp/utility/format/spec', description: 'Standard format specification mini-language' },
      ]} />
    </div>
  )
}
