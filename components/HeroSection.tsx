"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { HiArrowDown } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail } from "react-icons/hi";




import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

// ─── Types ───────────────────────────────────────────────────────────────────

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
};

// ─── Particle Canvas Component ───────────────────────────────────────────────

function ParticleCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DOT_COLOR = isDark ? "255,255,255" : "75,85,99";
    const LINE_COLOR = isDark ? "255,255,255" : "107,114,128";
    const REPULSE_R = 120;
    const LINK_DIST = 165;
    const COUNT = 100;

    let dots: Dot[] = [];
    let W = 0;
    let H = 0;

    function resize() {
      W = canvas!.width = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
    }

    function makeDot(): Dot {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.85,
        vy: (Math.random() - 0.5) * 0.85,
        r: Math.random() * 2.1 + 1,
        alpha: Math.random() * 0.5 + 0.35,
      };
    }

    function init() {
      dots = Array.from({ length: COUNT }, makeDot);
    }

    function tick() {
      ctx!.clearRect(0, 0, W, H);

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        // soft mouse repulse
        const mx = d.x - mouse.current.x;
        const my = d.y - mouse.current.y;
        const md = Math.sqrt(mx * mx + my * my);
        if (md < REPULSE_R && md > 0) {
          const f = ((REPULSE_R - md) / REPULSE_R) * 0.09;
          d.vx += (mx / md) * f;
          d.vy += (my / md) * f;
        }

        // velocity damping
        d.vx *= 0.98;
        d.vy *= 0.98;

        // clamp speed
        const spd = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        if (spd > 1.8) { d.vx = (d.vx / spd) * 1.8; d.vy = (d.vy / spd) * 1.8; }

        d.x += d.vx;
        d.y += d.vy;

        // bounce
        if (d.x < 0) { d.x = 0; d.vx *= -1; }
        if (d.x > W) { d.x = W; d.vx *= -1; }
        if (d.y < 0) { d.y = 0; d.vy *= -1; }
        if (d.y > H) { d.y = H; d.vy *= -1; }

        // draw dot
        ctx!.beginPath();
        ctx!.shadowBlur = 8;
        ctx!.shadowColor = `rgba(${DOT_COLOR}, ${Math.min(0.35, d.alpha)})`;
        ctx!.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${DOT_COLOR},${d.alpha})`;
        ctx!.fill();
        ctx!.shadowBlur = 0;

        // draw links
        for (let j = i + 1; j < dots.length; j++) {
          const e = dots[j];
          const lx = d.x - e.x;
          const ly = d.y - e.y;
          const ld = Math.sqrt(lx * lx + ly * ly);
          if (ld < LINK_DIST) {
            const la = (1 - ld / LINK_DIST) * 0.45;
            ctx!.beginPath();
            ctx!.moveTo(d.x, d.y);
            ctx!.lineTo(e.x, e.y);
            ctx!.strokeStyle = `rgba(${LINE_COLOR},${la})`;
            ctx!.lineWidth = 0.9;
            ctx!.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    }
    function onLeave() {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    init();
    tick();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ display: "block" }}
    />
  );
}

export default function HeroSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const isDark = !mounted || resolvedTheme === "dark";

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* Particle background */}
      <ParticleCanvas isDark={isDark} />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 w-full">
        <div className="max-w-3xl">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-sm text-[var(--text-muted)] mb-6 tracking-widest uppercase"
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-[var(--text-primary)] leading-tight mb-4"
          >
            Md Nahidul
            <br />
            <span className="text-[var(--text-secondary)]">Islam</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xl md:text-2xl text-[var(--text-secondary)] mb-6 h-10 font-light"
          >
            <TypeAnimation
              sequence={[
                "Software Engineer — MERN Stack",
                2000,
                "Full-Stack Developer",
                2000,
                "Machine Learning Enthusiast",
                2000,
                "Computer Vision Researcher",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

            <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed mb-10 max-w-xl"
          >
            Software Engineer specializing in{" "}
            <span className="text-[var(--text-secondary)] font-medium">
              MERN/PERN stack
            </span>
            . Building scalable systems with System Design principles—Load
            Balancing, caching, and message queues. Passionate about{" "}
            <span className="text-[var(--text-secondary)] font-medium">
              AI &amp; Data Science
            </span>
            , aiming to integrate ML into robust data-driven solution.
          </motion.p>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <button
              onClick={() => scrollTo("#projects")}
              className="px-6 py-3 bg-[var(--text-primary)] text-[var(--bg)] text-sm font-medium rounded-lg hover:opacity-80 transition-opacity duration-200"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="px-6 py-3 border border-[var(--border-strong)] text-[var(--text-secondary)] text-sm font-medium rounded-lg hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all duration-200"
            >
              Get in Touch
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex items-center gap-5"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:nahidulislam019045@gmail.com"
              aria-label="Email"
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <HiMail className="w-5 h-5" />
            </a>
            <div className="h-px w-12 bg-[var(--border-strong)]" />
            <span className="font-mono text-xs text-[var(--text-muted)]">
              Narayanganj, Bangladesh
            </span>
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <HiArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.button>

    </section>
  );
}












// export default function HeroSection() {

//   //   const { resolvedTheme } = useTheme();
//   // const [mounted, setMounted] = useState(false);
//   // useEffect(() => setMounted(true), []);
//   const scrollToProjects = () => {
//     const el = document.querySelector("#projects");
//     if (el) el.scrollIntoView({ behavior: "smooth" });
//   };

//   const scrollToContact = () => {
//     const el = document.querySelector("#contact");
//     if (el) el.scrollIntoView({ behavior: "smooth" });
//   };

//   //  const isDark = !mounted || resolvedTheme === "dark";

//   return (
//     <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
//       {/* <ParticleCanvas isDark={isDark} /> */}
      
//       {/* Subtle background grid */}
//       <div
//         className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
//         style={{
//           backgroundImage: `radial-gradient(circle at 1px 1px, var(--text-primary) 1px, transparent 0)`,
//           backgroundSize: "40px 40px",
//         }}
//       />

//       <div className="max-w-6xl mx-auto px-6 py-32 w-full">
//         <div className="max-w-3xl">
//           {/* Greeting */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="font-mono text-sm text-[var(--text-muted)] mb-6 tracking-widest uppercase"
//           >
//             Hello, I&apos;m
//           </motion.p>

//           {/* Name */}
//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-5xl md:text-7xl font-bold text-[var(--text-primary)] leading-tight mb-4"
//           >
//             Md Nahidul
//             <br />
//             <span className="text-[var(--text-secondary)]">Islam</span>
//           </motion.h1>

//           {/* Typewriter role */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//             className="text-xl md:text-2xl text-[var(--text-secondary)] mb-6 h-10 font-light"
//           >
//             <TypeAnimation
//               sequence={[
//                 "Software Engineer",
//                 2000,
//                 "Full-Stack Developer",
//                 2000,
//                 "MERN Stack Developer",
//                 2000,
//                 "Machine Learning Enthusiast",
//                 2000,
//                 "Data Science Enthusiast",
//                 2000,
//               ]}
//               wrapper="span"
//               speed={50}
//               repeat={Infinity}
//             />
//           </motion.div>

//           {/* Short tagline */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.8 }}
//             className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed mb-10 max-w-xl"
//           >
//             Software Engineer specializing in{" "}
//             <span className="text-[var(--text-secondary)] font-medium">
//               MERN/PERN stack
//             </span>
//             . Building scalable systems with System Design principles—Load
//             Balancing, caching, and message queues. Passionate about{" "}
//             <span className="text-[var(--text-secondary)] font-medium">
//               AI &amp; Data Science
//             </span>
//             , aiming to integrate ML into robust data-driven solution.
//           </motion.p>

//           {/* CTA Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 1.0 }}
//             className="flex flex-wrap items-center gap-4 mb-12"
//           >
//             <button
//               onClick={scrollToProjects}
//               className="px-6 py-3 bg-[var(--text-primary)] text-[var(--bg)] text-sm font-medium rounded-lg hover:opacity-80 transition-opacity duration-200"
//             >
//               View Projects
//             </button>
//             <button
//               onClick={scrollToContact}
//               className="px-6 py-3 border border-[var(--border-strong)] text-[var(--text-secondary)] text-sm font-medium rounded-lg hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all duration-200"
//             >
//               Get in Touch
//             </button>
//           </motion.div>

//           {/* Social links */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 1.2 }}
//             className="flex items-center gap-5"
//           >
//             <a
//               href="https://github.com/leon-dream1"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
//               aria-label="GitHub"
//             >
//               <FaGithub className="w-5 h-5" />
//             </a>
//             <a
//               href="https://www.linkedin.com/in/nahidulislam-cs/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
//               aria-label="LinkedIn"
//             >
//               <FaLinkedin className="w-5 h-5" />
//             </a>
//             <a
//               href="mailto:nahidulislam019045@gmail.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
//               aria-label="Email"
//             >
//               <HiMail className="w-5 h-5" />
//             </a>
//             <div className="h-px w-12 bg-[var(--border-strong)]" />
//             <span className="font-mono text-xs text-[var(--text-muted)]">
//               Narayanganj, Bangladesh
//             </span>
//           </motion.div>
//         </div>
//       </div>

//       {/* Scroll indicator */}
//       <motion.button
//         onClick={scrollToProjects}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.8 }}
//         className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
//         aria-label="Scroll down"
//       >
//         <motion.div
//           animate={{ y: [0, 8, 0] }}
//           transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//         >
//           <HiArrowDown className="w-5 h-5" />
//         </motion.div>
//       </motion.button>
//     </section>
//   );
// }