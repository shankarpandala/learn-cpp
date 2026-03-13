import{r as y,j as e}from"./vendor-BlNF5je7.js";function T(n){const s=[];let d=n;const o=[{type:"comment",regex:/^(\/\/[^\n]*)/},{type:"comment",regex:/^(\/\*[\s\S]*?\*\/)/},{type:"string",regex:/^(R"([^(]*)\([\s\S]*?\)\2"|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/},{type:"preprocessor",regex:/^(#\s*(?:include|define|ifdef|ifndef|endif|if|elif|else|undef|pragma|error|warning)\b[^\n]*)/},{type:"keyword",regex:/^(auto|bool|break|case|catch|char|class|const|constexpr|consteval|constinit|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|false|final|float|for|friend|goto|if|import|inline|int|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|true|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while|char8_t|char16_t|char32_t|concept|alignas|alignof)\b/},{type:"type",regex:/^(std::(?:string|vector|map|set|unordered_map|unordered_set|array|list|deque|pair|tuple|optional|variant|any|unique_ptr|shared_ptr|weak_ptr|function|thread|mutex|future|promise|atomic|string_view|span|expected|cout|cin|cerr|endl|ostream|istream|ifstream|ofstream|stringstream|size_t|ptrdiff_t|nullptr_t|byte|move|forward|make_unique|make_shared|print|println))\b/},{type:"number",regex:/^(\b(?:0[xX][0-9a-fA-F']+|0[bB][01']+|0[0-7']*|\d[\d']*\.?[\d']*(?:[eE][+-]?\d+)?)[fFlLuU]*\b)/},{type:"function",regex:/^(\w+)(?=\s*\()/},{type:"plain",regex:/^([\w:]+)/},{type:"operator",regex:/^(->|<<|>>|<=|>=|==|!=|&&|\|\||[+\-*/%=<>!&|^~:,.;?[\]{}()])/},{type:"whitespace",regex:/^(\s+)/}];for(;d.length>0;){let c=!1;for(const{type:f,regex:p}of o){const x=d.match(p);if(x){s.push({text:x[1],type:f}),d=d.slice(x[1].length),c=!0;break}}c||(s.push({text:d[0],type:"plain"}),d=d.slice(1))}return s}const S={comment:"text-gray-500",string:"text-green-400",preprocessor:"text-pink-400",keyword:"text-purple-400 font-semibold",type:"text-cyan-300",number:"text-orange-400",function:"text-blue-300",operator:"text-gray-400",whitespace:"",plain:"text-gray-200"},A={cpp:"C++",c:"C",bash:"Bash",shell:"Shell",text:"Text",makefile:"Makefile",cmake:"CMake"};function t({code:n="",language:s="cpp",title:d}){const[o,c]=y.useState(!1),f=y.useCallback(async()=>{try{await navigator.clipboard.writeText(n),c(!0),setTimeout(()=>c(!1),2e3)}catch{const x=document.createElement("textarea");x.value=n,document.body.appendChild(x),x.select(),document.execCommand("copy"),document.body.removeChild(x),c(!0),setTimeout(()=>c(!1),2e3)}},[n]),p=()=>s==="cpp"||s==="c"?T(n).map((b,v)=>e.jsx("span",{className:S[b.type]||"text-gray-200",children:b.text},v)):e.jsx("span",{className:"text-gray-200",children:n});return e.jsxs("div",{className:"my-5 overflow-hidden rounded-xl border border-gray-700 bg-gray-950 shadow-lg",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-gray-700 bg-gray-900 px-4 py-2.5",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("div",{className:"flex gap-1.5",children:[e.jsx("div",{className:"h-3 w-3 rounded-full bg-red-500/70"}),e.jsx("div",{className:"h-3 w-3 rounded-full bg-yellow-500/70"}),e.jsx("div",{className:"h-3 w-3 rounded-full bg-green-500/70"})]}),e.jsx("span",{className:"text-xs font-medium text-gray-400",children:d||A[s]||s})]}),e.jsx("button",{onClick:f,className:"flex items-center gap-1.5 rounded-md border border-gray-600 bg-gray-800 px-2.5 py-1 text-xs font-medium text-gray-300 transition-colors hover:bg-gray-700","aria-label":"Copy code",children:o?e.jsxs(e.Fragment,{children:[e.jsx("svg",{className:"h-3.5 w-3.5 text-green-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})}),e.jsx("span",{className:"text-green-400",children:"Copied!"})]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{className:"h-3.5 w-3.5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"})}),"Copy"]})})]}),e.jsx("pre",{className:"overflow-x-auto p-4 text-sm leading-relaxed",children:e.jsx("code",{className:"font-mono",children:p()})})]})}function r({output:n="",title:s="Output"}){return e.jsxs("div",{className:"my-4 overflow-hidden rounded-xl border border-gray-600 bg-gray-950 shadow",children:[e.jsxs("div",{className:"flex items-center gap-2 border-b border-gray-700 bg-gray-900 px-4 py-2",children:[e.jsxs("svg",{className:"h-4 w-4 text-green-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"4 17 10 11 4 5"}),e.jsx("line",{x1:"12",y1:"19",x2:"20",y2:"19"})]}),e.jsx("span",{className:"text-xs font-medium text-gray-400",children:s})]}),e.jsx("pre",{className:"overflow-x-auto p-4 text-sm font-mono leading-relaxed text-green-300",children:n})]})}function h({term:n,children:s}){return e.jsxs("div",{className:"my-6 overflow-hidden rounded-xl border-2 border-purple-400/50 bg-purple-50/50 shadow-sm dark:border-purple-500/40 dark:bg-purple-950/20",children:[e.jsxs("div",{className:"flex items-center gap-3 border-b border-purple-400/30 bg-purple-100/60 px-5 py-3 dark:border-purple-500/30 dark:bg-purple-900/30",children:[e.jsx("div",{className:"flex h-7 w-7 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white dark:bg-purple-600",children:"D"}),e.jsx("span",{className:"text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400",children:"Definition"}),n&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"text-purple-400 dark:text-purple-600",children:"·"}),e.jsx("span",{className:"text-sm font-semibold text-purple-800 dark:text-purple-200",children:n})]})]}),e.jsx("div",{className:"px-5 py-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:s})]})}function l({title:n,children:s}){return e.jsxs("div",{className:"my-6 overflow-hidden rounded-xl border-2 border-blue-400/50 bg-blue-50/50 shadow-sm dark:border-blue-500/40 dark:bg-blue-950/20",children:[e.jsxs("div",{className:"flex items-center gap-3 border-b border-blue-400/30 bg-blue-100/60 px-5 py-3 dark:border-blue-500/30 dark:bg-blue-900/30",children:[e.jsx("div",{className:"flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white dark:bg-blue-600",children:"S"}),e.jsx("span",{className:"text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400",children:"Syntax"}),n&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"text-blue-400 dark:text-blue-600",children:"·"}),e.jsx("span",{className:"text-sm font-semibold text-blue-800 dark:text-blue-200",children:n})]})]}),e.jsx("div",{className:"px-5 py-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:s})]})}const k={info:{label:"Note",icon:e.jsx("svg",{className:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),styles:"border-blue-300 bg-blue-50/80 dark:border-blue-700 dark:bg-blue-900/20",iconColor:"text-blue-500 dark:text-blue-400",titleColor:"text-blue-800 dark:text-blue-300"},tip:{label:"Tip",icon:e.jsx("svg",{className:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"})}),styles:"border-emerald-300 bg-emerald-50/80 dark:border-emerald-700 dark:bg-emerald-900/20",iconColor:"text-emerald-500 dark:text-emerald-400",titleColor:"text-emerald-800 dark:text-emerald-300"},important:{label:"Important",icon:e.jsx("svg",{className:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})}),styles:"border-amber-300 bg-amber-50/80 dark:border-amber-700 dark:bg-amber-900/20",iconColor:"text-amber-500 dark:text-amber-400",titleColor:"text-amber-800 dark:text-amber-300"},history:{label:"Historical Note",icon:e.jsx("svg",{className:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})}),styles:"border-purple-300 bg-purple-50/80 dark:border-purple-700 dark:bg-purple-900/20",iconColor:"text-purple-500 dark:text-purple-400",titleColor:"text-purple-800 dark:text-purple-300"}};function i({type:n="info",title:s,children:d,collapsible:o=!1}){const[c,f]=y.useState(!o),p=k[n]||k.info,x=s||p.label;return e.jsxs("div",{className:`my-6 rounded-xl border-l-4 p-4 sm:p-5 ${p.styles}`,children:[e.jsxs("button",{type:"button",onClick:()=>o&&f(!c),className:`flex w-full items-center gap-2 text-left ${o?"cursor-pointer":"cursor-default"}`,children:[e.jsx("span",{className:p.iconColor,children:p.icon}),e.jsx("span",{className:`text-sm font-semibold ${p.titleColor}`,children:x}),o&&e.jsx("svg",{className:`ml-auto h-4 w-4 transition-transform ${p.iconColor} ${c?"rotate-180":""}`,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 9l-7 7-7-7"})})]}),c&&e.jsx("div",{className:"mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:d})]})}function u({title:n,children:s}){return e.jsxs("div",{className:"my-6 overflow-hidden rounded-xl border-2 border-teal-400/50 bg-teal-50/50 shadow-sm dark:border-teal-500/40 dark:bg-teal-950/20",children:[e.jsxs("div",{className:"flex items-center gap-3 border-b border-teal-400/30 bg-teal-100/60 px-5 py-3 dark:border-teal-500/30 dark:bg-teal-900/30",children:[e.jsx("div",{className:"flex h-7 w-7 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white dark:bg-teal-600",children:"✓"}),e.jsx("span",{className:"text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400",children:"Best Practice"}),n&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"text-teal-400 dark:text-teal-600",children:"·"}),e.jsx("span",{className:"text-sm font-semibold text-teal-800 dark:text-teal-200",children:n})]})]}),e.jsx("div",{className:"px-5 py-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:s})]})}function a({title:n,difficulty:s="beginner",prompt:d,hints:o=[],solution:c,children:f}){const[p,x]=y.useState(!1),[b,v]=y.useState(!1),w={beginner:"bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",intermediate:"bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",advanced:"bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",expert:"bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"};return e.jsxs("div",{className:"my-6 rounded-xl border border-cyan-200 bg-cyan-50/50 p-4 sm:p-5 dark:border-cyan-800 dark:bg-cyan-900/20",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("svg",{className:"h-5 w-5 text-cyan-600 dark:text-cyan-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})}),e.jsx("span",{className:"text-sm font-semibold text-cyan-800 dark:text-cyan-300",children:n||"Exercise"}),e.jsx("span",{className:`ml-auto rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${w[s]||w.beginner}`,children:s})]}),e.jsx("div",{className:"mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:d||f}),o.length>0&&e.jsxs("div",{className:"mt-4",children:[e.jsxs("button",{onClick:()=>x(!p),className:"flex items-center gap-1.5 text-xs font-medium text-cyan-600 transition-colors hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300",children:[e.jsx("svg",{className:`h-3.5 w-3.5 transition-transform ${p?"rotate-90":""}`,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})}),p?"Hide Hints":`Show Hints (${o.length})`]}),p&&e.jsx("ul",{className:"mt-2 space-y-1.5 pl-5",children:o.map((C,_)=>e.jsx("li",{className:"text-sm text-gray-600 dark:text-gray-400 list-disc",children:C},_))})]}),c&&e.jsxs("div",{className:"mt-4",children:[e.jsxs("button",{onClick:()=>v(!b),className:"flex items-center gap-1.5 text-xs font-medium text-cyan-600 transition-colors hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300",children:[e.jsx("svg",{className:`h-3.5 w-3.5 transition-transform ${b?"rotate-90":""}`,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})}),b?"Hide Solution":"Show Solution"]}),b&&e.jsx("div",{className:"mt-3 rounded-lg border border-cyan-200 bg-white/60 p-3 dark:border-cyan-800 dark:bg-gray-900/40",children:c})]})]})}const O={gcc:"GCC",clang:"Clang",msvc:"MSVC",all:"All Compilers"};function j({compiler:n="all",title:s,children:d}){const o=O[n]||n,c=s||`${o} Note`;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-gray-50/80 p-4 sm:p-5 dark:border-gray-700 dark:bg-gray-800/40",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("svg",{className:"h-5 w-5 text-gray-500 dark:text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"})]}),e.jsx("span",{className:"text-sm font-semibold text-gray-700 dark:text-gray-300",children:c}),e.jsx("span",{className:"ml-auto rounded-md border border-gray-300 bg-white px-2 py-0.5 font-mono text-xs text-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300",children:o})]}),e.jsx("div",{className:"mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400",children:d})]})}const N={iso_standard:{label:"ISO Standard",color:"text-purple-600 dark:text-purple-400"},cppreference:{label:"cppreference",color:"text-blue-600 dark:text-blue-400"},textbook:{label:"Textbook",color:"text-emerald-600 dark:text-emerald-400"},conference_talk:{label:"Conference Talk",color:"text-orange-600 dark:text-orange-400"},tutorial:{label:"Tutorial",color:"text-cyan-600 dark:text-cyan-400"},article:{label:"Article",color:"text-gray-600 dark:text-gray-400"}};function m({references:n=[]}){return n.length===0?null:e.jsxs("div",{className:"my-8",children:[e.jsxs("h3",{className:"mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200",children:[e.jsx("svg",{className:"h-5 w-5 text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"})}),"References & Further Reading"]}),e.jsx("ul",{className:"space-y-2",children:n.map((s,d)=>{const o=N[s.type]||N.article;return e.jsxs("li",{className:"flex items-start gap-3 rounded-lg border border-gray-100 bg-white/60 px-4 py-3 dark:border-gray-800 dark:bg-gray-800/30",children:[e.jsxs("span",{className:`mt-0.5 shrink-0 text-xs font-medium ${o.color}`,children:["[",o.label,"]"]}),e.jsxs("div",{className:"min-w-0",children:[s.url?e.jsx("a",{href:s.url,target:"_blank",rel:"noopener noreferrer",className:"text-sm font-medium text-blue-600 hover:underline dark:text-blue-400",children:s.title}):e.jsx("span",{className:"text-sm font-medium text-gray-800 dark:text-gray-200",children:s.title}),s.author&&e.jsxs("span",{className:"ml-1 text-sm text-gray-500 dark:text-gray-400",children:["— ",s.author]}),s.description&&e.jsx("p",{className:"mt-0.5 text-xs text-gray-500 dark:text-gray-500",children:s.description})]})]},d)})})]})}function I(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:['Every programming journey starts with a simple program. In C++, the classic first program prints "Hello, World!" to the screen. This seemingly trivial program introduces several fundamental C++ concepts: the preprocessor, the standard library, the ',e.jsx("code",{children:"main"})," function, and stream output."]}),e.jsx(h,{title:"What is C++?",children:e.jsx("p",{children:"C++ is a general-purpose programming language created by Bjarne Stroustrup as an extension of C. It supports procedural, object-oriented, and generic programming paradigms, and is widely used in systems software, game engines, embedded systems, and high-performance applications."})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Your First C++ Program"}),e.jsx(t,{title:"hello.cpp",children:`#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`}),e.jsx(r,{children:"Hello, World!"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Line-by-Line Breakdown"}),e.jsxs(l,{title:"#include Directive",children:[e.jsxs("p",{children:[e.jsx("code",{children:"#include <iostream>"})," is a ",e.jsx("strong",{children:"preprocessor directive"}),". It tells the compiler to include the contents of the ",e.jsx("code",{children:"iostream"})," header file, which provides input/output stream objects like ",e.jsx("code",{children:"std::cout"}),"."]}),e.jsx(t,{children:`#include <header_name>   // System/standard library header
#include "header_name"  // User-defined header`})]}),e.jsxs(l,{title:"The main() Function",children:[e.jsxs("p",{children:["Every C++ program must have exactly one ",e.jsx("code",{children:"main()"})," function. This is the entry point — the first function called when the program runs. It returns an ",e.jsx("code",{children:"int"})," to the operating system (0 typically means success)."]}),e.jsx(t,{children:`int main() {
    // program code here
    return 0;  // 0 = success
}`})]}),e.jsxs(l,{title:"std::cout and the Insertion Operator",children:[e.jsxs("p",{children:[e.jsx("code",{children:"std::cout"})," is the ",e.jsx("strong",{children:"standard character output"})," stream. The ",e.jsx("code",{children:"<<"})," operator (called the ",e.jsx("strong",{children:"insertion operator"}),") sends data to the output stream. Multiple values can be chained."]}),e.jsx(t,{children:'std::cout << "Text" << " " << 42 << std::endl;'}),e.jsx(r,{children:"Text 42"})]}),e.jsx(i,{type:"info",title:"What is std::?",children:e.jsxs("p",{children:[e.jsx("code",{children:"std"})," is a ",e.jsx("strong",{children:"namespace"})," — a named scope that groups related identifiers. The C++ standard library lives in the ",e.jsx("code",{children:"std"})," namespace. The ",e.jsx("code",{children:"::"})," is the",e.jsx("strong",{children:" scope resolution operator"})," that accesses members within a namespace."]})}),e.jsx(i,{type:"tip",title:"std::endl vs '\\\\n'",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::endl"})," outputs a newline ",e.jsx("em",{children:"and"})," flushes the output buffer. Using ",e.jsx("code",{children:"'\\n'"})," only outputs a newline, which is faster for performance-sensitive code. For most learning examples, either works fine."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Compiling and Running"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300",children:"To compile and run your program from the command line:"}),e.jsx(t,{title:"Terminal",children:`g++ -o hello hello.cpp
./hello`}),e.jsx(r,{children:"Hello, World!"}),e.jsx(j,{compiler:"gcc",title:"GCC Compilation",children:e.jsxs("p",{children:[e.jsx("code",{children:"g++"})," is the GNU C++ compiler. The ",e.jsx("code",{children:"-o hello"})," flag specifies the output filename. Without it, the default output is ",e.jsx("code",{children:"a.out"})," on Linux/macOS."]})}),e.jsx(j,{compiler:"clang",title:"Clang Compilation",children:e.jsxs("p",{children:["On macOS, the default ",e.jsx("code",{children:"g++"})," command often invokes Clang. You can also use ",e.jsx("code",{children:"clang++ -o hello hello.cpp"})," explicitly."]})}),e.jsx(u,{title:"Always use return 0",children:e.jsxs("p",{children:["Although C++ allows omitting ",e.jsx("code",{children:"return 0;"})," from ",e.jsx("code",{children:"main()"})," (the compiler inserts it implicitly), explicitly writing it makes your intent clear. In ",e.jsx("code",{children:"main()"}),", returning 0 signals successful execution to the operating system."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Variations"}),e.jsx(t,{title:"Multiple output statements",children:`#include <iostream>

int main() {
    std::cout << "Hello, ";
    std::cout << "World!" << std::endl;
    std::cout << "Welcome to C++." << std::endl;
    return 0;
}`}),e.jsx(r,{children:`Hello, World!
Welcome to C++.`}),e.jsx(a,{title:"Modify the Program",difficulty:"beginner",prompt:"Modify the Hello World program to print your name on a separate line after 'Hello, World!'.",hints:["Add another std::cout statement after the first one","Use std::endl or '\\n' to create a new line"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    std::cout << "My name is Alice." << std::endl;
    return 0;
}`})}),e.jsx(a,{title:"Print a Pattern",difficulty:"beginner",prompt:"Write a program that prints a simple triangle pattern using asterisks (*).",hints:["Use multiple std::cout statements, one per line","Each line should have one more asterisk than the previous"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    std::cout << "*" << std::endl;
    std::cout << "**" << std::endl;
    std::cout << "***" << std::endl;
    std::cout << "****" << std::endl;
    return 0;
}`})}),e.jsx(m,{references:[{type:"cppreference",title:"std::cout",url:"https://en.cppreference.com/w/cpp/io/cout",description:"Standard output stream documentation"},{type:"cppreference",title:"std::endl",url:"https://en.cppreference.com/w/cpp/io/manip/endl",description:"End-of-line manipulator"},{type:"textbook",title:"Programming: Principles and Practice Using C++",author:"Bjarne Stroustrup",description:"Chapter 2: Hello, World!"}]})]})}const q=Object.freeze(Object.defineProperty({__proto__:null,default:I},Symbol.toStringTag,{value:"Module"}));function g({title:n="Warning",children:s}){return e.jsxs("div",{className:"my-6 rounded-xl border-l-4 border-red-400 bg-red-50/80 p-4 sm:p-5 dark:border-red-600 dark:bg-red-900/20",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("svg",{className:"h-5 w-5 text-red-500 dark:text-red-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})}),e.jsx("span",{className:"text-sm font-semibold text-red-800 dark:text-red-300",children:n})]}),e.jsx("div",{className:"mt-3 text-sm leading-relaxed text-red-900/80 dark:text-red-200/80",children:s})]})}function W(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Unlike interpreted languages like Python or JavaScript, C++ is a ",e.jsx("strong",{children:"compiled language"}),". Your source code goes through several stages of transformation before it becomes an executable program. Understanding this process helps you debug errors and write better code."]}),e.jsx(h,{title:"Compilation",children:e.jsx("p",{children:"Compilation is the process of translating human-readable source code into machine code (binary instructions) that the computer's processor can execute directly. In C++, this is a multi-stage pipeline."})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"The Four Stages"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300",children:"The C++ build process has four distinct stages:"}),e.jsx("div",{className:"rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800/40",children:e.jsxs("ol",{className:"space-y-4 text-sm text-gray-700 dark:text-gray-300",children:[e.jsxs("li",{className:"flex gap-3",children:[e.jsx("span",{className:"flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",children:"1"}),e.jsxs("div",{children:[e.jsx("strong",{className:"text-gray-900 dark:text-gray-100",children:"Preprocessing"})," — The preprocessor handles directives like ",e.jsx("code",{children:"#include"}),", ",e.jsx("code",{children:"#define"}),", and ",e.jsx("code",{children:"#ifdef"}),". It expands macros and includes header file contents."]})]}),e.jsxs("li",{className:"flex gap-3",children:[e.jsx("span",{className:"flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700 dark:bg-green-900/40 dark:text-green-400",children:"2"}),e.jsxs("div",{children:[e.jsx("strong",{className:"text-gray-900 dark:text-gray-100",children:"Compilation"})," — The compiler translates the preprocessed source code into assembly language for the target architecture."]})]}),e.jsxs("li",{className:"flex gap-3",children:[e.jsx("span",{className:"flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",children:"3"}),e.jsxs("div",{children:[e.jsx("strong",{className:"text-gray-900 dark:text-gray-100",children:"Assembly"})," — The assembler converts assembly language into machine code (object files, typically ",e.jsx("code",{children:".o"})," or ",e.jsx("code",{children:".obj"}),")."]})]}),e.jsxs("li",{className:"flex gap-3",children:[e.jsx("span",{className:"flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",children:"4"}),e.jsxs("div",{children:[e.jsx("strong",{className:"text-gray-900 dark:text-gray-100",children:"Linking"})," — The linker combines object files and libraries into the final executable binary."]})]})]})}),e.jsx(l,{title:"Source → Executable Pipeline",children:e.jsx(t,{children:`// Source file: hello.cpp
// Stage 1: Preprocessing  →  hello.ii (expanded source)
// Stage 2: Compilation     →  hello.s  (assembly)
// Stage 3: Assembly        →  hello.o  (object file)
// Stage 4: Linking         →  hello    (executable)`})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Seeing Each Stage"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300",children:"You can observe each stage using compiler flags:"}),e.jsx(t,{title:"Preprocessing only",children:`g++ -E hello.cpp -o hello.ii
# Output: expanded source with all #includes resolved`}),e.jsx(t,{title:"Compilation to assembly",children:`g++ -S hello.cpp -o hello.s
# Output: human-readable assembly code`}),e.jsx(t,{title:"Compilation to object file",children:`g++ -c hello.cpp -o hello.o
# Output: binary object file`}),e.jsx(t,{title:"Full build (all stages)",children:`g++ hello.cpp -o hello
# Output: final executable`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Compiler Errors vs Linker Errors"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300",children:"Understanding which stage produces an error helps you fix it faster:"}),e.jsx(t,{title:"Compiler error (syntax)",children:`#include <iostream>

int main() {
    std::cout << "Hello"  // Missing semicolon!
    return 0;
}`}),e.jsx(r,{title:"Compiler error output",children:`hello.cpp:4:29: error: expected ';' after expression
    std::cout << "Hello"
                        ^
                        ;
1 error generated.`}),e.jsx(t,{title:"Linker error (undefined reference)",children:`// main.cpp
void greet();  // Declared but never defined

int main() {
    greet();
    return 0;
}`}),e.jsx(r,{title:"Linker error output",children:`/tmp/main-abc123.o: In function 'main':
main.cpp:(.text+0x5): undefined reference to 'greet()'
collect2: error: ld returned 1 exit status`}),e.jsx(g,{title:"Common Compilation Mistakes",children:e.jsxs("ul",{className:"list-disc pl-5 space-y-1",children:[e.jsxs("li",{children:["Forgetting to include the required header (",e.jsx("code",{children:"#include"}),")"]}),e.jsx("li",{children:"Misspelling identifiers (C++ is case-sensitive)"}),e.jsx("li",{children:"Missing semicolons at the end of statements"}),e.jsx("li",{children:"Mismatched braces or parentheses"})]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Useful Compiler Flags"}),e.jsx(t,{title:"Recommended flags for learning",children:`# Enable warnings (highly recommended!)
g++ -Wall -Wextra -o hello hello.cpp

# Specify C++ standard version
g++ -std=c++17 -o hello hello.cpp

# All together (recommended for learning)
g++ -std=c++17 -Wall -Wextra -Wpedantic -o hello hello.cpp`}),e.jsx(j,{compiler:"gcc",children:e.jsxs("p",{children:[e.jsx("code",{children:"-Wall"})," enables most warnings. ",e.jsx("code",{children:"-Wextra"})," enables additional warnings not covered by ",e.jsx("code",{children:"-Wall"}),". ",e.jsx("code",{children:"-Wpedantic"})," warns about non-standard extensions."]})}),e.jsx(j,{compiler:"msvc",title:"MSVC (Windows)",children:e.jsxs("p",{children:["On Windows with Visual Studio, use ",e.jsx("code",{children:"cl /W4 /EHsc hello.cpp"}),". The ",e.jsx("code",{children:"/W4"})," flag is the MSVC equivalent of ",e.jsx("code",{children:"-Wall -Wextra"}),"."]})}),e.jsx(u,{title:"Always Enable Warnings",children:e.jsxs("p",{children:["Compile with ",e.jsx("code",{children:"-Wall -Wextra"})," from day one. Warnings catch bugs that compile successfully but behave incorrectly. Treat warnings as errors during development with ",e.jsx("code",{children:"-Werror"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Multiple Source Files"}),e.jsx(t,{title:"greet.cpp",children:`#include <iostream>

void greet() {
    std::cout << "Hello from greet()!" << std::endl;
}`}),e.jsx(t,{title:"main.cpp",children:`void greet();  // Declaration

int main() {
    greet();
    return 0;
}`}),e.jsx(t,{title:"Compiling multiple files",children:`g++ -o program main.cpp greet.cpp
./program`}),e.jsx(r,{children:"Hello from greet()!"}),e.jsx(a,{title:"Identify the Error Type",difficulty:"beginner",prompt:"For each of these errors, determine if it's a preprocessor error, compiler error, or linker error: (1) misspelled header name, (2) missing semicolon, (3) calling a function that's declared but not defined.",solution:e.jsxs("div",{className:"text-sm text-gray-700 dark:text-gray-300 space-y-1",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"1."})," Preprocessor error — the #include directive fails"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"2."})," Compiler error — syntax violation"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"3."})," Linker error — undefined reference"]})]})}),e.jsx(m,{references:[{type:"cppreference",title:"Translation phases",url:"https://en.cppreference.com/w/cpp/language/translation_phases",description:"Official phases of C++ translation"},{type:"textbook",title:"The C++ Programming Language",author:"Bjarne Stroustrup",description:"Chapter 2.2: Programs"}]})]})}const G=Object.freeze(Object.defineProperty({__proto__:null,default:W},Symbol.toStringTag,{value:"Module"}));function z(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"A well-structured C++ program separates concerns into headers and source files, organizes code with namespaces, and uses comments to explain intent. Understanding these structural elements is essential before writing larger programs."}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Headers and Source Files"}),e.jsx(h,{title:"Header Files (.h / .hpp)",children:e.jsxs("p",{children:["Header files contain ",e.jsx("strong",{children:"declarations"})," — function prototypes, class definitions, constants, and type aliases. They tell the compiler ",e.jsx("em",{children:"what exists"})," without providing the full implementation."]})}),e.jsx(h,{title:"Source Files (.cpp)",children:e.jsxs("p",{children:["Source files contain ",e.jsx("strong",{children:"definitions"})," — the actual implementations of functions and methods. Each source file is compiled independently into an object file."]})}),e.jsx(t,{title:"math_utils.h",children:`#ifndef MATH_UTILS_H
#define MATH_UTILS_H

// Function declarations (prototypes)
int add(int a, int b);
int multiply(int a, int b);

#endif // MATH_UTILS_H`}),e.jsx(t,{title:"math_utils.cpp",children:`#include "math_utils.h"

// Function definitions (implementations)
int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}`}),e.jsx(t,{title:"main.cpp",children:`#include <iostream>
#include "math_utils.h"

int main() {
    std::cout << "3 + 4 = " << add(3, 4) << std::endl;
    std::cout << "3 * 4 = " << multiply(3, 4) << std::endl;
    return 0;
}`}),e.jsx(r,{children:`3 + 4 = 7
3 * 4 = 12`}),e.jsxs(l,{title:"Include Guards",children:[e.jsx("p",{children:"Include guards prevent a header from being included multiple times in the same translation unit, which would cause redefinition errors."}),e.jsx(t,{children:`// Traditional include guard
#ifndef HEADER_NAME_H
#define HEADER_NAME_H
// ... declarations ...
#endif

// Modern alternative (non-standard but widely supported)
#pragma once
// ... declarations ...`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Namespaces"}),e.jsx(h,{title:"Namespace",children:e.jsx("p",{children:"A namespace is a declarative region that provides a scope for identifiers inside it. Namespaces prevent name collisions when combining code from different libraries."})}),e.jsx(t,{title:"Using namespaces",children:`#include <iostream>

namespace geometry {
    double area(double radius) {
        return 3.14159 * radius * radius;
    }
}

namespace physics {
    double area(double length, double width) {
        return length * width;
    }
}

int main() {
    std::cout << "Circle area: " << geometry::area(5.0) << std::endl;
    std::cout << "Rectangle area: " << physics::area(3.0, 4.0) << std::endl;
    return 0;
}`}),e.jsx(r,{children:`Circle area: 78.5398
Rectangle area: 12`}),e.jsx(i,{type:"important",title:"Avoid 'using namespace std;'",children:e.jsxs("p",{children:["While ",e.jsx("code",{children:"using namespace std;"})," saves typing, it pulls ",e.jsx("em",{children:"everything"})," from the standard library into the global scope. This can cause name collisions and makes code harder to read. Prefer ",e.jsx("code",{children:"std::"})," prefix or selective ",e.jsx("code",{children:"using"})," declarations."]})}),e.jsxs(u,{title:"Selective using Declarations",children:[e.jsxs("p",{children:["If you want to avoid typing ",e.jsx("code",{children:"std::"})," repeatedly, use selective declarations instead of importing the entire namespace:"]}),e.jsx(t,{children:`using std::cout;
using std::endl;
// Now you can write: cout << "Hello" << endl;`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Comments"}),e.jsx(l,{title:"Comment Syntax",children:e.jsx(t,{children:`// Single-line comment

/* Multi-line
   comment */

/// Documentation comment (used by tools like Doxygen)
/// @param x The input value
/// @return The squared value
int square(int x) {
    return x * x;
}`})}),e.jsxs(u,{title:"Comment the Why, Not the What",children:[e.jsxs("p",{children:["Good comments explain ",e.jsx("em",{children:"why"})," code exists, not ",e.jsx("em",{children:"what"})," it does. The code itself should be readable enough to show what it does."]}),e.jsx(t,{children:`// Bad: increment i by 1
i++;

// Good: skip the header row in the CSV data
i++;`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Statements and Expressions"}),e.jsx(h,{title:"Statement",children:e.jsxs("p",{children:["A statement is a complete instruction that performs an action. Most statements in C++ end with a semicolon (",e.jsx("code",{children:";"}),"). A compound statement (block) is enclosed in braces ",e.jsx("code",{children:"{}"}),"."]})}),e.jsx(t,{title:"Types of statements",children:`#include <iostream>

int main() {
    // Declaration statement
    int x = 42;

    // Expression statement
    x = x + 1;

    // Output statement
    std::cout << x << std::endl;

    // Compound statement (block)
    {
        int y = 10;
        std::cout << y << std::endl;
    }
    // y is no longer accessible here

    return 0;  // Jump statement
}`}),e.jsx(a,{title:"Organize into Files",difficulty:"beginner",prompt:"Given a program that converts temperatures, split it into a header file (converter.h), source file (converter.cpp), and main file (main.cpp). The converter should have functions celsius_to_fahrenheit and fahrenheit_to_celsius.",hints:["The header file should contain function declarations with include guards","The source file should #include the header and provide implementations","The main file should #include the header and call the functions"],solution:e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{title:"converter.h",children:`#pragma once

double celsius_to_fahrenheit(double c);
double fahrenheit_to_celsius(double f);`}),e.jsx(t,{title:"converter.cpp",children:`#include "converter.h"

double celsius_to_fahrenheit(double c) {
    return c * 9.0 / 5.0 + 32.0;
}

double fahrenheit_to_celsius(double f) {
    return (f - 32.0) * 5.0 / 9.0;
}`}),e.jsx(t,{title:"main.cpp",children:`#include <iostream>
#include "converter.h"

int main() {
    std::cout << "100C = " << celsius_to_fahrenheit(100) << "F" << std::endl;
    std::cout << "212F = " << fahrenheit_to_celsius(212) << "C" << std::endl;
    return 0;
}`})]})}),e.jsx(m,{references:[{type:"cppreference",title:"Namespaces",url:"https://en.cppreference.com/w/cpp/language/namespace",description:"Namespace declaration and usage"},{type:"cppreference",title:"Header files",url:"https://en.cppreference.com/w/cpp/header",description:"C++ standard library headers"},{type:"textbook",title:"A Tour of C++",author:"Bjarne Stroustrup",description:"Chapter 3: Modularity"}]})]})}const V=Object.freeze(Object.defineProperty({__proto__:null,default:z},Symbol.toStringTag,{value:"Module"}));function L(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++ is a ",e.jsx("strong",{children:"statically typed"})," language — every variable must have a declared type, and that type is checked at compile time. Understanding the fundamental types is essential because they determine how much memory is used and what operations are valid."]}),e.jsx(h,{title:"Fundamental Types",children:e.jsx("p",{children:"Fundamental (or built-in) types are the basic data types provided directly by the C++ language. They include integer types, floating-point types, character types, and the boolean type."})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Integer Types"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700 text-left",children:[e.jsx("th",{className:"py-2 pr-4 font-semibold text-gray-900 dark:text-gray-100",children:"Type"}),e.jsx("th",{className:"py-2 pr-4 font-semibold text-gray-900 dark:text-gray-100",children:"Typical Size"}),e.jsx("th",{className:"py-2 pr-4 font-semibold text-gray-900 dark:text-gray-100",children:"Range"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-100 dark:border-gray-800",children:[e.jsx("td",{className:"py-2 pr-4 font-mono text-blue-600 dark:text-blue-400",children:"short"}),e.jsx("td",{className:"py-2 pr-4",children:"2 bytes"}),e.jsx("td",{className:"py-2 pr-4",children:"-32,768 to 32,767"})]}),e.jsxs("tr",{className:"border-b border-gray-100 dark:border-gray-800",children:[e.jsx("td",{className:"py-2 pr-4 font-mono text-blue-600 dark:text-blue-400",children:"int"}),e.jsx("td",{className:"py-2 pr-4",children:"4 bytes"}),e.jsx("td",{className:"py-2 pr-4",children:"-2.1 billion to 2.1 billion"})]}),e.jsxs("tr",{className:"border-b border-gray-100 dark:border-gray-800",children:[e.jsx("td",{className:"py-2 pr-4 font-mono text-blue-600 dark:text-blue-400",children:"long"}),e.jsx("td",{className:"py-2 pr-4",children:"4 or 8 bytes"}),e.jsx("td",{className:"py-2 pr-4",children:"Platform-dependent"})]}),e.jsxs("tr",{className:"border-b border-gray-100 dark:border-gray-800",children:[e.jsx("td",{className:"py-2 pr-4 font-mono text-blue-600 dark:text-blue-400",children:"long long"}),e.jsx("td",{className:"py-2 pr-4",children:"8 bytes"}),e.jsx("td",{className:"py-2 pr-4",children:"-9.2 quintillion to 9.2 quintillion"})]})]})]})}),e.jsx(t,{title:"Integer types in action",children:`#include <iostream>
#include <climits>

int main() {
    int a = 42;
    short s = 100;
    long long big = 9'000'000'000LL;  // Digit separators (C++14)

    std::cout << "int: " << a << std::endl;
    std::cout << "short: " << s << std::endl;
    std::cout << "long long: " << big << std::endl;
    std::cout << "INT_MAX: " << INT_MAX << std::endl;

    return 0;
}`}),e.jsx(r,{children:`int: 42
short: 100
long long: 9000000000
INT_MAX: 2147483647`}),e.jsx(i,{type:"tip",title:"Digit Separators (C++14)",children:e.jsxs("p",{children:["Use single quotes as digit separators for readability: ",e.jsx("code",{children:"1'000'000"})," instead of ",e.jsx("code",{children:"1000000"}),". The compiler ignores them entirely."]})}),e.jsxs(l,{title:"Unsigned Types",children:[e.jsxs("p",{children:["Adding ",e.jsx("code",{children:"unsigned"})," before an integer type makes it non-negative, doubling the positive range at the cost of no negative values."]}),e.jsx(t,{children:`unsigned int positive = 42;      // 0 to ~4.2 billion
unsigned short small = 65535;    // 0 to 65,535`})]}),e.jsxs(g,{title:"Unsigned Underflow",children:[e.jsx("p",{children:"Subtracting from an unsigned value that reaches 0 wraps around to a huge number instead of going negative. This is a common source of bugs."}),e.jsx(t,{children:`unsigned int x = 0;
x = x - 1;  // x is now 4294967295, not -1!`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Floating-Point Types"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700 text-left",children:[e.jsx("th",{className:"py-2 pr-4 font-semibold text-gray-900 dark:text-gray-100",children:"Type"}),e.jsx("th",{className:"py-2 pr-4 font-semibold text-gray-900 dark:text-gray-100",children:"Size"}),e.jsx("th",{className:"py-2 pr-4 font-semibold text-gray-900 dark:text-gray-100",children:"Precision"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-100 dark:border-gray-800",children:[e.jsx("td",{className:"py-2 pr-4 font-mono text-blue-600 dark:text-blue-400",children:"float"}),e.jsx("td",{className:"py-2 pr-4",children:"4 bytes"}),e.jsx("td",{className:"py-2 pr-4",children:"~7 decimal digits"})]}),e.jsxs("tr",{className:"border-b border-gray-100 dark:border-gray-800",children:[e.jsx("td",{className:"py-2 pr-4 font-mono text-blue-600 dark:text-blue-400",children:"double"}),e.jsx("td",{className:"py-2 pr-4",children:"8 bytes"}),e.jsx("td",{className:"py-2 pr-4",children:"~15 decimal digits"})]}),e.jsxs("tr",{className:"border-b border-gray-100 dark:border-gray-800",children:[e.jsx("td",{className:"py-2 pr-4 font-mono text-blue-600 dark:text-blue-400",children:"long double"}),e.jsx("td",{className:"py-2 pr-4",children:"8-16 bytes"}),e.jsx("td",{className:"py-2 pr-4",children:"~18-33 decimal digits"})]})]})]})}),e.jsx(t,{title:"Floating-point types",children:`#include <iostream>
#include <iomanip>

int main() {
    float f = 3.14159f;       // 'f' suffix for float literals
    double d = 3.141592653589793;
    long double ld = 3.141592653589793238L;  // 'L' suffix

    std::cout << std::setprecision(15);
    std::cout << "float:       " << f << std::endl;
    std::cout << "double:      " << d << std::endl;
    std::cout << "long double: " << ld << std::endl;

    return 0;
}`}),e.jsx(r,{children:`float:       3.14159011840820
double:      3.14159265358979
long double: 3.14159265358979`}),e.jsx(u,{title:"Prefer double over float",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"double"})," as your default floating-point type. ",e.jsx("code",{children:"float"})," has limited precision and is mainly useful when memory is constrained (e.g., GPU programming). On modern hardware, ",e.jsx("code",{children:"double"})," operations are often just as fast."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Character and Boolean Types"}),e.jsx(t,{children:`#include <iostream>

int main() {
    char letter = 'A';        // Single character (1 byte)
    char newline = '\\n';      // Escape sequence
    bool is_valid = true;     // Boolean: true or false

    std::cout << "char: " << letter << std::endl;
    std::cout << "ASCII value: " << static_cast<int>(letter) << std::endl;
    std::cout << "bool: " << is_valid << std::endl;
    std::cout << "bool (alpha): " << std::boolalpha << is_valid << std::endl;

    return 0;
}`}),e.jsx(r,{children:`char: A
ASCII value: 65
bool: 1
bool (alpha): true`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"The sizeof Operator"}),e.jsx(t,{children:`#include <iostream>

int main() {
    std::cout << "char:      " << sizeof(char) << " bytes" << std::endl;
    std::cout << "short:     " << sizeof(short) << " bytes" << std::endl;
    std::cout << "int:       " << sizeof(int) << " bytes" << std::endl;
    std::cout << "long:      " << sizeof(long) << " bytes" << std::endl;
    std::cout << "long long: " << sizeof(long long) << " bytes" << std::endl;
    std::cout << "float:     " << sizeof(float) << " bytes" << std::endl;
    std::cout << "double:    " << sizeof(double) << " bytes" << std::endl;
    std::cout << "bool:      " << sizeof(bool) << " bytes" << std::endl;
    return 0;
}`}),e.jsx(i,{type:"info",title:"Guaranteed Minimums",children:e.jsxs("p",{children:["The C++ standard only guarantees ",e.jsx("em",{children:"minimum"})," sizes: ",e.jsx("code",{children:"char"})," is at least 1 byte,",e.jsx("code",{children:"short"})," at least 2, ",e.jsx("code",{children:"int"})," at least 2, ",e.jsx("code",{children:"long"})," at least 4,",e.jsx("code",{children:"long long"})," at least 8. Actual sizes are platform-dependent."]})}),e.jsx(a,{title:"Type Investigation",difficulty:"beginner",prompt:"Write a program that prints the size of every fundamental type on your system using sizeof. Also print the maximum value of int and the minimum value of int using <climits>.",hints:["Include <climits> for INT_MAX and INT_MIN","sizeof returns the size in bytes"]}),e.jsx(m,{references:[{type:"cppreference",title:"Fundamental types",url:"https://en.cppreference.com/w/cpp/language/types",description:"Complete reference for all C++ fundamental types"},{type:"cppreference",title:"Fixed width integer types",url:"https://en.cppreference.com/w/cpp/types/integer",description:"int32_t, uint64_t, etc. from <cstdint>"}]})]})}const Y=Object.freeze(Object.defineProperty({__proto__:null,default:L},Symbol.toStringTag,{value:"Module"}));function E(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Variables are named storage locations in memory. In C++, every variable has a type, a name, and a value. Understanding how to declare, initialize, and use variables — along with the difference between variables and constants — is fundamental to writing C++ programs."}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Declaration and Initialization"}),e.jsx(l,{title:"Variable Declaration",children:e.jsx(t,{children:`type name;              // Declaration (uninitialized)
type name = value;      // Copy initialization
type name(value);       // Direct initialization
type name{value};       // Brace initialization (C++11) — preferred`})}),e.jsx(t,{title:"Initialization styles",children:`#include <iostream>

int main() {
    int a;              // Uninitialized — contains garbage!
    int b = 42;         // Copy initialization
    int c(42);          // Direct initialization
    int d{42};          // Brace initialization (preferred)
    int e{};            // Value initialization (zero for int)

    std::cout << "b = " << b << std::endl;
    std::cout << "d = " << d << std::endl;
    std::cout << "e = " << e << std::endl;

    return 0;
}`}),e.jsx(r,{children:`b = 42
d = 42
e = 0`}),e.jsxs(g,{title:"Uninitialized Variables",children:[e.jsxs("p",{children:["Reading an uninitialized variable is ",e.jsx("strong",{children:"undefined behavior"}),". The variable contains whatever was previously in that memory location. Always initialize your variables."]}),e.jsx(t,{children:`int x;
std::cout << x;  // Undefined behavior! Could print anything.`})]}),e.jsxs(u,{title:"Prefer Brace Initialization",children:[e.jsxs("p",{children:["Brace initialization ",e.jsx("code",{children:"int x{42}"})," is the safest form because it prevents",e.jsx("strong",{children:" narrowing conversions"})," — the compiler will error if data would be lost."]}),e.jsx(t,{children:`int x{3.14};     // ERROR: narrowing conversion from double to int
int y = 3.14;    // OK but silently truncates to 3 — potential bug!`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Constants"}),e.jsx(l,{title:"const and constexpr",children:e.jsx(t,{children:`const double PI = 3.14159265358979;      // Runtime constant
constexpr int MAX_SIZE = 100;            // Compile-time constant (C++11)

// const: value set once, then immutable
// constexpr: value must be computable at compile time`})}),e.jsx(t,{children:`#include <iostream>

int main() {
    const int max_attempts = 3;
    constexpr double gravity = 9.81;

    // max_attempts = 5;   // ERROR: cannot modify const
    // gravity = 10.0;     // ERROR: cannot modify constexpr

    std::cout << "Max attempts: " << max_attempts << std::endl;
    std::cout << "Gravity: " << gravity << " m/s^2" << std::endl;

    return 0;
}`}),e.jsx(r,{children:`Max attempts: 3
Gravity: 9.81 m/s^2`}),e.jsx(u,{title:"Prefer constexpr over const for Compile-Time Values",children:e.jsxs("p",{children:["If a value is known at compile time, use ",e.jsx("code",{children:"constexpr"}),". This enables compiler optimizations and makes your intent clear. Use ",e.jsx("code",{children:"const"})," for values determined at runtime that should not change after initialization."]})}),e.jsx(i,{type:"history",title:"Evolution of Constants",children:e.jsxs("p",{children:["C used ",e.jsx("code",{children:"#define PI 3.14"})," (preprocessor macro) for constants. C++ introduced",e.jsx("code",{children:"const"})," for type-safe constants. C++11 added ",e.jsx("code",{children:"constexpr"})," for guaranteed compile-time evaluation. Modern C++ strongly prefers ",e.jsx("code",{children:"constexpr"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Type Deduction with auto"}),e.jsx(h,{title:"auto (C++11)",children:e.jsxs("p",{children:["The ",e.jsx("code",{children:"auto"})," keyword lets the compiler deduce the type from the initializer. The variable still has a fixed, static type — it's just inferred by the compiler."]})}),e.jsx(t,{children:`#include <iostream>

int main() {
    auto x = 42;          // int
    auto y = 3.14;        // double
    auto z = 'A';         // char
    auto flag = true;     // bool
    auto name = "Alice";  // const char* (not std::string!)

    std::cout << "x: " << x << " (int)" << std::endl;
    std::cout << "y: " << y << " (double)" << std::endl;
    std::cout << "z: " << z << " (char)" << std::endl;

    return 0;
}`}),e.jsx(r,{children:`x: 42 (int)
y: 3.14 (double)
z: A (char)`}),e.jsx(i,{type:"important",title:"auto Requires an Initializer",children:e.jsxs("p",{children:[e.jsx("code",{children:"auto x;"})," is invalid — the compiler needs an initializer to deduce the type.",e.jsx("code",{children:"auto"}),` doesn't mean "any type" — it means "figure out the type for me."`]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Scope and Lifetime"}),e.jsx(t,{children:`#include <iostream>

int global = 100;  // Global scope — lives for the entire program

int main() {
    int local = 42;  // Local to main()

    {
        int inner = 10;  // Local to this block
        std::cout << "inner: " << inner << std::endl;
        std::cout << "local: " << local << std::endl;   // Accessible
        std::cout << "global: " << global << std::endl;  // Accessible
    }
    // inner is destroyed here

    // std::cout << inner;  // ERROR: inner not in scope
    std::cout << "local: " << local << std::endl;  // Still accessible

    return 0;
}`}),e.jsx(r,{children:`inner: 10
local: 42
global: 100
local: 42`}),e.jsx(u,{title:"Minimize Variable Scope",children:e.jsx("p",{children:"Declare variables as close to their first use as possible and in the narrowest scope needed. This reduces bugs from accidental reuse and makes code easier to understand."})}),e.jsx(a,{title:"Constants and Calculations",difficulty:"beginner",prompt:"Write a program that calculates the area and circumference of a circle. Use constexpr for PI, const for the radius (set to 5.0), and auto for the computed results. Print both values.",hints:["Area = PI * r * r","Circumference = 2 * PI * r","Use constexpr double PI = 3.14159265358979;"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    constexpr double PI = 3.14159265358979;
    const double radius = 5.0;

    auto area = PI * radius * radius;
    auto circumference = 2.0 * PI * radius;

    std::cout << "Radius: " << radius << std::endl;
    std::cout << "Area: " << area << std::endl;
    std::cout << "Circumference: " << circumference << std::endl;

    return 0;
}`})}),e.jsx(m,{references:[{type:"cppreference",title:"Declarations",url:"https://en.cppreference.com/w/cpp/language/declarations",description:"Variable declaration syntax and semantics"},{type:"cppreference",title:"constexpr specifier",url:"https://en.cppreference.com/w/cpp/language/constexpr",description:"Compile-time constant expressions"},{type:"cppreference",title:"auto specifier",url:"https://en.cppreference.com/w/cpp/language/auto",description:"Type deduction for variables"}]})]})}const $=Object.freeze(Object.defineProperty({__proto__:null,default:E},Symbol.toStringTag,{value:"Module"}));function F(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"When you mix different types in expressions or assignments, C++ converts values from one type to another. Some conversions happen automatically (implicit), while others require you to be explicit. Understanding these conversions helps you avoid subtle bugs caused by data loss or unexpected behavior."}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Implicit Conversions"}),e.jsx(h,{title:"Implicit Conversion (Coercion)",children:e.jsx("p",{children:"An implicit conversion is performed automatically by the compiler when a value of one type is used where another type is expected. These happen in assignments, function calls, and mixed-type expressions."})}),e.jsx(t,{title:"Safe implicit conversions (widening)",children:`#include <iostream>

