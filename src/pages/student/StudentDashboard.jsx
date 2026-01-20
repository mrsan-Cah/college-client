import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem("student"));
    if (!storedStudent) {
      navigate("/student/login");
    } else {
      setStudent(storedStudent);
    }
  }, [navigate]);

  if (!student) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500 text-lg animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  // Pass student data to nested routes
  return <Outlet context={{ student }} />;
};

export default StudentDashboard;
