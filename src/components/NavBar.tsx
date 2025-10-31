import ThemeSwitcher from "@/src/components/ThemeSwitcher";
import { useTaskStore } from '@/src/store/useTaskStore';
import { useThemeStore } from "@/src/store/useThemeStore";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
const classNames = require('classnames');

export function NavBar() {
  const { tasks } = useTaskStore();
  const { dark } = useThemeStore();
  const pendingTasks = tasks.filter((t) => !t.completed).length;
  const totalTasks = tasks.length;
  return (
    <View className="pt-8">
      <View className="flex-row justify-between items-center py-4">
        <Link href='/' asChild>
          <Pressable className="flex-row justify-between active:opacity-70">
            <Text className={classNames('font-semibold text-2xl', dark ? "text-neutral-100" : "text-neutral-900")}>Cashea Tasks</Text>
          </Pressable>
        </Link>
        <View className="flex-row gap-1">
          <ThemeSwitcher />
        </View>
      </View>
      <View className="p-6 flex bg-blue-600 rounded-3xl justify-between">
        <Text className="pt-1 text-xl text-neutral-100">Hola crack! Tenés {totalTasks} tareas de las cuales {pendingTasks} estan pendientes.</Text>
      </View>
    </View>
  )
}