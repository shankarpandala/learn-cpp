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

export default function S2TemplateParams() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Template parameters are not limited to types. C++ templates support three kinds of parameters:
        type parameters, non-type parameters (compile-time constants), and template template parameters
        (templates that take other templates as arguments).
      </p>

      <DefinitionBlock title="Template Parameter Categories">
        <p>
          <strong>Type parameters</strong> represent types (<code>typename T</code>).
          <strong> Non-type parameters</strong> represent compile-time constant values (<code>int N</code>).
          <strong> Template template parameters</strong> represent templates themselves
          (<code>template&lt;typename&gt; class Container</code>).
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Non-Type Template Parameters</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Non-type parameters allow you to pass compile-time constant values to a template. Common uses
        include array sizes, bit widths, and fixed dimensions.
      </p>

      <CppCode title="Fixed-size array using non-type parameter">{`#include <iostream>
#include <stdexcept>

template<typename T, int N>
class FixedArray {
    T data[N];
public:
    T& operator[](int i) {
        if (i < 0 || i >= N) throw std::out_of_range("Index out of bounds");
        return data[i];
    }
    constexpr int size() const { return N; }
};

int main() {
    FixedArray<double, 5> arr;
    for (int i = 0; i < arr.size(); ++i) {
        arr[i] = i * 1.1;
    }
    for (int i = 0; i < arr.size(); ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`0 1.1 2.2 3.3 4.4`}</OutputBlock>

      <SyntaxBlock title="Allowed non-type parameter types">
        <p>
          Non-type parameters can be integral types, enumerations, pointers, references, and (since C++20)
          floating-point types and literal class types with certain restrictions.
        </p>
        <CppCode>{`template<int N>            // integer
template<char C>           // character
template<bool B>           // boolean
template<auto V>           // C++17: deduced non-type parameter
template<double D>         // C++20: floating-point`}</CppCode>
      </SyntaxBlock>

      <NoteBlock type="info" title="auto non-type parameters (C++17)">
        <p>
          C++17 allows <code>template&lt;auto V&gt;</code> where the type of the non-type parameter is
          deduced from the argument. This enables writing templates that accept any non-type parameter
          without specifying its type.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Default Template Arguments</h2>

      <CppCode title="Default template parameters">{`#include <iostream>
#include <vector>
#include <list>

template<typename T, typename Container = std::vector<T>>
class Stack {
    Container data;
public:
    void push(const T& val) { data.push_back(val); }
    T pop() {
        T val = data.back();
        data.pop_back();
        return val;
    }
    bool empty() const { return data.empty(); }
};

int main() {
    Stack<int> vecStack;             // uses std::vector<int>
    Stack<int, std::list<int>> listStack;  // uses std::list<int>

    vecStack.push(1);
    vecStack.push(2);
    std::cout << vecStack.pop() << std::endl;

    listStack.push(10);
    std::cout << listStack.pop() << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`2
10`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Template Template Parameters</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        A template template parameter allows you to pass a template (not a type) as an argument.
        This is useful when you want the user to specify a container template without specifying
        its element type.
      </p>

      <CppCode title="Template template parameter">{`#include <iostream>
#include <vector>
#include <deque>

template<typename T, template<typename...> class Container = std::vector>
class Collection {
    Container<T> items;
public:
    void add(const T& val) { items.push_back(val); }
    void printAll() const {
        for (const auto& item : items)
            std::cout << item << " ";
        std::cout << std::endl;
    }
};

int main() {
    Collection<int> vc;
    vc.add(1); vc.add(2); vc.add(3);
    vc.printAll();

    Collection<std::string, std::deque> dc;
    dc.add("hello"); dc.add("world");
    dc.printAll();
    return 0;
}`}</CppCode>

      <OutputBlock>{`1 2 3
hello world`}</OutputBlock>

      <WarningBlock title="Template template parameter compatibility">
        <p>
          Template template parameters must match the number and kind of parameters of the argument
          template. Using variadic <code>typename...</code> in the template template parameter
          (as shown above) provides the most flexibility and avoids issues with default allocator
          parameters in standard containers.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Provide sensible defaults">
        <p>
          When designing class templates, provide default template arguments for parameters that have
          a natural default choice. This follows the principle used throughout the standard library,
          such as <code>std::vector&lt;T, Allocator = std::allocator&lt;T&gt;&gt;</code>.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Matrix with Non-Type Parameters"
        difficulty="intermediate"
        prompt="Create a class template Matrix that takes a type T and two non-type int parameters Rows and Cols. Include a method at(int r, int c) that returns a reference to the element, and a method fill(T value) that sets all elements."
        hints={[
          "Store the data as T data[Rows][Cols] or T data[Rows * Cols]",
          "Use bounds checking in at() with an if statement or assert",
          "fill() should iterate over all Rows * Cols elements",
        ]}
        solution={
          <CppCode>{`#include <iostream>

template<typename T, int Rows, int Cols>
class Matrix {
    T data[Rows][Cols];
public:
    T& at(int r, int c) { return data[r][c]; }
    const T& at(int r, int c) const { return data[r][c]; }

    void fill(T value) {
        for (int r = 0; r < Rows; ++r)
            for (int c = 0; c < Cols; ++c)
                data[r][c] = value;
    }
};

int main() {
    Matrix<int, 2, 3> m;
    m.fill(0);
    m.at(0, 1) = 5;
    m.at(1, 2) = 9;
    for (int r = 0; r < 2; ++r) {
        for (int c = 0; c < 3; ++c)
            std::cout << m.at(r, c) << " ";
        std::cout << std::endl;
    }
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Template parameters', url: 'https://en.cppreference.com/w/cpp/language/template_parameters', description: 'All template parameter categories and rules' },
        { type: 'cppreference', title: 'Non-type template parameters', url: 'https://en.cppreference.com/w/cpp/language/template_parameters#Non-type_template_parameter', description: 'Allowed non-type parameter types' },
        { type: 'textbook', title: 'C++ Templates: The Complete Guide', author: 'David Vandevoorde, Nicolai Josuttis, Douglas Gregor', description: 'Chapter 3: Nontype Template Parameters' },
      ]} />
    </div>
  )
}
