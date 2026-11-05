"use client";

import type React from "react";
import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";

export type CollageItem = {
  src: string;
  w: number;
  h: number;
  /** left / top / width as % of the 2880×770 cover frame, measured from the Figma export. */
  className: string;
  /** Entrance direction: items slide in from above or below. */
  from?: "top" | "bottom";
};

interface CoverCollageProps {
  bg: string;
  items: CollageItem[];
  label: string;
}

/**
 * Code-based page cover: each mockup is its own image so it can animate on its own.
 * The 2880×770 frame always fills the width; below ~1200px it keeps a 320px min height
 * and is cropped from the centre (like the old object-cover PNG).
 */
export default function CoverCollage({ bg, items, label }: CoverCollageProps) {
  return (
    <MotionConfig reducedMotion="user">
      <div
        role="img"
        aria-label={label}
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: bg, height: "max(320px, 26.74vw)" }}
      >
        <div className="absolute inset-y-0 left-1/2 aspect-[2880/770] h-full min-w-full -translate-x-1/2">
          {items.map((item, i) => (
            // Entrance is CSS (see .animate-cover-in) so the mockups — the LCP on /work — paint
            // with the HTML instead of staying at opacity 0 until React hydrates.
            <div
              key={item.src + i}
              style={{
                "--cover-from": item.from === "top" ? "-80px" : "80px",
                animationDelay: `${100 + i * 80}ms`,
              } as React.CSSProperties}
              className={`animate-cover-in pointer-events-none absolute ${item.className}`}
            >
              {/* Gentle idle float, phase-shifted per item. Continuous loop, so it uses a
                  sine ease like the toolkit marquee rather than a Kinetics spring. */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
              >
                <Image
                  src={item.src}
                  alt=""
                  width={item.w}
                  height={item.h}
                  // Every item sits in the above-the-fold cover, so none should lazy-load (one was the LCP)
                  priority
                  sizes="(min-width: 1200px) 37vw, 450px"
                  className="h-auto w-full"
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </MotionConfig>
  );
}