int main() {
    int i = 42;
    double d = i;    // int → double (safe, no data loss)
    long l = i;      // int → long (safe, wider type)

    std::cout << "int: " << i << std::endl;
    std::cout << "double: " << d << std::endl;
    std::cout << "long: " << l << std::endl;

    return 0;
}`}),e.jsx(r,{children:`int: 42
double: 42
long: 42`}),e.jsxs(g,{title:"Dangerous Implicit Conversions (Narrowing)",children:[e.jsx("p",{children:"Narrowing conversions lose data silently. The compiler may warn but will still compile:"}),e.jsx(t,{children:`double pi = 3.14159;
int truncated = pi;     // 3 — fractional part silently lost!

int big = 300;
char c = big;           // Overflow! char can only hold -128 to 127

unsigned int u = -1;    // Wraps to 4294967295!`})]}),e.jsxs(i,{type:"tip",title:"Brace Initialization Catches Narrowing",children:[e.jsx("p",{children:"This is why brace initialization is preferred — it makes narrowing conversions a compile error:"}),e.jsx(t,{children:`int x{3.14};   // ERROR: narrowing conversion
int y = 3.14;  // OK but truncates (potential bug)`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Integer Promotion"}),e.jsxs(l,{title:"Arithmetic Promotion Rules",children:[e.jsxs("p",{children:["In arithmetic expressions, smaller integer types are promoted to ",e.jsx("code",{children:"int"}),' before the operation is performed. If the operands have different types, the "narrower" one is converted to the "wider" one:']}),e.jsx("p",{className:"mt-2 font-mono text-xs text-gray-600 dark:text-gray-400",children:"bool → char → short → int → unsigned int → long → unsigned long → long long → float → double → long double"})]}),e.jsx(t,{children:`#include <iostream>

