import { TaskItem } from '../screens/Home'

const API_URL = 'https://taskmapi.azurewebsites.net/api'

export const getTasks = async (): Promise<TaskItem[]> => {
    const response = await fetch(`${API_URL}/tasks`)
    return response.json()
}

export const addTask = async (
    task: Omit<TaskItem, 'id'>
): Promise<TaskItem> => {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
    return response.json()
}

export const getTaskById = async (id: string): Promise<TaskItem> => {
    const response = await fetch(`${API_URL}/Tasks/${id}`)
    return response.json()
}

export const updateTask = async (
    id: string,
    completed: boolean,
    title: string,
    description: string
): Promise<boolean> => {
    console.log('updateTask', id, completed, title, description)
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, completed }),
    })
    return response.status === 204
}
export const updateTaskStatus = async (
    id: string,
    completed: boolean
): Promise<boolean> => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
    })
    return response.status === 204
}

export const deleteTask = async (id: string): Promise<void> => {
    await fetch(`${API_URL}/Tasks/${id}`, {
        method: 'DELETE',
    })
}
