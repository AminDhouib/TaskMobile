import {TaskItem} from '../screens/Home';

const API_URL = 'https://taskmapi.azurewebsites.net/api';

export const getTasks = async (): Promise<TaskItem[]> => {
  const response = await fetch(`${API_URL}/tasks`);
  return response.json();
};

export const addTask = async (
  task: Omit<TaskItem, 'id'>,
): Promise<TaskItem> => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const getTaskById = async (id: number): Promise<TaskItem> => {
  const response = await fetch(`${API_URL}/tasks/${id}`);
  return response.json();
};

export const updateTaskStatus = async (
  id: number,
  completed: boolean,
): Promise<TaskItem> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({completed}),
  });
  return response.json();
};
