import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import SyntaxBlock from '../../../components/content/SyntaxBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import WarningBlock from '../../../components/content/WarningBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import CompilerNoteBlock from '../../../components/content/CompilerNoteBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S2Sanitizers() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Sanitizers are compiler-instrumented runtime checks that detect undefined behavior, memory
        errors, data races, and other bugs that are otherwise extremely difficult to find. They
        are among the most valuable tools in a C++ developer's arsenal.
      </p>

      <DefinitionBlock title="Sanitizers">
        <p>
          Sanitizers are compile-time instrumentation tools that insert additional checks into your
          program. At runtime, they detect errors like buffer overflows, use-after-free, data races,
          and undefined behavior, reporting them with detailed diagnostics including stack traces.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">AddressSanitizer (ASan)</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        ASan detects memory errors including buffer overflows, use-after-free, use-after-return,
        memory leaks, and double-free bugs.
      </p>

      <SyntaxBlock title="Enabling ASan">
        <p>Add the sanitizer flag during both compilation and linking.</p>
        <CppCode>{`# GCC or Clang
g++ -fsanitize=address -g -O1 -fno-omit-frame-pointer program.cpp -o program
clang++ -fsanitize=address -g -O1 -fno-omit-frame-pointer program.cpp -o program`}</CppCode>
      </SyntaxBlock>

      <CppCode title="ASan detecting a buffer overflow">{`#include <iostream>

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    // ASan will catch this out-of-bounds access
    std::cout << arr[10] << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`=================================================================
==12345==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7fff...
READ of size 4 at 0x7fff... thread T0
    #0 0x... in main program.cpp:5
...`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">UndefinedBehaviorSanitizer (UBSan)</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        UBSan detects various forms of undefined behavior including signed integer overflow, null
        pointer dereference, misaligned access, and type mismatch.
      </p>

      <CppCode title="Enabling and triggering UBSan">{`// Compile: g++ -fsanitize=undefined -g program.cpp -o program

#include <iostream>
#include <climits>

int main() {
    int x = INT_MAX;
    int y = x + 1;  // UBSan catches signed integer overflow
    std::cout << y << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`program.cpp:7:17: runtime error: signed integer overflow:
2147483647 + 1 cannot be represented in type 'int'`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">ThreadSanitizer (TSan)</h2>

      <CppCode title="TSan detecting a data race">{`// Compile: g++ -fsanitize=thread -g -O1 program.cpp -o program -lpthread

#include <iostream>
#include <thread>

int counter = 0;  // Shared, unprotected

void increment() {
    for (int i = 0; i < 100000; ++i) {
        ++counter;  // Data race!
    }
}

int main() {
    std::thread t1(increment);
    std::thread t2(increment);
    t1.join();
    t2.join();
    std::cout << counter << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`==================
WARNING: ThreadSanitizer: data race (pid=12345)
  Write of size 4 at 0x... by thread T2:
    #0 increment() program.cpp:9
  Previous write of size 4 at 0x... by thread T1:
    #0 increment() program.cpp:9
==================`}</OutputBlock>

      <NoteBlock type="info" title="MemorySanitizer (MSan)">
        <p>
          MSan detects reads of uninitialized memory. It is currently available only with Clang.
          Enable with <code>-fsanitize=memory</code>. MSan cannot be combined with ASan or TSan
          in the same build.
        </p>
      </NoteBlock>

      <CompilerNoteBlock compiler="gcc" title="Combining Sanitizers">
        <p>
          ASan and UBSan can be combined: <code>-fsanitize=address,undefined</code>. However,
          TSan and ASan cannot be used together. MSan is Clang-only. Always use <code>-g</code> for
          debug symbols and <code>-fno-omit-frame-pointer</code> for accurate stack traces.
        </p>
      </CompilerNoteBlock>

      <WarningBlock title="Performance Impact">
        <p>
          Sanitizers add significant overhead: ASan typically slows programs by 2x and increases
          memory by 3x. TSan can add 5-15x slowdown. Sanitizers are for development and testing,
          not production builds.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Run sanitizers in CI">
        <p>
          Integrate sanitizer builds into your continuous integration pipeline. Run your full test
          suite with ASan+UBSan, and concurrency tests with TSan. This catches bugs before they
          reach production. Consider separate CI jobs for each sanitizer configuration.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Fix Sanitizer Warnings"
        difficulty="intermediate"
        prompt="Compile the following code with ASan and UBSan, identify the issues, and fix them."
        hints={[
          "Use -fsanitize=address,undefined to enable both sanitizers",
          "There is a use-after-free and a signed overflow",
          "Replace raw pointer with smart pointer and check arithmetic bounds",
        ]}
        solution={
          <CppCode>{`// Original code with bugs:
// int* p = new int(42); delete p; std::cout << *p;
// int x = INT_MAX; x += 1;

// Fixed:
#include <iostream>
#include <memory>
#include <climits>
#include <cstdint>

int main() {
    // Fix 1: use unique_ptr, access before release
    auto p = std::make_unique<int>(42);
    std::cout << *p << "\\n";
    p.reset();  // Freed after last use

    // Fix 2: use larger type or check for overflow
    int64_t x = INT_MAX;
    x += 1;  // No overflow in int64_t
    std::cout << x << "\\n";
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'article', title: 'AddressSanitizer', url: 'https://clang.llvm.org/docs/AddressSanitizer.html', description: 'Official ASan documentation' },
        { type: 'article', title: 'UndefinedBehaviorSanitizer', url: 'https://clang.llvm.org/docs/UndefinedBehaviorSanitizer.html', description: 'Official UBSan documentation' },
        { type: 'article', title: 'ThreadSanitizer', url: 'https://clang.llvm.org/docs/ThreadSanitizer.html', description: 'Official TSan documentation' },
      ]} />
    </div>
  )
}
