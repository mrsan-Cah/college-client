// pages/admin/ManageStudents.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/student");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Students</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Roll No</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">DOB</th>
            <th className="border px-4 py-2">Year</th>
            <th className="border px-4 py-2">Semester</th>
            <th className="border px-4 py-2">Section</th>
            <th className="border px-4 py-2">Department</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td className="border px-4 py-2">{s.rollNo}</td>
              <td className="border px-4 py-2">{s.name}</td>
              <td className="border px-4 py-2">{new Date(s.dob).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{s.year}</td>
              <td className="border px-4 py-2">{s.semester}</td>
              <td className="border px-4 py-2">{s.section}</td>
              <td className="border px-4 py-2">{s.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStudents;
