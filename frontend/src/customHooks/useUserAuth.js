import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { getUserInfo } from "../api/authApi";

export const useUserAuth = () => {
  const { user, updateUser, logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;
    let isMounted = true;
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();

        if (isMounted && response.success) {
          updateUser(response.data);
        } else {
          logout();
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error)
        if (isMounted) {
          logout();
          navigate("/login");
        }
      }
    }

    fetchUserInfo();
    return () => {
      isMounted = false;
    }
  }, [updateUser, logout, navigate]);
}