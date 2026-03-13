import{r as y,j as e}from"./vendor-BlNF5je7.js";function S(s){const r=[];let a=s;const i=[{type:"comment",regex:/^(\/\/[^\n]*)/},{type:"comment",regex:/^(\/\*[\s\S]*?\*\/)/},{type:"string",regex:/^(R"([^(]*)\([\s\S]*?\)\2"|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/},{type:"preprocessor",regex:/^(#\s*(?:include|define|ifdef|ifndef|endif|if|elif|else|undef|pragma|error|warning)\b[^\n]*)/},{type:"keyword",regex:/^(auto|bool|break|case|catch|char|class|const|constexpr|consteval|constinit|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|false|final|float|for|friend|goto|if|import|inline|int|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|true|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while|char8_t|char16_t|char32_t|concept|alignas|alignof)\b/},{type:"type",regex:/^(std::(?:string|vector|map|set|unordered_map|unordered_set|array|list|deque|pair|tuple|optional|variant|any|unique_ptr|shared_ptr|weak_ptr|function|thread|mutex|future|promise|atomic|string_view|span|expected|cout|cin|cerr|endl|ostream|istream|ifstream|ofstream|stringstream|size_t|ptrdiff_t|nullptr_t|byte|move|forward|make_unique|make_shared|print|println))\b/},{type:"number",regex:/^(\b(?:0[xX][0-9a-fA-F']+|0[bB][01']+|0[0-7']*|\d[\d']*\.?[\d']*(?:[eE][+-]?\d+)?)[fFlLuU]*\b)/},{type:"function",regex:/^(\w+)(?=\s*\()/},{type:"plain",regex:/^([\w:]+)/},{type:"operator",regex:/^(->|<<|>>|<=|>=|==|!=|&&|\|\||[+\-*/%=<>!&|^~:,.;?[\]{}()])/},{type:"whitespace",regex:/^(\s+)/}];for(;a.length>0;){let l=!1;for(const{type:u,regex:o}of i){const d=a.match(o);if(d){r.push({text:d[1],type:u}),a=a.slice(d[1].length),l=!0;break}}l||(r.push({text:a[0],type:"plain"}),a=a.slice(1))}return r}const T={comment:"text-gray-500",string:"text-green-400",preprocessor:"text-pink-400",keyword:"text-purple-400 font-semibold",type:"text-cyan-300",number:"text-orange-400",function:"text-blue-300",operator:"text-gray-400",whitespace:"",plain:"text-gray-200"},z={cpp:"C++",c:"C",bash:"Bash",shell:"Shell",text:"Text",makefile:"Makefile",cmake:"CMake"};function t({code:s="",language:r="cpp",title:a}){const[i,l]=y.useState(!1),u=y.useCallback(async()=>{try{await navigator.clipboard.writeText(s),l(!0),setTimeout(()=>l(!1),2e3)}catch{const d=document.createElement("textarea");d.value=s,document.body.appendChild(d),d.select(),document.execCommand("copy"),document.body.removeChild(d),l(!0),setTimeout(()=>l(!1),2e3)}},[s]),o=()=>r==="cpp"||r==="c"?S(s).map((m,k)=>e.jsx("span",{className:T[m.type]||"text-gray-200",children:m.text},k)):e.jsx("span",{className:"text-gray-200",children:s});return e.jsxs("div",{className:"my-5 overflow-hidden rounded-xl border border-gray-700 bg-gray-950 shadow-lg",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-gray-700 bg-gray-900 px-4 py-2.5",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("div",{className:"flex gap-1.5",children:[e.jsx("div",{className:"h-3 w-3 rounded-full bg-red-500/70"}),e.jsx("div",{className:"h-3 w-3 rounded-full bg-yellow-500/70"}),e.jsx("div",{className:"h-3 w-3 rounded-full bg-green-500/70"})]}),e.jsx("span",{className:"text-xs font-medium text-gray-400",children:a||z[r]||r})]}),e.jsx("button",{onClick:u,className:"flex items-center gap-1.5 rounded-md border border-gray-600 bg-gray-800 px-2.5 py-1 text-xs font-medium text-gray-300 transition-colors hover:bg-gray-700","aria-label":"Copy code",children:i?e.jsxs(e.Fragment,{children:[e.jsx("svg",{className:"h-3.5 w-3.5 text-green-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})}),e.jsx("span",{className:"text-green-400",children:"Copied!"})]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{className:"h-3.5 w-3.5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"})}),"Copy"]})})]}),e.jsx("pre",{className:"overflow-x-auto p-4 text-sm leading-relaxed",children:e.jsx("code",{className:"font-mono",children:o()})})]})}function n({output:s="",title:r="Output"}){return e.jsxs("div",{className:"my-4 overflow-hidden rounded-xl border border-gray-600 bg-gray-950 shadow",children:[e.jsxs("div",{className:"flex items-center gap-2 border-b border-gray-700 bg-gray-900 px-4 py-2",children:[e.jsxs("svg",{className:"h-4 w-4 text-green-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"4 17 10 11 4 5"}),e.jsx("line",{x1:"12",y1:"19",x2:"20",y2:"19"})]}),e.jsx("span",{className:"text-xs font-medium text-gray-400",children:r})]}),e.jsx("pre",{className:"overflow-x-auto p-4 text-sm font-mono leading-relaxed text-green-300",children:s})]})}function x({term:s,children:r}){return e.jsxs("div",{className:"my-6 overflow-hidden rounded-xl border-2 border-purple-400/50 bg-purple-50/50 shadow-sm dark:border-purple-500/40 dark:bg-purple-950/20",children:[e.jsxs("div",{className:"flex items-center gap-3 border-b border-purple-400/30 bg-purple-100/60 px-5 py-3 dark:border-purple-500/30 dark:bg-purple-900/30",children:[e.jsx("div",{className:"flex h-7 w-7 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white dark:bg-purple-600",children:"D"}),e.jsx("span",{className:"text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400",children:"Definition"}),s&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"text-purple-400 dark:text-purple-600",children:"·"}),e.jsx("span",{className:"text-sm font-semibold text-purple-800 dark:text-purple-200",children:s})]})]}),e.jsx("div",{className:"px-5 py-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:r})]})}function c({title:s,children:r}){return e.jsxs("div",{className:"my-6 overflow-hidden rounded-xl border-2 border-blue-400/50 bg-blue-50/50 shadow-sm dark:border-blue-500/40 dark:bg-blue-950/20",children:[e.jsxs("div",{className:"flex items-center gap-3 border-b border-blue-400/30 bg-blue-100/60 px-5 py-3 dark:border-blue-500/30 dark:bg-blue-900/30",children:[e.jsx("div",{className:"flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white dark:bg-blue-600",children:"S"}),e.jsx("span",{className:"text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400",children:"Syntax"}),s&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"text-blue-400 dark:text-blue-600",children:"·"}),e.jsx("span",{className:"text-sm font-semibold text-blue-800 dark:text-blue-200",children:s})]})]}),e.jsx("div",{className:"px-5 py-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:r})]})}const N={info:{label:"Note",icon:e.jsx("svg",{className:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),styles:"border-blue-300 bg-blue-50/80 dark:border-blue-700 dark:bg-blue-900/20",iconColor:"text-blue-500 dark:text-blue-400",titleColor:"text-blue-800 dark:text-blue-300"},tip:{label:"Tip",icon:e.jsx("svg",{className:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"})}),styles:"border-emerald-300 bg-emerald-50/80 dark:border-emerald-700 dark:bg-emerald-900/20",iconColor:"text-emerald-500 dark:text-emerald-400",titleColor:"text-emerald-800 dark:text-emerald-300"},important:{label:"Important",icon:e.jsx("svg",{className:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})}),styles:"border-amber-300 bg-amber-50/80 dark:border-amber-700 dark:bg-amber-900/20",iconColor:"text-amber-500 dark:text-amber-400",titleColor:"text-amber-800 dark:text-amber-300"},history:{label:"Historical Note",icon:e.jsx("svg",{className:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})}),styles:"border-purple-300 bg-purple-50/80 dark:border-purple-700 dark:bg-purple-900/20",iconColor:"text-purple-500 dark:text-purple-400",titleColor:"text-purple-800 dark:text-purple-300"}};function h({type:s="info",title:r,children:a,collapsible:i=!1}){const[l,u]=y.useState(!i),o=N[s]||N.info,d=r||o.label;return e.jsxs("div",{className:`my-6 rounded-xl border-l-4 p-4 sm:p-5 ${o.styles}`,children:[e.jsxs("button",{type:"button",onClick:()=>i&&u(!l),className:`flex w-full items-center gap-2 text-left ${i?"cursor-pointer":"cursor-default"}`,children:[e.jsx("span",{className:o.iconColor,children:o.icon}),e.jsx("span",{className:`text-sm font-semibold ${o.titleColor}`,children:d}),i&&e.jsx("svg",{className:`ml-auto h-4 w-4 transition-transform ${o.iconColor} ${l?"rotate-180":""}`,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 9l-7 7-7-7"})})]}),l&&e.jsx("div",{className:"mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:a})]})}function p({title:s,children:r}){return e.jsxs("div",{className:"my-6 overflow-hidden rounded-xl border-2 border-teal-400/50 bg-teal-50/50 shadow-sm dark:border-teal-500/40 dark:bg-teal-950/20",children:[e.jsxs("div",{className:"flex items-center gap-3 border-b border-teal-400/30 bg-teal-100/60 px-5 py-3 dark:border-teal-500/30 dark:bg-teal-900/30",children:[e.jsx("div",{className:"flex h-7 w-7 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white dark:bg-teal-600",children:"✓"}),e.jsx("span",{className:"text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400",children:"Best Practice"}),s&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"text-teal-400 dark:text-teal-600",children:"·"}),e.jsx("span",{className:"text-sm font-semibold text-teal-800 dark:text-teal-200",children:s})]})]}),e.jsx("div",{className:"px-5 py-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:r})]})}function g({title:s,difficulty:r="beginner",prompt:a,hints:i=[],solution:l,children:u}){const[o,d]=y.useState(!1),[m,k]=y.useState(!1),v={beginner:"bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",intermediate:"bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",advanced:"bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",expert:"bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"};return e.jsxs("div",{className:"my-6 rounded-xl border border-cyan-200 bg-cyan-50/50 p-4 sm:p-5 dark:border-cyan-800 dark:bg-cyan-900/20",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("svg",{className:"h-5 w-5 text-cyan-600 dark:text-cyan-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})}),e.jsx("span",{className:"text-sm font-semibold text-cyan-800 dark:text-cyan-300",children:s||"Exercise"}),e.jsx("span",{className:`ml-auto rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${v[r]||v.beginner}`,children:r})]}),e.jsx("div",{className:"mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:a||u}),i.length>0&&e.jsxs("div",{className:"mt-4",children:[e.jsxs("button",{onClick:()=>d(!o),className:"flex items-center gap-1.5 text-xs font-medium text-cyan-600 transition-colors hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300",children:[e.jsx("svg",{className:`h-3.5 w-3.5 transition-transform ${o?"rotate-90":""}`,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})}),o?"Hide Hints":`Show Hints (${i.length})`]}),o&&e.jsx("ul",{className:"mt-2 space-y-1.5 pl-5",children:i.map((C,_)=>e.jsx("li",{className:"text-sm text-gray-600 dark:text-gray-400 list-disc",children:C},_))})]}),l&&e.jsxs("div",{className:"mt-4",children:[e.jsxs("button",{onClick:()=>k(!m),className:"flex items-center gap-1.5 text-xs font-medium text-cyan-600 transition-colors hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300",children:[e.jsx("svg",{className:`h-3.5 w-3.5 transition-transform ${m?"rotate-90":""}`,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})}),m?"Hide Solution":"Show Solution"]}),m&&e.jsx("div",{className:"mt-3 rounded-lg border border-cyan-200 bg-white/60 p-3 dark:border-cyan-800 dark:bg-gray-900/40",children:l})]})]})}const I={gcc:"GCC",clang:"Clang",msvc:"MSVC",all:"All Compilers"};function j({compiler:s="all",title:r,children:a}){const i=I[s]||s,l=r||`${i} Note`;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-gray-50/80 p-4 sm:p-5 dark:border-gray-700 dark:bg-gray-800/40",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("svg",{className:"h-5 w-5 text-gray-500 dark:text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"})]}),e.jsx("span",{className:"text-sm font-semibold text-gray-700 dark:text-gray-300",children:l}),e.jsx("span",{className:"ml-auto rounded-md border border-gray-300 bg-white px-2 py-0.5 font-mono text-xs text-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300",children:i})]}),e.jsx("div",{className:"mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400",children:a})]})}const w={iso_standard:{label:"ISO Standard",color:"text-purple-600 dark:text-purple-400"},cppreference:{label:"cppreference",color:"text-blue-600 dark:text-blue-400"},textbook:{label:"Textbook",color:"text-emerald-600 dark:text-emerald-400"},conference_talk:{label:"Conference Talk",color:"text-orange-600 dark:text-orange-400"},tutorial:{label:"Tutorial",color:"text-cyan-600 dark:text-cyan-400"},article:{label:"Article",color:"text-gray-600 dark:text-gray-400"}};function b({references:s=[]}){return s.length===0?null:e.jsxs("div",{className:"my-8",children:[e.jsxs("h3",{className:"mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200",children:[e.jsx("svg",{className:"h-5 w-5 text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"})}),"References & Further Reading"]}),e.jsx("ul",{className:"space-y-2",children:s.map((r,a)=>{const i=w[r.type]||w.article;return e.jsxs("li",{className:"flex items-start gap-3 rounded-lg border border-gray-100 bg-white/60 px-4 py-3 dark:border-gray-800 dark:bg-gray-800/30",children:[e.jsxs("span",{className:`mt-0.5 shrink-0 text-xs font-medium ${i.color}`,children:["[",i.label,"]"]}),e.jsxs("div",{className:"min-w-0",children:[r.url?e.jsx("a",{href:r.url,target:"_blank",rel:"noopener noreferrer",className:"text-sm font-medium text-blue-600 hover:underline dark:text-blue-400",children:r.title}):e.jsx("span",{className:"text-sm font-medium text-gray-800 dark:text-gray-200",children:r.title}),r.author&&e.jsxs("span",{className:"ml-1 text-sm text-gray-500 dark:text-gray-400",children:["— ",r.author]}),r.description&&e.jsx("p",{className:"mt-0.5 text-xs text-gray-500 dark:text-gray-500",children:r.description})]})]},a)})})]})}function L(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:['Every programming journey starts with a simple program. In C++, the classic first program prints "Hello, World!" to the screen. This seemingly trivial program introduces several fundamental C++ concepts: the preprocessor, the standard library, the ',e.jsx("code",{children:"main"})," function, and stream output."]}),e.jsx(x,{title:"What is C++?",children:e.jsx("p",{children:"C++ is a general-purpose programming language created by Bjarne Stroustrup as an extension of C. It supports procedural, object-oriented, and generic programming paradigms, and is widely used in systems software, game engines, embedded systems, and high-performance applications."})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Your First C++ Program"}),e.jsx(t,{title:"hello.cpp",children:`#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`}),e.jsx(n,{children:"Hello, World!"}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Line-by-Line Breakdown"}),e.jsxs(c,{title:"#include Directive",children:[e.jsxs("p",{children:[e.jsx("code",{children:"#include <iostream>"})," is a ",e.jsx("strong",{children:"preprocessor directive"}),". It tells the compiler to include the contents of the ",e.jsx("code",{children:"iostream"})," header file, which provides input/output stream objects like ",e.jsx("code",{children:"std::cout"}),"."]}),e.jsx(t,{children:`#include <header_name>   // System/standard library header
#include "header_name"  // User-defined header`})]}),e.jsxs(c,{title:"The main() Function",children:[e.jsxs("p",{children:["Every C++ program must have exactly one ",e.jsx("code",{children:"main()"})," function. This is the entry point — the first function called when the program runs. It returns an ",e.jsx("code",{children:"int"})," to the operating system (0 typically means success)."]}),e.jsx(t,{children:`int main() {
    // program code here
    return 0;  // 0 = success
}`})]}),e.jsxs(c,{title:"std::cout and the Insertion Operator",children:[e.jsxs("p",{children:[e.jsx("code",{children:"std::cout"})," is the ",e.jsx("strong",{children:"standard character output"})," stream. The ",e.jsx("code",{children:"<<"})," operator (called the ",e.jsx("strong",{children:"insertion operator"}),") sends data to the output stream. Multiple values can be chained."]}),e.jsx(t,{children:'std::cout << "Text" << " " << 42 << std::endl;'}),e.jsx(n,{children:"Text 42"})]}),e.jsx(h,{type:"info",title:"What is std::?",children:e.jsxs("p",{children:[e.jsx("code",{children:"std"})," is a ",e.jsx("strong",{children:"namespace"})," — a named scope that groups related identifiers. The C++ standard library lives in the ",e.jsx("code",{children:"std"})," namespace. The ",e.jsx("code",{children:"::"})," is the",e.jsx("strong",{children:" scope resolution operator"})," that accesses members within a namespace."]})}),e.jsx(h,{type:"tip",title:"std::endl vs '\\\\n'",children:e.jsxs("p",{children:[e.jsx("code",{children:"std::endl"})," outputs a newline ",e.jsx("em",{children:"and"})," flushes the output buffer. Using ",e.jsx("code",{children:"'\\n'"})," only outputs a newline, which is faster for performance-sensitive code. For most learning examples, either works fine."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Compiling and Running"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300",children:"To compile and run your program from the command line:"}),e.jsx(t,{title:"Terminal",children:`g++ -o hello hello.cpp
./hello`}),e.jsx(n,{children:"Hello, World!"}),e.jsx(j,{compiler:"gcc",title:"GCC Compilation",children:e.jsxs("p",{children:[e.jsx("code",{children:"g++"})," is the GNU C++ compiler. The ",e.jsx("code",{children:"-o hello"})," flag specifies the output filename. Without it, the default output is ",e.jsx("code",{children:"a.out"})," on Linux/macOS."]})}),e.jsx(j,{compiler:"clang",title:"Clang Compilation",children:e.jsxs("p",{children:["On macOS, the default ",e.jsx("code",{children:"g++"})," command often invokes Clang. You can also use ",e.jsx("code",{children:"clang++ -o hello hello.cpp"})," explicitly."]})}),e.jsx(p,{title:"Always use return 0",children:e.jsxs("p",{children:["Although C++ allows omitting ",e.jsx("code",{children:"return 0;"})," from ",e.jsx("code",{children:"main()"})," (the compiler inserts it implicitly), explicitly writing it makes your intent clear. In ",e.jsx("code",{children:"main()"}),", returning 0 signals successful execution to the operating system."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Variations"}),e.jsx(t,{title:"Multiple output statements",children:`#include <iostream>

int main() {
    std::cout << "Hello, ";
    std::cout << "World!" << std::endl;
    std::cout << "Welcome to C++." << std::endl;
    return 0;
}`}),e.jsx(n,{children:`Hello, World!
Welcome to C++.`}),e.jsx(g,{title:"Modify the Program",difficulty:"beginner",prompt:"Modify the Hello World program to print your name on a separate line after 'Hello, World!'.",hints:["Add another std::cout statement after the first one","Use std::endl or '\\n' to create a new line"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    std::cout << "My name is Alice." << std::endl;
    return 0;
}`})}),e.jsx(g,{title:"Print a Pattern",difficulty:"beginner",prompt:"Write a program that prints a simple triangle pattern using asterisks (*).",hints:["Use multiple std::cout statements, one per line","Each line should have one more asterisk than the previous"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    std::cout << "*" << std::endl;
    std::cout << "**" << std::endl;
    std::cout << "***" << std::endl;
    std::cout << "****" << std::endl;
    return 0;
}`})}),e.jsx(b,{references:[{type:"cppreference",title:"std::cout",url:"https://en.cppreference.com/w/cpp/io/cout",description:"Standard output stream documentation"},{type:"cppreference",title:"std::endl",url:"https://en.cppreference.com/w/cpp/io/manip/endl",description:"End-of-line manipulator"},{type:"textbook",title:"Programming: Principles and Practice Using C++",author:"Bjarne Stroustrup",description:"Chapter 2: Hello, World!"}]})]})}const O=Object.freeze(Object.defineProperty({__proto__:null,default:L},Symbol.toStringTag,{value:"Module"}));function f({title:s="Warning",children:r}){return e.jsxs("div",{className:"my-6 rounded-xl border-l-4 border-red-400 bg-red-50/80 p-4 sm:p-5 dark:border-red-600 dark:bg-red-900/20",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("svg",{className:"h-5 w-5 text-red-500 dark:text-red-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})}),e.jsx("span",{className:"text-sm font-semibold text-red-800 dark:text-red-300",children:s})]}),e.jsx("div",{className:"mt-3 text-sm leading-relaxed text-red-900/80 dark:text-red-200/80",children:r})]})}function W(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Unlike interpreted languages like Python or JavaScript, C++ is a ",e.jsx("strong",{children:"compiled language"}),". Your source code goes through several stages of transformation before it becomes an executable program. Understanding this process helps you debug errors and write better code."]}),e.jsx(x,{title:"Compilation",children:e.jsx("p",{children:"Compilation is the process of translating human-readable source code into machine code (binary instructions) that the computer's processor can execute directly. In C++, this is a multi-stage pipeline."})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"The Four Stages"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300",children:"The C++ build process has four distinct stages:"}),e.jsx("div",{className:"rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800/40",children:e.jsxs("ol",{className:"space-y-4 text-sm text-gray-700 dark:text-gray-300",children:[e.jsxs("li",{className:"flex gap-3",children:[e.jsx("span",{className:"flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",children:"1"}),e.jsxs("div",{children:[e.jsx("strong",{className:"text-gray-900 dark:text-gray-100",children:"Preprocessing"})," — The preprocessor handles directives like ",e.jsx("code",{children:"#include"}),", ",e.jsx("code",{children:"#define"}),", and ",e.jsx("code",{children:"#ifdef"}),". It expands macros and includes header file contents."]})]}),e.jsxs("li",{className:"flex gap-3",children:[e.jsx("span",{className:"flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700 dark:bg-green-900/40 dark:text-green-400",children:"2"}),e.jsxs("div",{children:[e.jsx("strong",{className:"text-gray-900 dark:text-gray-100",children:"Compilation"})," — The compiler translates the preprocessed source code into assembly language for the target architecture."]})]}),e.jsxs("li",{className:"flex gap-3",children:[e.jsx("span",{className:"flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",children:"3"}),e.jsxs("div",{children:[e.jsx("strong",{className:"text-gray-900 dark:text-gray-100",children:"Assembly"})," — The assembler converts assembly language into machine code (object files, typically ",e.jsx("code",{children:".o"})," or ",e.jsx("code",{children:".obj"}),")."]})]}),e.jsxs("li",{className:"flex gap-3",children:[e.jsx("span",{className:"flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",children:"4"}),e.jsxs("div",{children:[e.jsx("strong",{className:"text-gray-900 dark:text-gray-100",children:"Linking"})," — The linker combines object files and libraries into the final executable binary."]})]})]})}),e.jsx(c,{title:"Source → Executable Pipeline",children:e.jsx(t,{children:`// Source file: hello.cpp
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
}`}),e.jsx(n,{title:"Compiler error output",children:`hello.cpp:4:29: error: expected ';' after expression
    std::cout << "Hello"
                        ^
                        ;
1 error generated.`}),e.jsx(t,{title:"Linker error (undefined reference)",children:`// main.cpp
void greet();  // Declared but never defined

int main() {
    greet();
    return 0;
}`}),e.jsx(n,{title:"Linker error output",children:`/tmp/main-abc123.o: In function 'main':
main.cpp:(.text+0x5): undefined reference to 'greet()'
collect2: error: ld returned 1 exit status`}),e.jsx(f,{title:"Common Compilation Mistakes",children:e.jsxs("ul",{className:"list-disc pl-5 space-y-1",children:[e.jsxs("li",{children:["Forgetting to include the required header (",e.jsx("code",{children:"#include"}),")"]}),e.jsx("li",{children:"Misspelling identifiers (C++ is case-sensitive)"}),e.jsx("li",{children:"Missing semicolons at the end of statements"}),e.jsx("li",{children:"Mismatched braces or parentheses"})]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Useful Compiler Flags"}),e.jsx(t,{title:"Recommended flags for learning",children:`# Enable warnings (highly recommended!)
g++ -Wall -Wextra -o hello hello.cpp

# Specify C++ standard version
g++ -std=c++17 -o hello hello.cpp

# All together (recommended for learning)
g++ -std=c++17 -Wall -Wextra -Wpedantic -o hello hello.cpp`}),e.jsx(j,{compiler:"gcc",children:e.jsxs("p",{children:[e.jsx("code",{children:"-Wall"})," enables most warnings. ",e.jsx("code",{children:"-Wextra"})," enables additional warnings not covered by ",e.jsx("code",{children:"-Wall"}),". ",e.jsx("code",{children:"-Wpedantic"})," warns about non-standard extensions."]})}),e.jsx(j,{compiler:"msvc",title:"MSVC (Windows)",children:e.jsxs("p",{children:["On Windows with Visual Studio, use ",e.jsx("code",{children:"cl /W4 /EHsc hello.cpp"}),". The ",e.jsx("code",{children:"/W4"})," flag is the MSVC equivalent of ",e.jsx("code",{children:"-Wall -Wextra"}),"."]})}),e.jsx(p,{title:"Always Enable Warnings",children:e.jsxs("p",{children:["Compile with ",e.jsx("code",{children:"-Wall -Wextra"})," from day one. Warnings catch bugs that compile successfully but behave incorrectly. Treat warnings as errors during development with ",e.jsx("code",{children:"-Werror"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Multiple Source Files"}),e.jsx(t,{title:"greet.cpp",children:`#include <iostream>

void greet() {
    std::cout << "Hello from greet()!" << std::endl;
}`}),e.jsx(t,{title:"main.cpp",children:`void greet();  // Declaration

int main() {
    greet();
    return 0;
}`}),e.jsx(t,{title:"Compiling multiple files",children:`g++ -o program main.cpp greet.cpp
./program`}),e.jsx(n,{children:"Hello from greet()!"}),e.jsx(g,{title:"Identify the Error Type",difficulty:"beginner",prompt:"For each of these errors, determine if it's a preprocessor error, compiler error, or linker error: (1) misspelled header name, (2) missing semicolon, (3) calling a function that's declared but not defined.",solution:e.jsxs("div",{className:"text-sm text-gray-700 dark:text-gray-300 space-y-1",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"1."})," Preprocessor error — the #include directive fails"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"2."})," Compiler error — syntax violation"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"3."})," Linker error — undefined reference"]})]})}),e.jsx(b,{references:[{type:"cppreference",title:"Translation phases",url:"https://en.cppreference.com/w/cpp/language/translation_phases",description:"Official phases of C++ translation"},{type:"textbook",title:"The C++ Programming Language",author:"Bjarne Stroustrup",description:"Chapter 2.2: Programs"}]})]})}const H=Object.freeze(Object.defineProperty({__proto__:null,default:W},Symbol.toStringTag,{value:"Module"}));function M(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"A well-structured C++ program separates concerns into headers and source files, organizes code with namespaces, and uses comments to explain intent. Understanding these structural elements is essential before writing larger programs."}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Headers and Source Files"}),e.jsx(x,{title:"Header Files (.h / .hpp)",children:e.jsxs("p",{children:["Header files contain ",e.jsx("strong",{children:"declarations"})," — function prototypes, class definitions, constants, and type aliases. They tell the compiler ",e.jsx("em",{children:"what exists"})," without providing the full implementation."]})}),e.jsx(x,{title:"Source Files (.cpp)",children:e.jsxs("p",{children:["Source files contain ",e.jsx("strong",{children:"definitions"})," — the actual implementations of functions and methods. Each source file is compiled independently into an object file."]})}),e.jsx(t,{title:"math_utils.h",children:`#ifndef MATH_UTILS_H
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
}`}),e.jsx(n,{children:`3 + 4 = 7
3 * 4 = 12`}),e.jsxs(c,{title:"Include Guards",children:[e.jsx("p",{children:"Include guards prevent a header from being included multiple times in the same translation unit, which would cause redefinition errors."}),e.jsx(t,{children:`// Traditional include guard
#ifndef HEADER_NAME_H
#define HEADER_NAME_H
// ... declarations ...
#endif

