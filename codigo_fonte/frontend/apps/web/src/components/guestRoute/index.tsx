import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

interface GuestRouteProps {
  children: React.ReactNode;
}

export const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    const redirectPath = user.role === 0 ? "/admin" : "/funcionario";
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
