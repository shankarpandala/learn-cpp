import { useState, useCallback } from 'react';

/**
 * Lightweight C++ syntax tokenizer.
 */
function tokenizeCpp(code) {
  const tokens = [];
  let remaining = code;

  const patterns = [
    { type: 'comment', regex: /^(\/\/[^\n]*)/ },
    { type: 'comment', regex: /^(\/\*[\s\S]*?\*\/)/ },
    { type: 'string', regex: /^(R"([^(]*)\([\s\S]*?\)\2"|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/ },
    { type: 'preprocessor', regex: /^(#\s*(?:include|define|ifdef|ifndef|endif|if|elif|else|undef|pragma|error|warning)\b[^\n]*)/ },
    { type: 'keyword', regex: /^(auto|bool|break|case|catch|char|class|const|constexpr|consteval|constinit|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|false|final|float|for|friend|goto|if|import|inline|int|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|true|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while|char8_t|char16_t|char32_t|concept|alignas|alignof)\b/ },
    { type: 'type', regex: /^(std::(?:string|vector|map|set|unordered_map|unordered_set|array|list|deque|pair|tuple|optional|variant|any|unique_ptr|shared_ptr|weak_ptr|function|thread|mutex|future|promise|atomic|string_view|span|expected|cout|cin|cerr|endl|ostream|istream|ifstream|ofstream|stringstream|size_t|ptrdiff_t|nullptr_t|byte|move|forward|make_unique|make_shared|print|println))\b/ },
    { type: 'number', regex: /^(\b(?:0[xX][0-9a-fA-F']+|0[bB][01']+|0[0-7']*|\d[\d']*\.?[\d']*(?:[eE][+-]?\d+)?)[fFlLuU]*\b)/ },
    { type: 'function', regex: /^(\w+)(?=\s*\()/ },
    { type: 'plain', regex: /^([\w:]+)/ },
    { type: 'operator', regex: /^(->|<<|>>|<=|>=|==|!=|&&|\|\||[+\-*/%=<>!&|^~:,.;?[\]{}()])/ },
    { type: 'whitespace', regex: /^(\s+)/ },
  ];

  while (remaining.length > 0) {
    let matched = false;
    for (const { type, regex } of patterns) {
      const m = remaining.match(regex);
      if (m) {
        tokens.push({ text: m[1], type });
        remaining = remaining.slice(m[1].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      tokens.push({ text: remaining[0], type: 'plain' });
      remaining = remaining.slice(1);
    }
  }
  return tokens;
}

const TOKEN_COLORS = {
  comment: 'text-gray-500',
  string: 'text-green-400',
  preprocessor: 'text-pink-400',
  keyword: 'text-purple-400 font-semibold',
  type: 'text-cyan-300',
  number: 'text-orange-400',
  function: 'text-blue-300',
  operator: 'text-gray-400',
  whitespace: '',
  plain: 'text-gray-200',
};

const LANGUAGE_LABELS = {
  cpp: 'C++',
  c: 'C',
  bash: 'Bash',
  shell: 'Shell',
  text: 'Text',
  makefile: 'Makefile',
  cmake: 'CMake',
};

/**
 * Syntax-highlighted code block for C++.
 *
 * Props:
 *   code      {string}   Source code
 *   language  {string}   Language identifier (default 'cpp')
 *   title     {string}   Optional block title
 */
function CppCode({ code, language = 'cpp', title, children }) {
  code = code || (typeof children === 'string' ? children : '');
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  const renderContent = () => {
    if (language === 'cpp' || language === 'c') {
      const tokens = tokenizeCpp(code);
      return tokens.map((token, i) => (
        <span key={i} className={TOKEN_COLORS[token.type] || 'text-gray-200'}>
          {token.text}
        </span>
      ));
    }
    return <span className="text-gray-200">{code}</span>;
  };

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-gray-700 bg-gray-950 shadow-lg">
      <div className="flex items-center justify-between border-b border-gray-700 bg-gray-900 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/70" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <div className="h-3 w-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-xs font-medium text-gray-400">
            {title || LANGUAGE_LABELS[language] || language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md border border-gray-600 bg-gray-800 px-2.5 py-1 text-xs font-medium text-gray-300 transition-colors hover:bg-gray-700"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <svg className="h-3.5 w-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono">{renderContent()}</code>
      </pre>
    </div>
  );
}

export default CppCode;
