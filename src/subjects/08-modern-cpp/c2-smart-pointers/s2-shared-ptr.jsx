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

export default function S2SharedPtr() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>std::shared_ptr</code> enables <strong>shared ownership</strong> of a dynamically
        allocated object. Multiple <code>shared_ptr</code> instances can point to the same object,
        and the object is destroyed only when the last <code>shared_ptr</code> owning it is destroyed
        or reset.
      </p>

      <DefinitionBlock title="std::shared_ptr and Reference Counting">
        <p>
          A <code>shared_ptr</code> maintains a <strong>control block</strong> that tracks how many
          <code>shared_ptr</code> instances share ownership (the <em>strong count</em>) and how many
          <code>weak_ptr</code> instances observe it (the <em>weak count</em>). When the strong count
          reaches zero, the managed object is destroyed.
        </p>
      </DefinitionBlock>

      <SyntaxBlock title="Creating a shared_ptr">
        <p>
          Use <code>std::make_shared</code> for efficient creation. It performs a single allocation
          for both the object and the control block.
        </p>
        <CppCode>{`#include <memory>
auto ptr = std::make_shared<Type>(constructor_args...);`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Shared Ownership in Practice</h2>

      <CppCode title="shared_basic.cpp">{`#include <iostream>
#include <memory>

class Document {
    std::string title_;
public:
    Document(std::string t) : title_(std::move(t)) {
        std::cout << "Document '" << title_ << "' created\\n";
    }
    ~Document() { std::cout << "Document '" << title_ << "' destroyed\\n"; }
    const std::string& title() const { return title_; }
};

int main() {
    auto doc = std::make_shared<Document>("Report");
    std::cout << "use_count: " << doc.use_count() << "\\n";

    {
        auto doc2 = doc;  // copy: both share ownership
        std::cout << "use_count: " << doc.use_count() << "\\n";
        std::cout << "doc2 title: " << doc2->title() << "\\n";
    } // doc2 destroyed, count decrements

    std::cout << "use_count: " << doc.use_count() << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`Document 'Report' created
use_count: 1
use_count: 2
doc2 title: Report
use_count: 1
Document 'Report' destroyed`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">The Control Block and Aliasing Constructor</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The <strong>aliasing constructor</strong> creates a <code>shared_ptr</code> that shares
        ownership with another but points to a different object, such as a member of the managed object.
      </p>

      <CppCode title="aliasing.cpp">{`#include <iostream>
#include <memory>

struct Pair {
    int first;
    int second;
    ~Pair() { std::cout << "Pair destroyed\\n"; }
};

int main() {
    auto p = std::make_shared<Pair>();
    p->first = 10;
    p->second = 20;

    // Aliasing: shares ownership of Pair, but points to 'second'
    std::shared_ptr<int> alias(p, &p->second);

    std::cout << "alias value: " << *alias << "\\n";
    std::cout << "p use_count: " << p.use_count() << "\\n";

    p.reset();  // Pair not destroyed yet, alias still owns it
    std::cout << "alias value after reset: " << *alias << "\\n";
    std::cout << "alias use_count: " << alias.use_count() << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`alias value: 20
p use_count: 2
alias value after reset: 20
alias use_count: 1
Pair destroyed`}</OutputBlock>

      <NoteBlock type="info" title="Control Block Overhead">
        <p>
          Each <code>shared_ptr</code> carries overhead: the control block stores the strong count,
          weak count, deleter, and allocator. <code>make_shared</code> mitigates this by combining
          the object and control block into a single allocation, improving cache locality and
          reducing allocation overhead.
        </p>
      </NoteBlock>

      <WarningBlock title="Avoid creating shared_ptr from raw pointers multiple times">
        <p>
          Never create two <code>shared_ptr</code> instances from the same raw pointer. Each will
          create its own control block, leading to double deletion. Always copy or move an existing
          <code>shared_ptr</code> to share ownership.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Prefer make_shared over new">
        <p>
          <code>std::make_shared&lt;T&gt;(args)</code> is preferred because it makes a single
          allocation, is exception-safe, and avoids the risk of memory leaks from interleaved
          evaluations. The only exception is when you need a custom deleter.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Shared Configuration Object"
        difficulty="intermediate"
        prompt="Create a Config class with a string 'setting' member. Write a function that takes a shared_ptr<Config> and prints the setting. Demonstrate that multiple shared_ptr instances keep the Config alive."
        hints={[
          "Use make_shared to create the Config",
          "Pass shared_ptr by value to the function to share ownership",
          "Print use_count() to observe the reference count",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <memory>
#include <string>

struct Config {
    std::string setting;
    Config(std::string s) : setting(std::move(s)) {}
    ~Config() { std::cout << "Config destroyed\\n"; }
};

void printSetting(std::shared_ptr<Config> cfg) {
    std::cout << "Setting: " << cfg->setting
              << " (count: " << cfg.use_count() << ")\\n";
}

int main() {
    auto cfg = std::make_shared<Config>("dark_mode=true");
    std::cout << "Count: " << cfg.use_count() << "\\n";
    printSetting(cfg);
    std::cout << "Count: " << cfg.use_count() << "\\n";
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::shared_ptr', url: 'https://en.cppreference.com/w/cpp/memory/shared_ptr', description: 'Shared-ownership smart pointer' },
        { type: 'cppreference', title: 'std::make_shared', url: 'https://en.cppreference.com/w/cpp/memory/shared_ptr/make_shared', description: 'Factory function for shared_ptr' },
        { type: 'textbook', title: 'Effective Modern C++', author: 'Scott Meyers', description: 'Item 19: Use std::shared_ptr for shared-ownership resource management' },
      ]} />
    </div>
  )
}
