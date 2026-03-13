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

export default function S3WeakPtr() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>std::weak_ptr</code> is a non-owning smart pointer that observes an object managed
        by <code>std::shared_ptr</code> without affecting its lifetime. Its primary purpose is to
        break <strong>circular references</strong> that would otherwise prevent shared_ptr objects
        from ever being destroyed.
      </p>

      <DefinitionBlock title="std::weak_ptr">
        <p>
          A weak_ptr holds a non-owning reference to an object managed by shared_ptr. It does not
          contribute to the strong reference count. To access the object, you must call
          <code>lock()</code> which returns a shared_ptr if the object still exists, or an empty
          shared_ptr if it has been destroyed.
        </p>
      </DefinitionBlock>

      <SyntaxBlock title="weak_ptr Operations">
        <p>
          The key operations on a weak_ptr are <code>lock()</code> to safely obtain a shared_ptr,
          and <code>expired()</code> to check if the managed object has been destroyed.
        </p>
        <CppCode>{`std::shared_ptr<T> sp = std::make_shared<T>();
std::weak_ptr<T> wp = sp;      // observe without owning
if (auto locked = wp.lock()) {  // safely access
    // use locked
}
bool gone = wp.expired();       // check if object was destroyed`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Breaking Circular References</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        When two objects hold <code>shared_ptr</code> to each other, neither can be destroyed. Using
        <code>weak_ptr</code> for the back-reference breaks the cycle.
      </p>

      <CppCode title="break_cycle.cpp">{`#include <iostream>
#include <memory>
#include <string>

struct Node {
    std::string name;
    std::shared_ptr<Node> next;   // owning reference
    std::weak_ptr<Node> prev;     // non-owning back-reference
    Node(std::string n) : name(std::move(n)) {
        std::cout << name << " created\\n";
    }
    ~Node() { std::cout << name << " destroyed\\n"; }
};

int main() {
    auto a = std::make_shared<Node>("A");
    auto b = std::make_shared<Node>("B");

    a->next = b;     // A owns B
    b->prev = a;     // B observes A (no ownership)

    std::cout << "a use_count: " << a.use_count() << "\\n";  // 1
    std::cout << "b use_count: " << b.use_count() << "\\n";  // 2

    // Access prev via lock()
    if (auto prev = b->prev.lock()) {
        std::cout << "B's prev: " << prev->name << "\\n";
    }
    return 0;
}`}</CppCode>

      <OutputBlock>{`A created
B created
a use_count: 1
b use_count: 2
B's prev: A
B destroyed
A destroyed`}</OutputBlock>

      <NoteBlock type="important" title="Why lock() instead of dereferencing">
        <p>
          You cannot dereference a weak_ptr directly. Between checking <code>expired()</code> and
          attempting to use the object, another thread could destroy it. <code>lock()</code> atomically
          checks and acquires a shared_ptr in one step, making it thread-safe.
        </p>
      </NoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Observer Pattern with weak_ptr</h2>

      <CppCode title="observer.cpp">{`#include <iostream>
#include <memory>
#include <vector>
#include <algorithm>

class Observer {
public:
    virtual void notify(const std::string& msg) = 0;
    virtual ~Observer() = default;
};

class Subject {
    std::vector<std::weak_ptr<Observer>> observers_;
public:
    void subscribe(std::weak_ptr<Observer> obs) {
        observers_.push_back(obs);
    }

    void broadcast(const std::string& msg) {
        for (auto it = observers_.begin(); it != observers_.end(); ) {
            if (auto obs = it->lock()) {
                obs->notify(msg);
                ++it;
            } else {
                it = observers_.erase(it);  // remove dead observers
            }
        }
    }
};

class Logger : public Observer {
    std::string name_;
public:
    Logger(std::string n) : name_(std::move(n)) {}
    void notify(const std::string& msg) override {
        std::cout << name_ << " received: " << msg << "\\n";
    }
};

int main() {
    Subject subject;
    auto log1 = std::make_shared<Logger>("Log1");
    auto log2 = std::make_shared<Logger>("Log2");
    subject.subscribe(log1);
    subject.subscribe(log2);
    subject.broadcast("Event 1");

    log1.reset();  // Log1 is destroyed
    subject.broadcast("Event 2");  // only Log2 receives it
    return 0;
}`}</CppCode>

      <OutputBlock>{`Log1 received: Event 1
Log2 received: Event 1
Log2 received: Event 2`}</OutputBlock>

      <WarningBlock title="Do not use expired() then lock()">
        <p>
          Calling <code>expired()</code> followed by <code>lock()</code> introduces a race condition
          in multithreaded code. The object could be destroyed between the two calls. Always use
          <code>lock()</code> directly and check the returned shared_ptr.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Use weak_ptr for caches and observers">
        <p>
          <code>weak_ptr</code> is ideal for caches (you can check if the object still exists before
          recreating it) and observer patterns (observers can disappear without leaking memory or
          leaving dangling pointers).
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Cache with weak_ptr"
        difficulty="intermediate"
        prompt="Implement a simple cache that stores a weak_ptr to a shared resource. Write a getResource() function that returns the cached object if it still exists, or creates a new one otherwise."
        hints={[
          "Store std::weak_ptr<Resource> as the cache entry",
          "In getResource(), call lock() on the weak_ptr",
          "If lock() returns null, create a new shared_ptr and update the cache",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <memory>

struct Data {
    int value;
    Data(int v) : value(v) { std::cout << "Data created\\n"; }
    ~Data() { std::cout << "Data destroyed\\n"; }
};

class Cache {
    std::weak_ptr<Data> cached_;
public:
    std::shared_ptr<Data> get(int val) {
        auto sp = cached_.lock();
        if (!sp) {
            sp = std::make_shared<Data>(val);
            cached_ = sp;
            std::cout << "Cache miss\\n";
        } else {
            std::cout << "Cache hit\\n";
        }
        return sp;
    }
};

int main() {
    Cache cache;
    {
        auto d = cache.get(42);   // miss
        auto d2 = cache.get(42);  // hit
    } // Data destroyed
    auto d3 = cache.get(99);      // miss, creates new
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::weak_ptr', url: 'https://en.cppreference.com/w/cpp/memory/weak_ptr', description: 'Non-owning smart pointer' },
        { type: 'cppreference', title: 'std::weak_ptr::lock', url: 'https://en.cppreference.com/w/cpp/memory/weak_ptr/lock', description: 'Safely obtain shared_ptr from weak_ptr' },
        { type: 'textbook', title: 'Effective Modern C++', author: 'Scott Meyers', description: 'Item 20: Use std::weak_ptr for shared_ptr-like pointers that can dangle' },
      ]} />
    </div>
  )
}
