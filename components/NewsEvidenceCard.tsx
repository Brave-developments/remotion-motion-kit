import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
export type NewsEvidenceCardProps = { headline: string; publisher: string; quote?: string; source?: string; accent?: string };
export const NewsEvidenceCard: React.FC<NewsEvidenceCardProps> = ({ headline, publisher, quote, source, accent = '#60daf2' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = interpolate(frame, [0, fps * .5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  return <AbsoluteFill style={{ justifyContent: 'center', padding: 55 }}>
    <div style={{ color: '#ecf7ff', background: '#12243a', padding: 44, border: '2px solid #33556a', borderRadius: 32, boxShadow: '0 30px 80px #0008', opacity: p, transform: 'translateY(' + (70 * (1 - p)) + 'px)' }}>
      <div style={{ color: accent, fontSize: 27, fontWeight: 800, letterSpacing: 2 }}>SOURCE · {publisher}</div>
      <div style={{ fontSize: 60, fontWeight: 900, marginTop: 35, letterSpacing: -2, lineHeight: 1.13 }}>{headline}</div>
      {quote ? <div style={{ fontSize: 33, lineHeight: 1.32, background: '#24384d', borderLeft: '8px solid ' + accent, padding: 25, marginTop: 30 }}>{quote}</div> : null}
      {source ? <div style={{ fontSize: 22, color: '#9ebccf', marginTop: 30, overflowWrap: 'anywhere' }}>Source: {source}</div> : null}
    </div>
  </AbsoluteFill>;
};
