import AddTaskButton from '@/src/components/AddTaskButton';
import FilterBar from '@/src/components/FilterBar';
import { NavBar } from '@/src/components/NavBar';
import TaskItem from '@/src/components/TaskItem';
import AddTaskModal from '@/src/components/TaskModal';
import { useTaskStore } from '@/src/store/useTaskStore';
import { Filters } from '@/src/types/filterBar';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Task } from '../types/task';

export default function TaskListScreen() {
  const { tasks, loadTasks } = useTaskStore();
  const [filters, setFilters] = useState<Filters>({
    status: 'All',
    priority: 'All',
    sortBy: 'Newest',
  });
  const handleAddTask = () => {
    console.log('Abrir modal para nueva tarea');
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

  const handleEditPress = (task: Task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const handleCreatePress = () => {
    setSelectedTask(undefined);
    setModalVisible(true);
  };

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await loadTasks();
    } catch (error) {
      console.error("Error al recargar tareas:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, [loadTasks]);


  useEffect(() => {
    loadTasks();
  }, []);


  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filters.status === 'All' ||
      (filters.status === 'Completed' && task.completed) ||
      (filters.status === 'Pending' && !task.completed);

    const priorityMatch =
      filters.priority === 'All' || task.priority === filters.priority;

    return statusMatch && priorityMatch;
  })
  .sort((a, b) => {
    if (filters.sortBy === 'Newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  return (
    <View className="flex-1 p-4">
      <NavBar />
      <FilterBar filters={filters} setFilters={setFilters} />
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem task={item} onEdit={handleEditPress} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={["#007AFF"]}
            tintColor="#007AFF"
          />
        }
      />
      <AddTaskButton onPress={() => handleCreatePress()} />
      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        task={selectedTask}
      />
    </View>
  );
}
