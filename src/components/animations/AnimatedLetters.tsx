'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

const AnimatedLetters = ({
  title,
  extraStyles,
  duration = 0.5,
}: {
  title: string;
  extraStyles?: string;
  duration?: number;
}) => {
  const letterAni = {
    initial: { y: 100 },
    animate: {
      y: 0,
      transition: {
        ease: [0.6, 0.01, -0.05, 0.95],
        duration,
      },
    },
  };

  const banner = {
    animate: {
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  // Split the title into words to preserve spacing
  const words = title.split(' ');

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start('animate');
    } else {
      controls.start('initial');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className={cn('relative flex flex-wrap overflow-hidden', extraStyles)}
      variants={banner}
      initial="initial"
      animate={controls}
    >
      {words.map((word, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <motion.span
          key={index}
          className="relative whitespace-nowrap overflow-hidden"
        >
          {
            // @ts-ignore
            [...word].map((letter, letterIndex) => (
              <motion.span
                // eslint-disable-next-line react/no-array-index-key
                key={letterIndex}
                className="relative inline-block"
                variants={letterAni}
              >
                {letter}
              </motion.span>
            ))
          }
          {/* Add a space after each word except the last one */}
          {index < words.length - 1 && (
            <motion.span className="inline-block">&nbsp;</motion.span>
          )}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedLetters;
