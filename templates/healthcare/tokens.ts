/** Healthcare is an opt-in visual language, independent of Editorial Motion. */
export const healthcarePalette = {
  canvas: '#F5F3EC',
  paper: '#FFFDF8',
  panel: '#FFFFFF',
  text: '#172E37',
  muted: '#5D7480',
  line: '#D7E3E3',
  teal: '#0C988D',
  blue: '#3279BE',
  cyan: '#BFEAF1',
  normal: '#238466',
  caution: '#BB772B',
  critical: '#C94E54',
  mint: '#E3F4EE',
  sky: '#E8F3FC',
  blush: '#FBE9E8',
} as const;

export const healthcareTypography = {
  ui: "Inter, 'Arial', 'Helvetica Neue', sans-serif",
  data: "'IBM Plex Mono', 'SFMono-Regular', Consolas, monospace",
} as const;

export const healthcareMotion = {
  fps: 30,
  enterFrames: 18,
  staggerFrames: 9,
  upperRegionHeight: 1160,
  spring: { damping: 24, stiffness: 140, mass: 1 },
} as const;

export type HealthcareTone = 'normal' | 'caution' | 'critical' | 'info';
export const toneColour = (tone: HealthcareTone = 'info'): string =>
  tone === 'critical' ? healthcarePalette.critical :
  tone === 'caution' ? healthcarePalette.caution :
  tone === 'normal' ? healthcarePalette.normal : healthcarePalette.blue;
