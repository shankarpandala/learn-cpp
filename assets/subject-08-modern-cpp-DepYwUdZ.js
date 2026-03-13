import{j as e}from"./vendor-BlNF5je7.js";import{D as s,S as i,C as t,O as r,N as n,B as o,W as d,a as l,E as a,R as c}from"./subject-01-fundamentals-DsAKErwb.js";function u(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Move semantics, introduced in C++11, allow resources to be ",e.jsx("em",{children:"transferred"})," from one object to another instead of being copied. The move constructor is the mechanism that makes this possible, enabling efficient handling of temporary objects and explicit ownership transfers."]}),e.jsx(s,{title:"Move Constructor",children:e.jsxs("p",{children:["A move constructor is a special member function that transfers ownership of resources from a source object (an rvalue) to a newly constructed object. After the move, the source object is left in a valid but unspecified state, often called the ",e.jsx("strong",{children:"moved-from state"}),"."]})}),e.jsxs(i,{title:"Move Constructor Syntax",children:[e.jsxs("p",{children:["A move constructor takes an ",e.jsx("strong",{children:"rvalue reference"})," (",e.jsx("code",{children:"&&"}),") to its own type as a parameter. It should be marked ",e.jsx("code",{children:"noexcept"})," to enable optimizations in standard library containers."]}),e.jsx(t,{children:"ClassName(ClassName&& other) noexcept;"})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Resource Stealing in Action"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The key idea behind a move constructor is ",e.jsx("strong",{children:"resource stealing"}),": instead of allocating new memory and copying data, we simply take the pointer from the source object and null out the source so it no longer owns the resource."]}),e.jsx(t,{title:"move_buffer.cpp",children:`#include <iostream>
#include <cstring>
#include <utility>

class Buffer {
    char* data_;
    size_t size_;
public:
    // Regular constructor
    Buffer(const char* str) : size_(std::strlen(str)) {
        data_ = new char[size_ + 1];
        std::strcpy(data_, str);
        std::cout << "Constructed: " << data_ << "\\n";
    }

    // Move constructor - steal resources
    Buffer(Buffer&& other) noexcept
        : data_(other.data_), size_(other.size_) {
        other.data_ = nullptr;  // leave source in valid state
        other.size_ = 0;
        std::cout << "Moved: " << data_ << "\\n";
    }

    ~Buffer() {
        delete[] data_;
        std::cout << "Destroyed\\n";
    }

    const char* c_str() const { return data_ ? data_ : "(empty)"; }
};

int main() {
    Buffer a("Hello");
    Buffer b(std::move(a));  // invoke move constructor
    std::cout << "a: " << a.c_str() << "\\n";
    std::cout << "b: " << b.c_str() << "\\n";
    return 0;
}`}),e.jsx(r,{children:`Constructed: Hello
Moved: Hello
a: (empty)
b: Hello
Destroyed
Destroyed`}),e.jsx(n,{type:"important",title:"The Moved-From State",children:e.jsxs("p",{children:["After a move, the source object must be in a ",e.jsx("strong",{children:"valid but unspecified"})," state. This means it must be safe to destroy and safe to assign to, but you should not rely on its value. Setting pointers to ",e.jsx("code",{children:"nullptr"})," ensures the destructor runs safely."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Why noexcept Matters"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Standard library containers like ",e.jsx("code",{children:"std::vector"})," will only use your move constructor during reallocation if it is marked ",e.jsx("code",{children:"noexcept"}),". Without it, the container falls back to copying for exception safety."]}),e.jsx(t,{title:"noexcept_vector.cpp",children:`#include <iostream>
#include <vector>

class Widget {
    int id_;
public:
    Widget(int id) : id_(id) {}

    // Mark noexcept so vector uses move during reallocation
    Widget(Widget&& other) noexcept : id_(other.id_) {
        other.id_ = -1;
        std::cout << "Move " << id_ << "\\n";
    }

    Widget(const Widget& other) : id_(other.id_) {
        std::cout << "Copy " << id_ << "\\n";
    }
};

int main() {
    std::vector<Widget> v;
    v.reserve(2);
    v.emplace_back(1);
    v.emplace_back(2);
    // This reallocation uses move because of noexcept
    v.emplace_back(3);
    return 0;
}`}),e.jsx(r,{children:`Move 1
Move 2`}),e.jsx(o,{title:"Always mark move constructors noexcept",children:e.jsxs("p",{children:["A move constructor should never throw exceptions because it is merely transferring ownership of existing resources, not acquiring new ones. Mark it ",e.jsx("code",{children:"noexcept"})," to enable the standard library to use it in performance-critical operations like vector reallocation and ",e.jsx("code",{children:"std::swap"}),"."]})}),e.jsx(d,{title:"Do not use a moved-from object",children:e.jsx("p",{children:"Accessing the value of a moved-from object is a common source of bugs. After moving, only destroy or reassign the object. Never read its contents unless the class explicitly documents what the moved-from state holds."})}),e.jsx(l,{compiler:"gcc",title:"Detecting missing noexcept",children:e.jsxs("p",{children:["GCC provides ",e.jsx("code",{children:"-Wnoexcept"})," to warn when a move constructor or move assignment operator is not marked ",e.jsx("code",{children:"noexcept"}),", helping you catch missed annotations early."]})}),e.jsx(a,{title:"Write a Move Constructor",difficulty:"intermediate",prompt:"Create a class DynamicArray that manages a heap-allocated int array. Implement a move constructor that transfers ownership of the array.",hints:["Store a pointer to the array and its size as members","In the move constructor, steal the pointer and size, then null out the source","Remember to mark it noexcept"],solution:e.jsx(t,{children:`#include <iostream>
#include <utility>

class DynamicArray {
    int* data_;
    size_t size_;
public:
    DynamicArray(size_t n) : data_(new int[n]()), size_(n) {}

    DynamicArray(DynamicArray&& other) noexcept
        : data_(other.data_), size_(other.size_) {
        other.data_ = nullptr;
        other.size_ = 0;
    }

    ~DynamicArray() { delete[] data_; }
    size_t size() const { return size_; }
};

int main() {
    DynamicArray a(5);
    DynamicArray b(std::move(a));
    std::cout << "a size: " << a.size() << "\\n";
    std::cout << "b size: " << b.size() << "\\n";
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"Move constructors",url:"https://en.cppreference.com/w/cpp/language/move_constructor",description:"Full specification of move constructors"},{type:"cppreference",title:"std::move",url:"https://en.cppreference.com/w/cpp/utility/move",description:"Casting to rvalue reference"},{type:"textbook",title:"Effective Modern C++",author:"Scott Meyers",description:"Item 17: Understand special member function generation"}]})]})}const N=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"}));function p(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The move assignment operator complements the move constructor by allowing an existing object to take ownership of another object's resources. Together with the copy constructor, copy assignment, move constructor, and destructor, they form the ",e.jsx("strong",{children:"Rule of Five"}),"."]}),e.jsx(s,{title:"Move Assignment Operator",children:e.jsx("p",{children:"The move assignment operator transfers resources from a source rvalue into an already-constructed object. It must first release any resources the target currently owns, then steal the source's resources and leave the source in a valid moved-from state."})}),e.jsxs(i,{title:"Move Assignment Syntax",children:[e.jsxs("p",{children:["Like the move constructor, the move assignment operator takes an rvalue reference and should be marked ",e.jsx("code",{children:"noexcept"}),". It returns a reference to ",e.jsx("code",{children:"*this"}),"."]}),e.jsx(t,{children:"ClassName& operator=(ClassName&& other) noexcept;"})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Self-Assignment and Resource Transfer"}),e.jsx(t,{title:"move_assign.cpp",children:`#include <iostream>
#include <cstring>
#include <utility>

class String {
    char* data_;
    size_t len_;
public:
    String(const char* s = "") : len_(std::strlen(s)) {
        data_ = new char[len_ + 1];
        std::strcpy(data_, s);
    }

    // Move assignment operator
    String& operator=(String&& other) noexcept {
        if (this != &other) {       // self-assignment check
            delete[] data_;          // release current resource
            data_ = other.data_;     // steal resource
            len_ = other.len_;
            other.data_ = nullptr;   // leave source valid
            other.len_ = 0;
        }
        return *this;
    }

    // Copy constructor & assignment omitted for brevity
    ~String() { delete[] data_; }
    const char* c_str() const { return data_ ? data_ : "(null)"; }
};

int main() {
    String a("Hello");
    String b("World");
    std::cout << "Before: a=" << a.c_str() << " b=" << b.c_str() << "\\n";

    b = std::move(a);  // move assignment
    std::cout << "After:  a=" << a.c_str() << " b=" << b.c_str() << "\\n";
    return 0;
}`}),e.jsx(r,{children:`Before: a=Hello b=World
After:  a=(null) b=Hello`}),e.jsx(d,{title:"Self-assignment guard",children:e.jsxs("p",{children:["Always check for self-assignment (",e.jsx("code",{children:"this != &other"}),") in the move assignment operator. Without it, ",e.jsx("code",{children:"a = std::move(a)"})," would delete the resource and then try to read from freed memory."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"The Copy-and-Swap Idiom"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["An elegant alternative is the ",e.jsx("strong",{children:"copy-and-swap idiom"}),", which unifies the copy and move assignment operators into a single function that takes its parameter by value."]}),e.jsx(t,{title:"copy_and_swap.cpp",children:`#include <iostream>
#include <utility>
#include <algorithm>

class Buffer {
    int* data_;
    size_t size_;
public:
    Buffer(size_t n = 0) : data_(n ? new int[n]() : nullptr), size_(n) {}

    Buffer(const Buffer& other) : data_(new int[other.size_]), size_(other.size_) {
        std::copy(other.data_, other.data_ + size_, data_);
    }

    Buffer(Buffer&& other) noexcept : data_(other.data_), size_(other.size_) {
        other.data_ = nullptr;
        other.size_ = 0;
    }

    // Unified assignment: works for both copy and move
    Buffer& operator=(Buffer other) noexcept {
        swap(*this, other);
        return *this;
    }

    friend void swap(Buffer& a, Buffer& b) noexcept {
        using std::swap;
        swap(a.data_, b.data_);
        swap(a.size_, b.size_);
    }

    ~Buffer() { delete[] data_; }
    size_t size() const { return size_; }
};

int main() {
    Buffer a(5);
    Buffer b(10);
    b = std::move(a);  // calls move ctor for param, then swaps
    std::cout << "b size: " << b.size() << "\\n";
    return 0;
}`}),e.jsx(r,{children:"b size: 5"}),e.jsx(n,{type:"tip",title:"Rule of Five",children:e.jsxs("p",{children:["If a class defines any one of the following, it should explicitly define all five: destructor, copy constructor, copy assignment operator, move constructor, and move assignment operator. This is the ",e.jsx("strong",{children:"Rule of Five"}),". With copy-and-swap you can combine both assignment operators into one."]})}),e.jsx(o,{title:"Prefer copy-and-swap for exception safety",children:e.jsxs("p",{children:["The copy-and-swap idiom provides the strong exception guarantee: if the copy (or move) of the parameter fails, the target object remains unchanged. The swap itself is",e.jsx("code",{children:"noexcept"}),", so the operation either fully succeeds or has no effect."]})}),e.jsx(a,{title:"Implement Move Assignment",difficulty:"intermediate",prompt:"Add a move assignment operator to a class that manages a dynamically allocated array of doubles. Use either the direct approach or copy-and-swap.",hints:["Release the current resource before stealing the new one","Check for self-assignment if using the direct approach","Mark the operator noexcept"],solution:e.jsx(t,{children:`#include <iostream>
#include <utility>

class DoubleArray {
    double* data_;
    size_t size_;
public:
    DoubleArray(size_t n) : data_(new double[n]()), size_(n) {}

    DoubleArray(DoubleArray&& other) noexcept
        : data_(other.data_), size_(other.size_) {
        other.data_ = nullptr;
        other.size_ = 0;
    }

    DoubleArray& operator=(DoubleArray&& other) noexcept {
        if (this != &other) {
            delete[] data_;
            data_ = other.data_;
            size_ = other.size_;
            other.data_ = nullptr;
            other.size_ = 0;
        }
        return *this;
    }

    ~DoubleArray() { delete[] data_; }
    size_t size() const { return size_; }
};

int main() {
    DoubleArray a(3);
    DoubleArray b(7);
    b = std::move(a);
    std::cout << "b size: " << b.size() << "\\n";
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"Move assignment operator",url:"https://en.cppreference.com/w/cpp/language/move_assignment",description:"Move assignment operator specification"},{type:"cppreference",title:"Rule of three/five/zero",url:"https://en.cppreference.com/w/cpp/language/rule_of_three",description:"Guidelines for special member functions"},{type:"textbook",title:"Effective Modern C++",author:"Scott Meyers",description:"Item 17: Understand special member function generation"}]})]})}const z=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"}));function h(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Two utility functions form the backbone of move semantics: ",e.jsx("code",{children:"std::move"})," casts an lvalue to an rvalue reference, enabling moves, while ",e.jsx("code",{children:"std::forward"})," preserves the value category of a forwarded argument, enabling ",e.jsx("strong",{children:"perfect forwarding"}),"."]}),e.jsx(s,{title:"std::move",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::move"})," is an unconditional cast to an rvalue reference. It does not move anything by itself; it simply signals to the compiler that the object may be moved from. The actual move happens when the result is passed to a move constructor or move assignment operator."]})}),e.jsxs(i,{title:"std::move Syntax",children:[e.jsxs("p",{children:[e.jsx("code",{children:"std::move(x)"})," is equivalent to ",e.jsx("code",{children:"static_cast<T&>(x)"}),". It lives in the ",e.jsx("code",{children:"<utility>"})," header."]}),e.jsx(t,{children:`#include <utility>
T&& result = std::move(lvalue_expression);`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Using std::move"}),e.jsx(t,{title:"std_move_demo.cpp",children:`#include <iostream>
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
}`}),e.jsx(r,{children:`After copy, name: Modern C++
After move, name: ""
Vector: Modern C++ Modern C++`}),e.jsx(d,{title:"std::move does not move",children:e.jsxs("p",{children:["Despite its name, ",e.jsx("code",{children:"std::move"})," performs no actual movement. It is purely a cast. If the result is passed to a function that only accepts ",e.jsx("code",{children:"const T&"}),", a copy will be made. The move only occurs when an overload accepting ",e.jsx("code",{children:"T&&"})," is selected."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Perfect Forwarding with std::forward"}),e.jsx(s,{title:"Universal References and std::forward",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"universal reference"})," (also called a forwarding reference) is declared as",e.jsx("code",{children:"T&&"})," where ",e.jsx("code",{children:"T"})," is a deduced template parameter. ",e.jsx("code",{children:"std::forward<T>"}),"preserves whether the original argument was an lvalue or rvalue, forwarding it with the correct value category."]})}),e.jsx(t,{title:"perfect_forwarding.cpp",children:`#include <iostream>
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
}`}),e.jsx(r,{children:`lvalue: Hello
rvalue: World
rvalue: Hello`}),e.jsx(n,{type:"info",title:"Universal Reference vs. Rvalue Reference",children:e.jsxs("p",{children:[e.jsx("code",{children:"T&&"})," is a universal reference only when ",e.jsx("code",{children:"T"})," is deduced from a template parameter. In all other cases (such as ",e.jsx("code",{children:"std::string&&"})," or ",e.jsx("code",{children:"Widget&&"}),"), it is a plain rvalue reference. The distinction is critical for understanding when to use ",e.jsx("code",{children:"std::forward"})," versus ",e.jsx("code",{children:"std::move"}),"."]})}),e.jsx(n,{type:"tip",title:"When to use which",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"std::move"})," when you know you want to move from an object and will not use it again. Use ",e.jsx("code",{children:"std::forward"})," only inside templates with universal references to pass arguments exactly as they were received."]})}),e.jsx(o,{title:"Do not std::move the return value of a local variable",children:e.jsxs("p",{children:["When returning a local variable from a function, do not use ",e.jsx("code",{children:"std::move"}),". The compiler applies ",e.jsx("strong",{children:"Named Return Value Optimization (NRVO)"})," automatically, which is even better than a move. Using ",e.jsx("code",{children:"std::move"})," on the return value actually prevents this optimization."]})}),e.jsx(a,{title:"Perfect Forwarding Factory",difficulty:"intermediate",prompt:"Write a factory function template 'make' that constructs an object of type T by perfectly forwarding arbitrary arguments to T's constructor.",hints:["Use a variadic template: template<typename T, typename... Args>","Use std::forward<Args>(args)... to forward all arguments","Return the constructed T object"],solution:e.jsx(t,{children:`#include <iostream>
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
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"std::move",url:"https://en.cppreference.com/w/cpp/utility/move",description:"Unconditional cast to rvalue reference"},{type:"cppreference",title:"std::forward",url:"https://en.cppreference.com/w/cpp/utility/forward",description:"Conditional cast for perfect forwarding"},{type:"textbook",title:"Effective Modern C++",author:"Scott Meyers",description:"Items 23-25: std::move, std::forward, and universal references"}]})]})}const A=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"}));function m(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"std::unique_ptr"})," is the workhorse of modern C++ memory management. It represents",e.jsx("strong",{children:" exclusive ownership"})," of a dynamically allocated object: exactly one",e.jsx("code",{children:"unique_ptr"})," owns the resource at any time, and the resource is automatically deleted when the pointer goes out of scope."]}),e.jsx(s,{title:"std::unique_ptr",children:e.jsxs("p",{children:["A smart pointer that owns and manages a heap-allocated object through a pointer, disposing of it when the ",e.jsx("code",{children:"unique_ptr"})," is destroyed. It cannot be copied, only moved, enforcing single-ownership semantics at compile time."]})}),e.jsxs(i,{title:"Creating a unique_ptr",children:[e.jsxs("p",{children:["Use ",e.jsx("code",{children:"std::make_unique"})," (C++14) to create a ",e.jsx("code",{children:"unique_ptr"}),". This is exception-safe and avoids writing ",e.jsx("code",{children:"new"})," directly."]}),e.jsx(t,{children:`#include <memory>
auto ptr = std::make_unique<Type>(constructor_args...);`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic Usage"}),e.jsx(t,{title:"unique_basic.cpp",children:`#include <iostream>
#include <memory>
#include <string>

