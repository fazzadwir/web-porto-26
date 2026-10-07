/**
 * Motion recipes adapted from Kinetics (kinetics.colorion.co).
 * Kinetics is a copy-paste pattern library rather than an npm runtime, so
 * these values keep its spring language consistent across Framer Motion UI.
 */
export const kineticsSpring = {
  type: "spring" as const,
  stiffness: 320,
  damping: 24,
  mass: 1,
};

export const kineticsOvershoot = {
  type: "spring" as const,
  stiffness: 280,
  damping: 18,
  mass: 1,
};

export const kineticsGlide = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1] as const,
};
