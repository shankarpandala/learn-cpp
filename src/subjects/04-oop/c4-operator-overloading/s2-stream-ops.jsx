import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S2StreamOps() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The stream insertion (<code>&lt;&lt;</code>) and extraction (<code>&gt;&gt;</code>) operators
        allow your custom types to integrate seamlessly with C++ I/O streams. Overloading these
        operators lets you print and read objects as naturally as built-in types.
      </p>

      <DefinitionBlock title="Stream Operators">
        <p>
          The <strong>insertion operator</strong> (<code>&lt;&lt;</code>) sends data to an output
          stream like <code>std::cout</code>. The <strong>extraction operator</strong>
          (<code>&gt;&gt;</code>) reads data from an input stream like <code>std::cin</code>.
          For custom types, these must be overloaded as <strong>non-member functions</strong>
          because the left operand is a stream, not your class.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Overloading operator&lt;&lt;</h2>

      <SyntaxBlock title="Output operator signature">
        <p>
          The output operator takes a reference to <code>std::ostream</code> and a const reference
          to your type. It must return the stream reference to support chaining.
        </p>
        <CppCode>{`std::ostream& operator<<(std::ostream& os, const MyType& obj) {
    os << /* format obj */;
    return os;  // enables chaining: cout << a << b
}`}</CppCode>
      </SyntaxBlock>

      <CppCode title="Stream operator with friend">{`#include <iostream>
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
}`}</CppCode>

      <OutputBlock>{`Today: 2025-03-15
Dates: 2025-03-15 and 2024-12-25`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Chaining and the Return Value</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Chaining works because each <code>&lt;&lt;</code> call returns the same stream reference.
        The expression <code>cout &lt;&lt; a &lt;&lt; b</code> is evaluated
        as <code>(cout &lt;&lt; a) &lt;&lt; b</code>. The first call outputs <code>a</code> and
        returns <code>cout</code>, which then receives <code>b</code>.
      </p>

      <CppCode title="Using with stringstream">{`#include <iostream>
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
}`}</CppCode>

      <OutputBlock>{`Point: (1.5, 2.7, 3.9)
Stored: (1.5, 2.7, 3.9)`}</OutputBlock>

      <NoteBlock type="info" title="Why friend is needed">
        <p>
          Stream operators cannot be member functions because the left operand
          is <code>std::ostream</code> (or <code>std::istream</code>), not your class. Since
          they are non-member functions, they need <code>friend</code> access to read private
          members -- or you can implement them using only public getters.
        </p>
      </NoteBlock>

      <NoteBlock type="tip" title="Alternative without friend">
        <p>
          If your class has public accessors, you can define the stream operator without
          <code>friend</code>. This is cleaner when the public interface is sufficient:
          <code>os &lt;&lt; obj.getX() &lt;&lt; ", " &lt;&lt; obj.getY()</code>.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Keep output format simple and parseable">
        <p>
          Design your <code>operator&lt;&lt;</code> output to be human-readable and, ideally,
          round-trippable via <code>operator&gt;&gt;</code>. Avoid embedding newlines in the output
          operator -- let the caller decide line breaks. This makes the operator composable with
          other stream operations.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Student Stream Operators"
        difficulty="beginner"
        prompt="Create a Student class with name (string) and gpa (double). Overload operator<< to output 'Name (GPA: X.XX)' and operator>> to read name and gpa from a stream. Test with a stringstream."
        hints={[
          "Use std::fixed and std::setprecision(2) for GPA formatting",
          "Include <iomanip> for stream manipulators",
          "For >>, read the name first, then the GPA",
        ]}
        solution={
          <CppCode>{`#include <iostream>
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
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'operator<< (ostream)', url: 'https://en.cppreference.com/w/cpp/io/basic_ostream/operator_ltlt', description: 'Output stream insertion operators' },
        { type: 'cppreference', title: 'operator>> (istream)', url: 'https://en.cppreference.com/w/cpp/io/basic_istream/operator_gtgt', description: 'Input stream extraction operators' },
        { type: 'textbook', title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', description: 'Chapter 38: I/O Streams' },
      ]} />
    </div>
  )
}
