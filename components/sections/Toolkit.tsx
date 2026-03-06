"use client";

import React from "react";
import { tools } from "@/lib/tools-data";

function ToolPill({
  name,
  Icon,
  color,
}: {
  name: string;
  Icon: React.ComponentType<{ color?: string; size?: number }>;
  color: string;
}) {
  return (
    <div
      className="flex items-center gap-3 bg-zinc-700/60 rounded-xl px-5 py-3 mx-3 flex-shrink-0 select-none border border-white/10"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
    >
      {/* SVG Icon */}
      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
        <Icon color={color} size={22} />
      </div>
      {/* Name */}
      <span className="text-base font-medium text-zinc-200 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

const Toolkit = () => {
  return (
    <section className="w-full bg-zinc-800 py-10 overflow-hidden">
      {/* Section label */}
      <p className="text-center text-lg font-semibold text-zinc-400 uppercase tracking-[0.2em] mb-8">
        The Toolkit
      </p>

      {/* Mask edges for a fade-in/out effect */}
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        {/* Track — duplicated list for seamless loop */}
        <div className="animate-marquee">
          {tools.map((tool) => (
            <ToolPill
              key={tool.name}
              name={tool.name}
              Icon={tool.Icon}
              color={tool.color}
            />
          ))}
          {tools.map((tool) => (
            <ToolPill
              key={`dup-${tool.name}`}
              name={tool.name}
              Icon={tool.Icon}
              color={tool.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Toolkit;
