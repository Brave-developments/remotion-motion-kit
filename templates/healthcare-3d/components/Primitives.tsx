import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { p } from '../tokens';
export const clamp = { extrapolateLeft:'clamp',extrapolateRight:'clamp' } as const;
export const enter = (f:number,fps:number,at=0,y=42): React.CSSProperties => {
  const progress=spring({frame:Math.max(0,f-at),fps,config:{damping:22,stiffness:125},durationInFrames:25});
  return {opacity:interpolate(f,[at,at+12],[0,1],clamp), transform:`translateY(${(1-progress)*y}px)`};
};
export const Surface:React.FC<{children:React.ReactNode; style?:React.CSSProperties}>=({children,style})=>
  <div style={{background:'linear-gradient(155deg,#FFFFFF 0%,#F6FBFC 70%,#E7F2F5 100%)',border:`2px solid ${p.line}`,borderRadius:38,boxShadow:'0 24px 70px #193C4A20, inset 0 2px 0 #FFFFFF',...style}}>{children}</div>;

export const DepthStage:React.FC<{children:React.ReactNode; height?:number; subtitle?:string}>=({children,height=640,subtitle})=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 return <Surface style={{height,position:'relative',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center',...enter(f,fps,7)}}>
   <div style={{position:'absolute',inset:0,background:`radial-gradient(circle at 30% 20%,${p.cyan}AA,transparent 54%),radial-gradient(circle at 76% 79%,${p.mint},transparent 45%)`}}/>
   <div style={{position:'absolute',left:'9%',right:'9%',top:'11%',bottom:'11%',border:`1px solid ${p.line}`,borderRadius:40,transform:'perspective(900px) rotateX(7deg)'}}/>
   <div style={{position:'relative',zIndex:2}}>{children}</div>
   {subtitle&&<div style={{position:'absolute',bottom:18,left:22,right:22,textAlign:'center',fontSize:17,fontWeight:750,color:p.muted,letterSpacing:1}}>{subtitle}</div>}
 </Surface>;
};
export const OrbitingDots:React.FC<{count?:number;radius?:number;color?:string;cx?:number;cy?:number;speed?:number}>=({count=6,radius=130,color=p.teal,cx=200,cy=200,speed=.015})=>{
 const f=useCurrentFrame();
 return <g>{Array.from({length:count},(_,i)=>{
  const a=i*Math.PI*2/count+f*speed; const x=cx+Math.cos(a)*radius; const y=cy+Math.sin(a)*radius*.47;
  return <circle key={i} cx={x} cy={y} r={5+(Math.sin(a)+1)*2} fill={color} opacity={.35+.5*((Math.sin(a)+1)/2)}/>;
 })}</g>;
};
export const SchematicNote:React.FC<{children?:React.ReactNode}>=({children})=><div style={{fontSize:18,fontWeight:750,letterSpacing:1.2,color:p.muted,textAlign:'center'}}>{children??'ILLUSTRATIVE DEPTH-STYLED ANATOMY · NOT TO SCALE'}</div>;
