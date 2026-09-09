import SelectedWork from "@/components/sections/SelectedWork";
import Footer from "@/components/sections/Footer";
import { client } from "@/lib/sanity";
import { isSanityConfigured } from "@/lib/env";
import { MOCK_PROJECTS } from "@/lib/mock-projects";

export const revalidate = 60;

export default async function WorkPage() {
  const query = `*[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    status,
    mainImage,
    categories
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
      <div className="pt-32">
        <SelectedWork projects={projects as any} showAll={true} />
      </div>
      <Footer />
    </main>
  );
}

