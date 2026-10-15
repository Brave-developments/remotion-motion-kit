import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { healthcarePalette as p, healthcareTypography as font } from '../tokens';
import { ECGWaveform } from '../MedicalComponents';
export type ClinicalMonitorProps={
 spo2?:number; heartRate?:number; respiratoryRate?:number; systolic?:number; diastolic?:number;
 label?:string; showWarning?:boolean;
};
const box=(label:string,value:string,accent:string)=> <div style={{minWidth:0,flex:1,padding:'23px 18px',borderRadius:24,background:'#FFFFFFBD',border:`2px solid ${p.line}`}}>
 <div style={{fontSize:21,color:p.muted,fontWeight:800}}>{label}</div>
 <div style={{fontSize:47,fontWeight:950,color:accent,fontFamily:font.data,marginTop:11,letterSpacing:-3}}>{value}</div>
</div>;
/** Simulated clinical teaching monitor, not connected to real vital signs. */
export const ClinicalMonitor:React.FC<ClinicalMonitorProps>=({spo2=98,heartRate=76,respiratoryRate=16,systolic=120,diastolic=80,label='EXAMPLE PATIENT',showWarning=false})=>{
 const f=useCurrentFrame();const blink=interpolate(f%36,[0,7,18,36],[1,.82,1,1]);
 return <div style={{background:'linear-gradient(130deg,#E4F1F6,#F9FDFE)',border:`2px solid ${p.line}`,borderRadius:37,padding:33,boxShadow:'0 24px 55px #173C4722'}}>
  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:22}}>
   <div style={{fontSize:25,color:p.text,fontWeight:900,letterSpacing:1.7}}>LIVE-STYLE CLINICAL DASHBOARD</div>
   <span style={{background:showWarning?p.blush:p.mint,color:showWarning?p.critical:p.normal,padding:'10px 18px',fontWeight:900,borderRadius:23,fontSize:20}}>
    <span style={{opacity:blink}}>●</span> SIMULATION
   </span>
  </div>
  <div style={{fontSize:19,color:p.muted,marginTop:13,letterSpacing:2,fontWeight:850}}>{label}</div>
  <div style={{display:'flex',gap:12,marginTop:23}}>
   {box('HEART RATE',`${heartRate} bpm`,p.teal)}
   {box('SpO₂',`${spo2}%`,p.blue)}
  </div>
  <div style={{background:p.paper,border:`2px solid ${p.line}`,padding:'25px 20px',borderRadius:28,marginTop:17}}>
   <div style={{fontSize:23,color:p.muted,fontWeight:850}}>ECG · SCHEMATIC WAVEFORM</div>
   <ECGWaveform width={795} height={190}/>
  </div>
  <div style={{display:'flex',gap:12,marginTop:17}}>
   {box('RESP RATE',`${respiratoryRate}/min`,p.teal)}
   {box('BLOOD PRESSURE',`${systolic}/${diastolic}`,p.blue)}
  </div>
  <div style={{marginTop:16,color:showWarning?p.critical:p.muted,fontSize:20,fontWeight:800}}>
   Illustrative values only · No diagnostic waveform, clinical alarms or real patient feed
  </div>
 </div>;
};
