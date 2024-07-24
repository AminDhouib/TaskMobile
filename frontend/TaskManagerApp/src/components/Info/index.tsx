import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';

type Props = {
  taskCounter: number;
  taskDoneCounter: number;
};

export function Info({taskCounter, taskDoneCounter}: Props) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.taskAdd}>New tasks</Text>
          <Text style={styles.taskCounter}>{taskCounter}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.taskDone}>Done tasks</Text>
          <Text style={styles.taskCounter}>{taskDoneCounter}</Text>
        </View>
      </View>
      <View style={styles.horizontalBar} />
    </>
  );
}
