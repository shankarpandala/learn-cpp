import{j as e}from"./vendor-BlNF5je7.js";import{D as r,S as n,C as t,O as s,N as a,B as i,a as d,E as l,R as o,W as c}from"./subject-01-fundamentals-DsAKErwb.js";function p(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Function templates allow you to write a single function definition that works with any data type. Instead of writing separate overloads for ",e.jsx("code",{children:"int"}),", ",e.jsx("code",{children:"double"}),", and ",e.jsx("code",{children:"std::string"}),", you write one template and let the compiler generate the specialized versions for you."]}),e.jsx(r,{title:"Function Template",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"function template"})," is a blueprint for creating functions. The compiler uses the template to generate concrete functions (called ",e.jsx("strong",{children:"template instantiations"}),") for each set of type arguments the template is used with."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Defining a Function Template"}),e.jsxs(n,{title:"template<typename T>",children:[e.jsxs("p",{children:["The ",e.jsx("code",{children:"template"})," keyword followed by angle brackets containing one or more ",e.jsx("strong",{children:"template parameters"})," introduces a template. ",e.jsx("code",{children:"typename"})," (or equivalently ",e.jsx("code",{children:"class"}),") declares a type parameter."]}),e.jsx(t,{children:`template<typename T>
T maxValue(T a, T b) {
    return (a > b) ? a : b;
}`})]}),e.jsx(t,{title:"Using a function template",children:`#include <iostream>
#include <string>

template<typename T>
T maxValue(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    std::cout << maxValue(3, 7) << std::endl;
    std::cout << maxValue(3.14, 2.72) << std::endl;
    std::cout << maxValue(std::string("apple"), std::string("banana")) << std::endl;
    return 0;
}`}),e.jsx(s,{children:`7
3.14
banana`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Type Deduction"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["When you call a function template, the compiler can usually ",e.jsx("strong",{children:"deduce"})," the template arguments from the function arguments. You can also specify them explicitly."]}),e.jsx(t,{title:"Implicit vs explicit instantiation",children:`#include <iostream>

template<typename T>
T square(T x) {
    return x * x;
}

int main() {
    // Implicit deduction: T = int
    std::cout << square(5) << std::endl;

    // Explicit specification: T = double
    std::cout << square<double>(5) << std::endl;

    // Explicit needed when types differ from arguments
    std::cout << square<long long>(100000) << std::endl;
    return 0;
}`}),e.jsx(s,{children:`25
25
10000000000`}),e.jsx(a,{type:"info",title:"typename vs class",children:e.jsxs("p",{children:["In template parameter lists, ",e.jsx("code",{children:"typename"})," and ",e.jsx("code",{children:"class"})," are interchangeable. Modern C++ style prefers ",e.jsx("code",{children:"typename"})," because the parameter need not be a class type -- it can be any type including ",e.jsx("code",{children:"int"})," or ",e.jsx("code",{children:"double"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Multiple Template Parameters"}),e.jsx(t,{title:"Two type parameters",children:`#include <iostream>

template<typename T, typename U>
auto add(T a, U b) -> decltype(a + b) {
    return a + b;
}

int main() {
    std::cout << add(3, 4.5) << std::endl;    // int + double -> double
    std::cout << add(1.5f, 2) << std::endl;    // float + int -> float
    return 0;
}`}),e.jsx(s,{children:`7.5
3.5`}),e.jsx(i,{title:"Keep templates in header files",children:e.jsxs("p",{children:["Because the compiler needs to see the full template definition at the point of instantiation, function templates should be defined in header files, not in ",e.jsx("code",{children:".cpp"})," files. This is different from ordinary functions, which are typically declared in headers and defined in source files."]})}),e.jsx(d,{compiler:"all",title:"Template Instantiation Errors",children:e.jsxs("p",{children:["Template code is only checked for basic syntax when defined. Type-related errors appear only when the template is ",e.jsx("strong",{children:"instantiated"})," with a specific type. Error messages from template instantiation failures can be lengthy -- read from the bottom up for the root cause."]})}),e.jsx(a,{type:"history",title:"Origins of Templates",children:e.jsx("p",{children:"Templates were introduced to C++ in 1990 and standardized in C++98. They form the foundation of the Standard Template Library (STL), which provides generic containers and algorithms."})}),e.jsx(l,{title:"Write a Generic Swap",difficulty:"beginner",prompt:"Write a function template called mySwap that takes two references of the same type and swaps their values. Test it with int and std::string.",hints:["Use T& (reference) parameters so the original values are modified","You need a temporary variable of type T to perform the swap"],solution:e.jsx(t,{children:`#include <iostream>
#include <string>

template<typename T>
void mySwap(T& a, T& b) {
    T temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 10, y = 20;
    mySwap(x, y);
    std::cout << x << " " << y << std::endl;

    std::string s1 = "hello", s2 = "world";
    mySwap(s1, s2);
    std::cout << s1 << " " << s2 << std::endl;
    return 0;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"Function templates",url:"https://en.cppreference.com/w/cpp/language/function_template",description:"Complete reference for function template syntax and rules"},{type:"cppreference",title:"Template parameters",url:"https://en.cppreference.com/w/cpp/language/template_parameters",description:"Template parameter types and syntax"},{type:"textbook",title:"C++ Templates: The Complete Guide",author:"David Vandevoorde, Nicolai Josuttis, Douglas Gregor",description:"Chapter 1: Function Templates"}]})]})}const C=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"}));function u(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Template argument deduction is the process by which the compiler determines the template arguments from the types of function arguments. Understanding deduction rules is essential for writing templates that behave as expected, especially when references, const qualifiers, and forwarding are involved."}),e.jsx(r,{title:"Template Argument Deduction",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Template argument deduction"})," is the compiler's ability to infer template type parameters from the arguments passed to a function template, eliminating the need to explicitly specify them at the call site."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic Deduction Rules"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["When a function parameter has type ",e.jsx("code",{children:"T"}),", ",e.jsx("code",{children:"T&"}),", or ",e.jsx("code",{children:"const T&"}),", the compiler deduces ",e.jsx("code",{children:"T"})," differently depending on the form."]}),e.jsx(t,{title:"Deduction with value, reference, and const reference",children:`#include <iostream>
#include <typeinfo>

template<typename T> void byValue(T param) {
    std::cout << "byValue: " << typeid(T).name() << std::endl;
}

template<typename T> void byRef(T& param) {
    std::cout << "byRef: " << typeid(T).name() << std::endl;
}

template<typename T> void byConstRef(const T& param) {
    std::cout << "byConstRef: " << typeid(T).name() << std::endl;
}

int main() {
    int x = 42;
    const int cx = 42;

    byValue(x);       // T = int (const/ref stripped)
    byValue(cx);      // T = int (const stripped)
    byRef(x);         // T = int
    byRef(cx);        // T = const int
    byConstRef(x);    // T = int
    byConstRef(cx);   // T = int (const already in parameter)
    return 0;
}`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"auto and decltype"}),e.jsxs(n,{title:"auto Type Deduction",children:[e.jsxs("p",{children:["The ",e.jsx("code",{children:"auto"})," keyword uses the same deduction rules as template argument deduction. It deduces the type of a variable from its initializer."]}),e.jsx(t,{children:`auto x = 42;          // int
auto y = 3.14;        // double
const auto& z = x;    // const int&
auto* p = &x;         // int*`})]}),e.jsxs(n,{title:"decltype",children:[e.jsxs("p",{children:[e.jsx("code",{children:"decltype"})," inspects the declared type of an expression without evaluating it. Unlike ",e.jsx("code",{children:"auto"}),", it preserves references and const qualifiers exactly."]}),e.jsx(t,{children:`int x = 42;
decltype(x) a = x;       // int (named variable -> declared type)
decltype((x)) b = x;     // int& (parenthesized lvalue -> lvalue ref)
decltype(42) c = 42;     // int (prvalue -> type)`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Trailing Return Types"}),e.jsx(t,{title:"Trailing return type with decltype",children:`#include <iostream>

template<typename T, typename U>
auto multiply(T a, U b) -> decltype(a * b) {
    return a * b;
}

// C++14: auto return type deduction (no trailing type needed)
template<typename T, typename U>
auto divide(T a, U b) {
    return a / b;
}

int main() {
    std::cout << multiply(3, 4.5) << std::endl;   // 13.5
    std::cout << divide(10, 3) << std::endl;       // 3
    std::cout << divide(10.0, 3) << std::endl;     // 3.33333
    return 0;
}`}),e.jsx(s,{children:`13.5
3
3.33333`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"decltype(auto)"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++14 introduced ",e.jsx("code",{children:"decltype(auto)"}),", which deduces a type using ",e.jsx("code",{children:"decltype"})," rules rather than ",e.jsx("code",{children:"auto"})," rules. This is critical when you need to preserve reference-ness."]}),e.jsx(t,{title:"decltype(auto) preserving references",children:`#include <iostream>
#include <vector>

std::vector<int> vec = {1, 2, 3};

// auto return: returns by value (copy)
auto getByAuto(size_t i) {
    return vec[i];
}

// decltype(auto) return: returns int& (reference)
decltype(auto) getByDecltype(size_t i) {
    return vec[i];
}

int main() {
    getByDecltype(0) = 99;  // modifies vec[0]
    std::cout << vec[0] << std::endl;  // 99
    return 0;
}`}),e.jsx(s,{children:"99"}),e.jsx(c,{title:"decltype(auto) pitfall",children:e.jsxs("p",{children:["Be careful with parentheses when using ",e.jsx("code",{children:"decltype(auto)"}),". Adding extra parentheses changes the deduced type: ",e.jsxs("code",{children:["decltype(auto) f() ","{"," return x; ","}"]})," returns by value, but ",e.jsxs("code",{children:["decltype(auto) f() ","{"," return (x); ","}"]})," returns a reference, which can create dangling references if ",e.jsx("code",{children:"x"})," is a local variable."]})}),e.jsx(i,{title:"Use auto for simplicity, decltype(auto) for precision",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"auto"})," return types for most functions where you want the natural value type. Reserve ",e.jsx("code",{children:"decltype(auto)"})," for generic forwarding functions where preserving the exact type (including references) matters, such as in wrapper or proxy functions."]})}),e.jsx(a,{type:"tip",title:"Deduction guides in C++17",children:e.jsxs("p",{children:["C++17 added class template argument deduction (CTAD), allowing the compiler to deduce class template parameters from constructor arguments. For example, ",e.jsx("code",{children:"std::pair p(1, 2.0);"})," deduces to ",e.jsx("code",{children:"std::pair<int, double>"}),"."]})}),e.jsx(l,{title:"Return Type Deduction",difficulty:"intermediate",prompt:"Write a function template called safeDiv that takes two parameters of potentially different types and returns the result of dividing them. Use a trailing return type to ensure the correct return type. Handle division by zero by returning 0.",hints:["Use template<typename T, typename U> with a trailing return type","The trailing return type should be -> decltype(a / b)","Check if b == 0 before dividing"],solution:e.jsx(t,{children:`#include <iostream>

template<typename T, typename U>
auto safeDiv(T a, U b) -> decltype(a / b) {
    if (b == 0) return 0;
    return a / b;
}

int main() {
    std::cout << safeDiv(10, 3) << std::endl;
    std::cout << safeDiv(10.0, 3.0) << std::endl;
    std::cout << safeDiv(5, 0) << std::endl;
    return 0;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"Template argument deduction",url:"https://en.cppreference.com/w/cpp/language/template_argument_deduction",description:"Complete deduction rules"},{type:"cppreference",title:"decltype specifier",url:"https://en.cppreference.com/w/cpp/language/decltype",description:"decltype semantics and examples"},{type:"cppreference",title:"auto specifier",url:"https://en.cppreference.com/w/cpp/language/auto",description:"auto type deduction rules"}]})]})}const k=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"}));function m(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Sometimes a generic template does not produce the correct or optimal behavior for a particular type. Template specialization lets you provide a custom implementation for specific type arguments while keeping the generic version for everything else."}),e.jsx(r,{title:"Template Specialization",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Template specialization"})," is the mechanism of providing a specific implementation of a template for a particular set of template arguments. ",e.jsx("strong",{children:"Full specialization"})," fixes all parameters; ",e.jsx("strong",{children:"partial specialization"})," fixes some parameters (available only for class templates)."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Full Specialization"}),e.jsxs(n,{title:"Specializing a function template",children:[e.jsxs("p",{children:["To fully specialize a function template, write ",e.jsx("code",{children:"template<>"})," (empty angle brackets) followed by the function with concrete types."]}),e.jsx(t,{children:`template<>
return_type functionName<SpecificType>(SpecificType param) {
    // specialized implementation
}`})]}),e.jsx(t,{title:"Full specialization example",children:`#include <iostream>
#include <cstring>

template<typename T>
bool isEqual(T a, T b) {
    return a == b;
}

// Full specialization for C-style strings
template<>
bool isEqual<const char*>(const char* a, const char* b) {
    return std::strcmp(a, b) == 0;
}

int main() {
    std::cout << std::boolalpha;
    std::cout << isEqual(3, 3) << std::endl;
    std::cout << isEqual(3.14, 2.72) << std::endl;

    const char* s1 = "hello";
    const char* s2 = "hello";
    // Without specialization, this would compare pointers, not content
    std::cout << isEqual(s1, s2) << std::endl;
    return 0;
}`}),e.jsx(s,{children:`true
false
true`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Overloading vs Specialization"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"For function templates, you can achieve similar results with overloading instead of specialization. Overloading is generally preferred because overload resolution is simpler and more predictable than the specialization selection rules."}),e.jsx(t,{title:"Overloading instead of specialization",children:`#include <iostream>
#include <cstring>

template<typename T>
bool isEqual(T a, T b) {
    return a == b;
}

// Overload (not specialization) for const char*
bool isEqual(const char* a, const char* b) {
    return std::strcmp(a, b) == 0;
}

int main() {
    std::cout << std::boolalpha;
    std::cout << isEqual(42, 42) << std::endl;
    std::cout << isEqual("cat", "cat") << std::endl;
    return 0;
}`}),e.jsx(s,{children:`true
true`}),e.jsx(c,{title:"Specialization ordering pitfall",children:e.jsx("p",{children:"Function template specializations do not participate in overload resolution. The compiler first selects the best base template via overloading, then checks if that template has a matching specialization. This can lead to surprising results when multiple base templates exist. Prefer overloading for function templates."})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Partial Specialization (Class Templates)"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Partial specialization is only available for class templates. It allows you to specialize for a pattern of types rather than a single concrete type."}),e.jsx(t,{title:"Partial specialization of a class template",children:`#include <iostream>

// Primary template
template<typename T, typename U>
struct Pair {
    void describe() { std::cout << "generic Pair" << std::endl; }
};

// Partial specialization: both types are the same
template<typename T>
struct Pair<T, T> {
    void describe() { std::cout << "same-type Pair" << std::endl; }
};

// Partial specialization: second type is a pointer
template<typename T, typename U>
struct Pair<T, U*> {
    void describe() { std::cout << "pointer Pair" << std::endl; }
};

int main() {
    Pair<int, double> p1;   p1.describe();
    Pair<int, int> p2;      p2.describe();
    Pair<int, double*> p3;  p3.describe();
    return 0;
}`}),e.jsx(s,{children:`generic Pair
same-type Pair
pointer Pair`}),e.jsx(a,{type:"important",title:"No partial specialization for functions",children:e.jsx("p",{children:"C++ does not allow partial specialization of function templates. Use overloading or constexpr if with type traits to achieve similar dispatch for functions."})}),e.jsx(i,{title:"Prefer overloading over function template specialization",children:e.jsx("p",{children:"For function templates, prefer providing overloads instead of specializations. Overloads participate in normal overload resolution, making behavior more predictable. Reserve full specialization for class templates where partial specialization and overloading are not options."})}),e.jsx(l,{title:"Specialize a Formatter",difficulty:"intermediate",prompt:"Write a function template called format that returns a std::string representation of a value. Provide overloads for bool (return 'true'/'false') and for const char* (wrap in quotes). Use std::to_string for the generic case.",hints:["The primary template can use std::to_string(value)","Write a non-template overload for bool and const char*","Include <string> for std::to_string and std::string"],solution:e.jsx(t,{children:`#include <iostream>
#include <string>

template<typename T>
std::string format(T value) {
    return std::to_string(value);
}

// Overload for bool
std::string format(bool value) {
    return value ? "true" : "false";
}

// Overload for C-strings
std::string format(const char* value) {
    return "'" + std::string(value) + "'";
}

int main() {
    std::cout << format(42) << std::endl;
    std::cout << format(true) << std::endl;
    std::cout << format("hello") << std::endl;
    return 0;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"Template specialization",url:"https://en.cppreference.com/w/cpp/language/template_specialization",description:"Full and partial specialization rules"},{type:"cppreference",title:"Partial template specialization",url:"https://en.cppreference.com/w/cpp/language/partial_specialization",description:"Class template partial specialization"},{type:"article",title:"Why Not Specialize Function Templates?",author:"Herb Sutter",description:"Explains why overloading is preferred over function template specialization"}]})]})}const S=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"}));function h(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Class templates extend the concept of generic programming to user-defined types. They allow you to define a class once and have the compiler generate type-specific versions as needed. The entire C++ Standard Library containers (",e.jsx("code",{children:"std::vector"}),", ",e.jsx("code",{children:"std::map"}),", etc.) are class templates."]}),e.jsx(r,{title:"Class Template",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"class template"})," is a blueprint for generating classes. It defines a family of classes parameterized by one or more types or values. Each unique set of template arguments produces a distinct type."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Defining a Class Template"}),e.jsxs(n,{title:"Basic class template syntax",children:[e.jsxs("p",{children:["Prefix the class definition with ",e.jsx("code",{children:"template<typename T>"}),". Inside the class body,",e.jsx("code",{children:"T"})," can be used anywhere a type is expected."]}),e.jsx(t,{children:`template<typename T>
