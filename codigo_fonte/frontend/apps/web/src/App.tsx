import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Employee } from "./pages/employee/pages/home";
import { AddPatient } from "./pages/employee/pages/addPatient";
import { Dashboard } from "./pages/manager/pages/dashboard";
import { AdminsList } from "./pages/manager/pages/admins";
import { EmployeesList } from "./pages/manager/pages/employees";
import { Report } from "./pages/manager/pages/report";
import { NotificationProvider } from "./components/notification/context";
import LoginForm from "./pages/landingPage/pages/auth";
import { GuestRoute } from "./components/guestRoute";
import { AuthProvider, useAuth } from "./context/authContext";
import { ProtectedRoute } from "./components/protectedRoute";
import LogsList from "./pages/manager/pages/logs";
import { ProfileScreen } from "./pages/general/pages/profile";

function AppRoutes() {
  const { user, isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginForm />
          </GuestRoute>
        }
      />

      <Route
        path="/funcionario"
        element={
          <ProtectedRoute>
            <Employee />
          </ProtectedRoute>
        }
      />

      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <ProfileScreen />
          </ProtectedRoute>
        }
      />

      <Route
        path="/funcionario/filas/:id"
        element={
          <ProtectedRoute>
            <AddPatient />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole={0}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/funcionarios"
        element={
          <ProtectedRoute requiredRole={0}>
            <EmployeesList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/relatorio"
        element={
          <ProtectedRoute requiredRole={0}>
            <Report />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/admins"
        element={
          <ProtectedRoute requiredRole={0}>
            <AdminsList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/logs"
        element={
          <ProtectedRoute requiredRole={0}>
            <LogsList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/"
        element={
          isAuthenticated && user ? (
            user.role === 0 ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/funcionario" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="App">
            <AppRoutes />
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
