import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import WarningBlock from '../../../components/content/WarningBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S2ExceptionSafety() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Writing code that uses exceptions is straightforward. Writing code that behaves correctly
        <em> when</em> exceptions are thrown is harder. Exception safety describes the guarantees a
        function provides about program state if an exception occurs during its execution.
      </p>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Three Levels of Exception Safety</h2>

      <DefinitionBlock title="Exception Safety Guarantees">
        <p>
          There are three levels of exception safety, from weakest to strongest:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Basic guarantee:</strong> No resources are leaked and invariants are preserved, but the
          program state may have changed.</li>
          <li><strong>Strong guarantee:</strong> If an operation fails, the program state is rolled back to
          exactly what it was before the operation began (commit-or-rollback semantics).</li>
          <li><strong>Nothrow guarantee:</strong> The operation is guaranteed never to throw. Marked
          with <code>noexcept</code>.</li>
        </ul>
      </DefinitionBlock>

      <CppCode title="safety_levels.cpp">{`#include <iostream>
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
}`}</CppCode>

      <OutputBlock>{`alpha beta gamma delta`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">RAII and Exception Safety</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        RAII (Resource Acquisition Is Initialization) is the foundation of exception safety in C++.
        When an exception causes the stack to unwind, local objects are destroyed in reverse order
        of construction. If resources are managed by RAII objects, they are automatically released.
      </p>

      <CppCode title="raii_safety.cpp">{`#include <iostream>
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
}`}</CppCode>

      <OutputBlock>{`Report written successfully.`}</OutputBlock>

      <WarningBlock title="Never manage resources manually">
        <p>
          If you allocate with <code>new</code> and free with <code>delete</code>, an exception
          between them causes a memory leak. Always use RAII wrappers: <code>std::unique_ptr</code>,
          <code>std::shared_ptr</code>, <code>std::vector</code>, <code>std::string</code>,
          <code>std::lock_guard</code>, and others.
        </p>
      </WarningBlock>

      <SyntaxBlock title="The copy-and-swap idiom (strong guarantee)">
        <p>
          To provide the strong guarantee for assignment operators, perform all potentially-throwing
          work on a temporary copy, then swap with the current object using a <code>noexcept</code> swap.
        </p>
        <CppCode>{`MyClass& operator=(MyClass other) {  // copy made here (may throw)
    swap(*this, other);               // noexcept swap -- commit
    return *this;                     // old data destroyed with 'other'
}`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Stack Unwinding</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        When an exception is thrown, the runtime walks back up the call stack, destroying local
        objects in each frame, until it finds a matching <code>catch</code> handler. This process
        is called <strong>stack unwinding</strong>. Destructors of all local objects are called,
        which is why RAII works.
      </p>

      <CppCode title="stack_unwinding.cpp">{`#include <iostream>
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
}`}</CppCode>

      <OutputBlock>{`  Constructed: A
  Constructed: B
  Constructed: C
  Destroyed: C
  Destroyed: B
Caught: Something went wrong
  Destroyed: A`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">std::terminate</h2>

      <NoteBlock type="important" title="When std::terminate is called">
        <p>
          The program calls <code>std::terminate</code> (which by default calls <code>std::abort</code>)
          in these situations: an exception escapes a <code>noexcept</code> function, an exception is
          thrown during stack unwinding (i.e., from a destructor), or an exception is never caught.
          This is why destructors must never throw.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Destructors must not throw">
        <p>
          A destructor that throws during stack unwinding causes <code>std::terminate</code>. Always
          mark destructors <code>noexcept</code> (they are implicitly <code>noexcept</code> since
          C++11). If cleanup can fail, log the error or suppress it -- never propagate it as an
          exception.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="RAII File Writer"
        difficulty="intermediate"
        prompt="Create a FileWriter class that opens a file in its constructor and closes it in its destructor (RAII). Write a function that uses it and throws an exception partway through -- verify that the file is still properly closed."
        hints={[
          "Store an std::ofstream as a member",
          "Open the file in the constructor, check for errors",
          "The destructor just needs to exist -- std::ofstream closes automatically",
          "Throw an exception after writing some data",
        ]}
        solution={
          <CppCode>{`#include <iostream>
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
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'RAII', url: 'https://en.cppreference.com/w/cpp/language/raii', description: 'Resource Acquisition Is Initialization idiom' },
        { type: 'cppreference', title: 'std::terminate', url: 'https://en.cppreference.com/w/cpp/error/terminate', description: 'When and how std::terminate is called' },
        { type: 'textbook', title: 'Effective Modern C++', author: 'Scott Meyers', description: 'Item 14: Declare functions noexcept if they won\'t emit exceptions' },
        { type: 'textbook', title: 'Exceptional C++', author: 'Herb Sutter', description: 'Comprehensive coverage of exception safety guarantees' },
      ]} />
    </div>
  )
}
