export type ComplaintStatus = "Reported" | "Under Review" | "Assigned" | "In Progress" | "Resolved" | "Rejected";
export type Priority = "Low" | "Medium" | "High" | "Critical";

export type Complaint = {
  id: string;
  title: string;
  location: string;
  department: string;
  status: ComplaintStatus;
  priority: Priority;
  urgency: number;
  risk: string;
  votes: number;
  summary: string;
};

export type Project = {
  id: string;
  title: string;
  department: string;
  location: string;
  budget: number;
  progress: number;
  risk: number;
  status: string;
};

export type Budget = {
  department: string;
  allocated: number;
  spent: number;
  utilization: number;
};
