import React from 'react';
import { useCurrentFrame } from 'remotion';
import { p, volume } from '../tokens';
import { OrbitingDots } from './Primitives';
export type HeartHero3DProps = { size?:number; showConduction?:boolean; showFlow?:boolean; phase?:'atria'|'ventricles'|'recovery' };
/** Original vector pseudo-3D: not a textured mesh or anatomically accurate 3D model. */
export const HeartHero3D:React.FC<HeartHero3DProps>=({size=640,showConduction=true,showFlow=true,phase='ventricles'})=>{
 const f=useCurrentFrame();
 const beat=1+.016*Math.sin(f*.19)**8;
 const orbit=Math.sin(f*.018)*4;
 const conductor=phase==='atria'?p.teal:phase==='ventricles'?volume.vesselRed:p.blue;
 return <svg viewBox="0 0 640 660" width={size} height={size*1.03} role="img" aria-label="Depth-styled schematic heart with vessels and electrical pathway">
  <defs>
   <radialGradient id="h3dTissue" cx="24%" cy="21%" r="85%"><stop stopColor="#FFD8CA"/><stop offset=".45" stopColor="#F2A3A0"/><stop offset="1" stopColor="#A84056"/></radialGradient>
   <linearGradient id="h3dBlue" x1="0" x2="1"><stop stopColor="#256DAB"/><stop offset=".48" stopColor="#8AD6E7"/><stop offset="1" stopColor="#26669A"/></linearGradient>
   <linearGradient id="h3dRed" x1="0" x2="1"><stop stopColor="#9D3149"/><stop offset=".52" stopColor="#F49BA0"/><stop offset="1" stopColor="#AF334D"/></linearGradient>
   <filter id="h3dShadow"><feDropShadow dx="6" dy="23" stdDeviation="17" floodColor="#273E52" floodOpacity=".24"/></filter>
  </defs>
  <ellipse cx="326" cy="572" rx="192" ry="34" fill={p.text} opacity=".07"/>
  <g style={{transformOrigin:'320px 335px',transform:`translateX(${orbit}px) scale(${beat})`}} filter="url(#h3dShadow)">
   <path d="M250 208 C192 178 154 226 166 295 C184 389 258 473 317 530 C372 474 463 392 465 297 C468 224 417 182 370 219 C327 178 286 177 250 208Z" fill="url(#h3dTissue)" stroke="#A74D60" strokeWidth="8"/>
   <path d="M268 241 C230 239 202 268 210 307 C221 352 262 406 299 449" fill="none" stroke="#FFE5D5" strokeWidth="14" opacity=".65" strokeLinecap="round"/>
   <path d="M333 225 C361 287 365 381 318 510" fill="none" stroke="#8F3553" strokeWidth="14" opacity=".5"/>
   <path d="M351 216 C399 243 415 302 400 356" fill="none" stroke="#FFF0D8" strokeWidth="12" opacity=".53" strokeLinecap="round"/>
   <path d="M257 223 C243 180 231 149 238 91 C242 57 294 50 300 100 L306 241" stroke="#1C629F" strokeWidth="61" strokeLinecap="round" fill="none"/>
   <path d="M257 223 C243 180 231 149 238 91 C242 57 294 50 300 100 L306 241" stroke="url(#h3dBlue)" strokeWidth="48" strokeLinecap="round" fill="none"/>
   <path d="M359 222 L369 106 C370 61 413 55 438 78 C455 95 452 145 429 158" fill="none" stroke="#913147" strokeWidth="69" strokeLinecap="round"/>
   <path d="M359 222 L369 106 C370 61 413 55 438 78 C455 95 452 145 429 158" fill="none" stroke="url(#h3dRed)" strokeWidth="55" strokeLinecap="round"/>
   <path d="M382 229 C399 176 465 184 489 212" stroke="#276BA4" strokeWidth="42" strokeLinecap="round" fill="none"/>
   <path d="M382 229 C399 176 465 184 489 212" stroke="url(#h3dBlue)" strokeWidth="31" strokeLinecap="round" fill="none"/>
   <path d="M260 312 C225 293 205 289 180 319 M371 367 C414 348 434 349 460 366" stroke="#AA4255" strokeWidth="15" fill="none" strokeLinecap="round"/>
   <path d="M265 252 Q324 285 346 359 Q357 399 342 464" stroke="#FFE2D5" strokeWidth="8" fill="none" opacity=".75"/>
   {showConduction && <>
    <path d="M220 249 Q278 250 305 300 Q334 351 317 450 M307 301 Q363 315 385 372"
      fill="none" stroke={conductor} strokeWidth="12" strokeLinecap="round" strokeDasharray="15 18"
      strokeDashoffset={-f*3}/>
    <circle cx="220" cy="249" r="19" fill={p.teal} stroke={p.paper} strokeWidth="7"/>
    <circle cx="306" cy="301" r="16" fill={p.blue} stroke={p.paper} strokeWidth="6"/>
   </>}
  </g>
  {showFlow&&<OrbitingDots cx={320} cy={328} radius={245} count={9} color={p.teal}/>}
  <g fontFamily="Arial, sans-serif" fontWeight="800" fontSize="21" fill={p.muted}>
   <text x="94" y="125">VENOUS</text><path d="M175 121 L238 107" stroke={p.muted} strokeWidth="2"/>
   <text x="457" y="60">AORTIC</text><path d="M447 67 L421 101" stroke={p.muted} strokeWidth="2"/>
  </g>
 </svg>;
};
