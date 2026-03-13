import React from 'react'
import CppCode from '../../../components/content/CppCode.jsx'
import OutputBlock from '../../../components/content/OutputBlock.jsx'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import BestPracticeBlock from '../../../components/content/BestPracticeBlock.jsx'
import ExerciseBlock from '../../../components/content/ExerciseBlock.jsx'
import WarningBlock from '../../../components/content/WarningBlock.jsx'
import ReferenceList from '../../../components/content/ReferenceList.jsx'

export default function S1Cache() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Modern CPUs are orders of magnitude faster than main memory. CPU caches bridge this gap by
        keeping frequently accessed data close to the processor. Understanding cache behavior is
        essential for writing high-performance C++ code, as poor data locality can cause 10-100x
        slowdowns compared to cache-friendly code.
      </p>

      <DefinitionBlock title="Cache Line">
        <p>
          A cache line is the smallest unit of data transferred between main memory and the CPU cache,
          typically 64 bytes on modern x86 processors. When you access a single byte, the entire
          64-byte cache line containing it is loaded. Accessing nearby data in the same cache line
          is essentially free.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Data Locality and Traversal Order</h2>

      <CppCode title="Row-major vs column-major traversal">{`#include <iostream>
#include <chrono>

const int N = 4096;
int matrix[N][N];

void rowMajor() {
    // Cache-friendly: accesses contiguous memory
    for (int i = 0; i < N; ++i)
        for (int j = 0; j < N; ++j)
            matrix[i][j] = i + j;
}

void colMajor() {
    // Cache-hostile: jumps N*sizeof(int) bytes per access
    for (int j = 0; j < N; ++j)
        for (int i = 0; i < N; ++i)
            matrix[i][j] = i + j;
}

int main() {
    auto t1 = std::chrono::high_resolution_clock::now();
    rowMajor();
    auto t2 = std::chrono::high_resolution_clock::now();
    colMajor();
    auto t3 = std::chrono::high_resolution_clock::now();

    auto row_ms = std::chrono::duration<double, std::milli>(t2 - t1).count();
    auto col_ms = std::chrono::duration<double, std::milli>(t3 - t2).count();

    std::cout << "Row-major: " << row_ms << " ms\\n";
    std::cout << "Col-major: " << col_ms << " ms\\n";
    std::cout << "Ratio: " << col_ms / row_ms << "x slower\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`Row-major: 12.3 ms
Col-major: 85.7 ms
Ratio: 6.97x slower`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Struct of Arrays vs Array of Structs</h2>

      <CppCode title="AoS vs SoA layouts">{`#include <iostream>
#include <vector>
#include <chrono>

// Array of Structs (AoS) - traditional OOP layout
struct ParticleAoS {
    float x, y, z;       // position
    float vx, vy, vz;    // velocity
    float mass;
    int type;            // 32 bytes per particle
};
std::vector<ParticleAoS> particlesAoS(1000000);

// Struct of Arrays (SoA) - cache-friendly for bulk operations
struct ParticlesSoA {
    std::vector<float> x, y, z;
    std::vector<float> vx, vy, vz;
    std::vector<float> mass;
    std::vector<int> type;
};

void updatePositionsAoS(std::vector<ParticleAoS>& p, float dt) {
    for (auto& particle : p) {
        particle.x += particle.vx * dt;  // Loads 32-byte struct, uses 8 bytes
        particle.y += particle.vy * dt;
        particle.z += particle.vz * dt;
    }
}

void updatePositionsSoA(ParticlesSoA& p, float dt, size_t n) {
    for (size_t i = 0; i < n; ++i) {
        p.x[i] += p.vx[i] * dt;  // Contiguous float arrays, fully utilized
        p.y[i] += p.vy[i] * dt;
        p.z[i] += p.vz[i] * dt;
    }
}

int main() {
    std::cout << "AoS particle size: " << sizeof(ParticleAoS) << " bytes\\n";
    std::cout << "SoA is faster when processing specific fields in bulk\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`AoS particle size: 32 bytes
SoA is faster when processing specific fields in bulk`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">False Sharing</h2>

      <WarningBlock title="False Sharing in Multithreading">
        <p>
          False sharing occurs when threads on different cores modify variables that reside on the
          same cache line. Each write invalidates the cache line for other cores, causing severe
          performance degradation even though the threads access different variables.
        </p>
      </WarningBlock>

      <CppCode title="Avoiding false sharing with alignment">{`#include <atomic>
#include <new>  // std::hardware_destructive_interference_size

struct alignas(64) AlignedCounter {
    std::atomic<int> value{0};
    // Padding ensures each counter is on its own cache line
};

// C++17: use hardware_destructive_interference_size
// constexpr size_t cacheLineSize =
//     std::hardware_destructive_interference_size;  // Usually 64

AlignedCounter counters[4];  // Each on separate cache line
// Thread 0 increments counters[0], thread 1 increments counters[1], etc.
// No false sharing because each is on its own cache line.`}</CppCode>

      <NoteBlock type="info" title="Measuring Cache Performance">
        <p>
          Use tools like <code>perf stat</code> to measure cache misses: <code>perf stat -e
          cache-misses,cache-references ./program</code>. High cache miss ratios indicate
          poor data locality. Valgrind's <code>cachegrind</code> provides detailed cache simulation.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Design data structures for cache efficiency">
        <p>
          Keep frequently accessed data together. Use contiguous containers (<code>std::vector</code>)
          over node-based ones (<code>std::list</code>). Consider SoA layout for batch processing.
          Avoid pointer-chasing patterns. Align data to cache lines when false sharing is a concern.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Optimize Matrix Sum"
        difficulty="intermediate"
        prompt="Write two functions that sum all elements of a 2D array: one with poor cache behavior (column-major) and one with good cache behavior (row-major). Time them and verify the performance difference."
        hints={[
          "Use a large array (e.g., 2048x2048) to see the difference",
          "Row-major iterates the inner loop over columns",
          "Use std::chrono::high_resolution_clock for timing",
        ]}
        solution={
          <CppCode>{`#include <iostream>
#include <chrono>

const int N = 2048;
int data[N][N];

long long sumRowMajor() {
    long long sum = 0;
    for (int i = 0; i < N; ++i)
        for (int j = 0; j < N; ++j)
            sum += data[i][j];
    return sum;
}

long long sumColMajor() {
    long long sum = 0;
    for (int j = 0; j < N; ++j)
        for (int i = 0; i < N; ++i)
            sum += data[i][j];
    return sum;
}

int main() {
    for (int i = 0; i < N; ++i)
        for (int j = 0; j < N; ++j)
            data[i][j] = 1;

    auto t1 = std::chrono::high_resolution_clock::now();
    auto s1 = sumRowMajor();
    auto t2 = std::chrono::high_resolution_clock::now();
    auto s2 = sumColMajor();
    auto t3 = std::chrono::high_resolution_clock::now();

    using ms = std::chrono::duration<double, std::milli>;
    std::cout << "Row-major: " << ms(t2-t1).count() << " ms\\n";
    std::cout << "Col-major: " << ms(t3-t2).count() << " ms\\n";
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'article', title: 'What Every Programmer Should Know About Memory', url: 'https://people.freebsd.org/~lstewart/articles/cpumemory.pdf', author: 'Ulrich Drepper', description: 'Comprehensive guide to memory and cache performance' },
        { type: 'article', title: 'Data-Oriented Design', url: 'https://www.dataorienteddesign.com/dodbook/', author: 'Richard Fabian', description: 'Book on cache-friendly data structures' },
        { type: 'cppreference', title: 'hardware_destructive_interference_size', url: 'https://en.cppreference.com/w/cpp/thread/hardware_destructive_interference_size', description: 'Cache line size constant' },
      ]} />
    </div>
  )
}
