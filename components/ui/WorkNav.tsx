"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Smartphone, Square, Diamond } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { kineticsGlide, kineticsPress, kineticsSpring } from "@/lib/kinetics-motion";
import { clsx } from "clsx";

export type WorkSection = "interface" | "visual" | "motion";

interface WorkNavProps {
  activeSection?: WorkSection;
  onSectionChange?: (section: WorkSection) => void;
}

const sections: {
  id: WorkSection;
  icon: React.ElementType;
  label: string;
}[] = [
  { id: "interface", icon: Smartphone, label: "Interface" },
  { id: "visual", icon: Square, label: "Visual" },
  { id: "motion", icon: Diamond, label: "Motion" },
];

export default function WorkNav({
  activeSection = "interface",
  onSectionChange,
}: WorkNavProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={kineticsSpring}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3"
    >
      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        transition={kineticsSpring}
        onClick={() => router.push("/")}
        aria-label="Back to Home"
        className="w-12 h-12 rounded-full bg-[#3D3D3D] flex items-center justify-center shadow-lg text-[#A8A8A8] hover:text-white transition-colors duration-300"
      >
        <ArrowLeft className="w-5 h-5" />
      </motion.button>

      {/* Section Pill */}
      <nav
        className="flex items-center px-2 py-2 bg-[#3D3D3D] rounded-full shadow-lg gap-1"
        role="navigation"
        aria-label="Work sections"
      >
        {sections.map(({ id, icon: Icon, label }) => {
          const isActive = activeSection === id;
          return (
            <motion.button
              // Press only: a hover scale would fight the sliding pill
              whileTap={kineticsPress.whileTap}
              data-motion
              key={id}
              onClick={() => onSectionChange?.(id)}
              aria-label={`${label} section`}
              aria-pressed={isActive}
              className={clsx(
                "relative flex items-center gap-2 rounded-full transition-colors duration-300",
                isActive
                  ? "px-4 py-2 text-[#27272A]"
                  : "p-2.5 text-[#888888] hover:text-[#C0C0C0]"
              )}
            >
              {/* Animated white pill background */}
              {isActive && (
                <motion.span
                  layoutId="work-section-indicator"
                  className="absolute inset-0 bg-white rounded-full shadow-sm"
                  transition={kineticsSpring}
                  style={{ borderRadius: 999 }}
                />
              )}

              {/* Icon */}
              <span className="relative z-10">
                <Icon
                  className={clsx(
                    "transition-all duration-300",
                    isActive ? "w-[18px] h-[18px]" : "w-5 h-5"
                  )}
                  strokeWidth={isActive ? 1.75 : 1.5}
                />
              </span>

              {/* Label — only show when active */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    key={`label-${id}`}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={kineticsGlide}
                    className="relative z-10 text-sm font-semibold tracking-tight overflow-hidden whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>
    </motion.div>
  );
}
