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

export const getTaskById = async (id: string): Promise<TaskItem> => {
  const response = await fetch(`${API_URL}/Tasks/${id}`);
  return response.json();
};

export const updateTask = async (
  id: string,
  completed: boolean,
  title: string,
): Promise<TaskItem | null> => {
  try {
    console.log(`${API_URL}/Tasks/${id}`);
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, completed}),
    });
    console.log(response.status);
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  await fetch(`${API_URL}/Tasks/${id}`, {
    method: 'DELETE',
  });
};