class ClassName {
    T member;
public:
    ClassName(T val);
    T getValue() const;
};`})]}),e.jsx(t,{title:"A simple Box class template",children:`#include <iostream>

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
}`}),e.jsx(s,{children:`42
Hello
100`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Member Function Templates"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"A class template can have member functions that are themselves templates, with their own additional template parameters independent of the class template parameters."}),e.jsx(t,{title:"Member function with its own template parameter",children:`#include <iostream>

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
}`}),e.jsx(s,{children:`3
3.14`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Out-of-Line Definitions"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Member functions of a class template can be defined outside the class body. Each out-of-line definition must repeat the template parameter list and qualify the function name with the class template name."}),e.jsx(t,{title:"Out-of-line member function definitions",children:`#include <iostream>
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
}`}),e.jsx(s,{children:`20
10`}),e.jsx(a,{type:"info",title:"Implicit instantiation of members",children:e.jsxs("p",{children:["Member functions of a class template are only instantiated when they are actually used. If you never call ",e.jsx("code",{children:"pop()"})," on a ",e.jsx("code",{children:"Stack<int>"}),", the compiler will not generate code for ",e.jsx("code",{children:"Stack<int>::pop()"}),". This means a class template can contain member functions that would not compile for certain types, as long as those functions are never called with those types."]})}),e.jsx(i,{title:"Define class templates entirely in headers",children:e.jsxs("p",{children:["Place both the class template declaration and all member function definitions in the header file. Because the compiler needs the full definition at the point of instantiation, splitting a class template between a header and a ",e.jsx("code",{children:".cpp"})," file will cause linker errors."]})}),e.jsx(d,{compiler:"all",title:"CTAD in C++17",children:e.jsxs("p",{children:["Starting with C++17, class template argument deduction (CTAD) allows you to omit template arguments when constructing objects: ",e.jsx("code",{children:"Box b(42);"})," deduces ",e.jsx("code",{children:"Box<int>"}),". This works with standard library types too: ",e.jsxs("code",{children:["std::vector v = ","{","1, 2, 3","}",";"]}),"."]})}),e.jsx(l,{title:"Build a Generic Pair",difficulty:"intermediate",prompt:"Create a class template called MyPair that holds two values of potentially different types. Include a method swap() that swaps the two values (only when both types are the same). Define swap() out-of-line.",hints:["Use two template parameters: template<typename T, typename U>","Store two members: T first and U second","For swap(), you can add a separate single-type version or use static_assert"],solution:e.jsx(t,{children:`#include <iostream>

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
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"Class template",url:"https://en.cppreference.com/w/cpp/language/class_template",description:"Complete class template reference"},{type:"cppreference",title:"Member templates",url:"https://en.cppreference.com/w/cpp/language/member_template",description:"Member function templates within class templates"},{type:"textbook",title:"C++ Templates: The Complete Guide",author:"David Vandevoorde, Nicolai Josuttis, Douglas Gregor",description:"Chapter 2: Class Templates"}]})]})}const N=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"}));function x(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Template parameters are not limited to types. C++ templates support three kinds of parameters: type parameters, non-type parameters (compile-time constants), and template template parameters (templates that take other templates as arguments)."}),e.jsx(r,{title:"Template Parameter Categories",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Type parameters"})," represent types (",e.jsx("code",{children:"typename T"}),").",e.jsx("strong",{children:" Non-type parameters"})," represent compile-time constant values (",e.jsx("code",{children:"int N"}),").",e.jsx("strong",{children:" Template template parameters"})," represent templates themselves (",e.jsx("code",{children:"template<typename> class Container"}),")."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Non-Type Template Parameters"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Non-type parameters allow you to pass compile-time constant values to a template. Common uses include array sizes, bit widths, and fixed dimensions."}),e.jsx(t,{title:"Fixed-size array using non-type parameter",children:`#include <iostream>
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
}`}),e.jsx(s,{children:"0 1.1 2.2 3.3 4.4"}),e.jsxs(n,{title:"Allowed non-type parameter types",children:[e.jsx("p",{children:"Non-type parameters can be integral types, enumerations, pointers, references, and (since C++20) floating-point types and literal class types with certain restrictions."}),e.jsx(t,{children:`template<int N>            // integer
template<char C>           // character
template<bool B>           // boolean
template<auto V>           // C++17: deduced non-type parameter
template<double D>         // C++20: floating-point`})]}),e.jsx(a,{type:"info",title:"auto non-type parameters (C++17)",children:e.jsxs("p",{children:["C++17 allows ",e.jsx("code",{children:"template<auto V>"})," where the type of the non-type parameter is deduced from the argument. This enables writing templates that accept any non-type parameter without specifying its type."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Default Template Arguments"}),e.jsx(t,{title:"Default template parameters",children:`#include <iostream>
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
}`}),e.jsx(s,{children:`2
10`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Template Template Parameters"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"A template template parameter allows you to pass a template (not a type) as an argument. This is useful when you want the user to specify a container template without specifying its element type."}),e.jsx(t,{title:"Template template parameter",children:`#include <iostream>
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
}`}),e.jsx(s,{children:`1 2 3
hello world`}),e.jsx(c,{title:"Template template parameter compatibility",children:e.jsxs("p",{children:["Template template parameters must match the number and kind of parameters of the argument template. Using variadic ",e.jsx("code",{children:"typename..."})," in the template template parameter (as shown above) provides the most flexibility and avoids issues with default allocator parameters in standard containers."]})}),e.jsx(i,{title:"Provide sensible defaults",children:e.jsxs("p",{children:["When designing class templates, provide default template arguments for parameters that have a natural default choice. This follows the principle used throughout the standard library, such as ",e.jsx("code",{children:"std::vector<T, Allocator = std::allocator<T>>"}),"."]})}),e.jsx(l,{title:"Matrix with Non-Type Parameters",difficulty:"intermediate",prompt:"Create a class template Matrix that takes a type T and two non-type int parameters Rows and Cols. Include a method at(int r, int c) that returns a reference to the element, and a method fill(T value) that sets all elements.",hints:["Store the data as T data[Rows][Cols] or T data[Rows * Cols]","Use bounds checking in at() with an if statement or assert","fill() should iterate over all Rows * Cols elements"],solution:e.jsx(t,{children:`#include <iostream>

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
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"Template parameters",url:"https://en.cppreference.com/w/cpp/language/template_parameters",description:"All template parameter categories and rules"},{type:"cppreference",title:"Non-type template parameters",url:"https://en.cppreference.com/w/cpp/language/template_parameters#Non-type_template_parameter",description:"Allowed non-type parameter types"},{type:"textbook",title:"C++ Templates: The Complete Guide",author:"David Vandevoorde, Nicolai Josuttis, Douglas Gregor",description:"Chapter 3: Nontype Template Parameters"}]})]})}const z=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"}));function f(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Variadic templates accept an arbitrary number of template arguments. Introduced in C++11, they enable type-safe functions and classes that work with any number of parameters -- the foundation for utilities like ",e.jsx("code",{children:"std::tuple"}),", ",e.jsx("code",{children:"std::variant"}),", and ",e.jsx("code",{children:"std::make_shared"}),"."]}),e.jsx(r,{title:"Parameter Pack",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"parameter pack"})," is a template parameter that accepts zero or more arguments. A ",e.jsx("strong",{children:"template parameter pack"})," is declared with ",e.jsx("code",{children:"typename... Ts"}),", and a",e.jsx("strong",{children:" function parameter pack"})," is declared with ",e.jsx("code",{children:"Ts... args"}),". The pack is expanded using the ",e.jsx("code",{children:"..."})," operator."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic Variadic Templates"}),e.jsxs(n,{title:"Variadic template syntax",children:[e.jsxs("p",{children:["The ellipsis ",e.jsx("code",{children:"..."})," appears after ",e.jsx("code",{children:"typename"})," to declare a parameter pack, and after a pattern to expand it."]}),e.jsx(t,{children:`template<typename... Ts>       // Ts is a template parameter pack
void func(Ts... args) {        // args is a function parameter pack
    // sizeof...(Ts) gives the number of types
    // sizeof...(args) gives the number of arguments
}`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Recursive Unpacking"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Before C++17 fold expressions, the standard technique for processing parameter packs was recursive template instantiation with a base case."}),e.jsx(t,{title:"Recursive variadic print",children:`#include <iostream>

