import axios from 'axios';

const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:8000";

const client = axios.create({
  baseURL: backendBaseURL,
  timeout: 5000,
})

export const getUserRoles = async () => {
  try {
    const response = await client.get("/api/v1/roles");

    return { success: true, data: response.data }
  } catch (error) {
    return { success: false, message: error?.response?.data?.message ? error.response.data.message : "Internal server error" }
  }
}