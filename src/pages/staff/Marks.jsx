import { useEffect, useState } from "react";
import axios from "axios";

const AddMarks = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({
    student: "",
    subject: "",
    examType: "Internal",
    marks: "",
  });

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/api/student");
    setStudents(res.data);
  };

  const fetchSubjects = async () => {
    const res = await axios.get("http://localhost:5000/api/subject");
    setSubjects(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/marks", form);
    alert("Marks saved");
    setForm({ ...form, marks: "" });
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Marks</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <select
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, student: e.target.value })}
        >
          <option>Select Student</option>
          {students.map((s) => (
            <option key={s._id} value={s._id}>
              {s.rollNo} - {s.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        >
          <option>Select Subject</option>
          {subjects.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.subjectName}
            </option>
          ))}
        </select>

        <select
          className="border p-2 w-full"
          value={form.examType}
          onChange={(e) => setForm({ ...form, examType: e.target.value })}
        >
          <option>Internal</option>
          <option>Model</option>
          <option>Semester</option>
        </select>

        <input
          type="number"
          placeholder="Marks"
          className="border p-2 w-full"
          value={form.marks}
          onChange={(e) => setForm({ ...form, marks: e.target.value })}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Save Marks
        </button>
      </form>
    </div>
  );
};

export default AddMarks;
