import axios from 'axios';

const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:8000";

const client = axios.create({
  baseURL: backendBaseURL,
  timeout: 5000,
})

export const registerUser = async (payload) => {
  try {
    const response = await client.post("/api/v1/auth/register", payload);

    return { success: true, ...response.data };
  } catch (error) {
    return { success: false, message: error?.response?.data?.message ? error.response.data.message : "Internal server error" }
  }
}

export const loginUser = async (payload) => {
  try {
    const response = await client.post("/api/v1/auth/login", payload);

    return { success: true, ...response.data };
  } catch (error) {
    return { success: false, message: error?.response?.data?.message ? error.response.data.message : "Internal server error" }
  }
}