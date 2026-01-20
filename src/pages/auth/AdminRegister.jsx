import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/register",
        form
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", "admin");
      }

      alert("Admin Registered Successfully ✅");
      navigate("/admin/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">

      <form
        onSubmit={handleRegister}
        className="w-[400px] bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-8 animate-[fadeIn_0.4s_ease]"
      >
        <h2 className="text-3xl font-extrabold text-white text-center mb-2">
          Admin Registration
        </h2>

        <p className="text-sm text-gray-200 text-center mb-6">
          Create an account to manage the admin dashboard
        </p>

        {/* Name */}
        <div className="mb-4">
          <label className="text-white text-sm ml-1">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter admin name"
            className="w-full mt-1 bg-white/90 p-3 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-white text-sm ml-1">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="admin@mail.com"
            className="w-full mt-1 bg-white/90 p-3 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-white text-sm ml-1">Password</label>

          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              className="w-full bg-white/90 p-3 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
              value={form.password}
              onChange={handleChange}
              required
            />

            <span
              className="absolute right-3 top-3 text-gray-600 cursor-pointer select-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg text-white font-semibold bg-indigo-600 hover:bg-indigo-700 active:scale-[.98] transition shadow-lg"
        >
          {loading ? "Registering..." : "Create Admin Account"}
        </button>

        {/* Login Link */}
        <p
          className="text-sm text-center text-white mt-5 underline cursor-pointer hover:text-gray-200"
          onClick={() => navigate("/admin/login")}
        >
          Already have an account? Login here
        </p>
      </form>
    </div>
  );
};

export default AdminRegister;
