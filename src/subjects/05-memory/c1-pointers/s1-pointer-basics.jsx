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

export default function S1PointerBasics() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Pointers are one of the most powerful features of C++. A pointer is a variable that stores the
        memory address of another variable. Understanding pointers is essential for dynamic memory
        allocation, efficient data structures, and low-level system programming.
      </p>

      <DefinitionBlock title="What is a Pointer?">
        <p>
          A <strong>pointer</strong> is a variable whose value is the memory address of another object
          or function. Pointers allow indirect access to data, enabling efficient manipulation of
          arrays, dynamic memory, and complex data structures.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Declaring and Using Pointers</h2>

      <SyntaxBlock title="Pointer Declaration">
        <p>
          A pointer is declared by placing an asterisk (<code>*</code>) between the type and the
          variable name. The <strong>address-of operator</strong> (<code>&</code>) retrieves the
          memory address of a variable.
        </p>
        <CppCode>{`Type* pointerName;          // pointer to Type
Type* pointerName = &variable; // initialized with address`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Address-of and Dereference">{`#include <iostream>

int main() {
    int value = 42;
    int* ptr = &value;   // ptr holds the address of value

    std::cout << "value:  " << value << std::endl;
    std::cout << "address: " << ptr << std::endl;
    std::cout << "deref:  " << *ptr << std::endl;  // dereference

    *ptr = 100;  // modify value through pointer
    std::cout << "value after: " << value << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`value:  42
address: 0x7ffd5e8a3b2c
deref:  42
value after: 100`}</OutputBlock>

      <NoteBlock type="info" title="The * Operator Has Two Meanings">
        <p>
          In a <strong>declaration</strong>, <code>*</code> indicates a pointer type
          (e.g., <code>int* ptr</code>). In an <strong>expression</strong>, <code>*ptr</code> is
          the <strong>dereference operator</strong> that accesses the value at the stored address.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Pointer Types and nullptr</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Pointers are strongly typed. A <code>int*</code> can only point to an <code>int</code>.
        When a pointer does not point to any valid object, it should be set to <code>nullptr</code>.
      </p>

      <CppCode title="Typed pointers and nullptr">{`#include <iostream>

int main() {
    double pi = 3.14159;
    double* dptr = &pi;
    int* iptr = nullptr;  // null pointer — points to nothing

    std::cout << "pi via pointer: " << *dptr << std::endl;

    if (iptr == nullptr) {
        std::cout << "iptr is null" << std::endl;
    }

    // int* bad = &pi;  // ERROR: type mismatch
    return 0;
}`}</CppCode>

      <OutputBlock>{`pi via pointer: 3.14159
iptr is null`}</OutputBlock>

      <WarningBlock title="Never Dereference a Null Pointer">
        <p>
          Dereferencing <code>nullptr</code> or an uninitialized pointer causes <strong>undefined
          behavior</strong>, typically a segmentation fault. Always check a pointer before
          dereferencing it, or use references when null is not a valid state.
        </p>
      </WarningBlock>

      <NoteBlock type="history" title="nullptr vs NULL">
        <p>
          Before C++11, the macro <code>NULL</code> (defined as <code>0</code>) was used. C++11
          introduced <code>nullptr</code>, a type-safe null pointer literal of
          type <code>std::nullptr_t</code>, which avoids ambiguity in overload resolution.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Always Initialize Pointers">
        <p>
          Initialize every pointer at declaration, either to the address of a valid object or
          to <code>nullptr</code>. Uninitialized pointers contain garbage addresses, making bugs
          extremely difficult to diagnose.
        </p>
      </BestPracticeBlock>

      <CppCode title="Pointer to pointer">{`#include <iostream>

int main() {
    int x = 5;
    int* p = &x;
    int** pp = &p;  // pointer to pointer

    std::cout << "x:   " << x << std::endl;
    std::cout << "**pp: " << **pp << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`x:   5
**pp: 5`}</OutputBlock>

      <ExerciseBlock
        title="Swap with Pointers"
        difficulty="beginner"
        prompt="Write a function that takes two int pointers and swaps the values they point to. Call it from main to swap two integers."
        hints={[
          "Dereference both pointers to access the values",
          "Use a temporary variable to hold one value during the swap",
        ]}
        solution={
          <CppCode>{`#include <iostream>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    std::cout << "Before: x=" << x << " y=" << y << std::endl;
    swap(&x, &y);
    std::cout << "After:  x=" << x << " y=" << y << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Pointer declaration', url: 'https://en.cppreference.com/w/cpp/language/pointer', description: 'Full pointer declaration syntax and semantics' },
        { type: 'cppreference', title: 'nullptr', url: 'https://en.cppreference.com/w/cpp/language/nullptr', description: 'The null pointer literal' },
        { type: 'textbook', title: 'A Tour of C++', author: 'Bjarne Stroustrup', description: 'Chapter 1: Pointers and references' },
      ]} />
    </div>
  )
}
