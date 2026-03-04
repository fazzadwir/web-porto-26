"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Hero from "@/components/sections/Hero";
import SelectedWork from "@/components/sections/SelectedWork";
import Toolkit from "@/components/sections/Toolkit";
import Experience from "@/components/sections/Experience";
import Footer from "@/components/sections/Footer";
import CanvasView from "@/components/ui/CanvasView";
import ViewToggle from "@/components/ui/ViewToggle";

type ViewMode = "web" | "schema";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  categories: string[];
  status?: string;
}

interface PortfolioWrapperProps {
  projects: Project[];
}

/** Framer Motion variants shared across views */
const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function PortfolioWrapper({ projects }: PortfolioWrapperProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("web");

  // Lock / unlock body scroll based on view mode
  useEffect(() => {
    if (viewMode === "schema") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Broadcast viewMode change so FloatingNav can react
    window.dispatchEvent(
      new CustomEvent("viewModeChange", { detail: viewMode }),
    );

    return () => {
      document.body.style.overflow = "";
      // Reset mode broadcast on unmount
      window.dispatchEvent(
        new CustomEvent("viewModeChange", { detail: "web" }),
      );
    };
  }, [viewMode]);

  return (
    <>
      <AnimatePresence mode="wait">
        {viewMode === "web" ? (
          /* ── Standard scrolling site ── */
          <motion.div
            key="web"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Hero />
            <SelectedWork projects={projects} />
            <Toolkit />
            <Experience />
            <Footer />
          </motion.div>
        ) : (
          /* ── Full-screen Spatial Canvas ── */
          <motion.div
            key="schema"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 w-screen h-screen overflow-hidden bg-stone-50 z-[100]"
          >
            {/* Header strip inside schema view */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 pointer-events-none">
              <div className="bg-white/80 backdrop-blur-sm border border-stone-200 shadow-sm rounded-full px-4 py-2">
                <span className="text-xs text-stone-500 font-semibold uppercase tracking-widest">
                  Schema · Spatial Canvas
                </span>
              </div>
            </div>

            {/* Full canvas — no padding, fills 100vh */}
            <div className="w-full h-full">
              <CanvasView projects={projects} fullscreen />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Always-visible toggle — outside AnimatePresence so it never unmounts */}
      <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
    </>
  );
}
