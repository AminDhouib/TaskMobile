import React, {useEffect} from 'react';
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
import {StackNavigationProp} from '@react-navigation/stack';
import {addTask, deleteTask, getTasks} from '../../services/api';

export type TaskItem = {
  id: string;
  name: string;
  completed: boolean;
};
type RootStackParamList = {
  Home: undefined;
  EditTask: {task: TaskItem};
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};
export function Home({navigation}: Props) {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [task, setTask] = useState('');
  const [taskCounter, setTaskCounter] = useState(0);
  const [taskDoneCounter, setTaskDoneCounter] = useState(0);
  useEffect(() => {
    const getData = async () => {
      console.log('get data');
      const response = await getTasks();
      console.log('done');
      setTasks(response);
      setTaskCounter(response.length);
      setTaskDoneCounter(response.filter(item => item.completed).length);
    };
    getData();
  }, []);
  async function handleTaskAdd(): Promise<void> {
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
    const res = await addTask(taskObject);
    setTasks(prevState => [...prevState, res]);
    setTaskCounter(prevState => prevState + 1);
    setTask('');
  }
  function handleOpenDetails(task: TaskItem): void {
    if (task) {
      navigation.navigate('EditTask', {task});
    }
  }
  function handleTaskRemove(item: TaskItem): void {
    Alert.alert(
      'Warning',
      `Are you sure you want to remove the task ${item.name}?`,
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setTasks(prevState => prevState.filter(it => it.id !== item.id));
            setTaskCounter(prevState => prevState - 1);
            deleteTask(item.id);
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
          placeholder="Add a new task"
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
            onEdit={() => handleOpenDetails(item)}
            onRemove={() => handleTaskRemove(item)}
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
