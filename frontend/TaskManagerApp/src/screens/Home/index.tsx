import React from 'react';
import {useState} from 'react';

import {
  Alert,
  Image,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Clipboard} from '../../assets/index';
import {Task} from './components/Task';
import {Header} from '../../components/Header';
import {AntDesign} from '@expo/vector-icons';
import {Info} from '../../components/Info';
import {styles} from './styles';

export type TaskItem = {
  id: string;
  name: string;
  completed: boolean;
};
export function Home() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [task, setTask] = useState('');
  const [taskCounter, setTaskCounter] = useState(0);
  const [taskDoneCounter, setTaskDoneCounter] = useState(0);

  function handleTaskAdd(): void {
    if (tasks.some(item => item.name === task)) {
      return Alert.alert('Error', 'Task already exists');
    }
    if (task.trim() === '') {
      setTask('');
      return Alert.alert('Error', 'Task name cannot be empty');
    }
    const taskObject: TaskItem = {
      id: '',
      name: task,
      completed: false,
    };
    setTasks(prevState => [...prevState, taskObject]);
    setTaskCounter(prevState => prevState + 1);
    setTask('');
  }

  function handleTaskRemove(name: string): void {
    Alert.alert(
      'Warning',
      `Are you sure you want to remove the task ${name}?`,
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setTasks(prevState => prevState.filter(item => item.name !== name));
            setTaskCounter(prevState => prevState - 1);
          },
        },
      ],
    );
  }

  function handleTaskDoneCounter(value: boolean): void {
    if (value) {
      setTaskDoneCounter(prevState => prevState + 1);
    } else {
      setTaskDoneCounter(prevState => prevState - 1);
    }
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Adicione uma nova tarefa"
          keyboardAppearance="dark"
          autoCapitalize="words"
          keyboardType="default"
          placeholderTextColor={'#808080'}
          onChangeText={setTask}
          value={task}
        />

        <TouchableOpacity style={styles.button} onPress={handleTaskAdd}>
          <AntDesign name="pluscircleo" size={20} color={'#FFF'} />
        </TouchableOpacity>
      </View>

      <Info taskCounter={taskCounter} taskDoneCounter={taskDoneCounter} />

      <FlatList
        data={tasks}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <Task
            key={item.name}
            name={item}
            onCheckPressed={value => handleTaskDoneCounter(value)}
            onRemove={() => handleTaskRemove(item.name)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <>
            <Image source={Clipboard} style={styles.emptyListImage} />
            <Text style={styles.emptyListBold}>No tasks created</Text>
          </>
        )}
      />
    </View>
  );
}
