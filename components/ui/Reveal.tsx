"use client";

import { motion } from "framer-motion";
import { kineticsOvershoot } from "@/lib/kinetics-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/** Fades + lifts its content in the first time it scrolls into view (same spring as KineticHeading). */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ ...kineticsOvershoot, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
