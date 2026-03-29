import axios from 'axios';

const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:8000";

const client = axios.create({
  baseURL: backendBaseURL,
  timeout: 5000,
})

export const getTasks = async () => {
  const token = localStorage.getItem("token") || "";

  try {
    const response = await client.get("/api/v1/tasks", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    return { success: true, data: response.data }
  } catch (error) {
    return { success: false, message: error?.response?.data?.message ? error.response.data.message : "Internal server error" }
  }
}

export const createTask = async ({ title, description }) => {
  const token = localStorage.getItem("token") || "";

  try {
    const response = await client.post("/api/v1/tasks", {
      title, description
    }, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    return { success: true, data: response.data }
  } catch (error) {
    return { success: false, message: error?.response?.data?.message ? error.response.data.message : "Internal server error" }
  }
}

export const updateTask = async (taskId, { title, description }) => {
  const token = localStorage.getItem("token") || "";

  try {
    const response = await client.put(`/api/v1/tasks/${taskId}`, {
      title, description
    }, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    return { success: true, data: response.data }
  } catch (error) {
    return { success: false, message: error?.response?.data?.message ? error.response.data.message : "Internal server error" }
  }
}

export const deleteTask = async (taskId) => {
  const token = localStorage.getItem("token") || "";

  try {
    const response = await client.delete(`/api/v1/tasks/${taskId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    return { success: true, data: response.data }
  } catch (error) {
    return { success: false, message: error?.response?.data?.message ? error.response.data.message : "Internal server error" }
  }
}