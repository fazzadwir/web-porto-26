export interface MockProject {
  _id: string;
  title: string;
  slug: { current: string };
  status?: string;
  section?: "interface" | "visual" | "motion";
  subcategory?: string;
  shortDescription?: string;
  projectOverview?: string;
  closingStatement?: string;
  timeline?: string;
  company?: string;
  roles?: string[];
  categories: string[];
  technologies?: string[];
  mainImage: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  showcaseImage1?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  showcaseImagesTwoColumn?: Array<{
    asset: {
      url: string;
    };
    alt?: string;
  }>;
  showcaseImageLast?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  body?: any[];
}

export const MOCK_PROJECTS: MockProject[] = [
  {
    _id: "mock-1",
    title: "Cloud Infrastructure Dashboard",
    slug: { current: "cloud-infrastructure-dashboard" },
    status: "public",
    section: "interface",
    subcategory: "SaaS",
    shortDescription: "End-to-end UX/UI revamp for complex IaaS & PaaS monitoring workflows.",
    projectOverview:
      "Designed an intuitive, modern dashboard interface for enterprise cloud management, enabling developers and DevOps engineers to monitor server health, bandwidth metrics, and multi-region deployments in real-time.",
    closingStatement:
      "This project improved user task efficiency by 40% and substantially decreased onboarding friction for enterprise clients.",
    timeline: "2025 · 4 Months",
    company: "PT. Awan Data Indonesia",
    roles: ["UI/UX Designer", "Design Systems"],
    categories: ["Web Application", "Dashboard", "UI/UX"],
    technologies: ["Figma", "Next.js", "Tailwind CSS", "TypeScript"],
    mainImage: {
      asset: {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
      },
      alt: "Cloud Infrastructure Dashboard Mockup",
    },
    showcaseImage1: {
      asset: {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
      },
      alt: "Analytics View",
    },
    showcaseImagesTwoColumn: [
      {
        asset: {
          url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
        },
        alt: "Data Insights",
      },
      {
        asset: {
          url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80",
        },
        alt: "Design Exploration",
      },
    ],
    showcaseImageLast: {
      asset: {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
      },
      alt: "Final Overview",
    },
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Managing cloud infrastructure involves dense telemetry, complex status hierarchies, and mission-critical actions. The objective was to simplify cognitive load while providing rapid drill-down capabilities.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Through rigorous wireframing, high-fidelity prototyping, and component-driven styling, we established a design system that scales seamlessly across light and dark modes.",
          },
        ],
      },
    ],
  },
  {
    _id: "mock-2",
    title: "Kita Bantu Digital Platform",
    slug: { current: "kita-bantu-platform" },
    status: "public",
    section: "interface",
    subcategory: "Landing Page",
    shortDescription: "Modern web experience accelerating social impact and community aid transparency.",
    projectOverview:
      "A human-centered web design crafted to connect benefactors directly with verified community initiatives, featuring real-time fundraising progress and interactive impact tracking.",
    closingStatement:
      "The streamlined donation flow led to a 28% increase in campaign completion rates within the first quarter.",
    timeline: "2025 · 3 Months",
    company: "PT. Kita Bantu Indonesia",
    roles: ["Web Designer", "Frontend Integration"],
    categories: ["Web Design", "Social Impact", "E-Commerce"],
    technologies: ["Figma", "React", "Tailwind CSS", "Framer Motion"],
    mainImage: {
      asset: {
        url: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1600&q=80",
      },
      alt: "Kita Bantu Web Platform Preview",
    },
    showcaseImage1: {
      asset: {
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80",
      },
      alt: "Community Platform Collaboration",
    },
    showcaseImagesTwoColumn: [
      {
        asset: {
          url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&q=80",
        },
        alt: "UX Flow Exploration",
      },
      {
        asset: {
          url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
        },
        alt: "Team Alignment",
      },
    ],
    showcaseImageLast: {
      asset: {
        url: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1600&q=80",
      },
      alt: "Finished Landing Page",
    },
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Transparency and trust are essential for humanitarian aid platforms. We established an open design language emphasizing verified impact stories and live donor feedback loops.",
          },
        ],
      },
    ],
  },
  {
    _id: "mock-3",
    title: "Next-Gen Fintech Experience",
    slug: { current: "fintech-mobile-experience" },
    status: "public",
    section: "interface",
    subcategory: "FinTech",
    shortDescription: "Seamless wealth management and automated investment portfolio tracking.",
    projectOverview:
      "Engineered an elegant mobile and web interface allowing users to curate investment goals, visualize asset allocation, and automate recurring savings with bank-grade security protocols.",
    closingStatement:
      "Delivered a design system recognized for clarity in visualizing multi-currency portfolios.",
    timeline: "2024 · 5 Months",
    company: "Independent Client",
    roles: ["Product Designer", "Prototyping"],
    categories: ["Fintech", "Mobile App", "Design System"],
    technologies: ["Figma", "SwiftUI", "TypeScript"],
    mainImage: {
      asset: {
        url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&q=80",
      },
      alt: "Fintech App Interface",
    },
    showcaseImage1: {
      asset: {
        url: "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?w=1600&q=80",
      },
      alt: "Investment Screens",
    },
    showcaseImagesTwoColumn: [
      {
        asset: {
          url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
        },
        alt: "Telemetry & Charts",
      },
      {
        asset: {
          url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80",
        },
        alt: "Interaction Details",
      },
    ],
    showcaseImageLast: {
      asset: {
        url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&q=80",
      },
      alt: "Final Interface Walkthrough",
    },
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Personal finance tools often suffer from overwhelming clutter. Our approach stripped away unnecessary noise, placing critical action buttons and balance forecasts front and center.",
          },
        ],
      },
    ],
  },
  {
    _id: "mock-4",
    title: "Omni Design System & Tokens",
    slug: { current: "omni-design-system" },
    status: "private",
    section: "interface",
    subcategory: "SaaS",
    shortDescription: "Enterprise component library and token architecture for multi-brand scaling.",
    projectOverview:
      "A unified multi-brand design system featuring cross-platform design tokens (W3C format), accessibility compliance (WCAG AAA), and automated Figma-to-Code sync pipelines.",
    closingStatement:
      "Used internally across engineering squads to reduce component turnaround time by 60%.",
    timeline: "2024 · Ongoing",
    company: "Enterprise Confidential",
    roles: ["Design Systems Lead"],
    categories: ["Design System", "Architecture"],
    technologies: ["Figma", "Style Dictionary", "Storybook", "CSS"],
    mainImage: {
      asset: {
        url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1600&q=80",
      },
      alt: "Design System Architecture",
    },
  },
  // ── Visual Design section ──
  {
    _id: "visual-1",
    title: "Hari Buruh Campaign",
    slug: { current: "hari-buruh-campaign" },
    status: "public",
    section: "visual",
    subcategory: "Social Media Post",
    shortDescription: "Labour Day digital campaign series for a cloud brand.",
    projectOverview:
      "Designed a bold, editorial social media campaign series to commemorate Labour Day, blending patriotic illustrations with modern typographic layouts for a cloud-services company.",
    closingStatement: "Campaign reached over 50k impressions across platforms in 48 hours.",
    timeline: "2024 · 2 Weeks",
    company: "Maxcloud",
    roles: ["Graphic Designer"],
    categories: ["Visual Design", "Social Media"],
    technologies: ["Adobe Illustrator", "Figma"],
    mainImage: {
      asset: {
        url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
      },
      alt: "Hari Buruh Campaign Poster",
    },
  },
  {
    _id: "visual-2",
    title: "Frog Brand Identity",
    slug: { current: "frog-brand-identity" },
    status: "public",
    section: "visual",
    subcategory: "Brand Identity",
    shortDescription: "Full brand identity system for a creative tech startup.",
    projectOverview:
      "Crafted the complete visual identity for Frog — a creative technology startup — including logo design, colour palette, typography system, and brand guidelines.",
    closingStatement: "Brand system adopted across all company touchpoints within 30 days.",
    timeline: "2024 · 3 Weeks",
    company: "Frog Creative",
    roles: ["Brand Designer"],
    categories: ["Visual Design", "Brand Identity"],
    technologies: ["Adobe Illustrator", "Figma"],
    mainImage: {
      asset: {
        url: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?w=1200&q=80",
      },
      alt: "Frog Brand Identity",
    },
  },
  {
    _id: "visual-3",
    title: "Kesaktian Pancasila Poster",
    slug: { current: "kesaktian-pancasila-poster" },
    status: "public",
    section: "visual",
    subcategory: "Social Media Post",
    shortDescription: "National commemoration poster series for Pancasila Day.",
    projectOverview:
      "Designed a series of commemorative posters for Indonesia's Pancasila Sacredness Day, blending historical imagery with a modern typographic approach.",
    closingStatement: "Series distributed across company's social channels nationwide.",
    timeline: "2024 · 1 Week",
    company: "Maxcloud",
    roles: ["Graphic Designer"],
    categories: ["Visual Design", "Social Media"],
    technologies: ["Adobe Illustrator", "Figma"],
    mainImage: {
      asset: {
        url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&q=80",
      },
      alt: "Kesaktian Pancasila Poster",
    },
  },
  {
    _id: "visual-4",
    title: "Hari Bumi Editorial",
    slug: { current: "hari-bumi-editorial" },
    status: "public",
    section: "visual",
    subcategory: "Social Media Post",
    shortDescription: "Earth Day campaign with editorial 3D illustration style.",
    projectOverview:
      "Produced an editorial Earth Day campaign combining 3D renders with bold sans-serif typography to raise environmental awareness for a digital brand.",
    closingStatement: "Recognised as top-performing post for the month.",
    timeline: "2024 · 1 Week",
    company: "Maxcloud",
    roles: ["Art Director", "Graphic Designer"],
    categories: ["Visual Design", "Social Media"],
    technologies: ["Blender", "Adobe Photoshop", "Figma"],
    mainImage: {
      asset: {
        url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80",
      },
      alt: "Hari Bumi Editorial",
    },
  },
  {
    _id: "visual-5",
    title: "CopyPartner Brand System",
    slug: { current: "copypartner-brand-system" },
    status: "public",
    section: "visual",
    subcategory: "Brand Identity",
    shortDescription: "Comprehensive brand system for an AI copywriting tool.",
    projectOverview:
      "Developed a complete brand identity for CopyPartner — an AI-powered copywriting platform — from logo mark and wordmark to full brand guidelines and marketing collateral.",
    closingStatement: "Brand launched successfully at product launch event.",
    timeline: "2024 · 4 Weeks",
    company: "CopyPartner",
    roles: ["Brand Designer"],
    categories: ["Visual Design", "Brand Identity"],
    technologies: ["Adobe Illustrator", "Figma"],
    mainImage: {
      asset: {
        url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
      },
      alt: "CopyPartner Brand System",
    },
  },
  {
    _id: "visual-6",
    title: "Gravity Apps Icon Set",
    slug: { current: "gravity-apps-icon-set" },
    status: "public",
    section: "visual",
    subcategory: "Brand Identity",
    shortDescription: "Icon set and visual system for a productivity suite.",
    projectOverview:
      "Designed a cohesive icon set and visual identity system for Gravity Apps — a suite of productivity tools — ensuring visual consistency across web and mobile platforms.",
    closingStatement: "Icons shipped with the v2 product update.",
    timeline: "2023 · 3 Weeks",
    company: "Gravity Apps",
    roles: ["Visual Designer"],
    categories: ["Visual Design", "Brand Identity"],
    technologies: ["Figma", "Adobe Illustrator"],
    mainImage: {
      asset: {
        url: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80",
      },
      alt: "Gravity Apps Icon Set",
    },
  },
  // ── Motion Design section ──
  {
    _id: "motion-1",
    title: "Maxcloud — Motion Social Post",
    slug: { current: "maxcloud-motion-social-post" },
    status: "public",
    section: "motion",
    subcategory: "Social Media Post",
    shortDescription: "Animated social media post series for Maxcloud brand campaigns.",
    projectOverview:
      "Produced a series of short-form motion graphic posts for Maxcloud's social channels using After Effects — including kinetic typography, logo animations, and scroll-stopping looped videos.",
    closingStatement: "Posts drove a 2× engagement spike compared to static visuals.",
    timeline: "2024 · Ongoing",
    company: "Maxcloud",
    roles: ["Motion Designer"],
    categories: ["Motion Design", "Social Media"],
    technologies: ["After Effects", "Illustrator", "Figma"],
    mainImage: {
      asset: {
        url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80",
      },
      alt: "Maxcloud Motion Social Post",
    },
  },
  {
    _id: "motion-2",
    title: "Logo Reveal — Frog Creative",
    slug: { current: "logo-reveal-frog-creative" },
    status: "public",
    section: "motion",
    subcategory: "Social Media Post",
    shortDescription: "Spring-physics logo reveal animation for brand launch.",
    projectOverview:
      "Designed and animated a tactile logo reveal sequence for Frog Creative's brand launch — featuring elastic spring physics, layered particle trails, and a satisfying final bounce.",
    closingStatement: "Used as the official brand opener across all video content.",
    timeline: "2024 · 1 Week",
    company: "Frog Creative",
    roles: ["Motion Designer"],
    categories: ["Motion Design"],
    technologies: ["After Effects", "Adobe Illustrator"],
    mainImage: {
      asset: {
        url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
      },
      alt: "Frog Creative Logo Reveal",
    },
  },
  {
    _id: "motion-3",
    title: "UI Microinteraction Showcase",
    slug: { current: "ui-microinteraction-showcase" },
    status: "public",
    section: "motion",
    subcategory: "Social Media Post",
    shortDescription: "Curated reel of UI micro-animations and interaction states.",
    projectOverview:
      "Compiled and produced a motion showcase reel demonstrating hand-crafted UI micro-interactions — button states, loading skeletons, tab transitions, and modal entrances — all animated with spring physics.",
    closingStatement: "Reel published as a portfolio showcase on Dribbble and Instagram.",
    timeline: "2024 · 2 Weeks",
    company: "Personal Project",
    roles: ["Motion Designer", "UI Designer"],
    categories: ["Motion Design"],
    technologies: ["Framer", "After Effects", "Figma"],
    mainImage: {
      asset: {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      },
      alt: "UI Microinteraction Showcase",
    },
  },
];


