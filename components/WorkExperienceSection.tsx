"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HiBriefcase } from "react-icons/hi";

type WorkExperience = {
  position: string;
  company: string;
  period: string;
  type: string;
  location: string;
  description?: string;
  skills?: string[];
};

const experiences: WorkExperience[] = [
  {
    position: "Jr. Full Stack Developer",
    company: "Beuptech Agency",
    period: "Feb 2026 - Present",
    type: "Full-time",
    location: "On-site",
    description:
      "Designing and implementing scalable, high-performance full-stack solutions with a strong focus on robust system design principles. " +
      "Architecting modular, highly available backend infrastructures, containerizing services with Docker, and deploying them efficiently on AWS. " +
      "Optimizing data models, database queries, and API endpoints while implementing caching and rate-limiting strategies to handle high-concurrency traffic seamlessly.",
  },
  {
    position: "AR VR Developer",
    company: "Battery Low Interactive Ltd.",
    period: "Nov 2025 - Dec 2025",
    type: "Internship",
    location: "Dhaka, Bangladesh · On-site",
    description:
      "Collaborated on designing and developing immersive Augmented Reality (AR) and Virtual Reality (VR) applications. " +
      "Contributed to building interactive environments, optimizing real-time rendering, and implementing core application logic to deliver high-quality user experiences.",
  },
];

export default function WorkExperienceSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="experience"
      className="py-24 px-6 border-t border-[var(--border)]"
    >
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
            Professional
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
            Work Experience
          </h2>
          <div className="section-line" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-[var(--border)] hidden md:block" />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="md:pl-14 relative"
              >
                {/* Dot on timeline */}
                <div className="hidden md:flex absolute left-0 top-6 w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--bg-card)] items-center justify-center">
                  <HiBriefcase className="w-4 h-4 text-[var(--text-muted)]" />
                </div>

                {/* Card */}
                <div className="card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-[var(--text-primary)]">
                        {exp.position}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-mono text-[var(--text-muted)] block">
                        {exp.period}
                      </span>
                      <span className="text-xs font-medium text-[var(--text-secondary)] block mt-0.5">
                        {exp.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mb-3">
                    📍 {exp.location}
                  </p>
                  {exp.description && (
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3">
                      {exp.description}
                    </p>
                  )}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 text-xs rounded bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border)]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
