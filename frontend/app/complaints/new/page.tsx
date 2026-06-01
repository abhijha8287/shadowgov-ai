"use client";

import { Camera, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { departments } from "@/lib/demo-data";
import { useUiStore } from "@/lib/store";
import type { Priority } from "@/lib/types";

const priorityUrgency: Record<Priority, number> = {
  Low: 35,
  Medium: 58,
  High: 78,
  Critical: 92
};

export default function NewComplaintPage() {
  const router = useRouter();
  const addComplaint = useUiStore((state) => state.addComplaint);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") || "").trim();
    const description = String(form.get("description") || "").trim();
    const priority = String(form.get("priority") || "Medium") as Priority;

    addComplaint({
      id: `CMP-${Date.now().toString().slice(-6)}`,
      title: title || "Untitled civic issue",
      location: String(form.get("location") || "Location pending").trim() || "Location pending",
      department: String(form.get("department") || departments[0].name),
      status: "Reported",
      priority,
      urgency: priorityUrgency[priority],
      risk: priority === "Critical" || priority === "High" ? "High" : priority === "Medium" ? "Medium" : "Low",
      votes: 1,
      summary: description || "Newly reported issue is awaiting moderation and department review."
    });

    router.push("/complaints");
  }

  return (
    <DashboardShell>
      <form className="mx-auto max-w-4xl space-y-6" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-3xl font-bold">Report Issue</h1>
          <p className="mt-2 text-foreground/65">AI will classify urgency, department ownership, impact, and risk.</p>
        </div>
        <div className="glass grid gap-5 rounded-lg p-4 sm:p-5 md:grid-cols-2">
          <label className="space-y-2 md:col-span-2">
            <span className="font-semibold">Title</span>
            <input className="w-full rounded-md border border-border bg-card px-4 py-3" name="title" placeholder="Street light failure near market road" required />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="font-semibold">Description</span>
            <textarea className="min-h-32 w-full rounded-md border border-border bg-card px-4 py-3" name="description" placeholder="Describe the issue, visible risk, and how long it has been unresolved." required />
          </label>
          <label className="space-y-2">
            <span className="font-semibold">Category</span>
            <select className="w-full rounded-md border border-border bg-card px-4 py-3" name="category">
              {["Road Damage", "Garbage", "Water Leakage", "Street Light Failure", "Drainage", "Traffic", "Pollution", "Illegal Construction", "Other"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
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
            <input className="w-full rounded-md border border-border bg-card px-4 py-3" name="location" placeholder="Ward 9, Lake Road" required />
          </label>
          <label className="space-y-2">
            <span className="font-semibold">Priority</span>
            <select className="w-full rounded-md border border-border bg-card px-4 py-3" name="priority">
              {["Low", "Medium", "High", "Critical"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <button className="flex min-h-32 items-center justify-center gap-2 rounded-md border border-dashed border-border bg-muted font-semibold md:col-span-2" type="button">
            <Camera className="h-5 w-5" /> Upload evidence
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
        <button className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-white shadow-panel">
          <Send className="h-4 w-4" /> Submit complaint
        </button>
        <span className="text-sm font-semibold text-foreground/60">New reports appear in the complaints board immediately.</span>
        </div>
      </form>
    </DashboardShell>
  );
}
