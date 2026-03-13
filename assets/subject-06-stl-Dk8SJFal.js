import{j as e}from"./vendor-BlNF5je7.js";import{D as s,C as t,O as r,S as i,N as n,B as o,W as c,E as a,R as d,a as l}from"./subject-01-fundamentals-DsAKErwb.js";function u(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"std::vector"})," is the most commonly used container in C++. It provides a dynamic array that manages its own memory, grows automatically when elements are added, and provides fast random access to elements. If you need a collection of elements and are unsure which container to use, ",e.jsx("code",{children:"std::vector"})," is almost always the right default choice."]}),e.jsx(s,{title:"std::vector",children:e.jsxs("p",{children:["A sequence container that encapsulates a dynamic-size array. Elements are stored contiguously in memory, which means pointer arithmetic and cache-friendly traversal work just as they do with raw arrays. Defined in the ",e.jsx("code",{children:"<vector>"})," header."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Creating and Using Vectors"}),e.jsx(t,{title:"vector_basics.cpp",children:`#include <iostream>
#include <vector>

int main() {
    std::vector<int> nums = {10, 20, 30, 40, 50};

    // Element access
    std::cout << "First: " << nums[0] << std::endl;
    std::cout << "At(2): " << nums.at(2) << std::endl;
    std::cout << "Front: " << nums.front() << std::endl;
    std::cout << "Back:  " << nums.back() << std::endl;

    // Size information
    std::cout << "Size:     " << nums.size() << std::endl;
    std::cout << "Capacity: " << nums.capacity() << std::endl;

    // Iteration
    for (const auto& n : nums) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    return 0;
}`}),e.jsx(r,{children:`First: 10
At(2): 30
Front: 10
Back:  50
Size:     5
Capacity: 5
10 20 30 40 50`}),e.jsx(i,{title:"Element Access",children:e.jsxs("p",{children:[e.jsx("code",{children:"operator[]"})," provides unchecked access (undefined behavior on out-of-bounds).",e.jsx("code",{children:"at()"})," performs bounds checking and throws ",e.jsx("code",{children:"std::out_of_range"})," if the index is invalid. Use ",e.jsx("code",{children:"at()"})," when safety matters more than speed."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Adding Elements: push_back vs emplace_back"}),e.jsx(t,{title:"push_vs_emplace.cpp",children:`#include <iostream>
#include <vector>
#include <string>

struct Point {
    double x, y;
    Point(double x, double y) : x(x), y(y) {
        std::cout << "Constructed (" << x << ", " << y << ")" << std::endl;
    }
};

int main() {
    std::vector<Point> points;
    points.reserve(4);

    // push_back: constructs then copies/moves into vector
    points.push_back(Point(1.0, 2.0));

    // emplace_back: constructs in-place inside the vector
    points.emplace_back(3.0, 4.0);

    std::cout << "Size: " << points.size() << std::endl;
    return 0;
}`}),e.jsx(r,{children:`Constructed (1, 2)
Constructed (3, 4)
Size: 2`}),e.jsx(n,{type:"tip",title:"Size vs Capacity",children:e.jsxs("p",{children:[e.jsx("code",{children:"size()"})," returns the number of elements currently stored. ",e.jsx("code",{children:"capacity()"})," returns the total number of elements the vector can hold before it needs to reallocate. When size exceeds capacity, the vector allocates a new, larger buffer (typically 1.5x or 2x) and moves all elements."]})}),e.jsx(o,{title:"Use reserve() when you know the count",children:e.jsxs("p",{children:["If you know how many elements you will insert, call ",e.jsx("code",{children:"reserve(n)"})," before adding them. This avoids repeated reallocations and copies, and can dramatically improve performance for large collections."]})}),e.jsx(c,{title:"Iterator Invalidation",children:e.jsxs("p",{children:["Any operation that changes a vector's size (such as ",e.jsx("code",{children:"push_back"}),", ",e.jsx("code",{children:"insert"}),", or ",e.jsx("code",{children:"erase"}),") may invalidate all iterators, pointers, and references to its elements if a reallocation occurs. Never hold iterators across insertion or removal operations unless you are certain the capacity is sufficient."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Iterators and Erasure"}),e.jsx(t,{title:"vector_iterators.cpp",children:`#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> v = {5, 3, 8, 1, 9, 2, 7};

    // Sort using iterators
    std::sort(v.begin(), v.end());

    // Erase elements greater than 7
    v.erase(
        std::remove_if(v.begin(), v.end(), [](int x) { return x > 7; }),
        v.end()
    );

    for (auto it = v.begin(); it != v.end(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    return 0;
}`}),e.jsx(r,{children:"1 2 3 5 7"}),e.jsx(a,{title:"Vector Statistics",difficulty:"beginner",prompt:"Create a vector of doubles, populate it with at least 5 values, then compute and print the minimum, maximum, and average of the elements.",hints:["Use std::min_element and std::max_element from <algorithm>","Use std::accumulate from <numeric> to compute the sum"],solution:e.jsx(t,{children:`#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
    std::vector<double> vals = {3.5, 1.2, 7.8, 4.6, 9.1};
    double minVal = *std::min_element(vals.begin(), vals.end());
    double maxVal = *std::max_element(vals.begin(), vals.end());
    double avg = std::accumulate(vals.begin(), vals.end(), 0.0) / vals.size();
    std::cout << "Min: " << minVal << "  Max: " << maxVal
              << "  Avg: " << avg << std::endl;
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"std::vector",url:"https://en.cppreference.com/w/cpp/container/vector",description:"Complete vector class reference"},{type:"cppreference",title:"std::vector::emplace_back",url:"https://en.cppreference.com/w/cpp/container/vector/emplace_back",description:"In-place element construction"},{type:"textbook",title:"The C++ Programming Language",author:"Bjarne Stroustrup",description:"Chapter 31: STL Containers"}]})]})}const k=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"}));function h(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"std::array"})," is a fixed-size container that wraps a C-style array while providing the benefits of the standard library interface: bounds-checked access, iterators, and compatibility with STL algorithms. Its size is a compile-time constant, so it carries no heap allocation overhead."]}),e.jsx(s,{title:"std::array",children:e.jsxs("p",{children:["A container that encapsulates a fixed-size array whose size is known at compile time. Unlike ",e.jsx("code",{children:"std::vector"}),", it cannot grow or shrink. It is defined in the",e.jsx("code",{children:" <array>"})," header as ",e.jsx("code",{children:"std::array<T, N>"}),", where",e.jsx("code",{children:" T"})," is the element type and ",e.jsx("code",{children:"N"})," is the number of elements."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic Usage"}),e.jsx(t,{title:"array_basics.cpp",children:`#include <iostream>
#include <array>
#include <algorithm>

int main() {
    std::array<int, 5> nums = {10, 40, 20, 50, 30};

    std::cout << "Size: " << nums.size() << std::endl;
    std::cout << "First: " << nums.front() << std::endl;
    std::cout << "Last:  " << nums.back() << std::endl;

    // Bounds-checked access
    std::cout << "At(2): " << nums.at(2) << std::endl;

    // Works with STL algorithms
    std::sort(nums.begin(), nums.end());

    for (const auto& n : nums) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    return 0;
}`}),e.jsx(r,{children:`Size: 5
First: 10
Last:  30
At(2): 20
10 20 30 40 50`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::get and Structured Bindings"}),e.jsx(t,{title:"array_structured.cpp",children:`#include <iostream>
#include <array>

int main() {
    std::array<double, 3> rgb = {0.8, 0.2, 0.5};

    // Compile-time access with std::get
    std::cout << "Red:   " << std::get<0>(rgb) << std::endl;
    std::cout << "Green: " << std::get<1>(rgb) << std::endl;
    std::cout << "Blue:  " << std::get<2>(rgb) << std::endl;

    // C++17 structured bindings
    auto [r, g, b] = rgb;
    std::cout << "RGB = (" << r << ", " << g << ", " << b << ")" << std::endl;

    // Fill all elements
    rgb.fill(0.0);
    std::cout << "After fill: " << rgb[0] << ", " << rgb[1] << ", " << rgb[2] << std::endl;
    return 0;
}`}),e.jsx(r,{children:`Red:   0.8
Green: 0.2
Blue:  0.5
RGB = (0.8, 0.2, 0.5)
After fill: 0, 0, 0`}),e.jsx(i,{title:"std::get<N>",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::get<N>(arr)"})," accesses the element at index ",e.jsx("code",{children:"N"})," at compile time. The index must be a constant expression. This is the same function template used for",e.jsx("code",{children:"std::tuple"})," and ",e.jsx("code",{children:"std::pair"}),"."]})}),e.jsx(n,{type:"info",title:"std::array vs C-style Arrays",children:e.jsxs("p",{children:["Unlike C-style arrays, ",e.jsx("code",{children:"std::array"})," does not decay to a pointer when passed to a function. It knows its own size, supports copy/move semantics, and works with range-based for loops and all STL algorithms. There is zero runtime overhead compared to a raw array."]})}),e.jsx(c,{title:"No Implicit Size Deduction Before C++17",children:e.jsxs("p",{children:["Before C++17, you must specify both template parameters: ",e.jsx("code",{children:"std::array<int, 3>"}),". In C++17 and later, class template argument deduction (CTAD) allows writing",e.jsxs("code",{children:[" std::array nums = ","{","1, 2, 3","}"]})," and the compiler will deduce the type and size."]})}),e.jsx(o,{title:"Prefer std::array over C-style arrays",children:e.jsxs("p",{children:["Always prefer ",e.jsx("code",{children:"std::array"})," to C-style arrays for fixed-size collections. It provides the same performance with added safety, a clear interface, and interoperability with the rest of the standard library."]})}),e.jsx(a,{title:"Matrix Row Sum",difficulty:"beginner",prompt:"Declare a std::array of 4 integers representing a matrix row. Compute and print the sum of its elements using std::accumulate.",hints:["Include <numeric> for std::accumulate","std::accumulate takes begin, end, and an initial value"],solution:e.jsx(t,{children:`#include <iostream>
#include <array>
#include <numeric>

int main() {
    std::array<int, 4> row = {3, 7, 2, 8};
    int sum = std::accumulate(row.begin(), row.end(), 0);
    std::cout << "Sum: " << sum << std::endl;
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"std::array",url:"https://en.cppreference.com/w/cpp/container/array",description:"Fixed-size array container reference"},{type:"cppreference",title:"std::get (std::array)",url:"https://en.cppreference.com/w/cpp/container/array/get",description:"Compile-time element access"},{type:"textbook",title:"Effective Modern C++",author:"Scott Meyers",description:"Item 1: Understand template type deduction"}]})]})}const C=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"}));function p(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["While ",e.jsx("code",{children:"std::vector"})," is the go-to sequence container, ",e.jsx("code",{children:"std::list"})," and",e.jsx("code",{children:" std::deque"})," serve important roles when different access or insertion patterns are needed. A list provides constant-time insertion and removal anywhere, while a deque offers efficient insertion at both ends with random access."]}),e.jsx(s,{title:"std::list",children:e.jsxs("p",{children:["A doubly-linked list where each element is stored in a separate node that holds pointers to both its predecessor and successor. Insertion and removal at any known position take O(1) time, but random access is not supported. Defined in ",e.jsx("code",{children:"<list>"}),"."]})}),e.jsx(s,{title:"std::deque",children:e.jsxs("p",{children:["A double-ended queue that supports fast insertion and removal at both the front and back. It provides random access like ",e.jsx("code",{children:"std::vector"})," but stores elements in non-contiguous memory chunks. Defined in ",e.jsx("code",{children:"<deque>"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::list: Doubly-Linked List"}),e.jsx(t,{title:"list_basics.cpp",children:`#include <iostream>
#include <list>

int main() {
    std::list<int> nums = {10, 20, 30, 40, 50};

    // Insert at the front and back
    nums.push_front(5);
    nums.push_back(55);

    // Insert before the third element
    auto it = nums.begin();
    std::advance(it, 2);
    nums.insert(it, 15);

    // Splice: move elements from one list into another
    std::list<int> extra = {100, 200};
    nums.splice(nums.end(), extra);  // extra is now empty

    for (const auto& n : nums) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    std::cout << "Extra size: " << extra.size() << std::endl;
    return 0;
}`}),e.jsx(r,{children:`5 10 15 20 30 40 50 55 100 200
Extra size: 0`}),e.jsx(i,{title:"splice()",children:e.jsxs("p",{children:[e.jsx("code",{children:"splice"})," transfers elements from one list to another without copying or moving individual elements. It re-links the internal node pointers, making it an O(1) operation for single-element or whole-list transfers."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::deque: Double-Ended Queue"}),e.jsx(t,{title:"deque_basics.cpp",children:`#include <iostream>
#include <deque>

int main() {
    std::deque<std::string> tasks;

    // Efficient insertion at both ends
    tasks.push_back("Task B");
    tasks.push_front("Task A");
    tasks.push_back("Task C");

    // Random access like vector
    std::cout << "Second task: " << tasks[1] << std::endl;

    // Remove from front (FIFO behavior)
    tasks.pop_front();

    for (const auto& t : tasks) {
        std::cout << t << std::endl;
    }
    return 0;
}`}),e.jsx(r,{children:`Second task: Task B
Task B
Task C`}),e.jsx(n,{type:"info",title:"When to Use Each Container",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"std::vector"})," by default. Use ",e.jsx("code",{children:"std::deque"})," when you need frequent insertion or removal at the front. Use ",e.jsx("code",{children:"std::list"})," when you need constant-time insertion or removal at arbitrary positions and you already have an iterator to that position, or when you need splice operations."]})}),e.jsx(c,{title:"std::list and Cache Performance",children:e.jsxs("p",{children:["Because list nodes are allocated individually on the heap, they are scattered in memory. This leads to poor cache locality compared to ",e.jsx("code",{children:"std::vector"})," and ",e.jsx("code",{children:"std::deque"}),". In practice, ",e.jsx("code",{children:"std::vector"})," often outperforms ",e.jsx("code",{children:"std::list"})," even for operations where the list has better algorithmic complexity."]})}),e.jsx(o,{title:"Profile before choosing std::list",children:e.jsxs("p",{children:["The theoretical O(1) insertion advantage of ",e.jsx("code",{children:"std::list"})," is often outweighed by its cache-unfriendly memory layout. Always measure with realistic data before choosing a list over a vector."]})}),e.jsx(a,{title:"Task Queue",difficulty:"intermediate",prompt:"Use std::deque to implement a simple task queue: push 5 tasks to the back, then process (pop and print) them from the front in FIFO order.",hints:["Use push_back to enqueue and pop_front to dequeue","Check empty() before popping in a while loop"],solution:e.jsx(t,{children:`#include <iostream>
#include <deque>
#include <string>

int main() {
    std::deque<std::string> queue;
    queue.push_back("Email");
    queue.push_back("Report");
    queue.push_back("Code review");
    queue.push_back("Meeting");
    queue.push_back("Deploy");

    while (!queue.empty()) {
        std::cout << "Processing: " << queue.front() << std::endl;
        queue.pop_front();
    }
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"std::list",url:"https://en.cppreference.com/w/cpp/container/list",description:"Doubly-linked list reference"},{type:"cppreference",title:"std::deque",url:"https://en.cppreference.com/w/cpp/container/deque",description:"Double-ended queue reference"},{type:"textbook",title:"The C++ Standard Library",author:"Nicolai Josuttis",description:"Chapter 7: STL Containers"}]})]})}const S=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"}));function m(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"std::map"})," and ",e.jsx("code",{children:"std::set"})," are ordered associative containers backed by balanced binary search trees (typically red-black trees). They keep their elements sorted by key, support logarithmic-time lookup, insertion, and deletion, and provide bidirectional iterators that traverse elements in sorted order."]}),e.jsx(s,{title:"Ordered Associative Containers",children:e.jsxs("p",{children:["Containers that store elements in a sorted order determined by a comparison function (default: ",e.jsx("code",{children:"std::less<Key>"}),"). ",e.jsx("code",{children:"std::map"})," stores key-value pairs with unique keys. ",e.jsx("code",{children:"std::set"})," stores unique keys only. Both are defined in",e.jsx("code",{children:" <map>"})," and ",e.jsx("code",{children:"<set>"})," respectively."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::map"}),e.jsx(t,{title:"map_basics.cpp",children:`#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> ages;

    // Insert elements
    ages["Alice"] = 30;
    ages["Bob"] = 25;
    ages.insert({"Charlie", 35});
    ages.emplace("Diana", 28);

    // Lookup
    auto it = ages.find("Bob");
    if (it != ages.end()) {
        std::cout << "Bob is " << it->second << std::endl;
    }

    // lower_bound: first element >= key
    auto lb = ages.lower_bound("C");
    std::cout << "First name >= C: " << lb->first << std::endl;

    // C++17 structured bindings
    for (const auto& [name, age] : ages) {
        std::cout << name << ": " << age << std::endl;
    }
    return 0;
}`}),e.jsx(r,{children:`Bob is 25
First name >= C: Charlie
Alice: 30
Bob: 25
Charlie: 35
Diana: 28`}),e.jsx(i,{title:"lower_bound and upper_bound",children:e.jsxs("p",{children:[e.jsx("code",{children:"lower_bound(key)"})," returns an iterator to the first element with a key not less than the given key. ",e.jsx("code",{children:"upper_bound(key)"})," returns an iterator to the first element with a key greater than the given key. Together they define the range of elements equal to the key."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::set"}),e.jsx(t,{title:"set_basics.cpp",children:`#include <iostream>
#include <set>

int main() {
    std::set<int> unique_nums = {5, 3, 8, 1, 3, 5, 7};

    std::cout << "Size: " << unique_nums.size() << std::endl;

    // Duplicates are ignored
    auto [it, inserted] = unique_nums.insert(3);
    std::cout << "Insert 3 again: " << (inserted ? "yes" : "no") << std::endl;

    // Check membership
    if (unique_nums.count(7)) {
        std::cout << "7 is in the set" << std::endl;
    }

    // Elements are always sorted
    for (int n : unique_nums) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    return 0;
}`}),e.jsx(r,{children:`Size: 5
Insert 3 again: no
7 is in the set
1 3 5 7 8`}),e.jsx(n,{type:"info",title:"Red-Black Tree Guarantees",children:e.jsx("p",{children:"The underlying red-black tree ensures that insertion, deletion, and lookup all take O(log n) time in the worst case. Iteration visits elements in sorted order. These guarantees make ordered containers ideal when you need sorted traversal or range queries."})}),e.jsx(c,{title:"operator[] on std::map Inserts on Miss",children:e.jsxs("p",{children:["Using ",e.jsx("code",{children:"map[key]"})," on a key that does not exist will insert a default-constructed value for that key. If you only want to check or read, use ",e.jsx("code",{children:"find()"})," or",e.jsx("code",{children:" count()"})," instead."]})}),e.jsx(o,{title:"Use structured bindings for map iteration",children:e.jsxs("p",{children:["In C++17 and later, use ",e.jsx("code",{children:"const auto& [key, value]"})," in range-based for loops over maps. This is cleaner than accessing ",e.jsx("code",{children:"it->first"})," and ",e.jsx("code",{children:"it->second"}),"."]})}),e.jsx(a,{title:"Word Frequency Counter",difficulty:"intermediate",prompt:"Read a list of words from a vector and use std::map to count how many times each word appears. Print the words and their counts in alphabetical order.",hints:["Use map[word]++ to increment the count","Iteration over a map visits keys in sorted order automatically"],solution:e.jsx(t,{children:`#include <iostream>
#include <map>
#include <vector>
#include <string>

int main() {
    std::vector<std::string> words = {
        "apple", "banana", "apple", "cherry", "banana", "apple"
    };
    std::map<std::string, int> freq;
    for (const auto& w : words) {
        freq[w]++;
    }
    for (const auto& [word, count] : freq) {
        std::cout << word << ": " << count << std::endl;
    }
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"std::map",url:"https://en.cppreference.com/w/cpp/container/map",description:"Ordered key-value container"},{type:"cppreference",title:"std::set",url:"https://en.cppreference.com/w/cpp/container/set",description:"Ordered unique-key container"},{type:"textbook",title:"The C++ Standard Library",author:"Nicolai Josuttis",description:"Chapter 7.8: Maps and Multimaps"}]})]})}const q=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"}));function x(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:[e.jsx("code",{children:"std::unordered_map"})," and ",e.jsx("code",{children:"std::unordered_set"})," use hash tables to provide average-case O(1) lookup, insertion, and deletion. They do not maintain any particular order among their elements. When you need fast access by key and do not require sorted traversal, unordered containers are typically the better choice."]}),e.jsx(s,{title:"Hash Table Containers",children:e.jsxs("p",{children:["Unordered associative containers store elements in buckets determined by a hash function.",e.jsx("code",{children:" std::unordered_map"})," stores unique key-value pairs, while ",e.jsx("code",{children:"std::unordered_set"})," stores unique keys only. Both are defined in ",e.jsx("code",{children:"<unordered_map>"})," and",e.jsx("code",{children:" <unordered_set>"})," respectively."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic Usage"}),e.jsx(t,{title:"unordered_basics.cpp",children:`#include <iostream>
#include <unordered_map>
#include <unordered_set>
#include <string>

int main() {
    // Unordered map
    std::unordered_map<std::string, double> prices;
    prices["apple"] = 1.50;
    prices["banana"] = 0.75;
    prices["cherry"] = 3.00;
    prices.emplace("date", 5.50);

    if (auto it = prices.find("banana"); it != prices.end()) {
        std::cout << "Banana: $" << it->second << std::endl;
    }

    // Unordered set
    std::unordered_set<int> ids = {101, 205, 301, 101, 205};
    std::cout << "Unique IDs: " << ids.size() << std::endl;

    for (int id : ids) {
        std::cout << id << " ";
    }
    std::cout << std::endl;
    return 0;
}`}),e.jsx(r,{children:`Banana: $0.75
Unique IDs: 3
301 205 101`}),e.jsx(n,{type:"info",title:"Order is Not Guaranteed",children:e.jsx("p",{children:"The iteration order of unordered containers depends on the hash function and the internal bucket layout. It may change when elements are inserted or the container rehashes. Never rely on a specific traversal order."})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Bucket Interface and Custom Hash"}),e.jsx(t,{title:"custom_hash.cpp",children:`#include <iostream>
#include <unordered_map>
#include <string>

struct Point {
    int x, y;
    bool operator==(const Point& o) const {
        return x == o.x && y == o.y;
    }
};

struct PointHash {
    std::size_t operator()(const Point& p) const {
        auto h1 = std::hash<int>{}(p.x);
        auto h2 = std::hash<int>{}(p.y);
        return h1 ^ (h2 << 1);
    }
};

int main() {
    std::unordered_map<Point, std::string, PointHash> labels;
    labels[{0, 0}] = "origin";
    labels[{1, 2}] = "point A";

    std::cout << "At (0,0): " << labels[{0, 0}] << std::endl;

    // Bucket info
    std::cout << "Bucket count: " << labels.bucket_count() << std::endl;
    std::cout << "Load factor:  " << labels.load_factor() << std::endl;
    return 0;
}`}),e.jsx(r,{children:`At (0,0): origin
Bucket count: 5
Load factor:  0.4`}),e.jsx(i,{title:"Custom Hash Function",children:e.jsxs("p",{children:["To use a user-defined type as a key, you must provide a hash function (callable that returns",e.jsx("code",{children:"std::size_t"}),") and an equality operator (",e.jsx("code",{children:"operator=="}),"). The hash function can be passed as a template parameter or as a specialization of ",e.jsx("code",{children:"std::hash"}),"."]})}),e.jsx(c,{title:"Hash Collision Performance",children:e.jsx("p",{children:"In the worst case (all elements hash to the same bucket), lookup degrades to O(n). A good hash function distributes keys uniformly across buckets. Avoid trivial hash functions like returning a constant."})}),e.jsx(o,{title:"Use unordered containers for pure lookup",children:e.jsxs("p",{children:["When you only need to check membership or retrieve values by key and do not need sorted iteration, prefer ",e.jsx("code",{children:"std::unordered_map"})," and ",e.jsx("code",{children:"std::unordered_set"}),". They are typically 2-5x faster than their ordered counterparts for large datasets."]})}),e.jsx(a,{title:"Anagram Detector",difficulty:"intermediate",prompt:"Write a function that takes two strings and returns true if they are anagrams (same characters, different order). Use std::unordered_map to count character frequencies.",hints:["Build a frequency map for the first string, then decrement for the second","If all counts are zero at the end, the strings are anagrams"],solution:e.jsx(t,{children:`#include <iostream>
#include <unordered_map>
#include <string>

bool isAnagram(const std::string& a, const std::string& b) {
    if (a.size() != b.size()) return false;
    std::unordered_map<char, int> freq;
    for (char c : a) freq[c]++;
    for (char c : b) freq[c]--;
    for (const auto& [ch, count] : freq) {
        if (count != 0) return false;
    }
    return true;
}

int main() {
    std::cout << std::boolalpha;
    std::cout << isAnagram("listen", "silent") << std::endl;
    std::cout << isAnagram("hello", "world") << std::endl;
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"std::unordered_map",url:"https://en.cppreference.com/w/cpp/container/unordered_map",description:"Hash-based key-value container"},{type:"cppreference",title:"std::hash",url:"https://en.cppreference.com/w/cpp/utility/hash",description:"Hash function object"},{type:"textbook",title:"The C++ Standard Library",author:"Nicolai Josuttis",description:"Chapter 7.9: Unordered Containers"}]})]})}const I=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"}));function g(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The ",e.jsx("code",{children:"<algorithm>"})," header provides a rich set of sorting and searching algorithms that work with any container through iterators. Understanding these algorithms and when to use each variant is essential for writing efficient, expressive C++ code."]}),e.jsx(s,{title:"STL Sorting Algorithms",children:e.jsxs("p",{children:["The standard library offers multiple sorting functions: ",e.jsx("code",{children:"std::sort"})," for general sorting, ",e.jsx("code",{children:"std::stable_sort"})," for preserving equal-element order,",e.jsx("code",{children:" std::partial_sort"})," for sorting only the first N elements, and",e.jsx("code",{children:" std::nth_element"})," for partitioning around the Nth element. All are defined in ",e.jsx("code",{children:"<algorithm>"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Sorting Variants"}),e.jsx(t,{title:"sorting_variants.cpp",children:`#include <iostream>
#include <vector>
#include <algorithm>

void print(const std::string& label, const std::vector<int>& v) {
    std::cout << label << ": ";
    for (int x : v) std::cout << x << " ";
    std::cout << std::endl;
}

int main() {
    std::vector<int> data = {9, 3, 7, 1, 5, 8, 2, 6, 4};

    // Full sort (ascending)
    auto v1 = data;
    std::sort(v1.begin(), v1.end());
    print("sort", v1);

    // Sort descending with custom comparator
    auto v2 = data;
    std::sort(v2.begin(), v2.end(), std::greater<int>());
    print("desc", v2);

    // Partial sort: only first 3 elements are sorted
    auto v3 = data;
    std::partial_sort(v3.begin(), v3.begin() + 3, v3.end());
    print("partial(3)", v3);

    // nth_element: element at position 4 is correct, rest partitioned
    auto v4 = data;
    std::nth_element(v4.begin(), v4.begin() + 4, v4.end());
    std::cout << "5th smallest: " << v4[4] << std::endl;
    return 0;
}`}),e.jsx(r,{children:`sort: 1 2 3 4 5 6 7 8 9
desc: 9 8 7 6 5 4 3 2 1
partial(3): 1 2 3 9 7 8 5 6 4
5th smallest: 5`}),e.jsxs(i,{title:"Custom Comparators",children:[e.jsxs("p",{children:["All sorting algorithms accept an optional comparator. It can be a function pointer, a function object, or a lambda. The comparator must define a strict weak ordering: it must return ",e.jsx("code",{children:"true"})," if the first argument should come before the second."]}),e.jsx(t,{children:`// Lambda comparator: sort by absolute value
std::sort(v.begin(), v.end(), [](int a, int b) {
    return std::abs(a) < std::abs(b);
});`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Searching in Sorted Data"}),e.jsx(t,{title:"search_algorithms.cpp",children:`#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> sorted = {1, 3, 5, 7, 9, 11, 13, 15};

    // Binary search: returns bool
    bool found = std::binary_search(sorted.begin(), sorted.end(), 7);
    std::cout << "Found 7: " << std::boolalpha << found << std::endl;

    // lower_bound: iterator to first element >= value
    auto lb = std::lower_bound(sorted.begin(), sorted.end(), 6);
    std::cout << "lower_bound(6): " << *lb << std::endl;

    // find: linear search (works on unsorted data too)
    auto it = std::find(sorted.begin(), sorted.end(), 9);
    if (it != sorted.end()) {
        std::cout << "Found 9 at index " << std::distance(sorted.begin(), it) << std::endl;
    }
    return 0;
}`}),e.jsx(r,{children:`Found 7: true
lower_bound(6): 7
Found 9 at index 4`}),e.jsx(n,{type:"important",title:"Binary Search Requires Sorted Data",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::binary_search"}),", ",e.jsx("code",{children:"std::lower_bound"}),", and ",e.jsx("code",{children:"std::upper_bound"})," require the input range to be sorted according to the same comparator. Using them on unsorted data produces undefined behavior."]})}),e.jsx(l,{compiler:"all",title:"std::sort Complexity",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::sort"})," is guaranteed to be O(n log n) on average. Most implementations use introsort (a hybrid of quicksort, heapsort, and insertion sort). ",e.jsx("code",{children:"std::stable_sort"})," uses merge sort and requires O(n) extra memory."]})}),e.jsx(o,{title:"Choose the right sorting algorithm",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"std::sort"})," for general sorting. Use ",e.jsx("code",{children:"std::partial_sort"})," when you only need the top N elements. Use ",e.jsx("code",{children:"std::nth_element"})," to find a median or partition around a rank. These partial algorithms are faster than a full sort when you only need partial ordering."]})}),e.jsx(a,{title:"Top 3 Scores",difficulty:"intermediate",prompt:"Given a vector of exam scores, use std::partial_sort to find and print only the top 3 scores in descending order without sorting the entire array.",hints:["Use std::greater<int>() as the comparator for descending order","partial_sort(begin, begin+3, end, comp) sorts only the first 3"],solution:e.jsx(t,{children:`#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>

int main() {
    std::vector<int> scores = {72, 95, 88, 61, 99, 84, 77, 93};
    std::partial_sort(scores.begin(), scores.begin() + 3,
                      scores.end(), std::greater<int>());
    std::cout << "Top 3 scores: ";
    for (int i = 0; i < 3; ++i) {
        std::cout << scores[i] << " ";
    }
    std::cout << std::endl;
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"std::sort",url:"https://en.cppreference.com/w/cpp/algorithm/sort",description:"General-purpose sort algorithm"},{type:"cppreference",title:"std::binary_search",url:"https://en.cppreference.com/w/cpp/algorithm/binary_search",description:"Binary search on sorted ranges"},{type:"textbook",title:"The C++ Programming Language",author:"Bjarne Stroustrup",description:"Chapter 32: STL Algorithms"}]})]})}const T=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"}));function f(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The STL provides a family of algorithms for transforming, accumulating, and manipulating ranges of elements. These algorithms express common operations declaratively, making code more readable and less error-prone than hand-written loops."}),e.jsx(s,{title:"Transforming Algorithms",children:e.jsxs("p",{children:["Algorithms like ",e.jsx("code",{children:"std::transform"}),", ",e.jsx("code",{children:"std::for_each"}),", ",e.jsx("code",{children:"std::copy"}),",",e.jsx("code",{children:" std::fill"}),", and ",e.jsx("code",{children:"std::generate"})," apply operations across ranges of elements. ",e.jsx("code",{children:"std::accumulate"})," (from ",e.jsx("code",{children:"<numeric>"}),") reduces a range to a single value."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::transform and std::accumulate"}),e.jsx(t,{title:"transform_accumulate.cpp",children:`#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
#include <string>

int main() {
    std::vector<int> nums = {1, 2, 3, 4, 5};

    // Transform: square each element into a new vector
    std::vector<int> squares(nums.size());
    std::transform(nums.begin(), nums.end(), squares.begin(),
                   [](int x) { return x * x; });

    std::cout << "Squares: ";
    for (int s : squares) std::cout << s << " ";
    std::cout << std::endl;

    // Accumulate: sum of squares
    int sum = std::accumulate(squares.begin(), squares.end(), 0);
    std::cout << "Sum of squares: " << sum << std::endl;

    // Accumulate with custom operation: product
    int product = std::accumulate(nums.begin(), nums.end(), 1,
                                  std::multiplies<int>());
    std::cout << "Product: " << product << std::endl;

    // Transform strings to uppercase
    std::string text = "hello world";
    std::transform(text.begin(), text.end(), text.begin(), ::toupper);
    std::cout << text << std::endl;
    return 0;
}`}),e.jsx(r,{children:`Squares: 1 4 9 16 25
Sum of squares: 55
Product: 120
HELLO WORLD`}),e.jsx(i,{title:"std::transform Syntax",children:e.jsxs("p",{children:["The unary form ",e.jsx("code",{children:"transform(first, last, dest, op)"})," applies ",e.jsx("code",{children:"op"})," to each element in ",e.jsx("code",{children:"[first, last)"})," and writes the result to ",e.jsx("code",{children:"dest"}),". The binary form ",e.jsx("code",{children:"transform(first1, last1, first2, dest, op)"})," applies ",e.jsx("code",{children:"op"})," to pairs of elements from two ranges."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"copy, fill, generate, and for_each"}),e.jsx(t,{title:"copy_fill_generate.cpp",children:`#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>

int main() {
    // std::fill: set all elements to a value
    std::vector<int> filled(5);
    std::fill(filled.begin(), filled.end(), 42);

    // std::generate: fill with generated values
    std::vector<int> generated(6);
    int counter = 0;
    std::generate(generated.begin(), generated.end(),
                  [&counter]() { return counter++ * 10; });

    // std::copy with ostream_iterator for printing
    std::cout << "Filled:    ";
    std::copy(filled.begin(), filled.end(),
              std::ostream_iterator<int>(std::cout, " "));
    std::cout << std::endl;

    std::cout << "Generated: ";
    std::copy(generated.begin(), generated.end(),
              std::ostream_iterator<int>(std::cout, " "));
    std::cout << std::endl;

    // std::for_each: apply side-effecting operation
    std::cout << "Doubled:   ";
    std::for_each(generated.begin(), generated.end(),
                  [](int x) { std::cout << x * 2 << " "; });
    std::cout << std::endl;
    return 0;
}`}),e.jsx(r,{children:`Filled:    42 42 42 42 42
Generated: 0 10 20 30 40 50
Doubled:   0 20 40 60 80 100`}),e.jsx(n,{type:"tip",title:"std::ostream_iterator",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::ostream_iterator"})," is an output iterator that writes each assigned value to a stream with an optional delimiter. Combined with ",e.jsx("code",{children:"std::copy"}),", it provides a concise way to print container contents without writing a loop."]})}),e.jsx(c,{title:"Ensure Destination Has Enough Space",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::transform"})," and ",e.jsx("code",{children:"std::copy"})," write to a destination iterator without checking bounds. The destination must have enough space already allocated, or you must use ",e.jsx("code",{children:"std::back_inserter"})," to append elements dynamically."]})}),e.jsx(o,{title:"Prefer algorithms over raw loops",children:e.jsxs("p",{children:["Using ",e.jsx("code",{children:"std::transform"})," and ",e.jsx("code",{children:"std::accumulate"})," communicates intent more clearly than equivalent for loops. They also compose well with lambdas and are easier for the compiler to optimize. Prefer them when the operation maps cleanly to the algorithm."]})}),e.jsx(a,{title:"Normalize a Vector",difficulty:"intermediate",prompt:"Given a vector of doubles, use std::accumulate to compute the sum, then std::transform to divide each element by the sum, producing a vector of normalized values that sum to 1.0.",hints:["Compute the sum first with std::accumulate","Use std::transform with a lambda that captures the sum"],solution:e.jsx(t,{children:`#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
    std::vector<double> vals = {10.0, 20.0, 30.0, 40.0};
    double total = std::accumulate(vals.begin(), vals.end(), 0.0);
    std::vector<double> norm(vals.size());
    std::transform(vals.begin(), vals.end(), norm.begin(),
                   [total](double x) { return x / total; });
    for (double v : norm) std::cout << v << " ";
    std::cout << std::endl;
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"std::transform",url:"https://en.cppreference.com/w/cpp/algorithm/transform",description:"Apply a function to a range"},{type:"cppreference",title:"std::accumulate",url:"https://en.cppreference.com/w/cpp/algorithm/accumulate",description:"Reduce a range to a single value"},{type:"textbook",title:"Effective STL",author:"Scott Meyers",description:"Item 43: Prefer algorithm calls to hand-written loops"}]})]})}const z=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"}));function y(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Several STL algorithms form well-known patterns that appear frequently in real C++ code. Understanding these patterns -- the erase-remove idiom, partitioning, merging, and set operations -- lets you write concise, correct code instead of error-prone manual loops."}),e.jsx(s,{title:"Erase-Remove Idiom",children:e.jsxs("p",{children:["A two-step pattern for removing elements from a container: ",e.jsx("code",{children:"std::remove"})," (or",e.jsx("code",{children:"std::remove_if"}),") moves unwanted elements to the end of the range and returns an iterator to the new logical end. Then ",e.jsx("code",{children:"container.erase()"})," removes them from the container. In C++20, ",e.jsx("code",{children:"std::erase"})," and ",e.jsx("code",{children:"std::erase_if"})," combine both steps."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Erase-Remove and std::unique"}),e.jsx(t,{title:"erase_remove.cpp",children:`#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    // Erase-remove idiom: remove all even numbers
    std::vector<int> nums = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    nums.erase(
        std::remove_if(nums.begin(), nums.end(),
                       [](int x) { return x % 2 == 0; }),
        nums.end()
    );
    std::cout << "Odds: ";
    for (int n : nums) std::cout << n << " ";
    std::cout << std::endl;

    // std::unique: remove consecutive duplicates (must be sorted first)
    std::vector<int> data = {1, 3, 3, 5, 5, 5, 7, 7, 9};
    data.erase(std::unique(data.begin(), data.end()), data.end());
    std::cout << "Unique: ";
    for (int n : data) std::cout << n << " ";
    std::cout << std::endl;
    return 0;
}`}),e.jsx(r,{children:`Odds: 1 3 5 7 9
Unique: 1 3 5 7 9`}),e.jsx(c,{title:"std::unique Only Removes Consecutive Duplicates",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::unique"})," removes adjacent duplicate elements. If you want to remove all duplicates regardless of position, sort the range first, then apply ",e.jsx("code",{children:"std::unique"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Partition, Merge, and Set Operations"}),e.jsx(t,{title:"partition_merge.cpp",children:`#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>

int main() {
    // std::partition: separate elements by predicate
    std::vector<int> vals = {8, 3, 5, 1, 9, 2, 7, 4, 6};
    auto pivot = std::partition(vals.begin(), vals.end(),
                                [](int x) { return x <= 5; });
    std::cout << "Partition (<= 5 | > 5): ";
    for (int v : vals) std::cout << v << " ";
    std::cout << std::endl;

    // std::merge: merge two sorted ranges
    std::vector<int> a = {1, 3, 5, 7};
    std::vector<int> b = {2, 4, 6, 8};
    std::vector<int> merged;
    std::merge(a.begin(), a.end(), b.begin(), b.end(),
               std::back_inserter(merged));
    std::cout << "Merged: ";
    for (int m : merged) std::cout << m << " ";
    std::cout << std::endl;

    // std::set_intersection: elements common to both sorted ranges
    std::vector<int> s1 = {1, 2, 3, 4, 5};
    std::vector<int> s2 = {3, 4, 5, 6, 7};
    std::vector<int> common;
    std::set_intersection(s1.begin(), s1.end(), s2.begin(), s2.end(),
                          std::back_inserter(common));
    std::cout << "Intersection: ";
    for (int c : common) std::cout << c << " ";
    std::cout << std::endl;
    return 0;
}`}),e.jsx(r,{children:`Partition (<= 5 | > 5): 4 3 5 1 2 9 7 8 6
Merged: 1 2 3 4 5 6 7 8
Intersection: 3 4 5`}),e.jsx(i,{title:"Set Operations on Sorted Ranges",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::set_intersection"}),", ",e.jsx("code",{children:"std::set_union"}),", ",e.jsx("code",{children:"std::set_difference"}),", and ",e.jsx("code",{children:"std::set_symmetric_difference"})," all operate on sorted ranges and produce sorted output. They work on any sorted sequence, not just ",e.jsx("code",{children:"std::set"}),"."]})}),e.jsx(n,{type:"tip",title:"C++20 std::erase and std::erase_if",children:e.jsxs("p",{children:["C++20 introduced free-function versions ",e.jsx("code",{children:"std::erase(container, value)"})," and",e.jsx("code",{children:" std::erase_if(container, pred)"})," that simplify the erase-remove idiom to a single call. Use them when targeting C++20 or later."]})}),e.jsx(o,{title:"Use the erase-remove idiom correctly",children:e.jsxs("p",{children:["Always call ",e.jsx("code",{children:"erase()"})," after ",e.jsx("code",{children:"std::remove"})," or ",e.jsx("code",{children:"std::remove_if"}),". Calling ",e.jsx("code",{children:"std::remove"})," alone leaves the container with the same size -- it only moves elements. The actual removal requires the container's ",e.jsx("code",{children:"erase()"})," method."]})}),e.jsx(a,{title:"Partition and Count",difficulty:"intermediate",prompt:"Given a vector of integers, use std::partition to separate positive and negative numbers. Then print both groups and their counts.",hints:["std::partition returns an iterator to the partition point","Use std::distance to count elements in each partition"],solution:e.jsx(t,{children:`#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> nums = {-3, 7, -1, 4, -5, 2, 8, -6};
    auto mid = std::partition(nums.begin(), nums.end(),
                              [](int x) { return x >= 0; });
    std::cout << "Positive (" << std::distance(nums.begin(), mid) << "): ";
    for (auto it = nums.begin(); it != mid; ++it)
        std::cout << *it << " ";
    std::cout << std::endl;
    std::cout << "Negative (" << std::distance(mid, nums.end()) << "): ";
    for (auto it = mid; it != nums.end(); ++it)
        std::cout << *it << " ";
    std::cout << std::endl;
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"std::remove",url:"https://en.cppreference.com/w/cpp/algorithm/remove",description:"Remove elements from a range"},{type:"cppreference",title:"std::partition",url:"https://en.cppreference.com/w/cpp/algorithm/partition",description:"Partition a range by predicate"},{type:"cppreference",title:"std::set_intersection",url:"https://en.cppreference.com/w/cpp/algorithm/set_intersection",description:"Set intersection of sorted ranges"}]})]})}const N=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"}));function j(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Iterators are the glue between containers and algorithms in the STL. They abstract the notion of a position in a sequence, allowing algorithms to work generically with any container. The STL defines five iterator categories, each building on the capabilities of the previous one."}),e.jsx(s,{title:"Iterator Categories",children:e.jsxs("p",{children:["The five categories, from least to most powerful, are: ",e.jsx("strong",{children:"Input"})," (single-pass read),",e.jsx("strong",{children:" Output"})," (single-pass write), ",e.jsx("strong",{children:"Forward"})," (multi-pass read/write),",e.jsx("strong",{children:" Bidirectional"})," (forward plus backward traversal), and ",e.jsx("strong",{children:"Random Access"})," (direct jump to any position in constant time). Each algorithm specifies the minimum category it requires."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Category Capabilities"}),e.jsxs(i,{title:"Iterator Operations by Category",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Input:"})," ",e.jsx("code",{children:"++it"}),", ",e.jsx("code",{children:"*it"})," (read), ",e.jsx("code",{children:"=="}),", ",e.jsx("code",{children:"!="}),". Single-pass only."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Output:"})," ",e.jsx("code",{children:"++it"}),", ",e.jsx("code",{children:"*it = val"})," (write). Single-pass only."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Forward:"})," All of Input, plus multi-pass guarantee. Can read and write."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Bidirectional:"})," All of Forward, plus ",e.jsx("code",{children:"--it"}),"."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Random Access:"})," All of Bidirectional, plus ",e.jsx("code",{children:"it + n"}),", ",e.jsx("code",{children:"it - n"}),",",e.jsx("code",{children:" it[n]"}),", ",e.jsx("code",{children:"<"}),", ",e.jsx("code",{children:">"}),", ",e.jsx("code",{children:"<="}),", ",e.jsx("code",{children:">="}),"."]})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Containers and Their Iterators"}),e.jsx(t,{title:"iterator_examples.cpp",children:`#include <iostream>
#include <vector>
#include <list>
#include <forward_list>
#include <algorithm>

