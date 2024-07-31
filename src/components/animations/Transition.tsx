'use client';

import { AnimatePresence, motion } from 'framer-motion';

export default function Transition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
          pointerEvents: 'none',
        }}
        animate={{
          opacity: 1,
          pointerEvents: 'all',
        }}
        exit={{
          opacity: 0,
          pointerEvents: 'none',
        }}
        transition={{ ease: 'circInOut', duration: 1, staggerChildren: 0.1 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
