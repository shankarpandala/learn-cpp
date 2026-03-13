import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S3TypeErasure() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Type erasure is a technique that hides concrete types behind a uniform interface, combining
        the flexibility of runtime polymorphism with value semantics. The standard library uses this
        pattern in <code>std::function</code>, <code>std::any</code>, and <code>std::move_only_function</code>.
      </p>

      <DefinitionBlock title="Type Erasure">
        <p>
          Type erasure is a design pattern that removes or hides the concrete type of an object,
          exposing only a fixed interface. It typically combines a concept (interface), a model
          (templated implementation), and an external wrapper with value semantics.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Standard Library Type Erasure</h2>

      <CppCode title="std::function as type erasure">{`#include <functional>
#include <iostream>

int add(int a, int b) { return a + b; }

struct Multiplier {
    int factor;
    int operator()(int a, int b) const { return a * b * factor; }
};

int main() {
    // std::function erases the callable type
    std::function<int(int, int)> op;

    op = add;                        // function pointer
    std::cout << "add: " << op(3, 4) << "\\n";

    op = Multiplier{2};             // function object
    std::cout << "multiply: " << op(3, 4) << "\\n";

    op = [](int a, int b) { return a - b; };  // lambda
    std::cout << "subtract: " << op(3, 4) << "\\n";

    return 0;
}`}</CppCode>

      <OutputBlock>{`add: 7
multiply: 24
subtract: -1`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Building a Custom Type-Erased Wrapper</h2>

      <CppCode title="Custom Drawable type-erased wrapper">{`#include <iostream>
#include <memory>
#include <vector>

class Drawable {
    // Concept: internal abstract interface
    struct Concept {
        virtual ~Concept() = default;
        virtual void draw() const = 0;
        virtual std::unique_ptr<Concept> clone() const = 0;
    };

    // Model: wraps any type satisfying the interface
    template <typename T>
    struct Model : Concept {
        T obj_;
        Model(T obj) : obj_(std::move(obj)) {}
        void draw() const override { obj_.draw(); }
        std::unique_ptr<Concept> clone() const override {
            return std::make_unique<Model>(obj_);
        }
    };

    std::unique_ptr<Concept> pImpl_;

public:
    template <typename T>
    Drawable(T obj) : pImpl_(std::make_unique<Model<T>>(std::move(obj))) {}

    Drawable(const Drawable& other) : pImpl_(other.pImpl_->clone()) {}
    Drawable& operator=(const Drawable& other) {
        pImpl_ = other.pImpl_->clone();
        return *this;
    }
    Drawable(Drawable&&) noexcept = default;
    Drawable& operator=(Drawable&&) noexcept = default;

    void draw() const { pImpl_->draw(); }
};

struct Circle {
    double radius;
    void draw() const { std::cout << "Circle(r=" << radius << ")\\n"; }
};

struct Rectangle {
    double w, h;
    void draw() const { std::cout << "Rect(" << w << "x" << h << ")\\n"; }
};

int main() {
    std::vector<Drawable> shapes;
    shapes.push_back(Circle{5.0});
    shapes.push_back(Rectangle{3.0, 4.0});
    shapes.push_back(Circle{2.5});

    for (const auto& shape : shapes) {
        shape.draw();
    }
    return 0;
}`}</CppCode>

      <OutputBlock>{`Circle(r=5)
Rect(3x4)
Circle(r=2.5)`}</OutputBlock>

      <NoteBlock type="info" title="Small Buffer Optimization (SBO)">
        <p>
          Many type-erased wrappers (including most <code>std::function</code> implementations)
          use Small Buffer Optimization: small callables are stored inline in a fixed-size buffer
          within the wrapper, avoiding heap allocation. Larger objects fall back to heap allocation.
          This is why <code>std::function</code> can be efficient for small lambdas.
        </p>
      </NoteBlock>

      <NoteBlock type="tip" title="std::any for Any-Type Storage">
        <p>
          <code>std::any</code> (C++17) type-erases any copyable type. Use <code>std::any_cast</code> to
          retrieve the stored value. It is useful for heterogeneous containers but lacks a domain-specific
          interface, so prefer custom type erasure when you need specific operations.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Choose the right polymorphism">
        <p>
          Use type erasure when you need value semantics with polymorphic behavior and want to avoid
          inheritance hierarchies. Use virtual functions when your types naturally form a class hierarchy.
          Use templates when all types are known at compile time.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Type-Erased Printable"
        difficulty="advanced"
        prompt="Create a type-erased 'Printable' wrapper that can hold any type with a 'toString()' method and print it. Store different Printable objects in a vector and print them all."
        hints={[
          "Follow the Concept/Model pattern from the Drawable example",
          "The Concept needs a virtual toString() method",
          "The Model calls obj_.toString() in its implementation",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <memory>
#include <string>
#include <vector>

class Printable {
    struct Concept {
        virtual ~Concept() = default;
        virtual std::string toString() const = 0;
        virtual std::unique_ptr<Concept> clone() const = 0;
    };
    template <typename T>
    struct Model : Concept {
        T obj_;
        Model(T obj) : obj_(std::move(obj)) {}
        std::string toString() const override { return obj_.toString(); }
        std::unique_ptr<Concept> clone() const override {
            return std::make_unique<Model>(obj_);
        }
    };
    std::unique_ptr<Concept> pImpl_;
public:
    template <typename T>
    Printable(T obj) : pImpl_(std::make_unique<Model<T>>(std::move(obj))) {}
    Printable(const Printable& o) : pImpl_(o.pImpl_->clone()) {}
    Printable& operator=(const Printable& o) { pImpl_ = o.pImpl_->clone(); return *this; }
    void print() const { std::cout << pImpl_->toString() << "\\n"; }
};

struct Name { std::string s; std::string toString() const { return "Name: " + s; } };
struct Age  { int n; std::string toString() const { return "Age: " + std::to_string(n); } };

int main() {
    std::vector<Printable> items;
    items.push_back(Name{"Alice"});
    items.push_back(Age{30});
    for (const auto& item : items) item.print();
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::function', url: 'https://en.cppreference.com/w/cpp/utility/functional/function', description: 'Standard type-erased callable wrapper' },
        { type: 'cppreference', title: 'std::any', url: 'https://en.cppreference.com/w/cpp/utility/any', description: 'Type-safe container for single values of any type' },
        { type: 'article', title: 'Breaking Dependencies: Type Erasure', author: 'Klaus Iglberger', url: 'https://www.youtube.com/watch?v=4eeESJQk-mw', description: 'CppCon talk on type erasure design' },
      ]} />
    </div>
  )
}
