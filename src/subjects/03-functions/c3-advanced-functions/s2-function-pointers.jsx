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

export default function S2FunctionPointers() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        In C++, functions have addresses in memory just like variables. A <strong>function
        pointer</strong> stores the address of a function, allowing you to pass functions as
        arguments, store them in data structures, and call them indirectly. This is the foundation
        of the <strong>callback pattern</strong>.
      </p>

      <DefinitionBlock title="Function Pointer">
        <p>
          A <strong>function pointer</strong> is a variable that holds the address of a function.
          Its type encodes the function's return type and parameter types. Through a function
          pointer, you can invoke the pointed-to function at runtime.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Syntax</h2>

      <SyntaxBlock title="Declaring a Function Pointer">
        <p>
          The syntax uses parentheses around the pointer name to distinguish it from a function
          that returns a pointer.
        </p>
        <CppCode>{`// Pointer to a function taking (int, int) and returning int
int (*operation)(int, int);

// Compare with: a function returning int*
// int* operation(int, int);  // different meaning!`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Basic function pointer usage">{`#include <iostream>

int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }

int main() {
    int (*op)(int, int);  // declare a function pointer

    op = add;
    std::cout << "add: " << op(10, 3) << std::endl;

    op = subtract;
    std::cout << "sub: " << op(10, 3) << std::endl;

    op = multiply;
    std::cout << "mul: " << op(10, 3) << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`add: 13
sub: 7
mul: 30`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">The Callback Pattern</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        A callback is a function passed as an argument to another function. The receiving function
        calls it back at the appropriate time. This pattern decouples the algorithm from the
        specific operation.
      </p>

      <CppCode title="Callback example">{`#include <iostream>
#include <vector>

void applyToEach(std::vector<int>& vec, int (*transform)(int)) {
    for (int& val : vec) {
        val = transform(val);
    }
}

int doubleIt(int x) { return x * 2; }
int negate(int x) { return -x; }

int main() {
    std::vector<int> nums = {1, 2, 3, 4, 5};

    applyToEach(nums, doubleIt);
    for (int n : nums) std::cout << n << " ";
    std::cout << std::endl;

    applyToEach(nums, negate);
    for (int n : nums) std::cout << n << " ";
    std::cout << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`2 4 6 8 10
-2 -4 -6 -8 -10`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Simplifying with typedef and using</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Function pointer syntax is notoriously hard to read. Use <code>typedef</code> or
        the modern <code>using</code> alias to give the type a readable name.
      </p>

      <CppCode title="Type aliases for function pointers">{`#include <iostream>

// Old style: typedef
typedef int (*MathOp)(int, int);

// Modern style: using (preferred)
using MathOperation = int (*)(int, int);

int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

void compute(MathOperation op, int x, int y) {
    std::cout << "Result: " << op(x, y) << std::endl;
}

int main() {
    compute(add, 5, 3);
    compute(multiply, 5, 3);
    return 0;
}`}</CppCode>

      <OutputBlock>{`Result: 8
Result: 15`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::function — The Modern Alternative</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>std::function</code> from <code>&lt;functional&gt;</code> is a type-erased wrapper
        that can hold any callable: function pointers, lambdas, functors, or bound member
        functions. It has a small runtime cost but is far more flexible.
      </p>

      <CppCode title="std::function">{`#include <iostream>
#include <functional>

void repeat(int times, std::function<void()> action) {
    for (int i = 0; i < times; ++i) {
        action();
    }
}

void sayHello() {
    std::cout << "Hello! ";
}

int main() {
    repeat(3, sayHello);
    std::cout << std::endl;

    // Also works with lambdas
    repeat(2, []() { std::cout << "World! "; });
    std::cout << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Hello! Hello! Hello!
World! World!`}</OutputBlock>

      <NoteBlock type="tip" title="Function Pointers vs std::function">
        <p>
          Use raw function pointers for simple C-style callbacks or when zero overhead is
          required. Use <code>std::function</code> when you need to store lambdas with captures
          or want a uniform callable interface. For template-heavy code, accept callables as
          template parameters for maximum performance.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Use Type Aliases for Function Pointer Types">
        <p>
          Never write raw function pointer types in parameter lists or return types. A
          <code>using</code> alias like <code>using Callback = void(*)(int)</code> is dramatically
          more readable and reduces errors from misplaced parentheses.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Sorting with a Comparator"
        difficulty="intermediate"
        prompt="Write a function sortArray that takes a std::vector<int>& and a comparison function pointer bool(*)(int, int). Implement a simple bubble sort using the comparator. Demonstrate it with ascending and descending comparators."
        hints={[
          "The comparator returns true if the first argument should come before the second",
          "In bubble sort, swap adjacent elements when they are in the wrong order",
          "For ascending: return a < b; For descending: return a > b",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <vector>

using Comparator = bool (*)(int, int);

void sortArray(std::vector<int>& vec, Comparator cmp) {
    for (size_t i = 0; i < vec.size(); ++i) {
        for (size_t j = 1; j < vec.size() - i; ++j) {
            if (!cmp(vec[j - 1], vec[j])) {
                int tmp = vec[j - 1];
                vec[j - 1] = vec[j];
                vec[j] = tmp;
            }
        }
    }
}

bool ascending(int a, int b) { return a < b; }
bool descending(int a, int b) { return a > b; }

int main() {
    std::vector<int> nums = {5, 2, 8, 1, 9};

    sortArray(nums, ascending);
    for (int n : nums) std::cout << n << " ";
    std::cout << std::endl;

    sortArray(nums, descending);
    for (int n : nums) std::cout << n << " ";
    std::cout << std::endl;
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Pointer to function', url: 'https://en.cppreference.com/w/cpp/language/pointer#Pointers_to_functions', description: 'Function pointer syntax and semantics' },
        { type: 'cppreference', title: 'std::function', url: 'https://en.cppreference.com/w/cpp/utility/functional/function', description: 'General-purpose polymorphic function wrapper' },
        { type: 'textbook', title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', description: 'Chapter 12: Functions — pointers to functions' },
      ]} />
    </div>
  )
}
