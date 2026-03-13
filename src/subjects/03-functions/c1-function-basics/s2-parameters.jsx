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

export default function S2Parameters() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        How you pass arguments to a function determines whether the function works on a copy of
        the data or on the original. C++ gives you fine-grained control over this, which is
        critical for both correctness and performance.
      </p>

      <DefinitionBlock title="Parameters vs Arguments">
        <p>
          A <strong>parameter</strong> is the variable declared in a function's signature.
          An <strong>argument</strong> is the actual value passed when the function is called.
          The parameter passing mechanism determines how the argument's value reaches the parameter.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Pass by Value</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        By default, C++ copies the argument into the parameter. Changes to the parameter do not
        affect the original variable.
      </p>

      <CppCode title="Pass by value">{`#include <iostream>

void doubleValue(int x) {
    x = x * 2;  // modifies the local copy only
    std::cout << "Inside function: " << x << std::endl;
}

int main() {
    int num = 5;
    doubleValue(num);
    std::cout << "After call: " << num << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Inside function: 10
After call: 5`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Pass by Reference</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Adding <code>&amp;</code> after the type makes the parameter a reference to the original
        variable. No copy is made, and changes are visible to the caller.
      </p>

      <CppCode title="Pass by reference">{`#include <iostream>

void doubleValue(int& x) {
    x = x * 2;  // modifies the original
}

int main() {
    int num = 5;
    doubleValue(num);
    std::cout << "After call: " << num << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`After call: 10`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Pass by Const Reference</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        For large objects like <code>std::string</code> or <code>std::vector</code>, copying is
        expensive. Use <code>const T&amp;</code> to avoid the copy while preventing accidental
        modification.
      </p>

      <CppCode title="Pass by const reference">{`#include <iostream>
#include <string>

void printLength(const std::string& text) {
    std::cout << "\"" << text << "\" has "
              << text.size() << " characters" << std::endl;
    // text[0] = 'X';  // ERROR: text is const
}

int main() {
    std::string greeting = "Hello, World!";
    printLength(greeting);
    return 0;
}`}</CppCode>

      <OutputBlock>{`"Hello, World!" has 13 characters`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Pass by Pointer</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Passing a pointer gives the function the address of the variable. The function can
        modify the original through the pointer, and the pointer itself can be <code>nullptr</code>,
        which references cannot.
      </p>

      <CppCode title="Pass by pointer">{`#include <iostream>

void tryDouble(int* ptr) {
    if (ptr != nullptr) {
        *ptr = *ptr * 2;
    }
}

int main() {
    int num = 7;
    tryDouble(&num);
    std::cout << "After call: " << num << std::endl;

    tryDouble(nullptr);  // safe: function checks for null
    return 0;
}`}</CppCode>

      <OutputBlock>{`After call: 14`}</OutputBlock>

      <SyntaxBlock title="When to Use Which">
        <p>Use this decision guide for choosing a parameter passing style:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li><strong>Small types (int, double, char)</strong> that are read-only: pass by value.</li>
          <li><strong>Large types (std::string, std::vector)</strong> that are read-only: pass by <code>const T&amp;</code>.</li>
          <li><strong>Any type the function must modify</strong>: pass by reference (<code>T&amp;</code>).</li>
          <li><strong>Optional or nullable values</strong>: pass by pointer (<code>T*</code>).</li>
        </ul>
      </SyntaxBlock>

      <BestPracticeBlock title="Prefer const Reference for Large Objects">
        <p>
          Passing a <code>std::string</code> by value copies every character. For a read-only
          parameter, <code>const std::string&amp;</code> avoids the copy entirely with no risk of
          accidental modification. This is one of the most common C++ best practices.
        </p>
      </BestPracticeBlock>

      <NoteBlock type="tip" title="References Cannot Be Null">
        <p>
          Unlike pointers, a reference must always refer to a valid object. This makes references
          safer and simpler to use when <code>nullptr</code> is not a meaningful value.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Swap Two Integers"
        difficulty="beginner"
        prompt="Write a function swap(int& a, int& b) that swaps two integers. Demonstrate it in main() by printing the values before and after the swap."
        hints={[
          "You need a temporary variable to hold one value during the swap",
          "Pass by reference so the swap is visible in main()",
        ]}
        solution={
          <CppCode>{`#include <iostream>

void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 10, y = 20;
    std::cout << "Before: x=" << x << " y=" << y << std::endl;
    swap(x, y);
    std::cout << "After:  x=" << x << " y=" << y << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ExerciseBlock
        title="Normalize a String"
        difficulty="intermediate"
        prompt="Write a function that takes a const std::string& and returns a new std::string with all characters converted to lowercase. Why should the parameter be const reference?"
        hints={[
          "Use std::tolower() from <cctype> to convert each character",
          "The parameter is const reference because we read the string without modifying it and avoid copying",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <string>
#include <cctype>

std::string toLower(const std::string& input) {
    std::string result = input;
    for (char& c : result) {
        c = std::tolower(static_cast<unsigned char>(c));
    }
    return result;
}

int main() {
    std::string text = "Hello, C++ World!";
    std::cout << toLower(text) << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'References', url: 'https://en.cppreference.com/w/cpp/language/reference', description: 'Lvalue and rvalue reference documentation' },
        { type: 'cppreference', title: 'Pointer declaration', url: 'https://en.cppreference.com/w/cpp/language/pointer', description: 'Pointer types and syntax' },
        { type: 'textbook', title: 'A Tour of C++', author: 'Bjarne Stroustrup', description: 'Chapter 1: The Basics — parameter passing' },
      ]} />
    </div>
  )
}
