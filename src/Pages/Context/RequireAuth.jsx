import { useLocation, Navigate } from "react-router-dom";
import { useMemo } from "react";

const RequireAuth = ({ children }) => {
  const accessToken = useMemo(() => localStorage.getItem("accessToken"), []);

  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;

export const CheckLogin = ({ children }) => {
  const accessToken = useMemo(() => localStorage.getItem("accessToken"), []);

  const location = useLocation();

  if (accessToken) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};
