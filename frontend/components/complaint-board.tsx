"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useUiStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ComplaintBoard() {
  const complaints = useUiStore((state) => state.complaints);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const filtered = useMemo(
    () =>
      complaints.filter((complaint) => {
        const matchesStatus = status === "All" || complaint.status === status;
        const matchesQuery = `${complaint.title} ${complaint.location} ${complaint.department}`.toLowerCase().includes(query.toLowerCase());
        return matchesStatus && matchesQuery;
      }),
    [complaints, query, status]
  );

  return (
    <section className="space-y-4">
      <div className="glass flex flex-wrap gap-3 rounded-lg p-4">
        <div className="relative min-w-64 flex-1">
          <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-foreground/45" />
          <input
            className="w-full rounded-md border border-border bg-card py-3 pl-10 pr-4"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search complaints"
          />
        </div>
        <select className="rounded-md border border-border bg-card px-4 py-3 font-semibold" value={status} onChange={(event) => setStatus(event.target.value)}>
          {["All", "Reported", "Under Review", "Assigned", "In Progress", "Resolved", "Rejected"].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((complaint) => (
          <article className="glass rounded-lg p-5 transition hover:-translate-y-0.5 hover:shadow-panel" key={complaint.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">{complaint.title}</h2>
                <p className="mt-1 text-sm text-foreground/60">{complaint.location} / {complaint.department}</p>
              </div>
              <span className={cn("rounded-full px-3 py-1 text-xs font-bold", complaint.priority === "Critical" ? "bg-danger/15 text-danger" : "bg-warning/15 text-warning")}>
                {complaint.priority}
              </span>
            </div>
            <p className="mt-4 leading-7 text-foreground/75">{complaint.summary}</p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
              <span className="rounded-md bg-muted p-3"><b>{complaint.status}</b><br />Status</span>
              <span className="rounded-md bg-muted p-3"><b>{complaint.urgency}</b><br />Urgency</span>
              <span className="rounded-md bg-muted p-3"><b>{complaint.risk}</b><br />Risk</span>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="glass rounded-lg p-8 text-center text-foreground/65 lg:col-span-2">
            No complaints match the current filters.
          </div>
        )}
      </div>
    </section>
  );
}
