import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { healthcarePalette as p } from '../tokens';
export type VitalTrendProps={title?:string;values?:number[];labels?:string[];unit?:string;accent?:string;metricLabel?:string};
export const VitalTrend:React.FC<VitalTrendProps>=({title='How vital signs change',values=[76,84,92,110,118,104,90],labels=['0','1','2','3','4','5','6'],unit='bpm',metricLabel='Heart rate',accent=p.teal})=>{
 const f=useCurrentFrame(),safe=values.length>=2?values:[76,90],mi=Math.min(...safe)-8,ma=Math.max(...safe)+8;
 const pts=safe.map((v,i)=>[75+(i/(safe.length-1))*730,360-(v-mi)/(ma-mi)*235] as const);
 const d=pts.map((q,i)=>`${i?'L':'M'} ${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join(' ');
 const progress=interpolate(f,[10,105],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const active=Math.min(safe.length-1,Math.floor(progress*(safe.length-1)));
 return <div style={{padding:35,border:`2px solid ${p.line}`,borderRadius:33,background:p.paper,boxShadow:'0 20px 50px #14374515'}}>
  <div style={{fontSize:29,fontWeight:900,color:p.text}}>{title}</div>
  <div style={{fontSize:23,color:p.muted,marginTop:12}}>{metricLabel} · Illustrative data</div>
  <svg viewBox="0 0 890 430" width="100%" height="430" role="img" aria-label="Animated illustrative vital-sign trend">
   {[90,180,270,360].map(y=><line key={y} x1="70" x2="825" y1={y} y2={y} stroke={p.line} strokeWidth="3" strokeDasharray="7 9"/>)}
   <path d={d} fill="none" stroke={p.line} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
   <path d={d} fill="none" stroke={accent} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" pathLength={1000} strokeDasharray={1000} strokeDashoffset={1000*(1-progress)}/>
   {pts.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="9" fill={i<=active?accent:p.line} stroke={p.paper} strokeWidth="3"/>)}
   <g fontSize="21" fontWeight="750" fill={p.muted}>{pts.map(([x],i)=><text key={i} x={x} y="412" textAnchor="middle">{labels[i]??String(i)}</text>)}</g>
  </svg>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:p.mint,borderRadius:23,padding:'23px 26px'}}>
   <span style={{fontSize:24,color:p.text,fontWeight:800}}>Current illustrative reading</span>
   <span style={{fontSize:41,color:p.teal,fontWeight:900,fontFamily:'Consolas,monospace'}}>{safe[active]} {unit}</span>
  </div>
 </div>;
};
