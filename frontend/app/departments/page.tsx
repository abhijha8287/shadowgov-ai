import { DashboardShell } from "@/components/dashboard-shell";
import { DepartmentLeaderboard } from "@/components/department-leaderboard";
import { departments } from "@/lib/demo-data";

export default function DepartmentsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Departments</h1>
          <p className="mt-2 text-foreground/65">Performance, complaint load, budget responsibility, and response quality.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {departments.map((department) => (
            <article className="glass rounded-lg p-5" key={department.name}>
              <h2 className="text-xl font-bold">{department.name}</h2>
              <p className="mt-2 text-sm text-foreground/65">{department.owner}</p>
              <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                <span><b>{department.open}</b><br />Open</span>
                <span><b>{department.resolved}%</b><br />Resolved</span>
                <span><b>{department.score}</b><br />Score</span>
              </div>
            </article>
          ))}
        </div>
        <DepartmentLeaderboard />
      </div>
    </DashboardShell>
  );
}

