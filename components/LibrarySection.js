"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import WorkoutCard from "@/components/WorkoutCard";
import { ErrorState } from "@/components/ui";
import { useWorkouts } from "@/lib/useWorkouts";

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-panel">
      <div className="fl-skeleton h-48" />
      <div className="space-y-3 p-6">
        <div className="fl-skeleton h-5 w-16 rounded-full" />
        <div className="fl-skeleton h-6 w-3/4 rounded" />
        <div className="fl-skeleton h-3 w-1/3 rounded" />
        <div className="fl-skeleton mt-4 h-4 w-full rounded" />
      </div>
    </div>
  );
}

export default function LibrarySection() {
  const { workouts, loading, error, retry } = useWorkouts();
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    if (!workouts) return [];
    const q = query.trim().toLowerCase();
    if (!q) return workouts;
    return workouts.filter(
      (w) => w.name.toLowerCase().includes(q) || w.muscleGroups.some((g) => g.toLowerCase().includes(q)),
    );
  }, [workouts, query]);

  return (
    <section id="library" className="scroll-mt-24 pt-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-4xl font-bold uppercase leading-none tracking-tight">The Library</h2>
          <p className="mt-2 text-sm text-muted">Twelve lifts covering every major muscle group.</p>
        </div>
        <label className="relative block w-full sm:w-64">
          <span className="sr-only">Search workouts by name or muscle group</span>
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or tag…"
            className="h-10 w-full rounded-[9px] border border-line bg-[#13161d] pl-9 pr-3 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </label>
      </div>

      {loading && (
        <div role="status" aria-label="Loading workouts">
          <div className="mb-6 flex items-center justify-center gap-3 text-sm text-muted">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#232732] border-t-accent" />
            Loading workouts…
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      )}

      {error && <ErrorState message={error} onRetry={retry} />}

      {workouts && visible.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}

      {workouts && visible.length === 0 && (
        <p className="rounded-2xl border border-dashed border-[#2b303d] px-6 py-16 text-center text-sm text-muted">
          No workouts match &ldquo;{query}&rdquo;.
        </p>
      )}
    </section>
  );
}
