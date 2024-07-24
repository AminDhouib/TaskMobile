// src/screens/TaskDetailScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getTaskById, updateTaskStatus } from '../services/api';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

type RootStackParamList = {
  TaskDetail: { taskId: number };
};

type TaskDetailScreenRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>;

type TaskDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskDetail'>;

type Props = {
  route: TaskDetailScreenRouteProp;
  navigation: TaskDetailScreenNavigationProp;
};

const TaskDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  const fetchTaskDetails = async () => {
    const fetchedTask = await getTaskById(taskId);
    setTask(fetchedTask);
  };

  const handleUpdateStatus = async () => {
    if (task) {
      const updatedTask = await updateTaskStatus(task.id, !task.completed);
      setTask(updatedTask);
    }
  };

  if (!task) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Title: {task.title}</Text>
      <Text>Description: {task.description}</Text>
      <Text>Status: {task.completed ? 'Completed' : 'Pending'}</Text>
      <Button title={task.completed ? "Mark as Pending" : "Mark as Completed"} onPress={handleUpdateStatus} />
    </View>
  );
};

export default TaskDetailScreen;
