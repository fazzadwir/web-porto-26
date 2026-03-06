import { client } from "@/lib/sanity";
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

  const projects = await client.fetch(query);

  return (
    <main className="min-h-screen bg-zinc-800">
      <PortfolioWrapper projects={projects} />
    </main>
  );
}
