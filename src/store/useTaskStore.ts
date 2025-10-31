import { addTask, deleteTask, getTasks, updateTask } from '@/src/services/api';
import { Task } from '@/src/types/task';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  loadTasks: () => Promise<void>;
  addTask: (task: Omit<Task, "id">) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (id: string, updates: Partial<Omit<Task, "id">>) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,

  loadTasks: async () => {
    set({ loading: true });
    try {
      const data = await getTasks();
      set({ tasks: data });
      await AsyncStorage.setItem("tasks", JSON.stringify(data));
    } catch (err) {
      console.error("Error loading tasks:", err);
    } finally {
      set({ loading: false });
    }
  },

  addTask: async (task) => {
    set({ loading: true });
    try {
      const newTask = await addTask(task);
      const updatedTasks = [...get().tasks, newTask];
      set({ tasks: updatedTasks });
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
    catch (err) {
      console.error("Error adding task:", err);
    }
  },

  updateTask: async (id, updates) => {
    try {
      const updatedTask = await updateTask(id, updates);

      const updated = get().tasks.map((t) => (t.id === id ? updatedTask : t));
      set({ tasks: updated });

      // persistimos local
      await AsyncStorage.setItem("tasks", JSON.stringify(updated));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  },

  deleteTask: async (id) => {
    try {
      await deleteTask(id);
      const updated = get().tasks.filter((t) => t.id !== id);
      set({ tasks: updated });
      await AsyncStorage.setItem("tasks", JSON.stringify(updated));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  },
}));
