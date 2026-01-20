import { useEffect, useState } from "react";
import axios from "axios";

const ViewMarks = () => {
  const student = JSON.parse(localStorage.getItem("student"));
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/marks/student/${student._id}`
    );
    setMarks(res.data);
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">My Marks</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Subject</th>
            <th className="border p-2">Exam</th>
            <th className="border p-2">Marks</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((m) => (
            <tr key={m._id}>
              <td className="border p-2">{m.subject.subjectName}</td>
              <td className="border p-2">{m.examType}</td>
              <td className="border p-2">{m.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewMarks;
