import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {styles} from './styles';

import Checkbox from 'expo-checkbox';
import {TaskItem} from '../../index';

type Props = {
  name: TaskItem;
  onRemove: () => void;
  onCheckPressed: (value: boolean) => void;
  onEdit: () => void;
};

export function Task({name, onRemove, onCheckPressed, onEdit}: Props) {
  const [isChecked, setChecked] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={(value: any) => {
            if (value) {
              setChecked(true);
              onCheckPressed(true);
            } else {
              setChecked(false);
              onCheckPressed(false);
            }
          }}
        />
        {isChecked ? (
          <Text style={styles.taskDone}>{name.name}</Text>
        ) : (
          <Text style={styles.taskAdd}>{name.name}</Text>
        )}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.button} onPress={onEdit}>
            <AntDesign name="edit" size={24} color={'#808080'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onRemove}>
            <AntDesign name="delete" size={24} color={'#dc3545'} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
