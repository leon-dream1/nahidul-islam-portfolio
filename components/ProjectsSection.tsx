"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects, Project } from "@/data/projects";
import { FiGithub, FiExternalLink } from "react-icons/fi";

type Filter = "all" | "fullstack" | "backend" | "api";

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Full-Stack", value: "fullstack" },
  { label: "Backend", value: "backend" },
  { label: "API", value: "api" },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card p-6 flex flex-col gap-4 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold text-[var(--text-primary)] leading-snug">
          {project.title}
        </h3>
        <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {project.clientRepo && (
            <a
              href={project.clientRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="GitHub"
            >
              <FiGithub className="w-4 h-4" />
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Live link"
            >
              <FiExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {project.description}
      </p>

      {/* Key bullet */}
      <ul className="space-y-1.5">
        {project.bullets.slice(0, 2).map((b, i) => (
          <li key={i} className="flex gap-2 text-xs text-[var(--text-muted)]">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--text-muted)] flex-shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-[10px] font-mono px-2 py-1 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mb-3">
            Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
            Projects
          </h2>
          <div className="section-line" />

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`text-xs px-4 py-2 rounded-lg border transition-all duration-200 ${
                  activeFilter === f.value
                    ? "bg-[var(--text-primary)] text-[var(--bg)] border-transparent"
                    : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text-secondary)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}