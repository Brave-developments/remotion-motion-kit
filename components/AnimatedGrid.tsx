import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
export const AnimatedGrid: React.FC<{ cell?: number }> = ({cell=70}) => {
  const frame=useCurrentFrame(); const {fps}=useVideoConfig(); const offset=frame/fps*8%cell;
  return <AbsoluteFill style={{ backgroundColor:'#081421',backgroundImage:'radial-gradient(ellipse at 50% 30%, #155c7c88, transparent 60%),linear-gradient(#2b617244 1px,transparent 1px),linear-gradient(90deg,#2b617244 1px,transparent 1px)',backgroundSize:'100% 100%,'+cell+'px '+cell+'px,'+cell+'px '+cell+'px',backgroundPosition:'center center,0 '+offset+'px,0 '+offset+'px' }}/>;
};
