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

export default function S3StringView() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>std::string_view</code> is a lightweight, non-owning reference to a contiguous
        sequence of characters. It provides a read-only view into a string without copying it,
        making it ideal for function parameters that only need to inspect string data.
      </p>

      <DefinitionBlock title="std::string_view">
        <p>
          A <code>string_view</code> is essentially a pointer and a length. It can refer to a
          <code>std::string</code>, a C-style string literal, or any contiguous character buffer.
          Since it does not own the data, it is cheap to copy and pass by value.
        </p>
      </DefinitionBlock>

      <SyntaxBlock title="string_view Basics">
        <p>
          <code>string_view</code> lives in <code>&lt;string_view&gt;</code> and supports most
          read-only operations of <code>std::string</code>.
        </p>
        <CppCode>{`#include <string_view>
std::string_view sv = "Hello, World!";
sv.substr(0, 5);    // returns a string_view, no allocation
sv.find("World");   // search within the view
sv.size();          // length of the view`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Performance Benefits</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Using <code>string_view</code> as a function parameter avoids unnecessary copies that
        occur when accepting <code>const std::string&</code> from a string literal (which would
        create a temporary <code>std::string</code>).
      </p>

      <CppCode title="string_view_perf.cpp">{`#include <iostream>
#include <string>
#include <string_view>

// Accepts any string-like input without copying
void printHeader(std::string_view text) {
    std::cout << "=== " << text << " ===\\n";
    std::cout << "Length: " << text.size() << "\\n";
}

int main() {
    // Works with string literals (no allocation)
    printHeader("Hello");

    // Works with std::string
    std::string title = "C++17 Features";
    printHeader(title);

    // Works with substrings (no allocation)
    std::string_view full = "Modern C++ Programming";
    printHeader(full.substr(7, 3));  // "C++"

    return 0;
}`}</CppCode>

      <OutputBlock>{`=== Hello ===
Length: 5
=== C++17 Features ===
Length: 14
=== C++ ===
Length: 3`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Substring Without Allocation</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Unlike <code>std::string::substr</code>, which allocates a new string,
        <code>string_view::substr</code> returns another view into the same data with zero cost.
      </p>

      <CppCode title="substr_view.cpp">{`#include <iostream>
#include <string_view>

void tokenize(std::string_view csv) {
    size_t pos = 0;
    while (pos < csv.size()) {
        size_t comma = csv.find(',', pos);
        if (comma == std::string_view::npos)
            comma = csv.size();
        std::string_view token = csv.substr(pos, comma - pos);
        std::cout << "[" << token << "]\\n";
        pos = comma + 1;
    }
}

int main() {
    tokenize("apple,banana,cherry,date");
    return 0;
}`}</CppCode>

      <OutputBlock>{`[apple]
[banana]
[cherry]
[date]`}</OutputBlock>

      <WarningBlock title="Lifetime pitfalls">
        <p>
          A <code>string_view</code> does not own its data. If the underlying string is destroyed
          or modified, the view becomes a dangling reference. Never return a <code>string_view</code>
          that refers to a local <code>std::string</code> or store a <code>string_view</code> that
          outlives its source.
        </p>
      </WarningBlock>

      <NoteBlock type="important" title="Not null-terminated">
        <p>
          A <code>string_view</code> is not guaranteed to be null-terminated. Passing
          <code>sv.data()</code> to a C function that expects a null-terminated string is undefined
          behavior unless the view happens to end at a null character. Use <code>std::string(sv)</code>
          when you need a null-terminated copy.
        </p>
      </NoteBlock>

      <NoteBlock type="tip" title="remove_prefix and remove_suffix">
        <p>
          Use <code>remove_prefix(n)</code> and <code>remove_suffix(n)</code> to narrow the view
          from either end without allocation. These are useful for trimming whitespace or stripping
          delimiters.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Use string_view for read-only string parameters">
        <p>
          Prefer <code>std::string_view</code> over <code>const std::string&</code> for function
          parameters that only read string data. Pass it by value since it is just a pointer and
          length. Only use <code>const std::string&</code> when the function needs to store a
          reference or the API requires it.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Word Counter"
        difficulty="beginner"
        prompt="Write a function that takes a std::string_view and returns the number of words (separated by spaces). Use string_view operations only, no allocations."
        hints={[
          "Use find() and substr() or iterate with a loop",
          "Handle leading, trailing, and multiple spaces",
          "Count transitions from space to non-space",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <string_view>

int countWords(std::string_view text) {
    int count = 0;
    bool inWord = false;
    for (char c : text) {
        if (c == ' ') {
            inWord = false;
        } else if (!inWord) {
            inWord = true;
            ++count;
        }
    }
    return count;
}

int main() {
    std::cout << countWords("Hello World") << "\\n";        // 2
    std::cout << countWords("  spaces  everywhere  ") << "\\n"; // 2
    std::cout << countWords("single") << "\\n";             // 1
    std::cout << countWords("") << "\\n";                   // 0
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::basic_string_view', url: 'https://en.cppreference.com/w/cpp/string/basic_string_view', description: 'Non-owning string reference (C++17)' },
        { type: 'cppreference', title: 'std::string_view::substr', url: 'https://en.cppreference.com/w/cpp/string/basic_string_view/substr', description: 'Non-allocating substring' },
        { type: 'textbook', title: 'C++17 - The Complete Guide', author: 'Nicolai Josuttis', description: 'Chapter 20: std::string_view' },
      ]} />
    </div>
  )
}
