import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { healthcarePalette as p, healthcareTypography as font, healthcareMotion as motion, HealthcareTone } from './tokens';
import { AlveolusDiagram, CellMembraneDiagram, ClinicalMetric, ClinicalMetricData, ECGWaveform, HeartDiagram, MedicalBadge, MedicalPanel, reveal } from './MedicalComponents';

export type HealthcareMode = 'clinical-dashboard' | 'anatomy-overlay' | 'cellular-mechanism' | 'comparison' | 'logic-flow' | 'data-morph';
export type HealthcareLayout = 'full' | 'upper';
export type HealthcareStep = { label: string; description?: string };
export type HealthcareComparison = { left: string; right: string; leftDetail?: string; rightDetail?: string };
export type HealthcareMotionProps = {
  mode: HealthcareMode;
  /** Explicitly opt in per scene; no change to other motion styles. */
  layout?: HealthcareLayout;
  headline: string;
  eyebrow?: string;
  subheadline?: string;
  takeaway?: string;
  metrics?: ClinicalMetricData[];
  focusValue?: string;
  focusLabel?: string;
  focusTone?: HealthcareTone;
  anatomy?: 'heart' | 'lungs';
  mechanism?: 'insulin-glucose';
  steps?: HealthcareStep[];
  comparison?: HealthcareComparison;
  stages?: string[];
  /** Human-reviewed attribution/context for clinical assertions. */
  sourceNote?: string;
  /** Marks any example clinical values and illustrations as illustrative. */
  demoWatermark?: boolean;
};

const defaultMetrics: ClinicalMetricData[] = [
  { label: 'SpO₂', value: '98%', detail: 'Haemoglobin saturation', tone: 'normal' },
  { label: 'Haemoglobin', value: 'Reduced', detail: 'Example: anaemia', tone: 'caution' },
  { label: 'Blood flow', value: 'Reduced', detail: 'Example: low cardiac output', tone: 'caution' },
];
const defaultSteps: HealthcareStep[] = [
  { label: 'Check pH', description: 'Acidaemia or alkalaemia?' },
  { label: 'Review PaCO₂', description: 'Respiratory contribution' },
  { label: 'Review HCO₃⁻', description: 'Metabolic contribution' },
  { label: 'Assess compensation', description: 'Then connect to the patient' },
];
const defaultStages = ['Infection', 'Dysregulated response', 'Impaired perfusion', 'Organ dysfunction'];

const Head: React.FC<{ props: HealthcareMotionProps; scale: number }> = ({props, scale}) => {
  const frame = useCurrentFrame(); const {fps}=useVideoConfig();
  return <div style={{ position: 'absolute', top: 0, left: 0, right: 0, ...reveal(frame, fps, 0) }}>
    <div style={{ color: p.teal, fontSize: 23*scale, letterSpacing: 3.2*scale, fontWeight: 900, textTransform: 'uppercase' }}>{props.eyebrow || 'HEALTHCARE • VISUAL EXPLAINER'}</div>
    <div style={{ fontSize: 67*scale, fontWeight: 900, letterSpacing: -2.2*scale, lineHeight: 1.08, marginTop: 22*scale, color: p.text }}>{props.headline}</div>
    {props.subheadline && <div style={{ color:p.muted, fontSize:29*scale, lineHeight:1.35, marginTop:19*scale, maxWidth:915 }}>{props.subheadline}</div>}
  </div>;
};

