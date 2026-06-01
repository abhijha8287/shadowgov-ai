"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { trends, departmentTrend } from "@/lib/demo-data";

export function AnalyticsPanel({ expanded = false }: { expanded?: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`grid gap-6 ${expanded ? "xl:grid-cols-2" : "xl:grid-cols-[1.2fr_0.8fr]"}`}>
        <section className="glass h-[25rem] rounded-lg p-5">
          <h2 className="mb-5 text-xl font-bold">Complaint Trend</h2>
          <div className="h-80 rounded-md bg-muted" />
        </section>
        <section className="glass h-[25rem] rounded-lg p-5">
          <h2 className="mb-5 text-xl font-bold">Department Load</h2>
          <div className="h-80 rounded-md bg-muted" />
        </section>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${expanded ? "xl:grid-cols-2" : "xl:grid-cols-[1.2fr_0.8fr]"}`}>
      <section className="glass rounded-lg p-5">
        <h2 className="mb-5 text-xl font-bold">Complaint Trend</h2>
        <div className="h-80">
          <ResponsiveContainer>
            <AreaChart data={trends}>
              <defs>
                <linearGradient id="complaints" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#1f6fbd" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#1f6fbd" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area dataKey="complaints" stroke="#1f6fbd" fill="url(#complaints)" strokeWidth={3} />
              <Area dataKey="resolved" stroke="#2f9f65" fill="#2f9f6522" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section className="glass rounded-lg p-5">
        <h2 className="mb-5 text-xl font-bold">Department Load</h2>
        <div className="h-80">
          <ResponsiveContainer>
            <BarChart data={departmentTrend}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="open" fill="#2aa6a0" radius={[6, 6, 0, 0]} />
              <Bar dataKey="overdue" fill="#df3d4a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
