import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import dummyEvents from "../../utils/dummyEvents.json";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

const UpdateEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "academic",
    maxAttendees: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchEvent();
    // eslint-disable-next-line
  }, [eventId]);

  const fetchEvent = async () => {
    setLoading(true);
    setError("");
    setNotFound(false);
    try {
      const res = await api.get(`/events/${eventId}`);
      if (!res.data) throw new Error("Event not found");
      setForm({
        title: res.data.title || "",
        description: res.data.description || "",
        date: res.data.date ? res.data.date.split("T")[0] : "",
        time: res.data.time || "",
        location: res.data.location || "",
        category: res.data.category || "academic",
        maxAttendees: res.data.maxAttendees || ""
      });
    } catch (err) {
      // Fallback to dummy data if API fails
      const found = dummyEvents.find(e => e._id === eventId);
      if (found) {
        setForm({
          title: found.title || "",
          description: found.description || "",
          date: found.date || "",
          time: found.time || "",
          location: found.location || "",
          category: found.category || "academic",
          maxAttendees: found.maxAttendees || ""
        });
      } else {
        setNotFound(true);
      }
    }
    setLoading(false);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Validation
    if (!form.title || !form.date || !form.time || !form.location) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }
    try {
      await api.put(`/events/${eventId}`, form);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/organizer/dashboard");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update event");
    }
    setLoading(false);
  };

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8 rounded-xl shadow-lg flex flex-col items-center">
          <AlertCircle className="w-10 h-10 text-red-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Event Not Found</h2>
          <p className="text-indigo-200 mb-4">The event you are trying to update does not exist.</p>
          <button onClick={() => navigate("/organizer/dashboard")}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
      <div className="w-full max-w-xl bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-xl shadow-lg p-8 border border-white/10">
        <h2 className="text-2xl font-bold mb-6 text-white">Update Event</h2>
        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-200">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center gap-3 animate-slideDown">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <p className="text-emerald-700 font-medium">Event updated successfully!</p>
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-indigo-200 mb-1">
                Event Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                placeholder="e.g., Tech Symposium 2024"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-indigo-200 mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                placeholder="Describe your event..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-1">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                >
                  <option value="academic">Academic</option>
                  <option value="social">Social</option>
                  <option value="sports">Sports</option>
                  <option value="cultural">Cultural</option>
                  <option value="career">Career</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-1">
                  Location <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  placeholder="e.g., Student Center, Room 101"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-1">
                  Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-1">
                  Time <span className="text-red-400">*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-indigo-200 mb-1">Maximum Attendees</label>
              <input
                type="number"
                name="maxAttendees"
                value={form.maxAttendees}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                placeholder="e.g., 100"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-indigo-400 hover:to-pink-400 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>Update Event</>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/organizer/dashboard")}
                className="px-4 py-2 border border-white/10 text-indigo-200 rounded-lg hover:bg-white/10 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UpdateEvent;
