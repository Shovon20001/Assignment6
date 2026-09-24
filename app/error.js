"use client";

export default function Error({ reset }) {
  return (
    <div role="alert" className="rounded-2xl border border-line bg-panel px-6 py-20 text-center">
      <h1 className="font-display text-3xl font-bold uppercase">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted">An unexpected error happened. Give it another go.</p>
      <button
        onClick={reset}
        className="mt-6 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-black"
      >
        Try again
      </button>
    </div>
  );
}
