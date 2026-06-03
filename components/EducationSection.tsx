"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HiAcademicCap } from "react-icons/hi";

type Education = {
  degree: string;
  institution: string;
  period: string;
  result: string;
  description?: string;
};

const educations: Education[] = [
  {
    degree: "B.Sc. in Computer Science and Engineering",
    institution: "Green University of Bangladesh",
    period: "2022 – 2026",
    result: "CGPA: 3.74 / 4.00",
    description:
      "Focusing on Software Engineering, Machine Learning, and Computer Vision. Conducting undergraduate thesis research on Multimodal Skin Lesion Classification using Swin Transformer and Explainable AI.",
  },
  {
    degree: "Higher Secondary Certificate (H.S.C.)",
    institution: "Govt. Tolaram College, Narayangonj, Dhaka",
    period: "2020",
    result: "GPA: 5.00 / 5.00",
  },
  {
    degree: "Secondary School Certificate (S.S.C.)",
    institution: "I.E.T. Govt. High School,Narayangonj, Dhaka",
    period: "2018",
    result: "GPA: 5.00 / 5.00",
  },
];

export default function EducationSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="education"
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
            Background
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
            Education
          </h2>
          <div className="section-line" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-[var(--border)] hidden md:block" />

          <div className="space-y-6">
            {educations.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="md:pl-14 relative"
              >
                {/* Dot on timeline */}
                <div className="hidden md:flex absolute left-0 top-6 w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--bg-card)] items-center justify-center">
                  <HiAcademicCap className="w-4 h-4 text-[var(--text-muted)]" />
                </div>

                {/* Card */}
                <div className="card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-[var(--text-primary)]">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-mono text-[var(--text-muted)] block">
                        {edu.period}
                      </span>
                      <span className="text-xs font-medium text-[var(--text-secondary)] block mt-0.5">
                        {edu.result}
                      </span>
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-3">
                      {edu.description}
                    </p>
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