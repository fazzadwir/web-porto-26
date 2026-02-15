"use client";

import React from "react";
import Image, { ImageProps } from "next/image";
import { useZoom } from "@/context/ZoomContext";
import { clsx } from "clsx";

interface ZoomableImageProps extends Omit<ImageProps, "onClick"> {
  className?: string;
  zoomImageSrc?: string; // Optional: specify a higher-res image for zoom if main src is small
}

const ZoomableImage = ({
  src,
  alt,
  className,
  zoomImageSrc,
  ...props
}: ZoomableImageProps) => {
  const { openZoom } = useZoom();

  const handleZoom = () => {
    // Use the explicit zoomImageSrc if provided, otherwise the main src (which might be an object)
    const imageToZoom =
      zoomImageSrc || (typeof src === "string" ? src : (src as any).src || "");
    if (imageToZoom) {
      openZoom(imageToZoom, alt || "Project Image");
    }
  };

  return (
    <div
      onClick={handleZoom}
      className={clsx(
        "relative w-full h-full cursor-zoom-in group overflow-hidden transition-transform hover:scale-[1.01] active:scale-[0.99]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        className="object-cover transition-opacity duration-300"
        {...props}
      />

      {/* Optional: Overlay hint */}
      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5 pointer-events-none" />
    </div>
  );
};

export default ZoomableImage;
