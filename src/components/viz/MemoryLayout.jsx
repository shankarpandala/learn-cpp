import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Interactive memory layout visualization showing stack and heap regions.
 *
 * Props:
 *   stack  - Array of { name, type, value, size?, address? }
 *   heap   - Array of { name, type, value, size?, address?, pointedBy? }
 *   title  - Optional title
 */
function MemoryLayout({ stack = [], heap = [], title = 'Memory Layout' }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const cellClass = (item) => {
    const isHovered = hoveredItem === item.name;
    return `flex items-center justify-between rounded-lg border px-3 py-2 text-xs font-mono transition-all ${
      isHovered
        ? 'border-blue-400 bg-blue-50 shadow-md dark:border-blue-500 dark:bg-blue-900/30'
        : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/60'
    }`;
  };

  const isPointerTarget = (heapItem) =>
    hoveredItem && heapItem.pointedBy === hoveredItem;

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-gray-50/50 p-4 sm:p-5 dark:border-gray-700 dark:bg-gray-900/30">
      <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
        <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
        {title}
      </h4>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Stack */}
        <div>
          <div className="mb-2 flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-sm bg-green-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Stack
            </span>
            <span className="text-xs text-gray-400">(grows ↓)</span>
          </div>
          <div className="space-y-1.5">
            <AnimatePresence>
              {stack.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={cellClass(item)}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className="text-gray-600 dark:text-gray-400">
                    <span className="text-blue-600 dark:text-blue-400">{item.type}</span>{' '}
                    {item.name}
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            {stack.length === 0 && (
              <div className="rounded-lg border border-dashed border-gray-300 px-3 py-4 text-center text-xs text-gray-400 dark:border-gray-600">
                Empty
              </div>
            )}
          </div>
        </div>

        {/* Heap */}
        <div>
          <div className="mb-2 flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-sm bg-orange-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Heap
            </span>
          </div>
          <div className="space-y-1.5">
            <AnimatePresence>
              {heap.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`${cellClass(item)} ${
                    isPointerTarget(item)
                      ? 'ring-2 ring-blue-400 dark:ring-blue-500'
                      : ''
                  }`}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className="text-gray-600 dark:text-gray-400">
                    <span className="text-orange-600 dark:text-orange-400">{item.type}</span>{' '}
                    {item.name}
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            {heap.length === 0 && (
              <div className="rounded-lg border border-dashed border-gray-300 px-3 py-4 text-center text-xs text-gray-400 dark:border-gray-600">
                No heap allocations
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Address footer */}
      {(stack.some(s => s.address) || heap.some(h => h.address)) && (
        <div className="mt-3 border-t border-gray-200 pt-2 text-xs text-gray-400 dark:border-gray-700">
          Addresses shown are illustrative, not actual runtime values.
        </div>
      )}
    </div>
  );
}

export default MemoryLayout;
