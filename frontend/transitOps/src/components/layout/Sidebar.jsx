// src/components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";
import SidebarUserInfo from "./SidebarUserInfo";

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Trips", path: "/trips" },
    { name: "Vehicles", path: "/vehicles" },
    { name: "Drivers", path: "/drivers" },
    { name: "Maintenance", path: "/maintenance" },
    { name: "Fuel", path: "/fuel" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <nav className="h-full bg-slate-900 text-white flex flex-col">
      <div className="p-4 flex-1">
        <h1 className="text-xl font-bold mb-8 px-2">TransitOps</h1>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg ${
                    isActive ? "bg-blue-600" : "hover:bg-slate-800"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <SidebarUserInfo />
    </nav>
  );
};
export default Sidebar;