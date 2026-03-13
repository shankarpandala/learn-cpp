import React from 'react';

function WarningBlock({ title = 'Warning', children }) {
  return (
    <div className="my-6 rounded-xl border-l-4 border-red-400 bg-red-50/80 p-4 sm:p-5 dark:border-red-600 dark:bg-red-900/20">
      <div className="flex items-center gap-2">
        <svg className="h-5 w-5 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span className="text-sm font-semibold text-red-800 dark:text-red-300">{title}</span>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-red-900/80 dark:text-red-200/80">
        {children}
      </div>
    </div>
  );
}

export default WarningBlock;
