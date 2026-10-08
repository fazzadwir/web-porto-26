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

const VB = "/projects/visual-design-bg";
const VD = "/new_work_category/visual_design";

// Positions measured from the 2880×770 cover export (left/top/width in %).
// Stickers reuse the homepage category assets.
const COVER_ITEMS: CollageItem[] = [
  { src: `${VB}/kesaktian-pancasila.png`, w: 663, h: 768, className: "-left-[1.84%] top-[31.7%] w-[23.1%]", from: "bottom" },
  { src: `${VD}/VD-logo-frog.webp`, w: 970, h: 590, className: "left-[7.95%] -top-[26.1%] w-[31.76%]", from: "top" },
  { src: `${VD}/VP-logo-onmeeting.webp`, w: 926, h: 926, className: "left-[21.07%] top-[41.75%] w-[26%]", from: "bottom" },
  { src: `${VB}/hari-bumi.png`, w: 712, h: 808, className: "left-[46.7%] top-[17%] w-[25.2%]", from: "bottom" },
  { src: `${VD}/VD-logo-cp.webp`, w: 958, h: 858, className: "left-[64.89%] -top-[27.1%] w-[26.68%]", from: "top" },
  { src: `${VD}/VD-logo-cloudra.webp`, w: 774, h: 808, className: "left-[80.63%] top-[38%] w-[21.68%]", from: "bottom" },
];

interface VisualSectionProps {
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

export default function VisualSection({ projects }: VisualSectionProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter only visual projects
  const visualProjects = useMemo(
    () =>
      projects.filter((p) => getProjectSection(p) === "visual"),
    [projects]
  );

  // Chips come from the projects' Sanity `subcategory` values, so new ones appear automatically.
  const filters = useMemo(() => getSubcategoryFilters(visualProjects), [visualProjects]);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return visualProjects;
    return visualProjects.filter((p) => p.subcategory === activeFilter);
  }, [visualProjects, activeFilter]);

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* ─────────────────── Hero Cover ─────────────────── */}
      <CoverCollage bg="#2CE590" items={COVER_ITEMS} label="Visual design work: posters and logo stickers" />

      {/* ─────────────────── Title + Filters ─────────────────── */}
      <div className="px-5 sm:px-8 lg:px-16 pt-10 pb-8 max-w-[1220px] mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...kineticsOvershoot, delay: 0.05 }}
        >
          <h1
            className="font-bold text-[#1A1A1A] leading-tight"
            style={{ fontSize: "clamp(28px, 5vw, 42px)" }}
          >
            Visual Design
          </h1>
          <p className="text-[#6B6B6B] mt-1 text-sm sm:text-base">
            I create a logo, social media post campaign, dan more!
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
                    layoutId="visual-filter-indicator"
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
          <VisualGrid projects={filtered} />
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
      {/* Decorative colourful blobs matching Visual category palette */}
      <div className="flex gap-3 mb-2">
        {["#28DFA1", "#FF6B6B", "#FFD93D", "#6BCB77"].map((color, i) => (
          <motion.div
            key={i}
            className="w-10 h-10 rounded-full"
            style={{ backgroundColor: color, opacity: 0.7 }}
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <p className="text-[#888] text-lg font-medium">
        No projects in this category yet.
      </p>
      <p className="text-[#AAAAAA] text-sm">
        Visual design work is being curated — check back soon.
      </p>
    </motion.div>
  );
}

// ─────────────────── Visual Grid ───────────────────
function VisualGrid({ projects }: { projects: Project[] }) {
  // Background colours for cards — visual design uses warmer/brighter accents
  const bgColors = [
    "#D4E9D8", // soft green
    "#D4E9D8",
    "#F0F0F0", // light grey
    "#D4E9D8",
    "#F9D9E3", // soft pink
    "#D4E9D8",
    "#FFF3CD", // soft yellow
    "#E8F4FD", // soft blue
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
