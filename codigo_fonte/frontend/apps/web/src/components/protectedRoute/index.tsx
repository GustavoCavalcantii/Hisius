import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import LocalStorageManager from "@hisius/services/src/helpers/localStorageManager";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: number;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole !== undefined && user.role !== requiredRole) {
    logout();
    LocalStorageManager.clearAll();
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
