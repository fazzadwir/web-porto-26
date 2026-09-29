"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { kineticsOvershoot, kineticsSpring } from "@/lib/kinetics-motion";
import { urlFor } from "@/lib/sanity";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  categories: string[];
  subcategory?: string;
  status?: string;
  section?: string;
}

const FILTER_CATEGORIES = [
  "All",
  "Social Media Post",
  "Brand Identity",
  "FinTech",
  "EdTech",
  "HealthTech",
  "AgriTech",
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
      projects.filter(
        (p) =>
          p.section === "visual" ||
          p.categories?.some((c: string) =>
            [
              "Visual Design",
              "Graphic Design",
              "Brand Identity",
              "Social Media",
              "Illustration",
              "Print",
            ].includes(c)
          )
      ),
    [projects]
  );

  const filtered = useMemo(() => {
    if (activeFilter === "All") return visualProjects;
    return visualProjects.filter(
      (p) =>
        p.subcategory === activeFilter ||
        p.categories?.some((c: string) =>
          c.toLowerCase().includes(activeFilter.toLowerCase())
        )
    );
  }, [visualProjects, activeFilter]);

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* ─────────────────── Hero Cover ─────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(320px, 42vw, 520px)" }}
      >
        <Image
          src="/Visual Design - Cover.png"
          alt="Visual Design Projects Cover"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
      </div>

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
          {FILTER_CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 border ${
                  isActive
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                    : "bg-transparent text-[#4A4A4A] border-[#C8C8C8] hover:border-[#888] hover:text-[#1A1A1A]"
                }`}
              >
                {cat}
              </button>
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
        const isFeatured = index === 0;
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
            <VisualCard
              project={project}
              isFeatured={isFeatured}
              isPrivate={isPrivate}
              imageUrl={imageUrl}
              bg={bg}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// ─────────────────── Single Card ───────────────────
function VisualCard({
  project,
  isFeatured,
  isPrivate,
  imageUrl,
  bg,
}: {
  project: Project;
  isFeatured: boolean;
  isPrivate: boolean;
  imageUrl: string | null;
  bg: string;
}) {
  const inner = (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        backgroundColor: bg,
        aspectRatio: "4/4.2",
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      {/* Private badge */}
      {isPrivate && (
        <div className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-widest font-semibold border border-white/20">
          Private
        </div>
      )}

      {/* Arrow — visible on hover */}
      {!isPrivate && (
        <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <ArrowUpRight className="w-4 h-4 text-[#1A1A1A]" />
          </div>
        </div>
      )}

      {/* Image */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-[1.03] ${
          isPrivate ? "blur-xl scale-110" : ""
        }`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-24 h-24 rounded-2xl bg-white/40" />
          </div>
        )}
      </div>

      {/* Featured: title label at bottom-left */}
      {isFeatured && (
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10 bg-gradient-to-t from-black/50 via-black/20 to-transparent">
          <p className="text-white text-sm font-semibold leading-snug drop-shadow">
            {project.title}
          </p>
        </div>
      )}
    </div>
  );

  if (isPrivate) return inner;

  return (
    <Link href={`/project/${project.slug.current}`} prefetch={false}>
      {inner}
    </Link>
  );
}
