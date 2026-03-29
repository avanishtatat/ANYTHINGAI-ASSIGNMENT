import axios from 'axios';

const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:8000";

const client = axios.create({
  baseURL: backendBaseURL,
  timeout: 5000,
})

export const getUserRoles = async () => {
  const response = await client.get("/api/v1/roles");

  const { roles } = response.data;

  return roles;
}