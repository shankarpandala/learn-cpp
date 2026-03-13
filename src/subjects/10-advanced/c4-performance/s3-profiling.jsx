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

export default function S3Profiling() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Profiling is the practice of measuring where your program spends its time and resources.
        Without profiling, optimization is guesswork. The golden rule of performance work is:
        measure first, optimize second, and measure again to verify improvement.
      </p>

      <DefinitionBlock title="Profiling">
        <p>
          Profiling is the dynamic analysis of a program to measure its runtime behavior: which
          functions consume the most CPU time, how memory is allocated, how the cache is utilized,
          and where bottlenecks exist. Profilers can be sampling-based (low overhead, statistical)
          or instrumentation-based (precise, higher overhead).
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Linux perf</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        <code>perf</code> is a powerful Linux profiling tool that uses hardware performance counters.
        It has minimal overhead and works on any compiled program.
      </p>

      <SyntaxBlock title="Common perf Commands">
        <p>Use <code>perf</code> to record and analyze program performance.</p>
        <CppCode>{`# Basic statistics
perf stat ./my_program

# Record profile (sampling)
perf record -g ./my_program

# View report
perf report

# Count specific events
perf stat -e cache-misses,cache-references,instructions,cycles ./my_program`}</CppCode>
      </SyntaxBlock>

      <OutputBlock>{`Performance counter stats for './my_program':
      1,234,567,890  cycles
      2,345,678,901  instructions   #  1.90 insn per cycle
         12,345,678  cache-references
            123,456  cache-misses   #  1.00% of all cache refs
       0.543212345 seconds time elapsed`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Valgrind and Callgrind</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Callgrind (part of Valgrind) simulates the CPU and cache, providing exact instruction counts
        and call graphs. It is slower than sampling profilers but gives deterministic results.
      </p>

      <CppCode title="Using Valgrind/Callgrind">{`# Run under Callgrind
valgrind --tool=callgrind ./my_program

# View results with KCachegrind (GUI)
kcachegrind callgrind.out.12345

# Or use callgrind_annotate (CLI)
callgrind_annotate callgrind.out.12345`}</CppCode>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Google Benchmark</h2>

      <CppCode title="Micro-benchmarking with Google Benchmark">{`#include <benchmark/benchmark.h>
#include <vector>
#include <algorithm>
#include <numeric>

static void BM_VectorSort(benchmark::State& state) {
    for (auto _ : state) {
        std::vector<int> v(state.range(0));
        std::iota(v.rbegin(), v.rend(), 0);  // Reverse sorted
        std::sort(v.begin(), v.end());
        benchmark::DoNotOptimize(v.data());
    }
    state.SetComplexityN(state.range(0));
}
BENCHMARK(BM_VectorSort)
    ->Range(1 << 10, 1 << 20)
    ->Complexity(benchmark::oNLogN);

static void BM_VectorPushBack(benchmark::State& state) {
    for (auto _ : state) {
        std::vector<int> v;
        for (int i = 0; i < state.range(0); ++i) {
            v.push_back(i);
        }
        benchmark::DoNotOptimize(v.data());
    }
}
BENCHMARK(BM_VectorPushBack)->Range(1 << 10, 1 << 18);

BENCHMARK_MAIN();`}</CppCode>

      <OutputBlock>{`-------------------------------------------------------
Benchmark                Time       CPU   Iterations
-------------------------------------------------------
BM_VectorSort/1024     45.2 us   45.1 us      15432
BM_VectorSort/32768     1.89 ms   1.88 ms        372
BM_VectorSort/1048576    78.4 ms   78.2 ms          9
BM_VectorPushBack/1024  3.21 us   3.20 us     218750
BM_VectorPushBack/262144  892 us    891 us        785`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Micro-Benchmarking Pitfalls</h2>

      <WarningBlock title="Common Benchmarking Mistakes">
        <p>
          The compiler may optimize away code with no observable side effects. Always use
          <code> benchmark::DoNotOptimize()</code> or <code>volatile</code> to prevent dead code
          elimination. Beware of CPU frequency scaling, thermal throttling, and background processes.
          Run benchmarks multiple times and report stable statistics.
        </p>
      </WarningBlock>

      <NoteBlock type="tip" title="Optimization Workflow">
        <p>
          1. Write correct code first. 2. Profile to find the actual bottleneck. 3. Optimize only
          the bottleneck. 4. Measure to verify improvement. 5. Repeat. Never optimize without data.
          The slowest part of your program is often not where you expect it.
        </p>
      </NoteBlock>

      <NoteBlock type="info" title="Compile with Debug Info for Profiling">
        <p>
          Use <code>-g -O2</code> when profiling. The <code>-g</code> flag adds debug symbols so
          profiler output shows function names and line numbers. The <code>-O2</code> flag ensures
          realistic optimization. Avoid <code>-O0</code> for profiling as it does not represent
          production performance.
        </p>
      </NoteBlock>

      <BestPracticeBlock title="Profile before optimizing">
        <p>
          Never guess where the bottleneck is. Use <code>perf</code> for a quick overview, Callgrind
          for detailed analysis, and Google Benchmark for comparing specific implementations.
          Optimize the measured hotspot, not the code you assume is slow.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Write a Google Benchmark"
        difficulty="intermediate"
        prompt="Write a Google Benchmark comparing std::vector<int> linear search (std::find) vs binary search (std::lower_bound on a sorted vector) for a container of 100,000 elements."
        hints={[
          "Create the vector in the benchmark setup, before the State loop",
          "Sort the vector for binary search",
          "Use benchmark::DoNotOptimize on the result to prevent optimization",
          "Use state.range(0) to parameterize the search target",
        ]}
        solution={
          <CppCode>{`#include <benchmark/benchmark.h>
#include <vector>
#include <algorithm>
#include <numeric>

static void BM_LinearSearch(benchmark::State& state) {
    std::vector<int> v(100000);
    std::iota(v.begin(), v.end(), 0);
    int target = 99999;  // Worst case
    for (auto _ : state) {
        auto it = std::find(v.begin(), v.end(), target);
        benchmark::DoNotOptimize(it);
    }
}
BENCHMARK(BM_LinearSearch);

static void BM_BinarySearch(benchmark::State& state) {
    std::vector<int> v(100000);
    std::iota(v.begin(), v.end(), 0);  // Already sorted
    int target = 99999;
    for (auto _ : state) {
        auto it = std::lower_bound(v.begin(), v.end(), target);
        benchmark::DoNotOptimize(it);
    }
}
BENCHMARK(BM_BinarySearch);

BENCHMARK_MAIN();`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'article', title: 'perf Tutorial', url: 'https://perf.wiki.kernel.org/index.php/Tutorial', description: 'Official Linux perf tutorial' },
        { type: 'article', title: 'Google Benchmark', url: 'https://github.com/google/benchmark', description: 'Micro-benchmarking library for C++' },
        { type: 'article', title: 'Valgrind / Callgrind', url: 'https://valgrind.org/docs/manual/cl-manual.html', description: 'Callgrind cache and call-graph profiler' },
      ]} />
    </div>
  )
}
