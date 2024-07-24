import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import TaskList from '../components/TaskList';
import { getTasks } from '../services/api';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'completed';
}

const TaskListScreen: React.FC = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

  return (
    <View>
      <Text>Task List</Text>
      <TaskList tasks={tasks} onTaskPress={(task) => navigation.navigate('TaskDetail', { task })} />
      <Button title="Add Task" onPress={() => navigation.navigate('AddTask')} />
    </View>
  );
};

export default TaskListScreen;
