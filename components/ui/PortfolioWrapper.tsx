"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";

import Hero from "@/components/sections/Hero";
import Profile from "@/components/sections/Profile";
import ProjectCategories from "@/components/sections/ProjectCategories";
import Experience from "@/components/sections/Experience";
import Footer from "@/components/sections/Footer";
import dynamic from "next/dynamic";

// The spatial canvas (react-zoom-pan-pinch + all project cards) is only shown after the
// user opens Schema view, so keep it out of the home page's initial bundle.
const CanvasView = dynamic(() => import("@/components/ui/CanvasView"), { ssr: false });
import { ArrowLeft } from "lucide-react";
import { kineticsGlide, kineticsPress } from "@/lib/kinetics-motion";

type ViewMode = "web" | "schema";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: unknown;
  category?: string;
  categories?: string[];
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
      {/* initial={false}: no fade on first paint, so the page is visible before hydration */}
      <AnimatePresence mode="wait" initial={false}>
        {viewMode === "web" ? (
          /* ── Standard scrolling site ── */
          <m.div
            key="web"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={kineticsGlide}
          >
            <Hero />
            <Profile />
            <ProjectCategories />
            <Experience />
            <Footer />
          </m.div>
        ) : (
          /* ── Full-screen Spatial Canvas ── */
          <m.div
            key="schema"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={kineticsGlide}
            className="fixed inset-0 w-screen h-screen overflow-hidden bg-stone-50 z-[100]"
          >
            {/* Header strip inside schema view */}
            <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 pointer-events-none">
              <div className="bg-white/90 backdrop-blur-sm border border-stone-200 shadow-sm rounded-full px-4 py-2 pointer-events-auto">
                <span className="text-xs text-stone-600 font-semibold uppercase tracking-widest">
                  Schema Space
                </span>
              </div>
              <m.button
                {...kineticsPress}
                onClick={() => setViewMode("web")}
                className="pointer-events-auto bg-stone-900 border border-stone-800 shadow-sm rounded-full px-5 py-2.5 hover:bg-stone-800 transition-colors flex items-center gap-2"
                aria-label="Back to Home"
              >
                <ArrowLeft className="w-4 h-4 text-white" />
                <span className="text-xs text-white font-semibold uppercase tracking-widest hidden sm:inline-block">
                  Back to Home
                </span>
              </m.button>
            </div>

            {/* Full canvas — no padding, fills 100vh */}
            <div className="w-full h-full">
              <CanvasView projects={projects} fullscreen />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
