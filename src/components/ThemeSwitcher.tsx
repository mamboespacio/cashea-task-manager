import { useThemeStore } from "@/src/store/useThemeStore";
import { Switch, View } from "react-native";

const ThemeSwitcher: React.FC = () => {
  const { dark, toggleTheme } = useThemeStore();

  return (
    <View className="flex-row items-center space-x-2">
      <Switch
        value={dark}
        onValueChange={toggleTheme}
        trackColor={{false: '#999', true: '#999'}}
      />
    </View>
  );
}
export default ThemeSwitcher;