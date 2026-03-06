"use client";

import Link from "next/link";
import { Home, Folder, Briefcase, Wrench, Pen, ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/work", icon: Folder, label: "Work" },
  { href: "/experience", icon: Briefcase, label: "Experience" },

  { href: "/contact", icon: Pen, label: "Contact" },
];

export default function FloatingNav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isSchemaMode, setIsSchemaMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | number | null>(null);

  // Don't render on Sanity Studio pages
  if (pathname.startsWith("/studio")) {
    return null;
  }

  const isProjectDetail = pathname.startsWith("/project/");

  // Listen for viewMode changes from PortfolioWrapper
  useEffect(() => {
    const handleViewModeChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setIsSchemaMode(customEvent.detail === "schema");
    };

    window.addEventListener("viewModeChange", handleViewModeChange);

    const handleModalChange = (e: Event) => {
      setModalOpen((e as CustomEvent<boolean>).detail);
    };
    window.addEventListener("modalOpenChange", handleModalChange);

    return () => {
      window.removeEventListener("viewModeChange", handleViewModeChange);
      window.removeEventListener("modalOpenChange", handleModalChange);
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Top of page: Always visible
    if (latest < 50) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setVisible(true);
      return;
    }

    // While scrolling: Hide immediately
    setVisible(false);

    // Debounce (Detect Stop): Show after 600ms of inactivity
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setVisible(true);
    }, 600);
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // True visibility combines scroll state and schema mode state
  const shouldShow = visible && !isSchemaMode && !modalOpen;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: shouldShow ? 0 : -100,
        opacity: shouldShow ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
    >
      <nav className="flex items-center gap-1 md:gap-2 px-1.5 md:px-2 py-1.5 md:py-2 bg-zinc-800/80 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
        {isProjectDetail ? (
          <Link
            href="/"
            className="flex items-center gap-2 group p-2 md:p-3 pr-4 md:pr-5 rounded-full transition-all duration-300 text-stone-200 hover:text-zinc-800 hover:bg-white"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium tracking-wide translate-y-[1px]">
              Back to Home
            </span>
          </Link>
        ) : (
          navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 relative group",
                  isActive
                    ? "bg-white text-zinc-800"
                    : "text-stone-400 hover:text-white hover:bg-white/10",
                )}
                aria-label={label}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5 relative z-10" />
              </Link>
            );
          })
        )}
      </nav>
    </motion.div>
  );
}
