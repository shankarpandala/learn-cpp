import{j as e}from"./vendor-BlNF5je7.js";import{D as i,S as a,C as t,O as r,N as s,B as n,E as o,R as c,W as l,a as d}from"./subject-01-fundamentals-DsAKErwb.js";function u(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Classes are the foundation of object-oriented programming in C++. A class bundles data (member variables) and behavior (member functions) into a single user-defined type, allowing you to model real-world concepts directly in code."}),e.jsx(i,{title:"What is a Class?",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"class"})," is a user-defined type that encapsulates data members and member functions into a single unit. Objects are instances of a class. By default, members of a class are ",e.jsx("code",{children:"private"}),", whereas members of a ",e.jsx("code",{children:"struct"})," are ",e.jsx("code",{children:"public"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Defining a Class"}),e.jsxs(a,{title:"Class Declaration Syntax",children:[e.jsxs("p",{children:["A class is declared with the ",e.jsx("code",{children:"class"})," keyword, followed by the class name and a body enclosed in braces. The declaration must end with a semicolon."]}),e.jsx(t,{children:`class ClassName {
    // data members and member functions
};  // <-- semicolon required`})]}),e.jsx(t,{title:"A simple Rectangle class",children:`#include <iostream>

class Rectangle {
public:
    double width;
    double height;

    double area() {
        return width * height;
    }

    void print() {
        std::cout << width << " x " << height
                  << " = " << area() << std::endl;
    }
};

int main() {
    Rectangle r;
    r.width = 5.0;
    r.height = 3.0;
    r.print();
    return 0;
}`}),e.jsx(r,{children:"5 x 3 = 15"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"The this Pointer"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Inside any non-static member function, the ",e.jsx("code",{children:"this"})," pointer is an implicit pointer to the object on which the function was called. It is useful when a parameter name shadows a data member."]}),e.jsx(t,{title:"Using the this pointer",children:`#include <iostream>

class Point {
    double x, y;
public:
    Point& set(double x, double y) {
        this->x = x;  // this-> disambiguates member from parameter
        this->y = y;
        return *this;  // return the current object for chaining
    }

    void print() const {
        std::cout << "(" << x << ", " << y << ")" << std::endl;
    }
};

int main() {
    Point p;
    p.set(3.0, 4.0).print();
    return 0;
}`}),e.jsx(r,{children:"(3, 4)"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"struct vs class"}),e.jsx(s,{type:"info",title:"struct vs class in C++",children:e.jsxs("p",{children:["In C++, ",e.jsx("code",{children:"struct"})," and ",e.jsx("code",{children:"class"})," are nearly identical. The only difference is default access: ",e.jsx("code",{children:"struct"})," members are ",e.jsx("code",{children:"public"})," by default, while ",e.jsx("code",{children:"class"})," members are ",e.jsx("code",{children:"private"})," by default. By convention, ",e.jsx("code",{children:"struct"})," is used for plain data aggregates and ",e.jsx("code",{children:"class"})," for types with invariants and behavior."]})}),e.jsx(t,{title:"struct vs class defaults",children:`struct PublicByDefault {
    int x;       // public
    void f();    // public
};

class PrivateByDefault {
    int x;       // private
    void f();    // private
};`}),e.jsx(n,{title:"Use class for types with invariants",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"struct"})," for simple data holders where all members are public. Use ",e.jsx("code",{children:"class"})," when you need to enforce invariants through access control, constructors, or member functions that maintain internal consistency."]})}),e.jsx(s,{type:"tip",title:"Separate declaration and definition",children:e.jsxs("p",{children:["For larger projects, declare the class in a header file (",e.jsx("code",{children:".h"}),") and define member functions in a source file (",e.jsx("code",{children:".cpp"}),") using the scope resolution operator: ",e.jsxs("code",{children:["void Rectangle::print() ","{","...","}"]}),"."]})}),e.jsx(o,{title:"Create a Circle Class",difficulty:"beginner",prompt:"Define a Circle class with a radius data member and member functions area() and circumference(). Create an object, set the radius, and print both values.",hints:["Use M_PI or 3.14159 for pi","Area = pi * r * r, circumference = 2 * pi * r","Remember to make the members public or provide setters"],solution:e.jsx(t,{children:`#include <iostream>
#include <cmath>

class Circle {
public:
    double radius;

    double area() const {
        return M_PI * radius * radius;
    }

    double circumference() const {
        return 2.0 * M_PI * radius;
    }
};

int main() {
    Circle c;
    c.radius = 5.0;
    std::cout << "Area: " << c.area() << std::endl;
    std::cout << "Circumference: " << c.circumference() << std::endl;
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"Classes",url:"https://en.cppreference.com/w/cpp/language/classes",description:"Class declaration and definition"},{type:"cppreference",title:"this pointer",url:"https://en.cppreference.com/w/cpp/language/this",description:"The this pointer in member functions"},{type:"textbook",title:"The C++ Programming Language",author:"Bjarne Stroustrup",description:"Chapter 16: Classes"}]})]})}const k=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"}));function p(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Constructors and destructors manage the lifecycle of objects. Constructors initialize an object when it is created, while destructors clean up resources when the object is destroyed. Understanding these special member functions is essential for writing correct C++ code."}),e.jsx(i,{title:"Constructor and Destructor",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"constructor"})," is a special member function with the same name as the class, called automatically when an object is created. A ",e.jsx("strong",{children:"destructor"})," has the same name prefixed with ",e.jsx("code",{children:"~"})," and is called when the object goes out of scope or is deleted."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Default and Parameterized Constructors"}),e.jsx(t,{title:"Constructor types",children:`#include <iostream>
#include <string>

class Student {
    std::string name;
    int age;
public:
    Student() : name("Unknown"), age(0) {           // default constructor
        std::cout << "Default ctor" << std::endl;
    }

    Student(std::string n, int a) : name(n), age(a) {  // parameterized
        std::cout << "Param ctor: " << name << std::endl;
    }

    ~Student() {                                     // destructor
        std::cout << "Dtor: " << name << std::endl;
    }

    void print() const {
        std::cout << name << ", age " << age << std::endl;
    }
};

int main() {
    Student s1;
    Student s2("Alice", 20);
    s1.print();
    s2.print();
    return 0;
}`}),e.jsx(r,{children:`Default ctor
Param ctor: Alice
Unknown, age 0
Alice, age 20
Dtor: Alice
Dtor: Unknown`}),e.jsxs(a,{title:"Member Initializer List",children:[e.jsx("p",{children:"The member initializer list appears after the constructor parameter list, preceded by a colon. Members are initialized in declaration order, not the order listed. Always prefer initializer lists over assignment in the constructor body."}),e.jsx(t,{children:`ClassName(params) : member1(val1), member2(val2) {
    // constructor body
}`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Copy and Move Constructors"}),e.jsx(t,{title:"Copy and move semantics",children:`#include <iostream>
#include <string>
#include <utility>

class Buffer {
    std::string data;
public:
    Buffer(std::string d) : data(std::move(d)) {
        std::cout << "Ctor: " << data << std::endl;
    }

    Buffer(const Buffer& other) : data(other.data) {     // copy ctor
        std::cout << "Copy: " << data << std::endl;
    }

    Buffer(Buffer&& other) noexcept : data(std::move(other.data)) {  // move ctor
        std::cout << "Move: " << data << std::endl;
    }

    ~Buffer() { std::cout << "Dtor: " << data << std::endl; }
};

