import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { p, Healthcare3DMode, Healthcare3DLayout, MicroMode } from './tokens';
import { DepthStage, enter, SchematicNote } from './components/Primitives';
import { HeartHero3D } from './components/HeartHero3D';
import { LungGasExchange3D } from './components/LungGasExchange3D';
import { KidneyPerfusion3D } from './components/KidneyPerfusion3D';
import { CirculationFlow3D } from './components/CirculationFlow3D';
import { MicroMechanism3D } from './components/MicroMechanism3D';
import { Comparison3D } from './components/Comparison3D';
import { HoloMetricPanel } from './components/HoloMetricPanel';
export type Healthcare3DProps={
 mode:Healthcare3DMode;
 layout?:Healthcare3DLayout;
 title:string;
 eyebrow?:string;
 subtitle?:string;
 takeaway?:string;
 microMode?:MicroMode;
 reduceFlow?:boolean;
 /** If true, composites a clinical info card below the visual. */
 showDashboard?:boolean;
 /** Do not use rendered examples as real patient data. */
 demoWatermark?:boolean;
};
export const Healthcare3D:React.FC<Healthcare3DProps>=(props)=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 const upper=props.layout==='upper', height=upper?1160:1920, scale=upper ? 0.71 : 1;
 const title=props.title;
 const stageH=upper?510:890;
 const visualSize=upper?430:660;
 const central=(()=>{
  switch(props.mode){
   case 'heart-hero': return <HeartHero3D size={visualSize}/>;
   case 'lungs-gas-exchange':return <LungGasExchange3D size={visualSize} reducedPerfusion={props.reduceFlow}/>;
   case 'kidney-perfusion':return <KidneyPerfusion3D size={visualSize}/>;
   case 'circulation-flow':return <CirculationFlow3D size={visualSize} lowFlow={props.reduceFlow}/>;
   case 'micro-mechanism':return <MicroMechanism3D size={visualSize} mode={props.microMode??'insulin'}/>;
   case 'comparison-3d':return <Comparison3D size={upper?850:940}/>;
   case 'dashboard-hybrid':return <div style={{display:'flex',alignItems:'center',gap:14, transform:upper?'scale(.85)':'scale(1)',width:upper?900:940}}>
    <div style={{flex:.75}}><HeartHero3D size={upper?345:430}/></div><div style={{flex:1.25,minWidth:0}}><HoloMetricPanel focus="ecg" compact/></div></div>;
  }
 })();
 return <AbsoluteFill style={{background:upper?'transparent':p.canvas,fontFamily:"Inter, Arial, sans-serif",color:p.text}}>
  <div style={{position:'absolute',width:1080,height,left:0,top:0,overflow:'hidden',
   background:`radial-gradient(ellipse at 70% 15%,${p.sky},transparent 50%),${p.canvas}`}}>
   <div style={{position:'absolute',left:60,right:60,top:upper?65:115}}>
    <div style={{...enter(f,fps,0),letterSpacing:3.3*scale,color:p.teal,fontSize:23*scale,fontWeight:900}}>
     {props.eyebrow??'HEALTHCARE · DEPTH-STYLED EXTRA'}
    </div>
    <h1 style={{...enter(f,fps,4),fontSize:upper?52:74,fontWeight:900,lineHeight:1.09,letterSpacing:-2,margin:'17px 0 0'}}>
     {title}
    </h1>
    {props.subtitle&&<div style={{...enter(f,fps,12),fontSize:upper?24:30,color:p.muted,lineHeight:1.35,marginTop:17}}>{props.subtitle}</div>}
   </div>
   <div style={{position:'absolute',left:56,right:56,top:upper?370:530}}>
    <DepthStage height={stageH} subtitle="DEPTH-STYLED VECTOR DEMO • ANATOMY IS SCHEMATIC">
     {central}
    </DepthStage>
    {!upper&&(props.mode==='dashboard-hybrid'||props.showDashboard)&&<div style={{marginTop:23}}><HoloMetricPanel focus="spo2" compact/></div>}
    {!upper&&<div style={{marginTop:23}}><SchematicNote>CONCEPT VISUALISATION · NOT MEDICAL ADVICE</SchematicNote></div>}
   </div>
   {props.takeaway&&<div style={{position:'absolute',bottom:upper?20:140,left:60,right:60,padding:upper?17:27,borderRadius:25,
      background:p.paper,border:`2px solid ${p.line}`,borderLeft:`9px solid ${p.teal}`,
      fontSize:upper?22:31,fontWeight:850,lineHeight:1.3,...enter(f,fps,70)}}>
      {props.takeaway}
   </div>}
   {props.demoWatermark&&<div style={{position:'absolute',bottom:upper?4:22,left:60,right:60,fontSize:upper?15:19,
     fontWeight:800,color:p.muted,letterSpacing:.4}}>ILLUSTRATIVE 2.5D SCENE · NOT A DIAGNOSTIC / PATIENT MODEL</div>}
  </div>
 </AbsoluteFill>;
};
