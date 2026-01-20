// pages/staff/AddStudent.jsx
import { useState } from "react";
import axios from "axios";

const AddStudent = () => {
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    dob: "",
    year: "",
    semester: "",
    section: "",
    department: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/student", form);
      alert("Student added successfully");
      setForm({
        name: "",
        rollNo: "",
        dob: "",
        year: "",
        semester: "",
        section: "",
        department: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding student");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Add Student</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow max-w-md"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 mb-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="rollNo"
          placeholder="Roll No"
          value={form.rollNo}
          onChange={handleChange}
          className="border p-2 mb-2 w-full rounded"
          required
        />
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className="border p-2 mb-2 w-full rounded"
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={form.year}
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
        <input
          type="text"
          name="section"
          placeholder="Section"
          value={form.section}
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
          className="border p-2 mb-4 w-full rounded"
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
