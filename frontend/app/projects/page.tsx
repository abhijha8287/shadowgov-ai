"use client";

import { DashboardShell } from "@/components/dashboard-shell";
import { ProjectTable } from "@/components/project-table";
import { departments } from "@/lib/demo-data";
import { useUiStore } from "@/lib/store";
import type { FormEvent } from "react";

export default function ProjectsPage() {
  const role = useUiStore((state) => state.role);
  const addProject = useUiStore((state) => state.addProject);
  const canManage = role === "Officer";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    addProject({
      id: `PRJ-${Date.now().toString().slice(-6)}`,
      title: String(form.get("title") || "Untitled project").trim() || "Untitled project",
      department: String(form.get("department") || departments[0].name),
      location: String(form.get("location") || "Location pending").trim() || "Location pending",
      budget: Number(form.get("budget") || 0),
      progress: Number(form.get("progress") || 0),
      risk: Number(form.get("risk") || 0),
      status: String(form.get("status") || "On Track")
    });

    event.currentTarget.reset();
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Government Project Tracker</h1>
            <p className="mt-2 text-foreground/65">Budget utilization, completion progress, contractor accountability, and risk scoring.</p>
          </div>
          <span className="rounded-full bg-muted px-3 py-1 text-sm font-semibold">{role} view</span>
        </div>
        {canManage && (
          <form className="glass grid gap-4 rounded-lg p-4 md:grid-cols-2 xl:grid-cols-4" onSubmit={handleSubmit}>
            <label className="space-y-2 xl:col-span-2">
              <span className="font-semibold">Project title</span>
              <input className="w-full rounded-md border border-border bg-card px-4 py-3" name="title" placeholder="Ward road resurfacing" required />
            </label>
            <label className="space-y-2">
              <span className="font-semibold">Department</span>
              <select className="w-full rounded-md border border-border bg-card px-4 py-3" name="department">
                {departments.map((department) => (
                  <option key={department.name}>{department.name}</option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className="font-semibold">Location</span>
              <input className="w-full rounded-md border border-border bg-card px-4 py-3" name="location" placeholder="Ward 14, North Zone" required />
            </label>
            <label className="space-y-2">
              <span className="font-semibold">Budget (Cr)</span>
              <input className="w-full rounded-md border border-border bg-card px-4 py-3" min="0" name="budget" type="number" required />
            </label>
            <label className="space-y-2">
              <span className="font-semibold">Progress %</span>
              <input className="w-full rounded-md border border-border bg-card px-4 py-3" max="100" min="0" name="progress" type="number" required />
            </label>
            <label className="space-y-2">
              <span className="font-semibold">Risk</span>
              <input className="w-full rounded-md border border-border bg-card px-4 py-3" max="100" min="0" name="risk" type="number" required />
            </label>
            <label className="space-y-2">
              <span className="font-semibold">Status</span>
              <select className="w-full rounded-md border border-border bg-card px-4 py-3" name="status">
                {["On Track", "At Risk", "Delayed", "Paused", "Completed"].map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>
            <div className="flex items-end">
              <button className="w-full rounded-md bg-primary px-5 py-3 font-semibold text-white shadow-panel">Add Project</button>
            </div>
          </form>
        )}
        <ProjectTable full />
      </div>
    </DashboardShell>
  );
}
