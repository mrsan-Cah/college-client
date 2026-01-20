import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "admin");

      navigate("/admin/dashboard");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-800">
      
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur border border-white/30 text-white text-sm hover:bg-white/20 transition"
        >
          ← Back to Home
        </button>
      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-8 w-[360px]">

        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Admin Login
        </h2>

        <p className="text-sm text-blue-200 text-center mb-6">
          Secure access to admin portal
        </p>

        {errorMsg && (
          <div className="mb-4 p-2 text-sm text-red-200 bg-red-900/40 border border-red-400/30 rounded">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email address"
            className="w-full p-3 mb-4 rounded-lg bg-white/20 border border-white/40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 rounded-lg bg-white/20 border border-white/40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold tracking-wide transition transform hover:-translate-y-[2px] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p
          className="text-sm text-center text-blue-200 mt-5 cursor-pointer hover:underline"
          onClick={() => navigate("/admin/register")}
        >
          New Admin? Register here
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
