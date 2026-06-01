"use client";

import { useUiStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProjectTable({ full = false }: { full?: boolean }) {
  const projects = useUiStore((state) => state.projects);

  return (
    <section className="glass overflow-hidden rounded-lg">
      <div className="border-b border-border p-5">
        <h2 className="text-xl font-bold">Project Monitoring</h2>
      </div>
      <div className="overflow-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-muted text-foreground/65">
            <tr>
              {["Project", "Department", "Budget", "Progress", "Risk", "Status"].map((heading) => (
                <th className="px-5 py-3 font-bold" key={heading}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.slice(0, full ? projects.length : 5).map((project) => (
              <tr className="border-t border-border" key={project.id}>
                <td className="px-5 py-4">
                  <p className="font-bold">{project.title}</p>
                  <p className="text-foreground/55">{project.location}</p>
                </td>
                <td className="px-5 py-4">{project.department}</td>
                <td className="px-5 py-4">Rs {project.budget}Cr</td>
                <td className="px-5 py-4">
                  <div className="h-2 w-36 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-foreground/55">{project.progress}%</p>
                </td>
                <td className="px-5 py-4">
                  <span className={cn("rounded-full px-3 py-1 text-xs font-bold", project.risk > 70 ? "bg-danger/15 text-danger" : "bg-warning/15 text-warning")}>
                    {project.risk}
                  </span>
                </td>
                <td className="px-5 py-4">{project.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
