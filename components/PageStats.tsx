"use client";

import { useEffect, useState } from "react";

type Stats = {
  views: number;
  likes: number;
};

const endpoint = "/api/scale-to-millions/stats";

export default function PageStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [busy, setBusy] = useState(false);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setBusy(true);
      try {
        const currentResponse = await fetch(endpoint);
        const currentData = await currentResponse.json();
        if (currentResponse.ok) {
          setStats(currentData);
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
          throw new Error(viewData?.error || "Unable to update view count.");
        }

        setStats(viewData);
      } catch (error) {
        console.error(error);
        setError("Unable to load page metrics.");
      } finally {
        setBusy(false);
      }
    }

    load();
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
        throw new Error(data?.error || "Unable to update like count.");
      }

      setStats(data);
      setLiked(true);
    } catch (error) {
      console.error(error);
      setError("Unable to register like.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)] p-5 shadow-sm sm:flex sm:items-center sm:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)] mb-3">
          Page metrics
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-[auto_auto]">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3">
            <p className="text-lg font-semibold text-[var(--text-primary)]">
              {stats ? stats.views.toLocaleString() : "—"}
            </p>
            <p className="text-xs text-[var(--text-muted)]">Total views</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3">
            <p className="text-lg font-semibold text-[var(--text-primary)]">
              {stats ? stats.likes.toLocaleString() : "—"}
            </p>
            <p className="text-xs text-[var(--text-muted)]">Likes</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 sm:mt-0">
        <button
          type="button"
          onClick={handleLike}
          disabled={busy || liked}
          className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition hover:border-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {liked ? "Liked" : "Like this page"}
        </button>
        {error ? <span className="text-xs text-rose-400">{error}</span> : null}
      </div>
    </div>
  );
}
