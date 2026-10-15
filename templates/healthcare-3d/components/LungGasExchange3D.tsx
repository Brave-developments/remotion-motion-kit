import React from 'react';
import { useCurrentFrame } from 'remotion';
import { p } from '../tokens';
import { OrbitingDots } from './Primitives';
export type LungGasExchange3DProps={size?:number; reducedPerfusion?:boolean; showAlveoli?:boolean};
export const LungGasExchange3D:React.FC<LungGasExchange3DProps>=({size=640,reducedPerfusion=false,showAlveoli=true})=>{
 const f=useCurrentFrame();
 const breathe=1+.018*Math.sin(f/12);
 return <svg viewBox="0 0 670 650" width={size} height={size*.97} role="img" aria-label="Depth-shaded schematic lungs, bronchi and alveolar capillary flow">
 <defs>
  <radialGradient id="lungLeft" cx="27%" cy="30%" r="95%"><stop stopColor="#FFF0E8"/><stop offset=".48" stopColor="#F5B2AE"/><stop offset="1" stopColor="#BC687D"/></radialGradient>
  <radialGradient id="lungRight" cx="23%" cy="25%" r="90%"><stop stopColor="#FFECDF"/><stop offset=".5" stopColor="#EEAEAB"/><stop offset="1" stopColor="#AB5675"/></radialGradient>
  <linearGradient id="bronchus" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#84D1E4"/><stop offset=".5" stopColor="#DFF7F6"/><stop offset="1" stopColor="#3279BE"/></linearGradient>
  <filter id="lungShadow"><feDropShadow dx="8" dy="14" stdDeviation="13" floodColor="#204257" floodOpacity=".22"/></filter>
 </defs>
 <g style={{transformOrigin:'335px 260px',transform:`scale(${breathe})`}} filter="url(#lungShadow)">
  <path d="M304 177 C250 109 175 132 117 198 C65 263 60 410 131 476 C166 518 259 482 308 429Z" fill="url(#lungLeft)" stroke="#C46F82" strokeWidth="6"/>
  <path d="M365 177 C428 109 504 131 552 197 C606 266 611 414 537 477 C502 512 412 488 363 430Z" fill="url(#lungRight)" stroke="#BE6E80" strokeWidth="6"/>
  <path d="M287 205 C219 202 167 268 143 358 M402 211 C472 196 519 265 538 359" stroke="#FFE8DC" strokeWidth="16" opacity=".8" fill="none" strokeLinecap="round"/>
  <path d="M335 70 L335 198 L243 282 M335 198 L428 280" fill="none" stroke="#3279BE" strokeWidth="39" strokeLinecap="round"/>
  <path d="M335 70 L335 198 L243 282 M335 198 L428 280" fill="none" stroke="url(#bronchus)" strokeWidth="27" strokeLinecap="round"/>
  {[[228,325,188,358],[234,288,194,301],[428,324,479,357],[437,286,483,294]].map((a,i)=>
   <path key={i} d={`M ${a[0]} ${a[1]} L ${a[2]} ${a[3]}`} stroke="#5BAAC4" strokeWidth="14" strokeLinecap="round"/>)}
  <path d="M335 142 L335 69" fill="none" stroke="#D9FAFF" strokeWidth="8" strokeDasharray="15 11" strokeDashoffset={-f*2}/>
 </g>
 {showAlveoli&&<g transform="translate(411 390)">
   <circle cx="92" cy="96" r="107" fill={p.paper} stroke={p.line} strokeWidth="8" />
   <g fill="#E9CED0" stroke="#C78C9E" strokeWidth="5">{[[58,63],[116,61],[82,112],[138,116],[55,143]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="30"/>)}</g>
   <path d="M15 175 C74 137 124 181 180 157" fill="none" stroke={reducedPerfusion?'#DCCBD0':'#D15E6E'} strokeWidth={reducedPerfusion?11:19} strokeLinecap="round"/>
   {(!reducedPerfusion||f%64<11)&&<circle cx={38+f%105} cy={169-6*Math.sin(f/10)} r="11" fill="#B43751"/>}
   <g fill={p.teal}>{[0,1,2].map(i=><circle key={i} cx={55+i*35} cy={75+11*Math.sin(f/15+i)} r="7"/>)}</g>
  </g>}
 <OrbitingDots cx={335} cy={272} radius={251} count={7} color={p.blue} speed={.01}/>
 <text x="335" y="628" textAnchor="middle" fontSize="22" fontWeight="800" fill={p.muted}>O₂ IN · CO₂ OUT · SCHEMATIC ONLY</text>
 </svg>;
};
