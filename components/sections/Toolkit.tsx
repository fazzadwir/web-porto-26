'use client';

import React from 'react';
import Image from 'next/image';

const designTools = [
  { name: 'Figma', icon: '/app-logo/figma-logo.png' },
  { name: 'Framer', icon: '/app-logo/framer-logo.png' },
  { name: 'Sketch', icon: '/app-logo/sketch-logo.png' },
  { name: 'Affinity', icon: '/app-logo/affinity-logo.png' },
  { name: 'Adobe Illustrator', icon: '/app-logo/adobe-logo.png' },
  { name: 'Whimsical', icon: '/app-logo/whim-logo.png' },
];

const devTools = [
  { name: 'Arc/Gravity', icon: '/app-logo/gravity-logo.png' },
  { name: 'VS Code', icon: '/app-logo/vscode-logo.png' },
  { name: 'Gemini', icon: '/app-logo/gemini-logo.png' },
  { name: 'ChatGPT', icon: '/app-logo/chat-logo.png' },
];

const customShadow =
  '0 33px 9px 0 rgba(0, 0, 0, 0.00), 0 21px 9px 0 rgba(0, 0, 0, 0.01), 0 12px 7.5px 0 rgba(0, 0, 0, 0.05), 0 6px 6px 0 rgba(0, 0, 0, 0.09), 0 1.5px 3px 0 rgba(0, 0, 0, 0.10)';

const ToolIcon = ({ name, icon }: { name: string; icon: string }) => (
  <div
    className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-3xl bg-white"
    style={{ boxShadow: customShadow }}
    title={name}
  >
    <div className="relative h-16 w-16">
      <Image
        src={icon}
        alt={name}
        fill
        className="object-contain"
        sizes="64px"
      />
    </div>
  </div>
);

const Toolkit = () => {
  return (
    <section className="w-full bg-white py-24 text-stone-900">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        {/* Header content */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 flex flex-col items-center font-black uppercase leading-[0.85] tracking-tighter text-5xl md:text-[90px] lg:text-[100px]">
            <span className="text-stone-900">THE</span>
            <span className="text-stone-400">TOOLKIT</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-stone-600">
            Bridging the gap between creative vision and technical feasibility.
          </p>
        </div>

        {/* Two Outer Cards Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          
          {/* Card 1: Design & Creative */}
          <div className="flex flex-col items-center rounded-[32px] border border-stone-200 bg-stone-50 p-8 text-center md:p-10">
            <h3 className="mb-8 text-xl font-semibold text-gray-500">
              Design & Creative
            </h3>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              {designTools.map((tool) => (
                <ToolIcon key={tool.name} name={tool.name} icon={tool.icon} />
              ))}
            </div>
          </div>

          {/* Card 2: Development */}
          <div className="flex flex-col items-center rounded-[32px] border border-stone-200 bg-stone-50 p-8 text-center md:p-10">
            <h3 className="mb-8 text-xl font-semibold text-gray-500">
              Development
            </h3>
            <div className="grid grid-cols-2 gap-8">
              {devTools.map((tool) => (
                <ToolIcon key={tool.name} name={tool.name} icon={tool.icon} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Toolkit;
