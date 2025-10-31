import TaskListScreen from '@/src/screens/TaskListScreen';
import { useThemeStore } from '@/src/store/useThemeStore';
import { useEffect } from 'react';
import { View } from 'react-native';
const classNames = require('classnames');

export default function App() {
  const { dark, loadTheme } = useThemeStore();
   useEffect(() => {
    loadTheme();
  }, []);
  return (
    <View className={dark ? "dark flex-1 bg-black" : "flex-1 bg-white"}>
      <TaskListScreen />
    </View>
  );
}