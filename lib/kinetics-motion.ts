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

/**
 * Press recipe for buttons, links and icon buttons: spread onto a motion element.
 * `data-motion` opts the element out of the global CSS :active scale so the
 * press is never applied twice.
 */
export const kineticsPress = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.94 },
  transition: kineticsSpring,
  "data-motion": true,
} as const;
