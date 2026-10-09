"use client";

import { Linkedin, Dribbble, Github } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import KineticHeading from "@/components/ui/KineticHeading";
import Reveal from "@/components/ui/Reveal";
import { kineticsPress } from "@/lib/kinetics-motion";

const MotionLink = motion.create(Link);

const Footer = () => {
  return (
    <footer className="bg-zinc-800 min-h-[50vh] py-32 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative gradient blob - optional but adds to "high-impact" */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <KineticHeading className="font-sans font-extrabold text-white text-4xl md:text-6xl lg:text-[90px] leading-tight tracking-tight mb-12">
          Let&apos;s build something <br className="hidden md:block" />
          scalable together.
        </KineticHeading>

        <Reveal delay={0.15} className="flex items-center justify-center gap-8 md:gap-10">
          <SocialLink
            href="https://www.linkedin.com/in/fazza-dwi-riandy/"
            icon={<Linkedin />}
            label="LinkedIn"
          />
          <SocialLink
            href="https://dribbble.com/fazzadwiriandy"
            icon={<Dribbble />}
            label="Dribbble"
          />
          <SocialLink
            href="https://github.com/fazzadwir"
            icon={<Github />}
            label="GitHub"
          />
        </Reveal>
      </div>
    </footer>
  );
};

const SocialLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => {
  return (
    <MotionLink
      {...kineticsPress}
      whileHover={{ scale: 1.15, y: -4 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-stone-400 hover:text-white transition-colors duration-300"
      aria-label={label}
    >
      <div className="w-8 h-8 md:w-10 md:h-10 [&>svg]:w-full [&>svg]:h-full">
        {icon}
      </div>
    </MotionLink>
  );
};

export default Footer;