int main() {
    short a = 10;
    short b = 20;
    // a + b: both promoted to int, result is int
    auto result = a + b;
    std::cout << "sizeof(short): " << sizeof(short) << std::endl;
    std::cout << "sizeof(a + b): " << sizeof(result) << std::endl;

    int i = 7;
    double d = 2.5;
    // i + d: i promoted to double, result is double
    auto mixed = i + d;
    std::cout << "7 + 2.5 = " << mixed << std::endl;

    return 0;
}`}),e.jsx(r,{children:`sizeof(short): 2
sizeof(a + b): 4
7 + 2.5 = 9.5`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Explicit Casts"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300",children:"C++ provides four named cast operators. Each serves a specific purpose:"}),e.jsxs(l,{title:"static_cast — The Standard Cast",children:[e.jsxs("p",{children:["Use ",e.jsx("code",{children:"static_cast"})," for well-defined conversions between related types. This is the most common cast and should be your default choice."]}),e.jsx(t,{children:`double pi = 3.14159;
int truncated = static_cast<int>(pi);  // Explicit: "I know I'm losing precision"

char c = 'A';
int ascii = static_cast<int>(c);       // char → int (65)`})]}),e.jsx(t,{title:"static_cast examples",children:`#include <iostream>

int main() {
    // Integer division vs floating-point division
    int a = 7, b = 2;

    std::cout << "int / int: " << a / b << std::endl;  // 3 (truncated)
    std::cout << "with cast: " << static_cast<double>(a) / b << std::endl;  // 3.5

    // Explicit narrowing
    double value = 99.9;
    int rounded = static_cast<int>(value);
    std::cout << "99.9 → int: " << rounded << std::endl;  // 99 (truncated, not rounded)

    return 0;
}`}),e.jsx(r,{children:`int / int: 3
with cast: 3.5
99.9 → int: 99`}),e.jsxs(i,{type:"info",title:"Other Cast Types",children:[e.jsx("p",{children:"C++ has three other casts for specialized purposes:"}),e.jsxs("ul",{className:"list-disc pl-5 mt-1 space-y-1",children:[e.jsxs("li",{children:[e.jsx("code",{children:"const_cast"})," — removes or adds const (rarely needed)"]}),e.jsxs("li",{children:[e.jsx("code",{children:"dynamic_cast"})," — safe downcasting in class hierarchies (OOP topic)"]}),e.jsxs("li",{children:[e.jsx("code",{children:"reinterpret_cast"})," — low-level bit reinterpretation (advanced/dangerous)"]})]})]}),e.jsxs(g,{title:"Avoid C-Style Casts",children:[e.jsxs("p",{children:["C-style casts like ",e.jsx("code",{children:"(int)3.14"})," still work in C++ but are dangerous — they can perform any cast, including unsafe ones, with no compiler checks. Always use C++ named casts."]}),e.jsx(t,{children:`// Bad: C-style cast (avoid)
int x = (int)3.14;

