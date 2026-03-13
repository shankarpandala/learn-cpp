import React, { useState } from 'react';

const NOTE_TYPES = {
  info: {
    label: 'Note',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    styles: 'border-blue-300 bg-blue-50/80 dark:border-blue-700 dark:bg-blue-900/20',
    iconColor: 'text-blue-500 dark:text-blue-400',
    titleColor: 'text-blue-800 dark:text-blue-300',
  },
  tip: {
    label: 'Tip',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    styles: 'border-emerald-300 bg-emerald-50/80 dark:border-emerald-700 dark:bg-emerald-900/20',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
    titleColor: 'text-emerald-800 dark:text-emerald-300',
  },
  important: {
    label: 'Important',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    styles: 'border-amber-300 bg-amber-50/80 dark:border-amber-700 dark:bg-amber-900/20',
    iconColor: 'text-amber-500 dark:text-amber-400',
    titleColor: 'text-amber-800 dark:text-amber-300',
  },
  history: {
    label: 'Historical Note',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    styles: 'border-purple-300 bg-purple-50/80 dark:border-purple-700 dark:bg-purple-900/20',
    iconColor: 'text-purple-500 dark:text-purple-400',
    titleColor: 'text-purple-800 dark:text-purple-300',
  },
};

function NoteBlock({ type = 'info', title, children, collapsible = false }) {
  const [open, setOpen] = useState(!collapsible);
  const config = NOTE_TYPES[type] || NOTE_TYPES.info;
  const displayTitle = title || config.label;

  return (
    <div className={`my-6 rounded-xl border-l-4 p-4 sm:p-5 ${config.styles}`}>
      <button
        type="button"
        onClick={() => collapsible && setOpen(!open)}
        className={`flex w-full items-center gap-2 text-left ${collapsible ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <span className={config.iconColor}>{config.icon}</span>
        <span className={`text-sm font-semibold ${config.titleColor}`}>{displayTitle}</span>
        {collapsible && (
          <svg
            className={`ml-auto h-4 w-4 transition-transform ${config.iconColor} ${open ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
      {open && (
        <div className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {children}
        </div>
      )}
    </div>
  );
}

export default NoteBlock;
