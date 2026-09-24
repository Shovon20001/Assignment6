import { LogoMark } from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1d24] bg-ink-deep">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2">
          <LogoMark size={20} />
          <span className="font-display text-base font-bold tracking-wider">FITLOG</span>
        </div>
        <p className="text-center text-xs text-muted sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
