import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Employee } from "./pages/employee/pages/home";
import { AddPatient } from "./pages/employee/pages/addPatient";
import { Dashboard } from "./pages/manager/pages/dashboard";
import { AdminsList } from "./pages/manager/pages/admins";
import { EmployeesList } from "./pages/manager/pages/employees";
import { Report } from "./pages/manager/pages/report";
import { NotificationProvider } from "./components/notification/context";

function App() {
  return (
    <NotificationProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/funcionario">
              <Route index element={<Employee />} />
              <Route path="filas/" element={<AddPatient />} />
            </Route>

            <Route path="/admin">
              <Route index element={<Dashboard />} />
              <Route path="funcionarios" element={<EmployeesList />} />
              <Route path="relatorio" element={<Report />} />
              <Route path="admins" element={<AdminsList />} />
            </Route>
            <Route path="/" element={<Employee />} />
          </Routes>
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;
