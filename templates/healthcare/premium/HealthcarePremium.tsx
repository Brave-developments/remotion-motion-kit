import React from 'react';
import { AbsoluteFill,useCurrentFrame,useVideoConfig } from 'remotion';
import { healthcarePalette as p } from '../tokens';
import { reveal } from '../MedicalComponents';
import { ClinicalMonitor, ClinicalMonitorProps } from './ClinicalMonitor';
import { ABGPanel, ABGPanelProps } from './ABGPanel';
import { VitalTrend, VitalTrendProps } from './VitalTrend';
export type HealthcarePremiumProps={
 mode:'clinical-monitor'|'abg-dashboard'|'vital-trend';
 layout?:'full'|'upper';
 headline:string;
 subtitle?:string;
 takeaway?:string;
 clinical?:ClinicalMonitorProps;
 abg?:ABGPanelProps;
 trend?:VitalTrendProps;
};
export const HealthcarePremium:React.FC<HealthcarePremiumProps>=(props)=>{
 const upper=props.layout==='upper',f=useCurrentFrame(),{fps}=useVideoConfig();
 const content=props.mode==='clinical-monitor'?<ClinicalMonitor {...props.clinical}/>:
  props.mode==='abg-dashboard'?<ABGPanel {...props.abg}/>:<VitalTrend {...props.trend}/>;
 return <AbsoluteFill style={{background:upper?'transparent':p.canvas,fontFamily:"Inter,Arial,sans-serif"}}>
 <div style={{position:'absolute',height:upper?1160:1920,width:1080,top:0,left:0,overflow:'hidden',background:p.canvas}}>
  <div style={{position:'absolute',left:65,right:65,top:upper?64:120}}>
   <div style={{fontSize:24,color:p.teal,fontWeight:900,letterSpacing:3}}>PREMIUM HEALTHCARE DASHBOARD</div>
   <div style={{fontSize:upper?52:73,color:p.text,fontWeight:950,lineHeight:1.07,marginTop:19,letterSpacing:-2,...reveal(f,fps,0)}}>{props.headline}</div>
   {props.subtitle&&<div style={{fontSize:upper?22:30,color:p.muted,marginTop:18,lineHeight:1.3,...reveal(f,fps,9)}}>{props.subtitle}</div>}
  </div>
  <div style={{position:'absolute',left:62,right:62,top:upper?280:440, transformOrigin:'top center'}}>
   <div style={{...reveal(f,fps,18),transform:upper?'scale(.66)':'scale(1)',transformOrigin:'top left',width:upper?1445:956}}>
    {content}
   </div>
  </div>
  {props.takeaway&&<div style={{position:'absolute',bottom:upper?22:150,left:65,right:65,fontSize:upper?24:31,color:p.text,fontWeight:850,background:p.paper,padding:25,borderRadius:24,borderLeft:`9px solid ${p.teal}`,...reveal(f,fps,75)}}>{props.takeaway}</div>}
  <div style={{position:'absolute',bottom:8,left:62,right:62,fontSize:16,color:p.muted,fontWeight:750}}>EDUCATIONAL SIMULATION • VERIFY VALUES AND CLAIMS BEFORE PUBLICATION</div>
 </div>
 </AbsoluteFill>;
};
