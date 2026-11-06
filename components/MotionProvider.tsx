"use client";

import { LazyMotion } from "framer-motion";

// Animation features (~30 KB gzip) are fetched after hydration instead of shipping in every
// page's initial bundle. Components use the lightweight `m.*` instead of `motion.*`;
// `strict` throws if a full `motion` component sneaks back in.
const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
