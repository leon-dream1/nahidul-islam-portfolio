"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiHtml5, SiCss,
  SiTailwindcss, SiBootstrap, SiMui, SiRedux,
  SiNodedotjs, SiExpress, SiMongodb, SiMongoose, SiRedis, SiSocketdotio,
  SiJsonwebtokens, SiZod, SiPostgresql, SiPrisma,
  SiPython, SiPytorch, SiNumpy, SiPandas, SiScikitlearn,
  SiGit, SiGithub, SiFirebase, SiStripe, SiCloudinary, SiVercel,
  SiPostman, SiFigma, SiVite,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { BsRobot } from "react-icons/bs";
import { VscVscode } from "react-icons/vsc";
import { FaDatabase, FaServer } from "react-icons/fa";

type Skill = {
  name: string;
  icon: React.ElementType;
};

type Category = {
  title: string;
  skills: Skill[];
};

const categories: Category[] = [
  {
    title: "Front-End",
    skills: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Bootstrap", icon: SiBootstrap },
      { name: "Material UI", icon: SiMui },
      { name: "Redux Toolkit", icon: SiRedux },
      { name: "RTK Query", icon: SiRedux },
      { name: "TanStack Query", icon: TbBrandReactNative },
    ],
  },
  {
    title: "Back-End",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Mongoose", icon: SiMongoose },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Prisma", icon: SiPrisma },
      { name: "Redis", icon: SiRedis },
      { name: "Socket.io", icon: SiSocketdotio },
      { name: "JWT", icon: SiJsonwebtokens },
      { name: "Zod", icon: SiZod },
      { name: "REST API", icon: FaServer },
      { name: "BullMQ", icon: FaDatabase },
    ],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "Python", icon: SiPython },
      { name: "PyTorch", icon: SiPytorch },
      { name: "NumPy", icon: SiNumpy },
      { name: "Pandas", icon: SiPandas },
      { name: "scikit-learn", icon: SiScikitlearn },
      { name: "Matplotlib", icon: SiScikitlearn },
      { name: "Deep Learning", icon: BsRobot },
      { name: "Computer Vision", icon: BsRobot },
      { name: "Swin Transformer", icon: BsRobot },
      { name: "Explainable AI", icon: BsRobot },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Firebase", icon: SiFirebase },
      { name: "Stripe", icon: SiStripe },
      { name: "Cloudinary", icon: SiCloudinary },
      { name: "Vercel", icon: SiVercel },
      { name: "Postman", icon: SiPostman },
      { name: "Figma", icon: SiFigma },
      { name: "VS Code", icon: VscVscode },
      { name: "Vite", icon: SiVite },
    ],
  },
];

function SkillCard({ skill, delay }: { skill: Skill; delay: number }) {
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      viewport={{ once: true }}
      className="group flex flex-col items-center gap-2.5 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-strong)] hover:-translate-y-1 transition-all duration-200 cursor-default"
    >
      <Icon className="w-6 h-6 text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors duration-200" />
      <span className="text-[10px] text-[var(--text-muted)] text-center leading-tight">
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function SkillsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-24 px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mb-3">
            Expertise
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
            Skills
          </h2>
          <div className="section-line" />
        </motion.div>

        <div className="space-y-10">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
            >
              <h3 className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-4">
                {cat.title}
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                {cat.skills.map((skill, si) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    delay={ci * 0.05 + si * 0.03}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}