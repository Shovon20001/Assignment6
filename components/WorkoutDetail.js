"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Bookmark, Check, Plus } from "lucide-react";
import { getWorkout } from "@/lib/api";
import { MAX_PLAN, usePlan } from "@/lib/plan";
import { ErrorState, Tag } from "@/components/ui";

function DetailSkeleton() {
  return (
    <div role="status" aria-label="Loading workout" className="grid gap-8 lg:grid-cols-2">
      <div className="fl-skeleton aspect-square rounded-2xl lg:aspect-auto lg:min-h-[600px]" />
      <div className="space-y-5">
        <div className="fl-skeleton h-10 w-3/4 rounded" />
        <div className="fl-skeleton h-12 w-full rounded" />
        <div className="fl-skeleton h-6 w-40 rounded-full" />
        <div className="fl-skeleton h-[344px] w-full rounded-2xl" />
      </div>
    </div>
  );
}

export default function WorkoutDetail({ id }) {
  const [state, setState] = useState({ status: "loading", workout: null, error: "" });
  const [attempt, setAttempt] = useState(0);
  const { inPlan, isSaved, isPlanFull, addToPlan, saveForLater } = usePlan();

  useEffect(() => {
    let alive = true;
    getWorkout(id)
      .then((workout) => alive && setState({ status: workout ? "ready" : "missing", workout, error: "" }))
      .catch((e) => alive && setState({ status: "error", workout: null, error: e.message }));
    return () => {
      alive = false;
    };
  }, [id, attempt]);

  if (state.status === "missing") notFound();
  if (state.status === "loading") return <DetailSkeleton />;
  if (state.status === "error") {
    return (
      <ErrorState
        message={state.error}
        onRetry={() => {
          setState({ status: "loading", workout: null, error: "" });
          setAttempt((a) => a + 1);
        }}
      />
    );
  }

  const w = state.workout;
  const added = inPlan(w.id);
  const saved = isSaved(w.id);
  const blocked = isPlanFull && !added;

  const specs = [
    ["Equipment", w.equipment],
    ["Difficulty", w.difficulty],
    ["Sets", w.sets],
    ["Reps", w.reps],
    ["Duration", `${w.duration} min`],
    ["Calories", `${w.calories} kcal`],
    ["Rating", w.rating],
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#232834] bg-[#171a21] lg:aspect-auto lg:min-h-[600px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={w.image} alt={w.name} className="absolute inset-0 h-full w-full object-cover" />
      </div>

      <div>
        <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">{w.name}</h1>
        <p className="mt-3 text-base leading-6 text-muted">{w.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {w.muscleGroups.map((g) => (
            <Tag key={g} soft>
              {g}
            </Tag>
          ))}
        </div>

        <dl className="mt-6 overflow-hidden rounded-2xl border border-[#232834] bg-[#151922]">
          {specs.map(([label, value], i) => (
            <div
              key={label}
              className={`grid grid-cols-2 items-center gap-4 px-6 py-3.5 ${i > 0 ? "border-t border-[#1e2330]" : ""}`}
            >
              <dt className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted">{label}</dt>
              <dd className="text-sm font-medium text-white">{value}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-8" aria-labelledby="instructions-heading">
          <h2 id="instructions-heading" className="font-display text-xl font-bold uppercase tracking-wide">
            INSTRUCTIONS
          </h2>
          <ol className="mt-4 space-y-3">
            {w.instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-[#d1d5db]">
                <span className="w-5 shrink-0 font-display font-bold text-accent">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={() => addToPlan(w.id)}
            disabled={blocked}
            title={blocked ? `Today's plan is full (${MAX_PLAN}/${MAX_PLAN})` : undefined}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {added ? <Check size={16} aria-hidden /> : <Plus size={16} aria-hidden />}
            Add to today&apos;s plan
          </button>
          <button
            onClick={() => saveForLater(w.id)}
            className="inline-flex h-[46px] items-center gap-2 rounded-xl border border-[#374151] px-6 text-sm font-semibold text-white transition hover:border-accent hover:text-accent"
          >
            <Bookmark size={16} aria-hidden className={saved ? "fill-current" : ""} />
            Save for later
          </button>
        </div>
        {blocked && (
          <p className="mt-3 text-xs text-muted">
            Today&apos;s plan is full ({MAX_PLAN}/{MAX_PLAN}). Finish or remove a lift to add more.
          </p>
        )}
      </div>
    </div>
  );
}
