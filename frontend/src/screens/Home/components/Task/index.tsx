import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'

import Checkbox from 'expo-checkbox'
import { updateTask } from '../../../../services/api'
import { TaskItem } from '../../index'

type Props = {
    item: TaskItem
    onRemove: () => void
    onCheckPressed: (value: boolean) => void
    onEdit: () => void
}

export function Task({ item, onRemove, onCheckPressed, onEdit }: Props) {
    const [isChecked, setChecked] = useState(item.completed)
    console.log(item.title, isChecked)
    return (
        <>
            <View style={styles.container}>
                <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={(value: any) => {
                        if (value) {
                            setChecked(true)
                            updateTask(
                                item.id,
                                true,
                                item.title,
                                item.description
                            )
                            onCheckPressed(true)
                        } else {
                            setChecked(false)
                            updateTask(
                                item.id,
                                false,
                                item.title,
                                item.description
                            )
                            onCheckPressed(false)
                        }
                    }}
                />
                <View style={styles.containerCol}>
                    {isChecked ? (
                        <Text style={styles.taskDone}>{item.title}</Text>
                    ) : (
                        <Text style={styles.taskAdd}>{item.title}</Text>
                    )}
                    <Text style={styles.description}>{item.description}</Text>
                </View>
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
    )
}