// Base case: no arguments
void print() {
    std::cout << std::endl;
}

// Recursive case: peel off first argument
template<typename T, typename... Rest>
void print(T first, Rest... rest) {
    std::cout << first;
    if constexpr (sizeof...(rest) > 0)
        std::cout << ", ";
    print(rest...);
}

int main() {
    print(1, 2.5, "hello", 'A');
    print(42);
    print();
    return 0;
}`}),e.jsx(s,{children:`1, 2.5, hello, A
42
`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"sizeof... Operator"}),e.jsx(t,{title:"Querying pack size",children:`#include <iostream>

template<typename... Ts>
void countTypes() {
    std::cout << "Number of types: " << sizeof...(Ts) << std::endl;
}

template<typename... Ts>
void countArgs(Ts... args) {
    std::cout << "Number of args: " << sizeof...(args) << std::endl;
}

int main() {
    countTypes<int, double, char>();
    countArgs(1, 2, 3, 4, 5);
    countArgs();
    return 0;
}`}),e.jsx(s,{children:`Number of types: 3
Number of args: 5
Number of args: 0`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Fold Expressions (C++17)"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"C++17 fold expressions dramatically simplify operations over parameter packs by letting you apply a binary operator across all elements without recursion."}),e.jsxs(n,{title:"Fold expression forms",children:[e.jsxs("p",{children:["There are four forms of fold expressions. ",e.jsx("code",{children:"pack"})," is an expression containing an unexpanded parameter pack, ",e.jsx("code",{children:"op"})," is a binary operator, and ",e.jsx("code",{children:"init"})," is an initial value."]}),e.jsx(t,{children:`(pack op ...)          // Unary right fold
(... op pack)          // Unary left fold
(pack op ... op init)  // Binary right fold
(init op ... op pack)  // Binary left fold`})]}),e.jsx(t,{title:"Fold expressions in action",children:`#include <iostream>
#include <string>

