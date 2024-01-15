import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useUserData = (userId, token) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const user = await response.json();
          setUserData(user);
        } else {
          console.error("Failed to fetch user data:", response.statusText);
          navigate("/login");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) {
      fetchUserData();
    }
  }, [userId, token, navigate]);

  return { userData, loading };
};

export default useUserData;