int main() {
    Buffer b1("hello");
    Buffer b2 = b1;              // copy constructor
    Buffer b3 = std::move(b1);   // move constructor
    return 0;
}`}),e.jsx(r,{children:`Ctor: hello
Copy: hello
Move: hello
Dtor: hello
Dtor: hello
Dtor: `}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"The Rule of Five"}),e.jsx(i,{title:"Rule of Five",children:e.jsxs("p",{children:["If a class defines or deletes any one of the following special member functions, it should explicitly define or delete all five: ",e.jsx("strong",{children:"destructor"}),", ",e.jsx("strong",{children:"copy constructor"}),", ",e.jsx("strong",{children:"copy assignment operator"}),", ",e.jsx("strong",{children:"move constructor"}),", and ",e.jsx("strong",{children:"move assignment operator"}),"."]})}),e.jsx(l,{title:"Beware of implicit deletion",children:e.jsx("p",{children:"Declaring a custom destructor or copy constructor prevents the compiler from implicitly generating move operations. This can silently degrade performance by falling back to copies instead of moves."})}),e.jsx(n,{title:"Prefer the Rule of Zero",children:e.jsxs("p",{children:["Design classes so they do not need custom special member functions. Use RAII wrappers like ",e.jsx("code",{children:"std::unique_ptr"}),", ",e.jsx("code",{children:"std::vector"}),", and ",e.jsx("code",{children:"std::string"})," to manage resources, letting the compiler generate correct defaults automatically."]})}),e.jsx(s,{type:"tip",title:"= default and = delete",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"= default"})," to explicitly request the compiler-generated version and",e.jsx("code",{children:"= delete"})," to prevent a function from being called. For example,",e.jsx("code",{children:"Buffer(const Buffer&) = delete;"})," forbids copying."]})}),e.jsx(o,{title:"Implement Rule of Five",difficulty:"intermediate",prompt:"Create a class IntArray that wraps a dynamically allocated int array. Implement all five special member functions (destructor, copy ctor, copy assignment, move ctor, move assignment) correctly.",hints:["Use new[] in the constructor and delete[] in the destructor","Copy assignment should handle self-assignment","Move operations should set the source pointer to nullptr"],solution:e.jsx(t,{children:`#include <iostream>
#include <algorithm>

class IntArray {
    int* data;
    size_t size;
public:
    IntArray(size_t n) : data(new int[n]()), size(n) {}
    ~IntArray() { delete[] data; }

    IntArray(const IntArray& o) : data(new int[o.size]), size(o.size) {
        std::copy(o.data, o.data + size, data);
    }
    IntArray& operator=(const IntArray& o) {
        if (this != &o) {
            delete[] data;
            size = o.size;
            data = new int[size];
            std::copy(o.data, o.data + size, data);
        }
        return *this;
    }
    IntArray(IntArray&& o) noexcept : data(o.data), size(o.size) {
        o.data = nullptr; o.size = 0;
    }
    IntArray& operator=(IntArray&& o) noexcept {
        if (this != &o) {
            delete[] data;
            data = o.data; size = o.size;
            o.data = nullptr; o.size = 0;
        }
        return *this;
    }
};`})}),e.jsx(c,{references:[{type:"cppreference",title:"Constructors and member initializer lists",url:"https://en.cppreference.com/w/cpp/language/constructor",description:"Full constructor reference"},{type:"cppreference",title:"Destructors",url:"https://en.cppreference.com/w/cpp/language/destructor",description:"Destructor semantics"},{type:"cppreference",title:"Rule of three/five/zero",url:"https://en.cppreference.com/w/cpp/language/rule_of_three",description:"Special member function guidelines"}]})]})}const S=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"}));function h(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Access specifiers control which parts of a program can use a class member. Combined with getters, setters, and the ",e.jsx("code",{children:"friend"})," keyword, they form the basis of ",e.jsx("strong",{children:"encapsulation"})," -- one of the pillars of object-oriented programming."]}),e.jsx(i,{title:"Encapsulation",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Encapsulation"})," is the practice of hiding internal implementation details and exposing only a controlled interface. This protects data integrity and allows the internal representation to change without breaking code that uses the class."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Access Specifiers"}),e.jsxs(a,{title:"public, private, protected",children:[e.jsxs("p",{children:[e.jsx("code",{children:"public"})," members are accessible from anywhere. ",e.jsx("code",{children:"private"})," members are accessible only within the class itself. ",e.jsx("code",{children:"protected"})," members are accessible within the class and its derived classes."]}),e.jsx(t,{children:`class Example {
public:      // accessible from anywhere
    void publicFunc();
protected:   // accessible in this class and derived classes
    int protectedData;
private:     // accessible only in this class
    int privateData;
};`})]}),e.jsx(t,{title:"Encapsulation with getters and setters",children:`#include <iostream>
#include <string>
#include <stdexcept>

class BankAccount {
private:
    std::string owner;
    double balance;

public:
    BankAccount(std::string name, double initial)
        : owner(name), balance(initial) {}

    const std::string& getOwner() const { return owner; }
    double getBalance() const { return balance; }

    void deposit(double amount) {
        if (amount <= 0) throw std::invalid_argument("Amount must be positive");
        balance += amount;
    }

    void withdraw(double amount) {
        if (amount > balance) throw std::runtime_error("Insufficient funds");
        balance -= amount;
    }
};

int main() {
    BankAccount acct("Alice", 1000.0);
    acct.deposit(500.0);
    acct.withdraw(200.0);
    std::cout << acct.getOwner() << ": $" << acct.getBalance() << std::endl;
    return 0;
}`}),e.jsx(r,{children:"Alice: $1300"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"The friend Keyword"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["A ",e.jsx("code",{children:"friend"})," function or class is granted access to the private and protected members of the class that declares it. Friendship is not inherited and not transitive."]}),e.jsx(t,{title:"Friend function example",children:`#include <iostream>

class Vector2D {
    double x, y;
public:
    Vector2D(double x, double y) : x(x), y(y) {}

    friend double dot(const Vector2D& a, const Vector2D& b);
    friend std::ostream& operator<<(std::ostream& os, const Vector2D& v);
};

double dot(const Vector2D& a, const Vector2D& b) {
    return a.x * b.x + a.y * b.y;   // accesses private members
}

std::ostream& operator<<(std::ostream& os, const Vector2D& v) {
    return os << "(" << v.x << ", " << v.y << ")";
}

int main() {
    Vector2D a(3, 4), b(1, 2);
    std::cout << "a = " << a << std::endl;
    std::cout << "dot = " << dot(a, b) << std::endl;
    return 0;
}`}),e.jsx(r,{children:`a = (3, 4)
dot = 11`}),e.jsx(s,{type:"important",title:"Friendship breaks encapsulation selectively",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"friend"})," sparingly. It creates a tight coupling between the class and the friend. Common legitimate uses include operator overloading (especially ",e.jsx("code",{children:"<<"}),") and factory functions that need access to private constructors."]})}),e.jsx(n,{title:"Make data members private",children:e.jsx("p",{children:"Keep data members private and provide a minimal public interface. This lets you change the internal representation (e.g., switching from degrees to radians) without affecting code that uses the class. Only add getters and setters that are truly needed."})}),e.jsx(s,{type:"tip",title:"const member functions",children:e.jsxs("p",{children:["Mark member functions that do not modify the object as ",e.jsx("code",{children:"const"}),". This allows them to be called on ",e.jsx("code",{children:"const"})," references and clearly communicates intent:",e.jsx("code",{children:"double getBalance() const;"})]})}),e.jsx(o,{title:"Temperature Class with Validation",difficulty:"beginner",prompt:"Create a Temperature class that stores a value in Celsius as a private member. Provide setCelsius() with validation (reject values below -273.15), getCelsius(), and getFahrenheit() methods.",hints:["Fahrenheit = Celsius * 9/5 + 32","Throw std::invalid_argument for values below absolute zero","Mark getter methods as const"],solution:e.jsx(t,{children:`#include <iostream>
#include <stdexcept>

class Temperature {
    double celsius;
public:
    Temperature(double c = 0.0) { setCelsius(c); }

    void setCelsius(double c) {
        if (c < -273.15)
            throw std::invalid_argument("Below absolute zero");
        celsius = c;
    }

    double getCelsius() const { return celsius; }
    double getFahrenheit() const { return celsius * 9.0 / 5.0 + 32.0; }
};

int main() {
    Temperature t(100.0);
    std::cout << t.getCelsius() << " C = "
              << t.getFahrenheit() << " F" << std::endl;
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"Access specifiers",url:"https://en.cppreference.com/w/cpp/language/access",description:"public, private, and protected access"},{type:"cppreference",title:"Friend declaration",url:"https://en.cppreference.com/w/cpp/language/friend",description:"Friend functions and classes"},{type:"textbook",title:"Effective C++",author:"Scott Meyers",description:"Item 22: Declare data members private"}]})]})}const _=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"}));function m(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:['Inheritance lets a new class (derived) reuse and extend the functionality of an existing class (base). It models the "is-a" relationship: a ',e.jsx("code",{children:"Dog"})," is an ",e.jsx("code",{children:"Animal"}),", a ",e.jsx("code",{children:"Circle"})," is a ",e.jsx("code",{children:"Shape"}),". Single inheritance involves exactly one base class."]}),e.jsx(i,{title:"Inheritance",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Inheritance"})," is a mechanism where a derived class acquires the data members and member functions of a base class. The derived class can add new members and override existing behavior. With ",e.jsx("code",{children:"public"})," inheritance, the public interface of the base remains public in the derived class."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Base and Derived Classes"}),e.jsxs(a,{title:"Public Inheritance Syntax",children:[e.jsx("p",{children:"Use a colon followed by the access specifier and base class name. Public inheritance preserves the access level of base members in the derived class."}),e.jsx(t,{children:`class Derived : public Base {
    // additional members
};`})]}),e.jsx(t,{title:"Basic inheritance example",children:`#include <iostream>
#include <string>

