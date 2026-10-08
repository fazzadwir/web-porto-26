"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig, type Variants } from "framer-motion";
import { kineticsOvershoot, kineticsSpring } from "@/lib/kinetics-motion";

const MotionImage = motion.create(Image);

type Asset = {
  src: string;
  w: number;
  h: number;
  /** Figma position at 1:1, as % of the 640×680 card (left/width ÷ 640, top ÷ 680).
   *  Assets are whole shapes; whatever bleeds past the card is clipped by overflow-hidden. */
  className: string;
  hover: Record<string, number>;
};

const VD = "/new_work_category/visual_design";
const MD = "/new_work_category/motion_design";

const categories: {
  title: [string, string];
  description: string;
  href: string;
  bg: string;
  ink: string;
  assets: Asset[];
}[] = [
  {
    title: ["Interface", "Design"],
    description: "Dashboards, apps and design systems built around how people actually work.",
    href: "/work?section=interface",
    bg: "#666bea",
    ink: "#f7f5f2",
    assets: [
      {
        src: "/projects/interface-design.png",
        w: 1059,
        h: 979,
        className: "left-[1.6%] top-[45.4%] w-[107%]",
        hover: { y: -12 },
      },
    ],
  },
  {
    title: ["Visual", "Design"],
    description: "Logos, brand identities and social media posts.",
    href: "/work?section=visual",
    bg: "#2ce590",
    ink: "#064f3e",
    assets: [
      { src: `${VD}/VD-logo-cp.webp`, w: 479, h: 429, className: "-left-[29.8%] top-[22%] w-[74.8%]", hover: { rotate: -6, scale: 1.05 } },
      { src: `${VD}/VD-logo-frog.webp`, w: 485, h: 295, className: "left-[35.2%] top-[27.4%] w-[75.8%]", hover: { rotate: 4, y: -8 } },
      { src: `${VD}/VD-logo-cloudra.webp`, w: 387, h: 404, className: "-left-[4.1%] top-[65.3%] w-[60.5%]", hover: { y: -12, rotate: -4 } },
      { src: `${VD}/VP-logo-onmeeting.webp`, w: 463, h: 463, className: "left-[50%] top-[58.8%] w-[72.3%]", hover: { y: -10, rotate: 6 } },
    ],
  },
  {
    title: ["Motion", "Design"],
    description: "Motion graphics and microinteractions that make interfaces feel alive.",
    href: "/work?section=motion",
    bg: "#dcf154",
    ink: "#526400",
    assets: [
      { src: `${MD}/MD-shape-orange.webp`, w: 504, h: 504, className: "-left-[33.6%] top-[25.9%] w-[78.75%]", hover: { x: 10, rotate: -4 } },
      { src: `${MD}/MD-shape-pink.webp`, w: 729, h: 740, className: "left-[31.7%] -top-[2.2%] w-[113.9%]", hover: { y: -14, rotate: 3 } },
      { src: `${MD}/MD-shape-green.webp`, w: 686, h: 686, className: "left-[9.7%] top-[42.6%] w-[107.2%]", hover: { x: -12 } },
    ],
  },
];

// Card fades up on scroll; its artwork pops in right after.
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...kineticsOvershoot, delay: i * 0.1, delayChildren: i * 0.1 + 0.2, staggerChildren: 0.08 },
  }),
};

// Reveal sits on a wrapper and hover on the image inside, so the reveal timing
// never delays the hover-out.
const assetReveal: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: kineticsOvershoot },
};

export default function ProjectCategories() {
  return (
    <section id="selected-work" className="bg-[#FAF9F6]">
      <MotionConfig reducedMotion="user">
        <div className="grid w-full grid-cols-1 md:grid-cols-3">
          {categories.map((category, i) => (
            <Link
              key={category.href}
              href={category.href}
              aria-label={`Explore ${category.title.join(" ").toLowerCase()} projects`}
              className="block"
            >
              <motion.div
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                whileHover="hover"
                viewport={{ once: true, amount: 0.3 }}
                style={{ backgroundColor: category.bg, color: category.ink }}
                className="relative isolate aspect-[640/680] overflow-hidden [container-type:inline-size]"
              >
                {category.assets.map((a) => (
                  <motion.div
                    key={a.src}
                    variants={assetReveal}
                    className={`pointer-events-none absolute ${a.className}`}
                  >
                    <MotionImage
                      src={a.src}
                      alt=""
                      aria-hidden
                      width={a.w}
                      height={a.h}
                      // Card is 1/3 of the viewport on desktop, full width on mobile; art can bleed past it
                      sizes="(min-width: 768px) 40vw, 110vw"
                      variants={{ hover: { ...a.hover, transition: kineticsSpring } }}
                      className="h-auto w-full"
                    />
                  </motion.div>
                ))}

                <div className="relative z-10 px-[6.4%] pt-[6.5%]">
                  <h3 className="flex flex-col font-black uppercase leading-[0.82] tracking-[-0.055em] text-[11.25cqw]">
                    <span>{category.title[0]}</span>
                    <span>{category.title[1]}</span>
                  </h3>
                  <p className="mt-[3cqw] max-w-[92%] text-[3cqw] leading-snug opacity-90">
                    {category.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </MotionConfig>
    </section>
  );
}
