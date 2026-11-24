import {
  User,
  LearnerProfile,
  EarnerProfile,
  Roadmap,
  LearningResource,
  PracticeProject,
  PortfolioProject,
  MarketplaceProject,
  ProjectApplication,
  ActiveProject,
  Transaction,
  Review,
  Team,
  Notification
} from "@/types";

export const initialUsers: User[] = [
  // Learners
  {
    id: "user-learner-1",
    name: "Tanvir Ahmed",
    email: "learner@dokkhonagorik.demo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    country: "Bangladesh",
    role: "learner",
    hasLearnerProfile: true,
    hasEarnerProfile: false,
    createdAt: "2026-10-15T09:00:00Z"
  },
  {
    id: "user-learner-2",
    name: "Nafisa Rahman",
    email: "nafisa@dokkhonagorik.demo",
    country: "Bangladesh",
    role: "learner",
    hasLearnerProfile: true,
    hasEarnerProfile: false,
    createdAt: "2026-10-20T11:30:00Z"
  },
  {
    id: "user-learner-3",
    name: "Rifat Karim",
    email: "rifat@dokkhonagorik.demo",
    country: "Bangladesh",
    role: "learner",
    hasLearnerProfile: true,
    hasEarnerProfile: false,
    createdAt: "2026-10-25T14:15:00Z"
  },
  // Earners
  {
    id: "user-earner-1",
    name: "Sabbir Hossain",
    email: "earner@dokkhonagorik.demo",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    country: "Bangladesh",
    role: "earner",
    hasLearnerProfile: true,
    hasEarnerProfile: true,
    createdAt: "2026-09-01T10:00:00Z"
  },
  {
    id: "user-earner-2",
    name: "Maliha Chowdhury",
    email: "maliha@dokkhonagorik.demo",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    country: "Bangladesh",
    role: "earner",
    hasLearnerProfile: true,
    hasEarnerProfile: true,
    createdAt: "2026-09-10T12:00:00Z"
  },
  {
    id: "user-earner-3",
    name: "Arifur Rahman",
    email: "arif@dokkhonagorik.demo",
    country: "Bangladesh",
    role: "earner",
    hasLearnerProfile: true,
    hasEarnerProfile: true,
    createdAt: "2026-09-18T16:00:00Z"
  },
  // Businesses
  {
    id: "user-business-1",
    name: "Pathao Express / Smart Logistics SME",
    email: "business@dokkhonagorik.demo",
    avatar: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&auto=format&fit=crop&q=80",
    country: "Bangladesh",
    role: "business",
    createdAt: "2026-08-15T08:00:00Z"
  },
  {
    id: "user-business-2",
    name: "Bengal Organic Foods Ltd",
    email: "organic@dokkhonagorik.demo",
    country: "Bangladesh",
    role: "business",
    createdAt: "2026-08-20T09:30:00Z"
  },
  {
    id: "user-business-3",
    name: "Apex Retail Solutions",
    email: "apex@dokkhonagorik.demo",
    country: "Bangladesh",
    role: "business",
    createdAt: "2026-09-05T13:45:00Z"
  },
  // Admin
  {
    id: "user-admin-1",
    name: "DokkhoNagorik Super Admin",
    email: "admin@dokkhonagorik.demo",
    country: "Bangladesh",
    role: "admin",
    createdAt: "2026-01-01T00:00:00Z"
  }
];

export const initialLearnerProfiles: Record<string, LearnerProfile> = {
  "user-learner-1": {
    userId: "user-learner-1",
    ageRange: "21-25",
    educationLevel: "Bachelor's Student",
    occupation: "Computer Science Undergraduate",
    interests: ["UI/UX Design", "Programming", "Digital Marketing"],
    skills: [
      { name: "Figma", level: "Intermediate" },
      { name: "HTML & CSS", level: "Intermediate" },
      { name: "User Research", level: "Beginner" }
    ],
    goals: ["Become a freelancer", "Earn through part-time projects"],
    hoursPerWeek: 15,
    learningFormat: "Project-based & Hands-on",
    budgetPreference: "free",
    targetDomain: "UI/UX Design"
  }
};

export const initialEarnerProfiles: Record<string, EarnerProfile> = {
  "user-earner-1": {
    userId: "user-earner-1",
    title: "Product Designer & UI/UX Specialist",
    bio: "Passionate designer with proven track record in converting complex SaaS & SME workflows into elegant, conversion-focused user interfaces.",
    skills: [
      { name: "Figma", level: "Advanced" },
      { name: "UI/UX Design", level: "Advanced" },
      { name: "Design Systems", level: "Intermediate" },
      { name: "Responsive Web", level: "Advanced" },
      { name: "Wireframing & Prototyping", level: "Advanced" }
    ],
    hourlyRateBDT: 1200,
    expectedProjectBudgetBDT: 25000,
    availability: "Part-time (20h/wk)",
    preferredProjectTypes: ["SaaS Dashboards", "Landing Pages", "Mobile App UI"],
    workPreference: "Both",
    readinessScore: 92,
    readinessFeedback: [
      "Verified Figma Design Systems capability",
      "Completed 2 responsive web practice projects",
      "Published active case study in portfolio",
      "Passed UI/UX Foundational Assessment with 95%"
    ],
    rating: 4.9,
    reviewsCount: 7
  },
  "user-earner-2": {
    userId: "user-earner-2",
    title: "Full-Stack Web & Next.js Engineer",
    bio: "Building fast, SEO-friendly web platforms for startups and local e-commerce stores.",
    skills: [
      { name: "React / Next.js", level: "Advanced" },
      { name: "TypeScript", level: "Intermediate" },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "Node.js", level: "Intermediate" }
    ],
    hourlyRateBDT: 1500,
    expectedProjectBudgetBDT: 35000,
    availability: "Part-time (20h/wk)",
    preferredProjectTypes: ["Web Applications", "E-commerce Portals"],
    workPreference: "Individual",
    readinessScore: 95,
    readinessFeedback: [
      "Solid production code portfolio with 3 deployed applications",
      "High client delivery rating"
    ],
    rating: 5.0,
    reviewsCount: 11
  }
};

