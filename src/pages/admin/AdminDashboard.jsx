import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Admin Panel</h2>

        <SidebarItem label="Dashboard" onClick={() => navigate("/admin/dashboard")} />
        <SidebarItem label="Manage Staff" onClick={() => navigate("/admin/staff")} />
        <SidebarItem label="Manage Students" onClick={() => navigate("/admin/students")} />
        <SidebarItem label="Manage Subjects" onClick={() => navigate("/admin/subjects")} />
        <SidebarItem label="Events" onClick={() => navigate("/admin/events")} />
        <SidebarItem label="Notices" onClick={() => navigate("/admin/notices")} />
        <SidebarItem label="Timetable" onClick={() => navigate("/admin/timetable")} />

        <button style={styles.logout} onClick={logout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        <h1>Welcome Admin 👋</h1>
        <p>Use the sidebar to manage the college system.</p>

        <div style={styles.cards}>
          <Card title="Staff" />
          <Card title="Students" />
          <Card title="Subjects" />
          <Card title="Events" />
          <Card title="Notices" />
          <Card title="Timetable" />
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ label, onClick }) => (
  <div style={styles.sidebarItem} onClick={onClick}>
    {label}
  </div>
);

const Card = ({ title }) => (
  <div style={styles.card}>
    <h3>{title}</h3>
    <p>Manage {title.toLowerCase()} here</p>
  </div>
);

/* 🔹 Internal CSS */
const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif"
  },
  sidebar: {
    width: "240px",
    background: "#1e3a8a",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column"
  },
  logo: {
    textAlign: "center",
    marginBottom: "25px"
  },
  sidebarItem: {
    padding: "10px",
    marginBottom: "10px",
    cursor: "pointer",
    borderRadius: "6px",
    background: "rgba(255,255,255,0.15)"
  },
  logout: {
    marginTop: "auto",
    padding: "10px",
    background: "#dc2626",
    border: "none",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer"
  },
  main: {
    flex: 1,
    padding: "30px",
    background: "#f3f4f6"
  },
  cards: {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px"
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
  }
};

export default AdminDashboard;
