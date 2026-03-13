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

export default function S3ErrorStrategies() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        C++ offers multiple error handling strategies, each with different trade-offs. Understanding
        when to use exceptions, error codes, <code>std::optional</code>, or <code>std::expected</code> is
        essential for writing robust, maintainable code.
      </p>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Exceptions</h2>

      <DefinitionBlock title="When to Use Exceptions">
        <p>
          Exceptions are best for <strong>truly exceptional</strong> situations -- errors that the
          immediate caller cannot reasonably handle. They separate error handling from normal logic
          and cannot be accidentally ignored. They are the default error mechanism for constructors,
          which have no return value.
        </p>
      </DefinitionBlock>

      <CppCode title="exceptions.cpp">{`#include <iostream>
#include <fstream>
#include <stdexcept>

std::string read_file(const std::string& path) {
    std::ifstream file(path);
    if (!file.is_open()) {
        throw std::runtime_error("Cannot open file: " + path);
    }
    std::string content((std::istreambuf_iterator<char>(file)),
                         std::istreambuf_iterator<char>());
    return content;
}

int main() {
    try {
        std::string data = read_file("config.txt");
        std::cout << "Read " << data.size() << " bytes" << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Error: " << e.what() << std::endl;
    }

    return 0;
}`}</CppCode>

      <OutputBlock>{`Error: Cannot open file: config.txt`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Error Codes</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Error codes are simple return values that indicate success or failure. They are common
        in C-style APIs and in performance-critical code where exception overhead is unacceptable.
        The downside: callers can silently ignore them.
      </p>

      <CppCode title="error_codes.cpp">{`#include <iostream>
#include <system_error>

enum class ParseError {
    None = 0,
    EmptyInput,
    InvalidFormat,
    OutOfRange
};

struct ParseResult {
    int value;
    ParseError error;
};

ParseResult parse_int(const std::string& s) {
    if (s.empty()) return {0, ParseError::EmptyInput};

    try {
        size_t pos;
        int val = std::stoi(s, &pos);
        if (pos != s.size()) return {0, ParseError::InvalidFormat};
        return {val, ParseError::None};
    } catch (...) {
        return {0, ParseError::OutOfRange};
    }
}

int main() {
    auto [value, error] = parse_int("42");
    if (error == ParseError::None) {
        std::cout << "Parsed: " << value << std::endl;
    }

    auto [v2, e2] = parse_int("abc");
    if (e2 != ParseError::None) {
        std::cout << "Parse failed" << std::endl;
    }

    return 0;
}`}</CppCode>

      <OutputBlock>{`Parsed: 42
Parse failed`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::optional (C++17)</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>std::optional&lt;T&gt;</code> holds either a value of type <code>T</code> or nothing.
        It is ideal for functions that may legitimately have no result -- not because of an error, but
        because the answer does not exist.
      </p>

      <CppCode title="optional.cpp">{`#include <iostream>
#include <optional>
#include <string>
#include <map>

std::optional<int> find_user_age(const std::string& name) {
    std::map<std::string, int> users = {{"Alice", 30}, {"Bob", 25}};

    auto it = users.find(name);
    if (it != users.end()) {
        return it->second;
    }
    return std::nullopt;  // no value
}

int main() {
    if (auto age = find_user_age("Alice")) {
        std::cout << "Alice is " << *age << " years old" << std::endl;
    }

    auto result = find_user_age("Charlie");
    std::cout << "Charlie found: " << std::boolalpha
              << result.has_value() << std::endl;

    // value_or provides a default
    int age = find_user_age("Charlie").value_or(-1);
    std::cout << "Charlie's age (or default): " << age << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`Alice is 30 years old
Charlie found: false
Charlie's age (or default): -1`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::expected (C++23)</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>std::expected&lt;T, E&gt;</code> holds either a value of type <code>T</code> or an
        error of type <code>E</code>. It combines the explicitness of error codes with the
        type safety of <code>std::optional</code>, while also carrying error information.
      </p>

      <CppCode title="expected.cpp">{`#include <iostream>
#include <expected>
#include <string>

enum class MathError { DivisionByZero, Overflow };

std::expected<double, MathError> safe_divide(double a, double b) {
    if (b == 0.0) {
        return std::unexpected(MathError::DivisionByZero);
    }
    return a / b;
}

int main() {
    auto result = safe_divide(10.0, 3.0);
    if (result) {
        std::cout << "10 / 3 = " << *result << std::endl;
    }

    auto bad = safe_divide(5.0, 0.0);
    if (!bad) {
        std::cout << "Error: ";
        if (bad.error() == MathError::DivisionByZero) {
            std::cout << "division by zero" << std::endl;
        }
    }

    return 0;
}`}</CppCode>

      <OutputBlock>{`10 / 3 = 3.33333
Error: division by zero`}</OutputBlock>

      <CompilerNoteBlock compiler="all" title="C++23 Required for std::expected">
        <p>
          <code>std::expected</code> requires C++23. Use <code>-std=c++23</code> (GCC 12+ / Clang 16+)
          or <code>/std:c++latest</code> (MSVC). For earlier standards, consider third-party
          libraries like <code>tl::expected</code>.
        </p>
      </CompilerNoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Choosing the Right Strategy</h2>

      <NoteBlock type="info" title="Decision guide">
        <p>
          <strong>Exceptions:</strong> Use for constructor failures, truly unexpected errors, and
          when error handling should not clutter the happy path. Avoid in hot loops or
          real-time code.<br />
          <strong>Error codes:</strong> Use in C interop, low-level libraries, and
          performance-critical paths where exceptions are too costly.<br />
          <strong>std::optional:</strong> Use when "no result" is a normal, expected outcome (e.g.,
          lookups, parsing attempts).<br />
          <strong>std::expected:</strong> Use when you need to communicate both "no result" and
          "why" without exceptions.
        </p>
      </NoteBlock>

      <WarningBlock title="Error handling in constructors">
        <p>
          Constructors have no return value, so error codes and <code>std::optional</code> are not
          options. If a constructor cannot establish a valid object, throw an exception. This prevents
          partially-constructed objects from existing. An alternative is using factory functions that
          return <code>std::optional</code> or <code>std::expected</code>.
        </p>
      </WarningBlock>

      <NoteBlock type="tip" title="Performance considerations">
        <p>
          Exceptions have zero cost on the happy path (no overhead when no exception is thrown) but
          significant cost when thrown (stack unwinding). Error codes have a small constant cost on
          every call (checking the return value). Choose based on how frequently errors occur: if
          errors are rare, exceptions are faster overall.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Be consistent within a codebase">
        <p>
          Mixing error strategies inconsistently is worse than any single approach. Choose a primary
          strategy for your project and document it. Convert between strategies at API boundaries.
          For most C++ projects, exceptions are the default; use alternatives where you have a
          specific reason.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Optional-Based Lookup"
        difficulty="intermediate"
        prompt="Write a function that looks up a student's grade (as a char) from a map. Use std::optional to handle the case where the student is not found. Print the grade if found, or a default message otherwise."
        hints={[
          "Return std::optional<char> from the lookup function",
          "Use .value_or('?') or check .has_value()",
          "Use std::map<std::string, char> for the grade data",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <optional>
#include <map>
#include <string>

std::optional<char> get_grade(const std::map<std::string, char>& grades,
                              const std::string& name) {
    auto it = grades.find(name);
    if (it != grades.end()) {
        return it->second;
    }
    return std::nullopt;
}

int main() {
    std::map<std::string, char> grades = {
        {"Alice", 'A'}, {"Bob", 'B'}, {"Carol", 'C'}
    };

    for (const auto& name : {"Alice", "Dave"}) {
        auto grade = get_grade(grades, name);
        if (grade) {
            std::cout << name << ": " << *grade << std::endl;
        } else {
            std::cout << name << ": not enrolled" << std::endl;
        }
    }

    return 0;
}`}</CppCode>
        }
      />

      <ExerciseBlock
        title="Factory Function with std::expected"
        difficulty="advanced"
        prompt="Write a factory function create_connection(host, port) that returns std::expected<Connection, std::string>. Simulate failure for invalid ports (< 1 or > 65535) and empty hostnames."
        hints={[
          "Define a simple Connection struct with host and port members",
          "Return std::unexpected(error_message) for failures",
          "Return the Connection object directly for success",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <expected>
#include <string>

struct Connection {
    std::string host;
    int port;
};

std::expected<Connection, std::string>
create_connection(const std::string& host, int port) {
    if (host.empty()) {
        return std::unexpected("Empty hostname");
    }
    if (port < 1 || port > 65535) {
        return std::unexpected("Invalid port: " + std::to_string(port));
    }
    return Connection{host, port};
}

int main() {
    auto conn = create_connection("localhost", 8080);
    if (conn) {
        std::cout << "Connected to " << conn->host
                  << ":" << conn->port << std::endl;
    }

    auto bad = create_connection("", 80);
    if (!bad) {
        std::cout << "Error: " << bad.error() << std::endl;
    }

    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::optional', url: 'https://en.cppreference.com/w/cpp/utility/optional', description: 'Optional value wrapper (C++17)' },
        { type: 'cppreference', title: 'std::expected', url: 'https://en.cppreference.com/w/cpp/utility/expected', description: 'Expected value or error (C++23)' },
        { type: 'cppreference', title: 'Error handling', url: 'https://en.cppreference.com/w/cpp/error', description: 'Overview of C++ error handling facilities' },
        { type: 'textbook', title: 'C++ Best Practices', author: 'Jason Turner', description: 'Error handling strategy recommendations' },
      ]} />
    </div>
  )
}
