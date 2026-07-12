// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import VehiclesPage from "./features/vehicles/VehiclesPage";
// ADD THIS IMPORT
import DriversPage from "./features/drivers/DriversPage"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          {/* ADD THIS ROUTE */}
          <Route path="/drivers" element={<DriversPage />} /> 
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;