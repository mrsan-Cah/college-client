import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentLogin = () => {
  const navigate = useNavigate();

  const [rollNo, setRollNo] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/student/login",
        { rollNo, dob }
      );

      localStorage.setItem("student", JSON.stringify(res.data));
      navigate("/student/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Roll No or Date of Birth");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .login-wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #020617, #0369a1, #0ea5e9);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.35);
          box-shadow: 0 30px 60px rgba(0,0,0,.35);
          padding: 34px;
          width: 380px;
          border-radius: 18px;
          animation: fadeIn .6s ease;
        }

        .title {
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          text-align: center;
          margin-bottom: 6px;
        }

        .subtitle {
          text-align: center;
          font-size: 13px;
          color: #bae6fd;
          margin-bottom: 22px;
        }

        .input-field {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,.35);
          background: rgba(255,255,255,.15);
          color: #ffffff;
          font-size: 14px;
          margin-bottom: 12px;
        }

        .input-field::placeholder {
          color: #d1d5db;
        }

        .input-field:focus {
          outline: none;
          border-color: #38bdf8;
          box-shadow: 0 0 0 2px rgba(56,189,248,.35);
        }

        .login-btn {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: #0ea5e9;
          color: white;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: .25s ease;
          margin-top: 4px;
        }

        .login-btn:hover {
          background: #0284c7;
          transform: translateY(-2px);
        }

        .login-btn:disabled {
          opacity: .7;
          cursor: not-allowed;
        }

        .error-box {
          background: rgba(239,68,68,.25);
          border: 1px solid rgba(239,68,68,.45);
          color: #fecaca;
          font-size: 13px;
          padding: 8px;
          border-radius: 8px;
          margin-bottom: 12px;
          text-align: center;
        }

        .footer {
          margin-top: 18px;
          text-align: center;
          font-size: 12px;
          color: #e2e8f0;
        }

        .back-btn {
          position: absolute;
          top: 18px;
          left: 18px;
          padding: 8px 12px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,.35);
          background: rgba(255,255,255,.12);
          color: white;
          cursor: pointer;
          transition: .25s ease;
        }

        .back-btn:hover {
          background: rgba(255,255,255,.22);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="login-wrapper">

        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>

        <div className="glass-card">

          <h1 className="title">Student Login</h1>
          <p className="subtitle">College Management System</p>

          {error && <div className="error-box">{error}</div>}

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Roll Number"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="input-field"
              required
            />

            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="input-field"
              required
            />

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="footer">© 2026 College Management System</p>
        </div>
      </div>
    </>
  );
};

export default StudentLogin;
