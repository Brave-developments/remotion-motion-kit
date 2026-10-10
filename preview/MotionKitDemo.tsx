import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { AnimatedGrid, NewsEvidenceCard, BrowserReveal, MetricReveal } from '../components';
export const MotionKitDemo: React.FC = () => <AbsoluteFill style={{ fontFamily: 'Arial, sans-serif' }}>
  <AnimatedGrid />
  <Sequence from={0} durationInFrames={60} layout="none"><NewsEvidenceCard headline="The future of AI reporting" publisher="ILLUSTRATIVE DEMO" quote="Use a real cited article in production." /></Sequence>
  <Sequence from={60} durationInFrames={60} layout="none"><BrowserReveal title="Real screen capture goes here" address="example.com — demo" /></Sequence>
  <Sequence from={120} durationInFrames={120} layout="none"><MetricReveal label="Example value, not a real statistic" value={78} source="Illustrative demo only" /></Sequence>
</AbsoluteFill>;
