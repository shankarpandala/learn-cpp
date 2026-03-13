import{j as e}from"./vendor-BlNF5je7.js";import{D as n,S as c,C as t,O as i,N as r,B as s,E as a,R as o,W as l,a as d}from"./subject-01-fundamentals-DsAKErwb.js";function p(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The Curiously Recurring Template Pattern (CRTP) is a C++ idiom where a class derives from a template base class, passing itself as the template argument. This enables static (compile-time) polymorphism, eliminating the overhead of virtual function dispatch while still providing polymorphic behavior."}),e.jsx(n,{title:"Curiously Recurring Template Pattern (CRTP)",children:e.jsxs("p",{children:["CRTP is an idiom in which a class ",e.jsx("code",{children:"Derived"})," inherits from a class template instantiated with ",e.jsx("code",{children:"Derived"})," itself: ",e.jsx("code",{children:"class Derived : public Base<Derived>"}),". The base class can call derived class methods at compile time without virtual functions."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic CRTP Structure"}),e.jsxs(c,{title:"CRTP Base Pattern",children:[e.jsxs("p",{children:["The base class is templated on the derived type, and uses ",e.jsx("code",{children:"static_cast"})," to access the derived class's implementation at compile time."]}),e.jsx(t,{children:`template <typename Derived>
class Base {
public:
    void interface() {
        static_cast<Derived*>(this)->implementation();
    }
};`})]}),e.jsx(t,{title:"Static polymorphism with CRTP",children:`#include <iostream>

template <typename Derived>
class Shape {
public:
    void draw() const {
        static_cast<const Derived*>(this)->drawImpl();
    }
    double area() const {
        return static_cast<const Derived*>(this)->areaImpl();
    }
};

class Circle : public Shape<Circle> {
    double radius_;
public:
    Circle(double r) : radius_(r) {}
    void drawImpl() const { std::cout << "Drawing circle\\n"; }
    double areaImpl() const { return 3.14159 * radius_ * radius_; }
};

class Square : public Shape<Square> {
    double side_;
public:
    Square(double s) : side_(s) {}
    void drawImpl() const { std::cout << "Drawing square\\n"; }
    double areaImpl() const { return side_ * side_; }
};

template <typename T>
void renderShape(const Shape<T>& shape) {
    shape.draw();
    std::cout << "Area: " << shape.area() << "\\n";
}

int main() {
    Circle c(5.0);
    Square s(4.0);
    renderShape(c);
    renderShape(s);
    return 0;
}`}),e.jsx(i,{children:`Drawing circle
Area: 78.5398
Drawing square
Area: 16`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"CRTP vs Virtual Functions"}),e.jsx(r,{type:"info",title:"Compile-Time vs Run-Time Dispatch",children:e.jsx("p",{children:"Virtual functions resolve calls at run time via a vtable lookup, adding indirection overhead. CRTP resolves calls at compile time, enabling inlining and eliminating vtable cost. However, CRTP cannot store heterogeneous objects in a single container without additional type erasure."})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Mixin Classes with CRTP"}),e.jsx(t,{title:"Adding functionality via CRTP mixins",children:`#include <iostream>

template <typename Derived>
class Printable {
public:
    void print() const {
        const auto& self = static_cast<const Derived&>(*this);
        std::cout << self.toString() << "\\n";
    }
};

template <typename Derived>
class Comparable {
public:
    bool operator==(const Derived& other) const {
        const auto& self = static_cast<const Derived&>(*this);
        return self.value() == other.value();
    }
    bool operator<(const Derived& other) const {
        const auto& self = static_cast<const Derived&>(*this);
        return self.value() < other.value();
    }
};

class Temperature : public Printable<Temperature>,
                     public Comparable<Temperature> {
    double celsius_;
public:
    Temperature(double c) : celsius_(c) {}
    std::string toString() const { return std::to_string(celsius_) + " C"; }
    double value() const { return celsius_; }
};

int main() {
    Temperature t1(36.6), t2(37.5);
    t1.print();
    t2.print();
    std::cout << std::boolalpha;
    std::cout << "Equal: " << (t1 == t2) << "\\n";
    std::cout << "t1 < t2: " << (t1 < t2) << "\\n";
    return 0;
}`}),e.jsx(i,{children:`36.600000 C
37.500000 C
Equal: false
t1 < t2: true`}),e.jsx(s,{title:"Use CRTP for zero-cost abstractions",children:e.jsx("p",{children:"Prefer CRTP over virtual functions when the set of types is known at compile time and you need maximum performance. Use virtual functions when you need runtime polymorphism with heterogeneous collections."})}),e.jsx(a,{title:"Implement a CRTP Counter Mixin",difficulty:"intermediate",prompt:"Create a CRTP mixin class 'Counter' that tracks how many instances of each derived class have been created. Test it with two different derived classes.",hints:["Use a static variable inside the CRTP base template","Increment the counter in the constructor, decrement in the destructor","Each template instantiation gets its own static counter"],solution:e.jsx(t,{children:`#include <iostream>

template <typename Derived>
class Counter {
    static int count_;
public:
    Counter() { ++count_; }
    ~Counter() { --count_; }
    static int getCount() { return count_; }
};
template <typename Derived>
int Counter<Derived>::count_ = 0;

class Widget : public Counter<Widget> {};
class Gadget : public Counter<Gadget> {};

int main() {
    Widget w1, w2, w3;
    Gadget g1;
    std::cout << "Widgets: " << Widget::getCount() << "\\n";
    std::cout << "Gadgets: " << Gadget::getCount() << "\\n";
    return 0;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"Curiously Recurring Template Pattern",url:"https://en.cppreference.com/w/cpp/language/crtp",description:"CRTP idiom documentation"},{type:"article",title:"Fluent C++ - The CRTP",url:"https://www.fluentcpp.com/2017/05/12/curiously-recurring-template-pattern/",author:"Jonathan Boccara",description:"In-depth CRTP tutorial"},{type:"textbook",title:"C++ Templates: The Complete Guide",author:"Vandevoorde, Josuttis, Gregor",description:"Chapter on CRTP and static polymorphism"}]})]})}const C=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"}));function u(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The Pimpl (Pointer to Implementation) idiom hides a class's implementation details behind a forward-declared pointer. This creates a compilation firewall, reducing build dependencies and preserving ABI stability when implementation details change."}),e.jsx(n,{title:"Pimpl Idiom",children:e.jsx("p",{children:"The Pimpl idiom separates a class's public interface from its private implementation by storing all private members in a separate class accessed through an opaque pointer. Changes to the implementation do not require recompilation of dependent code."})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"The Problem: Header Dependencies"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"When private members change in a header, all translation units that include that header must be recompiled. The Pimpl idiom eliminates this by moving private members into a source file."}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Pimpl with unique_ptr"}),e.jsx(t,{title:"widget.h - Public header",children:`#pragma once
#include <memory>
#include <string>

class Widget {
public:
    Widget(const std::string& name);
    ~Widget();  // Must be declared - defined in .cpp

    // Move operations
    Widget(Widget&& other) noexcept;
    Widget& operator=(Widget&& other) noexcept;

    // Public interface
    void doWork();
    std::string name() const;

private:
    struct Impl;                    // Forward declaration
    std::unique_ptr<Impl> pImpl_;   // Opaque pointer
};`}),e.jsx(t,{title:"widget.cpp - Implementation",children:`#include "widget.h"
#include <iostream>
#include <vector>  // Heavy headers only in .cpp

struct Widget::Impl {
    std::string name;
    std::vector<int> data;
    int counter = 0;

    void internalProcess() {
        ++counter;
        std::cout << name << " processed " << counter << " times\\n";
    }
};

Widget::Widget(const std::string& name)
    : pImpl_(std::make_unique<Impl>()) {
    pImpl_->name = name;
}

Widget::~Widget() = default;
Widget::Widget(Widget&&) noexcept = default;
Widget& Widget::operator=(Widget&&) noexcept = default;

void Widget::doWork() {
    pImpl_->internalProcess();
}

std::string Widget::name() const {
    return pImpl_->name;
}`}),e.jsx(t,{title:"main.cpp - Usage",children:`#include "widget.h"
#include <iostream>

int main() {
    Widget w("MyWidget");
    w.doWork();
    w.doWork();
    std::cout << "Name: " << w.name() << "\\n";
    return 0;
}`}),e.jsx(i,{children:`MyWidget processed 1 times
MyWidget processed 2 times
Name: MyWidget`}),e.jsx(c,{title:"Why Destructor Must Be in .cpp",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::unique_ptr"})," requires the complete type at the point where the destructor is defined. Since ",e.jsx("code",{children:"Impl"})," is only forward-declared in the header, the destructor must be defined in the ",e.jsx("code",{children:".cpp"})," file where ",e.jsx("code",{children:"Impl"})," is fully defined."]})}),e.jsx(l,{title:"Copy Semantics",children:e.jsxs("p",{children:["A class using Pimpl with ",e.jsx("code",{children:"std::unique_ptr"})," is not copyable by default. If you need copy semantics, you must implement the copy constructor and copy assignment operator manually, performing a deep copy of the Impl object."]})}),e.jsx(r,{type:"info",title:"ABI Stability",children:e.jsxs("p",{children:["Because the class size never changes (it only contains a pointer), you can modify the",e.jsx("code",{children:"Impl"})," struct freely without breaking binary compatibility. This is critical for shared libraries where recompilation of client code is not always possible."]})}),e.jsx(s,{title:"Use Pimpl for stable library interfaces",children:e.jsx("p",{children:"Apply Pimpl to classes that form part of a public API or are included widely across a large codebase. The small runtime cost (heap allocation, pointer indirection) is usually outweighed by faster compile times and ABI stability."})}),e.jsx(a,{title:"Add Copy Semantics to Pimpl",difficulty:"intermediate",prompt:"Extend the Widget class above to support deep copy: implement a copy constructor and copy assignment operator that duplicate the Impl object.",hints:["The copy constructor should create a new unique_ptr<Impl> by copying the other's Impl","Use std::make_unique<Impl>(*other.pImpl_) for the deep copy","Remember the copy-and-swap idiom for exception-safe assignment"],solution:e.jsx(t,{children:`// Add to widget.h:
// Widget(const Widget& other);
// Widget& operator=(const Widget& other);

// In widget.cpp:
Widget::Widget(const Widget& other)
    : pImpl_(std::make_unique<Impl>(*other.pImpl_)) {}

Widget& Widget::operator=(const Widget& other) {
    if (this != &other) {
        pImpl_ = std::make_unique<Impl>(*other.pImpl_);
    }
    return *this;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"PImpl idiom",url:"https://en.cppreference.com/w/cpp/language/pimpl",description:"Pimpl idiom reference"},{type:"article",title:"GotW #100: Compilation Firewalls",url:"https://herbsutter.com/gotw/_100/",author:"Herb Sutter",description:"Detailed Pimpl discussion"},{type:"textbook",title:"Effective Modern C++",author:"Scott Meyers",description:"Item 22: Using Pimpl with unique_ptr"}]})]})}const k=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"}));function h(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Type erasure is a technique that hides concrete types behind a uniform interface, combining the flexibility of runtime polymorphism with value semantics. The standard library uses this pattern in ",e.jsx("code",{children:"std::function"}),", ",e.jsx("code",{children:"std::any"}),", and ",e.jsx("code",{children:"std::move_only_function"}),"."]}),e.jsx(n,{title:"Type Erasure",children:e.jsx("p",{children:"Type erasure is a design pattern that removes or hides the concrete type of an object, exposing only a fixed interface. It typically combines a concept (interface), a model (templated implementation), and an external wrapper with value semantics."})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Standard Library Type Erasure"}),e.jsx(t,{title:"std::function as type erasure",children:`#include <functional>
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
}`}),e.jsx(i,{children:`add: 7
multiply: 24
subtract: -1`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Building a Custom Type-Erased Wrapper"}),e.jsx(t,{title:"Custom Drawable type-erased wrapper",children:`#include <iostream>
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
}`}),e.jsx(i,{children:`Circle(r=5)
Rect(3x4)
Circle(r=2.5)`}),e.jsx(r,{type:"info",title:"Small Buffer Optimization (SBO)",children:e.jsxs("p",{children:["Many type-erased wrappers (including most ",e.jsx("code",{children:"std::function"})," implementations) use Small Buffer Optimization: small callables are stored inline in a fixed-size buffer within the wrapper, avoiding heap allocation. Larger objects fall back to heap allocation. This is why ",e.jsx("code",{children:"std::function"})," can be efficient for small lambdas."]})}),e.jsx(r,{type:"tip",title:"std::any for Any-Type Storage",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::any"})," (C++17) type-erases any copyable type. Use ",e.jsx("code",{children:"std::any_cast"})," to retrieve the stored value. It is useful for heterogeneous containers but lacks a domain-specific interface, so prefer custom type erasure when you need specific operations."]})}),e.jsx(s,{title:"Choose the right polymorphism",children:e.jsx("p",{children:"Use type erasure when you need value semantics with polymorphic behavior and want to avoid inheritance hierarchies. Use virtual functions when your types naturally form a class hierarchy. Use templates when all types are known at compile time."})}),e.jsx(a,{title:"Type-Erased Printable",difficulty:"advanced",prompt:"Create a type-erased 'Printable' wrapper that can hold any type with a 'toString()' method and print it. Store different Printable objects in a vector and print them all.",hints:["Follow the Concept/Model pattern from the Drawable example","The Concept needs a virtual toString() method","The Model calls obj_.toString() in its implementation"],solution:e.jsx(t,{children:`#include <iostream>
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
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"std::function",url:"https://en.cppreference.com/w/cpp/utility/functional/function",description:"Standard type-erased callable wrapper"},{type:"cppreference",title:"std::any",url:"https://en.cppreference.com/w/cpp/utility/any",description:"Type-safe container for single values of any type"},{type:"article",title:"Breaking Dependencies: Type Erasure",author:"Klaus Iglberger",url:"https://www.youtube.com/watch?v=4eeESJQk-mw",description:"CppCon talk on type erasure design"}]})]})}const z=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"}));function m(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The ",e.jsx("code",{children:"constexpr"})," specifier enables computations to happen at compile time, moving work from runtime to compilation. With each C++ standard revision, constexpr has grown more powerful, culminating in constexpr containers and algorithms in C++20."]}),e.jsx(n,{title:"constexpr",children:e.jsxs("p",{children:[e.jsx("code",{children:"constexpr"})," declares that a variable or function can be evaluated at compile time. A constexpr function must produce a constant expression when called with constant arguments. At runtime, it behaves like a normal function."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"constexpr Functions In Depth"}),e.jsx(t,{title:"Compile-time computation",children:`#include <iostream>
#include <array>

constexpr int factorial(int n) {
    int result = 1;
    for (int i = 2; i <= n; ++i) {
        result *= i;
    }
    return result;
}

constexpr int fibonacci(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; ++i) {
        int tmp = a + b;
        a = b;
        b = tmp;
    }
    return b;
}

int main() {
    constexpr int f10 = factorial(10);
    constexpr int fib20 = fibonacci(20);
    static_assert(f10 == 3628800, "factorial(10) must be 3628800");

    std::cout << "10! = " << f10 << "\\n";
    std::cout << "fib(20) = " << fib20 << "\\n";

    // Also works at runtime with non-constant args
    int n;
    std::cin >> n;
    std::cout << "fib(" << n << ") = " << fibonacci(n) << "\\n";
    return 0;
}`}),e.jsx(i,{children:`10! = 3628800
fib(20) = 6765`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"constexpr if (C++17)"}),e.jsxs(c,{title:"if constexpr Syntax",children:[e.jsxs("p",{children:[e.jsx("code",{children:"if constexpr"})," evaluates a condition at compile time. The discarded branch is not instantiated, enabling template code that would otherwise fail to compile."]}),e.jsx(t,{children:`if constexpr (condition) {
    // compiled only if condition is true
} else {
    // compiled only if condition is false
}`})]}),e.jsx(t,{title:"Using if constexpr in templates",children:`#include <iostream>
#include <type_traits>
#include <string>

template <typename T>
auto stringify(const T& value) {
    if constexpr (std::is_arithmetic_v<T>) {
        return std::to_string(value);
    } else if constexpr (std::is_same_v<T, std::string>) {
        return value;
    } else {
        return std::string("[unknown type]");
    }
}

int main() {
    std::cout << stringify(42) << "\\n";
    std::cout << stringify(3.14) << "\\n";
    std::cout << stringify(std::string("hello")) << "\\n";
    return 0;
}`}),e.jsx(i,{children:`42
3.140000
hello`}),e.jsx(r,{type:"info",title:"constexpr Containers (C++20)",children:e.jsxs("p",{children:["C++20 allows ",e.jsx("code",{children:"std::vector"})," and ",e.jsx("code",{children:"std::string"})," in constexpr contexts. Memory allocated during constant evaluation must be freed before the evaluation ends (transient allocation). This enables powerful compile-time data processing."]})}),e.jsx(d,{compiler:"gcc",title:"C++20 constexpr Support",children:e.jsxs("p",{children:["GCC 12+ and Clang 15+ fully support constexpr ",e.jsx("code",{children:"std::vector"})," and",e.jsx("code",{children:"std::string"}),". Use ",e.jsx("code",{children:"-std=c++20"})," or later to enable these features."]})}),e.jsx(r,{type:"important",title:"constexpr Limitations",children:e.jsxs("p",{children:["constexpr functions cannot use ",e.jsx("code",{children:"goto"}),", non-literal types (before C++20 relaxations), or ",e.jsx("code",{children:"reinterpret_cast"}),". They cannot have undefined behavior. In C++20+, they can use try/catch, virtual functions, and dynamic allocation (with restrictions)."]})}),e.jsx(s,{title:"Prefer constexpr for compile-time constants",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"constexpr"})," for functions that compute values used as template arguments, array sizes, or switch cases. This catches errors earlier, eliminates runtime overhead, and makes intent clear."]})}),e.jsx(a,{title:"Compile-Time Lookup Table",difficulty:"intermediate",prompt:"Write a constexpr function that generates an std::array of the first N squares (0, 1, 4, 9, ...). Use it to create a compile-time lookup table of 10 squares and verify with static_assert.",hints:["Use std::array<int, N> as the return type","Build the array in a constexpr function with a loop","Use static_assert to check specific values"],solution:e.jsx(t,{children:`#include <array>
#include <iostream>

template <std::size_t N>
constexpr std::array<int, N> makeSquares() {
    std::array<int, N> result{};
    for (std::size_t i = 0; i < N; ++i) {
        result[i] = static_cast<int>(i * i);
    }
    return result;
}

int main() {
    constexpr auto squares = makeSquares<10>();
    static_assert(squares[0] == 0);
    static_assert(squares[3] == 9);
    static_assert(squares[9] == 81);

    for (int s : squares) {
        std::cout << s << " ";
    }
    std::cout << "\\n";
    return 0;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"constexpr specifier",url:"https://en.cppreference.com/w/cpp/language/constexpr",description:"Full constexpr reference"},{type:"cppreference",title:"if constexpr",url:"https://en.cppreference.com/w/cpp/language/if#Constexpr_if",description:"Compile-time conditional documentation"},{type:"article",title:"constexpr Everything",author:"Jason Turner",url:"https://www.youtube.com/watch?v=PJwd4JLYJJY",description:"CppCon talk on constexpr best practices"}]})]})}const T=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"}));function f(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++20 introduced ",e.jsx("code",{children:"consteval"})," for functions that must be evaluated at compile time, and",e.jsx("code",{children:" constinit"})," to ensure variables are constant-initialized. Together they provide stronger guarantees than ",e.jsx("code",{children:"constexpr"})," and help eliminate the static initialization order fiasco."]}),e.jsx(n,{title:"consteval (Immediate Functions)",children:e.jsxs("p",{children:["A ",e.jsx("code",{children:"consteval"})," function must produce a compile-time constant. Unlike",e.jsx("code",{children:" constexpr"}),", which ",e.jsx("em",{children:"may"})," run at compile time, ",e.jsx("code",{children:"consteval"}),e.jsx("em",{children:" must"})," run at compile time. Calling a consteval function with runtime values is a compilation error."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"consteval: Guaranteed Compile-Time"}),e.jsxs(c,{title:"consteval Syntax",children:[e.jsxs("p",{children:["Declare a function with the ",e.jsx("code",{children:"consteval"})," specifier. Every call must be a constant expression."]}),e.jsx(t,{children:`consteval int function_name(parameters) {
    // must be evaluable at compile time
}`})]}),e.jsx(t,{title:"consteval vs constexpr",children:`#include <iostream>

consteval int sqr(int n) { return n * n; }
constexpr int cube(int n) { return n * n * n; }

int main() {
    constexpr int a = sqr(5);     // OK: compile-time
    constexpr int b = cube(3);    // OK: compile-time

    int x = 4;
    // int c = sqr(x);            // ERROR: x is not a constant
    int d = cube(x);              // OK: constexpr can run at runtime

    std::cout << "sqr(5) = " << a << "\\n";
    std::cout << "cube(3) = " << b << "\\n";
    std::cout << "cube(4) = " << d << "\\n";
    return 0;
}`}),e.jsx(i,{children:`sqr(5) = 25
cube(3) = 27
cube(4) = 64`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"constinit: Constant Initialization"}),e.jsx(n,{title:"constinit",children:e.jsxs("p",{children:[e.jsx("code",{children:"constinit"})," ensures a variable with static or thread-local storage duration is initialized at compile time (constant initialization). Unlike ",e.jsx("code",{children:"constexpr"}),", the variable itself is not const and can be modified after initialization."]})}),e.jsx(t,{title:"constinit usage",children:`#include <iostream>

consteval int computeInitial() { return 42; }

constinit int globalValue = computeInitial();  // Guaranteed compile-time init
constinit thread_local int threadVal = 100;    // Per-thread, compile-time init

int main() {
    std::cout << "globalValue = " << globalValue << "\\n";
    globalValue = 99;  // OK: constinit does NOT make it const
    std::cout << "globalValue = " << globalValue << "\\n";

    threadVal += 5;
    std::cout << "threadVal = " << threadVal << "\\n";
    return 0;
}`}),e.jsx(i,{children:`globalValue = 42
globalValue = 99
threadVal = 105`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Static Initialization Order Fiasco"}),e.jsx(l,{title:"The Fiasco",children:e.jsxs("p",{children:["The order of initialization of non-local static variables across translation units is undefined. If one static variable depends on another in a different file, you may get uninitialized values. ",e.jsx("code",{children:"constinit"})," prevents this by ensuring compile-time initialization, and the Construct on First Use idiom solves it for non-trivial objects."]})}),e.jsx(t,{title:"Construct on First Use idiom",children:`#include <iostream>
#include <string>

// Instead of: static std::string config = loadConfig();
// Use a function-local static:
const std::string& getConfig() {
    static const std::string config = "default_config";
    return config;  // Initialized on first call, thread-safe since C++11
}

int main() {
    std::cout << "Config: " << getConfig() << "\\n";
    return 0;
}`}),e.jsx(i,{children:"Config: default_config"}),e.jsx(r,{type:"info",title:"consteval and constinit Interaction",children:e.jsxs("p",{children:["You can use ",e.jsx("code",{children:"consteval"})," functions to compute the initializer for",e.jsx("code",{children:" constinit"})," variables, guaranteeing that complex initialization logic still happens at compile time with no runtime overhead or ordering issues."]})}),e.jsx(s,{title:"Use constinit for static variables",children:e.jsxs("p",{children:["Apply ",e.jsx("code",{children:"constinit"})," to global and static variables whenever possible. This guarantees safe initialization ordering and prevents subtle bugs from the static initialization order fiasco. Use ",e.jsx("code",{children:"consteval"})," when you must guarantee a function never runs at runtime."]})}),e.jsx(a,{title:"Compile-Time Hash Function",difficulty:"intermediate",prompt:"Write a consteval function that computes a simple hash of a string literal (e.g., sum of character values). Use constinit to store the hash of a known string as a global variable.",hints:["Use a consteval function taking const char* and std::size_t","Loop over characters, accumulating a hash value","Use constinit to declare the global variable with the computed hash"],solution:e.jsx(t,{children:`#include <iostream>
#include <cstddef>

consteval unsigned int simpleHash(const char* str, std::size_t len) {
    unsigned int hash = 0;
    for (std::size_t i = 0; i < len; ++i) {
        hash = hash * 31 + static_cast<unsigned int>(str[i]);
    }
    return hash;
}

constinit unsigned int configHash = simpleHash("settings", 8);

int main() {
    std::cout << "Hash: " << configHash << "\\n";
    static_assert(simpleHash("abc", 3) == (('a' * 31 + 'b') * 31 + 'c'));
    return 0;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"consteval specifier",url:"https://en.cppreference.com/w/cpp/language/consteval",description:"Immediate function specifier"},{type:"cppreference",title:"constinit specifier",url:"https://en.cppreference.com/w/cpp/language/constinit",description:"Constant initialization specifier"},{type:"article",title:"Static Initialization Order Fiasco",url:"https://isocpp.org/wiki/faq/ctors#static-init-order",description:"C++ FAQ on the fiasco and solutions"}]})]})}const A=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"}));function g(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"static_assert"})," performs compile-time assertion checks, catching errors before your program ever runs. Combined with type traits and constexpr expressions, it is a powerful tool for enforcing constraints on templates, platform assumptions, and type requirements."]}),e.jsx(n,{title:"static_assert",children:e.jsxs("p",{children:[e.jsx("code",{children:"static_assert"})," evaluates a boolean constant expression at compile time. If the expression is ",e.jsx("code",{children:"false"}),", the compiler emits a diagnostic with the optional message string. If ",e.jsx("code",{children:"true"}),", it has no effect on the generated code."]})}),e.jsxs(c,{title:"static_assert Syntax",children:[e.jsx("p",{children:"The first form includes a message string; the second (C++17) allows omitting the message."}),e.jsx(t,{children:`static_assert(constant_expression, "error message");  // C++11
