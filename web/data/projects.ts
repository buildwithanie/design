export type ProjectStatus = "planned" | "active" | "completed";

export type ProjectFact = {
  label: string;
  value: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
};

export type ProjectSupporter = {
  name: string;
  role: "Funder" | "Research partner" | "Community partner";
  website?: string;
};

export type ProjectResource = {
  title: string;
  href: string;
  type: "Report" | "Article" | "Brief" | "Resource";
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  status: ProjectStatus;

  summary: string;
  coverImage: string;
  coverImageAlt: string;

  detailIntroduction: string;
  facts: ProjectFact[];

  whyItMatters: string[];
  whatWeAreDoing: string[];

  progress: {
    heading: string;
    introduction: string;
    items: string[];
  };

  gallery: ProjectImage[];
  supporters?: ProjectSupporter[];
  resources?: ProjectResource[];
};

export const projects: Project[] = [
  {
    slug: "ai-health-equity-lab",
    title: "AI Health Equity Lab",
    category: "Responsible AI and data",
    status: "active",

    summary:
      "Building responsible AI approaches that help research teams identify health inequities while keeping human judgment and accountability visible.",

    coverImage: "/images/project-ai-lab.png",
    coverImageAlt:
      "Researchers reviewing health data and analytical findings together",

    detailIntroduction:
      "The lab is exploring how artificial intelligence can help health researchers recognise important patterns while keeping people, context, and responsibility at the centre of every decision.",

    facts: [
      {
        label: "Status",
        value: "Active",
      },
      {
        label: "Focus",
        value: "Responsible AI for health research",
      },
      {
        label: "Working with",
        value: "Researchers and health teams",
      },
    ],

    whyItMatters: [
      "Health information can reveal where communities are being underserved, but gaps in that information can also lead to misleading conclusions.",
      "AI can help research teams examine complex information more quickly. It must still be used carefully so that uncertainty, inequality, and human responsibility are not hidden behind technology.",
    ],

    whatWeAreDoing: [
      "Reviewing how health data represents different communities.",
      "Exploring AI methods that researchers can understand and question.",
      "Developing practical checks for privacy, fairness, and human oversight.",
      "Bringing technical, health, governance, and community perspectives into the same process.",
    ],

    progress: {
      heading: "Progress so far",
      introduction:
        "The current work is helping the team identify where responsible review is most important during AI-supported health research.",
      items: [
        "Clearer questions for assessing whether available data represents the people a project aims to serve.",
        "Practical ways for research teams to explain how an analytical result was produced.",
        "Stronger review points for privacy, documentation, and human decision-making.",
      ],
    },

    gallery: [
      {
        src: "/images/research-governance-team.png",
        alt: "Research team discussing responsible use of health information",
      },
      {
        src: "/images/work-selection-review.png",
        alt: "Researchers reviewing evidence and project priorities",
      },
    ],
  },

  {
    slug: "community-evidence-hubs",
    title: "Community Evidence Hubs",
    category: "Community intelligence",
    status: "completed",

    summary:
      "Creating spaces where communities help define research priorities, interpret findings, and turn local evidence into practical action.",

    coverImage: "/images/project-community-equity.png",
    coverImageAlt:
      "Community members and researchers discussing local health priorities",

    detailIntroduction:
      "Community Evidence Hubs brought residents and researchers together to identify important health questions, examine local evidence, and discuss what the findings could mean in practice.",

    facts: [
      {
        label: "Status",
        value: "Completed",
      },
      {
        label: "Focus",
        value: "Community-led evidence",
      },
      {
        label: "Worked with",
        value: "Communities and researchers",
      },
    ],

    whyItMatters: [
      "Communities often recognise changes in health and wellbeing before those changes are clearly visible in formal reports or datasets.",
      "When local knowledge is missing from research, the questions being studied may not reflect the issues people consider most urgent.",
    ],

    whatWeAreDoing: [
      "Created spaces where communities could identify and discuss priority health questions.",
      "Connected lived experience with field inquiry and available health information.",
      "Invited community participants to help interpret findings.",
      "Returned evidence in forms that supported discussion and local decision-making.",
    ],

    progress: {
      heading: "What the project showed",
      introduction:
        "The hubs demonstrated how community participation can improve both the questions research asks and the way findings are understood.",
      items: [
        "Community involvement changed which health questions received attention.",
        "Local experience helped explain patterns that formal information could not explain on its own.",
        "Findings became more useful when communities could question and interpret them before recommendations were finalised.",
      ],
    },

    gallery: [
      {
        src: "/images/community-partnership-conversation.png",
        alt: "Community participants discussing local health priorities",
      },
      {
        src: "/images/community-intelligence-feature.png",
        alt: "Researchers and community partners examining evidence together",
      },
    ],
  },

  {
    slug: "digital-research-partnerships",
    title: "Digital Research Partnerships",
    category: "Capacity and partnership",
    status: "planned",

    summary:
      "Connecting practical technology, shared research methods, and institutional collaboration so health teams can sustain responsible research practice.",

    coverImage: "/images/project-training.png",
    coverImageAlt:
      "Health professionals participating in an applied research learning session",

    detailIntroduction:
      "The proposed partnerships will help health and research teams use digital tools alongside the skills, shared practices, and institutional support needed to sustain good research.",

    facts: [
      {
        label: "Status",
        value: "Planned",
      },
      {
        label: "Focus",
        value: "Digital research capability",
      },
      {
        label: "Intended for",
        value: "Health and research institutions",
      },
    ],

    whyItMatters: [
      "Digital tools are often introduced through short workshops or pilot projects. Teams may learn how to operate a platform without gaining the wider skills needed to evaluate and sustain it.",
      "Research capability should remain useful after a particular tool, trainer, or external project has moved on.",
    ],

    whatWeAreDoing: [
      "Planning learning activities around real institutional research questions.",
      "Connecting digital tools with research design, ethics, and data responsibility.",
      "Creating shared practices that teams can adapt within their own organisations.",
      "Building partnerships that support continued learning rather than one-time training.",
    ],

    progress: {
      heading: "What success would look like",
      introduction:
        "The project is being designed to strengthen practical capability that participating teams can continue using and improving.",
      items: [
        "Teams can decide whether a digital tool is appropriate for a specific research need.",
        "Research knowledge remains within participating institutions after external support ends.",
        "Partners share clearer expectations for responsibility, governance, and long-term learning.",
      ],
    },

    gallery: [
      {
        src: "/images/capacity-partnership-hands.png",
        alt: "Research partners collaborating during a practical learning session",
      },
      {
        src: "/images/work-knowledge-team.png",
        alt: "Health research team reviewing evidence and shared methods",
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
