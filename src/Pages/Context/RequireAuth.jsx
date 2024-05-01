import { useLocation, Navigate } from "react-router-dom";
import {useAuthContext} from "./AuthContext.jsx";

const RequireAuth = ({ children }) => {
  const {currentUser}  = useAuthContext()
  const location = useLocation();

  if (!currentUser?.accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;

