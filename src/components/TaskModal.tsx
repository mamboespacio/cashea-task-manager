import { useTaskStore } from "@/src/store/useTaskStore";
import { Task } from "@/src/types/task";
import React, { useEffect, useState } from "react";
import { Alert, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  task?: Task;
}

const TaskModal: React.FC<TaskModalProps> = ({ visible, onClose, task }) => {
  const addTask = useTaskStore((s) => s.addTask);
  const updateTask = useTaskStore((s) => s.updateTask);

  const [text, setText] = useState(task?.title || "");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">(task?.priority || "Medium");

  const priorities = [
    { label: "High", value: "High" },
    { label: "Medium", value: "Medium" },
    { label: "Low", value: "Low" },
  ];

  useEffect(() => {
    if (task) {
      setText(task.title);
      setPriority(task.priority);
    } else {
      setText("");
      setPriority("Medium");
    }
  }, [task, visible]);

  const handleSave = async () => {
    if (!text.trim()) {
      Alert.alert("Por favor ingresa una tarea");
      return;
    }

    if (task) {
      await updateTask(task.id, { title: text, priority });
    } else {
      await addTask({
        title: text,
        priority,
        completed: false,
        createdAt: new Date().toISOString(),
      });
    }

    setText("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white w-80 rounded-2xl p-5">
          <Text className="text-lg font-semibold mb-3">
            {task ? "Editar tarea" : "Nueva tarea"}
          </Text>
          <TextInput
            placeholder="Título de la tarea"
            value={text}
            onChangeText={setText}
            className="border border-gray-300 rounded-lg p-4 mb-4"
          />
          <Dropdown
            data={priorities}
            labelField="label"
            valueField="value"
            value={priority}
            onChange={(item) => setPriority(item.value)}
            style={{
              borderColor: "#D1D5DB",
              borderWidth: 1,
              borderRadius: 6,
              paddingHorizontal: 12,
              paddingVertical: 12,
            }}
          />
          <View className="flex-row justify-end mt-4 gap-1">
            <TouchableOpacity onPress={onClose} className="px-4 py-2 bg-red-100 rounded-lg">
              <Text className="text-gray-500">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} className="px-4 py-2 bg-blue-100 rounded-lg">
              <Text className="text-blue-600 font-semibold">{task ? "Guardar" : "Agregar"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TaskModal;
