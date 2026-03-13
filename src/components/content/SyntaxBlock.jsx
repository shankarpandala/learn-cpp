/**
 * Syntax rule/pattern block (replaces TheoremBlock from math4ai).
 * Shows C++ syntax patterns and grammar rules.
 *
 * Props:
 *   title    {string}  Syntax pattern name
 *   children {node}    Content describing the syntax
 */
function SyntaxBlock({ title, children }) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border-2 border-blue-400/50 bg-blue-50/50 shadow-sm dark:border-blue-500/40 dark:bg-blue-950/20">
      <div className="flex items-center gap-3 border-b border-blue-400/30 bg-blue-100/60 px-5 py-3 dark:border-blue-500/30 dark:bg-blue-900/30">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white dark:bg-blue-600">
          S
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Syntax
        </span>
        {title && (
          <>
            <span className="text-blue-400 dark:text-blue-600">·</span>
            <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">
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

export default SyntaxBlock;
