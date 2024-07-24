import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {TaskItem} from './index';
import {updateTask} from '../../services/api';
import {styles} from './styles';
import Checkbox from 'expo-checkbox';
import {Header} from '@components/Header';

type RootStackParamList = {
  Home: undefined;
  EditTask: {task: TaskItem};
};

type EditTaskScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditTask'
>;

type EditTaskScreenRouteProp = RouteProp<RootStackParamList, 'EditTask'>;

type Props = {
  navigation?: EditTaskScreenNavigationProp;
  route?: EditTaskScreenRouteProp;
};

export function EditTaskScreen({navigation, route}: Props) {
  // @ts-ignore
  const {task} = route?.params;
  const [name, setName] = useState(task.name);
  const [isChecked, setChecked] = useState(task.completed);

  const handleSave = async () => {
    try {
      if (name.trim() === '') {
        return Alert.alert('Error', 'Task name cannot be empty');
      }
      await updateTask('bc39b7db-d7b1-4cb2-be62-9758861c1861', isChecked, name);
      Alert.alert('Success', 'Task updated successfully');
      navigation?.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update task');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.form}>
        <Text style={styles.taskAdd}>Current task title: {task.name}</Text>
      </View>
      <TextInput
        style={styles.smallLnput}
        value={name}
        onChangeText={setName}
        placeholder="New Task Name"
      />
      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={(value: any) => {
            if (value) {
              setChecked(true);
            } else {
              setChecked(false);
            }
          }}
        />
        <Text style={styles.taskAdd}>Task Completed</Text>
      </View>
      <View style={styles.secondForm}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation?.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
