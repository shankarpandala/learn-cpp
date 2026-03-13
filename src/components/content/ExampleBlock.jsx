import { useState } from 'react';

/**
 * Worked example block with collapsible solution steps (code-focused, no LaTeX).
 *
 * Props:
 *   title      {string}   Example title
 *   problem    {string}   Problem statement
 *   steps      {Array}    Array of { description, code?, output? }
 *   difficulty {string}   'beginner' | 'intermediate' | 'advanced' | 'expert'
 */
const DIFFICULTY_STYLES = {
  beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  advanced: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  expert: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

function ExampleBlock({ title, problem, steps = [], difficulty = 'intermediate' }) {
  const [solutionOpen, setSolutionOpen] = useState(false);
  const difficultyStyle = DIFFICULTY_STYLES[difficulty] || DIFFICULTY_STYLES.intermediate;

  return (
    <div className="my-6 overflow-hidden rounded-xl border-2 border-emerald-400/50 bg-emerald-50/50 shadow-sm dark:border-emerald-500/40 dark:bg-emerald-950/20">
      <div className="flex items-center justify-between gap-3 border-b border-emerald-400/30 bg-emerald-100/60 px-5 py-3 dark:border-emerald-500/30 dark:bg-emerald-900/30">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white dark:bg-emerald-600">
            E
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Example
          </span>
          {title && (
            <>
              <span className="text-emerald-400 dark:text-emerald-600">·</span>
              <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                {title}
              </span>
            </>
          )}
        </div>
        {difficulty && (
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${difficultyStyle}`}>
            {difficulty}
          </span>
        )}
      </div>

      {problem && (
        <div className="px-5 py-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Problem
          </p>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {problem}
          </p>
        </div>
      )}

      {steps.length > 0 && (
        <div className="border-t border-emerald-400/20 dark:border-emerald-500/20">
          <button
            onClick={() => setSolutionOpen((o) => !o)}
            className="flex w-full items-center justify-between px-5 py-3 text-left text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100/40 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
            aria-expanded={solutionOpen}
          >
            <span>Solution ({steps.length} step{steps.length !== 1 ? 's' : ''})</span>
            <svg
              className={`h-4 w-4 transition-transform duration-200 ${solutionOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {solutionOpen && (
            <div className="divide-y divide-emerald-200/40 border-t border-emerald-400/20 dark:divide-emerald-700/30 dark:border-emerald-500/20">
              {steps.map((s, i) => (
                <div key={i} className="flex gap-4 px-5 py-4">
                  <div className="flex shrink-0 flex-col items-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-bold text-emerald-700 dark:bg-emerald-800/50 dark:text-emerald-300">
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="mt-1 w-px flex-1 bg-emerald-300/50 dark:bg-emerald-700/40" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2 pb-1">
                    {s.description && (
                      <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                        {s.description}
                      </p>
                    )}
                    {s.code && (
                      <pre className="overflow-x-auto rounded-lg bg-gray-900 px-3 py-2 text-xs font-mono text-gray-200">
                        {s.code}
                      </pre>
                    )}
                    {s.output && (
                      <pre className="overflow-x-auto rounded-lg bg-gray-950 px-3 py-2 text-xs font-mono text-green-300">
                        {s.output}
                      </pre>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ExampleBlock;
