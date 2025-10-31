import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface AddTaskButtonProps {
  onPress: () => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onPress }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 10 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10 });
    onPress();
  };

  return (
    <Animated.View
      className="absolute bottom-6 right-6"
      style={animatedStyle}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="w-14 h-14 bg-blue-600 rounded-full items-center justify-center shadow-lg shadow-black/40"
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AddTaskButton;
