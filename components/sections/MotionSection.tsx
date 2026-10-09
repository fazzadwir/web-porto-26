"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { kineticsOvershoot, kineticsPress, kineticsSpring } from "@/lib/kinetics-motion";
import { urlFor } from "@/lib/sanity";
import CoverCollage, { type CollageItem } from "@/components/ui/CoverCollage";
import { getProjectSection, getSubcategoryFilters } from "@/lib/project-category";
import WorkProjectCard from "@/components/ui/WorkProjectCard";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  category?: string;
  categories?: string[];
  subcategory?: string;
  status?: string;
  section?: string;
}

const MD = "/new_work_category/motion_design";

// Positions measured from the 2880×770 cover export (left/top/width in %).
// Green, pink and orange reuse the homepage category assets; green and pink are rotated in the cover.
const COVER_ITEMS: CollageItem[] = [
  { src: `${MD}/MD-shape-green.webp`, w: 1372, h: 1372, className: "-left-[14.3%] -top-[30.1%] w-[50.1%] -rotate-[34deg]", from: "bottom" },
  { src: `${MD}/MD-shape-pink.webp`, w: 1458, h: 1480, className: "left-[27.05%] -top-[47.3%] w-[42%] -rotate-[18deg]", from: "top" },
  { src: "/projects/motion_design_bg/shape-purple.png", w: 1797, h: 1797, className: "left-[28.6%] top-[1.7%] w-[60.3%]", from: "bottom" },
  { src: `${MD}/MD-shape-orange.webp`, w: 1008, h: 1008, className: "left-[72.3%] -top-[22.6%] w-[40.8%]", from: "top" },
];

interface MotionSectionProps {
  projects: Project[];
}

function getImageUrl(mainImage: any): string | null {
  if (!mainImage) return null;
  if (mainImage?.asset?.url) return mainImage.asset.url;
  try {
    return urlFor(mainImage).width(1200).quality(90).url();
  } catch {
    return null;
  }
}

export default function MotionSection({ projects }: MotionSectionProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const motionProjects = useMemo(
    () =>
      projects.filter((p) => getProjectSection(p) === "motion"),
    [projects]
  );

  // Chips come from the projects' Sanity `subcategory` values, so new ones appear automatically.
  const filters = useMemo(() => getSubcategoryFilters(motionProjects), [motionProjects]);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return motionProjects;
    return motionProjects.filter((p) => p.subcategory === activeFilter);
  }, [motionProjects, activeFilter]);

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* ─────────────────── Hero Cover ─────────────────── */}
      <CoverCollage bg="#DCF154" items={COVER_ITEMS} label="Motion design: floating 3D shapes" />

      {/* ─────────────────── Title + Filters ─────────────────── */}
      <div className="px-5 sm:px-8 lg:px-16 pt-10 pb-8 max-w-[1220px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...kineticsOvershoot, delay: 0.05 }}
        >
          <h1
            className="font-bold text-[#1A1A1A] leading-tight"
            style={{ fontSize: "clamp(28px, 5vw, 42px)" }}
          >
            Motion Design
          </h1>
          <p className="text-[#6B6B6B] mt-1 text-sm sm:text-base">
            Just start learning this
          </p>
        </motion.div>

        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...kineticsSpring, delay: 0.12 }}
          className="flex flex-wrap gap-2 mt-6"
        >
          {filters.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <motion.button
                key={cat}
                {...kineticsPress}
                onClick={() => setActiveFilter(cat)}
                aria-pressed={isActive}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 border ${
                  isActive
                    ? "text-white border-[#1A1A1A]"
                    : "bg-transparent text-[#4A4A4A] border-[#C8C8C8] hover:border-[#888] hover:text-[#1A1A1A]"
                }`}
              >
                {/* Dark pill slides to the selected filter */}
                {isActive && (
                  <motion.span
                    layoutId="motion-filter-indicator"
                    className="absolute inset-0 rounded-full bg-[#1A1A1A]"
                    transition={kineticsSpring}
                  />
                )}
                <span className="relative">{cat}</span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* ─────────────────── Project Grid ─────────────────── */}
      <div className="px-5 sm:px-8 lg:px-16 pb-24 max-w-[1220px] mx-auto">
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <MotionGrid projects={filtered} />
        )}
      </div>
    </div>
  );
}

// ─────────────────── Empty State ───────────────────
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={kineticsOvershoot}
      className="flex flex-col items-center justify-center py-32 gap-4 text-center"
    >
      {/* Spinning diamond shapes matching Motion category palette */}
      <div className="flex gap-4 mb-2">
        {["#DAFA4D", "#FF6B9D", "#4DCFFA", "#B4FA4D"].map((color, i) => (
          <motion.div
            key={i}
            className="w-8 h-8"
            style={{ backgroundColor: color, borderRadius: 4 }}
            animate={{ rotate: [0, 180, 360] }}
            transition={{
              repeat: Infinity,
              duration: 2.4,
              delay: i * 0.3,
              ease: "linear",
            }}
          />
        ))}
      </div>
      <p className="text-[#888] text-lg font-medium">
        No projects in this category yet.
      </p>
      <p className="text-[#AAAAAA] text-sm">
        Motion work is in progress — check back soon.
      </p>
    </motion.div>
  );
}

// ─────────────────── Motion Grid ───────────────────
function MotionGrid({ projects }: { projects: Project[] }) {
  const bgColors = [
    "#D4E9D8",
    "#D4E9D8",
    "#F0F0F0",
    "#D4E9D8",
    "#F9D9E3",
    "#D4E9D8",
    "#FAFAC8", // soft yellow-green accent (DAFA4D toned down)
    "#E8F4FD",
    "#F9D9E3",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {projects.map((project, index) => {
        const isPrivate = project.status === "private";
        const imageUrl = getImageUrl(project.mainImage);
        const bg = bgColors[index % bgColors.length];

        return (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...kineticsOvershoot, delay: index * 0.06 }}
          >
            <WorkProjectCard
              title={project.title}
              slug={project.slug.current}
              imageUrl={imageUrl}
              bg={bg}
              isPrivate={isPrivate}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
