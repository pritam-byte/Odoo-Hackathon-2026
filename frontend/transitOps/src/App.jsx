import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import VehiclesPage from "./features/vehicles/VehiclesPage";
import DriversPage from "./features/drivers/DriversPage";
import CreateTripPage from "./features/trips/CreateTripPage";
import ExpensesPage from "./features/expenses/ExpensesPage";
import MaintenancePage from "./features/maintenance/MaintenancePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/trips" element={<CreateTripPage />} />
          <Route path="/fuel" element={<ExpensesPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;