import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { healthcarePalette as p, healthcareTypography as fonts } from '../tokens';
export type ABGPanelProps={ph?:number; paCO2?:number; bicarbonate?:number; oxygen?:number; label?:string};
const range=(n:number,min:number,max:number)=>Math.max(0,Math.min(1,(n-min)/(max-min)));
const Meter:React.FC<{label:string;value:number;unit:string;min:number;max:number;reference:string;precision?:number;delay:number}>=({label,value,unit,min,max,reference,precision=0,delay})=>{
 const f=useCurrentFrame(),progress=interpolate(f,[delay,delay+40],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const width=range(value,min,max)*progress*100;
 return <div style={{padding:'20px 24px',borderRadius:25,background:p.paper,border:`2px solid ${p.line}`,marginBottom:14}}>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
   <span style={{fontSize:27,fontWeight:850,color:p.text}}>{label}</span>
   <span style={{fontFamily:fonts.data,fontSize:39,fontWeight:900,color:p.blue}}>{value.toFixed(precision)} <span style={{fontSize:21,color:p.muted}}>{unit}</span></span>
  </div>
  <div style={{height:18,background:p.line,borderRadius:20,overflow:'hidden',marginTop:15}}>
   <div style={{height:'100%',width:`${width}%`,borderRadius:20,background:`linear-gradient(90deg,${p.blue},${p.teal})`}}/>
  </div>
  <div style={{fontSize:19,color:p.muted,marginTop:13}}>Typical adult reference: {reference} — compare with local laboratory ranges</div>
 </div>;
};
/** Teaching display, not a diagnostic decision engine or clinical guidance. */
export const ABGPanel:React.FC<ABGPanelProps>=({ph=7.4,paCO2=40,bicarbonate=24,oxygen=90,label='ILLUSTRATIVE ARTERIAL BLOOD GAS'})=><div style={{border:`2px solid ${p.line}`,borderRadius:34,padding:27,background:'linear-gradient(135deg,#F5FCFF,#E4F5F0)',boxShadow:'0 20px 58px #183D4819'}}>
 <div style={{fontSize:27,fontWeight:950,color:p.text,letterSpacing:1}}>ABG · INTERACTIVE-STYLE PANEL</div>
 <div style={{fontSize:21,color:p.muted,marginTop:10,fontWeight:750}}>{label}</div>
 <div style={{marginTop:19}}>
  <Meter label="pH" value={ph} unit="" min={6.8} max={7.8} reference="7.35–7.45" precision={2} delay={5}/>
  <Meter label="PaCO₂" value={paCO2} unit="mmHg" min={15} max={80} reference="35–45 mmHg" delay={19}/>
  <Meter label="HCO₃⁻" value={bicarbonate} unit="mmol/L" min={10} max={45} reference="22–26 mmol/L" delay={33}/>
  <Meter label="PaO₂" value={oxygen} unit="mmHg" min={35} max={120} reference="varies by age and context" delay={47}/>
 </div>
 <div style={{padding:'17px 21px',background:p.sky,borderRadius:19,fontSize:22,color:p.text,fontWeight:800,lineHeight:1.3}}>
  Step 1: pH → Step 2: PaCO₂ + HCO₃⁻ → Step 3: compensation & clinical context
 </div>
 <div style={{fontSize:18,color:p.muted,marginTop:14}}>Examples only. Units and reference intervals must be checked against the local laboratory.</div>
 </div>;
