// src/components/layout/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64">
        <Sidebar />
      </aside>
      <main className="flex-1 bg-gray-50 p-8">
        <Outlet /> {/* Your VehiclesPage or DriversPage will render here */}
      </main>
    </div>
  );
};
export default DashboardLayout;