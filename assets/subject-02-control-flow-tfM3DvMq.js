import{j as e}from"./vendor-BlNF5je7.js";import{D as s,S as c,C as t,O as n,B as o,a as l,N as i,E as r,R as a,W as d}from"./subject-01-fundamentals-Co6V3RzB.js";function h(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Conditional statements let your program make decisions. The ",e.jsx("code",{children:"if"})," statement is the most fundamental control flow construct in C++ -- it executes a block of code only when a given condition is true."]}),e.jsx(s,{title:"Conditional Statement",children:e.jsxs("p",{children:["A conditional statement evaluates a boolean expression and directs program execution along different paths based on whether the expression is ",e.jsx("code",{children:"true"})," or ",e.jsx("code",{children:"false"}),". In C++, any non-zero value is considered ",e.jsx("code",{children:"true"})," and zero is ",e.jsx("code",{children:"false"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic if / else if / else"}),e.jsxs(c,{title:"if Statement Syntax",children:[e.jsxs("p",{children:["The ",e.jsx("code",{children:"if"})," keyword is followed by a condition in parentheses. An optional",e.jsx("code",{children:"else if"})," tests another condition, and ",e.jsx("code",{children:"else"})," handles the remaining case."]}),e.jsx(t,{children:`if (condition1) {
    // runs when condition1 is true
} else if (condition2) {
    // runs when condition1 is false AND condition2 is true
} else {
    // runs when all conditions above are false
}`})]}),e.jsx(t,{title:"grade_checker.cpp",children:`#include <iostream>

int main() {
    int score = 85;

    if (score >= 90) {
        std::cout << "Grade: A" << std::endl;
    } else if (score >= 80) {
        std::cout << "Grade: B" << std::endl;
    } else if (score >= 70) {
        std::cout << "Grade: C" << std::endl;
    } else {
        std::cout << "Grade: F" << std::endl;
    }

    return 0;
}`}),e.jsx(n,{children:"Grade: B"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Nested Conditionals"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["You can place ",e.jsx("code",{children:"if"})," statements inside other ",e.jsx("code",{children:"if"})," statements. While sometimes necessary, deeply nested conditionals hurt readability. Consider restructuring with early returns or logical operators when nesting gets deep."]}),e.jsx(t,{title:"nested_if.cpp",children:`#include <iostream>

int main() {
    int age = 25;
    bool hasLicense = true;

    if (age >= 18) {
        if (hasLicense) {
            std::cout << "You can drive." << std::endl;
        } else {
            std::cout << "You need a license first." << std::endl;
        }
    } else {
        std::cout << "You are too young to drive." << std::endl;
    }

    return 0;
}`}),e.jsx(n,{children:"You can drive."}),e.jsx(o,{title:"Flatten nested conditionals",children:e.jsxs("p",{children:["Prefer combining conditions with logical operators (",e.jsx("code",{children:"&&"}),", ",e.jsx("code",{children:"||"}),") over deep nesting. For example, ",e.jsx("code",{children:"if (age >= 18 && hasLicense)"})," is clearer than two nested ",e.jsx("code",{children:"if"})," blocks. In functions, use early returns to reduce nesting."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Init-Statement in if (C++17)"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++17 introduced the ability to declare and initialize a variable directly inside the",e.jsx("code",{children:"if"})," statement. The variable's scope is limited to the ",e.jsx("code",{children:"if"}),"/",e.jsx("code",{children:"else"})," block, preventing it from leaking into the surrounding scope."]}),e.jsx(t,{title:"if_init.cpp",children:`#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> ages = {{"Alice", 30}, {"Bob", 25}};

    // C++17: init-statement in if
    if (auto it = ages.find("Alice"); it != ages.end()) {
        std::cout << it->first << " is " << it->second << std::endl;
    } else {
        std::cout << "Name not found" << std::endl;
    }
    // 'it' is not accessible here -- its scope ended with the if/else block

    return 0;
}`}),e.jsx(n,{children:"Alice is 30"}),e.jsx(l,{compiler:"all",title:"C++17 Required",children:e.jsxs("p",{children:["The init-statement in ",e.jsx("code",{children:"if"})," requires C++17 or later. Compile with ",e.jsx("code",{children:"-std=c++17"})," (GCC/Clang) or ",e.jsx("code",{children:"/std:c++17"})," (MSVC)."]})}),e.jsx(i,{type:"important",title:"Comparison Pitfalls",children:e.jsxs("p",{children:["A common mistake is using ",e.jsx("code",{children:"="})," (assignment) instead of ",e.jsx("code",{children:"=="})," (comparison). Writing ",e.jsx("code",{children:"if (x = 5)"})," assigns 5 to ",e.jsx("code",{children:"x"})," and always evaluates to ",e.jsx("code",{children:"true"}),". Modern compilers warn about this, but you can also place the literal on the left: ",e.jsx("code",{children:"if (5 == x)"})," so that a typo causes a compiler error."]})}),e.jsx(i,{type:"tip",title:"Comparing floating-point values",children:e.jsxs("p",{children:["Never compare floating-point numbers with ",e.jsx("code",{children:"=="}),". Due to rounding errors, use a tolerance instead: ",e.jsx("code",{children:"if (std::abs(a - b) < 1e-9)"}),"."]})}),e.jsx(r,{title:"Classify a Number",difficulty:"beginner",prompt:"Write a program that reads an integer and prints whether it is positive, negative, or zero.",hints:["Use if / else if / else with comparisons against 0","std::cin >> n reads an integer from the user"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    int n;
    std::cout << "Enter a number: ";
    std::cin >> n;

    if (n > 0) {
        std::cout << "Positive" << std::endl;
    } else if (n < 0) {
        std::cout << "Negative" << std::endl;
    } else {
        std::cout << "Zero" << std::endl;
    }

    return 0;
}`})}),e.jsx(r,{title:"Leap Year Checker",difficulty:"intermediate",prompt:"Write a program that determines if a given year is a leap year. A year is a leap year if it is divisible by 4, except century years must also be divisible by 400.",hints:["A year divisible by 400 is always a leap year","A year divisible by 100 but not 400 is NOT a leap year","A year divisible by 4 but not 100 is a leap year"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    int year = 2024;

    if (year % 400 == 0) {
        std::cout << year << " is a leap year" << std::endl;
    } else if (year % 100 == 0) {
        std::cout << year << " is not a leap year" << std::endl;
    } else if (year % 4 == 0) {
        std::cout << year << " is a leap year" << std::endl;
    } else {
        std::cout << year << " is not a leap year" << std::endl;
    }

    return 0;
}`})}),e.jsx(a,{references:[{type:"cppreference",title:"if statement",url:"https://en.cppreference.com/w/cpp/language/if",description:"Full documentation of if, else if, else, and C++17 init-statement"},{type:"cppreference",title:"Comparison operators",url:"https://en.cppreference.com/w/cpp/language/operator_comparison",description:"Equality and relational operators"},{type:"textbook",title:"A Tour of C++",author:"Bjarne Stroustrup",description:"Chapter 1: conditional execution basics"}]})]})}const v=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"}));function u(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The ",e.jsx("code",{children:"switch"})," statement provides a clean way to select one of many code paths based on the value of an integral or enumeration expression. It is often more readable than long ",e.jsx("code",{children:"if"}),"/",e.jsx("code",{children:"else if"})," chains when comparing a single variable against multiple constant values."]}),e.jsx(s,{title:"switch Statement",children:e.jsxs("p",{children:["A ",e.jsx("code",{children:"switch"})," statement transfers control to one of several labeled statements based on the value of its controlling expression. Each label is a compile-time constant. Execution continues until a ",e.jsx("code",{children:"break"})," statement or the end of the switch block."]})}),e.jsx(c,{title:"switch Syntax",children:e.jsx(t,{children:`switch (expression) {
    case constant1:
        // code for constant1
        break;
    case constant2:
        // code for constant2
        break;
    default:
        // code if no case matches
        break;
}`})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic switch Example"}),e.jsx(t,{title:"day_of_week.cpp",children:`#include <iostream>

int main() {
    int day = 3;

    switch (day) {
        case 1: std::cout << "Monday" << std::endl; break;
        case 2: std::cout << "Tuesday" << std::endl; break;
        case 3: std::cout << "Wednesday" << std::endl; break;
        case 4: std::cout << "Thursday" << std::endl; break;
        case 5: std::cout << "Friday" << std::endl; break;
        case 6: std::cout << "Saturday" << std::endl; break;
        case 7: std::cout << "Sunday" << std::endl; break;
        default: std::cout << "Invalid day" << std::endl; break;
    }

    return 0;
}`}),e.jsx(n,{children:"Wednesday"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Fallthrough Behavior"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Without a ",e.jsx("code",{children:"break"}),', execution "falls through" to the next case. This can be intentional -- for example, grouping multiple cases that share the same logic.']}),e.jsx(t,{title:"fallthrough.cpp",children:`#include <iostream>

int main() {
    int day = 6;

    switch (day) {
        case 1: case 2: case 3: case 4: case 5:
            std::cout << "Weekday" << std::endl;
            break;
        case 6: case 7:
            std::cout << "Weekend" << std::endl;
            break;
        default:
            std::cout << "Invalid" << std::endl;
            break;
    }

    return 0;
}`}),e.jsx(n,{children:"Weekend"}),e.jsx(d,{title:"Accidental fallthrough",children:e.jsxs("p",{children:["Forgetting ",e.jsx("code",{children:"break"})," is a common bug. In C++17, use the ",e.jsx("code",{children:"[[fallthrough]]"})," attribute to indicate that fallthrough is intentional. Compilers can then warn about unmarked fallthroughs."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"switch with Enums"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The ",e.jsx("code",{children:"switch"})," statement pairs naturally with enumerations. The compiler can even warn you if you forget to handle a case."]}),e.jsx(t,{title:"enum_switch.cpp",children:`#include <iostream>

enum class Color { Red, Green, Blue };

int main() {
    Color c = Color::Green;

    switch (c) {
        case Color::Red:
            std::cout << "Red: #FF0000" << std::endl;
            break;
        case Color::Green:
            std::cout << "Green: #00FF00" << std::endl;
            break;
        case Color::Blue:
            std::cout << "Blue: #0000FF" << std::endl;
            break;
    }

    return 0;
}`}),e.jsx(n,{children:"Green: #00FF00"}),e.jsx(l,{compiler:"gcc",title:"Missing case warnings",children:e.jsxs("p",{children:["Compile with ",e.jsx("code",{children:"-Wswitch"})," (enabled by ",e.jsx("code",{children:"-Wall"}),") to receive warnings when an ",e.jsx("code",{children:"enum class"})," switch does not cover all enumerators."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"C++17 Init-Statement in switch"}),e.jsx(t,{title:"switch_init.cpp",children:`#include <iostream>
#include <string>

int main() {
    std::string input = "quit";

    // C++17: variable scoped to the switch block
    switch (int len = input.length(); len) {
        case 1: case 2: case 3:
            std::cout << "Short command (" << len << " chars)" << std::endl;
            break;
        case 4:
            std::cout << "Standard command (" << len << " chars)" << std::endl;
            break;
        default:
            std::cout << "Long command (" << len << " chars)" << std::endl;
            break;
    }

    return 0;
}`}),e.jsx(n,{children:"Standard command (4 chars)"}),e.jsx(o,{title:"switch vs if-else",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"switch"})," when comparing a single variable against multiple compile-time constants, especially with enums. Use ",e.jsx("code",{children:"if"}),"/",e.jsx("code",{children:"else"})," for range checks, floating-point comparisons, or conditions involving multiple variables. Compilers often optimize ",e.jsx("code",{children:"switch"})," into efficient jump tables."]})}),e.jsx(i,{type:"info",title:"Limitations of switch",children:e.jsxs("p",{children:["The ",e.jsx("code",{children:"switch"})," expression must be of integral or enumeration type. You cannot switch on strings, floating-point values, or non-constant expressions. Case labels must be compile-time constant expressions."]})}),e.jsx(r,{title:"Simple Calculator",difficulty:"beginner",prompt:"Write a program that takes two numbers and an operator (+, -, *, /) as input and uses a switch statement to perform the correct operation.",hints:["Use a char variable for the operator","Switch on the char: '+', '-', '*', '/'","Handle division by zero in the '/' case"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    double a = 10.0, b = 3.0;
    char op = '*';

    switch (op) {
        case '+': std::cout << a + b << std::endl; break;
        case '-': std::cout << a - b << std::endl; break;
        case '*': std::cout << a * b << std::endl; break;
        case '/':
            if (b != 0) std::cout << a / b << std::endl;
            else std::cout << "Division by zero!" << std::endl;
            break;
        default:
            std::cout << "Unknown operator" << std::endl;
            break;
    }

    return 0;
}`})}),e.jsx(a,{references:[{type:"cppreference",title:"switch statement",url:"https://en.cppreference.com/w/cpp/language/switch",description:"Full switch statement documentation including C++17 init-statement"},{type:"cppreference",title:"[[fallthrough]] attribute",url:"https://en.cppreference.com/w/cpp/language/attributes/fallthrough",description:"C++17 attribute to mark intentional fallthrough"},{type:"cppreference",title:"enum class",url:"https://en.cppreference.com/w/cpp/language/enum",description:"Scoped enumerations in C++11"}]})]})}const k=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"}));function p(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:'The conditional (ternary) operator is a compact way to choose between two values based on a condition. It is the only C++ operator that takes three operands, which is why it is called "ternary."'}),e.jsx(s,{title:"Ternary Operator",children:e.jsxs("p",{children:["The ternary operator ",e.jsx("code",{children:"condition ? expr_if_true : expr_if_false"})," evaluates the condition. If ",e.jsx("code",{children:"true"}),", it yields the first expression; if ",e.jsx("code",{children:"false"}),", it yields the second. Unlike ",e.jsx("code",{children:"if"}),"/",e.jsx("code",{children:"else"}),", the ternary operator is an expression, so it produces a value."]})}),e.jsx(c,{title:"Ternary Syntax",children:e.jsx(t,{children:"result = (condition) ? value_if_true : value_if_false;"})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic Usage"}),e.jsx(t,{title:"ternary_basic.cpp",children:`#include <iostream>

int main() {
    int age = 20;

    std::string status = (age >= 18) ? "adult" : "minor";
    std::cout << "You are an " << status << "." << std::endl;

    // Ternary directly in output
    std::cout << "Can vote: " << (age >= 18 ? "yes" : "no") << std::endl;

    return 0;
}`}),e.jsx(n,{children:`You are an adult.
Can vote: yes`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Ternary for Initialization"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["One of the best uses of the ternary operator is initializing ",e.jsx("code",{children:"const"})," variables. Without the ternary, you would need a mutable variable or a helper function."]}),e.jsx(t,{title:"const_init.cpp",children:`#include <iostream>
#include <string>

int main() {
    int temperature = 35;

    // Without ternary: requires mutable variable
    // std::string weather;
    // if (temperature > 30) weather = "hot";
    // else weather = "comfortable";

    // With ternary: const initialization in one line
    const std::string weather = (temperature > 30) ? "hot" : "comfortable";

    std::cout << "The weather is " << weather << std::endl;

    return 0;
}`}),e.jsx(n,{children:"The weather is hot"}),e.jsx(o,{title:"Use ternary for simple const initialization",children:e.jsxs("p",{children:["The ternary operator shines when you need to initialize a ",e.jsx("code",{children:"const"})," variable conditionally. This keeps the variable immutable and the code concise. For anything more complex, use an ",e.jsx("code",{children:"if"}),"/",e.jsx("code",{children:"else"})," block or an immediately-invoked lambda."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Nested Ternary"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"You can nest ternary operators, but doing so quickly becomes unreadable. Most style guides discourage nested ternaries."}),e.jsx(t,{title:"nested_ternary.cpp",children:`#include <iostream>

int main() {
    int score = 85;

    // Nested ternary -- hard to read
    std::string grade = (score >= 90) ? "A"
                      : (score >= 80) ? "B"
                      : (score >= 70) ? "C"
                      : "F";

    std::cout << "Grade: " << grade << std::endl;

    return 0;
}`}),e.jsx(n,{children:"Grade: B"}),e.jsx(d,{title:"Avoid nested ternaries",children:e.jsxs("p",{children:["Nested ternaries are legal but damage readability. If you have more than one level of nesting, use ",e.jsx("code",{children:"if"}),"/",e.jsx("code",{children:"else if"}),"/",e.jsx("code",{children:"else"})," or a ",e.jsx("code",{children:"switch"})," instead. Your teammates (and future you) will thank you."]})}),e.jsx(i,{type:"info",title:"Type matching",children:e.jsxs("p",{children:["Both branches of the ternary must yield compatible types. The compiler determines a common type from the two expressions. If the types are incompatible (e.g., ",e.jsx("code",{children:"int"})," and",e.jsx("code",{children:"std::string"}),"), the code will not compile."]})}),e.jsx(i,{type:"tip",title:"Ternary as an lvalue",children:e.jsxs("p",{children:["In C++, ternary expressions can sometimes be used as lvalues (assignable targets): ",e.jsx("code",{children:"(condition ? a : b) = 42;"})," is valid when both ",e.jsx("code",{children:"a"})," and",e.jsx("code",{children:"b"})," are lvalues. This is an unusual pattern but can be useful in certain situations."]})}),e.jsx(t,{title:"ternary_lvalue.cpp",children:`#include <iostream>

int main() {
    int x = 1, y = 2;
    bool pickX = true;

    // Assign to whichever variable is selected
    (pickX ? x : y) = 100;

    std::cout << "x = " << x << ", y = " << y << std::endl;

    return 0;
}`}),e.jsx(n,{children:"x = 100, y = 2"}),e.jsx(r,{title:"Absolute Value with Ternary",difficulty:"beginner",prompt:"Write a program that computes the absolute value of an integer using the ternary operator, without calling std::abs.",hints:["If the number is negative, negate it; otherwise keep it","Use: (n < 0) ? -n : n"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    int n = -42;

    int absolute = (n < 0) ? -n : n;
    std::cout << "Absolute value of " << n << " is " << absolute << std::endl;

    return 0;
}`})}),e.jsx(r,{title:"Clamp a Value",difficulty:"intermediate",prompt:"Write a program that clamps an integer to the range [0, 100] using ternary operators. If the value is below 0, set it to 0. If above 100, set it to 100.",hints:["You can chain two ternary operations","First check if value < 0, then check if value > 100"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    int value = 150;

    int clamped = (value < 0) ? 0 : (value > 100) ? 100 : value;
    std::cout << value << " clamped to [0,100] = " << clamped << std::endl;

    return 0;
}`})}),e.jsx(a,{references:[{type:"cppreference",title:"Conditional operator",url:"https://en.cppreference.com/w/cpp/language/operator_other#Conditional_operator",description:"Full documentation of the ternary conditional operator"},{type:"cppreference",title:"Value categories",url:"https://en.cppreference.com/w/cpp/language/value_category",description:"Understanding lvalues, rvalues, and when ternary yields an lvalue"},{type:"textbook",title:"C++ Primer",author:"Stanley Lippman",description:"Section 4.7: The Conditional Operator"}]})]})}const _=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"}));function x(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Loops let you repeat a block of code multiple times. C++ provides three loop constructs: the ",e.jsx("code",{children:"for"})," loop for counted iteration, the ",e.jsx("code",{children:"while"})," loop for condition-based repetition, and the ",e.jsx("code",{children:"do-while"})," loop when the body must execute at least once."]}),e.jsx(s,{title:"Loop",children:e.jsxs("p",{children:["A loop is a control flow structure that repeatedly executes a block of code as long as a specified condition remains ",e.jsx("code",{children:"true"}),". Each execution of the loop body is called an ",e.jsx("strong",{children:"iteration"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"The for Loop"}),e.jsxs(c,{title:"for Loop Syntax",children:[e.jsxs("p",{children:["The ",e.jsx("code",{children:"for"})," loop bundles initialization, condition, and increment into one line. The loop variable is scoped to the loop body."]}),e.jsx(t,{children:`for (init; condition; increment) {
    // body -- runs while condition is true
}`})]}),e.jsx(t,{title:"for_loop.cpp",children:`#include <iostream>

int main() {
    // Print numbers 1 through 5
    for (int i = 1; i <= 5; ++i) {
        std::cout << i << " ";
    }
    std::cout << std::endl;

    // Counting backwards
    for (int i = 5; i >= 1; --i) {
        std::cout << i << " ";
    }
    std::cout << std::endl;

    return 0;
}`}),e.jsx(n,{children:`1 2 3 4 5
5 4 3 2 1`}),e.jsx(i,{type:"tip",title:"Prefer prefix increment",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"++i"})," rather than ",e.jsx("code",{children:"i++"})," in loop headers. For integers there is no performance difference, but for iterators and custom types, prefix increment avoids creating an unnecessary temporary copy."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"The while Loop"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The ",e.jsx("code",{children:"while"})," loop checks its condition before each iteration. Use it when you do not know in advance how many times the loop should run."]}),e.jsx(t,{title:"while_loop.cpp",children:`#include <iostream>

int main() {
    // Collatz conjecture: repeat until n reaches 1
    int n = 6;
    std::cout << n;

    while (n != 1) {
        if (n % 2 == 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        std::cout << " -> " << n;
    }
    std::cout << std::endl;

    return 0;
}`}),e.jsx(n,{children:"6 -> 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"The do-while Loop"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The ",e.jsx("code",{children:"do-while"})," loop executes the body first, then checks the condition. This guarantees at least one iteration, which is useful for input validation."]}),e.jsx(t,{title:"do_while.cpp",children:`#include <iostream>

int main() {
    int guess;

    do {
        std::cout << "Enter a number between 1 and 10: ";
        std::cin >> guess;
    } while (guess < 1 || guess > 10);

    std::cout << "You entered: " << guess << std::endl;

    return 0;
}`}),e.jsx(n,{children:`Enter a number between 1 and 10: 15
Enter a number between 1 and 10: 7
You entered: 7`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Infinite Loops"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Sometimes you need a loop that runs until explicitly stopped with ",e.jsx("code",{children:"break"}),". Both",e.jsx("code",{children:"for(;;)"})," and ",e.jsx("code",{children:"while(true)"})," create infinite loops."]}),e.jsx(t,{title:"infinite_loop.cpp",children:`#include <iostream>

int main() {
    int sum = 0;

    while (true) {
        int val;
        std::cout << "Enter a number (0 to stop): ";
        std::cin >> val;

        if (val == 0) break;
        sum += val;
    }

    std::cout << "Total: " << sum << std::endl;

    return 0;
}`}),e.jsx(n,{children:`Enter a number (0 to stop): 5
Enter a number (0 to stop): 3
Enter a number (0 to stop): 0
Total: 8`}),e.jsx(d,{title:"Avoid accidental infinite loops",children:e.jsxs("p",{children:["Ensure your loop condition will eventually become ",e.jsx("code",{children:"false"}),", or that there is a",e.jsx("code",{children:"break"})," path. A common mistake is forgetting to update the loop variable, causing the program to hang."]})}),e.jsx(o,{title:"Choosing the right loop",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"for"})," when you know the number of iterations. Use ",e.jsx("code",{children:"while"})," when looping until a condition changes. Use ",e.jsx("code",{children:"do-while"})," when the body must run at least once (e.g., menu prompts, input validation). Keep loop variable declarations as local as possible."]})}),e.jsx(r,{title:"Factorial Calculator",difficulty:"beginner",prompt:"Write a program that calculates the factorial of an integer n (n!) using a for loop.",hints:["Factorial of 0 is 1, factorial of n is 1 * 2 * ... * n","Use a long long to hold the result for larger values"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    int n = 6;
    long long factorial = 1;

    for (int i = 2; i <= n; ++i) {
        factorial *= i;
    }

    std::cout << n << "! = " << factorial << std::endl;

    return 0;
}`})}),e.jsx(r,{title:"FizzBuzz",difficulty:"beginner",prompt:"Print numbers from 1 to 30. For multiples of 3, print 'Fizz' instead. For multiples of 5, print 'Buzz'. For multiples of both, print 'FizzBuzz'.",hints:["Check divisibility by 15 first (multiples of both 3 and 5)","Use the modulo operator %"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    for (int i = 1; i <= 30; ++i) {
        if (i % 15 == 0) std::cout << "FizzBuzz";
        else if (i % 3 == 0) std::cout << "Fizz";
        else if (i % 5 == 0) std::cout << "Buzz";
        else std::cout << i;
        std::cout << " ";
    }
    std::cout << std::endl;

    return 0;
}`})}),e.jsx(a,{references:[{type:"cppreference",title:"for loop",url:"https://en.cppreference.com/w/cpp/language/for",description:"Full for loop documentation"},{type:"cppreference",title:"while loop",url:"https://en.cppreference.com/w/cpp/language/while",description:"while and do-while loop documentation"},{type:"textbook",title:"Programming: Principles and Practice Using C++",author:"Bjarne Stroustrup",description:"Chapter 4: Computation - iteration"}]})]})}const C=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"}));function m(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The range-based ",e.jsx("code",{children:"for"})," loop, introduced in C++11, iterates over every element in a container or range without manual index management. It is safer, more concise, and less error-prone than traditional index-based loops."]}),e.jsx(s,{title:"Range-Based for Loop",children:e.jsxs("p",{children:["A range-based ",e.jsx("code",{children:"for"})," loop iterates over each element of a range (any object that provides ",e.jsx("code",{children:"begin()"})," and ",e.jsx("code",{children:"end()"})," iterators). This includes arrays,",e.jsx("code",{children:"std::vector"}),", ",e.jsx("code",{children:"std::string"}),", ",e.jsx("code",{children:"std::map"}),", initializer lists, and any user-defined type that satisfies the range concept."]})}),e.jsx(c,{title:"Range-for Syntax",children:e.jsx(t,{children:`for (declaration : range_expression) {
    // body -- executes once per element
}`})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Iterating Over Containers"}),e.jsx(t,{title:"range_for_basics.cpp",children:`#include <iostream>
#include <vector>
#include <string>

int main() {
    // Array
    int numbers[] = {10, 20, 30, 40, 50};
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;

    // Vector
    std::vector<std::string> fruits = {"apple", "banana", "cherry"};
    for (const std::string& fruit : fruits) {
        std::cout << fruit << " ";
    }
    std::cout << std::endl;

    // String (iterates over characters)
    std::string word = "C++";
    for (char c : word) {
        std::cout << "[" << c << "]";
    }
    std::cout << std::endl;

    return 0;
}`}),e.jsx(n,{children:`10 20 30 40 50
apple banana cherry
[C][+][+]`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"auto& vs const auto&"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"How you capture the loop variable determines whether you can modify the elements and whether copies are made."}),e.jsx(t,{title:"capture_modes.cpp",children:`#include <iostream>
#include <vector>

int main() {
    std::vector<int> values = {1, 2, 3, 4, 5};

    // By value: copies each element (cannot modify original)
    for (int v : values) {
        v *= 10;  // modifies the copy, not the vector
    }

    // By reference: can modify original elements
    for (int& v : values) {
        v *= 10;
    }

    // By const reference: read-only, no copies
    for (const int& v : values) {
        std::cout << v << " ";
    }
    std::cout << std::endl;

    return 0;
}`}),e.jsx(n,{children:"10 20 30 40 50"}),e.jsx(o,{title:"Default to const auto&",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"const auto&"})," when you only need to read elements -- it avoids copies and prevents accidental modification. Use ",e.jsx("code",{children:"auto&"})," when you need to modify elements in place. Use plain ",e.jsx("code",{children:"auto"})," (by value) only for cheap-to-copy types when you intentionally want a local copy."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Structured Bindings in Range-for (C++17)"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["When iterating over containers of pairs or tuples (like ",e.jsx("code",{children:"std::map"}),"), C++17 structured bindings let you unpack each element directly in the loop header."]}),e.jsx(t,{title:"structured_bindings.cpp",children:`#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> population = {
        {"Tokyo", 14}, {"Delhi", 11}, {"Shanghai", 24}
    };

    // Without structured bindings (pre-C++17)
    for (const auto& pair : population) {
        std::cout << pair.first << ": " << pair.second << "M" << std::endl;
    }

    std::cout << "---" << std::endl;

    // With structured bindings (C++17)
    for (const auto& [city, pop] : population) {
        std::cout << city << ": " << pop << "M" << std::endl;
    }

    return 0;
}`}),e.jsx(n,{children:`Delhi: 11M
Shanghai: 24M
Tokyo: 14M
---
Delhi: 11M
Shanghai: 24M
Tokyo: 14M`}),e.jsx(l,{compiler:"all",title:"C++17 Required",children:e.jsxs("p",{children:["Structured bindings require C++17. Compile with ",e.jsx("code",{children:"-std=c++17"})," (GCC/Clang) or ",e.jsx("code",{children:"/std:c++17"})," (MSVC)."]})}),e.jsx(i,{type:"info",title:"Initializer lists in range-for",children:e.jsxs("p",{children:["You can iterate over a brace-enclosed initializer list directly without declaring a container: ",e.jsxs("code",{children:["for (int x : ","{","1, 2, 3, 4, 5","}",")"]}),". The compiler creates a temporary ",e.jsx("code",{children:"std::initializer_list"})," behind the scenes."]})}),e.jsx(i,{type:"important",title:"Do not modify container size during iteration",children:e.jsx("p",{children:"Never add or remove elements from a container while iterating over it with a range-based for loop. Doing so invalidates the iterators and causes undefined behavior. If you need to filter elements, build a new container or use the erase-remove idiom after the loop."})}),e.jsx(r,{title:"Sum and Average",difficulty:"beginner",prompt:"Given a vector of doubles, use a range-based for loop to compute the sum and average of its elements.",hints:["Use const auto& to avoid copying","Track the count with the vector's .size() method"],solution:e.jsx(t,{children:`#include <iostream>
#include <vector>

