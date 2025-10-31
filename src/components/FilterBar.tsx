import { useThemeStore } from "@/src/store/useThemeStore";
import React, { useState } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { FilterBarProps, Priority, Status } from '../types/filterBar';

export default function FilterBar({ filters, setFilters }: FilterBarProps) {
  const [statusValue, setStatusValue] = useState<Status>(filters.status);
  const [priorityValue, setPriorityValue] = useState<Priority>(filters.priority);
  const { dark } = useThemeStore();

  const statusData = [
    { label: 'All', value: 'All' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Pending', value: 'Pending' },
  ];

  const priorityData = [
    { label: 'All', value: 'All' },
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
  ];

  const sortOptions = [
    { label: '↑', value: 'Newest' },
    { label: '↓', value: 'Oldest' },
  ];

  return (
    <View className="my-4 flex-row justify-between">
      {/* Estado */}
      <Dropdown
        style={{
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 50,
          paddingHorizontal: 16,
          paddingVertical: 16,
          flex: 3,
          marginRight: 8,
        }}
        selectedTextStyle={{ color: dark ? 'white' : 'black' }}
        placeholderStyle={{ color: dark ? 'white' : 'black' }}
        data={statusData}
        labelField="label"
        valueField="value"
        value={statusValue}
        onChange={(item) => {
          setStatusValue(item.value as Status);
          setFilters({ ...filters, status: item.value as Status });
        }}
        placeholder="Estado"
      />

      {/* Prioridad */}
      <Dropdown
        style={{
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 50,
          paddingHorizontal: 16,
          paddingVertical: 16,
          flex: 2,
          marginRight: 8,
        }}
        selectedTextStyle={{ color: dark ? 'white' : 'black' }}
        placeholderStyle={{ color: dark ? 'white' : 'black' }}
        data={priorityData}
        labelField="label"
        valueField="value"
        value={priorityValue}
        onChange={(item) => {
          setPriorityValue(item.value as Priority);
          setFilters({ ...filters, priority: item.value as Priority });
        }}
        placeholder="Prioridad"
      />
      <Dropdown
        style={{
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 50,
          paddingHorizontal: 16,
          paddingVertical: 16,
          flex: 1,
        }}
        selectedTextStyle={{ color: dark ? 'white' : 'black' }}
        placeholderStyle={{ color: dark ? 'white' : 'black' }}
        data={sortOptions}
        labelField="label"
        valueField="value"
        value={filters.sortBy}
        onChange={(item) => setFilters({ ...filters, sortBy: item.value })}
        placeholder="Sort by"
      />
    </View>
  );
}
