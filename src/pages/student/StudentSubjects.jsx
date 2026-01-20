// pages/student/StudentSubjects.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const StudentSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const student = JSON.parse(localStorage.getItem("student"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subRes, attRes] = await Promise.all([
          axios.get("http://localhost:5000/api/subject"),
          axios.get(`http://localhost:5000/api/attendance/student/${student._id}`)
        ]);

        setSubjects(Array.isArray(subRes.data) ? subRes.data : []);
        setAttendance(Array.isArray(attRes.data) ? attRes.data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [student]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading subjects & attendance...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-10 tracking-tight bg-gradient-to-r from-blue-500 to-blue-400 text-transparent bg-clip-text">
        📚 My Subjects & Attendance
      </h1>

      {/* Subjects Card */}
      <div className="mb-10 bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition">
        <h2 className="text-2xl font-bold mb-4 text-blue-700 border-b pb-2">Subjects</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-700 uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Code</th>
                <th className="px-5 py-3 text-left">Subject</th>
                <th className="px-5 py-3 text-left">Department</th>
                <th className="px-5 py-3 text-left">Semester</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((s, idx) => (
                <tr
                  key={s._id}
                  className={`transition hover:bg-blue-50 ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-5 py-3">{s.code}</td>
                  <td className="px-5 py-3 font-medium">{s.subjectName}</td>
                  <td className="px-5 py-3">
                    <span className="inline-block px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">
                      {s.department}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-block px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-semibold">
                      Semester {s.semester}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Card */}
      <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition">
        <h2 className="text-2xl font-bold mb-4 text-blue-700 border-b pb-2">Attendance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-700 uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Subject</th>
                <th className="px-5 py-3 text-left">Date</th>
                <th className="px-5 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a, idx) => (
                <tr
                  key={a._id}
                  className={`transition hover:bg-blue-50 ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-5 py-3 font-medium">{a.subjectId?.subjectName}</td>
                  <td className="px-5 py-3">{new Date(a.date).toLocaleDateString()}</td>
                  <td
                    className={`px-5 py-3 font-semibold ${
                      a.status === "Present" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {a.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentSubjects;
