import WorkoutDetail from "@/components/WorkoutDetail";
import { API_BASE } from "@/lib/api";

// Nice tab title for each workout. Failure is harmless – we fall back to the default title.
export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const res = await fetch(`${API_BASE}/api/fitlog/${encodeURIComponent(id)}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      const item = Array.isArray(data) ? data[0] : data?.data || data;
      if (item?.name) return { title: item.name, description: item.description };
    }
  } catch {
    /* ignore */
  }
  return { title: "Workout" };
}

export default async function WorkoutPage({ params }) {
  const { id } = await params;
  return <WorkoutDetail id={id} />;
}
