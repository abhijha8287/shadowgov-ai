import { DashboardShell } from "@/components/dashboard-shell";
import { AuditLog } from "@/components/audit-log";
import { RoleMatrix } from "@/components/role-matrix";

export default function AdminPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="mt-2 text-foreground/65">RBAC, moderation queues, audit logs, exports, and system health.</p>
        </div>
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <RoleMatrix />
          <AuditLog />
        </div>
      </div>
    </DashboardShell>
  );
}

