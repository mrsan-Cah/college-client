import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaHome,
  FaBook,
  FaClipboardList,
  FaFileAlt,
  FaNewspaper,
  FaCalendarAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const StudentLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Get student info from localStorage
  const student = JSON.parse(localStorage.getItem("student"));

  const handleLogout = () => {
    localStorage.removeItem("student");
    navigate("/student/login");
  };

  const links = [
    { to: "/student/dashboard", label: "Dashboard", icon: <FaHome /> },
    { to: "/student/dashboard/subjects", label: "Subjects", icon: <FaBook /> },
    { to: "/student/dashboard/marks", label: "Marks", icon: <FaClipboardList /> },
    { to: "/student/dashboard/notes", label: "Notes", icon: <FaFileAlt /> },
    { to: "/student/dashboard/notices", label: "Notices", icon: <FaNewspaper /> },
    { to: "/student/dashboard/events", label: "Events", icon: <FaCalendarAlt /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg transition-all duration-300 flex flex-col ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo & toggle */}
        <div className="flex items-center justify-between p-4 border-b">
          {sidebarOpen && <h1 className="text-2xl font-bold text-blue-700">EduPortal</h1>}
          <button
            className="text-gray-600 hover:text-gray-900 text-2xl transition-transform duration-300"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 mt-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 md:p-4 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all rounded-lg mx-3 my-2 ${
                  isActive ? "bg-blue-100 font-semibold shadow-inner" : ""
                }`
              }
              title={link.label} // Tooltip when collapsed
            >
              <span className="text-lg">{link.icon}</span>
              {sidebarOpen && <span className="text-sm md:text-base">{link.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg w-full transition-all shadow-sm"
          >
            <FaSignOutAlt />
            {sidebarOpen && <span className="text-sm md:text-base">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex justify-between items-center p-4 bg-white shadow-md rounded-b-lg">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search courses, assignments..."
            className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full max-w-md shadow-sm"
          />

          {/* Student info */}
          <div className="ml-4 px-4 py-2 bg-blue-50 rounded-xl text-right shadow-sm">
            <p className="font-semibold text-gray-700">{student?.name || "Student"}</p>
            {student?.rollNo && (
              <p className="text-gray-500 text-sm">Roll No: {student.rollNo}</p>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
