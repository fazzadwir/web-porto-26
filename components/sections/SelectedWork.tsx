'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Finance Dashboard',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Lumina Branding',
    category: 'Brand Identity',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2500&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Echo Mobile App',
    category: 'Product Design',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Nexus System',
    category: 'Design Systems',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
  },
];

const SelectedWork = () => {
  return (
    <section id="selected-work" className="bg-black py-24 px-6 md:px-16 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="flex flex-col font-black uppercase leading-[0.85] tracking-tighter text-5xl md:text-[90px] mb-2">
              <span className="text-white">SELECTED</span>
              <span className="text-stone-500">WORK</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-lg mt-3">
              A collection of digital products, interface systems, and creative
              visual explorations.
            </p>
          </div>

          {/* Simple Filters */}
          <div className="flex gap-6 text-sm font-medium">
            <button className="text-white border-b border-white pb-1">
              All Work
            </button>
            <button className="text-gray-500 hover:text-white transition-colors pb-1">
              UI/UX Design
            </button>
            <button className="text-gray-500 hover:text-white transition-colors pb-1">
              Branding
            </button>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-900 cursor-pointer"
            >
              {/* Background Image with Hover Scale */}
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="flex items-center justify-between group-hover:translate-x-1 transition-transform duration-300">
                  <div>
                    <h3 className="text-white text-xl font-semibold mb-1">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{project.category}</p>
                  </div>
                  <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowUpRight className="text-white w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
