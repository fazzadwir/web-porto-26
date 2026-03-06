"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { urlFor } from "@/lib/sanity";
import { tools } from "@/lib/tools-data";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Lock,
  X,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Dribbble,
  Github,
  Share2,
  ArrowUpRight,
  Check,
} from "lucide-react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  categories: string[];
  status?: string;
  timeline?: string;
  company?: string;
  projectOverview?: string;
  closingStatement?: string;
  technologies?: string[];
  showcaseImage1?: any;
  showcaseImagesTwoColumn?: any[];
  showcaseImageLast?: any;
}

interface CanvasViewProps {
  projects: Project[];
  fullscreen?: boolean;
}

// ─────────────────────────────────────────────
// Ring Layout Math
// ─────────────────────────────────────────────
const RING_CONFIG = [
  { maxItems: 5, radius: 360 },
  { maxItems: 10, radius: 720 },
];
const MAX_PROJECTS = RING_CONFIG.reduce((sum, r) => sum + r.maxItems, 0);

function getPosition(
  index: number,
  totalProjects: number,
): { x: number; y: number } {
  const ring1Max = RING_CONFIG[0].maxItems;
  let indexInRing: number, totalInRing: number, radius: number;
  if (index < ring1Max) {
    indexInRing = index;
    totalInRing = Math.min(totalProjects, ring1Max);
    radius = RING_CONFIG[0].radius;
  } else {
    indexInRing = index - ring1Max;
    totalInRing = Math.min(totalProjects - ring1Max, RING_CONFIG[1].maxItems);
    radius = RING_CONFIG[1].radius;
  }
  const theta = ((2 * Math.PI) / totalInRing) * indexInRing - Math.PI / 2;
  return {
    x: Math.round(radius * Math.cos(theta)),
    y: Math.round(radius * Math.sin(theta)),
  };
}

// ─────────────────────────────────────────────
// Canvas constants
// ─────────────────────────────────────────────
const CANVAS_W = 4000;
const CANVAS_H = 3000;
const CANVAS_CX = CANVAS_W / 2;
const CANVAS_CY = CANVAS_H / 2;
const CARD_HALF = 128;

// ─────────────────────────────────────────────
// Dispatch helper — hides FloatingNav & ViewToggle when a modal is open
// ─────────────────────────────────────────────
function dispatchModalEvent(open: boolean) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("modalOpenChange", { detail: open }));
  }
}

// ─────────────────────────────────────────────
// Experience data
// ─────────────────────────────────────────────
const experiences = [
  {
    role: "UI/UX Designer",
    company: "PT. Awan Data Indonesia",
    period: "April 2025 · Now",
    current: true,
  },
  {
    role: "Web Designer",
    company: "PT. Kita Bantu Indonesia",
    period: "February 2025 · June 2025",
    current: false,
  },
];

// ─────────────────────────────────────────────
// Social links
// ─────────────────────────────────────────────
const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fazza-dwi-riandy/",
    Icon: Linkedin,
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com/fazzadwiriandy",
    Icon: Dribbble,
  },
  { label: "GitHub", href: "https://github.com/fazzadwir", Icon: Github },
];

// ─────────────────────────────────────────────
// SVG Connector Lines
// ─────────────────────────────────────────────
function ConnectorLines({ projects }: { projects: Project[] }) {
  return (
    <svg
      className="absolute inset-0 pointer-events-none z-0"
      width={CANVAS_W}
      height={CANVAS_H}
    >
      {projects.map((_, i) => {
        const { x, y } = getPosition(i, projects.length);
        return (
          <motion.line
            key={i}
            x1={CANVAS_CX}
            y1={CANVAS_CY}
            x2={CANVAS_CX + x}
            y2={CANVAS_CY + y}
            stroke="rgba(120,113,108,0.2)"
            strokeWidth={1}
            strokeDasharray="5 10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.25 + i * 0.04,
              duration: 0.5,
              ease: "easeOut",
            }}
          />
        );
      })}
    </svg>
  );
}

