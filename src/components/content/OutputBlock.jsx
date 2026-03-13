/**
 * Terminal-style program output display.
 *
 * Props:
 *   output  {string}  Program output text
 *   title   {string}  Optional title (default: "Output")
 */
function OutputBlock({ output = '', title = 'Output' }) {
  return (
    <div className="my-4 overflow-hidden rounded-xl border border-gray-600 bg-gray-950 shadow">
      <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-900 px-4 py-2">
        <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
        <span className="text-xs font-medium text-gray-400">{title}</span>
      </div>
      <pre className="overflow-x-auto p-4 text-sm font-mono leading-relaxed text-green-300">
        {output}
      </pre>
    </div>
  );
}

export default OutputBlock;