// Modern alternative (non-standard but widely supported)
#pragma once
// ... declarations ...`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Namespaces"}),e.jsx(x,{title:"Namespace",children:e.jsx("p",{children:"A namespace is a declarative region that provides a scope for identifiers inside it. Namespaces prevent name collisions when combining code from different libraries."})}),e.jsx(t,{title:"Using namespaces",children:`#include <iostream>

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
}`}),e.jsx(n,{children:`Circle area: 78.5398
Rectangle area: 12`}),e.jsx(h,{type:"important",title:"Avoid 'using namespace std;'",children:e.jsxs("p",{children:["While ",e.jsx("code",{children:"using namespace std;"})," saves typing, it pulls ",e.jsx("em",{children:"everything"})," from the standard library into the global scope. This can cause name collisions and makes code harder to read. Prefer ",e.jsx("code",{children:"std::"})," prefix or selective ",e.jsx("code",{children:"using"})," declarations."]})}),e.jsxs(p,{title:"Selective using Declarations",children:[e.jsxs("p",{children:["If you want to avoid typing ",e.jsx("code",{children:"std::"})," repeatedly, use selective declarations instead of importing the entire namespace:"]}),e.jsx(t,{children:`using std::cout;
using std::endl;
// Now you can write: cout << "Hello" << endl;`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Comments"}),e.jsx(c,{title:"Comment Syntax",children:e.jsx(t,{children:`// Single-line comment

