import { client } from "@/lib/sanity";
import { isSanityConfigured } from "@/lib/env";
import { MOCK_PROJECTS } from "@/lib/mock-projects";
import PortfolioWrapper from "@/components/ui/PortfolioWrapper";

export const revalidate = 60;

export default async function Home() {
  const query = `*[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    status,
    mainImage,
    categories,
    timeline,
    company,
    projectOverview,
    closingStatement,
    technologies,
    showcaseImage1,
    showcaseImagesTwoColumn,
    showcaseImageLast
  }`;

  let projects = MOCK_PROJECTS;

  if (isSanityConfigured) {
    try {
      const data = await client.fetch(query);
      if (Array.isArray(data) && data.length > 0) {
        projects = data;
      }
    } catch (error) {
      console.warn("Could not fetch projects from Sanity, using mock data:", error);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-800">
      <PortfolioWrapper projects={projects as any} />
    </main>
  );
}

