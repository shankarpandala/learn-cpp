/**
 * Definition callout box for C++ concepts.
 *
 * Props:
 *   term       {string}  The term being defined
 *   children   {node}    The definition content
 */
function DefinitionBlock({ term, children }) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border-2 border-purple-400/50 bg-purple-50/50 shadow-sm dark:border-purple-500/40 dark:bg-purple-950/20">
      <div className="flex items-center gap-3 border-b border-purple-400/30 bg-purple-100/60 px-5 py-3 dark:border-purple-500/30 dark:bg-purple-900/30">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white dark:bg-purple-600">
          D
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
          Definition
        </span>
        {term && (
          <>
            <span className="text-purple-400 dark:text-purple-600">·</span>
            <span className="text-sm font-semibold text-purple-800 dark:text-purple-200">
              {term}
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

export default DefinitionBlock;
