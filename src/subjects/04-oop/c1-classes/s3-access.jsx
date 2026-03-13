import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S3Access() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Access specifiers control which parts of a program can use a class member. Combined with
        getters, setters, and the <code>friend</code> keyword, they form the basis
        of <strong>encapsulation</strong> -- one of the pillars of object-oriented programming.
      </p>

      <DefinitionBlock title="Encapsulation">
        <p>
          <strong>Encapsulation</strong> is the practice of hiding internal implementation details
          and exposing only a controlled interface. This protects data integrity and allows the
          internal representation to change without breaking code that uses the class.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Access Specifiers</h2>

      <SyntaxBlock title="public, private, protected">
        <p>
          <code>public</code> members are accessible from anywhere. <code>private</code> members are
          accessible only within the class itself. <code>protected</code> members are accessible
          within the class and its derived classes.
        </p>
        <CppCode>{`class Example {
public:      // accessible from anywhere
    void publicFunc();
protected:   // accessible in this class and derived classes
    int protectedData;
private:     // accessible only in this class
    int privateData;
};`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Encapsulation with getters and setters">{`#include <iostream>
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
}`}</CppCode>

      <OutputBlock>{`Alice: $1300`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">The friend Keyword</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        A <code>friend</code> function or class is granted access to the private and protected
        members of the class that declares it. Friendship is not inherited and not transitive.
      </p>

      <CppCode title="Friend function example">{`#include <iostream>

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
}`}</CppCode>

      <OutputBlock>{`a = (3, 4)
dot = 11`}</OutputBlock>

      <NoteBlock type="important" title="Friendship breaks encapsulation selectively">
        <p>
          Use <code>friend</code> sparingly. It creates a tight coupling between the class and the
          friend. Common legitimate uses include operator overloading (especially <code>&lt;&lt;</code>)
          and factory functions that need access to private constructors.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Make data members private">
        <p>
          Keep data members private and provide a minimal public interface. This lets you change the
          internal representation (e.g., switching from degrees to radians) without affecting code
          that uses the class. Only add getters and setters that are truly needed.
        </p>
      </BestPracticeBlock>

      <NoteBlock type="tip" title="const member functions">
        <p>
          Mark member functions that do not modify the object as <code>const</code>. This allows
          them to be called on <code>const</code> references and clearly communicates intent:
          <code>double getBalance() const;</code>
        </p>
      </NoteBlock>

      <ExerciseBlock
        title="Temperature Class with Validation"
        difficulty="beginner"
        prompt="Create a Temperature class that stores a value in Celsius as a private member. Provide setCelsius() with validation (reject values below -273.15), getCelsius(), and getFahrenheit() methods."
        hints={[
          "Fahrenheit = Celsius * 9/5 + 32",
          "Throw std::invalid_argument for values below absolute zero",
          "Mark getter methods as const",
        ]}
        solution={
          <CppCode>{`#include <iostream>
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
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'Access specifiers', url: 'https://en.cppreference.com/w/cpp/language/access', description: 'public, private, and protected access' },
        { type: 'cppreference', title: 'Friend declaration', url: 'https://en.cppreference.com/w/cpp/language/friend', description: 'Friend functions and classes' },
        { type: 'textbook', title: 'Effective C++', author: 'Scott Meyers', description: 'Item 22: Declare data members private' },
      ]} />
    </div>
  )
}
