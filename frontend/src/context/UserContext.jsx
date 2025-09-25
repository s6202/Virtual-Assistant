import React, { createContext, useEffect, useState } from "react";
import api from "../config/axios.js";

export const userDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = "http://localhost:5000";
  const [userData, setUserData] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [SelectedImage, setSelectImage] = useState(null);

  const handleCurrentUser = async () => {
    try {
      const result = await api.get(`/api/user/current`);
      setUserData(result.data);
      console.log("Current user:", result.data);
    } catch (error) {
      if (error.response?.status === 401) {
        // No token or invalid token - user not logged in
        console.log("User not authenticated");
        setUserData(null);
      } else {
        console.error("Error getting current user:", error.message);
        setUserData(null);
      }
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    backendImage,
    setBackendImage,
    frontendImage,
    setFrontendImage,
    SelectedImage,
    setSelectImage,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
