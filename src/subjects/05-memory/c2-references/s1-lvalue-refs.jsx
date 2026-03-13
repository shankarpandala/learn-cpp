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

export default function S1LvalueRefs() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        An lvalue reference creates an alias for an existing object. Unlike pointers, references
        cannot be null, cannot be rebound to another object after initialization, and do not require
        explicit dereferencing. They are the preferred way to pass and return objects efficiently.
      </p>

      <DefinitionBlock title="Lvalue Reference">
        <p>
          An <strong>lvalue reference</strong> (declared with <code>&</code>) is an alias that binds
          to an existing object (an lvalue). Once bound, the reference and the original name refer
          to the exact same object in memory.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic Reference Syntax</h2>

      <SyntaxBlock title="Declaring References">
        <p>
          A reference must be initialized at declaration and cannot be made to refer to a different
          object afterward.
        </p>
        <CppCode>{`Type& refName = existingVariable;
const Type& constRef = existingVariable;`}</CppCode>
      </SyntaxBlock>

      <CppCode title="References as aliases">{`#include <iostream>

int main() {
    int x = 42;
    int& ref = x;  // ref is an alias for x

    std::cout << "x:   " << x << std::endl;
    std::cout << "ref: " << ref << std::endl;

    ref = 100;  // modifies x through the alias
    std::cout << "x after ref = 100: " << x << std::endl;

    std::cout << "Same address? " << (&x == &ref ? "yes" : "no") << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`x:   42
ref: 42
x after ref = 100: 100
Same address? yes`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Pass by Reference</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Passing arguments by reference avoids copying and allows the function to modify the
        caller's variable directly.
      </p>

      <CppCode title="Function parameters by reference">{`#include <iostream>
#include <string>

void greet(const std::string& name) {  // no copy
    std::cout << "Hello, " << name << "!" << std::endl;
}

void increment(int& value) {  // modifies original
    ++value;
}

int main() {
    std::string user = "Alice";
    greet(user);

    int count = 0;
    increment(count);
    increment(count);
    std::cout << "count: " << count << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Hello, Alice!
count: 2`}</OutputBlock>

      <NoteBlock type="tip" title="const Reference for Read-Only Access">
        <p>
          Use <code>const T&</code> when you want to avoid copying but do not need to modify the
          object. A <code>const</code> reference can also bind to temporaries (rvalues), making it
          extremely versatile for function parameters.
        </p>
      </NoteBlock>

      <WarningBlock title="Dangling References">
        <p>
          Never return a reference to a local variable. When the function returns, the local is
          destroyed, and the reference becomes <strong>dangling</strong> — using it is undefined
          behavior.
        </p>
      </WarningBlock>

      <CppCode title="Dangling reference — DO NOT DO THIS">{`// BAD: returning reference to a local variable
int& bad() {
    int local = 42;
    return local;  // WARNING: dangling reference
}

// GOOD: return by value or reference to longer-lived object
int good() {
    int local = 42;
    return local;  // returns a copy
}`}</CppCode>

      <BestPracticeBlock title="Parameter Passing Guidelines">
        <p>
          Pass small types (<code>int</code>, <code>double</code>, pointers) by value. Pass large
          objects by <code>const&</code> for read-only access, and by <code>&</code> only when the
          function needs to modify the argument. Avoid raw non-const reference return values from
          functions unless the referred object outlives the call.
        </p>
      </BestPracticeBlock>

      <NoteBlock type="info" title="References Cannot Be Rebound">
        <p>
          Assigning to a reference changes the referred-to object, not the reference itself. There
          is no syntax to make a reference refer to a different object after initialization.
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Swap with References"
        difficulty="beginner"
        prompt="Write a swap function using references instead of pointers. It should swap two integers without using std::swap."
        hints={[
          "Use int& parameters instead of int*",
          "No need for dereference syntax — use the parameters directly",
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

      <ReferenceList references={[
        { type: 'cppreference', title: 'Reference declaration', url: 'https://en.cppreference.com/w/cpp/language/reference', description: 'Lvalue and rvalue reference syntax' },
        { type: 'cppreference', title: 'Value categories', url: 'https://en.cppreference.com/w/cpp/language/value_category', description: 'Understanding lvalues, rvalues, and more' },
        { type: 'textbook', title: 'A Tour of C++', author: 'Bjarne Stroustrup', description: 'Section 1.7: References' },
      ]} />
    </div>
  )
}