export const initialRoadmaps: Record<string, Roadmap> = {
  "user-learner-1": {
    id: "roadmap-1",
    userId: "user-learner-1",
    domain: "UI/UX Design",
    title: "Professional UI/UX & Product Design Career Path",
    description: "From design principles and interactive prototyping in Figma to landing paying SME clients.",
    progressPercent: 65,
    isPaused: false,
    phases: [
      {
        id: "phase-1",
        phaseNumber: 1,
        title: "Phase 1: Foundations",
        description: "Master color theory, typography, spacing hierarchies, and core design laws.",
        status: "completed",
        tasks: [
          {
            id: "task-1-1",
            title: "Color Theory & Contrast Accessibility (WCAG 2.1)",
            description: "Understand 60-30-10 color rule and 4.5:1 minimum text contrast ratios.",
            duration: "3 hours",
            completed: true,
            notes: "Checked with WebAIM contrast checker. Ready.",
            resourceUrls: [{ title: "Refactoring UI Color System", url: "https://www.refactoringui.com" }]
          },
          {
            id: "task-1-2",
            title: "Typography Scale & Vertical Rhythm",
            description: "Establish modular typography hierarchy for headings, body, and microcopy.",
            duration: "4 hours",
            completed: true,
            notes: "Configured standard 1.250 major third scale in Figma."
          },
          {
            id: "task-1-3",
            title: "Gestalt Principles in Interface Layouts",
            description: "Apply proximity, common region, and continuity to group UI items logically.",
            duration: "3 hours",
            completed: true
          }
        ]
      },
      {
        id: "phase-2",
        phaseNumber: 2,
        title: "Phase 2: Modern Tool Mastery (Figma)",
        description: "Develop industry-standard efficiency with Auto Layout, Components, and Tokens.",
        status: "completed",
        tasks: [
          {
            id: "task-2-1",
            title: "Mastering Figma Auto Layout 5.0",
            description: "Build flexible responsive cards, navbars, and data tables that adapt to screen widths.",
            duration: "5 hours",
            completed: true,
            notes: "Practiced with min-width and max-width wrapping."
          },
          {
            id: "task-2-2",
            title: "Interactive Components & Variants",
            description: "Build hover states, active states, toggle buttons, and modal dialogs.",
            duration: "6 hours",
            completed: true
          }
        ]
      },
      {
        id: "phase-3",
        phaseNumber: 3,
        title: "Phase 3: Practical Product Skills",
        description: "Translate business requirements into user flows, wireframes, and high-fidelity screens.",
        status: "in_progress",
        tasks: [
          {
            id: "task-3-1",
            title: "User Journey & Information Architecture",
            description: "Map user states from registration to successful checkout or booking.",
            duration: "4 hours",
            completed: true,
            notes: "Completed flow diagram for local grocery order app."
          },
          {
            id: "task-3-2",
            title: "Responsive Web Design for Mobile & Desktop",
            description: "Create desktop (1280px) and mobile (390px) responsive layouts.",
            duration: "6 hours",
            completed: false,
            notes: "Currently working on mobile drawer navigation."
          },
          {
            id: "task-3-3",
            title: "Micro-interactions and Usability Testing",
            description: "Run 3 quick prototype test sessions to detect friction points in navigation.",
            duration: "4 hours",
            completed: false
          }
        ]
      },
      {
        id: "phase-4",
        phaseNumber: 4,
        title: "Phase 4: Portfolio Development",
        description: "Convert practice exercises into compelling case studies highlighting business outcomes.",
        status: "in_progress",
        tasks: [
          {
            id: "task-4-1",
            title: "SaaS Analytics Dashboard Redesign Case Study",
            description: "Document problem, hypothesis, wireframes, and final clean layout.",
            duration: "8 hours",
            completed: true,
            notes: "Added to portfolio with live interactive Figma embed."
          },
          {
            id: "task-4-2",
            title: "Mobile Food Delivery App Flow & Prototype",
            description: "Create end-to-end prototype with order tracking and driver communication.",
            duration: "10 hours",
            completed: false
          }
        ]
      },
      {
        id: "phase-5",
        phaseNumber: 5,
        title: "Phase 5: Professional Readiness & Earner Launch",
        description: "Pitching to SMEs, writing project proposals, estimating timelines, and managing scope.",
        status: "locked",
        tasks: [
          {
            id: "task-5-1",
            title: "Client Requirements Discovery & Briefing Template",
            description: "Learn how to ask the right questions before quoting project prices.",
            duration: "3 hours",
            completed: false
          },
          {
            id: "task-5-2",
            title: "Drafting Winning Proposals for Local Businesses",
            description: "Structure deliverables, milestones, payment schedules, and revision limits.",
            duration: "4 hours",
            completed: false
          }
        ]
      }
    ]
  }
};