int main() {
    std::vector<double> data = {3.5, 7.2, 1.8, 9.4, 4.1};
    double sum = 0.0;

    for (const auto& val : data) {
        sum += val;
    }

    double avg = sum / data.size();
    std::cout << "Sum: " << sum << std::endl;
    std::cout << "Average: " << avg << std::endl;

    return 0;
}`})}),e.jsx(r,{title:"Word Frequency Counter",difficulty:"intermediate",prompt:"Given a vector of strings, count how many times each word appears using a std::map, then print the results using structured bindings.",hints:["Use std::map<std::string, int> to store counts","Increment the count for each word: counts[word]++","Use for (const auto& [word, count] : counts) to print"],solution:e.jsx(t,{children:`#include <iostream>
#include <vector>
#include <map>
#include <string>

int main() {
    std::vector<std::string> words = {
        "hello", "world", "hello", "cpp", "world", "hello"
    };

    std::map<std::string, int> counts;
    for (const auto& w : words) {
        counts[w]++;
    }

    for (const auto& [word, count] : counts) {
        std::cout << word << ": " << count << std::endl;
    }

    return 0;
}`})}),e.jsx(a,{references:[{type:"cppreference",title:"Range-based for loop",url:"https://en.cppreference.com/w/cpp/language/range-for",description:"Full range-for documentation including C++20 init-statement"},{type:"cppreference",title:"Structured bindings",url:"https://en.cppreference.com/w/cpp/language/structured_binding",description:"C++17 structured binding declarations"},{type:"textbook",title:"A Tour of C++",author:"Bjarne Stroustrup",description:"Chapter 1: range-for and auto"}]})]})}const T=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"}));function f(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Sometimes you need finer control over loop execution than the loop condition alone provides. The ",e.jsx("code",{children:"break"})," statement exits a loop immediately, and ",e.jsx("code",{children:"continue"})," skips the rest of the current iteration and moves to the next one."]}),e.jsx(s,{title:"break and continue",children:e.jsxs("p",{children:[e.jsx("code",{children:"break"})," terminates the innermost enclosing loop or switch statement and transfers control to the statement following it. ",e.jsx("code",{children:"continue"})," skips the remaining body of the innermost loop and proceeds to the next iteration (re-evaluating the condition)."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Using break"}),e.jsx(t,{title:"break_example.cpp",children:`#include <iostream>

