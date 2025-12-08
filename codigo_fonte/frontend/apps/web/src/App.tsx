import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/authContext";
import { NotificationProvider } from "./components/notification/context";
import { ProtectedRoute } from "./components/protectedRoute";
import { GuestRoute } from "./components/guestRoute";

import LoginForm from "./pages/landingPage/pages/auth";
import ResetPassword from "./pages/landingPage/pages/forgotPass";
import PasswordSetupScreen from "./pages/landingPage/pages/resetPass";
import ConfirmEmailScreen from "./pages/landingPage/pages/confirmEmail";

import { Employee } from "./pages/employee/pages/home";
import { AddPatient } from "./pages/employee/pages/addPatient";

import { Dashboard } from "./pages/manager/pages/dashboard";
import { AdminsList } from "./pages/manager/pages/admins";
import { EmployeesList } from "./pages/manager/pages/employees";
import { Report } from "./pages/manager/pages/report";

import { ProfileScreen } from "./pages/general/pages/profile";
import type { JSX } from "react";
import EmployeeRegistrationScreen from "./pages/landingPage/pages/createEmployee";
import LogsList from "./pages/manager/pages/LogPage";
import { InRoom } from "./pages/employee/pages/inRoom";

type PublicRoute = {
  path: string;
  element: JSX.Element;
};

type ProtectedRoute = {
  path: string;
  element: JSX.Element;
  requiredRole?: number;
};

const ROLES = {
  ADMIN: 0,
  EMPLOYEE: 2,
} as const;

const routes: {
  public: PublicRoute[];
  protected: ProtectedRoute[];
} = {
  public: [
    { path: "/login", element: <LoginForm /> },
    { path: "/senha/esqueci", element: <ResetPassword /> },
    { path: "/email/confirmar", element: <ConfirmEmailScreen /> },
    { path: "/senha/redefinir", element: <PasswordSetupScreen /> },
    { path: "/registrar", element: <EmployeeRegistrationScreen /> },
  ],
  protected: [
    { path: "/perfil", element: <ProfileScreen /> },
    {
      path: "/funcionario/filas/:id",
      element: <AddPatient />,
    },
    {
      path: "/funcionario/salas",
      element: <InRoom />,
      requiredRole: ROLES.EMPLOYEE,
    },

    {
      path: "/admin/funcionarios",
      element: <EmployeesList />,
      requiredRole: ROLES.ADMIN,
    },
    {
      path: "/admin/relatorio",
      element: <Report />,
      requiredRole: ROLES.ADMIN,
    },
    {
      path: "/admin/admins",
      element: <AdminsList />,
      requiredRole: ROLES.ADMIN,
    },
    { path: "/admin/logs", element: <LogsList />, requiredRole: ROLES.ADMIN },
    { path: "/admin", element: <Dashboard />, requiredRole: ROLES.ADMIN },
    {
      path: "/funcionario",
      element: <Employee />,
      requiredRole: ROLES.EMPLOYEE,
    },
  ],
};

function AppRoutes() {
  const { user, isAuthenticated } = useAuth();

  const getDefaultRoute = () => {
    if (!isAuthenticated || !user) {
      return "/login";
    }

    return user.role === ROLES.ADMIN ? "/admin" : "/funcionario";
  };

  return (
    <Routes>
      {routes.public.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<GuestRoute>{route.element}</GuestRoute>}
        />
      ))}

      {routes.protected.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute requiredRole={route.requiredRole}>
              {route.element}
            </ProtectedRoute>
          }
        />
      ))}

      <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <AppRoutes />
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
