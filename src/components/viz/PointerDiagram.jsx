import React from 'react';
import { motion } from 'framer-motion';

/**
 * Interactive pointer/reference relationship diagram.
 *
 * Props:
 *   variables - Array of { name, type, value, pointsTo? }
 *   title     - Optional title
 */
function PointerDiagram({ variables = [], title = 'Pointer Diagram' }) {
  const pointers = variables.filter(v => v.pointsTo);
  const targets = variables.filter(v => !v.pointsTo);

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-gray-50/50 p-4 sm:p-5 dark:border-gray-700 dark:bg-gray-900/30">
      <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
        <svg className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        {title}
      </h4>

      <div className="flex flex-wrap items-center justify-center gap-6">
        {/* Pointer variables */}
        <div className="space-y-3">
          {pointers.map((ptr, i) => (
            <motion.div
              key={ptr.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="rounded-lg border-2 border-purple-300 bg-purple-50 px-3 py-2 font-mono text-xs dark:border-purple-600 dark:bg-purple-900/30">
                <div className="text-purple-600 dark:text-purple-400">{ptr.type}</div>
                <div className="font-semibold text-gray-800 dark:text-gray-200">{ptr.name}</div>
                <div className="text-gray-500 dark:text-gray-400">{ptr.value}</div>
              </div>
              {/* Arrow */}
              <svg className="h-4 w-12 text-purple-400" viewBox="0 0 48 16">
                <line x1="0" y1="8" x2="40" y2="8" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
                <polygon points="40,3 48,8 40,13" fill="currentColor" />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Target variables */}
        <div className="space-y-3">
          {targets.map((target, i) => {
            const isPointedTo = pointers.some(p => p.pointsTo === target.name);
            return (
              <motion.div
                key={target.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={`rounded-lg border-2 px-3 py-2 font-mono text-xs ${
                  isPointedTo
                    ? 'border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/30'
                    : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/60'
                }`}
              >
                <div className="text-blue-600 dark:text-blue-400">{target.type}</div>
                <div className="font-semibold text-gray-800 dark:text-gray-200">{target.name}</div>
                <div className="text-gray-500 dark:text-gray-400">{target.value}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-sm border border-purple-300 bg-purple-50 dark:border-purple-600" />
          Pointer
        </span>
        <span className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-sm border border-blue-300 bg-blue-50 dark:border-blue-600" />
          Target
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="h-2.5 w-6 text-purple-400" viewBox="0 0 24 10">
            <line x1="0" y1="5" x2="18" y2="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 1.5" />
            <polygon points="18,2 24,5 18,8" fill="currentColor" />
          </svg>
          Points to
        </span>
      </div>
    </div>
  );
}

export default PointerDiagram;