export const initialResources: LearningResource[] = [
  {
    id: "res-1",
    title: "Figma 101: Complete Auto-Layout & Component Guide",
    category: "YouTube tutorials",
    domain: "UI/UX Design",
    skill: "Figma",
    difficulty: "Beginner",
    url: "https://www.youtube.com/watch?v=jwHm_yW2bvg",
    isPaid: false,
    estimatedTime: "45 mins",
    bookmarked: true,
    completed: true
  },
  {
    id: "res-2",
    title: "Laws of UX: 20 Principles for Effective Design",
    category: "Articles",
    domain: "UI/UX Design",
    skill: "Design Principles",
    difficulty: "Beginner",
    url: "https://lawsofux.com",
    isPaid: false,
    estimatedTime: "30 mins",
    bookmarked: true,
    completed: true
  },
  {
    id: "res-3",
    title: "Refactoring UI: Practical UI Tactics for Developers",
    category: "Books",
    domain: "UI/UX Design",
    skill: "UI Layouts",
    difficulty: "Intermediate",
    url: "https://www.refactoringui.com",
    isPaid: true,
    estimatedTime: "3 hours",
    bookmarked: false,
    completed: false
  },
  {
    id: "res-4",
    title: "Tailwind CSS Official Documentation & Class Reference",
    category: "Documentation",
    domain: "Programming",
    skill: "Tailwind CSS",
    difficulty: "Beginner",
    url: "https://tailwindcss.com/docs",
    isPaid: false,
    estimatedTime: "2 hours",
    bookmarked: true,
    completed: true
  },
  {
    id: "res-5",
    title: "Next.js 15 App Router Full Course (FreeCodeCamp)",
    category: "Free courses",
    domain: "Programming",
    skill: "React / Next.js",
    difficulty: "Intermediate",
    url: "https://www.youtube.com/watch?v=wm5gMKuwSYk",
    isPaid: false,
    estimatedTime: "5 hours",
    bookmarked: false,
    completed: false
  },
  {
    id: "res-6",
    title: "Frontend Mentor: Real-world UI practice challenges",
    category: "Practice websites",
    domain: "Programming",
    skill: "HTML & CSS",
    difficulty: "Beginner",
    url: "https://www.frontendmentor.io",
    isPaid: false,
    estimatedTime: "Self-paced",
    bookmarked: true,
    completed: false
  },
  {
    id: "res-7",
    title: "Google UX Design Professional Certificate Resources",
    category: "Free courses",
    domain: "UI/UX Design",
    skill: "User Research",
    difficulty: "Intermediate",
    url: "https://grow.google/certificates/ux-design/",
    isPaid: false,
    estimatedTime: "12 hours",
    bookmarked: false,
    completed: false
  },
  {
    id: "res-8",
    title: "Growth Design: 50+ Real Product Case Studies & Tearsheets",
    category: "Articles",
    domain: "UI/UX Design",
    skill: "Product Strategy",
    difficulty: "Intermediate",
    url: "https://growth.design/case-studies",
    isPaid: false,
    estimatedTime: "2 hours",
    bookmarked: true,
    completed: true
  },
  {
    id: "res-9",
    title: "Component Gallery: The Curated Design System Pattern Library",
    category: "Tools",
    domain: "UI/UX Design",
    skill: "Design Systems",
    difficulty: "Intermediate",
    url: "https://component.gallery",
    isPaid: false,
    estimatedTime: "1 hour",
    bookmarked: true,
    completed: false
  },
  {
    id: "res-10",
    title: "SQL & Data Analysis for Beginners (Kaggle Learn)",
    category: "Free courses",
    domain: "Data Analytics",
    skill: "SQL",
    difficulty: "Beginner",
    url: "https://www.kaggle.com/learn/intro-to-sql",
    isPaid: false,
    estimatedTime: "4 hours",
    bookmarked: false,
    completed: false
  },
  {
    id: "res-11",
    title: "HubSpot Academy: Content Marketing Foundations",
    category: "Free courses",
    domain: "Digital Marketing",
    skill: "SEO & Copywriting",
    difficulty: "Beginner",
    url: "https://academy.hubspot.com",
    isPaid: false,
    estimatedTime: "6 hours",
    bookmarked: false,
    completed: false
  },
  {
    id: "res-12",
    title: "Modern React with Redux Toolkit & Zustand",
    category: "YouTube tutorials",
    domain: "Programming",
    skill: "State Management",
    difficulty: "Intermediate",
    url: "https://youtube.com",
    isPaid: false,
    estimatedTime: "2.5 hours",
    bookmarked: false,
    completed: false
  },
  {
    id: "res-13",
    title: "Checklist Design: Best UX practices for any UI screen",
    category: "Tools",
    domain: "UI/UX Design",
    skill: "UI Layouts",
    difficulty: "Beginner",
    url: "https://www.checklist.design",
    isPaid: false,
    estimatedTime: "30 mins",
    bookmarked: true,
    completed: true
  },
  {
    id: "res-14",
    title: "Web Accessibility by Google (Udacity)",
    category: "Free courses",
    domain: "UI/UX Design",
    skill: "Accessibility (a11y)",
    difficulty: "Intermediate",
    url: "https://www.udacity.com/course/web-accessibility--ud891",
    isPaid: false,
    estimatedTime: "3 hours",
    bookmarked: false,
    completed: false
  },
  {
    id: "res-15",
    title: "Smashing Magazine: Designing Micro-Interactions that Delight",
    category: "Articles",
    domain: "UI/UX Design",
    skill: "Interaction Design",
    difficulty: "Advanced",
    url: "https://www.smashingmagazine.com",
    isPaid: false,
    estimatedTime: "40 mins",
    bookmarked: false,
    completed: false
  }
];

