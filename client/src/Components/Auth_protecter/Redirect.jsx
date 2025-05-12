import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Redirect = ({ children }) => {
  const user = useSelector((state) => state.token);

  if (user) {
    return <Navigate to="/creategroup" />;
  }

  return children;
};

export default Redirect;
