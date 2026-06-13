import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";
import Alert from "../components/Alert";

const inputClass =
  "w-full border border-neutral-200 rounded-xl py-3.5 pl-12 pr-12 outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] transition bg-white text-[#0a0a0a] placeholder:text-neutral-400";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const registered = location.state?.registered;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", formData);
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your personal library"
      heroTitle="Thoughtfully crafted. Quietly powerful."
      heroText="Organize your books, track your reading progress, and build a collection that feels made just for you."
      heroEmoji="📖"
    >
      <Alert
        type="success"
        message={
          registered
            ? "Account created successfully. Please sign in."
            : ""
        }
      />
      <Alert message={error} />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-[#0a0a0a] mb-2">
            Email
          </label>

          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />

            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0a0a0a] mb-2">
            Password
          </label>

          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={inputClass}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-[#0a0a0a] text-white font-semibold hover:bg-neutral-800 transition disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="text-center text-neutral-600 pt-2">
          Don&apos;t have an account?
          <Link
            to="/signup"
            className="text-[#0a0a0a] font-semibold ml-2 underline underline-offset-4 hover:opacity-70"
          >
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
