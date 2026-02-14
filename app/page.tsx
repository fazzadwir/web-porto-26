import Hero from "@/components/sections/Hero";
import SelectedWork from "@/components/sections/SelectedWork";
import Experience from "@/components/sections/Experience";
import Toolkit from "@/components/sections/Toolkit";
import Footer from "@/components/sections/Footer";

import { client } from "@/lib/sanity";

export const revalidate = 60;

export default async function Home() {
  const query = `*[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    categories
  }`;

  const projects = await client.fetch(query);

  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <SelectedWork projects={projects} />
      <Toolkit />
      <Experience />
      <Footer />
    </main>
  );
}
