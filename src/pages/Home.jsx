import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("admin");

  const handleLogin = () => {
    navigate(`/${activeTab}/login`);
  };

  return (
    <>
      <style>{`
        .home-wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #0f172a, #1e3a8a);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .home-panel {
          background: #ffffff;
          width: 420px;
          padding: 38px 34px;
          border-radius: 18px;
          box-shadow: 0 28px 60px rgba(0,0,0,.25);
          animation: fadeIn .5s ease;
        }

        .title {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          text-align: center;
          margin-bottom: 6px;
        }

        .subtitle {
          text-align: center;
          color: #64748b;
          font-size: 13px;
          margin-bottom: 26px;
        }

        .tab-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-bottom: 24px;
          background: #f1f5f9;
          padding: 6px;
          border-radius: 12px;
        }

        .tab-btn {
          padding: 10px 0;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          background: transparent;
          transition: all .25s ease;
        }

        .tab-btn.active {
          background: #2563eb;
          color: #ffffff;
          box-shadow: 0 8px 18px rgba(37,99,235,.35);
        }

        .tab-btn:hover {
          transform: translateY(-1px);
        }

        .content-box {
          text-align: center;
          margin-top: 10px;
        }

        .label {
          font-size: 12px;
          color: #64748b;
          letter-spacing: .4px;
          margin-bottom: 10px;
        }

        .login-btn {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: #2563eb;
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: .25s ease;
        }

        .login-btn:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
        }

        .footer {
          margin-top: 22px;
          text-align: center;
          font-size: 11px;
          color: #94a3b8;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="home-wrapper">
        <div className="home-panel">

          <h1 className="title">College Management System</h1>
          <p className="subtitle">User Login Portal</p>

          {/* Switch Tabs */}
          <div className="tab-container">
            <button
              className={`tab-btn ${activeTab === "admin" ? "active" : ""}`}
              onClick={() => setActiveTab("admin")}
            >
              Admin
            </button>

            <button
              className={`tab-btn ${activeTab === "staff" ? "active" : ""}`}
              onClick={() => setActiveTab("staff")}
            >
              Staff
            </button>

            <button
              className={`tab-btn ${activeTab === "student" ? "active" : ""}`}
              onClick={() => setActiveTab("student")}
            >
              Student
            </button>
          </div>

          <div className="content-box">
            <p className="label">
              Login as {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </p>

            <button className="login-btn" onClick={handleLogin}>
              Continue to Login
            </button>
          </div>

          <p className="footer">© 2026 College Management System</p>
        </div>
      </div>
    </>
  );
};

export default Home;
