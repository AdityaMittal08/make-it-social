import { useEffect, useState } from "react";
import {Navigate } from "react-router-dom";
import api from "../../api/axiosInstance";

const ProtectedRoutes = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try{
        await api.get('/auth/me');
        setIsAuthenticated(true);
      }catch(error){
        try {
          await api.get('/auth/refresh');
          await api.get('/auth/me');
          setIsAuthenticated(true);
        } catch (refreshError) {
          setIsAuthenticated(false);
        }
      }
    };
    verifyUser();
  }, []);

  if(isAuthenticated === null){
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;