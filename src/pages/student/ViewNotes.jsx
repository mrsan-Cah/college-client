import { useEffect, useState } from "react";
import axios from "axios";

const ViewNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const student = JSON.parse(localStorage.getItem("student"));

  // Filters
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  // Fetch notes
  const fetchNotes = async () => {
    setLoading(true);
    try {
      // Only send filters that have a value
      const params = {};
      if (department) params.department = department;
      if (year) params.year = year;
      if (semester) params.semester = semester;

      const res = await axios.get("http://localhost:5000/api/notes/list", { params });

      // Sort latest first
      const sortedNotes = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setNotes(sortedNotes);
    } catch (err) {
      console.error(err);
      alert("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  // Initialize filters with student info
  useEffect(() => {
    if (!student) return;
    setDepartment(student.department || "");
    setYear(student.year || "");
    setSemester(student.semester || "");
  }, [student]);

  // Fetch notes whenever any filter changes
  useEffect(() => {
    // Only fetch if at least department is selected
    if (department) fetchNotes();
  }, [department, year, semester]);

  if (!student) return <p className="text-center mt-10">Student not found</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">📘 Study Notes</h2>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Department</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="MECH">MECH</option>
          <option value="EEE">EEE</option>
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Year</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>

        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Semester</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="text-center text-gray-500">No notes available</p>
      ) : (
        <div className="grid gap-4 max-w-4xl mx-auto">
          {notes.map((n, index) => (
            <div
              key={n._id}
              className={`bg-white p-4 mb-4 rounded shadow ${
                index === 0 ? "border-2 border-blue-500" : ""
              }`}
            >
              <h3 className="font-semibold">{n.title}</h3>
              <p className="text-sm text-gray-600">Subject: {n.subject}</p>
              <p className="text-xs text-gray-400">
                Uploaded on {new Date(n.createdAt).toLocaleDateString()}
              </p>

              <a
                href={`http://localhost:5000${n.fileUrl}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 mt-2 inline-block font-medium hover:underline"
              >
                📥 Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewNotes;
