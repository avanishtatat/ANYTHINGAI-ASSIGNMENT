import axios from "axios";
import { handleApiError } from "../utils/helper";

const backendBaseURL =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:8000";

const client = axios.create({
  baseURL: backendBaseURL,
  timeout: 5000,
});

export const getUserRoles = async () => {
  try {
    const response = await client.get("/api/v1/roles");

    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