class Resource {
    std::string name_;
public:
    Resource(std::string name) : name_(std::move(name)) {
        std::cout << name_ << " created\\n";
    }
    ~Resource() { std::cout << name_ << " destroyed\\n"; }
    void use() { std::cout << "Using " << name_ << "\\n"; }
};

int main() {
    auto r = std::make_unique<Resource>("Widget");
    r->use();

    // Transfer ownership via move
    auto r2 = std::move(r);
    if (!r) std::cout << "r is now null\\n";
    r2->use();

    // r2 goes out of scope -> Resource is destroyed
    return 0;
}`}),e.jsx(r,{children:`Widget created
Using Widget
r is now null
Using Widget
Widget destroyed`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Custom Deleters and Arrays"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"unique_ptr"})," supports custom deleters for special cleanup logic and has a partial specialization for arrays (",e.jsx("code",{children:"unique_ptr<T[]>"}),")."]}),e.jsx(t,{title:"unique_advanced.cpp",children:`#include <iostream>
#include <memory>
#include <cstdio>

int main() {
    // unique_ptr for arrays
    auto arr = std::make_unique<int[]>(5);
    for (int i = 0; i < 5; ++i) arr[i] = i * 10;
    for (int i = 0; i < 5; ++i) std::cout << arr[i] << " ";
    std::cout << "\\n";

    // Custom deleter for FILE*
    auto file_deleter = [](FILE* f) {
        if (f) {
            std::fclose(f);
            std::cout << "File closed\\n";
        }
    };
    {
        std::unique_ptr<FILE, decltype(file_deleter)> file(
            std::fopen("/dev/null", "w"), file_deleter
        );
        if (file) std::cout << "File opened\\n";
    } // file_deleter called here

    return 0;
}`}),e.jsx(r,{children:`0 10 20 30 40
File opened
File closed`}),e.jsx(n,{type:"info",title:"Move-only semantics",children:e.jsxs("p",{children:[e.jsx("code",{children:"unique_ptr"})," cannot be copied. Attempting to copy one is a compile error. This design enforces exclusive ownership at the type level. To transfer ownership, use",e.jsx("code",{children:"std::move"}),". This makes ",e.jsx("code",{children:"unique_ptr"})," ideal for expressing that a function takes or gives up ownership."]})}),e.jsx(d,{title:"Never use raw new with unique_ptr constructor",children:e.jsxs("p",{children:["Avoid ",e.jsx("code",{children:"std::unique_ptr<T>(new T(args))"}),". If an exception is thrown between the ",e.jsx("code",{children:"new"})," and the ",e.jsx("code",{children:"unique_ptr"})," construction, the memory leaks. Always prefer ",e.jsx("code",{children:"std::make_unique<T>(args)"}),"."]})}),e.jsx(o,{title:"Use unique_ptr by default",children:e.jsxs("p",{children:["When you need dynamic allocation, reach for ",e.jsx("code",{children:"std::unique_ptr"})," first. Only use",e.jsx("code",{children:"std::shared_ptr"})," when you truly need shared ownership. ",e.jsx("code",{children:"unique_ptr"}),"has zero overhead compared to a raw pointer and clearly communicates ownership intent."]})}),e.jsx(a,{title:"Factory Function with unique_ptr",difficulty:"intermediate",prompt:"Write a factory function that returns a std::unique_ptr<Shape> where Shape is a base class with a virtual draw() method. Create a Circle derived class and demonstrate polymorphic use.",hints:["Define Shape with a virtual draw() and virtual destructor","Derive Circle from Shape overriding draw()","Return std::make_unique<Circle>() from the factory"],solution:e.jsx(t,{children:`#include <iostream>
#include <memory>

class Shape {
public:
    virtual void draw() const = 0;
    virtual ~Shape() = default;
};

class Circle : public Shape {
    double radius_;
public:
    Circle(double r) : radius_(r) {}
    void draw() const override {
        std::cout << "Circle with radius " << radius_ << "\\n";
    }
};

std::unique_ptr<Shape> createShape(double r) {
    return std::make_unique<Circle>(r);
}

int main() {
    auto shape = createShape(5.0);
    shape->draw();
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"std::unique_ptr",url:"https://en.cppreference.com/w/cpp/memory/unique_ptr",description:"Exclusive-ownership smart pointer"},{type:"cppreference",title:"std::make_unique",url:"https://en.cppreference.com/w/cpp/memory/unique_ptr/make_unique",description:"Factory function for unique_ptr"},{type:"textbook",title:"Effective Modern C++",author:"Scott Meyers",description:"Item 18: Use std::unique_ptr for exclusive-ownership resource management"}]})]})}const P=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"}));function x(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"std::shared_ptr"})," enables ",e.jsx("strong",{children:"shared ownership"})," of a dynamically allocated object. Multiple ",e.jsx("code",{children:"shared_ptr"})," instances can point to the same object, and the object is destroyed only when the last ",e.jsx("code",{children:"shared_ptr"})," owning it is destroyed or reset."]}),e.jsx(s,{title:"std::shared_ptr and Reference Counting",children:e.jsxs("p",{children:["A ",e.jsx("code",{children:"shared_ptr"})," maintains a ",e.jsx("strong",{children:"control block"})," that tracks how many",e.jsx("code",{children:"shared_ptr"})," instances share ownership (the ",e.jsx("em",{children:"strong count"}),") and how many",e.jsx("code",{children:"weak_ptr"})," instances observe it (the ",e.jsx("em",{children:"weak count"}),"). When the strong count reaches zero, the managed object is destroyed."]})}),e.jsxs(i,{title:"Creating a shared_ptr",children:[e.jsxs("p",{children:["Use ",e.jsx("code",{children:"std::make_shared"})," for efficient creation. It performs a single allocation for both the object and the control block."]}),e.jsx(t,{children:`#include <memory>
auto ptr = std::make_shared<Type>(constructor_args...);`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Shared Ownership in Practice"}),e.jsx(t,{title:"shared_basic.cpp",children:`#include <iostream>
#include <memory>

