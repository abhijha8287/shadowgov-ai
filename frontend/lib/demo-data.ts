import type { Budget, Complaint, Project } from "@/lib/types";

export const overviewStats = {
  totalComplaints: 1248,
  openComplaints: 418,
  resolutionRate: 68,
  avgResolutionDays: 8.4,
  projects: 96,
  budgetUtilization: 72
};

export const complaints: Complaint[] = [
  {
    id: "CMP-1001",
    title: "Road surface collapsed near school gate",
    location: "Ward 9, Lake Road",
    department: "Public Works",
    status: "Assigned",
    priority: "Critical",
    urgency: 91,
    risk: "High",
    votes: 184,
    summary: "Recurring pothole cluster near school entrance is creating traffic risk and pedestrian exposure during morning hours."
  },
  {
    id: "CMP-1002",
    title: "Drainage overflow after evening rain",
    location: "Ward 12, Canal Street",
    department: "Water & Drainage",
    status: "In Progress",
    priority: "High",
    urgency: 84,
    risk: "High",
    votes: 132,
    summary: "Blocked storm drain is causing backflow into adjacent lanes and may affect nearby clinic access."
  },
  {
    id: "CMP-1003",
    title: "Street lights inactive for five nights",
    location: "Ward 4, Market Road",
    department: "Electricity",
    status: "Under Review",
    priority: "High",
    urgency: 76,
    risk: "Medium",
    votes: 91,
    summary: "Four consecutive poles are inactive, with multiple citizen photos confirming a safety concern after 8 PM."
  },
  {
    id: "CMP-1004",
    title: "Garbage collection skipped in apartment lane",
    location: "Ward 7, South Avenue",
    department: "Sanitation",
    status: "Reported",
    priority: "Medium",
    urgency: 63,
    risk: "Medium",
    votes: 57,
    summary: "Waste has accumulated for three days and is attracting complaints from two resident associations."
  },
  {
    id: "CMP-1005",
    title: "Illegal construction blocking pedestrian path",
    location: "Ward 2, Station Link",
    department: "Urban Planning",
    status: "Assigned",
    priority: "Critical",
    urgency: 88,
    risk: "High",
    votes: 211,
    summary: "Temporary commercial structure has narrowed footpath near transit entrance and requires inspection."
  },
  {
    id: "CMP-1006",
    title: "Water leakage from main pipeline",
    location: "Ward 11, Temple Junction",
    department: "Water & Drainage",
    status: "Resolved",
    priority: "High",
    urgency: 79,
    risk: "Low",
    votes: 74,
    summary: "Pipeline leakage was patched after pressure isolation and follow-up inspection is scheduled."
  }
];

export const projects: Project[] = [
  { id: "PRJ-1", title: "East Canal Drainage Upgrade", department: "Water & Drainage", location: "Zone East", budget: 42, progress: 42, risk: 86, status: "Delayed" },
  { id: "PRJ-2", title: "Lake Road Resurfacing", department: "Public Works", location: "Ward 9", budget: 18, progress: 61, risk: 74, status: "At Risk" },
  { id: "PRJ-3", title: "Smart Street Light Retrofit", department: "Electricity", location: "Citywide", budget: 27, progress: 78, risk: 44, status: "On Track" },
  { id: "PRJ-4", title: "Material Recovery Facility", department: "Sanitation", location: "Industrial Zone", budget: 33, progress: 56, risk: 68, status: "At Risk" },
  { id: "PRJ-5", title: "Ward 12 Clinic Access Road", department: "Public Works", location: "Ward 12", budget: 12, progress: 35, risk: 82, status: "Delayed" },
  { id: "PRJ-6", title: "Flood Sensor Network", department: "Disaster Management", location: "Low-lying wards", budget: 21, progress: 69, risk: 51, status: "On Track" }
];

export const departments = [
  { name: "Public Works", owner: "Chief Engineer A. Menon", open: 146, resolved: 61, score: 58 },
  { name: "Water & Drainage", owner: "Director S. Rao", open: 98, resolved: 66, score: 64 },
  { name: "Sanitation", owner: "Commissioner P. Das", open: 72, resolved: 74, score: 72 },
  { name: "Electricity", owner: "Officer N. Shah", open: 51, resolved: 79, score: 77 },
  { name: "Urban Planning", owner: "Planner R. Iyer", open: 43, resolved: 57, score: 55 },
  { name: "Disaster Management", owner: "Lead K. Verma", open: 8, resolved: 83, score: 81 }
];

export const budgets: Budget[] = [
  { department: "Public Works", allocated: 240, spent: 171, utilization: 71 },
  { department: "Water & Drainage", allocated: 182, spent: 139, utilization: 76 },
  { department: "Sanitation", allocated: 126, spent: 91, utilization: 72 },
  { department: "Electricity", allocated: 98, spent: 64, utilization: 65 },
  { department: "Urban Planning", allocated: 76, spent: 49, utilization: 64 },
  { department: "Disaster Management", allocated: 54, spent: 43, utilization: 80 }
];

export const trends = [
  { month: "Jan", complaints: 760, resolved: 540 },
  { month: "Feb", complaints: 820, resolved: 588 },
  { month: "Mar", complaints: 910, resolved: 620 },
  { month: "Apr", complaints: 1040, resolved: 704 },
  { month: "May", complaints: 1180, resolved: 772 },
  { month: "Jun", complaints: 1248, resolved: 849 }
];

export const departmentTrend = departments.map((department) => ({
  name: department.name.split(" ")[0],
  open: department.open,
  overdue: Math.round(department.open * (1 - department.resolved / 100))
}));
