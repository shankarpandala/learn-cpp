import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CURRICULUM, getSubjectSectionCount } from '../subjects/index.js'
import SubjectCard from '../components/navigation/SubjectCard.jsx'
import useProgress from '../hooks/useProgress.js'

const CPP_SYMBOLS = ['<>', '{}', '*&', '::', '->','<<', '&&', '[]']

const FLOATING_POSITIONS = [
  { top: '12%', left: '8%', size: '3rem', delay: 0 },
  { top: '25%', right: '10%', size: '2.5rem', delay: 0.4 },
  { top: '60%', left: '5%', size: '2rem', delay: 0.8 },
  { bottom: '20%', right: '8%', size: '3.5rem', delay: 0.2 },
  { top: '45%', right: '20%', size: '2rem', delay: 1.1 },
  { top: '15%', left: '40%', size: '1.5rem', delay: 0.6 },
  { bottom: '30%', left: '18%', size: '2.5rem', delay: 0.9 },
  { top: '70%', right: '30%', size: '1.8rem', delay: 0.3 },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const LEARNING_PATH = [
  {
    step: 1,
    title: 'Foundations',
    subjects: ['C++ Fundamentals', 'Control Flow', 'Functions'],
    color: '#3b82f6',
  },
  {
    step: 2,
    title: 'Object-Oriented',
    subjects: ['Object-Oriented Programming', 'Memory Management'],
    color: '#10b981',
  },
  {
    step: 3,
    title: 'Standard Library',
    subjects: ['Standard Template Library', 'Templates & Generics'],
    color: '#f97316',
  },
  {
    step: 4,
    title: 'Modern & Advanced',
    subjects: ['Modern C++', 'Concurrency', 'Advanced Topics'],
    color: '#a855f7',
  },
]

export default function HomePage() {
  const { isComplete } = useProgress()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/30 px-6 py-20 md:py-28 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20">
        {CPP_SYMBOLS.map((symbol, idx) => {
          const pos = FLOATING_POSITIONS[idx] || {}
          return (
            <motion.span
              key={idx}
              className="pointer-events-none absolute select-none font-mono font-bold text-blue-200/40 dark:text-blue-400/10"
              style={{ ...pos, fontSize: pos.size }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -12, 0] }}
              transition={{
                opacity: { delay: pos.delay, duration: 0.6 },
                y: { delay: pos.delay, duration: 4 + idx * 0.5, repeat: Infinity, ease: 'easeInOut' },
              }}
              aria-hidden="true"
            >
              {symbol}
            </motion.span>
          )
        })}

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
              Learn{' '}
              <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                Modern C++
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="mx-auto mt-6 max-w-3xl text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            A comprehensive interactive guide from your first program to advanced C++23 —
            covering systems programming, memory management, templates, concurrency, and modern best practices.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {[
              { value: '10', label: 'Subjects' },
              { value: '37', label: 'Chapters' },
              { value: '110+', label: 'Interactive Sections' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/80 px-4 py-1.5 backdrop-blur dark:border-gray-700 dark:bg-gray-800/60"
              >
                <span className="text-base font-bold text-blue-600 dark:text-blue-400">
                  {value}
                </span>
                <span>{label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <a
              href="#subjects"
              className="rounded-xl bg-blue-600 px-7 py-3 text-base font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Start Learning →
            </a>
            <Link
              to="/progress"
              className="rounded-xl border border-gray-300 bg-white px-7 py-3 text-base font-semibold text-gray-700 transition-all hover:border-blue-400 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
            >
              View Progress
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="bg-gray-50 px-6 py-16 dark:bg-gray-900/50">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Recommended Learning Path
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Follow this order to build a solid C++ foundation progressively.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LEARNING_PATH.map((phase, idx) => (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
              >
                <div
                  className="mb-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: phase.color }}
                >
                  {phase.step}
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                  {phase.title}
                </h3>
                <ul className="space-y-1">
                  {phase.subjects.map((s) => (
                    <li key={s} className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <span
                        className="h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: phase.color }}
                        aria-hidden="true"
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section id="subjects" className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              All Subjects
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              10 subjects covering the complete C++ toolkit from basics to advanced.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {CURRICULUM.map((subject) => {
              const total = getSubjectSectionCount(subject.id)
              const completed = subject.chapters?.reduce((acc, ch) => {
                return acc + (ch.sections?.filter((sec) => isComplete(subject.id, ch.id, sec.id)).length || 0)
              }, 0) || 0

              return (
                <motion.div key={subject.id} variants={cardVariants}>
                  <SubjectCard
                    subject={subject}
                    completedCount={completed}
                    totalCount={total}
                  />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="bg-gray-50 px-6 py-16 dark:bg-gray-900/50">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Production-Quality Content
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              Every section is written with clarity and precision — including formal syntax rules,
              compilable code examples, memory diagrams, and best practices. Interactive visualizations
              make abstract concepts like pointers and memory layout tangible. Whether you are
              preparing for systems programming or deepening your engineering expertise, this resource
              meets you at the frontier.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {['Syntax Highlighting', 'Memory Visualizations', 'Compilable Examples', 'Compiler Notes', 'Progress Tracking'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-800/60 dark:bg-blue-900/20 dark:text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
