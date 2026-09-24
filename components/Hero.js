import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="grid items-center gap-8 overflow-hidden rounded-2xl border border-line bg-panel p-8 md:grid-cols-[1fr_auto] md:p-14">
      <div className="max-w-[560px]">
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-accent">WORKOUT LIBRARY</p>
        <h1 className="mt-3 font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl">
          TRAIN WITH INTENT. LOG EVERY SET.
        </h1>
        <p className="mt-5 max-w-[512px] text-base leading-relaxed text-muted">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the
          week&apos;s work add up.
        </p>
        <a
          href="#library"
          className="mt-8 inline-flex h-10 items-center gap-2 rounded-md bg-accent px-6 text-sm font-bold uppercase tracking-wider text-black transition hover:brightness-95"
        >
          BROWSE WORKOUTS
          <ArrowDown size={16} aria-hidden />
        </a>
      </div>
      <Image
        src="/banner.png"
        alt="Muscular anatomy figure training on a biceps curl machine"
        width={334}
        height={334}
        priority
        className="mx-auto h-auto w-56 sm:w-72 md:w-[334px]"
      />
    </section>
  );
}
