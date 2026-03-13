import{j as e}from"./vendor-BlNF5je7.js";import{D as i,S as l,C as t,O as r,N as n,W as s,B as a,E as o,R as d,a as c}from"./subject-01-fundamentals-Co6V3RzB.js";function h(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Pointers are one of the most powerful features of C++. A pointer is a variable that stores the memory address of another variable. Understanding pointers is essential for dynamic memory allocation, efficient data structures, and low-level system programming."}),e.jsx(i,{title:"What is a Pointer?",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"pointer"})," is a variable whose value is the memory address of another object or function. Pointers allow indirect access to data, enabling efficient manipulation of arrays, dynamic memory, and complex data structures."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Declaring and Using Pointers"}),e.jsxs(l,{title:"Pointer Declaration",children:[e.jsxs("p",{children:["A pointer is declared by placing an asterisk (",e.jsx("code",{children:"*"}),") between the type and the variable name. The ",e.jsx("strong",{children:"address-of operator"})," (",e.jsx("code",{children:"&"}),") retrieves the memory address of a variable."]}),e.jsx(t,{children:`Type* pointerName;          // pointer to Type
Type* pointerName = &variable; // initialized with address`})]}),e.jsx(t,{title:"Address-of and Dereference",children:`#include <iostream>

int main() {
    int value = 42;
    int* ptr = &value;   // ptr holds the address of value

    std::cout << "value:  " << value << std::endl;
    std::cout << "address: " << ptr << std::endl;
    std::cout << "deref:  " << *ptr << std::endl;  // dereference

    *ptr = 100;  // modify value through pointer
    std::cout << "value after: " << value << std::endl;
    return 0;
}`}),e.jsx(r,{children:`value:  42
address: 0x7ffd5e8a3b2c
deref:  42
value after: 100`}),e.jsx(n,{type:"info",title:"The * Operator Has Two Meanings",children:e.jsxs("p",{children:["In a ",e.jsx("strong",{children:"declaration"}),", ",e.jsx("code",{children:"*"})," indicates a pointer type (e.g., ",e.jsx("code",{children:"int* ptr"}),"). In an ",e.jsx("strong",{children:"expression"}),", ",e.jsx("code",{children:"*ptr"})," is the ",e.jsx("strong",{children:"dereference operator"})," that accesses the value at the stored address."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Pointer Types and nullptr"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Pointers are strongly typed. A ",e.jsx("code",{children:"int*"})," can only point to an ",e.jsx("code",{children:"int"}),". When a pointer does not point to any valid object, it should be set to ",e.jsx("code",{children:"nullptr"}),"."]}),e.jsx(t,{title:"Typed pointers and nullptr",children:`#include <iostream>

int main() {
    double pi = 3.14159;
    double* dptr = &pi;
    int* iptr = nullptr;  // null pointer — points to nothing

    std::cout << "pi via pointer: " << *dptr << std::endl;

    if (iptr == nullptr) {
        std::cout << "iptr is null" << std::endl;
    }

    // int* bad = &pi;  // ERROR: type mismatch
    return 0;
}`}),e.jsx(r,{children:`pi via pointer: 3.14159
iptr is null`}),e.jsx(s,{title:"Never Dereference a Null Pointer",children:e.jsxs("p",{children:["Dereferencing ",e.jsx("code",{children:"nullptr"})," or an uninitialized pointer causes ",e.jsx("strong",{children:"undefined behavior"}),", typically a segmentation fault. Always check a pointer before dereferencing it, or use references when null is not a valid state."]})}),e.jsx(n,{type:"history",title:"nullptr vs NULL",children:e.jsxs("p",{children:["Before C++11, the macro ",e.jsx("code",{children:"NULL"})," (defined as ",e.jsx("code",{children:"0"}),") was used. C++11 introduced ",e.jsx("code",{children:"nullptr"}),", a type-safe null pointer literal of type ",e.jsx("code",{children:"std::nullptr_t"}),", which avoids ambiguity in overload resolution."]})}),e.jsx(a,{title:"Always Initialize Pointers",children:e.jsxs("p",{children:["Initialize every pointer at declaration, either to the address of a valid object or to ",e.jsx("code",{children:"nullptr"}),". Uninitialized pointers contain garbage addresses, making bugs extremely difficult to diagnose."]})}),e.jsx(t,{title:"Pointer to pointer",children:`#include <iostream>

int main() {
    int x = 5;
    int* p = &x;
    int** pp = &p;  // pointer to pointer

    std::cout << "x:   " << x << std::endl;
    std::cout << "**pp: " << **pp << std::endl;
    return 0;
}`}),e.jsx(r,{children:`x:   5
**pp: 5`}),e.jsx(o,{title:"Swap with Pointers",difficulty:"beginner",prompt:"Write a function that takes two int pointers and swaps the values they point to. Call it from main to swap two integers.",hints:["Dereference both pointers to access the values","Use a temporary variable to hold one value during the swap"],solution:e.jsx(t,{children:`#include <iostream>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    std::cout << "Before: x=" << x << " y=" << y << std::endl;
    swap(&x, &y);
    std::cout << "After:  x=" << x << " y=" << y << std::endl;
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"Pointer declaration",url:"https://en.cppreference.com/w/cpp/language/pointer",description:"Full pointer declaration syntax and semantics"},{type:"cppreference",title:"nullptr",url:"https://en.cppreference.com/w/cpp/language/nullptr",description:"The null pointer literal"},{type:"textbook",title:"A Tour of C++",author:"Bjarne Stroustrup",description:"Chapter 1: Pointers and references"}]})]})}const z=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"}));function p(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Pointer arithmetic allows you to navigate through contiguous memory by adding or subtracting integer values from pointers. The compiler automatically scales the offset by the size of the pointed-to type, making array traversal natural and efficient."}),e.jsx(i,{title:"Pointer Arithmetic",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Pointer arithmetic"})," is the set of operations that adjust a pointer's address by multiples of the pointed-to type's size. Adding ",e.jsx("code",{children:"n"})," to a ",e.jsx("code",{children:"T*"})," advances it by ",e.jsx("code",{children:"n * sizeof(T)"})," bytes."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Adding and Subtracting Integers"}),e.jsxs(l,{title:"Arithmetic Operations",children:[e.jsxs("p",{children:["Pointers support increment (",e.jsx("code",{children:"++"}),"), decrement (",e.jsx("code",{children:"--"}),"), addition (",e.jsx("code",{children:"ptr + n"}),"), and subtraction (",e.jsx("code",{children:"ptr - n"}),"). Each operation moves by ",e.jsx("code",{children:"sizeof(T)"})," bytes per unit."]}),e.jsx(t,{children:`T* p;
p + n   // address of element n positions forward
p - n   // address of element n positions backward
p++     // advance to next element
p--     // move to previous element`})]}),e.jsx(t,{title:"Traversing an array with pointer arithmetic",children:`#include <iostream>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int* ptr = arr;  // points to first element

    for (int i = 0; i < 5; ++i) {
        std::cout << "arr[" << i << "] = " << *(ptr + i) << std::endl;
    }
    return 0;
}`}),e.jsx(r,{children:`arr[0] = 10
arr[1] = 20
arr[2] = 30
arr[3] = 40
arr[4] = 50`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Pointer Difference"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Subtracting two pointers of the same type yields the number of elements between them, not the number of bytes. The result type is ",e.jsx("code",{children:"std::ptrdiff_t"}),"."]}),e.jsx(t,{title:"Pointer subtraction",children:`#include <iostream>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int* begin = &arr[0];
    int* end   = &arr[4];

    std::ptrdiff_t diff = end - begin;
    std::cout << "Elements between: " << diff << std::endl;
    std::cout << "Bytes between:    " << diff * sizeof(int) << std::endl;
    return 0;
}`}),e.jsx(r,{children:`Elements between: 4
Bytes between:    16`}),e.jsx(n,{type:"important",title:"Only Within the Same Array",children:e.jsxs("p",{children:["Pointer arithmetic is only defined for pointers that point into the same array (or one past the end). Subtracting pointers to unrelated objects is ",e.jsx("strong",{children:"undefined behavior"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Iterating with Pointer Increment"}),e.jsx(t,{title:"Pointer-based loop",children:`#include <iostream>

int main() {
    double values[] = {1.1, 2.2, 3.3, 4.4};
    int size = sizeof(values) / sizeof(values[0]);

    double* ptr = values;
    double* end = values + size;

    while (ptr != end) {
        std::cout << *ptr << " ";
        ++ptr;
    }
    std::cout << std::endl;
    return 0;
}`}),e.jsx(r,{children:"1.1 2.2 3.3 4.4"}),e.jsx(n,{type:"tip",title:"One Past the End",children:e.jsxs("p",{children:["It is valid to form a pointer to one-past-the-last element of an array. You may compare against it but must not dereference it. This is exactly how STL iterators such as ",e.jsx("code",{children:"std::end()"})," work."]})}),e.jsx(s,{title:"Out-of-Bounds Access",children:e.jsxs("p",{children:["Accessing memory outside the bounds of an array via pointer arithmetic is undefined behavior. The compiler will not warn you at runtime. Use ",e.jsx("code",{children:"std::array"})," or",e.jsx("code",{children:"std::vector"})," with ",e.jsx("code",{children:".at()"})," for bounds checking."]})}),e.jsx(a,{title:"Prefer Iterators or Range-Based For",children:e.jsx("p",{children:"While pointer arithmetic is fundamental to understand, modern C++ favors range-based for loops and iterators. Use pointer arithmetic primarily when working with C APIs, custom allocators, or performance-critical inner loops."})}),e.jsx(o,{title:"Find Maximum with Pointers",difficulty:"beginner",prompt:"Write a function that takes a pointer to an int array and its size, then returns a pointer to the maximum element using pointer arithmetic (no subscript operator []).",hints:["Initialize a 'max' pointer to the first element","Advance through the array comparing *current > *max"],solution:e.jsx(t,{children:`#include <iostream>

int* findMax(int* arr, int size) {
    int* max = arr;
    for (int* p = arr + 1; p != arr + size; ++p) {
        if (*p > *max) {
            max = p;
        }
    }
    return max;
}

int main() {
    int data[] = {3, 7, 2, 9, 5};
    int* m = findMax(data, 5);
    std::cout << "Max value: " << *m << std::endl;
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"Pointer arithmetic",url:"https://en.cppreference.com/w/cpp/language/operator_arithmetic#Additive_operators",description:"Additive operators on pointers"},{type:"cppreference",title:"std::ptrdiff_t",url:"https://en.cppreference.com/w/cpp/types/ptrdiff_t",description:"Signed integer type for pointer differences"},{type:"textbook",title:"The C++ Programming Language",author:"Bjarne Stroustrup",description:"Section 7.4: Pointers and Arrays"}]})]})}const N=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"}));function u(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:'Arrays and pointers are deeply connected in C++. When passed to a function, an array "decays" into a pointer to its first element, losing its size information. Understanding this relationship is key to working with C-style arrays and C APIs.'}),e.jsx(i,{title:"Array Decay",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Array decay"})," (or array-to-pointer conversion) is the implicit conversion of an array name to a pointer to its first element. This happens when an array is passed to a function, assigned to a pointer, or used in most expressions."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Array Decay to Pointer"}),e.jsx(t,{title:"Demonstrating array decay",children:`#include <iostream>

