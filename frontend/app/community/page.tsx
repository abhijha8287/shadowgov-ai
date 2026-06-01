import { DashboardShell } from "@/components/dashboard-shell";
import { complaints } from "@/lib/demo-data";

export default function CommunityPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Community Reports</h1>
          <p className="mt-2 text-foreground/65">Citizen evidence, voting, comments, reputation, and crowdsourced verification.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {complaints.slice(0, 6).map((complaint) => (
            <article className="glass rounded-lg p-5" key={complaint.id}>
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-bold">{complaint.title}</h2>
                <span className="rounded-full bg-muted px-3 py-1 text-sm font-semibold">{complaint.votes} votes</span>
              </div>
              <p className="mt-2 text-sm text-foreground/65">{complaint.location}</p>
              <p className="mt-4 leading-7">{complaint.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