/* Multi-line
   comment */

/// Documentation comment (used by tools like Doxygen)
/// @param x The input value
/// @return The squared value
int square(int x) {
    return x * x;
}`})}),e.jsxs(p,{title:"Comment the Why, Not the What",children:[e.jsxs("p",{children:["Good comments explain ",e.jsx("em",{children:"why"})," code exists, not ",e.jsx("em",{children:"what"})," it does. The code itself should be readable enough to show what it does."]}),e.jsx(t,{children:`// Bad: increment i by 1
i++;

// Good: skip the header row in the CSV data
i++;`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Statements and Expressions"}),e.jsx(x,{title:"Statement",children:e.jsxs("p",{children:["A statement is a complete instruction that performs an action. Most statements in C++ end with a semicolon (",e.jsx("code",{children:";"}),"). A compound statement (block) is enclosed in braces ",e.jsx("code",{children:"{}"}),"."]})}),e.jsx(t,{title:"Types of statements",children:`#include <iostream>

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
}`}),e.jsx(g,{title:"Organize into Files",difficulty:"beginner",prompt:"Given a program that converts temperatures, split it into a header file (converter.h), source file (converter.cpp), and main file (main.cpp). The converter should have functions celsius_to_fahrenheit and fahrenheit_to_celsius.",hints:["The header file should contain function declarations with include guards","The source file should #include the header and provide implementations","The main file should #include the header and call the functions"],solution:e.jsxs("div",{className:"space-y-3",children:[e.jsx(t,{title:"converter.h",children:`#pragma once

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
}`})]})}),e.jsx(b,{references:[{type:"cppreference",title:"Namespaces",url:"https://en.cppreference.com/w/cpp/language/namespace",description:"Namespace declaration and usage"},{type:"cppreference",title:"Header files",url:"https://en.cppreference.com/w/cpp/header",description:"C++ standard library headers"},{type:"textbook",title:"A Tour of C++",author:"Bjarne Stroustrup",description:"Chapter 3: Modularity"}]})]})}const U=Object.freeze(Object.defineProperty({__proto__:null,default:M},Symbol.toStringTag,{value:"Module"}));function A(){return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["C++ is a ",e.jsx("strong",{children:"statically typed"})," language — every variable must have a declared type, and that type is checked at compile time. Understanding the fundamental types is essential because they determine how much memory is used and what operations are valid."]}),e.jsx(x,{title:"Fundamental Types",children:e.jsx("p",{children:"Fundamental (or built-in) types are the basic data types provided directly by the C++ language. They include integer types, floating-point types, character types, and the boolean type."})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Integer Types"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700 text-left",children:[e.jsx("th",{className:"py-2 pr-4 font-semibold text-gray-900 dark:text-gray-100",children:"Type"}),e.jsx("th",{className:"py-2 pr-4 font-semibold text-gray-900 dark:text-gray-100",children:"Typical Size"}),e.jsx("th",{className:"py-2 pr-4 font-semibold text-gray-900 dark:text-gray-100",children:"Range"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-100 dark:border-gray-800",children:[e.jsx("td",{className:"py-2 pr-4 font-mono text-blue-600 dark:text-blue-400",children:"short"}),e.jsx("td",{className:"py-2 pr-4",children:"2 bytes"}),e.jsx("td",{className:"py-2 pr-4",children:"-32,768 to 32,767"})]}),e.jsxs("tr",{className:"border-b border-gray-100 dark:border-gray-800",children:[e.jsx("td",{className:"py-2 pr-4 font-mono text-blue-600 dark:text-blue-400",children:"int"}),e.jsx("td",{className:"py-2 pr-4",children:"4 bytes"}),e.jsx("td",{className:"py-2 pr-4",children:"-2.1 billion to 2.1 billion"})]}),e.jsxs("tr",{className:"border-b border-gray-100 dark:border-gray-800",children:[e.jsx("td",{className:"py-2 pr-4 font-mono text-blue-600 dark:text-blue-400",children:"long"}),e.jsx("td",{className:"py-2 pr-4",children:"4 or 8 bytes"}),e.jsx("td",{className:"py-2 pr-4",children:"Platform-dependent"})]}),e.jsxs("tr",{className:"border-b border-gray-100 dark:border-gray-800",children:[e.jsx("td",{className:"py-2 pr-4 font-mono text-blue-600 dark:text-blue-400",children:"long long"}),e.jsx("td",{className:"py-2 pr-4",children:"8 bytes"}),e.jsx("td",{className:"py-2 pr-4",children:"-9.2 quintillion to 9.2 quintillion"})]})]})]})}),e.jsx(t,{title:"Integer types in action",children:`#include <iostream>
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
}`}),e.jsx(n,{children:`int: 42
short: 100
long long: 9000000000
INT_MAX: 2147483647`}),e.jsx(h,{type:"tip",title:"Digit Separators (C++14)",children:e.jsxs("p",{children:["Use single quotes as digit separators for readability: ",e.jsx("code",{children:"1'000'000"})," instead of ",e.jsx("code",{children:"1000000"}),". The compiler ignores them entirely."]})}),e.jsxs(c,{title:"Unsigned Types",children:[e.jsxs("p",{children:["Adding ",e.jsx("code",{children:"unsigned"})," before an integer type makes it non-negative, doubling the positive range at the cost of no negative values."]}),e.jsx(t,{children:`unsigned int positive = 42;      // 0 to ~4.2 billion
unsigned short small = 65535;    // 0 to 65,535`})]}),e.jsxs(f,{title:"Unsigned Underflow",children:[e.jsx("p",{children:"Subtracting from an unsigned value that reaches 0 wraps around to a huge number instead of going negative. This is a common source of bugs."}),e.jsx(t,{children:`unsigned int x = 0;
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
}`}),e.jsx(n,{children:`float:       3.14159011840820
double:      3.14159265358979
long double: 3.14159265358979`}),e.jsx(p,{title:"Prefer double over float",children:e.jsxs("p",{children:["Use ",e.jsx("code",{children:"double"})," as your default floating-point type. ",e.jsx("code",{children:"float"})," has limited precision and is mainly useful when memory is constrained (e.g., GPU programming). On modern hardware, ",e.jsx("code",{children:"double"})," operations are often just as fast."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Character and Boolean Types"}),e.jsx(t,{children:`#include <iostream>

