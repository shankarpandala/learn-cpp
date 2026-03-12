/**
 * Curriculum registry for LearnCpp.
 * Defines all 10 subjects, their chapters, and sections.
 */

export const CURRICULUM = [
  {
    id: '01-fundamentals',
    title: 'C++ Fundamentals',
    icon: '{ }',
    colorHex: '#3b82f6',
    description: 'Your first C++ program, variables, types, operators, and I/O — the building blocks of every C++ application.',
    prerequisites: [],
    estimatedHours: 20,
    difficulty: 'beginner',
    chapters: [
      {
        id: 'c1-getting-started',
        title: 'Getting Started',
        description: 'Write, compile, and run your first C++ program. Understand the compilation pipeline.',
        difficulty: 'beginner',
        estimatedMinutes: 180,
        sections: [
          { id: 's1-hello-world', title: 'Hello, World!', difficulty: 'beginner', readingMinutes: 15, description: 'Your first C++ program — #include, main(), std::cout.', buildsOn: null },
          { id: 's2-compilation', title: 'The Compilation Process', difficulty: 'beginner', readingMinutes: 20, description: 'Preprocessing, compilation, linking — how source becomes executable.', buildsOn: '01-fundamentals/c1-getting-started/s1-hello-world' },
          { id: 's3-program-structure', title: 'Program Structure', difficulty: 'beginner', readingMinutes: 18, description: 'Headers, source files, namespaces, comments.', buildsOn: '01-fundamentals/c1-getting-started/s2-compilation' },
        ],
      },
      {
        id: 'c2-variables-types',
        title: 'Variables & Types',
        description: 'Fundamental data types, variable declaration, initialization, and type conversions.',
        difficulty: 'beginner',
        estimatedMinutes: 220,
        sections: [
          { id: 's1-basic-types', title: 'Basic Data Types', difficulty: 'beginner', readingMinutes: 20, description: 'int, double, char, bool — the fundamental types and their sizes.', buildsOn: '01-fundamentals/c1-getting-started/s3-program-structure' },
          { id: 's2-variables', title: 'Variables & Constants', difficulty: 'beginner', readingMinutes: 18, description: 'Declaration, initialization, const, constexpr.', buildsOn: '01-fundamentals/c2-variables-types/s1-basic-types' },
          { id: 's3-type-conversions', title: 'Type Conversions', difficulty: 'beginner', readingMinutes: 22, description: 'Implicit conversions, static_cast, narrowing conversions.', buildsOn: '01-fundamentals/c2-variables-types/s2-variables' },
        ],
      },
      {
        id: 'c3-operators',
        title: 'Operators',
        description: 'Arithmetic, comparison, logical, and bitwise operators with precedence rules.',
        difficulty: 'beginner',
        estimatedMinutes: 200,
        sections: [
          { id: 's1-arithmetic', title: 'Arithmetic Operators', difficulty: 'beginner', readingMinutes: 15, description: '+, -, *, /, % — integer vs floating-point arithmetic.' },
          { id: 's2-comparison-logical', title: 'Comparison & Logical', difficulty: 'beginner', readingMinutes: 15, description: '==, !=, <, >, &&, || — Boolean expressions.' },
          { id: 's3-bitwise', title: 'Bitwise Operators', difficulty: 'intermediate', readingMinutes: 20, description: '&, |, ^, ~, <<, >> — bit manipulation fundamentals.' },
        ],
      },
      {
        id: 'c4-io',
        title: 'Input & Output',
        description: 'Console I/O with streams, string manipulation, and basic file operations.',
        difficulty: 'beginner',
        estimatedMinutes: 200,
        sections: [
          { id: 's1-console-io', title: 'Console I/O', difficulty: 'beginner', readingMinutes: 18, description: 'std::cin, std::cout, std::cerr — formatted output.' },
          { id: 's2-strings', title: 'Strings', difficulty: 'beginner', readingMinutes: 22, description: 'std::string, string operations, C-strings vs std::string.' },
          { id: 's3-file-io', title: 'File I/O Basics', difficulty: 'beginner', readingMinutes: 20, description: 'ifstream, ofstream, reading and writing files.' },
        ],
      },
    ],
  },
  {
    id: '02-control-flow',
    title: 'Control Flow',
    icon: '⟲',
    colorHex: '#6366f1',
    description: 'Conditionals, loops, and error handling — controlling the execution path of your programs.',
    prerequisites: ['01-fundamentals'],
    estimatedHours: 15,
    difficulty: 'beginner',
    chapters: [
      {
        id: 'c1-conditionals',
        title: 'Conditionals',
        description: 'Making decisions with if/else, switch, and the ternary operator.',
        difficulty: 'beginner',
        estimatedMinutes: 160,
        sections: [
          { id: 's1-if-else', title: 'If / Else', difficulty: 'beginner', readingMinutes: 15, description: 'if, else if, else — branching logic.', buildsOn: '01-fundamentals/c3-operators/s2-comparison-logical' },
          { id: 's2-switch', title: 'Switch Statements', difficulty: 'beginner', readingMinutes: 15, description: 'switch/case, fallthrough, break.' },
          { id: 's3-ternary', title: 'Ternary Operator', difficulty: 'beginner', readingMinutes: 10, description: 'condition ? a : b — compact conditionals.' },
        ],
      },
      {
        id: 'c2-loops',
        title: 'Loops',
        description: 'Repeating actions with for, while, do-while, and range-based for loops.',
        difficulty: 'beginner',
        estimatedMinutes: 180,
        sections: [
          { id: 's1-for-while', title: 'For & While Loops', difficulty: 'beginner', readingMinutes: 18, description: 'for, while, do-while — iteration patterns.' },
          { id: 's2-range-for', title: 'Range-Based For', difficulty: 'beginner', readingMinutes: 12, description: 'for (auto& x : container) — modern iteration.' },
          { id: 's3-break-continue', title: 'Break & Continue', difficulty: 'beginner', readingMinutes: 10, description: 'Loop control with break, continue.' },
        ],
      },
      {
        id: 'c3-error-handling',
        title: 'Error Handling',
        description: 'Exception handling with try/catch, RAII, and error reporting strategies.',
        difficulty: 'intermediate',
        estimatedMinutes: 220,
        sections: [
          { id: 's1-exceptions', title: 'Exceptions', difficulty: 'intermediate', readingMinutes: 25, description: 'throw, try, catch — exception handling fundamentals.' },
          { id: 's2-exception-safety', title: 'Exception Safety', difficulty: 'intermediate', readingMinutes: 25, description: 'Basic, strong, nothrow guarantees.' },
          { id: 's3-error-strategies', title: 'Error Codes vs Exceptions', difficulty: 'intermediate', readingMinutes: 20, description: 'When to use exceptions vs error codes vs std::expected.' },
        ],
      },
    ],
  },
  {
    id: '03-functions',
    title: 'Functions',
    icon: 'f()',
    colorHex: '#a855f7',
    description: 'Function declaration, overloading, recursion, function pointers, and lambda expressions.',
    prerequisites: ['01-fundamentals', '02-control-flow'],
    estimatedHours: 18,
    difficulty: 'beginner',
    chapters: [
      {
        id: 'c1-function-basics',
        title: 'Function Basics',
        description: 'Declaring and defining functions, parameters, and return types.',
        difficulty: 'beginner',
        estimatedMinutes: 180,
        sections: [
          { id: 's1-declaration', title: 'Declaration & Definition', difficulty: 'beginner', readingMinutes: 18, description: 'Function signatures, prototypes, definitions.' },
          { id: 's2-parameters', title: 'Parameters & Arguments', difficulty: 'beginner', readingMinutes: 20, description: 'Pass by value, pass by reference, pass by pointer.' },
          { id: 's3-return-types', title: 'Return Types', difficulty: 'beginner', readingMinutes: 15, description: 'Return values, void, auto return type deduction.' },
        ],
      },
      {
        id: 'c2-overloading',
        title: 'Function Overloading',
        description: 'Multiple functions with the same name but different parameters.',
        difficulty: 'intermediate',
        estimatedMinutes: 160,
        sections: [
          { id: 's1-overloading', title: 'Function Overloading', difficulty: 'intermediate', readingMinutes: 20, description: 'Overload resolution, name mangling.' },
          { id: 's2-default-args', title: 'Default Arguments', difficulty: 'beginner', readingMinutes: 12, description: 'Default parameter values, rules and gotchas.' },
        ],
      },
      {
        id: 'c3-advanced-functions',
        title: 'Advanced Functions',
        description: 'Recursion, function pointers, and lambda expressions.',
        difficulty: 'intermediate',
        estimatedMinutes: 240,
        sections: [
          { id: 's1-recursion', title: 'Recursion', difficulty: 'intermediate', readingMinutes: 22, description: 'Recursive functions, base cases, stack depth.' },
          { id: 's2-function-pointers', title: 'Function Pointers', difficulty: 'intermediate', readingMinutes: 20, description: 'Pointers to functions, callbacks, std::function.' },
          { id: 's3-lambdas', title: 'Lambda Expressions', difficulty: 'intermediate', readingMinutes: 25, description: 'Closures, capture lists, generic lambdas.' },
        ],
      },
    ],
  },
  {
    id: '04-oop',
    title: 'Object-Oriented Programming',
    icon: '◆',
    colorHex: '#f43f5e',
    description: 'Classes, inheritance, polymorphism, and operator overloading — designing with objects in C++.',
    prerequisites: ['03-functions'],
    estimatedHours: 30,
    difficulty: 'intermediate',
    chapters: [
      {
        id: 'c1-classes',
        title: 'Classes & Objects',
        description: 'Defining classes, constructors, destructors, and access control.',
        difficulty: 'intermediate',
        estimatedMinutes: 280,
        sections: [
          { id: 's1-class-basics', title: 'Classes & Objects', difficulty: 'intermediate', readingMinutes: 22, description: 'class keyword, data members, member functions.' },
          { id: 's2-constructors', title: 'Constructors & Destructors', difficulty: 'intermediate', readingMinutes: 28, description: 'Default, parameterized, copy, move constructors; destructors.' },
          { id: 's3-access', title: 'Access Specifiers', difficulty: 'intermediate', readingMinutes: 15, description: 'public, private, protected — encapsulation.' },
        ],
      },
      {
        id: 'c2-inheritance',
        title: 'Inheritance',
        description: 'Single and multiple inheritance, virtual inheritance, and the diamond problem.',
        difficulty: 'intermediate',
        estimatedMinutes: 260,
        sections: [
          { id: 's1-single', title: 'Single Inheritance', difficulty: 'intermediate', readingMinutes: 22, description: 'Base and derived classes, is-a relationship.' },
          { id: 's2-multiple', title: 'Multiple Inheritance', difficulty: 'advanced', readingMinutes: 25, description: 'Multiple base classes, diamond problem, virtual inheritance.' },
        ],
      },
      {
        id: 'c3-polymorphism',
        title: 'Polymorphism',
        description: 'Virtual functions, abstract classes, dynamic dispatch, and RTTI.',
        difficulty: 'intermediate',
        estimatedMinutes: 280,
        sections: [
          { id: 's1-virtual', title: 'Virtual Functions', difficulty: 'intermediate', readingMinutes: 25, description: 'virtual keyword, vtable, dynamic dispatch.' },
          { id: 's2-abstract', title: 'Abstract Classes', difficulty: 'intermediate', readingMinutes: 20, description: 'Pure virtual functions, interfaces.' },
          { id: 's3-rtti', title: 'RTTI & dynamic_cast', difficulty: 'advanced', readingMinutes: 18, description: 'Runtime type identification, typeid, dynamic_cast.' },
        ],
      },
      {
        id: 'c4-operator-overloading',
        title: 'Operator Overloading',
        description: 'Customizing operators for user-defined types.',
        difficulty: 'intermediate',
        estimatedMinutes: 240,
        sections: [
          { id: 's1-arithmetic-ops', title: 'Arithmetic Operators', difficulty: 'intermediate', readingMinutes: 22, description: 'Overloading +, -, *, / for custom types.' },
          { id: 's2-stream-ops', title: 'Stream Operators', difficulty: 'intermediate', readingMinutes: 18, description: 'Overloading << and >> for I/O.' },
          { id: 's3-comparison-ops', title: 'Comparison Operators', difficulty: 'intermediate', readingMinutes: 20, description: 'operator<=>, three-way comparison (C++20).' },
        ],
      },
    ],
  },
  {
    id: '05-memory',
    title: 'Memory Management',
    icon: '→',
    colorHex: '#f97316',
    description: 'Pointers, references, dynamic memory, smart pointers, and RAII — mastering C++ memory.',
    prerequisites: ['04-oop'],
    estimatedHours: 28,
    difficulty: 'intermediate',
    chapters: [
      {
        id: 'c1-pointers',
        title: 'Pointers',
        description: 'Pointer basics, arithmetic, and the connection between pointers and arrays.',
        difficulty: 'intermediate',
        estimatedMinutes: 260,
        sections: [
          { id: 's1-pointer-basics', title: 'Pointer Basics', difficulty: 'intermediate', readingMinutes: 22, description: 'Address-of, dereference, null pointers.' },
          { id: 's2-pointer-arithmetic', title: 'Pointer Arithmetic', difficulty: 'intermediate', readingMinutes: 20, description: 'Pointer addition, subtraction, array indexing.' },
          { id: 's3-pointers-arrays', title: 'Pointers & Arrays', difficulty: 'intermediate', readingMinutes: 22, description: 'Array decay, pointer-to-array, multidimensional arrays.' },
        ],
      },
      {
        id: 'c2-references',
        title: 'References',
        description: 'Lvalue and rvalue references — the foundation of move semantics.',
        difficulty: 'intermediate',
        estimatedMinutes: 220,
        sections: [
          { id: 's1-lvalue-refs', title: 'Lvalue References', difficulty: 'intermediate', readingMinutes: 18, description: 'T& — aliases, parameter passing, return by reference.' },
          { id: 's2-rvalue-refs', title: 'Rvalue References', difficulty: 'advanced', readingMinutes: 25, description: 'T&& — temporary values, binding rules.' },
          { id: 's3-ref-vs-ptr', title: 'Reference vs Pointer', difficulty: 'intermediate', readingMinutes: 15, description: 'When to use which — guidelines and trade-offs.' },
        ],
      },
      {
        id: 'c3-dynamic-memory',
        title: 'Dynamic Memory',
        description: 'new/delete, smart pointers, and RAII for safe resource management.',
        difficulty: 'intermediate',
        estimatedMinutes: 280,
        sections: [
          { id: 's1-new-delete', title: 'new & delete', difficulty: 'intermediate', readingMinutes: 22, description: 'Heap allocation, deallocation, memory leaks.' },
          { id: 's2-smart-pointers', title: 'Smart Pointers', difficulty: 'intermediate', readingMinutes: 30, description: 'unique_ptr, shared_ptr, weak_ptr — ownership semantics.' },
          { id: 's3-raii', title: 'RAII', difficulty: 'intermediate', readingMinutes: 22, description: 'Resource Acquisition Is Initialization — the C++ idiom.' },
        ],
      },
      {
        id: 'c4-memory-model',
        title: 'Memory Model',
        description: 'Stack vs heap, memory layout, alignment, and how objects live in memory.',
        difficulty: 'advanced',
        estimatedMinutes: 260,
        sections: [
          { id: 's1-stack-heap', title: 'Stack vs Heap', difficulty: 'intermediate', readingMinutes: 22, description: 'Stack frames, heap allocation, lifetime.' },
          { id: 's2-object-layout', title: 'Object Memory Layout', difficulty: 'advanced', readingMinutes: 25, description: 'Padding, alignment, sizeof, offsetof.' },
          { id: 's3-alignment', title: 'Alignment & Padding', difficulty: 'advanced', readingMinutes: 22, description: 'alignas, alignof, cache line alignment.' },
        ],
      },
    ],
  },
  {
    id: '06-stl',
    title: 'Standard Template Library',
    icon: '⟨⟩',
    colorHex: '#eab308',
    description: 'Containers, algorithms, iterators, and ranges — the powerful C++ standard library.',
    prerequisites: ['05-memory'],
    estimatedHours: 30,
    difficulty: 'intermediate',
    chapters: [
      {
        id: 'c1-containers',
        title: 'Sequence Containers',
        description: 'vector, array, list, deque — storing ordered collections.',
        difficulty: 'intermediate',
        estimatedMinutes: 280,
        sections: [
          { id: 's1-vector', title: 'std::vector', difficulty: 'intermediate', readingMinutes: 25, description: 'Dynamic array, push_back, capacity, iterators.' },
          { id: 's2-array', title: 'std::array', difficulty: 'beginner', readingMinutes: 15, description: 'Fixed-size array wrapper, compile-time size.' },
          { id: 's3-list-deque', title: 'list & deque', difficulty: 'intermediate', readingMinutes: 22, description: 'Doubly-linked list, double-ended queue.' },
        ],
      },
      {
        id: 'c2-associative',
        title: 'Associative Containers',
        description: 'map, set, unordered variants — key-value and set data structures.',
        difficulty: 'intermediate',
        estimatedMinutes: 260,
        sections: [
          { id: 's1-map-set', title: 'map & set', difficulty: 'intermediate', readingMinutes: 25, description: 'Ordered associative containers, red-black trees.' },
          { id: 's2-unordered', title: 'unordered_map & unordered_set', difficulty: 'intermediate', readingMinutes: 22, description: 'Hash-based containers, custom hash functions.' },
        ],
      },
      {
        id: 'c3-algorithms',
        title: 'Algorithms',
        description: 'sort, find, transform, accumulate — the STL algorithm library.',
        difficulty: 'intermediate',
        estimatedMinutes: 280,
        sections: [
          { id: 's1-sorting', title: 'Sorting & Searching', difficulty: 'intermediate', readingMinutes: 22, description: 'std::sort, std::find, std::binary_search.' },
          { id: 's2-transform', title: 'Transform & Accumulate', difficulty: 'intermediate', readingMinutes: 20, description: 'std::transform, std::accumulate, std::for_each.' },
          { id: 's3-algorithm-patterns', title: 'Algorithm Patterns', difficulty: 'intermediate', readingMinutes: 22, description: 'Erase-remove idiom, partition, merge.' },
        ],
      },
      {
        id: 'c4-iterators',
        title: 'Iterators & Ranges',
        description: 'Iterator categories, custom iterators, and C++20 ranges.',
        difficulty: 'advanced',
        estimatedMinutes: 280,
        sections: [
          { id: 's1-iterator-categories', title: 'Iterator Categories', difficulty: 'intermediate', readingMinutes: 22, description: 'Input, output, forward, bidirectional, random access.' },
          { id: 's2-custom-iterators', title: 'Custom Iterators', difficulty: 'advanced', readingMinutes: 28, description: 'Writing your own iterator, iterator traits.' },
          { id: 's3-ranges', title: 'Ranges (C++20)', difficulty: 'advanced', readingMinutes: 28, description: 'Views, range adaptors, lazy evaluation.' },
        ],
      },
    ],
  },
  {
    id: '07-templates',
    title: 'Templates & Generic Programming',
    icon: 'T<>',
    colorHex: '#84cc16',
    description: 'Function and class templates, concepts, SFINAE, and metaprogramming — generic C++.',
    prerequisites: ['06-stl'],
    estimatedHours: 32,
    difficulty: 'advanced',
    chapters: [
      {
        id: 'c1-function-templates',
        title: 'Function Templates',
        description: 'Writing generic functions with template parameters.',
        difficulty: 'intermediate',
        estimatedMinutes: 240,
        sections: [
          { id: 's1-basics', title: 'Template Basics', difficulty: 'intermediate', readingMinutes: 22, description: 'template<typename T>, instantiation, deduction.' },
          { id: 's2-deduction', title: 'Type Deduction', difficulty: 'advanced', readingMinutes: 25, description: 'Template argument deduction, auto, decltype.' },
          { id: 's3-specialization', title: 'Template Specialization', difficulty: 'advanced', readingMinutes: 25, description: 'Full and partial specialization.' },
        ],
      },
      {
        id: 'c2-class-templates',
        title: 'Class Templates',
        description: 'Generic classes, template parameters, and variadic templates.',
        difficulty: 'advanced',
        estimatedMinutes: 280,
        sections: [
          { id: 's1-class-templates', title: 'Class Templates', difficulty: 'intermediate', readingMinutes: 25, description: 'Defining generic classes, member function templates.' },
          { id: 's2-template-params', title: 'Template Parameters', difficulty: 'advanced', readingMinutes: 22, description: 'Type, non-type, and template template parameters.' },
          { id: 's3-variadic', title: 'Variadic Templates', difficulty: 'advanced', readingMinutes: 28, description: 'Parameter packs, fold expressions.' },
        ],
      },
      {
        id: 'c3-concepts',
        title: 'Concepts (C++20)',
        description: 'Constraining templates with concepts and requires clauses.',
        difficulty: 'advanced',
        estimatedMinutes: 240,
        sections: [
          { id: 's1-concepts-basics', title: 'Concepts Basics', difficulty: 'advanced', readingMinutes: 25, description: 'Defining and using concepts.' },
          { id: 's2-requires', title: 'requires Clauses', difficulty: 'advanced', readingMinutes: 22, description: 'requires expressions, compound requirements.' },
          { id: 's3-standard-concepts', title: 'Standard Concepts', difficulty: 'advanced', readingMinutes: 20, description: 'std::integral, std::floating_point, std::copyable, etc.' },
        ],
      },
      {
        id: 'c4-metaprogramming',
        title: 'Template Metaprogramming',
        description: 'SFINAE, type traits, constexpr — compile-time programming.',
        difficulty: 'advanced',
        estimatedMinutes: 300,
        sections: [
          { id: 's1-sfinae', title: 'SFINAE', difficulty: 'advanced', readingMinutes: 28, description: 'Substitution Failure Is Not An Error — enabling/disabling overloads.' },
          { id: 's2-type-traits', title: 'Type Traits', difficulty: 'advanced', readingMinutes: 25, description: 'std::is_integral, std::enable_if, type transformations.' },
          { id: 's3-constexpr', title: 'constexpr Programming', difficulty: 'advanced', readingMinutes: 25, description: 'Compile-time computation, constexpr functions and variables.' },
        ],
      },
    ],
  },
  {
    id: '08-modern-cpp',
    title: 'Modern C++',
    icon: '⟹',
    colorHex: '#10b981',
    description: 'C++11 through C++23 features — move semantics, smart pointers, structured bindings, modules, and more.',
    prerequisites: ['05-memory', '07-templates'],
    estimatedHours: 35,
    difficulty: 'advanced',
    chapters: [
      {
        id: 'c1-move-semantics',
        title: 'Move Semantics',
        description: 'Move constructors, move assignment, std::move — efficient resource transfer.',
        difficulty: 'advanced',
        estimatedMinutes: 280,
        sections: [
          { id: 's1-move-constructor', title: 'Move Constructor', difficulty: 'advanced', readingMinutes: 28, description: 'Defining move constructors, resource stealing.' },
          { id: 's2-move-assignment', title: 'Move Assignment', difficulty: 'advanced', readingMinutes: 25, description: 'Move assignment operator, self-assignment.' },
          { id: 's3-std-move', title: 'std::move & std::forward', difficulty: 'advanced', readingMinutes: 28, description: 'Casting to rvalue, perfect forwarding.' },
        ],
      },
      {
        id: 'c2-smart-pointers',
        title: 'Smart Pointers Deep Dive',
        description: 'unique_ptr, shared_ptr, weak_ptr — ownership models in detail.',
        difficulty: 'advanced',
        estimatedMinutes: 280,
        sections: [
          { id: 's1-unique-ptr', title: 'std::unique_ptr', difficulty: 'intermediate', readingMinutes: 25, description: 'Exclusive ownership, custom deleters, make_unique.' },
          { id: 's2-shared-ptr', title: 'std::shared_ptr', difficulty: 'advanced', readingMinutes: 28, description: 'Shared ownership, reference counting, control block.' },
          { id: 's3-weak-ptr', title: 'std::weak_ptr', difficulty: 'advanced', readingMinutes: 22, description: 'Breaking cycles, observer pattern.' },
        ],
      },
      {
        id: 'c3-cpp17',
        title: 'C++17 Features',
        description: 'Structured bindings, optional, variant, any, filesystem.',
        difficulty: 'advanced',
        estimatedMinutes: 280,
        sections: [
          { id: 's1-structured-bindings', title: 'Structured Bindings', difficulty: 'intermediate', readingMinutes: 18, description: 'auto [a, b] = pair — decomposing return values.' },
          { id: 's2-optional-variant', title: 'optional, variant, any', difficulty: 'advanced', readingMinutes: 28, description: 'Vocabulary types for nullable, union, and type-erased values.' },
          { id: 's3-string-view', title: 'std::string_view', difficulty: 'intermediate', readingMinutes: 18, description: 'Non-owning string references, performance benefits.' },
        ],
      },
      {
        id: 'c4-cpp20',
        title: 'C++20 Features',
        description: 'Modules, coroutines, ranges, three-way comparison.',
        difficulty: 'advanced',
        estimatedMinutes: 320,
        sections: [
          { id: 's1-modules', title: 'Modules', difficulty: 'advanced', readingMinutes: 28, description: 'import/export, module units, replacing headers.' },
          { id: 's2-coroutines', title: 'Coroutines', difficulty: 'advanced', readingMinutes: 35, description: 'co_await, co_yield, co_return — lazy generators.' },
          { id: 's3-spaceship', title: 'Three-Way Comparison', difficulty: 'intermediate', readingMinutes: 18, description: 'operator<=> — simplifying comparison operators.' },
        ],
      },
      {
        id: 'c5-cpp23',
        title: 'C++23 Features',
        description: 'std::expected, deducing this, std::print, and more.',
        difficulty: 'advanced',
        estimatedMinutes: 240,
        sections: [
          { id: 's1-expected', title: 'std::expected', difficulty: 'advanced', readingMinutes: 22, description: 'Error handling without exceptions.' },
          { id: 's2-deducing-this', title: 'Deducing this', difficulty: 'advanced', readingMinutes: 25, description: 'Explicit object parameter, CRTP replacement.' },
          { id: 's3-std-print', title: 'std::print', difficulty: 'intermediate', readingMinutes: 15, description: 'Modern formatted output, replacing printf and cout.' },
        ],
      },
    ],
  },
  {
    id: '09-concurrency',
    title: 'Concurrency & Parallelism',
    icon: '⇶',
    colorHex: '#14b8a6',
    description: 'Threads, mutexes, async, atomics, and lock-free programming — concurrent C++.',
    prerequisites: ['05-memory', '08-modern-cpp'],
    estimatedHours: 30,
    difficulty: 'advanced',
    chapters: [
      {
        id: 'c1-threads',
        title: 'Threads',
        description: 'Creating and managing threads with std::thread and std::jthread.',
        difficulty: 'advanced',
        estimatedMinutes: 260,
        sections: [
          { id: 's1-thread-basics', title: 'std::thread Basics', difficulty: 'intermediate', readingMinutes: 25, description: 'Creating threads, join, detach.' },
          { id: 's2-jthread', title: 'std::jthread (C++20)', difficulty: 'advanced', readingMinutes: 20, description: 'RAII threads, stop tokens, cooperative cancellation.' },
          { id: 's3-thread-local', title: 'Thread-Local Storage', difficulty: 'advanced', readingMinutes: 18, description: 'thread_local keyword, per-thread state.' },
        ],
      },
      {
        id: 'c2-synchronization',
        title: 'Synchronization',
        description: 'Mutexes, locks, condition variables — protecting shared data.',
        difficulty: 'advanced',
        estimatedMinutes: 280,
        sections: [
          { id: 's1-mutex', title: 'Mutex & Lock Guard', difficulty: 'intermediate', readingMinutes: 25, description: 'std::mutex, lock_guard, unique_lock.' },
          { id: 's2-condition-vars', title: 'Condition Variables', difficulty: 'advanced', readingMinutes: 25, description: 'condition_variable, wait/notify patterns.' },
          { id: 's3-deadlock', title: 'Avoiding Deadlocks', difficulty: 'advanced', readingMinutes: 22, description: 'std::scoped_lock, lock ordering, lock-free alternatives.' },
        ],
      },
      {
        id: 'c3-async',
        title: 'Async Programming',
        description: 'Futures, promises, and std::async for asynchronous execution.',
        difficulty: 'advanced',
        estimatedMinutes: 240,
        sections: [
          { id: 's1-future-promise', title: 'Futures & Promises', difficulty: 'advanced', readingMinutes: 25, description: 'std::future, std::promise — one-shot channels.' },
          { id: 's2-async', title: 'std::async', difficulty: 'intermediate', readingMinutes: 22, description: 'Launch policies, deferred vs async execution.' },
          { id: 's3-packaged-task', title: 'Packaged Tasks', difficulty: 'advanced', readingMinutes: 20, description: 'std::packaged_task — wrapping callables for async.' },
        ],
      },
      {
        id: 'c4-atomics',
        title: 'Atomics & Memory Ordering',
        description: 'Atomic types, memory orders, and lock-free programming.',
        difficulty: 'advanced',
        estimatedMinutes: 300,
        sections: [
          { id: 's1-atomic-types', title: 'Atomic Types', difficulty: 'advanced', readingMinutes: 25, description: 'std::atomic, load/store, compare-and-swap.' },
          { id: 's2-memory-order', title: 'Memory Ordering', difficulty: 'advanced', readingMinutes: 30, description: 'seq_cst, acquire, release, relaxed — the C++ memory model.' },
          { id: 's3-lock-free', title: 'Lock-Free Programming', difficulty: 'advanced', readingMinutes: 28, description: 'Lock-free stack, ABA problem, hazard pointers.' },
        ],
      },
    ],
  },
  {
    id: '10-advanced',
    title: 'Advanced Topics',
    icon: '⚙',
    colorHex: '#0ea5e9',
    description: 'Design patterns, compile-time programming, undefined behavior, and performance optimization.',
    prerequisites: ['07-templates', '08-modern-cpp'],
    estimatedHours: 28,
    difficulty: 'advanced',
    chapters: [
      {
        id: 'c1-design-patterns',
        title: 'C++ Design Patterns',
        description: 'CRTP, Pimpl, type erasure, and other C++-specific patterns.',
        difficulty: 'advanced',
        estimatedMinutes: 280,
        sections: [
          { id: 's1-crtp', title: 'CRTP', difficulty: 'advanced', readingMinutes: 25, description: 'Curiously Recurring Template Pattern — static polymorphism.' },
          { id: 's2-pimpl', title: 'Pimpl Idiom', difficulty: 'intermediate', readingMinutes: 20, description: 'Pointer to implementation — ABI stability, compilation firewall.' },
          { id: 's3-type-erasure', title: 'Type Erasure', difficulty: 'advanced', readingMinutes: 28, description: 'std::function, std::any — runtime polymorphism without inheritance.' },
        ],
      },
      {
        id: 'c2-compile-time',
        title: 'Compile-Time Programming',
        description: 'constexpr, consteval, static_assert — moving work to compile time.',
        difficulty: 'advanced',
        estimatedMinutes: 260,
        sections: [
          { id: 's1-constexpr-deep', title: 'constexpr Deep Dive', difficulty: 'advanced', readingMinutes: 28, description: 'constexpr functions, if constexpr, constexpr containers.' },
          { id: 's2-consteval', title: 'consteval & constinit', difficulty: 'advanced', readingMinutes: 22, description: 'Immediate functions, constant initialization.' },
          { id: 's3-static-assert', title: 'Static Assertions', difficulty: 'intermediate', readingMinutes: 15, description: 'static_assert — compile-time validation.' },
        ],
      },
      {
        id: 'c3-undefined-behavior',
        title: 'Undefined Behavior',
        description: 'Common UB sources, sanitizers, and safe coding practices.',
        difficulty: 'advanced',
        estimatedMinutes: 260,
        sections: [
          { id: 's1-common-ub', title: 'Common UB Sources', difficulty: 'intermediate', readingMinutes: 25, description: 'Dangling references, buffer overflow, signed overflow, use-after-free.' },
          { id: 's2-sanitizers', title: 'Sanitizers & Tools', difficulty: 'intermediate', readingMinutes: 22, description: 'ASan, UBSan, TSan, MSan — detecting UB at runtime.' },
          { id: 's3-safe-coding', title: 'Safe Coding Practices', difficulty: 'advanced', readingMinutes: 22, description: 'C++ Core Guidelines, safe alternatives, defensive programming.' },
        ],
      },
      {
        id: 'c4-performance',
        title: 'Performance',
        description: 'Cache efficiency, SIMD, profiling, and optimization techniques.',
        difficulty: 'advanced',
        estimatedMinutes: 300,
        sections: [
          { id: 's1-cache', title: 'Cache Efficiency', difficulty: 'advanced', readingMinutes: 28, description: 'Cache lines, data-oriented design, struct of arrays.' },
          { id: 's2-simd', title: 'SIMD Basics', difficulty: 'advanced', readingMinutes: 25, description: 'SSE/AVX intrinsics, auto-vectorization.' },
          { id: 's3-profiling', title: 'Profiling & Benchmarking', difficulty: 'intermediate', readingMinutes: 22, description: 'perf, Valgrind, Google Benchmark, micro-benchmarking.' },
        ],
      },
    ],
  },
];

