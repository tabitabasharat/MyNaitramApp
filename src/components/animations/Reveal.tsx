'use client';

// THIS COMPONENT IS RESPONSIBLE FOR FADE-IN ON THE Y-AXIS ANIMATIONS FROM BOTTOM

import { motion, useAnimation, useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

interface Props {
  children: JSX.Element;
  width?: 'fit-content' | '100%';
  y: number;
  z?: 'z-0' | string;
  extraStyle?: string;
  overflow?: '' | 'hidden';
  delay?: number;
  position?: 'relative' | 'absolute' | 'sticky' | 'fixed' | 'static';
}

export const Reveal = ({
  children,
  width = 'fit-content',
  y,
  z,
  extraStyle,
  overflow = 'hidden',
  delay = 0,
  position = 'relative',
}: Props) => {
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      slideControls.start('visible');
      mainControls.start('visible');
    } else {
      slideControls.start('hidden');
      mainControls.start('hidden');
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <div
      className={`${z} ${extraStyle}`}
      ref={ref}
      style={{
        position,
        width,
        overflow,
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{
          type: 'tween',
          duration: 1,
          delay,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
