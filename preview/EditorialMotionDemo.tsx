import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { EditorialMotion } from '../templates/editorial-motion/EditorialMotion';

/** One opt-in template, three stylistic scene modes. Generic data is visibly labeled as demo. */
export const EditorialMotionDemo: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={0} durationInFrames={120}>
      <EditorialMotion
        mode="illustrated-explainer"
        headline="What happens when your app grows?"
        emphasis="app"
        subheadline="A simple illustrated explanation"
        notificationTitle="Privacy review required"
        notificationDetail="Example notification · not a real claim"
        demoWatermark
      />
    </Sequence>
    <Sequence from={120} durationInFrames={120}>
      <EditorialMotion mode="saas-ui" headline="Only with approval." subheadline="An illustrative product workflow" demoWatermark />
    </Sequence>
    <Sequence from={240} durationInFrames={120}>
      <EditorialMotion
        mode="product-comparison"
        headline="Which tool fits?"
        subheadline="Compare verified product details"
        products={[
          { name: 'Tool A', label: 'ILLUSTRATIVE', accent: '#C8453C', background: '#181421' },
          { name: 'Tool B', label: 'ILLUSTRATIVE', accent: '#D8C7FA', background: '#252126' },
          { name: 'Tool C', label: 'ILLUSTRATIVE', accent: '#4879D2', background: '#F2F1FC' },
        ]}
        caption="Replace with an evidence-backed comparison"
        demoWatermark
      />
    </Sequence>
  </AbsoluteFill>
);
