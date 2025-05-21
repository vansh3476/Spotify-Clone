import React from "react";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
  const { user, loaded } = useAuthContext();
  const navigate = useNavigate();

  if (!loaded) {
    return;
  }

  if (!user) {
    navigate("/login");
    return;
  }
  return children;
};