class Document {
    std::string title_;
public:
    Document(std::string t) : title_(std::move(t)) {
        std::cout << "Document '" << title_ << "' created\\n";
    }
    ~Document() { std::cout << "Document '" << title_ << "' destroyed\\n"; }
    const std::string& title() const { return title_; }
};

int main() {
    auto doc = std::make_shared<Document>("Report");
    std::cout << "use_count: " << doc.use_count() << "\\n";

    {
        auto doc2 = doc;  // copy: both share ownership
        std::cout << "use_count: " << doc.use_count() << "\\n";
        std::cout << "doc2 title: " << doc2->title() << "\\n";
    } // doc2 destroyed, count decrements

    std::cout << "use_count: " << doc.use_count() << "\\n";
    return 0;
}`}),e.jsx(r,{children:`Document 'Report' created
use_count: 1
use_count: 2
doc2 title: Report
use_count: 1
Document 'Report' destroyed`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"The Control Block and Aliasing Constructor"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The ",e.jsx("strong",{children:"aliasing constructor"})," creates a ",e.jsx("code",{children:"shared_ptr"})," that shares ownership with another but points to a different object, such as a member of the managed object."]}),e.jsx(t,{title:"aliasing.cpp",children:`#include <iostream>
#include <memory>

struct Pair {
    int first;
    int second;
    ~Pair() { std::cout << "Pair destroyed\\n"; }
};

int main() {
    auto p = std::make_shared<Pair>();
    p->first = 10;
    p->second = 20;

    // Aliasing: shares ownership of Pair, but points to 'second'
    std::shared_ptr<int> alias(p, &p->second);

    std::cout << "alias value: " << *alias << "\\n";
    std::cout << "p use_count: " << p.use_count() << "\\n";

    p.reset();  // Pair not destroyed yet, alias still owns it
    std::cout << "alias value after reset: " << *alias << "\\n";
    std::cout << "alias use_count: " << alias.use_count() << "\\n";
    return 0;
}`}),e.jsx(r,{children:`alias value: 20
p use_count: 2
alias value after reset: 20
alias use_count: 1
Pair destroyed`}),e.jsx(n,{type:"info",title:"Control Block Overhead",children:e.jsxs("p",{children:["Each ",e.jsx("code",{children:"shared_ptr"})," carries overhead: the control block stores the strong count, weak count, deleter, and allocator. ",e.jsx("code",{children:"make_shared"})," mitigates this by combining the object and control block into a single allocation, improving cache locality and reducing allocation overhead."]})}),e.jsx(d,{title:"Avoid creating shared_ptr from raw pointers multiple times",children:e.jsxs("p",{children:["Never create two ",e.jsx("code",{children:"shared_ptr"})," instances from the same raw pointer. Each will create its own control block, leading to double deletion. Always copy or move an existing",e.jsx("code",{children:"shared_ptr"})," to share ownership."]})}),e.jsx(o,{title:"Prefer make_shared over new",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::make_shared<T>(args)"})," is preferred because it makes a single allocation, is exception-safe, and avoids the risk of memory leaks from interleaved evaluations. The only exception is when you need a custom deleter."]})}),e.jsx(a,{title:"Shared Configuration Object",difficulty:"intermediate",prompt:"Create a Config class with a string 'setting' member. Write a function that takes a shared_ptr<Config> and prints the setting. Demonstrate that multiple shared_ptr instances keep the Config alive.",hints:["Use make_shared to create the Config","Pass shared_ptr by value to the function to share ownership","Print use_count() to observe the reference count"],solution:e.jsx(t,{children:`#include <iostream>
#include <memory>
#include <string>

struct Config {
    std::string setting;
    Config(std::string s) : setting(std::move(s)) {}
    ~Config() { std::cout << "Config destroyed\\n"; }
};

void printSetting(std::shared_ptr<Config> cfg) {
    std::cout << "Setting: " << cfg->setting
              << " (count: " << cfg.use_count() << ")\\n";
}

int main() {
    auto cfg = std::make_shared<Config>("dark_mode=true");
    std::cout << "Count: " << cfg.use_count() << "\\n";
    printSetting(cfg);
    std::cout << "Count: " << cfg.use_count() << "\\n";
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"std::shared_ptr",url:"https://en.cppreference.com/w/cpp/memory/shared_ptr",description:"Shared-ownership smart pointer"},{type:"cppreference",title:"std::make_shared",url:"https://en.cppreference.com/w/cpp/memory/shared_ptr/make_shared",description:"Factory function for shared_ptr"},{type:"textbook",title:"Effective Modern C++",author:"Scott Meyers",description:"Item 19: Use std::shared_ptr for shared-ownership resource management"}]})]})}const M=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"}));function f(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"std::weak_ptr"})," is a non-owning smart pointer that observes an object managed by ",e.jsx("code",{children:"std::shared_ptr"})," without affecting its lifetime. Its primary purpose is to break ",e.jsx("strong",{children:"circular references"})," that would otherwise prevent shared_ptr objects from ever being destroyed."]}),e.jsx(s,{title:"std::weak_ptr",children:e.jsxs("p",{children:["A weak_ptr holds a non-owning reference to an object managed by shared_ptr. It does not contribute to the strong reference count. To access the object, you must call",e.jsx("code",{children:"lock()"})," which returns a shared_ptr if the object still exists, or an empty shared_ptr if it has been destroyed."]})}),e.jsxs(i,{title:"weak_ptr Operations",children:[e.jsxs("p",{children:["The key operations on a weak_ptr are ",e.jsx("code",{children:"lock()"})," to safely obtain a shared_ptr, and ",e.jsx("code",{children:"expired()"})," to check if the managed object has been destroyed."]}),e.jsx(t,{children:`std::shared_ptr<T> sp = std::make_shared<T>();
std::weak_ptr<T> wp = sp;      // observe without owning
if (auto locked = wp.lock()) {  // safely access
    // use locked
}
bool gone = wp.expired();       // check if object was destroyed`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Breaking Circular References"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["When two objects hold ",e.jsx("code",{children:"shared_ptr"})," to each other, neither can be destroyed. Using",e.jsx("code",{children:"weak_ptr"})," for the back-reference breaks the cycle."]}),e.jsx(t,{title:"break_cycle.cpp",children:`#include <iostream>
#include <memory>
#include <string>

struct Node {
    std::string name;
    std::shared_ptr<Node> next;   // owning reference
    std::weak_ptr<Node> prev;     // non-owning back-reference
    Node(std::string n) : name(std::move(n)) {
        std::cout << name << " created\\n";
    }
    ~Node() { std::cout << name << " destroyed\\n"; }
};

int main() {
    auto a = std::make_shared<Node>("A");
    auto b = std::make_shared<Node>("B");

    a->next = b;     // A owns B
    b->prev = a;     // B observes A (no ownership)

    std::cout << "a use_count: " << a.use_count() << "\\n";  // 1
    std::cout << "b use_count: " << b.use_count() << "\\n";  // 2

    // Access prev via lock()
    if (auto prev = b->prev.lock()) {
        std::cout << "B's prev: " << prev->name << "\\n";
    }
    return 0;
}`}),e.jsx(r,{children:`A created
B created
a use_count: 1
b use_count: 2
B's prev: A
B destroyed
A destroyed`}),e.jsx(n,{type:"important",title:"Why lock() instead of dereferencing",children:e.jsxs("p",{children:["You cannot dereference a weak_ptr directly. Between checking ",e.jsx("code",{children:"expired()"})," and attempting to use the object, another thread could destroy it. ",e.jsx("code",{children:"lock()"})," atomically checks and acquires a shared_ptr in one step, making it thread-safe."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Observer Pattern with weak_ptr"}),e.jsx(t,{title:"observer.cpp",children:`#include <iostream>
#include <memory>
#include <vector>
#include <algorithm>

class Observer {
public:
    virtual void notify(const std::string& msg) = 0;
    virtual ~Observer() = default;
};

class Subject {
    std::vector<std::weak_ptr<Observer>> observers_;
public:
    void subscribe(std::weak_ptr<Observer> obs) {
        observers_.push_back(obs);
    }

    void broadcast(const std::string& msg) {
        for (auto it = observers_.begin(); it != observers_.end(); ) {
            if (auto obs = it->lock()) {
                obs->notify(msg);
                ++it;
            } else {
                it = observers_.erase(it);  // remove dead observers
            }
        }
    }
};

class Logger : public Observer {
    std::string name_;
public:
    Logger(std::string n) : name_(std::move(n)) {}
    void notify(const std::string& msg) override {
        std::cout << name_ << " received: " << msg << "\\n";
    }
};

int main() {
    Subject subject;
    auto log1 = std::make_shared<Logger>("Log1");
    auto log2 = std::make_shared<Logger>("Log2");
    subject.subscribe(log1);
    subject.subscribe(log2);
    subject.broadcast("Event 1");

    log1.reset();  // Log1 is destroyed
    subject.broadcast("Event 2");  // only Log2 receives it
    return 0;
}`}),e.jsx(r,{children:`Log1 received: Event 1
Log2 received: Event 1
Log2 received: Event 2`}),e.jsx(d,{title:"Do not use expired() then lock()",children:e.jsxs("p",{children:["Calling ",e.jsx("code",{children:"expired()"})," followed by ",e.jsx("code",{children:"lock()"})," introduces a race condition in multithreaded code. The object could be destroyed between the two calls. Always use",e.jsx("code",{children:"lock()"})," directly and check the returned shared_ptr."]})}),e.jsx(o,{title:"Use weak_ptr for caches and observers",children:e.jsxs("p",{children:[e.jsx("code",{children:"weak_ptr"})," is ideal for caches (you can check if the object still exists before recreating it) and observer patterns (observers can disappear without leaking memory or leaving dangling pointers)."]})}),e.jsx(a,{title:"Cache with weak_ptr",difficulty:"intermediate",prompt:"Implement a simple cache that stores a weak_ptr to a shared resource. Write a getResource() function that returns the cached object if it still exists, or creates a new one otherwise.",hints:["Store std::weak_ptr<Resource> as the cache entry","In getResource(), call lock() on the weak_ptr","If lock() returns null, create a new shared_ptr and update the cache"],solution:e.jsx(t,{children:`#include <iostream>
#include <memory>

struct Data {
    int value;
    Data(int v) : value(v) { std::cout << "Data created\\n"; }
    ~Data() { std::cout << "Data destroyed\\n"; }
};

class Cache {
    std::weak_ptr<Data> cached_;
public:
    std::shared_ptr<Data> get(int val) {
        auto sp = cached_.lock();
        if (!sp) {
            sp = std::make_shared<Data>(val);
            cached_ = sp;
            std::cout << "Cache miss\\n";
        } else {
            std::cout << "Cache hit\\n";
        }
        return sp;
    }
};

