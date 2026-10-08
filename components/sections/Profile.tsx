"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "framer-motion";
import KineticHeading from "@/components/ui/KineticHeading";
import Reveal from "@/components/ui/Reveal";
import { kineticsOvershoot, kineticsSpring } from "@/lib/kinetics-motion";

const MotionImage = motion.create(Image);

// Silhouette rises in first; the shapes behind it pop in afterwards.
const silhouetteVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: kineticsOvershoot },
  hover: { y: -6, scale: 1.02, transition: kineticsSpring },
};

// Reveal lives on a wrapper and hover on the image inside, so the reveal delay
// never slows down the hover-out.
const shapeReveal = (delay: number): Variants => ({
  hidden: { opacity: 0, scale: 0.4, rotate: -25 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { ...kineticsOvershoot, delay } },
});

// Positions are % of the art box (742×660 in the design), measured from the mockup.
// Assets are whole shapes; the parts that bleed past the card are clipped by its overflow-hidden.
const shapes = [
  {
    src: "/profile_section/white-shape.svg",
    w: 380,
    h: 380,
    className: "left-[7.7%] -top-[19.9%] w-[52.6%] origin-bottom",
    delay: 0.45,
    hover: { y: -10, rotate: -6 },
  },
  {
    src: "/profile_section/blue-shape.svg",
    w: 368,
    h: 386,
    className: "left-[74.4%] top-[22.4%] w-[51.2%] origin-left",
    delay: 0.57,
    hover: { x: -10 },
  },
  {
    src: "/profile_section/green-shape.svg",
    w: 329,
    h: 289,
    className: "left-0 -bottom-[3.2%] w-[46.1%] origin-center",
    delay: 0.69,
    hover: { rotate: 30 },
  },
];

export default function Profile() {
  return (
    <section id="profile">
      <div className="relative flex w-full flex-col overflow-hidden bg-[#FCD000] lg:aspect-[3/1] lg:flex-row lg:items-center">
        {/* Text */}
        <div className="relative z-10 px-7 pt-10 sm:px-10 lg:w-[50%] lg:py-0 lg:pl-[6.7%] lg:pr-0">
          <KineticHeading className="font-black uppercase leading-[0.9] tracking-tighter text-[#5C4A00] text-[40px] sm:text-[48px] lg:text-[56px]">
            Hello, World
          </KineticHeading>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[520px] text-base leading-relaxed text-[#6B5600] sm:text-lg">
              Hi, I&apos;m Fazza Dwi Riandy, a UI/UX Designer who loves making the
              complicated feel simple. I blend structured thinking with bold
              visuals to create digital products that work well and look great.
            </p>
          </Reveal>
        </div>

        {/* Art: shapes first in DOM so they sit behind the silhouette */}
        <MotionConfig reducedMotion="user">
          <motion.div
            initial="hidden"
            whileInView="show"
            whileHover="hover"
            viewport={{ once: true, amount: 0.4 }}
            className="relative ml-auto mt-6 aspect-[742/660] w-[85%] max-w-[520px] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-full lg:w-auto lg:max-w-none"
          >
            {shapes.map((s) => (
              <motion.div
                key={s.src}
                variants={shapeReveal(s.delay)}
                className={`pointer-events-none absolute ${s.className}`}
              >
                <MotionImage
                  src={s.src}
                  alt=""
                  aria-hidden
                  width={s.w}
                  height={s.h}
                  unoptimized
                  variants={{ hover: { ...s.hover, transition: kineticsSpring } }}
                  className="h-auto w-full"
                />
              </motion.div>
            ))}
            <MotionImage
              src="/profile_section/profile-silliette.svg"
              alt="Silhouette portrait of Fazza Dwi Riandy"
              width={656}
              height={623}
              unoptimized
              variants={silhouetteVariants}
              className="absolute bottom-0 right-0 h-auto w-[91%] origin-bottom"
            />
          </motion.div>
        </MotionConfig>
      </div>
    </section>
  );
}