int main() {
    char letter = 'A';        // Single character (1 byte)
    char newline = '\\n';      // Escape sequence
    bool is_valid = true;     // Boolean: true or false

    std::cout << "char: " << letter << std::endl;
    std::cout << "ASCII value: " << static_cast<int>(letter) << std::endl;
    std::cout << "bool: " << is_valid << std::endl;
    std::cout << "bool (alpha): " << std::boolalpha << is_valid << std::endl;

    return 0;
}`}),e.jsx(n,{children:`char: A
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
}`}),e.jsx(h,{type:"info",title:"Guaranteed Minimums",children:e.jsxs("p",{children:["The C++ standard only guarantees ",e.jsx("em",{children:"minimum"})," sizes: ",e.jsx("code",{children:"char"})," is at least 1 byte,",e.jsx("code",{children:"short"})," at least 2, ",e.jsx("code",{children:"int"})," at least 2, ",e.jsx("code",{children:"long"})," at least 4,",e.jsx("code",{children:"long long"})," at least 8. Actual sizes are platform-dependent."]})}),e.jsx(g,{title:"Type Investigation",difficulty:"beginner",prompt:"Write a program that prints the size of every fundamental type on your system using sizeof. Also print the maximum value of int and the minimum value of int using <climits>.",hints:["Include <climits> for INT_MAX and INT_MIN","sizeof returns the size in bytes"]}),e.jsx(b,{references:[{type:"cppreference",title:"Fundamental types",url:"https://en.cppreference.com/w/cpp/language/types",description:"Complete reference for all C++ fundamental types"},{type:"cppreference",title:"Fixed width integer types",url:"https://en.cppreference.com/w/cpp/types/integer",description:"int32_t, uint64_t, etc. from <cstdint>"}]})]})}const R=Object.freeze(Object.defineProperty({__proto__:null,default:A},Symbol.toStringTag,{value:"Module"}));function E(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Variables are named storage locations in memory. In C++, every variable has a type, a name, and a value. Understanding how to declare, initialize, and use variables — along with the difference between variables and constants — is fundamental to writing C++ programs."}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Declaration and Initialization"}),e.jsx(c,{title:"Variable Declaration",children:e.jsx(t,{children:`type name;              // Declaration (uninitialized)
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
}`}),e.jsx(n,{children:`b = 42
d = 42
e = 0`}),e.jsxs(f,{title:"Uninitialized Variables",children:[e.jsxs("p",{children:["Reading an uninitialized variable is ",e.jsx("strong",{children:"undefined behavior"}),". The variable contains whatever was previously in that memory location. Always initialize your variables."]}),e.jsx(t,{children:`int x;
std::cout << x;  // Undefined behavior! Could print anything.`})]}),e.jsxs(p,{title:"Prefer Brace Initialization",children:[e.jsxs("p",{children:["Brace initialization ",e.jsx("code",{children:"int x{42}"})," is the safest form because it prevents",e.jsx("strong",{children:" narrowing conversions"})," — the compiler will error if data would be lost."]}),e.jsx(t,{children:`int x{3.14};     // ERROR: narrowing conversion from double to int
int y = 3.14;    // OK but silently truncates to 3 — potential bug!`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Constants"}),e.jsx(c,{title:"const and constexpr",children:e.jsx(t,{children:`const double PI = 3.14159265358979;      // Runtime constant
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
}`}),e.jsx(n,{children:`Max attempts: 3
Gravity: 9.81 m/s^2`}),e.jsx(p,{title:"Prefer constexpr over const for Compile-Time Values",children:e.jsxs("p",{children:["If a value is known at compile time, use ",e.jsx("code",{children:"constexpr"}),". This enables compiler optimizations and makes your intent clear. Use ",e.jsx("code",{children:"const"})," for values determined at runtime that should not change after initialization."]})}),e.jsx(h,{type:"history",title:"Evolution of Constants",children:e.jsxs("p",{children:["C used ",e.jsx("code",{children:"#define PI 3.14"})," (preprocessor macro) for constants. C++ introduced",e.jsx("code",{children:"const"})," for type-safe constants. C++11 added ",e.jsx("code",{children:"constexpr"})," for guaranteed compile-time evaluation. Modern C++ strongly prefers ",e.jsx("code",{children:"constexpr"}),"."]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Type Deduction with auto"}),e.jsx(x,{title:"auto (C++11)",children:e.jsxs("p",{children:["The ",e.jsx("code",{children:"auto"})," keyword lets the compiler deduce the type from the initializer. The variable still has a fixed, static type — it's just inferred by the compiler."]})}),e.jsx(t,{children:`#include <iostream>

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
}`}),e.jsx(n,{children:`x: 42 (int)
y: 3.14 (double)
z: A (char)`}),e.jsx(h,{type:"important",title:"auto Requires an Initializer",children:e.jsxs("p",{children:[e.jsx("code",{children:"auto x;"})," is invalid — the compiler needs an initializer to deduce the type.",e.jsx("code",{children:"auto"}),` doesn't mean "any type" — it means "figure out the type for me."`]})}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Scope and Lifetime"}),e.jsx(t,{children:`#include <iostream>

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
}`}),e.jsx(n,{children:`inner: 10
local: 42
global: 100
local: 42`}),e.jsx(p,{title:"Minimize Variable Scope",children:e.jsx("p",{children:"Declare variables as close to their first use as possible and in the narrowest scope needed. This reduces bugs from accidental reuse and makes code easier to understand."})}),e.jsx(g,{title:"Constants and Calculations",difficulty:"beginner",prompt:"Write a program that calculates the area and circumference of a circle. Use constexpr for PI, const for the radius (set to 5.0), and auto for the computed results. Print both values.",hints:["Area = PI * r * r","Circumference = 2 * PI * r","Use constexpr double PI = 3.14159265358979;"],solution:e.jsx(t,{children:`#include <iostream>

