"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Network } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

type ViewMode = "web" | "schema";

interface ViewToggleProps {
  viewMode: ViewMode;
  onToggle: (mode: ViewMode) => void;
}

export default function ViewToggle({ viewMode, onToggle }: ViewToggleProps) {
  const isSchema = viewMode === "schema";

  // --- Auto-hide logic to match FloatingNav ---
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | number | null>(null);

  // Listen for modal open/close events from CanvasView
  useEffect(() => {
    const handleModalChange = (e: Event) => {
      setModalOpen((e as CustomEvent<boolean>).detail);
    };
    window.addEventListener("modalOpenChange", handleModalChange);
    return () =>
      window.removeEventListener("modalOpenChange", handleModalChange);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 50) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setVisible(true);
      return;
    }
    setVisible(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setVisible(true);
    }, 600);
  });

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const shouldShow = visible && !modalOpen;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: shouldShow ? 0 : -100,
        opacity: shouldShow ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-8 left-1/2 z-[9999] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isSchema
          ? "-translate-x-1/2" // centered in schema view
          : "-translate-x-1/2 ml-[125px] md:ml-[175px]" // responsive offset in web view
      }`}
    >
      <div className="flex items-center px-1.5 md:px-2 py-1.5 md:py-2 bg-zinc-800/80 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
        <motion.button
          onClick={() => onToggle(isSchema ? "web" : "schema")}
          whileTap={{ scale: 0.92 }}
          title={isSchema ? "Switch to Web View" : "Switch to Schema View"}
          aria-label={isSchema ? "Switch to Web View" : "Switch to Schema View"}
          className="flex items-center justify-center p-2 md:p-3 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
        >
          <motion.div
            key={viewMode}
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10"
          >
            {isSchema ? (
              <Globe className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
            ) : (
              <Network className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
}
