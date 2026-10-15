import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { HealthcarePremium } from '../templates/healthcare/premium/HealthcarePremium';
/** Three premium dashboard scene modes. Values are teaching examples, never patient data. */
export const HealthcarePremiumDemo:React.FC=()=><AbsoluteFill>
 <Sequence from={0} durationInFrames={75}><HealthcarePremium mode="clinical-monitor"
  headline="What does this monitor really show?" subtitle="ECG, oxygen saturation, breathing and blood pressure, together."/></Sequence>
 <Sequence from={75} durationInFrames={75}><HealthcarePremium mode="abg-dashboard"
  headline="Understand blood gases" subtitle="pH, PaCO₂, HCO₃⁻ and PaO₂ in context."/></Sequence>
 <Sequence from={150} durationInFrames={75}><HealthcarePremium mode="vital-trend"
  headline="Vital signs change over time" subtitle="Explain trends, not just individual numbers."/></Sequence>
 </AbsoluteFill>;
