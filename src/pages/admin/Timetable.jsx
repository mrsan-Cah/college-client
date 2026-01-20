import { useState, useEffect } from "react";
import axios from "axios";

const Timetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [newEntry, setNewEntry] = useState({
    day: "",
    time: "",
    subject: "",
    staff: "",
  });

  // Fetch existing timetable
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/timetable/list");
        setTimetables(res.data);
      } catch (error) {
        console.error("Error fetching timetable:", error);
      }
    };
    fetchTimetable();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  // Add new timetable entry
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/timetable/add", newEntry);
      setTimetables([...timetables, res.data]);
      setNewEntry({ day: "", time: "", subject: "", staff: "" });
    } catch (error) {
      console.error("Error adding timetable:", error);
    }
  };

  // Delete timetable entry
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/timetable/delete/${id}`);
      setTimetables(timetables.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting timetable:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Timetable Management</h1>

      <form onSubmit={handleAdd} className="mb-6 grid gap-2 grid-cols-1 md:grid-cols-4">
        <input
          type="text"
          name="day"
          placeholder="Day"
          value={newEntry.day}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="time"
          placeholder="Time"
          value={newEntry.time}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={newEntry.subject}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="staff"
          placeholder="Staff"
          value={newEntry.staff}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Day</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Staff</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {timetables.map((t) => (
            <tr key={t._id}>
              <td className="border p-2">{t.day}</td>
              <td className="border p-2">{t.time}</td>
              <td className="border p-2">{t.subject}</td>
              <td className="border p-2">{t.staff}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(t._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
