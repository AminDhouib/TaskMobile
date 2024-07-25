import { useFocusEffect } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import {
    Alert,
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { Clipboard } from '../../assets/index'
import { Header } from '../../components/Header'
import { Info } from '../../components/Info'
import { addTask, deleteTask, getTasks } from '../../services/api'
import { Task } from './components/Task'
import { styles } from './styles'

export type TaskItem = {
    id: string
    title: string
    description: string
    completed: boolean
}
type RootStackParamList = {
    Home: undefined
    EditTask: { task: TaskItem }
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

type Props = {
    navigation: HomeScreenNavigationProp
}
export function Home({ navigation }: Props) {
    const [tasks, setTasks] = useState<TaskItem[]>([])
    const [task, setTask] = useState('')
    const [description, setDescription] = useState('')
    const [taskCounter, setTaskCounter] = useState(0)
    const [taskDoneCounter, setTaskDoneCounter] = useState(0)
    const getData = async () => {
        const response = await getTasks()
        setTasks(response.reverse())
        setTaskCounter(response.length)
        setTaskDoneCounter(response.filter(item => item.completed).length)
    }
    useEffect(() => {
        getData()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            setTasks([])
            getData()
        }, [])
    )
    async function handleTaskAdd(): Promise<void> {
        if (tasks.some(item => item.title === task)) {
            return Alert.alert('Error', 'Task already exists')
        }
        if (task.trim() === '' || description.trim() === '') {
            return Alert.alert(
                'Error',
                'Task name and description cannot be empty'
            )
        }
        const taskObject: TaskItem = {
            id: '',
            title: task,
            description: description,
            completed: false,
        }
        const res = await addTask(taskObject)
        setTasks(prevState => [res, ...prevState])
        setTaskCounter(prevState => prevState + 1)
        setTask('')
        setDescription('')
    }
    function handleOpenDetails(task: TaskItem): void {
        if (task) {
            navigation.navigate('EditTask', { task })
        }
    }
    function handleTaskRemove(item: TaskItem): void {
        Alert.alert(
            'Warning',
            `Are you sure you want to remove the task ${item.title}?`,
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        setTasks(prevState =>
                            prevState.filter(it => it.id !== item.id)
                        )
                        if (item.completed) {
                            setTaskDoneCounter(prevState => prevState - 1)
                        }
                        setTaskCounter(prevState => prevState - 1)
                        deleteTask(item.id)
                    },
                },
            ]
        )
    }

    function handleTaskDoneCounter(value: boolean): void {
        if (value) {
            setTaskDoneCounter(prevState => prevState + 1)
        } else {
            setTaskDoneCounter(prevState => prevState - 1)
        }
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.form}>
                <View style={styles.containerCol}>
                    <TextInput
                        style={styles.input}
                        placeholder="Task title"
                        keyboardAppearance="dark"
                        autoCapitalize="words"
                        keyboardType="default"
                        placeholderTextColor={'#808080'}
                        onChangeText={setTask}
                        value={task}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        keyboardAppearance="dark"
                        autoCapitalize="words"
                        keyboardType="default"
                        placeholderTextColor={'#808080'}
                        onChangeText={setDescription}
                        value={description}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleTaskAdd}
                    >
                        <Text style={styles.buttonText}>Add Task</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Info taskCounter={taskCounter} taskDoneCounter={taskDoneCounter} />

            <FlatList
                data={tasks}
                keyExtractor={item => item.title}
                renderItem={({ item }) => (
                    <Task
                        key={item.id}
                        item={item}
                        onCheckPressed={value => handleTaskDoneCounter(value)}
                        onEdit={() => handleOpenDetails(item)}
                        onRemove={() => handleTaskRemove(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <>
                        <Image
                            source={Clipboard}
                            style={styles.emptyListImage}
                        />
                        <Text style={styles.emptyListBold}>
                            No tasks created
                        </Text>
                    </>
                )}
            />
        </View>
    )
}
