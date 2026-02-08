"use client";

import Link from "next/link";
import { Home, Folder, Briefcase, Wrench, Pen } from "lucide-react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/work", icon: Folder, label: "Work" },
  { href: "/experience", icon: Briefcase, label: "Experience" },
  { href: "/toolkit", icon: Wrench, label: "Toolkit" },
  { href: "/contact", icon: Pen, label: "Contact" },
];

export default function FloatingNav() {
  const pathname = usePathname();

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-2 px-2 py-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "p-3 rounded-full transition-all duration-300 hover:scale-110 relative group",
                isActive ? "bg-white text-black" : "text-stone-400 hover:text-white hover:bg-white/10"
              )}
              aria-label={label}
            >
              <Icon className="w-5 h-5 relative z-10" />
              {/* Optional tooltip on hover could go here, but keeping it minimalist for now */}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
