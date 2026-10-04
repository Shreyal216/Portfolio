import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as fa from 'react-icons/fa';
import * as si from 'react-icons/si';
import { mkdirSync, writeFileSync } from 'node:fs';
const items = [
 ['C','SiC','#72a8ff'], ['C++','SiCplusplus','#76a9ff'], ['HTML','FaHtml5','#ff875e'],
 ['CSS','FaCss3Alt','#67b8ff'], ['PHP','FaPhp','#a99bff'], ['Java','FaJava','#ff7979'],
 ['Python','FaPython','#ffe07b'], ['JavaScript','SiJavascript','#ffe279'], ['React','FaReact','#6ce5ff'],
 ['Node.js','FaNodeJs','#9eea8b'], ['Next.js','SiNextdotjs','#f3f4f6'], ['MongoDB','SiMongodb','#8fe9a4'],
 ['GitHub','FaGithub','#f3f4f6'], ['Tailwind','SiTailwindcss','#72e4ed'], ['Bootstrap','SiBootstrap','#c5a0ff']
];
mkdirSync('public/technologies', {recursive:true});
items.forEach(([name, icon, color], index) => {
 const symbol = renderToStaticMarkup(React.createElement(fa[icon] || si[icon], {size:112, color}));
 const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="440" height="440" viewBox="0 0 440 440"><defs><radialGradient id="g"><stop stop-color="${color}" stop-opacity=".28"/><stop offset="1" stop-color="#10091f"/></radialGradient></defs><rect width="440" height="440" fill="#10091f"/><rect width="440" height="440" fill="url(#g)"/><rect x="2" y="2" width="436" height="436" rx="24" fill="none" stroke="${color}" stroke-opacity=".55" stroke-width="3"/><g transform="translate(164 130)">${symbol}</g><text x="220" y="308" fill="#f8efff" font-family="Arial,sans-serif" font-size="30" text-anchor="middle">${name}</text><text x="30" y="44" fill="${color}" font-family="monospace" font-size="17">${String(index+1).padStart(2,'0')} / TECHNOLOGY</text></svg>`;
 writeFileSync(`public/technologies/technology-${index}.svg`, svg);
});
