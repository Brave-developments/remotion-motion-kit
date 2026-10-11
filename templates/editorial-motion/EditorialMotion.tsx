import React from 'react';
import { AbsoluteFill, Easing, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { editorialMotion, editorialPalette as p, editorialTypography as fonts } from './palette';

export type EditorialMotionMode = 'illustrated-explainer' | 'saas-ui' | 'product-comparison';
export type EditorialMotionLayout = 'full' | 'upper';
export type EditorialProduct = {
  name: string;
  label?: string;
  logoSrc?: string;
  accent?: string;
  background?: string;
};

export type EditorialMotionProps = {
  /** Select deliberately. This template is not the global default. */
  mode: EditorialMotionMode;
  headline: string;
  emphasis?: string;
  subheadline?: string;
  caption?: string;
  layout?: EditorialMotionLayout;
  products?: EditorialProduct[];
  notificationTitle?: string;
  notificationDetail?: string;
  dashboardLabel?: string;
  dashboardStatus?: string;
  /** Clearly marks invented placeholder UI and numbers in the demo. */
  demoWatermark?: boolean;
};

const defaultProducts: EditorialProduct[] = [
  { name: 'Agent One', label: 'ILLUSTRATIVE', accent: p.red, background: p.darkCard },
  { name: 'Agent Two', label: 'ILLUSTRATIVE', accent: '#E8D7FF', background: '#242024' },
  { name: 'Agent Three', label: 'ILLUSTRATIVE', accent: '#3A71D5', background: '#F2F1FC' },
];

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const useEntrance = (delay: number, distance = 56) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: editorialMotion.spring,
    durationInFrames: editorialMotion.enterFrames + 9,
  });
  return {
    opacity: interpolate(frame, [delay, delay + 12], [0, 1], clamp),
    transform: `translateY(${(1 - progress) * distance}px) scale(${0.96 + progress * 0.04})`,
  } as React.CSSProperties;
};

const EmphasizedHeadline: React.FC<{ text: string; emphasis?: string; size?: number }> = ({ text, emphasis, size = 86 }) => {
  const start = emphasis ? text.toLowerCase().indexOf(emphasis.toLowerCase()) : -1;
  return (
    <div style={{
      fontFamily: fonts.editorial, fontSize: size, lineHeight: 1.08,
      letterSpacing: -2.7, color: p.ink, textAlign: 'center',
    }}>
      {start < 0 || !emphasis ? text : (
        <>
          {text.slice(0, start)}
          <span style={{ background: p.yellow, boxShadow: `7px 0 ${p.yellow}, -3px 0 ${p.yellow}` }}>
            {text.slice(start, start + emphasis.length)}
          </span>
          {text.slice(start + emphasis.length)}
        </>
      )}
    </div>
  );
};

/** Original, deliberately simple 8-bit mascot. Replace with licensed artwork if desired. */
const PixelMascot: React.FC = () => (
  <svg viewBox="0 0 128 194" width="266" height="405" shapeRendering="crispEdges" aria-label="Illustrative pixel mascot">
    <rect x="40" y="11" width="50" height="13" fill="#251914" />
    <rect x="30" y="24" width="70" height="20" fill="#251914" />
    <rect x="36" y="42" width="57" height="39" fill="#DE955B" />
    <rect x="30" y="45" width="9" height="23" fill="#251914" />
    <rect x="51" y="52" width="6" height="5" fill="#241C1C" />
    <rect x="76" y="52" width="6" height="5" fill="#241C1C" />
    <rect x="60" y="70" width="13" height="4" fill="#633826" />
    <rect x="42" y="82" width="48" height="53" fill="#29252D" />
    <rect x="28" y="89" width="14" height="45" fill="#29252D" />
    <rect x="90" y="89" width="14" height="45" fill="#29252D" />
    <rect x="28" y="134" width="14" height="22" fill="#DE955B" />
    <rect x="90" y="134" width="14" height="22" fill="#DE955B" />
    <rect x="45" y="135" width="20" height="42" fill="#315AA7" />
    <rect x="68" y="135" width="20" height="42" fill="#315AA7" />
    <rect x="39" y="176" width="28" height="12" fill="#E1DFDF" />
    <rect x="68" y="176" width="28" height="12" fill="#E1DFDF" />
    <rect x="93" y="119" width="14" height="7" fill="#9CA1AE" />
  </svg>
);

