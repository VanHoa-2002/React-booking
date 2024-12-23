import React, { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ children, allowedRoles }) => {
  const { token, role } = useContext(authContext);
  const isAllowed = allowedRoles.includes(role);
  const accessRoute =
    token && isAllowed ? children : <Navigate to="/login" replace={true} />;
  return accessRoute;
};

export default ProtectedRouter;
