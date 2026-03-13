import { useParams, Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { getCurriculumById, getChapterById, getSectionById, getAdjacentSections, resolveBuildsOn } from '../subjects/index.js'
import DifficultyBadge from '../components/navigation/DifficultyBadge.jsx'
import PrevNextNav from '../components/navigation/PrevNextNav.jsx'
import Breadcrumbs from '../components/layout/Breadcrumbs.jsx'
import useProgress from '../hooks/useProgress.js'

// Registry of sections that have full content pages written.
const CONTENT_REGISTRY = {
  // 01 - C++ Fundamentals
  '01-fundamentals/c1-getting-started/s1-hello-world': lazy(() => import('../subjects/01-fundamentals/c1-getting-started/s1-hello-world.jsx')),
  '01-fundamentals/c1-getting-started/s2-compilation': lazy(() => import('../subjects/01-fundamentals/c1-getting-started/s2-compilation.jsx')),
  '01-fundamentals/c1-getting-started/s3-program-structure': lazy(() => import('../subjects/01-fundamentals/c1-getting-started/s3-program-structure.jsx')),
  '01-fundamentals/c2-variables-types/s1-basic-types': lazy(() => import('../subjects/01-fundamentals/c2-variables-types/s1-basic-types.jsx')),
  '01-fundamentals/c2-variables-types/s2-variables': lazy(() => import('../subjects/01-fundamentals/c2-variables-types/s2-variables.jsx')),
  '01-fundamentals/c2-variables-types/s3-type-conversions': lazy(() => import('../subjects/01-fundamentals/c2-variables-types/s3-type-conversions.jsx')),
  '01-fundamentals/c3-operators/s1-arithmetic': lazy(() => import('../subjects/01-fundamentals/c3-operators/s1-arithmetic.jsx')),
  '01-fundamentals/c3-operators/s2-comparison-logical': lazy(() => import('../subjects/01-fundamentals/c3-operators/s2-comparison-logical.jsx')),
  '01-fundamentals/c3-operators/s3-bitwise': lazy(() => import('../subjects/01-fundamentals/c3-operators/s3-bitwise.jsx')),
  '01-fundamentals/c4-io/s1-console-io': lazy(() => import('../subjects/01-fundamentals/c4-io/s1-console-io.jsx')),
  '01-fundamentals/c4-io/s2-strings': lazy(() => import('../subjects/01-fundamentals/c4-io/s2-strings.jsx')),
  '01-fundamentals/c4-io/s3-file-io': lazy(() => import('../subjects/01-fundamentals/c4-io/s3-file-io.jsx')),
  // 02 - Control Flow
  '02-control-flow/c1-conditionals/s1-if-else': lazy(() => import('../subjects/02-control-flow/c1-conditionals/s1-if-else.jsx')),
  '02-control-flow/c1-conditionals/s2-switch': lazy(() => import('../subjects/02-control-flow/c1-conditionals/s2-switch.jsx')),
  '02-control-flow/c1-conditionals/s3-ternary': lazy(() => import('../subjects/02-control-flow/c1-conditionals/s3-ternary.jsx')),
  '02-control-flow/c2-loops/s1-for-while': lazy(() => import('../subjects/02-control-flow/c2-loops/s1-for-while.jsx')),
  '02-control-flow/c2-loops/s2-range-for': lazy(() => import('../subjects/02-control-flow/c2-loops/s2-range-for.jsx')),
  '02-control-flow/c2-loops/s3-break-continue': lazy(() => import('../subjects/02-control-flow/c2-loops/s3-break-continue.jsx')),
  '02-control-flow/c3-error-handling/s1-exceptions': lazy(() => import('../subjects/02-control-flow/c3-error-handling/s1-exceptions.jsx')),
  '02-control-flow/c3-error-handling/s2-exception-safety': lazy(() => import('../subjects/02-control-flow/c3-error-handling/s2-exception-safety.jsx')),
  '02-control-flow/c3-error-handling/s3-error-strategies': lazy(() => import('../subjects/02-control-flow/c3-error-handling/s3-error-strategies.jsx')),
  // 03 - Functions
  '03-functions/c1-function-basics/s1-declaration': lazy(() => import('../subjects/03-functions/c1-function-basics/s1-declaration.jsx')),
  '03-functions/c1-function-basics/s2-parameters': lazy(() => import('../subjects/03-functions/c1-function-basics/s2-parameters.jsx')),
  '03-functions/c1-function-basics/s3-return-types': lazy(() => import('../subjects/03-functions/c1-function-basics/s3-return-types.jsx')),
  '03-functions/c2-overloading/s1-overloading': lazy(() => import('../subjects/03-functions/c2-overloading/s1-overloading.jsx')),
  '03-functions/c2-overloading/s2-default-args': lazy(() => import('../subjects/03-functions/c2-overloading/s2-default-args.jsx')),
  '03-functions/c3-advanced-functions/s1-recursion': lazy(() => import('../subjects/03-functions/c3-advanced-functions/s1-recursion.jsx')),
  '03-functions/c3-advanced-functions/s2-function-pointers': lazy(() => import('../subjects/03-functions/c3-advanced-functions/s2-function-pointers.jsx')),
  '03-functions/c3-advanced-functions/s3-lambdas': lazy(() => import('../subjects/03-functions/c3-advanced-functions/s3-lambdas.jsx')),
  // 04 - Object-Oriented Programming
  '04-oop/c1-classes/s1-class-basics': lazy(() => import('../subjects/04-oop/c1-classes/s1-class-basics.jsx')),
  '04-oop/c1-classes/s2-constructors': lazy(() => import('../subjects/04-oop/c1-classes/s2-constructors.jsx')),
  '04-oop/c1-classes/s3-access': lazy(() => import('../subjects/04-oop/c1-classes/s3-access.jsx')),
  '04-oop/c2-inheritance/s1-single': lazy(() => import('../subjects/04-oop/c2-inheritance/s1-single.jsx')),
  '04-oop/c2-inheritance/s2-multiple': lazy(() => import('../subjects/04-oop/c2-inheritance/s2-multiple.jsx')),
  '04-oop/c3-polymorphism/s1-virtual': lazy(() => import('../subjects/04-oop/c3-polymorphism/s1-virtual.jsx')),
  '04-oop/c3-polymorphism/s2-abstract': lazy(() => import('../subjects/04-oop/c3-polymorphism/s2-abstract.jsx')),
  '04-oop/c3-polymorphism/s3-rtti': lazy(() => import('../subjects/04-oop/c3-polymorphism/s3-rtti.jsx')),
  '04-oop/c4-operator-overloading/s1-arithmetic-ops': lazy(() => import('../subjects/04-oop/c4-operator-overloading/s1-arithmetic-ops.jsx')),
  '04-oop/c4-operator-overloading/s2-stream-ops': lazy(() => import('../subjects/04-oop/c4-operator-overloading/s2-stream-ops.jsx')),
  '04-oop/c4-operator-overloading/s3-comparison-ops': lazy(() => import('../subjects/04-oop/c4-operator-overloading/s3-comparison-ops.jsx')),
  // 05 - Memory Management
  '05-memory/c1-pointers/s1-pointer-basics': lazy(() => import('../subjects/05-memory/c1-pointers/s1-pointer-basics.jsx')),
  '05-memory/c1-pointers/s2-pointer-arithmetic': lazy(() => import('../subjects/05-memory/c1-pointers/s2-pointer-arithmetic.jsx')),
  '05-memory/c1-pointers/s3-pointers-arrays': lazy(() => import('../subjects/05-memory/c1-pointers/s3-pointers-arrays.jsx')),
  '05-memory/c2-references/s1-lvalue-refs': lazy(() => import('../subjects/05-memory/c2-references/s1-lvalue-refs.jsx')),
  '05-memory/c2-references/s2-rvalue-refs': lazy(() => import('../subjects/05-memory/c2-references/s2-rvalue-refs.jsx')),
  '05-memory/c2-references/s3-ref-vs-ptr': lazy(() => import('../subjects/05-memory/c2-references/s3-ref-vs-ptr.jsx')),
  '05-memory/c3-dynamic-memory/s1-new-delete': lazy(() => import('../subjects/05-memory/c3-dynamic-memory/s1-new-delete.jsx')),
  '05-memory/c3-dynamic-memory/s2-smart-pointers': lazy(() => import('../subjects/05-memory/c3-dynamic-memory/s2-smart-pointers.jsx')),
  '05-memory/c3-dynamic-memory/s3-raii': lazy(() => import('../subjects/05-memory/c3-dynamic-memory/s3-raii.jsx')),
  '05-memory/c4-memory-model/s1-stack-heap': lazy(() => import('../subjects/05-memory/c4-memory-model/s1-stack-heap.jsx')),
  '05-memory/c4-memory-model/s2-object-layout': lazy(() => import('../subjects/05-memory/c4-memory-model/s2-object-layout.jsx')),
  '05-memory/c4-memory-model/s3-alignment': lazy(() => import('../subjects/05-memory/c4-memory-model/s3-alignment.jsx')),
  // 06 - Standard Template Library
  '06-stl/c1-containers/s1-vector': lazy(() => import('../subjects/06-stl/c1-containers/s1-vector.jsx')),
  '06-stl/c1-containers/s2-array': lazy(() => import('../subjects/06-stl/c1-containers/s2-array.jsx')),
  '06-stl/c1-containers/s3-list-deque': lazy(() => import('../subjects/06-stl/c1-containers/s3-list-deque.jsx')),
  '06-stl/c2-associative/s1-map-set': lazy(() => import('../subjects/06-stl/c2-associative/s1-map-set.jsx')),
  '06-stl/c2-associative/s2-unordered': lazy(() => import('../subjects/06-stl/c2-associative/s2-unordered.jsx')),
  '06-stl/c3-algorithms/s1-sorting': lazy(() => import('../subjects/06-stl/c3-algorithms/s1-sorting.jsx')),
  '06-stl/c3-algorithms/s2-transform': lazy(() => import('../subjects/06-stl/c3-algorithms/s2-transform.jsx')),
  '06-stl/c3-algorithms/s3-algorithm-patterns': lazy(() => import('../subjects/06-stl/c3-algorithms/s3-algorithm-patterns.jsx')),
  '06-stl/c4-iterators/s1-iterator-categories': lazy(() => import('../subjects/06-stl/c4-iterators/s1-iterator-categories.jsx')),
  '06-stl/c4-iterators/s2-custom-iterators': lazy(() => import('../subjects/06-stl/c4-iterators/s2-custom-iterators.jsx')),
  '06-stl/c4-iterators/s3-ranges': lazy(() => import('../subjects/06-stl/c4-iterators/s3-ranges.jsx')),
  // 07 - Templates & Generic Programming
  '07-templates/c1-function-templates/s1-basics': lazy(() => import('../subjects/07-templates/c1-function-templates/s1-basics.jsx')),
  '07-templates/c1-function-templates/s2-deduction': lazy(() => import('../subjects/07-templates/c1-function-templates/s2-deduction.jsx')),
  '07-templates/c1-function-templates/s3-specialization': lazy(() => import('../subjects/07-templates/c1-function-templates/s3-specialization.jsx')),
  '07-templates/c2-class-templates/s1-class-templates': lazy(() => import('../subjects/07-templates/c2-class-templates/s1-class-templates.jsx')),
  '07-templates/c2-class-templates/s2-template-params': lazy(() => import('../subjects/07-templates/c2-class-templates/s2-template-params.jsx')),
  '07-templates/c2-class-templates/s3-variadic': lazy(() => import('../subjects/07-templates/c2-class-templates/s3-variadic.jsx')),
  '07-templates/c3-concepts/s1-concepts-basics': lazy(() => import('../subjects/07-templates/c3-concepts/s1-concepts-basics.jsx')),
  '07-templates/c3-concepts/s2-requires': lazy(() => import('../subjects/07-templates/c3-concepts/s2-requires.jsx')),
  '07-templates/c3-concepts/s3-standard-concepts': lazy(() => import('../subjects/07-templates/c3-concepts/s3-standard-concepts.jsx')),
  '07-templates/c4-metaprogramming/s1-sfinae': lazy(() => import('../subjects/07-templates/c4-metaprogramming/s1-sfinae.jsx')),
  '07-templates/c4-metaprogramming/s2-type-traits': lazy(() => import('../subjects/07-templates/c4-metaprogramming/s2-type-traits.jsx')),
  '07-templates/c4-metaprogramming/s3-constexpr': lazy(() => import('../subjects/07-templates/c4-metaprogramming/s3-constexpr.jsx')),
  // 08 - Modern C++
  '08-modern-cpp/c1-move-semantics/s1-move-constructor': lazy(() => import('../subjects/08-modern-cpp/c1-move-semantics/s1-move-constructor.jsx')),
  '08-modern-cpp/c1-move-semantics/s2-move-assignment': lazy(() => import('../subjects/08-modern-cpp/c1-move-semantics/s2-move-assignment.jsx')),
  '08-modern-cpp/c1-move-semantics/s3-std-move': lazy(() => import('../subjects/08-modern-cpp/c1-move-semantics/s3-std-move.jsx')),
  '08-modern-cpp/c2-smart-pointers/s1-unique-ptr': lazy(() => import('../subjects/08-modern-cpp/c2-smart-pointers/s1-unique-ptr.jsx')),
  '08-modern-cpp/c2-smart-pointers/s2-shared-ptr': lazy(() => import('../subjects/08-modern-cpp/c2-smart-pointers/s2-shared-ptr.jsx')),
  '08-modern-cpp/c2-smart-pointers/s3-weak-ptr': lazy(() => import('../subjects/08-modern-cpp/c2-smart-pointers/s3-weak-ptr.jsx')),
  '08-modern-cpp/c3-cpp17/s1-structured-bindings': lazy(() => import('../subjects/08-modern-cpp/c3-cpp17/s1-structured-bindings.jsx')),
  '08-modern-cpp/c3-cpp17/s2-optional-variant': lazy(() => import('../subjects/08-modern-cpp/c3-cpp17/s2-optional-variant.jsx')),
  '08-modern-cpp/c3-cpp17/s3-string-view': lazy(() => import('../subjects/08-modern-cpp/c3-cpp17/s3-string-view.jsx')),
  '08-modern-cpp/c4-cpp20/s1-modules': lazy(() => import('../subjects/08-modern-cpp/c4-cpp20/s1-modules.jsx')),
  '08-modern-cpp/c4-cpp20/s2-coroutines': lazy(() => import('../subjects/08-modern-cpp/c4-cpp20/s2-coroutines.jsx')),
  '08-modern-cpp/c4-cpp20/s3-spaceship': lazy(() => import('../subjects/08-modern-cpp/c4-cpp20/s3-spaceship.jsx')),
  '08-modern-cpp/c5-cpp23/s1-expected': lazy(() => import('../subjects/08-modern-cpp/c5-cpp23/s1-expected.jsx')),
  '08-modern-cpp/c5-cpp23/s2-deducing-this': lazy(() => import('../subjects/08-modern-cpp/c5-cpp23/s2-deducing-this.jsx')),
  '08-modern-cpp/c5-cpp23/s3-std-print': lazy(() => import('../subjects/08-modern-cpp/c5-cpp23/s3-std-print.jsx')),
  // 09 - Concurrency & Parallelism
  '09-concurrency/c1-threads/s1-thread-basics': lazy(() => import('../subjects/09-concurrency/c1-threads/s1-thread-basics.jsx')),
  '09-concurrency/c1-threads/s2-jthread': lazy(() => import('../subjects/09-concurrency/c1-threads/s2-jthread.jsx')),
  '09-concurrency/c1-threads/s3-thread-local': lazy(() => import('../subjects/09-concurrency/c1-threads/s3-thread-local.jsx')),
  '09-concurrency/c2-synchronization/s1-mutex': lazy(() => import('../subjects/09-concurrency/c2-synchronization/s1-mutex.jsx')),
  '09-concurrency/c2-synchronization/s2-condition-vars': lazy(() => import('../subjects/09-concurrency/c2-synchronization/s2-condition-vars.jsx')),
  '09-concurrency/c2-synchronization/s3-deadlock': lazy(() => import('../subjects/09-concurrency/c2-synchronization/s3-deadlock.jsx')),
  '09-concurrency/c3-async/s1-future-promise': lazy(() => import('../subjects/09-concurrency/c3-async/s1-future-promise.jsx')),
  '09-concurrency/c3-async/s2-async': lazy(() => import('../subjects/09-concurrency/c3-async/s2-async.jsx')),
  '09-concurrency/c3-async/s3-packaged-task': lazy(() => import('../subjects/09-concurrency/c3-async/s3-packaged-task.jsx')),
  '09-concurrency/c4-atomics/s1-atomic-types': lazy(() => import('../subjects/09-concurrency/c4-atomics/s1-atomic-types.jsx')),
  '09-concurrency/c4-atomics/s2-memory-order': lazy(() => import('../subjects/09-concurrency/c4-atomics/s2-memory-order.jsx')),
  '09-concurrency/c4-atomics/s3-lock-free': lazy(() => import('../subjects/09-concurrency/c4-atomics/s3-lock-free.jsx')),
  // 10 - Advanced Topics
  '10-advanced/c1-design-patterns/s1-crtp': lazy(() => import('../subjects/10-advanced/c1-design-patterns/s1-crtp.jsx')),
  '10-advanced/c1-design-patterns/s2-pimpl': lazy(() => import('../subjects/10-advanced/c1-design-patterns/s2-pimpl.jsx')),
  '10-advanced/c1-design-patterns/s3-type-erasure': lazy(() => import('../subjects/10-advanced/c1-design-patterns/s3-type-erasure.jsx')),
  '10-advanced/c2-compile-time/s1-constexpr-deep': lazy(() => import('../subjects/10-advanced/c2-compile-time/s1-constexpr-deep.jsx')),
  '10-advanced/c2-compile-time/s2-consteval': lazy(() => import('../subjects/10-advanced/c2-compile-time/s2-consteval.jsx')),
  '10-advanced/c2-compile-time/s3-static-assert': lazy(() => import('../subjects/10-advanced/c2-compile-time/s3-static-assert.jsx')),
  '10-advanced/c3-undefined-behavior/s1-common-ub': lazy(() => import('../subjects/10-advanced/c3-undefined-behavior/s1-common-ub.jsx')),
  '10-advanced/c3-undefined-behavior/s2-sanitizers': lazy(() => import('../subjects/10-advanced/c3-undefined-behavior/s2-sanitizers.jsx')),
  '10-advanced/c3-undefined-behavior/s3-safe-coding': lazy(() => import('../subjects/10-advanced/c3-undefined-behavior/s3-safe-coding.jsx')),
  '10-advanced/c4-performance/s1-cache': lazy(() => import('../subjects/10-advanced/c4-performance/s1-cache.jsx')),
  '10-advanced/c4-performance/s2-simd': lazy(() => import('../subjects/10-advanced/c4-performance/s2-simd.jsx')),
  '10-advanced/c4-performance/s3-profiling': lazy(() => import('../subjects/10-advanced/c4-performance/s3-profiling.jsx')),
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300 dark:text-blue-700" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function ComingSoonPlaceholder({ section }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-6 rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 px-8 py-16 text-center dark:border-blue-800/40 dark:bg-blue-950/10"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <CodeIcon />
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Content Coming Soon
        </h2>
        <p className="max-w-md text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          The interactive content for{' '}
          <strong className="font-semibold text-gray-700 dark:text-gray-300">
            {section.title}
          </strong>{' '}
          is being prepared. It will include syntax rules, compilable code examples,
          memory visualizations, and exercises.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {['Syntax', 'Code Examples', 'Visualizations', 'Exercises'].map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

function PrerequisiteBanner({ section, subjectId }) {
  if (!section?.buildsOn) return null
  const prereq = resolveBuildsOn(section.buildsOn)
  if (!prereq) return null

  const isSameSubject = prereq.subjectId === subjectId
  const href = `/subjects/${prereq.subjectId}/${prereq.chapterId}/${prereq.sectionId}`

  return (
    <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50/60 px-4 py-3 dark:border-amber-800/40 dark:bg-amber-950/20">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
      <div className="text-sm leading-relaxed text-amber-900 dark:text-amber-200">
        <span className="font-medium">Builds on: </span>
        <Link
          to={href}
          className="underline decoration-amber-400/60 underline-offset-2 hover:decoration-amber-600 dark:decoration-amber-600/60 dark:hover:decoration-amber-400 transition-colors"
        >
          {prereq.title}
        </Link>
        {!isSameSubject && (
          <span className="ml-1 text-amber-700 dark:text-amber-400/80">
            ({prereq.subjectTitle})
          </span>
        )}
      </div>
    </div>
  )
}

function SectionContent({ subjectId, chapterId, sectionId, section }) {
  const key = `${subjectId}/${chapterId}/${sectionId}`
  const ContentComponent = CONTENT_REGISTRY[key]
  if (ContentComponent) {
    return (
      <Suspense fallback={<div className="py-16 text-center text-gray-400">Loading content...</div>}>
        <ContentComponent />
      </Suspense>
    )
  }
  return <ComingSoonPlaceholder section={section} />
}

export default function SectionPage() {
  const { subjectId, chapterId, sectionId } = useParams()
  const { isComplete, markComplete } = useProgress()

  const subject = getCurriculumById(subjectId)
  const chapter = getChapterById(subjectId, chapterId)
  const section = getSectionById(subjectId, chapterId, sectionId)
  const done = isComplete(subjectId, chapterId, sectionId)

  if (!subject || !chapter || !section) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="text-5xl font-mono" aria-hidden="true">&lt;/&gt;</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Section Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Could not find section "{sectionId}".
        </p>
        <Link
          to="/"
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Back to Home
        </Link>
      </div>
    )
  }

  const { prev, next } = getAdjacentSections(subjectId, chapterId, sectionId)

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: subject.title, href: `/subjects/${subjectId}` },
    { label: chapter.title, href: `/subjects/${subjectId}/${chapterId}` },
    { label: section.title },
  ]

  function handleMarkComplete() {
    if (!done) {
      markComplete(subjectId, chapterId, sectionId)
    }
  }

  return (
    <div className="min-h-screen">
      <div
        className="relative border-b border-gray-200 dark:border-gray-800"
        style={{ background: `linear-gradient(135deg, ${subject.colorHex}10 0%, transparent 50%)` }}
      >
        <div
          className="absolute left-0 top-0 h-full w-1.5"
          style={{ backgroundColor: subject.colorHex }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-3xl px-6 py-8 pl-10">
          <Breadcrumbs items={breadcrumbs} />

          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl leading-snug">
              {section.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <DifficultyBadge level={section.difficulty} />
              {section.readingMinutes && (
                <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                  <ClockIcon />
                  {section.readingMinutes} min read
                </span>
              )}
              {done && (
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <CheckIcon />
                  Completed
                </span>
              )}
            </div>

            {section.description && (
              <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                {section.description}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <PrerequisiteBanner section={section} subjectId={subjectId} />

        <SectionContent
          subjectId={subjectId}
          chapterId={chapterId}
          sectionId={sectionId}
          section={section}
        />

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleMarkComplete}
            disabled={done}
            className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
              done
                ? 'cursor-default bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
            }`}
            aria-label={done ? 'Section already marked complete' : 'Mark this section as complete'}
          >
            {done ? (
              <>
                <CheckIcon />
                Marked as Complete
              </>
            ) : (
              'Mark as Complete'
            )}
          </button>
        </div>

        <PrevNextNav prev={prev} next={next} />
      </div>
    </div>
  )
}
