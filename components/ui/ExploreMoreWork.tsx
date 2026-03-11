"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { Lock } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  categories: string[];
  status?: string;
}

interface ExploreMoreWorkProps {
  projects: Project[];
  currentSlug: string;
}

export default function ExploreMoreWork({
  projects,
  currentSlug,
}: ExploreMoreWorkProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  // ── Drag-to-scroll handlers ──
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    scrollStartX.current = scrollRef.current?.scrollLeft ?? 0;
    document.body.style.userSelect = "none";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const delta = e.clientX - dragStartX.current;
    scrollRef.current.scrollLeft = scrollStartX.current - delta;
  };

  const onMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = "";
  };

  if (!projects.length) return null;

  return (
    <section className="w-full py-20 border-t border-stone-200 dark:border-white/10">
      {/* Header */}
      <div className="px-6 max-w-7xl mx-auto mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-zinc-800 dark:text-zinc-200">
          Explore More Work
        </h2>
      </div>

      {/* Horizontal scroll track — left padding matches max-w-7xl container edge */}
      <div
        ref={scrollRef}
        className={`flex gap-5 overflow-x-auto pb-6 scrollbar-hide scroll-smooth pl-24 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          paddingLeft: "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))",
          paddingRight: "1.5rem",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {projects.map((project) => {
          const isCurrent = project.slug.current === currentSlug;
          const isPrivate = project.status === "private";
          const imageUrl = project.mainImage
            ? urlFor(project.mainImage).width(640).quality(90).url()
            : null;

          return (
            <Link
              key={project._id}
              href={`/project/${project.slug.current}`}
              draggable={false}
              onClick={(e) => isDragging && e.preventDefault()}
              className="group relative flex-shrink-0 w-72 md:w-80 rounded-2xl overflow-hidden bg-stone-100 dark:bg-[#1e1e1e] border border-stone-200 dark:border-white/10 transition-all duration-300 hover:shadow-xl hover:border-stone-300 dark:hover:border-white/20 hover:-translate-y-1"
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={project.title}
                    fill
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                      isPrivate ? "blur-xl scale-110" : ""
                    }`}
                    sizes="320px"
                    draggable={false}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-100 dark:from-[#2a2a2a] dark:to-[#1e1e1e]" />
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* "Currently Viewing" badge */}
                {isCurrent && (
                  <div className="absolute top-3 left-3 bg-zinc-800 text-white text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    Currently Viewing
                  </div>
                )}

                {/* NDA badge */}
                {isPrivate && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 dark:bg-[#1e1e1e]/90 backdrop-blur-sm border border-stone-200 dark:border-white/10 rounded-full px-2.5 py-1">
                    <Lock className="w-3 h-3 text-stone-500 dark:text-zinc-400" />
                    <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                      NDA
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 bg-white dark:bg-[#1e1e1e]">
                <h3
                  className={`text-sm font-semibold truncate mb-1 ${
                    isCurrent
                      ? "text-stone-400 dark:text-zinc-500"
                      : "text-zinc-800 dark:text-zinc-200"
                  }`}
                >
                  {project.title}
                </h3>
                {project.categories?.[0] && (
                  <p className="text-xs text-stone-400 uppercase tracking-widest truncate">
                    {project.categories[0]}
                  </p>
                )}
              </div>

              {/* Current indicator bar */}
              {isCurrent && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-800 dark:bg-zinc-200" />
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
