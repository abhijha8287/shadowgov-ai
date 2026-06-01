import { create } from "zustand";
import { persist } from "zustand/middleware";
import { budgets as demoBudgets, complaints as demoComplaints, projects as demoProjects } from "@/lib/demo-data";
import type { Budget, Complaint, Project } from "@/lib/types";

export type UserRole = "Citizen" | "Moderator" | "Officer" | "Admin";

type UiState = {
  darkMode: boolean;
  role: UserRole;
  complaints: Complaint[];
  projects: Project[];
  budgets: Budget[];
  toggleDarkMode: () => void;
  setRole: (role: UserRole) => void;
  addComplaint: (complaint: Complaint) => void;
  addProject: (project: Project) => void;
  addBudget: (budget: Budget) => void;
  updateBudget: (department: string, budget: Budget) => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      darkMode: false,
      role: "Citizen",
      complaints: demoComplaints,
      projects: demoProjects,
      budgets: demoBudgets,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setRole: (role) => set({ role }),
      addComplaint: (complaint) => set((state) => ({ complaints: [complaint, ...state.complaints] })),
      addProject: (project) => set((state) => ({ projects: [project, ...state.projects] })),
      addBudget: (budget) =>
        set((state) => ({
          budgets: state.budgets.some((item) => item.department === budget.department)
            ? state.budgets.map((item) => (item.department === budget.department ? budget : item))
            : [budget, ...state.budgets]
        })),
      updateBudget: (department, budget) =>
        set((state) => ({
          budgets: state.budgets.map((item) => (item.department === department ? budget : item))
        }))
    }),
    {
      name: "shadowgov-ui"
    }
  )
);
