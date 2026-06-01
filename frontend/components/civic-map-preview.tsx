"use client";

import { AlertTriangle, Building2, MapPin } from "lucide-react";
import { useMemo } from "react";
import { useUiStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type CivicPin = {
  id: string;
  title: string;
  location: string;
  department: string;
  type: "complaint" | "project";
  severity: number;
  status: string;
  x: number;
  y: number;
};

const wardZones = [
  { label: "Ward 2", x: "8%", y: "12%", width: "26%", height: "28%", tone: "bg-danger/10 border-danger/20" },
  { label: "Ward 4", x: "36%", y: "10%", width: "27%", height: "30%", tone: "bg-warning/10 border-warning/25" },
  { label: "Ward 7", x: "65%", y: "14%", width: "27%", height: "26%", tone: "bg-primary/10 border-primary/20" },
  { label: "Ward 9", x: "10%", y: "44%", width: "28%", height: "36%", tone: "bg-primary/10 border-primary/20" },
  { label: "Ward 12", x: "42%", y: "46%", width: "24%", height: "35%", tone: "bg-danger/10 border-danger/20" },
  { label: "Citywide", x: "69%", y: "45%", width: "23%", height: "35%", tone: "bg-accent/10 border-accent/25" }
];

export function CivicMapPreview({ large = false }: { large?: boolean }) {
  const complaints = useUiStore((state) => state.complaints);
  const projects = useUiStore((state) => state.projects);
  const pins = useMemo<CivicPin[]>(
    () => [
      ...complaints.slice(0, large ? 10 : 5).map((item, index) => ({
        id: item.id,
        title: item.title,
        location: item.location,
        department: item.department,
        type: "complaint" as const,
        severity: item.urgency,
        status: item.status,
        x: 24 + (index % 4) * 13,
        y: 34 + Math.floor(index / 4) * 22 + (index % 2) * 4
      })),
      ...projects.slice(0, large ? 8 : 4).map((item, index) => ({
        id: item.id,
        title: item.title,
        location: item.location,
        department: item.department,
        type: "project" as const,
        severity: item.risk,
        status: item.status,
        x: 38 + (index % 4) * 12,
        y: 28 + Math.floor(index / 4) * 24 + (index % 2) * 5
      }))
    ],
    [complaints, large, projects]
  );
  const criticalCount = complaints.filter((item) => item.priority === "Critical").length;
  const delayedCount = projects.filter((item) => item.status === "Delayed").length;
  const visiblePins = large ? pins : pins.slice(0, 8);

  return (
    <section className={cn("glass overflow-hidden rounded-lg", large ? "min-h-[70vh]" : "min-h-[27rem]")}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
        <div className="min-w-0">
          <h2 className="text-xl font-bold">Smart Civic Map</h2>
          <p className="mt-1 text-sm text-foreground/60">Live complaints, project risk, and ward-level civic load</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          <span className="rounded-full bg-danger/15 px-3 py-1 text-danger">Complaints</span>
          <span className="rounded-full bg-primary/15 px-3 py-1 text-primary">Projects</span>
          <span className="rounded-full bg-warning/15 px-3 py-1 text-warning">Risk zones</span>
        </div>
      </div>
      <div className={cn("grid gap-0", large ? "lg:grid-cols-[1fr_20rem]" : "")}>
        <div className={cn("relative overflow-hidden bg-card", large ? "min-h-[34rem]" : "min-h-[22rem]")}>
          <div className="map-grid absolute inset-0 opacity-80" />
          <div className="absolute inset-x-8 bottom-16 h-16 rotate-[-4deg] rounded-full border-8 border-primary/15" />
          <div className="absolute inset-x-12 top-20 h-20 rotate-[6deg] rounded-full border-8 border-accent/15" />

          {wardZones.map((zone) => (
            <div
              className={cn("absolute rounded-lg border p-3 text-xs font-bold text-foreground/55", zone.tone)}
              key={zone.label}
              style={{ left: zone.x, top: zone.y, width: zone.width, height: zone.height }}
            >
              {zone.label}
            </div>
          ))}

          {visiblePins.map((pin) => (
            <div
              key={`${pin.type}-${pin.id}`}
              className="group absolute z-10"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            >
              <div
                className={cn(
                  "flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-white shadow-panel",
                  pin.type === "complaint" ? "bg-danger" : "bg-primary"
                )}
                title={pin.title}
              >
                {pin.type === "complaint" ? <AlertTriangle className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
              </div>
              <div className="pointer-events-none absolute left-5 top-5 hidden w-56 rounded-md border border-border bg-card p-3 text-sm shadow-panel group-hover:block">
                <p className="font-bold">{pin.title}</p>
                <p className="mt-1 text-xs text-foreground/60">{pin.location} / {pin.department}</p>
                <p className="mt-2 text-xs font-semibold">{pin.status} / Risk {pin.severity}</p>
              </div>
            </div>
          ))}

          <div className="absolute bottom-4 left-4 right-4 hidden gap-3 md:grid md:grid-cols-3">
            <div className="rounded-md border border-border bg-card/90 p-3">
              <p className="text-xs font-semibold text-foreground/55">Visible reports</p>
              <p className="text-2xl font-bold">{complaints.length}</p>
            </div>
            <div className="rounded-md border border-border bg-card/90 p-3">
              <p className="text-xs font-semibold text-foreground/55">Critical</p>
              <p className="text-2xl font-bold text-danger">{criticalCount}</p>
            </div>
            <div className="rounded-md border border-border bg-card/90 p-3">
              <p className="text-xs font-semibold text-foreground/55">Delayed projects</p>
              <p className="text-2xl font-bold text-warning">{delayedCount}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-3 border-t border-border bg-card p-4 md:hidden">
          <div className="rounded-md border border-border p-3">
            <p className="text-xs font-semibold text-foreground/55">Visible reports</p>
            <p className="text-2xl font-bold">{complaints.length}</p>
          </div>
          <div className="rounded-md border border-border p-3">
            <p className="text-xs font-semibold text-foreground/55">Critical</p>
            <p className="text-2xl font-bold text-danger">{criticalCount}</p>
          </div>
          <div className="rounded-md border border-border p-3">
            <p className="text-xs font-semibold text-foreground/55">Delayed projects</p>
            <p className="text-2xl font-bold text-warning">{delayedCount}</p>
          </div>
        </div>
        {large && (
          <aside className="border-t border-border bg-card p-5 lg:border-l lg:border-t-0">
            <h3 className="font-bold">Highest Priority</h3>
            <div className="mt-4 space-y-3">
              {pins
                .slice()
                .sort((a, b) => b.severity - a.severity)
                .slice(0, 6)
                .map((pin) => (
                  <article className="rounded-md border border-border p-3" key={`summary-${pin.type}-${pin.id}`}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold">{pin.title}</p>
                      <MapPin className={cn("h-4 w-4 shrink-0", pin.type === "complaint" ? "text-danger" : "text-primary")} />
                    </div>
                    <p className="mt-1 text-xs text-foreground/60">{pin.location}</p>
                  </article>
                ))}
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}
