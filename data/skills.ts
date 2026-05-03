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
      "NextAuth",
      "Tailwind CSS",
      "HTML5 / CSS3",
      "Bootstrap",
      "Material UI",
    ],
  },
  {
    category: "Back-End",
    items: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Redis",
      "BullMQ",
      "WebSocket",
      "REST API",
      "JWT",
      "Zod",
    ],
  },
  {
    category: "AI & Machine Learning",
    items: [
      "Python",
      "PyTorch",
      "Deep Learning",
      "Computer Vision",
      "CNN",
      "Swin Transformer",
      "Explainable AI (XAI)",
      "Contrastive Learning",
    ],
  },
  {
    category: "Tools & Others",
    items: [
      "Git / GitHub",
      "Firebase",
      "Stripe",
      "Socket.io",
      "TanStack Query",
      "Cloudinary",
      "Vercel",
      "Postman",
      "Figma",
      "VS Code",
    ],
  },
];
