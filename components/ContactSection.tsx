"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Status = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--border-strong)] transition-colors duration-200";

  return (
    <section id="contact" className="py-24 px-6">
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
            Say hello
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
            Get in Touch
          </h2>
          <div className="section-line" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <p className="text-[var(--text-secondary)] leading-relaxed">
              I&apos;m currently open to new opportunities — whether it&apos;s a
              full-time position, freelance project, or just a conversation about
              tech. Drop me a message and I&apos;ll get back to you soon.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href="mailto:nahidulislam019045@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors group"
              >
                <HiMail className="w-4 h-4 flex-shrink-0 group-hover:text-[var(--text-secondary)]" />
                nahidulislam019045@gmail.com
              </a>
              <a
                href="tel:+8801887576888"
                className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors group"
              >
                <HiPhone className="w-4 h-4 flex-shrink-0 group-hover:text-[var(--text-secondary)]" />
                +880 1887 576888
              </a>
              <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                <HiLocationMarker className="w-4 h-4 flex-shrink-0" />
                Narayanganj, Dhaka, Bangladesh
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/leon-dream1/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <FaGithub className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/nahidulislam-cs/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <FaLinkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs text-[var(--text-muted)] mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nahidul Islam"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs text-[var(--text-muted)] mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="hello@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs text-[var(--text-muted)] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Status messages */}
              {status === "success" && (
                <p className="text-xs text-green-600 dark:text-green-400">
                  Message sent! I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-xs text-red-500">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-1 px-6 py-3 bg-[var(--text-primary)] text-[var(--bg)] text-sm font-medium rounded-lg hover:opacity-80 disabled:opacity-40 transition-opacity duration-200"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}