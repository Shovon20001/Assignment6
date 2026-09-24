"use client";

import { useSyncExternalStore } from "react";
import toast from "react-hot-toast";

/**
 * Tiny external store for "Today's Plan" and "Saved".
 * Persisted in localStorage so it survives a reload and is shared by the
 * navbar badges, the details page and the My Plan page.
 */
export const MAX_PLAN = 5;
const KEY = "fitlog:v1";
const EMPTY = Object.freeze({ plan: [], saved: [] });

let state = EMPTY;
let loaded = false;
const listeners = new Set();

function sanitize(raw) {
  const plan = [];
  const saved = [];
  if (Array.isArray(raw?.plan)) {
    for (const p of raw.plan) {
      const id = String(p?.id ?? "");
      if (id && !plan.some((x) => x.id === id) && plan.length < MAX_PLAN) {
        plan.push({ id, done: Boolean(p.done) });
      }
    }
  }
  if (Array.isArray(raw?.saved)) {
    for (const s of raw.saved) {
      const id = String(s ?? "");
      if (id && !saved.includes(id)) saved.push(id);
    }
  }
  return { plan, saved };
}

function readStorage() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? sanitize(JSON.parse(raw)) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function ensureLoaded() {
  if (!loaded && typeof window !== "undefined") {
    state = readStorage();
    loaded = true;
  }
}

function commit(next) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage may be unavailable (private mode) – app still works in memory */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb) {
  listeners.add(cb);
  const onStorage = (e) => {
    if (e.key === KEY || e.key === null) {
      state = readStorage();
      loaded = true;
      listeners.forEach((l) => l());
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => {
  ensureLoaded();
  return state;
};
const getServerSnapshot = () => EMPTY;
const noopSubscribe = () => () => {};

/* ---------------- actions (each one shows a toast) ---------------- */

function addToPlan(id) {
  ensureLoaded();
  if (state.plan.some((p) => p.id === id)) {
    toast("Already in today's plan", { id: "plan-exists", icon: "ℹ️" });
    return;
  }
  if (state.plan.length >= MAX_PLAN) {
    toast.error(`Plan is full — max ${MAX_PLAN} lifts`, { id: "plan-full" });
    return;
  }
  commit({ ...state, plan: [...state.plan, { id, done: false }] });
  toast.success("Added to today's plan", { id: "plan-add" });
}

function saveForLater(id) {
  ensureLoaded();
  if (state.saved.includes(id)) {
    toast("Already in your saved list", { id: "save-exists", icon: "ℹ️" });
    return;
  }
  commit({ ...state, saved: [...state.saved, id] });
  toast.success("Saved for later", { id: "save-add" });
}

function removeFromPlan(id) {
  ensureLoaded();
  commit({ ...state, plan: state.plan.filter((p) => p.id !== id) });
  toast.success("Removed from today's plan", { id: "plan-remove" });
}

function removeFromSaved(id) {
  ensureLoaded();
  commit({ ...state, saved: state.saved.filter((s) => s !== id) });
  toast.success("Removed from saved", { id: "save-remove" });
}

function toggleDone(id) {
  ensureLoaded();
  const item = state.plan.find((p) => p.id === id);
  if (!item) return;
  const done = !item.done;
  commit({ ...state, plan: state.plan.map((p) => (p.id === id ? { ...p, done } : p)) });
  toast.success(done ? "Marked as done — nice work!" : "Marked as not done", { id: "plan-done" });
}

/** `ready` is false during SSR / first paint, so pages never flash a wrong empty state. */
export function usePlan() {
  const s = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(noopSubscribe, () => true, () => false);
  return {
    plan: s.plan,
    saved: s.saved,
    ready,
    isPlanFull: s.plan.length >= MAX_PLAN,
    inPlan: (id) => s.plan.some((p) => p.id === id),
    isSaved: (id) => s.saved.includes(id),
    addToPlan,
    saveForLater,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
  };
}
