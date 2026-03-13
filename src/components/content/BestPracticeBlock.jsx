/**
 * Best practice recommendation block (replaces ProofBlock from math4ai).
 *
 * Props:
 *   title    {string}  Practice name
 *   children {node}    Content
 */
function BestPracticeBlock({ title, children }) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border-2 border-teal-400/50 bg-teal-50/50 shadow-sm dark:border-teal-500/40 dark:bg-teal-950/20">
      <div className="flex items-center gap-3 border-b border-teal-400/30 bg-teal-100/60 px-5 py-3 dark:border-teal-500/30 dark:bg-teal-900/30">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white dark:bg-teal-600">
          ✓
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          Best Practice
        </span>
        {title && (
          <>
            <span className="text-teal-400 dark:text-teal-600">·</span>
            <span className="text-sm font-semibold text-teal-800 dark:text-teal-200">
              {title}
            </span>
          </>
        )}
      </div>
      <div className="px-5 py-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
}

export default BestPracticeBlock;
