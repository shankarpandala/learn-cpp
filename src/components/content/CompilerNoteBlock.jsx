import React from 'react';

const COMPILER_ICONS = {
  gcc: 'GCC',
  clang: 'Clang',
  msvc: 'MSVC',
  all: 'All Compilers',
};

function CompilerNoteBlock({ compiler = 'all', title, children }) {
  const label = COMPILER_ICONS[compiler] || compiler;
  const displayTitle = title || `${label} Note`;

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-gray-50/80 p-4 sm:p-5 dark:border-gray-700 dark:bg-gray-800/40">
      <div className="flex items-center gap-2">
        <svg className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{displayTitle}</span>
        <span className="ml-auto rounded-md border border-gray-300 bg-white px-2 py-0.5 font-mono text-xs text-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
          {label}
        </span>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {children}
      </div>
    </div>
  );
}

export default CompilerNoteBlock;
