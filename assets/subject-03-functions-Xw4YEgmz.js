import{j as e}from"./vendor-BlNF5je7.js";import{D as s,S as a,C as t,O as n,N as r,B as l,a as d,E as i,R as o,W as c}from"./subject-01-fundamentals-Co6V3RzB.js";function u(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["In C++, a function must be known to the compiler before it can be called. This is where the distinction between ",e.jsx("strong",{children:"declaration"})," and ",e.jsx("strong",{children:"definition"})," becomes essential. Understanding this separation is key to organizing larger programs across multiple files."]}),e.jsx(s,{title:"Declaration vs Definition",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"declaration"})," (also called a ",e.jsx("strong",{children:"prototype"}),") tells the compiler a function's name, return type, and parameter types — but not its body. A ",e.jsx("strong",{children:"definition"})," provides the actual implementation. A function can be declared many times but defined only once (the One Definition Rule)."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Function Signatures and Prototypes"}),e.jsxs(a,{title:"Declaration Syntax",children:[e.jsx("p",{children:"A function declaration includes the return type, function name, and parameter list, followed by a semicolon. Parameter names are optional in declarations."}),e.jsx(t,{children:`return_type function_name(param_type1, param_type2);
return_type function_name(param_type1 name1, param_type2 name2);  // names optional but helpful`})]}),e.jsx(t,{title:"Forward declaration example",children:`#include <iostream>

// Declaration (forward declaration / prototype)
int add(int a, int b);

int main() {
    std::cout << "3 + 4 = " << add(3, 4) << std::endl;
    return 0;
}

// Definition (appears after main)
int add(int a, int b) {
    return a + b;
}`}),e.jsx(n,{children:"3 + 4 = 7"}),e.jsx(r,{type:"info",title:"Why Forward Declare?",children:e.jsxs("p",{children:["Without the forward declaration above, the compiler would reach the call to ",e.jsx("code",{children:"add(3, 4)"})," inside ",e.jsx("code",{children:"main()"})," and report an error because it has not yet seen any function named ",e.jsx("code",{children:"add"}),". Forward declarations solve ordering problems and are required for mutually recursive functions."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Declarations in Header Files"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["In real projects, declarations live in header files (",e.jsx("code",{children:".h"})," or ",e.jsx("code",{children:".hpp"}),") and definitions live in source files (",e.jsx("code",{children:".cpp"}),"). This lets multiple source files share the same function by including the header."]}),e.jsx(t,{title:"math_utils.h",children:`#ifndef MATH_UTILS_H
#define MATH_UTILS_H

// Declarations only
int add(int a, int b);
int multiply(int a, int b);

#endif`}),e.jsx(t,{title:"math_utils.cpp",children:`#include "math_utils.h"

// Definitions
int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}`}),e.jsx(t,{title:"main.cpp",children:`#include <iostream>
#include "math_utils.h"

int main() {
    std::cout << "5 + 3 = " << add(5, 3) << std::endl;
    std::cout << "5 * 3 = " << multiply(5, 3) << std::endl;
    return 0;
}`}),e.jsx(n,{children:`5 + 3 = 8
5 * 3 = 15`}),e.jsx(r,{type:"important",title:"Include Guards",children:e.jsxs("p",{children:["The ",e.jsx("code",{children:"#ifndef"})," / ",e.jsx("code",{children:"#define"})," / ",e.jsx("code",{children:"#endif"})," pattern is an ",e.jsx("strong",{children:"include guard"}),". It prevents the header from being included more than once in the same translation unit, which would cause redefinition errors. Many compilers also support ",e.jsx("code",{children:"#pragma once"})," as a simpler alternative."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Linkage"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Functions have ",e.jsx("strong",{children:"external linkage"})," by default, meaning they can be called from other translation units. Marking a function ",e.jsx("code",{children:"static"})," gives it ",e.jsx("strong",{children:"internal linkage"}),", restricting it to the file where it is defined."]}),e.jsx(t,{title:"Internal linkage with static",children:`// helpers.cpp
static int square(int x) {
    return x * x;  // only visible within helpers.cpp
}

int doubleSquare(int x) {
    return 2 * square(x);  // OK: same file
}`}),e.jsx(l,{title:"Separate Declaration from Definition",children:e.jsxs("p",{children:["Place declarations in header files and definitions in ",e.jsx("code",{children:".cpp"})," files. This keeps compilation fast (only changed ",e.jsx("code",{children:".cpp"})," files need recompiling), enforces clear interfaces, and avoids multiple-definition linker errors."]})}),e.jsx(d,{compiler:"all",title:"One Definition Rule (ODR)",children:e.jsxs("p",{children:["If a function is defined in a header without being ",e.jsx("code",{children:"inline"}),", including that header in two ",e.jsx("code",{children:".cpp"})," files will produce a linker error for duplicate symbols. Mark such definitions ",e.jsx("code",{children:"inline"})," or move them to a ",e.jsx("code",{children:".cpp"})," file."]})}),e.jsx(i,{title:"Write a Forward Declaration",difficulty:"beginner",prompt:"Write a program where main() calls a function greet(std::string name) that prints 'Hello, <name>!'. Place the declaration before main and the definition after main.",hints:["The declaration needs #include <string> for std::string","Remember to end the declaration with a semicolon"],solution:e.jsx(t,{children:`#include <iostream>
#include <string>

void greet(std::string name);

int main() {
    greet("Alice");
    return 0;
}

