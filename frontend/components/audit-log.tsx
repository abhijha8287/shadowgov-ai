const logs = [
  "Moderator merged duplicate pothole reports in Ward 9",
  "Officer updated East Canal Drainage Upgrade to delayed",
  "AI generated monthly department risk report",
  "Admin exported budget anomaly CSV",
  "Citizen evidence verified for street light outage"
];

export function AuditLog() {
  return (
    <section className="glass rounded-lg p-5">
      <h2 className="mb-5 text-xl font-bold">Audit Logs</h2>
      <div className="space-y-3">
        {logs.map((log, index) => (
          <div className="flex gap-3 rounded-md border border-border bg-card p-4" key={log}>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">{index + 1}</span>
            <p>{log}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