int main() {
    Cache cache;
    {
        auto d = cache.get(42);   // miss
        auto d2 = cache.get(42);  // hit
    } // Data destroyed
    auto d3 = cache.get(99);      // miss, creates new
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"std::weak_ptr",url:"https://en.cppreference.com/w/cpp/memory/weak_ptr",description:"Non-owning smart pointer"},{type:"cppreference",title:"std::weak_ptr::lock",url:"https://en.cppreference.com/w/cpp/memory/weak_ptr/lock",description:"Safely obtain shared_ptr from weak_ptr"},{type:"textbook",title:"Effective Modern C++",author:"Scott Meyers",description:"Item 20: Use std::weak_ptr for shared_ptr-like pointers that can dangle"}]})]})}const U=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"}));function g(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Structured bindings, introduced in C++17, allow you to decompose an object into its constituent parts and bind each part to a named variable in a single declaration. They work with pairs, tuples, arrays, and structs with public members."}),e.jsx(s,{title:"Structured Bindings",children:e.jsxs("p",{children:["A structured binding declaration introduces all identifiers in the bracket list as names bound to the elements of the initializer expression. The syntax",e.jsx("code",{children:"auto [a, b] = expr;"})," decomposes ",e.jsx("code",{children:"expr"})," into its components and binds them to ",e.jsx("code",{children:"a"})," and ",e.jsx("code",{children:"b"}),"."]})}),e.jsxs(i,{title:"Structured Binding Syntax",children:[e.jsxs("p",{children:["The declaration can use ",e.jsx("code",{children:"auto"}),", ",e.jsx("code",{children:"const auto&"}),", or ",e.jsx("code",{children:"auto&&"}),"to control how the values are bound."]}),e.jsx(t,{children:`auto  [a, b] = expr;       // copies
const auto& [a, b] = expr; // const references
auto&& [a, b] = expr;      // forwarding references`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Binding to Pairs, Tuples, and Structs"}),e.jsx(t,{title:"structured_bindings.cpp",children:`#include <iostream>
#include <tuple>
#include <map>
#include <string>

struct Point {
    double x, y;
};

std::pair<bool, std::string> validate(int age) {
    if (age >= 0 && age <= 150)
        return {true, "Valid"};
    return {false, "Invalid age"};
}

int main() {
    // Binding to a pair
    auto [ok, message] = validate(25);
    std::cout << ok << ": " << message << "\\n";

    // Binding to a tuple
    auto [name, score, passed] = std::make_tuple("Alice", 95.5, true);
    std::cout << name << " scored " << score << "\\n";

    // Binding to a struct
    Point p{3.0, 4.0};
    auto [x, y] = p;
    std::cout << "Point: (" << x << ", " << y << ")\\n";

    // Binding to an array
    int arr[] = {10, 20, 30};
    auto [a, b, c] = arr;
    std::cout << a << " " << b << " " << c << "\\n";

    return 0;
}`}),e.jsx(r,{children:`1: Valid
Alice scored 95.5
Point: (3, 4)
10 20 30`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Iterating Maps with Structured Bindings"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["One of the most common uses of structured bindings is iterating over ",e.jsx("code",{children:"std::map"}),", where each element is a ",e.jsx("code",{children:"std::pair<const Key, Value>"}),"."]}),e.jsx(t,{title:"map_iteration.cpp",children:`#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> scores = {
        {"Alice", 95}, {"Bob", 87}, {"Carol", 92}
    };

    // Clean iteration with structured bindings
    for (const auto& [name, score] : scores) {
        std::cout << name << ": " << score << "\\n";
    }

    // Modify values through non-const reference
    for (auto& [name, score] : scores) {
        score += 5;  // bonus points
    }

    std::cout << "After bonus:\\n";
    for (const auto& [name, score] : scores) {
        std::cout << name << ": " << score << "\\n";
    }

    return 0;
}`}),e.jsx(r,{children:`Alice: 95
Bob: 87
Carol: 92
After bonus:
Alice: 100
Bob: 92
Carol: 97`}),e.jsx(n,{type:"tip",title:"const auto& for read-only access",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"const auto&"})," when you only need to read values. This avoids unnecessary copies and makes your intent clear. Use ",e.jsx("code",{children:"auto&"})," when you need to modify the bound variables in place."]})}),e.jsx(n,{type:"info",title:"How it works under the hood",children:e.jsxs("p",{children:["Structured bindings work by decomposing the initializer using either ",e.jsx("code",{children:"std::tuple_size"}),"and ",e.jsx("code",{children:"std::get"})," (for tuple-like types), direct member access (for simple structs), or element access (for arrays). The number of identifiers must match the number of elements exactly."]})}),e.jsx(l,{compiler:"all",title:"Requires C++17",children:e.jsxs("p",{children:["Structured bindings require C++17 or later. Compile with ",e.jsx("code",{children:"-std=c++17"})," (GCC/Clang) or ",e.jsx("code",{children:"/std:c++17"})," (MSVC)."]})}),e.jsx(o,{title:"Use structured bindings to improve readability",children:e.jsxs("p",{children:["Structured bindings replace verbose patterns like ",e.jsx("code",{children:"pair.first"})," and",e.jsx("code",{children:"std::get<0>(tuple)"})," with meaningful names. They make code self-documenting and are especially valuable when iterating over maps or unpacking function return values."]})}),e.jsx(a,{title:"Structured Binding with Custom Type",difficulty:"beginner",prompt:"Create a function that returns a struct with three fields (name, age, email). Use structured bindings to decompose the return value and print each field.",hints:["Define a struct with the three fields","Return the struct from the function using brace initialization","Use auto [name, age, email] = functionCall() to decompose"],solution:e.jsx(t,{children:`#include <iostream>
#include <string>

struct Person {
    std::string name;
    int age;
    std::string email;
};

Person getPerson() {
    return {"Alice", 30, "alice@example.com"};
}

int main() {
    auto [name, age, email] = getPerson();
    std::cout << "Name:  " << name << "\\n";
    std::cout << "Age:   " << age << "\\n";
    std::cout << "Email: " << email << "\\n";
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"Structured bindings",url:"https://en.cppreference.com/w/cpp/language/structured_binding",description:"Structured binding declaration (C++17)"},{type:"cppreference",title:"std::tuple",url:"https://en.cppreference.com/w/cpp/utility/tuple",description:"Fixed-size heterogeneous collection"},{type:"textbook",title:"C++17 - The Complete Guide",author:"Nicolai Josuttis",description:"Chapter 1: Structured Bindings"}]})]})}const D=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"}));function y(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++17 introduced vocabulary types that express common patterns in a type-safe way:",e.jsx("code",{children:"std::optional"})," for nullable values, ",e.jsx("code",{children:"std::variant"})," for type-safe unions, and ",e.jsx("code",{children:"std::any"})," for type-erased values. These types replace error-prone patterns like sentinel values, C unions, and ",e.jsx("code",{children:"void*"}),"."]}),e.jsx(s,{title:"std::optional",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::optional<T>"})," represents a value that may or may not be present. It either contains a value of type ",e.jsx("code",{children:"T"})," or is empty (",e.jsx("code",{children:"std::nullopt"}),"). It is ideal for functions that can fail without throwing an exception."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::optional"}),e.jsx(t,{title:"optional_demo.cpp",children:`#include <iostream>
#include <optional>
#include <string>
#include <charconv>

std::optional<int> parseInt(const std::string& s) {
    int result;
    auto [ptr, ec] = std::from_chars(s.data(), s.data() + s.size(), result);
    if (ec == std::errc{} && ptr == s.data() + s.size())
        return result;
    return std::nullopt;
}

int main() {
    auto a = parseInt("42");
    auto b = parseInt("abc");

    if (a) std::cout << "Parsed: " << *a << "\\n";
    std::cout << "b has value: " << b.has_value() << "\\n";

    // value_or provides a default
    int val = b.value_or(-1);
    std::cout << "Default: " << val << "\\n";
    return 0;
}`}),e.jsx(r,{children:`Parsed: 42
b has value: 0
Default: -1`}),e.jsx(d,{title:"Do not dereference an empty optional",children:e.jsxs("p",{children:["Accessing the value of an empty ",e.jsx("code",{children:"optional"})," with ",e.jsx("code",{children:"*opt"})," or",e.jsx("code",{children:"opt->"})," is undefined behavior. Use ",e.jsx("code",{children:"has_value()"})," or a boolean check first. ",e.jsx("code",{children:"value()"})," throws ",e.jsx("code",{children:"std::bad_optional_access"})," if empty."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::variant"}),e.jsx(s,{title:"std::variant",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::variant<Types...>"})," is a type-safe union that holds exactly one value from its list of alternative types. Unlike C unions, it tracks which type is active and prevents access through the wrong type."]})}),e.jsx(t,{title:"variant_demo.cpp",children:`#include <iostream>
#include <variant>
#include <string>

using Value = std::variant<int, double, std::string>;

void printValue(const Value& v) {
    std::visit([](const auto& val) {
        std::cout << val << "\\n";
    }, v);
}

std::string typeOf(const Value& v) {
    return std::visit([](const auto& val) -> std::string {
        using T = std::decay_t<decltype(val)>;
        if constexpr (std::is_same_v<T, int>) return "int";
        else if constexpr (std::is_same_v<T, double>) return "double";
        else return "string";
    }, v);
}

int main() {
    Value v1 = 42;
    Value v2 = 3.14;
    Value v3 = std::string("hello");

    for (const auto& v : {v1, v2}) {
        std::cout << typeOf(v) << ": ";
        printValue(v);
    }
    std::cout << typeOf(v3) << ": ";
    printValue(v3);

    // std::get throws bad_variant_access if wrong type
    std::cout << "int value: " << std::get<int>(v1) << "\\n";
    return 0;
}`}),e.jsx(r,{children:`int: 42
double: 3.14
string: hello
int value: 42`}),e.jsx(n,{type:"info",title:"std::visit",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::visit"})," applies a callable (often a generic lambda) to the active alternative of a variant. It ensures at compile time that all alternatives are handled. For multiple variants, it generates a dispatch table over all combinations."]})}),e.jsx(n,{type:"tip",title:"std::any for fully type-erased values",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::any"})," can hold a value of any copyable type. Use ",e.jsx("code",{children:"std::any_cast"}),"to retrieve it. Unlike ",e.jsx("code",{children:"variant"}),", the set of types is open. However, it lacks compile-time type checking and is less efficient. Prefer ",e.jsx("code",{children:"variant"})," when the set of types is known."]})}),e.jsxs(i,{title:"std::any Quick Reference",children:[e.jsxs("p",{children:[e.jsx("code",{children:"std::any"})," lives in ",e.jsx("code",{children:"<any>"})," and provides runtime type safety through ",e.jsx("code",{children:"std::any_cast"}),", which throws ",e.jsx("code",{children:"std::bad_any_cast"})," on type mismatch."]}),e.jsx(t,{children:`#include <any>
std::any a = 42;
int val = std::any_cast<int>(a);     // OK
// std::any_cast<double>(a);         // throws bad_any_cast`})]}),e.jsx(o,{title:"Choose the right vocabulary type",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"std::optional"})," when a value might be absent. Use ",e.jsx("code",{children:"std::variant"}),"when a value can be one of a known set of types. Use ",e.jsx("code",{children:"std::any"})," only when the type set is truly open. Prefer these over raw pointers, sentinel values, or C unions."]})}),e.jsx(a,{title:"Shape Area Calculator",difficulty:"intermediate",prompt:"Define a variant Shape that can hold a Circle (radius), Rectangle (width, height), or Triangle (base, height). Write a function that uses std::visit to compute the area of any shape.",hints:["Define structs for Circle, Rectangle, and Triangle","Use std::variant<Circle, Rectangle, Triangle> as the Shape type","In std::visit, use if constexpr or an overloaded lambda to compute area"],solution:e.jsx(t,{children:`#include <iostream>
#include <variant>
#include <cmath>

struct Circle    { double radius; };
struct Rectangle { double width, height; };
struct Triangle  { double base, height; };

using Shape = std::variant<Circle, Rectangle, Triangle>;

double area(const Shape& s) {
    return std::visit([](const auto& shape) -> double {
        using T = std::decay_t<decltype(shape)>;
        if constexpr (std::is_same_v<T, Circle>)
            return M_PI * shape.radius * shape.radius;
        else if constexpr (std::is_same_v<T, Rectangle>)
            return shape.width * shape.height;
        else
            return 0.5 * shape.base * shape.height;
    }, s);
}

int main() {
    Shape c = Circle{5.0};
    Shape r = Rectangle{3.0, 4.0};
    Shape t = Triangle{6.0, 3.0};
    std::cout << "Circle: "    << area(c) << "\\n";
    std::cout << "Rectangle: " << area(r) << "\\n";
    std::cout << "Triangle: "  << area(t) << "\\n";
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"std::optional",url:"https://en.cppreference.com/w/cpp/utility/optional",description:"Optional value wrapper (C++17)"},{type:"cppreference",title:"std::variant",url:"https://en.cppreference.com/w/cpp/utility/variant",description:"Type-safe discriminated union (C++17)"},{type:"cppreference",title:"std::any",url:"https://en.cppreference.com/w/cpp/utility/any",description:"Type-safe container for any type (C++17)"}]})]})}const R=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"}));function j(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"std::string_view"})," is a lightweight, non-owning reference to a contiguous sequence of characters. It provides a read-only view into a string without copying it, making it ideal for function parameters that only need to inspect string data."]}),e.jsx(s,{title:"std::string_view",children:e.jsxs("p",{children:["A ",e.jsx("code",{children:"string_view"})," is essentially a pointer and a length. It can refer to a",e.jsx("code",{children:"std::string"}),", a C-style string literal, or any contiguous character buffer. Since it does not own the data, it is cheap to copy and pass by value."]})}),e.jsxs(i,{title:"string_view Basics",children:[e.jsxs("p",{children:[e.jsx("code",{children:"string_view"})," lives in ",e.jsx("code",{children:"<string_view>"})," and supports most read-only operations of ",e.jsx("code",{children:"std::string"}),"."]}),e.jsx(t,{children:`#include <string_view>
std::string_view sv = "Hello, World!";
sv.substr(0, 5);    // returns a string_view, no allocation
sv.find("World");   // search within the view
sv.size();          // length of the view`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Performance Benefits"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Using ",e.jsx("code",{children:"string_view"})," as a function parameter avoids unnecessary copies that occur when accepting ",e.jsx("code",{children:"const std::string&"})," from a string literal (which would create a temporary ",e.jsx("code",{children:"std::string"}),")."]}),e.jsx(t,{title:"string_view_perf.cpp",children:`#include <iostream>
#include <string>
#include <string_view>

// Accepts any string-like input without copying
void printHeader(std::string_view text) {
    std::cout << "=== " << text << " ===\\n";
    std::cout << "Length: " << text.size() << "\\n";
}

int main() {
    // Works with string literals (no allocation)
    printHeader("Hello");

    // Works with std::string
    std::string title = "C++17 Features";
    printHeader(title);

    // Works with substrings (no allocation)
    std::string_view full = "Modern C++ Programming";
    printHeader(full.substr(7, 3));  // "C++"

    return 0;
}`}),e.jsx(r,{children:`=== Hello ===
Length: 5
=== C++17 Features ===
Length: 14
=== C++ ===
Length: 3`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Substring Without Allocation"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Unlike ",e.jsx("code",{children:"std::string::substr"}),", which allocates a new string,",e.jsx("code",{children:"string_view::substr"})," returns another view into the same data with zero cost."]}),e.jsx(t,{title:"substr_view.cpp",children:`#include <iostream>
#include <string_view>

void tokenize(std::string_view csv) {
    size_t pos = 0;
    while (pos < csv.size()) {
        size_t comma = csv.find(',', pos);
        if (comma == std::string_view::npos)
            comma = csv.size();
        std::string_view token = csv.substr(pos, comma - pos);
        std::cout << "[" << token << "]\\n";
        pos = comma + 1;
    }
}

int main() {
    tokenize("apple,banana,cherry,date");
    return 0;
}`}),e.jsx(r,{children:`[apple]
[banana]
[cherry]
[date]`}),e.jsx(d,{title:"Lifetime pitfalls",children:e.jsxs("p",{children:["A ",e.jsx("code",{children:"string_view"})," does not own its data. If the underlying string is destroyed or modified, the view becomes a dangling reference. Never return a ",e.jsx("code",{children:"string_view"}),"that refers to a local ",e.jsx("code",{children:"std::string"})," or store a ",e.jsx("code",{children:"string_view"})," that outlives its source."]})}),e.jsx(n,{type:"important",title:"Not null-terminated",children:e.jsxs("p",{children:["A ",e.jsx("code",{children:"string_view"})," is not guaranteed to be null-terminated. Passing",e.jsx("code",{children:"sv.data()"})," to a C function that expects a null-terminated string is undefined behavior unless the view happens to end at a null character. Use ",e.jsx("code",{children:"std::string(sv)"}),"when you need a null-terminated copy."]})}),e.jsx(n,{type:"tip",title:"remove_prefix and remove_suffix",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"remove_prefix(n)"})," and ",e.jsx("code",{children:"remove_suffix(n)"})," to narrow the view from either end without allocation. These are useful for trimming whitespace or stripping delimiters."]})}),e.jsx(o,{title:"Use string_view for read-only string parameters",children:e.jsxs("p",{children:["Prefer ",e.jsx("code",{children:"std::string_view"})," over ",e.jsx("code",{children:"const std::string&"})," for function parameters that only read string data. Pass it by value since it is just a pointer and length. Only use ",e.jsx("code",{children:"const std::string&"})," when the function needs to store a reference or the API requires it."]})}),e.jsx(a,{title:"Word Counter",difficulty:"beginner",prompt:"Write a function that takes a std::string_view and returns the number of words (separated by spaces). Use string_view operations only, no allocations.",hints:["Use find() and substr() or iterate with a loop","Handle leading, trailing, and multiple spaces","Count transitions from space to non-space"],solution:e.jsx(t,{children:`#include <iostream>
#include <string_view>

int countWords(std::string_view text) {
    int count = 0;
    bool inWord = false;
    for (char c : text) {
        if (c == ' ') {
            inWord = false;
        } else if (!inWord) {
            inWord = true;
            ++count;
        }
    }
    return count;
}

int main() {
    std::cout << countWords("Hello World") << "\\n";        // 2
    std::cout << countWords("  spaces  everywhere  ") << "\\n"; // 2
    std::cout << countWords("single") << "\\n";             // 1
    std::cout << countWords("") << "\\n";                   // 0
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"std::basic_string_view",url:"https://en.cppreference.com/w/cpp/string/basic_string_view",description:"Non-owning string reference (C++17)"},{type:"cppreference",title:"std::string_view::substr",url:"https://en.cppreference.com/w/cpp/string/basic_string_view/substr",description:"Non-allocating substring"},{type:"textbook",title:"C++17 - The Complete Guide",author:"Nicolai Josuttis",description:"Chapter 20: std::string_view"}]})]})}const W=Object.freeze(Object.defineProperty({__proto__:null,default:j},Symbol.toStringTag,{value:"Module"}));function v(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++20 modules replace the decades-old header-based inclusion model with a modern system that offers faster compilation, better encapsulation, and freedom from macro leakage. Instead of textually including headers, you ",e.jsx("code",{children:"import"})," a module, which provides only its explicitly exported declarations."]}),e.jsx(s,{title:"C++20 Modules",children:e.jsx("p",{children:"A module is a self-contained unit of code that explicitly controls what it exports. Unlike headers, modules are compiled once and their compiled form is reused, eliminating redundant parsing. Macros defined in a module do not leak into importers."})}),e.jsxs(i,{title:"Module Declaration Syntax",children:[e.jsxs("p",{children:["A module interface file declares the module name and exports its public API. The ",e.jsx("code",{children:"export module"})," declaration must appear at the top of the file."]}),e.jsx(t,{children:`// math.cppm (module interface unit)
export module math;

export int add(int a, int b) {
    return a + b;
}

export int multiply(int a, int b) {
    return a * b;
}`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Creating and Using a Module"}),e.jsx(t,{title:"math.cppm",children:`export module math;

// Exported: visible to importers
export double pi() { return 3.14159265358979; }

export double circleArea(double radius) {
    return pi() * radius * radius;
}

// Not exported: internal to this module
double internalHelper() {
    return 2.0;
}`}),e.jsx(t,{title:"main.cpp",children:`import math;
#include <iostream>

int main() {
    std::cout << "Pi: " << pi() << "\\n";
    std::cout << "Area: " << circleArea(5.0) << "\\n";
    // internalHelper();  // ERROR: not exported
    return 0;
}`}),e.jsx(r,{children:`Pi: 3.14159
Area: 78.5398`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Module Partitions"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Large modules can be split into ",e.jsx("strong",{children:"partitions"}),". A partition is a sub-unit of a module that can be imported by other parts of the same module."]}),e.jsx(t,{title:"Module partitions",children:`// geometry-shapes.cppm
export module geometry:shapes;

export struct Circle {
    double radius;
};

export struct Rectangle {
    double width, height;
};

// geometry-area.cppm
export module geometry:area;
import :shapes;

export double area(const Circle& c) {
    return 3.14159 * c.radius * c.radius;
}

export double area(const Rectangle& r) {
    return r.width * r.height;
}

// geometry.cppm (primary module interface)
export module geometry;
export import :shapes;
export import :area;`}),e.jsx(n,{type:"info",title:"import vs #include",children:e.jsxs("p",{children:[e.jsx("code",{children:"import"})," does not perform textual inclusion. The compiler reads a precompiled binary module interface (BMI), which is much faster. Modules also prevent macro pollution: a macro defined in module A does not affect code that imports A."]})}),e.jsx(l,{compiler:"gcc",title:"GCC Module Support",children:e.jsxs("p",{children:["GCC supports modules with ",e.jsx("code",{children:"-fmodules-ts"})," and typically uses ",e.jsx("code",{children:".cppm"}),"or ",e.jsx("code",{children:".cpp"})," extensions for module interface files. Compile module interfaces before their importers."]})}),e.jsx(l,{compiler:"msvc",title:"MSVC Module Support",children:e.jsxs("p",{children:["MSVC has the most mature module support. Use ",e.jsx("code",{children:"/std:c++20"})," and",e.jsx("code",{children:".ixx"})," as the module interface extension. The build system handles dependency ordering automatically."]})}),e.jsx(d,{title:"Build system support is still evolving",children:e.jsx("p",{children:"Module support in CMake (since 3.28), MSBuild, and other build systems is still maturing. Dependency scanning and build ordering are more complex than with headers. Check your build system's documentation for current module support status."})}),e.jsx(o,{title:"Start with named modules for new code",children:e.jsxs("p",{children:["For new projects, consider using modules from the start. For existing codebases, adopt modules incrementally by wrapping stable components. Use ",e.jsx("code",{children:"export import"})," to re-export dependencies, keeping the public API clean and discoverable."]})}),e.jsx(a,{title:"Create a String Utilities Module",difficulty:"intermediate",prompt:"Write a module 'stringutils' that exports two functions: toUpper(std::string) and contains(std::string_view, std::string_view). Write a main.cpp that imports and uses them.",hints:["Use 'export module stringutils;' at the top of the module file","Import <string> and <algorithm> inside the module","Mark only the public functions with 'export'"],solution:e.jsx(t,{children:`// stringutils.cppm
export module stringutils;
import <string>;
import <string_view>;
import <algorithm>;

export std::string toUpper(std::string s) {
    std::transform(s.begin(), s.end(), s.begin(), ::toupper);
    return s;
}

export bool contains(std::string_view haystack, std::string_view needle) {
    return haystack.find(needle) != std::string_view::npos;
}

// main.cpp
import stringutils;
#include <iostream>

int main() {
    std::cout << toUpper("hello") << "\\n";
    std::cout << contains("hello world", "world") << "\\n";
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"Modules (C++20)",url:"https://en.cppreference.com/w/cpp/language/modules",description:"Module declaration and usage"},{type:"cppreference",title:"import declaration",url:"https://en.cppreference.com/w/cpp/language/import",description:"Import module or header unit"},{type:"textbook",title:"C++20 - The Complete Guide",author:"Nicolai Josuttis",description:"Chapter 17: Modules"}]})]})}const I=Object.freeze(Object.defineProperty({__proto__:null,default:v},Symbol.toStringTag,{value:"Module"}));function b(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++20 coroutines allow functions to be suspended and resumed, enabling lazy evaluation, generators, and asynchronous programming. A function becomes a coroutine when it uses any of the three coroutine keywords: ",e.jsx("code",{children:"co_await"}),", ",e.jsx("code",{children:"co_yield"}),", or ",e.jsx("code",{children:"co_return"}),"."]}),e.jsx(s,{title:"Coroutine",children:e.jsx("p",{children:"A coroutine is a function that can suspend execution at certain points and be resumed later. Unlike regular functions that run to completion, coroutines maintain their state (local variables, execution position) across suspensions. C++20 provides the language primitives; library support is left to the user or third-party libraries."})}),e.jsxs(i,{title:"Coroutine Keywords",children:[e.jsx("p",{children:"Three keywords mark suspension and return points within a coroutine body."}),e.jsx(t,{children:`co_await expr;    // suspend until expr is ready
co_yield expr;    // suspend and produce a value
co_return expr;   // complete the coroutine with a final value`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Building a Generator"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["A ",e.jsx("strong",{children:"generator"})," is the most common coroutine pattern. It lazily produces a sequence of values, one at a time, using ",e.jsx("code",{children:"co_yield"}),"."]}),e.jsx(t,{title:"generator.cpp",children:`#include <iostream>
#include <coroutine>

template <typename T>
struct Generator {
    struct promise_type {
        T current_value;

        Generator get_return_object() {
            return Generator{
                std::coroutine_handle<promise_type>::from_promise(*this)
            };
        }

        std::suspend_always initial_suspend() { return {}; }
        std::suspend_always final_suspend() noexcept { return {}; }
        std::suspend_always yield_value(T value) {
            current_value = value;
            return {};
        }
        void return_void() {}
        void unhandled_exception() { std::terminate(); }
    };

    std::coroutine_handle<promise_type> handle;

    Generator(std::coroutine_handle<promise_type> h) : handle(h) {}
    ~Generator() { if (handle) handle.destroy(); }

    // Move-only
    Generator(const Generator&) = delete;
    Generator(Generator&& other) noexcept : handle(other.handle) {
        other.handle = nullptr;
    }

    bool next() {
        handle.resume();
        return !handle.done();
    }

    T value() const { return handle.promise().current_value; }
};

Generator<int> range(int start, int end) {
    for (int i = start; i < end; ++i) {
        co_yield i;
    }
}

int main() {
    auto gen = range(1, 6);
    while (gen.next()) {
        std::cout << gen.value() << " ";
    }
    std::cout << "\\n";
    return 0;
}`}),e.jsx(r,{children:"1 2 3 4 5"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Lazy Fibonacci Sequence"}),e.jsx(t,{title:"fibonacci.cpp",children:`#include <iostream>
#include <coroutine>

// Using the Generator template from above

template <typename T>
struct Generator { /* same as above */ };

Generator<long long> fibonacci() {
    long long a = 0, b = 1;
    while (true) {
        co_yield a;
        auto next = a + b;
        a = b;
        b = next;
    }
}

int main() {
    auto fib = fibonacci();
    for (int i = 0; i < 10 && fib.next(); ++i) {
        std::cout << fib.value() << " ";
    }
    std::cout << "\\n";
    return 0;
}`}),e.jsx(r,{children:"0 1 1 2 3 5 8 13 21 34"}),e.jsx(n,{type:"info",title:"The promise_type Contract",children:e.jsxs("p",{children:["Every coroutine return type must have a nested ",e.jsx("code",{children:"promise_type"})," that defines how the coroutine behaves: ",e.jsx("code",{children:"get_return_object()"})," creates the return object,",e.jsx("code",{children:"initial_suspend()"})," controls whether it starts lazily, ",e.jsx("code",{children:"yield_value()"}),"handles ",e.jsx("code",{children:"co_yield"}),", and ",e.jsx("code",{children:"final_suspend()"})," determines cleanup behavior."]})}),e.jsx(d,{title:"No standard generator until C++23",children:e.jsxs("p",{children:["C++20 provides only the coroutine primitives (",e.jsx("code",{children:"coroutine_handle"}),",",e.jsx("code",{children:"suspend_always"}),", etc.). A standard ",e.jsx("code",{children:"std::generator"})," was added in C++23. In C++20, you must write your own generator type or use a library."]})}),e.jsx(l,{compiler:"gcc",title:"GCC Coroutine Support",children:e.jsxs("p",{children:["GCC supports coroutines with ",e.jsx("code",{children:"-std=c++20 -fcoroutines"}),". The coroutine header is ",e.jsx("code",{children:"<coroutine>"}),". Earlier versions used the experimental header."]})}),e.jsx(o,{title:"Use generators for lazy sequences",children:e.jsx("p",{children:"Generators are ideal when you need to produce values on demand rather than computing an entire collection upfront. They save memory for large or infinite sequences, and computation only happens when the consumer requests the next value."})}),e.jsx(a,{title:"Filtered Generator",difficulty:"advanced",prompt:"Write a coroutine 'evenNumbers' that yields even numbers from 0 up to a given limit. Use the Generator template shown above.",hints:["Loop from 0 to the limit","Use co_yield only when the number is even","Test with a limit of 10 to get 0, 2, 4, 6, 8"],solution:e.jsx(t,{children:`// Assuming Generator<T> template defined as above

Generator<int> evenNumbers(int limit) {
    for (int i = 0; i <= limit; i += 2) {
        co_yield i;
    }
}

int main() {
    auto gen = evenNumbers(10);
    while (gen.next()) {
        std::cout << gen.value() << " ";
    }
    std::cout << "\\n";
    // Output: 0 2 4 6 8 10
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"Coroutines (C++20)",url:"https://en.cppreference.com/w/cpp/language/coroutines",description:"Coroutine language specification"},{type:"cppreference",title:"std::coroutine_handle",url:"https://en.cppreference.com/w/cpp/coroutine/coroutine_handle",description:"Handle to a suspended coroutine"},{type:"textbook",title:"C++20 - The Complete Guide",author:"Nicolai Josuttis",description:"Chapter 14: Coroutines"}]})]})}const B=Object.freeze(Object.defineProperty({__proto__:null,default:b},Symbol.toStringTag,{value:"Module"}));function _(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The three-way comparison operator ",e.jsx("code",{children:"<=>"}),", commonly called the",e.jsx("strong",{children:" spaceship operator"}),", was introduced in C++20. A single",e.jsx("code",{children:"operator<=>"})," definition can automatically generate all six comparison operators (",e.jsx("code",{children:"=="}),", ",e.jsx("code",{children:"!="}),", ",e.jsx("code",{children:"<"}),", ",e.jsx("code",{children:">"}),",",e.jsx("code",{children:"<="}),", ",e.jsx("code",{children:">="}),"), drastically reducing boilerplate."]}),e.jsx(s,{title:"Three-Way Comparison",children:e.jsxs("p",{children:["The expression ",e.jsx("code",{children:"a <=> b"})," returns an ordering value: negative if",e.jsx("code",{children:"a < b"}),", zero if ",e.jsx("code",{children:"a == b"}),", and positive if ",e.jsx("code",{children:"a > b"}),". The return type determines the kind of ordering: ",e.jsx("code",{children:"strong_ordering"}),",",e.jsx("code",{children:"weak_ordering"}),", or ",e.jsx("code",{children:"partial_ordering"}),"."]})}),e.jsxs(i,{title:"Ordering Categories",children:[e.jsxs("p",{children:["C++20 defines three ordering categories in ",e.jsx("code",{children:"<compare>"}),":"]}),e.jsx(t,{children:`#include <compare>

// strong_ordering:  equal values are indistinguishable
// weak_ordering:    equal values may differ in some way
// partial_ordering: some values may be incomparable (e.g., NaN)

auto result = a <=> b;
// result < 0   means a < b
// result == 0  means a == b
// result > 0   means a > b`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Auto-Generated Operators"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Defaulting ",e.jsx("code",{children:"operator<=>"})," performs memberwise comparison and automatically generates all six relational operators. Defaulting ",e.jsx("code",{children:"operator=="})," separately is needed for ",e.jsx("code",{children:"=="})," and ",e.jsx("code",{children:"!="}),"."]}),e.jsx(t,{title:"spaceship_basic.cpp",children:`#include <iostream>
#include <compare>
#include <string>

struct Version {
    int major;
    int minor;
    int patch;

    // Default: memberwise comparison in declaration order
    auto operator<=>(const Version&) const = default;
};

int main() {
    Version v1{2, 1, 0};
    Version v2{2, 3, 1};
    Version v3{2, 1, 0};

    std::cout << std::boolalpha;
    std::cout << "v1 < v2:  " << (v1 < v2) << "\\n";
    std::cout << "v1 == v3: " << (v1 == v3) << "\\n";
    std::cout << "v2 >= v1: " << (v2 >= v1) << "\\n";
    std::cout << "v1 != v2: " << (v1 != v2) << "\\n";

    auto cmp = v1 <=> v2;
    if (cmp < 0) std::cout << "v1 comes before v2\\n";
    return 0;
}`}),e.jsx(r,{children:`v1 < v2:  true
v1 == v3: true
v2 >= v1: true
v1 != v2: true
v1 comes before v2`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Custom Three-Way Comparison"}),e.jsx(t,{title:"custom_spaceship.cpp",children:`#include <iostream>
#include <compare>
#include <string>
#include <cmath>

// Case-insensitive string wrapper
struct CIString {
    std::string value;

    std::weak_ordering operator<=>(const CIString& other) const {
        auto toLower = [](char c) { return std::tolower(c); };
        auto it1 = value.begin(), it2 = other.value.begin();
        for (; it1 != value.end() && it2 != other.value.end(); ++it1, ++it2) {
            char c1 = toLower(*it1), c2 = toLower(*it2);
            if (c1 < c2) return std::weak_ordering::less;
            if (c1 > c2) return std::weak_ordering::greater;
        }
        if (value.size() < other.value.size()) return std::weak_ordering::less;
        if (value.size() > other.value.size()) return std::weak_ordering::greater;
        return std::weak_ordering::equivalent;
    }

    bool operator==(const CIString& other) const {
        return (*this <=> other) == 0;
    }
};

int main() {
    CIString a{"Hello"}, b{"hello"}, c{"World"};
    std::cout << std::boolalpha;
    std::cout << "Hello == hello: " << (a == b) << "\\n";
    std::cout << "Hello < World:  " << (a < c) << "\\n";
    return 0;
}`}),e.jsx(r,{children:`Hello == hello: true
Hello < World:  true`}),e.jsx(n,{type:"info",title:"strong vs weak vs partial ordering",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"strong_ordering"})," when equal values are truly identical (like integers). Use ",e.jsx("code",{children:"weak_ordering"})," when values can be equivalent but distinguishable (like case-insensitive strings). Use ",e.jsx("code",{children:"partial_ordering"})," when some values are incomparable (like floating-point numbers with NaN)."]})}),e.jsx(n,{type:"tip",title:"Separate operator== for efficiency",children:e.jsxs("p",{children:["When you default ",e.jsx("code",{children:"operator<=>"}),", the compiler generates ",e.jsx("code",{children:"=="}),"using ",e.jsx("code",{children:"<=>"}),". For types like ",e.jsx("code",{children:"std::string"})," where equality can be checked faster (e.g., comparing lengths first), defaulting ",e.jsx("code",{children:"operator=="}),"separately allows the compiler to use the more efficient memberwise equality check."]})}),e.jsx(l,{compiler:"all",title:"Requires C++20",children:e.jsxs("p",{children:["The spaceship operator requires ",e.jsx("code",{children:"-std=c++20"})," (GCC/Clang) or",e.jsx("code",{children:"/std:c++20"})," (MSVC). Include ",e.jsx("code",{children:"<compare>"})," for the ordering types."]})}),e.jsx(o,{title:"Default operator<=> when possible",children:e.jsxs("p",{children:["For value types with straightforward comparison semantics, use ",e.jsx("code",{children:"auto operator<=>(const T&) const = default;"}),". This generates correct, efficient comparison operators with minimal code and no risk of inconsistencies between operators."]})}),e.jsx(a,{title:"Comparable Point Class",difficulty:"intermediate",prompt:"Create a Point3D class with x, y, z coordinates. Use the defaulted spaceship operator for comparison. Demonstrate sorting a vector of points.",hints:["Default operator<=> compares members in declaration order","Include <algorithm> for std::sort","Points will sort by x first, then y, then z"],solution:e.jsx(t,{children:`#include <iostream>
#include <compare>
#include <vector>
#include <algorithm>

struct Point3D {
    double x, y, z;
    auto operator<=>(const Point3D&) const = default;
};

int main() {
    std::vector<Point3D> points = {
        {3, 1, 0}, {1, 2, 3}, {1, 2, 1}, {2, 0, 0}
    };
    std::sort(points.begin(), points.end());
    for (const auto& p : points) {
        std::cout << "(" << p.x << "," << p.y << "," << p.z << ")\\n";
    }
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"Three-way comparison",url:"https://en.cppreference.com/w/cpp/language/operator_comparison#Three-way_comparison",description:"Spaceship operator specification"},{type:"cppreference",title:"std::strong_ordering",url:"https://en.cppreference.com/w/cpp/utility/compare/strong_ordering",description:"Strong ordering type"},{type:"textbook",title:"C++20 - The Complete Guide",author:"Nicolai Josuttis",description:"Chapter 5: operator<=>"}]})]})}const O=Object.freeze(Object.defineProperty({__proto__:null,default:_},Symbol.toStringTag,{value:"Module"}));function w(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"std::expected<T, E>"}),", introduced in C++23, provides a way to return either a success value of type ",e.jsx("code",{children:"T"})," or an error value of type ",e.jsx("code",{children:"E"}),"from a function. It offers a type-safe, composable alternative to exceptions and error codes, with monadic operations for clean error-handling chains."]}),e.jsx(s,{title:"std::expected",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::expected<T, E>"})," is a vocabulary type that holds either a value of type ",e.jsx("code",{children:"T"})," (the expected outcome) or an error of type ",e.jsx("code",{children:"E"})," (the unexpected outcome). It is similar to ",e.jsx("code",{children:"std::variant<T, E>"})," but with clearer semantics and monadic operations for chaining computations."]})}),e.jsxs(i,{title:"Basic expected Usage",children:[e.jsxs("p",{children:["Return a value directly for success, or wrap the error in ",e.jsx("code",{children:"std::unexpected"}),"."]}),e.jsx(t,{children:`#include <expected>
std::expected<T, E> success_case = value;
std::expected<T, E> error_case = std::unexpected(error_value);`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Replacing Exceptions with expected"}),e.jsx(t,{title:"expected_basic.cpp",children:`#include <iostream>
#include <expected>
#include <string>
#include <charconv>

enum class ParseError { Empty, InvalidFormat, OutOfRange };

std::expected<int, ParseError> parseInt(std::string_view s) {
    if (s.empty())
        return std::unexpected(ParseError::Empty);

    int result;
    auto [ptr, ec] = std::from_chars(s.data(), s.data() + s.size(), result);
    if (ec == std::errc::result_out_of_range)
        return std::unexpected(ParseError::OutOfRange);
    if (ec != std::errc{} || ptr != s.data() + s.size())
        return std::unexpected(ParseError::InvalidFormat);
    return result;
}

std::string errorToString(ParseError e) {
    switch (e) {
        case ParseError::Empty: return "empty input";
        case ParseError::InvalidFormat: return "invalid format";
        case ParseError::OutOfRange: return "out of range";
    }
    return "unknown";
}

int main() {
    for (auto input : {"42", "abc", "", "99999999999999"}) {
        auto result = parseInt(input);
        if (result) {
            std::cout << "\\"" << input << "\\" -> " << *result << "\\n";
        } else {
            std::cout << "\\"" << input << "\\" -> error: "
                      << errorToString(result.error()) << "\\n";
        }
    }
    return 0;
}`}),e.jsx(r,{children:`"42" -> 42
"abc" -> error: invalid format
"" -> error: empty input
"99999999999999" -> error: out of range`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Monadic Operations"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++23 provides monadic operations on ",e.jsx("code",{children:"expected"})," that allow chaining computations without manually checking for errors at each step: ",e.jsx("code",{children:"and_then"}),",",e.jsx("code",{children:"transform"}),", and ",e.jsx("code",{children:"or_else"}),"."]}),e.jsx(t,{title:"monadic.cpp",children:`#include <iostream>
#include <expected>
#include <string>

using Result = std::expected<int, std::string>;

Result parse(std::string_view s) {
    try { return std::stoi(std::string(s)); }
    catch (...) { return std::unexpected("parse failed"); }
}

Result doubleIt(int x) {
    if (x > 1000) return std::unexpected("too large");
    return x * 2;
}

int main() {
    auto result = parse("21")
        .and_then(doubleIt)           // chain: parse -> doubleIt
        .transform([](int x) {        // map the success value
            return x + 1;
        })
        .or_else([](const std::string& err) -> Result {
            std::cout << "Recovered from: " << err << "\\n";
            return 0;  // provide fallback
        });

    std::cout << "Result: " << *result << "\\n";

    // Error case: pipeline short-circuits
    auto err = parse("abc")
        .and_then(doubleIt)
        .transform([](int x) { return x + 1; });

    if (!err) std::cout << "Error: " << err.error() << "\\n";
    return 0;
}`}),e.jsx(r,{children:`Result: 43
Error: parse failed`}),e.jsx(n,{type:"info",title:"and_then vs transform",children:e.jsxs("p",{children:[e.jsx("code",{children:"and_then(f)"})," takes a function that returns ",e.jsx("code",{children:"expected<U, E>"}),"and chains it (flatMap). ",e.jsx("code",{children:"transform(f)"})," takes a function that returns a plain value ",e.jsx("code",{children:"U"})," and wraps it in ",e.jsx("code",{children:"expected"})," (map). Use ",e.jsx("code",{children:"and_then"}),"for operations that can fail, and ",e.jsx("code",{children:"transform"})," for infallible transformations."]})}),e.jsx(n,{type:"tip",title:"expected vs exceptions",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"expected"})," for expected, recoverable failures (parsing, file I/O, network). Use exceptions for truly exceptional conditions (out of memory, logic errors). The key advantage of ",e.jsx("code",{children:"expected"})," is that error handling is visible in the type signature and cannot be accidentally ignored."]})}),e.jsx(l,{compiler:"gcc",title:"GCC 12+ required",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::expected"})," is available in GCC 12+ and Clang 16+ with ",e.jsx("code",{children:"-std=c++23"}),". Monadic operations require GCC 13+ and Clang 17+."]})}),e.jsx(d,{title:"Do not ignore the error",children:e.jsxs("p",{children:["Unlike exceptions, ",e.jsx("code",{children:"expected"})," does not force you to handle errors. Dereferencing an ",e.jsx("code",{children:"expected"})," that contains an error is undefined behavior. Always check",e.jsx("code",{children:"has_value()"})," or use the monadic operations."]})}),e.jsx(o,{title:"Use expected for recoverable errors in APIs",children:e.jsxs("p",{children:["For library APIs and performance-critical code paths, ",e.jsx("code",{children:"std::expected"})," provides zero-overhead error handling without the stack unwinding cost of exceptions. Combine it with monadic operations for clean, readable error-handling pipelines."]})}),e.jsx(a,{title:"File Reading Pipeline",difficulty:"advanced",prompt:"Write a pipeline using expected that: (1) validates a filename is not empty, (2) checks the extension is '.txt', (3) returns the filename in uppercase. Use and_then and transform.",hints:["Each validation step returns expected<string, string>","Use and_then for steps that can fail","Use transform for the final uppercase conversion"],solution:e.jsx(t,{children:`#include <iostream>
#include <expected>
#include <string>
#include <algorithm>

using Result = std::expected<std::string, std::string>;

Result validateNotEmpty(std::string filename) {
    if (filename.empty())
        return std::unexpected("filename is empty");
    return filename;
}

Result validateExtension(std::string filename) {
    if (filename.size() < 4 ||
        filename.substr(filename.size() - 4) != ".txt")
        return std::unexpected("not a .txt file");
    return filename;
}

int main() {
    auto process = [](std::string name) {
        return validateNotEmpty(name)
            .and_then(validateExtension)
            .transform([](std::string s) {
                std::transform(s.begin(), s.end(), s.begin(), ::toupper);
                return s;
            });
    };

    auto r1 = process("report.txt");
    if (r1) std::cout << "OK: " << *r1 << "\\n";

    auto r2 = process("image.png");
    if (!r2) std::cout << "Error: " << r2.error() << "\\n";
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"std::expected",url:"https://en.cppreference.com/w/cpp/utility/expected",description:"Expected value or error (C++23)"},{type:"cppreference",title:"std::unexpected",url:"https://en.cppreference.com/w/cpp/utility/expected/unexpected",description:"Wrapper for unexpected error values"},{type:"textbook",title:"C++ Software Design",author:"Klaus Iglberger",description:"Chapter on modern error handling patterns"}]})]})}const q=Object.freeze(Object.defineProperty({__proto__:null,default:w},Symbol.toStringTag,{value:"Module"}));function k(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++23 introduces ",e.jsx("strong",{children:"explicit object parameters"}),", also known as",e.jsx("em",{children:" deducing this"}),". This feature allows a member function to take the object it is called on as an explicit first parameter, enabling powerful patterns like deduplication of const/non-const overloads, CRTP replacement, and recursive lambdas."]}),e.jsx(s,{title:"Deducing this",children:e.jsxs("p",{children:["An explicit object parameter is declared using ",e.jsx("code",{children:"this auto&& self"})," as the first parameter of a member function. The type of ",e.jsx("code",{children:"self"})," is deduced from the calling expression, capturing whether the object is an lvalue, rvalue, const, or derived type."]})}),e.jsxs(i,{title:"Explicit Object Parameter Syntax",children:[e.jsxs("p",{children:["The keyword ",e.jsx("code",{children:"this"})," before the parameter name marks it as the explicit object parameter. The function cannot be ",e.jsx("code",{children:"static"})," and cannot have",e.jsx("code",{children:"const"}),"/",e.jsx("code",{children:"volatile"})," qualifiers since those are deduced."]}),e.jsx(t,{children:`struct S {
    // Traditional: separate const and non-const overloads
    int& value();
    const int& value() const;

    // With deducing this: single function handles both
    template <typename Self>
    auto&& value(this Self&& self) {
        return std::forward<Self>(self).val_;
    }
};`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Deduplicating const Overloads"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"One of the most common use cases is eliminating the need for separate const and non-const member function overloads that have identical logic."}),e.jsx(t,{title:"dedup_const.cpp",children:`#include <iostream>
#include <string>
#include <vector>

