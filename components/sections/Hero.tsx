'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { ArrowUpRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black font-sans">
      {/* 
        -------------------------------------------
        Background Animation (The "Breathing" Effect)
        -------------------------------------------
      */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            src="/hero-vids.mp4"
            autoPlay
            loop
            muted
            playsInline
            suppressHydrationWarning
          />
        </div>
        
        {/* Subtle texture/noise overlay (optional but recommended for depth) */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'url("/noise.png")' }} // Assuming no noise asset yet, this will just be transparent or we can omit.
        />
        
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 
        -------------------------------------------
        Content Layout
        -------------------------------------------
      */}
      <div className="relative z-10 flex h-full w-full items-end justify-center px-6 pb-20 md:px-16 lg:px-24">
        <div className="grid w-full max-w-[1400px] grid-cols-1 gap-8 items-end lg:grid-cols-12">
          
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
                className="text-stone-500"
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
              Hi, I'm Fazza Dwi Riandy. I'm a Product Designer who bridges the gap
              between{' '}
              <span className="font-semibold text-white">functional UI/UX</span>{' '}
              and{' '}
              <span className="font-semibold text-white">
                compelling visual storytelling
              </span>
              . From complex cloud dashboards to brand assets, I build digital
              experiences that work as good as they look.
            </motion.p>
          </div>

          {/* Right Column: CTA Button */}
          <div className="flex justify-start lg:col-span-3 lg:justify-end lg:mb-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a
                href="#selected-work"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-transform hover:scale-105"
              >
                My Project
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
export default Hero;
