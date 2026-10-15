import React from 'react';
import { useCurrentFrame } from 'remotion';
import { p, MicroMode } from '../tokens';
export const MicroMechanism3D:React.FC<{size?:number;mode?:MicroMode}>=({size=670,mode='insulin'})=>{
 const f=useCurrentFrame();
 const labels:Record<MicroMode,{left:string;right:string;top:string}> = {
 insulin:{left:'INSULIN',right:'GLUCOSE',top:'RECEPTOR SIGNAL → GLUT4 TRANSPORT'},
 ions:{left:'Na⁺',right:'K⁺',top:'SELECTIVE ION MOVEMENT'},
 osmosis:{left:'H₂O',right:'H₂O',top:'WATER MOVEMENT ACROSS A MEMBRANE'},
 medication:{left:'DRUG',right:'SIGNAL',top:'RECEPTOR BINDING · CONCEPTUAL'},
 };
 const cfg=labels[mode];const travel=Math.min(1,Math.max(0,(f-22)/75));
 return <svg viewBox="0 0 690 590" width={size} height={size*.855} role="img" aria-label={cfg.top}>
 <defs>
 <linearGradient id="memTop" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#F2F9FF"/><stop offset=".48" stopColor="#BEE8EF"/><stop offset="1" stopColor="#66AAC3"/></linearGradient>
 <linearGradient id="memChannel" x1="0" y1="0" x2="1" y2=".5"><stop stopColor="#1C658E"/><stop offset=".45" stopColor="#87D6D9"/><stop offset="1" stopColor="#2A7898"/></linearGradient>
 <radialGradient id="cellSide"><stop stopColor="#EBF9F5"/><stop offset="1" stopColor="#C2EAE2"/></radialGradient>
 </defs>
 <path d="M38 245 L580 145 L653 233 L112 345 Z" fill="url(#memTop)" stroke="#91C2C8" strokeWidth="6"/>
 <path d="M112 345 L653 233 L653 333 L112 445Z" fill="#68B3BB" opacity=".6"/>
 <path d="M38 245 L112 345 L112 445 L38 339Z" fill="#2F839B" opacity=".75"/>
 {Array.from({length:12},(_,i)=>{const x=72+i*43;return <g key={i}>
  <circle cx={x} cy={242-i*7.4} r="14" fill="#EFFDFF" stroke="#4A9BB0" strokeWidth="4"/>
  <circle cx={x+76} cy={340-i*7.4} r="14" fill="#EFFDFF" stroke="#4A9BB0" strokeWidth="4"/>
  </g>})}
 <path d="M323 205 L353 198 L421 248 L408 340 L370 358 L310 314Z" fill="url(#memChannel)" stroke="#1D688B" strokeWidth="8"/>
 <path d="M347 232 L382 245 L373 332 L344 310 Z" fill="#F6FFFF" opacity=".88"/>
 <path d="M326 193 Q322 157 294 147 Q278 135 291 116" fill="none" stroke={p.blue} strokeWidth="23" strokeLinecap="round"/>
 <path d="M410 253 Q438 242 450 224" fill="none" stroke="#174D76" strokeWidth="16" strokeLinecap="round"/>
 <path d="M38 445 L112 523 L653 414 L653 333 L112 445Z" fill="url(#cellSide)" opacity=".8"/>
 {Array.from({length:5},(_,i)=>{
  const x=115+i*56+travel*240, y=174+i*26+travel*192;
  return <g key={i} transform={`translate(${x},${y})`}><circle r={12+i%2*3} fill={mode==='ions'?(i%2?p.blue:p.teal):mode==='osmosis'?p.blue:mode==='medication'?p.critical:'#D79B39'} stroke={p.paper} strokeWidth="3"/></g>;
 })}
 <g transform={`translate(${215+travel*79},${111+travel*27})`}>
  <circle r="22" fill={mode==='medication'?p.critical:p.teal} stroke={p.paper} strokeWidth="6"/>
  <text y="7" textAnchor="middle" fontWeight="800" fontSize="19" fill={p.paper}>{mode==='ions'?'Na':'I'}</text>
 </g>
 <g fontSize="23" fontWeight="850" fontFamily="Arial,sans-serif" fill={p.muted}>
  <text x="35" y="74">{cfg.left}</text><text x="443" y="520">{cfg.right}</text>
  <text x="345" y="570" textAnchor="middle">{cfg.top}</text>
 </g>
 </svg>;
};
