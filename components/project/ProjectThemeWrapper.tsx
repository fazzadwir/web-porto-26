"use client";

import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Moon, Sun } from "lucide-react";

export default function ProjectThemeWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
    setMounted(true);
    const savedTheme = localStorage.getItem("project-detail-theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDark(true);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("project-detail-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("project-detail-theme", "light");
    }

    // Cleanup when leaving the detail page
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [isDark]);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var savedTheme = localStorage.getItem("project-detail-theme");
                if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                  document.documentElement.classList.add("dark");
                } else {
                  document.documentElement.classList.remove("dark");
                }
              } catch (e) {}
            })();
          `,
        }}
      />
      <div
        className={`min-h-screen bg-[#F9F5F0] dark:bg-[#121212] transition-colors ${
          mounted ? "duration-300" : "duration-0"
        }`}
      >
        <header
          className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-[#F9F5F0]/80 dark:bg-[#1e1e1e]/90 backdrop-blur-md shadow-sm border-b border-stone-200 dark:border-white/10"
              : "bg-transparent border-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 group py-2 rounded-full transition-all duration-300 text-stone-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-white"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-medium tracking-wide">
                Back to Home
              </span>
            </Link>

            <button
              onClick={() => setIsDark(!isDark)}
              className="p-3 rounded-full transition-colors bg-white/50 hover:bg-white border border-stone-200 text-stone-600 dark:bg-[#2a2a2a] dark:hover:bg-[#333333] dark:border-white/10 dark:text-zinc-300 shadow-sm flex-shrink-0"
              aria-label="Toggle Dark Mode"
            >
              {mounted ? (
                isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )
              ) : (
                <div className="w-5 h-5" /> // placeholder during SSR
              )}
            </button>
          </div>
        </header>

        <div className="pt-20">{children}</div>
      </div>
    </>
  );
}
