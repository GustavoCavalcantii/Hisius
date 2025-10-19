import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Employee } from "./pages/employee/pages/home";
import { AddPatient } from "./pages/employee/pages/addPatient";
import { Dashboard } from "./pages/manager/pages/dashboard";
import { Logs } from "./pages/manager/pages/logs";
import { EmployeesList } from "./pages/manager/pages/employees";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/funcionario">
            <Route index element={<Employee />} />
            <Route path="filas/:id" element={<AddPatient />} />
          </Route>

          <Route path="/admin">
            <Route index element={<Dashboard />} />
            <Route path="funcionarios" element={<EmployeesList />} />
          </Route>
          <Route path="/" element={<Employee />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
