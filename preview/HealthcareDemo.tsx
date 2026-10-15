import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { HealthcareMotion } from '../templates/healthcare/HealthcareMotion';

/** Six independent 4-second previews, intended for design QA rather than public clinical advice. */
export const HealthcareDemo: React.FC = () => <AbsoluteFill>
  <Sequence from={0} durationInFrames={120}>
    <HealthcareMotion mode="clinical-dashboard" headline="98% SpO₂. Is that the whole story?"
      eyebrow="01 / CLINICAL DASHBOARD" subheadline="Oxygen saturation is not the same as oxygen delivery."
      takeaway="Oxygen delivery depends on haemoglobin and cardiac output too."
      sourceNote="Illustrative teaching example; not a real patient" demoWatermark/>
  </Sequence>
  <Sequence from={120} durationInFrames={120}>
    <HealthcareMotion mode="anatomy-overlay" anatomy="heart" headline="What is the ECG actually showing?"
      eyebrow="02 / ANATOMY + OVERLAY" subheadline="Electrical activity, not blood flow."
      takeaway="P = atrial depolarisation • QRS = ventricular depolarisation • T = ventricular repolarisation"
      demoWatermark/>
  </Sequence>
  <Sequence from={240} durationInFrames={120}>
    <HealthcareMotion mode="cellular-mechanism" mechanism="insulin-glucose"
      headline="How does insulin help cells take up glucose?"
      eyebrow="03 / CELLULAR MECHANISM" subheadline="A simplified muscle-cell mechanism."
      takeaway="Insulin signalling promotes GLUT4 movement to the cell surface." demoWatermark/>
  </Sequence>
  <Sequence from={360} durationInFrames={120}>
    <HealthcareMotion mode="comparison" headline="Air reaches the lung. Does blood?"
      eyebrow="04 / NORMAL VS ALTERED" subheadline="Ventilation and perfusion are different processes."
      takeaway="Both airflow and blood flow matter for effective gas exchange." demoWatermark/>
  </Sequence>
  <Sequence from={480} durationInFrames={120}>
    <HealthcareMotion mode="logic-flow" headline="ABGs: where do you begin?"
      eyebrow="05 / STEP-BY-STEP REASONING" subheadline="A guide to the first interpretation questions."
      takeaway="Interpret blood gases together with clinical findings and local guidance." demoWatermark/>
  </Sequence>
  <Sequence from={600} durationInFrames={120}>
    <HealthcareMotion mode="data-morph" headline="How can infection affect organs?"
      eyebrow="06 / PROGRESSION EXPLAINER" subheadline="Sepsis is life-threatening organ dysfunction from a dysregulated response to infection."
      takeaway="This diagram is a teaching pathway, not a prediction of every patient's course." demoWatermark/>
  </Sequence>
</AbsoluteFill>;
