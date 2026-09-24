import Link from "next/link";
import { Check, X } from "lucide-react";
import { StatsRow } from "@/components/ui";

export default function PlanItem({ workout, done, showDone, onToggleDone, onRemove }) {
  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border border-[#232732] bg-panel-alt p-4 sm:p-[17px] md:flex-row md:items-center md:justify-between ${
        done ? "opacity-70" : ""
      }`}
    >
      <div className="flex min-w-0 items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          loading="lazy"
          className="h-16 w-24 shrink-0 rounded-xl bg-[#1f2937] object-cover sm:h-20 sm:w-36"
        />
        <div className="min-w-0">
          <h3
            className={`font-display text-lg font-bold uppercase tracking-wide ${
              done ? "text-muted line-through" : ""
            }`}
          >
            {workout.name}
          </h3>
          <p className="mt-0.5 text-xs text-muted">{workout.equipment}</p>
          <StatsRow workout={workout} className="mt-2" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <Link
          href={`/workouts/${workout.id}`}
          className="inline-flex h-[34px] shrink-0 items-center whitespace-nowrap rounded-full border border-[#374151] px-3.5 sm:px-[18px] text-xs font-semibold text-white transition hover:border-accent hover:text-accent"
        >
          View Details
        </Link>
        {showDone && (
          <button
            onClick={onToggleDone}
            aria-pressed={done}
            className={`inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-xs font-semibold transition sm:px-4 ${
              done
                ? "border border-accent bg-transparent text-accent"
                : "bg-accent text-black hover:brightness-95"
            }`}
          >
            <Check size={14} aria-hidden />
            {done ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="ml-auto flex h-7 w-7 items-center justify-center rounded-full text-muted transition hover:bg-[#2a1517] hover:text-red-400 md:ml-0"
        >
          <X size={16} aria-hidden />
        </button>
      </div>
    </article>
  );
}
