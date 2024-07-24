interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const API_URL = 'https://taskmapi.azurewebsites.net/api';

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/tasks`);
  return response.json();
};

export const addTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const getTaskById = async (id: number): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks/${id}`);
  return response.json();
};

export const updateTaskStatus = async (id: number, completed: boolean): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed }),
  });
  return response.json();
};


