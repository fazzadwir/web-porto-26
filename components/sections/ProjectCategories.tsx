import Image from "next/image";
import Link from "next/link";
import KineticHeading from "@/components/ui/KineticHeading";

const categories = [
  {
    title: ["INTERFACE", "DESIGN"],
    href: "/work?section=interface",
    image: "/projects/interface-design.png",
    imageAlt: "Dashboard and mobile interface design preview",
    background: "bg-[#666bea]",
    titleColor: "text-[#f7f5f2]",
    mobileAspect: "aspect-[595/542]",
    artworkClass:
      "left-[3%] top-[35%] h-[110%] w-[108%] sm:left-auto sm:bottom-auto sm:right-[1%] sm:-top-[2%] sm:h-[190%] sm:w-[58%] lg:w-[54%]",
  },
  {
    title: ["VISUAL", "DESIGN"],
    href: "/work?section=visual",
    image: "/projects/visual-design.png",
    imageAlt: "Collection of colorful visual design marks",
    background: "bg-[#28dfa1]",
    titleColor: "text-[#064f3e]",
    mobileAspect: "aspect-[595/447]",
    artworkClass:
      "left-[8.6%] top-[30%] h-[97.5%] w-[99.8%] sm:left-auto sm:top-auto sm:-bottom-[25%] sm:-right-[5%] sm:h-[142%] sm:w-[58%] lg:w-[54%]",
  },
  {
    title: ["MOTION", "DESIGN"],
    href: "/work?section=motion",
    image: "/projects/motion-design.png",
    imageAlt: "Colorful three-dimensional motion design forms",
    background: "bg-[#dafa4d]",
    titleColor: "text-[#526400]",
    mobileAspect: "aspect-[6/5]",
    artworkClass:
      "-left-[3%] top-[13%] h-[106%] w-[106%] sm:left-auto sm:bottom-auto sm:-right-[21%] sm:-top-[59%] sm:h-[230%] sm:w-[78%]",
  },
];

export default function ProjectCategories() {
  return (
    <section
      id="selected-work"
      className="bg-[#FAF9F6] px-5 py-24 sm:px-8 sm:py-32 lg:px-16 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1220px]">
        <header className="mb-12 max-w-xl sm:mb-16">
          <KineticHeading className="flex flex-col font-black uppercase leading-[0.82] tracking-[-0.065em] text-[56px] sm:text-[72px] lg:text-[82px]">
            <span className="text-[#252529]">MY</span>
            <span className="text-[#c9c5c3]">PROJECT</span>
          </KineticHeading>
          <p className="mt-7 max-w-[520px] text-base leading-relaxed text-[#4a4a4e] sm:text-lg">
            A curated selection of projects that showcase my expertise in
            design and development.
          </p>
        </header>

        <div className="flex flex-col gap-5 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.title[0]}
              href={category.href}
              aria-label={`Explore ${category.title.join(" ").toLowerCase()} projects`}
              style={{
                boxShadow:
                  "0 33px 9px 0 rgba(0, 0, 0, 0), 0 21px 8px 0 rgba(0, 0, 0, 0.03), 0 12px 7px 0 rgba(0, 0, 0, 0.10), 0 5px 5px 0 rgba(0, 0, 0, 0.18), 0 1px 3px 0 rgba(0, 0, 0, 0.21)",
              }}
              className={`kinetics-lift group relative isolate block overflow-hidden rounded-[18px] border border-white/85 sm:aspect-auto sm:h-[330px] ${category.mobileAspect} ${category.background}`}
            >
              <div className="absolute left-0 top-0 z-10 flex pl-[9%] pt-[8.8%] sm:inset-y-0 sm:left-[7%] sm:items-center sm:p-0">
                <h3
                  className={`flex flex-col font-black uppercase leading-[0.82] tracking-[-0.055em] text-[10.2vw] sm:text-[52px] lg:text-[58px] ${category.titleColor}`}
                >
                  <span>{category.title[0]}</span>
                  <span>{category.title[1]}</span>
                </h3>
              </div>

              <div
                className={`pointer-events-none absolute transition-transform duration-700 group-hover:scale-[1.025] ${category.artworkClass}`}
              >
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 110vw, 720px"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
