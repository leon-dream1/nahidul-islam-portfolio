"use client";

import { useEffect, useState } from "react";

type Stats = {
  views: number;
  likes: number;
};

const endpoint = "/api/scale-to-millions/stats";

export default function LikeButton() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [busy, setBusy] = useState(false);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();

        if (response.ok) {
          setStats(data);
        }

        const viewResponse = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "view" }),
        });

        const viewData = await viewResponse.json();
        if (!viewResponse.ok) {
          throw new Error(viewData?.error || "Unable to add view count.");
        }

        setStats(viewData);
      } catch (error) {
        console.error(error);
        setError("Unable to load article stats.");
      }
    }

    loadStats();
  }, []);

  async function handleLike() {
    if (busy || liked) {
      return;
    }

    setBusy(true);
    setError(null);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "like" }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Unable to add like.");
      }

      setStats(data);
      setLiked(true);
    } catch (error) {
      console.error(error);
      setError("Unable to add like.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleLike}
          disabled={busy || liked}
          className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-60"
          aria-pressed={liked}
          aria-label="Like this article"
        >
          <span className="text-xl">❤️</span>
          <span>{stats ? stats.likes.toLocaleString() : "—"}</span>
        </button>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-xs text-[var(--text-muted)]">
          Views {stats ? stats.views.toLocaleString() : "—"}
        </div>
      </div>

      {error ? <p className="text-xs text-rose-400">{error}</p> : null}
    </div>
  );
}
