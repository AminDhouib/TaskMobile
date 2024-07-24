import { Routes } from '@routes/index'
import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import * as React from 'react'

export default function App() {
    return (
        <>
            <Routes />
            <StatusBar style="light" />
        </>
    )
}
registerRootComponent(App)
