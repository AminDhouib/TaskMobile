import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Home } from '../screens/Home'
import { EditTaskScreen } from '../screens/Home/EditTaskScreen'
const Stack = createStackNavigator<RootStackParamList>()

export type RootStackParamList = {
    Home: undefined
    EditTask: undefined
}

export function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="Home"
                    component={Home}
                />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="EditTask"
                    component={EditTaskScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
