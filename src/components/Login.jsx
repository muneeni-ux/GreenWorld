import React, { useState } from "react";
import { LockKeyhole, Eye, EyeOff, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${SERVER_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ Save token + user info to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successful!");

      onLogin();

      // Redirect based on role
      if (data.user.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, rgba(0,60,0,0.8), rgba(0,100,50,0.85)), url('https://img.freepik.com/free-photo/green-herbal-medicine-background_1150-37997.jpg')",
      }}
    >
      <main className="flex-grow flex items-center justify-center px-4 py-10 animate-fade-in">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Logo / Title */}
          <div className="flex flex-col items-center mb-8">
            <img
              src="https://greenworld.co.za/home/wp-content/uploads/2017/11/green_world_logo.png"
              alt="Green World Logo"
              className="h-20 w-auto mb-4 drop-shadow-lg rounded-3xl"
            />
            <Leaf className="h-12 w-12 text-green-300 mb-3" />
            <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">
              Green World Login
            </h2>
            <p className="text-sm text-green-100 mt-1 italic">
              Access your Stock & Sales Management Portal
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-lg font-semibold mb-2 text-white">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/40 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your username"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-lg font-semibold mb-2 text-white">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/40 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-white focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full transition duration-300 font-semibold py-2 rounded-lg shadow-md ${
                loading
                  ? "bg-green-500/70 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 active:scale-95"
              } text-white`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </main>

      <footer className="text-center text-white/70 py-4 text-sm">
        © {new Date().getFullYear()} Green World Mwingi Branch — Secure Access Portal
      </footer>
    </div>
  );
};

export default Login;