class Animal {
protected:
    std::string name;
public:
    Animal(std::string n) : name(std::move(n)) {
        std::cout << "Animal ctor: " << name << std::endl;
    }
    ~Animal() {
        std::cout << "Animal dtor: " << name << std::endl;
    }
    void eat() const {
        std::cout << name << " is eating." << std::endl;
    }
};

class Dog : public Animal {
    std::string breed;
public:
    Dog(std::string n, std::string b)
        : Animal(std::move(n)), breed(std::move(b)) {
        std::cout << "Dog ctor: " << name << std::endl;
    }
    ~Dog() {
        std::cout << "Dog dtor: " << name << std::endl;
    }
    void bark() const {
        std::cout << name << " (" << breed << ") barks!" << std::endl;
    }
};

int main() {
    Dog d("Rex", "Labrador");
    d.eat();    // inherited from Animal
    d.bark();   // defined in Dog
    return 0;
}`}),e.jsx(r,{children:`Animal ctor: Rex
Dog ctor: Rex
Rex is eating.
Rex (Labrador) barks!
Dog dtor: Rex
Animal dtor: Rex`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Constructor Chaining"}),e.jsx(s,{type:"info",title:"Construction and destruction order",children:e.jsxs("p",{children:["Base class constructors run ",e.jsx("strong",{children:"before"})," derived class constructors. Destructors run in the reverse order: derived first, then base. The derived constructor must call the base constructor through the member initializer list."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Method Overriding"}),e.jsx(t,{title:"Overriding a base class method",children:`#include <iostream>

class Shape {
public:
    void describe() const {
        std::cout << "I am a generic shape." << std::endl;
    }
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}

    void describe() const {   // hides Shape::describe
        std::cout << "I am a circle with radius " << radius << std::endl;
    }
};

int main() {
    Circle c(5.0);
    c.describe();              // calls Circle::describe
    c.Shape::describe();       // explicitly calls Shape::describe
    return 0;
}`}),e.jsx(r,{children:`I am a circle with radius 5
I am a generic shape.`}),e.jsx(s,{type:"important",title:"Hiding vs overriding",children:e.jsxs("p",{children:["Without ",e.jsx("code",{children:"virtual"}),", a derived function with the same name ",e.jsx("em",{children:"hides"})," the base version rather than overriding it. Through a base pointer or reference, the base version is always called. Use ",e.jsx("code",{children:"virtual"})," for true polymorphic overriding (covered in the polymorphism chapter)."]})}),e.jsx(n,{title:"Model is-a relationships with public inheritance",children:e.jsx("p",{children:'Only use public inheritance when the derived class truly "is a" kind of the base class. If you just need to reuse code, prefer composition (having a member of the other type) over inheritance. Ask: "Does substituting the derived class for the base class always make semantic sense?"'})}),e.jsx(o,{title:"Vehicle Hierarchy",difficulty:"beginner",prompt:"Create a base class Vehicle with a speed member and an accelerate() method. Derive an ElectricCar class that adds a batteryLevel member and an override of accelerate() that also decreases the battery.",hints:["Make speed protected so the derived class can access it","Call the base accelerate from the derived version if you want to reuse logic","Print the state after accelerating to verify behavior"],solution:e.jsx(t,{children:`#include <iostream>

class Vehicle {
protected:
    double speed = 0;
public:
    void accelerate(double amount) {
        speed += amount;
        std::cout << "Speed: " << speed << " km/h" << std::endl;
    }
    double getSpeed() const { return speed; }
};

class ElectricCar : public Vehicle {
    double batteryLevel = 100.0;
public:
    void accelerate(double amount) {
        Vehicle::accelerate(amount);
        batteryLevel -= amount * 0.5;
        std::cout << "Battery: " << batteryLevel << "%" << std::endl;
    }
};

int main() {
    ElectricCar ec;
    ec.accelerate(30);
    ec.accelerate(20);
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"Derived classes",url:"https://en.cppreference.com/w/cpp/language/derived_class",description:"Inheritance syntax and semantics"},{type:"cppreference",title:"Access specifiers in inheritance",url:"https://en.cppreference.com/w/cpp/language/access",description:"How inheritance affects access"},{type:"textbook",title:"Effective C++",author:"Scott Meyers",description:"Item 32: Make sure public inheritance models is-a"}]})]})}const D=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"}));function b(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"C++ supports multiple inheritance, where a class can derive from more than one base class. While powerful, it introduces complexities such as the diamond problem. Virtual inheritance provides a solution, but the feature should be used judiciously."}),e.jsx(i,{title:"Multiple Inheritance",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Multiple inheritance"})," allows a derived class to inherit from two or more base classes simultaneously. The derived class inherits all members from every base class and can access them according to the usual access rules."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic Multiple Inheritance"}),e.jsxs(a,{title:"Syntax",children:[e.jsx("p",{children:"List multiple base classes separated by commas, each with its own access specifier."}),e.jsx(t,{children:`class Derived : public Base1, public Base2 {
    // members
};`})]}),e.jsx(t,{title:"Multiple inheritance example",children:`#include <iostream>

class Printable {
public:
    void print() const { std::cout << "Printing document..." << std::endl; }
};

class Scannable {
public:
    void scan() const { std::cout << "Scanning document..." << std::endl; }
};

class MultiFunctionDevice : public Printable, public Scannable {
public:
    void copy() const {
        scan();
        print();
        std::cout << "Copy complete." << std::endl;
    }
};

int main() {
    MultiFunctionDevice mfd;
    mfd.print();
    mfd.scan();
    mfd.copy();
    return 0;
}`}),e.jsx(r,{children:`Printing document...
Scanning document...
Scanning document...
Printing document...
Copy complete.`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"The Diamond Problem"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The diamond problem occurs when a class inherits from two classes that share a common base. Without virtual inheritance, the derived class contains two copies of the common base, leading to ambiguity."}),e.jsx(t,{title:"Diamond problem and virtual inheritance",children:`#include <iostream>

class Animal {
public:
    int age = 0;
    void breathe() const { std::cout << "Breathing..." << std::endl; }
};

// virtual inheritance: only one Animal sub-object will exist
class Mammal : virtual public Animal {
public:
    void walk() const { std::cout << "Walking..." << std::endl; }
};

class Bird : virtual public Animal {
public:
    void fly() const { std::cout << "Flying..." << std::endl; }
};

class Bat : public Mammal, public Bird {
public:
    void echolocate() const { std::cout << "Echolocating..." << std::endl; }
};

int main() {
    Bat b;
    b.age = 3;         // unambiguous: only one Animal sub-object
    b.breathe();        // no ambiguity
    b.walk();
    b.fly();
    b.echolocate();
    std::cout << "Age: " << b.age << std::endl;
    return 0;
}`}),e.jsx(r,{children:`Breathing...
Walking...
Flying...
Echolocating...
Age: 3`}),e.jsx(l,{title:"Without virtual inheritance",children:e.jsxs("p",{children:["If ",e.jsx("code",{children:"Mammal"})," and ",e.jsx("code",{children:"Bird"})," did not use ",e.jsx("code",{children:"virtual"})," inheritance,",e.jsx("code",{children:"Bat"})," would contain two separate ",e.jsx("code",{children:"Animal"})," sub-objects. Accessing",e.jsx("code",{children:"b.age"})," would be ambiguous and require disambiguation:",e.jsx("code",{children:"b.Mammal::age"})," vs ",e.jsx("code",{children:"b.Bird::age"}),"."]})}),e.jsx(s,{type:"info",title:"Virtual base class construction",children:e.jsxs("p",{children:["With virtual inheritance, the ",e.jsx("strong",{children:"most derived class"})," is responsible for constructing the virtual base. Intermediate classes' calls to the virtual base constructor are ignored. This means ",e.jsx("code",{children:"Bat"})," must directly initialize ",e.jsx("code",{children:"Animal"})," in its initializer list."]})}),e.jsx(n,{title:"Prefer composition and interfaces",children:e.jsx("p",{children:"Multiple inheritance is most appropriate when combining abstract interfaces (classes with only pure virtual functions). For mixing implementation, prefer composition or single inheritance with composition. The diamond problem and increased complexity make multiple implementation inheritance a code smell."})}),e.jsx(o,{title:"Interface-Style Multiple Inheritance",difficulty:"intermediate",prompt:"Create two interface-like base classes: Drawable (with a pure virtual draw()) and Serializable (with a pure virtual serialize()). Create a Widget class that inherits from both and implements both methods.",hints:["Pure virtual functions use = 0 syntax","A class with any pure virtual function is abstract and cannot be instantiated","The derived class must implement all pure virtual functions to be concrete"],solution:e.jsx(t,{children:`#include <iostream>
#include <string>

