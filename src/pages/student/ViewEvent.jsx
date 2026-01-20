import { useEffect, useState } from "react";
import axios from "axios";

const ViewEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events/list");
        const data = Array.isArray(res.data) ? res.data : res.data.events || [];
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-700">
        Loading events...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-10 tracking-tight">
        🎓 College Events
      </h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No events available right now
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events
            .slice()
            .reverse()
            .map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 overflow-hidden flex flex-col"
              >
                {/* Banner Image */}
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={event.image || "/placeholder-event.jpg"}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {/* Title */}
                  <h2 className="text-2xl font-semibold text-blue-900 mb-2 line-clamp-2">
                    {event.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-4">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="text-gray-700 text-sm space-y-1 mb-4">
                    <p>📅 <b>Date:</b> {new Date(event.date).toLocaleDateString()}</p>
                    <p>⏰ <b>Time:</b> {event.time || "N/A"}</p>
                    <p>📍 <b>Venue:</b> {event.venue || "TBA"}</p>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {event.department && (
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs font-semibold rounded-full shadow-sm">
                        {event.department}
                      </span>
                    )}
                    {event.year && (
                      <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-semibold rounded-full shadow-sm">
                        Year {event.year}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ViewEvent;
