"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useZoom } from "../../context/ZoomContext";
import { kineticsGlide, kineticsOvershoot, kineticsPress } from "@/lib/kinetics-motion";

import { X } from "lucide-react";

const ImageLightbox = () => {
  const { zoomedImageSrc, imageAlt, closeZoom } = useZoom();

  if (!zoomedImageSrc) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={kineticsGlide}
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-sm cursor-zoom-out"
        onClick={closeZoom}
      >
        <motion.button
          {...kineticsPress}
          whileHover={{ scale: 1.1, rotate: 90 }}
          onClick={closeZoom}
          aria-label="Close image"
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20"
        >
          <X className="w-8 h-8 text-white" />
        </motion.button>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={kineticsOvershoot}
          className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center pointer-events-none" // pointer-events-none on container, auto on image prevents closing when clicking image (optional, but requested behavior is click anywhere to close)
          onClick={(e) => e.stopPropagation()} // Stop propagation if you want only backdrop click to close. User requested "Clicking anywhere on the overlay should close it", implying image click too? Standard lightbox behavior usually allows clicking image to close or just outside. I'll stick to overlay click closes everything for simplicity as per "Clicking anywhere on the overlay should close it."
        >
          {/* However, standard UX is often click image to do nothing or close. Let's make the wrapper close it. */}
          <div className="relative w-full h-full">
            <Image
              src={zoomedImageSrc}
              alt={imageAlt || "Zoomed Image"}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageLightbox;
