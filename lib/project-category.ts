/** Fixed project categories — the only options in the Studio dropdown. */
export const PROJECT_CATEGORIES = ["Interface Design", "Visual Design", "Motion Design"] as const;

export type ProjectSection = "interface" | "visual" | "motion";

/**
 * Which /work section a project belongs to. Reads `category` (Studio dropdown) first,
 * then the legacy `categories` array so documents not yet re-saved in Studio still show up.
 */
export function getProjectSection(p: { category?: string; categories?: string[] }): ProjectSection | null {
  for (const label of [p.category, ...(p.categories ?? [])]) {
    const l = label?.toLowerCase() ?? "";
    if (l.includes("interface") || l.includes("ui/ux")) return "interface";
    if (l.includes("visual")) return "visual";
    if (l.includes("motion")) return "motion";
  }
  return null;
}

/** Filter chips for a /work section: "All" plus every distinct Sanity `subcategory`, alphabetical. */
export function getSubcategoryFilters(projects: { subcategory?: string }[]): string[] {
  const subs = new Set(projects.map((p) => p.subcategory?.trim()).filter((s): s is string => !!s));
  return ["All", ...[...subs].sort((a, b) => a.localeCompare(b))];
}