class TextBuffer {
    std::vector<std::string> lines_;
public:
    TextBuffer(std::initializer_list<std::string> init) : lines_(init) {}

    // Single function handles const and non-const
    template <typename Self>
    auto&& getLine(this Self&& self, size_t index) {
        return std::forward<Self>(self).lines_[index];
    }
};

int main() {
    TextBuffer buf{"Hello", "World"};
    buf.getLine(0) = "Hi";  // non-const: returns string&
    std::cout << buf.getLine(0) << "\\n";

    const TextBuffer& cbuf = buf;
    std::cout << cbuf.getLine(1) << "\\n";  // const: returns const string&
    // cbuf.getLine(1) = "test";  // ERROR: returns const reference
    return 0;
}`}),e.jsx(r,{children:`Hi
World`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"CRTP Replacement"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Deducing this can replace the Curiously Recurring Template Pattern (CRTP) for mixins. Instead of passing the derived type as a template argument, the base class deduces it from the explicit object parameter."}),e.jsx(t,{title:"crtp_replacement.cpp",children:`#include <iostream>
#include <string>

// Traditional CRTP requires: class Derived : public Printable<Derived>
// With deducing this, no template parameter needed:

struct Printable {
    template <typename Self>
    void print(this const Self& self) {
        std::cout << self.toString() << "\\n";
    }
};

