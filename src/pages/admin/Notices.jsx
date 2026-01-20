import { useState, useEffect } from "react";
import axios from "axios";

const AdminAddNotice = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // success or error
  const [notices, setNotices] = useState([]);

  // Fetch notices from backend
  const fetchNotices = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/notices");
      setNotices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch notices", err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setMessage("All fields are required");
      setType("error");
      return;
    }

    setLoading(true);
    setMessage("");
    setType("");

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/notices",
        { title, description }
      );

      setMessage(data.message || "Notice added successfully!");
      setType("success");
      setTitle("");
      setDescription("");

      fetchNotices(); // refresh list
      localStorage.setItem("newNoticeAdded", Date.now());

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
      setType("error");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/notices/${id}`);
      setMessage("Notice deleted successfully!");
      setType("success");
      fetchNotices(); // refresh list
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Failed to delete notice");
      setType("error");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 p-6 bg-gradient-to-br from-white/90 to-blue-50 shadow-2xl rounded-3xl border border-blue-100">
      <h2 className="text-3xl font-extrabold text-blue-900 mb-8 text-center tracking-tight bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
        Admin: Notices Dashboard
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Add Notice Form */}
        <div className="lg:w-1/2 bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
            Add New Notice
          </h3>

          {/* Toast message */}
          {message && (
            <div
              className={`mb-6 px-4 py-2 rounded-xl text-center font-medium transition-all transform ${
                type === "success"
                  ? "bg-green-100 text-green-800 border border-green-300 scale-100 animate-slideIn"
                  : "bg-red-100 text-red-800 border border-red-300 scale-100 animate-slideIn"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Title</label>
              <input
                type="text"
                className="w-full border border-gray-300 px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Description</label>
              <textarea
                className="w-full border border-gray-300 px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm resize-none transition"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white font-bold rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg transform hover:scale-105 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Adding Notice..." : "Add Notice"}
            </button>
          </form>
        </div>

        {/* Right: Notices List */}
        <div className="lg:w-1/2 bg-white p-6 rounded-2xl shadow-md max-h-[600px] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
            All Notices
          </h3>

          {notices.length === 0 ? (
            <p className="text-gray-500 text-center">No notices yet.</p>
          ) : (
            notices
              .slice()
              .reverse()
              .map((n) => (
                <div
                  key={n._id}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 relative"
                >
                  <p className="font-bold text-lg text-blue-900">{n.title}</p>
                  <p className="text-gray-500 text-sm mb-2">{new Date(n.createdAt).toLocaleDateString()}</p>
                  <p className="text-gray-700">{n.description}</p>
                  <button
                    onClick={() => handleDelete(n._id)}
                    className="absolute top-2 right-2 text-red-600 font-bold hover:text-red-800 transition"
                  >
                    Delete
                  </button>
                </div>
              ))
          )}
        </div>
      </div>

      {/* Extra Tailwind Animation */}
      <style>{`
        @keyframes slideIn {
          0% { transform: translateY(-10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slideIn { animation: slideIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default AdminAddNotice;
