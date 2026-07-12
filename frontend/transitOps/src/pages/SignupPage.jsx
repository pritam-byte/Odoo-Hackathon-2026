import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import heroImg from "../assets/hero.png";

const ROLES = [
  { value: "ADMIN", label: "Admin — System Oversight" },
  { value: "FLEET_MANAGER", label: "Fleet Manager — Asset & Ops Health" },
  { value: "DISPATCHER", label: "Dispatcher — Routing & Logistics" },
  { value: "SAFETY_OFFICER", label: "Safety Officer — Compliance & Risk" },
  { value: "FINANCIAL_ANALYST", label: "Financial Analyst — Cost & Profitability" },
  { value: "DRIVER", label: "Driver — On-the-ground Execution" },
];

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword || !role) {
      setError("Please fill in all fields.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to register");

      setSuccess(true);
      setTimeout(() => {
        navigate("/", { state: { signupEmail: email } });
      }, 1200);
    } catch (err) {
      setError(err.message || "Something went wrong while creating your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left branding panel - hidden below md */}
      <div className="hidden md:flex flex-1 flex-col justify-between bg-gradient-to-br from-[#0a1230] via-[#0f1a3d] to-[#142354] text-white p-12 relative overflow-hidden">
        <div className="flex items-center gap-3 z-10">
          <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl">
            T
          </div>
          <div>
            <h1 className="text-2xl font-bold m-0">TransitOps</h1>
            <p className="text-blue-300 text-sm mt-0.5">
              Smart Transport Operations
            </p>
          </div>
        </div>

        <div className="z-10 flex justify-center">
          <img src={heroImg} alt="Fleet of vans" className="max-w-full h-auto" />
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 px-6 py-8 min-h-screen md:min-h-0">
        <div className="bg-white rounded-2xl shadow-lg shadow-black/5 p-8 sm:p-10 w-full max-w-md">
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
            📝
          </div>
          <h2 className="text-center text-2xl font-bold text-slate-900 mb-1">
            Create your account
          </h2>
          <p className="text-center text-sm text-slate-500 mb-6">
            Join your team's fleet operations workspace
          </p>

          {success ? (
            <div className="text-center py-6">
              <p className="text-green-600 font-semibold mb-1">
                Account created successfully!
              </p>
              <p className="text-sm text-slate-500">Redirecting you to sign in…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                Full name
              </label>
              <div className="relative mb-5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">👤</span>
                <input
                  id="name"
                  type="text"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                />
              </div>

              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <div className="relative mb-5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">✉</span>
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                />
              </div>

              <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1.5">
                Role
              </label>
              <div className="relative mb-5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🛠</span>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white appearance-none transition"
                >
                  <option value="">Select your role</option>
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative mb-5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔒</span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className="w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>

              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1.5">
                Confirm password
              </label>
              <div className="relative mb-2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔒</span>
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                />
              </div>

              {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>
          )}

          {!success && (
            <p className="text-center text-sm text-slate-500 mt-6">
              Already have an account?{" "}
              <Link to="/" className="text-blue-600 font-medium hover:text-blue-700">
                Sign in
              </Link>
            </p>
          )}
        </div>

        <p className="flex items-center gap-2 text-slate-500 text-sm mt-6">
          🛡 Secure access for fleet teams
        </p>
      </div>
    </div>
  );
}