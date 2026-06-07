"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { HiSun, HiMoon, HiMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { label: "About", href: "#about", isAnchor: true },
  { label: "Experience", href: "#experience", isAnchor: true },
  { label: "Skills", href: "#skills", isAnchor: true },
  { label: "Projects", href: "#projects", isAnchor: true },
  { label: "Research", href: "#research", isAnchor: true },
  { label: "Education", href: "#education", isAnchor: true },
  { label: "Contact", href: "#contact", isAnchor: true },
  { label: "Blog", href: "/blog", isAnchor: false },
];

export default function Navbar() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const activeTheme = resolvedTheme || theme || "light";
  const isHomePage = pathname === "/";

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string, isAnchor: boolean) => {
    setMobileOpen(false);

    if (!isAnchor) {
      router.push(href);
      return;
    }

    // If on homepage, scroll directly
    if (isHomePage) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to homepage first, then scroll
      router.push(`/${href}`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <span className="text-[var(--text-muted)]">~/</span> Nahidul Islam
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.isAnchor ? (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href, link.isAnchor)}
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-200 ${
                  pathname.startsWith("/blog")
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          {mounted && (
            <button
              onClick={() =>
                setTheme(activeTheme === "dark" ? "light" : "dark")
              }
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all duration-200"
              aria-label="Toggle theme"
            >
              {activeTheme === "dark" ? (
                <HiSun className="w-4 h-4" />
              ) : (
                <HiMoon className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Hire me button */}
          <button
            onClick={() => handleNavClick("#contact", true)}
            className="hidden md:flex text-xs font-medium px-4 py-2 rounded-lg border border-[var(--border-strong)] text-[var(--text-secondary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg)] hover:border-transparent transition-all duration-200"
          >
            Hire me
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center text-[var(--text-secondary)]"
          >
            {mobileOpen ? (
              <HiX className="w-5 h-5" />
            ) : (
              <HiMenuAlt3 className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href, link.isAnchor)}
                className={`text-left text-sm transition-colors py-1 ${
                  !link.isAnchor && pathname.startsWith("/blog")
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#contact", true)}
              className="mt-2 text-sm font-medium px-4 py-2 rounded-lg border border-[var(--border-strong)] text-[var(--text-secondary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg)] transition-all duration-200 text-center"
            >
              Hire me
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
