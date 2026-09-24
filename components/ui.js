import { Clock, Flame, Star } from "lucide-react";

export function Tag({ children, soft = false }) {
  return soft ? (
    <span className="inline-flex items-center rounded-full bg-accent px-3.5 py-1 text-xs font-medium text-black">
      {children}
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-[3px] text-[11px] font-bold uppercase tracking-[0.05em] text-black">
      {children}
    </span>
  );
}

export function StatsRow({ workout, className = "" }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted ${className}`}>
      <span className="inline-flex items-center gap-1.5">
        <Clock size={14} aria-hidden /> {workout.duration} min
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Flame size={14} aria-hidden /> {workout.calories} kcal
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Star size={14} aria-hidden className="fill-accent text-accent" /> {workout.rating}
      </span>
    </div>
  );
}

export function Spinner({ label = "Loading workouts…" }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-4 py-16 text-muted">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-[#232732] border-t-accent" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div role="alert" className="rounded-2xl border border-line bg-panel px-6 py-14 text-center">
      <h3 className="font-display text-xl font-bold uppercase tracking-wide">Couldn&apos;t load workouts</h3>
      <p className="mt-2 text-sm text-muted">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 rounded-md bg-accent px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-black hover:brightness-95"
        >
          Try again
        </button>
      )}
    </div>
  );
}
