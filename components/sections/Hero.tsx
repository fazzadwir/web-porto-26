"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import ThreeWaveBackground from "@/components/ui/ThreeWaveBackground";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[100svh] flex flex-col overflow-hidden bg-[#27272a] font-sans">
      {/* 
        -------------------------------------------
        Background: Three.js Particle Wave
        -------------------------------------------
      */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Three.js canvas — edit props here to change wave appearance */}
        <ThreeWaveBackground
          dotColor={0xffaa00}
          dotSize={0.2}
          waveAmplitude={7}
          opacity={1}
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[#161312]/20" />
      </div>

      {/* 
        -------------------------------------------
        Content Layout
        -------------------------------------------
      */}
      <div className="relative z-10 flex flex-col justify-end w-full min-h-[100svh] px-6 pb-12 pt-32 md:pb-20 md:px-16 lg:px-24">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Title & Description */}
          <div className="lg:col-span-9">
            {/* Headline */}
            <div className="mb-8 flex flex-col items-start font-black uppercase leading-[0.85] tracking-tighter text-6xl md:text-8xl lg:text-[104px]">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-white z-10"
              >
                DESIGNING
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-white"
              >
                SYSTEMS
              </motion.span>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-3xl text-lg text-gray-100 md:text-xl"
            >
              Hi, I'm Fazza Dwi Riandy. I'm a{" "}
              <span className="font-semibold">UI/UX Designer</span> who bridges
              the gap between complex system logic and pixel-perfect
              implementation. From scalable cloud dashboards to cohesive brand
              assets, I design digital experiences that are as technically sound
              as they are visually compelling.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4, // Slight delay after description
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 flex flex-col items-start sm:flex-row sm:items-center gap-4 sm:gap-8"
            >
              <a
                href="#selected-work"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-zinc-800 transition-all duration-300 hover:bg-zinc-800 hover:text-white w-full sm:w-auto"
              >
                My Project
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 hover:text-zinc-800" />
              </a>
              <a
                href="/UIUX_FazzaDwi.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-zinc-800 hover:text-white w-full sm:w-auto"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
