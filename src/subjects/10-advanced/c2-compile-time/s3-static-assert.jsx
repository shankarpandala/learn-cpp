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

export default function S3StaticAssert() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>static_assert</code> performs compile-time assertion checks, catching errors before
        your program ever runs. Combined with type traits and constexpr expressions, it is a powerful
        tool for enforcing constraints on templates, platform assumptions, and type requirements.
      </p>

      <DefinitionBlock title="static_assert">
        <p>
          <code>static_assert</code> evaluates a boolean constant expression at compile time. If the
          expression is <code>false</code>, the compiler emits a diagnostic with the optional message
          string. If <code>true</code>, it has no effect on the generated code.
        </p>
      </DefinitionBlock>

      <SyntaxBlock title="static_assert Syntax">
        <p>
          The first form includes a message string; the second (C++17) allows omitting the message.
        </p>
        <CppCode>{`static_assert(constant_expression, "error message");  // C++11
static_assert(constant_expression);                    // C++17`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Basic Usage</h2>

      <CppCode title="Platform and type assumptions">{`#include <cstdint>
#include <climits>

// Verify platform assumptions
static_assert(sizeof(int) >= 4, "int must be at least 4 bytes");
static_assert(sizeof(void*) == 8, "This code requires a 64-bit platform");
static_assert(CHAR_BIT == 8, "This code assumes 8-bit bytes");

// Verify type properties
static_assert(sizeof(std::int32_t) == 4, "int32_t must be 4 bytes");
static_assert(sizeof(double) == 8, "double must be 8 bytes");

int main() {
    // static_assert inside function bodies too
    constexpr int bufferSize = 1024;
    static_assert(bufferSize > 0, "Buffer size must be positive");
    static_assert((bufferSize & (bufferSize - 1)) == 0,
                  "Buffer size must be a power of 2");
    return 0;
}`}</CppCode>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Combining with Type Traits</h2>

      <CppCode title="Constraining templates with static_assert">{`#include <iostream>
#include <type_traits>
#include <string>

template <typename T>
T safeAdd(T a, T b) {
    static_assert(std::is_arithmetic_v<T>,
                  "safeAdd requires an arithmetic type");
    static_assert(!std::is_same_v<T, bool>,
                  "safeAdd does not support bool");
    return a + b;
}

template <typename T>
class Container {
    static_assert(std::is_default_constructible_v<T>,
                  "Container element must be default constructible");
    static_assert(std::is_copy_constructible_v<T>,
                  "Container element must be copy constructible");
    T data_[10]{};
public:
    const T& get(int i) const { return data_[i]; }
    void set(int i, const T& val) { data_[i] = val; }
};

int main() {
    std::cout << safeAdd(3, 4) << "\\n";
    std::cout << safeAdd(1.5, 2.5) << "\\n";
    // safeAdd(std::string("a"), std::string("b")); // Compile error!

    Container<int> c;
    c.set(0, 42);
    std::cout << c.get(0) << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`7
4
42`}</OutputBlock>

      <NoteBlock type="info" title="Common Type Traits for static_assert">
        <p>
          Frequently used traits include <code>std::is_integral_v</code>, <code>std::is_floating_point_v</code>,
          <code> std::is_trivially_copyable_v</code>, <code>std::is_base_of_v</code>,
          <code> std::is_invocable_v</code>, and <code>std::is_nothrow_move_constructible_v</code>.
          Each provides a compile-time boolean for validating type properties.
        </p>
      </NoteBlock>

      <CompilerNoteBlock compiler="all" title="Error Messages">
        <p>
          When a <code>static_assert</code> fails, compilers display the message string alongside the
          location. Writing clear, descriptive messages is essential for usability. In C++26,
          <code>static_assert</code> will support user-generated messages from <code>constexpr</code>
          strings.
        </p>
      </CompilerNoteBlock>

      <NoteBlock type="tip" title="static_assert vs Concepts (C++20)">
        <p>
          C++20 concepts provide a more elegant way to constrain templates. However,
          <code> static_assert</code> remains valuable for non-template checks, internal validations,
          and providing custom error messages within function bodies.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Document assumptions with static_assert">
        <p>
          Use <code>static_assert</code> to make implicit assumptions explicit: platform requirements,
          struct layout for serialization, alignment guarantees, and template parameter constraints.
          A failed static_assert is far easier to debug than subtle runtime misbehavior.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Validate a Serializable Type"
        difficulty="intermediate"
        prompt="Write a template function 'serialize' that uses static_assert to verify its type parameter is trivially copyable and has a size no greater than 64 bytes. If valid, print the type's size."
        hints={[
          "Use std::is_trivially_copyable_v<T>",
          "Use sizeof(T) <= 64 as the size constraint",
          "Both checks should be static_assert with descriptive messages",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <type_traits>

template <typename T>
void serialize(const T& value) {
    static_assert(std::is_trivially_copyable_v<T>,
                  "Type must be trivially copyable for serialization");
    static_assert(sizeof(T) <= 64,
                  "Type must be 64 bytes or smaller");
    std::cout << "Serializing " << sizeof(T) << " bytes\\n";
    // In real code: memcpy to buffer, write to file, etc.
}

struct Point { double x, y, z; };
// struct TooBig { char data[128]; };  // Would fail static_assert

int main() {
    Point p{1.0, 2.0, 3.0};
    serialize(p);
    serialize(42);
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'static_assert', url: 'https://en.cppreference.com/w/cpp/language/static_assert', description: 'Compile-time assertion reference' },
        { type: 'cppreference', title: 'Type traits', url: 'https://en.cppreference.com/w/cpp/header/type_traits', description: 'Complete type traits header reference' },
        { type: 'textbook', title: 'C++ Templates: The Complete Guide', author: 'Vandevoorde, Josuttis, Gregor', description: 'Chapter on type traits and compile-time checks' },
      ]} />
    </div>
  )
}
