import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const ROLE_LABELS = {
  ADMIN: "Admin",
  FLEET_MANAGER: "Fleet Manager",
  DISPATCHER: "Dispatcher",
  DRIVER: "Driver",
  SAFETY_OFFICER: "Safety Officer",
  FINANCIAL_ANALYST: "Financial Analyst",
};

function getInitials(name) {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

export default function SidebarUserInfo() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex items-center gap-3 p-3">
        <div className="w-10 h-10 rounded-full bg-slate-700 animate-pulse" />
        <div className="flex-1">
          <div className="h-3 w-24 bg-slate-700 rounded animate-pulse mb-1.5" />
          <div className="h-2.5 w-16 bg-slate-700 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 p-3 border-t border-slate-700">
      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm shrink-0">
        {getInitials(user.name)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{user.name}</p>
        <p className="text-xs text-slate-400 truncate">{ROLE_LABELS[user.role] || user.role}</p>
      </div>
      <button
        onClick={handleLogout}
        aria-label="Log out"
        className="text-slate-400 hover:text-white p-1.5 rounded shrink-0"
      >
        <LogOut size={16} />
      </button>
    </div>
  );
}