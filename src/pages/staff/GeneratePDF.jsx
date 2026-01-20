import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const GeneratePDF = () => {
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [subjectId, setSubjectId] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  /* 🔹 Load subjects & students */
  useEffect(() => {
    const loadData = async () => {
      try {
        const [subRes, stuRes] = await Promise.all([
          axios.get("http://localhost:5000/api/subject"),
          axios.get("http://localhost:5000/api/student"),
        ]);

        setSubjects(subRes.data);
        setStudents(stuRes.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load subjects/students");
      }
    };

    loadData();
  }, []);

  /* 🔹 Fetch attendance */
  const fetchAttendance = async () => {
    if (!subjectId || !date) {
      alert("Please select subject & date");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/attendance",
        { params: { subjectId, date } }
      );

      setAttendance(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch attendance");
    } finally {
      setLoading(false);
    }
  };

  /* 🔹 Generate & Preview PDF */
  const generatePDF = () => {
    if (attendance.length === 0) {
      alert("No attendance data found");
      return;
    }

    const doc = new jsPDF();
    const subject = subjects.find(s => s._id === subjectId);

    /* Header */
    doc.setFontSize(16);
    doc.text("Attendance Report", 14, 15);

    doc.setFontSize(11);
    doc.text(`Subject : ${subject?.subjectName}`, 14, 25);
    doc.text(`Date    : ${new Date(date).toLocaleDateString()}`, 14, 32);

    /* Table Data */
    const tableData = students.map((student, index) => {
      const record = attendance.find(
        a => a.studentId?._id === student._id
      );

      return [
        index + 1,
        student.rollNo,
        student.name,
        record?.status || "Absent",
      ];
    });

    autoTable(doc, {
      startY: 40,
      head: [["#", "Roll No", "Student Name", "Status"]],
      body: tableData,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [30, 64, 175] },
    });

    /* 🔥 PREVIEW PDF */
    const pdfUrl = doc.output("bloburl");
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Generate Attendance PDF</h1>

      <div className="bg-white p-6 rounded shadow max-w-xl space-y-4">

        {/* Subject */}
        <div>
          <label className="block font-medium mb-1">Subject</label>
          <select
            value={subjectId}
            onChange={e => setSubjectId(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">-- Select Subject --</option>
            {subjects.map(s => (
              <option key={s._id} value={s._id}>
                {s.subjectName}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block font-medium mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-2">
          <button
            onClick={fetchAttendance}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Fetch Attendance
          </button>

          <button
            onClick={generatePDF}
            disabled={attendance.length === 0}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            View PDF
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-gray-500 pt-2">Loading attendance...</p>
        )}
      </div>
    </div>
  );
};

export default GeneratePDF;
