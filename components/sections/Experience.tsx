"use client";

import React from "react";

const experiences = [
  {
    id: 1,
    company: "PT. Awan Data Indonesia",
    date: "2025 - Present",
    description:
      "Responsible for designing complex IaaS/PaaS dashboards and managing corporate visual assets. Beyond high-fidelity prototyping, I bridge the gap to development by occasionally stepping in to slice key interfaces into frontend code, ensuring pixel-perfect implementation when needed.",
  },
  {
    id: 2,
    company: "PT. Kita Bantu Indonesia",
    date: "March 2025 - June 2025",
    description:
      "Accelerated product validation through strategic wireframing and rapid prototyping. Focused on high-impact features and seamless developer handoffs, ensuring designs were not just visually pleasing but technically feasible for immediate deployment.",
  },
];

const Experience = () => {
  return (
    <section className="bg-white py-24 w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left Column: Sticky Header */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-32 h-fit">
              <h2 className="flex flex-col font-black uppercase leading-[0.85] tracking-tighter text-5xl md:text-[90px] mb-2">
                <span className="text-zinc-800">WORK</span>
                <span className="text-stone-400">EXPERIENCE</span>
              </h2>
              <p className="text-stone-500 text-lg max-w-sm mt-3">
                Bridging the gap between creative vision and technical
                feasibility.
              </p>
            </div>
          </div>

          {/* Right Column: Experience List */}
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-8">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-stone-50 p-8 md:p-8 rounded-2xl border border-stone-200"
              >
                <div className="mb-2">
                  <h3 className="text-2xl font-bold text-zinc-800 mb-1">
                    {exp.company}
                  </h3>
                  <span className="text-sm font-medium text-stone-400 block uppercase tracking-wide">
                    {exp.date}
                  </span>
                </div>
                <p className="text-stone-600 leading-relaxed text-lg">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