void greet(std::string name) {
    std::cout << "Hello, " << name << "!" << std::endl;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"Function declarations",url:"https://en.cppreference.com/w/cpp/language/function",description:"Complete reference for function declaration syntax"},{type:"cppreference",title:"One Definition Rule",url:"https://en.cppreference.com/w/cpp/language/definition",description:"Rules governing definitions across translation units"},{type:"textbook",title:"Programming: Principles and Practice Using C++",author:"Bjarne Stroustrup",description:"Chapter 8: Functions"}]})]})}const v=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"}));function h(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"How you pass arguments to a function determines whether the function works on a copy of the data or on the original. C++ gives you fine-grained control over this, which is critical for both correctness and performance."}),e.jsx(s,{title:"Parameters vs Arguments",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"parameter"})," is the variable declared in a function's signature. An ",e.jsx("strong",{children:"argument"})," is the actual value passed when the function is called. The parameter passing mechanism determines how the argument's value reaches the parameter."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Pass by Value"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"By default, C++ copies the argument into the parameter. Changes to the parameter do not affect the original variable."}),e.jsx(t,{title:"Pass by value",children:`#include <iostream>

void doubleValue(int x) {
    x = x * 2;  // modifies the local copy only
    std::cout << "Inside function: " << x << std::endl;
}

int main() {
    int num = 5;
    doubleValue(num);
    std::cout << "After call: " << num << std::endl;
    return 0;
}`}),e.jsx(n,{children:`Inside function: 10
After call: 5`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Pass by Reference"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Adding ",e.jsx("code",{children:"&"})," after the type makes the parameter a reference to the original variable. No copy is made, and changes are visible to the caller."]}),e.jsx(t,{title:"Pass by reference",children:`#include <iostream>

void doubleValue(int& x) {
    x = x * 2;  // modifies the original
}

int main() {
    int num = 5;
    doubleValue(num);
    std::cout << "After call: " << num << std::endl;
    return 0;
}`}),e.jsx(n,{children:"After call: 10"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Pass by Const Reference"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["For large objects like ",e.jsx("code",{children:"std::string"})," or ",e.jsx("code",{children:"std::vector"}),", copying is expensive. Use ",e.jsx("code",{children:"const T&"})," to avoid the copy while preventing accidental modification."]}),e.jsx(t,{title:"Pass by const reference",children:`#include <iostream>
#include <string>

void printLength(const std::string& text) {
    std::cout << """ << text << "" has "
              << text.size() << " characters" << std::endl;
    // text[0] = 'X';  // ERROR: text is const
}

int main() {
    std::string greeting = "Hello, World!";
    printLength(greeting);
    return 0;
}`}),e.jsx(n,{children:'"Hello, World!" has 13 characters'}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Pass by Pointer"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Passing a pointer gives the function the address of the variable. The function can modify the original through the pointer, and the pointer itself can be ",e.jsx("code",{children:"nullptr"}),", which references cannot."]}),e.jsx(t,{title:"Pass by pointer",children:`#include <iostream>

void tryDouble(int* ptr) {
    if (ptr != nullptr) {
        *ptr = *ptr * 2;
    }
}

int main() {
    int num = 7;
    tryDouble(&num);
    std::cout << "After call: " << num << std::endl;

    tryDouble(nullptr);  // safe: function checks for null
    return 0;
}`}),e.jsx(n,{children:"After call: 14"}),e.jsxs(a,{title:"When to Use Which",children:[e.jsx("p",{children:"Use this decision guide for choosing a parameter passing style:"}),e.jsxs("ul",{className:"list-disc ml-6 mt-2 space-y-1",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Small types (int, double, char)"})," that are read-only: pass by value."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Large types (std::string, std::vector)"})," that are read-only: pass by ",e.jsx("code",{children:"const T&"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Any type the function must modify"}),": pass by reference (",e.jsx("code",{children:"T&"}),")."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Optional or nullable values"}),": pass by pointer (",e.jsx("code",{children:"T*"}),")."]})]})]}),e.jsx(l,{title:"Prefer const Reference for Large Objects",children:e.jsxs("p",{children:["Passing a ",e.jsx("code",{children:"std::string"})," by value copies every character. For a read-only parameter, ",e.jsx("code",{children:"const std::string&"})," avoids the copy entirely with no risk of accidental modification. This is one of the most common C++ best practices."]})}),e.jsx(r,{type:"tip",title:"References Cannot Be Null",children:e.jsxs("p",{children:["Unlike pointers, a reference must always refer to a valid object. This makes references safer and simpler to use when ",e.jsx("code",{children:"nullptr"})," is not a meaningful value."]})}),e.jsx(i,{title:"Swap Two Integers",difficulty:"beginner",prompt:"Write a function swap(int& a, int& b) that swaps two integers. Demonstrate it in main() by printing the values before and after the swap.",hints:["You need a temporary variable to hold one value during the swap","Pass by reference so the swap is visible in main()"],solution:e.jsx(t,{children:`#include <iostream>

void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 10, y = 20;
    std::cout << "Before: x=" << x << " y=" << y << std::endl;
    swap(x, y);
    std::cout << "After:  x=" << x << " y=" << y << std::endl;
    return 0;
}`})}),e.jsx(i,{title:"Normalize a String",difficulty:"intermediate",prompt:"Write a function that takes a const std::string& and returns a new std::string with all characters converted to lowercase. Why should the parameter be const reference?",hints:["Use std::tolower() from <cctype> to convert each character","The parameter is const reference because we read the string without modifying it and avoid copying"],solution:e.jsx(t,{children:`#include <iostream>
#include <string>
#include <cctype>

std::string toLower(const std::string& input) {
    std::string result = input;
    for (char& c : result) {
        c = std::tolower(static_cast<unsigned char>(c));
    }
    return result;
}

int main() {
    std::string text = "Hello, C++ World!";
    std::cout << toLower(text) << std::endl;
    return 0;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"References",url:"https://en.cppreference.com/w/cpp/language/reference",description:"Lvalue and rvalue reference documentation"},{type:"cppreference",title:"Pointer declaration",url:"https://en.cppreference.com/w/cpp/language/pointer",description:"Pointer types and syntax"},{type:"textbook",title:"A Tour of C++",author:"Bjarne Stroustrup",description:"Chapter 1: The Basics — parameter passing"}]})]})}const w=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"}));function p(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["A function's return type specifies what kind of value it sends back to the caller. C++ offers several ways to return data, from simple values and references to modern features like ",e.jsx("code",{children:"auto"})," deduction and structured bindings for multiple return values."]}),e.jsx(s,{title:"Return Statement",children:e.jsxs("p",{children:["The ",e.jsx("code",{children:"return"})," statement exits the function and optionally provides a value matching the declared return type. A function declared ",e.jsx("code",{children:"void"})," returns nothing. Control flow must reach a ",e.jsx("code",{children:"return"})," in every code path for non-void functions."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Returning Values"}),e.jsx(t,{title:"Returning a value",children:`#include <iostream>

int square(int n) {
    return n * n;
}

int main() {
    int result = square(7);
    std::cout << "7 squared = " << result << std::endl;
    return 0;
}`}),e.jsx(n,{children:"7 squared = 49"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Void Functions"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Functions that perform an action without producing a result use ",e.jsx("code",{children:"void"})," as the return type. You may use a bare ",e.jsx("code",{children:"return;"})," to exit early but cannot return a value."]}),e.jsx(t,{title:"Void function",children:`#include <iostream>

void printDivider(int width) {
    for (int i = 0; i < width; ++i) {
        std::cout << '-';
    }
    std::cout << std::endl;
}

int main() {
    printDivider(20);
    std::cout << "  Section Title" << std::endl;
    printDivider(20);
    return 0;
}`}),e.jsx(n,{children:`--------------------
  Section Title
--------------------`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Returning References"}),e.jsx(c,{title:"Danger: Returning References to Local Variables",children:e.jsxs("p",{children:["Returning a reference to a local variable creates a ",e.jsx("strong",{children:"dangling reference"}),". The local is destroyed when the function exits, leaving the reference pointing to invalid memory. This is undefined behavior."]})}),e.jsx(t,{title:"Safe vs unsafe reference returns",children:`#include <iostream>
#include <vector>

// SAFE: returns reference to element that outlives the function
int& elementAt(std::vector<int>& vec, int index) {
    return vec[index];
}

// UNSAFE: returns reference to a local variable — undefined behavior!
// int& broken() {
//     int local = 42;
//     return local;  // dangling reference!
// }

int main() {
    std::vector<int> nums = {10, 20, 30};
    elementAt(nums, 1) = 99;  // modifies nums[1] directly
    std::cout << "nums[1] = " << nums[1] << std::endl;
    return 0;
}`}),e.jsx(n,{children:"nums[1] = 99"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Auto Return Type Deduction (C++14)"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Since C++14, you can use ",e.jsx("code",{children:"auto"})," as the return type and let the compiler deduce it from the ",e.jsx("code",{children:"return"})," statement."]}),e.jsx(t,{title:"auto return type",children:`#include <iostream>

auto multiply(double a, double b) {
    return a * b;  // compiler deduces return type as double
}

int main() {
    std::cout << "3.5 * 2.0 = " << multiply(3.5, 2.0) << std::endl;
    return 0;
}`}),e.jsx(n,{children:"3.5 * 2.0 = 7"}),e.jsx(d,{compiler:"all",title:"C++14 Required",children:e.jsxs("p",{children:["Auto return type deduction requires the ",e.jsx("code",{children:"-std=c++14"})," flag (or later). If all return statements produce different types, the program is ill-formed."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Returning Multiple Values"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++ functions return a single value, but you can use ",e.jsx("code",{children:"std::pair"}),",",e.jsx("code",{children:"std::tuple"}),", or a struct to package multiple values. C++17 structured bindings make unpacking them clean and readable."]}),e.jsx(t,{title:"std::pair and structured bindings",children:`#include <iostream>
#include <utility>
#include <string>

std::pair<int, std::string> findOldest() {
    return {42, "Alice"};
}

int main() {
    // C++17 structured bindings
    auto [age, name] = findOldest();
    std::cout << name << " is " << age << " years old" << std::endl;

    // Without structured bindings (pre-C++17)
    auto result = findOldest();
    std::cout << result.second << " is " << result.first << std::endl;
    return 0;
}`}),e.jsx(n,{children:`Alice is 42 years old
Alice is 42`}),e.jsx(r,{type:"tip",title:"Prefer Structs for Named Fields",children:e.jsxs("p",{children:["When returning more than two values, a named struct is clearer than ",e.jsx("code",{children:"std::tuple"}),". Fields like ",e.jsx("code",{children:"result.name"})," are self-documenting, whereas ",e.jsx("code",{children:"std::get<0>(result)"})," is not."]})}),e.jsx(l,{title:"Return by Value for Most Cases",children:e.jsxs("p",{children:["Modern compilers apply ",e.jsx("strong",{children:"copy elision"})," (and Named Return Value Optimization), so returning objects by value is efficient. Avoid returning references or pointers unless the referenced object is guaranteed to outlive the caller."]})}),e.jsx(i,{title:"Min and Max",difficulty:"intermediate",prompt:"Write a function that takes a std::vector<int> by const reference and returns both the minimum and maximum values as a std::pair<int, int>. Use structured bindings to unpack the result in main().",hints:["Initialize min and max to the first element of the vector","Use std::pair or std::make_pair to return two values","Compile with -std=c++17 for structured bindings"],solution:e.jsx(t,{children:`#include <iostream>
#include <vector>
#include <utility>

std::pair<int, int> minMax(const std::vector<int>& v) {
    int lo = v[0], hi = v[0];
    for (int x : v) {
        if (x < lo) lo = x;
        if (x > hi) hi = x;
    }
    return {lo, hi};
}

int main() {
    std::vector<int> data = {3, 7, 1, 9, 4};
    auto [lo, hi] = minMax(data);
    std::cout << "Min: " << lo << ", Max: " << hi << std::endl;
    return 0;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"std::pair",url:"https://en.cppreference.com/w/cpp/utility/pair",description:"Pair class template for two-value returns"},{type:"cppreference",title:"std::tuple",url:"https://en.cppreference.com/w/cpp/utility/tuple",description:"Tuple class template for multi-value returns"},{type:"cppreference",title:"Structured bindings",url:"https://en.cppreference.com/w/cpp/language/structured_binding",description:"C++17 structured binding declarations"}]})]})}const k=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"}));function m(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++ allows multiple functions to share the same name as long as their parameter lists differ. This feature, called ",e.jsx("strong",{children:"function overloading"}),", lets you provide a single intuitive name for operations that work on different types or numbers of arguments."]}),e.jsx(s,{title:"Function Overloading",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Function overloading"})," means defining two or more functions with the same name but different parameter types or counts. The compiler selects the best match at compile time based on the arguments provided. The return type alone is ",e.jsx("em",{children:"not"})," enough to distinguish overloads."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic Overloading"}),e.jsx(t,{title:"Overloaded print function",children:`#include <iostream>
#include <string>

void print(int value) {
    std::cout << "Integer: " << value << std::endl;
}

void print(double value) {
    std::cout << "Double: " << value << std::endl;
}

void print(const std::string& value) {
    std::cout << "String: " << value << std::endl;
}

int main() {
    print(42);
    print(3.14);
    print(std::string("hello"));
    return 0;
}`}),e.jsx(n,{children:`Integer: 42
Double: 3.14
String: hello`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Overload Resolution"}),e.jsxs(a,{title:"How the Compiler Chooses",children:[e.jsx("p",{children:"The compiler follows a priority order when matching a call to an overload:"}),e.jsxs("ol",{className:"list-decimal ml-6 mt-2 space-y-1",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Exact match"})," — no conversion needed."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Promotion"})," — e.g., ",e.jsx("code",{children:"int"})," to ",e.jsx("code",{children:"long"}),", ",e.jsx("code",{children:"float"})," to ",e.jsx("code",{children:"double"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Standard conversion"})," — e.g., ",e.jsx("code",{children:"int"})," to ",e.jsx("code",{children:"double"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"User-defined conversion"})," — via converting constructors or conversion operators."]})]}),e.jsxs("p",{className:"mt-2",children:["If two overloads tie at the same priority level, the call is ",e.jsx("strong",{children:"ambiguous"})," and the compiler reports an error."]})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Ambiguous Calls"}),e.jsx(t,{title:"Ambiguity example",children:`#include <iostream>

void process(int x) {
    std::cout << "int: " << x << std::endl;
}

void process(double x) {
    std::cout << "double: " << x << std::endl;
}

int main() {
    process(10);     // OK: exact match to int
    process(3.14);   // OK: exact match to double
    // process(3.14f);  // AMBIGUOUS: float promotes to double
                        // but can also convert to int
    process(static_cast<double>(3.14f));  // OK: explicit cast resolves it
    return 0;
}`}),e.jsx(n,{children:`int: 10
double: 3.14
double: 3.14`}),e.jsx(c,{title:"Avoid Ambiguous Overload Sets",children:e.jsx("p",{children:"If you see a compiler error about ambiguous overload resolution, consider adding an overload for the exact type, or use an explicit cast at the call site. Do not rely on implicit conversions across multiple overloads."})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Const Overloading"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Member functions can be overloaded on ",e.jsx("code",{children:"const"})," qualification. A ",e.jsx("code",{children:"const"})," object calls the ",e.jsx("code",{children:"const"})," overload; a non-const object calls the non-const overload."]}),e.jsx(t,{title:"Const member function overload",children:`#include <iostream>
#include <string>

class TextBuffer {
    std::string data_;
public:
    TextBuffer(const std::string& s) : data_(s) {}

    char& at(int index) {
        std::cout << "(mutable access) ";
        return data_[index];
    }

    const char& at(int index) const {
        std::cout << "(const access) ";
        return data_[index];
    }
};

int main() {
    TextBuffer buf("Hello");
    buf.at(0) = 'J';  // calls non-const version
    std::cout << buf.at(0) << std::endl;

    const TextBuffer cbuf("World");
    std::cout << cbuf.at(0) << std::endl;  // calls const version
    return 0;
}`}),e.jsx(n,{children:`(mutable access) (mutable access) J
(const access) W`}),e.jsx(r,{type:"history",title:"Name Mangling",children:e.jsxs("p",{children:["The linker needs unique names for each overload. C++ compilers use ",e.jsx("strong",{children:"name mangling"})," to encode the function name and parameter types into a unique symbol. For example, ",e.jsx("code",{children:"print(int)"})," might become ",e.jsx("code",{children:"_Z5printi"})," while",e.jsx("code",{children:"print(double)"})," becomes ",e.jsx("code",{children:"_Z5printd"}),". This is why ",e.jsx("code",{children:'extern "C"'})," is needed when linking C++ functions with C code — C has no name mangling."]})}),e.jsx(l,{title:"Overload for Clarity, Not Cleverness",children:e.jsx("p",{children:"Only overload functions when they perform the same logical operation on different types. If overloads do fundamentally different things, give them different names. Good overloading makes code read naturally; bad overloading creates confusion."})}),e.jsx(i,{title:"Overload an area() Function",difficulty:"beginner",prompt:"Write three overloads of a function called area: one that takes a single double (radius of a circle), one that takes two doubles (width and height of a rectangle), and one that takes three doubles (sides of a triangle using Heron's formula). Print results in main().",hints:["Circle area: pi * r * r (use 3.14159265 for pi)","Rectangle area: width * height","Heron's formula: s = (a+b+c)/2, area = sqrt(s*(s-a)*(s-b)*(s-c))","Include <cmath> for std::sqrt"],solution:e.jsx(t,{children:`#include <iostream>
#include <cmath>

double area(double radius) {
    return 3.14159265 * radius * radius;
}

double area(double width, double height) {
    return width * height;
}

double area(double a, double b, double c) {
    double s = (a + b + c) / 2.0;
    return std::sqrt(s * (s - a) * (s - b) * (s - c));
}

int main() {
    std::cout << "Circle (r=5): " << area(5.0) << std::endl;
    std::cout << "Rectangle (3x4): " << area(3.0, 4.0) << std::endl;
    std::cout << "Triangle (3,4,5): " << area(3.0, 4.0, 5.0) << std::endl;
    return 0;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"Overload resolution",url:"https://en.cppreference.com/w/cpp/language/overload_resolution",description:"Detailed rules for resolving overloaded function calls"},{type:"cppreference",title:"Function overloading",url:"https://en.cppreference.com/w/cpp/language/overloaded_address",description:"Address of overloaded function"},{type:"textbook",title:"The C++ Programming Language",author:"Bjarne Stroustrup",description:"Chapter 12: Functions — overloading"}]})]})}const T=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"}));function x(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Default arguments let you call a function with fewer arguments than it has parameters. When an argument is omitted, the compiler substitutes the default value specified in the function declaration. This reduces the need for multiple overloads that differ only in the number of parameters."}),e.jsx(s,{title:"Default Arguments",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"default argument"})," is a value provided in a function's declaration that the compiler uses when the caller does not supply that argument. Default arguments must appear at the ",e.jsx("em",{children:"end"})," of the parameter list — you cannot skip a parameter in the middle."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic Usage"}),e.jsx(t,{title:"Default arguments",children:`#include <iostream>
#include <string>

void greet(const std::string& name, const std::string& greeting = "Hello") {
    std::cout << greeting << ", " << name << "!" << std::endl;
}

int main() {
    greet("Alice");              // uses default greeting
    greet("Bob", "Good morning"); // overrides default
    return 0;
}`}),e.jsx(n,{children:`Hello, Alice!
Good morning, Bob!`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Rules for Default Arguments"}),e.jsxs(a,{title:"Rightmost Parameters Only",children:[e.jsx("p",{children:"Default arguments must be specified from right to left with no gaps. Once a parameter has a default, every parameter to its right must also have a default."}),e.jsx(t,{children:`// Valid
void f(int a, int b = 10, int c = 20);

// Invalid — gap in defaults
// void g(int a = 1, int b, int c = 3);  // ERROR`})]}),e.jsx(t,{title:"Multiple defaults",children:`#include <iostream>

void drawBox(int width = 10, int height = 5, char fill = '*') {
    for (int r = 0; r < height; ++r) {
        for (int c = 0; c < width; ++c) {
            std::cout << fill;
        }
        std::cout << '
';
    }
}

int main() {
    std::cout << "Default box:" << std::endl;
    drawBox();

    std::cout << "
Custom box:" << std::endl;
    drawBox(6, 3, '#');
    return 0;
}`}),e.jsx(n,{children:`Default box:
**********
**********
**********
**********
**********

Custom box:
######
######
######`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Declaration vs Definition"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["When a function has both a declaration (in a header) and a definition (in a source file), the default arguments should appear only in the ",e.jsx("strong",{children:"declaration"}),". Specifying them in both places is a compiler error."]}),e.jsx(t,{title:"logger.h — defaults in declaration",children:`#ifndef LOGGER_H
#define LOGGER_H

#include <string>

void log(const std::string& message, int level = 0);  // default here

#endif`}),e.jsx(t,{title:"logger.cpp — no defaults in definition",children:`#include <iostream>
#include "logger.h"

void log(const std::string& message, int level) {  // no default here
    std::cout << "[Level " << level << "] " << message << std::endl;
}`}),e.jsx(r,{type:"important",title:"One Place Only",children:e.jsx("p",{children:"A default argument can only be specified once per scope. If you write the default in both the declaration and the definition, the compiler will reject it. Always prefer putting defaults in the declaration so that every caller sees them."})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Interaction with Overloading"}),e.jsx(c,{title:"Ambiguity with Overloads",children:e.jsx("p",{children:"Default arguments can create ambiguity with overloaded functions. If an overload and a default-argument version both match a call, the compiler cannot choose between them."})}),e.jsx(t,{title:"Ambiguity example",children:`#include <iostream>

void display(int x) {
    std::cout << "One arg: " << x << std::endl;
}

void display(int x, int y = 100) {
    std::cout << "Two args: " << x << ", " << y << std::endl;
}

int main() {
    // display(5);   // ERROR: ambiguous — matches both overloads
    display(5, 10);  // OK: only matches the two-parameter version
    return 0;
}`}),e.jsx(n,{children:"Two args: 5, 10"}),e.jsx(l,{title:"Prefer Defaults Over Trivial Overloads",children:e.jsxs("p",{children:["When multiple overloads differ only by the presence of trailing parameters with obvious default values, a single function with defaults is simpler and easier to maintain. Use overloading when the parameter ",e.jsx("em",{children:"types"})," differ, and default arguments when only the ",e.jsx("em",{children:"count"})," varies with sensible defaults."]})}),e.jsx(r,{type:"tip",title:"Default Arguments Are Evaluated at the Call Site",children:e.jsx("p",{children:"Default argument expressions are evaluated each time the function is called, not once at definition time. This means you can use function calls as defaults, though this is rare and can hurt readability."})}),e.jsx(i,{title:"Configurable Greeting",difficulty:"beginner",prompt:"Write a function formatName(std::string first, std::string last, std::string title = 'Mr.', bool formal = true) that returns a formatted name. If formal is true, return 'Title Last' (e.g., 'Mr. Smith'). Otherwise return 'First Last' (e.g., 'John Smith').",hints:["Use an if statement to check the formal flag","Return a std::string by value","Remember: defaults go from right to left"],solution:e.jsx(t,{children:`#include <iostream>
#include <string>

std::string formatName(std::string first, std::string last,
                       std::string title = "Mr.", bool formal = true) {
    if (formal) {
        return title + " " + last;
    }
    return first + " " + last;
}

int main() {
    std::cout << formatName("John", "Smith") << std::endl;
    std::cout << formatName("Jane", "Doe", "Dr.") << std::endl;
    std::cout << formatName("Bob", "Jones", "Mr.", false) << std::endl;
    return 0;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"Default arguments",url:"https://en.cppreference.com/w/cpp/language/default_arguments",description:"Rules and examples for default function arguments"},{type:"textbook",title:"The C++ Programming Language",author:"Bjarne Stroustrup",description:"Chapter 12: Functions — default arguments"}]})]})}const C=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"}));function f(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["A ",e.jsx("strong",{children:"recursive function"})," is one that calls itself. Recursion is a powerful technique for problems that can be broken into smaller instances of the same problem, such as tree traversal, divide-and-conquer algorithms, and mathematical sequences."]}),e.jsx(s,{title:"Recursion",children:e.jsxs("p",{children:["A function is ",e.jsx("strong",{children:"recursive"})," when it calls itself, directly or indirectly. Every correct recursive function needs a ",e.jsx("strong",{children:"base case"})," (a condition that stops the recursion) and a ",e.jsx("strong",{children:"recursive case"})," (the step that reduces the problem and makes the recursive call)."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Factorial"}),e.jsxs(a,{title:"Structure of a Recursive Function",children:[e.jsx("p",{children:"Every recursive function follows the same pattern: check for the base case first, then make a recursive call on a smaller sub-problem."}),e.jsx(t,{children:`return_type func(params) {
    if (base_case_condition) {
        return base_value;       // stop recursion
    }
    return combine(func(smaller_params));  // recursive step
}`})]}),e.jsx(t,{title:"Factorial",children:`#include <iostream>

long long factorial(int n) {
    if (n <= 1) {        // base case
        return 1;
    }
    return n * factorial(n - 1);  // recursive case
}

int main() {
    for (int i = 0; i <= 10; ++i) {
        std::cout << i << "! = " << factorial(i) << std::endl;
    }
    return 0;
}`}),e.jsx(n,{children:`0! = 1
1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
6! = 720
7! = 5040
8! = 40320
9! = 362880
10! = 3628800`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Fibonacci"}),e.jsx(t,{title:"Naive Fibonacci (exponential time)",children:`#include <iostream>

int fibonacci(int n) {
    if (n <= 0) return 0;  // base case 1
    if (n == 1) return 1;  // base case 2
    return fibonacci(n - 1) + fibonacci(n - 2);  // two recursive calls
}

int main() {
    for (int i = 0; i <= 10; ++i) {
        std::cout << "fib(" << i << ") = " << fibonacci(i) << std::endl;
    }
    return 0;
}`}),e.jsx(n,{children:`fib(0) = 0
fib(1) = 1
fib(2) = 1
fib(3) = 2
fib(4) = 3
fib(5) = 5
fib(6) = 8
fib(7) = 13
fib(8) = 21
fib(9) = 34
fib(10) = 55`}),e.jsx(c,{title:"Exponential Blowup",children:e.jsxs("p",{children:["The naive Fibonacci implementation recomputes the same values many times.",e.jsx("code",{children:"fibonacci(30)"})," makes over a million calls. For production use, prefer iteration or memoization."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Stack Depth Limits"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Each recursive call adds a ",e.jsx("strong",{children:"stack frame"})," containing local variables and the return address. The call stack has a finite size (typically 1-8 MB), so very deep recursion causes a ",e.jsx("strong",{children:"stack overflow"})," — a crash with no graceful recovery."]}),e.jsx(r,{type:"important",title:"Always Have a Base Case",children:e.jsx("p",{children:"Forgetting the base case creates infinite recursion. The program will crash with a stack overflow or a segmentation fault. Always verify that the recursive case makes progress toward the base case."})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Tail Recursion"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["A function is ",e.jsx("strong",{children:"tail recursive"})," when the recursive call is the very last operation. Some compilers can optimize tail recursion into a loop, eliminating extra stack frames. However, C++ does not guarantee tail-call optimization."]}),e.jsx(t,{title:"Tail-recursive factorial",children:`#include <iostream>

long long factorialTail(int n, long long acc = 1) {
    if (n <= 1) return acc;
    return factorialTail(n - 1, n * acc);  // tail position
}

int main() {
    std::cout << "10! = " << factorialTail(10) << std::endl;
    std::cout << "20! = " << factorialTail(20) << std::endl;
    return 0;
}`}),e.jsx(n,{children:`10! = 3628800
20! = 2432902008176640000`}),e.jsx(d,{compiler:"gcc",title:"Tail Call Optimization",children:e.jsxs("p",{children:["GCC can optimize tail calls at ",e.jsx("code",{children:"-O2"})," and above. Clang also supports this. However, MSVC rarely performs tail-call optimization. Since C++ does not mandate it, do not rely on it for correctness — if stack depth is a concern, use iteration."]})}),e.jsx(l,{title:"When to Prefer Iteration",children:e.jsx("p",{children:"Use recursion for problems with natural recursive structure (trees, graphs, parsing). For simple counting or accumulation (factorial, Fibonacci), an iterative loop is clearer, faster, and immune to stack overflow. When in doubt, start with iteration and switch to recursion only if it simplifies the code significantly."})}),e.jsx(i,{title:"Recursive Sum of Digits",difficulty:"intermediate",prompt:"Write a recursive function sumDigits(int n) that returns the sum of all digits in a non-negative integer. For example, sumDigits(1234) returns 10.",hints:["Base case: when n < 10, return n (it is a single digit)","Recursive case: the last digit is n % 10, the remaining digits are n / 10"],solution:e.jsx(t,{children:`#include <iostream>

int sumDigits(int n) {
    if (n < 10) return n;             // base case: single digit
    return (n % 10) + sumDigits(n / 10);  // last digit + rest
}

int main() {
    std::cout << "sumDigits(1234) = " << sumDigits(1234) << std::endl;
    std::cout << "sumDigits(9999) = " << sumDigits(9999) << std::endl;
    std::cout << "sumDigits(7)    = " << sumDigits(7) << std::endl;
    return 0;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"Function definitions",url:"https://en.cppreference.com/w/cpp/language/function",description:"Function definition and recursive calls"},{type:"textbook",title:"Programming: Principles and Practice Using C++",author:"Bjarne Stroustrup",description:"Chapter 8: Functions — recursion"},{type:"textbook",title:"Introduction to Algorithms",author:"Cormen, Leiserson, Rivest, Stein",description:"Chapter 4: Divide-and-Conquer and recursion"}]})]})}const N=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"}));function g(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["In C++, functions have addresses in memory just like variables. A ",e.jsx("strong",{children:"function pointer"})," stores the address of a function, allowing you to pass functions as arguments, store them in data structures, and call them indirectly. This is the foundation of the ",e.jsx("strong",{children:"callback pattern"}),"."]}),e.jsx(s,{title:"Function Pointer",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"function pointer"})," is a variable that holds the address of a function. Its type encodes the function's return type and parameter types. Through a function pointer, you can invoke the pointed-to function at runtime."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Syntax"}),e.jsxs(a,{title:"Declaring a Function Pointer",children:[e.jsx("p",{children:"The syntax uses parentheses around the pointer name to distinguish it from a function that returns a pointer."}),e.jsx(t,{children:`// Pointer to a function taking (int, int) and returning int
int (*operation)(int, int);

// Compare with: a function returning int*
// int* operation(int, int);  // different meaning!`})]}),e.jsx(t,{title:"Basic function pointer usage",children:`#include <iostream>

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
}`}),e.jsx(n,{children:`add: 13
sub: 7
mul: 30`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"The Callback Pattern"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"A callback is a function passed as an argument to another function. The receiving function calls it back at the appropriate time. This pattern decouples the algorithm from the specific operation."}),e.jsx(t,{title:"Callback example",children:`#include <iostream>
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
}`}),e.jsx(n,{children:`2 4 6 8 10
-2 -4 -6 -8 -10`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Simplifying with typedef and using"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Function pointer syntax is notoriously hard to read. Use ",e.jsx("code",{children:"typedef"})," or the modern ",e.jsx("code",{children:"using"})," alias to give the type a readable name."]}),e.jsx(t,{title:"Type aliases for function pointers",children:`#include <iostream>

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
}`}),e.jsx(n,{children:`Result: 8
Result: 15`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::function — The Modern Alternative"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"std::function"})," from ",e.jsx("code",{children:"<functional>"})," is a type-erased wrapper that can hold any callable: function pointers, lambdas, functors, or bound member functions. It has a small runtime cost but is far more flexible."]}),e.jsx(t,{title:"std::function",children:`#include <iostream>
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
}`}),e.jsx(n,{children:`Hello! Hello! Hello!
World! World!`}),e.jsx(r,{type:"tip",title:"Function Pointers vs std::function",children:e.jsxs("p",{children:["Use raw function pointers for simple C-style callbacks or when zero overhead is required. Use ",e.jsx("code",{children:"std::function"})," when you need to store lambdas with captures or want a uniform callable interface. For template-heavy code, accept callables as template parameters for maximum performance."]})}),e.jsx(l,{title:"Use Type Aliases for Function Pointer Types",children:e.jsxs("p",{children:["Never write raw function pointer types in parameter lists or return types. A",e.jsx("code",{children:"using"})," alias like ",e.jsx("code",{children:"using Callback = void(*)(int)"})," is dramatically more readable and reduces errors from misplaced parentheses."]})}),e.jsx(i,{title:"Sorting with a Comparator",difficulty:"intermediate",prompt:"Write a function sortArray that takes a std::vector<int>& and a comparison function pointer bool(*)(int, int). Implement a simple bubble sort using the comparator. Demonstrate it with ascending and descending comparators.",hints:["The comparator returns true if the first argument should come before the second","In bubble sort, swap adjacent elements when they are in the wrong order","For ascending: return a < b; For descending: return a > b"],solution:e.jsx(t,{children:`#include <iostream>
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
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"Pointer to function",url:"https://en.cppreference.com/w/cpp/language/pointer#Pointers_to_functions",description:"Function pointer syntax and semantics"},{type:"cppreference",title:"std::function",url:"https://en.cppreference.com/w/cpp/utility/functional/function",description:"General-purpose polymorphic function wrapper"},{type:"textbook",title:"The C++ Programming Language",author:"Bjarne Stroustrup",description:"Chapter 12: Functions — pointers to functions"}]})]})}const A=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"}));function y(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Lambdas are anonymous functions you can define inline, right where they are needed. Introduced in C++11 and enhanced in every subsequent standard, lambdas have become the idiomatic way to write short callbacks, custom comparators, and local helper functions in modern C++."}),e.jsx(s,{title:"Lambda Expression",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"lambda"})," is an unnamed function object defined with the syntax ",e.jsxs("code",{children:["[capture](parameters) -> return_type ","{ body }"]}),". The compiler generates a unique closure type behind the scenes. Lambdas can capture variables from their enclosing scope, making them more powerful than plain function pointers."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic Syntax"}),e.jsxs(a,{title:"Lambda Syntax",children:[e.jsx("p",{children:"A lambda has four parts. The return type and parameter list are optional."}),e.jsx(t,{children:`[capture_list](parameter_list) -> return_type {
    // body
};

// Minimal lambda:
[]() { std::cout << "hello"; };

// With parameters and deduced return type:
[](int a, int b) { return a + b; };`})]}),e.jsx(t,{title:"Lambda basics",children:`#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> nums = {5, 2, 8, 1, 9, 3};

    // Sort descending using a lambda comparator
    std::sort(nums.begin(), nums.end(),
              [](int a, int b) { return a > b; });

    for (int n : nums) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    return 0;
}`}),e.jsx(n,{children:"9 8 5 3 2 1"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Capture Modes"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The capture list controls which variables from the enclosing scope the lambda can access and whether they are captured by value (copied) or by reference."}),e.jsx(t,{title:"Capture by value vs reference",children:`#include <iostream>

int main() {
    int x = 10;
    int y = 20;

    // Capture x by value, y by reference
    auto fn = [x, &y]() {
        // x is a copy — cannot modify the original
        // y is a reference — modifying y changes the original
        std::cout << "x=" << x << " y=" << y << std::endl;
        y = 99;  // modifies the outer y
    };

    fn();
    std::cout << "After lambda: y=" << y << std::endl;
    return 0;
}`}),e.jsx(n,{children:`x=10 y=20
After lambda: y=99`}),e.jsx(a,{title:"Capture Reference",children:e.jsxs("ul",{className:"list-disc ml-6 space-y-1",children:[e.jsxs("li",{children:[e.jsx("code",{children:"[x]"})," — capture ",e.jsx("code",{children:"x"})," by value (copy)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"[&x]"})," — capture ",e.jsx("code",{children:"x"})," by reference."]}),e.jsxs("li",{children:[e.jsx("code",{children:"[=]"})," — capture all used variables by value."]}),e.jsxs("li",{children:[e.jsx("code",{children:"[&]"})," — capture all used variables by reference."]}),e.jsxs("li",{children:[e.jsx("code",{children:"[=, &x]"})," — capture all by value, but ",e.jsx("code",{children:"x"})," by reference."]}),e.jsxs("li",{children:[e.jsx("code",{children:"[&, x]"})," — capture all by reference, but ",e.jsx("code",{children:"x"})," by value."]})]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Mutable Lambdas"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["By default, a lambda's call operator is ",e.jsx("code",{children:"const"}),", so variables captured by value cannot be modified inside the body. The ",e.jsx("code",{children:"mutable"})," keyword removes this restriction."]}),e.jsx(t,{title:"Mutable lambda",children:`#include <iostream>

int main() {
    int counter = 0;

    auto increment = [counter]() mutable {
        ++counter;  // modifies the lambda's internal copy
        return counter;
    };

    std::cout << increment() << std::endl;  // 1
    std::cout << increment() << std::endl;  // 2
    std::cout << "Original counter: " << counter << std::endl;  // still 0
    return 0;
}`}),e.jsx(n,{children:`1
2
Original counter: 0`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Generic Lambdas (C++14)"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["In C++14, lambda parameters can use ",e.jsx("code",{children:"auto"}),", creating a generic (template-like) lambda that works with any type."]}),e.jsx(t,{title:"Generic lambda",children:`#include <iostream>
#include <string>

int main() {
    auto print = [](const auto& value) {
        std::cout << value << std::endl;
    };

    print(42);
    print(3.14);
    print(std::string("hello"));
    return 0;
}`}),e.jsx(n,{children:`42
3.14
hello`}),e.jsx(d,{compiler:"all",title:"C++14 for auto Parameters",children:e.jsxs("p",{children:["Generic lambdas with ",e.jsx("code",{children:"auto"})," parameters require ",e.jsx("code",{children:"-std=c++14"})," or later. In C++20, you can also use explicit template parameter lists on lambdas: ",e.jsxs("code",{children:["[]<typename T>(T x) ","{ ... }"]}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Storing Lambdas with std::function"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Each lambda has a unique compiler-generated type, so you cannot name it directly. Use ",e.jsx("code",{children:"auto"})," for local variables or ",e.jsx("code",{children:"std::function"})," when you need to store lambdas in containers or pass them across API boundaries."]}),e.jsx(t,{title:"Lambda in std::function",children:`#include <iostream>
#include <functional>

std::function<int(int)> makeMultiplier(int factor) {
    return [factor](int x) { return x * factor; };
}

int main() {
    auto triple = makeMultiplier(3);
    auto tenX = makeMultiplier(10);

    std::cout << "triple(5) = " << triple(5) << std::endl;
    std::cout << "tenX(5)   = " << tenX(5) << std::endl;
    return 0;
}`}),e.jsx(n,{children:`triple(5) = 15
tenX(5)   = 50`}),e.jsx(r,{type:"tip",title:"IIFE — Immediately Invoked Function Expression",children:e.jsxs("p",{children:["You can define and call a lambda in one expression. This is useful for initializing complex const variables: ",e.jsxs("code",{children:["const auto x = [&]() ","{ /* compute */ return value; }","();"]}),". The trailing ",e.jsx("code",{children:"()"})," invokes the lambda immediately."]})}),e.jsx(c,{title:"Dangling Reference Captures",children:e.jsx("p",{children:"If a lambda captures a local variable by reference and outlives that variable (for example, returned from a function), the reference dangles. Capture by value or ensure the lambda does not escape the variable's scope."})}),e.jsx(l,{title:"Prefer Lambdas Over Function Pointers",children:e.jsx("p",{children:"Lambdas are more readable, can capture context, and the compiler can often inline them for better performance. Use lambdas for short callbacks and predicates. Only fall back to function pointers for C API interop or when captures are not needed."})}),e.jsx(i,{title:"Filter a Vector",difficulty:"intermediate",prompt:"Write a function filter that takes a std::vector<int> and a predicate (std::function<bool(int)>) and returns a new vector containing only elements for which the predicate returns true. Demonstrate it with a lambda that keeps only even numbers.",hints:["The filter function iterates through the input and pushes matching elements to a result vector","An even-number predicate: [](int x) { return x % 2 == 0; }"],solution:e.jsx(t,{children:`#include <iostream>
#include <vector>
#include <functional>

std::vector<int> filter(const std::vector<int>& vec,
                        std::function<bool(int)> pred) {
    std::vector<int> result;
    for (int x : vec) {
        if (pred(x)) {
            result.push_back(x);
        }
    }
    return result;
}

int main() {
    std::vector<int> nums = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    auto evens = filter(nums, [](int x) { return x % 2 == 0; });

    for (int n : evens) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    return 0;
}`})}),e.jsx(i,{title:"Accumulate with a Lambda",difficulty:"intermediate",prompt:"Use std::accumulate from <numeric> with a lambda to compute the product of all elements in a vector of integers. Print the result.",hints:["std::accumulate takes begin, end, initial value, and a binary operation","The initial value for multiplication is 1","The lambda takes two ints and returns their product"],solution:e.jsx(t,{children:`#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::vector<int> nums = {1, 2, 3, 4, 5};

    int product = std::accumulate(nums.begin(), nums.end(), 1,
                                  [](int a, int b) { return a * b; });

    std::cout << "Product: " << product << std::endl;
    return 0;
}`})}),e.jsx(o,{references:[{type:"cppreference",title:"Lambda expressions",url:"https://en.cppreference.com/w/cpp/language/lambda",description:"Complete lambda syntax and semantics"},{type:"cppreference",title:"std::function",url:"https://en.cppreference.com/w/cpp/utility/functional/function",description:"Type-erased callable wrapper"},{type:"textbook",title:"Effective Modern C++",author:"Scott Meyers",description:"Item 31: Avoid default capture modes — Item 34: Prefer lambdas to std::bind"}]})]})}const _=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"}));export{w as a,k as b,T as c,C as d,N as e,A as f,_ as g,v as s};