void printFirst(int* arr) {
    std::cout << "First element: " << arr[0] << std::endl;
}

int main() {
    int numbers[] = {10, 20, 30, 40};

    int* ptr = numbers;  // decay: array -> pointer
    std::cout << "Via pointer: " << *ptr << std::endl;

    printFirst(numbers);  // array decays when passed

    // Size is lost after decay
    std::cout << "sizeof array:   " << sizeof(numbers) << std::endl;
    std::cout << "sizeof pointer: " << sizeof(ptr) << std::endl;
    return 0;
}`}),e.jsx(r,{children:`Via pointer: 10
First element: 10
sizeof array:   16
sizeof pointer: 8`}),e.jsx(n,{type:"important",title:"sizeof Reveals the Difference",children:e.jsxs("p",{children:[e.jsx("code",{children:"sizeof(array)"})," returns the total size in bytes of the array.",e.jsx("code",{children:"sizeof(pointer)"})," returns the size of the pointer itself (typically 8 bytes on a 64-bit system). After decay, the size information is permanently lost."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Pointer to Array"}),e.jsxs(l,{title:"Pointer-to-Array Syntax",children:[e.jsxs("p",{children:["A ",e.jsx("strong",{children:"pointer to an array"})," preserves the array's size in its type. The parentheses are critical: ",e.jsx("code",{children:"int (*p)[N]"})," is a pointer to an array of ",e.jsx("code",{children:"N"})," ints, while ",e.jsx("code",{children:"int* p[N]"})," is an array of ",e.jsx("code",{children:"N"})," pointers."]}),e.jsx(t,{children:`int (*ptr)[5];    // pointer to an array of 5 ints
int*  arr[5];    // array of 5 int pointers`})]}),e.jsx(t,{title:"Using pointer-to-array",children:`#include <iostream>

void printArray(int (*arr)[4]) {
    for (int i = 0; i < 4; ++i) {
        std::cout << (*arr)[i] << " ";
    }
    std::cout << std::endl;
}

int main() {
    int data[4] = {1, 2, 3, 4};
    printArray(&data);  // pass address of the whole array
    return 0;
}`}),e.jsx(r,{children:"1 2 3 4"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Multidimensional Arrays"}),e.jsx(t,{title:"2D array with pointers",children:`#include <iostream>

int main() {
    int matrix[2][3] = {{1, 2, 3}, {4, 5, 6}};

    // matrix decays to int (*)[3] — pointer to array of 3 ints
    for (int i = 0; i < 2; ++i) {
        for (int j = 0; j < 3; ++j) {
            std::cout << *(*(matrix + i) + j) << " ";
        }
        std::cout << std::endl;
    }
    return 0;
}`}),e.jsx(r,{children:`1 2 3
4 5 6`}),e.jsx(s,{title:"C-Style Arrays Lose Size Information",children:e.jsxs("p",{children:["When passing C-style arrays to functions, you must always pass the size separately. This is a major source of buffer overflow vulnerabilities. Prefer ",e.jsx("code",{children:"std::array"})," or",e.jsx("code",{children:"std::span"})," (C++20) which carry their size."]})}),e.jsx(a,{title:"Prefer std::array and std::vector",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"std::array<T, N>"})," for fixed-size arrays and ",e.jsx("code",{children:"std::vector<T>"})," for dynamic arrays. They do not decay, carry their size, and work seamlessly with the standard library algorithms."]})}),e.jsx(o,{title:"Reverse Array In-Place",difficulty:"intermediate",prompt:"Write a function that takes a pointer to an array and its size, then reverses the array in-place using only pointer arithmetic (no subscript operator).",hints:["Use two pointers: one at the start and one at the end","Swap elements and move pointers toward each other"],solution:e.jsx(t,{children:`#include <iostream>

void reverse(int* arr, int size) {
    int* left = arr;
    int* right = arr + size - 1;
    while (left < right) {
        int temp = *left;
        *left = *right;
        *right = temp;
        ++left;
        --right;
    }
}

