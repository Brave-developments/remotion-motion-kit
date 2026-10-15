import { healthcarePalette } from '../healthcare/tokens';
export const p = healthcarePalette;
export const volume = {
  shadow: '#17445427',
  shade: '#17445455',
  light: '#FFFFFF',
  vesselBlue: '#3E90C8',
  vesselRed: '#CF5A66',
  tissue: '#E98584',
  tissueLight: '#FFCFBE',
  kidney: '#D56D78',
} as const;
export type Healthcare3DMode = 'heart-hero'|'lungs-gas-exchange'|'kidney-perfusion'|'circulation-flow'|'micro-mechanism'|'comparison-3d'|'dashboard-hybrid';
export type Healthcare3DLayout = 'full'|'upper';
export type MicroMode = 'insulin'|'ions'|'osmosis'|'medication';
