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

export default function S2Simd() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        SIMD (Single Instruction, Multiple Data) allows a single CPU instruction to operate on
        multiple data elements simultaneously. Modern x86 processors support SSE (128-bit) and
        AVX (256/512-bit) instruction sets, enabling significant speedups for data-parallel
        computations like vector math, image processing, and scientific computing.
      </p>

      <DefinitionBlock title="SIMD (Single Instruction, Multiple Data)">
        <p>
          SIMD is a parallel processing model where one instruction operates on multiple data points
          simultaneously. For example, an SSE instruction can add four 32-bit floats in a single
          operation, achieving up to 4x throughput compared to scalar code.
        </p>
      </DefinitionBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Auto-Vectorization</h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Modern compilers can automatically convert scalar loops into SIMD instructions. Writing
        simple, regular loops with no dependencies helps the compiler auto-vectorize.
      </p>

      <CppCode title="Auto-vectorizable loop">{`#include <iostream>
#include <vector>
#include <chrono>

// This loop is easily auto-vectorizable
void addArrays(const float* a, const float* b, float* c, int n) {
    for (int i = 0; i < n; ++i) {
        c[i] = a[i] + b[i];
    }
}

// This loop is harder to auto-vectorize (data dependency)
void prefixSum(const float* input, float* output, int n) {
    output[0] = input[0];
    for (int i = 1; i < n; ++i) {
        output[i] = output[i - 1] + input[i];  // Loop-carried dependency
    }
}

int main() {
    const int N = 1000000;
    std::vector<float> a(N, 1.0f), b(N, 2.0f), c(N);

    auto t1 = std::chrono::high_resolution_clock::now();
    addArrays(a.data(), b.data(), c.data(), N);
    auto t2 = std::chrono::high_resolution_clock::now();

    auto us = std::chrono::duration<double, std::micro>(t2 - t1).count();
    std::cout << "addArrays: " << us << " us\\n";
    std::cout << "c[0] = " << c[0] << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`addArrays: 312.5 us
c[0] = 3`}</OutputBlock>

      <CompilerNoteBlock compiler="all" title="Compiler Flags for Vectorization">
        <p>
          Enable auto-vectorization with: <code>-O2</code> or <code>-O3</code> for optimization,
          <code> -march=native</code> for CPU-specific instructions, <code>-ftree-vectorize</code> (GCC),
          <code> -fvectorize</code> (Clang). Use <code>-fopt-info-vec-optimized</code> (GCC) or
          <code> -Rpass=loop-vectorize</code> (Clang) to see which loops were vectorized.
        </p>
      </CompilerNoteBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">SSE/AVX Intrinsics</h2>

      <SyntaxBlock title="Using Intrinsics Directly">
        <p>
          Intrinsics are compiler-provided functions that map directly to SIMD instructions.
          They offer fine-grained control when auto-vectorization is insufficient.
        </p>
        <CppCode>{`#include <immintrin.h>  // SSE, AVX, AVX2, AVX-512`}</CppCode>
      </SyntaxBlock>

      <CppCode title="SSE float addition with intrinsics">{`#include <immintrin.h>
#include <iostream>

void addArraysSSE(const float* a, const float* b, float* c, int n) {
    int i = 0;
    // Process 4 floats at a time with SSE
    for (; i + 3 < n; i += 4) {
        __m128 va = _mm_loadu_ps(&a[i]);  // Load 4 floats from a
        __m128 vb = _mm_loadu_ps(&b[i]);  // Load 4 floats from b
        __m128 vc = _mm_add_ps(va, vb);   // Add 4 floats at once
        _mm_storeu_ps(&c[i], vc);         // Store 4 results
    }
    // Handle remaining elements
    for (; i < n; ++i) {
        c[i] = a[i] + b[i];
    }
}

int main() {
    float a[] = {1, 2, 3, 4, 5, 6};
    float b[] = {10, 20, 30, 40, 50, 60};
    float c[6];

    addArraysSSE(a, b, c, 6);

    for (int i = 0; i < 6; ++i) {
        std::cout << c[i] << " ";
    }
    std::cout << "\\n";
    return 0;
}`}</CppCode>

      <OutputBlock>{`11 22 33 44 55 66`}</OutputBlock>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Data Alignment for SIMD</h2>

      <NoteBlock type="important" title="Aligned vs Unaligned Loads">
        <p>
          Aligned loads (<code>_mm_load_ps</code>) require 16-byte alignment and are slightly faster.
          Unaligned loads (<code>_mm_loadu_ps</code>) work with any alignment but may be slower on
          older hardware. Use <code>alignas(16)</code> or <code>alignas(32)</code> to align data.
        </p>
      </NoteBlock>

      <CppCode title="Aligned data allocation">{`#include <cstdlib>
#include <new>

// Stack alignment
alignas(32) float aligned_array[256];

// Heap alignment (C++17)
float* aligned_heap = static_cast<float*>(
    ::operator new(256 * sizeof(float), std::align_val_t(32))
);
// Don't forget: ::operator delete(aligned_heap, std::align_val_t(32));`}</CppCode>

      <WarningBlock title="Portability">
        <p>
          SSE/AVX intrinsics are x86-specific. For portable SIMD, consider compiler auto-vectorization,
          libraries like Highway (Google) or xsimd, or the upcoming <code>std::simd</code> (C++26).
          Always provide a scalar fallback.
        </p>
      </WarningBlock>

      <BestPracticeBlock title="Prefer auto-vectorization over intrinsics">
        <p>
          Write clean, simple loops and let the compiler vectorize. Resort to intrinsics only when
          auto-vectorization fails and profiling confirms a bottleneck. Always verify vectorization
          with compiler reports, and benchmark to confirm actual speedup.
        </p>
      </BestPracticeBlock>

      <ExerciseBlock
        title="Vectorize a Dot Product"
        difficulty="advanced"
        prompt="Write a function that computes the dot product of two float arrays. First write a scalar version, then an SSE version using _mm_mul_ps and _mm_add_ps. Compare their outputs."
        hints={[
          "The scalar version multiplies and accumulates element by element",
          "Use _mm_setzero_ps() to initialize an SSE accumulator",
          "After the SIMD loop, horizontally sum the 4 floats in the accumulator",
          "Use _mm_hadd_ps or store to an array and sum manually",
        ]}
        solution={
          <CppCode>{`#include <immintrin.h>
#include <iostream>

float dotScalar(const float* a, const float* b, int n) {
    float sum = 0.0f;
    for (int i = 0; i < n; ++i) sum += a[i] * b[i];
    return sum;
}

float dotSSE(const float* a, const float* b, int n) {
    __m128 vsum = _mm_setzero_ps();
    int i = 0;
    for (; i + 3 < n; i += 4) {
        __m128 va = _mm_loadu_ps(&a[i]);
        __m128 vb = _mm_loadu_ps(&b[i]);
        vsum = _mm_add_ps(vsum, _mm_mul_ps(va, vb));
    }
    // Horizontal sum
    float tmp[4];
    _mm_storeu_ps(tmp, vsum);
    float sum = tmp[0] + tmp[1] + tmp[2] + tmp[3];
    for (; i < n; ++i) sum += a[i] * b[i];
    return sum;
}

int main() {
    float a[] = {1, 2, 3, 4, 5};
    float b[] = {2, 3, 4, 5, 6};
    std::cout << "Scalar: " << dotScalar(a, b, 5) << "\\n";
    std::cout << "SSE:    " << dotSSE(a, b, 5) << "\\n";
    return 0;
}`}</CppCode>
        }
      />

      <ReferenceList references={[
        { type: 'article', title: 'Intel Intrinsics Guide', url: 'https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html', description: 'Complete reference for SSE/AVX intrinsics' },
        { type: 'article', title: 'Auto-vectorization in GCC', url: 'https://gcc.gnu.org/projects/tree-ssa/vectorization.html', description: 'GCC auto-vectorization documentation' },
        { type: 'article', title: 'Highway SIMD Library', url: 'https://github.com/google/highway', author: 'Google', description: 'Portable SIMD library for C++' },
      ]} />
    </div>
  )
}
