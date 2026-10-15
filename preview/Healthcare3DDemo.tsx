import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Healthcare3D } from '../templates/healthcare-3d/Healthcare3D';
/** Seven 2.5-second original medical depth-style preview scenes. */
export const Healthcare3DDemo:React.FC=()=> <AbsoluteFill>
 <Sequence from={0} durationInFrames={75}><Healthcare3D mode="heart-hero" title="See what happens inside the heart" eyebrow="01 / HEART HERO"
  subtitle="A depth-styled heart with schematic conduction and flow." demoWatermark/></Sequence>
 <Sequence from={75} durationInFrames={75}><Healthcare3D mode="lungs-gas-exchange" title="Air meets blood" eyebrow="02 / LUNGS + ALVEOLI"
  subtitle="A simplified gas-exchange visual." demoWatermark/></Sequence>
 <Sequence from={150} durationInFrames={75}><Healthcare3D mode="kidney-perfusion" title="How kidney blood flow works" eyebrow="03 / KIDNEY + FILTRATION"
  subtitle="Visualise vessels and an enlarged nephron schematic." demoWatermark/></Sequence>
 <Sequence from={225} durationInFrames={75}><Healthcare3D mode="circulation-flow" title="Follow the blood flow" eyebrow="04 / CIRCULATION"
  subtitle="Conceptual systemic blood-flow loop." demoWatermark/></Sequence>
 <Sequence from={300} durationInFrames={75}><Healthcare3D mode="micro-mechanism" title="Insulin meets the cell" eyebrow="05 / CELL MECHANISMS"
  subtitle="Simplified receptor and glucose transport illustration." microMode="insulin" demoWatermark/></Sequence>
 <Sequence from={375} durationInFrames={75}><Healthcare3D mode="comparison-3d" title="Normal versus altered" eyebrow="06 / 3D-STYLE COMPARISON"
  subtitle="The same lungs visual, with differing perfusion." demoWatermark/></Sequence>
 <Sequence from={450} durationInFrames={75}><Healthcare3D mode="dashboard-hybrid" title="Anatomy meets the monitor" eyebrow="07 / HYBRID UI"
  subtitle="One hero visual plus an illustrative ECG dashboard." demoWatermark/></Sequence>
 </AbsoluteFill>;
