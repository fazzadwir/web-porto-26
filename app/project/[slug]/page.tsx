import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { ZoomProvider } from "@/context/ZoomContext";
import ZoomableImage from "@/components/ui/ZoomableImage";
import ExploreMoreWork from "@/components/ui/ExploreMoreWork";
import ProjectThemeWrapper from "@/components/project/ProjectThemeWrapper";

export const revalidate = 60;

// Define params type for Next.js 15
type Props = {
  params: Promise<{ slug: string }>;
};

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-10 relative">
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100 shadow-sm border border-stone-100">
            <ZoomableImage
              src={urlFor(value).url()}
              alt={value.alt || "Project Detail"}
              fill
              className="object-cover"
              sizes="(max-width: 800px) 100vw, 800px"
              suppressHydrationWarning
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-stone-500 font-medium tracking-wide">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default async function ProjectPage({ params }: Props) {
  // Await params in Next.js 15
  const { slug } = await params;

  const query = `*[_type == "project" && slug.current == $slug][0] {
    title,
    shortDescription,
    projectOverview,
    roles,
    timeline,
    company,
    technologies,
    mainImage,
    body,
    showcaseImage1,
    showcaseImagesTwoColumn,
    showcaseImageLast,
    closingStatement,
    status
  }`;

  const [project, allProjects] = await Promise.all([
    client.fetch(query, { slug }),
    client.fetch(
      `*[_type == "project"] | order(publishedAt desc) {
        _id, title, slug, status, mainImage, categories
      }`,
    ),
  ]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F9F5F0] flex items-center justify-center">
        <h1 className="text-4xl font-semibold text-gray-800">
          Project not found
        </h1>
        <Link href="/" className="ml-4 text-blue-600 hover:underline">
          Go Home
        </Link>
      </div>
    );
  }

  // Check if the project is private
  if (project.status === "private") {
    return (
      <main className="min-h-screen bg-[#F9F5F0] text-zinc-800 font-sans flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="bg-stone-200/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-stone-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold mb-4">Project Restricted</h1>
          <p className="text-stone-500 mb-8 leading-relaxed">
            This project cannot be shown yet because it is under an NDA
            (Non-Disclosure Agreement) or is still in development.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-zinc-800 text-white px-6 py-3 rounded-full hover:bg-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <ZoomProvider>
      <ProjectThemeWrapper>
        <main className="text-zinc-800 dark:text-zinc-200 font-sans selection:bg-stone-200 dark:selection:bg-zinc-800 selection:text-zinc-800 dark:selection:text-zinc-200">
          {/* Main Content */}
          <section className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-semibold mb-4 tracking-tighter leading-none">
                {project.title}
              </h1>
              {project.shortDescription && (
                <p className="text-xl md:text-2xl text-stone-500 dark:text-zinc-300 font-medium max-w-3xl">
                  {project.shortDescription}
                </p>
              )}
            </div>

            {/* Overview Box */}
            {project.projectOverview && (
              <div className="border border-stone-300 dark:border-white/10 p-8 rounded-xl my-12 bg-transparent dark:bg-white/5">
                <p className="text-lg md:text-xl leading-relaxed text-stone-800 dark:text-zinc-200">
                  {project.projectOverview}
                </p>
              </div>
            )}

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-8 mb-16 border-t border-b border-transparent md:border-stone-200 md:dark:border-white/10">
              {/* Role */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-stone-900 dark:text-zinc-200">
                  Role
                </h3>
                <div className="flex flex-col gap-1">
                  {project.roles?.length > 0 ? (
                    project.roles.map((role: string) => (
                      <span
                        key={role}
                        className="text-stone-600 dark:text-zinc-300 font-medium block"
                      >
                        {role}
                      </span>
                    ))
                  ) : (
                    <span className="text-stone-400 dark:text-zinc-500 italic">
                      N/A
                    </span>
                  )}
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-stone-900 dark:text-zinc-200">
                  Timeline
                </h3>
                <p className="text-stone-600 dark:text-zinc-300 font-medium">
                  {project.timeline || (
                    <span className="text-stone-400 dark:text-zinc-500 italic">
                      N/A
                    </span>
                  )}
                </p>
              </div>

              {/* Company */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-stone-900 dark:text-zinc-200">
                  Company
                </h3>
                <p className="text-stone-600 dark:text-zinc-300 font-medium">
                  {project.company || (
                    <span className="text-stone-400 dark:text-zinc-500 italic">
                      N/A
                    </span>
                  )}
                </p>
              </div>

              {/* Tools */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-stone-900 dark:text-zinc-200">
                  Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.length > 0 ? (
                    <p className="text-stone-600 dark:text-zinc-300 font-medium">
                      {project.technologies.join(", ")}
                    </p>
                  ) : (
                    <span className="text-stone-400 dark:text-zinc-500 italic">
                      N/A
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Hero Image */}
            {project.mainImage && (
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-stone-200 dark:bg-white/5 mb-24 cursor-zoom-in shadow-sm">
                <ZoomableImage
                  src={urlFor(project.mainImage).url()}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="95vw"
                  suppressHydrationWarning
                />
              </div>
            )}

            {/* Body Content */}
            <div className="max-w-4xl mx-auto mb-24">
              <div className="prose prose-lg prose-stone dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:text-zinc-800 dark:prose-headings:text-zinc-200 prose-p:text-stone-600 dark:prose-p:text-zinc-300 prose-li:text-stone-600 dark:prose-li:text-zinc-300 prose-ul:list-disc prose-ol:list-decimal prose-img:rounded-xl prose-img:shadow-sm prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
                {project.body ? (
                  <PortableText
                    value={project.body}
                    components={ptComponents}
                  />
                ) : null}
              </div>
            </div>

            {/* Showcase Image 1 (Full Width) */}
            {project.showcaseImage1 && (
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-stone-200 dark:bg-white/5 mb-8 shadow-sm">
                <ZoomableImage
                  src={urlFor(project.showcaseImage1).url()}
                  alt={project.showcaseImage1.alt || "Showcase 1"}
                  fill
                  className="object-cover"
                  sizes="95vw"
                  suppressHydrationWarning
                />
              </div>
            )}

            {/* Showcase Images (Two Column) */}
            {project.showcaseImagesTwoColumn?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {project.showcaseImagesTwoColumn
                  .slice(0, 2)
                  .map((img: any, idx: number) => (
                    <div
                      key={idx}
                      className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-stone-200 dark:bg-white/5 shadow-sm"
                    >
                      <ZoomableImage
                        src={urlFor(img).url()}
                        alt={img.alt || `Showcase Grid ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        suppressHydrationWarning
                      />
                    </div>
                  ))}
              </div>
            )}

            {/* Showcase Image Last (Full Width) */}
            {project.showcaseImageLast && (
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-stone-200 dark:bg-white/5 mb-24 shadow-sm">
                <ZoomableImage
                  src={urlFor(project.showcaseImageLast).url()}
                  alt={project.showcaseImageLast.alt || "Showcase Last"}
                  fill
                  className="object-cover"
                  sizes="95vw"
                  suppressHydrationWarning
                />
              </div>
            )}

            {/* Closing Statement */}
            {project.closingStatement && (
              <div className="text-center max-w-2xl mx-auto py-12 border-t border-stone-200 dark:border-white/10">
                <p className="text-2xl md:text-3xl font-medium text-stone-800 dark:text-zinc-200 leading-snug">
                  "{project.closingStatement}"
                </p>
              </div>
            )}
          </section>

          {/* Explore More Work */}
          <ExploreMoreWork projects={allProjects} currentSlug={slug} />
        </main>
      </ProjectThemeWrapper>
    </ZoomProvider>
  );
}
