"use client";

import { useUiStore } from "@/lib/store";

export function LiveFeed() {
  const complaints = useUiStore((state) => state.complaints);

  return (
    <section className="glass rounded-lg p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Live Complaints Feed</h2>
        <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-bold text-success">Live</span>
      </div>
      <div className="space-y-3">
        {complaints.slice(0, 5).map((complaint) => (
          <article className="rounded-md border border-border bg-card p-4" key={complaint.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold">{complaint.title}</h3>
                <p className="mt-1 text-sm text-foreground/60">{complaint.location}</p>
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">{complaint.status}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
