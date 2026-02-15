"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { urlFor } from "@/lib/sanity"; // Adjust path if needed

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  categories: string[];
  status?: string;
}

const SelectedWork = ({ projects }: { projects: Project[] }) => {
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

          <Link
            href="/work"
            className="hidden md:flex items-center text-white hover:text-zinc-800 transition-colors group bg-zinc-800 hover:bg-white rounded-full px-8 py-4 gap-2"
          >
            <span className="text-lg font-medium">View all work</span>
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 hover:text-zinc-800" />
          </Link>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project) => {
            const isPrivate = project.status === "private";

            const CardContent = (
              <>
                {/* Background Image with Hover Scale */}
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                  {project.mainImage && (
                    <Image
                      src={urlFor(project.mainImage).url()}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      suppressHydrationWarning
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
                  <div className="absolute top-4 right-4 bg-zinc-800/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold border border-white/20 z-10">
                    Coming Soon
                  </div>
                )}
              </>
            );

            if (isPrivate) {
              return (
                <div
                  key={project._id}
                  className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-900 cursor-not-allowed block select-none"
                >
                  {CardContent}
                </div>
              );
            }

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
      </div>
    </section>
  );
};

export default SelectedWork;
