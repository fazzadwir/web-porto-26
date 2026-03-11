"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Network } from "lucide-react";
import { urlFor } from "@/lib/sanity";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  categories: string[];
  status?: string;
}

const STEP = 4;

const SelectedWork = ({
  projects,
  onViewSchema,
  showAll = false,
}: {
  projects: Project[];
  onViewSchema?: () => void;
  showAll?: boolean;
}) => {
  const [visibleCount, setVisibleCount] = useState(STEP);
  const visibleProjects = showAll ? projects : projects.slice(0, visibleCount);
  const hasMore = !showAll && visibleCount < projects.length;
  return (
    <section
      id="selected-work"
      className="bg-zinc-800 py-24 px-6 md:px-16 w-full"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
          <div>
            <div className="h-fit">
              <h2 className="flex flex-col font-black uppercase leading-[0.85] tracking-tighter text-5xl md:text-[90px] mb-8">
                <span className="text-white">MY</span>
                <span className="text-stone-200">PROJECT</span>
              </h2>
            </div>
            <p className="text-zinc-300 text-lg md:text-xl max-w-lg">
              A curated selection of projects that showcase my expertise in
              design and development.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {onViewSchema && (
              <button
                onClick={onViewSchema}
                className="flex w-full sm:w-auto items-center justify-center text-stone-200 hover:text-zinc-800 hover:bg-white transition-colors group bg-zinc-800 rounded-full px-8 py-4 gap-2 border border-stone-600 hover:border-transparent"
              >
                <Network className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="text-lg font-medium tracking-wide">
                  Schema Space
                </span>
              </button>
            )}
            {!showAll && (
              <Link
                href="/work"
                className="flex w-full sm:w-auto items-center justify-center text-white hover:text-zinc-800 transition-colors group bg-zinc-800 hover:bg-white rounded-full px-8 py-4 gap-2 border border-transparent md:border-transparent"
              >
                <span className="text-lg font-medium tracking-wide">
                  View all work
                </span>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            )}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {visibleProjects.map((project, index) => {
            const isPrivate = project.status === "private";

            const CardContent = (
              <>
                {/* Background Image with Hover Scale */}
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                  {project.mainImage && (
                    <Image
                      src={urlFor(project.mainImage)
                        .width(1600)
                        .quality(100)
                        .url()}
                      alt={project.title}
                      fill
                      className={`object-cover ${
                        isPrivate ? "blur-xl scale-110" : ""
                      }`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 700px"
                      suppressHydrationWarning
                      priority={index < 2}
                    />
                  )}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 transition-all duration-500 group-hover:from-black/90" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-8 w-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white text-2xl font-semibold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-base">
                        {project.categories?.[0]}
                      </p>
                    </div>
                    {!isPrivate && (
                      <div>
                        <ArrowUpRight className="text-white w-6 h-6" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Badge for Private Projects */}
                {isPrivate && (
                  <div className="absolute top-4 right-4 bg-zinc-800/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold border border-white/20 z-10">
                    Private
                  </div>
                )}
              </>
            );

            return (
              <Link
                href={`/project/${project.slug.current}`}
                key={project._id}
                prefetch={false}
                className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-900 cursor-pointer block"
              >
                {CardContent}
              </Link>
            );
          })}
        </div>

        {/* Show More button */}
        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() =>
                setVisibleCount((c) => Math.min(c + STEP, projects.length))
              }
              className="group flex items-center gap-2 border border-white/20 hover:border-white/50 text-white/70 hover:text-white rounded-full px-8 py-3.5 text-lg font-medium transition-all duration-300 hover:bg-white/5"
            >
              Show More
              <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SelectedWork;
