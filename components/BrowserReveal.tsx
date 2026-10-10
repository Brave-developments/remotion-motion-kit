import React from 'react';
import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
export type BrowserRevealProps = { title: string; address: string; imageSrc?: string };
export const BrowserReveal: React.FC<BrowserRevealProps> = ({ title, address, imageSrc }) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, fps * .5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const zoom = interpolate(frame, [0, fps * 3], [1, 1.06], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <AbsoluteFill style={{ padding: 50, justifyContent: 'center' }}>
    <div style={{ opacity, background: '#102338', border: '2px solid #38536b', height: 1070, overflow: 'hidden', borderRadius: 34, transform: 'translateY(' + (1 - opacity) * 60 + 'px)' }}>
      <div style={{ background: '#25374c', height: 100, padding: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        {['#ff6767','#f8ca5b','#59d57b'].map(c => <span key={c} style={{ height: 19, width: 19, borderRadius: '50%', background: c }} />)}
        <div style={{ background: '#14273a', color: '#afc8d8', padding: '12px 20px', marginLeft: 20, borderRadius: 10, fontSize: 24, flex: 1 }}>{address}</div>
      </div>
      <div style={{ height: 970, position: 'relative', overflow: 'hidden' }}>
        {imageSrc ? <Img src={imageSrc} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', transform: 'scale(' + zoom + ')' }} /> :
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', color: '#fff', padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 58, fontWeight: 900 }}>{title}</div><div style={{ fontSize: 27, marginTop: 26, color: '#adc4d4' }}>Demo only: provide a real captured website image</div>
        </AbsoluteFill>}
      </div>
    </div>
  </AbsoluteFill>;
};
