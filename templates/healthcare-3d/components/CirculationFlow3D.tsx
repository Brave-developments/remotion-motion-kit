import React from 'react';
import { useCurrentFrame } from 'remotion';
import { p } from '../tokens';
import { HeartHero3D } from './HeartHero3D';
/** Stylised, looping circulation map with animated particles. Flow arrows are qualitative. */
export const CirculationFlow3D:React.FC<{size?:number;lowFlow?:boolean}>=({size=640,lowFlow=false})=>{
 const f=useCurrentFrame(); const t=f*(lowFlow?.004:.014);
 const points=Array.from({length:10},(_,i)=>{const a=i/10*Math.PI*2+t;return {x:335+267*Math.sin(a),y:298+212*Math.cos(a),a};});
 return <svg viewBox="0 0 680 620" width={size} height={size*.912} role="img" aria-label="Stylised closed-loop circulation and heart flow">
 <defs>
  <linearGradient id="circRed" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#8E2949"/><stop offset=".5" stopColor="#FF9C96"/><stop offset="1" stopColor="#B83B56"/></linearGradient>
  <linearGradient id="circBlue" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#20567F"/><stop offset=".5" stopColor="#99D7EC"/><stop offset="1" stopColor="#3279BE"/></linearGradient>
  <filter id="circShadow"><feDropShadow dx="8" dy="14" stdDeviation="14" floodColor="#263C50" floodOpacity=".24"/></filter>
 </defs>
 <ellipse cx="335" cy="532" rx="235" ry="30" fill={p.text} opacity=".08"/>
 <g filter="url(#circShadow)">
  <path d="M335 76 C518 38 616 148 608 298 C599 457 487 531 336 516" fill="none" stroke="url(#circRed)" strokeWidth="45" strokeLinecap="round"/>
  <path d="M335 516 C166 553 56 441 62 293 C69 135 182 45 335 76" fill="none" stroke="url(#circBlue)" strokeWidth="45" strokeLinecap="round"/>
  <path d="M335 76 C518 38 616 148 608 298 C599 457 487 531 336 516" fill="none" stroke="#FFE1D7" strokeWidth="8" opacity=".57"/>
  <path d="M335 516 C166 553 56 441 62 293 C69 135 182 45 335 76" fill="none" stroke="#D8FBFF" strokeWidth="8" opacity=".58"/>
 </g>
 <g opacity=".9">{points.map((q,i)=><circle key={i} cx={q.x} cy={q.y} r={lowFlow?8:11}
  fill={q.x>335?'#D34E65':'#3A9AD0'} stroke={p.paper} strokeWidth="3"/>)}</g>
 <g transform="translate(178 112) scale(.50)"><HeartHero3D size={650} showConduction={false} showFlow={false}/></g>
 <g fill={p.muted} fontSize="25" fontWeight="800" fontFamily="Arial, sans-serif">
  <text x="470" y="125">ARTERIAL</text><text x="36" y="126">VENOUS</text>
  <text x="335" y="590" textAnchor="middle">SIMPLIFIED SYSTEMIC FLOW · NOT ANATOMICAL PATH</text>
 </g>
 </svg>;
};