export const initialPracticeProjects: PracticeProject[] = [
  {
    id: "prac-1",
    title: "SaaS Analytics Dashboard Redesign",
    domain: "UI/UX Design",
    difficulty: "Intermediate",
    description: "Design an information-dense yet uncluttered dashboard for a B2B logistics SaaS platform. Includes data tables, filtering, KPI summary cards, and quick action drawers.",
    requiredSkills: ["Figma", "Design Systems", "Data Visualization", "Auto Layout"],
    estimatedTime: "12 hours",
    deliverables: [
      "Figma Prototype file link",
      "Desktop layout (1440px) & Tablet layout (768px)",
      "Design tokens sheet (Colors, Spacing, Typography)",
      "Interactive status filter component"
    ],
    evaluationCriteria: [
      "WCAG AA contrast compliance across all text labels",
      "Effective use of visual hierarchy without visual clutter",
      "Proper Auto Layout nesting with responsive resizing",
      "Logical placement of primary and secondary CTAs"
    ],
    status: "completed",
    submissionNotes: "Completed full 3-page desktop and mobile layout with high-contrast data visualization.",
    submissionUrl: "https://figma.com/file/sample-saas-dashboard",
    addedToPortfolio: true
  },
  {
    id: "prac-2",
    title: "Local Artisan E-Commerce Checkout Flow",
    domain: "UI/UX Design",
    difficulty: "Beginner",
    description: "Create a frictionless 3-step checkout experience for a local Bangladeshi handicrafts boutique. Accommodates bKash/Nagad mobile financial services and cash-on-delivery options.",
    requiredSkills: ["Wireframing", "Figma", "User Flows", "Mobile UX"],
    estimatedTime: "8 hours",
    deliverables: [
      "Step-by-step user flow diagram",
      "Low-fidelity wireframes",
      "High-fidelity responsive mobile checkout screens (390px)",
      "Order confirmation and tracking status screen"
    ],
    evaluationCriteria: [
      "Form validation states (error, active, filled)",
      "Zero dead clicks or missing payment methods",
      "Clear delivery fee and order total breakdown"
    ],
    status: "in_progress",
    submissionNotes: "Drafted step 1 and step 2, currently polishing payment selector modal.",
    submissionUrl: "",
    addedToPortfolio: false
  },
  {
    id: "prac-3",
    title: "HealthTech Doctor Appointment Booking App",
    domain: "UI/UX Design",
    difficulty: "Intermediate",
    description: "Build an intuitive mobile app flow for patients to find nearby specialists, pick available hospital time slots, and upload prior medical prescriptions.",
    requiredSkills: ["Figma", "Mobile App UI", "Prototyping", "Design Systems"],
    estimatedTime: "14 hours",
    deliverables: [
      "Onboarding & Doctor search results",
      "Doctor detail profile & review ratings",
      "Date & Slot picker modal",
      "Prescription file uploader with preview"
    ],
    evaluationCriteria: [
      "Thumb-friendly tap targets (min 44px)",
      "Simple calendar navigation for elderly users",
      "Clear feedback on booking confirmation"
    ],
    status: "not_started",
    addedToPortfolio: false
  },
  {
    id: "prac-4",
    title: "Freelance Client Invoice Generator Web App",
    domain: "Programming",
    difficulty: "Intermediate",
    description: "Build a responsive Next.js application that lets freelancers create custom PDF invoices with itemized charges, VAT calculations, and export options.",
    requiredSkills: ["React / Next.js", "Tailwind CSS", "TypeScript"],
    estimatedTime: "10 hours",
    deliverables: [
      "Live deployed Vercel link",
      "GitHub source repository",
      "Client profile management & PDF download"
    ],
    evaluationCriteria: [
      "Accurate real-time subtotal and tax calculation",
      "Print-ready stylesheet styling",
      "Clean TypeScript definitions"
    ],
    status: "not_started",
    addedToPortfolio: false
  },
  {
    id: "prac-5",
    title: "B2B SaaS Pricing Page with Interactive Billing Toggle",
    domain: "Programming",
    difficulty: "Beginner",
    description: "Code a high-converting pricing page with Monthly/Annual toggles, FAQ accordion, plan comparison table, and currency switcher.",
    requiredSkills: ["HTML & CSS", "Tailwind CSS", "JavaScript"],
    estimatedTime: "6 hours",
    deliverables: ["Responsive web page code", "Working discount calculation switch"],
    evaluationCriteria: ["Smooth CSS transitions", "Accessible accordion keyboard navigation"],
    status: "not_started",
    addedToPortfolio: false
  },
  {
    id: "prac-6",
    title: "Organic Superfood Landing Page Redesign",
    domain: "UI/UX Design",
    difficulty: "Beginner",
    description: "Redesign the hero section, benefit pillars, and customer social proof for a Dhaka-based organic agro startup.",
    requiredSkills: ["Figma", "Visual Hierarchy", "Typography"],
    estimatedTime: "5 hours",
    deliverables: ["High-fidelity Figma landing page design", "Asset export kit"],
    evaluationCriteria: ["Compelling visual rhythm", "Clear value proposition above the fold"],
    status: "not_started",
    addedToPortfolio: false
  },
  {
    id: "prac-7",
    title: "SME Customer Churn Predictor & EDA Notebook",
    domain: "Data Analytics",
    difficulty: "Advanced",
    description: "Perform exploratory data analysis on 5,000 SME retail transactions to identify key churn indicators using Python and Pandas.",
    requiredSkills: ["Python", "Pandas", "Data Visualization", "SQL"],
    estimatedTime: "12 hours",
    deliverables: ["Jupyter Notebook with charts", "Executive summary slide deck"],
    evaluationCriteria: ["Clean data handling", "Actionable business recommendations"],
    status: "not_started",
    addedToPortfolio: false
  },
  {
    id: "prac-8",
    title: "Content Marketing SEO Audit & Growth Strategy",
    domain: "Digital Marketing",
    difficulty: "Intermediate",
    description: "Conduct a comprehensive keyword gap analysis for a B2B SaaS company and produce 5 optimized topic clusters.",
    requiredSkills: ["SEO", "Content Strategy", "Market Research"],
    estimatedTime: "8 hours",
    deliverables: ["Keyword mapping spreadsheet", "3 sample outline briefs"],
    evaluationCriteria: ["Search intent alignment", "High difficulty vs volume balance"],
    status: "not_started",
    addedToPortfolio: false
  }
];

