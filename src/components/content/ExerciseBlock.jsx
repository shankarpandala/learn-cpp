import React, { useState } from 'react';

function ExerciseBlock({ title, difficulty = 'beginner', prompt, hints = [], solution, children }) {
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const diffColors = {
    beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    advanced: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    expert: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="my-6 rounded-xl border border-cyan-200 bg-cyan-50/50 p-4 sm:p-5 dark:border-cyan-800 dark:bg-cyan-900/20">
      {/* Header */}
      <div className="flex items-center gap-3">
        <svg className="h-5 w-5 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        <span className="text-sm font-semibold text-cyan-800 dark:text-cyan-300">
          {title || 'Exercise'}
        </span>
        <span className={`ml-auto rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${diffColors[difficulty] || diffColors.beginner}`}>
          {difficulty}
        </span>
      </div>

      {/* Prompt */}
      <div className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        {prompt || children}
      </div>

      {/* Hints */}
      {hints.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-1.5 text-xs font-medium text-cyan-600 transition-colors hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            <svg className={`h-3.5 w-3.5 transition-transform ${showHints ? 'rotate-90' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {showHints ? 'Hide Hints' : `Show Hints (${hints.length})`}
          </button>
          {showHints && (
            <ul className="mt-2 space-y-1.5 pl-5">
              {hints.map((hint, i) => (
                <li key={i} className="text-sm text-gray-600 dark:text-gray-400 list-disc">
                  {hint}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Solution */}
      {solution && (
        <div className="mt-4">
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="flex items-center gap-1.5 text-xs font-medium text-cyan-600 transition-colors hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            <svg className={`h-3.5 w-3.5 transition-transform ${showSolution ? 'rotate-90' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
          {showSolution && (
            <div className="mt-3 rounded-lg border border-cyan-200 bg-white/60 p-3 dark:border-cyan-800 dark:bg-gray-900/40">
              {solution}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ExerciseBlock;