int main() {
    // Find the first number divisible by 7 above 50
    for (int i = 51; i < 100; ++i) {
        if (i % 7 == 0) {
            std::cout << "First number above 50 divisible by 7: " << i << std::endl;
            break;  // exit the loop immediately
        }
    }

    return 0;
}`}),e.jsx(n,{children:"First number above 50 divisible by 7: 56"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Using continue"}),e.jsx(t,{title:"continue_example.cpp",children:`#include <iostream>

int main() {
    // Print only odd numbers from 1 to 10
    for (int i = 1; i <= 10; ++i) {
        if (i % 2 == 0) {
            continue;  // skip even numbers
        }
        std::cout << i << " ";
    }
    std::cout << std::endl;

    return 0;
}`}),e.jsx(n,{children:"1 3 5 7 9"}),e.jsx(i,{type:"tip",title:"continue in different loop types",children:e.jsxs("p",{children:["In a ",e.jsx("code",{children:"for"})," loop, ",e.jsx("code",{children:"continue"})," jumps to the increment expression. In a",e.jsx("code",{children:"while"})," or ",e.jsx("code",{children:"do-while"})," loop, it jumps directly to the condition check. Be careful with ",e.jsx("code",{children:"while"})," loops -- if the variable update is after the",e.jsx("code",{children:"continue"}),", you may create an infinite loop."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Breaking Out of Nested Loops"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Unlike some languages, C++ does not have labeled loops. A ",e.jsx("code",{children:"break"})," only exits the innermost loop. To break out of multiple loops, you have several options."]}),e.jsx(t,{title:"nested_break.cpp",children:`#include <iostream>