int main() {
    // vector: random access iterators
    std::vector<int> vec = {10, 20, 30, 40, 50};
    auto vit = vec.begin();
    vit += 3;  // random access: jump directly
    std::cout << "vec[3] via iterator: " << *vit << std::endl;

    // list: bidirectional iterators
    std::list<int> lst = {10, 20, 30, 40, 50};
    auto lit = lst.end();
    --lit;  // bidirectional: can go backward
    std::cout << "list back via --end: " << *lit << std::endl;

    // forward_list: forward iterators only
    std::forward_list<int> fl = {10, 20, 30};
    auto fit = fl.begin();
    ++fit;  // can only go forward
    std::cout << "forward_list second: " << *fit << std::endl;

    // std::advance works with any category
    auto it2 = lst.begin();
    std::advance(it2, 2);  // uses ++ internally for bidirectional
    std::cout << "list[2] via advance: " << *it2 << std::endl;
    return 0;
}`}),e.jsx(r,{children:`vec[3] via iterator: 40
list back via --end: 50
forward_list second: 20
list[2] via advance: 30`}),e.jsx(n,{type:"info",title:"Why Categories Matter",children:e.jsxs("p",{children:["Algorithms document their minimum iterator requirement. ",e.jsx("code",{children:"std::sort"})," requires random access iterators, so it works with ",e.jsx("code",{children:"std::vector"})," and ",e.jsx("code",{children:"std::deque"})," but not ",e.jsx("code",{children:"std::list"}),". The list provides its own ",e.jsx("code",{children:"sort()"})," member function instead."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"std::distance and std::advance"}),e.jsx(t,{title:"distance_advance.cpp",children:`#include <iostream>
#include <list>
#include <iterator>