// ─────────────────────────────────────────────
// Project Modal
// ─────────────────────────────────────────────
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const router = useRouter();
  const isPrivate = project.status === "private";

  // Build image slides: mainImage + showcase images
  const slides = React.useMemo(() => {
    const imgs: { src: string; alt: string }[] = [];
    if (project.mainImage) {
      imgs.push({
        src: urlFor(project.mainImage).width(1200).quality(90).url(),
        alt: project.mainImage?.alt || project.title,
      });
    }
    if (project.showcaseImage1) {
      imgs.push({
        src: urlFor(project.showcaseImage1).width(1200).quality(90).url(),
        alt: project.showcaseImage1?.alt || project.title,
      });
    }
    if (project.showcaseImagesTwoColumn) {
      project.showcaseImagesTwoColumn.forEach((img) => {
        imgs.push({
          src: urlFor(img).width(1200).quality(90).url(),
          alt: img?.alt || project.title,
        });
      });
    }
    if (project.showcaseImageLast) {
      imgs.push({
        src: urlFor(project.showcaseImageLast).width(1200).quality(90).url(),
        alt: project.showcaseImageLast?.alt || project.title,
      });
    }
    return imgs;
  }, [project]);

  const [slideIdx, setSlideIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const prevSlide = () =>
    setSlideIdx((i) => (i - 1 + slides.length) % slides.length);
  const nextSlide = () => setSlideIdx((i) => (i + 1) % slides.length);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        dispatchModalEvent(false);
      }
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Copy link to clipboard
  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}/project/${project.slug.current}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }, [project.slug]);

  // Tools used by this project
  const projectTools = tools.filter((t) =>
    project.technologies?.some(
      (tech) =>
        tech.toLowerCase().includes(t.name.toLowerCase()) ||
        t.name.toLowerCase().includes(tech.toLowerCase()),
    ),
  );

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => {
          onClose();
          dispatchModalEvent(false);
        }}
      />

      {/* Modal — stacks vertically on mobile, side-by-side on md+ */}
      <motion.div
        className="relative z-10 w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        style={{ maxHeight: "92vh" }}
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 280,
          damping: 26,
        }}
      >
        {/* ── Left: Image carousel — full width on mobile, 52% on md+ ── */}
        <div className="relative w-full h-56 sm:h-72 md:w-[52%] md:h-auto flex-shrink-0 bg-zinc-900 overflow-hidden">
          {slides.length > 0 ? (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={slideIdx}
                  className="absolute inset-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* ── Layer 1: Static Dark Glassmorphism Background ──
                      Uses a grayscale blurred version of the image under a frosted dark overlay */}
                  <div className="absolute inset-0 overflow-hidden bg-zinc-900">
                    <Image
                      src={slides[slideIdx].src}
                      alt=""
                      fill
                      className="object-cover scale-125 blur-xl opacity-20 mix-blend-luminosity"
                      sizes="600px"
                      aria-hidden
                    />
                    {/* Glass overlay */}
                    <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-3xl" />
                  </div>

                  {/* ── Layer 2: Actual image — contained, no crop ──── */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={slides[slideIdx].src}
                      alt={slides[slideIdx].alt}
                      fill
                      className="object-contain"
                      sizes="600px"
                      priority
                    />
                  </div>
                  {/* Overlay for private */}
                  {isPrivate && (
                    <div className="absolute inset-0 backdrop-blur-xl bg-black/30 flex flex-col items-center justify-center gap-2">
                      <Lock className="w-8 h-8 text-white/60" />
                      <p className="text-white/60 text-sm font-semibold">
                        NDA · Restricted
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Alt text label */}
              {slides[slideIdx].alt && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-black/50 backdrop-blur-sm text-white/80 text-[10px] font-medium px-3 py-1 rounded-full">
                    {slides[slideIdx].alt}
                  </span>
                </div>
              )}

              {/* Arrow nav — only if multiple slides */}
              {slides.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Dot indicators */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSlideIdx(i)}
                        className={`rounded-full transition-all duration-200 ${
                          i === slideIdx
                            ? "w-4 h-1.5 bg-white"
                            : "w-1.5 h-1.5 bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center">
              <span className="text-stone-500 text-sm">No images</span>
            </div>
          )}
        </div>

        {/* ── Right: Project info ── */}
        <div className="flex flex-col flex-1 overflow-y-auto md:min-h-0">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors z-20"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-7 flex flex-col gap-5 h-full">
            {/* Header */}
            <div>
              {project.timeline && (
                <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-widest mb-1">
                  {project.timeline}
                </p>
              )}
              <h2 className="text-2xl font-black text-stone-900 tracking-tight leading-tight">
                {project.title}
              </h2>
              {project.categories?.[0] && (
                <p className="text-sm text-stone-400 mt-1">
                  {project.categories.join(" · ")}
                </p>
              )}
              {project.projectOverview && (
                <p className="mt-3 text-sm text-stone-500 leading-relaxed">
                  {project.projectOverview}
                </p>
              )}
            </div>

            {/* Company */}
            {project.company && (
              <div>
                <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-widest mb-1">
                  Company
                </p>
                <p className="text-sm font-semibold text-stone-800">
                  {project.company}
                </p>
              </div>
            )}

            {/* Closing statement */}
            {project.closingStatement && (
              <div>
                <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-widest mb-1">
                  Closing Statement
                </p>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {project.closingStatement}
                </p>
              </div>
            )}

            {/* Technologies / Tools used */}
            {projectTools.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-widest mb-2">
                  Tools Used
                </p>
                <div className="flex flex-wrap gap-2">
                  {projectTools.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex items-center gap-1.5 bg-stone-100 border border-stone-200 rounded-lg px-2.5 py-1.5"
                    >
                      <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                        <tool.Icon color={tool.modalColor} size={14} />
                      </div>
                      <span className="text-xs font-medium text-stone-600 whitespace-nowrap">
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fallback: show all tools if none matched */}
            {projectTools.length === 0 &&
              project.technologies &&
              project.technologies.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-widest mb-2">
                    Tools Used
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-stone-100 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-stone-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {/* CTA buttons */}
            <div className="mt-auto flex items-center gap-3 pt-2">
              {/* Share */}
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white hover:bg-stone-50 px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-green-600">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    Share this project
                  </>
                )}
              </button>

              {/* Detail Project */}
              <Link
                href={`/project/${project.slug.current}`}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-stone-900 hover:bg-stone-700 text-white px-5 py-2.5 text-sm font-semibold transition-colors"
              >
                Detail Project
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Profile Modal
// ─────────────────────────────────────────────
function ProfileModal({ onClose }: { onClose: () => void }) {
  const [contactOpen, setContactOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setContactOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden bg-white shadow-2xl flex flex-col md:flex-row"
        style={{ maxHeight: "92vh" }}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 280,
          damping: 26,
        }}
      >
        {/* Left — Photo */}
        <div className="relative w-full h-56 sm:h-72 md:w-[44%] md:h-auto flex-shrink-0 bg-stone-100">
          <Image
            src="/profile-pic.webp"
            alt="Fazza Dwi Riandy"
            fill
            className="object-cover object-top"
            sizes="400px"
            priority
          />
        </div>

        {/* Right — Info */}
        <div className="flex flex-col flex-1 overflow-y-auto md:min-h-0 p-8 gap-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors z-20"
          >
            <X className="w-4 h-4" />
          </button>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
              UI/UX Designer
            </p>
            <h2 className="text-3xl font-black text-stone-900 tracking-tight leading-tight">
              Fazza Dwi Riandy
            </h2>
            <p className="mt-3 text-sm text-stone-500 leading-relaxed">
              I'm a UI/UX Designer who bridges the gap between complex system
              logic and pixel-perfect implementation. From scalable cloud
              dashboards to cohesive brand assets, I design digital experiences
              that are as technically sound as they are visually compelling.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-3">
              Experience
            </p>
            <div className="relative pl-4 flex flex-col gap-4">
              <div className="absolute left-0 top-2 bottom-2 w-px bg-stone-200" />
              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-4">
                  <div
                    className={`absolute left-[-17px] top-1.5 w-2 h-2 rounded-full border-2 ${
                      exp.current
                        ? "bg-stone-800 border-stone-800"
                        : "bg-white border-stone-300"
                    }`}
                  />
                  <p className="text-sm font-semibold text-stone-800">
                    {exp.role}
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {exp.company} <span className="mx-1 text-stone-300">·</span>{" "}
                    {exp.period}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-3">
              Toolkit
            </p>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-1.5 bg-stone-100 border border-stone-200 rounded-lg px-2.5 py-1.5"
                >
                  <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                    <tool.Icon color={tool.modalColor} size={16} />
                  </div>
                  <span className="text-xs font-medium text-stone-600 whitespace-nowrap">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-col md:flex-row md:items-center gap-3 pt-2">
            <div ref={dropdownRef} className="relative w-full md:flex-1">
              <button
                onClick={() => setContactOpen((v) => !v)}
                className="w-full flex items-center justify-center gap-1.5 rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
              >
                Contact me
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${contactOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {contactOpen && (
                  <motion.div
                    className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden z-30"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                  >
                    {socials.map(({ label, href, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors text-sm text-stone-700 font-medium"
                      >
                        <Icon className="w-4 h-4 text-stone-400" />
                        {label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <a
              href="/UIUX_FazzaDwi.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:flex-1 flex items-center justify-center gap-2 rounded-full bg-stone-900 hover:bg-stone-700 text-white px-5 py-2.5 text-sm font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download CV
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Profile Center Node
// ─────────────────────────────────────────────
function ProfileNode({ onClick }: { onClick: () => void }) {
  return (
    <div className="relative flex flex-col items-center gap-3 select-none z-10">
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 240,
          height: 240,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(120,113,108,0.1) 0%, transparent 70%)",
        }}
      />
      <button
        onClick={onClick}
        className="relative w-36 h-36 rounded-full ring-4 ring-stone-300 ring-offset-8 ring-offset-stone-50 shadow-2xl overflow-hidden bg-stone-200 hover:ring-stone-500 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
        title="View profile"
      >
        <Image
          src="/profile-pic.webp"
          alt="Fazza Dwi Riandy"
          fill
          className="object-cover object-top"
          sizes="144px"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      </button>
      <div className="bg-white border border-stone-200 shadow-sm rounded-full px-5 py-2 whitespace-nowrap mt-1">
        <span className="text-sm font-semibold text-stone-600 tracking-widest uppercase">
          Fazza Dwi Riandy
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Project Card Node — intercepts click → modal
// ─────────────────────────────────────────────
function ProjectNode({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const isPrivate = project.status === "private";
  const imageUrl = project.mainImage
    ? urlFor(project.mainImage).width(640).quality(100).url()
    : null;

  return (
    <div
      onClick={onClick}
      className="group relative w-64 h-64 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 cursor-pointer transition-all duration-500 hover:scale-105 hover:border-stone-300"
      style={{
        boxShadow:
          "0 2px 4px rgba(0,0,0,0.04), 0 6px 12px rgba(0,0,0,0.06), 0 16px 32px rgba(0,0,0,0.08)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 8px rgba(0,0,0,0.06), 0 12px 24px rgba(0,0,0,0.10), 0 32px 56px rgba(0,0,0,0.14)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 2px 4px rgba(0,0,0,0.04), 0 6px 12px rgba(0,0,0,0.06), 0 16px 32px rgba(0,0,0,0.08)";
      }}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          className={`object-cover transition-transform duration-700 group-hover:scale-110 ${isPrivate ? "blur-xl scale-110" : ""}`}
          sizes="640px"
          suppressHydrationWarning
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-100" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/65 backdrop-blur-[2px] px-5 text-center">
        <h3 className="text-white text-base font-semibold leading-tight tracking-tight">
          {project.title}
        </h3>
        {project.categories?.[0] && (
          <span className="text-[11px] text-white/60 uppercase tracking-widest">
            {project.categories[0]}
          </span>
        )}
        <div
          className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            isPrivate
              ? "bg-white/10 border border-white/20 text-white/60"
              : "bg-white/20 hover:bg-white/30 text-white"
          }`}
        >
          {isPrivate ? (
            <>
              <Lock className="w-3 h-3" /> Restricted · View Details
            </>
          ) : (
            "View Overview"
          )}
        </div>
      </div>

      {/* Title strip */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white text-sm font-semibold truncate drop-shadow-lg">
          {project.title}
        </p>
      </div>

      {/* NDA badge */}
      {isPrivate && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm border border-stone-200 rounded-full px-2.5 py-1 shadow-sm">
          <Lock className="w-3 h-3 text-stone-500" />
          <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
            NDA
          </span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Export: CanvasView
// ─────────────────────────────────────────────
export default function CanvasView({
  projects,
  fullscreen = false,
}: CanvasViewProps) {
  const visible = projects.slice(0, MAX_PROJECTS);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div
        className={`relative w-full bg-stone-50 overflow-hidden ${
          fullscreen
            ? "h-full"
            : "h-[78vh] min-h-[520px] rounded-2xl border border-stone-200"
        }`}
      >
        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(120,113,108,0.35) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Hint */}
        <div className="absolute top-4 right-6 z-20 pointer-events-none">
          <p className="text-[11px] text-stone-400 bg-white/80 backdrop-blur-sm border border-stone-200 shadow-sm rounded-full px-4 py-1.5 tracking-widest uppercase whitespace-nowrap font-medium">
            Drag to explore · Scroll to zoom
          </p>
        </div>

        <TransformWrapper
          initialScale={0.45}
          minScale={0.2}
          maxScale={2.5}
          centerOnInit
          panning={{ velocityDisabled: false }}
          wheel={{ smoothStep: 0.002 }}
          doubleClick={{ disabled: false }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Zoom controls */}
              <div className="absolute bottom-5 right-5 z-20 flex flex-col gap-2">
                {[
                  { fn: () => zoomIn(), Icon: ZoomIn, label: "Zoom In" },
                  { fn: () => zoomOut(), Icon: ZoomOut, label: "Zoom Out" },
                  {
                    fn: () => resetTransform(),
                    Icon: RotateCcw,
                    label: "Reset",
                  },
                ].map(({ fn, Icon, label }) => (
                  <button
                    key={label}
                    onClick={fn}
                    title={label}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-500 hover:text-stone-800 transition-all shadow-sm"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>

              {/* Project count */}
              <div className="absolute bottom-5 left-5 z-20">
                <div className="bg-white/80 backdrop-blur-sm border border-stone-200 rounded-full px-3 py-1.5 shadow-sm">
                  <span className="text-[11px] text-stone-400 font-medium tracking-wide">
                    {visible.length} project{visible.length !== 1 ? "s" : ""}{" "}
                    mapped
                  </span>
                </div>
              </div>

              <TransformComponent
                wrapperStyle={{ width: "100%", height: "100%" }}
                contentStyle={{
                  width: `${CANVAS_W}px`,
                  height: `${CANVAS_H}px`,
                }}
              >
                <div
                  className="relative cursor-grab active:cursor-grabbing"
                  style={{ width: CANVAS_W, height: CANVAS_H }}
                >
                  <ConnectorLines projects={visible} />

                  {/* Radial glow */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: CANVAS_CX,
                      top: CANVAS_CY,
                      transform: "translate(-50%, -50%)",
                      width: 800,
                      height: 800,
                      background:
                        "radial-gradient(circle, rgba(120,113,108,0.08) 0%, transparent 65%)",
                      borderRadius: "50%",
                    }}
                  />

                  {/* Profile Node */}
                  <motion.div
                    className="absolute z-10"
                    style={{
                      left: CANVAS_CX,
                      top: CANVAS_CY,
                      x: "-50%",
                      y: "-50%",
                    }}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.05,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    <ProfileNode
                      onClick={() => {
                        setProfileOpen(true);
                        dispatchModalEvent(true);
                      }}
                    />
                  </motion.div>

                  {/* Project Nodes */}
                  {visible.map((project, i) => {
                    const { x, y } = getPosition(i, visible.length);
                    return (
                      <motion.div
                        key={project._id}
                        className="absolute z-10"
                        style={{
                          left: CANVAS_CX + x - CARD_HALF,
                          top: CANVAS_CY + y - CARD_HALF,
                        }}
                        initial={{ opacity: 0, scale: 0.3 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.3 + i * 0.06,
                          duration: 0.55,
                          type: "spring",
                          stiffness: 220,
                          damping: 22,
                        }}
                      >
                        <ProjectNode
                          project={project}
                          onClick={() => {
                            setSelectedProject(project);
                            dispatchModalEvent(true);
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>

      {/* Modals — outside canvas to avoid clipping */}
      <AnimatePresence>
        {profileOpen && (
          <ProfileModal
            onClose={() => {
              setProfileOpen(false);
              dispatchModalEvent(false);
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => {
              setSelectedProject(null);
              dispatchModalEvent(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