struct Point : Printable {
    double x, y;
    Point(double x, double y) : x(x), y(y) {}
    std::string toString() const {
        return "(" + std::to_string(x) + ", " + std::to_string(y) + ")";
    }
};

struct Color : Printable {
    std::string name;
    Color(std::string n) : name(std::move(n)) {}
    std::string toString() const { return "Color: " + name; }
};

int main() {
    Point p{3.0, 4.0};
    Color c{"red"};
    p.print();  // deduces Self = Point
    c.print();  // deduces Self = Color
    return 0;
}`}),e.jsx(r,{children:`(3.000000, 4.000000)
Color: red`}),e.jsx(n,{type:"info",title:"Recursive Lambdas",children:e.jsxs("p",{children:["Deducing this enables lambdas that can call themselves without needing",e.jsx("code",{children:"std::function"})," or a Y-combinator. The lambda receives itself as the first argument: ",e.jsxs("code",{children:["[](this auto self, int n) -> int ","{"," return n <= 1 ? 1 : n * self(n - 1); ","}"]}),"."]})}),e.jsx(n,{type:"tip",title:"Move-aware member functions",children:e.jsxs("p",{children:["With deducing this, you can write a single getter that returns by move when called on an rvalue: ",e.jsx("code",{children:"auto&& get(this Self&& self)"})," will move the member out when called on a temporary, avoiding unnecessary copies."]})}),e.jsx(l,{compiler:"all",title:"Compiler support",children:e.jsxs("p",{children:["Deducing this requires C++23. It is supported in GCC 14+, Clang 18+, and MSVC 19.37+. Compile with ",e.jsx("code",{children:"-std=c++23"})," or ",e.jsx("code",{children:"/std:c++latest"}),"."]})}),e.jsx(d,{title:"Cannot mix with trailing qualifiers",children:e.jsxs("p",{children:["A function with an explicit object parameter cannot use ",e.jsx("code",{children:"const"}),",",e.jsx("code",{children:"volatile"}),", ",e.jsx("code",{children:"&"}),", or ",e.jsx("code",{children:"&&"})," qualifiers. The value category and constness are deduced through the parameter type instead."]})}),e.jsx(o,{title:"Use deducing this to reduce boilerplate",children:e.jsx("p",{children:"Deducing this is most valuable when you have multiple const/non-const or lvalue/rvalue overloads with identical logic. It also simplifies mixin patterns by removing the need for CRTP. Start using it in new code to keep member function sets small and maintainable."})}),e.jsx(a,{title:"Recursive Lambda with Deducing This",difficulty:"advanced",prompt:"Write a recursive lambda using deducing this that computes the nth Fibonacci number. Call it for n=10 and print the result.",hints:["The lambda takes (this auto self, int n) as parameters","Base case: n <= 1 returns n","Recursive case: self(n-1) + self(n-2)"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    auto fib = [](this auto self, int n) -> int {
        if (n <= 1) return n;
        return self(n - 1) + self(n - 2);
    };

    for (int i = 0; i <= 10; ++i) {
        std::cout << "fib(" << i << ") = " << fib(i) << "\\n";
    }
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"Deducing this",url:"https://en.cppreference.com/w/cpp/language/member_functions#Explicit_object_parameter",description:"Explicit object parameter (C++23)"},{type:"cppreference",title:"P0847R7",url:"https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0847r7.html",description:"Deducing this proposal paper"},{type:"textbook",title:"C++ Reference Documentation",author:"cppreference.com",description:"Member function declarations with explicit object parameter"}]})]})}const E=Object.freeze(Object.defineProperty({__proto__:null,default:k},Symbol.toStringTag,{value:"Module"}));function C(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++23 introduces ",e.jsx("code",{children:"std::print"})," and ",e.jsx("code",{children:"std::println"}),", bringing Python-style formatted output to the standard library. Built on the ",e.jsx("code",{children:"std::format"}),"foundation from C++20, these functions combine the type safety of streams with the convenience of ",e.jsx("code",{children:"printf"}),"-style formatting."]}),e.jsx(s,{title:"std::print and std::println",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::print"})," writes formatted text to standard output (or a specified stream).",e.jsx("code",{children:"std::println"})," does the same but appends a newline. Both use the same format string syntax as ",e.jsx("code",{children:"std::format"}),", with compile-time format string validation."]})}),e.jsxs(i,{title:"Format String Syntax",children:[e.jsx("p",{children:"Replacement fields use curly braces. Positional arguments, fill, alignment, width, precision, and type specifiers are all supported."}),e.jsx(t,{children:`#include <print>
std::println("Hello, {}!", name);           // basic
std::println("{0} + {0} = {1}", x, x + x);  // positional
std::println("{:>10}", "right");             // right-aligned
std::println("{:.2f}", 3.14159);             // precision`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic Usage"}),e.jsx(t,{title:"print_basic.cpp",children:`#include <print>
#include <string>
#include <vector>

