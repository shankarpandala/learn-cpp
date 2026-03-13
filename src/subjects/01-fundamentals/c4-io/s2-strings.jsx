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

export default function S2Strings() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Text handling is fundamental to most programs. C++ provides <code>std::string</code>,
        a powerful and safe string class that manages memory automatically and offers a rich
        set of operations for searching, modifying, and comparing text.
      </p>

      <DefinitionBlock title="std::string">
        <p>
          <code>std::string</code> is a class defined in the <code>&lt;string&gt;</code> header
          that represents a sequence of characters. Unlike C-style character arrays, it manages
          its own memory, grows dynamically, and provides bounds checking through its member
          functions.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Creating and Using Strings</h2>

      <CppCode title="string_basics.cpp">{`#include <iostream>
#include <string>

int main() {
    // Different ways to create strings
    std::string greeting = "Hello";
    std::string name("World");
    std::string spaces(5, '-');     // "-----" (5 dashes)
    std::string empty;              // empty string ""

    std::cout << greeting << ", " << name << "!" << std::endl;
    std::cout << "Separator: " << spaces << std::endl;
    std::cout << "Empty string length: " << empty.length() << std::endl;

    // Concatenation with + and +=
    std::string full = greeting + ", " + name + "!";
    std::cout << full << std::endl;

    full += " Welcome to C++.";
    std::cout << full << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`Hello, World!
Separator: -----
Empty string length: 0
Hello, World!
Hello, World! Welcome to C++.`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">String Operations</h2>

      <CppCode title="string_operations.cpp">{`#include <iostream>
#include <string>

int main() {
    std::string text = "The quick brown fox jumps over the lazy dog";

    // Length
    std::cout << "Length: " << text.length() << std::endl;

    // Accessing characters
    std::cout << "First char: " << text[0] << std::endl;
    std::cout << "Char at 4:  " << text.at(4) << std::endl;  // bounds-checked

    // Substring
    std::string word = text.substr(4, 5);  // start at index 4, length 5
    std::cout << "Substr(4,5): " << word << std::endl;

    // Find
    size_t pos = text.find("fox");
    std::cout << "'fox' found at index: " << pos << std::endl;

    pos = text.find("cat");
    if (pos == std::string::npos) {
        std::cout << "'cat' not found" << std::endl;
    }

    // Replace
    std::string modified = text;
    modified.replace(modified.find("lazy"), 4, "energetic");
    std::cout << "Replaced: " << modified << std::endl;

    // Compare
    std::cout << "\"abc\" == \"abc\": " << ("abc" == std::string("abc")) << std::endl;
    std::cout << "\"abc\" < \"abd\":  " << (std::string("abc") < std::string("abd")) << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`Length: 43
First char: T
Char at 4:  q
Substr(4,5): quick
'fox' found at index: 16
'cat' not found
Replaced: The quick brown fox jumps over the energetic dog
"abc" == "abc": 1
"abc" < "abd":  1`}</OutputBlock>

      <NoteBlock type="tip" title="at() vs [] for Character Access">
        <p>
          The <code>[]</code> operator does not check bounds and accessing an out-of-range index
          causes undefined behavior. The <code>at()</code> method throws a <code>std::out_of_range</code>
          exception if the index is invalid. Prefer <code>at()</code> when the index might be
          out of bounds.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Reading Strings with getline</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Since <code>std::cin &gt;&gt;</code> stops at whitespace, use <code>std::getline()</code> to
        read an entire line of text including spaces.
      </p>

      <CppCode title="getline_example.cpp">{`#include <iostream>
#include <string>

int main() {
    std::string fullName;
    std::string city;

    std::cout << "Enter your full name: ";
    std::getline(std::cin, fullName);

    std::cout << "Enter your city: ";
    std::getline(std::cin, city);

    std::cout << "Hello, " << fullName << " from " << city << "!" << std::endl;
    std::cout << "Your name has " << fullName.length() << " characters." << std::endl;

    return 0;
}`}</CppCode>

      <OutputBlock>{`Enter your full name: Alice Johnson
Enter your city: New York
Hello, Alice Johnson from New York!
Your name has 13 characters.`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">C-Strings vs std::string</h2>

      <SyntaxBlock title="C-Strings">
        <p>
          C-style strings are null-terminated character arrays inherited from C. They require
          manual memory management and use functions from <code>&lt;cstring&gt;</code>
          like <code>strlen()</code>, <code>strcpy()</code>, and <code>strcmp()</code>.
        </p>
        <CppCode>{`// C-style string (avoid in modern C++)
char cstr[] = "Hello";          // null-terminated array
int len = strlen(cstr);         // must use strlen, not .length()

// std::string (preferred)
std::string str = "Hello";      // manages its own memory
int len2 = str.length();        // member function`}</CppCode>
      </SyntaxBlock>

      <WarningBlock title="Avoid C-Strings in Modern C++">
        <p>
          C-style strings are error-prone: they can overflow buffers, require manual null
          termination, and lack bounds checking. Always prefer <code>std::string</code> unless
          you are interfacing with C libraries or need low-level control.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Use std::string by Default">
        <p>
          Always use <code>std::string</code> for text in C++ programs. It handles memory
          management, supports comparison with <code>==</code>, concatenation with <code>+</code>,
          and provides safe access methods. Convert to C-strings only when needed
          using <code>.c_str()</code>.
        </p>
      </BestPracticeBlock>

      <NoteBlock type="info" title="Useful String Methods">
        <p>
          Other handy methods include <code>empty()</code> to check if a string is empty,
          <code>clear()</code> to erase contents, <code>append()</code> to add text,
          <code>insert()</code> to insert at a position, <code>erase()</code> to remove characters,
          and <code>rfind()</code> to search backwards.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Word Counter"
        difficulty="beginner"
        prompt="Write a program that reads a sentence using getline and counts how many spaces it contains. The number of words is approximately the number of spaces plus one."
        hints={[
          "Use std::getline to read the full sentence",
          "Loop through each character and count spaces",
          "You can use a range-based for loop: for (char c : sentence)",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <string>

int main() {
    std::string sentence;
    std::cout << "Enter a sentence: ";
    std::getline(std::cin, sentence);

    int spaces = 0;
    for (char c : sentence) {
        if (c == ' ') {
            ++spaces;
        }
    }

    std::cout << "Spaces: " << spaces << std::endl;
    std::cout << "Approximate words: " << (spaces + 1) << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ExerciseBlock
        title="String Reverser"
        difficulty="intermediate"
        prompt="Write a program that reads a string and prints it reversed. Do this by building a new string character by character from the end of the original."
        hints={[
          "Use a for loop that starts at str.length() - 1 and goes to 0",
          "Append each character to a new string with +=",
          "Be careful with the loop variable type — use int or check bounds properly",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <string>

int main() {
    std::string original;
    std::cout << "Enter a string: ";
    std::getline(std::cin, original);

    std::string reversed;
    for (int i = original.length() - 1; i >= 0; --i) {
        reversed += original[i];
    }

    std::cout << "Reversed: " << reversed << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::string', url: 'https://en.cppreference.com/w/cpp/string/basic_string', description: 'Complete reference for the std::string class' },
        { type: 'cppreference', title: 'std::getline', url: 'https://en.cppreference.com/w/cpp/string/basic_string/getline', description: 'Reading lines from input streams' },
        { type: 'textbook', title: 'C++ Primer', author: 'Stanley Lippman', description: 'Chapter 3: Strings, Vectors, and Arrays' },
      ]} />
    </div>
  )
}