class Drawable {
public:
    virtual void draw() const = 0;
    virtual ~Drawable() = default;
};

class Serializable {
public:
    virtual std::string serialize() const = 0;
    virtual ~Serializable() = default;
};

class Widget : public Drawable, public Serializable {
    std::string name;
public:
    Widget(std::string n) : name(std::move(n)) {}

    void draw() const override {
        std::cout << "Drawing widget: " << name << std::endl;
    }
    std::string serialize() const override {
        return "{\\"widget\\": \\"" + name + "\\"}";
    }
};

int main() {
    Widget w("Button");
    w.draw();
    std::cout << w.serialize() << std::endl;
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"Multiple inheritance",url:"https://en.cppreference.com/w/cpp/language/derived_class",description:"Derived class with multiple bases"},{type:"cppreference",title:"Virtual base classes",url:"https://en.cppreference.com/w/cpp/language/derived_class#Virtual_base_classes",description:"Solving the diamond problem"},{type:"textbook",title:"Effective C++",author:"Scott Meyers",description:"Item 40: Use multiple inheritance judiciously"}]})]})}const A=Object.freeze(Object.defineProperty({__proto__:null,default:b},Symbol.toStringTag,{value:"Module"}));function x(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Polymorphism allows code to work with objects of different types through a common interface. In C++, runtime polymorphism is achieved through ",e.jsx("code",{children:"virtual"})," functions, which enable ",e.jsx("strong",{children:"dynamic dispatch"})," -- the correct function is selected at runtime based on the actual object type, not the pointer or reference type."]}),e.jsx(i,{title:"Dynamic Dispatch",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Dynamic dispatch"})," is the mechanism by which a call to a virtual function is resolved at runtime. The compiler uses a ",e.jsx("strong",{children:"vtable"})," (virtual function table) -- a lookup table of function pointers -- to determine which function implementation to invoke based on the actual type of the object."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Virtual Functions"}),e.jsxs(a,{title:"virtual and override keywords",children:[e.jsxs("p",{children:["Mark a base class function as ",e.jsx("code",{children:"virtual"})," to enable dynamic dispatch. In derived classes, use the ",e.jsx("code",{children:"override"})," keyword to explicitly indicate you are overriding a virtual function -- the compiler will emit an error if no matching base function exists."]}),e.jsx(t,{children:`class Base {
public:
    virtual void method();          // virtual in base
};
class Derived : public Base {
public:
    void method() override;         // override in derived
};`})]}),e.jsx(t,{title:"Polymorphism in action",children:`#include <iostream>
#include <vector>
#include <memory>

class Shape {
public:
    virtual double area() const { return 0.0; }
    virtual void describe() const {
        std::cout << "Shape, area = " << area() << std::endl;
    }
    virtual ~Shape() = default;
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
    void describe() const override {
        std::cout << "Circle(r=" << radius << "), area = " << area() << std::endl;
    }
};

class Rectangle : public Shape {
    double w, h;
public:
    Rectangle(double w, double h) : w(w), h(h) {}
    double area() const override { return w * h; }
    void describe() const override {
        std::cout << "Rect(" << w << "x" << h << "), area = " << area() << std::endl;
    }
};

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Circle>(5.0));
    shapes.push_back(std::make_unique<Rectangle>(4.0, 6.0));

    for (const auto& s : shapes) {
        s->describe();  // dynamic dispatch calls the correct version
    }
    return 0;
}`}),e.jsx(r,{children:`Circle(r=5), area = 78.5398
Rect(4x6), area = 24`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Virtual Destructors"}),e.jsx(l,{title:"Always use virtual destructors in base classes",children:e.jsxs("p",{children:["If you delete a derived object through a base pointer without a virtual destructor, only the base destructor runs. This causes undefined behavior and resource leaks. Any class intended as a base class with virtual functions ",e.jsx("strong",{children:"must"})," have a virtual destructor."]})}),e.jsx(t,{title:"Virtual destructor importance",children:`#include <iostream>

class Base {
public:
    virtual ~Base() { std::cout << "~Base" << std::endl; }
};

class Derived : public Base {
    int* data;
public:
    Derived() : data(new int[100]) { std::cout << "Derived alloc" << std::endl; }
    ~Derived() override {
        delete[] data;
        std::cout << "~Derived (freed)" << std::endl;
    }
};

int main() {
    Base* ptr = new Derived();
    delete ptr;  // correctly calls ~Derived then ~Base
    return 0;
}`}),e.jsx(r,{children:`Derived alloc
~Derived (freed)
~Base`}),e.jsx(s,{type:"info",title:"How the vtable works",children:e.jsx("p",{children:"Each class with virtual functions has a vtable -- an array of function pointers. Each object contains a hidden vptr that points to its class's vtable. When a virtual function is called through a pointer or reference, the runtime follows the vptr to the vtable and calls the function at the appropriate slot. This adds one level of indirection compared to a normal function call."})}),e.jsx(n,{title:"Always use override",children:e.jsxs("p",{children:["Always use ",e.jsx("code",{children:"override"})," on derived class virtual functions. Without it, a typo or signature mismatch silently creates a new function instead of overriding. The compiler catches this when ",e.jsx("code",{children:"override"})," is present, preventing subtle bugs."]})}),e.jsx(o,{title:"Polymorphic Logger",difficulty:"intermediate",prompt:"Create a base class Logger with a virtual log(const std::string&) method. Derive ConsoleLogger (prints to cout) and FileLogger (prints to a file or simulates it). Store both in a vector of Logger pointers and call log() on each.",hints:["Use std::unique_ptr<Logger> in the vector","Remember to give Logger a virtual destructor","FileLogger can simulate by printing '[FILE] message' to cout"],solution:e.jsx(t,{children:`#include <iostream>
#include <string>
#include <vector>
#include <memory>

class Logger {
public:
    virtual void log(const std::string& msg) const = 0;
    virtual ~Logger() = default;
};

class ConsoleLogger : public Logger {
public:
    void log(const std::string& msg) const override {
        std::cout << "[CONSOLE] " << msg << std::endl;
    }
};

class FileLogger : public Logger {
public:
    void log(const std::string& msg) const override {
        std::cout << "[FILE] " << msg << std::endl;
    }
};

