import { useEffect, useState } from "react";
import axios from "axios";

const ManageStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adding, setAdding] = useState(false);

  // Fetch staff list
  const fetchStaff = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/staff/list");
      setStaffList(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch staff");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Add staff
  const handleAddStaff = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return alert("All fields are required");

    setAdding(true);
    try {
      const res = await axios.post("http://localhost:5000/api/staff/add", {
        name,
        email,
        password,
      });

      alert(res.data.message);
      setName(""); setEmail(""); setPassword("");
      fetchStaff();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add staff");
    } finally {
      setAdding(false);
    }
  };

  // Delete staff
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/staff/delete/${id}`);
      setStaffList(staffList.filter(s => s._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete staff");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Staff</h1>

      {/* Add Staff Form */}
      <div className="bg-white p-6 rounded shadow max-w-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Staff</h2>
        <form onSubmit={handleAddStaff} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <button
            type="submit"
            disabled={adding}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 disabled:opacity-50"
          >
            {adding ? "Adding..." : "Add Staff"}
          </button>
        </form>
      </div>

      {/* Staff List */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Staff List</h2>
        {loading ? (
          <p>Loading staff...</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff, index) => (
                <tr key={staff._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{staff.name}</td>
                  <td className="border px-4 py-2">{staff.email}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(staff._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageStaff;
