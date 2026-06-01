"use client";

import { DashboardShell } from "@/components/dashboard-shell";
import { departments } from "@/lib/demo-data";
import { useUiStore } from "@/lib/store";
import type { FormEvent } from "react";

function getUtilization(allocated: number, spent: number) {
  if (allocated <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((spent / allocated) * 100));
}

export default function BudgetPage() {
  const role = useUiStore((state) => state.role);
  const budgets = useUiStore((state) => state.budgets);
  const addBudget = useUiStore((state) => state.addBudget);
  const updateBudget = useUiStore((state) => state.updateBudget);
  const canManage = role === "Officer";

  function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const allocated = Number(form.get("allocated") || 0);
    const spent = Number(form.get("spent") || 0);

    addBudget({
      department: String(form.get("department") || departments[0].name),
      allocated,
      spent,
      utilization: getUtilization(allocated, spent)
    });

    event.currentTarget.reset();
  }

  function handleEdit(event: FormEvent<HTMLFormElement>, department: string) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const allocated = Number(form.get("allocated") || 0);
    const spent = Number(form.get("spent") || 0);

    updateBudget(department, {
      department,
      allocated,
      spent,
      utilization: getUtilization(allocated, spent)
    });
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Budget Transparency</h1>
            <p className="mt-2 text-foreground/65">Allocated, spent, remaining, and project-level expenditure signals.</p>
          </div>
          <span className="rounded-full bg-muted px-3 py-1 text-sm font-semibold">{role} view</span>
        </div>
        {canManage && (
          <form className="glass grid gap-4 rounded-lg p-4 md:grid-cols-4" onSubmit={handleAdd}>
            <label className="space-y-2">
              <span className="font-semibold">Department</span>
              <select className="w-full rounded-md border border-border bg-card px-4 py-3" name="department">
                {departments.map((department) => (
                  <option key={department.name}>{department.name}</option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className="font-semibold">Allocated (Cr)</span>
              <input className="w-full rounded-md border border-border bg-card px-4 py-3" min="0" name="allocated" type="number" required />
            </label>
            <label className="space-y-2">
              <span className="font-semibold">Spent (Cr)</span>
              <input className="w-full rounded-md border border-border bg-card px-4 py-3" min="0" name="spent" type="number" required />
            </label>
            <div className="flex items-end">
              <button className="w-full rounded-md bg-primary px-5 py-3 font-semibold text-white shadow-panel">Add Budget</button>
            </div>
          </form>
        )}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {budgets.map((budget) => (
            <article className="glass rounded-lg p-5" key={budget.department}>
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-bold">{budget.department}</h2>
                <span className="rounded-full bg-muted px-3 py-1 text-sm font-semibold">{budget.utilization}%</span>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-accent" style={{ width: `${budget.utilization}%` }} />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <span><b>Rs {budget.allocated}Cr</b><br />Allocated</span>
                <span><b>Rs {budget.spent}Cr</b><br />Spent</span>
              </div>
              {canManage && (
                <form className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto]" onSubmit={(event) => handleEdit(event, budget.department)}>
                  <input className="rounded-md border border-border bg-card px-3 py-2" defaultValue={budget.allocated} min="0" name="allocated" type="number" aria-label={`${budget.department} allocated`} />
                  <input className="rounded-md border border-border bg-card px-3 py-2" defaultValue={budget.spent} min="0" name="spent" type="number" aria-label={`${budget.department} spent`} />
                  <button className="rounded-md border border-border bg-card px-4 py-2 font-semibold">Save</button>
                </form>
              )}
            </article>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
