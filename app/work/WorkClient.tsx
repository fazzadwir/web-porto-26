"use client";

import { useState } from "react";
import WorkNav, { WorkSection } from "@/components/ui/WorkNav";
import InterfaceSection from "@/components/sections/InterfaceSection";
import VisualSection from "@/components/sections/VisualSection";
import MotionSection from "@/components/sections/MotionSection";
import Footer from "@/components/sections/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { kineticsSpring } from "@/lib/kinetics-motion";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  categories?: string[];
  category?: string;
  subcategory?: string;
  status?: string;
  section?: string;
}

interface WorkClientProps {
  projects: Project[];
  initialSection?: WorkSection;
}

export default function WorkClient({
  projects,
  initialSection = "interface",
}: WorkClientProps) {
  const [activeSection, setActiveSection] = useState<WorkSection>(initialSection);

  const handleSectionChange = (section: WorkSection) => {
    setActiveSection(section);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("section", section);
      window.history.replaceState({}, "", url.toString());
    }
  };

  return (
    <main className="min-h-screen">
      {/* Custom work-page floating nav */}
      <WorkNav
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Section content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={kineticsSpring}
        >
          {activeSection === "interface" && (
            <InterfaceSection projects={projects} />
          )}

          {activeSection === "visual" && (
            <VisualSection projects={projects} />
          )}

          {activeSection === "motion" && (
            <MotionSection projects={projects} />
          )}
        </motion.div>
      </AnimatePresence>

      <Footer />
    </main>
  );
}

function ComingSoon({
  label,
  color,
  textColor,
}: {
  label: string;
  color: string;
  textColor: string;
}) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-4"
      style={{ backgroundColor: color }}
    >
      <h2
        className="font-black uppercase text-5xl md:text-7xl tracking-tighter leading-none"
        style={{ color: textColor }}
      >
        {label}
      </h2>
      <p style={{ color: textColor }} className="text-base opacity-70">
        Coming soon — stay tuned.
      </p>
    </div>
  );
}
