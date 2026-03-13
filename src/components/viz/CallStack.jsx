import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Interactive call stack visualization showing function frames.
 *
 * Props:
 *   frames - Array of { name, args?, locals?, returnType?, active? }
 *            frames[0] is the bottom of the stack (e.g., main)
 *   title  - Optional title
 */
function CallStack({ frames = [], title = 'Call Stack' }) {
  const [selectedFrame, setSelectedFrame] = useState(null);
  const reversed = [...frames].reverse(); // top of stack first visually

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-gray-50/50 p-4 sm:p-5 dark:border-gray-700 dark:bg-gray-900/30">
      <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
        <svg className="h-4 w-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        {title}
      </h4>

      <div className="mx-auto max-w-sm space-y-1">
        <div className="mb-1 text-center text-xs text-gray-400 dark:text-gray-500">
          ↑ Top of Stack
        </div>

        <AnimatePresence>
          {reversed.map((frame, i) => {
            const isActive = frame.active !== false && i === 0;
            const isSelected = selectedFrame === frame.name;

            return (
              <motion.div
                key={`${frame.name}-${i}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedFrame(isSelected ? null : frame.name)}
                  className={`w-full rounded-lg border-2 px-3 py-2 text-left font-mono text-xs transition-all ${
                    isActive
                      ? 'border-teal-400 bg-teal-50 shadow-sm dark:border-teal-500 dark:bg-teal-900/30'
                      : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800/60 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={isActive ? 'text-teal-700 dark:text-teal-300' : 'text-gray-700 dark:text-gray-300'}>
                      {frame.returnType && (
                        <span className="text-blue-500 dark:text-blue-400">{frame.returnType} </span>
                      )}
                      <span className="font-semibold">{frame.name}</span>
                      <span className="text-gray-400">(</span>
                      {frame.args && (
                        <span className="text-orange-500 dark:text-orange-400">{frame.args}</span>
                      )}
                      <span className="text-gray-400">)</span>
                    </span>
                    {isActive && (
                      <span className="rounded-full bg-teal-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                        ACTIVE
                      </span>
                    )}
                  </div>

                  {/* Expanded locals */}
                  {isSelected && frame.locals && frame.locals.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="mt-2 space-y-1 border-t border-gray-200 pt-2 dark:border-gray-600"
                    >
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                        Local Variables
                      </div>
                      {frame.locals.map((local, j) => (
                        <div key={j} className="flex justify-between text-gray-600 dark:text-gray-400">
                          <span>
                            <span className="text-blue-500 dark:text-blue-400">{local.type}</span>{' '}
                            {local.name}
                          </span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200">
                            {local.value}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <div className="mt-1 text-center text-xs text-gray-400 dark:text-gray-500">
          ↓ Bottom of Stack
        </div>
      </div>
    </div>
  );
}

export default CallStack;
