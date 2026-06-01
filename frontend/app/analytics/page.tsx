import { AnalyticsPanel } from "@/components/analytics-panel";
import { DashboardShell } from "@/components/dashboard-shell";

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="mt-2 text-foreground/65">Forecasts, heat patterns, resolution trends, satisfaction, and budget movement.</p>
        </div>
        <AnalyticsPanel expanded />
      </div>
    </DashboardShell>
  );
}

