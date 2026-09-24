"use client";

import { useCallback, useEffect, useState } from "react";
import { getCachedWorkouts, getWorkouts } from "@/lib/api";

/** Fetches the workout list once and exposes loading / error / retry. */
export function useWorkouts() {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState(() => ({ workouts: getCachedWorkouts(), error: null }));

  useEffect(() => {
    let alive = true;
    getWorkouts()
      .then((workouts) => alive && setState({ workouts, error: null }))
      .catch((e) => alive && setState({ workouts: null, error: e.message || "Something went wrong" }));
    return () => {
      alive = false;
    };
  }, [attempt]);

  const retry = useCallback(() => {
    setState({ workouts: null, error: null });
    setAttempt((a) => a + 1);
  }, []);

  return {
    workouts: state.workouts,
    error: state.error,
    loading: !state.workouts && !state.error,
    retry,
  };
}
