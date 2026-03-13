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

export default function S3LockFree() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Lock-free data structures guarantee that at least one thread makes progress at any point,
        even if other threads are suspended. They use atomic compare-and-swap (CAS) operations
        instead of mutexes, offering better worst-case latency and immunity to priority inversion
        and deadlocks.
      </p>

      <DefinitionBlock title="What is Lock-Free?">
        <p>
          An algorithm is <strong>lock-free</strong> if, when multiple threads operate concurrently,
          at least one thread is guaranteed to complete its operation in a finite number of steps.
          This is stronger than merely being "without locks" -- a lock-free algorithm must guarantee
          system-wide progress. <strong>Wait-free</strong> is even stronger: every thread completes
          in bounded steps.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Checking Lock-Free Support</h2>

      <SyntaxBlock title="is_lock_free()">
        <p>
          Use <code>is_lock_free()</code> to check whether an atomic type uses hardware atomics
          (true) or an internal mutex (false). Types larger than the platform's word size may
          not be lock-free.
        </p>
        <CppCode>{`std::atomic<int> a;
std::cout << std::boolalpha << a.is_lock_free();  // true on most platforms

struct Big { int data[100]; };
std::atomic<Big> b;
std::cout << b.is_lock_free();  // likely false`}</CppCode>
      </SyntaxBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Lock-Free Stack</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        A classic lock-free data structure is the Treiber stack. Push and pop use
        <code>compare_exchange_weak</code> on the head pointer. If another thread modifies the
        head between our read and CAS, the CAS fails and we retry.
      </p>

      <CppCode title="lock_free_stack.cpp">{`#include <iostream>
#include <atomic>
#include <thread>
#include <vector>

template<typename T>
class LockFreeStack {
    struct Node {
        T data;
        Node* next;
        Node(T val) : data(std::move(val)), next(nullptr) {}
    };
    std::atomic<Node*> head{nullptr};

public:
    void push(T value) {
        Node* new_node = new Node(std::move(value));
        new_node->next = head.load(std::memory_order_relaxed);
        while (!head.compare_exchange_weak(
            new_node->next, new_node,
            std::memory_order_release,
            std::memory_order_relaxed)) {}
    }

    bool pop(T& result) {
        Node* old_head = head.load(std::memory_order_acquire);
        while (old_head &&
               !head.compare_exchange_weak(
                   old_head, old_head->next,
                   std::memory_order_acquire,
                   std::memory_order_relaxed)) {}
        if (!old_head) return false;
        result = std::move(old_head->data);
        delete old_head;  // Simplified - see ABA problem warning
        return true;
    }
};

int main() {
    LockFreeStack<int> stack;
    std::vector<std::thread> threads;

    for (int i = 0; i < 4; ++i)
        threads.emplace_back([&stack, i]() {
            for (int j = 0; j < 100; ++j)
                stack.push(i * 100 + j);
        });
    for (auto& t : threads) t.join();

    int val, count = 0;
    while (stack.pop(val)) ++count;
    std::cout << "Popped " << count << " elements" << std::endl;
    return 0;
}`}</CppCode>

      <OutputBlock>{`Popped 400 elements`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">The ABA Problem</h2>

      <WarningBlock title="ABA Problem">
        <p>
          The ABA problem occurs when a CAS succeeds incorrectly: thread 1 reads value A, gets
          preempted, thread 2 changes A to B then back to A, thread 1 resumes and the CAS succeeds
          even though the data structure was modified. In the stack above, deleting a popped node
          while another thread still holds a pointer to it causes undefined behavior.
        </p>
      </WarningBlock>

      <NoteBlock type="info" title="ABA Solutions">
        <p>
          Common solutions include: (1) <strong>tagged pointers</strong> that include a monotonically
          increasing version counter alongside the pointer, (2) <strong>hazard pointers</strong> where
          threads publish which nodes they are accessing so others defer deletion, and
          (3) <strong>epoch-based reclamation</strong> where memory is freed only when no thread
          could still reference it.
        </p>
      </NoteBlock>

      <CppCode title="Tagged pointer sketch">{`#include <atomic>
#include <cstdint>

// Pack a pointer and a counter into a single atomic value
struct TaggedPtr {
    void* ptr;
    uintptr_t tag;
};

// On platforms with 128-bit CAS (e.g., x86-64 with cmpxchg16b):
// std::atomic<TaggedPtr> head;
// Each push/pop increments the tag, preventing ABA:
// TaggedPtr expected = head.load();
// TaggedPtr desired = {new_node, expected.tag + 1};
// head.compare_exchange_weak(expected, desired);`}</CppCode>

      <NoteBlock type="important" title="Hazard Pointers">
        <p>
          Hazard pointers are a safe memory reclamation technique for lock-free structures.
          Before accessing a node, a thread publishes the pointer in a per-thread hazard list.
          When a node is removed, it is placed in a retired list and only deleted when no hazard
          pointer references it. C++26 proposes <code>std::hazard_pointer</code> in the standard.
        </p>
      </NoteBlock>

      <NoteBlock type="tip" title="When to Go Lock-Free">
        <p>
          Lock-free programming is significantly harder to get right than mutex-based code. It is
          justified in real-time systems (where blocking is unacceptable), very high contention
          scenarios, or signal/interrupt handlers (where mutexes are unsafe). For most applications,
          a well-designed mutex-based solution is simpler and fast enough.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Use Proven Libraries for Lock-Free Structures">
        <p>
          Writing correct lock-free data structures is extremely difficult. Memory reclamation,
          ABA prevention, and memory ordering must all be handled correctly. Use well-tested
          libraries (Boost.Lockfree, libcds, Folly) rather than rolling your own, unless you have
          deep expertise and rigorous testing (including tools like ThreadSanitizer).
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Lock-Free Counter Comparison"
        difficulty="intermediate"
        prompt="Benchmark a simple counter using three approaches: (1) std::mutex with lock_guard, (2) std::atomic with seq_cst, (3) std::atomic with relaxed ordering. Run 4 threads incrementing 1,000,000 times each. Print the elapsed time for each approach."
        hints={[
          "Use std::chrono::high_resolution_clock to measure time",
          "Use fetch_add for atomic increments",
          "All three should produce the correct result of 4,000,000",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <atomic>
#include <mutex>
#include <thread>
#include <vector>
#include <chrono>

const int N = 1000000;
const int THREADS = 4;

template<typename Func>
double benchmark(Func fn) {
    auto start = std::chrono::high_resolution_clock::now();
    std::vector<std::thread> threads;
    for (int i = 0; i < THREADS; ++i) threads.emplace_back(fn);
    for (auto& t : threads) t.join();
    auto end = std::chrono::high_resolution_clock::now();
    return std::chrono::duration<double, std::milli>(end - start).count();
}

int main() {
    // Mutex
    std::mutex mtx; int mc = 0;
    double t1 = benchmark([&]{ for(int i=0;i<N;++i){std::lock_guard<std::mutex> l(mtx);++mc;} });
    std::cout << "Mutex:    " << mc << " in " << t1 << "ms" << std::endl;

    // Atomic seq_cst
    std::atomic<int> ac(0);
    double t2 = benchmark([&]{ for(int i=0;i<N;++i) ac.fetch_add(1); });
    std::cout << "Seq_cst:  " << ac.load() << " in " << t2 << "ms" << std::endl;

    // Atomic relaxed
    std::atomic<int> rc(0);
    double t3 = benchmark([&]{ for(int i=0;i<N;++i) rc.fetch_add(1,std::memory_order_relaxed); });
    std::cout << "Relaxed:  " << rc.load() << " in " << t3 << "ms" << std::endl;

    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'cppreference', title: 'std::atomic::is_lock_free', url: 'https://en.cppreference.com/w/cpp/atomic/atomic/is_lock_free', description: 'Check if atomic operations are lock-free' },
        { type: 'cppreference', title: 'Compare and exchange', url: 'https://en.cppreference.com/w/cpp/atomic/atomic/compare_exchange', description: 'CAS operations for lock-free algorithms' },
        { type: 'textbook', title: 'C++ Concurrency in Action', author: 'Anthony Williams', description: 'Chapter 7: Designing lock-free concurrent data structures' },
      ]} />
    </div>
  )
}
