import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog — Nahidul Islam",
  description:
    "Articles on system design, backend engineering, machine learning, and software development by Nahidul Islam.",
};

// ── Add new posts here ──────────────────────────────────────────────────────
const posts = [
  {
    slug: "scale-to-millions",
    title: "Scale From Zero To Millions of Users",
    date: "May 14, 2025",
    readTime: "15 min read",
    tags: ["System Design", "Backend", "Architecture"],
    excerpt:
      "How to evolve a single-server setup into a distributed system that handles millions of users — covering load balancers, DB replication, caching, CDN, sharding, and message queues.",
  },
  // Add more posts here as objects with the same shape
];
// ───────────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-14">
          <p className="font-mono text-xs text-[var(--text-muted)] mb-3 tracking-widest uppercase">
            ~/blog
          </p>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
            Writing
          </h1>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-lg">
            Thoughts on system design, backend engineering, machine learning,
            and things I learn building software.
          </p>
        </div>

        {/* Post list */}
        <div className="flex flex-col gap-px">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block py-8 border-b border-[var(--border)] hover:border-[var(--border-strong)] transition-colors duration-200"
            >
              {/* Meta */}
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {post.date}
                </span>
                <span className="text-[var(--border-strong)]">·</span>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--text-secondary)] transition-colors duration-200">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 max-w-2xl">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state (hidden when posts exist) */}
        {posts.length === 0 && (
          <div className="text-center py-24">
            <p className="font-mono text-sm text-[var(--text-muted)]">
              No posts yet. Check back soon.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
