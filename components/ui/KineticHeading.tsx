"use client";

import { motion } from "framer-motion";
import { kineticsOvershoot } from "@/lib/kinetics-motion";

interface KineticHeadingProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function KineticHeading({
  children,
  className,
  delay = 0,
}: KineticHeadingProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ ...kineticsOvershoot, delay }}
      className={className}
    >
      {children}
    </motion.h2>
  );
}
