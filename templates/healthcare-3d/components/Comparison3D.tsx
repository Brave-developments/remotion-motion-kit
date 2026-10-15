import React from 'react';
import { p } from '../tokens';
import { LungGasExchange3D } from './LungGasExchange3D';
import { Surface } from './Primitives';
export type Comparison3DProps = { size?:number; leftLabel?:string;rightLabel?:string };
export const Comparison3D:React.FC<Comparison3DProps>=({size=900,leftLabel='Normal perfusion',rightLabel='Reduced perfusion'})=><div style={{display:'flex',gap:14,width:size,maxWidth:'100%'}}>
 {[false,true].map((reduced,i)=><Surface key={i} style={{width:'50%',minWidth:0,padding:17,display:'flex',alignItems:'center',flexDirection:'column',overflow:'hidden',boxShadow:'0 12px 28px #173A4B15'}}>
   <div style={{fontSize:24,fontWeight:900,color:reduced?p.critical:p.normal,marginBottom:8,alignSelf:'stretch',textAlign:'center'}}>
    {reduced?rightLabel:leftLabel}
   </div>
   <LungGasExchange3D size={392} reducedPerfusion={reduced}/>
   <div style={{color:p.muted,fontSize:17,fontWeight:750,textAlign:'center',marginTop:5}}>Same scene • different blood flow</div>
 </Surface>)}
 </div>;
