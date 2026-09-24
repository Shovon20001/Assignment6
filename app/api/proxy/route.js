import { API_BASE } from "@/lib/api";

// Same-origin fallback used only if the browser cannot call the API directly.
// It only forwards the two FitLog endpoints.
const ALLOWED = /^\/api\/fitlog(\/[\w-]+)?$/;

export async function GET(request) {
  const path = new URL(request.url).searchParams.get("path") || "";
  if (!ALLOWED.test(path)) {
    return Response.json({ error: "Not allowed" }, { status: 400 });
  }
  try {
    const upstream = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: { "content-type": "application/json" },
    });
  } catch {
    return Response.json({ error: "Upstream unavailable" }, { status: 502 });
  }
}