// Good: C++ named cast (preferred)
int y = static_cast<int>(3.14);`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Boolean Conversions"}),e.jsx(t,{children:`#include <iostream>

int main() {
    // Integers to bool: 0 is false, everything else is true
    bool a = 0;     // false
    bool b = 1;     // true
    bool c = -5;    // true
    bool d = 42;    // true

    // Bool to int: false → 0, true → 1
    int x = true;   // 1
    int y = false;  // 0

    std::cout << std::boolalpha;
    std::cout << "0 → bool: " << a << std::endl;
    std::cout << "42 → bool: " << d << std::endl;
    std::cout << "true → int: " << x << std::endl;

    return 0;
}`}),e.jsx(r,{children:`0 → bool: false
42 → bool: true
true → int: 1`}),e.jsx(u,{title:"Be Explicit About Conversions",children:e.jsxs("p",{children:["When you need a type conversion, use ",e.jsx("code",{children:"static_cast"})," to document your intent. This makes the conversion visible to other developers and to code review tools. Let narrowing conversions be caught by brace initialization wherever possible."]})}),e.jsx(a,{title:"Safe Division",difficulty:"beginner",prompt:"Write a function that performs integer division but returns a double result (e.g., divide(7, 2) should return 3.5, not 3). Use static_cast.",hints:["Cast at least one operand to double before dividing","If both operands are int, the result will be truncated"],solution:e.jsx(t,{children:`#include <iostream>

