import React from 'react';
import { View, FlatList } from 'react-native';
import TaskItem from './TaskItem';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean
}

interface TaskListProps {
  tasks: Task[];
  onTaskPress: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskPress }) => (
  <View>
    <FlatList
      data={tasks}
      renderItem={({ item }) => <TaskItem task={item} onPress={() => onTaskPress(item)} />}
      keyExtractor={item => item.id.toString()}
    />
  </View>
);

export default TaskList;