int main() {
    // Approach 1: use a flag variable
    bool found = false;
    for (int i = 0; i < 5 && !found; ++i) {
        for (int j = 0; j < 5; ++j) {
            if (i * j == 12) {
                std::cout << "Found: i=" << i << " j=" << j << std::endl;
                found = true;
                break;  // exits inner loop; flag stops outer loop
            }
        }
    }

    // Approach 2: extract into a function (preferred)
    // The function can simply return when the condition is met.

    return 0;
}`}),e.jsx(n,{children:"Found: i=3 j=4"}),e.jsxs(c,{title:"Lambda for nested loop break",children:[e.jsxs("p",{children:["A clean modern approach uses an immediately-invoked lambda, which lets you use ",e.jsx("code",{children:"return"})," to escape both loops."]}),e.jsx(t,{children:`[&]() {
    for (int i = 0; i < 10; ++i) {
        for (int j = 0; j < 10; ++j) {
            if (someCondition(i, j)) return;  // exits both loops
        }
    }
}();`})]}),e.jsx(o,{title:"Prefer extracting functions over goto",children:e.jsxs("p",{children:["When you need to break out of nested loops, the cleanest solution is extracting the nested loops into a separate function and using ",e.jsx("code",{children:"return"}),". This avoids flags, avoids",e.jsx("code",{children:"goto"}),", and gives the operation a descriptive name."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"goto: The Last Resort"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++ inherits ",e.jsx("code",{children:"goto"})," from C. It performs an unconditional jump to a labeled statement. While it can break out of deeply nested loops, it makes control flow hard to follow and is almost never the right choice."]}),e.jsx(t,{title:"goto_example.cpp",children:`#include <iostream>

