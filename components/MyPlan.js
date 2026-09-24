"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import PlanItem from "@/components/PlanItem";
import { ErrorState, Spinner } from "@/components/ui";
import { usePlan } from "@/lib/plan";
import { useWorkouts } from "@/lib/useWorkouts";

const SORTS = {
  Duration: (w) => w.duration,
  Calories: (w) => w.calories,
  Rating: (w) => w.rating,
};

function Metric({ label, value }) {
  return (
    <div className="px-2 text-center first:pl-0 last:pr-0 sm:px-6 sm:text-left">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold leading-10 sm:text-4xl">{value}</p>
    </div>
  );
}

export default function MyPlan() {
  const { plan, saved, ready, removeFromPlan, removeFromSaved, toggleDone } = usePlan();
  const { workouts, error, retry } = useWorkouts();
  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("Duration");

  const byId = useMemo(() => new Map((workouts || []).map((w) => [w.id, w])), [workouts]);

  const planItems = useMemo(
    () => plan.map((p) => ({ workout: byId.get(p.id), done: p.done })).filter((i) => i.workout),
    [plan, byId],
  );
  const savedItems = useMemo(
    () => saved.map((id) => ({ workout: byId.get(id), done: false })).filter((i) => i.workout),
    [saved, byId],
  );

  const metrics = useMemo(
    () => ({
      exercises: planItems.length,
      minutes: planItems.reduce((n, i) => n + i.workout.duration, 0),
      calories: planItems.reduce((n, i) => n + i.workout.calories, 0),
    }),
    [planItems],
  );

  const isPlanTab = tab === "plan";
  const ids = isPlanTab ? plan : saved;
  const items = useMemo(() => {
    const list = isPlanTab ? planItems : savedItems;
    const key = SORTS[sortBy];
    return [...list].sort((a, b) => key(b.workout) - key(a.workout));
  }, [isPlanTab, planItems, savedItems, sortBy]);

  // Show the loading state only while we still need the API to resolve saved ids.
  const loading = !ready || (ids.length > 0 && !workouts && !error);
  const tabBtn = (active) =>
    `rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
      active ? "border border-[#2b303d] bg-[#1f242d] text-white" : "border border-transparent text-muted hover:text-white"
    }`;

  return (
    <div>
      <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-tight">MY PLAN</h1>
      <p className="mt-2 text-sm text-muted">Cap of five lifts for today. Finish them, then load more.</p>

      <section
        aria-label="Today's totals"
        className="mt-6 grid grid-cols-3 divide-x divide-[#232732] rounded-2xl border border-[#232732] bg-[#13161d] p-6"
      >
        <Metric label="Exercises" value={metrics.exercises} />
        <Metric label="Minutes" value={metrics.minutes} />
        <Metric label="Calories" value={metrics.calories} />
      </section>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Plan tabs" className="inline-flex gap-1 rounded-xl border border-[#232732] bg-[#151921] p-1">
          <button role="tab" aria-selected={isPlanTab} onClick={() => setTab("plan")} className={tabBtn(isPlanTab)}>
            Today&apos;s Plan
          </button>
          <button role="tab" aria-selected={!isPlanTab} onClick={() => setTab("saved")} className={tabBtn(!isPlanTab)}>
            Saved
          </button>
        </div>

        <label className="flex items-center gap-3 text-xs text-muted">
          Sort By
          <span className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-[34px] cursor-pointer appearance-none rounded-[9px] border border-[#232732] bg-[#13161d] pl-3 pr-9 text-xs font-medium text-white focus:border-accent focus:outline-none"
            >
              {Object.keys(SORTS).map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
            <ChevronDown size={14} aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
          </span>
        </label>
      </div>

      <div className="mt-6 space-y-4">
        {loading && <Spinner label="Loading workouts…" />}

        {!loading && error && ids.length > 0 && <ErrorState message={error} onRetry={retry} />}

        {!loading && !error && items.length > 0 &&
          items.map(({ workout, done }) => (
            <PlanItem
              key={workout.id}
              workout={workout}
              done={done}
              showDone={isPlanTab}
              onToggleDone={() => toggleDone(workout.id)}
              onRemove={() => (isPlanTab ? removeFromPlan(workout.id) : removeFromSaved(workout.id))}
            />
          ))}

        {!loading && !error && items.length === 0 && (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-[#2b303d] bg-[#111317] px-6 py-16 text-center">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide">NOTHING HERE YET</h2>
            <p className="mt-2 text-sm text-muted">Browse the library and add a lift to get today moving.</p>
            <Link
              href="/"
              className="mt-6 rounded-md bg-accent px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-black hover:brightness-95"
            >
              Go to workouts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
