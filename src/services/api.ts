import { Task } from '@/src/types/task';

const BASE_URL = "http://192.168.0.69:3001/tasks"; // ⚠️ reemplazá con tu IP local

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Error al cargar tareas");
  return res.json();
}

export async function addTask(task: Omit<Task, 'id'>): Promise<Task> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Error al crear tarea");
  return res.json();
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<Task> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Error al actualizar tarea");
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar tarea");
}
