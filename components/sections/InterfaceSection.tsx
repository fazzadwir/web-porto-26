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
  "Landing Page",
  "SaaS",
  "FinTech",
  "EdTech",
  "HealthTech",
  "AgriTech",
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

  // Filter only interface projects
  const interfaceProjects = useMemo(
    () =>
      projects.filter(
        (p) =>
          !p.section ||
          p.section === "interface" ||
          p.categories?.some((c: string) =>
            ["UI/UX", "Interface", "Web Application", "Mobile App", "Dashboard", "Web Design", "Design System", "Fintech"].includes(c)
          )
      ),
    [projects]
  );

  const filtered = useMemo(() => {
    if (activeFilter === "All") return interfaceProjects;
    return interfaceProjects.filter(
      (p) =>
        p.subcategory === activeFilter ||
        p.categories?.some((c: string) =>
          c.toLowerCase().includes(activeFilter.toLowerCase())
        )
    );
  }, [interfaceProjects, activeFilter]);

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* ─────────────────── Hero Cover ─────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(320px, 42vw, 520px)" }}>
        <Image
          src="/Interface Design - Cover.png"
          alt="Interface Design Projects Cover"
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
        const isFeatured = index === 0;
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
            className={isFeatured ? "sm:col-span-1 lg:col-span-1" : ""}
          >
            <ProjectCard
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
function ProjectCard({
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
        aspectRatio: isFeatured ? "4/4.2" : "4/4.2",
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

      {/* Arrow — top right on hover */}
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
          /* Placeholder if no image */
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

  if (isPrivate) {
    return inner;
  }

  return (
    <Link href={`/project/${project.slug.current}`} prefetch={false}>
      {inner}
    </Link>
  );
}
