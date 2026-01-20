// pages/staff/StaffDashboard.jsx
import { Outlet, Link, useNavigate } from "react-router-dom";

const StaffDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // remove any staff info from localStorage if you store it
    localStorage.removeItem("staff"); 
    navigate("/staff/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Staff Dashboard</h1>

        <nav className="flex flex-col gap-2">
          <Link
            to="addstudent"
            className="text-blue-600 hover:text-blue-800"
          >
            Add Student
          </Link>
          <Link
            to="attendance"
            className="text-blue-600 hover:text-blue-800"
          >
            Attendance
          </Link>
          <Link
            to="marks"
            className="text-blue-600 hover:text-blue-800"
          >
            Marks
          </Link>
          <Link
            to="uploadnotes"
            className="text-blue-600 hover:text-blue-800"
          >
            Upload Notes
          </Link>
          <Link
            to="generatepdf"
            className="text-blue-600 hover:text-blue-800"
          >
            Generate PDF
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default StaffDashboard;