/**
 * Get a subject by ID.
 */
export function getCurriculumById(subjectId) {
  return CURRICULUM.find((s) => s.id === subjectId) || null;
}

/**
 * Get a chapter by subjectId and chapterId.
 */
export function getChapterById(subjectId, chapterId) {
  const subject = getCurriculumById(subjectId);
  if (!subject) return null;
  return subject.chapters.find((c) => c.id === chapterId) || null;
}

/**
 * Get a section by subjectId, chapterId, sectionId.
 */
export function getSectionById(subjectId, chapterId, sectionId) {
  const chapter = getChapterById(subjectId, chapterId);
  if (!chapter) return null;
  return chapter.sections.find((s) => s.id === sectionId) || null;
}

/**
 * Get total section count for a subject.
 */
export function getSubjectSectionCount(subjectId) {
  const subject = getCurriculumById(subjectId);
  if (!subject) return 0;
  return subject.chapters.reduce((acc, ch) => acc + (ch.sections?.length || 0), 0);
}

/**
 * Get adjacent sections (prev/next) across the entire curriculum.
 * Returns { prev, next } where each has { title, subjectId, chapterId, sectionId, subjectTitle? } or null.
 */
export function getAdjacentSections(subjectId, chapterId, sectionId) {
  const flat = [];
  for (const subject of CURRICULUM) {
    for (const ch of subject.chapters) {
      for (const sec of ch.sections || []) {
        flat.push({
          title: sec.title,
          subjectId: subject.id,
          subjectTitle: subject.title,
          chapterId: ch.id,
          sectionId: sec.id,
        });
      }
    }
  }

  const idx = flat.findIndex(
    (s) => s.subjectId === subjectId && s.chapterId === chapterId && s.sectionId === sectionId
  );

  if (idx === -1) return { prev: null, next: null };

  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;

  if (prev && prev.subjectId !== subjectId) {
    prev.crossesSubject = true;
  }
  if (next && next.subjectId !== subjectId) {
    next.crossesSubject = true;
  }

  return { prev, next };
}

/**
 * Resolve a buildsOn path string into a full section reference.
 */
export function resolveBuildsOn(buildsOnPath) {
  if (!buildsOnPath) return null;
  const parts = buildsOnPath.split('/');
  if (parts.length !== 3) return null;

  const [subjId, chapId, secId] = parts;
  const subject = getCurriculumById(subjId);
  if (!subject) return null;
  const chapter = subject.chapters.find((c) => c.id === chapId);
  if (!chapter) return null;
  const section = chapter.sections?.find((s) => s.id === secId);
  if (!section) return null;

  return {
    title: section.title,
    subjectId: subjId,
    subjectTitle: subject.title,
    chapterId: chapId,
    chapterTitle: chapter.title,
    sectionId: secId,
  };
}

export default CURRICULUM;