int main() {
    int data[] = {1, 2, 3, 4, 5};
    reverse(data, 5);
    for (int i = 0; i < 5; ++i) {
        std::cout << data[i] << " ";
    }
    std::cout << std::endl;
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"Array-to-pointer decay",url:"https://en.cppreference.com/w/cpp/language/array#Array-to-pointer_decay",description:"Implicit conversion from array to pointer"},{type:"cppreference",title:"std::array",url:"https://en.cppreference.com/w/cpp/container/array",description:"Fixed-size array container"},{type:"textbook",title:"Effective Modern C++",author:"Scott Meyers",description:"Item 1: Understand template type deduction (array arguments)"}]})]})}const A=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"}));function m(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"An lvalue reference creates an alias for an existing object. Unlike pointers, references cannot be null, cannot be rebound to another object after initialization, and do not require explicit dereferencing. They are the preferred way to pass and return objects efficiently."}),e.jsx(i,{title:"Lvalue Reference",children:e.jsxs("p",{children:["An ",e.jsx("strong",{children:"lvalue reference"})," (declared with ",e.jsx("code",{children:"&"}),") is an alias that binds to an existing object (an lvalue). Once bound, the reference and the original name refer to the exact same object in memory."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic Reference Syntax"}),e.jsxs(l,{title:"Declaring References",children:[e.jsx("p",{children:"A reference must be initialized at declaration and cannot be made to refer to a different object afterward."}),e.jsx(t,{children:`Type& refName = existingVariable;
const Type& constRef = existingVariable;`})]}),e.jsx(t,{title:"References as aliases",children:`#include <iostream>

int main() {
    int x = 42;
    int& ref = x;  // ref is an alias for x

    std::cout << "x:   " << x << std::endl;
    std::cout << "ref: " << ref << std::endl;

    ref = 100;  // modifies x through the alias
    std::cout << "x after ref = 100: " << x << std::endl;

    std::cout << "Same address? " << (&x == &ref ? "yes" : "no") << std::endl;
    return 0;
}`}),e.jsx(r,{children:`x:   42
ref: 42
x after ref = 100: 100
Same address? yes`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Pass by Reference"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Passing arguments by reference avoids copying and allows the function to modify the caller's variable directly."}),e.jsx(t,{title:"Function parameters by reference",children:`#include <iostream>
#include <string>

void greet(const std::string& name) {  // no copy
    std::cout << "Hello, " << name << "!" << std::endl;
}

void increment(int& value) {  // modifies original
    ++value;
}

int main() {
    std::string user = "Alice";
    greet(user);

    int count = 0;
    increment(count);
    increment(count);
    std::cout << "count: " << count << std::endl;
    return 0;
}`}),e.jsx(r,{children:`Hello, Alice!
count: 2`}),e.jsx(n,{type:"tip",title:"const Reference for Read-Only Access",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"const T&"})," when you want to avoid copying but do not need to modify the object. A ",e.jsx("code",{children:"const"})," reference can also bind to temporaries (rvalues), making it extremely versatile for function parameters."]})}),e.jsx(s,{title:"Dangling References",children:e.jsxs("p",{children:["Never return a reference to a local variable. When the function returns, the local is destroyed, and the reference becomes ",e.jsx("strong",{children:"dangling"})," — using it is undefined behavior."]})}),e.jsx(t,{title:"Dangling reference — DO NOT DO THIS",children:`// BAD: returning reference to a local variable
int& bad() {
    int local = 42;
    return local;  // WARNING: dangling reference
}

// GOOD: return by value or reference to longer-lived object
int good() {
    int local = 42;
    return local;  // returns a copy
}`}),e.jsx(a,{title:"Parameter Passing Guidelines",children:e.jsxs("p",{children:["Pass small types (",e.jsx("code",{children:"int"}),", ",e.jsx("code",{children:"double"}),", pointers) by value. Pass large objects by ",e.jsx("code",{children:"const&"})," for read-only access, and by ",e.jsx("code",{children:"&"})," only when the function needs to modify the argument. Avoid raw non-const reference return values from functions unless the referred object outlives the call."]})}),e.jsx(n,{type:"info",title:"References Cannot Be Rebound",children:e.jsx("p",{children:"Assigning to a reference changes the referred-to object, not the reference itself. There is no syntax to make a reference refer to a different object after initialization."})}),e.jsx(o,{title:"Swap with References",difficulty:"beginner",prompt:"Write a swap function using references instead of pointers. It should swap two integers without using std::swap.",hints:["Use int& parameters instead of int*","No need for dereference syntax — use the parameters directly"],solution:e.jsx(t,{children:`#include <iostream>

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
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"Reference declaration",url:"https://en.cppreference.com/w/cpp/language/reference",description:"Lvalue and rvalue reference syntax"},{type:"cppreference",title:"Value categories",url:"https://en.cppreference.com/w/cpp/language/value_category",description:"Understanding lvalues, rvalues, and more"},{type:"textbook",title:"A Tour of C++",author:"Bjarne Stroustrup",description:"Section 1.7: References"}]})]})}const _=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"}));function f(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Rvalue references, introduced in C++11, bind to temporary objects (rvalues). They enable",e.jsx("strong",{children:" move semantics"}),", allowing resources to be transferred rather than copied, which dramatically improves performance for objects that manage heap memory."]}),e.jsx(i,{title:"Rvalue Reference",children:e.jsxs("p",{children:["An ",e.jsx("strong",{children:"rvalue reference"})," (declared with ",e.jsx("code",{children:"&&"}),') binds to temporary values (rvalues) — objects that are about to be destroyed. This allows the program to "steal" their resources instead of making an expensive deep copy.']})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Binding Rules"}),e.jsxs(l,{title:"Rvalue Reference Syntax",children:[e.jsxs("p",{children:["An rvalue reference uses ",e.jsx("code",{children:"&&"}),". It can bind to temporaries but not to lvalues. A ",e.jsx("code",{children:"const&"})," can bind to both."]}),e.jsx(t,{children:`int&& rref = 42;           // OK: binds to temporary
// int&& bad = x;          // ERROR: x is an lvalue
const int& cref = 42;     // OK: const& binds to rvalues too`})]}),e.jsx(t,{title:"Rvalue reference basics",children:`#include <iostream>
#include <string>

void process(const std::string& s) {
    std::cout << "lvalue: " << s << std::endl;
}

void process(std::string&& s) {
    std::cout << "rvalue: " << s << std::endl;
}

int main() {
    std::string name = "Alice";
    process(name);              // calls lvalue overload
    process("Bob");             // calls rvalue overload
    process(std::string("C"));  // calls rvalue overload
    return 0;
}`}),e.jsx(r,{children:`lvalue: Alice
rvalue: Bob
rvalue: C`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::move"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"std::move"})," does not move anything. It is a cast that converts an lvalue into an rvalue reference, signaling that the object's resources may be transferred."]}),e.jsx(t,{title:"Using std::move",children:`#include <iostream>
#include <string>
#include <utility>

int main() {
    std::string a = "Hello, World!";
    std::cout << "a before move: " << a << std::endl;

    std::string b = std::move(a);  // a's contents transferred to b
    std::cout << "b after move:  " << b << std::endl;
    std::cout << "a after move:  '" << a << "'" << std::endl;
    // a is now in a valid but unspecified state
    return 0;
}`}),e.jsx(r,{children:`a before move: Hello, World!
b after move:  Hello, World!
a after move:  ''`}),e.jsx(s,{title:"Moved-From Objects",children:e.jsxs("p",{children:["After ",e.jsx("code",{children:"std::move"}),", the source object is in a ",e.jsx("strong",{children:"valid but unspecified state"}),". You can assign to it or destroy it, but you must not rely on its value. Do not use a moved-from object without first resetting it."]})}),e.jsx(n,{type:"info",title:"Move Semantics Motivation",children:e.jsxs("p",{children:["Without move semantics, returning a ",e.jsx("code",{children:"std::vector"})," with 10 million elements from a function would copy all of them. With move semantics, the internal buffer pointer is simply transferred — an O(1) operation instead of O(n)."]})}),e.jsx(t,{title:"Move semantics with a vector",children:`#include <iostream>
#include <vector>
#include <utility>

std::vector<int> makeData() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    return v;  // moved (or elided) automatically
}

int main() {
    std::vector<int> data = makeData();
    std::cout << "Size: " << data.size() << std::endl;

    std::vector<int> other = std::move(data);
    std::cout << "other size: " << other.size() << std::endl;
    std::cout << "data size:  " << data.size() << std::endl;
    return 0;
}`}),e.jsx(r,{children:`Size: 5
other size: 5
data size:  0`}),e.jsx(n,{type:"history",title:"C++11 Revolution",children:e.jsx("p",{children:"Rvalue references and move semantics were the most impactful feature of C++11. They eliminated the need for many copy operations in the standard library, making containers and algorithms significantly faster without any changes to user code."})}),e.jsx(a,{title:"When to Use std::move",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"std::move"})," when you are done with an object and want to transfer its resources to another. Do not move from objects you still need. The compiler often applies move semantics automatically for return values (NRVO), so do not write ",e.jsx("code",{children:"return std::move(x)"})," — it can actually prevent the optimization."]})}),e.jsx(o,{title:"Observe Move vs Copy",difficulty:"intermediate",prompt:"Create a class with a copy constructor and move constructor that each print a message. Create instances to trigger both, demonstrating when each is called.",hints:["Define both MyClass(const MyClass&) and MyClass(MyClass&&)","Use std::move to trigger the move constructor"],solution:e.jsx(t,{children:`#include <iostream>
#include <utility>

class MyClass {
public:
    MyClass() { std::cout << "Default ctor" << std::endl; }
    MyClass(const MyClass&) { std::cout << "Copy ctor" << std::endl; }
    MyClass(MyClass&&) noexcept { std::cout << "Move ctor" << std::endl; }
};

int main() {
    MyClass a;               // Default ctor
    MyClass b = a;           // Copy ctor
    MyClass c = std::move(a); // Move ctor
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"Rvalue references",url:"https://en.cppreference.com/w/cpp/language/reference",description:"Reference declaration including rvalue references"},{type:"cppreference",title:"std::move",url:"https://en.cppreference.com/w/cpp/utility/move",description:"Cast to rvalue reference"},{type:"textbook",title:"Effective Modern C++",author:"Scott Meyers",description:"Items 23-25: Understanding std::move and std::forward"}]})]})}const P=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"}));function x(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"References and pointers both provide indirect access to objects, but they have fundamentally different semantics. Choosing the right one depends on whether null is a valid state, whether rebinding is needed, and what ownership model you intend to express."}),e.jsx(i,{title:"References vs Pointers",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"reference"})," is an alias that must always refer to a valid object and cannot be rebound. A ",e.jsx("strong",{children:"pointer"})," is a variable holding a memory address that can be null, rebound, and subjected to arithmetic."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Comparison Table"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"min-w-full text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600",children:[e.jsx("thead",{className:"bg-gray-100 dark:bg-gray-800",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-2 text-left",children:"Feature"}),e.jsx("th",{className:"px-4 py-2 text-left",children:"Reference"}),e.jsx("th",{className:"px-4 py-2 text-left",children:"Pointer"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2 border-t border-gray-200 dark:border-gray-700",children:"Syntax"}),e.jsx("td",{className:"px-4 py-2 border-t border-gray-200 dark:border-gray-700",children:"T&"}),e.jsx("td",{className:"px-4 py-2 border-t border-gray-200 dark:border-gray-700",children:"T*"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2 border-t border-gray-200 dark:border-gray-700",children:"Can be null"}),e.jsx("td",{className:"px-4 py-2 border-t border-gray-200 dark:border-gray-700",children:"No"}),e.jsx("td",{className:"px-4 py-2 border-t border-gray-200 dark:border-gray-700",children:"Yes (nullptr)"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2 border-t border-gray-200 dark:border-gray-700",children:"Must initialize"}),e.jsx("td",{className:"px-4 py-2 border-t border-gray-200 dark:border-gray-700",children:"Yes"}),e.jsx("td",{className:"px-4 py-2 border-t border-gray-200 dark:border-gray-700",children:"No (but should)"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2 border-t border-gray-200 dark:border-gray-700",children:"Can rebind"}),e.jsx("td",{className:"px-4 py-2 border-t border-gray-200 dark:border-gray-700",children:"No"}),e.jsx("td",{className:"px-4 py-2 border-t border-gray-200 dark:border-gray-700",children:"Yes"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2 border-t border-gray-200 dark:border-gray-700",children:"Arithmetic"}),e.jsx("td",{className:"px-4 py-2 border-t border-gray-200 dark:border-gray-700",children:"No"}),e.jsx("td",{className:"px-4 py-2 border-t border-gray-200 dark:border-gray-700",children:"Yes"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2 border-t border-gray-200 dark:border-gray-700",children:"Dereference needed"}),e.jsx("td",{className:"px-4 py-2 border-t border-gray-200 dark:border-gray-700",children:"No (automatic)"}),e.jsx("td",{className:"px-4 py-2 border-t border-gray-200 dark:border-gray-700",children:"Yes (* or ->)"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2 border-t border-gray-200 dark:border-gray-700",children:"Ownership semantics"}),e.jsx("td",{className:"px-4 py-2 border-t border-gray-200 dark:border-gray-700",children:"Non-owning"}),e.jsx("td",{className:"px-4 py-2 border-t border-gray-200 dark:border-gray-700",children:"Owning or non-owning"})]})]})]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Side-by-Side Code"}),e.jsx(t,{title:"Pointer vs reference parameter",children:`#include <iostream>