int main() {
    std::list<int> data = {5, 10, 15, 20, 25, 30};

    auto first = data.begin();
    auto last = data.end();

    // std::distance: count elements between iterators
    std::cout << "Distance: " << std::distance(first, last) << std::endl;

    // std::next / std::prev (C++11): non-mutating advance
    auto third = std::next(first, 2);
    std::cout << "Third element: " << *third << std::endl;

    auto before_last = std::prev(last);
    std::cout << "Last element: " << *before_last << std::endl;
    return 0;
}`}),e.jsx(r,{children:`Distance: 6
Third element: 15
Last element: 30`}),e.jsx(c,{title:"Do Not Use Arithmetic on Non-Random-Access Iterators",children:e.jsxs("p",{children:["Expressions like ",e.jsx("code",{children:"it + 5"})," only compile for random access iterators. For bidirectional or forward iterators, use ",e.jsx("code",{children:"std::advance(it, 5)"})," or",e.jsx("code",{children:" std::next(it, 5)"})," instead."]})}),e.jsx(o,{title:"Use std::next and std::prev",children:e.jsxs("p",{children:["Prefer ",e.jsx("code",{children:"std::next(it, n)"})," and ",e.jsx("code",{children:"std::prev(it, n)"})," over manual increment loops. They return a new iterator without modifying the original, making code clearer and less error-prone."]})}),e.jsx(a,{title:"Find the Middle Element",difficulty:"intermediate",prompt:"Write a function that takes a std::list<int> and returns the value of the middle element. Use std::distance and std::advance (do not convert to a vector).",hints:["Find the total size with std::distance(begin, end)","Use std::advance(it, size / 2) to reach the middle"],solution:e.jsx(t,{children:`#include <iostream>
#include <list>
#include <iterator>

