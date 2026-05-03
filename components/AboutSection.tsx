"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiDownload } from "react-icons/fi";

const stats = [
  { value: "3.74", label: "CGPA" },
  { value: "4+", label: "Projects" },
  { value: "505+", label: "GitHub Contributions" },
  { value: "Feb 2026", label: "Graduated" },
];

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="py-24 px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mb-3">
              About
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
              Who I am
            </h2>
            <div className="section-line" />

            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">
              <p>
                I am a Software Engineer, specializing in
                building scalable, production-ready applications with the{" "}
                <span className="text-[var(--text-primary)] font-medium">
                  MERN stack and PostgreSQL
                </span>
                . I have hands-on experience implementing System Design patterns,
                including Redis caching, BullMQ for background tasks, and
                real-time WebSocket communication.
              </p>
              <p>
                Alongside web development, I am a researcher in{" "}
                <span className="text-[var(--text-primary)] font-medium">
                  Computer Vision and Explainable AI (XAI)
                </span>
                . My undergraduate thesis focuses on skin lesion classification
                using Swin Transformers, achieving 98.3% accuracy on the HAM10000
                dataset.
              </p>
              <p>
                I am a fast learner with an engineering mindset, dedicated to
                bridging intelligent, data-driven ML solutions with robust,
                user-centric web architectures.
              </p>
              <p>
                Moving forward, I am dedicated to evolving into the{" "}
                <span className="text-[var(--text-primary)] font-medium">
                  AI &amp; Data Science
                </span>{" "}
                domain, aiming to bridge the gap between intelligent ML models
                and robust, user-centric web systems to build the next generation
                of data-driven applications.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="https://drive.google.com/file/d/1yot5mywUQcWnKHjNgy7lkbuh_BRw87Oa/view?usp=sharing"
                download
                target="_blank"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-strong)] text-sm text-[var(--text-secondary)] rounded-lg hover:bg-[var(--text-primary)] hover:text-[var(--bg)] hover:border-transparent transition-all duration-200"
              >
                <FiDownload className="w-4 h-4" />
                Download CV
              </a>
            </div>
          </motion.div>

          {/* Right — stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="card p-6 flex flex-col justify-center h-full"
                >
                  <p className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-1">
                    {s.value}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Quick facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="card p-6 space-y-3"
            >
              {[
                ["Location", "Narayanganj, Dhaka, Bangladesh"],
                ["Email", "nahidulislam019045@gmail.com"],
                ["Languages", "Bengali (Native), English (Fluent)"],
                ["Interests", "Football, Traveling, New Technologies"],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-3 text-sm">
                  <span className="text-[var(--text-muted)] w-24 flex-shrink-0">
                    {label}
                  </span>
                  <span className="text-[var(--text-secondary)]">{value}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}