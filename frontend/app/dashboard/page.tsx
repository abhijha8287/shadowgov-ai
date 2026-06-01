"use client";

import { AlertTriangle, CheckCircle2, Clock3, ClipboardCheck, Eye, FilePlus2, ShieldCheck, UserCheck, Users, WalletCards } from "lucide-react";
import { AnalyticsPanel } from "@/components/analytics-panel";
import { DashboardShell } from "@/components/dashboard-shell";
import { DepartmentLeaderboard } from "@/components/department-leaderboard";
import { LiveFeed } from "@/components/live-feed";
import { MetricCard } from "@/components/metric-card";
import { ProjectTable } from "@/components/project-table";
import { overviewStats, departments } from "@/lib/demo-data";
import { useUiStore, type UserRole } from "@/lib/store";

const roleCopy: Record<UserRole, { title: string; description: string; focus: string[] }> = {
  Citizen: {
    title: "Citizen Dashboard",
    description: "Track your reports, see community priorities, and follow public action.",
    focus: ["My reported issues", "Community vote impact", "Nearby resolved cases"]
  },
  Moderator: {
    title: "Moderator Dashboard",
    description: "Review incoming complaints, detect duplicates, and keep reports clean before assignment.",
    focus: ["Unverified reports", "Duplicate clusters", "Escalation candidates"]
  },
  Officer: {
    title: "Officer Dashboard",
    description: "Monitor assigned work, urgency, field progress, and resolution commitments.",
    focus: ["Assigned critical work", "Open department load", "Resolution ageing"]
  },
  Admin: {
    title: "Admin Dashboard",
    description: "Govern citywide performance across complaints, departments, projects, and budgets.",
    focus: ["Systemwide performance", "Department accountability", "Budget risk"]
  }
};

export default function DashboardPage() {
  const role = useUiStore((state) => state.role);
  const complaints = useUiStore((state) => state.complaints);
  const reported = complaints.filter((complaint) => complaint.status === "Reported").length;
  const critical = complaints.filter((complaint) => complaint.priority === "Critical").length;
  const resolved = complaints.filter((complaint) => complaint.status === "Resolved").length;
  const officerDepartment = departments[0];
  const copy = roleCopy[role];
  const metrics = {
    Citizen: [
      { label: "My complaints", value: complaints.length, icon: FilePlus2, tone: "primary" as const },
      { label: "Community votes", value: complaints.reduce((total, complaint) => total + complaint.votes, 0), icon: Users, tone: "accent" as const },
      { label: "Resolved reports", value: resolved, icon: CheckCircle2, tone: "success" as const },
      { label: "Avg resolution", value: `${overviewStats.avgResolutionDays}d`, icon: Clock3, tone: "warning" as const }
    ],
    Moderator: [
      { label: "Needs verification", value: reported, icon: Eye, tone: "warning" as const },
      { label: "Critical queue", value: critical, icon: AlertTriangle, tone: "danger" as const },
      { label: "Under review", value: complaints.filter((complaint) => complaint.status === "Under Review").length, icon: ClipboardCheck, tone: "primary" as const },
      { label: "Duplicate risk", value: "12%", icon: ShieldCheck, tone: "accent" as const }
    ],
    Officer: [
      { label: "Assigned cases", value: complaints.filter((complaint) => complaint.status === "Assigned" || complaint.status === "In Progress").length, icon: ClipboardCheck, tone: "primary" as const },
      { label: "Critical tasks", value: critical, icon: AlertTriangle, tone: "danger" as const },
      { label: `${officerDepartment.name} open`, value: officerDepartment.open, icon: UserCheck, tone: "warning" as const },
      { label: "Resolved", value: resolved, icon: CheckCircle2, tone: "success" as const }
    ],
    Admin: [
      { label: "Total complaints", value: complaints.length, icon: AlertTriangle, tone: "warning" as const },
      { label: "Resolved", value: `${overviewStats.resolutionRate}%`, icon: CheckCircle2, tone: "success" as const },
      { label: "Average resolution", value: `${overviewStats.avgResolutionDays}d`, icon: Clock3, tone: "primary" as const },
      { label: "Budget utilized", value: `${overviewStats.budgetUtilization}%`, icon: WalletCards, tone: "accent" as const }
    ]
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{copy.title}</h1>
          <p className="mt-2 text-foreground/65">{copy.description}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics[role].map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
        <section className="glass rounded-lg p-5">
          <h2 className="text-xl font-bold">Role Focus</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {copy.focus.map((item) => (
              <div className="rounded-md border border-border bg-card p-4 font-semibold text-foreground/75" key={item}>{item}</div>
            ))}
          </div>
        </section>
        {role === "Citizen" ? (
          <LiveFeed />
        ) : role === "Moderator" ? (
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <LiveFeed />
            <AnalyticsPanel />
          </div>
        ) : role === "Officer" ? (
          <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
            <ProjectTable />
            <LiveFeed />
          </div>
        ) : (
          <>
            <AnalyticsPanel />
            <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
              <ProjectTable />
              <DepartmentLeaderboard />
            </div>
          </>
        )}
      </div>
    </DashboardShell>
  );
}