static_assert(constant_expression);                    // C++17`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic Usage"}),e.jsx(t,{title:"Platform and type assumptions",children:`#include <cstdint>
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
}`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Combining with Type Traits"}),e.jsx(t,{title:"Constraining templates with static_assert",children:`#include <iostream>
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
}`}),e.jsx(i,{children:`7
4
42`}),e.jsx(r,{type:"info",title:"Common Type Traits for static_assert",children:e.jsxs("p",{children:["Frequently used traits include ",e.jsx("code",{children:"std::is_integral_v"}),", ",e.jsx("code",{children:"std::is_floating_point_v"}),",",e.jsx("code",{children:" std::is_trivially_copyable_v"}),", ",e.jsx("code",{children:"std::is_base_of_v"}),",",e.jsx("code",{children:" std::is_invocable_v"}),", and ",e.jsx("code",{children:"std::is_nothrow_move_constructible_v"}),". Each provides a compile-time boolean for validating type properties."]})}),e.jsx(d,{compiler:"all",title:"Error Messages",children:e.jsxs("p",{children:["When a ",e.jsx("code",{children:"static_assert"})," fails, compilers display the message string alongside the location. Writing clear, descriptive messages is essential for usability. In C++26,",e.jsx("code",{children:"static_assert"})," will support user-generated messages from ",e.jsx("code",{children:"constexpr"}),"strings."]})}),e.jsx(r,{type:"tip",title:"static_assert vs Concepts (C++20)",children:e.jsxs("p",{children:["C++20 concepts provide a more elegant way to constrain templates. However,",e.jsx("code",{children:" static_assert"})," remains valuable for non-template checks, internal validations, and providing custom error messages within function bodies."]})}),e.jsx(s,{title:"Document assumptions with static_assert",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"static_assert"})," to make implicit assumptions explicit: platform requirements, struct layout for serialization, alignment guarantees, and template parameter constraints. A failed static_assert is far easier to debug than subtle runtime misbehavior."]})}),e.jsx(a,{title:"Validate a Serializable Type",difficulty:"intermediate",prompt:"Write a template function 'serialize' that uses static_assert to verify its type parameter is trivially copyable and has a size no greater than 64 bytes. If valid, print the type's size.",hints:["Use std::is_trivially_copyable_v<T>","Use sizeof(T) <= 64 as the size constraint","Both checks should be static_assert with descriptive messages"],solution:e.jsx(t,{children:`#include <iostream>
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
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"static_assert",url:"https://en.cppreference.com/w/cpp/language/static_assert",description:"Compile-time assertion reference"},{type:"cppreference",title:"Type traits",url:"https://en.cppreference.com/w/cpp/header/type_traits",description:"Complete type traits header reference"},{type:"textbook",title:"C++ Templates: The Complete Guide",author:"Vandevoorde, Josuttis, Gregor",description:"Chapter on type traits and compile-time checks"}]})]})}const N=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"}));function x(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Undefined behavior (UB) is one of the most important concepts in C++. When a program triggers UB, the C++ standard places no requirements on its behavior: it may crash, produce wrong results, appear to work correctly, or do anything else. Understanding common sources of UB is essential for writing reliable C++ code."}),e.jsx(n,{title:"Undefined Behavior (UB)",children:e.jsx("p",{children:"Undefined behavior occurs when the C++ standard imposes no requirements on the program's behavior. The compiler is free to assume UB never happens, which enables aggressive optimizations but means UB can cause entirely unpredictable results, including appearing to work until it does not."})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Buffer Overflow"}),e.jsx(l,{title:"Out-of-Bounds Access",children:e.jsx("p",{children:"Accessing memory outside the bounds of an array or container is undefined behavior."})}),e.jsx(t,{title:"Buffer overflow examples",children:`int arr[5] = {1, 2, 3, 4, 5};
int x = arr[10];        // UB: out of bounds read
arr[-1] = 42;           // UB: out of bounds write

// Safe alternative: use std::array with .at()
#include <array>
std::array<int, 5> safe = {1, 2, 3, 4, 5};
try {
    int y = safe.at(10);  // Throws std::out_of_range
} catch (const std::out_of_range& e) {
    // Handle error
}`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Dangling References and Use-After-Free"}),e.jsx(t,{title:"Dangling reference and use-after-free",children:`#include <string>
#include <memory>

// Dangling reference
const std::string& getDangling() {
    std::string local = "hello";
    return local;  // UB: returning reference to local variable
}

// Use-after-free
int* useAfterFree() {
    int* p = new int(42);
    delete p;
    *p = 10;  // UB: writing to freed memory
    return p;
}

// Safe alternatives
std::string getSafe() {
    return std::string("hello");  // Return by value
}

auto safeMem() {
    auto p = std::make_unique<int>(42);
    return p;  // Ownership transferred safely
}`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Signed Integer Overflow"}),e.jsx(t,{title:"Signed overflow is UB",children:`#include <climits>
#include <cstdint>

int a = INT_MAX;
int b = a + 1;       // UB: signed integer overflow

// Unsigned overflow is well-defined (wraps around)
unsigned int c = UINT_MAX;
unsigned int d = c + 1;  // Defined: d == 0

// Safe alternative: check before operating
bool safeAdd(int x, int y, int& result) {
    if (y > 0 && x > INT_MAX - y) return false;
    if (y < 0 && x < INT_MIN - y) return false;
    result = x + y;
    return true;
}`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Null Pointer Dereference"}),e.jsx(t,{title:"Null dereference",children:`int* ptr = nullptr;
int val = *ptr;        // UB: dereferencing null pointer

// Safe alternative
if (ptr != nullptr) {
    int val = *ptr;    // Safe
}`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Uninitialized Reads"}),e.jsx(t,{title:"Reading uninitialized variables",children:`int x;              // Uninitialized
int y = x;          // UB: reading uninitialized value

bool flag;          // Uninitialized
if (flag) { ... }   // UB: reading uninitialized bool

// Safe: always initialize
int x = 0;
bool flag = false;`}),e.jsx(r,{type:"important",title:"Data Races",children:e.jsxs("p",{children:["Accessing a shared variable from multiple threads where at least one thread writes, without synchronization, is undefined behavior. Use ",e.jsx("code",{children:"std::mutex"}),", ",e.jsx("code",{children:"std::atomic"}),", or other synchronization primitives to protect shared data."]})}),e.jsx(r,{type:"info",title:"Why Compilers Exploit UB",children:e.jsxs("p",{children:["Compilers assume UB never occurs, which allows powerful optimizations. For example, assuming signed overflow never happens lets the compiler optimize ",e.jsx("code",{children:"x + 1 > x"})," to",e.jsx("code",{children:" true"}),". This is why UB can cause surprising behavior: the compiler optimizes based on assumptions your buggy code violates."]})}),e.jsx(s,{title:"Defense against undefined behavior",children:e.jsxs("p",{children:["Always initialize variables. Use bounds-checked containers (",e.jsx("code",{children:".at()"}),"). Prefer smart pointers over raw pointers. Enable compiler warnings (",e.jsx("code",{children:"-Wall -Wextra"}),"). Use sanitizers during testing. Treat every compiler warning as a potential UB source."]})}),e.jsx(a,{title:"Identify the UB",difficulty:"intermediate",prompt:"The following code has three instances of undefined behavior. Identify each one and rewrite the code to be safe.",hints:["Look at array access, pointer usage, and arithmetic","Check for uninitialized variables","Consider what happens when the loop counter goes out of bounds"],solution:e.jsx(t,{children:`// Original (buggy):
// int arr[3] = {1, 2, 3};
// int sum;
// for (int i = 0; i <= 3; ++i) sum += arr[i];
// int* p = nullptr; *p = sum;

// Fixed:
#include <array>
#include <iostream>

int main() {
    std::array<int, 3> arr = {1, 2, 3};
    int sum = 0;  // Fix 1: initialize sum
    for (int i = 0; i < 3; ++i) {  // Fix 2: i < 3, not i <= 3
        sum += arr.at(i);
    }
    int result = sum;  // Fix 3: no null pointer dereference
    std::cout << "Sum: " << result << "\\n";
    return 0;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"Undefined behavior",url:"https://en.cppreference.com/w/cpp/language/ub",description:"Complete list of undefined behavior in C++"},{type:"article",title:"What Every C Programmer Should Know About UB",url:"https://blog.llvm.org/2011/05/what-every-c-programmer-should-know.html",author:"Chris Lattner",description:"Classic article on UB and compiler assumptions"},{type:"textbook",title:"Effective Modern C++",author:"Scott Meyers",description:"Guidelines for avoiding common pitfalls"}]})]})}const I=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"}));function y(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Sanitizers are compiler-instrumented runtime checks that detect undefined behavior, memory errors, data races, and other bugs that are otherwise extremely difficult to find. They are among the most valuable tools in a C++ developer's arsenal."}),e.jsx(n,{title:"Sanitizers",children:e.jsx("p",{children:"Sanitizers are compile-time instrumentation tools that insert additional checks into your program. At runtime, they detect errors like buffer overflows, use-after-free, data races, and undefined behavior, reporting them with detailed diagnostics including stack traces."})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"AddressSanitizer (ASan)"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"ASan detects memory errors including buffer overflows, use-after-free, use-after-return, memory leaks, and double-free bugs."}),e.jsxs(c,{title:"Enabling ASan",children:[e.jsx("p",{children:"Add the sanitizer flag during both compilation and linking."}),e.jsx(t,{children:`# GCC or Clang
g++ -fsanitize=address -g -O1 -fno-omit-frame-pointer program.cpp -o program
clang++ -fsanitize=address -g -O1 -fno-omit-frame-pointer program.cpp -o program`})]}),e.jsx(t,{title:"ASan detecting a buffer overflow",children:`#include <iostream>

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    // ASan will catch this out-of-bounds access
    std::cout << arr[10] << std::endl;
    return 0;
}`}),e.jsx(i,{children:`=================================================================
==12345==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7fff...
READ of size 4 at 0x7fff... thread T0
    #0 0x... in main program.cpp:5
...`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"UndefinedBehaviorSanitizer (UBSan)"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"UBSan detects various forms of undefined behavior including signed integer overflow, null pointer dereference, misaligned access, and type mismatch."}),e.jsx(t,{title:"Enabling and triggering UBSan",children:`// Compile: g++ -fsanitize=undefined -g program.cpp -o program

#include <iostream>
#include <climits>

int main() {
    int x = INT_MAX;
    int y = x + 1;  // UBSan catches signed integer overflow
    std::cout << y << std::endl;
    return 0;
}`}),e.jsx(i,{children:`program.cpp:7:17: runtime error: signed integer overflow:
2147483647 + 1 cannot be represented in type 'int'`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"ThreadSanitizer (TSan)"}),e.jsx(t,{title:"TSan detecting a data race",children:`// Compile: g++ -fsanitize=thread -g -O1 program.cpp -o program -lpthread

#include <iostream>
#include <thread>

int counter = 0;  // Shared, unprotected

void increment() {
    for (int i = 0; i < 100000; ++i) {
        ++counter;  // Data race!
    }
}

int main() {
    std::thread t1(increment);
    std::thread t2(increment);
    t1.join();
    t2.join();
    std::cout << counter << std::endl;
    return 0;
}`}),e.jsx(i,{children:`==================
WARNING: ThreadSanitizer: data race (pid=12345)
  Write of size 4 at 0x... by thread T2:
    #0 increment() program.cpp:9
  Previous write of size 4 at 0x... by thread T1:
    #0 increment() program.cpp:9
==================`}),e.jsx(r,{type:"info",title:"MemorySanitizer (MSan)",children:e.jsxs("p",{children:["MSan detects reads of uninitialized memory. It is currently available only with Clang. Enable with ",e.jsx("code",{children:"-fsanitize=memory"}),". MSan cannot be combined with ASan or TSan in the same build."]})}),e.jsx(d,{compiler:"gcc",title:"Combining Sanitizers",children:e.jsxs("p",{children:["ASan and UBSan can be combined: ",e.jsx("code",{children:"-fsanitize=address,undefined"}),". However, TSan and ASan cannot be used together. MSan is Clang-only. Always use ",e.jsx("code",{children:"-g"})," for debug symbols and ",e.jsx("code",{children:"-fno-omit-frame-pointer"})," for accurate stack traces."]})}),e.jsx(l,{title:"Performance Impact",children:e.jsx("p",{children:"Sanitizers add significant overhead: ASan typically slows programs by 2x and increases memory by 3x. TSan can add 5-15x slowdown. Sanitizers are for development and testing, not production builds."})}),e.jsx(s,{title:"Run sanitizers in CI",children:e.jsx("p",{children:"Integrate sanitizer builds into your continuous integration pipeline. Run your full test suite with ASan+UBSan, and concurrency tests with TSan. This catches bugs before they reach production. Consider separate CI jobs for each sanitizer configuration."})}),e.jsx(a,{title:"Fix Sanitizer Warnings",difficulty:"intermediate",prompt:"Compile the following code with ASan and UBSan, identify the issues, and fix them.",hints:["Use -fsanitize=address,undefined to enable both sanitizers","There is a use-after-free and a signed overflow","Replace raw pointer with smart pointer and check arithmetic bounds"],solution:e.jsx(t,{children:`// Original code with bugs:
// int* p = new int(42); delete p; std::cout << *p;
// int x = INT_MAX; x += 1;

// Fixed:
#include <iostream>
#include <memory>
#include <climits>
#include <cstdint>

int main() {
    // Fix 1: use unique_ptr, access before release
    auto p = std::make_unique<int>(42);
    std::cout << *p << "\\n";
    p.reset();  // Freed after last use

    // Fix 2: use larger type or check for overflow
    int64_t x = INT_MAX;
    x += 1;  // No overflow in int64_t
    std::cout << x << "\\n";
    return 0;
}`})}),e.jsx(o,{references:[{type:"article",title:"AddressSanitizer",url:"https://clang.llvm.org/docs/AddressSanitizer.html",description:"Official ASan documentation"},{type:"article",title:"UndefinedBehaviorSanitizer",url:"https://clang.llvm.org/docs/UndefinedBehaviorSanitizer.html",description:"Official UBSan documentation"},{type:"article",title:"ThreadSanitizer",url:"https://clang.llvm.org/docs/ThreadSanitizer.html",description:"Official TSan documentation"}]})]})}const P=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"}));function b(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Modern C++ offers tools and guidelines to write safer code without sacrificing performance. The C++ Core Guidelines, the Guidelines Support Library (GSL), and safer standard library abstractions like ",e.jsx("code",{children:"std::span"})," help prevent entire categories of bugs at compile time."]}),e.jsx(n,{title:"C++ Core Guidelines",children:e.jsx("p",{children:"The C++ Core Guidelines are a comprehensive set of rules and best practices edited by Bjarne Stroustrup and Herb Sutter. They cover resource management, concurrency, error handling, and more, with the goal of making C++ safer and more consistent without sacrificing performance."})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Guidelines Support Library (GSL)"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The GSL provides types recommended by the Core Guidelines. Key types include",e.jsx("code",{children:" gsl::not_null"}),", ",e.jsx("code",{children:"gsl::span"})," (now ",e.jsx("code",{children:"std::span"})," in C++20),",e.jsx("code",{children:" gsl::narrow"}),", and ",e.jsx("code",{children:"gsl::finally"}),"."]}),e.jsx(t,{title:"gsl::not_null prevents null pointers",children:`#include <gsl/gsl>  // Microsoft GSL
#include <iostream>
#include <memory>

// Function guarantees non-null parameter
void process(gsl::not_null<int*> ptr) {
    std::cout << "Value: " << *ptr << "\\n";
}

int main() {
    int value = 42;
    process(&value);           // OK

    // int* null_ptr = nullptr;
    // process(null_ptr);      // Fails at runtime (or compile time)

    auto sp = std::make_shared<int>(99);
    gsl::not_null<std::shared_ptr<int>> safe_sp = sp;
    std::cout << "Shared: " << *safe_sp << "\\n";
    return 0;
}`}),e.jsx(i,{children:`Value: 42
Shared: 99`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::span for Safe Array Access"}),e.jsx(t,{title:"std::span replaces pointer+size pairs",children:`#include <iostream>
#include <span>
#include <vector>
#include <array>

// Old style: raw pointer + size (error-prone)
// void process(int* data, size_t size);

// Modern: std::span (safe, no ownership)
void printElements(std::span<const int> data) {
    for (int val : data) {
        std::cout << val << " ";
    }
    std::cout << "\\n";
}

double average(std::span<const double> values) {
    double sum = 0.0;
    for (double v : values) sum += v;
    return values.empty() ? 0.0 : sum / values.size();
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    std::vector<int> vec = {10, 20, 30};
    std::array<int, 4> sarr = {100, 200, 300, 400};

    // span works with any contiguous container
    printElements(arr);
    printElements(vec);
    printElements(sarr);

    // Subspans
    std::span<int> full(arr);
    printElements(full.subspan(1, 3));  // {2, 3, 4}

    std::vector<double> vals = {3.0, 4.0, 5.0};
    std::cout << "Average: " << average(vals) << "\\n";
    return 0;
}`}),e.jsx(i,{children:`1 2 3 4 5
10 20 30
100 200 300 400
2 3 4
Average: 4`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Safe Alternatives Cheat Sheet"}),e.jsx(r,{type:"tip",title:"Replace Unsafe Patterns",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Raw pointers for ownership"})," -- use ",e.jsx("code",{children:"std::unique_ptr"})," or",e.jsx("code",{children:" std::shared_ptr"}),".",e.jsx("br",{}),e.jsx("strong",{children:"C arrays"})," -- use ",e.jsx("code",{children:"std::array"})," or ",e.jsx("code",{children:"std::vector"}),".",e.jsx("br",{}),e.jsx("strong",{children:"Pointer + size"})," -- use ",e.jsx("code",{children:"std::span"}),".",e.jsx("br",{}),e.jsx("strong",{children:"Nullable pointers"})," -- use ",e.jsx("code",{children:"std::optional"})," or",e.jsx("code",{children:" gsl::not_null"}),".",e.jsx("br",{}),e.jsx("strong",{children:"Narrowing conversions"})," -- use ",e.jsx("code",{children:"gsl::narrow"})," or",e.jsx("code",{children:" static_cast"})," with validation.",e.jsx("br",{}),e.jsx("strong",{children:"Manual cleanup"})," -- use RAII and ",e.jsx("code",{children:"gsl::finally"}),"."]})}),e.jsx(l,{title:"Narrowing Conversions",children:e.jsxs("p",{children:["Implicit narrowing conversions (e.g., ",e.jsx("code",{children:"int"})," to ",e.jsx("code",{children:"short"}),") silently lose data. Use ",e.jsx("code",{children:"gsl::narrow<T>(value)"})," which throws on data loss, or enable compiler warnings with ",e.jsx("code",{children:"-Wconversion"}),"."]})}),e.jsx(s,{title:"Adopt the Core Guidelines incrementally",children:e.jsxs("p",{children:["You do not need to adopt every guideline at once. Start with resource management (RAII), use smart pointers consistently, enable warnings (",e.jsx("code",{children:"-Wall -Wextra -Wpedantic"}),"), and gradually adopt ",e.jsx("code",{children:"std::span"}),", ",e.jsx("code",{children:"gsl::not_null"}),", and static analysis."]})}),e.jsx(a,{title:"Refactor to Safe Code",difficulty:"intermediate",prompt:"Refactor the following unsafe function to use std::span and remove raw pointer arithmetic: void sum(const int* data, int size, int* result) { *result = 0; for (int i = 0; i < size; ++i) result[0] += data[i]; }",hints:["Replace const int* data + int size with std::span<const int>","Return the result instead of using an output pointer","Use a range-based for loop over the span"],solution:e.jsx(t,{children:`#include <iostream>
#include <span>
#include <vector>

int sum(std::span<const int> data) {
    int result = 0;
    for (int val : data) {
        result += val;
    }
    return result;
}

int main() {
    std::vector<int> values = {10, 20, 30, 40, 50};
    int total = sum(values);
    std::cout << "Sum: " << total << "\\n";  // 150
    return 0;
}`})}),e.jsx(o,{references:[{type:"article",title:"C++ Core Guidelines",url:"https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines",author:"Bjarne Stroustrup, Herb Sutter",description:"The complete C++ Core Guidelines"},{type:"cppreference",title:"std::span",url:"https://en.cppreference.com/w/cpp/container/span",description:"Non-owning contiguous view reference"},{type:"article",title:"Microsoft GSL",url:"https://github.com/microsoft/GSL",description:"Guidelines Support Library implementation"}]})]})}const U=Object.freeze(Object.defineProperty({__proto__:null,default:b},Symbol.toStringTag,{value:"Module"}));function v(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Modern CPUs are orders of magnitude faster than main memory. CPU caches bridge this gap by keeping frequently accessed data close to the processor. Understanding cache behavior is essential for writing high-performance C++ code, as poor data locality can cause 10-100x slowdowns compared to cache-friendly code."}),e.jsx(n,{title:"Cache Line",children:e.jsx("p",{children:"A cache line is the smallest unit of data transferred between main memory and the CPU cache, typically 64 bytes on modern x86 processors. When you access a single byte, the entire 64-byte cache line containing it is loaded. Accessing nearby data in the same cache line is essentially free."})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Data Locality and Traversal Order"}),e.jsx(t,{title:"Row-major vs column-major traversal",children:`#include <iostream>
#include <chrono>

const int N = 4096;
int matrix[N][N];

void rowMajor() {
    // Cache-friendly: accesses contiguous memory
    for (int i = 0; i < N; ++i)
        for (int j = 0; j < N; ++j)
            matrix[i][j] = i + j;
}

void colMajor() {
    // Cache-hostile: jumps N*sizeof(int) bytes per access
    for (int j = 0; j < N; ++j)
        for (int i = 0; i < N; ++i)
            matrix[i][j] = i + j;
}

int main() {
    auto t1 = std::chrono::high_resolution_clock::now();
    rowMajor();
    auto t2 = std::chrono::high_resolution_clock::now();
    colMajor();
    auto t3 = std::chrono::high_resolution_clock::now();

    auto row_ms = std::chrono::duration<double, std::milli>(t2 - t1).count();
    auto col_ms = std::chrono::duration<double, std::milli>(t3 - t2).count();

    std::cout << "Row-major: " << row_ms << " ms\\n";
    std::cout << "Col-major: " << col_ms << " ms\\n";
    std::cout << "Ratio: " << col_ms / row_ms << "x slower\\n";
    return 0;
}`}),e.jsx(i,{children:`Row-major: 12.3 ms
Col-major: 85.7 ms
Ratio: 6.97x slower`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Struct of Arrays vs Array of Structs"}),e.jsx(t,{title:"AoS vs SoA layouts",children:`#include <iostream>
#include <vector>
#include <chrono>

// Array of Structs (AoS) - traditional OOP layout
struct ParticleAoS {
    float x, y, z;       // position
    float vx, vy, vz;    // velocity
    float mass;
    int type;            // 32 bytes per particle
};
std::vector<ParticleAoS> particlesAoS(1000000);

// Struct of Arrays (SoA) - cache-friendly for bulk operations
struct ParticlesSoA {
    std::vector<float> x, y, z;
    std::vector<float> vx, vy, vz;
    std::vector<float> mass;
    std::vector<int> type;
};

void updatePositionsAoS(std::vector<ParticleAoS>& p, float dt) {
    for (auto& particle : p) {
        particle.x += particle.vx * dt;  // Loads 32-byte struct, uses 8 bytes
        particle.y += particle.vy * dt;
        particle.z += particle.vz * dt;
    }
}

void updatePositionsSoA(ParticlesSoA& p, float dt, size_t n) {
    for (size_t i = 0; i < n; ++i) {
        p.x[i] += p.vx[i] * dt;  // Contiguous float arrays, fully utilized
        p.y[i] += p.vy[i] * dt;
        p.z[i] += p.vz[i] * dt;
    }
}

int main() {
    std::cout << "AoS particle size: " << sizeof(ParticleAoS) << " bytes\\n";
    std::cout << "SoA is faster when processing specific fields in bulk\\n";
    return 0;
}`}),e.jsx(i,{children:`AoS particle size: 32 bytes
SoA is faster when processing specific fields in bulk`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"False Sharing"}),e.jsx(l,{title:"False Sharing in Multithreading",children:e.jsx("p",{children:"False sharing occurs when threads on different cores modify variables that reside on the same cache line. Each write invalidates the cache line for other cores, causing severe performance degradation even though the threads access different variables."})}),e.jsx(t,{title:"Avoiding false sharing with alignment",children:`#include <atomic>
#include <new>  // std::hardware_destructive_interference_size

struct alignas(64) AlignedCounter {
    std::atomic<int> value{0};
    // Padding ensures each counter is on its own cache line
};

// C++17: use hardware_destructive_interference_size
// constexpr size_t cacheLineSize =
//     std::hardware_destructive_interference_size;  // Usually 64

AlignedCounter counters[4];  // Each on separate cache line
// Thread 0 increments counters[0], thread 1 increments counters[1], etc.
// No false sharing because each is on its own cache line.`}),e.jsx(r,{type:"info",title:"Measuring Cache Performance",children:e.jsxs("p",{children:["Use tools like ",e.jsx("code",{children:"perf stat"})," to measure cache misses: ",e.jsx("code",{children:"perf stat -e cache-misses,cache-references ./program"}),". High cache miss ratios indicate poor data locality. Valgrind's ",e.jsx("code",{children:"cachegrind"})," provides detailed cache simulation."]})}),e.jsx(s,{title:"Design data structures for cache efficiency",children:e.jsxs("p",{children:["Keep frequently accessed data together. Use contiguous containers (",e.jsx("code",{children:"std::vector"}),") over node-based ones (",e.jsx("code",{children:"std::list"}),"). Consider SoA layout for batch processing. Avoid pointer-chasing patterns. Align data to cache lines when false sharing is a concern."]})}),e.jsx(a,{title:"Optimize Matrix Sum",difficulty:"intermediate",prompt:"Write two functions that sum all elements of a 2D array: one with poor cache behavior (column-major) and one with good cache behavior (row-major). Time them and verify the performance difference.",hints:["Use a large array (e.g., 2048x2048) to see the difference","Row-major iterates the inner loop over columns","Use std::chrono::high_resolution_clock for timing"],solution:e.jsx(t,{children:`#include <iostream>
#include <chrono>

const int N = 2048;
int data[N][N];

long long sumRowMajor() {
    long long sum = 0;
    for (int i = 0; i < N; ++i)
        for (int j = 0; j < N; ++j)
            sum += data[i][j];
    return sum;
}

long long sumColMajor() {
    long long sum = 0;
    for (int j = 0; j < N; ++j)
        for (int i = 0; i < N; ++i)
            sum += data[i][j];
    return sum;
}

int main() {
    for (int i = 0; i < N; ++i)
        for (int j = 0; j < N; ++j)
            data[i][j] = 1;

    auto t1 = std::chrono::high_resolution_clock::now();
    auto s1 = sumRowMajor();
    auto t2 = std::chrono::high_resolution_clock::now();
    auto s2 = sumColMajor();
    auto t3 = std::chrono::high_resolution_clock::now();

    using ms = std::chrono::duration<double, std::milli>;
    std::cout << "Row-major: " << ms(t2-t1).count() << " ms\\n";
    std::cout << "Col-major: " << ms(t3-t2).count() << " ms\\n";
    return 0;
}`})}),e.jsx(o,{references:[{type:"article",title:"What Every Programmer Should Know About Memory",url:"https://people.freebsd.org/~lstewart/articles/cpumemory.pdf",author:"Ulrich Drepper",description:"Comprehensive guide to memory and cache performance"},{type:"article",title:"Data-Oriented Design",url:"https://www.dataorienteddesign.com/dodbook/",author:"Richard Fabian",description:"Book on cache-friendly data structures"},{type:"cppreference",title:"hardware_destructive_interference_size",url:"https://en.cppreference.com/w/cpp/thread/hardware_destructive_interference_size",description:"Cache line size constant"}]})]})}const M=Object.freeze(Object.defineProperty({__proto__:null,default:v},Symbol.toStringTag,{value:"Module"}));function j(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"SIMD (Single Instruction, Multiple Data) allows a single CPU instruction to operate on multiple data elements simultaneously. Modern x86 processors support SSE (128-bit) and AVX (256/512-bit) instruction sets, enabling significant speedups for data-parallel computations like vector math, image processing, and scientific computing."}),e.jsx(n,{title:"SIMD (Single Instruction, Multiple Data)",children:e.jsx("p",{children:"SIMD is a parallel processing model where one instruction operates on multiple data points simultaneously. For example, an SSE instruction can add four 32-bit floats in a single operation, achieving up to 4x throughput compared to scalar code."})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Auto-Vectorization"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Modern compilers can automatically convert scalar loops into SIMD instructions. Writing simple, regular loops with no dependencies helps the compiler auto-vectorize."}),e.jsx(t,{title:"Auto-vectorizable loop",children:`#include <iostream>
#include <vector>
#include <chrono>

// This loop is easily auto-vectorizable
void addArrays(const float* a, const float* b, float* c, int n) {
    for (int i = 0; i < n; ++i) {
        c[i] = a[i] + b[i];
    }
}

// This loop is harder to auto-vectorize (data dependency)
void prefixSum(const float* input, float* output, int n) {
    output[0] = input[0];
    for (int i = 1; i < n; ++i) {
        output[i] = output[i - 1] + input[i];  // Loop-carried dependency
    }
}

int main() {
    const int N = 1000000;
    std::vector<float> a(N, 1.0f), b(N, 2.0f), c(N);

    auto t1 = std::chrono::high_resolution_clock::now();
    addArrays(a.data(), b.data(), c.data(), N);
    auto t2 = std::chrono::high_resolution_clock::now();

    auto us = std::chrono::duration<double, std::micro>(t2 - t1).count();
    std::cout << "addArrays: " << us << " us\\n";
    std::cout << "c[0] = " << c[0] << "\\n";
    return 0;
}`}),e.jsx(i,{children:`addArrays: 312.5 us
c[0] = 3`}),e.jsx(d,{compiler:"all",title:"Compiler Flags for Vectorization",children:e.jsxs("p",{children:["Enable auto-vectorization with: ",e.jsx("code",{children:"-O2"})," or ",e.jsx("code",{children:"-O3"})," for optimization,",e.jsx("code",{children:" -march=native"})," for CPU-specific instructions, ",e.jsx("code",{children:"-ftree-vectorize"})," (GCC),",e.jsx("code",{children:" -fvectorize"})," (Clang). Use ",e.jsx("code",{children:"-fopt-info-vec-optimized"})," (GCC) or",e.jsx("code",{children:" -Rpass=loop-vectorize"})," (Clang) to see which loops were vectorized."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"SSE/AVX Intrinsics"}),e.jsxs(c,{title:"Using Intrinsics Directly",children:[e.jsx("p",{children:"Intrinsics are compiler-provided functions that map directly to SIMD instructions. They offer fine-grained control when auto-vectorization is insufficient."}),e.jsx(t,{children:"#include <immintrin.h>  // SSE, AVX, AVX2, AVX-512"})]}),e.jsx(t,{title:"SSE float addition with intrinsics",children:`#include <immintrin.h>
#include <iostream>

void addArraysSSE(const float* a, const float* b, float* c, int n) {
    int i = 0;
    // Process 4 floats at a time with SSE
    for (; i + 3 < n; i += 4) {
        __m128 va = _mm_loadu_ps(&a[i]);  // Load 4 floats from a
        __m128 vb = _mm_loadu_ps(&b[i]);  // Load 4 floats from b
        __m128 vc = _mm_add_ps(va, vb);   // Add 4 floats at once
        _mm_storeu_ps(&c[i], vc);         // Store 4 results
    }
    // Handle remaining elements
    for (; i < n; ++i) {
        c[i] = a[i] + b[i];
    }
}

int main() {
    float a[] = {1, 2, 3, 4, 5, 6};
    float b[] = {10, 20, 30, 40, 50, 60};
    float c[6];

    addArraysSSE(a, b, c, 6);

    for (int i = 0; i < 6; ++i) {
        std::cout << c[i] << " ";
    }
    std::cout << "\\n";
    return 0;
}`}),e.jsx(i,{children:"11 22 33 44 55 66"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Data Alignment for SIMD"}),e.jsx(r,{type:"important",title:"Aligned vs Unaligned Loads",children:e.jsxs("p",{children:["Aligned loads (",e.jsx("code",{children:"_mm_load_ps"}),") require 16-byte alignment and are slightly faster. Unaligned loads (",e.jsx("code",{children:"_mm_loadu_ps"}),") work with any alignment but may be slower on older hardware. Use ",e.jsx("code",{children:"alignas(16)"})," or ",e.jsx("code",{children:"alignas(32)"})," to align data."]})}),e.jsx(t,{title:"Aligned data allocation",children:`#include <cstdlib>
#include <new>

// Stack alignment
alignas(32) float aligned_array[256];

// Heap alignment (C++17)
float* aligned_heap = static_cast<float*>(
    ::operator new(256 * sizeof(float), std::align_val_t(32))
);
// Don't forget: ::operator delete(aligned_heap, std::align_val_t(32));`}),e.jsx(l,{title:"Portability",children:e.jsxs("p",{children:["SSE/AVX intrinsics are x86-specific. For portable SIMD, consider compiler auto-vectorization, libraries like Highway (Google) or xsimd, or the upcoming ",e.jsx("code",{children:"std::simd"})," (C++26). Always provide a scalar fallback."]})}),e.jsx(s,{title:"Prefer auto-vectorization over intrinsics",children:e.jsx("p",{children:"Write clean, simple loops and let the compiler vectorize. Resort to intrinsics only when auto-vectorization fails and profiling confirms a bottleneck. Always verify vectorization with compiler reports, and benchmark to confirm actual speedup."})}),e.jsx(a,{title:"Vectorize a Dot Product",difficulty:"advanced",prompt:"Write a function that computes the dot product of two float arrays. First write a scalar version, then an SSE version using _mm_mul_ps and _mm_add_ps. Compare their outputs.",hints:["The scalar version multiplies and accumulates element by element","Use _mm_setzero_ps() to initialize an SSE accumulator","After the SIMD loop, horizontally sum the 4 floats in the accumulator","Use _mm_hadd_ps or store to an array and sum manually"],solution:e.jsx(t,{children:`#include <immintrin.h>
#include <iostream>

float dotScalar(const float* a, const float* b, int n) {
    float sum = 0.0f;
    for (int i = 0; i < n; ++i) sum += a[i] * b[i];
    return sum;
}

float dotSSE(const float* a, const float* b, int n) {
    __m128 vsum = _mm_setzero_ps();
    int i = 0;
    for (; i + 3 < n; i += 4) {
        __m128 va = _mm_loadu_ps(&a[i]);
        __m128 vb = _mm_loadu_ps(&b[i]);
        vsum = _mm_add_ps(vsum, _mm_mul_ps(va, vb));
    }
    // Horizontal sum
    float tmp[4];
    _mm_storeu_ps(tmp, vsum);
    float sum = tmp[0] + tmp[1] + tmp[2] + tmp[3];
    for (; i < n; ++i) sum += a[i] * b[i];
    return sum;
}

int main() {
    float a[] = {1, 2, 3, 4, 5};
    float b[] = {2, 3, 4, 5, 6};
    std::cout << "Scalar: " << dotScalar(a, b, 5) << "\\n";
    std::cout << "SSE:    " << dotSSE(a, b, 5) << "\\n";
    return 0;
}`})}),e.jsx(o,{references:[{type:"article",title:"Intel Intrinsics Guide",url:"https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html",description:"Complete reference for SSE/AVX intrinsics"},{type:"article",title:"Auto-vectorization in GCC",url:"https://gcc.gnu.org/projects/tree-ssa/vectorization.html",description:"GCC auto-vectorization documentation"},{type:"article",title:"Highway SIMD Library",url:"https://github.com/google/highway",author:"Google",description:"Portable SIMD library for C++"}]})]})}const B=Object.freeze(Object.defineProperty({__proto__:null,default:j},Symbol.toStringTag,{value:"Module"}));function _(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Profiling is the practice of measuring where your program spends its time and resources. Without profiling, optimization is guesswork. The golden rule of performance work is: measure first, optimize second, and measure again to verify improvement."}),e.jsx(n,{title:"Profiling",children:e.jsx("p",{children:"Profiling is the dynamic analysis of a program to measure its runtime behavior: which functions consume the most CPU time, how memory is allocated, how the cache is utilized, and where bottlenecks exist. Profilers can be sampling-based (low overhead, statistical) or instrumentation-based (precise, higher overhead)."})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Linux perf"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"perf"})," is a powerful Linux profiling tool that uses hardware performance counters. It has minimal overhead and works on any compiled program."]}),e.jsxs(c,{title:"Common perf Commands",children:[e.jsxs("p",{children:["Use ",e.jsx("code",{children:"perf"})," to record and analyze program performance."]}),e.jsx(t,{children:`# Basic statistics
perf stat ./my_program

# Record profile (sampling)
perf record -g ./my_program

# View report
perf report

# Count specific events
perf stat -e cache-misses,cache-references,instructions,cycles ./my_program`})]}),e.jsx(i,{children:`Performance counter stats for './my_program':
      1,234,567,890  cycles
      2,345,678,901  instructions   #  1.90 insn per cycle
         12,345,678  cache-references
            123,456  cache-misses   #  1.00% of all cache refs
       0.543212345 seconds time elapsed`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Valgrind and Callgrind"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Callgrind (part of Valgrind) simulates the CPU and cache, providing exact instruction counts and call graphs. It is slower than sampling profilers but gives deterministic results."}),e.jsx(t,{title:"Using Valgrind/Callgrind",children:`# Run under Callgrind
valgrind --tool=callgrind ./my_program

# View results with KCachegrind (GUI)
kcachegrind callgrind.out.12345

# Or use callgrind_annotate (CLI)
callgrind_annotate callgrind.out.12345`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Google Benchmark"}),e.jsx(t,{title:"Micro-benchmarking with Google Benchmark",children:`#include <benchmark/benchmark.h>
#include <vector>
#include <algorithm>
#include <numeric>

static void BM_VectorSort(benchmark::State& state) {
    for (auto _ : state) {
        std::vector<int> v(state.range(0));
        std::iota(v.rbegin(), v.rend(), 0);  // Reverse sorted
        std::sort(v.begin(), v.end());
        benchmark::DoNotOptimize(v.data());
    }
    state.SetComplexityN(state.range(0));
}
BENCHMARK(BM_VectorSort)
    ->Range(1 << 10, 1 << 20)
    ->Complexity(benchmark::oNLogN);

static void BM_VectorPushBack(benchmark::State& state) {
    for (auto _ : state) {
        std::vector<int> v;
        for (int i = 0; i < state.range(0); ++i) {
            v.push_back(i);
        }
        benchmark::DoNotOptimize(v.data());
    }
}
BENCHMARK(BM_VectorPushBack)->Range(1 << 10, 1 << 18);

BENCHMARK_MAIN();`}),e.jsx(i,{children:`-------------------------------------------------------
Benchmark                Time       CPU   Iterations
-------------------------------------------------------
BM_VectorSort/1024     45.2 us   45.1 us      15432
BM_VectorSort/32768     1.89 ms   1.88 ms        372
BM_VectorSort/1048576    78.4 ms   78.2 ms          9
BM_VectorPushBack/1024  3.21 us   3.20 us     218750
BM_VectorPushBack/262144  892 us    891 us        785`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Micro-Benchmarking Pitfalls"}),e.jsx(l,{title:"Common Benchmarking Mistakes",children:e.jsxs("p",{children:["The compiler may optimize away code with no observable side effects. Always use",e.jsx("code",{children:" benchmark::DoNotOptimize()"})," or ",e.jsx("code",{children:"volatile"})," to prevent dead code elimination. Beware of CPU frequency scaling, thermal throttling, and background processes. Run benchmarks multiple times and report stable statistics."]})}),e.jsx(r,{type:"tip",title:"Optimization Workflow",children:e.jsx("p",{children:"1. Write correct code first. 2. Profile to find the actual bottleneck. 3. Optimize only the bottleneck. 4. Measure to verify improvement. 5. Repeat. Never optimize without data. The slowest part of your program is often not where you expect it."})}),e.jsx(r,{type:"info",title:"Compile with Debug Info for Profiling",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"-g -O2"})," when profiling. The ",e.jsx("code",{children:"-g"})," flag adds debug symbols so profiler output shows function names and line numbers. The ",e.jsx("code",{children:"-O2"})," flag ensures realistic optimization. Avoid ",e.jsx("code",{children:"-O0"})," for profiling as it does not represent production performance."]})}),e.jsx(s,{title:"Profile before optimizing",children:e.jsxs("p",{children:["Never guess where the bottleneck is. Use ",e.jsx("code",{children:"perf"})," for a quick overview, Callgrind for detailed analysis, and Google Benchmark for comparing specific implementations. Optimize the measured hotspot, not the code you assume is slow."]})}),e.jsx(a,{title:"Write a Google Benchmark",difficulty:"intermediate",prompt:"Write a Google Benchmark comparing std::vector<int> linear search (std::find) vs binary search (std::lower_bound on a sorted vector) for a container of 100,000 elements.",hints:["Create the vector in the benchmark setup, before the State loop","Sort the vector for binary search","Use benchmark::DoNotOptimize on the result to prevent optimization","Use state.range(0) to parameterize the search target"],solution:e.jsx(t,{children:`#include <benchmark/benchmark.h>
#include <vector>
#include <algorithm>
#include <numeric>

static void BM_LinearSearch(benchmark::State& state) {
    std::vector<int> v(100000);
    std::iota(v.begin(), v.end(), 0);
    int target = 99999;  // Worst case
    for (auto _ : state) {
        auto it = std::find(v.begin(), v.end(), target);
        benchmark::DoNotOptimize(it);
    }
}
BENCHMARK(BM_LinearSearch);

static void BM_BinarySearch(benchmark::State& state) {
    std::vector<int> v(100000);
    std::iota(v.begin(), v.end(), 0);  // Already sorted
    int target = 99999;
    for (auto _ : state) {
        auto it = std::lower_bound(v.begin(), v.end(), target);
        benchmark::DoNotOptimize(it);
    }
}
BENCHMARK(BM_BinarySearch);

BENCHMARK_MAIN();`})}),e.jsx(o,{references:[{type:"article",title:"perf Tutorial",url:"https://perf.wiki.kernel.org/index.php/Tutorial",description:"Official Linux perf tutorial"},{type:"article",title:"Google Benchmark",url:"https://github.com/google/benchmark",description:"Micro-benchmarking library for C++"},{type:"article",title:"Valgrind / Callgrind",url:"https://valgrind.org/docs/manual/cl-manual.html",description:"Callgrind cache and call-graph profiler"}]})]})}const D=Object.freeze(Object.defineProperty({__proto__:null,default:_},Symbol.toStringTag,{value:"Module"}));export{k as a,z as b,T as c,A as d,N as e,I as f,P as g,U as h,M as i,B as j,D as k,C as s};
