import Link from "next/link";
import { StatsRow, Tag } from "@/components/ui";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel transition duration-200 hover:-translate-y-0.5 hover:border-accent/50"
    >
      <div className="h-48 overflow-hidden bg-[#1f232b]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((g) => (
            <Tag key={g}>{g}</Tag>
          ))}
        </div>
        <h3 className="mt-2 font-display text-lg font-bold uppercase tracking-[0.025em]">{workout.name}</h3>
        <p className="mt-1 text-xs text-muted">{workout.equipment}</p>
        <StatsRow workout={workout} className="mt-auto border-t border-line-soft pt-3 [margin-top:1rem]" />
      </div>
    </Link>
  );
}
