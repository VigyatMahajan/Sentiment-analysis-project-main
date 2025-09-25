import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false); // Start with Register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // 🔑 Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({}); // clear previous errors

    try {
      if (isLogin) {
        const res = await axios.post(`${API}/api/auth/login`, { email, password });
        localStorage.setItem("token", res.data.token);
        navigate("/"); // ✅ Go home after login
      } else {
        const res = await axios.post(`${API}/api/auth/register`, { email, password });
        setIsLogin(true); // Switch to login mode
        setErrors({ form: res.data.msg || "Registration successful. Please login." });
      }

      setEmail("");
      setPassword("");
    } catch (err) {
      setErrors({ form: err.response?.data?.msg || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen px-6 py-16 bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage:
          "url('https://s14415.pcdn.co/wp-content/uploads/2015/01/sentiment-analysis.jpg')",
      }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        {/* Toggle */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            type="button"
            className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all ${
              isLogin
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setIsLogin(true)}
          >
            <LogIn size={18} /> Login
          </button>
          <button
            type="button"
            className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all ${
              !isLogin
                ? "bg-green-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setIsLogin(false)}
          >
            <UserPlus size={18} /> Register
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>

        {/* Error Message */}
        {errors.form && (
          <p className="text-red-500 text-center mb-4">{errors.form}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <Mail className="text-gray-400 mr-2" size={18} />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <Lock className="text-gray-400 mr-2" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-800"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
              isLogin
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-green-600 hover:bg-green-700"
            } disabled:opacity-50`}
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Registering..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
