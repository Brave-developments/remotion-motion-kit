import React from 'react';
import { Composition } from 'remotion';
import { MotionKitDemo } from '../preview/MotionKitDemo';
import { EditorialMotionDemo } from '../preview/EditorialMotionDemo';
import { HealthcareDemo } from '../preview/HealthcareDemo';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="MotionKitDemo"
      component={MotionKitDemo}
      durationInFrames={240}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="EditorialMotionDemo"
      component={EditorialMotionDemo}
      durationInFrames={360}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="HealthcareDemo"
      component={HealthcareDemo}
      durationInFrames={720}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);