int main() {
    for (int i = 0; i < 5; ++i) {
        for (int j = 0; j < 5; ++j) {
            if (i + j == 6) {
                std::cout << "Found: i=" << i << " j=" << j << std::endl;
                goto done;  // jump to label
            }
        }
    }
done:  // label
    std::cout << "Search complete." << std::endl;

    return 0;
}`}),e.jsx(n,{children:`Found: i=2 j=4
Search complete.`}),e.jsx(d,{title:"Avoid goto in modern C++",children:e.jsxs("p",{children:["The ",e.jsx("code",{children:"goto"})," statement can jump over variable declarations, skip destructors, and create spaghetti control flow. The C++ Core Guidelines recommend against using it. Use functions, lambdas, or flag variables instead."]})}),e.jsx(i,{type:"history",title:"Dijkstra's famous letter",children:e.jsxs("p",{children:['In 1968, Edsger Dijkstra published "Go To Statement Considered Harmful," arguing that unrestricted use of ',e.jsx("code",{children:"goto"})," leads to unmaintainable code. This letter was influential in promoting structured programming."]})}),e.jsx(r,{title:"Find a Prime",difficulty:"beginner",prompt:"Write a program that finds the first prime number greater than 100 using a loop with break.",hints:["A prime number is only divisible by 1 and itself","For each candidate, check divisibility by 2 through sqrt(candidate)","Use break when you find the first prime"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    for (int n = 101; ; ++n) {
        bool isPrime = true;
        for (int d = 2; d * d <= n; ++d) {
            if (n % d == 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            std::cout << "First prime > 100: " << n << std::endl;
            break;
        }
    }

    return 0;
}`})}),e.jsx(r,{title:"Skip Vowels",difficulty:"beginner",prompt:"Write a program that prints all characters of a string except vowels, using continue to skip them.",hints:["Check if each character is a, e, i, o, or u (consider uppercase too)","Use continue to skip the print statement for vowels"],solution:e.jsx(t,{children:`#include <iostream>
#include <string>

int main() {
    std::string text = "Hello World";

    for (char c : text) {
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' ||
            c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U') {
            continue;
        }
        std::cout << c;
    }
    std::cout << std::endl;

    return 0;
}`})}),e.jsx(a,{references:[{type:"cppreference",title:"break statement",url:"https://en.cppreference.com/w/cpp/language/break",description:"Break statement documentation"},{type:"cppreference",title:"continue statement",url:"https://en.cppreference.com/w/cpp/language/continue",description:"Continue statement documentation"},{type:"cppreference",title:"goto statement",url:"https://en.cppreference.com/w/cpp/language/goto",description:"goto and labeled statements"}]})]})}const N=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"}));function g(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Exceptions are C++'s primary mechanism for handling runtime errors. When an error occurs, you ",e.jsx("code",{children:"throw"})," an exception object. Execution immediately transfers to the nearest matching ",e.jsx("code",{children:"catch"})," handler, unwinding the call stack along the way."]}),e.jsx(s,{title:"Exception",children:e.jsxs("p",{children:["An exception is an object that represents an error condition. When thrown, it interrupts normal program flow and propagates up the call stack until a ",e.jsx("code",{children:"catch"})," block handles it. If no handler is found, the program calls ",e.jsx("code",{children:"std::terminate"})," and aborts."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"throw, try, and catch"}),e.jsx(c,{title:"Exception Syntax",children:e.jsx(t,{children:`try {
    // code that might throw
    throw exception_object;
} catch (const ExceptionType& e) {
    // handle the exception
}`})}),e.jsx(t,{title:"basic_exception.cpp",children:`#include <iostream>
#include <stdexcept>

double divide(double a, double b) {
    if (b == 0.0) {
        throw std::invalid_argument("Division by zero");
    }
    return a / b;
}

int main() {
    try {
        std::cout << divide(10.0, 3.0) << std::endl;
        std::cout << divide(5.0, 0.0) << std::endl;  // throws
        std::cout << "This line never executes" << std::endl;
    } catch (const std::invalid_argument& e) {
        std::cout << "Error: " << e.what() << std::endl;
    }

    std::cout << "Program continues normally." << std::endl;

    return 0;
}`}),e.jsx(n,{children:`3.33333
Error: Division by zero
Program continues normally.`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"The std::exception Hierarchy"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The standard library defines a hierarchy of exception classes rooted at ",e.jsx("code",{children:"std::exception"}),". The two main branches are ",e.jsx("code",{children:"std::logic_error"})," (programming mistakes) and",e.jsx("code",{children:"std::runtime_error"})," (conditions detectable only at runtime)."]}),e.jsx(t,{title:"exception_types.cpp",children:`#include <iostream>
#include <stdexcept>
#include <vector>

int main() {
    try {
        std::vector<int> v = {1, 2, 3};
        std::cout << v.at(10) << std::endl;  // throws std::out_of_range
    } catch (const std::out_of_range& e) {
        std::cout << "Out of range: " << e.what() << std::endl;
    } catch (const std::exception& e) {
        // Catches any standard exception not caught above
        std::cout << "Exception: " << e.what() << std::endl;
    }

    return 0;
}`}),e.jsx(n,{children:"Out of range: vector::_M_range_check: __n (which is 10) >= this->size() (which is 3)"}),e.jsx(o,{title:"Catch by const reference",children:e.jsxs("p",{children:["Always catch exceptions by ",e.jsx("code",{children:"const"})," reference (",e.jsx("code",{children:"const std::exception& e"}),"). Catching by value causes slicing -- derived exception data is lost. Catching by pointer raises lifetime issues. Const reference is safe and efficient."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Multiple catch Blocks and Rethrowing"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["You can have multiple ",e.jsx("code",{children:"catch"})," blocks for different exception types. They are tested in order, so put more specific types first. Use ",e.jsx("code",{children:"throw;"})," (with no operand) to rethrow the current exception after partial handling."]}),e.jsx(t,{title:"rethrow.cpp",children:`#include <iostream>
#include <stdexcept>

void process(int value) {
    try {
        if (value < 0) throw std::out_of_range("Negative value");
        if (value == 0) throw std::runtime_error("Zero value");
        std::cout << "Processing: " << value << std::endl;
    } catch (const std::out_of_range& e) {
        std::cout << "Logging: " << e.what() << std::endl;
        throw;  // rethrow to caller
    }
}

int main() {
    try {
        process(-5);
    } catch (const std::exception& e) {
        std::cout << "Caught in main: " << e.what() << std::endl;
    }

    return 0;
}`}),e.jsx(n,{children:`Logging: Negative value
Caught in main: Negative value`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"The noexcept Specifier"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Marking a function ",e.jsx("code",{children:"noexcept"})," promises it will not throw exceptions. If it does throw, the program calls ",e.jsx("code",{children:"std::terminate"}),". This enables compiler optimizations and is important for move operations."]}),e.jsx(t,{title:"noexcept_example.cpp",children:`#include <iostream>

int safe_add(int a, int b) noexcept {
    return a + b;  // guaranteed not to throw
}

int main() {
    std::cout << safe_add(3, 4) << std::endl;
    std::cout << std::boolalpha;
    std::cout << "safe_add is noexcept: "
              << noexcept(safe_add(1, 2)) << std::endl;

    return 0;
}`}),e.jsx(n,{children:`7
safe_add is noexcept: true`}),e.jsx(i,{type:"important",title:"When to use noexcept",children:e.jsxs("p",{children:["Mark functions ",e.jsx("code",{children:"noexcept"})," when they truly cannot fail: move constructors, move assignment operators, destructors, swap functions, and simple accessors. The standard library uses ",e.jsx("code",{children:"noexcept"})," information to choose optimized code paths (e.g.,",e.jsx("code",{children:"std::vector"})," uses move operations only if they are ",e.jsx("code",{children:"noexcept"}),")."]})}),e.jsx(d,{title:"catch (...) -- the catch-all",children:e.jsxs("p",{children:["The syntax ",e.jsx("code",{children:"catch (...)"})," catches any exception, including non-standard types. Use it sparingly and only at top-level boundaries. You cannot access the exception object with this syntax. Always prefer catching specific types."]})}),e.jsx(r,{title:"Safe String to Integer",difficulty:"intermediate",prompt:"Write a function that converts a string to an integer using std::stoi, catching std::invalid_argument and std::out_of_range exceptions. Return a default value on failure.",hints:["std::stoi throws std::invalid_argument for non-numeric strings","std::stoi throws std::out_of_range for values too large","Catch each exception type separately with descriptive messages"],solution:e.jsx(t,{children:`#include <iostream>
#include <string>
#include <stdexcept>

int safe_stoi(const std::string& s, int default_val = 0) {
    try {
        return std::stoi(s);
    } catch (const std::invalid_argument& e) {
        std::cout << "Invalid: '" << s << "' is not a number" << std::endl;
    } catch (const std::out_of_range& e) {
        std::cout << "Out of range: '" << s << "'" << std::endl;
    }
    return default_val;
}

int main() {
    std::cout << safe_stoi("42") << std::endl;
    std::cout << safe_stoi("abc") << std::endl;
    std::cout << safe_stoi("99999999999999999999") << std::endl;

    return 0;
}`})}),e.jsx(a,{references:[{type:"cppreference",title:"Exceptions",url:"https://en.cppreference.com/w/cpp/language/exceptions",description:"Overview of C++ exception handling"},{type:"cppreference",title:"std::exception",url:"https://en.cppreference.com/w/cpp/error/exception",description:"Base class for all standard exceptions"},{type:"cppreference",title:"noexcept specifier",url:"https://en.cppreference.com/w/cpp/language/noexcept_spec",description:"noexcept specification documentation"},{type:"textbook",title:"The C++ Programming Language",author:"Bjarne Stroustrup",description:"Chapter 13: Exception Handling"}]})]})}const S=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"}));function y(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Writing code that uses exceptions is straightforward. Writing code that behaves correctly",e.jsx("em",{children:" when"})," exceptions are thrown is harder. Exception safety describes the guarantees a function provides about program state if an exception occurs during its execution."]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Three Levels of Exception Safety"}),e.jsxs(s,{title:"Exception Safety Guarantees",children:[e.jsx("p",{children:"There are three levels of exception safety, from weakest to strongest:"}),e.jsxs("ul",{className:"list-disc list-inside mt-2 space-y-1",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Basic guarantee:"})," No resources are leaked and invariants are preserved, but the program state may have changed."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Strong guarantee:"})," If an operation fails, the program state is rolled back to exactly what it was before the operation began (commit-or-rollback semantics)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Nothrow guarantee:"})," The operation is guaranteed never to throw. Marked with ",e.jsx("code",{children:"noexcept"}),"."]})]})]}),e.jsx(t,{title:"safety_levels.cpp",children:`#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

// Basic guarantee: no leaks, but partial modification possible
void append_items_basic(std::vector<std::string>& out,
                        const std::vector<std::string>& items) {
    for (const auto& item : items) {
        out.push_back(item);  // if this throws, some items were added
    }
}

// Strong guarantee: all-or-nothing
void append_items_strong(std::vector<std::string>& out,
                         const std::vector<std::string>& items) {
    std::vector<std::string> temp = out;  // work on a copy
    for (const auto& item : items) {
        temp.push_back(item);
    }
    std::swap(out, temp);  // swap is noexcept -- commit
}

// Nothrow guarantee
int add(int a, int b) noexcept {
    return a + b;  // cannot fail
}

int main() {
    std::vector<std::string> data = {"alpha", "beta"};
    append_items_strong(data, {"gamma", "delta"});

    for (const auto& s : data) {
        std::cout << s << " ";
    }
    std::cout << std::endl;

    return 0;
}`}),e.jsx(n,{children:"alpha beta gamma delta"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"RAII and Exception Safety"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"RAII (Resource Acquisition Is Initialization) is the foundation of exception safety in C++. When an exception causes the stack to unwind, local objects are destroyed in reverse order of construction. If resources are managed by RAII objects, they are automatically released."}),e.jsx(t,{title:"raii_safety.cpp",children:`#include <iostream>
#include <fstream>
#include <stdexcept>

void write_report(const std::string& filename) {
    // std::ofstream is an RAII type: closes the file in its destructor
    std::ofstream file(filename);
    if (!file.is_open()) {
        throw std::runtime_error("Cannot open file: " + filename);
    }

    file << "Report header" << std::endl;
    // Even if an exception is thrown here...
    file << "Report data" << std::endl;
    // ...the file is automatically closed when 'file' is destroyed
}

int main() {
    try {
        write_report("report.txt");
        std::cout << "Report written successfully." << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Error: " << e.what() << std::endl;
    }

    return 0;
}`}),e.jsx(n,{children:"Report written successfully."}),e.jsx(d,{title:"Never manage resources manually",children:e.jsxs("p",{children:["If you allocate with ",e.jsx("code",{children:"new"})," and free with ",e.jsx("code",{children:"delete"}),", an exception between them causes a memory leak. Always use RAII wrappers: ",e.jsx("code",{children:"std::unique_ptr"}),",",e.jsx("code",{children:"std::shared_ptr"}),", ",e.jsx("code",{children:"std::vector"}),", ",e.jsx("code",{children:"std::string"}),",",e.jsx("code",{children:"std::lock_guard"}),", and others."]})}),e.jsxs(c,{title:"The copy-and-swap idiom (strong guarantee)",children:[e.jsxs("p",{children:["To provide the strong guarantee for assignment operators, perform all potentially-throwing work on a temporary copy, then swap with the current object using a ",e.jsx("code",{children:"noexcept"})," swap."]}),e.jsx(t,{children:`MyClass& operator=(MyClass other) {  // copy made here (may throw)
    swap(*this, other);               // noexcept swap -- commit
    return *this;                     // old data destroyed with 'other'
}`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Stack Unwinding"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["When an exception is thrown, the runtime walks back up the call stack, destroying local objects in each frame, until it finds a matching ",e.jsx("code",{children:"catch"})," handler. This process is called ",e.jsx("strong",{children:"stack unwinding"}),". Destructors of all local objects are called, which is why RAII works."]}),e.jsx(t,{title:"stack_unwinding.cpp",children:`#include <iostream>
#include <stdexcept>

struct Tracer {
    std::string name;
    Tracer(std::string n) : name(std::move(n)) {
        std::cout << "  Constructed: " << name << std::endl;
    }
    ~Tracer() {
        std::cout << "  Destroyed: " << name << std::endl;
    }
};

void inner() {
    Tracer t3("C");
    throw std::runtime_error("Something went wrong");
}

void outer() {
    Tracer t2("B");
    inner();
}

int main() {
    Tracer t1("A");
    try {
        outer();
    } catch (const std::exception& e) {
        std::cout << "Caught: " << e.what() << std::endl;
    }

    return 0;
}`}),e.jsx(n,{children:`  Constructed: A
  Constructed: B
  Constructed: C
  Destroyed: C
  Destroyed: B
Caught: Something went wrong
  Destroyed: A`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::terminate"}),e.jsx(i,{type:"important",title:"When std::terminate is called",children:e.jsxs("p",{children:["The program calls ",e.jsx("code",{children:"std::terminate"})," (which by default calls ",e.jsx("code",{children:"std::abort"}),") in these situations: an exception escapes a ",e.jsx("code",{children:"noexcept"})," function, an exception is thrown during stack unwinding (i.e., from a destructor), or an exception is never caught. This is why destructors must never throw."]})}),e.jsx(o,{title:"Destructors must not throw",children:e.jsxs("p",{children:["A destructor that throws during stack unwinding causes ",e.jsx("code",{children:"std::terminate"}),". Always mark destructors ",e.jsx("code",{children:"noexcept"})," (they are implicitly ",e.jsx("code",{children:"noexcept"})," since C++11). If cleanup can fail, log the error or suppress it -- never propagate it as an exception."]})}),e.jsx(r,{title:"RAII File Writer",difficulty:"intermediate",prompt:"Create a FileWriter class that opens a file in its constructor and closes it in its destructor (RAII). Write a function that uses it and throws an exception partway through -- verify that the file is still properly closed.",hints:["Store an std::ofstream as a member","Open the file in the constructor, check for errors","The destructor just needs to exist -- std::ofstream closes automatically","Throw an exception after writing some data"],solution:e.jsx(t,{children:`#include <iostream>
#include <fstream>
#include <stdexcept>

class FileWriter {
    std::ofstream file_;
public:
    FileWriter(const std::string& path) : file_(path) {
        if (!file_.is_open()) {
            throw std::runtime_error("Cannot open: " + path);
        }
        std::cout << "File opened" << std::endl;
    }

    void write(const std::string& text) {
        file_ << text << std::endl;
    }

    ~FileWriter() {
        std::cout << "File closed (destructor)" << std::endl;
    }
};

void generate_report() {
    FileWriter writer("output.txt");
    writer.write("Line 1");
    throw std::runtime_error("Simulated error");
    writer.write("Line 2");  // never reached
}

int main() {
    try {
        generate_report();
    } catch (const std::exception& e) {
        std::cout << "Caught: " << e.what() << std::endl;
    }

    return 0;
}`})}),e.jsx(a,{references:[{type:"cppreference",title:"RAII",url:"https://en.cppreference.com/w/cpp/language/raii",description:"Resource Acquisition Is Initialization idiom"},{type:"cppreference",title:"std::terminate",url:"https://en.cppreference.com/w/cpp/error/terminate",description:"When and how std::terminate is called"},{type:"textbook",title:"Effective Modern C++",author:"Scott Meyers",description:"Item 14: Declare functions noexcept if they won't emit exceptions"},{type:"textbook",title:"Exceptional C++",author:"Herb Sutter",description:"Comprehensive coverage of exception safety guarantees"}]})]})}const E=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"}));function j(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++ offers multiple error handling strategies, each with different trade-offs. Understanding when to use exceptions, error codes, ",e.jsx("code",{children:"std::optional"}),", or ",e.jsx("code",{children:"std::expected"})," is essential for writing robust, maintainable code."]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Exceptions"}),e.jsx(s,{title:"When to Use Exceptions",children:e.jsxs("p",{children:["Exceptions are best for ",e.jsx("strong",{children:"truly exceptional"})," situations -- errors that the immediate caller cannot reasonably handle. They separate error handling from normal logic and cannot be accidentally ignored. They are the default error mechanism for constructors, which have no return value."]})}),e.jsx(t,{title:"exceptions.cpp",children:`#include <iostream>
#include <fstream>
#include <stdexcept>

std::string read_file(const std::string& path) {
    std::ifstream file(path);
    if (!file.is_open()) {
        throw std::runtime_error("Cannot open file: " + path);
    }
    std::string content((std::istreambuf_iterator<char>(file)),
                         std::istreambuf_iterator<char>());
    return content;
}

int main() {
    try {
        std::string data = read_file("config.txt");
        std::cout << "Read " << data.size() << " bytes" << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Error: " << e.what() << std::endl;
    }

    return 0;
}`}),e.jsx(n,{children:"Error: Cannot open file: config.txt"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Error Codes"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Error codes are simple return values that indicate success or failure. They are common in C-style APIs and in performance-critical code where exception overhead is unacceptable. The downside: callers can silently ignore them."}),e.jsx(t,{title:"error_codes.cpp",children:`#include <iostream>
#include <system_error>

enum class ParseError {
    None = 0,
    EmptyInput,
    InvalidFormat,
    OutOfRange
};

struct ParseResult {
    int value;
    ParseError error;
};

ParseResult parse_int(const std::string& s) {
    if (s.empty()) return {0, ParseError::EmptyInput};

    try {
        size_t pos;
        int val = std::stoi(s, &pos);
        if (pos != s.size()) return {0, ParseError::InvalidFormat};
        return {val, ParseError::None};
    } catch (...) {
        return {0, ParseError::OutOfRange};
    }
}

int main() {
    auto [value, error] = parse_int("42");
    if (error == ParseError::None) {
        std::cout << "Parsed: " << value << std::endl;
    }

    auto [v2, e2] = parse_int("abc");
    if (e2 != ParseError::None) {
        std::cout << "Parse failed" << std::endl;
    }

    return 0;
}`}),e.jsx(n,{children:`Parsed: 42
Parse failed`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::optional (C++17)"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"std::optional<T>"})," holds either a value of type ",e.jsx("code",{children:"T"})," or nothing. It is ideal for functions that may legitimately have no result -- not because of an error, but because the answer does not exist."]}),e.jsx(t,{title:"optional.cpp",children:`#include <iostream>
#include <optional>
#include <string>
#include <map>

std::optional<int> find_user_age(const std::string& name) {
    std::map<std::string, int> users = {{"Alice", 30}, {"Bob", 25}};

    auto it = users.find(name);
    if (it != users.end()) {
        return it->second;
    }
    return std::nullopt;  // no value
}

int main() {
    if (auto age = find_user_age("Alice")) {
        std::cout << "Alice is " << *age << " years old" << std::endl;
    }

    auto result = find_user_age("Charlie");
    std::cout << "Charlie found: " << std::boolalpha
              << result.has_value() << std::endl;

    // value_or provides a default
    int age = find_user_age("Charlie").value_or(-1);
    std::cout << "Charlie's age (or default): " << age << std::endl;

    return 0;
}`}),e.jsx(n,{children:`Alice is 30 years old
Charlie found: false
Charlie's age (or default): -1`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::expected (C++23)"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"std::expected<T, E>"})," holds either a value of type ",e.jsx("code",{children:"T"})," or an error of type ",e.jsx("code",{children:"E"}),". It combines the explicitness of error codes with the type safety of ",e.jsx("code",{children:"std::optional"}),", while also carrying error information."]}),e.jsx(t,{title:"expected.cpp",children:`#include <iostream>
#include <expected>
#include <string>

enum class MathError { DivisionByZero, Overflow };

std::expected<double, MathError> safe_divide(double a, double b) {
    if (b == 0.0) {
        return std::unexpected(MathError::DivisionByZero);
    }
    return a / b;
}

int main() {
    auto result = safe_divide(10.0, 3.0);
    if (result) {
        std::cout << "10 / 3 = " << *result << std::endl;
    }

    auto bad = safe_divide(5.0, 0.0);
    if (!bad) {
        std::cout << "Error: ";
        if (bad.error() == MathError::DivisionByZero) {
            std::cout << "division by zero" << std::endl;
        }
    }

    return 0;
}`}),e.jsx(n,{children:`10 / 3 = 3.33333
Error: division by zero`}),e.jsx(l,{compiler:"all",title:"C++23 Required for std::expected",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::expected"})," requires C++23. Use ",e.jsx("code",{children:"-std=c++23"})," (GCC 12+ / Clang 16+) or ",e.jsx("code",{children:"/std:c++latest"})," (MSVC). For earlier standards, consider third-party libraries like ",e.jsx("code",{children:"tl::expected"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Choosing the Right Strategy"}),e.jsx(i,{type:"info",title:"Decision guide",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Exceptions:"})," Use for constructor failures, truly unexpected errors, and when error handling should not clutter the happy path. Avoid in hot loops or real-time code.",e.jsx("br",{}),e.jsx("strong",{children:"Error codes:"})," Use in C interop, low-level libraries, and performance-critical paths where exceptions are too costly.",e.jsx("br",{}),e.jsx("strong",{children:"std::optional:"}),' Use when "no result" is a normal, expected outcome (e.g., lookups, parsing attempts).',e.jsx("br",{}),e.jsx("strong",{children:"std::expected:"}),' Use when you need to communicate both "no result" and "why" without exceptions.']})}),e.jsx(d,{title:"Error handling in constructors",children:e.jsxs("p",{children:["Constructors have no return value, so error codes and ",e.jsx("code",{children:"std::optional"})," are not options. If a constructor cannot establish a valid object, throw an exception. This prevents partially-constructed objects from existing. An alternative is using factory functions that return ",e.jsx("code",{children:"std::optional"})," or ",e.jsx("code",{children:"std::expected"}),"."]})}),e.jsx(i,{type:"tip",title:"Performance considerations",children:e.jsx("p",{children:"Exceptions have zero cost on the happy path (no overhead when no exception is thrown) but significant cost when thrown (stack unwinding). Error codes have a small constant cost on every call (checking the return value). Choose based on how frequently errors occur: if errors are rare, exceptions are faster overall."})}),e.jsx(o,{title:"Be consistent within a codebase",children:e.jsx("p",{children:"Mixing error strategies inconsistently is worse than any single approach. Choose a primary strategy for your project and document it. Convert between strategies at API boundaries. For most C++ projects, exceptions are the default; use alternatives where you have a specific reason."})}),e.jsx(r,{title:"Optional-Based Lookup",difficulty:"intermediate",prompt:"Write a function that looks up a student's grade (as a char) from a map. Use std::optional to handle the case where the student is not found. Print the grade if found, or a default message otherwise.",hints:["Return std::optional<char> from the lookup function","Use .value_or('?') or check .has_value()","Use std::map<std::string, char> for the grade data"],solution:e.jsx(t,{children:`#include <iostream>
#include <optional>
#include <map>
#include <string>

std::optional<char> get_grade(const std::map<std::string, char>& grades,
                              const std::string& name) {
    auto it = grades.find(name);
    if (it != grades.end()) {
        return it->second;
    }
    return std::nullopt;
}

int main() {
    std::map<std::string, char> grades = {
        {"Alice", 'A'}, {"Bob", 'B'}, {"Carol", 'C'}
    };

    for (const auto& name : {"Alice", "Dave"}) {
        auto grade = get_grade(grades, name);
        if (grade) {
            std::cout << name << ": " << *grade << std::endl;
        } else {
            std::cout << name << ": not enrolled" << std::endl;
        }
    }

    return 0;
}`})}),e.jsx(r,{title:"Factory Function with std::expected",difficulty:"advanced",prompt:"Write a factory function create_connection(host, port) that returns std::expected<Connection, std::string>. Simulate failure for invalid ports (< 1 or > 65535) and empty hostnames.",hints:["Define a simple Connection struct with host and port members","Return std::unexpected(error_message) for failures","Return the Connection object directly for success"],solution:e.jsx(t,{children:`#include <iostream>
#include <expected>
#include <string>

struct Connection {
    std::string host;
    int port;
};

std::expected<Connection, std::string>
create_connection(const std::string& host, int port) {
    if (host.empty()) {
        return std::unexpected("Empty hostname");
    }
    if (port < 1 || port > 65535) {
        return std::unexpected("Invalid port: " + std::to_string(port));
    }
    return Connection{host, port};
}

int main() {
    auto conn = create_connection("localhost", 8080);
    if (conn) {
        std::cout << "Connected to " << conn->host
                  << ":" << conn->port << std::endl;
    }

    auto bad = create_connection("", 80);
    if (!bad) {
        std::cout << "Error: " << bad.error() << std::endl;
    }

    return 0;
}`})}),e.jsx(a,{references:[{type:"cppreference",title:"std::optional",url:"https://en.cppreference.com/w/cpp/utility/optional",description:"Optional value wrapper (C++17)"},{type:"cppreference",title:"std::expected",url:"https://en.cppreference.com/w/cpp/utility/expected",description:"Expected value or error (C++23)"},{type:"cppreference",title:"Error handling",url:"https://en.cppreference.com/w/cpp/error",description:"Overview of C++ error handling facilities"},{type:"textbook",title:"C++ Best Practices",author:"Jason Turner",description:"Error handling strategy recommendations"}]})]})}const I=Object.freeze(Object.defineProperty({__proto__:null,default:j},Symbol.toStringTag,{value:"Module"}));export{k as a,_ as b,C as c,T as d,N as e,S as f,E as g,I as h,v as s};