void incrementByPtr(int* p) {
    if (p) {  // must check for null
        (*p)++;
    }
}

void incrementByRef(int& r) {
    r++;  // no null check needed — always valid
}

int main() {
    int a = 10, b = 20;

    incrementByPtr(&a);   // must take address explicitly
    incrementByRef(b);    // passed directly

    std::cout << "a: " << a << std::endl;
    std::cout << "b: " << b << std::endl;
    return 0;
}`}),e.jsx(r,{children:`a: 11
b: 21`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"When to Use Which"}),e.jsx(t,{title:"Rebinding: only possible with pointers",children:`#include <iostream>

int main() {
    int x = 1, y = 2;

    int* ptr = &x;
    ptr = &y;       // rebind pointer to y
    std::cout << "*ptr: " << *ptr << std::endl;  // 2

    int& ref = x;
    ref = y;        // does NOT rebind — assigns y's value to x
    std::cout << "x: " << x << std::endl;        // 2
    std::cout << "y: " << y << std::endl;        // 2
    return 0;
}`}),e.jsx(r,{children:`*ptr: 2
x: 2
y: 2`}),e.jsx(n,{type:"tip",title:"Quick Decision Guide",children:e.jsxs("p",{children:["Use a ",e.jsx("strong",{children:"reference"})," when: the parameter is always valid, you want clean syntax, and rebinding is not needed. Use a ",e.jsx("strong",{children:"pointer"})," when: null is a meaningful state (optional parameter), you need to rebind, or you are interfacing with C APIs."]})}),e.jsx(s,{title:"Never Create a Null Reference",children:e.jsxs("p",{children:["While it is technically possible to create a null reference through pointer casting, doing so is ",e.jsx("strong",{children:"undefined behavior"}),". The language guarantees references are non-null; violating this assumption breaks all code that relies on it."]})}),e.jsx(a,{title:"Prefer References Over Pointers",children:e.jsxs("p",{children:["For function parameters, default to ",e.jsx("code",{children:"const T&"})," for input and ",e.jsx("code",{children:"T&"})," for in-out parameters. Use pointers only when null is a valid argument, when you need rebinding, or when working with C-style APIs. For ownership, use smart pointers."]})}),e.jsx(o,{title:"Optional Parameter",difficulty:"intermediate",prompt:"Write a function that formats a greeting. It takes a mandatory name (reference) and an optional title (pointer, nullptr if absent). Print 'Hello, Dr. Alice!' or 'Hello, Alice!' accordingly.",hints:["Use const std::string& for the name","Use const std::string* for the optional title — check for nullptr"],solution:e.jsx(t,{children:`#include <iostream>
#include <string>

void greet(const std::string& name, const std::string* title) {
    std::cout << "Hello, ";
    if (title) {
        std::cout << *title << " ";
    }
    std::cout << name << "!" << std::endl;
}

