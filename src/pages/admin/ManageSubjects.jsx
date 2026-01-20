// pages/admin/ManageSubjects.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const ManageSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({
    subjectName: "",
    code: "",
    department: "",
    semester: "",
  });

  const fetchSubjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/subject");
      setSubjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/subject", form);
      alert("Subject added!");
      setForm({ subjectName: "", code: "", department: "", semester: "" });
      fetchSubjects();
    } catch (err) {
      console.error(err);
      alert("Error adding subject");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Subjects</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow max-w-md mb-6"
      >
        <input
          type="text"
          name="subjectName"
          placeholder="Subject Name"
          value={form.subjectName}
          onChange={handleChange}
          className="border p-2 mb-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="code"
          placeholder="Code"
          value={form.code}
          onChange={handleChange}
          className="border p-2 mb-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          className="border p-2 mb-2 w-full rounded"
          required
        />
        <input
          type="number"
          name="semester"
          placeholder="Semester"
          value={form.semester}
          onChange={handleChange}
          className="border p-2 mb-2 w-full rounded"
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Add Subject
        </button>
      </form>

      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Code</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Department</th>
            <th className="border px-4 py-2">Semester</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((s) => (
            <tr key={s._id}>
              <td className="border px-4 py-2">{s.code}</td>
              <td className="border px-4 py-2">{s.subjectName}</td>
              <td className="border px-4 py-2">{s.department}</td>
              <td className="border px-4 py-2">{s.semester}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageSubjects;