int middle(const std::list<int>& lst) {
    auto size = std::distance(lst.begin(), lst.end());
    auto it = lst.begin();
    std::advance(it, size / 2);
    return *it;
}

int main() {
    std::list<int> data = {10, 20, 30, 40, 50};
    std::cout << "Middle: " << middle(data) << std::endl;
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"Iterator categories",url:"https://en.cppreference.com/w/cpp/iterator",description:"Iterator library overview"},{type:"cppreference",title:"std::advance",url:"https://en.cppreference.com/w/cpp/iterator/advance",description:"Advance an iterator by N positions"},{type:"textbook",title:"The C++ Standard Library",author:"Nicolai Josuttis",description:"Chapter 9: STL Iterators"}]})]})}const A=Object.freeze(Object.defineProperty({__proto__:null,default:j},Symbol.toStringTag,{value:"Module"}));function b(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Writing a custom iterator allows your own classes to work with range-based for loops and all STL algorithms. An iterator is any object that supports the required operations for its category. By providing ",e.jsx("code",{children:"begin()"})," and ",e.jsx("code",{children:"end()"}),", you make your class iterable."]}),e.jsx(s,{title:"iterator_traits",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::iterator_traits<It>"})," is a traits class that extracts the associated types of an iterator: ",e.jsx("code",{children:"value_type"}),", ",e.jsx("code",{children:"difference_type"}),",",e.jsx("code",{children:" pointer"}),", ",e.jsx("code",{children:"reference"}),", and ",e.jsx("code",{children:"iterator_category"}),". Algorithms use these traits to adapt their behavior to the iterator category."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"A Simple Range Iterator"}),e.jsx(t,{title:"range_iterator.cpp",children:`#include <iostream>
#include <iterator>

class IntRange {
    int start_, end_;
public:
    IntRange(int start, int end) : start_(start), end_(end) {}

    class Iterator {
        int current_;
    public:
        // Required type aliases for iterator_traits
        using iterator_category = std::forward_iterator_tag;
        using value_type = int;
        using difference_type = std::ptrdiff_t;
        using pointer = const int*;
        using reference = int;

        explicit Iterator(int val) : current_(val) {}

        int operator*() const { return current_; }
        Iterator& operator++() { ++current_; return *this; }
        Iterator operator++(int) { auto tmp = *this; ++current_; return tmp; }
        bool operator==(const Iterator& o) const { return current_ == o.current_; }
        bool operator!=(const Iterator& o) const { return current_ != o.current_; }
    };

    Iterator begin() const { return Iterator(start_); }
    Iterator end() const { return Iterator(end_); }
};

int main() {
    for (int val : IntRange(1, 6)) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    return 0;
}`}),e.jsx(r,{children:"1 2 3 4 5"}),e.jsx(i,{title:"Making a Class Iterable",children:e.jsxs("p",{children:["A class is iterable if it provides ",e.jsx("code",{children:"begin()"})," and ",e.jsx("code",{children:"end()"})," member functions (or free functions found via ADL) that return iterators. The iterator must support at minimum ",e.jsx("code",{children:"operator*"}),", ",e.jsx("code",{children:"operator++"}),", and",e.jsx("code",{children:" operator!="}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Using Custom Iterators with Algorithms"}),e.jsx(t,{title:"custom_with_algorithm.cpp",children:`#include <iostream>
#include <algorithm>
#include <vector>
#include <iterator>

class IntRange {
    int start_, end_;
public:
    class Iterator {
        int current_;
    public:
        using iterator_category = std::forward_iterator_tag;
        using value_type = int;
        using difference_type = std::ptrdiff_t;
        using pointer = const int*;
        using reference = int;
        explicit Iterator(int v) : current_(v) {}
        int operator*() const { return current_; }
        Iterator& operator++() { ++current_; return *this; }
        Iterator operator++(int) { auto t = *this; ++current_; return t; }
        bool operator==(const Iterator& o) const { return current_ == o.current_; }
        bool operator!=(const Iterator& o) const { return current_ != o.current_; }
    };
    IntRange(int s, int e) : start_(s), end_(e) {}
    Iterator begin() const { return Iterator(start_); }
    Iterator end() const { return Iterator(end_); }
};

int main() {
    IntRange range(1, 11);

    // Copy to vector using std::copy
    std::vector<int> vec;
    std::copy(range.begin(), range.end(), std::back_inserter(vec));

    // Use algorithms on copied data
    auto sum = std::accumulate(vec.begin(), vec.end(), 0);
    std::cout << "Sum 1..10: " << sum << std::endl;

    auto count = std::count_if(range.begin(), range.end(),
                               [](int x) { return x % 2 == 0; });
    std::cout << "Even count: " << count << std::endl;
    return 0;
}`}),e.jsx(r,{children:`Sum 1..10: 55
Even count: 5`}),e.jsx(n,{type:"info",title:"Type Aliases Are Essential",children:e.jsxs("p",{children:["The five type aliases (",e.jsx("code",{children:"iterator_category"}),", ",e.jsx("code",{children:"value_type"}),",",e.jsx("code",{children:" difference_type"}),", ",e.jsx("code",{children:"pointer"}),", ",e.jsx("code",{children:"reference"}),") allow",e.jsx("code",{children:" std::iterator_traits"})," to work with your iterator. Without them, some algorithms and library facilities may fail to compile."]})}),e.jsx(c,{title:"Deprecated std::iterator Base Class",children:e.jsxs("p",{children:["The ",e.jsx("code",{children:"std::iterator"})," base class was deprecated in C++17. Instead of inheriting from it, define the five type aliases directly inside your iterator class, as shown in the examples above."]})}),e.jsx(o,{title:"Start with forward iterators",children:e.jsx("p",{children:"When writing a custom iterator, start by implementing a forward iterator. It covers the most common use cases including range-based for loops and most algorithms. Only add bidirectional or random access operations if your data structure naturally supports them."})}),e.jsx(a,{title:"Fibonacci Iterator",difficulty:"advanced",prompt:"Create a FibRange class whose iterator generates Fibonacci numbers. FibRange(n) should be iterable and yield the first n Fibonacci numbers (1, 1, 2, 3, 5, ...).",hints:["Store previous and current values in the iterator","Track the count remaining to know when to stop (equal to end iterator)"],solution:e.jsx(t,{children:`#include <iostream>

class FibRange {
    int count_;
public:
    explicit FibRange(int n) : count_(n) {}
    class Iterator {
        int remaining_, prev_, curr_;
    public:
        using iterator_category = std::forward_iterator_tag;
        using value_type = int;
        using difference_type = std::ptrdiff_t;
        using pointer = const int*;
        using reference = int;
        Iterator(int r, int p, int c) : remaining_(r), prev_(p), curr_(c) {}
        int operator*() const { return curr_; }
        Iterator& operator++() {
            int next = prev_ + curr_;
            prev_ = curr_;
            curr_ = next;
            --remaining_;
            return *this;
        }
        Iterator operator++(int) { auto t = *this; ++(*this); return t; }
        bool operator!=(const Iterator& o) const { return remaining_ != o.remaining_; }
        bool operator==(const Iterator& o) const { return remaining_ == o.remaining_; }
    };
    Iterator begin() const { return Iterator(count_, 0, 1); }
    Iterator end() const { return Iterator(0, 0, 0); }
};

int main() {
    for (int f : FibRange(8)) {
        std::cout << f << " ";
    }
    std::cout << std::endl;
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"std::iterator_traits",url:"https://en.cppreference.com/w/cpp/iterator/iterator_traits",description:"Iterator traits class"},{type:"cppreference",title:"Iterator concepts (C++20)",url:"https://en.cppreference.com/w/cpp/iterator/input_iterator",description:"C++20 iterator concepts"},{type:"textbook",title:"The C++ Standard Library",author:"Nicolai Josuttis",description:"Chapter 9.4: Writing Custom Iterators"}]})]})}const B=Object.freeze(Object.defineProperty({__proto__:null,default:b},Symbol.toStringTag,{value:"Module"}));function v(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++20 introduced the Ranges library, a major evolution of the STL that replaces the iterator-pair pattern with range objects and composable view adaptors. Ranges enable a pipeline style of programming where transformations are chained using the pipe operator (",e.jsx("code",{children:"|"}),") and evaluated lazily."]}),e.jsx(s,{title:"Ranges and Views",children:e.jsxs("p",{children:["A ",e.jsx("strong",{children:"range"})," is anything that provides ",e.jsx("code",{children:"begin()"})," and ",e.jsx("code",{children:"end()"})," -- all standard containers are ranges. A ",e.jsx("strong",{children:"view"})," is a lightweight, non-owning range that applies a transformation lazily. Views are cheap to copy and compose. The library is defined in ",e.jsx("code",{children:"<ranges>"})," and ",e.jsx("code",{children:"<algorithm>"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Pipe Syntax and View Adaptors"}),e.jsx(t,{title:"ranges_basics.cpp",children:`#include <iostream>
#include <vector>
#include <ranges>

int main() {
    std::vector<int> nums = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    // Pipe syntax: filter even numbers, square them, take first 3
    auto result = nums
        | std::views::filter([](int n) { return n % 2 == 0; })
        | std::views::transform([](int n) { return n * n; })
        | std::views::take(3);

    std::cout << "Result: ";
    for (int val : result) {
        std::cout << val << " ";
    }
    std::cout << std::endl;

    // Views are lazy: nothing is computed until iteration
    // The original vector is unchanged
    std::cout << "Original size: " << nums.size() << std::endl;
    return 0;
}`}),e.jsx(r,{children:`Result: 4 16 36
Original size: 10`}),e.jsx(i,{title:"Common View Adaptors",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::views::filter(pred)"})," -- keep elements where pred is true.",e.jsx("br",{}),e.jsx("code",{children:"std::views::transform(fn)"})," -- apply fn to each element.",e.jsx("br",{}),e.jsx("code",{children:"std::views::take(n)"})," -- take the first n elements.",e.jsx("br",{}),e.jsx("code",{children:"std::views::drop(n)"})," -- skip the first n elements.",e.jsx("br",{}),e.jsx("code",{children:"std::views::reverse"})," -- reverse the range.",e.jsx("br",{}),e.jsx("code",{children:"std::views::iota(start)"})," -- generate an infinite sequence starting at start."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Lazy Evaluation and Infinite Ranges"}),e.jsx(t,{title:"lazy_infinite.cpp",children:`#include <iostream>
#include <ranges>
#include <vector>
#include <algorithm>

int main() {
    // std::views::iota generates an infinite sequence
    // Combined with take, we get the first N values
    auto first_squares = std::views::iota(1)
        | std::views::transform([](int n) { return n * n; })
        | std::views::take(5);

    std::cout << "First 5 squares: ";
    for (int s : first_squares) {
        std::cout << s << " ";
    }
    std::cout << std::endl;

    // Range-based algorithms: no begin/end needed
    std::vector<int> data = {5, 3, 8, 1, 9, 2, 7};
    std::ranges::sort(data);

    std::cout << "Sorted: ";
    for (int d : data) std::cout << d << " ";
    std::cout << std::endl;

    // Find with ranges
    auto it = std::ranges::find(data, 7);
    if (it != data.end()) {
        std::cout << "Found 7 at index "
                  << std::distance(data.begin(), it) << std::endl;
    }
    return 0;
}`}),e.jsx(r,{children:`First 5 squares: 1 4 9 16 25
Sorted: 1 2 3 5 7 8 9
Found 7 at index 4`}),e.jsx(n,{type:"info",title:"Lazy Evaluation",children:e.jsx("p",{children:"Views do not store computed results. Each element is computed on demand during iteration. This means chaining multiple views does not create intermediate containers. An element flows through the entire pipeline only when requested, making views memory-efficient even for large or infinite sequences."})}),e.jsx(n,{type:"history",title:"Evolution of Ranges",children:e.jsxs("p",{children:["The Ranges library originated from Eric Niebler's range-v3 library and was standardized in C++20. C++23 adds more views like ",e.jsx("code",{children:"std::views::zip"}),", ",e.jsx("code",{children:"std::views::chunk"}),", and ",e.jsx("code",{children:"std::views::slide"}),", further expanding the composable toolkit."]})}),e.jsx(l,{compiler:"all",title:"Compiler Support",children:e.jsxs("p",{children:["Ranges require a C++20-compliant compiler. GCC 10+, Clang 13+, and MSVC 19.29+ all support the core ranges features. Compile with ",e.jsx("code",{children:"-std=c++20"})," (GCC/Clang) or",e.jsx("code",{children:" /std:c++20"})," (MSVC)."]})}),e.jsx(o,{title:"Use ranges for declarative data pipelines",children:e.jsxs("p",{children:["Ranges let you express data transformations as a sequence of composable steps, similar to functional programming. Prefer the pipe syntax for readability when chaining multiple operations. Use ",e.jsx("code",{children:"std::ranges::*"})," algorithm overloads to pass containers directly instead of iterator pairs."]})}),e.jsx(a,{title:"FizzBuzz with Ranges",difficulty:"intermediate",prompt:"Use std::views::iota to generate numbers 1 through 20. Use std::views::transform to convert each number to a string: 'Fizz' for multiples of 3, 'Buzz' for multiples of 5, 'FizzBuzz' for both, or the number itself. Print each result.",hints:["std::views::iota(1, 21) generates integers from 1 to 20","Use std::to_string for converting integers to strings"],solution:e.jsx(t,{children:`#include <iostream>
#include <ranges>
#include <string>

int main() {
    auto fizzbuzz = std::views::iota(1, 21)
        | std::views::transform([](int n) -> std::string {
            if (n % 15 == 0) return "FizzBuzz";
            if (n % 3 == 0)  return "Fizz";
            if (n % 5 == 0)  return "Buzz";
            return std::to_string(n);
        });

    for (const auto& s : fizzbuzz) {
        std::cout << s << " ";
    }
    std::cout << std::endl;
    return 0;
}`})}),e.jsx(d,{references:[{type:"cppreference",title:"Ranges library",url:"https://en.cppreference.com/w/cpp/ranges",description:"C++20 Ranges library overview"},{type:"cppreference",title:"std::views::filter",url:"https://en.cppreference.com/w/cpp/ranges/filter_view",description:"Filter view adaptor"},{type:"textbook",title:"C++20: The Complete Guide",author:"Nicolai Josuttis",description:"Chapter 6: Ranges and Views"}]})]})}const R=Object.freeze(Object.defineProperty({__proto__:null,default:v},Symbol.toStringTag,{value:"Module"}));export{C as a,S as b,q as c,I as d,T as e,z as f,N as g,A as h,B as i,R as j,k as s};
