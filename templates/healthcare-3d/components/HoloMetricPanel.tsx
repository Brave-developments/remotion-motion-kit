import React from 'react';
import { interpolate,useCurrentFrame } from 'remotion';
import { p } from '../tokens';
import { ECGWaveform } from '../../healthcare/MedicalComponents';
import { Surface } from './Primitives';
export type HoloMetricPanelProps={focus?:'ecg'|'spo2'|'abg';compact?:boolean;example?:boolean};
export const HoloMetricPanel:React.FC<HoloMetricPanelProps>=({focus='ecg',compact=false,example=true})=>{
 const f=useCurrentFrame();const pulse=interpolate(f,[0,36],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const data=focus==='abg'?[['pH','7.40'],['PaCO₂','40'],['HCO₃⁻','24']]:focus==='spo2'?[['SpO₂','98%'],['Pulse','76'],['Hb','—']]:[['HR','76'],['SpO₂','98%'],['BP','—']];
 return <Surface style={{padding:compact?20:30,width:'100%',boxSizing:'border-box',background:'linear-gradient(145deg,#F7FCFF 0%,#DFF1F3 100%)'}}>
 <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
  <div style={{fontSize:compact?21:25,color:p.text,fontWeight:900,letterSpacing:1.5}}>CLINICAL MONITOR</div>
  <span style={{borderRadius:25,background:p.mint,padding:'10px 16px',color:p.normal,fontSize:19,fontWeight:850}}>ILLUSTRATIVE</span>
 </div>
 <div style={{display:'flex',gap:10,marginTop:20}}>
  {data.map(([key,value])=><div key={key} style={{flex:1,minWidth:0,background:'#FFFFFFDD',border:`1px solid ${p.line}`,borderRadius:19,padding:compact?12:19}}>
   <div style={{fontSize:compact?17:20,color:p.muted,fontWeight:700}}>{key}</div>
   <div style={{fontSize:compact?30:43,fontWeight:900,color:key==='Hb'?p.muted:p.teal,fontFamily:'Consolas,monospace',marginTop:10}}>{value}</div>
  </div>)}
 </div>
 {focus==='ecg'?<div style={{marginTop:20,background:'#F9FFFF',borderRadius:16,padding:14}}><ECGWaveform width={compact?650:770} height={170} /></div>:
  <div style={{height:compact?28:38,background:p.line,borderRadius:20,marginTop:25,overflow:'hidden'}}>
   <div style={{height:'100%',width:`${pulse*87}%`,background:`linear-gradient(90deg,${p.blue},${p.teal})`,borderRadius:20}}/>
  </div>}
 <div style={{marginTop:15,fontSize:17,color:p.muted,fontWeight:700}}>Example readings are not a patient record or clinical recommendation.</div>
 </Surface>;
};
