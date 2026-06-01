import { DashboardShell } from "@/components/dashboard-shell";
import { CivicMapPreview } from "@/components/civic-map-preview";

export default function MapsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Smart Map</h1>
          <p className="mt-2 text-foreground/65">Complaints, projects, budgets, departments, and risk heatmaps by ward and zone.</p>
        </div>
        <CivicMapPreview large />
      </div>
    </DashboardShell>
  );
}

