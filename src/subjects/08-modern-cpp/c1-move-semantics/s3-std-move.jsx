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

export default function S3StdMove() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Two utility functions form the backbone of move semantics: <code>std::move</code> casts an
        lvalue to an rvalue reference, enabling moves, while <code>std::forward</code> preserves the
        value category of a forwarded argument, enabling <strong>perfect forwarding</strong>.
      </p>

      <DefinitionBlock title="std::move">
        <p>
          <code>std::move</code> is an unconditional cast to an rvalue reference. It does not move
          anything by itself; it simply signals to the compiler that the object may be moved from.
          The actual move happens when the result is passed to a move constructor or move assignment operator.
        </p>
      </DefinitionBlock>

      <SyntaxBlock title="std::move Syntax">
        <p>
          <code>std::move(x)</code> is equivalent to <code>static_cast&lt;T&&gt;(x)</code>. It
          lives in the <code>&lt;utility&gt;</code> header.
        </p>
        <CppCode>{`#include <utility>
T&& result = std::move(lvalue_expression);`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Using std::move</h2>

      <CppCode title="std_move_demo.cpp">{`#include <iostream>
#include <string>
#include <vector>
#include <utility>

int main() {
    std::string name = "Modern C++";
    std::vector<std::string> words;

    // Without move: copies the string
    words.push_back(name);
    std::cout << "After copy, name: " << name << "\\n";

    // With move: transfers ownership, much faster for large strings
    words.push_back(std::move(name));
    std::cout << "After move, name: \\"" << name << "\\"\\n";

    std::cout << "Vector: ";
    for (const auto& w : words) std::cout << w << " ";
    std::cout << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`After copy, name: Modern C++
After move, name: ""
Vector: Modern C++ Modern C++`}</OutputBlock>

      <WarningBlock title="std::move does not move">
        <p>
          Despite its name, <code>std::move</code> performs no actual movement. It is purely a cast.
          If the result is passed to a function that only accepts <code>const T&</code>, a copy will
          be made. The move only occurs when an overload accepting <code>T&&</code> is selected.
        </p>
      </WarningBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Perfect Forwarding with std::forward</h2>

      <DefinitionBlock title="Universal References and std::forward">
        <p>
          A <strong>universal reference</strong> (also called a forwarding reference) is declared as
          <code>T&&</code> where <code>T</code> is a deduced template parameter. <code>std::forward&lt;T&gt;</code>
          preserves whether the original argument was an lvalue or rvalue, forwarding it with the
          correct value category.
        </p>
      </DefinitionBlock>

      <CppCode title="perfect_forwarding.cpp">{`#include <iostream>
#include <string>
#include <utility>

void process(const std::string& s) {
    std::cout << "lvalue: " << s << "\\n";
}

void process(std::string&& s) {
    std::cout << "rvalue: " << s << "\\n";
}

// Universal reference: T&& with deduced T
template <typename T>
void relay(T&& arg) {
    process(std::forward<T>(arg));  // preserves value category
}

int main() {
    std::string greeting = "Hello";
    relay(greeting);              // passes lvalue -> calls lvalue overload
    relay(std::string("World"));  // passes rvalue -> calls rvalue overload
    relay(std::move(greeting));   // passes rvalue -> calls rvalue overload
    return 0;
}`}</CppCode>

      <OutputBlock>{`lvalue: Hello
rvalue: World
rvalue: Hello`}</OutputBlock>

      <NoteBlock type="info" title="Universal Reference vs. Rvalue Reference">
        <p>
          <code>T&&</code> is a universal reference only when <code>T</code> is deduced from a template
          parameter. In all other cases (such as <code>std::string&&</code> or <code>Widget&&</code>),
          it is a plain rvalue reference. The distinction is critical for understanding when to
          use <code>std::forward</code> versus <code>std::move</code>.
        </p>
      </NoteBlock>

      <NoteBlock type="tip" title="When to use which">
        <p>
          Use <code>std::move</code> when you know you want to move from an object and will not use
          it again. Use <code>std::forward</code> only inside templates with universal references to
          pass arguments exactly as they were received.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Do not std::move the return value of a local variable">
        <p>
          When returning a local variable from a function, do not use <code>std::move</code>.
          The compiler applies <strong>Named Return Value Optimization (NRVO)</strong> automatically,
          which is even better than a move. Using <code>std::move</code> on the return value
          actually prevents this optimization.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Perfect Forwarding Factory"
        difficulty="intermediate"
        prompt="Write a factory function template 'make' that constructs an object of type T by perfectly forwarding arbitrary arguments to T's constructor."
        hints={[
          "Use a variadic template: template<typename T, typename... Args>",
          "Use std::forward<Args>(args)... to forward all arguments",
          "Return the constructed T object",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <string>
#include <utility>

struct Person {
    std::string name;
    int age;
    Person(std::string n, int a) : name(std::move(n)), age(a) {
        std::cout << "Constructed: " << name << ", " << age << "\\n";
    }
};

template <typename T, typename... Args>
T make(Args&&... args) {
    return T(std::forward<Args>(args)...);
}

int main() {
    auto p = make<Person>("Alice", 30);
    std::cout << p.name << " is " << p.age << "\\n";
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::move', url: 'https://en.cppreference.com/w/cpp/utility/move', description: 'Unconditional cast to rvalue reference' },
        { type: 'cppreference', title: 'std::forward', url: 'https://en.cppreference.com/w/cpp/utility/forward', description: 'Conditional cast for perfect forwarding' },
        { type: 'textbook', title: 'Effective Modern C++', author: 'Scott Meyers', description: 'Items 23-25: std::move, std::forward, and universal references' },
      ]} />
    </div>
  )
}
