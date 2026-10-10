import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
export type MetricRevealProps = { label: string; value: number; suffix?: string; source?: string };
export const MetricReveal: React.FC<MetricRevealProps> = ({ label, value, suffix='%', source }) => {
  const frame=useCurrentFrame(); const { fps }=useVideoConfig();
  const n=interpolate(frame,[0,fps*1.1],[0,value],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)});
  return <AbsoluteFill style={{ justifyContent:'center', padding:65 }}>
    <div style={{ background:'#132338',color:'#fff',padding:55,borderRadius:34,border:'2px solid #34566e' }}>
      <div style={{ fontSize:35,color:'#acc8d9' }}>{label}</div>
      <div style={{ fontSize:155,fontWeight:900,letterSpacing:-8 }}>{Math.round(n)}<span style={{ color:'#64d4eb' }}>{suffix}</span></div>
      <div style={{ background:'#2a4455',height:22,borderRadius:20,overflow:'hidden' }}>
        <div style={{ width:Math.max(0,Math.min(100,n))+'%',height:'100%',background:'#64d4eb' }} />
      </div>
      {source ? <div style={{ marginTop:24,fontSize:23,color:'#adc6d7' }}>Source: {source}</div> : null}
    </div>
  </AbsoluteFill>;
};