const Dashboard: React.FC<{ props: HealthcareMotionProps; scale: number; height: number }> = ({props, scale, height}) => {
  const f=useCurrentFrame(); const {fps}=useVideoConfig();
  const metrics=(props.metrics?.length ? props.metrics : defaultMetrics).slice(0,3);
  const reading = props.focusValue ?? metrics[0]?.value ?? '98%';
  return <div style={{position:'absolute', left:0, right:0, top:height*.27}}>
    <MedicalPanel style={{padding:36*scale, display:'flex', alignItems:'center', gap:25*scale, minHeight:height*.27, ...reveal(f,fps,8)}}>
      <div style={{minWidth:0,flex:1}}>
        <MedicalBadge tone={props.focusTone || 'normal'}>{props.focusLabel || 'PULSE OXIMETRY'}</MedicalBadge>
        <div style={{fontFamily:font.data, fontSize:140*scale, lineHeight:1, fontWeight:900, color:p.teal, letterSpacing:-9*scale, marginTop:27*scale}}>{reading}</div>
        <div style={{color:p.muted,fontSize:26*scale,marginTop:16*scale}}>One measurement, not the whole picture</div>
      </div>
      <svg width={270*scale} height={260*scale} viewBox="0 0 270 260" aria-label="Animated saturation ring">
        <circle cx="135" cy="130" r="103" stroke={p.line} strokeWidth="24" fill="none"/>
        <circle cx="135" cy="130" r="103" stroke={p.teal} strokeWidth="24" strokeLinecap="round" fill="none"
          strokeDasharray={647} strokeDashoffset={647-interpolate(f,[10,70],[0,647*.98],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}
          transform="rotate(-90 135 130)"/>
        <text x="135" y="135" textAnchor="middle" fontSize="28" fontWeight="800" fill={p.text}>SpO₂</text>
      </svg>
    </MedicalPanel>
    <div style={{display:'flex',gap:14*scale,marginTop:22*scale}}>
      {metrics.map((metric,i)=><ClinicalMetric key={i} metric={metric} compact={scale<1} delay={24+i*motion.staggerFrames}/>)}
    </div>
    <div style={{display:'flex',alignItems:'center', gap:14, marginTop:22*scale, color:p.critical, fontSize:27*scale, fontWeight:800,...reveal(f,fps,67)}}>
      <span style={{fontSize:33*scale}}>↗</span> Oxygen delivery also depends on haemoglobin and cardiac output
    </div>
  </div>;
};

const Anatomy: React.FC<{ props: HealthcareMotionProps; scale: number; height: number }> = ({props,scale,height}) => {
  const f=useCurrentFrame();const {fps}=useVideoConfig();
  const lungs=props.anatomy==='lungs';
  const phase=(Math.floor(f/43)%3) as 0|1|2;
  const concepts=lungs?['Ventilation','Gas exchange','Blood flow']:['P: atria','QRS: ventricles','T: recovery'];
  return <div style={{position:'absolute',left:0,right:0,top:height*.28}}>
    <MedicalPanel style={{padding:20*scale,display:'flex', flexDirection:'column',alignItems:'center', minHeight:height*.38,...reveal(f,fps,5)}}>
      {lungs?<AlveolusDiagram size={440*scale}/>:<HeartDiagram size={440*scale} phase={phase===0?'atria':phase===1?'ventricles':'recovery'}/>}
      <MedicalBadge tone="info">{concepts[phase]}</MedicalBadge>
    </MedicalPanel>
    <MedicalPanel style={{padding:20*scale,marginTop:18*scale,...reveal(f,fps,18)}}>
      <div style={{fontSize:22*scale,color:p.muted,fontWeight:800,letterSpacing:2}}> {lungs?'AIR + BLOOD FLOW':'ELECTRICAL ACTIVITY · SCHEMATIC'}</div>
      {lungs?<div style={{fontSize:34*scale, fontWeight:800, color:p.text, marginTop:10*scale}}>Ventilation and perfusion must work together</div>:
        <ECGWaveform width={885*scale} height={235*scale} showLabels/>}
    </MedicalPanel>
  </div>;
};

const Cellular: React.FC<{ props: HealthcareMotionProps; scale: number; height: number }> = ({props,scale,height}) => {
  const f=useCurrentFrame();const {fps}=useVideoConfig();
  return <div style={{position:'absolute',top:height*.33,left:0,right:0}}>
    <MedicalPanel style={{padding:28*scale,...reveal(f,fps,10)}}>
      <div style={{fontSize:25*scale,color:p.muted,fontWeight:800}}>INSULIN → SIGNAL → GLUCOSE UPTAKE</div>
      <div style={{marginTop:28*scale}}><CellMembraneDiagram compact={scale<1}/></div>
      <div style={{display:'flex',justifyContent:'space-between',fontSize:24*scale,color:p.text,fontWeight:800}}>
        <span>1 · Receptor activation</span><span>2 · GLUT4 movement</span><span>3 · Glucose entry</span>
      </div>
    </MedicalPanel>
    <div style={{fontSize:28*scale,color:p.muted,marginTop:25*scale,lineHeight:1.35}}>Simplified skeletal-muscle-cell model • not to molecular scale</div>
  </div>;
};

const Compare: React.FC<{ props: HealthcareMotionProps; scale: number; height: number }> = ({props,scale,height}) => {
  const f=useCurrentFrame();const {fps}=useVideoConfig();
  const comparison=props.comparison || {left:'Normal perfusion',right:'Reduced perfusion',leftDetail:'Blood reaches the alveolus',rightDetail:'Less blood reaches the alveolus'};
  return <div style={{position:'absolute',top:height*.30,left:0,right:0,display:'flex',gap:18*scale}}>
    {[0,1].map(i=><MedicalPanel key={i} style={{width:'50%',padding:23*scale,minWidth:0,...reveal(f,fps,8+i*16)}}>
      <MedicalBadge tone={i?'caution':'normal'}>{i?'ALTERED':'NORMAL'}</MedicalBadge>
      <div style={{fontSize:33*scale, fontWeight:850, minHeight:95*scale,marginTop:27*scale,color:p.text}}>{i?comparison.right:comparison.left}</div>
      <div style={{display:'flex',justifyContent:'center',marginTop:14*scale}}><AlveolusDiagram size={360*scale} reducedFlow={!!i}/></div>
      <div style={{marginTop:23*scale,fontSize:23*scale,color:p.muted,lineHeight:1.36}}>{i?comparison.rightDetail:comparison.leftDetail}</div>
    </MedicalPanel>)}
  </div>;
};

const LogicFlow: React.FC<{ props: HealthcareMotionProps; scale: number; height: number }> = ({props,scale,height}) => {
  const f=useCurrentFrame();const {fps}=useVideoConfig();
  const steps=(props.steps?.length?props.steps:defaultSteps).slice(0,5);
  const active=Math.min(steps.length-1,Math.floor(f/27));
  return <div style={{position:'absolute',top:height*.30,left:0,right:0}}>
    {steps.map((step,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:20*scale,marginBottom:20*scale,...reveal(f,fps,8+i*15)}}>
      <div style={{height:77*scale,width:77*scale, flexShrink:0,borderRadius:24*scale, background:i<=active?p.teal:p.sky,
        color:i<=active?p.paper:p.blue,display:'grid',placeItems:'center',fontSize:34*scale,fontFamily:font.data,fontWeight:800}}>{i+1}</div>
      <MedicalPanel style={{flex:1,padding:21*scale, borderColor:i===active?p.teal:p.line}}>
        <div style={{fontSize:31*scale,fontWeight:850,color:p.text}}>{step.label}</div>
        {step.description&&<div style={{fontSize:23*scale,color:p.muted,marginTop:5*scale}}>{step.description}</div>}
      </MedicalPanel>
    </div>)}
  </div>;
};

