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

export default function S1ClassTemplates() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Class templates extend the concept of generic programming to user-defined types. They allow you
        to define a class once and have the compiler generate type-specific versions as needed. The entire
        C++ Standard Library containers (<code>std::vector</code>, <code>std::map</code>, etc.) are class templates.
      </p>

      <DefinitionBlock title="Class Template">
        <p>
          A <strong>class template</strong> is a blueprint for generating classes. It defines a family of
          classes parameterized by one or more types or values. Each unique set of template arguments
          produces a distinct type.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Defining a Class Template</h2>

      <SyntaxBlock title="Basic class template syntax">
        <p>
          Prefix the class definition with <code>template&lt;typename T&gt;</code>. Inside the class body,
          <code>T</code> can be used anywhere a type is expected.
        </p>
        <CppCode>{`template<typename T>
class ClassName {
    T member;
public:
    ClassName(T val);
    T getValue() const;
};`}</CppCode>
      </SyntaxBlock>

      <CppCode title="A simple Box class template">{`#include <iostream>

template<typename T>
class Box {
    T value;
public:
    Box(T val) : value(val) {}
    T get() const { return value; }
    void set(T val) { value = val; }
};

int main() {
    Box<int> intBox(42);
    Box<std::string> strBox("Hello");

    std::cout << intBox.get() << std::endl;
    std::cout << strBox.get() << std::endl;

    intBox.set(100);
    std::cout << intBox.get() << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`42
Hello
100`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Member Function Templates</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        A class template can have member functions that are themselves templates, with their own
        additional template parameters independent of the class template parameters.
      </p>

      <CppCode title="Member function with its own template parameter">{`#include <iostream>

template<typename T>
class Converter {
    T value;
public:
    Converter(T val) : value(val) {}

    template<typename U>
    U convertTo() const {
        return static_cast<U>(value);
    }
};

int main() {
    Converter<double> conv(3.14);
    std::cout << conv.convertTo<int>() << std::endl;
    std::cout << conv.convertTo<float>() << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`3
3.14`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Out-of-Line Definitions</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Member functions of a class template can be defined outside the class body. Each out-of-line
        definition must repeat the template parameter list and qualify the function name with the
        class template name.
      </p>

      <CppCode title="Out-of-line member function definitions">{`#include <iostream>
#include <stdexcept>

template<typename T>
class Stack {
    T data[100];
    int top;
public:
    Stack();
    void push(T val);
    T pop();
    bool isEmpty() const;
};

template<typename T>
Stack<T>::Stack() : top(-1) {}

template<typename T>
void Stack<T>::push(T val) {
    if (top >= 99) throw std::overflow_error("Stack full");
    data[++top] = val;
}

template<typename T>
T Stack<T>::pop() {
    if (top < 0) throw std::underflow_error("Stack empty");
    return data[top--];
}

template<typename T>
bool Stack<T>::isEmpty() const {
    return top < 0;
}

int main() {
    Stack<int> s;
    s.push(10);
    s.push(20);
    std::cout << s.pop() << std::endl;
    std::cout << s.pop() << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`20
10`}</OutputBlock>

      <NoteBlock type="info" title="Implicit instantiation of members">
        <p>
          Member functions of a class template are only instantiated when they are actually used.
          If you never call <code>pop()</code> on a <code>Stack&lt;int&gt;</code>, the compiler will not
          generate code for <code>Stack&lt;int&gt;::pop()</code>. This means a class template can contain
          member functions that would not compile for certain types, as long as those functions are
          never called with those types.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Define class templates entirely in headers">
        <p>
          Place both the class template declaration and all member function definitions in the header
          file. Because the compiler needs the full definition at the point of instantiation, splitting
          a class template between a header and a <code>.cpp</code> file will cause linker errors.
        </p>
      </BestPracticeBlock>

      <CompilerNoteBlock compiler="all" title="CTAD in C++17">
        <p>
          Starting with C++17, class template argument deduction (CTAD) allows you to omit template
          arguments when constructing objects: <code>Box b(42);</code> deduces <code>Box&lt;int&gt;</code>.
          This works with standard library types too: <code>std::vector v = {"{"}1, 2, 3{"}"};</code>.
        </p>
      </CompilerNoteBlock>

      <ExerciseBlock
        title="Build a Generic Pair"
        difficulty="intermediate"
        prompt="Create a class template called MyPair that holds two values of potentially different types. Include a method swap() that swaps the two values (only when both types are the same). Define swap() out-of-line."
        hints={[
          "Use two template parameters: template<typename T, typename U>",
          "Store two members: T first and U second",
          "For swap(), you can add a separate single-type version or use static_assert",
        ]}
        solution={
          <CppCode>{`#include <iostream>

template<typename T>
class MyPair {
    T first, second;
public:
    MyPair(T a, T b) : first(a), second(b) {}
    void swap();
    void print() const {
        std::cout << "(" << first << ", " << second << ")" << std::endl;
    }
};

template<typename T>
void MyPair<T>::swap() {
    T temp = first;
    first = second;
    second = temp;
}

int main() {
    MyPair<int> p(10, 20);
    p.print();
    p.swap();
    p.print();
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Class template', url: 'https://en.cppreference.com/w/cpp/language/class_template', description: 'Complete class template reference' },
        { type: 'cppreference', title: 'Member templates', url: 'https://en.cppreference.com/w/cpp/language/member_template', description: 'Member function templates within class templates' },
        { type: 'textbook', title: 'C++ Templates: The Complete Guide', author: 'David Vandevoorde, Nicolai Josuttis, Douglas Gregor', description: 'Chapter 2: Class Templates' },
      ]} />
    </div>
  )
}
