import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const token = useSelector((state) => state.token);
  console.log("token in prtotect ", token);

  if (!token) {
    return <Navigate to="/login"/>;
  }

  return children;
};

export default ProtectRoute;
