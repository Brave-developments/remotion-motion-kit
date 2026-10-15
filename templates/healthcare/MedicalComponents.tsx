import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { healthcarePalette as p, healthcareMotion as motion, healthcareTypography as font, toneColour, HealthcareTone } from './tokens';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
export const reveal = (frame: number, fps: number, delay: number, y = 36): React.CSSProperties => {
  const progress = spring({ frame: Math.max(0, frame - delay), fps, config: motion.spring, durationInFrames: motion.enterFrames + 8 });
  return {
    opacity: interpolate(frame, [delay, delay + 12], [0, 1], clamp),
    transform: `translateY(${(1 - progress) * y}px)`,
  };
};

export const MedicalPanel: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) =>
  <div style={{ background: p.panel, border: `2px solid ${p.line}`, borderRadius: 30, boxShadow: '0 18px 54px #172E3710', ...style }}>{children}</div>;

export const MedicalBadge: React.FC<{ children: React.ReactNode; tone?: HealthcareTone }> = ({ children, tone = 'info' }) =>
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, borderRadius: 40, padding: '10px 18px',
    background: tone === 'critical' ? p.blush : tone === 'normal' ? p.mint : tone === 'caution' ? '#FBF0DE' : p.sky,
    color: toneColour(tone), fontSize: 21, fontWeight: 800, letterSpacing: .6, whiteSpace: 'nowrap' }}>
    <span style={{ width: 9, height: 9, background: toneColour(tone), borderRadius: 20 }} />{children}
  </div>;

export type ClinicalMetricData = { label: string; value: string; detail?: string; tone?: HealthcareTone };
export const ClinicalMetric: React.FC<{ metric: ClinicalMetricData; delay?: number; compact?: boolean }> = ({ metric, delay = 0, compact = false }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  return <MedicalPanel style={{ flex: 1, minWidth: 0, padding: compact ? 22 : 28, ...reveal(f, fps, delay) }}>
    <div style={{ fontSize: compact ? 19 : 23, color: p.muted, fontWeight: 700 }}>{metric.label}</div>
    <div style={{ marginTop: 13, fontFamily: font.data, color: toneColour(metric.tone), fontSize: compact ? 32 : 43, fontWeight: 800, whiteSpace: 'nowrap' }}>{metric.value}</div>
    {metric.detail && <div style={{ color: p.muted, fontSize: compact ? 17 : 20, marginTop: 9, lineHeight: 1.3 }}>{metric.detail}</div>}
  </MedicalPanel>;
};

/** Hand-authored illustrative waveform; not a patient tracing or diagnostic ECG. */
export const ECGWaveform: React.FC<{ width?: number; height?: number; stroke?: string; showLabels?: boolean }> = ({
  width = 890, height = 255, stroke = p.teal, showLabels = false,
}) => {
  const f = useCurrentFrame();
  const d = 'M 0 138 L 62 138 Q 84 138 94 116 Q 102 101 110 118 Q 120 138 146 138 L 190 138 L 207 154 L 227 44 L 247 202 L 262 138 L 322 138 Q 372 75 422 137 L 462 138 L 530 138 Q 549 138 559 116 Q 568 101 579 119 Q 590 138 615 138 L 648 138 L 665 155 L 683 46 L 704 198 L 717 138 L 768 138 Q 817 75 862 138 L 900 138';
  const progress = interpolate(f, [8, 88], [0, 1], clamp);
  return <svg viewBox="0 0 900 255" width={width} height={height} style={{ overflow: 'visible' }} aria-label="Schematic ECG waveform">
    {[60, 120, 180, 240].map(y => <line key={y} x1="0" y1={y} x2="900" y2={y} stroke={p.line} strokeWidth="2" />)}
    {Array.from({length: 15}, (_, i) => <line key={i} x1={i * 60} y1="0" x2={i * 60} y2="255" stroke={p.line} strokeWidth="1" />)}
    <path d={d} fill="none" stroke={p.line} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"/>
    <path d={d} fill="none" stroke={stroke} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength={1000}
      strokeDasharray="1000" strokeDashoffset={1000 * (1 - progress)} />
    {showLabels && <g fill={p.muted} fontSize="25" fontFamily={font.ui} fontWeight="800"><text x="92" y="72">P</text><text x="213" y="23">QRS</text><text x="382" y="66">T</text></g>}
  </svg>;
};

