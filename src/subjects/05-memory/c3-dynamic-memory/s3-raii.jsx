import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import WarningBlock from '../../../components/content/WarningBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S3Raii() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        RAII (Resource Acquisition Is Initialization) is the most important idiom in C++. It ties
        the lifetime of a resource — memory, file handles, locks, sockets — to the lifetime of an
        object. When the object is destroyed, the resource is automatically released.
      </p>

      <DefinitionBlock title="RAII — Resource Acquisition Is Initialization">
        <p>
          <strong>RAII</strong> is a C++ programming idiom where resource allocation is done in a
          constructor and deallocation in the destructor. Because C++ guarantees that destructors
          run when objects leave scope (even during exceptions), RAII prevents resource leaks
          by design.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">The Core Principle</h2>

      <SyntaxBlock title="RAII Pattern">
        <p>
          Acquire the resource in the constructor. Release it in the destructor. The compiler
          ensures the destructor is called when the object goes out of scope.
        </p>
        <CppCode>{`class ResourceGuard {
    Resource* res;
public:
    ResourceGuard()  { res = acquire(); }   // acquire
    ~ResourceGuard() { release(res); }       // release
};  // destructor called automatically at end of scope`}</CppCode>
      </SyntaxBlock>

      <CppCode title="RAII file handle wrapper">{`#include <iostream>
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
}`}</CppCode>

      <OutputBlock>{`File opened
File closed
After scope`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">RAII and Exception Safety</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        RAII shines when exceptions are thrown. Without RAII, an exception can skip cleanup code,
        causing resource leaks. With RAII, the destructor runs during stack unwinding regardless.
      </p>

      <CppCode title="Exception safety with RAII">{`#include <iostream>
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
}`}</CppCode>

      <OutputBlock>{`Logger started
Doing work...
Logger stopped
Caught: Something went wrong`}</OutputBlock>

      <NoteBlock type="info" title="Standard Library RAII Types">
        <p>
          Many standard library types follow RAII: <code>std::unique_ptr</code> manages
          heap memory, <code>std::lock_guard</code> manages mutex locks,
          <code> std::fstream</code> manages file handles, and <code>std::thread</code> (with
          join/detach) manages threads.
        </p>
      </NoteBlock>

      <NoteBlock type="history" title="Origin of RAII">
        <p>
          RAII was coined by Bjarne Stroustrup in the 1980s. Despite the awkward name (the key
          insight is really about <em>destruction</em>, not initialization), it remains the
          cornerstone of safe C++ resource management and has influenced many other languages.
        </p>
      </NoteBlock>

      <WarningBlock title="Do Not Use Raw Resource Handles">
        <p>
          If you acquire a resource and store it in a raw pointer or handle, any early return
          or exception will skip your cleanup code. Always wrap resources in an RAII object.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Write Custom RAII Wrappers">
        <p>
          When interfacing with C libraries that use acquire/release patterns (e.g.,
          <code>open</code>/<code>close</code>, <code>lock</code>/<code>unlock</code>), wrap them
          in a small RAII class. Delete copy operations and consider supporting move semantics
          for transferable resources.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="RAII Lock Guard"
        difficulty="intermediate"
        prompt="Write a simple LockGuard class that takes a reference to a boolean 'locked' flag, sets it to true on construction and false on destruction. Demonstrate that the flag is reset even when an exception is thrown."
        hints={[
          "Store a reference to the bool in the class",
          "Set true in constructor, false in destructor",
          "Use try/catch to show it works with exceptions",
        ]}
        solution={
          <CppCode>{`#include <iostream>
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
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'RAII', url: 'https://en.cppreference.com/w/cpp/language/raii', description: 'Resource Acquisition Is Initialization idiom' },
        { type: 'cppreference', title: 'std::lock_guard', url: 'https://en.cppreference.com/w/cpp/thread/lock_guard', description: 'RAII mutex lock wrapper' },
        { type: 'textbook', title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', description: 'Section 13.3: Resource Management' },
      ]} />
    </div>
  )
}