template<typename... Ts>
auto sum(Ts... args) {
    return (args + ...);  // Unary right fold
}

template<typename... Ts>
auto product(Ts... args) {
    return (args * ... * 1);  // Binary right fold with init=1
}

template<typename... Ts>
void printAll(Ts... args) {
    ((std::cout << args << " "), ...);  // Comma fold
    std::cout << std::endl;
}

int main() {
    std::cout << sum(1, 2, 3, 4, 5) << std::endl;
    std::cout << product(2, 3, 4) << std::endl;
    printAll("hello", 42, 3.14, 'X');
    return 0;
}`}),e.jsx(s,{children:`15
24
hello 42 3.14 X`}),e.jsx(a,{type:"tip",title:"The comma operator fold trick",children:e.jsxs("p",{children:["Folding over the comma operator ",e.jsx("code",{children:"((expression), ...)"})," is a powerful pattern that lets you execute an expression for each element in the pack. The extra parentheses ensure the comma is treated as the fold operator, not a function argument separator."]})}),e.jsx(c,{title:"Empty packs with unary folds",children:e.jsxs("p",{children:["Unary folds over an empty parameter pack are only allowed for ",e.jsx("code",{children:"&&"})," (yields ",e.jsx("code",{children:"true"}),"),",e.jsx("code",{children:"||"})," (yields ",e.jsx("code",{children:"false"}),"), and ",e.jsx("code",{children:","})," (yields ",e.jsx("code",{children:"void()"}),"). For other operators, use a binary fold with an explicit initial value to handle empty packs."]})}),e.jsx(i,{title:"Prefer fold expressions over recursion",children:e.jsx("p",{children:"When targeting C++17 or later, use fold expressions instead of recursive unpacking. They produce less template instantiation overhead, are more readable, and often compile faster. Reserve recursive techniques for complex per-element logic that cannot be expressed as a fold."})}),e.jsx(l,{title:"Type-Safe Maximum",difficulty:"intermediate",prompt:"Write a variadic function template called maxOf that returns the maximum of all its arguments using a C++17 fold expression or recursive approach. It should work with any number of arguments (at least one).",hints:["You can use a recursive approach: compare first with maxOf(rest...)","Base case: single argument returns itself","Use std::max or the ternary operator for comparison"],solution:e.jsx(t,{children:`#include <iostream>
#include <algorithm>

// Base case
template<typename T>
T maxOf(T val) {
    return val;
}

// Recursive case
template<typename T, typename... Rest>
T maxOf(T first, Rest... rest) {
    auto restMax = maxOf(rest...);
    return (first > restMax) ? first : restMax;
}

int main() {
    std::cout << maxOf(3, 7, 2, 9, 1) << std::endl;
    std::cout << maxOf(1.5, 2.7) << std::endl;
    std::cout << maxOf(42) << std::endl;
    return 0;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"Parameter pack",url:"https://en.cppreference.com/w/cpp/language/parameter_pack",description:"Parameter pack syntax and expansion rules"},{type:"cppreference",title:"Fold expressions",url:"https://en.cppreference.com/w/cpp/language/fold",description:"C++17 fold expression syntax and semantics"},{type:"cppreference",title:"sizeof... operator",url:"https://en.cppreference.com/w/cpp/language/sizeof...",description:"Querying the size of parameter packs"}]})]})}const q=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"}));function y(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"C++20 concepts provide a way to constrain template parameters with named, readable requirements. Instead of cryptic SFINAE errors, concepts produce clear error messages when a type does not meet the requirements, and they make template interfaces self-documenting."}),e.jsx(r,{title:"Concept",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"concept"})," is a named set of constraints that specifies what operations a type must support. Concepts are compile-time predicates: they evaluate to ",e.jsx("code",{children:"true"})," or",e.jsx("code",{children:"false"})," for a given type and are used to restrict which types can be used with a template."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Defining a Concept"}),e.jsxs(n,{title:"concept keyword",children:[e.jsxs("p",{children:["A concept is defined with the ",e.jsx("code",{children:"concept"})," keyword followed by a name and a constraint expression that must evaluate to ",e.jsx("code",{children:"true"})," for the concept to be satisfied."]}),e.jsx(t,{children:`template<typename T>
concept ConceptName = constraint_expression;`})]}),e.jsx(t,{title:"Defining and using a concept",children:`#include <iostream>
#include <type_traits>

template<typename T>
concept Numeric = std::is_arithmetic_v<T>;

template<Numeric T>
T square(T x) {
    return x * x;
}

int main() {
    std::cout << square(5) << std::endl;
    std::cout << square(3.14) << std::endl;
    // square(std::string("hi")); // Error: string is not Numeric
    return 0;
}`}),e.jsx(s,{children:`25
9.8596`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Ways to Apply Constraints"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"C++20 provides four syntactic forms for constraining templates, all equivalent in effect."}),e.jsx(t,{title:"Four ways to constrain a template",children:`#include <concepts>

// 1. Concept as type constraint (most concise)
template<std::integral T>
T gcd1(T a, T b) { return b == 0 ? a : gcd1(b, a % b); }

// 2. Requires clause after template parameters
template<typename T> requires std::integral<T>
T gcd2(T a, T b) { return b == 0 ? a : gcd2(b, a % b); }

// 3. Trailing requires clause
template<typename T>
T gcd3(T a, T b) requires std::integral<T>
{ return b == 0 ? a : gcd3(b, a % b); }

// 4. Abbreviated function template with auto
std::integral auto gcd4(std::integral auto a, std::integral auto b)
{ return b == 0 ? a : gcd4(b, a % b); }`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Concepts with Multiple Constraints"}),e.jsx(t,{title:"Combining constraints",children:`#include <iostream>
#include <concepts>
#include <string>

template<typename T>
concept Printable = requires(T t) {
    std::cout << t;
};

template<typename T>
concept PrintableAndCopyable = Printable<T> && std::copyable<T>;

template<PrintableAndCopyable T>
void display(T value) {
    T copy = value;  // guaranteed copyable
    std::cout << "Value: " << copy << std::endl;
}

int main() {
    display(42);
    display(std::string("hello"));
    display(3.14);
    return 0;
}`}),e.jsx(s,{children:`Value: 42
Value: hello
Value: 3.14`}),e.jsx(a,{type:"info",title:"Concept subsumption",children:e.jsxs("p",{children:["When multiple constrained overloads match, the compiler selects the most constrained one through ",e.jsx("strong",{children:"subsumption"}),". If concept A implies concept B (A subsumes B), the overload constrained by A is preferred. This provides a cleaner alternative to SFINAE-based dispatch."]})}),e.jsx(i,{title:"Name concepts after what they require",children:e.jsxs("p",{children:["Choose concept names that describe the capability required, such as ",e.jsx("code",{children:"Sortable"}),",",e.jsx("code",{children:"Hashable"}),", or ",e.jsx("code",{children:"Serializable"}),". Avoid naming them after what they are (like ",e.jsx("code",{children:"HasLessThan"}),"). Good concept names make template declarations read like natural language: ",e.jsx("code",{children:"template<Sortable T>"}),"."]})}),e.jsx(d,{compiler:"all",title:"Compiler support",children:e.jsxs("p",{children:["Concepts require a C++20-capable compiler. GCC 10+, Clang 10+, and MSVC 19.30+ all support concepts. Compile with ",e.jsx("code",{children:"-std=c++20"})," (GCC/Clang) or ",e.jsx("code",{children:"/std:c++20"})," (MSVC)."]})}),e.jsx(a,{type:"history",title:"Long road to concepts",children:e.jsx("p",{children:'Concepts were first proposed for C++11 but were deferred due to complexity. A simplified version called "Concepts Lite" was developed and eventually standardized in C++20, nearly a decade after the original proposal.'})}),e.jsx(l,{title:"Create a Container Concept",difficulty:"intermediate",prompt:"Define a concept called Container that requires a type to have begin(), end(), and size() member functions. Write a function template printSize that is constrained by this concept and prints the container's size.",hints:["Use a requires expression to check for the member functions","t.begin(), t.end(), and t.size() should all be valid expressions","Test with std::vector and std::string (both satisfy the concept)"],solution:e.jsx(t,{children:`#include <iostream>
#include <vector>
#include <string>

template<typename T>
concept Container = requires(T t) {
    t.begin();
    t.end();
    t.size();
};

template<Container C>
void printSize(const C& c) {
    std::cout << "Size: " << c.size() << std::endl;
}

int main() {
    std::vector<int> v = {1, 2, 3, 4};
    std::string s = "hello";
    printSize(v);  // Size: 4
    printSize(s);  // Size: 5
    return 0;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"Constraints and concepts",url:"https://en.cppreference.com/w/cpp/language/constraints",description:"Complete C++20 concepts reference"},{type:"cppreference",title:"concept keyword",url:"https://en.cppreference.com/w/cpp/keyword/concept",description:"Concept definition syntax"},{type:"textbook",title:"C++20: The Complete Guide",author:"Nicolai Josuttis",description:"Part I: Concepts"}]})]})}const A=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"}));function g(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The ",e.jsx("code",{children:"requires"})," keyword serves dual purposes in C++20: it introduces a ",e.jsx("strong",{children:"requires clause"})," that constrains a template, and it begins a ",e.jsx("strong",{children:"requires expression"})," that checks whether a set of expressions are valid for a given type. Requires expressions are the building blocks of custom concepts."]}),e.jsx(r,{title:"Requires Expression",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"requires expression"})," is a compile-time predicate that tests whether a sequence of syntactic requirements are satisfied. It takes the form ",e.jsxs("code",{children:["requires(parameters) ","{"," requirements; ","}"]})," and evaluates to ",e.jsx("code",{children:"true"})," if all requirements are valid, ",e.jsx("code",{children:"false"})," otherwise."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Simple Requirements"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"A simple requirement asserts that an expression is valid (it compiles). It does not evaluate the expression or check its return type."}),e.jsx(t,{title:"Simple requirements",children:`#include <iostream>
