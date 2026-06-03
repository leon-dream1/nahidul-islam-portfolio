"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";

const techBadges = [
  "Python", "PyTorch", "Swin Transformer",
  "Cross-Validation", "Supervised Contrastive Loss",
  "Cross-Entropy Loss", "XAI", "HAM10000",
];

const bullets = [
  "Developed a two-phase deep learning pipeline for classifying skin lesions into 7 categories using Swin Transformer.",
  "Integrated clinical metadata (age, sex, localization) alongside image features to enhance classification reliability.",
  "Implemented Supervised Contrastive Learning to learn robust and discriminative feature representations.",
  "Applied Cross-Validation ensuring model robustness and generalization across the HAM10000 dataset.",
  "Achieved 98.33% overall accuracy with a Macro F1-score of 0.9727, integrated with Explainable AI (XAI) for transparent diagnostic decision-making.",
];

export default function ResearchSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="research" className="py-24 px-6 border-t border-[var(--border)]">
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
            Academic
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
            Research
          </h2>
          <div className="section-line" />
        </motion.div>

        {/* Research card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card p-8 md:p-10"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Icon */}
            <div className="flex-shrink-0 w-12 h-12 rounded-xl border border-[var(--border)] flex items-center justify-center">
              <BsRobot className="w-5 h-5 text-[var(--text-muted)]" />
            </div>

            <div className="flex-1">
              {/* Title + links */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                <div>
                  <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] text-[var(--text-muted)] mb-3">
                    Undergraduate Thesis
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold text-[var(--text-primary)] leading-snug">
                    Multimodal Skin Lesion Classification &amp; Explainable AI
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    Dataset: HAM10000
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {/* <a
                    href="https://github.com/leon-dream1/Contrastive-Learning-based-Skin-Lesion-classification-using-HAM10000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <FiGithub className="w-4 h-4" />
                    Code
                  </a> */}
                  <a
                    href="https://www.kaggle.com/datasets/kmader/skin-cancer-mnist-ham10000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    Dataset
                  </a>
                </div>
              </div>

              {/* Accuracy highlight */}
              <div className="flex flex-wrap gap-4 my-5">
                {[
                  { label: "Accuracy", value: "98.33%" },
                  { label: "Macro F1", value: "0.9727" },
                  { label: "Classes", value: "7" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="px-4 py-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]"
                  >
                    <p className="text-lg font-bold text-[var(--text-primary)]">
                      {m.value}
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)]">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Bullets */}
              <ul className="space-y-2.5 mb-6">
                {bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                    className="flex gap-3 text-sm text-[var(--text-secondary)]"
                  >
                    <span className="mt-2 w-1 h-1 rounded-full bg-[var(--text-muted)] flex-shrink-0" />
                    <span>{b}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-2">
                {techBadges.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-1 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}