double divide(int a, int b) {
    return static_cast<double>(a) / b;
}

int main() {
    std::cout << "7 / 2 = " << divide(7, 2) << std::endl;
    std::cout << "10 / 3 = " << divide(10, 3) << std::endl;
    return 0;
}`})}),e.jsx(m,{references:[{type:"cppreference",title:"Implicit conversions",url:"https://en.cppreference.com/w/cpp/language/implicit_conversion",description:"All implicit conversion rules"},{type:"cppreference",title:"static_cast",url:"https://en.cppreference.com/w/cpp/language/static_cast",description:"The standard explicit cast operator"},{type:"textbook",title:"Effective Modern C++",author:"Scott Meyers",description:"Item 2: Understand auto type deduction"}]})]})}const X=Object.freeze(Object.defineProperty({__proto__:null,default:F},Symbol.toStringTag,{value:"Module"}));function P(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Arithmetic operators let you perform mathematical calculations in C++. Understanding how they behave with different data types — especially the difference between integer and floating-point division — is essential for writing correct programs."}),e.jsx(h,{title:"Arithmetic Operators",children:e.jsxs("p",{children:["C++ provides five basic arithmetic operators: addition (",e.jsx("code",{children:"+"}),"), subtraction (",e.jsx("code",{children:"-"}),"), multiplication (",e.jsx("code",{children:"*"}),"), division (",e.jsx("code",{children:"/"}),"), and modulo (",e.jsx("code",{children:"%"}),"). These work on numeric types and follow standard mathematical precedence rules."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Basic Arithmetic"}),e.jsx(t,{title:"arithmetic_basics.cpp",children:`#include <iostream>

int main() {
    int a = 17, b = 5;

    std::cout << "a + b = " << (a + b) << std::endl;
    std::cout << "a - b = " << (a - b) << std::endl;
    std::cout << "a * b = " << (a * b) << std::endl;
    std::cout << "a / b = " << (a / b) << std::endl;
    std::cout << "a % b = " << (a % b) << std::endl;

    return 0;
}`}),e.jsx(r,{children:`a + b = 22
a - b = 12
a * b = 85
a / b = 3
a % b = 2`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Integer vs Floating-Point Division"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["When both operands of ",e.jsx("code",{children:"/"})," are integers, C++ performs ",e.jsx("strong",{children:"integer division"}),", which truncates the result toward zero. To get a decimal result, at least one operand must be a floating-point type."]}),e.jsx(t,{title:"division_types.cpp",children:`#include <iostream>

int main() {
    std::cout << "Integer:  17 / 5  = " << (17 / 5) << std::endl;
    std::cout << "Float:    17.0 / 5 = " << (17.0 / 5) << std::endl;
    std::cout << "Cast:     " << static_cast<double>(17) / 5 << std::endl;

    // Negative integer division truncates toward zero
    std::cout << "Negative: -17 / 5 = " << (-17 / 5) << std::endl;

    return 0;
}`}),e.jsx(r,{children:`Integer:  17 / 5  = 3
Float:    17.0 / 5 = 3.4
Cast:     3.4
Negative: -17 / 5 = -3`}),e.jsx(g,{title:"Division by Zero",children:e.jsxs("p",{children:["Dividing an integer by zero causes ",e.jsx("strong",{children:"undefined behavior"})," — your program may crash, produce garbage, or behave unpredictably. Floating-point division by zero produces infinity or NaN. Always validate divisors before dividing."]})}),e.jsxs(l,{title:"The Modulo Operator (%)",children:[e.jsxs("p",{children:["The modulo operator returns the ",e.jsx("strong",{children:"remainder"})," of integer division. It only works with integer types. The result has the same sign as the dividend (left operand)."]}),e.jsx(t,{children:`int remainder = 17 % 5;   // 2
int negative  = -17 % 5;  // -2`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Increment and Decrement"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The ",e.jsx("code",{children:"++"})," and ",e.jsx("code",{children:"--"})," operators add or subtract 1 from a variable. The prefix form (",e.jsx("code",{children:"++x"}),") modifies the variable and returns the ",e.jsx("em",{children:"new"})," value, while the postfix form (",e.jsx("code",{children:"x++"}),") returns the ",e.jsx("em",{children:"original"})," value, then modifies it."]}),e.jsx(t,{title:"increment_decrement.cpp",children:`#include <iostream>

int main() {
    int x = 5;

    std::cout << "x     = " << x << std::endl;
    std::cout << "++x   = " << ++x << std::endl;  // x is now 6, returns 6
    std::cout << "x++   = " << x++ << std::endl;  // returns 6, then x becomes 7
    std::cout << "x now = " << x << std::endl;

    std::cout << "--x   = " << --x << std::endl;  // x is now 6, returns 6

    return 0;
}`}),e.jsx(r,{children:`x     = 5
++x   = 6
x++   = 6
x now = 7
--x   = 6`}),e.jsx(u,{title:"Prefer prefix increment",children:e.jsxs("p",{children:["When you do not need the old value, prefer ",e.jsx("code",{children:"++x"})," over ",e.jsx("code",{children:"x++"}),". For built-in types the difference is negligible, but for iterators and user-defined types, prefix increment avoids creating an unnecessary temporary copy."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Compound Assignment Operators"}),e.jsxs(l,{title:"Compound Assignment",children:[e.jsx("p",{children:"Compound assignment operators combine an arithmetic operation with assignment. They are shorthand that makes code more concise and sometimes more efficient."}),e.jsx(t,{children:`x += 5;   // same as x = x + 5
x -= 3;   // same as x = x - 3
x *= 2;   // same as x = x * 2
x /= 4;   // same as x = x / 4
x %= 3;   // same as x = x % 3`})]}),e.jsx(t,{title:"compound_assignment.cpp",children:`#include <iostream>

