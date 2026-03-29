import axios from "axios";
import { handleApiError } from "../utils/helper";

const backendBaseURL =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:8000";

const client = axios.create({
  baseURL: backendBaseURL,
  timeout: 5000,
});

export const registerUser = async (payload) => {
  try {
    const response = await client.post("/api/v1/auth/register", payload);

    return { success: true, ...response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await client.post("/api/v1/auth/login", payload);

    return { success: true, ...response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getUserInfo = async () => {
  const token = localStorage.getItem("token") || "";

  if (!token) {
    return { success: false, message: "Please login again" };
  }

  try {
    const response = await client.get("/api/v1/auth/getUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