int main() {
    constexpr double PI = 3.14159265358979;
    const double radius = 5.0;

    auto area = PI * radius * radius;
    auto circumference = 2.0 * PI * radius;

    std::cout << "Radius: " << radius << std::endl;
    std::cout << "Area: " << area << std::endl;
    std::cout << "Circumference: " << circumference << std::endl;

    return 0;
}`})}),e.jsx(b,{references:[{type:"cppreference",title:"Declarations",url:"https://en.cppreference.com/w/cpp/language/declarations",description:"Variable declaration syntax and semantics"},{type:"cppreference",title:"constexpr specifier",url:"https://en.cppreference.com/w/cpp/language/constexpr",description:"Compile-time constant expressions"},{type:"cppreference",title:"auto specifier",url:"https://en.cppreference.com/w/cpp/language/auto",description:"Type deduction for variables"}]})]})}const F=Object.freeze(Object.defineProperty({__proto__:null,default:E},Symbol.toStringTag,{value:"Module"}));function P(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"When you mix different types in expressions or assignments, C++ converts values from one type to another. Some conversions happen automatically (implicit), while others require you to be explicit. Understanding these conversions helps you avoid subtle bugs caused by data loss or unexpected behavior."}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Implicit Conversions"}),e.jsx(x,{title:"Implicit Conversion (Coercion)",children:e.jsx("p",{children:"An implicit conversion is performed automatically by the compiler when a value of one type is used where another type is expected. These happen in assignments, function calls, and mixed-type expressions."})}),e.jsx(t,{title:"Safe implicit conversions (widening)",children:`#include <iostream>

