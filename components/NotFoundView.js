import Link from "next/link";

export default function NotFoundView() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-panel px-6 py-20 text-center">
      <p className="font-display text-7xl font-bold text-accent sm:text-8xl">404</p>
      <h1 className="font-display text-2xl font-bold uppercase tracking-wide sm:text-3xl">Page not found</h1>
      <p className="max-w-md text-sm text-muted">
        That lift doesn&apos;t exist — the page you&apos;re looking for was moved or never made it to the rack.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-black hover:brightness-95"
      >
        Back to workouts
      </Link>
    </div>
  );
}
