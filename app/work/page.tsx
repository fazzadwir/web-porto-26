import WorkClient from "./WorkClient";
import { client } from "@/lib/sanity";
import { isSanityConfigured } from "@/lib/env";
import { MOCK_PROJECTS } from "@/lib/mock-projects";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore my work across Interface Design, Visual Design, and Motion Design — crafted with precision and purpose.",
};

interface WorkPageProps {
  searchParams: Promise<{ section?: string }>;
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const resolvedSearchParams = await searchParams;
  const sectionParam = resolvedSearchParams?.section?.toLowerCase();
  const initialSection =
    sectionParam === "visual" || sectionParam === "motion"
      ? sectionParam
      : "interface";

  const query = `*[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    status,
    mainImage,
    category,
    categories,
    subcategory,
    section
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
    <WorkClient
      projects={projects as any}
      initialSection={initialSection}
    />
  );
}
