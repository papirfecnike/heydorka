const headline =
  "Design leader with 18+ years in product design, UX/UI, and design " +
  "leadership — scaling teams, design systems, and design operations from " +
  "the ground up. I hire and coach talent, embed design in strategic " +
  "planning, and turn UX research into measurable outcomes: recent work " +
  "has cut support tickets by ~35% and call-handling time by ~20%. " +
  "Currently focused on AI-era design leadership, and speaking " +
  "internationally on the subject.";

const cv = {
  headline,

  linkedinUrl: "https://www.linkedin.com/in/makszydora/",

  experience: [
    {
      id: 1,
      title: "Head of Design",
      company: "Element Logic",
      period: "2025 – present",
      current: true,
      badge: "Promoted",
      tags: ["Design Leadership", "Hiring & Mentoring", "AI-Era Design Ops"],
      description: [
        "Lead design strategy for a fast-scaling, cross-functional product org — grew the UX team from 2 to 4 through 2 hires I made and onboarded.",
        "Coach for ownership within empowered teams: mentored a mid-level designer to senior (now facing promotion) and a junior toward a strong generalist range.",
        "Established AI-assisted design workflows — shared skills, guardrails, agent workflows — freeing the team to focus on user understanding over mechanical work.",
        "Shifted design critiques from surface polish to problem-solving rigor, keeping design as the quality gate as AI adoption scales.",
      ],
      caseStudy: { href: "/case-studies#designsystems", label: "See case study: Design Systems" },
    },
    {
      id: 2,
      title: "Senior UX Designer",
      company: "Element Logic",
      period: "2024 – 2025",
      tags: ["Design Systems", "UX Strategy", "Cross-functional Collaboration"],
      description: [
        "Owned design strategy for eManager, Element Logic's flagship AutoStore robotics interface, aligning 5 engineering teams around a shared vision — work that led directly to my promotion into Head of Design.",
        "Built the eManager design system from scratch — tokens, components, documentation — as the single source of truth for the interface.",
        "Partnered continuously with developers to keep design and implementation aligned, rather than handing off finished specs.",
        "Began building strategic systems and processes with product managers, extending design's reach beyond individual features.",
      ],
      caseStudy: { href: "/case-studies#designsystems", label: "See case study: Design Systems" },
    },
    {
      id: 3,
      title: "Product Design & DesignOps Lead",
      company: "Futurehome",
      period: "2022 – 2024",
      tags: ["UX Research", "Information Architecture", "DesignOps"],
      description: [
        "Rebuilt Futurehome's mobile app navigation from a sprawling, ad-hoc menu into 5 logical sections — cutting top-level navigation from 12 to 5 and reducing 'where do I find X' support tickets by ~35%.",
        "Grounded the redesign in research — personas, feature audits, and behavior mapping — replacing reliance on the existing menu structure.",
        "Prototyped and documented the full flow (login, dashboard, consumption, automations, settings) for engineering handoff.",
        "Cut taps to view today's energy consumption from 3 to 1, delivering WCAG-compliant designs against tight deadlines.",
      ],
      caseStudy: { href: "/case-studies#futurehome", label: "See case study: Futurehome" },
    },
    {
      id: 4,
      title: "Senior Product Designer",
      company: "GoTo (ex-LogMeIn)",
      period: "2022",
      tags: ["Accessibility (WCAG)", "Design Systems", "Agile Delivery"],
      description: [
        "Collaborated closely with engineering to deliver precise, pixel-perfect designs within GoTo's existing product system.",
        "Maintained WCAG accessibility standards while shipping complex features on tight deadlines, introducing design reviews to catch issues early.",
        "Documented projects thoroughly, strengthening cross-team collaboration and keeping agile delivery moving.",
      ],
    },
    {
      id: 5,
      title: "Design Team Leader",
      company: "VCC:Live",
      period: "2020 – 2022",
      tags: ["Design Systems", "Hiring & Team Building", "UX Research"],
      description: [
        "Rebuilt the operator's call-handling 'cockpit' into fixed zones (script, customer context, controls), cutting average call-handling time by ~20%.",
        "Built the product's first design system from scratch and rolled it out with a design team I hired and built from zero.",
        "Shadowed live calls and mapped always-visible vs. on-demand information needs before redesigning the layout.",
        "Cut new-agent ramp-up time from 3 weeks to 2 and reduced mid-call escalations from lost context by roughly a third.",
      ],
      caseStudy: { href: "/case-studies#vcclive", label: "See case study: VCC:Live" },
    },
    {
      id: 6,
      title: "Design lecturer",
      company: "Code.X",
      period: "2021",
      tags: ["Design Thinking", "UX Research", "Teaching"],
      description: [
        "Volunteered as instructor for Code.X's Code for Albania program, teaching human-centered design to aspiring designers.",
        "Delivered hands-on training in design thinking, UX research, and usability testing methods.",
        "Guided students through prototyping exercises, turning research insights into testable design solutions.",
      ],
    },
    {
      id: 7,
      title: "Senior Project Manager",
      company: "Supercharge",
      period: "2019 – 2020",
      tags: ["UX/UI Design", "User Research", "Cross-functional Delivery"],
      description: [
        "Led UX/UI design and delivery for Ericsson's MWC 2020 sales demo, owning the project from concept through execution.",
        "Conducted user research to shape the demo experience and coordinated scheduling across cross-functional teams.",
        "Managed cross-team execution against a fixed deadline (the event was ultimately cancelled due to COVID).",
      ],
    },
    {
      id: 8,
      title: "Senior Business Analyst & UX Designer",
      company: "IBM",
      period: "2018 – 2019",
      tags: ["UX Research", "Journey Mapping", "OKRs"],
      description: [
        "Led the transformation of a monolithic internal application into a user-centric service for a global user base.",
        "Ran global user research and journey mapping to identify pain points and prioritize redesign work.",
        "Tracked delivery against OKRs, aligning design decisions with measurable business goals.",
      ],
    },
    {
      id: 9,
      title: "Development Team Leader",
      company: "Commsignia",
      period: "2017 – 2018",
      tags: ["Agile Leadership", "OKRs", "Delivery Analytics"],
      description: [
        "Led cross-functional C/C++/Java teams building a V2X (vehicle-to-everything) solution.",
        "Introduced agile practices and OKRs, improving delivery predictability across teams.",
        "Built delivery analytics and reporting for leadership to track progress and surface risks early.",
      ],
    },
    {
      id: 10,
      title: "Senior Project Manager",
      company: "AImotive",
      period: "2016 – 2017",
      tags: ["Program Management", "Cross-functional Leadership"],
      description: [
        "Led project execution and a 9–12 person international engineering team on Volvo's self-driving car program.",
        "Partnered closely with Nvidia to align technical milestones and cross-team delivery.",
      ],
    },
    {
      id: 11,
      title: "Scrum Master",
      company: "NNG (Nav N Go)",
      period: "2014 – 2016",
      badge: "Returned from maternity break",
      tags: ["Agile Delivery", "Process Improvement", "Stakeholder Reporting"],
      description: [
        "Drove resource allocation and process improvements across 12 core development teams, negotiating priorities between development and project teams.",
        "Facilitated the rollout of agile processes and routines, promoting knowledge sharing and transparency across teams.",
        "Reported weekly progress and improvements to upper management, adhering to preset KPIs to keep delivery on track.",
      ],
    },
    {
      id: 12,
      title: "UI developer",
      company: "NNG (Nav N Go)",
      period: "2007 – 2012",
      tags: ["UI Design", "Design Systems", "Cross-platform Delivery"],
      description: [
        "Designed and maintained the UI and design system for NNG's car and pedestrian navigation software.",
        "Ensured design consistency across releases shipped for multiple car manufacturers and iPhone.",
        "Collaborated with engineering to implement UI components within platform constraints.",
      ],
    },
  ],

  education: [
    {
      id: 1,
      title: "Master of Business Administration",
      institution: "Budapest University of Technology and Economics",
      period: "2010 – 2013",
      description: [
        "Accounting, finance, project management, law, economics, marketing, and HR. Thesis on early-stage company management.",
      ]
    },
    {
      id: 2,
      title: "Bachelor of Arts",
      institution: "University of Hertfordshire",
      period: "2004 – 2008",
      description: [
        "Business, economics, marketing, and project management. Thesis on motivating creative teams.",
      ]
    },
  ],

  skills: [
    {
      id: "leadership",
      title: "Leadership",
      items: [
        "Design Leadership",
        "Executive Alignment",
        "Mentorship & Coaching",
        "People & Stakeholder Management",
      ],
    },
    {
      id: "product-research",
      title: "Product & Research",
      items: [
        "UX Research",
        "Usability Testing",
        "Cross-functional Strategy",
        "Design Craft & Quality",
        "Accessibility (WCAG 2.1 AA)",
      ],
    },
    {
      id: "systems-ops",
      title: "Systems & Ops",
      items: [
        "Design Systems",
        "Design Operations",
        "Org & Team Strategy",
        "Hiring & Talent Growth",
        "Roadmapping & Documentation",
      ],
    },
    {
      id: "tools",
      title: "Tools & practice",
      items: [
        "Figma",
        "Prototyping",
        "Information Architecture",
        "AI-Assisted Design Workflows",
        "Public Speaking",
      ],
    },
  ],
};

export default cv;
