'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { urlFor } from '@/lib/sanity'; // Adjust path if needed

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  categories: string[];
}

const SelectedWork = ({ projects }: { projects: Project[] }) => {
  return (
    <section id="selected-work" className="bg-black py-24 px-6 md:px-16 w-full">
      <div className="max-w-7xl mx-auto">
        {/* ... (Header remains) */}

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <Link
              href={`/project/${project.slug.current}`}
              key={project._id}
              prefetch={false}
              className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-900 cursor-pointer block"
            >
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
                  <div>
                    <ArrowUpRight className="text-white w-6 h-6" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
