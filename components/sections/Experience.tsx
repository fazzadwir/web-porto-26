"use client";

import React from "react";
import Image from "next/image";
import { motion, MotionConfig, type Variants } from "framer-motion";
import KineticHeading from "@/components/ui/KineticHeading";
import Reveal from "@/components/ui/Reveal";
import {
  kineticsGlide,
  kineticsOvershoot,
  kineticsSpring,
} from "@/lib/kinetics-motion";

const MotionImage = motion.create(Image);

const SHADOW = "0 8px 20px rgba(0,0,0,0.15)";
const SHADOW_HOVER = "0 18px 36px rgba(0,0,0,0.22)";

// Card reveals on scroll (staggered by index via `custom`), children follow; hover lifts the card.
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48, boxShadow: SHADOW },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    boxShadow: SHADOW,
    transition: {
      ...kineticsOvershoot,
      delay: i * 0.12,
      delayChildren: i * 0.12 + 0.1,
      staggerChildren: 0.1,
    },
  }),
  hover: { y: -6, boxShadow: SHADOW_HOVER, transition: kineticsSpring },
};

const graphicVariants: Variants = {
  hidden: { opacity: 0, y: -40 },
  show: { opacity: 1, y: 0, scale: 1, transition: kineticsOvershoot },
  hover: { y: 10, scale: 1.06, transition: kineticsSpring },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: kineticsGlide },
  hover: { x: 8, transition: kineticsSpring },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: kineticsGlide },
};

const experiences = [
  {
    id: 1,
    roleLines: ["UI/UX", "DESIGNER"],
    company: "PT. Awan Data Indonesia",
    date: "2025 - Present",
    description:
      "Responsible for designing complex IaaS/PaaS dashboards and managing corporate visual assets. Beyond high-fidelity prototyping, I bridge the gap to development by occasionally stepping in to slice key interfaces into frontend code, ensuring pixel-perfect implementation when needed.",
    bg: "#2EE683",
    ink: "#0A5C30",
    graphic: {
      src: "/green-card-graphic.svg",
      w: 285,
      h: 191,
      size: "w-[38%]",
      left: "md:left-[29%]",
    },
  },
  {
    id: 2,
    roleLines: ["WEB", "DESIGNER"],
    company: "PT. Kita Bantu Indonesia",
    date: "March 2025 - June 2025",
    description:
      "Accelerated product validation through strategic wireframing and rapid prototyping. Focused on high-impact features and seamless developer handoffs, ensuring designs were not just visually pleasing but technically feasible for immediate deployment.",
    bg: "#FF6B6B",
    ink: "#660000",
    graphic: {
      src: "/red-card-graphic.svg",
      w: 193,
      h: 157,
      size: "w-[26%]",
      left: "md:left-[31%]",
    },
  },
];

const Experience = () => {
  return (
    <section className="bg-stone-50 py-24 w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <KineticHeading className="flex flex-col font-black uppercase leading-[0.85] tracking-tighter text-5xl md:text-[90px] mb-2">
            <span className="text-zinc-800">WORK</span>
            <span className="text-stone-400">EXPERIENCE</span>
          </KineticHeading>
          <Reveal delay={0.1}>
            <p className="text-stone-500 text-lg max-w-sm mt-3">
              Bridging the gap between creative vision and technical
              feasibility.
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <MotionConfig reducedMotion="user">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {experiences.map((exp, i) => (
              <motion.article
                key={exp.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                whileHover="hover"
                viewport={{ once: true, amount: 0.3 }}
                style={{ color: exp.ink }}
                className="relative flex flex-col md:flex-row overflow-hidden rounded-3xl [container-type:inline-size]"
              >
                {/* Color layer sits only behind the left side so no color can bleed at the card's right edge */}
                <div
                  aria-hidden
                  style={{ backgroundColor: exp.bg }}
                  className="absolute inset-y-0 left-0 w-full md:w-[60%]"
                />
                <MotionImage
                  variants={graphicVariants}
                  src={exp.graphic.src}
                  alt=""
                  aria-hidden
                  width={exp.graphic.w}
                  height={exp.graphic.h}
                  unoptimized
                  className={`absolute top-0 right-0 md:right-auto h-auto pointer-events-none ${exp.graphic.size} ${exp.graphic.left}`}
                />

                {/* Colored panel: role title */}
                <motion.div
                  variants={titleVariants}
                  className="relative flex items-end min-h-52 md:min-h-0 md:w-[51%] md:shrink-0 p-6 md:p-[4.5cqw] pb-10 md:pb-[4.5cqw]"
                >
                  <h3 className="font-black uppercase leading-[0.85] tracking-tighter text-[14cqw] md:text-[7.2cqw]">
                    {exp.roleLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                </motion.div>

                {/* White panel: details */}
                <motion.div
                  variants={panelVariants}
                  className="relative -mt-6 md:mt-0 md:flex-1 bg-stone-50 rounded-t-3xl md:rounded-t-none md:rounded-l-3xl p-6 md:p-[4.5cqw] shadow-[-4px_0_12px_rgba(0,0,0,0.08)]"
                >
                  <h4 className="text-lg md:text-xl font-semibold text-zinc-800 leading-snug">
                    {exp.company}
                  </h4>
                  <span className="block mt-1 mb-4 text-xs font-medium text-stone-400 uppercase tracking-wide">
                    {exp.date}
                  </span>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </MotionConfig>
      </div>
    </section>
  );
};

export default Experience;
