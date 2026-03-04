"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { urlFor } from "@/lib/sanity";
import { ZoomIn, ZoomOut, RotateCcw, ArrowUpRight, Lock } from "lucide-react";

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
}

interface CanvasViewProps {
  projects: Project[];
  /** When true, fills the parent container completely (used in full-screen schema mode) */
  fullscreen?: boolean;
}

// ─────────────────────────────────────────────
// Ring Layout Math
// ─────────────────────────────────────────────
const RING_CONFIG = [
  { maxItems: 5, radius: 360 }, // Ring 1: up to 5 items
  { maxItems: 10, radius: 720 }, // Ring 2: up to 10 items
];

const MAX_PROJECTS = RING_CONFIG.reduce((sum, r) => sum + r.maxItems, 0); // 15

function getPosition(
  index: number,
  totalProjects: number,
): { x: number; y: number } {
  const ring1Max = RING_CONFIG[0].maxItems;

  let indexInRing: number;
  let totalInRing: number;
  let radius: number;

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
const CARD_HALF = 128; // half of 256px card

// ─────────────────────────────────────────────
// SVG Connector Lines — light theme (stone tones)
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
          <line
            key={i}
            x1={CANVAS_CX}
            y1={CANVAS_CY}
            x2={CANVAS_CX + x}
            y2={CANVAS_CY + y}
            stroke="rgba(120,113,108,0.2)" /* stone-500 at 20% */
            strokeWidth={1}
            strokeDasharray="5 10"
          />
        );
      })}
    </svg>
  );
}

// ─────────────────────────────────────────────
// Profile Center Node — light theme
// ─────────────────────────────────────────────
function ProfileNode() {
  return (
    <div className="relative flex flex-col items-center gap-3 select-none z-10">
      {/* Ambient glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 180,
          height: 180,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(120,113,108,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Avatar */}
      <div className="relative w-24 h-24 rounded-full ring-2 ring-stone-300 ring-offset-4 ring-offset-stone-50 shadow-lg overflow-hidden bg-stone-200 flex items-center justify-center">
        <span className="text-2xl font-black text-stone-700 tracking-tighter select-none">
          FD
        </span>
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
      </div>

      {/* Name chip */}
      <div className="bg-white border border-stone-200 shadow-sm rounded-full px-4 py-1.5 whitespace-nowrap">
        <span className="text-xs font-semibold text-stone-600 tracking-widest uppercase">
          Fazza Dwi Riandy
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Project Card Node — light theme
// ─────────────────────────────────────────────
function ProjectNode({ project }: { project: Project }) {
  const isPrivate = project.status === "private";
  const imageUrl = project.mainImage
    ? urlFor(project.mainImage).width(400).url()
    : null;

  const inner = (
    <div
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
      {/* Project image */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
            isPrivate ? "blur-xl scale-110" : ""
          }`}
          sizes="256px"
          suppressHydrationWarning
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-100" />
      )}

      {/* Gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/65 backdrop-blur-[2px] px-5 text-center">
        <h3 className="text-white text-base font-bold leading-tight tracking-tight">
          {project.title}
        </h3>
        {project.categories?.[0] && (
          <span className="text-[11px] text-white/60 uppercase tracking-widest">
            {project.categories[0]}
          </span>
        )}
        {isPrivate ? (
          <div className="mt-2 inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs text-white/60 font-semibold">
            <Lock className="w-3 h-3" /> Restricted · View Details
          </div>
        ) : (
          <div className="mt-2 inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 rounded-full px-3 py-1 text-xs text-white font-semibold transition-colors">
            View Project <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      {/* Always-visible title strip */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white text-sm font-semibold truncate drop-shadow-lg">
          {project.title}
        </p>
      </div>

      {/* NDA badge */}
      {isPrivate && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm border border-stone-200 rounded-full px-2.5 py-1 shadow-sm">
          <Lock className="w-3 h-3 text-stone-500" />
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
            NDA
          </span>
        </div>
      )}
    </div>
  );

  return (
    <Link href={`/project/${project.slug.current}`} prefetch={false}>
      {inner}
    </Link>
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

  return (
    <div
      className={`relative w-full bg-stone-50 overflow-hidden ${
        fullscreen
          ? "h-full"
          : "h-[78vh] min-h-[520px] rounded-2xl border border-stone-200"
      }`}
    >
      {/* Dot-grid texture — dark dots on light bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(120,113,108,0.35) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Hint label */}
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
            {/* Zoom controls — light style */}
            <div className="absolute bottom-5 right-5 z-20 flex flex-col gap-2">
              {[
                { fn: () => zoomIn(), Icon: ZoomIn, label: "Zoom In" },
                { fn: () => zoomOut(), Icon: ZoomOut, label: "Zoom Out" },
                { fn: () => resetTransform(), Icon: RotateCcw, label: "Reset" },
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

            {/* Project count badge */}
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
              contentStyle={{ width: `${CANVAS_W}px`, height: `${CANVAS_H}px` }}
            >
              {/* Virtual canvas */}
              <div
                className="relative cursor-grab active:cursor-grabbing"
                style={{ width: CANVAS_W, height: CANVAS_H }}
              >
                {/* SVG connectors */}
                <ConnectorLines projects={visible} />

                {/* Radial glow at center */}
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

                {/* Center: Profile Node */}
                <div
                  className="absolute z-10"
                  style={{
                    left: CANVAS_CX,
                    top: CANVAS_CY,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <ProfileNode />
                </div>

                {/* Project Nodes */}
                {visible.map((project, i) => {
                  const { x, y } = getPosition(i, visible.length);
                  return (
                    <div
                      key={project._id}
                      className="absolute z-10"
                      style={{
                        left: CANVAS_CX + x - CARD_HALF,
                        top: CANVAS_CY + y - CARD_HALF,
                      }}
                    >
                      <ProjectNode project={project} />
                    </div>
                  );
                })}
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
