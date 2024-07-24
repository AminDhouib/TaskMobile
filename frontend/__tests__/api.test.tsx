// __tests__/api.test.ts
import fetchMock from 'fetch-mock'
import { TaskItem } from '../screens/Home'
import {
    addTask,
    getTaskById,
    getTasks,
    updateTaskStatus,
} from '../src/services/api'

describe('API Service', () => {
    const API_URL = 'https://taskmapi.azurewebsites.net/api'

    afterEach(() => {
        fetchMock.restore()
    })

    it('fetches tasks', async () => {
        const mockTasks: TaskItem[] = [
            { id: 1, title: 'Test Task', completed: false },
        ]
        fetchMock.getOnce(`${API_URL}/tasks`, {
            body: mockTasks,
            headers: { 'content-type': 'application/json' },
        })

        const tasks = await getTasks()
        expect(tasks).toEqual(mockTasks)
    })

    it('adds a task', async () => {
        const newTask: Omit<TaskItem, 'id'> = {
            title: 'New Task',
            completed: false,
        }
        const createdTask: TaskItem = { id: 2, ...newTask }
        fetchMock.postOnce(`${API_URL}/tasks`, {
            body: createdTask,
            headers: { 'content-type': 'application/json' },
        })

        const result = await addTask(newTask)
        expect(result).toEqual(createdTask)
    })

    it('fetches a task by id', async () => {
        const mockTask: TaskItem = {
            id: 1,
            title: 'Test Task',
            completed: false,
        }
        fetchMock.getOnce(`${API_URL}/tasks/1`, {
            body: mockTask,
            headers: { 'content-type': 'application/json' },
        })

        const task = await getTaskById(1)
        expect(task).toEqual(mockTask)
    })

    it('updates task status', async () => {
        const updatedTask: TaskItem = {
            id: 1,
            title: 'Test Task',
            completed: true,
        }
        fetchMock.putOnce(`${API_URL}/tasks/1`, {
            body: updatedTask,
            headers: { 'content-type': 'application/json' },
        })

        const result = await updateTaskStatus(1, true)
        expect(result).toEqual(updatedTask)
    })
})
