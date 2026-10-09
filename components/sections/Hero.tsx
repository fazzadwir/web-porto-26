"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import DesignDeskScene from "@/components/ui/DesignDeskScene";
import { kineticsOvershoot, kineticsPress } from "@/lib/kinetics-motion";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[100svh] flex flex-col overflow-hidden bg-[#27272a] font-sans">
      {/* 
        -------------------------------------------
        Background: Three.js cartoon designer desk
        -------------------------------------------
      */}
      <div className="absolute inset-0 overflow-hidden">
        <DesignDeskScene />

        {/* Fade keeps the text readable: darker overall on mobile (text covers most of the screen), bottom-left on desktop */}
        <div className="absolute inset-0 bg-linear-to-t from-[#161312]/90 via-[#161312]/60 to-[#161312]/30 md:bg-linear-to-tr md:from-[#161312]/80 md:via-[#161312]/30 md:to-transparent" />
      </div>

      {/* 
        -------------------------------------------
        Content Layout
        -------------------------------------------
      */}
      <div className="relative z-10 flex flex-col justify-end w-full min-h-[100svh] px-6 pb-12 pt-32 md:pb-20 md:px-16 lg:px-24">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Title & Buttons */}
          <div className="lg:col-span-9">
            {/* Headline */}
            <div className="mb-8 flex flex-col items-start font-black uppercase leading-[0.85] tracking-tighter text-6xl md:text-8xl lg:text-[104px]">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={kineticsOvershoot}
                className="text-white z-10"
              >
                DESIGNING
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...kineticsOvershoot,
                  delay: 0.1,
                }}
                className="text-white"
              >
                SYSTEMS
              </motion.span>
            </div>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...kineticsOvershoot,
                delay: 0.25,
              }}
              className="flex flex-col items-start sm:flex-row sm:items-center gap-4 sm:gap-8"
            >
              <motion.a
                {...kineticsPress}
                href="#selected-work"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#selected-work")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-zinc-800 transition-colors duration-300 hover:bg-zinc-800 hover:text-white w-full sm:w-auto"
              >
                My Project
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.a>
              <motion.a
                {...kineticsPress}
                href="/UIUX_FazzaDwi.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-white transition-colors duration-300 hover:bg-zinc-800 hover:text-white w-full sm:w-auto"
              >
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                Download CV
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
