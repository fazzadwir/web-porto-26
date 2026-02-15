import SelectedWork from "@/components/sections/SelectedWork";
import Footer from "@/components/sections/Footer";

import { client } from "@/lib/sanity";

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

  const projects = await client.fetch(query);

  return (
    <main className="min-h-screen bg-zinc-800">
      <div className="pt-32">
        <SelectedWork projects={projects} />
      </div>
      <Footer />
    </main>
  );
}