const IllustratedExplainer: React.FC<EditorialMotionProps & { height: number }> = (props) => {
  const logoStyle: React.CSSProperties = {
    width: 88, height: 88, display: 'grid', placeItems: 'center',
    borderRadius: 22, color: p.paper, fontSize: 42, fontWeight: 800,
    boxShadow: '0 10px 18px #0002',
  };
  const products = (props.products?.length ? props.products : defaultProducts).slice(0, 3);
  return <>
    <div style={{ position: 'absolute', top: 100, left: 52, right: 52, ...useEntrance(0) }}>
      <EmphasizedHeadline text={props.headline} emphasis={props.emphasis} size={77} />
      <div style={{ marginTop: 22, textAlign: 'center', color: p.muted, fontSize: 33, fontWeight: 700 }}>{props.subheadline}</div>
    </div>
    <div style={{ position: 'absolute', top: props.height * 0.36, left: 62, display: 'flex', gap: 38 }}>
      {products.map((item, index) => <div key={item.name + index} style={{ ...logoStyle, background: item.accent || p.ink, ...useEntrance(14 + index * editorialMotion.staggerFrames) }}>
        {item.logoSrc ? <Img src={item.logoSrc} style={{ width: '78%', height: '78%', objectFit: 'contain' }} /> : item.name.slice(0, 1)}
      </div>)}
    </div>
    <div style={{ position: 'absolute', left: 48, top: props.height * 0.52, width: 628, border: `4px solid ${p.outline}`, boxShadow: `10px 10px 0 ${p.outline}`, padding: 30, background: p.paper, ...useEntrance(36) }}>
      <div style={{ color: p.muted, fontSize: 24, letterSpacing: 3, fontWeight: 800 }}>NOTIFICATION · DEMO</div>
      <div style={{ fontSize: 40, fontWeight: 800, marginTop: 10 }}>{props.notificationTitle || 'Review requested'}</div>
      <div style={{ fontSize: 28, fontWeight: 600, color: p.muted, marginTop: 8 }}>{props.notificationDetail || 'Your project needs attention'}</div>
    </div>
    <div style={{ position: 'absolute', right: 36, bottom: props.layout === 'upper' ? 2 : 330, ...useEntrance(45) }}>
      <PixelMascot />
    </div>
  </>;
};

const SaaSUI: React.FC<EditorialMotionProps & { height: number }> = (props) => {
  const frame = useCurrentFrame();
  const amount = interpolate(frame, [46, 95], [0, 12.4], { ...clamp, easing: Easing.out(Easing.cubic) });
  const card: React.CSSProperties = { background: '#FFFFFFE8', border: '2px solid #EBECE8', borderRadius: 30, boxShadow: '0 8px 40px #3333330A', padding: 34 };
  return <>
    <div style={{ position: 'absolute', left: 60, right: 60, top: 150, ...card, ...useEntrance(5) }}>
      <div style={{ fontSize: 26, color: p.muted, letterSpacing: 3, fontWeight: 800 }}>AI AGENT · ILLUSTRATIVE</div>
      <div style={{ marginTop: 22, fontSize: 37 }}>The workflow is ready for review.</div>
      <div style={{ marginTop: 26, padding: 18, background: '#F1F3F0', borderRadius: 12, fontFamily: 'monospace', fontSize: 25 }}>
        <span style={{ color: p.green, fontWeight: 700 }}>agent_status</span> draft_01, AWAITING_APPROVAL
      </div>
    </div>
    <div style={{ position: 'absolute', left: 60, right: 60, top: 480, ...card, ...useEntrance(26) }}>
      <div style={{ fontSize: 26, color: p.muted, letterSpacing: 3, fontWeight: 800 }}>AUTOMATION DASHBOARD · DEMO</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
        <span style={{ fontSize: 39, fontWeight: 800 }}>{props.dashboardLabel || 'Example campaign'}</span>
        <div style={{ width: 86, height: 48, borderRadius: 30, background: '#D8DBD6', padding: 6 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: p.paper }} />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 34 }}>
        <span style={{ fontSize: 27, color: p.muted }}>Example spend</span>
        <span style={{ fontSize: 60, fontWeight: 800, color: '#4C564D' }}>${amount.toFixed(2)}</span>
      </div>
      <div style={{ display: 'inline-flex', marginTop: 16, background: '#141A17', color: p.paper, borderRadius: 40, padding: '14px 24px', fontSize: 25 }}>
        🔒 {props.dashboardStatus || 'Paused until approved'}
      </div>
    </div>
    <div style={{ position: 'absolute', left: 70, right: 70, top: Math.max(870, props.height - 380), ...useEntrance(63) }}>
      <div style={{ textAlign: 'center', fontFamily: fonts.interface, fontWeight: 900, fontSize: 99, letterSpacing: -6, lineHeight: 1.0, color: p.ink }}>
        {props.headline}
      </div>
      {props.subheadline ? <div style={{ textAlign: 'center', marginTop: 18, color: p.muted, fontSize: 30 }}>{props.subheadline}</div> : null}
    </div>
  </>;
};

