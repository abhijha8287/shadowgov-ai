"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bot,
  Building2,
  ClipboardList,
  Home,
  Landmark,
  Map,
  Megaphone,
  Moon,
  Shield,
  Sun,
  WalletCards
} from "lucide-react";
import { useUiStore, type UserRole } from "@/lib/store";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/assistant", label: "AI Assistant", icon: Bot },
  { href: "/complaints", label: "Complaints", icon: ClipboardList },
  { href: "/projects", label: "Projects", icon: Landmark },
  { href: "/departments", label: "Departments", icon: Building2 },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/maps", label: "Maps", icon: Map },
  { href: "/community", label: "Community", icon: Megaphone },
  { href: "/budget", label: "Budget", icon: WalletCards },
  { href: "/admin", label: "Admin", icon: Shield }
];

export function DashboardShell({ children, compact = false }: { children: React.ReactNode; compact?: boolean }) {
  const pathname = usePathname();
  const { darkMode, toggleDarkMode, role, setRole } = useUiStore();

  return (
    <div className={cn("min-h-screen", darkMode && "dark")}>
      <div className="mx-auto flex w-full max-w-[1500px] gap-5 px-3 py-3 sm:px-4 sm:py-4">
        {!compact && (
          <aside className="glass sticky top-4 hidden h-[calc(100vh-2rem)] w-64 shrink-0 rounded-lg p-4 lg:block">
            <Link href="/" className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold">ShadowGov AI</p>
                <p className="text-xs text-foreground/55">Civic OS</p>
              </div>
            </Link>
            <nav className="space-y-1">
              {nav.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-foreground/70",
                    pathname === item.href && "bg-primary text-white"
                  )}
                >
                  <item.icon className="h-4 w-4" /> {item.label}
                </Link>
              ))}
            </nav>
          </aside>
        )}
        <div className="min-w-0 flex-1">
          <header className="glass sticky top-3 z-10 mb-4 flex min-w-0 items-center justify-between gap-2 rounded-lg px-2 py-3 sm:top-4 sm:mb-5 sm:gap-3 sm:px-4">
            <Link href="/" className="flex min-w-0 items-center gap-2 font-bold sm:gap-3">
              <Landmark className="h-5 w-5 shrink-0 text-primary" />
              <span className="truncate text-sm sm:text-base">ShadowGov AI</span>
            </Link>
            <div className="flex shrink-0 items-center gap-2">
              <select
                className="w-20 rounded-md border border-border bg-card px-2 py-2 text-sm font-semibold sm:w-auto sm:px-3"
                value={role}
                onChange={(event) => setRole(event.target.value as UserRole)}
                aria-label="Role"
              >
                {(["Citizen", "Moderator", "Officer", "Admin"] as UserRole[]).map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <button
                className="hidden rounded-md border border-border bg-card p-2 sm:block"
                onClick={toggleDarkMode}
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </header>
          {!compact && (
            <nav className="mb-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {nav.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground/70",
                    pathname === item.href && "border-primary bg-primary text-white"
                  )}
                >
                  <item.icon className="h-4 w-4" /> {item.label}
                </Link>
              ))}
            </nav>
          )}
          <main className="pb-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
