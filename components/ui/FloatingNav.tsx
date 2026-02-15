"use client";

import Link from "next/link";
import { Home, Folder, Briefcase, Wrench, Pen } from "lucide-react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/work", icon: Folder, label: "Work" },
  { href: "/experience", icon: Briefcase, label: "Experience" },
  { href: "/toolkit", icon: Wrench, label: "Toolkit" },
  { href: "/contact", icon: Pen, label: "Contact" },
];

export default function FloatingNav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | number | null>(null);

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

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
    >
      <nav className="flex items-center gap-2 px-2 py-2 bg-zinc-800/80 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "p-3 rounded-full transition-all duration-300 hover:scale-110 relative group",
                isActive
                  ? "bg-white text-zinc-800"
                  : "text-stone-400 hover:text-white hover:bg-white/10",
              )}
              aria-label={label}
            >
              <Icon className="w-5 h-5 relative z-10" />
              {/* Optional tooltip on hover could go here, but keeping it minimalist for now */}
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
}
