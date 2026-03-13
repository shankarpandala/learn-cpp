import{j as e}from"./vendor-BlNF5je7.js";import{D as s,S as i,C as t,O as a,N as r,W as c,B as n,E as o,R as d,a as l}from"./subject-01-fundamentals-DsAKErwb.js";function h(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++11 introduced ",e.jsx("code",{children:"std::thread"})," as a portable, standard way to create and manage threads. A thread represents a single sequence of execution that runs concurrently with other threads in the same process, sharing the same address space."]}),e.jsx(s,{title:"What is a Thread?",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"thread"})," is the smallest unit of execution scheduled by the operating system. Multiple threads within a process share memory and resources, enabling concurrent work.",e.jsx("code",{children:"std::thread"})," is defined in the ",e.jsx("code",{children:"<thread>"})," header."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Creating a Thread"}),e.jsxs(i,{title:"std::thread Constructor",children:[e.jsxs("p",{children:["A ",e.jsx("code",{children:"std::thread"})," is constructed with a callable (function, lambda, or functor) and optional arguments. The thread begins execution immediately upon construction."]}),e.jsx(t,{children:"std::thread t(callable, arg1, arg2, ...);"})]}),e.jsx(t,{title:"basic_thread.cpp",children:`#include <iostream>
#include <thread>

void greet(const std::string& name) {
    std::cout << "Hello from thread, " << name << "!" << std::endl;
}

int main() {
    std::thread t(greet, "Alice");
    t.join();  // Wait for thread to finish
    std::cout << "Back in main thread." << std::endl;
    return 0;
}`}),e.jsx(a,{children:`Hello from thread, Alice!
Back in main thread.`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"join() and detach()"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Every ",e.jsx("code",{children:"std::thread"})," must be either ",e.jsx("strong",{children:"joined"})," or ",e.jsx("strong",{children:"detached"})," before it is destroyed. Failing to do so calls ",e.jsx("code",{children:"std::terminate"}),", crashing the program."]}),e.jsx(r,{type:"info",title:"join() vs detach()",children:e.jsxs("p",{children:[e.jsx("code",{children:"join()"})," blocks the calling thread until the target thread completes.",e.jsx("code",{children:"detach()"})," separates the thread from the ",e.jsx("code",{children:"std::thread"})," object, letting it run independently as a daemon thread. Once detached, you cannot rejoin it."]})}),e.jsx(c,{title:"Detached Thread Dangers",children:e.jsxs("p",{children:["A detached thread continues running even after ",e.jsx("code",{children:"main()"})," returns. If it accesses local variables or objects that have been destroyed, you get undefined behavior. Prefer",e.jsx("code",{children:"join()"})," unless you have a clear reason to detach."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Lambda Threads and Arguments"}),e.jsx(t,{title:"lambda_thread.cpp",children:`#include <iostream>
#include <thread>
#include <vector>

int main() {
    std::vector<std::thread> threads;

    for (int i = 0; i < 4; ++i) {
        threads.emplace_back([i]() {
            std::cout << "Thread " << i << " running\\n";
        });
    }

    for (auto& t : threads) {
        t.join();
    }

    std::cout << "All threads finished." << std::endl;
    return 0;
}`}),e.jsx(a,{children:`Thread 0 running
Thread 2 running
Thread 1 running
Thread 3 running
All threads finished.`}),e.jsx(r,{type:"important",title:"Passing References to Threads",children:e.jsxs("p",{children:["Arguments are ",e.jsx("strong",{children:"copied"})," into the thread by default. To pass by reference, wrap the argument with ",e.jsx("code",{children:"std::ref()"}),". Without it, the thread receives a copy even if the function signature takes a reference."]})}),e.jsx(t,{title:"Passing by reference",children:`#include <iostream>
#include <thread>

void increment(int& value) {
    ++value;
}

int main() {
    int x = 10;
    std::thread t(increment, std::ref(x));
    t.join();
    std::cout << "x = " << x << std::endl;  // x = 11
    return 0;
}`}),e.jsx(a,{children:"x = 11"}),e.jsx(n,{title:"Always Join or Detach",children:e.jsxs("p",{children:["Use RAII wrappers or scope guards to ensure threads are joined before destruction. In C++20, prefer ",e.jsx("code",{children:"std::jthread"})," which automatically joins in its destructor. Never let a joinable ",e.jsx("code",{children:"std::thread"})," go out of scope."]})}),e.jsx(o,{title:"Parallel Summation",difficulty:"intermediate",prompt:"Create two threads that each compute the sum of half an array, then combine the partial sums in main.",hints:["Use std::ref() to pass the result variables by reference","Split the array index range between the two threads","Join both threads before combining results"],solution:e.jsx(t,{children:`#include <iostream>
#include <thread>
#include <vector>

void partial_sum(const std::vector<int>& data, int start, int end, long long& result) {
    result = 0;
    for (int i = start; i < end; ++i)
        result += data[i];
}

int main() {
    std::vector<int> data(1000, 1);  // 1000 ones
    long long sum1 = 0, sum2 = 0;
    int mid = data.size() / 2;

    std::thread t1(partial_sum, std::cref(data), 0, mid, std::ref(sum1));
    std::thread t2(partial_sum, std::cref(data), mid, (int)data.size(), std::ref(sum2));
    t1.join();
    t2.join();

    std::cout << "Total: " << sum1 + sum2 << std::endl;
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"std::thread",url:"https://en.cppreference.com/w/cpp/thread/thread",description:"Thread class documentation"},{type:"cppreference",title:"std::ref",url:"https://en.cppreference.com/w/cpp/utility/functional/ref",description:"Reference wrapper for passing arguments by reference"},{type:"textbook",title:"C++ Concurrency in Action",author:"Anthony Williams",description:"Chapter 2: Managing Threads"}]})]})}const T=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"}));function u(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++20 introduced ",e.jsx("code",{children:"std::jthread"})," (joining thread), which improves upon ",e.jsx("code",{children:"std::thread"})," by automatically joining in its destructor and supporting cooperative cancellation through stop tokens. This eliminates an entire class of bugs where threads are accidentally left joinable at destruction time."]}),e.jsx(s,{title:"What is std::jthread?",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::jthread"})," is a RAII-based thread class defined in ",e.jsx("code",{children:"<thread>"}),". When a ",e.jsx("code",{children:"jthread"})," object is destroyed, it automatically requests a stop and joins the thread. It also provides built-in cooperative cancellation via ",e.jsx("code",{children:"std::stop_token"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Automatic Joining"}),e.jsx(t,{title:"jthread_basics.cpp",children:`#include <iostream>
#include <thread>

int main() {
    {
        std::jthread t([]() {
            std::cout << "Working in jthread..." << std::endl;
        });
        // No explicit join needed!
        // Destructor calls request_stop() then join()
    }
    std::cout << "jthread automatically joined." << std::endl;
    return 0;
}`}),e.jsx(a,{children:`Working in jthread...
jthread automatically joined.`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Cooperative Cancellation"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The key feature of ",e.jsx("code",{children:"std::jthread"})," is cooperative cancellation. The thread function can accept a ",e.jsx("code",{children:"std::stop_token"})," as its first parameter and periodically check whether a stop has been requested."]}),e.jsxs(i,{title:"stop_token Pattern",children:[e.jsxs("p",{children:["When the callable's first parameter is ",e.jsx("code",{children:"std::stop_token"}),", the ",e.jsx("code",{children:"jthread"}),"automatically passes its internal stop token. The thread checks",e.jsx("code",{children:"stop_token.stop_requested()"})," to know when to exit gracefully."]}),e.jsx(t,{children:`std::jthread t([](std::stop_token stoken) {
    while (!stoken.stop_requested()) {
        // do work
    }
});`})]}),e.jsx(t,{title:"cooperative_cancel.cpp",children:`#include <iostream>
#include <thread>
#include <chrono>

int main() {
    std::jthread worker([](std::stop_token stoken) {
        int count = 0;
        while (!stoken.stop_requested()) {
            std::cout << "Working... iteration " << ++count << std::endl;
            std::this_thread::sleep_for(std::chrono::milliseconds(200));
        }
        std::cout << "Stop requested, cleaning up." << std::endl;
    });

    std::this_thread::sleep_for(std::chrono::seconds(1));
    worker.request_stop();  // Signal the thread to stop
    // Destructor joins automatically
    std::cout << "Worker stopped gracefully." << std::endl;
    return 0;
}`}),e.jsx(a,{children:`Working... iteration 1
Working... iteration 2
Working... iteration 3
Working... iteration 4
Working... iteration 5
Stop requested, cleaning up.
Worker stopped gracefully.`}),e.jsx(r,{type:"info",title:"stop_source and stop_token",children:e.jsxs("p",{children:["A ",e.jsx("code",{children:"std::stop_source"})," produces ",e.jsx("code",{children:"std::stop_token"})," objects. The",e.jsx("code",{children:"jthread"})," owns a stop source internally. You can also retrieve it via",e.jsx("code",{children:"get_stop_source()"})," and ",e.jsx("code",{children:"get_stop_token()"})," to share cancellation signals across multiple components."]})}),e.jsx(r,{type:"tip",title:"stop_callback",children:e.jsxs("p",{children:["You can register a ",e.jsx("code",{children:"std::stop_callback"})," on a stop token. The callback executes when a stop is requested, enabling reactive cleanup patterns such as closing sockets or cancelling I/O operations without polling."]})}),e.jsx(l,{compiler:"all",title:"C++20 Required",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::jthread"})," requires C++20 or later. Compile with ",e.jsx("code",{children:"-std=c++20"})," (GCC/Clang) or ",e.jsx("code",{children:"/std:c++20"})," (MSVC). GCC 10+, Clang 14+, and MSVC 19.28+ support jthread."]})}),e.jsx(n,{title:"Prefer jthread Over thread",children:e.jsxs("p",{children:["In C++20 and later, prefer ",e.jsx("code",{children:"std::jthread"})," over ",e.jsx("code",{children:"std::thread"}),". It prevents resource leaks from forgotten joins and provides a clean cancellation mechanism. Use ",e.jsx("code",{children:"std::thread"})," only when you need compatibility with pre-C++20 codebases."]})}),e.jsx(o,{title:"Periodic Logger with Cancellation",difficulty:"intermediate",prompt:"Write a jthread that logs a timestamp every 500ms. Use stop_token to stop it after 2 seconds. Register a stop_callback that prints a farewell message.",hints:["Use std::stop_token as the first parameter of the lambda","Use std::chrono::steady_clock::now() for timestamps","Create a std::stop_callback before the sleep loop"],solution:e.jsx(t,{children:`#include <iostream>
#include <thread>
#include <chrono>

int main() {
    auto start = std::chrono::steady_clock::now();

    std::jthread logger([start](std::stop_token stoken) {
        std::stop_callback cb(stoken, []() {
            std::cout << "Goodbye from logger!" << std::endl;
        });

        while (!stoken.stop_requested()) {
            auto elapsed = std::chrono::steady_clock::now() - start;
            auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(elapsed).count();
            std::cout << "Log at " << ms << "ms" << std::endl;
            std::this_thread::sleep_for(std::chrono::milliseconds(500));
        }
    });

    std::this_thread::sleep_for(std::chrono::seconds(2));
    logger.request_stop();
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"std::jthread",url:"https://en.cppreference.com/w/cpp/thread/jthread",description:"Joining thread with cooperative cancellation"},{type:"cppreference",title:"std::stop_token",url:"https://en.cppreference.com/w/cpp/thread/stop_token",description:"Stop token for cooperative cancellation"},{type:"standard",title:"P0660R10",author:"Nicolai Josuttis et al.",description:"Cooperative interruption proposal for C++20"}]})]})}const A=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"}));function m(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The ",e.jsx("code",{children:"thread_local"})," storage specifier creates a separate instance of a variable for each thread. This provides a way to maintain per-thread state without explicit synchronization, since each thread accesses its own independent copy of the variable."]}),e.jsx(s,{title:"What is thread_local?",children:e.jsxs("p",{children:[e.jsx("code",{children:"thread_local"})," is a storage duration specifier introduced in C++11. A",e.jsx("code",{children:"thread_local"})," variable is created when a thread starts and destroyed when the thread exits. Each thread has its own independent instance, eliminating the need for locks when accessing the variable."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic Usage"}),e.jsxs(i,{title:"thread_local Syntax",children:[e.jsxs("p",{children:["The ",e.jsx("code",{children:"thread_local"})," keyword can be used with global, namespace-scope, or static local variables. It can also be combined with ",e.jsx("code",{children:"static"})," or ",e.jsx("code",{children:"extern"}),"."]}),e.jsx(t,{children:`thread_local int tls_var = 0;          // Global thread-local
static thread_local int stls_var = 0;  // Same as above (static implied)

void func() {
    thread_local int local_tls = 0;    // Static thread-local in function
}`})]}),e.jsx(t,{title:"thread_local_demo.cpp",children:`#include <iostream>
#include <thread>
#include <vector>

thread_local int counter = 0;

void increment_counter(int id, int times) {
    for (int i = 0; i < times; ++i) {
        ++counter;
    }
    std::cout << "Thread " << id << ": counter = " << counter << std::endl;
}

int main() {
    std::vector<std::thread> threads;
    for (int i = 0; i < 3; ++i) {
        threads.emplace_back(increment_counter, i, (i + 1) * 100);
    }
    for (auto& t : threads) t.join();

    std::cout << "Main thread: counter = " << counter << std::endl;
    return 0;
}`}),e.jsx(a,{children:`Thread 0: counter = 100
Thread 1: counter = 200
Thread 2: counter = 300
Main thread: counter = 0`}),e.jsx(r,{type:"info",title:"Independent Copies",children:e.jsxs("p",{children:["Each thread starts with its own freshly initialized copy of the variable. In the example above, the main thread's ",e.jsx("code",{children:"counter"})," remains 0 because it never called",e.jsx("code",{children:"increment_counter"}),". Each worker thread independently accumulated its own count."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Use Cases"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Common use cases for ",e.jsx("code",{children:"thread_local"})," include per-thread caches, error codes, random number generators, memory allocators, and logging context. They avoid synchronization overhead while giving each thread its own state."]}),e.jsx(t,{title:"Per-thread random generator",children:`#include <iostream>
#include <thread>
#include <random>

void generate_random(int id) {
    thread_local std::mt19937 rng(std::hash<std::thread::id>{}(
        std::this_thread::get_id()));
    std::uniform_int_distribution<int> dist(1, 100);

    std::cout << "Thread " << id << ": "
              << dist(rng) << ", " << dist(rng) << std::endl;
}

int main() {
    std::thread t1(generate_random, 1);
    std::thread t2(generate_random, 2);
    t1.join();
    t2.join();
    return 0;
}`}),e.jsx(c,{title:"Initialization Order",children:e.jsx("p",{children:"Thread-local variables with dynamic initialization (constructors, function calls) are initialized the first time control passes through their declaration in each thread. Be cautious of initialization order dependencies between thread-local variables, as the order may differ from static variables."})}),e.jsx(r,{type:"tip",title:"thread_local and Performance",children:e.jsxs("p",{children:["Accessing ",e.jsx("code",{children:"thread_local"})," variables is generally fast but slightly slower than accessing regular local variables, since the compiler must look up the thread-specific storage. On most platforms, this is implemented via the TLS segment or platform-specific mechanisms like ",e.jsx("code",{children:"__thread"})," (GCC) or ",e.jsx("code",{children:"__declspec(thread)"})," (MSVC)."]})}),e.jsx(n,{title:"Prefer thread_local Over Global Mutexed State",children:e.jsxs("p",{children:["When each thread needs its own independent copy of some state, use ",e.jsx("code",{children:"thread_local"}),"rather than a global variable protected by a mutex. This eliminates contention entirely and simplifies code. Aggregate results after threads complete if needed."]})}),e.jsx(o,{title:"Thread-Local Accumulator",difficulty:"intermediate",prompt:"Create a program where 4 threads each accumulate numbers from a shared array into thread_local sums, then store their partial sums into a shared results vector (protected by a mutex).",hints:["Divide the array into 4 equal ranges, one per thread","Use thread_local for the partial sum variable","Use std::mutex to protect the shared results vector"],solution:e.jsx(t,{children:`#include <iostream>
#include <thread>
#include <vector>
#include <mutex>
#include <numeric>

std::mutex mtx;
std::vector<long long> results;

void partial_sum(const std::vector<int>& data, int start, int end) {
    thread_local long long sum = 0;
    sum = 0;
    for (int i = start; i < end; ++i) sum += data[i];

    std::lock_guard<std::mutex> lock(mtx);
    results.push_back(sum);
}

int main() {
    std::vector<int> data(1000);
    std::iota(data.begin(), data.end(), 1);

    std::vector<std::thread> threads;
    int chunk = data.size() / 4;
    for (int i = 0; i < 4; ++i) {
        int s = i * chunk, e = (i == 3) ? (int)data.size() : s + chunk;
        threads.emplace_back(partial_sum, std::cref(data), s, e);
    }
    for (auto& t : threads) t.join();

    long long total = 0;
    for (auto v : results) total += v;
    std::cout << "Total: " << total << std::endl;  // 500500
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"thread_local",url:"https://en.cppreference.com/w/cpp/keyword/thread_local",description:"Thread-local storage duration specifier"},{type:"cppreference",title:"Storage duration",url:"https://en.cppreference.com/w/cpp/language/storage_duration",description:"All storage duration specifiers in C++"},{type:"textbook",title:"C++ Concurrency in Action",author:"Anthony Williams",description:"Chapter 8: Designing concurrent code"}]})]})}const C=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"}));function p(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["When multiple threads access shared data, you need ",e.jsx("strong",{children:"mutual exclusion"})," to prevent data races. A ",e.jsx("code",{children:"std::mutex"})," ensures that only one thread can access a critical section at a time, while RAII lock wrappers guarantee the mutex is always released."]}),e.jsx(s,{title:"What is a Mutex?",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"mutex"})," (mutual exclusion) is a synchronization primitive that protects shared data from concurrent access. A thread must ",e.jsx("em",{children:"lock"})," the mutex before entering a critical section and ",e.jsx("em",{children:"unlock"})," it upon exit. Defined in ",e.jsx("code",{children:"<mutex>"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::mutex and lock_guard"}),e.jsxs(i,{title:"lock_guard (RAII Lock)",children:[e.jsxs("p",{children:[e.jsx("code",{children:"std::lock_guard"})," locks the mutex on construction and unlocks it on destruction. This guarantees the mutex is released even if an exception is thrown."]}),e.jsx(t,{children:`std::mutex mtx;
{
    std::lock_guard<std::mutex> lock(mtx);
    // critical section - mutex is held
}  // mutex automatically released here`})]}),e.jsx(t,{title:"safe_counter.cpp",children:`#include <iostream>
#include <thread>
#include <mutex>
#include <vector>

std::mutex mtx;
int counter = 0;

void increment(int times) {
    for (int i = 0; i < times; ++i) {
        std::lock_guard<std::mutex> lock(mtx);
        ++counter;
    }
}

int main() {
    std::vector<std::thread> threads;
    for (int i = 0; i < 4; ++i)
        threads.emplace_back(increment, 10000);
    for (auto& t : threads) t.join();

    std::cout << "Counter: " << counter << std::endl;  // Always 40000
    return 0;
}`}),e.jsx(a,{children:"Counter: 40000"}),e.jsx(c,{title:"Never Lock Manually Without RAII",children:e.jsxs("p",{children:["Calling ",e.jsx("code",{children:"mtx.lock()"})," and ",e.jsx("code",{children:"mtx.unlock()"})," manually is error-prone. If an exception occurs between lock and unlock, the mutex remains locked forever, causing a deadlock. Always use ",e.jsx("code",{children:"lock_guard"})," or ",e.jsx("code",{children:"unique_lock"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::unique_lock"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"std::unique_lock"})," is more flexible than ",e.jsx("code",{children:"lock_guard"}),". It supports deferred locking, timed locking, manual unlock/relock, and is movable. It is required when using condition variables."]}),e.jsx(t,{title:"unique_lock_example.cpp",children:`#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx;

void work(int id) {
    std::unique_lock<std::mutex> lock(mtx, std::defer_lock);
    // Do some non-critical work first...

    lock.lock();  // Lock when needed
    std::cout << "Thread " << id << " in critical section" << std::endl;
    lock.unlock();  // Can unlock early

    // Do more non-critical work...
}

int main() {
    std::thread t1(work, 1);
    std::thread t2(work, 2);
    t1.join();
    t2.join();
    return 0;
}`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"shared_mutex (Reader-Writer Lock)"}),e.jsx(r,{type:"info",title:"Reader-Writer Pattern",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::shared_mutex"})," (C++17) allows multiple readers to hold a shared lock simultaneously, but only one writer can hold an exclusive lock. Use",e.jsx("code",{children:"std::shared_lock"})," for reading and ",e.jsx("code",{children:"std::unique_lock"})," for writing."]})}),e.jsx(t,{title:"reader_writer.cpp",children:`#include <iostream>
#include <thread>
#include <shared_mutex>
#include <vector>

std::shared_mutex rw_mutex;
int shared_data = 0;

void reader(int id) {
    std::shared_lock<std::shared_mutex> lock(rw_mutex);
    std::cout << "Reader " << id << " sees: " << shared_data << std::endl;
}

void writer(int value) {
    std::unique_lock<std::shared_mutex> lock(rw_mutex);
    shared_data = value;
    std::cout << "Writer set data to " << value << std::endl;
}

int main() {
    std::thread w1(writer, 42);
    w1.join();
    std::thread r1(reader, 1), r2(reader, 2);
    r1.join(); r2.join();
    return 0;
}`}),e.jsx(a,{children:`Writer set data to 42
Reader 1 sees: 42
Reader 2 sees: 42`}),e.jsx(n,{title:"Minimize Lock Scope",children:e.jsx("p",{children:"Hold locks for the shortest duration possible. Perform computations, I/O, and memory allocations outside the critical section. Only protect the actual shared data access. This reduces contention and improves throughput."})}),e.jsx(o,{title:"Thread-Safe Bank Account",difficulty:"intermediate",prompt:"Implement a BankAccount class with deposit() and withdraw() methods protected by a mutex. Create multiple threads performing concurrent deposits and withdrawals, and verify the final balance is correct.",hints:["Use a private std::mutex member in the class","Use std::lock_guard in both deposit() and withdraw()","Track expected final balance to verify correctness"],solution:e.jsx(t,{children:`#include <iostream>
#include <thread>
#include <mutex>
#include <vector>

class BankAccount {
    mutable std::mutex mtx;
    double balance;
public:
    BankAccount(double initial) : balance(initial) {}
    void deposit(double amount) {
        std::lock_guard<std::mutex> lock(mtx);
        balance += amount;
    }
    void withdraw(double amount) {
        std::lock_guard<std::mutex> lock(mtx);
        balance -= amount;
    }
    double get_balance() const {
        std::lock_guard<std::mutex> lock(mtx);
        return balance;
    }
};

int main() {
    BankAccount account(1000.0);
    std::vector<std::thread> threads;

    for (int i = 0; i < 5; ++i)
        threads.emplace_back([&]() {
            for (int j = 0; j < 100; ++j) account.deposit(10.0);
        });
    for (int i = 0; i < 5; ++i)
        threads.emplace_back([&]() {
            for (int j = 0; j < 100; ++j) account.withdraw(10.0);
        });

    for (auto& t : threads) t.join();
    std::cout << "Balance: " << account.get_balance() << std::endl;
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"std::mutex",url:"https://en.cppreference.com/w/cpp/thread/mutex",description:"Mutex class documentation"},{type:"cppreference",title:"std::shared_mutex",url:"https://en.cppreference.com/w/cpp/thread/shared_mutex",description:"Reader-writer mutex (C++17)"},{type:"textbook",title:"C++ Concurrency in Action",author:"Anthony Williams",description:"Chapter 3: Sharing data between threads"}]})]})}const q=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"}));function x(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["A ",e.jsx("code",{children:"std::condition_variable"})," allows threads to wait for a condition to become true without busy-waiting. One thread waits until notified by another thread, enabling efficient inter-thread communication patterns like producer-consumer queues."]}),e.jsx(s,{title:"What is a Condition Variable?",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"condition variable"})," is a synchronization primitive that blocks a thread until another thread signals that a shared condition has changed. It is always used with a ",e.jsx("code",{children:"std::mutex"})," and a predicate (boolean condition) to guard against spurious wakeups. Defined in ",e.jsx("code",{children:"<condition_variable>"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic Usage"}),e.jsxs(i,{title:"wait / notify Pattern",children:[e.jsxs("p",{children:["The waiting thread locks a mutex, then calls ",e.jsx("code",{children:"wait()"})," with a predicate. The notifying thread modifies the shared state under the mutex, then calls",e.jsx("code",{children:"notify_one()"})," or ",e.jsx("code",{children:"notify_all()"}),"."]}),e.jsx(t,{children:`// Waiter
std::unique_lock<std::mutex> lock(mtx);
cv.wait(lock, []{ return condition; });

// Notifier
{
    std::lock_guard<std::mutex> lock(mtx);
    condition = true;
}
cv.notify_one();`})]}),e.jsx(t,{title:"simple_signal.cpp",children:`#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>

std::mutex mtx;
std::condition_variable cv;
bool ready = false;

void worker() {
    std::unique_lock<std::mutex> lock(mtx);
    cv.wait(lock, []{ return ready; });
    std::cout << "Worker proceeding after signal!" << std::endl;
}

int main() {
    std::thread t(worker);

    std::this_thread::sleep_for(std::chrono::milliseconds(500));
    {
        std::lock_guard<std::mutex> lock(mtx);
        ready = true;
    }
    cv.notify_one();
    t.join();
    return 0;
}`}),e.jsx(a,{children:"Worker proceeding after signal!"}),e.jsx(c,{title:"Spurious Wakeups",children:e.jsxs("p",{children:["A condition variable may wake a thread even when no notification was sent. This is called a ",e.jsx("strong",{children:"spurious wakeup"}),". Always use a predicate with ",e.jsx("code",{children:"wait()"})," to recheck the condition. Never use ",e.jsx("code",{children:"wait()"})," without a predicate in production code."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Producer-Consumer Pattern"}),e.jsx(t,{title:"producer_consumer.cpp",children:`#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <queue>

std::mutex mtx;
std::condition_variable cv;
std::queue<int> buffer;
bool done = false;

void producer() {
    for (int i = 1; i <= 5; ++i) {
        {
            std::lock_guard<std::mutex> lock(mtx);
            buffer.push(i);
            std::cout << "Produced: " << i << std::endl;
        }
        cv.notify_one();
    }
    {
        std::lock_guard<std::mutex> lock(mtx);
        done = true;
    }
    cv.notify_one();
}

void consumer() {
    while (true) {
        std::unique_lock<std::mutex> lock(mtx);
        cv.wait(lock, []{ return !buffer.empty() || done; });

        while (!buffer.empty()) {
            std::cout << "Consumed: " << buffer.front() << std::endl;
            buffer.pop();
        }
        if (done && buffer.empty()) break;
    }
}

int main() {
    std::thread prod(producer);
    std::thread cons(consumer);
    prod.join();
    cons.join();
    return 0;
}`}),e.jsx(a,{children:`Produced: 1
Produced: 2
Consumed: 1
Consumed: 2
Produced: 3
Produced: 4
Produced: 5
Consumed: 3
Consumed: 4
Consumed: 5`}),e.jsx(r,{type:"info",title:"notify_one vs notify_all",children:e.jsxs("p",{children:[e.jsx("code",{children:"notify_one()"})," wakes exactly one waiting thread (chosen by the OS). Use it when only one thread should respond. ",e.jsx("code",{children:"notify_all()"})," wakes all waiting threads. Use it when multiple threads may need to re-evaluate the condition, such as when a shared resource is released."]})}),e.jsx(r,{type:"tip",title:"Notification Before Wait",children:e.jsxs("p",{children:["If ",e.jsx("code",{children:"notify_one()"})," is called before any thread is waiting, the notification is lost. This is safe if you use a predicate, because the waiting thread will check the condition and proceed immediately without blocking."]})}),e.jsx(n,{title:"Always Use a Predicate with wait()",children:e.jsxs("p",{children:["Use the two-argument form ",e.jsx("code",{children:"cv.wait(lock, predicate)"})," instead of the bare",e.jsx("code",{children:"cv.wait(lock)"}),". The predicate version handles spurious wakeups correctly and makes the code's intent clear. The predicate should check the actual shared state."]})}),e.jsx(o,{title:"Bounded Buffer",difficulty:"advanced",prompt:"Implement a bounded producer-consumer buffer with a maximum capacity of 3. The producer should block when the buffer is full and the consumer should block when it is empty.",hints:["Use two condition variables: one for 'not full' and one for 'not empty'","The producer waits on 'not full' and notifies 'not empty'","The consumer waits on 'not empty' and notifies 'not full'"],solution:e.jsx(t,{children:`#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <queue>

const int MAX_SIZE = 3;
std::queue<int> buffer;
std::mutex mtx;
std::condition_variable not_full, not_empty;

void producer() {
    for (int i = 1; i <= 8; ++i) {
        std::unique_lock<std::mutex> lock(mtx);
        not_full.wait(lock, []{ return buffer.size() < MAX_SIZE; });
        buffer.push(i);
        std::cout << "Produced: " << i
                  << " (size: " << buffer.size() << ")" << std::endl;
        not_empty.notify_one();
    }
}

void consumer() {
    for (int i = 0; i < 8; ++i) {
        std::unique_lock<std::mutex> lock(mtx);
        not_empty.wait(lock, []{ return !buffer.empty(); });
        int val = buffer.front();
        buffer.pop();
        std::cout << "Consumed: " << val << std::endl;
        not_full.notify_one();
    }
}

int main() {
    std::thread p(producer), c(consumer);
    p.join(); c.join();
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"std::condition_variable",url:"https://en.cppreference.com/w/cpp/thread/condition_variable",description:"Condition variable documentation"},{type:"cppreference",title:"std::condition_variable_any",url:"https://en.cppreference.com/w/cpp/thread/condition_variable_any",description:"Works with any lockable type, not just unique_lock"},{type:"textbook",title:"C++ Concurrency in Action",author:"Anthony Williams",description:"Chapter 4: Synchronizing concurrent operations"}]})]})}const S=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"}));function f(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["A deadlock occurs when two or more threads are blocked forever, each waiting for a resource the other holds. Deadlocks are among the most insidious concurrency bugs because they cause programs to hang silently. C++ provides tools like ",e.jsx("code",{children:"std::scoped_lock"})," and",e.jsx("code",{children:"std::lock"})," to prevent them."]}),e.jsx(s,{title:"What is a Deadlock?",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"deadlock"})," is a situation where two or more threads are each waiting to acquire a lock held by another thread in the cycle. None of the threads can proceed, resulting in the program freezing. Deadlocks require four conditions simultaneously: mutual exclusion, hold and wait, no preemption, and circular wait."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Classic Deadlock Example"}),e.jsx(c,{title:"Deadlock-Prone Code",children:e.jsxs("p",{children:["The following code can deadlock because Thread 1 locks ",e.jsx("code",{children:"mtx_a"})," then waits for ",e.jsx("code",{children:"mtx_b"}),", while Thread 2 locks ",e.jsx("code",{children:"mtx_b"})," then waits for ",e.jsx("code",{children:"mtx_a"}),"."]})}),e.jsx(t,{title:"deadlock_example.cpp",children:`#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx_a, mtx_b;

void thread1() {
    std::lock_guard<std::mutex> lock_a(mtx_a);  // Locks A
    std::this_thread::sleep_for(std::chrono::milliseconds(1));
    std::lock_guard<std::mutex> lock_b(mtx_b);  // Waits for B -> DEADLOCK
    std::cout << "Thread 1 done" << std::endl;
}

void thread2() {
    std::lock_guard<std::mutex> lock_b(mtx_b);  // Locks B
    std::this_thread::sleep_for(std::chrono::milliseconds(1));
    std::lock_guard<std::mutex> lock_a(mtx_a);  // Waits for A -> DEADLOCK
    std::cout << "Thread 2 done" << std::endl;
}

int main() {
    std::thread t1(thread1), t2(thread2);
    t1.join(); t2.join();  // May hang forever!
    return 0;
}`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Solution: std::scoped_lock"}),e.jsxs(i,{title:"std::scoped_lock (C++17)",children:[e.jsxs("p",{children:[e.jsx("code",{children:"std::scoped_lock"})," locks multiple mutexes simultaneously using a deadlock-free algorithm. It is the preferred way to lock more than one mutex at a time."]}),e.jsx(t,{children:`std::scoped_lock lock(mtx_a, mtx_b);  // Locks both atomically
// Both mutexes released when lock goes out of scope`})]}),e.jsx(t,{title:"scoped_lock_fix.cpp",children:`#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx_a, mtx_b;

void thread1() {
    std::scoped_lock lock(mtx_a, mtx_b);  // Deadlock-free!
    std::cout << "Thread 1 done" << std::endl;
}

void thread2() {
    std::scoped_lock lock(mtx_a, mtx_b);  // Same order doesn't matter
    std::cout << "Thread 2 done" << std::endl;
}

int main() {
    std::thread t1(thread1), t2(thread2);
    t1.join(); t2.join();
    std::cout << "No deadlock!" << std::endl;
    return 0;
}`}),e.jsx(a,{children:`Thread 1 done
Thread 2 done
No deadlock!`}),e.jsx(r,{type:"info",title:"std::lock (Pre-C++17)",children:e.jsxs("p",{children:["Before C++17, use ",e.jsx("code",{children:"std::lock(mtx_a, mtx_b)"})," to lock multiple mutexes without deadlock, then adopt ownership with ",e.jsx("code",{children:"std::lock_guard"})," using",e.jsx("code",{children:"std::adopt_lock"}),". ",e.jsx("code",{children:"std::scoped_lock"})," replaces this pattern."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Deadlock Avoidance Strategies"}),e.jsx(r,{type:"tip",title:"Lock Ordering",children:e.jsx("p",{children:"If you always acquire mutexes in the same global order (e.g., by memory address or by an assigned hierarchy number), circular wait is impossible. This is simple but requires discipline across the entire codebase."})}),e.jsx(r,{type:"important",title:"try_lock for Timeout",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::unique_lock"})," with ",e.jsx("code",{children:"std::try_to_lock"})," or",e.jsx("code",{children:"try_lock_for()"})," allows a thread to back off if a lock is unavailable, breaking the hold-and-wait condition. This is useful for building livelock-aware algorithms."]})}),e.jsx(t,{title:"try_lock example",children:`#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx_a, mtx_b;

void safe_work() {
    while (true) {
        std::unique_lock<std::mutex> la(mtx_a, std::defer_lock);
        std::unique_lock<std::mutex> lb(mtx_b, std::defer_lock);
        if (std::try_lock(la, lb) == -1) {  // -1 means success
            std::cout << "Both locks acquired!" << std::endl;
            break;
        }
        // Back off and retry
    }
}

int main() {
    std::thread t1(safe_work), t2(safe_work);
    t1.join(); t2.join();
    return 0;
}`}),e.jsx(n,{title:"Use std::scoped_lock for Multiple Mutexes",children:e.jsxs("p",{children:["Whenever you need to lock more than one mutex, use ",e.jsx("code",{children:"std::scoped_lock"}),". It uses a deadlock avoidance algorithm internally, is exception-safe, and makes intent clear. For single mutexes, ",e.jsx("code",{children:"std::lock_guard"})," or ",e.jsx("code",{children:"std::unique_lock"})," suffices."]})}),e.jsx(o,{title:"Fix the Deadlock",difficulty:"intermediate",prompt:"Given a transfer function between two BankAccount objects that deadlocks, fix it using std::scoped_lock so transfers in both directions work safely.",hints:["Replace the two separate lock_guard calls with one std::scoped_lock","std::scoped_lock can take multiple mutexes","Each BankAccount needs its own mutex member"],solution:e.jsx(t,{children:`#include <iostream>
#include <thread>
#include <mutex>

struct Account {
    std::mutex mtx;
    double balance;
    Account(double b) : balance(b) {}
};

void transfer(Account& from, Account& to, double amount) {
    std::scoped_lock lock(from.mtx, to.mtx);
    if (from.balance >= amount) {
        from.balance -= amount;
        to.balance += amount;
        std::cout << "Transferred " << amount << std::endl;
    }
}

int main() {
    Account a(1000), b(1000);
    // Transfers in opposite directions - no deadlock!
    std::thread t1(transfer, std::ref(a), std::ref(b), 100.0);
    std::thread t2(transfer, std::ref(b), std::ref(a), 50.0);
    t1.join(); t2.join();
    std::cout << "A: " << a.balance << " B: " << b.balance << std::endl;
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"std::scoped_lock",url:"https://en.cppreference.com/w/cpp/thread/scoped_lock",description:"Deadlock-free RAII multi-mutex lock (C++17)"},{type:"cppreference",title:"std::lock",url:"https://en.cppreference.com/w/cpp/thread/lock",description:"Lock multiple mutexes without deadlock"},{type:"textbook",title:"C++ Concurrency in Action",author:"Anthony Williams",description:"Chapter 3: Deadlock and how to avoid it"}]})]})}const N=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"}));function g(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"std::future"})," and ",e.jsx("code",{children:"std::promise"})," form a one-shot communication channel between threads. A promise sets a value (or exception) in one thread, and a future retrieves it in another. This decouples the producer of a result from its consumer."]}),e.jsx(s,{title:"Future and Promise",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"std::promise"})," is the writing end of a one-time channel: it sets a value or an exception. A ",e.jsx("strong",{children:"std::future"})," is the reading end: it waits for and retrieves the result. Together they provide a thread-safe mechanism for returning results from asynchronous operations. Defined in ",e.jsx("code",{children:"<future>"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic Usage"}),e.jsxs(i,{title:"Promise-Future Pattern",children:[e.jsxs("p",{children:["Create a ",e.jsx("code",{children:"std::promise"}),", obtain its associated ",e.jsx("code",{children:"std::future"}),", pass the promise to a worker thread, and call ",e.jsx("code",{children:"get()"})," on the future to retrieve the result. ",e.jsx("code",{children:"get()"})," blocks until the value is available."]}),e.jsx(t,{children:`std::promise<T> prom;
std::future<T> fut = prom.get_future();
// In worker thread: prom.set_value(result);
// In main thread:   T value = fut.get();`})]}),e.jsx(t,{title:"promise_future.cpp",children:`#include <iostream>
#include <thread>
#include <future>

void compute_square(std::promise<int> prom, int value) {
    std::this_thread::sleep_for(std::chrono::milliseconds(200));
    prom.set_value(value * value);
}

int main() {
    std::promise<int> prom;
    std::future<int> fut = prom.get_future();

    std::thread t(compute_square, std::move(prom), 7);

    std::cout << "Waiting for result..." << std::endl;
    int result = fut.get();  // Blocks until value is set
    std::cout << "7 squared = " << result << std::endl;

    t.join();
    return 0;
}`}),e.jsx(a,{children:`Waiting for result...
7 squared = 49`}),e.jsx(r,{type:"important",title:"Promises are Move-Only",children:e.jsxs("p",{children:["A ",e.jsx("code",{children:"std::promise"})," cannot be copied, only moved. When passing to a thread, use",e.jsx("code",{children:"std::move()"}),". The future associated with a promise can only be retrieved once via ",e.jsx("code",{children:"get_future()"}),", and ",e.jsx("code",{children:"get()"})," can only be called once on a future."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Exception Propagation"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["If the worker thread encounters an error, it can set an exception on the promise. When the consumer calls ",e.jsx("code",{children:"get()"}),", the exception is rethrown in the consumer's thread."]}),e.jsx(t,{title:"exception_propagation.cpp",children:`#include <iostream>
#include <thread>
#include <future>
#include <stdexcept>

void risky_work(std::promise<int> prom) {
    try {
        throw std::runtime_error("Something went wrong!");
        prom.set_value(42);
    } catch (...) {
        prom.set_exception(std::current_exception());
    }
}

int main() {
    std::promise<int> prom;
    std::future<int> fut = prom.get_future();

    std::thread t(risky_work, std::move(prom));

    try {
        int val = fut.get();  // Rethrows the exception
        std::cout << val << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Caught: " << e.what() << std::endl;
    }

    t.join();
    return 0;
}`}),e.jsx(a,{children:"Caught: Something went wrong!"}),e.jsx(c,{title:"Broken Promises",children:e.jsxs("p",{children:["If a ",e.jsx("code",{children:"std::promise"})," is destroyed without setting a value or exception, calling",e.jsx("code",{children:"get()"})," on the associated future throws ",e.jsx("code",{children:"std::future_error"})," with the error code ",e.jsx("code",{children:"broken_promise"}),". Always ensure the promise is fulfilled."]})}),e.jsx(r,{type:"tip",title:"wait() and wait_for()",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"fut.wait()"})," to block without retrieving the value, or",e.jsx("code",{children:"fut.wait_for(duration)"})," to block with a timeout. The return value indicates whether the result is ready, timed out, or deferred."]})}),e.jsx(n,{title:"Prefer std::async Over Raw Promises",children:e.jsxs("p",{children:["For simple fire-and-forget computations, ",e.jsx("code",{children:"std::async"})," is simpler than manually creating promise-future pairs. Reserve raw promises for cases where you need explicit control over when and where the value is set, such as callback-based APIs."]})}),e.jsx(o,{title:"Multi-Worker Aggregation",difficulty:"intermediate",prompt:"Create three threads that each compute the sum of a portion of an array. Use promise-future pairs to return partial sums to main, where they are combined into a total.",hints:["Create three std::promise<long long> objects and get their futures","Move each promise into its respective thread","Call get() on all three futures and sum the results"],solution:e.jsx(t,{children:`#include <iostream>
#include <thread>
#include <future>
#include <vector>
#include <numeric>

void partial_sum(std::promise<long long> prom,
                 const std::vector<int>& data, int start, int end) {
    long long sum = 0;
    for (int i = start; i < end; ++i) sum += data[i];
    prom.set_value(sum);
}

int main() {
    std::vector<int> data(900);
    std::iota(data.begin(), data.end(), 1);

    std::vector<std::promise<long long>> proms(3);
    std::vector<std::future<long long>> futs;
    for (auto& p : proms) futs.push_back(p.get_future());

    int chunk = 300;
    std::vector<std::thread> threads;
    for (int i = 0; i < 3; ++i)
        threads.emplace_back(partial_sum, std::move(proms[i]),
            std::cref(data), i * chunk, (i + 1) * chunk);

    long long total = 0;
    for (auto& f : futs) total += f.get();
    for (auto& t : threads) t.join();

    std::cout << "Total: " << total << std::endl;  // 405450
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"std::future",url:"https://en.cppreference.com/w/cpp/thread/future",description:"Future class for asynchronous result retrieval"},{type:"cppreference",title:"std::promise",url:"https://en.cppreference.com/w/cpp/thread/promise",description:"Promise class for setting asynchronous results"},{type:"textbook",title:"C++ Concurrency in Action",author:"Anthony Williams",description:"Chapter 4: Futures and promises"}]})]})}const P=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"}));function y(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"std::async"})," is the simplest way to run a function asynchronously and retrieve its result. It manages thread creation, promise-future wiring, and exception propagation automatically, letting you write concurrent code with minimal boilerplate."]}),e.jsx(s,{title:"What is std::async?",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::async"})," launches a callable asynchronously (potentially in a new thread) and returns a ",e.jsx("code",{children:"std::future"})," holding the eventual result. It abstracts away thread management and promise creation. Defined in ",e.jsx("code",{children:"<future>"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic Usage"}),e.jsxs(i,{title:"std::async Syntax",children:[e.jsxs("p",{children:["Call ",e.jsx("code",{children:"std::async"})," with an optional launch policy, a callable, and its arguments. The return type is ",e.jsx("code",{children:"std::future<ReturnType>"}),"."]}),e.jsx(t,{children:`auto future = std::async(launch_policy, callable, args...);
T result = future.get();  // Blocks until result is ready`})]}),e.jsx(t,{title:"async_basics.cpp",children:`#include <iostream>
#include <future>
#include <cmath>

double heavy_computation(double x) {
    // Simulate expensive work
    double result = 0;
    for (int i = 0; i < 1000000; ++i)
        result += std::sin(x + i) * std::cos(x - i);
    return result;
}

int main() {
    auto fut1 = std::async(std::launch::async, heavy_computation, 1.0);
    auto fut2 = std::async(std::launch::async, heavy_computation, 2.0);

    // Both computations run in parallel
    std::cout << "Computing..." << std::endl;

    double r1 = fut1.get();
    double r2 = fut2.get();
    std::cout << "Result 1: " << r1 << std::endl;
    std::cout << "Result 2: " << r2 << std::endl;
    return 0;
}`}),e.jsx(a,{children:`Computing...
Result 1: -0.210372
Result 2: 0.416147`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Launch Policies"}),e.jsx(r,{type:"info",title:"launch::async vs launch::deferred",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::launch::async"})," runs the function in a new thread immediately.",e.jsx("code",{children:"std::launch::deferred"})," delays execution until ",e.jsx("code",{children:"get()"})," or",e.jsx("code",{children:"wait()"})," is called, running it in the calling thread. The default policy is ",e.jsx("code",{children:"async | deferred"}),", letting the implementation choose."]})}),e.jsx(t,{title:"launch_policies.cpp",children:`#include <iostream>
#include <future>
#include <thread>

int work(const std::string& label) {
    std::cout << label << " running on thread "
              << std::this_thread::get_id() << std::endl;
    return 42;
}

int main() {
    std::cout << "Main thread: " << std::this_thread::get_id() << std::endl;

    // Guaranteed to run in a new thread
    auto f1 = std::async(std::launch::async, work, "Async");

    // Runs lazily in calling thread when get() is called
    auto f2 = std::async(std::launch::deferred, work, "Deferred");

    f1.get();
    f2.get();  // "Deferred" runs HERE, in main thread
    return 0;
}`}),e.jsx(a,{children:`Main thread: 140234567890
Async running on thread 140234567456
Deferred running on thread 140234567890`}),e.jsx(c,{title:"Async Future Destructor Blocks",children:e.jsxs("p",{children:["The future returned by ",e.jsx("code",{children:"std::async"})," blocks in its destructor until the asynchronous task completes. If you discard the future, the call becomes synchronous. Always store the returned future in a variable."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Exception Propagation"}),e.jsx(t,{title:"Exceptions through async",children:`#include <iostream>
#include <future>
#include <stdexcept>

int may_fail(bool should_fail) {
    if (should_fail)
        throw std::runtime_error("Task failed!");
    return 100;
}

int main() {
    auto fut = std::async(std::launch::async, may_fail, true);
    try {
        int val = fut.get();  // Exception rethrown here
    } catch (const std::exception& e) {
        std::cout << "Caught: " << e.what() << std::endl;
    }
    return 0;
}`}),e.jsx(a,{children:"Caught: Task failed!"}),e.jsx(r,{type:"tip",title:"Default Policy Pitfall",children:e.jsxs("p",{children:["With the default policy, you cannot predict which thread runs the task. If your code relies on thread-local state or assumes parallel execution, explicitly specify",e.jsx("code",{children:"std::launch::async"}),". Use ",e.jsx("code",{children:"std::launch::deferred"})," for lazy evaluation when parallelism is not needed."]})}),e.jsx(n,{title:"Use std::async for Simple Parallelism",children:e.jsxs("p",{children:["For straightforward parallel tasks that return a value, ",e.jsx("code",{children:"std::async"})," is the cleanest option. It handles thread lifecycle, exception forwarding, and result delivery. Use raw threads and promises only when you need finer control over thread behavior."]})}),e.jsx(o,{title:"Parallel File Processing",difficulty:"intermediate",prompt:"Simulate processing three files in parallel using std::async. Each task should return the 'file size' (use a random number). Print all results after all tasks complete.",hints:["Use std::async(std::launch::async, ...) for each file","Store futures in a vector","Call get() on each future to collect results"],solution:e.jsx(t,{children:`#include <iostream>
#include <future>
#include <vector>
#include <string>
#include <random>

int process_file(const std::string& filename) {
    std::mt19937 rng(std::hash<std::string>{}(filename));
    std::uniform_int_distribution<int> dist(100, 10000);
    int size = dist(rng);
    std::this_thread::sleep_for(std::chrono::milliseconds(100));
    std::cout << "Processed " << filename << std::endl;
    return size;
}

int main() {
    std::vector<std::string> files = {"data.csv", "log.txt", "config.json"};
    std::vector<std::future<int>> futures;

    for (const auto& f : files)
        futures.push_back(std::async(std::launch::async, process_file, f));

    for (size_t i = 0; i < files.size(); ++i)
        std::cout << files[i] << ": " << futures[i].get() << " bytes" << std::endl;

    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"std::async",url:"https://en.cppreference.com/w/cpp/thread/async",description:"Asynchronous task launcher"},{type:"cppreference",title:"std::launch",url:"https://en.cppreference.com/w/cpp/thread/launch",description:"Launch policy enumeration"},{type:"textbook",title:"Effective Modern C++",author:"Scott Meyers",description:"Item 36: Specify std::launch::async if asynchronicity is essential"}]})]})}const W=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"}));function j(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"std::packaged_task"})," wraps a callable and automatically connects it to a",e.jsx("code",{children:"std::future"}),". Unlike ",e.jsx("code",{children:"std::async"}),", it does not launch execution automatically, giving you control over ",e.jsx("em",{children:"when"})," and ",e.jsx("em",{children:"where"})," the task runs. This makes it a key building block for thread pools and task queues."]}),e.jsx(s,{title:"What is std::packaged_task?",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::packaged_task<R(Args...)>"})," is a callable wrapper that packages a function with a promise. When invoked, the return value (or exception) is stored in the associated future. It is move-only and defined in ",e.jsx("code",{children:"<future>"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic Usage"}),e.jsxs(i,{title:"packaged_task Pattern",children:[e.jsx("p",{children:"Create the task, extract the future, then invoke the task (either directly or in a thread). The result becomes available through the future."}),e.jsx(t,{children:`std::packaged_task<int(int, int)> task(callable);
std::future<int> fut = task.get_future();
task(arg1, arg2);            // Invoke directly, or
std::thread t(std::move(task), arg1, arg2);  // In a thread
int result = fut.get();`})]}),e.jsx(t,{title:"packaged_task_demo.cpp",children:`#include <iostream>
#include <future>
#include <thread>

int add(int a, int b) {
    std::this_thread::sleep_for(std::chrono::milliseconds(100));
    return a + b;
}

int main() {
    std::packaged_task<int(int, int)> task(add);
    std::future<int> result = task.get_future();

    std::thread t(std::move(task), 10, 20);

    std::cout << "Waiting for result..." << std::endl;
    std::cout << "10 + 20 = " << result.get() << std::endl;

    t.join();
    return 0;
}`}),e.jsx(a,{children:`Waiting for result...
10 + 20 = 30`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Task Queue Pattern"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The real power of ",e.jsx("code",{children:"packaged_task"})," is the ability to enqueue tasks for later execution. This is the foundation of thread pool designs: tasks are submitted to a queue, and worker threads pull and execute them."]}),e.jsx(t,{title:"task_queue.cpp",children:`#include <iostream>
#include <future>
#include <thread>
#include <queue>
#include <mutex>
#include <functional>

std::queue<std::packaged_task<int()>> task_queue;
std::mutex queue_mutex;

void worker() {
    while (true) {
        std::packaged_task<int()> task;
        {
            std::lock_guard<std::mutex> lock(queue_mutex);
            if (task_queue.empty()) break;
            task = std::move(task_queue.front());
            task_queue.pop();
        }
        task();  // Execute the task
    }
}

int main() {
    std::vector<std::future<int>> futures;

    // Enqueue tasks
    for (int i = 1; i <= 5; ++i) {
        std::packaged_task<int()> task([i]() {
            return i * i;
        });
        futures.push_back(task.get_future());
        std::lock_guard<std::mutex> lock(queue_mutex);
        task_queue.push(std::move(task));
    }

    // Process all tasks on a worker thread
    std::thread t(worker);
    t.join();

    for (int i = 0; i < 5; ++i)
        std::cout << (i + 1) << "^2 = " << futures[i].get() << std::endl;

    return 0;
}`}),e.jsx(a,{children:`1^2 = 1
2^2 = 4
3^2 = 9
4^2 = 16
5^2 = 25`}),e.jsx(r,{type:"info",title:"packaged_task vs async vs promise",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::async"})," creates and runs a task immediately. ",e.jsx("code",{children:"std::promise"}),"gives manual control over value delivery. ",e.jsx("code",{children:"std::packaged_task"})," sits in between: it wraps a callable with a future but lets you decide when to execute it. Use it when you need to decouple task creation from execution."]})}),e.jsx(c,{title:"packaged_task is Move-Only",children:e.jsxs("p",{children:["A ",e.jsx("code",{children:"std::packaged_task"})," cannot be copied. Use ",e.jsx("code",{children:"std::move()"})," when passing it to threads, queues, or containers. Calling a task more than once without",e.jsx("code",{children:"reset()"})," throws ",e.jsx("code",{children:"std::future_error"}),"."]})}),e.jsx(r,{type:"tip",title:"reset() for Reuse",children:e.jsxs("p",{children:["Calling ",e.jsx("code",{children:"task.reset()"})," creates a new shared state, allowing the task to be invoked again with a new future. The old future becomes invalid. This is useful for recurring computations in task pool scenarios."]})}),e.jsx(n,{title:"Use packaged_task for Task Queues",children:e.jsxs("p",{children:["When building thread pools or task schedulers, prefer ",e.jsx("code",{children:"std::packaged_task"})," over raw promise-thread combinations. It cleanly bundles the callable and its promise, making queue management straightforward and type-safe."]})}),e.jsx(o,{title:"Simple Thread Pool",difficulty:"advanced",prompt:"Implement a simple thread pool with 2 worker threads that process packaged_tasks from a shared queue. Submit 6 tasks that each return their input doubled. Collect and print all results.",hints:["Use a std::queue<std::packaged_task<int()>> protected by a mutex","Use a condition_variable to notify workers of new tasks","Add a 'done' flag to signal workers to exit when all tasks are submitted"],solution:e.jsx(t,{children:`#include <iostream>
#include <future>
#include <thread>
#include <queue>
#include <mutex>
#include <condition_variable>
#include <vector>

std::queue<std::packaged_task<int()>> tasks;
std::mutex mtx;
std::condition_variable cv;
bool done = false;

void pool_worker() {
    while (true) {
        std::packaged_task<int()> task;
        {
            std::unique_lock<std::mutex> lock(mtx);
            cv.wait(lock, []{ return !tasks.empty() || done; });
            if (tasks.empty() && done) return;
            task = std::move(tasks.front());
            tasks.pop();
        }
        task();
    }
}

int main() {
    std::thread w1(pool_worker), w2(pool_worker);
    std::vector<std::future<int>> results;

    for (int i = 1; i <= 6; ++i) {
        std::packaged_task<int()> t([i]{ return i * 2; });
        results.push_back(t.get_future());
        {
            std::lock_guard<std::mutex> lock(mtx);
            tasks.push(std::move(t));
        }
        cv.notify_one();
    }
    { std::lock_guard<std::mutex> lock(mtx); done = true; }
    cv.notify_all();
    w1.join(); w2.join();

    for (auto& f : results)
        std::cout << f.get() << " ";
    std::cout << std::endl;
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"std::packaged_task",url:"https://en.cppreference.com/w/cpp/thread/packaged_task",description:"Packaged task wrapper documentation"},{type:"cppreference",title:"std::future",url:"https://en.cppreference.com/w/cpp/thread/future",description:"Future for retrieving task results"},{type:"textbook",title:"C++ Concurrency in Action",author:"Anthony Williams",description:"Chapter 9: Advanced thread management and thread pools"}]})]})}const I=Object.freeze(Object.defineProperty({__proto__:null,default:j},Symbol.toStringTag,{value:"Module"}));function k(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"std::atomic"})," provides lock-free (or low-lock) operations on individual variables. Atomic operations are indivisible: no other thread can observe a half-completed read or write. This enables building concurrent algorithms without mutexes for simple shared state."]}),e.jsx(s,{title:"What is std::atomic?",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::atomic<T>"})," is a template that wraps a type ",e.jsx("code",{children:"T"})," and guarantees that all operations on it are atomic (indivisible). It prevents data races without explicit locks. Defined in ",e.jsx("code",{children:"<atomic>"}),". Common specializations include ",e.jsx("code",{children:"std::atomic<int>"}),", ",e.jsx("code",{children:"std::atomic<bool>"}),", and pointer types."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic Operations"}),e.jsxs(i,{title:"load, store, exchange",children:[e.jsxs("p",{children:[e.jsx("code",{children:"load()"})," reads the value atomically. ",e.jsx("code",{children:"store()"})," writes atomically.",e.jsx("code",{children:"exchange()"})," atomically replaces the value and returns the old one."]}),e.jsx(t,{children:`std::atomic<int> x(0);
x.store(42);           // Atomic write
int val = x.load();    // Atomic read
int old = x.exchange(100);  // Swap, returns 42`})]}),e.jsx(t,{title:"atomic_counter.cpp",children:`#include <iostream>
#include <atomic>
#include <thread>
#include <vector>

std::atomic<int> counter(0);

void increment(int times) {
    for (int i = 0; i < times; ++i) {
        counter.fetch_add(1, std::memory_order_relaxed);
    }
}

int main() {
    std::vector<std::thread> threads;
    for (int i = 0; i < 8; ++i)
        threads.emplace_back(increment, 10000);
    for (auto& t : threads) t.join();

    std::cout << "Counter: " << counter.load() << std::endl;
    return 0;
}`}),e.jsx(a,{children:"Counter: 80000"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Compare and Exchange"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The ",e.jsx("code",{children:"compare_exchange_weak"})," and ",e.jsx("code",{children:"compare_exchange_strong"})," operations are the foundation of lock-free algorithms. They atomically compare the current value with an expected value and, if equal, replace it with a desired value."]}),e.jsx(t,{title:"compare_exchange_demo.cpp",children:`#include <iostream>
#include <atomic>
#include <thread>
#include <vector>

std::atomic<int> maximum(0);

void update_max(int value) {
    int current = maximum.load();
    while (current < value &&
           !maximum.compare_exchange_weak(current, value)) {
        // current is updated to the actual value on failure
    }
}

int main() {
    std::vector<std::thread> threads;
    int values[] = {3, 7, 2, 9, 5, 1, 8, 4};

    for (int v : values)
        threads.emplace_back(update_max, v);
    for (auto& t : threads) t.join();

    std::cout << "Maximum: " << maximum.load() << std::endl;
    return 0;
}`}),e.jsx(a,{children:"Maximum: 9"}),e.jsx(r,{type:"info",title:"weak vs strong",children:e.jsxs("p",{children:[e.jsx("code",{children:"compare_exchange_weak"})," may fail spuriously (return false even when the value matches), but is faster on some architectures. Use it in loops.",e.jsx("code",{children:"compare_exchange_strong"})," never fails spuriously and is appropriate for single-attempt operations."]})}),e.jsx(r,{type:"tip",title:"Arithmetic Operations",children:e.jsxs("p",{children:["For integer and pointer atomics, use ",e.jsx("code",{children:"fetch_add()"}),", ",e.jsx("code",{children:"fetch_sub()"}),",",e.jsx("code",{children:"fetch_and()"}),", ",e.jsx("code",{children:"fetch_or()"}),", and ",e.jsx("code",{children:"fetch_xor()"}),". These are more efficient than compare-exchange loops for simple arithmetic. Operators like ",e.jsx("code",{children:"++"}),", ",e.jsx("code",{children:"--"}),", ",e.jsx("code",{children:"+="})," are also overloaded."]})}),e.jsx(c,{title:"Atomic Does Not Mean Thread-Safe Compound Operations",children:e.jsxs("p",{children:["Each individual atomic operation is thread-safe, but a sequence of operations is not. For example, ",e.jsx("code",{children:"if (x.load() == 0) x.store(1);"})," is a race condition because another thread can modify ",e.jsx("code",{children:"x"})," between the load and the store. Use ",e.jsx("code",{children:"compare_exchange"})," for check-then-act patterns."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::atomic_flag"}),e.jsx(r,{type:"info",title:"atomic_flag: The Simplest Atomic",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::atomic_flag"})," is the only atomic type guaranteed to be lock-free on all platforms. It supports only ",e.jsx("code",{children:"test_and_set()"})," and ",e.jsx("code",{children:"clear()"}),", making it ideal for building simple spinlocks."]})}),e.jsx(t,{title:"Spinlock with atomic_flag",children:`#include <iostream>
#include <atomic>
#include <thread>

class SpinLock {
    std::atomic_flag flag = ATOMIC_FLAG_INIT;
public:
    void lock() {
        while (flag.test_and_set(std::memory_order_acquire)) {
            // spin
        }
    }
    void unlock() {
        flag.clear(std::memory_order_release);
    }
};

SpinLock spin;
int shared_data = 0;

int main() {
    auto work = []() {
        for (int i = 0; i < 10000; ++i) {
            spin.lock();
            ++shared_data;
            spin.unlock();
        }
    };
    std::thread t1(work), t2(work);
    t1.join(); t2.join();
    std::cout << "Result: " << shared_data << std::endl;
    return 0;
}`}),e.jsx(a,{children:"Result: 20000"}),e.jsx(n,{title:"Prefer Mutexes for Complex Critical Sections",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"std::atomic"})," for simple counters, flags, and single-variable updates. For complex invariants involving multiple variables, use mutexes. Atomic operations are harder to reason about correctly and are best reserved for performance-critical low-level code."]})}),e.jsx(o,{title:"Lock-Free Stack Push",difficulty:"advanced",prompt:"Implement a thread-safe atomic maximum tracker using compare_exchange_weak. Launch 10 threads, each submitting a random value. Verify the final maximum is correct.",hints:["Load the current maximum, compare with your value","Use a while loop with compare_exchange_weak","Track the expected maximum separately for verification"],solution:e.jsx(t,{children:`#include <iostream>
#include <atomic>
#include <thread>
#include <vector>
#include <algorithm>

std::atomic<int> global_max(0);

void submit(int value) {
    int current = global_max.load();
    while (current < value &&
           !global_max.compare_exchange_weak(current, value)) {}
}

int main() {
    std::vector<int> values = {15, 42, 8, 73, 31, 99, 56, 2, 67, 44};
    std::vector<std::thread> threads;

    for (int v : values)
        threads.emplace_back(submit, v);
    for (auto& t : threads) t.join();

    int expected = *std::max_element(values.begin(), values.end());
    std::cout << "Atomic max: " << global_max.load() << std::endl;
    std::cout << "Expected:   " << expected << std::endl;
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"std::atomic",url:"https://en.cppreference.com/w/cpp/atomic/atomic",description:"Atomic types and operations"},{type:"cppreference",title:"std::atomic_flag",url:"https://en.cppreference.com/w/cpp/atomic/atomic_flag",description:"Lock-free boolean atomic type"},{type:"textbook",title:"C++ Concurrency in Action",author:"Anthony Williams",description:"Chapter 5: The C++ memory model and operations on atomic types"}]})]})}const z=Object.freeze(Object.defineProperty({__proto__:null,default:k},Symbol.toStringTag,{value:"Module"}));function _(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Modern CPUs and compilers reorder memory operations for performance. Memory orderings in C++ control how atomic operations synchronize memory between threads. Understanding them is essential for writing correct and efficient lock-free code."}),e.jsx(s,{title:"What are Memory Orderings?",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"memory ordering"})," specifies constraints on how memory operations around an atomic access can be reordered. C++ defines six orderings in",e.jsx("code",{children:"<atomic>"}),": ",e.jsx("code",{children:"memory_order_relaxed"}),",",e.jsx("code",{children:"memory_order_consume"}),", ",e.jsx("code",{children:"memory_order_acquire"}),",",e.jsx("code",{children:"memory_order_release"}),", ",e.jsx("code",{children:"memory_order_acq_rel"}),", and",e.jsx("code",{children:"memory_order_seq_cst"})," (the default)."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Sequential Consistency (Default)"}),e.jsxs(i,{title:"memory_order_seq_cst",children:[e.jsxs("p",{children:["The default ordering. All threads observe all ",e.jsx("code",{children:"seq_cst"})," operations in the same global total order. This is the strongest and easiest to reason about, but may be the slowest on weakly-ordered architectures (like ARM)."]}),e.jsx(t,{children:`std::atomic<int> x(0);
x.store(1);                                    // seq_cst by default
x.store(1, std::memory_order_seq_cst);         // Explicit`})]}),e.jsx(t,{title:"seq_cst_example.cpp",children:`#include <iostream>
#include <atomic>
#include <thread>

std::atomic<bool> x(false), y(false);
std::atomic<int> z(0);

void write_x() { x.store(true, std::memory_order_seq_cst); }
void write_y() { y.store(true, std::memory_order_seq_cst); }

void read_x_then_y() {
    while (!x.load(std::memory_order_seq_cst));
    if (y.load(std::memory_order_seq_cst)) ++z;
}
void read_y_then_x() {
    while (!y.load(std::memory_order_seq_cst));
    if (x.load(std::memory_order_seq_cst)) ++z;
}

int main() {
    std::thread a(write_x), b(write_y);
    std::thread c(read_x_then_y), d(read_y_then_x);
    a.join(); b.join(); c.join(); d.join();
    // z is NEVER 0 with seq_cst (at least one reader sees both writes)
    std::cout << "z = " << z.load() << std::endl;
    return 0;
}`}),e.jsx(a,{children:"z = 2"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Acquire-Release Semantics"}),e.jsx(r,{type:"info",title:"Acquire and Release",children:e.jsxs("p",{children:[e.jsx("code",{children:"memory_order_release"})," on a store ensures all prior writes are visible to a thread that performs an ",e.jsx("code",{children:"memory_order_acquire"})," load on the same variable. This creates a ",e.jsx("strong",{children:"happens-before"})," relationship: everything before the release store is guaranteed visible after the acquire load."]})}),e.jsx(t,{title:"acquire_release.cpp",children:`#include <iostream>
#include <atomic>
#include <thread>
#include <cassert>

std::atomic<bool> ready(false);
int data = 0;

void producer() {
    data = 42;                                         // Non-atomic write
    ready.store(true, std::memory_order_release);      // Release
}

void consumer() {
    while (!ready.load(std::memory_order_acquire));    // Acquire
    // Guaranteed to see data == 42
    std::cout << "data = " << data << std::endl;
}

int main() {
    std::thread t1(producer), t2(consumer);
    t1.join(); t2.join();
    return 0;
}`}),e.jsx(a,{children:"data = 42"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Relaxed Ordering"}),e.jsx(r,{type:"important",title:"memory_order_relaxed",children:e.jsxs("p",{children:[e.jsx("code",{children:"memory_order_relaxed"})," guarantees only atomicity, not ordering. Other memory operations can be freely reordered around it. Use it only when you need a simple counter or flag and do not need to synchronize any other data."]})}),e.jsx(t,{title:"Relaxed counter",children:`#include <iostream>
#include <atomic>
#include <thread>
#include <vector>

std::atomic<int> counter(0);

void count(int n) {
    for (int i = 0; i < n; ++i)
        counter.fetch_add(1, std::memory_order_relaxed);
}

int main() {
    std::vector<std::thread> threads;
    for (int i = 0; i < 4; ++i)
        threads.emplace_back(count, 25000);
    for (auto& t : threads) t.join();
    std::cout << "Counter: " << counter.load() << std::endl;
    return 0;
}`}),e.jsx(a,{children:"Counter: 100000"}),e.jsx(c,{title:"Relaxed Does Not Synchronize",children:e.jsxs("p",{children:["With ",e.jsx("code",{children:"memory_order_relaxed"}),", a thread that reads an updated atomic value is NOT guaranteed to see updates to other (non-atomic) variables made by the writing thread. Never use relaxed ordering when you need to communicate data alongside a flag or pointer."]})}),e.jsx(r,{type:"tip",title:"acq_rel for Read-Modify-Write",children:e.jsxs("p",{children:[e.jsx("code",{children:"memory_order_acq_rel"})," combines acquire and release semantics in a single read-modify-write operation (like ",e.jsx("code",{children:"fetch_add"})," or ",e.jsx("code",{children:"compare_exchange"}),"). The read part is an acquire, and the write part is a release."]})}),e.jsx(n,{title:"Start with seq_cst, Optimize Later",children:e.jsxs("p",{children:["Use the default ",e.jsx("code",{children:"memory_order_seq_cst"})," until profiling shows it is a bottleneck. Weaker orderings provide performance gains on weakly-ordered architectures but are much harder to reason about correctly. Incorrect memory orderings cause extremely subtle bugs that are nearly impossible to reproduce."]})}),e.jsx(o,{title:"Acquire-Release Flag",difficulty:"advanced",prompt:"Write a producer-consumer pair using acquire-release ordering. The producer fills an array of 10 elements, then sets a ready flag with release. The consumer spins on the flag with acquire, then reads and prints the array.",hints:["Use a regular array (not atomic) for the data","Use std::atomic<bool> with release store and acquire load","The acquire-release pair guarantees the consumer sees all array writes"],solution:e.jsx(t,{children:`#include <iostream>
#include <atomic>
#include <thread>

std::atomic<bool> ready(false);
int arr[10];

void producer() {
    for (int i = 0; i < 10; ++i)
        arr[i] = i * i;
    ready.store(true, std::memory_order_release);
}

void consumer() {
    while (!ready.load(std::memory_order_acquire));
    for (int i = 0; i < 10; ++i)
        std::cout << arr[i] << " ";
    std::cout << std::endl;
}

int main() {
    std::thread p(producer), c(consumer);
    p.join(); c.join();
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"std::memory_order",url:"https://en.cppreference.com/w/cpp/atomic/memory_order",description:"Memory ordering semantics for atomic operations"},{type:"cppreference",title:"Atomic operations library",url:"https://en.cppreference.com/w/cpp/atomic",description:"Overview of all atomic facilities"},{type:"textbook",title:"C++ Concurrency in Action",author:"Anthony Williams",description:"Chapter 5: Memory ordering for atomic operations"}]})]})}const B=Object.freeze(Object.defineProperty({__proto__:null,default:_},Symbol.toStringTag,{value:"Module"}));function b(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Lock-free data structures guarantee that at least one thread makes progress at any point, even if other threads are suspended. They use atomic compare-and-swap (CAS) operations instead of mutexes, offering better worst-case latency and immunity to priority inversion and deadlocks."}),e.jsx(s,{title:"What is Lock-Free?",children:e.jsxs("p",{children:["An algorithm is ",e.jsx("strong",{children:"lock-free"}),' if, when multiple threads operate concurrently, at least one thread is guaranteed to complete its operation in a finite number of steps. This is stronger than merely being "without locks" -- a lock-free algorithm must guarantee system-wide progress. ',e.jsx("strong",{children:"Wait-free"})," is even stronger: every thread completes in bounded steps."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Checking Lock-Free Support"}),e.jsxs(i,{title:"is_lock_free()",children:[e.jsxs("p",{children:["Use ",e.jsx("code",{children:"is_lock_free()"})," to check whether an atomic type uses hardware atomics (true) or an internal mutex (false). Types larger than the platform's word size may not be lock-free."]}),e.jsx(t,{children:`std::atomic<int> a;
std::cout << std::boolalpha << a.is_lock_free();  // true on most platforms

struct Big { int data[100]; };
std::atomic<Big> b;
std::cout << b.is_lock_free();  // likely false`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Lock-Free Stack"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["A classic lock-free data structure is the Treiber stack. Push and pop use",e.jsx("code",{children:"compare_exchange_weak"})," on the head pointer. If another thread modifies the head between our read and CAS, the CAS fails and we retry."]}),e.jsx(t,{title:"lock_free_stack.cpp",children:`#include <iostream>
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
}`}),e.jsx(a,{children:"Popped 400 elements"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"The ABA Problem"}),e.jsx(c,{title:"ABA Problem",children:e.jsx("p",{children:"The ABA problem occurs when a CAS succeeds incorrectly: thread 1 reads value A, gets preempted, thread 2 changes A to B then back to A, thread 1 resumes and the CAS succeeds even though the data structure was modified. In the stack above, deleting a popped node while another thread still holds a pointer to it causes undefined behavior."})}),e.jsx(r,{type:"info",title:"ABA Solutions",children:e.jsxs("p",{children:["Common solutions include: (1) ",e.jsx("strong",{children:"tagged pointers"})," that include a monotonically increasing version counter alongside the pointer, (2) ",e.jsx("strong",{children:"hazard pointers"})," where threads publish which nodes they are accessing so others defer deletion, and (3) ",e.jsx("strong",{children:"epoch-based reclamation"})," where memory is freed only when no thread could still reference it."]})}),e.jsx(t,{title:"Tagged pointer sketch",children:`#include <atomic>
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
// head.compare_exchange_weak(expected, desired);`}),e.jsx(r,{type:"important",title:"Hazard Pointers",children:e.jsxs("p",{children:["Hazard pointers are a safe memory reclamation technique for lock-free structures. Before accessing a node, a thread publishes the pointer in a per-thread hazard list. When a node is removed, it is placed in a retired list and only deleted when no hazard pointer references it. C++26 proposes ",e.jsx("code",{children:"std::hazard_pointer"})," in the standard."]})}),e.jsx(r,{type:"tip",title:"When to Go Lock-Free",children:e.jsx("p",{children:"Lock-free programming is significantly harder to get right than mutex-based code. It is justified in real-time systems (where blocking is unacceptable), very high contention scenarios, or signal/interrupt handlers (where mutexes are unsafe). For most applications, a well-designed mutex-based solution is simpler and fast enough."})}),e.jsx(n,{title:"Use Proven Libraries for Lock-Free Structures",children:e.jsx("p",{children:"Writing correct lock-free data structures is extremely difficult. Memory reclamation, ABA prevention, and memory ordering must all be handled correctly. Use well-tested libraries (Boost.Lockfree, libcds, Folly) rather than rolling your own, unless you have deep expertise and rigorous testing (including tools like ThreadSanitizer)."})}),e.jsx(o,{title:"Lock-Free Counter Comparison",difficulty:"intermediate",prompt:"Benchmark a simple counter using three approaches: (1) std::mutex with lock_guard, (2) std::atomic with seq_cst, (3) std::atomic with relaxed ordering. Run 4 threads incrementing 1,000,000 times each. Print the elapsed time for each approach.",hints:["Use std::chrono::high_resolution_clock to measure time","Use fetch_add for atomic increments","All three should produce the correct result of 4,000,000"],solution:e.jsx(t,{children:`#include <iostream>
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
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"std::atomic::is_lock_free",url:"https://en.cppreference.com/w/cpp/atomic/atomic/is_lock_free",description:"Check if atomic operations are lock-free"},{type:"cppreference",title:"Compare and exchange",url:"https://en.cppreference.com/w/cpp/atomic/atomic/compare_exchange",description:"CAS operations for lock-free algorithms"},{type:"textbook",title:"C++ Concurrency in Action",author:"Anthony Williams",description:"Chapter 7: Designing lock-free concurrent data structures"}]})]})}const M=Object.freeze(Object.defineProperty({__proto__:null,default:b},Symbol.toStringTag,{value:"Module"}));export{A as a,C as b,q as c,S as d,N as e,P as f,W as g,I as h,z as i,B as j,M as k,T as s};
