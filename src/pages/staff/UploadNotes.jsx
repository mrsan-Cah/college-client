import { useState } from "react";
import axios from "axios";

const UploadNotes = () => {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    department: "",
    year: "",
    semester: "",
  });
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));
    data.append("file", file);

    await axios.post("http://localhost:5000/api/notes/upload", data);
    alert("Note uploaded successfully");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow">
      <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Subject" onChange={e => setForm({ ...form, subject: e.target.value })} />
      <input placeholder="Department" onChange={e => setForm({ ...form, department: e.target.value })} />
      <input placeholder="Year" onChange={e => setForm({ ...form, year: e.target.value })} />
      <input placeholder="Semester" onChange={e => setForm({ ...form, semester: e.target.value })} />

      <input type="file" onChange={e => setFile(e.target.files[0])} />

      <button className="bg-blue-600 text-white px-4 py-2 mt-4">Upload</button>
    </form>
  );
};

export default UploadNotes;
