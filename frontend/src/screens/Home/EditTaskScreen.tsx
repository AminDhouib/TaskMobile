import { Header } from '@components/Header'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import Checkbox from 'expo-checkbox'
import React, { useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { updateTask } from '../../services/api'
import { TaskItem } from './index'
import { styles } from './styles'

type RootStackParamList = {
    Home: undefined
    EditTask: { task: TaskItem }
}

type EditTaskScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'EditTask'
>

type EditTaskScreenRouteProp = RouteProp<RootStackParamList, 'EditTask'>

type Props = {
    navigation?: EditTaskScreenNavigationProp
    route?: EditTaskScreenRouteProp
}

export function EditTaskScreen({ navigation, route }: Props) {
    // @ts-ignore
    const { task } = route?.params
    const [name, setName] = useState(task.title)
    const [description, setDescription] = useState(task.description)
    const [isChecked, setChecked] = useState(task.completed)

    const handleSave = async () => {
        try {
            if (name.trim() === '' || description.trim() === '') {
                return Alert.alert(
                    'Error',
                    'Task name and description cannot be empty'
                )
            }
            await updateTask(task.id, isChecked, name, description)
            Alert.alert('Success', 'Task updated successfully')
            navigation?.navigate('Home')
        } catch (error) {
            Alert.alert('Error', 'Failed to update task')
            console.error(error)
        }
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.form}>
                <Text style={styles.mainTitle}>Edit task {task.title}</Text>
            </View>
            <View style={styles.form}>
                <View style={styles.containerColBigger}>
                    <TextInput
                        style={styles.input}
                        placeholder="Task title"
                        keyboardAppearance="dark"
                        autoCapitalize="words"
                        keyboardType="default"
                        placeholderTextColor={'#808080'}
                        onChangeText={setName}
                        value={name}
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
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked}
                            onValueChange={(value: any) => {
                                if (value) {
                                    setChecked(true)
                                } else {
                                    setChecked(false)
                                }
                            }}
                        />
                        <Text style={styles.taskAdd}>Task Completed</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSave}
                    >
                        <Text style={styles.buttonText}>Update task</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.secondForm}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation?.goBack()}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
