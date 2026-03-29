import axios from 'axios';
import { handleApiError } from '../utils/helper';

const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:8000";

const client = axios.create({
  baseURL: backendBaseURL,
  timeout: 5000,
})

export const getTasks = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false, message: 'Authentication required' };
  }

  try {
    const response = await client.get("/api/v1/tasks", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    return { success: true, data: response.data }
  } catch (error) {
    return handleApiError(error);
  }
}

export const createTask = async ({ title, description }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false, message: 'Authentication required' };
  }

  try {
    const response = await client.post("/api/v1/tasks", {
      title, description
    }, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    return { success: true, data: response.data }
  } catch (error) {
    return handleApiError(error);
  }
}

export const updateTask = async (taskId, { title, description }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false, message: 'Authentication required' };
  }

  try {
    const response = await client.put(`/api/v1/tasks/${taskId}`, {
      title, description
    }, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    return { success: true, data: response.data }
  } catch (error) {
    return handleApiError(error);
  }
}

export const deleteTask = async (taskId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false, message: 'Authentication required' };
  }

  try {
    const response = await client.delete(`/api/v1/tasks/${taskId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    return { success: true, data: response.data }
  } catch (error) {
    return handleApiError(error);
  }
}