#include <concepts>

template<typename T>
concept Addable = requires(T a, T b) {
    a + b;     // must support addition
    a - b;     // must support subtraction
    -a;        // must support unary negation
};

template<Addable T>
T difference(T a, T b) {
    return a - b;
}

int main() {
    std::cout << difference(10, 3) << std::endl;
    std::cout << difference(5.5, 2.2) << std::endl;
    // difference(std::string("a"), std::string("b")); // Error: no operator-
    return 0;
}`}),e.jsx(s,{children:`7
3.3`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Type Requirements"}),e.jsxs(n,{title:"Type requirement syntax",children:[e.jsxs("p",{children:["Type requirements check that a named type exists. They use the ",e.jsx("code",{children:"typename"})," keyword inside a requires expression to verify that a type alias or nested type is valid."]}),e.jsx(t,{children:`template<typename T>
concept HasValueType = requires {
    typename T::value_type;       // T must have a nested value_type
    typename T::iterator;         // T must have a nested iterator type
};`})]}),e.jsx(t,{title:"Type requirements in practice",children:`#include <iostream>
#include <vector>
#include <string>

template<typename T>
concept IterableContainer = requires(T t) {
    typename T::value_type;
    typename T::iterator;
    t.begin();
    t.end();
};

template<IterableContainer C>
void printFirst(const C& c) {
    if (c.begin() != c.end())
        std::cout << "First: " << *c.begin() << std::endl;
}

int main() {
    std::vector<int> v = {10, 20, 30};
    std::string s = "hello";
    printFirst(v);
    printFirst(s);
    return 0;
}`}),e.jsx(s,{children:`First: 10
First: h`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Compound Requirements"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Compound requirements check that an expression is valid, optionally that it does not throw, and optionally that its return type satisfies a type constraint."}),e.jsxs(n,{title:"Compound requirement syntax",children:[e.jsxs("p",{children:["The syntax is ",e.jsxs("code",{children:["{","expression","}"," noexcept -> ConceptOrType;"]}),". Both ",e.jsx("code",{children:"noexcept"})," and the return type constraint are optional."]}),e.jsx(t,{children:`template<typename T>
concept Comparable = requires(T a, T b) {
    { a == b } -> std::convertible_to<bool>;
    { a != b } -> std::convertible_to<bool>;
    { a < b }  -> std::convertible_to<bool>;
};`})]}),e.jsx(t,{title:"Compound requirements example",children:`#include <iostream>
#include <concepts>
#include <string>

template<typename T>
concept Stringifiable = requires(T t) {
    { t.toString() } -> std::convertible_to<std::string>;
};

struct Point {
    int x, y;
    std::string toString() const {
        return "(" + std::to_string(x) + ", " + std::to_string(y) + ")";
    }
};

template<Stringifiable T>
void show(const T& obj) {
    std::cout << obj.toString() << std::endl;
}

int main() {
    Point p{3, 4};
    show(p);
    return 0;
}`}),e.jsx(s,{children:"(3, 4)"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Nested Requirements"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Nested requirements allow you to embed additional ",e.jsx("code",{children:"requires"})," clauses inside a requires expression, enabling more complex constraint logic."]}),e.jsx(t,{title:"Nested requirements",children:`#include <iostream>
#include <type_traits>

template<typename T>
concept SignedNumeric = requires {
    requires std::is_arithmetic_v<T>;
    requires std::is_signed_v<T>;
};

template<SignedNumeric T>
T absolute(T val) {
    return val < 0 ? -val : val;
}

int main() {
    std::cout << absolute(-42) << std::endl;
    std::cout << absolute(-3.14) << std::endl;
    // absolute(42u); // Error: unsigned int is not signed
    return 0;
}`}),e.jsx(s,{children:`42
3.14`}),e.jsx(c,{title:"requires requires",children:e.jsxs("p",{children:["When using a requires expression directly in a requires clause, you write ",e.jsx("code",{children:"requires requires"})," -- the first is the clause, the second starts the expression. While syntactically valid, this is hard to read. Prefer defining a named concept instead."]})}),e.jsx(i,{title:"Name your concepts",children:e.jsxs("p",{children:["Avoid inline ",e.jsx("code",{children:"requires requires"})," expressions. Instead, extract them into named concepts. Named concepts are reusable, testable, and make template declarations far more readable. A good concept name communicates intent better than a list of raw requirements."]})}),e.jsx(a,{type:"tip",title:"Combining requirement kinds",children:e.jsxs("p",{children:["A single requires expression can mix all four requirement kinds: simple, type, compound, and nested. They are checked independently, and all must be satisfied for the overall expression to be ",e.jsx("code",{children:"true"}),"."]})}),e.jsx(l,{title:"Define a Hashable Concept",difficulty:"intermediate",prompt:"Define a concept called Hashable that requires: (1) a type can be passed to std::hash, (2) the result is convertible to std::size_t, and (3) the type supports equality comparison. Test it with std::string and int.",hints:["Use a compound requirement: { std::hash<T>{}(t) } -> std::convertible_to<std::size_t>","Also require { t == t } -> std::convertible_to<bool>","Include <functional> for std::hash"],solution:e.jsx(t,{children:`#include <iostream>
#include <functional>
#include <concepts>
#include <string>

template<typename T>
concept Hashable = requires(T t) {
    { std::hash<T>{}(t) } -> std::convertible_to<std::size_t>;
    { t == t } -> std::convertible_to<bool>;
};

template<Hashable T>
std::size_t getHash(const T& val) {
    return std::hash<T>{}(val);
}

