import React, { useState } from "react";
import { LockKeyhole, Eye, EyeOff, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // Temporary mock login
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    setTimeout(() => {
      if (username === "agent" && password === "1234") {
        localStorage.setItem("userRole", "agent");
        onLogin();
        navigate("/stock");
      } else if (username === "admin" && password === "1234") {
        localStorage.setItem("userRole", "admin");
        onLogin();
        navigate("/home");
      } else {
        setErrorMsg("Invalid credentials. Try admin/agent with password 1234.");
      }
      setLoading(false);
    }, 1000);
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

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-4 text-sm text-red-200 bg-red-800/30 px-4 py-2 rounded-md border border-red-400/30">
              {errorMsg}
            </div>
          )}

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
                placeholder="Enter username (admin or agent)"
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
                  placeholder="Enter password (1234)"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-white focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
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

      {/* Footer */}
      <footer className="text-center text-white/70 py-4 text-sm">
        © {new Date().getFullYear()} Green World Mwingi Branch — Secure Access Portal
      </footer>
    </div>
  );
};

export default Login;
