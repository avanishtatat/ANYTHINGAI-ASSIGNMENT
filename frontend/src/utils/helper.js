export const handleApiError = (error) => {
  if (error.response?.data?.message) {
    return { success: false, message: error.response.data.message };
  }
  if (error.code === 'ECONNABORTED') {
    return { success: false, message: "Request timed out" };
  }
  if (!error.response) {
    return { success: false, message: "Network error. Please check your connection." };
  }
  return { success: false, message: "Internal server error" };
};