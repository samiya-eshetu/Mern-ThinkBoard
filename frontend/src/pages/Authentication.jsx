import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { useAuth } from "../context/AuthContext";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await api.post(endpoint, payload);

      login(res.data.user, res.data.token);
      toast.success(isLogin ? "Welcome back!" : "Account created!");

      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.log("Error in auth:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-mist-900 rounded-2xl p-8 shadow-2xl border border-fuchsia-950">
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-center text-white mb-6">
          {isLogin ? "Log in to manage your notes" : "Sign up to start taking notes"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm text-white mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl bg-[#251b14] border border-fuchsia-950 text-white placeholder-white/30 focus:outline-none focus:border-fuchsia-700"
                placeholder="yourusername"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-white mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl bg-[#251b14] border border-fuchsia-950 text-white placeholder-white/30 focus:outline-none focus:border-fuchsia-700"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-2 rounded-xl bg-[#251b14] border border-fuchsia-950 text-white placeholder-white/30 focus:outline-none focus:border-fuchsia-700"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-xl bg-fuchsia-900 hover:bg-fuchsia-800 transition text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Please wait..." : isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-white mt-6 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white hover:underline font-medium"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Authentication;