int main() {
    int i = 42;
    double d = i;    // int → double (safe, no data loss)
    long l = i;      // int → long (safe, wider type)

    std::cout << "int: " << i << std::endl;
    std::cout << "double: " << d << std::endl;
    std::cout << "long: " << l << std::endl;

    return 0;
}`}),e.jsx(n,{children:`int: 42
double: 42
long: 42`}),e.jsxs(f,{title:"Dangerous Implicit Conversions (Narrowing)",children:[e.jsx("p",{children:"Narrowing conversions lose data silently. The compiler may warn but will still compile:"}),e.jsx(t,{children:`double pi = 3.14159;
int truncated = pi;     // 3 — fractional part silently lost!

int big = 300;
char c = big;           // Overflow! char can only hold -128 to 127

unsigned int u = -1;    // Wraps to 4294967295!`})]}),e.jsxs(h,{type:"tip",title:"Brace Initialization Catches Narrowing",children:[e.jsx("p",{children:"This is why brace initialization is preferred — it makes narrowing conversions a compile error:"}),e.jsx(t,{children:`int x{3.14};   // ERROR: narrowing conversion
int y = 3.14;  // OK but truncates (potential bug)`})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Integer Promotion"}),e.jsxs(c,{title:"Arithmetic Promotion Rules",children:[e.jsxs("p",{children:["In arithmetic expressions, smaller integer types are promoted to ",e.jsx("code",{children:"int"}),' before the operation is performed. If the operands have different types, the "narrower" one is converted to the "wider" one:']}),e.jsx("p",{className:"mt-2 font-mono text-xs text-gray-600 dark:text-gray-400",children:"bool → char → short → int → unsigned int → long → unsigned long → long long → float → double → long double"})]}),e.jsx(t,{children:`#include <iostream>

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
}`}),e.jsx(n,{children:`sizeof(short): 2
sizeof(a + b): 4
7 + 2.5 = 9.5`}),e.jsx("h2",{className:"text-xl font-bold text-gray-900 dark:text-gray-100",children:"Explicit Casts"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300",children:"C++ provides four named cast operators. Each serves a specific purpose:"}),e.jsxs(c,{title:"static_cast — The Standard Cast",children:[e.jsxs("p",{children:["Use ",e.jsx("code",{children:"static_cast"})," for well-defined conversions between related types. This is the most common cast and should be your default choice."]}),e.jsx(t,{children:`double pi = 3.14159;
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
}`}),e.jsx(n,{children:`int / int: 3
with cast: 3.5
99.9 → int: 99`}),e.jsxs(h,{type:"info",title:"Other Cast Types",children:[e.jsx("p",{children:"C++ has three other casts for specialized purposes:"}),e.jsxs("ul",{className:"list-disc pl-5 mt-1 space-y-1",children:[e.jsxs("li",{children:[e.jsx("code",{children:"const_cast"})," — removes or adds const (rarely needed)"]}),e.jsxs("li",{children:[e.jsx("code",{children:"dynamic_cast"})," — safe downcasting in class hierarchies (OOP topic)"]}),e.jsxs("li",{children:[e.jsx("code",{children:"reinterpret_cast"})," — low-level bit reinterpretation (advanced/dangerous)"]})]})]}),e.jsxs(f,{title:"Avoid C-Style Casts",children:[e.jsxs("p",{children:["C-style casts like ",e.jsx("code",{children:"(int)3.14"})," still work in C++ but are dangerous — they can perform any cast, including unsafe ones, with no compiler checks. Always use C++ named casts."]}),e.jsx(t,{children:`// Bad: C-style cast (avoid)
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
}`}),e.jsx(n,{children:`0 → bool: false
42 → bool: true
true → int: 1`}),e.jsx(p,{title:"Be Explicit About Conversions",children:e.jsxs("p",{children:["When you need a type conversion, use ",e.jsx("code",{children:"static_cast"})," to document your intent. This makes the conversion visible to other developers and to code review tools. Let narrowing conversions be caught by brace initialization wherever possible."]})}),e.jsx(g,{title:"Safe Division",difficulty:"beginner",prompt:"Write a function that performs integer division but returns a double result (e.g., divide(7, 2) should return 3.5, not 3). Use static_cast.",hints:["Cast at least one operand to double before dividing","If both operands are int, the result will be truncated"],solution:e.jsx(t,{children:`#include <iostream>

double divide(int a, int b) {
    return static_cast<double>(a) / b;
}

int main() {
    std::cout << "7 / 2 = " << divide(7, 2) << std::endl;
    std::cout << "10 / 3 = " << divide(10, 3) << std::endl;
    return 0;
}`})}),e.jsx(b,{references:[{type:"cppreference",title:"Implicit conversions",url:"https://en.cppreference.com/w/cpp/language/implicit_conversion",description:"All implicit conversion rules"},{type:"cppreference",title:"static_cast",url:"https://en.cppreference.com/w/cpp/language/static_cast",description:"The standard explicit cast operator"},{type:"textbook",title:"Effective Modern C++",author:"Scott Meyers",description:"Item 2: Understand auto type deduction"}]})]})}const D=Object.freeze(Object.defineProperty({__proto__:null,default:P},Symbol.toStringTag,{value:"Module"}));export{H as a,U as b,R as c,F as d,D as e,O as s};