int main() {
    std::string t = "Dr.";
    greet("Alice", &t);
    greet("Bob", nullptr);
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"Reference declaration",url:"https://en.cppreference.com/w/cpp/language/reference",description:"Lvalue and rvalue references"},{type:"cppreference",title:"Pointer declaration",url:"https://en.cppreference.com/w/cpp/language/pointer",description:"Pointer types and usage"},{type:"textbook",title:"C++ Core Guidelines",author:"Bjarne Stroustrup & Herb Sutter",description:"F.7: For general use, take T& or const T& arguments"}]})]})}const C=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"}));function y(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++ gives you direct control over memory allocation using ",e.jsx("code",{children:"new"})," and ",e.jsx("code",{children:"delete"}),". While modern C++ strongly favors smart pointers, understanding manual memory management is essential for working with legacy code and grasping how smart pointers work internally."]}),e.jsx(i,{title:"Dynamic Memory Allocation",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Dynamic memory allocation"})," creates objects on the heap at runtime using ",e.jsx("code",{children:"new"}),". The programmer is responsible for releasing this memory with ",e.jsx("code",{children:"delete"}),". Failure to do so causes ",e.jsx("strong",{children:"memory leaks"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"new and delete"}),e.jsxs(l,{title:"Single Object Allocation",children:[e.jsxs("p",{children:[e.jsx("code",{children:"new"})," allocates memory on the heap, constructs the object, and returns a pointer. ",e.jsx("code",{children:"delete"})," calls the destructor and frees the memory."]}),e.jsx(t,{children:`Type* ptr = new Type(args);  // allocate and construct
delete ptr;                  // destroy and deallocate
ptr = nullptr;               // prevent dangling pointer`})]}),e.jsx(t,{title:"Basic new/delete usage",children:`#include <iostream>

int main() {
    int* p = new int(42);
    std::cout << "Value: " << *p << std::endl;
    delete p;
    p = nullptr;

    double* d = new double(3.14);
    std::cout << "Pi: " << *d << std::endl;
    delete d;
    d = nullptr;
    return 0;
}`}),e.jsx(r,{children:`Value: 42
Pi: 3.14`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Array Allocation"}),e.jsx(t,{title:"new[] and delete[]",children:`#include <iostream>

int main() {
    int size = 5;
    int* arr = new int[size]{10, 20, 30, 40, 50};

    for (int i = 0; i < size; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;

    delete[] arr;  // MUST use delete[] for arrays
    arr = nullptr;
    return 0;
}`}),e.jsx(r,{children:"10 20 30 40 50"}),e.jsx(s,{title:"Mismatched new/delete",children:e.jsxs("p",{children:["Using ",e.jsx("code",{children:"delete"})," on memory allocated with ",e.jsx("code",{children:"new[]"})," (or vice versa) is",e.jsx("strong",{children:" undefined behavior"}),". Always pair ",e.jsx("code",{children:"new"})," with ",e.jsx("code",{children:"delete"})," and",e.jsx("code",{children:" new[]"})," with ",e.jsx("code",{children:"delete[]"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Common Pitfalls"}),e.jsx(t,{title:"Memory leak and dangling pointer",children:`#include <iostream>

void memoryLeak() {
    int* p = new int(100);
    // forgot delete p; — memory is leaked!
}

void danglingPointer() {
    int* p = new int(200);
    delete p;
    // p still holds the old address (dangling)
    // *p = 5;  // UNDEFINED BEHAVIOR
    p = nullptr;  // safe: prevents accidental use
}

int main() {
    memoryLeak();
    danglingPointer();
    std::cout << "No crash, but memoryLeak() lost memory" << std::endl;
    return 0;
}`}),e.jsx(r,{children:"No crash, but memoryLeak() lost memory"}),e.jsx(n,{type:"info",title:"Placement new",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Placement new"})," constructs an object at a specific memory address without allocating new memory: ",e.jsx("code",{children:"new (address) Type(args)"}),". It is used in custom allocators and memory pools. You must call the destructor manually and must not use ",e.jsx("code",{children:"delete"})," on placement-new objects."]})}),e.jsx(s,{title:"Double Delete",children:e.jsxs("p",{children:["Calling ",e.jsx("code",{children:"delete"})," on the same pointer twice is undefined behavior. Setting a pointer to ",e.jsx("code",{children:"nullptr"})," after deletion is a common safeguard, because ",e.jsx("code",{children:"delete nullptr"})," is a safe no-op."]})}),e.jsx(a,{title:"Avoid Raw new/delete in Modern C++",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"std::make_unique"})," and ",e.jsx("code",{children:"std::make_shared"})," instead of raw ",e.jsx("code",{children:"new"}),". Use ",e.jsx("code",{children:"std::vector"})," instead of ",e.jsx("code",{children:"new[]"}),". Reserve raw allocation for custom allocators, placement new, and interfacing with C libraries."]})}),e.jsx(o,{title:"Dynamic Array",difficulty:"beginner",prompt:"Allocate a dynamic int array of user-specified size, fill it with squares (1, 4, 9, ...), print the values, then properly deallocate. Set the pointer to nullptr afterward.",hints:["Use new int[size] to allocate","Remember to use delete[] (not delete) for arrays"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    int size = 5;
    int* arr = new int[size];

    for (int i = 0; i < size; ++i) {
        arr[i] = (i + 1) * (i + 1);
    }

    for (int i = 0; i < size; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;

    delete[] arr;
    arr = nullptr;
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"new expression",url:"https://en.cppreference.com/w/cpp/language/new",description:"Dynamic memory allocation with new"},{type:"cppreference",title:"delete expression",url:"https://en.cppreference.com/w/cpp/language/delete",description:"Deallocation with delete and delete[]"},{type:"textbook",title:"Effective C++",author:"Scott Meyers",description:"Item 16: Use the same form in corresponding uses of new and delete"}]})]})}const R=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"}));function g(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Smart pointers are class templates that manage dynamically allocated memory automatically. They ensure that memory is freed when the pointer goes out of scope, eliminating memory leaks and dangling pointer bugs that plague raw ",e.jsx("code",{children:"new"}),"/",e.jsx("code",{children:"delete"})," code."]}),e.jsx(i,{title:"Smart Pointers",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Smart pointers"})," are RAII wrappers around raw pointers. C++ provides three kinds: ",e.jsx("code",{children:"std::unique_ptr"})," (exclusive ownership),",e.jsx("code",{children:" std::shared_ptr"})," (shared ownership), and ",e.jsx("code",{children:"std::weak_ptr"})," (non-owning observer of a ",e.jsx("code",{children:"shared_ptr"}),")."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::unique_ptr"}),e.jsxs(l,{title:"unique_ptr Basics",children:[e.jsxs("p",{children:["A ",e.jsx("code",{children:"unique_ptr"})," has ",e.jsx("strong",{children:"exclusive ownership"}),". It cannot be copied, only moved. When it goes out of scope, the managed object is automatically deleted."]}),e.jsx(t,{children:`auto ptr = std::make_unique<Type>(args);
// ptr->method();  // use like a raw pointer
// automatically deleted when ptr goes out of scope`})]}),e.jsx(t,{title:"unique_ptr in action",children:`#include <iostream>
#include <memory>

struct Widget {
    int id;
    Widget(int i) : id(i) { std::cout << "Widget " << id << " created" << std::endl; }
    ~Widget() { std::cout << "Widget " << id << " destroyed" << std::endl; }
};

int main() {
    auto w1 = std::make_unique<Widget>(1);
    std::cout << "w1 id: " << w1->id << std::endl;

    // auto w2 = w1;  // ERROR: cannot copy unique_ptr
    auto w2 = std::move(w1);  // transfer ownership
    std::cout << "w1 is null: " << (w1 == nullptr) << std::endl;

    return 0;  // w2 destroyed here automatically
}`}),e.jsx(r,{children:`Widget 1 created
w1 id: 1
w1 is null: 1
Widget 1 destroyed`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::shared_ptr"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["A ",e.jsx("code",{children:"shared_ptr"})," uses reference counting. Multiple ",e.jsx("code",{children:"shared_ptr"}),"s can own the same object; it is destroyed when the last one goes out of scope."]}),e.jsx(t,{title:"shared_ptr with reference counting",children:`#include <iostream>
#include <memory>

int main() {
    auto sp1 = std::make_shared<int>(42);
    std::cout << "count: " << sp1.use_count() << std::endl;

    {
        auto sp2 = sp1;  // shared ownership
        std::cout << "count: " << sp1.use_count() << std::endl;
        std::cout << "value: " << *sp2 << std::endl;
    }  // sp2 destroyed, count decrements

    std::cout << "count: " << sp1.use_count() << std::endl;
    return 0;  // sp1 destroyed, object freed
}`}),e.jsx(r,{children:`count: 1
count: 2
value: 42
count: 1`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::weak_ptr"}),e.jsx(n,{type:"info",title:"Breaking Circular References",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::weak_ptr"})," observes a ",e.jsx("code",{children:"shared_ptr"})," without affecting the reference count. It is used to break circular references that would otherwise prevent objects from being deleted. Call ",e.jsx("code",{children:".lock()"})," to obtain a temporary ",e.jsx("code",{children:"shared_ptr"})," if the object still exists."]})}),e.jsx(t,{title:"weak_ptr usage",children:`#include <iostream>
#include <memory>

int main() {
    std::weak_ptr<int> wp;
    {
        auto sp = std::make_shared<int>(99);
        wp = sp;
        if (auto locked = wp.lock()) {
            std::cout << "Alive: " << *locked << std::endl;
        }
    }  // sp destroyed here

    if (wp.expired()) {
        std::cout << "Object no longer exists" << std::endl;
    }
    return 0;
}`}),e.jsx(r,{children:`Alive: 99
Object no longer exists`}),e.jsx(s,{title:"Avoid Circular shared_ptr",children:e.jsxs("p",{children:["If object A holds a ",e.jsx("code",{children:"shared_ptr"})," to B and B holds a ",e.jsx("code",{children:"shared_ptr"})," to A, neither will ever be deleted. Use ",e.jsx("code",{children:"weak_ptr"})," for back-references to break the cycle."]})}),e.jsx(a,{title:"Use make_unique and make_shared",children:e.jsxs("p",{children:["Prefer ",e.jsx("code",{children:"std::make_unique"})," and ",e.jsx("code",{children:"std::make_shared"})," over raw ",e.jsx("code",{children:"new"}),". They are exception-safe, more efficient (shared_ptr makes a single allocation), and clearly express intent. Default to ",e.jsx("code",{children:"unique_ptr"}),"; only use ",e.jsx("code",{children:"shared_ptr"})," when shared ownership is genuinely needed."]})}),e.jsx(o,{title:"Factory Function with unique_ptr",difficulty:"intermediate",prompt:"Write a factory function that returns a std::unique_ptr<Shape> where Shape is a base class with a virtual draw() method. Create a Circle subclass and call draw() through the unique_ptr.",hints:["The factory returns std::make_unique<Circle>(...)","Use a virtual destructor in the base class"],solution:e.jsx(t,{children:`#include <iostream>
#include <memory>

class Shape {
public:
    virtual void draw() const = 0;
    virtual ~Shape() = default;
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    void draw() const override {
        std::cout << "Circle with radius " << radius << std::endl;
    }
};

std::unique_ptr<Shape> createShape() {
    return std::make_unique<Circle>(5.0);
}

int main() {
    auto shape = createShape();
    shape->draw();
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"std::unique_ptr",url:"https://en.cppreference.com/w/cpp/memory/unique_ptr",description:"Exclusive-ownership smart pointer"},{type:"cppreference",title:"std::shared_ptr",url:"https://en.cppreference.com/w/cpp/memory/shared_ptr",description:"Shared-ownership smart pointer"},{type:"textbook",title:"Effective Modern C++",author:"Scott Meyers",description:"Items 18-22: Smart pointer best practices"}]})]})}const I=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"}));function j(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"RAII (Resource Acquisition Is Initialization) is the most important idiom in C++. It ties the lifetime of a resource — memory, file handles, locks, sockets — to the lifetime of an object. When the object is destroyed, the resource is automatically released."}),e.jsx(i,{title:"RAII — Resource Acquisition Is Initialization",children:e.jsxs("p",{children:[e.jsx("strong",{children:"RAII"})," is a C++ programming idiom where resource allocation is done in a constructor and deallocation in the destructor. Because C++ guarantees that destructors run when objects leave scope (even during exceptions), RAII prevents resource leaks by design."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"The Core Principle"}),e.jsxs(l,{title:"RAII Pattern",children:[e.jsx("p",{children:"Acquire the resource in the constructor. Release it in the destructor. The compiler ensures the destructor is called when the object goes out of scope."}),e.jsx(t,{children:`class ResourceGuard {
    Resource* res;
