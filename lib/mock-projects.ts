export interface MockProject {
  _id: string;
  title: string;
  slug: { current: string };
  status?: string;
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
];
