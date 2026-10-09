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

const IB = "/projects/interface-design-bg";

// Positions measured from the 2880×770 cover export (left/top/width in %).
const COVER_ITEMS: CollageItem[] = [
  { src: `${IB}/mockup-1.png`, w: 975, h: 1646, className: "-left-[1.3%] top-[18.5%] w-[33.9%]", from: "bottom" },
  { src: `${IB}/mockup-2.png`, w: 705, h: 1305, className: "left-[17.45%] -top-[57.9%] w-[24.2%]", from: "top" },
  { src: `${IB}/mockup-mid-top.png`, w: 1058, h: 979, className: "left-[34.9%] -top-[49.2%] w-[36.7%]", from: "top" },
  { src: `${IB}/mockup-mid-bottom.png`, w: 1030, h: 937, className: "left-[35.05%] top-[29.7%] w-[35.7%]", from: "bottom" },
  { src: `${IB}/mockup-5.png`, w: 975, h: 1646, className: "left-[62.7%] -top-[62%] w-[33.6%]", from: "top" },
  { src: `${IB}/mockup-6.png`, w: 705, h: 1305, className: "left-[81.3%] top-[20.4%] w-[24.3%]", from: "bottom" },
];

interface InterfaceSectionProps {
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

export default function InterfaceSection({ projects }: InterfaceSectionProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter only UI/UX Designer projects
  const interfaceProjects = useMemo(
    () =>
      projects.filter((p) => getProjectSection(p) === "interface"),
    [projects]
  );

  // Chips come from the projects' Sanity `subcategory` values, so new ones appear automatically.
  const filters = useMemo(() => getSubcategoryFilters(interfaceProjects), [interfaceProjects]);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return interfaceProjects;
    return interfaceProjects.filter((p) => p.subcategory === activeFilter);
  }, [interfaceProjects, activeFilter]);

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* ─────────────────── Hero Cover ─────────────────── */}
      <CoverCollage bg="#666BEA" items={COVER_ITEMS} label="Interface design mockups: mobile apps and dashboards" />

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
            Interface Design
          </h1>
          <p className="text-[#6B6B6B] mt-1 text-sm sm:text-base">
            My main expertise skill in design.
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
                    layoutId="interface-filter-indicator"
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
          <div className="text-center py-24 text-[#888]">
            <p className="text-lg">No projects in this category yet.</p>
          </div>
        ) : (
          <MasonryGrid projects={filtered} />
        )}
      </div>
    </div>
  );
}

// ─────────────────── Masonry Grid ───────────────────
function MasonryGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {projects.map((project, index) => {
        const isPrivate = project.status === "private";
        const imageUrl = getImageUrl(project.mainImage);

        // Alternating background colors inspired by the design reference
        const bgColors = [
          "#D4E9D8", // soft green
          "#D4E9D8", // soft green
          "#F0F0F0", // light grey
          "#D4E9D8",
          "#F9D9E3", // soft pink
          "#D4E9D8",
          "#E8E8F4", // soft lavender
          "#D4E9D8",
          "#F9D9E3",
        ];
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
