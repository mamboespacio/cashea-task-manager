import { formatDate } from '@/src/lib/utils';
import { useTaskStore } from '@/src/store/useTaskStore';
import { useThemeStore } from "@/src/store/useThemeStore";
import { Task } from '@/src/types/task';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
const classNames = require('classnames');

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}
const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  const updateTask = useTaskStore((s) => s.updateTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const { dark } = useThemeStore();
  return (
    <Animated.View
      entering={FadeInDown.springify().mass(1)}
      exiting={FadeOutUp.springify().mass(1)}
      className={classNames('flex py-6 px-6 mb-2 rounded-2xl', dark ? 'bg-neutral-700' : 'bg-neutral-200', task.completed ? 'opacity-50' : 'opacity-100')}
    >
        <TouchableOpacity onPress={() => updateTask(task.id, { completed: !task.completed })}>
          <View className='flex-row justify-between items-center'>
            <View className='w-80'>
              <Text className={classNames('text-xl', dark ? 'text-neutral-100' : 'text-neutral-900')}>
                {task.title}
              </Text>
              <View className='pt-1 flex-row items-center gap-2'>
                <Text className={classNames('text-xs px-2 py-1 rounded-full border', dark ? 'border-neutral-100 text-neutral-100' : 'border-neutral-900 text-neutral-900')}>{task.priority}</Text>
                <Text className={classNames('text-xs', dark ? 'text-neutral-100' : 'text-neutral-900')}>{formatDate(task.createdAt)}</Text>
              </View>
            </View>
            <View className='flex gap-2'>
              <Pressable className="flex-row items-center p-2 bg-red-400 rounded-full" onPress={() => deleteTask(task.id)}>
                <Ionicons name='remove-outline' color='white' size={16} />
              </Pressable>
              <Pressable className="flex-row items-center p-2 bg-neutral-400 rounded-full" onPress={() => onEdit(task)}>
                <Ionicons name='pencil-outline' color='white' size={16} />
              </Pressable>
            </View>
          </View>
        </TouchableOpacity>
    </Animated.View>
  );
}
export default TaskItem;