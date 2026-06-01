const rows = [
  ["Citizen", "Create complaints, ask AI, vote, comment, track updates"],
  ["Moderator", "Verify complaints, merge duplicates, approve reports"],
  ["Officer", "View assigned work, update status, respond publicly"],
  ["Admin", "Manage users, budgets, departments, audit logs, exports"]
];

export function RoleMatrix() {
  return (
    <section className="glass rounded-lg p-5">
      <h2 className="mb-5 text-xl font-bold">Role Matrix</h2>
      <div className="space-y-3">
        {rows.map(([role, access]) => (
          <div className="rounded-md border border-border bg-card p-4" key={role}>
            <p className="font-bold">{role}</p>
            <p className="mt-1 text-sm text-foreground/65">{access}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

