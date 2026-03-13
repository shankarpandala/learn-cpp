import React from 'react';

const TYPE_LABELS = {
  iso_standard: { label: 'ISO Standard', color: 'text-purple-600 dark:text-purple-400' },
  cppreference: { label: 'cppreference', color: 'text-blue-600 dark:text-blue-400' },
  textbook: { label: 'Textbook', color: 'text-emerald-600 dark:text-emerald-400' },
  conference_talk: { label: 'Conference Talk', color: 'text-orange-600 dark:text-orange-400' },
  tutorial: { label: 'Tutorial', color: 'text-cyan-600 dark:text-cyan-400' },
  article: { label: 'Article', color: 'text-gray-600 dark:text-gray-400' },
};

function ReferenceList({ references = [] }) {
  if (references.length === 0) return null;

  return (
    <div className="my-8">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        References & Further Reading
      </h3>
      <ul className="space-y-2">
        {references.map((ref, i) => {
          const typeInfo = TYPE_LABELS[ref.type] || TYPE_LABELS.article;
          return (
            <li key={i} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white/60 px-4 py-3 dark:border-gray-800 dark:bg-gray-800/30">
              <span className={`mt-0.5 shrink-0 text-xs font-medium ${typeInfo.color}`}>
                [{typeInfo.label}]
              </span>
              <div className="min-w-0">
                {ref.url ? (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {ref.title}
                  </a>
                ) : (
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {ref.title}
                  </span>
                )}
                {ref.author && (
                  <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                    — {ref.author}
                  </span>
                )}
                {ref.description && (
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-500">
                    {ref.description}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ReferenceList;
