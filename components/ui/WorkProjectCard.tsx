"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Share2 } from "lucide-react";
import { kineticsPress } from "@/lib/kinetics-motion";

interface WorkProjectCardProps {
  title: string;
  slug: string;
  imageUrl: string | null;
  bg: string;
  isPrivate: boolean;
}

// Hover/focus reveals the overlay, title and share button; touch screens (no hover) show them always.
const REVEAL =
  "opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100";

/** Project card on the /work pages, shared by the Interface, Visual and Motion sections. */
export default function WorkProjectCard({ title, slug, imageUrl, bg, isPrivate }: WorkProjectCardProps) {
  const [copied, setCopied] = useState(false);
  const href = `/project/${slug}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked (insecure origin / permissions); the card link still works.
    }
  };

  return (
    <div
      className="kinetics-lift group relative overflow-hidden rounded-2xl"
      style={{
        backgroundColor: bg,
        aspectRatio: "4/4.2",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      {/* Image */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-[1.03] ${
          isPrivate ? "scale-110 blur-xl" : ""
        }`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="h-24 w-24 rounded-2xl bg-white/40" />
        )}
      </div>

      {/* Black overlay, bottom-to-top: 40% → 15% */}
      <div className={`pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 to-black/15 ${REVEAL}`} />

      {/* Whole-card link sits under the share button (a button can't live inside an <a>) */}
      {!isPrivate && (
        <Link href={href} prefetch={false} aria-label={`Open ${title}`} className="absolute inset-0 z-10" />
      )}

      {/* Project name */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6 ${REVEAL}`}
      >
        <p className="translate-y-2 text-[clamp(22px,2vw,30px)] font-bold leading-[1.1] tracking-tight text-white drop-shadow transition-transform duration-300 group-hover:translate-y-0">
          {title}
        </p>
      </div>

      {isPrivate ? (
        <div className="absolute right-3 top-3 z-20 rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
          Private
        </div>
      ) : (
        <motion.button
          {...kineticsPress}
          type="button"
          onClick={copyLink}
          aria-label={copied ? "Project link copied" : "Copy project link"}
          title={copied ? "Link copied" : "Copy link"}
          className={`absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1A1A1A] shadow-sm backdrop-blur-sm focus-visible:opacity-100 ${REVEAL}`}
        >
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Share2 className="h-4 w-4" />}
        </motion.button>
      )}
    </div>
  );
}
