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

export default function S1Expected() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>std::expected&lt;T, E&gt;</code>, introduced in C++23, provides a way to return
        either a success value of type <code>T</code> or an error value of type <code>E</code>
        from a function. It offers a type-safe, composable alternative to exceptions and error
        codes, with monadic operations for clean error-handling chains.
      </p>

      <DefinitionBlock title="std::expected">
        <p>
          <code>std::expected&lt;T, E&gt;</code> is a vocabulary type that holds either a value of
          type <code>T</code> (the expected outcome) or an error of type <code>E</code> (the
          unexpected outcome). It is similar to <code>std::variant&lt;T, E&gt;</code> but with
          clearer semantics and monadic operations for chaining computations.
        </p>
      </DefinitionBlock>

      <SyntaxBlock title="Basic expected Usage">
        <p>
          Return a value directly for success, or wrap the error in <code>std::unexpected</code>.
        </p>
        <CppCode>{`#include <expected>
std::expected<T, E> success_case = value;
std::expected<T, E> error_case = std::unexpected(error_value);`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Replacing Exceptions with expected</h2>

      <CppCode title="expected_basic.cpp">{`#include <iostream>
#include <expected>
#include <string>
#include <charconv>

enum class ParseError { Empty, InvalidFormat, OutOfRange };

std::expected<int, ParseError> parseInt(std::string_view s) {
    if (s.empty())
        return std::unexpected(ParseError::Empty);

    int result;
    auto [ptr, ec] = std::from_chars(s.data(), s.data() + s.size(), result);
    if (ec == std::errc::result_out_of_range)
        return std::unexpected(ParseError::OutOfRange);
    if (ec != std::errc{} || ptr != s.data() + s.size())
        return std::unexpected(ParseError::InvalidFormat);
    return result;
}

std::string errorToString(ParseError e) {
    switch (e) {
        case ParseError::Empty: return "empty input";
        case ParseError::InvalidFormat: return "invalid format";
        case ParseError::OutOfRange: return "out of range";
    }
    return "unknown";
}

int main() {
    for (auto input : {"42", "abc", "", "99999999999999"}) {
        auto result = parseInt(input);
        if (result) {
            std::cout << "\\"" << input << "\\" -> " << *result << "\\n";
        } else {
            std::cout << "\\"" << input << "\\" -> error: "
                      << errorToString(result.error()) << "\\n";
        }
    }
    return 0;
}`}</CppCode>

      <OutputBlock>{`"42" -> 42
"abc" -> error: invalid format
"" -> error: empty input
"99999999999999" -> error: out of range`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Monadic Operations</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++23 provides monadic operations on <code>expected</code> that allow chaining computations
        without manually checking for errors at each step: <code>and_then</code>,
        <code>transform</code>, and <code>or_else</code>.
      </p>

      <CppCode title="monadic.cpp">{`#include <iostream>
#include <expected>
#include <string>

using Result = std::expected<int, std::string>;

Result parse(std::string_view s) {
    try { return std::stoi(std::string(s)); }
    catch (...) { return std::unexpected("parse failed"); }
}

Result doubleIt(int x) {
    if (x > 1000) return std::unexpected("too large");
    return x * 2;
}

int main() {
    auto result = parse("21")
        .and_then(doubleIt)           // chain: parse -> doubleIt
        .transform([](int x) {        // map the success value
            return x + 1;
        })
        .or_else([](const std::string& err) -> Result {
            std::cout << "Recovered from: " << err << "\\n";
            return 0;  // provide fallback
        });

    std::cout << "Result: " << *result << "\\n";

    // Error case: pipeline short-circuits
    auto err = parse("abc")
        .and_then(doubleIt)
        .transform([](int x) { return x + 1; });

    if (!err) std::cout << "Error: " << err.error() << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`Result: 43
Error: parse failed`}</OutputBlock>

      <NoteBlock type="info" title="and_then vs transform">
        <p>
          <code>and_then(f)</code> takes a function that returns <code>expected&lt;U, E&gt;</code>
          and chains it (flatMap). <code>transform(f)</code> takes a function that returns a plain
          value <code>U</code> and wraps it in <code>expected</code> (map). Use <code>and_then</code>
          for operations that can fail, and <code>transform</code> for infallible transformations.
        </p>
      </NoteBlock>

      <NoteBlock type="tip" title="expected vs exceptions">
        <p>
          Use <code>expected</code> for expected, recoverable failures (parsing, file I/O, network).
          Use exceptions for truly exceptional conditions (out of memory, logic errors). The key
          advantage of <code>expected</code> is that error handling is visible in the type signature
          and cannot be accidentally ignored.
        </p>
      </NoteBlock>

      <CompilerNoteBlock compiler="gcc" title="GCC 12+ required">
        <p>
          <code>std::expected</code> is available in GCC 12+ and Clang 16+ with <code>-std=c++23</code>.
          Monadic operations require GCC 13+ and Clang 17+.
        </p>
      </CompilerNoteBlock>

      <WarningBlock title="Do not ignore the error">
        <p>
          Unlike exceptions, <code>expected</code> does not force you to handle errors. Dereferencing
          an <code>expected</code> that contains an error is undefined behavior. Always check
          <code>has_value()</code> or use the monadic operations.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Use expected for recoverable errors in APIs">
        <p>
          For library APIs and performance-critical code paths, <code>std::expected</code> provides
          zero-overhead error handling without the stack unwinding cost of exceptions. Combine it
          with monadic operations for clean, readable error-handling pipelines.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="File Reading Pipeline"
        difficulty="advanced"
        prompt="Write a pipeline using expected that: (1) validates a filename is not empty, (2) checks the extension is '.txt', (3) returns the filename in uppercase. Use and_then and transform."
        hints={[
          "Each validation step returns expected<string, string>",
          "Use and_then for steps that can fail",
          "Use transform for the final uppercase conversion",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <expected>
#include <string>
#include <algorithm>

using Result = std::expected<std::string, std::string>;

Result validateNotEmpty(std::string filename) {
    if (filename.empty())
        return std::unexpected("filename is empty");
    return filename;
}

Result validateExtension(std::string filename) {
    if (filename.size() < 4 ||
        filename.substr(filename.size() - 4) != ".txt")
        return std::unexpected("not a .txt file");
    return filename;
}

int main() {
    auto process = [](std::string name) {
        return validateNotEmpty(name)
            .and_then(validateExtension)
            .transform([](std::string s) {
                std::transform(s.begin(), s.end(), s.begin(), ::toupper);
                return s;
            });
    };

    auto r1 = process("report.txt");
    if (r1) std::cout << "OK: " << *r1 << "\\n";

    auto r2 = process("image.png");
    if (!r2) std::cout << "Error: " << r2.error() << "\\n";
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::expected', url: 'https://en.cppreference.com/w/cpp/utility/expected', description: 'Expected value or error (C++23)' },
        { type: 'cppreference', title: 'std::unexpected', url: 'https://en.cppreference.com/w/cpp/utility/expected/unexpected', description: 'Wrapper for unexpected error values' },
        { type: 'textbook', title: 'C++ Software Design', author: 'Klaus Iglberger', description: 'Chapter on modern error handling patterns' },
      ]} />
    </div>
  )
}
