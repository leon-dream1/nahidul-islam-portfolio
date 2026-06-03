export type SkillCategory = {
  category: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    category: "Front-End",
    items: [
      "JavaScript (ES6+)",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "HTML5 / CSS3",
      "Bootstrap",
      "Material UI",
      "Redux Toolkit",
      "RTK Query",
      "TanStack Query",
      "Vite",
    ],
  },
  {
    category: "Back-End",
    items: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Socket.io",
      "REST API",
      "JWT",
      "Zod",
      "BullMQ",
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      "AWS",
      "Docker",
      "Git / GitHub",
      "Firebase",
      "Vercel",
      "Postman",
      "Stripe",
      "Cloudinary",
      "VS Code",
    ],
  },
  {
    category: "AI & Machine Learning",
    items: [
      "Python",
      "PyTorch",
      "NumPy",
      "Pandas",
      "scikit-learn",
      "Matplotlib",
      "Deep Learning",
      "Computer Vision",
      "Swin Transformer",
      "Explainable AI (XAI)",
    ],
  },
];