int main() {
    std::cout << getHash(42) << std::endl;
    std::cout << getHash(std::string("hello")) << std::endl;
    return 0;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"Requires expression",url:"https://en.cppreference.com/w/cpp/language/requires",description:"All four requirement kinds explained"},{type:"cppreference",title:"Constraints and concepts",url:"https://en.cppreference.com/w/cpp/language/constraints",description:"Requires clauses and constraint normalization"},{type:"textbook",title:"C++20: The Complete Guide",author:"Nicolai Josuttis",description:"Chapter on requires expressions"}]})]})}const F=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"}));function b(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The C++20 standard library provides a rich set of predefined concepts in the ",e.jsx("code",{children:"<concepts>"})," and",e.jsx("code",{children:" <ranges>"})," headers. These standard concepts cover common requirements like arithmetic operations, comparison, copying, and range-based iteration, saving you from reinventing constraints for everyday use cases."]}),e.jsx(r,{title:"Standard Library Concepts",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Standard library concepts"})," are predefined concepts in namespace ",e.jsx("code",{children:"std"})," that express fundamental type requirements. They serve as building blocks for constraining your own templates and are organized into categories: core language concepts, comparison concepts, object concepts, and callable concepts."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Core Language Concepts"}),e.jsxs(n,{title:"Arithmetic and type concepts",children:[e.jsxs("p",{children:["The ",e.jsx("code",{children:"<concepts>"})," header provides fundamental type classification concepts that mirror the type traits but with cleaner syntax."]}),e.jsx(t,{children:`#include <concepts>

std::integral<T>          // int, long, char, bool, etc.
std::floating_point<T>    // float, double, long double
std::signed_integral<T>   // signed integers only
std::unsigned_integral<T> // unsigned integers only
std::same_as<T, U>        // T and U are exactly the same type
std::convertible_to<From, To>  // From is implicitly convertible to To
std::derived_from<Derived, Base> // Derived inherits from Base`})]}),e.jsx(t,{title:"Using core concepts",children:`#include <iostream>
#include <concepts>

template<std::integral T>
T bitwiseOr(T a, T b) {
    return a | b;
}

template<std::floating_point T>
T average(T a, T b) {
    return (a + b) / T(2);
}

int main() {
    std::cout << bitwiseOr(0b1010, 0b1100) << std::endl;  // 14
    std::cout << average(3.0, 7.0) << std::endl;            // 5
    // bitwiseOr(3.5, 2.5);  // Error: double is not integral
    return 0;
}`}),e.jsx(s,{children:`14
5`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Object Concepts"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Object concepts describe how types can be constructed, copied, moved, and assigned."}),e.jsx(t,{title:"Object concepts in practice",children:`#include <iostream>
#include <concepts>
#include <memory>

// std::copyable: copy constructible and copy assignable
template<std::copyable T>
T duplicate(const T& val) {
    return val;
}

// std::movable: move constructible and move assignable
template<std::movable T>
void transfer(T& dest, T&& src) {
    dest = std::move(src);
}

int main() {
    int x = duplicate(42);
    std::cout << x << std::endl;

    std::string s1, s2 = "hello";
    transfer(s1, std::move(s2));
    std::cout << s1 << std::endl;

    // duplicate(std::make_unique<int>(5)); // Error: unique_ptr not copyable
    return 0;
}`}),e.jsx(s,{children:`42
hello`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Comparison Concepts"}),e.jsx(t,{title:"Comparison concepts",children:`#include <iostream>
#include <concepts>
#include <vector>
#include <algorithm>

template<std::totally_ordered T>
T clamp(T val, T lo, T hi) {
    if (val < lo) return lo;
    if (val > hi) return hi;
    return val;
}

template<std::equality_comparable T>
bool contains(const std::vector<T>& vec, const T& target) {
    for (const auto& elem : vec)
        if (elem == target) return true;
    return false;
}

int main() {
    std::cout << clamp(15, 0, 10) << std::endl;
    std::cout << clamp(-5, 0, 10) << std::endl;

    std::vector<std::string> words = {"hello", "world"};
    std::cout << std::boolalpha;
    std::cout << contains(words, std::string("world")) << std::endl;
    std::cout << contains(words, std::string("foo")) << std::endl;
    return 0;
}`}),e.jsx(s,{children:`10
0
true
false`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Range Concepts"}),e.jsx(t,{title:"Using std::ranges concepts",children:`#include <iostream>
#include <ranges>
#include <vector>
#include <list>

template<std::ranges::range R>
void printRange(const R& r) {
    for (const auto& elem : r)
        std::cout << elem << " ";
    std::cout << std::endl;
}

template<std::ranges::random_access_range R>
auto middle(const R& r) {
    auto sz = std::ranges::size(r);
    return r[sz / 2];
}

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    std::list<double> l = {1.1, 2.2, 3.3};

    printRange(v);
    printRange(l);
    std::cout << "Middle: " << middle(v) << std::endl;
    // middle(l); // Error: list is not random_access_range
    return 0;
}`}),e.jsx(s,{children:`1 2 3 4 5
1.1 2.2 3.3
Middle: 3`}),e.jsx(a,{type:"tip",title:"Concept hierarchy",children:e.jsxs("p",{children:["Standard concepts form a hierarchy. For example, ",e.jsx("code",{children:"std::regular"})," subsumes both",e.jsx("code",{children:"std::semiregular"})," and ",e.jsx("code",{children:"std::equality_comparable"}),". Similarly,",e.jsx("code",{children:"std::random_access_range"})," subsumes ",e.jsx("code",{children:"std::bidirectional_range"}),", which subsumes ",e.jsx("code",{children:"std::forward_range"}),". Use the most specific concept that fits your requirements."]})}),e.jsx(c,{title:"Do not over-constrain",children:e.jsxs("p",{children:["Only constrain what your function actually needs. Requiring ",e.jsx("code",{children:"std::regular"})," when you only need ",e.jsx("code",{children:"std::equality_comparable"})," unnecessarily restricts usable types. Over-constraining reduces the generality of your template."]})}),e.jsx(i,{title:"Prefer standard concepts over custom ones",children:e.jsx("p",{children:"Before defining your own concept, check if a standard concept already expresses the requirement. Standard concepts are well-tested, properly subsume each other for overload resolution, and are immediately recognizable to other C++ developers."})}),e.jsx(l,{title:"Constrained Accumulate",difficulty:"intermediate",prompt:"Write a function template accumulate that takes a std::ranges::range and an initial value, and sums all elements. Constrain the range's value type to be convertible to the accumulator type using standard concepts.",hints:["Use std::ranges::range to constrain the first parameter","Use std::ranges::range_value_t<R> to get the element type","Add a requires clause checking std::convertible_to"],solution:e.jsx(t,{children:`#include <iostream>
#include <ranges>
#include <concepts>
#include <vector>
#include <list>

template<std::ranges::range R, typename T>
    requires std::convertible_to<std::ranges::range_value_t<R>, T>
T accumulate(const R& range, T init) {
    for (const auto& elem : range)
        init += static_cast<T>(elem);
    return init;
}

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    std::list<double> l = {1.1, 2.2, 3.3};

    std::cout << accumulate(v, 0) << std::endl;
    std::cout << accumulate(l, 0.0) << std::endl;
    std::cout << accumulate(v, 0.0) << std::endl;
    return 0;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"Standard library concepts",url:"https://en.cppreference.com/w/cpp/concepts",description:"Complete list of standard concepts"},{type:"cppreference",title:"Range concepts",url:"https://en.cppreference.com/w/cpp/ranges#Range_concepts",description:"Range-related concepts from <ranges>"},{type:"textbook",title:"C++20: The Complete Guide",author:"Nicolai Josuttis",description:"Standard concepts and their relationships"}]})]})}const P=Object.freeze(Object.defineProperty({__proto__:null,default:b},Symbol.toStringTag,{value:"Module"}));function v(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"SFINAE -- Substitution Failure Is Not An Error -- is one of the most important principles in C++ template metaprogramming. It allows the compiler to silently discard template overloads that would result in invalid code, rather than producing a hard error. Before C++20 concepts, SFINAE was the primary mechanism for constraining templates."}),e.jsx(r,{title:"SFINAE",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Substitution Failure Is Not An Error (SFINAE)"})," is a C++ language rule stating that when substituting template arguments into a function template declaration produces an invalid type or expression, the template is simply removed from the overload set instead of causing a compilation error."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic SFINAE"}),e.jsx(t,{title:"SFINAE in action",children:`#include <iostream>
#include <type_traits>

// Enabled only for integral types
template<typename T>
typename std::enable_if<std::is_integral<T>::value, T>::type
process(T val) {
    std::cout << "Integer: " << val << std::endl;
    return val;
}

// Enabled only for floating-point types
template<typename T>
typename std::enable_if<std::is_floating_point<T>::value, T>::type
process(T val) {
    std::cout << "Float: " << val << std::endl;
    return val;
}

int main() {
    process(42);
    process(3.14);
    // process("hello"); // Error: no matching overload
    return 0;
}`}),e.jsx(s,{children:`Integer: 42
Float: 3.14`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::enable_if"}),e.jsxs(n,{title:"enable_if syntax",children:[e.jsxs("p",{children:[e.jsx("code",{children:"std::enable_if<condition, T>::type"})," is defined as ",e.jsx("code",{children:"T"})," when",e.jsx("code",{children:"condition"})," is ",e.jsx("code",{children:"true"}),", and is undefined (triggering SFINAE) when",e.jsx("code",{children:"condition"})," is ",e.jsx("code",{children:"false"}),". The C++14 alias ",e.jsx("code",{children:"std::enable_if_t"})," is more concise."]}),e.jsx(t,{children:`// C++11 verbose form
template<typename T>
typename std::enable_if<condition, ReturnType>::type func(T);

// C++14 alias form
template<typename T>
std::enable_if_t<condition, ReturnType> func(T);

// As default template parameter
template<typename T, std::enable_if_t<condition, int> = 0>
ReturnType func(T);`})]}),e.jsx(t,{title:"enable_if as default template parameter",children:`#include <iostream>
#include <type_traits>

template<typename T, std::enable_if_t<std::is_integral_v<T>, int> = 0>
void describe(T val) {
    std::cout << val << " is an integer type" << std::endl;
}

template<typename T, std::enable_if_t<std::is_floating_point_v<T>, int> = 0>
void describe(T val) {
    std::cout << val << " is a floating-point type" << std::endl;
}

int main() {
    describe(42);
    describe(3.14);
    describe(true);
    return 0;
}`}),e.jsx(s,{children:`42 is an integer type
3.14 is a floating-point type
1 is an integer type`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Detecting Member Functions"}),e.jsx(t,{title:"Detecting if a type has a toString method",children:`#include <iostream>
#include <string>
#include <type_traits>

// Detection idiom using void_t (C++17)
template<typename, typename = void>
struct has_toString : std::false_type {};

template<typename T>
struct has_toString<T, std::void_t<decltype(std::declval<T>().toString())>>
    : std::true_type {};

template<typename T>
std::enable_if_t<has_toString<T>::value, std::string>
stringify(const T& obj) {
    return obj.toString();
}

template<typename T>
std::enable_if_t<!has_toString<T>::value, std::string>
stringify(const T& val) {
    return "no toString available";
}

struct Widget {
    std::string toString() const { return "Widget"; }
};

int main() {
    Widget w;
    std::cout << stringify(w) << std::endl;
    std::cout << stringify(42) << std::endl;
    return 0;
}`}),e.jsx(s,{children:`Widget
no toString available`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Tag Dispatch"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Tag dispatch is an alternative to SFINAE that uses overload resolution on tag types to select the correct implementation. It can be cleaner for dispatching on type categories."}),e.jsx(t,{title:"Tag dispatch example",children:`#include <iostream>
#include <type_traits>

template<typename T>
void advanceImpl(T& iter, int n, std::random_access_iterator_tag) {
    iter += n;
    std::cout << "Random access advance" << std::endl;
}

template<typename T>
void advanceImpl(T& iter, int n, std::input_iterator_tag) {
    for (int i = 0; i < n; ++i) ++iter;
    std::cout << "Linear advance" << std::endl;
}

template<typename Iter>
void myAdvance(Iter& iter, int n) {
    advanceImpl(iter, n,
        typename std::iterator_traits<Iter>::iterator_category{});
}

#include <vector>
#include <list>
int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    auto vi = v.begin();
    myAdvance(vi, 3);

    std::list<int> l = {1, 2, 3, 4, 5};
    auto li = l.begin();
    myAdvance(li, 3);
    return 0;
}`}),e.jsx(s,{children:`Random access advance
Linear advance`}),e.jsx(c,{title:"SFINAE error messages are cryptic",children:e.jsxs("p",{children:["When SFINAE-based constraints fail, the compiler reports that no overload matches, but does not explain ",e.jsx("em",{children:"why"})," each candidate was rejected. This makes debugging difficult. In C++20 and later, prefer concepts for much clearer diagnostics."]})}),e.jsx(i,{title:"Prefer concepts over SFINAE in C++20",children:e.jsx("p",{children:"If you can target C++20, use concepts instead of SFINAE. Concepts provide the same constraining power with dramatically better error messages and more readable code. SFINAE remains relevant for codebases that must support C++11/14/17."})}),e.jsx(a,{type:"history",title:"Origin of SFINAE",children:e.jsx("p",{children:'SFINAE was not designed as a feature -- it emerged as a consequence of how C++ template overload resolution works. The term was coined by David Vandevoorde in the book "C++ Templates." Over time, the community discovered powerful metaprogramming patterns built on this behavior.'})}),e.jsx(l,{title:"SFINAE-based Serialization",difficulty:"advanced",prompt:"Write two overloads of a function serialize: one for types that have a .serialize() method (returns std::string), and one fallback that uses std::to_string. Use std::enable_if and the detection idiom.",hints:["Create a has_serialize trait similar to has_toString above","Use std::void_t and decltype to detect the serialize() method","Use enable_if to select the correct overload"],solution:e.jsx(t,{children:`#include <iostream>
#include <string>
#include <type_traits>

template<typename, typename = void>
struct has_serialize : std::false_type {};

template<typename T>
struct has_serialize<T, std::void_t<decltype(std::declval<T>().serialize())>>
    : std::true_type {};

template<typename T>
std::enable_if_t<has_serialize<T>::value, std::string>
serialize(const T& obj) {
    return obj.serialize();
}

template<typename T>
std::enable_if_t<!has_serialize<T>::value, std::string>
serialize(const T& val) {
    return std::to_string(val);
}

struct Data {
    int x;
    std::string serialize() const { return "Data(" + std::to_string(x) + ")"; }
};

int main() {
    Data d{42};
    std::cout << serialize(d) << std::endl;
    std::cout << serialize(100) << std::endl;
    return 0;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"SFINAE",url:"https://en.cppreference.com/w/cpp/language/sfinae",description:"SFINAE rules and examples"},{type:"cppreference",title:"std::enable_if",url:"https://en.cppreference.com/w/cpp/types/enable_if",description:"enable_if utility for SFINAE"},{type:"cppreference",title:"std::void_t",url:"https://en.cppreference.com/w/cpp/types/void_t",description:"Helper for SFINAE detection idiom"}]})]})}const R=Object.freeze(Object.defineProperty({__proto__:null,default:v},Symbol.toStringTag,{value:"Module"}));function j(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The ",e.jsx("code",{children:"<type_traits>"})," header provides a comprehensive set of compile-time utilities for querying and transforming types. Type traits are the building blocks of template metaprogramming, enabling conditional compilation, static assertions, and type-safe generic code."]}),e.jsx(r,{title:"Type Traits",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Type traits"})," are template structs that provide compile-time information about types. ",e.jsx("strong",{children:"Unary type traits"})," query properties of a single type (e.g., is it an integer?). ",e.jsx("strong",{children:"Type transformations"})," modify types (e.g., remove const). Each trait exposes its result as a ",e.jsx("code",{children:"::value"})," (for predicates) or ",e.jsx("code",{children:"::type"})," (for transformations)."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Type Classification Traits"}),e.jsx(t,{title:"Querying type properties",children:`#include <iostream>