export const HeartDiagram: React.FC<{ size?: number; phase?: 'atria' | 'ventricles' | 'recovery' }> = ({ size = 420, phase = 'ventricles' }) => {
  const f = useCurrentFrame();
  const active = phase === 'atria' ? p.teal : phase === 'ventricles' ? p.critical : p.blue;
  const pulse = 1 + .014 * Math.sin(f / 8);
  return <svg viewBox="0 0 440 460" width={size} height={size * 1.045} role="img" aria-label="Stylised, non-diagnostic heart conduction illustration"
    style={{ transform: `scale(${pulse})` }}>
    <circle cx="220" cy="230" r="205" fill={p.sky} />
    <path d="M 216 387 C 175 354 86 279 83 201 C 80 133 151 89 211 143 C 269 82 350 133 347 205 C 344 281 263 359 216 387 Z"
      fill="#F6B7AE" stroke={p.critical} strokeWidth="9" strokeLinejoin="round" />
    <path d="M 209 148 C 208 206 200 274 216 376" stroke="#FFFDF8" strokeWidth="14" fill="none" opacity=".9" />
    <path d="M 115 223 C 165 228 193 215 209 190 M 211 190 C 247 225 286 230 323 221" fill="none" stroke="#FFFDF8" strokeWidth="9" opacity=".7" />
    <path d="M 152 141 Q 199 175 208 212 L 222 292 Q 254 260 298 240" fill="none" stroke={active} strokeWidth="9" strokeDasharray="16 13"
      strokeLinecap="round" />
    <circle cx="152" cy="141" r="17" fill={p.teal} stroke={p.paper} strokeWidth="6" />
    <circle cx="208" cy="212" r="17" fill={p.blue} stroke={p.paper} strokeWidth="6" />
    <text x="38" y="100" fontFamily={font.ui} fontSize="26" fontWeight="800" fill={p.muted}>SA</text>
    <path d="M 89 106 L 140 140" stroke={p.muted} strokeWidth="3"/>
    <text x="324" y="305" fontFamily={font.ui} fontSize="24" fontWeight="800" fill={p.muted}>AV</text>
    <path d="M 314 296 L 218 219" stroke={p.muted} strokeWidth="3"/>
    <text x="220" y="437" textAnchor="middle" fontFamily={font.ui} fontSize="20" fill={p.muted}>SCHEMATIC • NOT TO SCALE</text>
  </svg>;
};

export const AlveolusDiagram: React.FC<{ size?: number; reducedFlow?: boolean }> = ({ size = 320, reducedFlow = false }) => {
  const f = useCurrentFrame();
  const x = 42 + ((f * (reducedFlow ? .45 : 2.1)) % 208);
  return <svg viewBox="0 0 320 320" width={size} height={size} role="img" aria-label="Schematic alveolus and blood vessel">
    <circle cx="157" cy="120" r="86" fill={p.sky} stroke={p.blue} strokeWidth="8"/>
    <path d="M 156 0 L 156 45" stroke={p.blue} strokeWidth="25" strokeLinecap="round" />
    {[[128,90],[177,110],[146,156]].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r={12} fill={p.teal} opacity={.6 + .1*i}/>)}
    <path d="M 18 247 C 86 196 225 304 302 238" fill="none" stroke={p.critical} strokeWidth="36" strokeLinecap="round"/>
    <path d="M 18 247 C 86 196 225 304 302 238" fill="none" stroke="#FFFDF8" strokeWidth="5" strokeDasharray="12 18" opacity=".8"/>
    <circle cx={x} cy={242 + 15 * Math.sin((x-42)/45)} r="16" fill={p.critical} opacity={reducedFlow?.35:1}/>
    <text x="160" y="303" textAnchor="middle" fontFamily={font.ui} fontSize="20" fill={p.muted}>ILLUSTRATIVE GAS EXCHANGE</text>
  </svg>;
};

/** Conceptual receptor + membrane motion, not a molecular-scale simulation. */
export const CellMembraneDiagram: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const f = useCurrentFrame();
  const progress = interpolate(f, [28, 95], [0, 1], clamp);
  return <svg viewBox="0 0 900 470" width="100%" height={compact ? 270 : 430} role="img" aria-label="Schematic insulin receptor and glucose uptake into a muscle cell">
    <rect x="453" y="24" width="423" height="414" rx="32" fill={p.mint}/>
    <rect x="431" y="24" width="48" height="414" rx="20" fill={p.teal} opacity=".8" />
    {Array.from({length: 11},(_,i)=><g key={i}><circle cx="443" cy={42+i*37} r="12" fill={p.cyan}/><circle cx="467" cy={42+i*37} r="12" fill={p.cyan}/></g>)}
    <path d="M 428 176 L 406 165 L 397 120 L 417 110 L 442 161 L 463 110 L 483 120 L 476 165 L 456 176" fill={p.blue} stroke={p.paper} strokeWidth="7" />
    <rect x="423" y="278" width="65" height="110" rx="20" fill={p.blue} stroke={p.paper} strokeWidth="7"/>
    <rect x="444" y="290" width="22" height="90" rx="10" fill={p.paper}/>
    <g transform={`translate(${interpolate(f,[0,35],[228,405],clamp)},${interpolate(f,[0,35],[110,115],clamp)})`}><circle r="24" fill={p.teal}/><text y="8" textAnchor="middle" fill={p.paper} fontSize="23" fontWeight="800">I</text></g>
    {[0,1,2].map((i)=><g key={i} transform={`translate(${interpolate(progress,[0,1],[238-i*36,580+i*52])},${315+i*25})`}>
      <circle r="17" fill={p.caution} /><text y="7" textAnchor="middle" fill={p.paper} fontSize="19" fontWeight="800">G</text>
    </g>)}
    <g fill={p.muted} fontFamily={font.ui} fontSize="24" fontWeight="800"><text x="35" y="49">BLOOD / OUTSIDE</text><text x="620" y="49">MUSCLE CELL</text>
    <text x="122" y="395">Glucose</text><text x="523" y="400">Uptake</text></g>
    <path d="M 312 360 L 403 348" stroke={p.caution} strokeWidth="4" strokeDasharray="10 10"/>
  </svg>;
};
