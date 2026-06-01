import Link from "next/link";
import { Plus } from "lucide-react";
import { ComplaintBoard } from "@/components/complaint-board";
import { DashboardShell } from "@/components/dashboard-shell";

export default function ComplaintsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Complaints</h1>
            <p className="mt-2 text-foreground/65">Verify, assign, merge, and monitor citizen reports.</p>
          </div>
          <Link className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-3 font-semibold text-white" href="/complaints/new">
            <Plus className="h-4 w-4" /> New Complaint
          </Link>
        </div>
        <ComplaintBoard />
      </div>
    </DashboardShell>
  );
}