#include <type_traits>

template<typename T>
void classify() {
    std::cout << std::boolalpha;
    std::cout << "is_integral:       " << std::is_integral_v<T> << std::endl;
    std::cout << "is_floating_point: " << std::is_floating_point_v<T> << std::endl;
    std::cout << "is_pointer:        " << std::is_pointer_v<T> << std::endl;
    std::cout << "is_reference:      " << std::is_reference_v<T> << std::endl;
    std::cout << "is_const:          " << std::is_const_v<T> << std::endl;
    std::cout << "---" << std::endl;
}

int main() {
    classify<int>();
    classify<const double>();
    classify<int*>();
    return 0;
}`}),e.jsx(s,{children:`is_integral:       true
is_floating_point: false
is_pointer:        false
is_reference:      false
is_const:          false
---
is_integral:       false
is_floating_point: true
is_pointer:        false
is_reference:      false
is_const:          true
---
is_integral:       false
is_floating_point: false
is_pointer:        true
is_reference:      false
is_const:          false
---`}),e.jsxs(n,{title:"Trait value access",children:[e.jsxs("p",{children:["Every predicate trait has a ",e.jsx("code",{children:"::value"})," member and a C++17 variable template shorthand with the ",e.jsx("code",{children:"_v"})," suffix."]}),e.jsx(t,{children:`// Verbose form (C++11)
std::is_integral<int>::value       // true

// Shorthand (C++17)
std::is_integral_v<int>            // true

// Similarly for type transformations:
typename std::remove_const<const int>::type  // int
std::remove_const_t<const int>               // int (C++14)`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Type Relationship Traits"}),e.jsx(t,{title:"Checking type relationships",children:`#include <iostream>
#include <type_traits>
#include <string>

struct Base {};
struct Derived : Base {};

int main() {
    std::cout << std::boolalpha;
    std::cout << "same: " << std::is_same_v<int, int> << std::endl;
    std::cout << "same: " << std::is_same_v<int, long> << std::endl;
    std::cout << "base_of: " << std::is_base_of_v<Base, Derived> << std::endl;
    std::cout << "convertible: "
              << std::is_convertible_v<int, double> << std::endl;
    std::cout << "convertible: "
              << std::is_convertible_v<std::string, int> << std::endl;
    return 0;
}`}),e.jsx(s,{children:`same: true
same: false
base_of: true
convertible: true
convertible: false`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Type Transformations"}),e.jsx(t,{title:"Modifying types at compile time",children:`#include <iostream>
#include <type_traits>

template<typename T>
void showTransforms() {
    using NoConst = std::remove_const_t<T>;
    using NoRef   = std::remove_reference_t<T>;
    using Ptr     = std::add_pointer_t<T>;

    std::cout << std::boolalpha;
    std::cout << "remove_const same as T: "
              << std::is_same_v<NoConst, T> << std::endl;
    std::cout << "remove_ref same as T: "
              << std::is_same_v<NoRef, T> << std::endl;
}

int main() {
    std::cout << "--- const int ---" << std::endl;
    showTransforms<const int>();

    std::cout << "--- int& ---" << std::endl;
    showTransforms<int&>();
    return 0;
}`}),e.jsx(s,{children:`--- const int ---
remove_const same as T: false
remove_ref same as T: true
--- int& ---
remove_const same as T: true
remove_ref same as T: false`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::conditional"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"std::conditional"})," selects one of two types based on a compile-time boolean condition. It is the type-level equivalent of the ternary operator."]}),e.jsx(t,{title:"Compile-time type selection",children:`#include <iostream>
#include <type_traits>

template<typename T>
void store(T val) {
    // Use double for small types, T itself for larger types
    using StorageType = std::conditional_t<(sizeof(T) < 4), double, T>;
    StorageType stored = static_cast<StorageType>(val);
    std::cout << "sizeof(T)=" << sizeof(T)
              << " sizeof(stored)=" << sizeof(stored) << std::endl;
}

int main() {
    store('A');          // char -> stored as double
    store(short(42));    // short -> stored as double
    store(3.14);         // double -> stored as double
    store(42L);          // long -> stored as long
    return 0;
}`}),e.jsx(s,{children:`sizeof(T)=1 sizeof(stored)=8
sizeof(T)=2 sizeof(stored)=8
sizeof(T)=8 sizeof(stored)=8
sizeof(T)=8 sizeof(stored)=8`}),e.jsx(a,{type:"tip",title:"static_assert with type traits",children:e.jsxs("p",{children:["Combine type traits with ",e.jsx("code",{children:"static_assert"})," to produce compile-time errors with clear messages: ",e.jsx("code",{children:'static_assert(std::is_integral_v<T>, "T must be an integral type");'}),". This is simpler than SFINAE when you want to reject types outright rather than provide alternatives."]})}),e.jsx(c,{title:"decay strips qualifiers",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::decay_t<T>"})," removes references, const/volatile qualifiers, and converts arrays to pointers and functions to function pointers. Be aware of this when comparing types --",e.jsx("code",{children:"std::is_same_v<const int&, int>"})," is false, but",e.jsx("code",{children:"std::is_same_v<std::decay_t<const int&>, int>"})," is true."]})}),e.jsx(i,{title:"Use _v and _t suffixes",children:e.jsxs("p",{children:["Always prefer the C++17 ",e.jsx("code",{children:"_v"})," variable templates and C++14 ",e.jsx("code",{children:"_t"})," alias templates over the verbose ",e.jsx("code",{children:"::value"})," and ",e.jsx("code",{children:"::type"})," syntax. They reduce clutter and make metaprogramming code significantly more readable."]})}),e.jsx(l,{title:"Safe Numeric Cast",difficulty:"intermediate",prompt:"Write a function template safeCast that converts a value from type From to type To, but only compiles if both types are arithmetic. Use static_assert with type traits. Print a message indicating if the cast is narrowing (sizeof(To) < sizeof(From)).",hints:["Use static_assert with std::is_arithmetic_v for both types","Compare sizeof(To) and sizeof(From) for the narrowing check","Use if constexpr for the compile-time size comparison"],solution:e.jsx(t,{children:`#include <iostream>
#include <type_traits>

