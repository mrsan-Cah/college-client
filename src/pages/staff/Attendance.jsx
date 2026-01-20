// pages/staff/Attendance.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const Attendance = () => {
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [attendanceDate, setAttendanceDate] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState({}); // { studentId: "Present" | "Absent" }

  // Fetch subjects
  useEffect(() => {
    axios.get("http://localhost:5000/api/subject").then(res => setSubjects(res.data));
    axios.get("http://localhost:5000/api/student").then(res => setStudents(res.data));
  }, []);

  const handleStatusChange = (studentId, status) => {
    setAttendanceStatus({ ...attendanceStatus, [studentId]: status });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSubject || !attendanceDate) return alert("Select subject & date");

    try {
      for (let studentId of Object.keys(attendanceStatus)) {
        await axios.post("http://localhost:5000/api/attendance", {
          studentId,
          subjectId: selectedSubject,
          date: attendanceDate,
          status: attendanceStatus[studentId] || "Absent",
        });
      }
      alert("Attendance recorded successfully");
    } catch (err) {
      console.error(err);
      alert("Error recording attendance");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="border p-2 mb-2 w-full rounded"
          required
        >
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s._id} value={s._id}>{s.subjectName}</option>
          ))}
        </select>

        <input
          type="date"
          value={attendanceDate}
          onChange={(e) => setAttendanceDate(e.target.value)}
          className="border p-2 mb-2 w-full rounded"
          required
        />

        <div className="max-h-64 overflow-y-auto mb-2">
          {students.map((s) => (
            <div key={s._id} className="flex justify-between items-center mb-1">
              <span>{s.name} ({s.rollNo})</span>
              <select
                value={attendanceStatus[s._id] || "Absent"}
                onChange={(e) => handleStatusChange(s._id, e.target.value)}
                className="border p-1 rounded"
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>
          ))}
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Submit Attendance
        </button>
      </form>
    </div>
  );
};

export default Attendance;
