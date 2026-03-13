import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import WarningBlock from '../../../components/content/WarningBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S3RefVsPtr() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        References and pointers both provide indirect access to objects, but they have fundamentally
        different semantics. Choosing the right one depends on whether null is a valid state,
        whether rebinding is needed, and what ownership model you intend to express.
      </p>

      <DefinitionBlock title="References vs Pointers">
        <p>
          A <strong>reference</strong> is an alias that must always refer to a valid object and cannot
          be rebound. A <strong>pointer</strong> is a variable holding a memory address that can
          be null, rebound, and subjected to arithmetic.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Comparison Table</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">Feature</th>
              <th className="px-4 py-2 text-left">Reference</th>
              <th className="px-4 py-2 text-left">Pointer</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">Syntax</td><td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">T&</td><td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">T*</td></tr>
            <tr><td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">Can be null</td><td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">No</td><td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">Yes (nullptr)</td></tr>
            <tr><td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">Must initialize</td><td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">Yes</td><td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">No (but should)</td></tr>
            <tr><td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">Can rebind</td><td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">No</td><td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">Yes</td></tr>
            <tr><td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">Arithmetic</td><td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">No</td><td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">Yes</td></tr>
            <tr><td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">Dereference needed</td><td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">No (automatic)</td><td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">Yes (* or ->)</td></tr>
            <tr><td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">Ownership semantics</td><td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">Non-owning</td><td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">Owning or non-owning</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Side-by-Side Code</h2>

      <CppCode title="Pointer vs reference parameter">{`#include <iostream>

void incrementByPtr(int* p) {
    if (p) {  // must check for null
        (*p)++;
    }
}

void incrementByRef(int& r) {
    r++;  // no null check needed — always valid
}

int main() {
    int a = 10, b = 20;

    incrementByPtr(&a);   // must take address explicitly
    incrementByRef(b);    // passed directly

    std::cout << "a: " << a << std::endl;
    std::cout << "b: " << b << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`a: 11
b: 21`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">When to Use Which</h2>

      <CppCode title="Rebinding: only possible with pointers">{`#include <iostream>

int main() {
    int x = 1, y = 2;

    int* ptr = &x;
    ptr = &y;       // rebind pointer to y
    std::cout << "*ptr: " << *ptr << std::endl;  // 2

    int& ref = x;
    ref = y;        // does NOT rebind — assigns y's value to x
    std::cout << "x: " << x << std::endl;        // 2
    std::cout << "y: " << y << std::endl;        // 2
    return 0;
}`}</CppCode>

      <OutputBlock>{`*ptr: 2
x: 2
y: 2`}</OutputBlock>

      <NoteBlock type="tip" title="Quick Decision Guide">
        <p>
          Use a <strong>reference</strong> when: the parameter is always valid, you want clean
          syntax, and rebinding is not needed. Use a <strong>pointer</strong> when: null is a
          meaningful state (optional parameter), you need to rebind, or you are interfacing with
          C APIs.
        </p>
      </NoteBlock>

      <WarningBlock title="Never Create a Null Reference">
        <p>
          While it is technically possible to create a null reference through pointer casting, doing
          so is <strong>undefined behavior</strong>. The language guarantees references are non-null;
          violating this assumption breaks all code that relies on it.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Prefer References Over Pointers">
        <p>
          For function parameters, default to <code>const T&</code> for input and <code>T&</code> for
          in-out parameters. Use pointers only when null is a valid argument, when you need
          rebinding, or when working with C-style APIs. For ownership, use smart pointers.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Optional Parameter"
        difficulty="intermediate"
        prompt="Write a function that formats a greeting. It takes a mandatory name (reference) and an optional title (pointer, nullptr if absent). Print 'Hello, Dr. Alice!' or 'Hello, Alice!' accordingly."
        hints={[
          "Use const std::string& for the name",
          "Use const std::string* for the optional title — check for nullptr",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <string>

void greet(const std::string& name, const std::string* title) {
    std::cout << "Hello, ";
    if (title) {
        std::cout << *title << " ";
    }
    std::cout << name << "!" << std::endl;
}

int main() {
    std::string t = "Dr.";
    greet("Alice", &t);
    greet("Bob", nullptr);
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Reference declaration', url: 'https://en.cppreference.com/w/cpp/language/reference', description: 'Lvalue and rvalue references' },
        { type: 'cppreference', title: 'Pointer declaration', url: 'https://en.cppreference.com/w/cpp/language/pointer', description: 'Pointer types and usage' },
        { type: 'textbook', title: 'C++ Core Guidelines', author: 'Bjarne Stroustrup & Herb Sutter', description: 'F.7: For general use, take T& or const T& arguments' },
      ]} />
    </div>
  )
}
