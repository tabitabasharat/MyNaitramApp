'use client';

// THIS COMPONENT IS RESPONSIBLE FOR OPACITY FADE-IN ANIMATIONS

import { motion, useAnimation, useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

interface Props {
  children: JSX.Element;
  extraStyle?: string;
  delay?: number;
}

export const FadeReveal = ({ children, extraStyle, delay = 0 }: Props) => {
  const mainControls = useAnimation();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    } else {
      mainControls.start('hidden');
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} className={`${extraStyle}`}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 0 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{
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
