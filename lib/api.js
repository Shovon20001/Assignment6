// Central place for talking to the FitLog API.
export const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE || "https://api.abcz.workers.dev"
).replace(/\/$/, "");

/** Turn whatever the API returns into a predictable workout shape. */
export function normalize(raw) {
  if (!raw || typeof raw !== "object" || raw.id == null || !raw.name) return null;
  return {
    id: String(raw.id),
    name: String(raw.name),
    image: raw.image || "",
    muscleGroups: Array.isArray(raw.muscleGroups) ? raw.muscleGroups : [],
    equipment: raw.equipment || "",
    difficulty: raw.difficulty || "",
    duration: Number(raw.duration) || 0,
    calories: Number(raw.caloriesBurned ?? raw.calories) || 0,
    sets: raw.sets ?? "",
    reps: raw.reps ?? "",
    rating: Number(raw.rating) || 0,
    description: raw.description || "",
    instructions: Array.isArray(raw.instructions) ? raw.instructions : [],
  };
}

// Try the API directly; if the browser blocks it (network / CORS),
// fall back to our own same-origin proxy route.
async function request(path) {
  try {
    return await fetch(`${API_BASE}${path}`, { headers: { Accept: "application/json" } });
  } catch {
    return fetch(`/api/proxy?path=${encodeURIComponent(path)}`);
  }
}

let listCache = null;
let listPromise = null;

export function getCachedWorkouts() {
  return listCache;
}

/** All workouts. Cached so page-to-page navigation is instant. */
export function getWorkouts() {
  if (listCache) return Promise.resolve(listCache);
  if (!listPromise) {
    listPromise = request("/api/fitlog")
      .then(async (res) => {
        if (!res.ok) throw new Error(`Could not load workouts (${res.status})`);
        const json = await res.json();
        const arr = Array.isArray(json) ? json : json?.data || json?.workouts || [];
        listCache = arr.map(normalize).filter(Boolean);
        return listCache;
      })
      .finally(() => {
        listPromise = null;
      });
  }
  return listPromise;
}

/** One workout by id. Resolves to null when it does not exist. */
export async function getWorkout(id) {
  const res = await request(`/api/fitlog/${encodeURIComponent(id)}`);
  if (res.status === 404 || res.status === 400) return null;
  if (!res.ok) throw new Error(`Could not load workout (${res.status})`);
  const json = await res.json();
  const item = Array.isArray(json) ? json[0] : json?.data || json;
  return normalize(item);
}
