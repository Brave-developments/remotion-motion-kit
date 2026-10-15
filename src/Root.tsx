import React from 'react';
import { Composition } from 'remotion';
import { MotionKitDemo } from '../preview/MotionKitDemo';
import { EditorialMotionDemo } from '../preview/EditorialMotionDemo';
import { HealthcareDemo } from '../preview/HealthcareDemo';
import { Healthcare3DDemo } from '../preview/Healthcare3DDemo';
import { HealthcarePremiumDemo } from '../preview/HealthcarePremiumDemo';

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
    <Composition
      id="Healthcare3DDemo"
      component={Healthcare3DDemo}
      durationInFrames={525}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="HealthcarePremiumDemo"
      component={HealthcarePremiumDemo}
      durationInFrames={225}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);
