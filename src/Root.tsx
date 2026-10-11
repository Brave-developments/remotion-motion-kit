import React from 'react';
import { Composition } from 'remotion';
import { MotionKitDemo } from '../preview/MotionKitDemo';
import { EditorialMotionDemo } from '../preview/EditorialMotionDemo';

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
  </>
);
