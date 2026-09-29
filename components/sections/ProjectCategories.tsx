import Image from "next/image";
import Link from "next/link";
import KineticHeading from "@/components/ui/KineticHeading";

const categories = [
  {
    title: ["INTERFACE", "DESIGN"],
    image: "/projects/interface-design.png",
    imageAlt: "Dashboard and mobile interface design preview",
    background: "bg-[#666bea]",
    titleColor: "text-[#f7f5f2]",
    artworkClass:
      "-bottom-[26%] -right-[10%] h-[132%] w-[64%] sm:bottom-auto sm:right-[1%] sm:-top-[2%] sm:h-[190%] sm:w-[58%] lg:w-[54%]",
  },
  {
    title: ["VISUAL", "DESIGN"],
    image: "/projects/visual-design.png",
    imageAlt: "Collection of colorful visual design marks",
    background: "bg-[#28dfa1]",
    titleColor: "text-[#064f3e]",
    artworkClass:
      "-bottom-[20%] -right-[23%] h-[125%] w-[70%] sm:-bottom-[25%] sm:-right-[5%] sm:h-[142%] sm:w-[58%] lg:w-[54%]",
  },
  {
    title: ["MOTION", "DESIGN"],
    image: "/projects/motion-design.png",
    imageAlt: "Colorful three-dimensional motion design forms",
    background: "bg-[#dafa4d]",
    titleColor: "text-[#526400]",
    artworkClass:
      "-bottom-[25%] -right-[27%] h-[135%] w-[78%] sm:bottom-auto sm:-right-[21%] sm:-top-[59%] sm:h-[230%] sm:w-[78%]",
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
              href="/work"
              aria-label={`Explore ${category.title.join(" ").toLowerCase()} projects`}
              style={{
                boxShadow:
                  "0 33px 9px 0 rgba(0, 0, 0, 0), 0 21px 8px 0 rgba(0, 0, 0, 0.03), 0 12px 7px 0 rgba(0, 0, 0, 0.10), 0 5px 5px 0 rgba(0, 0, 0, 0.18), 0 1px 3px 0 rgba(0, 0, 0, 0.21)",
              }}
              className={`kinetics-lift group relative isolate block h-[250px] overflow-hidden rounded-[18px] border border-white/85 sm:h-[330px] ${category.background}`}
            >
              <div className="absolute inset-y-0 left-[7%] z-10 flex items-center">
                <h3
                  className={`flex flex-col font-black uppercase leading-[0.82] tracking-[-0.055em] text-[42px] sm:text-[52px] lg:text-[58px] ${category.titleColor}`}
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
                  sizes="(max-width: 640px) 80vw, 720px"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
