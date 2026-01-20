import { useEffect, useState } from "react";
import axios from "axios";

const ViewNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/notices/list"
        );

        if (Array.isArray(response.data)) {
          setNotices(response.data);
        } else {
          setNotices([]);
        }
      } catch (err) {
        console.error("Error fetching notices:", err);
        setError("Unable to load notices. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading notices...
      </div>
    );
  }

  /* ---------- Error ---------- */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  /* ---------- UI ---------- */
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        📢 College Notices
      </h1>

      {notices.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No notices available
        </p>
      ) : (
        <div className="space-y-5">
          {notices.map((notice) => (
            <div
              key={notice._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {notice.title}
                </h2>

                <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                  {new Date(notice.createdAt) >
                  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    ? "NEW"
                    : "NOTICE"}
                </span>
              </div>

              <p className="text-gray-600 mb-3">
                {notice.description}
              </p>

              <p className="text-sm text-gray-400">
                Posted on{" "}
                {new Date(notice.createdAt).toLocaleDateString()}{" "}
                {new Date(notice.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewNotices;