export const initialPortfolioProjects: PortfolioProject[] = [
  {
    id: "port-1",
    userId: "user-learner-1",
    title: "LogiTrack: B2B Freight Logistics SaaS Dashboard",
    description: "End-to-end user experience redesign for an enterprise logistics dispatcher console, reducing shipment booking errors by 34%.",
    problemStatement: "Freight dispatchers were overwhelmed by fragmented spreadsheets, causing delayed route assignments and frequent manual miscalculations.",
    approach: "Conducted contextual interviews with 4 fleet operators, identified 5 critical daily workflows, created low-fidelity wireframes, and built an information-dense Figma component system.",
    skillsUsed: ["UI/UX Design", "Figma", "Design Systems", "User Research", "Data Visualization"],
    toolsUsed: ["Figma", "FigJam", "Contrast Checker", "Notion"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    projectUrl: "https://dokkhonagorik.app/preview/logitrack",
    githubUrl: "",
    completionDate: "2026-11-05",
    keyOutcomes: "Validated through 8 usability tasks; decreased average task completion time from 4.2 minutes to 1.8 minutes.",
    isPublished: true
  },
  {
    id: "port-2",
    userId: "user-earner-1",
    title: "AgroFresh: B2B Wholesale Produce Order Portal",
    description: "A streamlined B2B ordering web app connecting urban restaurants directly with regional organic farmers.",
    problemStatement: "Restaurateurs wasted hours every midnight placing phone orders with unpredictable wholesale pricing and inconsistent delivery manifests.",
    approach: "Designed a mobile-first catalog with live batch pricing, scheduled morning delivery slots, and automated SMS invoice receipts.",
    skillsUsed: ["Figma", "Mobile UI", "Information Architecture", "Design Systems"],
    toolsUsed: ["Figma", "Whimsical"],
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80",
    projectUrl: "https://dokkhonagorik.app/preview/agrofresh",
    githubUrl: "",
    completionDate: "2026-10-12",
    keyOutcomes: "Adopted by 24 regional suppliers; processed ৳850,000 in monthly transactions in early pilot.",
    isPublished: true
  },
  {
    id: "port-3",
    userId: "user-earner-1",
    title: "FinPulse: Micro-Merchant Accounting App for South Asia",
    description: "Simplified double-entry bookkeeping made accessible for non-accountant shop owners via vernacular voice and visual cues.",
    problemStatement: "Small grocery and pharmacy owners in Bangladesh struggle with complex bookkeeping software, resulting in untracked credit dues.",
    approach: "Built high-contrast visual cards with one-tap entry for Cash In / Cash Out and automated daily WhatsApp balance summaries.",
    skillsUsed: ["Fintech UX", "Mobile Design", "Figma", "Prototyping"],
    toolsUsed: ["Figma", "Lottie"],
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80",
    projectUrl: "https://dokkhonagorik.app/preview/finpulse",
    completionDate: "2026-09-28",
    keyOutcomes: "User testing score 94/100 among 12 small merchants in Mirpur market.",
    isPublished: true
  },
  {
    id: "port-4",
    userId: "user-earner-2",
    title: "BengalStore: Multi-Vendor High-Speed Headless Storefront",
    description: "Sub-second loading headless e-commerce frontend built using Next.js 15, Tailwind CSS, and Stripe checkout.",
    problemStatement: "Legacy WooCommerce site suffered 6.5s load times on 4G connections, driving mobile bounce rates over 68%.",
    approach: "Architected static generation with ISR, image optimization, and optimistic cart updates.",
    skillsUsed: ["React / Next.js", "TypeScript", "Tailwind CSS", "Performance Optimization"],
    toolsUsed: ["VS Code", "Vercel", "Chrome DevTools"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    projectUrl: "https://bengalstore-demo.vercel.app",
    githubUrl: "https://github.com/bengalstore/frontend",
    completionDate: "2026-10-02",
    keyOutcomes: "Lighthouse Performance score reached 98; conversion rate jumped from 1.2% to 3.4%.",
    isPublished: true
  }
];

export const initialMarketplaceProjects: MarketplaceProject[] = [
  {
    id: "proj-1",
    businessId: "user-business-1",
    businessName: "Pathao Express / Smart Logistics",
    businessIndustry: "Logistics & Supply Chain",
    title: "Driver Dispatch & Route Scheduling Web Console Redesign",
    category: "UI/UX Design",
    description: "We require a specialized UI/UX designer to modernize our dispatcher control dashboard. You will design responsive screens for assigning fleet drivers, monitoring vehicle GPS in real time, and handling route breakdown exceptions.",
    requiredSkills: ["Figma", "UI/UX Design", "Design Systems", "Data Visualization"],
    experienceLevel: "Intermediate",
    workType: "Remote",
    collaborationType: "Individual",
    budgetBDT: 35000,
    budgetType: "fixed",
    duration: "3 weeks",
    deadline: "2026-12-15",
    postedDate: "2026-11-18",
    deliverables: [
      "Complete Figma design file with interactive prototype",
      "Component specification & design tokens handover",
      "Responsive views for desktop (1440px) and tablet (1024px)",
      "3 review iterations based on operations team feedback"
    ],
    acceptanceCriteria: [
      "Intuitive driver status indicators (active, idle, delayed)",
      "Zero clutter around quick re-assignment actions",
      "Full dark & light palette contrast compliance"
    ],
    applicantCount: 3,
    status: "open"
  },
  {
    id: "proj-2",
    businessId: "user-business-2",
    businessName: "Bengal Organic Foods Ltd",
    businessIndustry: "Agro & Food Processing",
    title: "Direct-to-Consumer Organic Honey & Ghee Brand Website",
    category: "Web Development",
    description: "Looking for an energetic developer or small team to build our high-converting D2C storefront. Must support mobile money payments (bKash/Nagad), customer reviews, and bilingual English/Bengali interface.",
    requiredSkills: ["React / Next.js", "Tailwind CSS", "TypeScript", "Responsive Web"],
    experienceLevel: "Intermediate",
    workType: "Remote",
    collaborationType: "Either",
    budgetBDT: 45000,
    budgetType: "range",
    budgetMaxBDT: 55000,
    duration: "4 weeks",
    deadline: "2026-12-25",
    postedDate: "2026-11-20",
    deliverables: [
      "Production-ready Next.js application repository",
      "Integration with payment gateway webhook",
      "Mobile-optimized product detail pages & checkout",
      "Admin order management overview screen"
    ],
    acceptanceCriteria: [
      "Page speed test under 2 seconds on mobile 4G",
      "100% test coverage for checkout transaction flow"
    ],
    applicantCount: 5,
    status: "open"
  },
  {
    id: "proj-3",
    businessId: "user-business-3",
    businessName: "Apex Retail Solutions",
    businessIndustry: "Retail & Point of Sale",
    title: "Store Inventory Barcode Scanner UI for Tablet",
    category: "UI/UX Design",
    description: "Design an ultra-fast, high-touch UI for retail floor associates to scan barcodes, check warehouse stock levels, and place urgent restock requests in under 15 seconds.",
    requiredSkills: ["Figma", "UI/UX Design", "Mobile App UI"],
    experienceLevel: "Entry",
    workType: "Remote",
    collaborationType: "Individual",
    budgetBDT: 22000,
    budgetType: "fixed",
    duration: "2 weeks",
    deadline: "2026-12-10",
    postedDate: "2026-11-15",
    deliverables: [
      "Figma UI flow with large touch targets",
      "Offline state & low-connectivity warning indicators",
      "Stock lookup search modal"
    ],
    acceptanceCriteria: [
      "Designed specifically for iPad and 10-inch Android tablets",
      "Minimal text entry required; tap and swipe oriented"
    ],
    applicantCount: 2,
    status: "open"
  },
  {
    id: "proj-4",
    businessId: "user-business-1",
    businessName: "Pathao Express / Smart Logistics",
    businessIndustry: "Logistics & Supply Chain",
    title: "Customer Mobile Tracking & Push Notification Flow",
    category: "UI/UX Design",
    description: "Create an engaging parcel delivery tracking screen with interactive rider maps and automated notification triggers.",
    requiredSkills: ["Figma", "Mobile UI", "Prototyping"],
    experienceLevel: "Intermediate",
    workType: "Remote",
    collaborationType: "Individual",
    budgetBDT: 28000,
    budgetType: "fixed",
    duration: "2 weeks",
    deadline: "2026-12-20",
    postedDate: "2026-11-19",
    deliverables: [
      "Live tracking status UI with estimated delivery timer",
      "Rider rating & tipping modal",
      "Micro-animations for package arrival"
    ],
    acceptanceCriteria: ["Compatible with iOS Human Interface Guidelines & Material Design 3"],
    applicantCount: 4,
    status: "open"
  },
  {
    id: "proj-5",
    businessId: "user-business-2",
    businessName: "Bengal Organic Foods Ltd",
    businessIndustry: "Agro & Food Processing",
    title: "Social Media Campaign Visual Identity & Brand Assets",
    category: "Graphic Design",
    description: "Design 15 high-converting Instagram & Facebook ad creatives for winter organic mustard oil and wildflower honey launch.",
    requiredSkills: ["Graphic Design", "Social Media Marketing", "Canva / Figma", "Copywriting"],
    experienceLevel: "Entry",
    workType: "Remote",
    collaborationType: "Individual",
    budgetBDT: 15000,
    budgetType: "fixed",
    duration: "10 days",
    deadline: "2026-12-05",
    postedDate: "2026-11-21",
    deliverables: [
      "15 square (1080x1080) and story (1080x1920) templates",
      "Source design files and compressed web assets"
    ],
    acceptanceCriteria: ["Brand guidelines adherence", "Cohesive color grading"],
    applicantCount: 6,
    status: "open"
  },
  {
    id: "proj-6",
    businessId: "user-business-3",
    businessName: "Apex Retail Solutions",
    businessIndustry: "Retail & Point of Sale",
    title: "Sales Trend Analysis & Demand Forecasting Dashboard",
    category: "Data Analytics",
    description: "Analyze 12 months of multi-store POS transaction records to highlight top-selling product categories, regional margin discrepancies, and stockout patterns.",
    requiredSkills: ["Data Analytics", "SQL", "Data Visualization", "Python"],
    experienceLevel: "Intermediate",
    workType: "Remote",
    collaborationType: "Either",
    budgetBDT: 40000,
    budgetType: "fixed",
    duration: "3 weeks",
    deadline: "2026-12-18",
    postedDate: "2026-11-17",
    deliverables: [
      "Interactive analytics dashboard",
      "Executive summary report highlighting 5 cost-saving opportunities"
    ],
    acceptanceCriteria: ["Validated calculations and clear metric glossaries"],
    applicantCount: 2,
    status: "open"
  },
  {
    id: "proj-7",
    businessId: "user-business-1",
    businessName: "Smart Logistics SME",
    businessIndustry: "Logistics",
    title: "Customer Support Chatbot Flow & Scriptwriting",
    category: "Content Writing",
    description: "Write conversational prompts and fallbacks for our WhatsApp delivery inquiry assistant.",
    requiredSkills: ["Content Writing", "Conversational UX", "Copywriting"],
    experienceLevel: "Entry",
    workType: "Remote",
    collaborationType: "Individual",
    budgetBDT: 12000,
    budgetType: "fixed",
    duration: "1 week",
    deadline: "2026-12-02",
    postedDate: "2026-11-22",
    deliverables: ["Comprehensive dialog flowchart", "Spreadsheet of 40 FAQ intent replies"],
    acceptanceCriteria: ["Empathetic tone and precise resolution steps"],
    applicantCount: 1,
    status: "open"
  },
  {
    id: "proj-8",
    businessId: "user-business-2",
    businessName: "Bengal Organic Foods Ltd",
    businessIndustry: "Agro & Food Processing",
    title: "Packaging Label Design for Export Tea Collection",
    category: "Graphic Design",
    description: "Create premium packaging sticker designs for high-grade Sylhet orthodox black tea tins targeting European boutique distributors.",
    requiredSkills: ["Graphic Design", "Brand Identity", "Packaging Design"],
    experienceLevel: "Intermediate",
    workType: "Remote",
    collaborationType: "Individual",
    budgetBDT: 25000,
    budgetType: "fixed",
    duration: "2 weeks",
    deadline: "2026-12-12",
    postedDate: "2026-11-16",
    deliverables: ["Print-ready vector CMYK PDF files with bleed guides", "3D product renders"],
    acceptanceCriteria: ["Compliance with international food labeling standards"],
    applicantCount: 3,
    status: "open"
  },
  {
    id: "proj-9",
    businessId: "user-business-3",
    businessName: "Apex Retail Solutions",
    businessIndustry: "Retail & Point of Sale",
    title: "PostgreSQL Database Query Optimization for POS Sync",
    category: "Programming",
    description: "Optimize slow indexing and query performance on our central reporting server handling 50 concurrent store sync jobs.",
    requiredSkills: ["SQL", "PostgreSQL", "Database Optimization", "Backend"],
    experienceLevel: "Expert",
    workType: "Remote",
    collaborationType: "Individual",
    budgetBDT: 50000,
    budgetType: "fixed",
    duration: "2 weeks",
    deadline: "2026-12-14",
    postedDate: "2026-11-14",
    deliverables: ["Optimized schema migration script", "Query performance benchmark report"],
    acceptanceCriteria: ["90th percentile query response under 100ms"],
    applicantCount: 4,
    status: "open"
  },
  {
    id: "proj-10",
    businessId: "user-business-1",
    businessName: "Pathao Express / Smart Logistics",
    businessIndustry: "Logistics & Supply Chain",
    title: "Video Explainer Animation for New Merchant Portal",
    category: "Video Editing",
    description: "Produce a crisp 90-second animated product walkthrough demonstrating bulk parcel CSV upload and next-day payout features.",
    requiredSkills: ["Video Editing", "Motion Graphics", "After Effects"],
    experienceLevel: "Intermediate",
    workType: "Remote",
    collaborationType: "Individual",
    budgetBDT: 30000,
    budgetType: "fixed",
    duration: "2 weeks",
    deadline: "2026-12-22",
    postedDate: "2026-11-17",
    deliverables: ["1080p full HD MP4 video", "Voiceover integration & background score"],
    acceptanceCriteria: ["Smooth frame rates, precise typography pacing"],
    applicantCount: 2,
    status: "open"
  },
  {
    id: "proj-11",
    businessId: "user-business-2",
    businessName: "Bengal Organic Foods Ltd",
    businessIndustry: "Agro & Food Processing",
    title: "B2B Wholesale Lead Generation & Outreach Strategy",
    category: "Digital Marketing",
    description: "Identify and qualify 200 retail grocery and supermarket buyers in Chittagong and Sylhet divisions.",
    requiredSkills: ["Digital Marketing", "Lead Generation", "Market Research"],
    experienceLevel: "Entry",
    workType: "Remote",
    collaborationType: "Individual",
    budgetBDT: 18000,
    budgetType: "fixed",
    duration: "2 weeks",
    deadline: "2026-12-08",
    postedDate: "2026-11-20",
    deliverables: ["Clean verified Google Sheets database with phone & email contacts"],
    acceptanceCriteria: ["Minimum 90% email deliverability rate"],
    applicantCount: 3,
    status: "open"
  },
  {
    id: "proj-12",
    businessId: "user-business-3",
    businessName: "Apex Retail Solutions",
    businessIndustry: "Retail & Point of Sale",
    title: "Comprehensive Security Vulnerability Audit for Cloud API",
    category: "Programming",
    description: "Conduct an end-to-end penetration test and security review of our Node.js microservices and JWT token authorization headers.",
    requiredSkills: ["Cybersecurity", "Node.js", "API Security", "Penetration Testing"],
    experienceLevel: "Expert",
    workType: "Remote",
    collaborationType: "Individual",
    budgetBDT: 60000,
    budgetType: "fixed",
    duration: "3 weeks",
    deadline: "2026-12-30",
    postedDate: "2026-11-13",
    deliverables: ["Vulnerability assessment report with remediation patches"],
    acceptanceCriteria: ["OWASP Top 10 compliance audit checklist"],
    applicantCount: 2,
    status: "open"
  }
];

export const initialApplications: ProjectApplication[] = [
  {
    id: "app-1",
    projectId: "proj-1",
    projectTitle: "Driver Dispatch & Route Scheduling Web Console Redesign",
    businessId: "user-business-1",
    businessName: "Pathao Express / Smart Logistics",
    earnerId: "user-earner-1",
    earnerName: "Sabbir Hossain",
    earnerTitle: "Product Designer & UI/UX Specialist",
    coverMessage: "I have extensive experience redesigning logistics and dispatch workflows. In my LogiTrack case study, I reduced booking errors by 34% by simplifying the scheduling matrix. I can complete this in 3 milestones.",
    proposedBudgetBDT: 35000,
    estimatedCompletionTime: "3 weeks",
    portfolioProjectId: "port-1",
    relevantSkills: ["Figma", "UI/UX Design", "Design Systems", "Data Visualization"],
    status: "Accepted",
    appliedDate: "2026-11-19T10:00:00Z"
  },
  {
    id: "app-2",
    projectId: "proj-2",
    projectTitle: "Direct-to-Consumer Organic Honey & Ghee Brand Website",
    businessId: "user-business-2",
    businessName: "Bengal Organic Foods Ltd",
    earnerId: "user-earner-2",
    earnerName: "Maliha Chowdhury",
    earnerTitle: "Full-Stack Web & Next.js Engineer",
    coverMessage: "I specialize in building lightning-fast e-commerce stores on Next.js. I recently delivered BengalStore with sub-second page loads and seamless mobile payment checkouts.",
    proposedBudgetBDT: 48000,
    estimatedCompletionTime: "4 weeks",
    portfolioProjectId: "port-4",
    relevantSkills: ["React / Next.js", "TypeScript", "Tailwind CSS"],
    status: "Under Review",
    appliedDate: "2026-11-21T14:30:00Z"
  },
  {
    id: "app-3",
    projectId: "proj-3",
    projectTitle: "Store Inventory Barcode Scanner UI for Tablet",
    businessId: "user-business-3",
    businessName: "Apex Retail Solutions",
    earnerId: "user-earner-1",
    earnerName: "Sabbir Hossain",
    earnerTitle: "Product Designer & UI/UX Specialist",
    coverMessage: "Tablet-first touch UI requires large hit states and zero visual clutter. I'd love to produce an intuitive prototype for your retail associates.",
    proposedBudgetBDT: 22000,
    estimatedCompletionTime: "2 weeks",
    portfolioProjectId: "port-3",
    relevantSkills: ["Figma", "UI/UX Design", "Mobile App UI"],
    status: "Shortlisted",
    appliedDate: "2026-11-18T16:00:00Z"
  }
];

export const initialActiveProjects: ActiveProject[] = [
  {
    id: "act-1",
    projectId: "proj-1",
    projectTitle: "Driver Dispatch & Route Scheduling Web Console Redesign",
    businessId: "user-business-1",
    businessName: "Pathao Express / Smart Logistics",
    earnerId: "user-earner-1",
    earnerName: "Sabbir Hossain",
    role: "Lead UI/UX Designer",
    deadline: "2026-12-15",
    status: "in_progress",
    totalBudgetBDT: 35000,
    clientFeedback: "Initial wireframes look great! Focus on making driver reassignment drag-and-drop effortless.",
    milestones: [
      {
        id: "ms-1-1",
        title: "Milestone 1: Wireframing & User Flow Architecture",
        description: "Delivery of wireframes for desktop & tablet dispatch grids with user states.",
        amountBDT: 10000,
        deadline: "2026-11-28",
        status: "approved",
        deliverableUrl: "https://figma.com/file/dispatch-wireframes-sample",
        submissionNotes: "Completed low-fi flows and approved by dispatch manager."
      },
      {
        id: "ms-1-2",
        title: "Milestone 2: High-Fidelity UI & Design Token System",
        description: "Design system tokens, typography scales, driver table cards, and interactive filters.",
        amountBDT: 15000,
        deadline: "2026-12-07",
        status: "submitted",
        deliverableUrl: "https://figma.com/file/dispatch-hifi-prototype",
        submissionNotes: "Delivered complete Figma hi-fi prototype with real logistics sample data."
      },
      {
        id: "ms-1-3",
        title: "Milestone 3: Final Design Handoff & Micro-interactions",
        description: "Developer-ready design specs, SVG icon assets, and interaction guidelines.",
        amountBDT: 10000,
        deadline: "2026-12-15",
        status: "pending"
      }
    ]
  }
];

export const initialTransactions: Transaction[] = [
  {
    id: "tx-1",
    userId: "user-earner-1",
    projectId: "proj-1",
    projectTitle: "Driver Dispatch & Route Scheduling Web Console Redesign",
    type: "earning",
    amountBDT: 10000,
    status: "completed",
    date: "2026-11-20T12:00:00Z",
    reference: "SB-TXN-90214 (Milestone 1 Release)"
  },
  {
    id: "tx-2",
    userId: "user-earner-1",
    projectId: "proj-1",
    projectTitle: "Driver Dispatch & Route Scheduling Web Console Redesign",
    type: "earning",
    amountBDT: 15000,
    status: "pending",
    date: "2026-11-22T17:00:00Z",
    reference: "SB-TXN-90432 (Milestone 2 In Escrow)"
  },
  {
    id: "tx-3",
    userId: "user-business-1",
    projectId: "proj-1",
    projectTitle: "Driver Dispatch & Route Scheduling Web Console Redesign",
    type: "spending",
    amountBDT: 10000,
    status: "completed",
    date: "2026-11-20T12:00:00Z",
    reference: "SB-ESC-80121 (Milestone 1 Approved)"
  }
];

export const initialReviews: Review[] = [
  {
    id: "rev-1",
    projectId: "proj-1",
    projectTitle: "LogiTrack Design Prototype",
    fromUserId: "user-business-1",
    fromUserName: "Pathao Express / Smart Logistics",
    toUserId: "user-earner-1",
    toUserName: "Sabbir Hossain",
    rating: 5,
    comment: "Exceptional UI design talent. Sabbir delivered milestone 1 well ahead of schedule and the visual clarity for our dispatch team was spot-on. Highly recommended!",
    createdAt: "2026-11-20T14:00:00Z"
  },
  {
    id: "rev-2",
    projectId: "proj-legacy",
    projectTitle: "Bengal Fresh Mart Mobile UI",
    fromUserId: "user-business-2",
    fromUserName: "Bengal Organic Foods Ltd",
    toUserId: "user-earner-1",
    toUserName: "Sabbir Hossain",
    rating: 4.8,
    comment: "Very communicative and understood our local SME constraints thoroughly.",
    createdAt: "2026-10-15T11:00:00Z"
  }
];

export const initialTeams: Team[] = [
  {
    id: "team-1",
    creatorId: "user-earner-1",
    name: "PixelPulse Design & Dev Studio",
    tagline: "High-impact product design and web engineering for growing Bangladeshi SMEs.",
    description: "We are an agile group of 3 specialists offering turnkey digital product design, frontend engineering in Next.js, and customer journey optimization.",
    skills: ["Figma", "UI/UX Design", "React / Next.js", "Tailwind CSS", "User Research"],
    projectsCompleted: 4,
    members: [
      {
        userId: "user-earner-1",
        name: "Sabbir Hossain",
        role: "Team Leader",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        joinedDate: "2026-09-01"
      },
      {
        userId: "user-earner-2",
        name: "Maliha Chowdhury",
        role: "Developer",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        joinedDate: "2026-09-05"
      },
      {
        userId: "user-earner-3",
        name: "Arifur Rahman",
        role: "Content Specialist",
        joinedDate: "2026-09-12"
      }
    ]
  }
];

export const initialNotifications: Notification[] = [
  {
    id: "notif-1",
    userId: "user-learner-1",
    title: "Milestone Completed!",
    message: "Great job! You completed Phase 1: Foundations of your UI/UX Roadmap.",
    type: "roadmap",
    link: "/learner/roadmap",
    read: false,
    createdAt: "2026-11-22T08:00:00Z"
  },
  {
    id: "notif-2",
    userId: "user-learner-1",
    title: "New Matching Practice Project",
    message: "Based on your interest in Figma Auto-Layout, check out 'Local Artisan E-Commerce Checkout Flow'.",
    type: "resource",
    link: "/learner/practice",
    read: false,
    createdAt: "2026-11-21T10:30:00Z"
  },
  {
    id: "notif-3",
    userId: "user-earner-1",
    title: "Application Accepted!",
    message: "Pathao Express accepted your application for 'Driver Dispatch & Route Scheduling Web Console Redesign'.",
    type: "application",
    link: "/earner/active-projects",
    read: false,
    createdAt: "2026-11-19T10:05:00Z"
  },
  {
    id: "notif-4",
    userId: "user-earner-1",
    title: "Payment Received (৳10,000)",
    message: "Milestone 1 payment has been credited to your simulated earnings wallet.",
    type: "payment",
    link: "/earner/earnings",
    read: true,
    createdAt: "2026-11-20T12:05:00Z"
  },
  {
    id: "notif-5",
    userId: "user-business-1",
    title: "New Application Received",
    message: "Sabbir Hossain applied to 'Driver Dispatch & Route Scheduling Web Console Redesign'.",
    type: "application",
    link: "/business/applications",
    read: true,
    createdAt: "2026-11-19T10:00:00Z"
  }
];
