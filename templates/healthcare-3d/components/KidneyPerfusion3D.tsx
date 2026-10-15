import React from 'react';
import { useCurrentFrame } from 'remotion';
import { p } from '../tokens';
import { OrbitingDots } from './Primitives';
export const KidneyPerfusion3D:React.FC<{size?:number;showNephron?:boolean}>=({size=640,showNephron=true})=>{
 const f=useCurrentFrame();
 return <svg viewBox="0 0 660 640" width={size} height={size*.97} role="img" aria-label="Depth-shaded kidney with schematic blood vessels and nephron">
 <defs>
 <radialGradient id="kidBody" cx="24%" cy="28%" r="80%"><stop stopColor="#FFD4C4"/><stop offset=".5" stopColor="#DF8991"/><stop offset="1" stopColor="#8D3D58"/></radialGradient>
 <radialGradient id="kidCut" cx="60%" cy="60%" r="85%"><stop stopColor="#FDE9D0"/><stop offset="1" stopColor="#DDB5A9"/></radialGradient>
 <filter id="kidDepth"><feDropShadow dx="15" dy="20" stdDeviation="15" floodColor="#2B344B" floodOpacity=".23"/></filter>
 </defs>
 <path d="M369 118 C240 37 132 126 131 277 C127 433 236 548 363 500 C426 471 438 409 397 369 C377 344 376 300 407 278 C452 227 439 162 369 118Z" stroke="#9B445A" strokeWidth="9" fill="url(#kidBody)" filter="url(#kidDepth)"/>
 <path d="M348 168 C267 104 188 173 186 283 C187 389 247 456 341 456 C375 453 397 413 359 369 C333 333 337 282 369 254 C403 213 393 187 348 168Z" stroke="#C57B81" strokeWidth="6" fill="url(#kidCut)"/>
 {Array.from({length:7},(_,i)=>{const a=(i/6)*Math.PI*1.68-.7, x=287+100*Math.cos(a),y=308+118*Math.sin(a);return <path key={i} d={`M327 317 Q ${x} ${y} ${x+18} ${y+18}`} stroke="#D68085" fill="none" strokeWidth="9" strokeLinecap="round"/>;})}
 <path d="M403 283 C471 260 499 230 556 236" fill="none" stroke="#C84960" strokeWidth="30" strokeLinecap="round"/>
 <path d="M402 317 C476 329 500 348 563 351" fill="none" stroke="#3C87BC" strokeWidth="30" strokeLinecap="round"/>
 <path d="M407 354 C467 402 474 484 462 567" fill="none" stroke="#E9D0A2" strokeWidth="26" strokeLinecap="round"/>
 <path d="M403 283 C471 260 499 230 556 236" fill="none" stroke="#F7A7A9" strokeWidth="7" strokeDasharray="12 25" strokeDashoffset={-f*3}/>
 <path d="M402 317 C476 329 500 348 563 351" fill="none" stroke="#9FE1EA" strokeWidth="7" strokeDasharray="12 25" strokeDashoffset={f*3}/>
 {showNephron&&<g transform="translate(70 434)">
   <circle cx="71" cy="68" r="58" fill={p.paper} stroke={p.line} strokeWidth="5"/>
   <circle cx="69" cy="62" r="27" fill="#DF9EA5" stroke="#A9546B" strokeWidth="5"/>
   <path d="M95 79 C135 96 110 135 79 127 C41 120 35 164 99 162 C144 155 132 189 170 191" fill="none" stroke={p.teal} strokeWidth="10" strokeLinecap="round"/>
   <text x="106" y="235" textAnchor="middle" fontSize="22" fontWeight="800" fill={p.muted}>NEPHRON DETAIL</text>
  </g>}
 <OrbitingDots cx={330} cy={290} radius={270} count={6} speed={.008} color={p.teal}/>
 <text x="333" y="625" textAnchor="middle" fontSize="19" fontWeight="800" fill={p.muted}>VASCULAR / FILTRATION RELATIONSHIP · NOT TO SCALE</text>
 </svg>;
};
