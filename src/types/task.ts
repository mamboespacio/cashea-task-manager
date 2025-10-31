export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  createdAt: string;
}