int main() {
    std::vector<std::unique_ptr<Logger>> loggers;
    loggers.push_back(std::make_unique<ConsoleLogger>());
    loggers.push_back(std::make_unique<FileLogger>());

    for (const auto& l : loggers) {
        l->log("Application started");
    }
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"Virtual functions",url:"https://en.cppreference.com/w/cpp/language/virtual",description:"Virtual function declaration and dispatch"},{type:"cppreference",title:"override specifier",url:"https://en.cppreference.com/w/cpp/language/override",description:"Explicit override syntax (C++11)"},{type:"textbook",title:"Effective C++",author:"Scott Meyers",description:"Item 7: Declare destructors virtual in polymorphic base classes"}]})]})}const T=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"}));function g(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Abstract classes define interfaces that derived classes must implement. They cannot be instantiated directly and serve as contracts, ensuring that all concrete subclasses provide specific functionality. This is the closest C++ gets to interfaces found in other languages."}),e.jsx(i,{title:"Abstract Class",children:e.jsxs("p",{children:["An ",e.jsx("strong",{children:"abstract class"})," is a class that has at least one ",e.jsx("strong",{children:"pure virtual function"})," -- a virtual function declared with ",e.jsx("code",{children:"= 0"}),". Abstract classes cannot be instantiated. A derived class must override all pure virtual functions to become a concrete (instantiable) class."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Pure Virtual Functions"}),e.jsxs(a,{title:"Pure Virtual Syntax",children:[e.jsxs("p",{children:["Append ",e.jsx("code",{children:"= 0"})," to a virtual function declaration to make it pure virtual. This tells the compiler that the function has no implementation in this class and must be overridden by any concrete derived class."]}),e.jsx(t,{children:`class AbstractBase {
public:
    virtual void doWork() = 0;        // pure virtual
    virtual ~AbstractBase() = default;
};`})]}),e.jsx(t,{title:"Abstract class with concrete derived classes",children:`#include <iostream>
#include <vector>
#include <memory>
#include <cmath>

class Shape {
public:
    virtual double area() const = 0;
    virtual double perimeter() const = 0;
    virtual std::string name() const = 0;
    virtual ~Shape() = default;

    void describe() const {  // non-pure: provides default behavior
        std::cout << name() << ": area=" << area()
                  << " perimeter=" << perimeter() << std::endl;
    }
};

class Circle : public Shape {
    double r;
public:
    Circle(double radius) : r(radius) {}
    double area() const override { return M_PI * r * r; }
    double perimeter() const override { return 2.0 * M_PI * r; }
    std::string name() const override { return "Circle"; }
};

class Square : public Shape {
    double side;
public:
    Square(double s) : side(s) {}
    double area() const override { return side * side; }
    double perimeter() const override { return 4.0 * side; }
    std::string name() const override { return "Square"; }
};

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Circle>(5.0));
    shapes.push_back(std::make_unique<Square>(4.0));

    for (const auto& s : shapes) {
        s->describe();
    }
    return 0;
}`}),e.jsx(r,{children:`Circle: area=78.5398 perimeter=31.4159
Square: area=16 perimeter=16`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Interfaces in C++"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++ does not have a dedicated ",e.jsx("code",{children:"interface"})," keyword. Instead, an interface is modeled as a class with ",e.jsx("strong",{children:"only"})," pure virtual functions and a virtual destructor, containing no data members or implemented methods."]}),e.jsx(t,{title:"Interface pattern",children:`#include <iostream>
#include <string>

class ISerializable {
public:
    virtual std::string serialize() const = 0;
    virtual void deserialize(const std::string& data) = 0;
    virtual ~ISerializable() = default;
};

class ILoggable {
public:
    virtual void log() const = 0;
    virtual ~ILoggable() = default;
};

class Config : public ISerializable, public ILoggable {
    std::string key, value;
public:
    Config(std::string k, std::string v) : key(std::move(k)), value(std::move(v)) {}

    std::string serialize() const override {
        return key + "=" + value;
    }
    void deserialize(const std::string& data) override {
        auto pos = data.find('=');
        key = data.substr(0, pos);
        value = data.substr(pos + 1);
    }
    void log() const override {
        std::cout << "[Config] " << key << " -> " << value << std::endl;
    }
};

int main() {
    Config cfg("timeout", "30");
    cfg.log();
    std::cout << cfg.serialize() << std::endl;

    cfg.deserialize("retries=5");
    cfg.log();
    return 0;
}`}),e.jsx(r,{children:`[Config] timeout -> 30
timeout=30
[Config] retries -> 5`}),e.jsx(s,{type:"tip",title:"Abstract classes can have implementations",children:e.jsxs("p",{children:["Unlike pure interfaces, abstract classes can contain implemented (non-pure) methods and data members. This lets you provide shared default behavior while still requiring derived classes to implement specific operations. The ",e.jsx("code",{children:"describe()"})," method in the Shape example above demonstrates this pattern."]})}),e.jsx(s,{type:"info",title:"Pure virtual functions can have bodies",children:e.jsxs("p",{children:["A pure virtual function can optionally have an implementation in the base class. Derived classes must still override it, but can call the base version via ",e.jsx("code",{children:"Base::function()"}),". This is occasionally used to provide a default implementation that derived classes opt into explicitly."]})}),e.jsx(n,{title:"Use the I-prefix convention for interfaces",children:e.jsxs("p",{children:["When defining a pure interface class, many C++ projects prefix the name with",e.jsx("code",{children:"I"})," (e.g., ",e.jsx("code",{children:"ISerializable"}),", ",e.jsx("code",{children:"IObserver"}),"). This communicates intent clearly. Always include a virtual destructor, even in interfaces, to allow safe deletion through base pointers."]})}),e.jsx(o,{title:"Animal Sound Interface",difficulty:"beginner",prompt:"Create an abstract class Animal with pure virtual functions speak() and type(). Derive Cat and Dog classes. Store them in a vector of unique_ptr<Animal> and call speak() on each.",hints:["Use = 0 for pure virtual functions","Remember virtual ~Animal() = default","Use std::make_unique to create objects"],solution:e.jsx(t,{children:`#include <iostream>
#include <vector>
#include <memory>

class Animal {
public:
    virtual void speak() const = 0;
    virtual std::string type() const = 0;
    virtual ~Animal() = default;
};

class Cat : public Animal {
public:
    void speak() const override { std::cout << "Meow!" << std::endl; }
    std::string type() const override { return "Cat"; }
};

class Dog : public Animal {
public:
    void speak() const override { std::cout << "Woof!" << std::endl; }
    std::string type() const override { return "Dog"; }
};

int main() {
    std::vector<std::unique_ptr<Animal>> animals;
    animals.push_back(std::make_unique<Cat>());
    animals.push_back(std::make_unique<Dog>());

    for (const auto& a : animals) {
        std::cout << a->type() << " says: ";
        a->speak();
    }
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"Abstract classes",url:"https://en.cppreference.com/w/cpp/language/abstract_class",description:"Pure virtual functions and abstract classes"},{type:"cppreference",title:"Virtual functions",url:"https://en.cppreference.com/w/cpp/language/virtual",description:"Virtual function mechanics"},{type:"textbook",title:"The C++ Programming Language",author:"Bjarne Stroustrup",description:"Chapter 20: Derived Classes"}]})]})}const I=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"}));function f(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Runtime Type Information (RTTI) allows you to query the type of an object at runtime. C++ provides two main RTTI mechanisms: ",e.jsx("code",{children:"typeid"})," for type identification and ",e.jsx("code",{children:"dynamic_cast"})," for safe downcasting. Both require at least one virtual function in the class hierarchy."]}),e.jsx(i,{title:"RTTI (Runtime Type Information)",children:e.jsxs("p",{children:[e.jsx("strong",{children:"RTTI"})," is a C++ mechanism that exposes type information at runtime for polymorphic types (classes with virtual functions). It enables safe type checking and casting through ",e.jsx("code",{children:"typeid"})," and ",e.jsx("code",{children:"dynamic_cast"}),", stored in",e.jsx("code",{children:"std::type_info"})," objects."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"typeid and type_info"}),e.jsxs(a,{title:"typeid Syntax",children:[e.jsxs("p",{children:["The ",e.jsx("code",{children:"typeid"})," operator returns a reference to a ",e.jsx("code",{children:"std::type_info"})," object. For polymorphic types accessed through a pointer or reference, it returns the dynamic (actual) type. Include ",e.jsx("code",{children:"<typeinfo>"})," to use it."]}),e.jsx(t,{children:`#include <typeinfo>
const std::type_info& ti = typeid(expression);
ti.name();       // implementation-defined name string
ti == typeid(T); // compare types`})]}),e.jsx(t,{title:"Using typeid",children:`#include <iostream>
#include <typeinfo>

class Base {
public:
    virtual ~Base() = default;
};

class Derived : public Base {};

int main() {
    Base* b = new Derived();

    std::cout << "Pointer type: " << typeid(b).name() << std::endl;
    std::cout << "Object type:  " << typeid(*b).name() << std::endl;
    std::cout << "Same type?    " << (typeid(*b) == typeid(Derived)) << std::endl;

    delete b;
    return 0;
}`}),e.jsx(r,{children:`Pointer type: P4Base
Object type:  7Derived
Same type?    1`}),e.jsx(s,{type:"info",title:"type_info::name() is implementation-defined",children:e.jsxs("p",{children:["The string returned by ",e.jsx("code",{children:"name()"})," varies between compilers. GCC returns mangled names (like ",e.jsx("code",{children:"7Derived"}),"), while MSVC returns human-readable names. Do not rely on the exact format. Use ",e.jsx("code",{children:"typeid"})," comparisons for type checks instead."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"dynamic_cast"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"dynamic_cast"})," safely converts pointers and references within an inheritance hierarchy. For pointers, it returns ",e.jsx("code",{children:"nullptr"})," on failure. For references, it throws ",e.jsx("code",{children:"std::bad_cast"}),"."]}),e.jsx(t,{title:"Safe downcasting with dynamic_cast",children:`#include <iostream>

class Animal {
public:
    virtual ~Animal() = default;
    virtual void speak() const { std::cout << "..." << std::endl; }
};

class Dog : public Animal {
public:
    void speak() const override { std::cout << "Woof!" << std::endl; }
    void fetch() const { std::cout << "Fetching ball!" << std::endl; }
};

class Cat : public Animal {
public:
    void speak() const override { std::cout << "Meow!" << std::endl; }
};

void tryFetch(Animal* a) {
    if (Dog* d = dynamic_cast<Dog*>(a)) {
        d->fetch();   // safe: a is actually a Dog
    } else {
        std::cout << "Not a dog, cannot fetch." << std::endl;
    }
}

int main() {
    Dog dog;
    Cat cat;
    tryFetch(&dog);
    tryFetch(&cat);
    return 0;
}`}),e.jsx(r,{children:`Fetching ball!
Not a dog, cannot fetch.`}),e.jsx(l,{title:"Performance cost of RTTI",children:e.jsxs("p",{children:["RTTI adds overhead: each polymorphic class stores extra type information, and",e.jsx("code",{children:"dynamic_cast"})," performs a runtime check that walks the inheritance hierarchy. In performance-critical code (e.g., game loops, real-time systems), this cost may be significant. Some projects disable RTTI entirely via compiler flags."]})}),e.jsx(d,{compiler:"gcc",title:"Disabling RTTI",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"-fno-rtti"})," to disable RTTI in GCC and Clang. This prevents use of",e.jsx("code",{children:"typeid"})," and ",e.jsx("code",{children:"dynamic_cast"})," but reduces binary size and can improve performance. Many game engines and embedded projects use this flag."]})}),e.jsx(n,{title:"Prefer virtual functions over RTTI",children:e.jsxs("p",{children:["If you find yourself using ",e.jsx("code",{children:"dynamic_cast"})," frequently, it often indicates a design problem. Consider using virtual functions or the visitor pattern instead. RTTI is appropriate for plugin systems, serialization, or when the type hierarchy is not under your control."]})}),e.jsx(o,{title:"Shape Inspector",difficulty:"intermediate",prompt:"Given a vector of Shape pointers (Circle, Rectangle, Triangle), write a function that uses dynamic_cast to count how many of each type exist in the collection.",hints:["Use dynamic_cast<Circle*>(ptr) and check for nullptr","You need at least one virtual function in Shape for RTTI to work","Loop through the vector and try casting to each type"],solution:e.jsx(t,{children:`#include <iostream>
#include <vector>
#include <memory>

class Shape { public: virtual ~Shape() = default; };
class Circle : public Shape {};
class Rectangle : public Shape {};
class Triangle : public Shape {};

void inspect(const std::vector<std::unique_ptr<Shape>>& shapes) {
    int circles = 0, rects = 0, tris = 0;
    for (const auto& s : shapes) {
        if (dynamic_cast<Circle*>(s.get())) ++circles;
        else if (dynamic_cast<Rectangle*>(s.get())) ++rects;
        else if (dynamic_cast<Triangle*>(s.get())) ++tris;
    }
    std::cout << "Circles: " << circles << ", Rects: " << rects
              << ", Triangles: " << tris << std::endl;
}

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Circle>());
    shapes.push_back(std::make_unique<Rectangle>());
    shapes.push_back(std::make_unique<Circle>());
    shapes.push_back(std::make_unique<Triangle>());
    inspect(shapes);
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"typeid operator",url:"https://en.cppreference.com/w/cpp/language/typeid",description:"Runtime type identification"},{type:"cppreference",title:"dynamic_cast",url:"https://en.cppreference.com/w/cpp/language/dynamic_cast",description:"Safe runtime downcasting"},{type:"cppreference",title:"std::type_info",url:"https://en.cppreference.com/w/cpp/types/type_info",description:"Type information class"}]})]})}const B=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"}));function y(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Operator overloading lets you define how built-in operators like ",e.jsx("code",{children:"+"}),", ",e.jsx("code",{children:"-"}),",",e.jsx("code",{children:"*"}),", and ",e.jsx("code",{children:"/"})," work with your custom types. This makes user-defined types feel natural and intuitive, reading like mathematical expressions rather than verbose function calls."]}),e.jsx(i,{title:"Operator Overloading",children:e.jsxs("p",{children:[e.jsx("strong",{children:"Operator overloading"})," is the ability to redefine the behavior of C++ operators for user-defined types. An overloaded operator is implemented as a function named ",e.jsx("code",{children:"operator@"})," where ",e.jsx("code",{children:"@"})," is the operator symbol (e.g.,",e.jsx("code",{children:"operator+"}),"). It can be a member function or a free (non-member) function."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Member vs Non-Member Overloading"}),e.jsxs(a,{title:"Two approaches",children:[e.jsxs("p",{children:["Binary operators can be overloaded as member functions (left operand is ",e.jsx("code",{children:"this"}),") or as non-member functions (both operands are parameters). Non-member functions enable symmetry when the left operand is not your type."]}),e.jsx(t,{children:`// Member: a.operator+(b)
Vec operator+(const Vec& rhs) const;

// Non-member: operator+(a, b)
Vec operator+(const Vec& lhs, const Vec& rhs);`})]}),e.jsx(t,{title:"Arithmetic operator overloading",children:`#include <iostream>

class Vec2 {
    double x, y;
public:
    Vec2(double x = 0, double y = 0) : x(x), y(y) {}

    // Member operator+
    Vec2 operator+(const Vec2& rhs) const {
        return Vec2(x + rhs.x, y + rhs.y);
    }

    // Member operator- (unary negation)
    Vec2 operator-() const {
        return Vec2(-x, -y);
    }

    // Member operator*= (compound assignment)
    Vec2& operator*=(double scalar) {
        x *= scalar;
        y *= scalar;
        return *this;
    }

    void print() const {
        std::cout << "(" << x << ", " << y << ")" << std::endl;
    }

    friend Vec2 operator*(const Vec2& v, double s);
    friend Vec2 operator*(double s, const Vec2& v);
};

// Non-member: enables both vec*scalar and scalar*vec
Vec2 operator*(const Vec2& v, double s) {
    return Vec2(v.x * s, v.y * s);
}
Vec2 operator*(double s, const Vec2& v) {
    return v * s;  // reuse the above
}

int main() {
    Vec2 a(1, 2), b(3, 4);

    Vec2 c = a + b;
    c.print();

    Vec2 d = a * 3.0;
    d.print();

    Vec2 e = 2.0 * b;
    e.print();

    (-a).print();
    return 0;
}`}),e.jsx(r,{children:`(4, 6)
(3, 6)
(6, 8)
(-1, -2)`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Compound Assignment Operators"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Compound assignment operators like ",e.jsx("code",{children:"+="})," modify the left operand in place and return a reference to it. A common idiom is to implement the binary operator in terms of the compound assignment operator to avoid code duplication."]}),e.jsx(t,{title:"Implementing + in terms of +=",children:`class Fraction {
    int num, den;
public:
    Fraction(int n, int d) : num(n), den(d) {}

    Fraction& operator+=(const Fraction& rhs) {
        num = num * rhs.den + rhs.num * den;
        den = den * rhs.den;
        return *this;
    }

    // Non-member + defined in terms of +=
    friend Fraction operator+(Fraction lhs, const Fraction& rhs) {
        lhs += rhs;        // lhs is a copy, so modifying it is fine
        return lhs;
    }

    void print() const {
        std::cout << num << "/" << den << std::endl;
    }
};

int main() {
    Fraction a(1, 2), b(1, 3);
    Fraction c = a + b;
    c.print();

    a += b;
    a.print();
    return 0;
}`}),e.jsx(r,{children:`5/6
5/6`}),e.jsx(s,{type:"tip",title:"Return by value for binary operators",children:e.jsxs("p",{children:["Binary arithmetic operators (",e.jsx("code",{children:"+"}),", ",e.jsx("code",{children:"-"}),", ",e.jsx("code",{children:"*"}),", ",e.jsx("code",{children:"/"}),") should return a new object ",e.jsx("strong",{children:"by value"}),". Compound assignment operators (",e.jsx("code",{children:"+="}),", ",e.jsx("code",{children:"-="}),") should modify ",e.jsx("code",{children:"*this"})," and return a reference. Never return a reference to a local object."]})}),e.jsx(n,{title:"Implement binary ops via compound assignment",children:e.jsxs("p",{children:["Implement compound assignment operators (",e.jsx("code",{children:"+="}),") as members, then define the corresponding binary operator (",e.jsx("code",{children:"+"}),") as a non-member that takes the left operand by value, applies the compound operator, and returns the result. This avoids code duplication and ensures consistent behavior."]})}),e.jsx(s,{type:"important",title:"Operators you cannot overload",children:e.jsxs("p",{children:["The following operators cannot be overloaded: ",e.jsx("code",{children:"::"})," (scope resolution),",e.jsx("code",{children:"."})," (member access), ",e.jsx("code",{children:".*"})," (pointer-to-member access),",e.jsx("code",{children:"?:"})," (ternary), and ",e.jsx("code",{children:"sizeof"}),". Also, you cannot create new operators or change an operator's arity."]})}),e.jsx(o,{title:"Complex Number Class",difficulty:"intermediate",prompt:"Create a Complex class with real and imaginary parts. Overload +, -, * operators and provide a print() method. Implement + using +=.",hints:["Complex multiplication: (a+bi)(c+di) = (ac-bd) + (ad+bc)i","Take the left operand by value for binary operators","Remember to implement both member (+=) and non-member (+) versions"],solution:e.jsx(t,{children:`#include <iostream>

class Complex {
    double re, im;
public:
    Complex(double r = 0, double i = 0) : re(r), im(i) {}

    Complex& operator+=(const Complex& o) {
        re += o.re; im += o.im; return *this;
    }
    Complex& operator-=(const Complex& o) {
        re -= o.re; im -= o.im; return *this;
    }
    Complex& operator*=(const Complex& o) {
        double r = re * o.re - im * o.im;
        double i = re * o.im + im * o.re;
        re = r; im = i; return *this;
    }

    friend Complex operator+(Complex a, const Complex& b) { return a += b; }
    friend Complex operator-(Complex a, const Complex& b) { return a -= b; }
    friend Complex operator*(Complex a, const Complex& b) { return a *= b; }

    void print() const {
        std::cout << re << (im >= 0 ? "+" : "") << im << "i" << std::endl;
    }
};

int main() {
    Complex a(3, 2), b(1, -1);
    (a + b).print();
    (a * b).print();
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"Operator overloading",url:"https://en.cppreference.com/w/cpp/language/operators",description:"Full operator overloading reference"},{type:"cppreference",title:"Arithmetic operators",url:"https://en.cppreference.com/w/cpp/language/operator_arithmetic",description:"Arithmetic operator semantics"},{type:"textbook",title:"The C++ Programming Language",author:"Bjarne Stroustrup",description:"Chapter 18: Operator Overloading"}]})]})}const N=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"}));function v(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The stream insertion (",e.jsx("code",{children:"<<"}),") and extraction (",e.jsx("code",{children:">>"}),") operators allow your custom types to integrate seamlessly with C++ I/O streams. Overloading these operators lets you print and read objects as naturally as built-in types."]}),e.jsx(i,{title:"Stream Operators",children:e.jsxs("p",{children:["The ",e.jsx("strong",{children:"insertion operator"})," (",e.jsx("code",{children:"<<"}),") sends data to an output stream like ",e.jsx("code",{children:"std::cout"}),". The ",e.jsx("strong",{children:"extraction operator"}),"(",e.jsx("code",{children:">>"}),") reads data from an input stream like ",e.jsx("code",{children:"std::cin"}),". For custom types, these must be overloaded as ",e.jsx("strong",{children:"non-member functions"}),"because the left operand is a stream, not your class."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Overloading operator<<"}),e.jsxs(a,{title:"Output operator signature",children:[e.jsxs("p",{children:["The output operator takes a reference to ",e.jsx("code",{children:"std::ostream"})," and a const reference to your type. It must return the stream reference to support chaining."]}),e.jsx(t,{children:`std::ostream& operator<<(std::ostream& os, const MyType& obj) {
    os << /* format obj */;
    return os;  // enables chaining: cout << a << b
}`})]}),e.jsx(t,{title:"Stream operator with friend",children:`#include <iostream>
#include <string>

class Date {
    int year, month, day;
public:
    Date(int y, int m, int d) : year(y), month(m), day(d) {}

    friend std::ostream& operator<<(std::ostream& os, const Date& d);
    friend std::istream& operator>>(std::istream& is, Date& d);
};

std::ostream& operator<<(std::ostream& os, const Date& d) {
    os << d.year << "-"
       << (d.month < 10 ? "0" : "") << d.month << "-"
       << (d.day < 10 ? "0" : "") << d.day;
    return os;
}

std::istream& operator>>(std::istream& is, Date& d) {
    char sep1, sep2;
    is >> d.year >> sep1 >> d.month >> sep2 >> d.day;
    if (sep1 != '-' || sep2 != '-') {
        is.setstate(std::ios::failbit);
    }
    return is;
}

int main() {
    Date today(2025, 3, 15);
    std::cout << "Today: " << today << std::endl;

    // Chaining demonstration
    Date other(2024, 12, 25);
    std::cout << "Dates: " << today << " and " << other << std::endl;
    return 0;
}`}),e.jsx(r,{children:`Today: 2025-03-15
Dates: 2025-03-15 and 2024-12-25`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Chaining and the Return Value"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Chaining works because each ",e.jsx("code",{children:"<<"})," call returns the same stream reference. The expression ",e.jsx("code",{children:"cout << a << b"})," is evaluated as ",e.jsx("code",{children:"(cout << a) << b"}),". The first call outputs ",e.jsx("code",{children:"a"})," and returns ",e.jsx("code",{children:"cout"}),", which then receives ",e.jsx("code",{children:"b"}),"."]}),e.jsx(t,{title:"Using with stringstream",children:`#include <iostream>
#include <sstream>

class Point3D {
    double x, y, z;
public:
    Point3D(double x, double y, double z) : x(x), y(y), z(z) {}

    friend std::ostream& operator<<(std::ostream& os, const Point3D& p) {
        return os << "(" << p.x << ", " << p.y << ", " << p.z << ")";
    }
};

int main() {
    Point3D p(1.5, 2.7, 3.9);

    // Works with any ostream: cout, ofstream, stringstream
    std::cout << "Point: " << p << std::endl;

    std::ostringstream oss;
    oss << "Stored: " << p;
    std::string result = oss.str();
    std::cout << result << std::endl;
    return 0;
}`}),e.jsx(r,{children:`Point: (1.5, 2.7, 3.9)
Stored: (1.5, 2.7, 3.9)`}),e.jsx(s,{type:"info",title:"Why friend is needed",children:e.jsxs("p",{children:["Stream operators cannot be member functions because the left operand is ",e.jsx("code",{children:"std::ostream"})," (or ",e.jsx("code",{children:"std::istream"}),"), not your class. Since they are non-member functions, they need ",e.jsx("code",{children:"friend"})," access to read private members -- or you can implement them using only public getters."]})}),e.jsx(s,{type:"tip",title:"Alternative without friend",children:e.jsxs("p",{children:["If your class has public accessors, you can define the stream operator without",e.jsx("code",{children:"friend"}),". This is cleaner when the public interface is sufficient:",e.jsx("code",{children:'os << obj.getX() << ", " << obj.getY()'}),"."]})}),e.jsx(n,{title:"Keep output format simple and parseable",children:e.jsxs("p",{children:["Design your ",e.jsx("code",{children:"operator<<"})," output to be human-readable and, ideally, round-trippable via ",e.jsx("code",{children:"operator>>"}),". Avoid embedding newlines in the output operator -- let the caller decide line breaks. This makes the operator composable with other stream operations."]})}),e.jsx(o,{title:"Student Stream Operators",difficulty:"beginner",prompt:"Create a Student class with name (string) and gpa (double). Overload operator<< to output 'Name (GPA: X.XX)' and operator>> to read name and gpa from a stream. Test with a stringstream.",hints:["Use std::fixed and std::setprecision(2) for GPA formatting","Include <iomanip> for stream manipulators","For >>, read the name first, then the GPA"],solution:e.jsx(t,{children:`#include <iostream>
#include <sstream>
#include <string>
#include <iomanip>

class Student {
    std::string name;
    double gpa;
public:
    Student(std::string n = "", double g = 0.0) : name(n), gpa(g) {}

    friend std::ostream& operator<<(std::ostream& os, const Student& s) {
        return os << s.name << " (GPA: "
                  << std::fixed << std::setprecision(2) << s.gpa << ")";
    }
    friend std::istream& operator>>(std::istream& is, Student& s) {
        return is >> s.name >> s.gpa;
    }
};

int main() {
    Student s("Alice", 3.85);
    std::cout << s << std::endl;

    std::istringstream iss("Bob 3.92");
    Student s2;
    iss >> s2;
    std::cout << s2 << std::endl;
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"operator<< (ostream)",url:"https://en.cppreference.com/w/cpp/io/basic_ostream/operator_ltlt",description:"Output stream insertion operators"},{type:"cppreference",title:"operator>> (istream)",url:"https://en.cppreference.com/w/cpp/io/basic_istream/operator_gtgt",description:"Input stream extraction operators"},{type:"textbook",title:"The C++ Programming Language",author:"Bjarne Stroustrup",description:"Chapter 38: I/O Streams"}]})]})}const P=Object.freeze(Object.defineProperty({__proto__:null,default:v},Symbol.toStringTag,{value:"Module"}));function j(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++20 introduced the three-way comparison operator ",e.jsx("code",{children:"<=>"}),', commonly called the "spaceship operator." It can replace up to six comparison operators with a single definition, and the compiler can automatically generate the rest. This dramatically reduces boilerplate for comparable types.']}),e.jsx(i,{title:"Three-Way Comparison (Spaceship Operator)",children:e.jsxs("p",{children:["The ",e.jsx("strong",{children:"spaceship operator"})," (",e.jsx("code",{children:"<=>"}),") performs a three-way comparison, returning a value that indicates whether the left operand is less than, equal to, or greater than the right operand. The return type (from ",e.jsx("code",{children:"<compare>"}),") encodes the comparison category: ",e.jsx("code",{children:"std::strong_ordering"}),",",e.jsx("code",{children:"std::weak_ordering"}),", or ",e.jsx("code",{children:"std::partial_ordering"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Comparison Categories"}),e.jsxs(a,{title:"Ordering types",children:[e.jsx("p",{children:"C++20 defines three ordering categories reflecting different equivalence semantics."}),e.jsx(t,{children:`#include <compare>

// strong_ordering:  equivalent values are indistinguishable
//   values: less, equal, equivalent, greater
std::strong_ordering

// weak_ordering:    equivalent values may differ in some way
//   values: less, equivalent, greater
std::weak_ordering

// partial_ordering: some values may be incomparable (e.g., NaN)
//   values: less, equivalent, greater, unordered
std::partial_ordering`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic Usage"}),e.jsx(t,{title:"Defaulted spaceship operator",children:`#include <iostream>
#include <compare>
#include <string>

class Student {
    std::string name;
    int grade;
public:
    Student(std::string n, int g) : name(std::move(n)), grade(g) {}

    // Compiler generates ==, !=, <, >, <=, >= automatically
    auto operator<=>(const Student&) const = default;

    friend std::ostream& operator<<(std::ostream& os, const Student& s) {
        return os << s.name << " (grade " << s.grade << ")";
    }
};

int main() {
    Student a("Alice", 90), b("Bob", 85), c("Alice", 90);

    std::cout << std::boolalpha;
    std::cout << (a == c) << std::endl;   // true
    std::cout << (a > b) << std::endl;    // true (lexicographic: name first)
    std::cout << (b < a) << std::endl;    // true
    return 0;
}`}),e.jsx(r,{children:`true
true
true`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Custom Three-Way Comparison"}),e.jsx(t,{title:"Custom spaceship with specific ordering",children:`#include <iostream>
#include <compare>

class Version {
    int major, minor, patch;
public:
    Version(int ma, int mi, int p) : major(ma), minor(mi), patch(p) {}

    std::strong_ordering operator<=>(const Version& other) const {
        if (auto cmp = major <=> other.major; cmp != 0) return cmp;
        if (auto cmp = minor <=> other.minor; cmp != 0) return cmp;
        return patch <=> other.patch;
    }

    // When you define custom <=>, you must also define == explicitly
    bool operator==(const Version& other) const {
        return (*this <=> other) == 0;
    }

    friend std::ostream& operator<<(std::ostream& os, const Version& v) {
        return os << v.major << "." << v.minor << "." << v.patch;
    }
};

int main() {
    Version v1(2, 1, 0), v2(2, 1, 3), v3(3, 0, 0);

    std::cout << std::boolalpha;
    std::cout << v1 << " < " << v2 << " : " << (v1 < v2) << std::endl;
    std::cout << v3 << " > " << v2 << " : " << (v3 > v2) << std::endl;
    std::cout << v1 << " == " << v1 << " : " << (v1 == v1) << std::endl;
    return 0;
}`}),e.jsx(r,{children:`2.1.0 < 2.1.3 : true
3.0.0 > 2.1.3 : true
2.1.0 == 2.1.0 : true`}),e.jsx(s,{type:"info",title:"Defaulted vs custom operator<=>",children:e.jsxs("p",{children:["A ",e.jsx("code",{children:"= default"})," spaceship operator performs memberwise comparison in declaration order and also auto-generates ",e.jsx("code",{children:"operator=="}),". A custom spaceship does",e.jsx("strong",{children:"not"})," auto-generate ",e.jsx("code",{children:"operator=="})," -- you must define it separately. This is because the compiler assumes a custom ",e.jsx("code",{children:"<=>"})," might have different equality semantics."]})}),e.jsx(s,{type:"history",title:"Before C++20",children:e.jsxs("p",{children:["Before C++20, making a type fully comparable required defining all six operators (",e.jsx("code",{children:"=="}),", ",e.jsx("code",{children:"!="}),", ",e.jsx("code",{children:"<"}),", ",e.jsx("code",{children:">"}),",",e.jsx("code",{children:"<="}),", ",e.jsx("code",{children:">="}),") manually or using CRTP helper bases. The spaceship operator reduces this to one or two definitions."]})}),e.jsx(d,{compiler:"all",title:"C++20 required",children:e.jsxs("p",{children:["The spaceship operator requires C++20 or later. Compile with ",e.jsx("code",{children:"-std=c++20"})," (GCC/Clang) or ",e.jsx("code",{children:"/std:c++20"})," (MSVC). Include ",e.jsx("code",{children:"<compare>"})," for the ordering types."]})}),e.jsx(n,{title:"Default whenever possible",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"auto operator<=>(const T&) const = default;"})," when memberwise comparison in declaration order is correct. Only write a custom implementation when you need to compare a subset of members, use a different ordering, or apply special logic. The defaulted version is shorter, harder to get wrong, and adapts automatically when you add new members."]})}),e.jsx(o,{title:"Comparable Point Class",difficulty:"intermediate",prompt:"Create a Point2D class with x and y coordinates. Implement operator<=> that orders points by distance from the origin. Since floating-point distances can be unequal for 'equivalent' points, use std::partial_ordering. Also implement operator== that checks exact coordinate equality.",hints:["Distance = sqrt(x*x + y*y), but you can compare x*x+y*y to avoid sqrt","Use std::partial_ordering because doubles have NaN","operator== should check both x and y for exact equality"],solution:e.jsx(t,{children:`#include <iostream>
#include <compare>
#include <cmath>

class Point2D {
    double x, y;
public:
    Point2D(double x, double y) : x(x), y(y) {}

    double distSq() const { return x * x + y * y; }

    std::partial_ordering operator<=>(const Point2D& o) const {
        return distSq() <=> o.distSq();
    }
    bool operator==(const Point2D& o) const {
        return x == o.x && y == o.y;
    }

    friend std::ostream& operator<<(std::ostream& os, const Point2D& p) {
        return os << "(" << p.x << ", " << p.y << ")";
    }
};

int main() {
    Point2D a(3, 4), b(1, 1), c(4, 3);
    std::cout << std::boolalpha;
    std::cout << (a > b) << std::endl;   // true: 25 > 2
    std::cout << (a == c) << std::endl;  // false: different coords
    std::cout << (a < c) << std::endl;   // false: same distance
    return 0;
}`})}),e.jsx(c,{references:[{type:"cppreference",title:"Three-way comparison",url:"https://en.cppreference.com/w/cpp/language/operator_comparison#Three-way_comparison",description:"Spaceship operator reference"},{type:"cppreference",title:"std::strong_ordering",url:"https://en.cppreference.com/w/cpp/utility/compare/strong_ordering",description:"Strong ordering category"},{type:"cppreference",title:"Default comparisons",url:"https://en.cppreference.com/w/cpp/language/default_comparisons",description:"Auto-generated comparison operators"}]})]})}const z=Object.freeze(Object.defineProperty({__proto__:null,default:j},Symbol.toStringTag,{value:"Module"}));export{S as a,_ as b,D as c,A as d,T as e,I as f,B as g,N as h,P as i,z as j,k as s};
