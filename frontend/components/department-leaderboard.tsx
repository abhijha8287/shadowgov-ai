import { departments } from "@/lib/demo-data";

export function DepartmentLeaderboard() {
  return (
    <section className="glass rounded-lg p-5">
      <h2 className="mb-5 text-xl font-bold">Department Performance</h2>
      <div className="space-y-4">
        {departments.map((department) => (
          <div key={department.name}>
            <div className="mb-2 flex items-center justify-between gap-4 text-sm">
              <span className="font-bold">{department.name}</span>
              <span>{department.score}/100</span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div className="h-full rounded-full bg-accent" style={{ width: `${department.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