template<typename To, typename From>
To safeCast(From val) {
    static_assert(std::is_arithmetic_v<From>, "From must be arithmetic");
    static_assert(std::is_arithmetic_v<To>, "To must be arithmetic");

    if constexpr (sizeof(To) < sizeof(From)) {
        std::cout << "Warning: narrowing cast" << std::endl;
    }
    return static_cast<To>(val);
}

int main() {
    int i = safeCast<int>(3.14);
    std::cout << i << std::endl;

    double d = safeCast<double>(42);
    std::cout << d << std::endl;

    short s = safeCast<short>(100000L);
    std::cout << s << std::endl;
    return 0;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"Type traits library",url:"https://en.cppreference.com/w/cpp/header/type_traits",description:"Complete list of type traits"},{type:"cppreference",title:"std::conditional",url:"https://en.cppreference.com/w/cpp/types/conditional",description:"Compile-time type selection"},{type:"cppreference",title:"std::is_same",url:"https://en.cppreference.com/w/cpp/types/is_same",description:"Type identity check"}]})]})}const I=Object.freeze(Object.defineProperty({__proto__:null,default:j},Symbol.toStringTag,{value:"Module"}));function T(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The ",e.jsx("code",{children:"constexpr"})," keyword enables computation at compile time, blurring the line between runtime code and metaprogramming. What once required complex template recursion can now be written as straightforward functions that the compiler evaluates during compilation, producing faster executables with zero runtime overhead."]}),e.jsx(r,{title:"constexpr",children:e.jsxs("p",{children:[e.jsx("strong",{children:"constexpr"})," specifies that the value of a variable or the return value of a function ",e.jsx("em",{children:"can"})," be evaluated at compile time. A ",e.jsx("code",{children:"constexpr"})," function may also be called at runtime. The compiler guarantees compile-time evaluation when the result is used in a context that requires a constant expression (e.g., array sizes, template arguments)."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"constexpr Variables"}),e.jsxs(n,{title:"constexpr variable rules",children:[e.jsxs("p",{children:["A ",e.jsx("code",{children:"constexpr"})," variable must be initialized with a constant expression and its type must be a literal type. Unlike ",e.jsx("code",{children:"const"}),", ",e.jsx("code",{children:"constexpr"})," guarantees compile-time evaluation."]}),e.jsx(t,{children:`constexpr int maxSize = 100;           // compile-time constant
constexpr double pi = 3.14159265359;  // compile-time constant
constexpr int doubled = maxSize * 2;  // computed at compile time

// const does NOT guarantee compile-time evaluation:
const int runtime = someFunction();   // OK: evaluated at runtime
// constexpr int ct = someFunction(); // Error if someFunction is not constexpr`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"constexpr Functions"}),e.jsx(t,{title:"Compile-time factorial",children:`#include <iostream>

constexpr long long factorial(int n) {
    long long result = 1;
    for (int i = 2; i <= n; ++i)
        result *= i;
    return result;
}

int main() {
    // Compile-time evaluation: used as template argument
    constexpr auto f10 = factorial(10);
    static_assert(f10 == 3628800, "factorial(10) should be 3628800");

    std::cout << "10! = " << f10 << std::endl;

    // Runtime evaluation: argument not constexpr
    int n;
    std::cin >> n;
    std::cout << n << "! = " << factorial(n) << std::endl;
    return 0;
}`}),e.jsx(s,{children:"10! = 3628800"}),e.jsx(a,{type:"info",title:"constexpr evolution across standards",children:e.jsxs("p",{children:["C++11 constexpr functions were limited to a single return statement. C++14 lifted most restrictions, allowing loops, local variables, and multiple statements. C++20 further expanded capabilities to include virtual functions, try-catch, and ",e.jsx("code",{children:"std::string"}),"/",e.jsx("code",{children:"std::vector"})," in constexpr contexts."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"if constexpr (C++17)"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"if constexpr"})," evaluates conditions at compile time and discards the untaken branch entirely. This is invaluable in templates where the discarded branch might not compile for certain types."]}),e.jsx(t,{title:"if constexpr for type-based dispatch",children:`#include <iostream>
#include <type_traits>
#include <string>

template<typename T>
std::string describe(T val) {
    if constexpr (std::is_integral_v<T>) {
        return "integer: " + std::to_string(val);
    } else if constexpr (std::is_floating_point_v<T>) {
        return "float: " + std::to_string(val);
    } else if constexpr (std::is_same_v<T, std::string>) {
        return "string: " + val;
    } else {
        return "unknown type";
    }
}

int main() {
    std::cout << describe(42) << std::endl;
    std::cout << describe(3.14) << std::endl;
    std::cout << describe(std::string("hello")) << std::endl;
    return 0;
}`}),e.jsx(s,{children:`integer: 42
float: 3.140000
string: hello`}),e.jsx(a,{type:"important",title:"if constexpr vs regular if",children:e.jsxs("p",{children:["With a regular ",e.jsx("code",{children:"if"}),", both branches must compile even if the condition is known at compile time. With ",e.jsx("code",{children:"if constexpr"}),", the discarded branch is not instantiated. This replaces many SFINAE and tag dispatch patterns with straightforward conditional logic."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"constexpr Containers (C++20)"}),e.jsx(t,{title:"constexpr std::vector and std::string",children:`#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <numeric>

constexpr int sumOfSquares(int n) {
    std::vector<int> v(n);
    std::iota(v.begin(), v.end(), 1);  // 1, 2, ..., n
    int sum = 0;
    for (int x : v)
        sum += x * x;
    return sum;
}

constexpr int countVowels(std::string_view s) {
    int count = 0;
    for (char c : s) {
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')
            ++count;
    }
    return count;
}

int main() {
    constexpr int result = sumOfSquares(5);  // 1+4+9+16+25 = 55
    static_assert(result == 55);
    std::cout << "Sum of squares(5): " << result << std::endl;

    constexpr int vowels = countVowels("hello world");
    static_assert(vowels == 3);
    std::cout << "Vowels in 'hello world': " << vowels << std::endl;
    return 0;
}`}),e.jsx(s,{children:`Sum of squares(5): 55
Vowels in 'hello world': 3`}),e.jsx(d,{compiler:"all",title:"constexpr allocation limitations",children:e.jsxs("p",{children:["C++20 allows dynamic allocation in constexpr contexts (transient allocation), but all memory allocated during constexpr evaluation must be freed before the evaluation ends. You cannot store a constexpr ",e.jsx("code",{children:"std::vector"})," as a global variable because the heap memory would need to persist into runtime."]})}),e.jsx(i,{title:"Use constexpr by default",children:e.jsxs("p",{children:["Mark functions and variables ",e.jsx("code",{children:"constexpr"})," whenever possible. Even if you do not need compile-time evaluation today, it keeps the option open and documents that the function has no side effects. The compiler can also optimize constexpr-eligible calls more aggressively."]})}),e.jsx(a,{type:"tip",title:"consteval for guaranteed compile-time",children:e.jsxs("p",{children:["C++20 introduced ",e.jsx("code",{children:"consteval"})," for functions that ",e.jsx("em",{children:"must"})," be evaluated at compile time. Unlike ",e.jsx("code",{children:"constexpr"}),", a ",e.jsx("code",{children:"consteval"})," function cannot be called at runtime. Use it when a runtime call would be a programming error, such as computing hash values for string literals."]})}),e.jsx(l,{title:"Compile-Time Fibonacci",difficulty:"intermediate",prompt:"Write a constexpr function fibonacci(int n) that returns the nth Fibonacci number using a loop (not recursion). Verify with static_assert that fibonacci(10) == 55 and fibonacci(20) == 6765.",hints:["Use two variables to track the previous two Fibonacci numbers","A simple for loop from 2 to n works well","Remember: fibonacci(0) = 0, fibonacci(1) = 1"],solution:e.jsx(t,{children:`#include <iostream>

constexpr long long fibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    long long prev = 0, curr = 1;
    for (int i = 2; i <= n; ++i) {
        long long next = prev + curr;
        prev = curr;
        curr = next;
    }
    return curr;
}

static_assert(fibonacci(10) == 55);
static_assert(fibonacci(20) == 6765);

int main() {
    constexpr auto f10 = fibonacci(10);
    constexpr auto f20 = fibonacci(20);
    std::cout << "fib(10) = " << f10 << std::endl;
    std::cout << "fib(20) = " << f20 << std::endl;
    return 0;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"constexpr specifier",url:"https://en.cppreference.com/w/cpp/language/constexpr",description:"constexpr rules for variables and functions"},{type:"cppreference",title:"if constexpr",url:"https://en.cppreference.com/w/cpp/language/if#Constexpr_if",description:"Compile-time conditional statements"},{type:"cppreference",title:"consteval specifier",url:"https://en.cppreference.com/w/cpp/language/consteval",description:"Immediate functions (C++20)"}]})]})}const E=Object.freeze(Object.defineProperty({__proto__:null,default:T},Symbol.toStringTag,{value:"Module"}));export{k as a,S as b,N as c,z as d,q as e,A as f,F as g,P as h,R as i,I as j,E as k,C as s};