const DataMorph: React.FC<{ props: HealthcareMotionProps; scale: number; height: number }> = ({props,scale,height}) => {
  const f=useCurrentFrame();const {fps}=useVideoConfig();
  const stages=(props.stages?.length?props.stages:defaultStages).slice(0,5);
  const active=Math.min(stages.length-1,Math.floor(f/27));
  const tone=active===stages.length-1?p.critical:active>=2?p.caution:p.teal;
  return <div style={{position:'absolute',top:height*.30,left:0,right:0}}>
    <MedicalPanel style={{padding:36*scale,textAlign:'center',height:height*.31,display:'flex',alignItems:'center',flexDirection:'column',justifyContent:'center',...reveal(f,fps,6)}}>
      <svg viewBox="0 0 260 190" width={270*scale} height={195*scale}>
        {[88,62,36].map((radius,i)=><circle key={i} cx="130" cy="95" r={radius+5*Math.sin(f/12-i)} fill="none" stroke={tone} strokeWidth="5" opacity={.22+i*.2}/>)}
        <circle cx="130" cy="95" r="24" fill={tone}/>
      </svg>
      <div style={{marginTop:18*scale,fontSize:45*scale,fontWeight:900,color:p.text,lineHeight:1.1}}>{stages[active]}</div>
      <div style={{fontSize:22*scale,color:p.muted,marginTop:14*scale}}>ILLUSTRATIVE PATHWAY • NOT AN INEVITABLE SEQUENCE</div>
    </MedicalPanel>
    <div style={{display:'flex',gap:10*scale,marginTop:30*scale}}>
      {stages.map((label,i)=><div key={i} style={{flex:1,minWidth:0}}>
        <div style={{height:13*scale,borderRadius:8,background:i<=active?tone:p.line}}/>
        <div style={{fontSize:18*scale,fontWeight:750,color:i===active?p.text:p.muted,marginTop:14*scale,lineHeight:1.24}}>{label}</div>
      </div>)}
    </div>
  </div>;
};