int main() {
    int score = 100;

    score += 25;
    std::cout << "After +25: " << score << std::endl;

    score -= 10;
    std::cout << "After -10: " << score << std::endl;

    score *= 2;
    std::cout << "After *2:  " << score << std::endl;

    score /= 3;
    std::cout << "After /3:  " << score << std::endl;

    score %= 7;
    std::cout << "After %7:  " << score << std::endl;

    return 0;
}`}),e.jsx(r,{children:`After +25: 125
After -10: 115
After *2:  230
After /3:  76
After %7:  6`}),e.jsx(i,{type:"tip",title:"Operator Precedence",children:e.jsxs("p",{children:["Multiplication, division, and modulo have higher precedence than addition and subtraction, just like in mathematics. Use parentheses to make your intent clear:",e.jsx("code",{children:" int result = (a + b) * c;"})]})}),e.jsx(a,{title:"Temperature Converter",difficulty:"beginner",prompt:"Write a program that converts a Celsius temperature of 37 to Fahrenheit using the formula F = C * 9 / 5 + 32. Make sure to use floating-point division to get an accurate result.",hints:["Use a double variable to store the Celsius value","Multiply by 9.0 (not 9) to force floating-point division"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    double celsius = 37.0;
    double fahrenheit = celsius * 9.0 / 5.0 + 32.0;

    std::cout << celsius << " C = " << fahrenheit << " F" << std::endl;
    return 0;
}`})}),e.jsx(a,{title:"Digit Extractor",difficulty:"intermediate",prompt:"Given the integer 7364, use division and modulo to extract and print each digit separately (ones, tens, hundreds, thousands).",hints:["The ones digit is number % 10","Divide by 10 to shift digits right, then use % 10 again"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    int number = 7364;

    int ones      = number % 10;
    int tens      = (number / 10) % 10;
    int hundreds  = (number / 100) % 10;
    int thousands = (number / 1000) % 10;

    std::cout << "Thousands: " << thousands << std::endl;
    std::cout << "Hundreds:  " << hundreds << std::endl;
    std::cout << "Tens:      " << tens << std::endl;
    std::cout << "Ones:      " << ones << std::endl;

    return 0;
}`})}),e.jsx(m,{references:[{type:"cppreference",title:"Arithmetic Operators",url:"https://en.cppreference.com/w/cpp/language/operator_arithmetic",description:"Complete reference for C++ arithmetic operators"},{type:"cppreference",title:"Operator Precedence",url:"https://en.cppreference.com/w/cpp/language/operator_precedence",description:"Full operator precedence table"},{type:"textbook",title:"Programming: Principles and Practice Using C++",author:"Bjarne Stroustrup",description:"Chapter 3: Objects, Types, and Values"}]})]})}const J=Object.freeze(Object.defineProperty({__proto__:null,default:P},Symbol.toStringTag,{value:"Module"}));function M(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Comparison and logical operators are the foundation of decision-making in C++. They produce boolean results (",e.jsx("code",{children:"true"})," or ",e.jsx("code",{children:"false"}),") that control program flow through conditionals and loops."]}),e.jsx(h,{title:"Comparison Operators",children:e.jsxs("p",{children:["Comparison operators compare two values and return a ",e.jsx("code",{children:"bool"}),". C++ provides six comparison operators: equal to (",e.jsx("code",{children:"=="}),"), not equal to (",e.jsx("code",{children:"!="}),"), less than (",e.jsx("code",{children:"<"}),"), greater than (",e.jsx("code",{children:">"}),"), less than or equal (",e.jsx("code",{children:"<="}),"), and greater than or equal (",e.jsx("code",{children:">="}),")."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Comparison Operators"}),e.jsx(t,{title:"comparisons.cpp",children:`#include <iostream>
#include <string>

int main() {
    int a = 10, b = 20;

    std::cout << std::boolalpha;  // print true/false instead of 1/0
    std::cout << "a == b: " << (a == b) << std::endl;
    std::cout << "a != b: " << (a != b) << std::endl;
    std::cout << "a <  b: " << (a < b)  << std::endl;
    std::cout << "a >  b: " << (a > b)  << std::endl;
    std::cout << "a <= b: " << (a <= b) << std::endl;
    std::cout << "a >= b: " << (a >= b) << std::endl;

    return 0;
}`}),e.jsx(r,{children:`a == b: false
a != b: true
a <  b: true
a >  b: false
a <= b: true
a >= b: false`}),e.jsx(g,{title:"== vs = is a Common Mistake",children:e.jsxs("p",{children:["Writing ",e.jsx("code",{children:"if (x = 5)"})," instead of ",e.jsx("code",{children:"if (x == 5)"})," is a classic bug. The single ",e.jsx("code",{children:"="})," assigns 5 to ",e.jsx("code",{children:"x"})," and the expression evaluates to ",e.jsx("code",{children:"true"})," (since 5 is nonzero). Most compilers will warn about this if you enable warnings with ",e.jsx("code",{children:"-Wall"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Logical Operators"}),e.jsx(h,{title:"Logical Operators",children:e.jsxs("p",{children:["Logical operators combine or negate boolean expressions. Logical AND (",e.jsx("code",{children:"&&"}),") returns ",e.jsx("code",{children:"true"})," when both operands are true. Logical OR (",e.jsx("code",{children:"||"}),") returns ",e.jsx("code",{children:"true"})," when at least one operand is true. Logical NOT (",e.jsx("code",{children:"!"}),") inverts a boolean value."]})}),e.jsx(t,{title:"logical_operators.cpp",children:`#include <iostream>

int main() {
    int age = 25;
    bool hasLicense = true;
    bool isInsured = false;

    std::cout << std::boolalpha;

    // AND: both must be true
    std::cout << "Can drive (age >= 16 && license): "
              << (age >= 16 && hasLicense) << std::endl;

    // OR: at least one must be true
    std::cout << "Has coverage (license || insured): "
              << (hasLicense || isInsured) << std::endl;

    // NOT: inverts the value
    std::cout << "Not insured: " << !isInsured << std::endl;

    // Combining operators
    bool canRent = (age >= 21) && hasLicense && isInsured;
    std::cout << "Can rent a car: " << canRent << std::endl;

    return 0;
}`}),e.jsx(r,{children:`Can drive (age >= 16 && license): true
Has coverage (license || insured): true
Not insured: true
Can rent a car: false`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Short-Circuit Evaluation"}),e.jsx(i,{type:"important",title:"Short-Circuit Evaluation",children:e.jsxs("p",{children:["C++ evaluates logical expressions from left to right and ",e.jsx("strong",{children:"stops as soon as the result is determined"}),". With ",e.jsx("code",{children:"&&"}),", if the left operand is false, the right operand is never evaluated. With ",e.jsx("code",{children:"||"}),", if the left operand is true, the right operand is skipped. This is useful for guarding against errors."]})}),e.jsx(t,{title:"short_circuit.cpp",children:`#include <iostream>

int main() {
    int denominator = 0;

    // Short-circuit prevents division by zero
    if (denominator != 0 && (100 / denominator) > 5) {
        std::cout << "Result is greater than 5" << std::endl;
    } else {
        std::cout << "Denominator is zero, division skipped" << std::endl;
    }

    // With OR, first true stops evaluation
    bool found = true;
    if (found || (std::cout << "This never prints", false)) {
        std::cout << "Found early, no further checks" << std::endl;
    }

    return 0;
}`}),e.jsx(r,{children:`Denominator is zero, division skipped
Found early, no further checks`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Operator Precedence"}),e.jsxs(l,{title:"Precedence Order (High to Low)",children:[e.jsx("p",{children:"When mixing operators, precedence determines the order of evaluation. From highest to lowest among common operators:"}),e.jsx(t,{children:`!          // NOT (highest among logical)
* / %      // Multiplicative
+ -        // Additive
< <= > >=  // Relational
== !=      // Equality
&&         // Logical AND
||         // Logical OR (lowest)`})]}),e.jsx(u,{title:"Use Parentheses for Clarity",children:e.jsxs("p",{children:["Even when operator precedence gives you the correct result, adding parentheses makes your intent explicit and prevents mistakes. Write ",e.jsx("code",{children:"(a > 0) && (b < 10)"}),"rather than relying on the reader to know that comparison binds tighter than logical AND."]})}),e.jsx(i,{type:"tip",title:"Comparing Floating-Point Numbers",children:e.jsxs("p",{children:["Due to rounding errors, avoid comparing floating-point numbers with ",e.jsx("code",{children:"=="}),". Instead, check if the difference is within a small tolerance:",e.jsx("code",{children:" std::abs(a - b) < 0.0001"})]})}),e.jsx(a,{title:"Leap Year Checker",difficulty:"intermediate",prompt:"Write a program that checks whether the year 2024 is a leap year. A year is a leap year if it is divisible by 4, except for years divisible by 100, unless also divisible by 400.",hints:["Use % to check divisibility (year % 4 == 0)","Combine conditions with && and || to match the rule","The full condition: (divisible by 400) OR (divisible by 4 AND NOT divisible by 100)"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    int year = 2024;

    bool isLeap = (year % 400 == 0) ||
                  (year % 4 == 0 && year % 100 != 0);

    std::cout << year << " is "
              << (isLeap ? "a leap year" : "not a leap year")
              << std::endl;

    return 0;
}`})}),e.jsx(a,{title:"Grade Classifier",difficulty:"beginner",prompt:"Write a program that takes a score of 85 and prints whether it falls in the A (90-100), B (80-89), C (70-79), D (60-69), or F (below 60) range using comparison and logical operators.",hints:["Use >= and < to check ranges","Combine with && for range checks like (score >= 80 && score < 90)"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    int score = 85;

    if (score >= 90 && score <= 100) {
        std::cout << "Grade: A" << std::endl;
    } else if (score >= 80) {
        std::cout << "Grade: B" << std::endl;
    } else if (score >= 70) {
        std::cout << "Grade: C" << std::endl;
    } else if (score >= 60) {
        std::cout << "Grade: D" << std::endl;
    } else {
        std::cout << "Grade: F" << std::endl;
    }

    return 0;
}`})}),e.jsx(m,{references:[{type:"cppreference",title:"Comparison Operators",url:"https://en.cppreference.com/w/cpp/language/operator_comparison",description:"Reference for all comparison operators"},{type:"cppreference",title:"Logical Operators",url:"https://en.cppreference.com/w/cpp/language/operator_logical",description:"Logical AND, OR, and NOT operators"},{type:"cppreference",title:"Operator Precedence",url:"https://en.cppreference.com/w/cpp/language/operator_precedence",description:"Complete precedence and associativity table"}]})]})}const K=Object.freeze(Object.defineProperty({__proto__:null,default:M},Symbol.toStringTag,{value:"Module"}));function R(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Bitwise operators work directly on the individual bits of integer values. They are essential in systems programming, embedded development, graphics, networking, and anywhere you need fine-grained control over data at the binary level."}),e.jsx(h,{title:"Bitwise Operators",children:e.jsxs("p",{children:["C++ provides six bitwise operators: AND (",e.jsx("code",{children:"&"}),"), OR (",e.jsx("code",{children:"|"}),"), XOR (",e.jsx("code",{children:"^"}),"), NOT (",e.jsx("code",{children:"~"}),"), left shift (",e.jsx("code",{children:"<<"}),"), and right shift (",e.jsx("code",{children:">>"}),"). They operate on each bit of their integer operands independently."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Bitwise AND, OR, XOR, and NOT"}),e.jsxs(l,{title:"Truth Table",children:[e.jsx("p",{children:"Each bitwise operator applies a logic operation to corresponding bits of two operands (or inverts bits for NOT):"}),e.jsx(t,{children:`// A & B  (AND): 1 only if both bits are 1
// A | B  (OR):  1 if either bit is 1
// A ^ B  (XOR): 1 if bits differ
// ~A     (NOT): flips every bit`})]}),e.jsx(t,{title:"bitwise_basics.cpp",children:`#include <iostream>
#include <bitset>

int main() {
    unsigned char a = 0b11001010;  // 202
    unsigned char b = 0b10110110;  // 182

    std::cout << "a       = " << std::bitset<8>(a) << std::endl;
    std::cout << "b       = " << std::bitset<8>(b) << std::endl;
    std::cout << "a & b   = " << std::bitset<8>(a & b) << std::endl;
    std::cout << "a | b   = " << std::bitset<8>(a | b) << std::endl;
    std::cout << "a ^ b   = " << std::bitset<8>(a ^ b) << std::endl;
    std::cout << "~a      = " << std::bitset<8>(static_cast<unsigned char>(~a)) << std::endl;

    return 0;
}`}),e.jsx(r,{children:`a       = 11001010
b       = 10110110
a & b   = 10000010
a | b   = 11111110
a ^ b   = 01111100
~a      = 00110101`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Shift Operators"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The left shift operator (",e.jsx("code",{children:"<<"}),") moves bits to the left, filling vacated positions with zeros. Each left shift by 1 effectively multiplies by 2. The right shift operator (",e.jsx("code",{children:">>"}),") moves bits right, dividing by 2 for unsigned types."]}),e.jsx(t,{title:"shift_operators.cpp",children:`#include <iostream>
#include <bitset>

int main() {
    unsigned int val = 0b00001101;  // 13

    std::cout << "val      = " << std::bitset<8>(val) << " (" << val << ")" << std::endl;
    std::cout << "val << 1 = " << std::bitset<8>(val << 1) << " (" << (val << 1) << ")" << std::endl;
    std::cout << "val << 3 = " << std::bitset<8>(val << 3) << " (" << (val << 3) << ")" << std::endl;
    std::cout << "val >> 1 = " << std::bitset<8>(val >> 1) << " (" << (val >> 1) << ")" << std::endl;
    std::cout << "val >> 2 = " << std::bitset<8>(val >> 2) << " (" << (val >> 2) << ")" << std::endl;

    return 0;
}`}),e.jsx(r,{children:`val      = 00001101 (13)
val << 1 = 00011010 (26)
val << 3 = 01101000 (104)
val >> 1 = 00000110 (6)
val >> 2 = 00000011 (3)`}),e.jsx(g,{title:"Shifting Signed Integers",children:e.jsxs("p",{children:["Right-shifting a negative signed integer is ",e.jsx("strong",{children:"implementation-defined"})," behavior in C++. The result may vary between compilers. Always use ",e.jsx("code",{children:"unsigned"})," types for bitwise operations to ensure predictable behavior."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Bit Flags and Masking"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"A common use of bitwise operators is storing multiple boolean options in a single integer. Each bit represents a flag. You use OR to set flags, AND with a mask to check them, and XOR to toggle them."}),e.jsx(t,{title:"bit_flags.cpp",children:`#include <iostream>

// Define permission flags as powers of 2
const unsigned int READ    = 1 << 0;  // 0001
const unsigned int WRITE   = 1 << 1;  // 0010
const unsigned int EXECUTE = 1 << 2;  // 0100
const unsigned int ADMIN   = 1 << 3;  // 1000

int main() {
    unsigned int permissions = 0;

    // Set flags using OR
    permissions |= READ;
    permissions |= WRITE;

    // Check flags using AND
    std::cout << "Can read:    " << ((permissions & READ) ? "yes" : "no") << std::endl;
    std::cout << "Can write:   " << ((permissions & WRITE) ? "yes" : "no") << std::endl;
    std::cout << "Can execute: " << ((permissions & EXECUTE) ? "yes" : "no") << std::endl;

    // Toggle a flag using XOR
    permissions ^= WRITE;  // turn off WRITE
    std::cout << "After toggle, can write: "
              << ((permissions & WRITE) ? "yes" : "no") << std::endl;

    // Clear a flag using AND with NOT
    permissions &= ~READ;
    std::cout << "After clear, can read: "
              << ((permissions & READ) ? "yes" : "no") << std::endl;

    return 0;
}`}),e.jsx(r,{children:`Can read:    yes
Can write:   yes
Can execute: no
After toggle, can write: no
After clear, can read: no`}),e.jsx(u,{title:"Use Named Constants for Bit Flags",children:e.jsxs("p",{children:["Always define named constants for your bit flags rather than using raw numbers. Use ",e.jsx("code",{children:"constexpr"})," or ",e.jsx("code",{children:"enum"})," to give each flag a meaningful name. This makes the code self-documenting and prevents errors from mistyped values."]})}),e.jsx(i,{type:"info",title:"Practical Uses of Bitwise Operators",children:e.jsxs("p",{children:["Beyond flags, bitwise operators are used for fast multiplication and division by powers of 2, extracting color channels from packed pixel data (e.g., ",e.jsx("code",{children:"(pixel >> 8) & 0xFF"}),"for the green channel), implementing hash functions, and working with network protocols."]})}),e.jsx(i,{type:"history",title:"Origins",children:e.jsx("p",{children:"Bitwise operators originated in C and were inherited by C++. They map directly to CPU instructions, making them extremely fast. In the early days of computing, when memory was scarce, packing multiple values into a single integer using bit fields was a critical optimization technique."})}),e.jsx(a,{title:"Swap Without Temporary",difficulty:"intermediate",prompt:"Write a program that swaps two integers (a = 5, b = 9) using only XOR bitwise operations, without a temporary variable. Print the values before and after the swap.",hints:["XOR has the property: a ^ a == 0 and a ^ 0 == a","Step 1: a = a ^ b, Step 2: b = a ^ b, Step 3: a = a ^ b"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    int a = 5, b = 9;
    std::cout << "Before: a=" << a << " b=" << b << std::endl;

    a = a ^ b;
    b = a ^ b;
    a = a ^ b;

    std::cout << "After:  a=" << a << " b=" << b << std::endl;
    return 0;
}`})}),e.jsx(a,{title:"Check if Power of Two",difficulty:"intermediate",prompt:"Write a program that checks whether the number 64 is a power of two using a single bitwise expression. A power of two in binary has exactly one bit set (e.g., 8 = 1000).",hints:["If n is a power of 2, then n & (n - 1) equals 0","Also make sure n is greater than 0"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    int n = 64;

    bool isPowerOfTwo = (n > 0) && ((n & (n - 1)) == 0);

    std::cout << n << " is "
              << (isPowerOfTwo ? "" : "not ")
              << "a power of two" << std::endl;
    return 0;
}`})}),e.jsx(m,{references:[{type:"cppreference",title:"Bitwise Operators",url:"https://en.cppreference.com/w/cpp/language/operator_arithmetic",description:"Bitwise AND, OR, XOR, NOT, and shift operators"},{type:"cppreference",title:"std::bitset",url:"https://en.cppreference.com/w/cpp/utility/bitset",description:"Fixed-size bit array for visualizing and manipulating bits"},{type:"textbook",title:"The C++ Programming Language",author:"Bjarne Stroustrup",description:"Chapter 11: Operator Overloading"}]})]})}const Z=Object.freeze(Object.defineProperty({__proto__:null,default:R},Symbol.toStringTag,{value:"Module"}));function B(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Console input and output are how your program communicates with the user. C++ provides stream objects in the ",e.jsx("code",{children:"<iostream>"})," header that make reading input and writing output straightforward and type-safe."]}),e.jsx(h,{title:"Standard Stream Objects",children:e.jsxs("p",{children:["C++ defines three standard streams: ",e.jsx("code",{children:"std::cout"})," for standard output (typically the terminal), ",e.jsx("code",{children:"std::cin"})," for standard input (typically the keyboard), and ",e.jsx("code",{children:"std::cerr"})," for error output (also the terminal, but unbuffered and logically separate from normal output)."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Output with std::cout"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The insertion operator (",e.jsx("code",{children:"<<"}),") sends data to ",e.jsx("code",{children:"std::cout"}),". You can chain multiple values in a single statement, and C++ automatically converts built-in types to their text representation."]}),e.jsx(t,{title:"cout_basics.cpp",children:`#include <iostream>

int main() {
    std::string name = "Alice";
    int age = 30;
    double gpa = 3.85;

    std::cout << "Name: " << name << std::endl;
    std::cout << "Age: " << age << ", GPA: " << gpa << std::endl;
    std::cout << "Multiple " << "values " << "chained " << 42 << '\\n';

    return 0;
}`}),e.jsx(r,{children:`Name: Alice
Age: 30, GPA: 3.85
Multiple values chained 42`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Input with std::cin"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The extraction operator (",e.jsx("code",{children:">>"}),") reads data from ",e.jsx("code",{children:"std::cin"}),". It automatically skips whitespace and converts the input text into the appropriate type based on the variable being read into."]}),e.jsx(t,{title:"cin_basics.cpp",children:`#include <iostream>
#include <string>

int main() {
    std::string name;
    int age;

    std::cout << "Enter your name: ";
    std::cin >> name;  // reads one word (stops at whitespace)

    std::cout << "Enter your age: ";
    std::cin >> age;

    std::cout << "Hello, " << name << "! You are " << age << " years old." << std::endl;

    return 0;
}`}),e.jsx(r,{children:`Enter your name: Alice
Enter your age: 30
Hello, Alice! You are 30 years old.`}),e.jsx(g,{title:"std::cin reads words, not lines",children:e.jsxs("p",{children:["The ",e.jsx("code",{children:">>"}),' operator stops reading at whitespace. If the user types "Alice Smith", only "Alice" is read into ',e.jsx("code",{children:"name"}),". To read an entire line including spaces, use ",e.jsx("code",{children:"std::getline(std::cin, name)"})," instead."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Error Output with std::cerr"}),e.jsxs(l,{title:"std::cerr",children:[e.jsxs("p",{children:["Use ",e.jsx("code",{children:"std::cerr"})," for error messages. It works like ",e.jsx("code",{children:"std::cout"})," but writes to the standard error stream, which is unbuffered (output appears immediately) and can be redirected separately from normal output."]}),e.jsx(t,{children:'std::cerr << "Error: file not found!" << std::endl;'})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Formatted Output"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The ",e.jsx("code",{children:"<iomanip>"})," header provides manipulators for controlling output formatting, including field width, decimal precision, and alignment."]}),e.jsx(t,{title:"formatted_output.cpp",children:`#include <iostream>
#include <iomanip>

int main() {
    double pi = 3.14159265358979;
    double price = 9.5;

    // Set decimal precision
    std::cout << "Default:   " << pi << std::endl;
    std::cout << "Precision: " << std::setprecision(4) << pi << std::endl;
    std::cout << "Fixed:     " << std::fixed << std::setprecision(2) << pi << std::endl;

    // Field width and alignment
    std::cout << std::endl << "--- Price List ---" << std::endl;
    std::cout << std::left << std::setw(15) << "Item"
              << std::right << std::setw(8) << "Price" << std::endl;
    std::cout << std::left << std::setw(15) << "Apple"
              << std::right << "$" << std::setw(7) << std::fixed
              << std::setprecision(2) << 1.29 << std::endl;
    std::cout << std::left << std::setw(15) << "Banana"
              << std::right << "$" << std::setw(7) << 0.59 << std::endl;
    std::cout << std::left << std::setw(15) << "Cherry Pie"
              << std::right << "$" << std::setw(7) << 12.99 << std::endl;

    return 0;
}`}),e.jsx(r,{children:`Default:   3.14159
Precision: 3.142
Fixed:     3.14

--- Price List ---
Item                Price
Apple          $   1.29
Banana         $   0.59
Cherry Pie     $  12.99`}),e.jsx(i,{type:"info",title:"Sticky Manipulators",children:e.jsxs("p",{children:["Most manipulators like ",e.jsx("code",{children:"std::fixed"}),", ",e.jsx("code",{children:"std::setprecision"}),", and ",e.jsx("code",{children:"std::left"}),' are "sticky" — they remain in effect for all subsequent output until changed. The exception is ',e.jsx("code",{children:"std::setw"}),", which only applies to the very next output operation."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Input Validation"}),e.jsx(t,{title:"input_validation.cpp",children:`#include <iostream>
#include <limits>

int main() {
    int number;

    std::cout << "Enter an integer: ";
    std::cin >> number;

    if (std::cin.fail()) {
        std::cerr << "Invalid input! Not an integer." << std::endl;

        // Clear the error state and discard bad input
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n');
    } else {
        std::cout << "You entered: " << number << std::endl;
    }

    return 0;
}`}),e.jsx(u,{title:"Always Validate User Input",children:e.jsxs("p",{children:["Never assume user input is correct. Check ",e.jsx("code",{children:"std::cin.fail()"})," after reading, and handle errors gracefully. Clear the error state with ",e.jsx("code",{children:"std::cin.clear()"}),"and discard remaining bad input with ",e.jsx("code",{children:"std::cin.ignore()"})," before attempting to read again."]})}),e.jsx(i,{type:"tip",title:"Mixing cin >> and getline",children:e.jsxs("p",{children:["After using ",e.jsx("code",{children:"std::cin >>"}),", a newline character remains in the input buffer. If you follow with ",e.jsx("code",{children:"std::getline()"}),", it reads that leftover newline as an empty string. Fix this by calling ",e.jsx("code",{children:"std::cin.ignore()"})," between them."]})}),e.jsx(a,{title:"Simple Calculator",difficulty:"beginner",prompt:"Write a program that reads two doubles and an operator character (+, -, *, /) from the user, performs the calculation, and prints the result formatted to 2 decimal places.",hints:["Use std::cin >> to read two doubles and a char","Use if/else or switch to select the operation","Use std::fixed and std::setprecision(2) for formatting"],solution:e.jsx(t,{children:`#include <iostream>
#include <iomanip>

int main() {
    double a, b;
    char op;

    std::cout << "Enter: number operator number" << std::endl;
    std::cin >> a >> op >> b;

    std::cout << std::fixed << std::setprecision(2);

    if (op == '+') std::cout << a << " + " << b << " = " << (a + b) << std::endl;
    else if (op == '-') std::cout << a << " - " << b << " = " << (a - b) << std::endl;
    else if (op == '*') std::cout << a << " * " << b << " = " << (a * b) << std::endl;
    else if (op == '/' && b != 0) std::cout << a << " / " << b << " = " << (a / b) << std::endl;
    else std::cerr << "Invalid operator or division by zero" << std::endl;

    return 0;
}`})}),e.jsx(a,{title:"Formatted Table",difficulty:"intermediate",prompt:"Write a program that prints a multiplication table for numbers 1 through 5, with each column right-aligned and 5 characters wide.",hints:["Use nested loops: outer for rows, inner for columns","Use std::setw(5) before each number","Remember std::setw only applies to the next output"],solution:e.jsx(t,{children:`#include <iostream>
#include <iomanip>

int main() {
    for (int i = 1; i <= 5; ++i) {
        for (int j = 1; j <= 5; ++j) {
            std::cout << std::setw(5) << (i * j);
        }
        std::cout << std::endl;
    }
    return 0;
}`})}),e.jsx(m,{references:[{type:"cppreference",title:"std::cin",url:"https://en.cppreference.com/w/cpp/io/cin",description:"Standard input stream"},{type:"cppreference",title:"std::cout",url:"https://en.cppreference.com/w/cpp/io/cout",description:"Standard output stream"},{type:"cppreference",title:"Input/Output Manipulators",url:"https://en.cppreference.com/w/cpp/io/manip",description:"setw, setprecision, fixed, and other formatting manipulators"}]})]})}const Q=Object.freeze(Object.defineProperty({__proto__:null,default:B},Symbol.toStringTag,{value:"Module"}));function D(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Text handling is fundamental to most programs. C++ provides ",e.jsx("code",{children:"std::string"}),", a powerful and safe string class that manages memory automatically and offers a rich set of operations for searching, modifying, and comparing text."]}),e.jsx(h,{title:"std::string",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::string"})," is a class defined in the ",e.jsx("code",{children:"<string>"})," header that represents a sequence of characters. Unlike C-style character arrays, it manages its own memory, grows dynamically, and provides bounds checking through its member functions."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Creating and Using Strings"}),e.jsx(t,{title:"string_basics.cpp",children:`#include <iostream>
#include <string>

int main() {
    // Different ways to create strings
    std::string greeting = "Hello";
    std::string name("World");
    std::string spaces(5, '-');     // "-----" (5 dashes)
    std::string empty;              // empty string ""

    std::cout << greeting << ", " << name << "!" << std::endl;
    std::cout << "Separator: " << spaces << std::endl;
    std::cout << "Empty string length: " << empty.length() << std::endl;

    // Concatenation with + and +=
    std::string full = greeting + ", " + name + "!";
    std::cout << full << std::endl;

    full += " Welcome to C++.";
    std::cout << full << std::endl;

    return 0;
}`}),e.jsx(r,{children:`Hello, World!
Separator: -----
Empty string length: 0
Hello, World!
Hello, World! Welcome to C++.`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"String Operations"}),e.jsx(t,{title:"string_operations.cpp",children:`#include <iostream>
#include <string>

int main() {
    std::string text = "The quick brown fox jumps over the lazy dog";

    // Length
    std::cout << "Length: " << text.length() << std::endl;

    // Accessing characters
    std::cout << "First char: " << text[0] << std::endl;
    std::cout << "Char at 4:  " << text.at(4) << std::endl;  // bounds-checked

    // Substring
    std::string word = text.substr(4, 5);  // start at index 4, length 5
    std::cout << "Substr(4,5): " << word << std::endl;

    // Find
    size_t pos = text.find("fox");
    std::cout << "'fox' found at index: " << pos << std::endl;

    pos = text.find("cat");
    if (pos == std::string::npos) {
        std::cout << "'cat' not found" << std::endl;
    }

    // Replace
    std::string modified = text;
    modified.replace(modified.find("lazy"), 4, "energetic");
    std::cout << "Replaced: " << modified << std::endl;

    // Compare
    std::cout << ""abc" == "abc": " << ("abc" == std::string("abc")) << std::endl;
    std::cout << ""abc" < "abd":  " << (std::string("abc") < std::string("abd")) << std::endl;

    return 0;
}`}),e.jsx(r,{children:`Length: 43
First char: T
Char at 4:  q
Substr(4,5): quick
'fox' found at index: 16
'cat' not found
Replaced: The quick brown fox jumps over the energetic dog
"abc" == "abc": 1
"abc" < "abd":  1`}),e.jsx(i,{type:"tip",title:"at() vs [] for Character Access",children:e.jsxs("p",{children:["The ",e.jsx("code",{children:"[]"})," operator does not check bounds and accessing an out-of-range index causes undefined behavior. The ",e.jsx("code",{children:"at()"})," method throws a ",e.jsx("code",{children:"std::out_of_range"}),"exception if the index is invalid. Prefer ",e.jsx("code",{children:"at()"})," when the index might be out of bounds."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Reading Strings with getline"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Since ",e.jsx("code",{children:"std::cin >>"})," stops at whitespace, use ",e.jsx("code",{children:"std::getline()"})," to read an entire line of text including spaces."]}),e.jsx(t,{title:"getline_example.cpp",children:`#include <iostream>
#include <string>

int main() {
    std::string fullName;
    std::string city;

    std::cout << "Enter your full name: ";
    std::getline(std::cin, fullName);

    std::cout << "Enter your city: ";
    std::getline(std::cin, city);

    std::cout << "Hello, " << fullName << " from " << city << "!" << std::endl;
    std::cout << "Your name has " << fullName.length() << " characters." << std::endl;

    return 0;
}`}),e.jsx(r,{children:`Enter your full name: Alice Johnson
Enter your city: New York
Hello, Alice Johnson from New York!
Your name has 13 characters.`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"C-Strings vs std::string"}),e.jsxs(l,{title:"C-Strings",children:[e.jsxs("p",{children:["C-style strings are null-terminated character arrays inherited from C. They require manual memory management and use functions from ",e.jsx("code",{children:"<cstring>"}),"like ",e.jsx("code",{children:"strlen()"}),", ",e.jsx("code",{children:"strcpy()"}),", and ",e.jsx("code",{children:"strcmp()"}),"."]}),e.jsx(t,{children:`// C-style string (avoid in modern C++)
char cstr[] = "Hello";          // null-terminated array
int len = strlen(cstr);         // must use strlen, not .length()

// std::string (preferred)
std::string str = "Hello";      // manages its own memory
int len2 = str.length();        // member function`})]}),e.jsx(g,{title:"Avoid C-Strings in Modern C++",children:e.jsxs("p",{children:["C-style strings are error-prone: they can overflow buffers, require manual null termination, and lack bounds checking. Always prefer ",e.jsx("code",{children:"std::string"})," unless you are interfacing with C libraries or need low-level control."]})}),e.jsx(u,{title:"Use std::string by Default",children:e.jsxs("p",{children:["Always use ",e.jsx("code",{children:"std::string"})," for text in C++ programs. It handles memory management, supports comparison with ",e.jsx("code",{children:"=="}),", concatenation with ",e.jsx("code",{children:"+"}),", and provides safe access methods. Convert to C-strings only when needed using ",e.jsx("code",{children:".c_str()"}),"."]})}),e.jsx(i,{type:"info",title:"Useful String Methods",children:e.jsxs("p",{children:["Other handy methods include ",e.jsx("code",{children:"empty()"})," to check if a string is empty,",e.jsx("code",{children:"clear()"})," to erase contents, ",e.jsx("code",{children:"append()"})," to add text,",e.jsx("code",{children:"insert()"})," to insert at a position, ",e.jsx("code",{children:"erase()"})," to remove characters, and ",e.jsx("code",{children:"rfind()"})," to search backwards."]})}),e.jsx(a,{title:"Word Counter",difficulty:"beginner",prompt:"Write a program that reads a sentence using getline and counts how many spaces it contains. The number of words is approximately the number of spaces plus one.",hints:["Use std::getline to read the full sentence","Loop through each character and count spaces","You can use a range-based for loop: for (char c : sentence)"],solution:e.jsx(t,{children:`#include <iostream>
#include <string>

int main() {
    std::string sentence;
    std::cout << "Enter a sentence: ";
    std::getline(std::cin, sentence);

    int spaces = 0;
    for (char c : sentence) {
        if (c == ' ') {
            ++spaces;
        }
    }

    std::cout << "Spaces: " << spaces << std::endl;
    std::cout << "Approximate words: " << (spaces + 1) << std::endl;
    return 0;
}`})}),e.jsx(a,{title:"String Reverser",difficulty:"intermediate",prompt:"Write a program that reads a string and prints it reversed. Do this by building a new string character by character from the end of the original.",hints:["Use a for loop that starts at str.length() - 1 and goes to 0","Append each character to a new string with +=","Be careful with the loop variable type — use int or check bounds properly"],solution:e.jsx(t,{children:`#include <iostream>
#include <string>

int main() {
    std::string original;
    std::cout << "Enter a string: ";
    std::getline(std::cin, original);

    std::string reversed;
    for (int i = original.length() - 1; i >= 0; --i) {
        reversed += original[i];
    }

    std::cout << "Reversed: " << reversed << std::endl;
    return 0;
}`})}),e.jsx(m,{references:[{type:"cppreference",title:"std::string",url:"https://en.cppreference.com/w/cpp/string/basic_string",description:"Complete reference for the std::string class"},{type:"cppreference",title:"std::getline",url:"https://en.cppreference.com/w/cpp/string/basic_string/getline",description:"Reading lines from input streams"},{type:"textbook",title:"C++ Primer",author:"Stanley Lippman",description:"Chapter 3: Strings, Vectors, and Arrays"}]})]})}const ee=Object.freeze(Object.defineProperty({__proto__:null,default:D},Symbol.toStringTag,{value:"Module"}));function U(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Programs often need to read data from files or write results to files for persistent storage. C++ provides file stream classes in the ",e.jsx("code",{children:"<fstream>"})," header that work just like ",e.jsx("code",{children:"std::cin"})," and ",e.jsx("code",{children:"std::cout"}),", making file I/O feel familiar and consistent."]}),e.jsx(h,{title:"File Stream Classes",children:e.jsxs("p",{children:["C++ provides three file stream classes: ",e.jsx("code",{children:"std::ifstream"})," for reading from files (input), ",e.jsx("code",{children:"std::ofstream"})," for writing to files (output), and ",e.jsx("code",{children:"std::fstream"})," for both reading and writing. All are defined in the ",e.jsx("code",{children:"<fstream>"})," header."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Writing to a File"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Use ",e.jsx("code",{children:"std::ofstream"})," to create and write to files. The insertion operator (",e.jsx("code",{children:"<<"}),") works exactly as it does with ",e.jsx("code",{children:"std::cout"}),". By default, opening a file for output creates it if it does not exist, or truncates it if it does."]}),e.jsx(t,{title:"write_file.cpp",children:`#include <iostream>
#include <fstream>
#include <string>

int main() {
    std::ofstream outFile("output.txt");

    if (!outFile.is_open()) {
        std::cerr << "Error: could not create file!" << std::endl;
        return 1;
    }

    outFile << "Name: Alice" << std::endl;
    outFile << "Age: 30" << std::endl;
    outFile << "Score: 95.5" << std::endl;

    outFile.close();
    std::cout << "Data written to output.txt" << std::endl;

    return 0;
}`}),e.jsx(r,{children:"Data written to output.txt"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Reading from a File"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Use ",e.jsx("code",{children:"std::ifstream"})," to read from files. You can read word by word with ",e.jsx("code",{children:">>"})," or line by line with ",e.jsx("code",{children:"std::getline()"}),"."]}),e.jsx(t,{title:"read_file.cpp",children:`#include <iostream>
#include <fstream>
#include <string>

int main() {
    std::ifstream inFile("output.txt");

    if (!inFile.is_open()) {
        std::cerr << "Error: could not open file!" << std::endl;
        return 1;
    }

    // Read line by line
    std::string line;
    int lineNumber = 1;
    while (std::getline(inFile, line)) {
        std::cout << lineNumber << ": " << line << std::endl;
        ++lineNumber;
    }

    inFile.close();
    return 0;
}`}),e.jsx(r,{children:`1: Name: Alice
2: Age: 30
3: Score: 95.5`}),e.jsx(u,{title:"Always Check if the File Opened",children:e.jsxs("p",{children:["Always verify that a file stream opened successfully using ",e.jsx("code",{children:"is_open()"})," or by testing the stream in a boolean context. A file might fail to open because it does not exist, permissions are insufficient, or the path is invalid. Proceeding without checking leads to silent data loss."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"File Open Modes"}),e.jsxs(l,{title:"File Modes",children:[e.jsxs("p",{children:["You can control how a file is opened by passing mode flags to the constructor or the ",e.jsx("code",{children:"open()"})," method. Multiple modes can be combined with the bitwise OR operator (",e.jsx("code",{children:"|"}),")."]}),e.jsx(t,{children:`std::ios::in      // Open for reading (default for ifstream)
std::ios::out     // Open for writing (default for ofstream)
std::ios::app     // Append to end of file
std::ios::trunc   // Truncate file to zero length (default with out)
std::ios::ate     // Seek to end after opening
std::ios::binary  // Open in binary mode`})]}),e.jsx(t,{title:"append_mode.cpp",children:`#include <iostream>
#include <fstream>

int main() {
    // Append to existing file instead of overwriting
    std::ofstream outFile("log.txt", std::ios::app);

    if (!outFile.is_open()) {
        std::cerr << "Error opening log file!" << std::endl;
        return 1;
    }

    outFile << "New log entry: program started" << std::endl;
    outFile.close();

    // Read and display the full file
    std::ifstream inFile("log.txt");
    std::string line;
    while (std::getline(inFile, line)) {
        std::cout << line << std::endl;
    }
    inFile.close();

    return 0;
}`}),e.jsx(i,{type:"important",title:"RAII and File Streams",children:e.jsxs("p",{children:["File streams automatically close when they go out of scope thanks to their destructor. Calling ",e.jsx("code",{children:".close()"})," explicitly is not strictly necessary, but it is good practice when you want to ensure data is flushed before proceeding, or when you want to reuse the stream object for another file."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Reading Structured Data"}),e.jsx(t,{title:"structured_read.cpp",children:`#include <iostream>
#include <fstream>
#include <string>

int main() {
    // First, create a CSV-like file
    std::ofstream out("students.txt");
    out << "Alice 90 85 92" << std::endl;
    out << "Bob 78 88 76" << std::endl;
    out << "Carol 95 91 89" << std::endl;
    out.close();

    // Now read and process it
    std::ifstream in("students.txt");
    if (!in.is_open()) {
        std::cerr << "Cannot open students.txt" << std::endl;
        return 1;
    }

    std::string name;
    int score1, score2, score3;

    std::cout << "Student Averages:" << std::endl;
    while (in >> name >> score1 >> score2 >> score3) {
        double average = (score1 + score2 + score3) / 3.0;
        std::cout << name << ": " << average << std::endl;
    }

    in.close();
    return 0;
}`}),e.jsx(r,{children:`Student Averages:
Alice: 89
Bob: 80.6667
Carol: 91.6667`}),e.jsx(g,{title:"Error Checking During Reads",children:e.jsxs("p",{children:["When reading structured data, a malformed file can put the stream into a fail state. Always check the stream state after reading. The ",e.jsx("code",{children:"while (stream >> var)"}),"idiom naturally handles end-of-file and errors by stopping the loop when a read fails."]})}),e.jsx(i,{type:"tip",title:"Relative vs Absolute Paths",children:e.jsxs("p",{children:["File paths without a leading ",e.jsx("code",{children:"/"}),' (on Linux/macOS) or drive letter (on Windows) are relative to the current working directory — which may not be the directory containing your program. When debugging "file not found" errors, print the current directory or use absolute paths.']})}),e.jsx(a,{title:"File Copy Program",difficulty:"beginner",prompt:"Write a program that creates a file called 'source.txt' with three lines of text, then reads it and writes its contents to 'copy.txt'. Verify by reading and printing 'copy.txt'.",hints:["Open an ofstream for source.txt, write lines, then close it","Open an ifstream for source.txt and an ofstream for copy.txt","Use getline in a loop to read from source and write to copy"],solution:e.jsx(t,{children:`#include <iostream>
#include <fstream>
#include <string>

int main() {
    // Create source file
    std::ofstream source("source.txt");
    source << "Line one" << std::endl;
    source << "Line two" << std::endl;
    source << "Line three" << std::endl;
    source.close();

    // Copy source to destination
    std::ifstream in("source.txt");
    std::ofstream out("copy.txt");
    std::string line;
    while (std::getline(in, line)) {
        out << line << std::endl;
    }
    in.close();
    out.close();

    // Verify
    std::ifstream verify("copy.txt");
    while (std::getline(verify, line)) {
        std::cout << line << std::endl;
    }
    verify.close();

    return 0;
}`})}),e.jsx(a,{title:"Word Frequency Counter",difficulty:"intermediate",prompt:"Write a program that creates a file with the text 'the cat sat on the mat the cat', reads it word by word, and counts how many times the word 'the' appears.",hints:["Write the text to a file, then open it for reading","Use >> to read one word at a time in a while loop","Compare each word to 'the' and increment a counter"],solution:e.jsx(t,{children:`#include <iostream>
#include <fstream>
#include <string>

int main() {
    // Create the file
    std::ofstream out("words.txt");
    out << "the cat sat on the mat the cat" << std::endl;
    out.close();

    // Count occurrences of "the"
    std::ifstream in("words.txt");
    std::string word;
    int count = 0;

    while (in >> word) {
        if (word == "the") {
            ++count;
        }
    }
    in.close();

    std::cout << "'the' appears " << count << " times" << std::endl;
    return 0;
}`})}),e.jsx(m,{references:[{type:"cppreference",title:"std::ifstream",url:"https://en.cppreference.com/w/cpp/io/basic_ifstream",description:"Input file stream class"},{type:"cppreference",title:"std::ofstream",url:"https://en.cppreference.com/w/cpp/io/basic_ofstream",description:"Output file stream class"},{type:"cppreference",title:"std::ios::openmode",url:"https://en.cppreference.com/w/cpp/io/ios_base/openmode",description:"File open mode flags"},{type:"textbook",title:"C++ Primer",author:"Stanley Lippman",description:"Chapter 8: The IO Library"}]})]})}const te=Object.freeze(Object.defineProperty({__proto__:null,default:U},Symbol.toStringTag,{value:"Module"}));export{u as B,t as C,h as D,a as E,i as N,r as O,m as R,l as S,g as W,j as a,G as b,V as c,Y as d,$ as e,X as f,J as g,K as h,Z as i,Q as j,ee as k,te as l,q as s};
