import Link from "next/link";
import { ArrowRight, Building2, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { LiveFeed } from "@/components/live-feed";
import { MetricCard } from "@/components/metric-card";
import { CivicMapPreview } from "@/components/civic-map-preview";
import { complaints, overviewStats } from "@/lib/demo-data";

export default function LandingPage() {
  const urgent = complaints.filter((complaint) => complaint.priority === "Critical").length;

  return (
    <main className="min-h-screen">
      <DashboardShell compact>
        <section className="grid min-h-[84vh] grid-cols-1 gap-8 py-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" />
              Civic intelligence for accountable cities
            </div>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-normal md:text-7xl">
                Know What Your Government Is Doing.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-foreground/72">
                AI-powered civic transparency platform for complaints, public projects, budgets,
                departments, news signals, and citizen evidence.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-white shadow-panel"
                href="/complaints/new"
              >
                Report Issue <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 font-semibold"
                href="/dashboard"
              >
                Explore Dashboard
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <MetricCard label="Open complaints" value={overviewStats.openComplaints} icon={MapPin} tone="primary" />
              <MetricCard label="Tracked projects" value={overviewStats.projects} icon={Building2} tone="accent" />
              <MetricCard label="Critical alerts" value={urgent} icon={ShieldCheck} tone="danger" />
            </div>
          </div>
          <div className="space-y-4">
            <CivicMapPreview />
            <LiveFeed />
          </div>
        </section>
      </DashboardShell>
    </main>
  );
}