/** Reusable, deterministic 1080x1920 scene; lower presenter space is transparent in upper layout. */
export const HealthcareMotion: React.FC<HealthcareMotionProps> = (props) => {
  const layout=props.layout??'full';
  const height=layout==='upper'?motion.upperRegionHeight:1920;
  const scale=layout==='upper'?.67:1;
  const frame=useCurrentFrame();const {fps}=useVideoConfig();
  return <AbsoluteFill style={{background:layout==='upper'?'transparent':p.canvas,fontFamily:font.ui,color:p.text}}>
    <div style={{position:'absolute',left:0,top:0,width:1080,height,overflow:'hidden',
      background:`radial-gradient(ellipse at 92% 0%, ${p.sky} 0%, transparent 38%), ${p.canvas}`}}>
      <div style={{position:'absolute',inset:0,opacity:.25,backgroundImage:`linear-gradient(${p.line} 1px,transparent 1px),linear-gradient(90deg,${p.line} 1px,transparent 1px)`,backgroundSize:'75px 75px'}}/>
      <div style={{position:'absolute',top:height*.07,left:58,right:58,bottom:height*.05}}>
        <Head props={props} scale={scale}/>
        {props.mode==='clinical-dashboard'&&<Dashboard props={props} scale={scale} height={height}/>}
        {props.mode==='anatomy-overlay'&&<Anatomy props={props} scale={scale} height={height}/>}
        {props.mode==='cellular-mechanism'&&<Cellular props={props} scale={scale} height={height}/>}
        {props.mode==='comparison'&&<Compare props={props} scale={scale} height={height}/>}
        {props.mode==='logic-flow'&&<LogicFlow props={props} scale={scale} height={height}/>}
        {props.mode==='data-morph'&&<DataMorph props={props} scale={scale} height={height}/>}
        {(props.takeaway || props.sourceNote) && <MedicalPanel style={{position:'absolute',left:0,right:0,bottom:0,padding:21*scale,
          borderLeft:`9px solid ${p.teal}`,...reveal(frame,fps,78)}}>
          {props.takeaway&&<div style={{fontSize:25*scale,fontWeight:800,lineHeight:1.3}}>{props.takeaway}</div>}
          {props.sourceNote&&<div style={{fontSize:18*scale,color:p.muted,marginTop:7*scale}}>Context: {props.sourceNote}</div>}
        </MedicalPanel>}
      </div>
      {props.demoWatermark&&<div style={{position:'absolute',bottom:12,left:30,fontSize:17*scale,
        fontWeight:700,color:p.muted,letterSpacing:1}}>ILLUSTRATIVE MEDICAL DEMO • NOT PATIENT DATA</div>}
    </div>
  </AbsoluteFill>;
};
