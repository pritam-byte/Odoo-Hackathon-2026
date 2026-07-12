import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      // TODO: replace with real API call once backend team gives the endpoint
      // const res = await authService.login({ email, password });
      // localStorage.setItem("token", res.data.token);
      await new Promise((res) => setTimeout(res, 800)); // temp mock delay
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
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
          <img
            src={heroImg}
            alt="Fleet of vans"
            className="max-w-full h-auto"
          />
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 px-6 py-8 min-h-screen md:min-h-0">
        <div className="bg-white rounded-2xl shadow-lg shadow-black/5 p-8 sm:p-10 w-full max-w-md">
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
            🔒
          </div>
          <h2 className="text-center text-2xl font-bold text-slate-900 mb-6">
            Welcome back
          </h2>

          <form onSubmit={handleSubmit} noValidate>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Email address
            </label>
            <div className="relative mb-5">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                ✉
              </span>
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

            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Password
            </label>
            <div className="relative mb-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                🔒
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
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

            {error && (
              <p className="text-red-600 text-sm mb-4">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <p className="flex items-center gap-2 text-slate-500 text-sm mt-6">
          🛡 Secure access for fleet teams
        </p>
      </div>
    </div>
  );
}