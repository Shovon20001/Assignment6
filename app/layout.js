import "@fontsource-variable/inter";
import "@fontsource-variable/oswald";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppToaster from "@/components/AppToaster";

export const metadata = {
  title: { default: "FitLog — Workout Library", template: "%s — FitLog" },
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export const viewport = { themeColor: "#0c0d10" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 py-8">{children}</main>
        <Footer />
        <AppToaster />
      </body>
    </html>
  );
}
