export const menuSlide = {
  initial: { x: '120%' },
  enter: {
    x: '0',
    opacity: 1,
    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    x: '120%',
    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
  },
};

export const slide = {
  initial: { x: 80 },
  enter: (i: number) => ({
    x: 0,
    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
  exit: (i: number) => ({
    x: 80,
    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
};