const ProductComparison: React.FC<EditorialMotionProps & { height: number }> = (props) => {
  const products = (props.products?.length ? props.products : defaultProducts).slice(0, 3);
  return <>
    <div style={{ position: 'absolute', left: 45, right: 45, top: 115, ...useEntrance(0) }}>
      <EmphasizedHeadline text={props.headline} emphasis={props.emphasis} size={92} />
      {props.subheadline ? <div style={{ fontSize: 29, textAlign: 'center', color: p.muted, marginTop: 16 }}>{props.subheadline}</div> : null}
    </div>
    <div style={{ position: 'absolute', left: 48, right: 48, top: 330, display: 'flex', gap: 15, justifyContent: 'center' }}>
      {products.map((item, index) => {
        const isLight = (item.background || '').toUpperCase() === '#F2F1FC' || (index === 2 && !props.products?.length);
        const foreground = isLight ? p.ink : p.paper;
        return <div key={item.name + index} style={{
          flex: 1, minWidth: 0, height: props.layout === 'upper' ? 510 : 640,
          borderRadius: 29, textAlign: 'center', padding: '60px 10px 35px',
          background: item.background || (index === 2 ? '#F2F1FC' : p.darkCard),
          color: foreground, boxShadow: '0 20px 32px #00000021',
          ...useEntrance(12 + index * 13, 100),
        }}>
          <div style={{ height: 180, display: 'grid', placeItems: 'center' }}>
            {item.logoSrc ? <Img src={item.logoSrc} style={{ width: 125, height: 125, objectFit: 'contain' }} /> :
              <div style={{ background: item.accent || p.yellow, color: p.ink, borderRadius: 30, width: 118, height: 118, display: 'grid', placeItems: 'center', fontSize: 65, fontWeight: 800 }}>
                {item.name.slice(0, 1)}
              </div>}
          </div>
          <div style={{ fontFamily: fonts.editorial, fontSize: 47, marginTop: 45, overflowWrap: 'anywhere', lineHeight: 1.05 }}>{item.name}</div>
          <div style={{ fontSize: 20, letterSpacing: 3, marginTop: 22, opacity: .75 }}>{item.label || 'PRODUCT'}</div>
        </div>;
      })}
    </div>
    <div style={{ position: 'absolute', top: props.height - 220, left: 35, right: 35, textAlign: 'center', fontSize: 40, color: p.red, fontWeight: 800, ...useEntrance(67) }}>{props.caption}</div>
  </>;
};

export const EditorialMotion: React.FC<EditorialMotionProps> = (props) => {
  const layout = props.layout || 'full';
  const height = layout === 'upper' ? editorialMotion.upperRegionHeight : 1920;
  return <AbsoluteFill style={{ background: layout === 'upper' ? 'transparent' : p.ivory, color: p.ink, fontFamily: fonts.interface }}>
    <div style={{ position: 'absolute', width: 1080, height, top: 0, left: 0, overflow: 'hidden',
      background: props.mode === 'saas-ui'
        ? 'radial-gradient(ellipse at 90% 5%, #FBE7D6, transparent 40%), radial-gradient(ellipse at 12% 95%, #DDF4EA, transparent 42%), #FAFAF6'
        : p.ivory,
    }}>
      {props.mode === 'illustrated-explainer' ? <IllustratedExplainer {...props} height={height} layout={layout} /> : null}
      {props.mode === 'saas-ui' ? <SaaSUI {...props} height={height} layout={layout} /> : null}
      {props.mode === 'product-comparison' ? <ProductComparison {...props} height={height} layout={layout} /> : null}
      {props.demoWatermark ? <div style={{ position: 'absolute', left: 30, bottom: 16, color: '#585858', fontSize: 19 }}>ILLUSTRATIVE DEMO — NOT REAL PRODUCT DATA</div> : null}
    </div>
  </AbsoluteFill>;
};
