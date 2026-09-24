<div align="center">

# 💪 FitLog — Workout Library

**Train with intent. Log every set.**

A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.

**Live site:** _add your deployed link here_ · **Repository:** _add your GitHub link here_

</div>

---

## ✨ Key Features

1. **Workout library** – all 12 lifts from the API in a responsive 3×4 grid (1 column on mobile, 2 on tablet), with muscle-group tags, equipment and duration / calories / rating stats.
2. **Detail page** – large image, key-specs panel (equipment, difficulty, sets, reps, duration, calories, rating) and step-by-step instructions.
3. **Today's Plan & Saved** – add a lift to today's plan or save it for later. The navbar **Plan** and **Saved** badges update live and a toast confirms every action.
4. **My Plan dashboard** – live *Exercises / Minutes / Calories* totals, *Today's Plan / Saved* tabs, **Mark as Done**, remove (✕) and a friendly empty state.
5. **Sort dropdown** – re-sort the current list by Duration, Calories or Rating.
6. **Search** – filter the library by workout name or muscle-group tag.
7. **5-lift daily cap** – "Add to today's plan" is disabled once the plan is full.
8. **Persistence** – plan and saved lists survive a reload (`localStorage`).
9. **Polish** – loading skeleton + spinner, error/retry state, custom 404 page, fully responsive layout.

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| [Next.js 16](https://nextjs.org/) (App Router) | UI, routing and dynamic pages |
| [React 19](https://react.dev/) | Component model, `useSyncExternalStore` for the plan store |
| [Tailwind CSS 4](https://tailwindcss.com/) | Styling and responsiveness |
| [lucide-react](https://lucide.dev/) | Icon set |
| [react-hot-toast](https://react-hot-toast.com/) | Toast notifications |
| [Fontsource](https://fontsource.org/) (Oswald + Inter) | Self-hosted fonts |

## 🌐 API

| Endpoint | Description |
| --- | --- |
| `GET https://api.abcz.workers.dev/api/fitlog` | All workouts |
| `GET https://api.abcz.workers.dev/api/fitlog/:id` | Single workout |

If a browser ever blocks the direct call (network/CORS), the app transparently falls back to a small same-origin proxy route (`app/api/proxy`).

## 🚀 Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Optional: copy `.env.example` to `.env.local` to point at a different API.

## 📁 Project Structure

```
app/
  page.js                 Home (hero + library)
  workouts/[id]/page.js   Workout details
  my-plan/page.js         My Plan
  not-found.js            404 page
  api/proxy/route.js      CORS-safe API fallback
components/               Navbar, Hero, WorkoutCard, PlanItem, ...
lib/
  api.js                  fetch helpers + data normalising
  plan.js                 localStorage-backed plan / saved store
  useWorkouts.js          data hook (loading / error / retry)
```

## ☁️ Deployment

Deploy on [Vercel](https://vercel.com/): import the GitHub repo, keep the default Next.js settings and deploy. Every route (including dynamic `/workouts/:id`) is served by Next.js, so refreshing any page works.
