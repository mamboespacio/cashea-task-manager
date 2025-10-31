import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface ThemeState {
  dark: boolean;
  toggleTheme: () => void;
  loadTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  dark: false,

  loadTheme: async () => {
    try {
      const value = await AsyncStorage.getItem("darkMode");
      if (value !== null) {
        set({ dark: value === "true" });
      }
    } catch (err) {
      console.error("Error loading theme:", err);
    }
  },

  toggleTheme: async () => {
    const newDark = !get().dark;
    set({ dark: newDark });
    try {
      await AsyncStorage.setItem("darkMode", newDark.toString());
    } catch (err) {
      console.error("Error saving theme:", err);
    }
  },
}));