public:
    ResourceGuard()  { res = acquire(); }   // acquire
    ~ResourceGuard() { release(res); }       // release
};  // destructor called automatically at end of scope`})]}),e.jsx(t,{title:"RAII file handle wrapper",children:`#include <iostream>
#include <cstdio>
#include <stdexcept>

class FileHandle {
    FILE* file;
public:
    FileHandle(const char* name, const char* mode) {
        file = std::fopen(name, mode);
        if (!file) throw std::runtime_error("Cannot open file");
        std::cout << "File opened" << std::endl;
    }

    ~FileHandle() {
        if (file) {
            std::fclose(file);
            std::cout << "File closed" << std::endl;
        }
    }

    void write(const char* text) {
        std::fputs(text, file);
    }

    // Prevent copying
    FileHandle(const FileHandle&) = delete;
    FileHandle& operator=(const FileHandle&) = delete;
};

int main() {
    {
        FileHandle fh("/tmp/raii_test.txt", "w");
        fh.write("Hello from RAII!");
    }  // fh destroyed here — file automatically closed
    std::cout << "After scope" << std::endl;
    return 0;
}`}),e.jsx(r,{children:`File opened
File closed
After scope`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"RAII and Exception Safety"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"RAII shines when exceptions are thrown. Without RAII, an exception can skip cleanup code, causing resource leaks. With RAII, the destructor runs during stack unwinding regardless."}),e.jsx(t,{title:"Exception safety with RAII",children:`#include <iostream>
#include <memory>
#include <stdexcept>

class Logger {
public:
    Logger()  { std::cout << "Logger started" << std::endl; }
    ~Logger() { std::cout << "Logger stopped" << std::endl; }
};

void riskyOperation() {
    Logger log;  // RAII: will be cleaned up even if we throw
    std::cout << "Doing work..." << std::endl;
    throw std::runtime_error("Something went wrong");
    // Logger destructor still runs!
}

int main() {
    try {
        riskyOperation();
    } catch (const std::exception& e) {
        std::cout << "Caught: " << e.what() << std::endl;
    }
    return 0;
}`}),e.jsx(r,{children:`Logger started
Doing work...
Logger stopped
Caught: Something went wrong`}),e.jsx(n,{type:"info",title:"Standard Library RAII Types",children:e.jsxs("p",{children:["Many standard library types follow RAII: ",e.jsx("code",{children:"std::unique_ptr"})," manages heap memory, ",e.jsx("code",{children:"std::lock_guard"})," manages mutex locks,",e.jsx("code",{children:" std::fstream"})," manages file handles, and ",e.jsx("code",{children:"std::thread"})," (with join/detach) manages threads."]})}),e.jsx(n,{type:"history",title:"Origin of RAII",children:e.jsxs("p",{children:["RAII was coined by Bjarne Stroustrup in the 1980s. Despite the awkward name (the key insight is really about ",e.jsx("em",{children:"destruction"}),", not initialization), it remains the cornerstone of safe C++ resource management and has influenced many other languages."]})}),e.jsx(s,{title:"Do Not Use Raw Resource Handles",children:e.jsx("p",{children:"If you acquire a resource and store it in a raw pointer or handle, any early return or exception will skip your cleanup code. Always wrap resources in an RAII object."})}),e.jsx(a,{title:"Write Custom RAII Wrappers",children:e.jsxs("p",{children:["When interfacing with C libraries that use acquire/release patterns (e.g.,",e.jsx("code",{children:"open"}),"/",e.jsx("code",{children:"close"}),", ",e.jsx("code",{children:"lock"}),"/",e.jsx("code",{children:"unlock"}),"), wrap them in a small RAII class. Delete copy operations and consider supporting move semantics for transferable resources."]})}),e.jsx(o,{title:"RAII Lock Guard",difficulty:"intermediate",prompt:"Write a simple LockGuard class that takes a reference to a boolean 'locked' flag, sets it to true on construction and false on destruction. Demonstrate that the flag is reset even when an exception is thrown.",hints:["Store a reference to the bool in the class","Set true in constructor, false in destructor","Use try/catch to show it works with exceptions"],solution:e.jsx(t,{children:`#include <iostream>
#include <stdexcept>

class LockGuard {
    bool& locked;
public:
    LockGuard(bool& flag) : locked(flag) {
        locked = true;
        std::cout << "Locked" << std::endl;
    }
    ~LockGuard() {
        locked = false;
        std::cout << "Unlocked" << std::endl;
    }
};

