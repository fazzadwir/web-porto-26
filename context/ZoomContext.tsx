"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function ZoomProvider({ children }: { children: React.ReactNode }) {
  const [zoomedImageSrc, setZoomedImageSrc] = useState<string | null>(null);
  const [imageAlt, setImageAlt] = useState<string>("");

  const openZoom = (src: string, alt: string) => {
    setZoomedImageSrc(src);
    setImageAlt(alt);
    document.body.style.overflow = "hidden";
  };

  const closeZoom = () => {
    setZoomedImageSrc(null);
    setImageAlt("");
    document.body.style.overflow = "";
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeZoom();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <ZoomContext.Provider
      value={{ zoomedImageSrc, imageAlt, openZoom, closeZoom }}
    >
      {children}
      <AnimatePresence>
        {zoomedImageSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out"
            onClick={closeZoom}
          >
            {/* Image Container with Animation */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full h-full max-w-[95vw] max-h-[95vh] p-4 flex items-center justify-center pointer-events-none"
            >
              <div className="relative w-full h-full pointer-events-auto">
                <Image
                  src={zoomedImageSrc}
                  alt={imageAlt || "Zoomed view"}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </motion.div>

            <button
              onClick={closeZoom}
              className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50 pointer-events-auto"
              aria-label="Close zoom"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </ZoomContext.Provider>
  );
}

// Create Context
type ZoomContextType = {
  zoomedImageSrc: string | null;
  imageAlt: string;
  openZoom: (src: string, alt: string) => void;
  closeZoom: () => void;
};

const ZoomContext = React.createContext<ZoomContextType | undefined>(undefined);

// Hook for using context
export function useZoom() {
  const context = React.useContext(ZoomContext);
  if (context === undefined) {
    throw new Error("useZoom must be used within a ZoomProvider");
  }
  return context;
}
