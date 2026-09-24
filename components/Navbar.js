"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/Logo";
import { usePlan } from "@/lib/plan";

function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-full px-4 py-1 text-sm font-medium transition-colors ${
        active ? "bg-accent-dim text-accent" : "text-muted hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const onWorkouts = pathname === "/" || pathname.startsWith("/workouts");
  const onPlan = pathname.startsWith("/my-plan");

  return (
    <header className="sticky top-0 z-40 border-b border-[#1c1f26] bg-ink/90 backdrop-blur">
      <div className="relative mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-y-2 px-6 py-3 md:h-20 md:py-0">
        <Link href="/" className="flex items-center gap-2.5" aria-label="FitLog home">
          <LogoMark />
          <span className="font-display text-xl font-bold tracking-wider">FITLOG</span>
        </Link>

        <nav
          aria-label="Main"
          className="order-3 flex w-full justify-center gap-1 md:absolute md:left-1/2 md:order-none md:w-auto md:-translate-x-1/2"
        >
          <NavLink href="/" active={onWorkouts}>
            Workouts
          </NavLink>
          <NavLink href="/my-plan" active={onPlan}>
            My Plan
          </NavLink>
        </nav>

        <div className="flex items-center gap-4 text-xs font-medium">
          <Link href="/my-plan" className="flex items-center gap-2 text-muted hover:text-white" aria-label={`Plan: ${plan.length} workouts`}>
            Plan
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-black">
              {plan.length}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2 text-muted hover:text-white" aria-label={`Saved: ${saved.length} workouts`}>
            Saved
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#2d313b] px-1.5 text-[11px] font-bold text-white">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