int main() {
    bool flag = false;
    try {
        LockGuard guard(flag);
        std::cout << "flag: " << flag << std::endl;
        throw std::runtime_error("oops");
    } catch (...) {
        std::cout << "flag after exception: " << flag << std::endl;
    }
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"RAII",url:"https://en.cppreference.com/w/cpp/language/raii",description:"Resource Acquisition Is Initialization idiom"},{type:"cppreference",title:"std::lock_guard",url:"https://en.cppreference.com/w/cpp/thread/lock_guard",description:"RAII mutex lock wrapper"},{type:"textbook",title:"The C++ Programming Language",author:"Bjarne Stroustrup",description:"Section 13.3: Resource Management"}]})]})}const T=Object.freeze(Object.defineProperty({__proto__:null,default:j},Symbol.toStringTag,{value:"Module"}));function b(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++ programs use two primary memory regions: the ",e.jsx("strong",{children:"stack"})," for local variables with automatic lifetime, and the ",e.jsx("strong",{children:"heap"})," (free store) for dynamically allocated objects whose lifetime you control. Understanding the differences is critical for writing efficient and correct programs."]}),e.jsx(i,{title:"Stack vs Heap",children:e.jsxs("p",{children:["The ",e.jsx("strong",{children:"stack"})," is a LIFO (last-in, first-out) memory region managed automatically by the compiler for local variables and function call frames. The ",e.jsx("strong",{children:"heap"})," (free store) is a larger, unstructured region where memory is allocated and freed manually via ",e.jsx("code",{children:"new"}),"/",e.jsx("code",{children:"delete"})," or smart pointers."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Stack Frames"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Each function call creates a ",e.jsx("strong",{children:"stack frame"})," containing the function's local variables, parameters, and return address. When the function returns, its frame is popped and all local variables are destroyed automatically."]}),e.jsx(t,{title:"Visualizing stack frames",children:`#include <iostream>

void inner() {
    int c = 30;  // stack frame 3
    std::cout << "inner: &c = " << &c << std::endl;
}

void outer() {
    int b = 20;  // stack frame 2
    std::cout << "outer: &b = " << &b << std::endl;
    inner();
}

int main() {
    int a = 10;  // stack frame 1
    std::cout << "main:  &a = " << &a << std::endl;
    outer();
    return 0;
}`}),e.jsx(r,{children:`main:  &a = 0x7ffd12340abc
outer: &b = 0x7ffd1234009c
inner: &c = 0x7ffd1233ff7c`}),e.jsx(n,{type:"info",title:"Stack Grows Downward",children:e.jsx("p",{children:"On most architectures, the stack grows toward lower addresses. Each successive function call places its frame at a lower memory address. This is why the addresses in the example decrease with each deeper call."})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Heap Allocation"}),e.jsx(t,{title:"Stack vs heap lifetimes",children:`#include <iostream>
#include <memory>

int* createOnStack() {
    int local = 42;
    return &local;  // WARNING: dangling pointer!
}

int* createOnHeap() {
    int* p = new int(42);
    return p;  // OK: heap outlives function scope
}

int main() {
    // Heap allocation — lives until explicitly freed
    int* heapVal = createOnHeap();
    std::cout << "Heap value: " << *heapVal << std::endl;
    delete heapVal;

    // Better: use smart pointer
    auto safe = std::make_unique<int>(99);
    std::cout << "Smart ptr:  " << *safe << std::endl;
    // automatically freed when safe goes out of scope
    return 0;
}`}),e.jsx(r,{children:`Heap value: 42
Smart ptr:  99`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Performance Comparison"}),e.jsxs(l,{title:"Speed Differences",children:[e.jsx("p",{children:"Stack allocation is essentially free — it just adjusts the stack pointer (a single CPU instruction). Heap allocation involves a system call or allocator lookup, which is orders of magnitude slower. Stack access also benefits from CPU cache locality."}),e.jsx(t,{children:`// Stack: ~1 CPU instruction (adjusting stack pointer)
int x = 42;

// Heap: calls allocator, may trigger system call
int* p = new int(42);  // much slower`})]}),e.jsx(s,{title:"Stack Overflow",children:e.jsxs("p",{children:["The stack has a limited size (typically 1-8 MB). Allocating very large arrays on the stack or deeply recursive calls can cause a ",e.jsx("strong",{children:"stack overflow"}),", crashing the program. Use heap allocation for large data structures."]})}),e.jsx(t,{title:"Stack overflow example",children:`#include <iostream>

void infiniteRecursion(int depth) {
    int buffer[1000];  // 4KB per frame
    std::cout << "Depth: " << depth << std::endl;
    infiniteRecursion(depth + 1);  // will crash!
}

// int main() {
//     infiniteRecursion(0);  // DO NOT RUN — stack overflow
//     return 0;
// }`}),e.jsx(a,{title:"Stack for Small, Heap for Large",children:e.jsx("p",{children:"Prefer stack allocation for small, short-lived objects — it is faster and automatically managed. Use heap allocation (via smart pointers) for large objects, objects that must outlive the creating scope, or objects whose size is not known at compile time."})}),e.jsx(o,{title:"Compare Addresses",difficulty:"beginner",prompt:"Write a program that creates one int on the stack and one on the heap. Print both addresses and determine which region each belongs to based on the address magnitude.",hints:["Stack addresses are typically very high (near 0x7fff...)","Heap addresses are typically lower","Use std::make_unique for the heap allocation"],solution:e.jsx(t,{children:`#include <iostream>
#include <memory>

int main() {
    int stackVar = 10;
    auto heapVar = std::make_unique<int>(20);

    std::cout << "Stack address: " << &stackVar << std::endl;
    std::cout << "Heap address:  " << heapVar.get() << std::endl;

    if (reinterpret_cast<uintptr_t>(&stackVar) >
        reinterpret_cast<uintptr_t>(heapVar.get())) {
        std::cout << "Stack is at higher addresses" << std::endl;
    }
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"Storage duration",url:"https://en.cppreference.com/w/cpp/language/storage_duration",description:"Automatic, dynamic, static, and thread storage"},{type:"cppreference",title:"new expression",url:"https://en.cppreference.com/w/cpp/language/new",description:"Dynamic memory allocation"},{type:"textbook",title:"The C++ Programming Language",author:"Bjarne Stroustrup",description:"Section 11.2: Free Store (Heap)"}]})]})}const O=Object.freeze(Object.defineProperty({__proto__:null,default:b},Symbol.toStringTag,{value:"Module"}));function w(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Understanding how the compiler lays out objects in memory is essential for writing cache-friendly, interoperable, and memory-efficient code. The size of a struct is often larger than the sum of its members due to ",e.jsx("strong",{children:"padding"})," inserted for alignment."]}),e.jsx(i,{title:"Object Layout",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Object layout"})," refers to how a compiler arranges a struct or class's data members in memory. Members are placed at offsets that satisfy their alignment requirements, and the compiler inserts ",e.jsx("strong",{children:"padding bytes"})," between members as needed."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"sizeof and Padding"}),e.jsx(t,{title:"Surprising sizeof results",children:`#include <iostream>

struct Padded {
    char a;    // 1 byte
    int  b;    // 4 bytes
    char c;    // 1 byte
};

struct Packed {
    int  b;    // 4 bytes
    char a;    // 1 byte
    char c;    // 1 byte
};

int main() {
    std::cout << "sizeof(Padded): " << sizeof(Padded) << std::endl;
    std::cout << "sizeof(Packed): " << sizeof(Packed) << std::endl;
    std::cout << "sizeof(char):   " << sizeof(char) << std::endl;
    std::cout << "sizeof(int):    " << sizeof(int) << std::endl;
    return 0;
}`}),e.jsx(r,{children:`sizeof(Padded): 12
sizeof(Packed): 8
sizeof(char):   1
sizeof(int):    4`}),e.jsx(n,{type:"info",title:"Why Padding Exists",children:e.jsxs("p",{children:["CPUs access memory most efficiently when data is ",e.jsx("strong",{children:"naturally aligned"})," — that is, an N-byte type sits at an address divisible by N. Misaligned access can be slower (or even illegal on some architectures). The compiler adds padding to ensure each member meets its alignment requirement."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"offsetof"}),e.jsxs(l,{title:"Using offsetof",children:[e.jsxs("p",{children:["The ",e.jsx("code",{children:"offsetof"})," macro (from ",e.jsx("code",{children:"<cstddef>"}),") returns the byte offset of a member within a standard-layout struct. It reveals exactly where padding is inserted."]}),e.jsx(t,{children:`#include <cstddef>
offsetof(StructType, memberName)  // returns size_t`})]}),e.jsx(t,{title:"Inspecting member offsets",children:`#include <iostream>
#include <cstddef>

struct Example {
    char   a;   // offset 0
    double b;   // offset 8 (7 bytes padding after a)
    char   c;   // offset 16
    int    d;   // offset 20
};

int main() {
    std::cout << "sizeof(Example): " << sizeof(Example) << std::endl;
    std::cout << "offset a: " << offsetof(Example, a) << std::endl;
    std::cout << "offset b: " << offsetof(Example, b) << std::endl;
    std::cout << "offset c: " << offsetof(Example, c) << std::endl;
    std::cout << "offset d: " << offsetof(Example, d) << std::endl;
    return 0;
}`}),e.jsx(r,{children:`sizeof(Example): 24
offset a: 0
offset b: 8
offset c: 16
offset d: 20`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Optimizing Layout"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Reordering members from largest alignment to smallest minimizes padding. This can significantly reduce memory usage in arrays of thousands of objects."}),e.jsx(t,{title:"Optimized member ordering",children:`#include <iostream>

struct Bad {
    char   a;   // 1 + 7 padding
    double b;   // 8
    char   c;   // 1 + 3 padding
    int    d;   // 4
};  // total: 24 bytes

struct Good {
    double b;   // 8
    int    d;   // 4
    char   a;   // 1
    char   c;   // 1 + 2 padding
};  // total: 16 bytes

int main() {
    std::cout << "sizeof(Bad):  " << sizeof(Bad) << std::endl;
    std::cout << "sizeof(Good): " << sizeof(Good) << std::endl;
    std::cout << "Saved: " << sizeof(Bad) - sizeof(Good) << " bytes per object" << std::endl;
    return 0;
}`}),e.jsx(r,{children:`sizeof(Bad):  24
sizeof(Good): 16
Saved: 8 bytes per object`}),e.jsx(c,{compiler:"gcc",title:"Viewing Layout",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"-Wpadded"})," with GCC to get warnings about padding inserted in your structs. The ",e.jsx("code",{children:"pahole"})," tool can also visualize struct layout and suggest reorderings."]})}),e.jsx(a,{title:"Order Members by Decreasing Alignment",children:e.jsxs("p",{children:["Place larger-aligned members first (e.g., ",e.jsx("code",{children:"double"}),", pointers) followed by smaller ones (",e.jsx("code",{children:"int"}),", ",e.jsx("code",{children:"short"}),", ",e.jsx("code",{children:"char"}),"). This minimizes internal padding and can improve cache utilization for arrays of structs."]})}),e.jsx(n,{type:"tip",title:"Impact on Performance",children:e.jsx("p",{children:"For an array of 1 million objects, saving 8 bytes each saves ~7.6 MB. Smaller objects mean more fit in a cache line, leading to fewer cache misses and faster iteration. This is a common optimization in game engines and scientific computing."})}),e.jsx(o,{title:"Minimize Struct Size",difficulty:"intermediate",prompt:"Given a struct with members bool, double, int, char, short, reorder them to minimize sizeof. Verify with sizeof and offsetof.",hints:["Start with the largest alignment type (double)","Group smaller types together at the end","The struct's total size is rounded up to its largest alignment"],solution:e.jsx(t,{children:`#include <iostream>
#include <cstddef>

struct Optimized {
    double d;   // 8 bytes, offset 0
    int    i;   // 4 bytes, offset 8
    short  s;   // 2 bytes, offset 12
    char   c;   // 1 byte,  offset 14
    bool   b;   // 1 byte,  offset 15
};  // total: 16 bytes (no trailing padding needed)

int main() {
    std::cout << "sizeof: " << sizeof(Optimized) << std::endl;
    std::cout << "d: " << offsetof(Optimized, d) << std::endl;
    std::cout << "i: " << offsetof(Optimized, i) << std::endl;
    std::cout << "s: " << offsetof(Optimized, s) << std::endl;
    std::cout << "c: " << offsetof(Optimized, c) << std::endl;
    std::cout << "b: " << offsetof(Optimized, b) << std::endl;
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"sizeof operator",url:"https://en.cppreference.com/w/cpp/language/sizeof",description:"Query the size of a type or object"},{type:"cppreference",title:"offsetof",url:"https://en.cppreference.com/w/cpp/types/offsetof",description:"Byte offset of a member in a standard-layout type"},{type:"textbook",title:"The C++ Programming Language",author:"Bjarne Stroustrup",description:"Section 8.2.6: Object Layout"}]})]})}const M=Object.freeze(Object.defineProperty({__proto__:null,default:w},Symbol.toStringTag,{value:"Module"}));function v(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Every type in C++ has an ",e.jsx("strong",{children:"alignment requirement"})," — a restriction on the memory addresses where objects of that type can be placed. Understanding alignment is crucial for performance optimization, SIMD programming, and interfacing with hardware."]}),e.jsx(i,{title:"Alignment",children:e.jsxs("p",{children:["Alignment is the number of bytes between successive addresses at which an object can be allocated. A type with alignment ",e.jsx("em",{children:"N"})," must be placed at an address that is a multiple of ",e.jsx("em",{children:"N"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"alignof Operator"}),e.jsx(t,{title:"Querying alignment requirements",children:`#include <iostream>

struct Simple {
    char a;
    int b;
    double c;
};

int main() {
    std::cout << "char:   alignof = " << alignof(char) << std::endl;
    std::cout << "int:    alignof = " << alignof(int) << std::endl;
    std::cout << "double: alignof = " << alignof(double) << std::endl;
    std::cout << "Simple: alignof = " << alignof(Simple) << std::endl;
    std::cout << "Simple: sizeof  = " << sizeof(Simple) << std::endl;
    return 0;
}`}),e.jsx(r,{children:`char:   alignof = 1
int:    alignof = 4
double: alignof = 8
Simple: alignof = 8
Simple: sizeof  = 16`}),e.jsx(n,{type:"info",title:"Why sizeof(Simple) is 16, not 13",children:e.jsxs("p",{children:["The struct has: ",e.jsx("code",{children:"char"})," (1) + 3 bytes padding + ",e.jsx("code",{children:"int"})," (4) +",e.jsx("code",{children:"double"})," (8) = 16 bytes. The compiler inserts padding to ensure each member meets its alignment requirement."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"alignas Specifier"}),e.jsxs(l,{title:"Specifying Custom Alignment",children:[e.jsxs("p",{children:[e.jsx("code",{children:"alignas(N)"})," requests alignment to at least ",e.jsx("em",{children:"N"})," bytes. The value must be a power of 2."]}),e.jsx(t,{children:`alignas(16) int x;              // 16-byte aligned
alignas(32) float arr[4];       // For AVX instructions

struct alignas(64) CacheLine {  // Cache-line aligned
    int data[16];
};`})]}),e.jsx(t,{title:"Cache-line aligned struct",children:`#include <iostream>
#include <cstdint>

struct alignas(64) CacheAligned {
    int value;
};

int main() {
    CacheAligned obj;
    std::cout << "alignof: " << alignof(CacheAligned) << std::endl;
    std::cout << "sizeof:  " << sizeof(CacheAligned) << std::endl;

    auto addr = reinterpret_cast<std::uintptr_t>(&obj);
    std::cout << "aligned to 64? " << (addr % 64 == 0 ? "yes" : "no") << std::endl;
    return 0;
}`}),e.jsx(r,{children:`alignof: 64
sizeof:  64
aligned to 64? yes`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Why Alignment Matters"}),e.jsx("div",{className:"rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800/40",children:e.jsxs("ul",{className:"space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"CPU cache lines"})," — typically 64 bytes. Misaligned data can span two cache lines."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"SIMD instructions"})," — SSE requires 16-byte, AVX requires 32-byte alignment."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Atomic operations"})," — some architectures require natural alignment for lock-free atomics."]})]})}),e.jsx(s,{title:"Over-Aligned Types and Dynamic Allocation",children:e.jsxs("p",{children:["Before C++17, ",e.jsx("code",{children:"new"})," didn't guarantee alignment beyond the default (typically 16 bytes). C++17 added aligned ",e.jsx("code",{children:"new"})," that respects ",e.jsx("code",{children:"alignas"}),"."]})}),e.jsxs(a,{title:"Order Struct Members by Size",children:[e.jsx("p",{children:"Place larger members first to minimize padding:"}),e.jsx(t,{children:`// Bad: 24 bytes (lots of padding)
struct Bad  { char a; double b; char c; int d; };

// Good: 16 bytes (minimal padding)
struct Good { double b; int d; char a; char c; };`})]}),e.jsx(c,{compiler:"gcc",title:"-Wpadded Flag",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"-Wpadded"})," to get warnings about struct padding, helping identify opportunities to reorder members."]})}),e.jsx(o,{title:"Minimize Struct Size",difficulty:"intermediate",prompt:"Reorder members of this struct to minimize sizeof: struct S { char a; double b; char c; int d; char e; };",hints:["Group members by alignment requirement (largest first)","char=1, int=4, double=8 byte alignment"],solution:e.jsx(t,{children:`// Optimized: 16 bytes (down from 32)
struct S {
    double b;  // 8
    int d;     // 4
    char a;    // 1
    char c;    // 1
    char e;    // 1 + 1 padding
};`})}),e.jsx(d,{references:[{type:"cppreference",title:"alignof operator",url:"https://en.cppreference.com/w/cpp/language/alignof"},{type:"cppreference",title:"alignas specifier",url:"https://en.cppreference.com/w/cpp/language/alignas"},{type:"conference_talk",title:"Data-Oriented Design and C++",author:"Mike Acton",description:"CppCon 2014"}]})]})}const D=Object.freeze(Object.defineProperty({__proto__:null,default:v},Symbol.toStringTag,{value:"Module"}));export{N as a,A as b,_ as c,P as d,C as e,R as f,I as g,T as h,O as i,M as j,D as k,z as s};