int main() {
    // Simple printing
    std::println("Hello, World!");

    // Variable substitution
    std::string name = "C++23";
    int version = 23;
    std::println("Welcome to {} (version {})", name, version);

    // Numbers with formatting
    double pi = 3.14159265358979;
    std::println("Pi = {:.4f}", pi);
    std::println("Hex: {:#x}, Oct: {:#o}, Bin: {:#b}", 255, 255, 255);

    // std::print without newline
    std::print("Loading");
    for (int i = 0; i < 3; ++i) std::print(".");
    std::println(" done!");

    return 0;
}`}),e.jsx(r,{children:`Hello, World!
Welcome to C++23 (version 23)
Pi = 3.1416
Hex: 0xff, Oct: 0377, Bin: 0b11111111
Loading... done!`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Comparison with cout and printf"}),e.jsx(t,{title:"comparison.cpp",children:`#include <print>
#include <iostream>
#include <cstdio>
#include <string>

int main() {
    std::string item = "Widget";
    int count = 42;
    double price = 9.99;

    // printf: fast but not type-safe, no std::string support
    std::printf("%-10s x%d = $%.2f\\n", item.c_str(), count, price);

    // cout: type-safe but verbose
    std::cout << std::left << std::setw(10) << item
              << " x" << count << " = $"
              << std::fixed << std::setprecision(2) << price << "\\n";

    // std::println: type-safe, concise, and fast
    std::println("{:<10} x{} = \${:.2f}", item, count, price);

    return 0;
}`}),e.jsx(r,{children:`Widget     x42 = $9.99
Widget     x42 = $9.99
Widget     x42 = $9.99`}),e.jsx(n,{type:"info",title:"Compile-time format checking",children:e.jsxs("p",{children:["Format strings in ",e.jsx("code",{children:"std::print"})," and ",e.jsx("code",{children:"std::println"})," are validated at compile time. If the format string has mismatched braces, wrong argument indices, or incompatible format specifiers, you get a clear compile error rather than a runtime crash or silent corruption, unlike ",e.jsx("code",{children:"printf"}),"."]})}),e.jsx(n,{type:"history",title:"Evolution of C++ output",children:e.jsxs("p",{children:["C++ output has evolved through three eras: C-inherited ",e.jsx("code",{children:"printf"})," (fast, unsafe), C++98 ",e.jsx("code",{children:"iostream"})," (safe, verbose), and now C++23 ",e.jsx("code",{children:"std::print"})," (fast, safe, concise). The ",e.jsx("code",{children:"std::format"})," library in C++20 laid the groundwork by providing the formatting engine."]})}),e.jsx(n,{type:"tip",title:"Formatting alignment and fill",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"<"})," for left-align, ",e.jsx("code",{children:">"})," for right-align, and",e.jsx("code",{children:"^"})," for center. Any character can be the fill:",e.jsxs("code",{children:["{",":*^20","}"]})," centers within 20 characters filled with asterisks."]})}),e.jsx(l,{compiler:"gcc",title:"GCC support",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::print"})," is available in GCC 14+ with ",e.jsx("code",{children:"-std=c++23"}),". Earlier versions support ",e.jsx("code",{children:"std::format"})," (C++20) which can be used with",e.jsx("code",{children:"std::cout << std::format(...)"})," as a workaround."]})}),e.jsx(d,{title:"Format string must be a compile-time constant",children:e.jsxs("p",{children:["The format string passed to ",e.jsx("code",{children:"std::print"})," must be a compile-time constant expression. You cannot pass a runtime string variable as the format string. Use",e.jsx("code",{children:"std::vformat"})," and ",e.jsx("code",{children:"std::vprint_unicode"})," for runtime format strings."]})}),e.jsx(o,{title:"Use std::println for new code",children:e.jsxs("p",{children:["For new C++23 projects, prefer ",e.jsx("code",{children:"std::println"})," over ",e.jsx("code",{children:"std::cout"})," and",e.jsx("code",{children:"printf"}),". It combines the best aspects of both: type safety, concise syntax, good performance, and compile-time validation. The format string syntax is also compatible with Python and Rust, making it familiar to polyglot programmers."]})}),e.jsx(a,{title:"Formatted Table",difficulty:"beginner",prompt:"Use std::println to print a formatted table of student names and their scores, right-aligning the scores in a column of width 6.",hints:["Use {:<15} for left-aligned names with width 15","Use {:>6} for right-aligned scores with width 6","Print a header row and a separator line"],solution:e.jsx(t,{children:`#include <print>
#include <string>
#include <vector>
#include <utility>

int main() {
    std::vector<std::pair<std::string, int>> students = {
        {"Alice", 95}, {"Bob", 87}, {"Carol", 100}, {"Dave", 72}
    };

    std::println("{:<15} {:>6}", "Name", "Score");
    std::println("{:-<15} {:->6}", "", "");
    for (const auto& [name, score] : students) {
        std::println("{:<15} {:>6}", name, score);
    }
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"std::print",url:"https://en.cppreference.com/w/cpp/io/print",description:"Formatted output to stdout (C++23)"},{type:"cppreference",title:"std::format",url:"https://en.cppreference.com/w/cpp/utility/format/format",description:"Format string library (C++20)"},{type:"cppreference",title:"Format specification",url:"https://en.cppreference.com/w/cpp/utility/format/spec",description:"Standard format specification mini-language"}]})]})}const F=Object.freeze(Object.defineProperty({__proto__:null,default:C},Symbol.toStringTag,{value:"Module"}));export{z as a,A as b,P as c,M as d,U as e,D as f,R as g,W as h,I as i,B as j,O as k,q as l,E as m,F as n,N as s};
