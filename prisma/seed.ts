import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const jobs = [
  {
    title: "Senior Frontend Engineer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "full-time",
    category: "Engineering",
    salary: "$130,000 - $160,000",
    description:
      "We are looking for a Senior Frontend Engineer to join our growing team. You will be responsible for building and maintaining high-quality web applications using React and TypeScript.\n\nYou will work closely with our product and design teams to deliver exceptional user experiences.",
    requirements:
      "5+ years of experience with React\nStrong TypeScript skills\nExperience with state management (Redux, Zustand)\nFamiliarity with CI/CD pipelines\nExcellent communication skills",
    benefits:
      "Competitive salary\nEquity package\nHealth, dental, and vision insurance\nUnlimited PTO\nRemote-friendly",
    email: "jobs@techcorp.io",
    featured: true,
  },
  {
    title: "Backend Engineer (Node.js)",
    company: "DataFlow Inc.",
    location: "Remote",
    type: "remote",
    category: "Engineering",
    salary: "$110,000 - $140,000",
    description:
      "DataFlow is hiring a Backend Engineer to help scale our data processing platform. You will design and build APIs, microservices, and data pipelines.\n\nWe handle billions of events per day and you will play a key role in keeping things fast and reliable.",
    requirements:
      "3+ years Node.js experience\nPostgreSQL or similar RDBMS\nExperience with message queues (Kafka, RabbitMQ)\nDocker and Kubernetes knowledge",
    benefits:
      "100% remote\nHome office stipend\nFlexible hours\nAnnual learning budget",
    email: "hiring@dataflow.com",
    featured: true,
  },
  {
    title: "Product Designer",
    company: "CreativeStudio",
    location: "New York, NY",
    type: "full-time",
    category: "Design",
    salary: "$95,000 - $120,000",
    description:
      "CreativeStudio is looking for a talented Product Designer to create beautiful and intuitive user interfaces. You will own the design process from research to final delivery.\n\nWe value creativity, attention to detail, and a user-first mindset.",
    requirements:
      "4+ years of product design experience\nProficiency in Figma\nStrong portfolio demonstrating UX work\nExperience conducting user research",
    benefits:
      "Creative work environment\nArt supply budget\nFlex Fridays\nNYC office with great amenities",
    email: "design@creativestudio.co",
    featured: false,
  },
  {
    title: "DevOps Engineer",
    company: "CloudBase",
    location: "Austin, TX",
    type: "full-time",
    category: "Engineering",
    salary: "$120,000 - $150,000",
    description:
      "CloudBase is seeking a DevOps Engineer to help maintain and improve our cloud infrastructure. You will work with our engineering teams to automate deployments and ensure system reliability.",
    requirements:
      "AWS or GCP expertise\nTerraform experience\nKubernetes administration\nStrong scripting skills (Bash, Python)",
    benefits: "401k with company match\nRelocation assistance\nStock options",
    email: "ops@cloudbase.io",
    featured: false,
  },
  {
    title: "Marketing Manager",
    company: "GrowthHQ",
    location: "Chicago, IL",
    type: "full-time",
    category: "Marketing",
    salary: "$80,000 - $100,000",
    description:
      "GrowthHQ is looking for a data-driven Marketing Manager to lead our digital marketing efforts. You will manage campaigns, analyze performance, and grow our customer base.\n\nThis is a high-impact role with direct access to leadership.",
    requirements:
      "5+ years in digital marketing\nExperience with SEO, SEM, and paid social\nStrong analytical skills\nHubSpot or Salesforce experience",
    benefits:
      "Performance bonuses\nHybrid work schedule\nProfessional development budget",
    email: "careers@growthhq.com",
    featured: false,
  },
  {
    title: "Data Scientist",
    company: "Analytix",
    location: "Remote",
    type: "remote",
    category: "Data & AI",
    salary: "$125,000 - $155,000",
    description:
      "Analytix is hiring a Data Scientist to build predictive models and extract insights from large datasets. You will collaborate with product and engineering to integrate ML models into our platform.",
    requirements:
      "PhD or Masters in a quantitative field\nPython and SQL proficiency\nExperience with scikit-learn, TensorFlow, or PyTorch\nData visualization skills",
    benefits:
      "Fully remote\nTop-tier health benefits\nConference sponsorship\nPublishing support",
    email: "data@analytix.ai",
    featured: true,
  },
  {
    title: "Customer Success Manager",
    company: "SupportPro",
    location: "Boston, MA",
    type: "full-time",
    category: "Customer Success",
    salary: "$70,000 - $90,000",
    description:
      "SupportPro is looking for a Customer Success Manager to ensure our clients get maximum value from our platform. You will manage a portfolio of enterprise accounts and drive retention.",
    requirements:
      "3+ years in customer success or account management\nExperience with SaaS products\nStrong communication and presentation skills\nSalesforce or Gainsight knowledge",
    benefits:
      "Commission structure\nFlexible PTO\nTravel opportunities\nWellness stipend",
    email: "success@supportpro.com",
    featured: false,
  },
  {
    title: "Part-Time Content Writer",
    company: "BlogNation",
    location: "Remote",
    type: "part-time",
    category: "Content",
    salary: "$30 - $50 / hour",
    description:
      "BlogNation is seeking a talented part-time Content Writer to produce high-quality blog posts, articles, and web copy. Flexible schedule with approximately 20 hours per week.",
    requirements:
      "Excellent writing and editing skills\nSEO knowledge\nAbility to meet deadlines\nPortfolio of published work",
    benefits: "Work from anywhere\nFlexible schedule\nBy-line credit",
    email: "content@blognation.com",
    featured: false,
  },
];

async function main() {
  console.log("Seeding database...");
  for (const job of jobs) {
    await prisma.job.create({ data: job });
  }
  console.log(`Seeded ${jobs.length} jobs successfully.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
