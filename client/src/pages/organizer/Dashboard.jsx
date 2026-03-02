import React, { useEffect, useState } from "react";
import { 
  Calendar, 
  Clock, 
  Plus, 
  Loader2, 
  AlertCircle, 
  CheckCircle2,
  CalendarDays,
  Users,
  MapPin,
  Edit3,
  X,
  Sparkles,
  LayoutGrid,
  List,
  Search
} from 'lucide-react';
import api from "../../services/api";
import dummyEvents from "../../utils/dummyEvents.json";

const Dashboard = () => {
    // Modal state for cancel confirmation
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelEventId, setCancelEventId] = useState(null);
  const [tab, setTab] = useState("events");
  const [eventTab, setEventTab] = useState("upcoming");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [addForm, setAddForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "academic",
    maxAttendees: ""
  });
  const [addError, setAddError] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [searchTerm, events]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await api.get("/events");
      setEvents(res.data);
      
      setFilteredEvents(res.data);
    } catch (err) {
      setEvents(dummyEvents);
      setFilteredEvents(dummyEvents);
    }
    setLoading(false);
  };
  
  console.log("events",events);
  const filterEvents = () => {
    if (!searchTerm.trim()) {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  const handleAddChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
    setAddError("");
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setAddError("");
    setAddLoading(true);
    
    const now = new Date();
    const eventDateTime = new Date(`${addForm.date}T${addForm.time}`);
    
    if (!addForm.title || !addForm.date || !addForm.time || !addForm.location) {
      setAddError("Please fill in all required fields");
      setAddLoading(false);
      return;
    }
    
    if (eventDateTime < now) {
      setAddError("Event cannot be scheduled in the past");
      setAddLoading(false);
      return;
    }

    try {
      await api.post("/events", addForm);
      setAddForm({ title: "", description: "", date: "", time: "", location: "", category: "academic", maxAttendees: "" });
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      setTab("events");
      fetchEvents();
    } catch (err) {
      setAddError(err.response?.data?.message || "Failed to add event");
    }
    setAddLoading(false);
  };

  const handleUpdateEvent = (eventId) => {
    window.open(`/organizer/update-event/${eventId}`, "_blank");
  };

  const handleCancelEvent = (eventId) => {
    setCancelEventId(eventId);
    setShowCancelModal(true);
  };

  const confirmCancelEvent = async () => {
    if (!cancelEventId) return;
    setLoading(true);
    try {
      await api.patch(`/events/${cancelEventId}/cancel`);
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel event");
    }
    setLoading(false);
    setShowCancelModal(false);
    setCancelEventId(null);
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
    setCancelEventId(null);
  };

  const getCategoryColor = (category) => {
    const colors = {
      academic: "bg-blue-100 text-blue-800",
      social: "bg-purple-100 text-purple-800",
      sports: "bg-green-100 text-green-800",
      cultural: "bg-pink-100 text-pink-800",
      career: "bg-orange-100 text-orange-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  // Split events into upcoming and past
  const now = new Date();
  const upcomingEvents = filteredEvents.filter(e => {
    // Combine date and time properly for ISO strings
    let eventDate;
    if (e.time) {
      // e.date is ISO, e.time is "HH:mm"; combine to ISO string
      const datePart = e.date.split("T")[0];
      eventDate = new Date(`${datePart}T${e.time}:00.000Z`);
    } else {
      eventDate = new Date(e.date);
    }
    return eventDate >= now;
  });
  const pastEvents = filteredEvents.filter(e => {
    let eventDate;
    if (e.time) {
      const datePart = e.date.split("T")[0];
      eventDate = new Date(`${datePart}T${e.time}:00.000Z`);
    } else {
      eventDate = new Date(e.date);
    }
    return eventDate < now;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 border-b border-white/10 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-indigo-400" />
                Organizer Dashboard
              </h1>
              <p className="text-gray-300 mt-1">Welcome back! Manage your events efficiently.</p>
            </div>
            {/* Quick Stats */}
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg px-4 py-2">
                <p className="text-xs text-white font-semibold">TOTAL EVENTS</p>
                <p className="text-2xl font-bold text-white">{events.length}</p>
              </div>
              <button
                onClick={() => setTab("add")}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-indigo-400 hover:to-pink-400 transition transform hover:scale-105 shadow-md"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">New Event</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-4 animate-slideDown bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <p className="text-emerald-700 font-medium">Event created successfully!</p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-1 bg-white/10 p-1 rounded-lg shadow-sm">
            <button
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                tab === "events" 
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md" 
                  : "text-gray-300 hover:bg-white/10"
              }`}
              onClick={() => setTab("events")}
            >
              <CalendarDays className="w-4 h-4 inline mr-2" />
              Events
            </button>
            <button
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                tab === "add" 
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md" 
                  : "text-gray-300 hover:bg-white/10"
              }`}
              onClick={() => setTab("add")}
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Add Event
            </button>
          </div>

          {/* View Toggle (only for events tab) */}
          {tab === "events" && (
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
              
              <div className="flex gap-1 bg-white/10 p-1 rounded-lg border border-white/10">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition ${
                    viewMode === "grid" ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white" : "text-indigo-200 hover:text-white"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition ${
                    viewMode === "list" ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white" : "text-indigo-200 hover:text-white"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tab Content */}
        {tab === "events" && (
          <div>
            {/* Sub-tabs for Upcoming and Past Events */}
            <div className="flex gap-2 mb-6 bg-white/10 p-1 rounded-2xl border border-white/10 w-fit">
              <button
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  eventTab === "upcoming"
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                    : "text-indigo-200 hover:bg-white/10"
                }`}
                onClick={() => setEventTab("upcoming")}
              >
                Upcoming Events
              </button>
              <button
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  eventTab === "past"
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                    : "text-indigo-200 hover:bg-white/10"
                }`}
                onClick={() => setEventTab("past")}
              >
                Past Events
              </button>
            </div>
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              </div>
            ) : (
              <>
                {(eventTab === "upcoming" ? upcomingEvents : pastEvents).length === 0 ? (
                  <div className="text-center py-20 bg-white/10 rounded-xl shadow-sm">
                    <Calendar className="w-16 h-16 text-indigo-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
                    <p className="text-indigo-200 mb-6">Get started by creating your first event</p>
                    <button
                      onClick={() => setTab("add")}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-indigo-400 hover:to-pink-400 transition"
                    >
                      <Plus className="w-5 h-5" />
                      Create Event
                    </button>
                  </div>
                ) : (
                  <div className={
                    viewMode === "grid" 
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-4"
                  }>
                    {(eventTab === "upcoming" ? upcomingEvents : pastEvents).map((event) => (
                      <div
                        key={event._id}
                        className={`group rounded-xl shadow-sm hover:shadow-md transition-all ${
                          viewMode === "list"
                            ? "flex items-center p-4 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 border border-white/10"
                            : "p-5 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 border border-white/10"
                        }`}
                      >
                        {viewMode === "grid" ? (
                          // Grid View
                          <>
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex gap-2 items-center">
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getCategoryColor(event.category)}`}>
                                  {event.category || "Academic"}
                                </span>
                                {event.status === "canceled" && (
                                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-100 text-red-800 ml-2">Canceled</span>
                                )}
                              </div>
                              <button
                                onClick={() => handleUpdateEvent(event._id)}
                                className="opacity-0 group-hover:opacity-100 transition p-2 hover:bg-gray-100 rounded-full"
                              >
                                <Edit3 className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                            
                            <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
                            <p className="text-indigo-200 text-sm mb-4 line-clamp-2">{event.description}</p>
                            
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center text-sm text-indigo-200">
                                <Calendar className="w-4 h-4 mr-2 text-pink-400" />
                                {new Date(event.date).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}
                              </div>
                              <div className="flex items-center text-sm text-indigo-200">
                                <Clock className="w-4 h-4 mr-2 text-pink-400" />
                                {event.time}
                              </div>
                              {event.location && (
                                <div className="flex items-center text-sm text-indigo-200">
                                  <MapPin className="w-4 h-4 mr-2 text-pink-400" />
                                  {event.location}
                                </div>
                              )}
                            </div>

                            {event.maxAttendees && (
                              <div className="flex items-center justify-between text-sm mb-3">
                                <span className="text-white">Capacity</span>
                                <span className="font-medium text-indigo-600">{event.maxAttendees} attendees</span>
                              </div>
                            )}

                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => handleUpdateEvent(event._id)}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg hover:from-indigo-400 hover:to-pink-400 transition font-medium text-sm"
                              >
                                Update Event
                              </button>
                              {event.status !== "canceled" && (
                                <button
                                  onClick={() => handleCancelEvent(event._id)}
                                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white rounded-lg hover:from-red-400 hover:to-pink-400 transition font-medium text-sm"
                                >
                                  Cancel Event
                                </button>
                              )}
                            </div>
                          </>
                        ) : (
                          // List View
                          <>
                            <div className="flex-1 flex items-center gap-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-white">{event.title}</h3>
                                <p className="text-sm text-indigo-200 line-clamp-1">{event.description}</p>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-indigo-200">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1 text-pink-400" />
                                  {new Date(event.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1 text-pink-400" />
                                  {event.time}
                                </div>
                              </div>
                              <button
                                onClick={() => handleUpdateEvent(event._id)}
                                className="px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg hover:from-indigo-400 hover:to-pink-400 transition text-sm"
                              >
                                Update
                              </button>
                              {event.status !== "canceled" && (
                                <button
                                  onClick={() => handleCancelEvent(event._id)}
                                  className="px-4 py-2 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white rounded-lg hover:from-red-400 hover:to-pink-400 transition text-sm ml-2"
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {tab === "add" && (
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleAddEvent} className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-xl shadow-lg p-6 md:p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Create New Event</h2>
              </div>

              {addError && (
                <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-red-200">{addError}</p>
                </div>
              )}

              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-1">
                    Event Title <span className="text-red-400">*</span>
                  </label>
                  <input
                  type="text"
                  name="title"
                  value={addForm.title}
                  onChange={handleAddChange}
                  className="w-full px-4 py-2 bg-slate-800/80 border border-indigo-700/40 rounded-lg text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  placeholder="e.g., Tech Symposium 2024"
                  required
                />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-1">Description</label>
                  <textarea
                  name="description"
                  value={addForm.description}
                  onChange={handleAddChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-800/80 border border-indigo-700/40 rounded-lg text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  placeholder="Describe your event..."
                />
                </div>

                {/* Category and Location Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-indigo-200 mb-1">Category</label>
                    <select
                    name="category"
                    value={addForm.category}
                    onChange={handleAddChange}
                    className="w-full px-4 py-2 bg-slate-800/80 border border-indigo-700/40 rounded-lg text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
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
                    value={addForm.location}
                    onChange={handleAddChange}
                    className="w-full px-4 py-2 bg-slate-800/80 border border-indigo-700/40 rounded-lg text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                    placeholder="e.g., Student Center, Room 101"
                    required
                  />
                  </div>
                </div>

                {/* Date and Time Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-indigo-200 mb-1">
                      Date <span className="text-red-400">*</span>
                    </label>
                    <input
                    type="date"
                    name="date"
                    value={addForm.date}
                    onChange={handleAddChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-2 bg-slate-800/80 border border-indigo-700/40 rounded-lg text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
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
                    value={addForm.time}
                    onChange={handleAddChange}
                    className="w-full px-4 py-2 bg-slate-800/80 border border-indigo-700/40 rounded-lg text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                    required
                  />
                  </div>
                </div>

                {/* Max Attendees */}
                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-1">Maximum Attendees</label>
                  <input
                    type="number"
                    name="maxAttendees"
                    value={addForm.maxAttendees}
                    onChange={handleAddChange}
                    min="1"
                    className="w-full px-4 py-2 bg-slate-800/80 border border-indigo-700/40 rounded-lg text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition no-spin"
                    placeholder="e.g., 100"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  disabled={addLoading}
                  className="flex-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-indigo-400 hover:to-pink-400 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {addLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Create Event
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setTab("events")}
                  className="px-4 py-2 border border-white/10 text-indigo-200 rounded-lg hover:bg-white/10 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <style jsx>{`
        /* Remove number input spin buttons for all browsers */
        input[type=number].no-spin::-webkit-inner-spin-button,
        input[type=number].no-spin::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number].no-spin {
          -moz-appearance: textfield;
        }
        /* Custom number input spin button color for dark theme */
        input[type=number].custom-number-input::-webkit-inner-spin-button,
        input[type=number].custom-number-input::-webkit-outer-spin-button {
          -webkit-appearance: none;
          appearance: none;
          background: #312e81; /* indigo-900 */
          color: #a5b4fc; /* indigo-300 */
          border-radius: 4px;
          border: none;
          width: 1.5em;
          height: 1.5em;
          cursor: pointer;
        }
        input[type=number].custom-number-input:focus::-webkit-inner-spin-button,
        input[type=number].custom-number-input:focus::-webkit-outer-spin-button {
          background: #6366f1; /* indigo-500 */
        }
        input[type=number].custom-number-input::-webkit-input-placeholder {
          color: #a5b4fc;
        }
        /* For Firefox */
        input[type=number].custom-number-input {
          -moz-appearance: textfield;
        }
      
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>


{/* ... existing code ... */}
      
      {/* PLACE MODAL HERE (Outside of any tab or view logic) */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border border-white/10 rounded-2xl shadow-xl p-8 w-full max-w-md relative animate-slideDown">
            <button
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/10 text-indigo-200"
              onClick={closeCancelModal}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center text-center">
              <AlertCircle className="w-10 h-10 text-red-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Cancel Event?</h3>
              <p className="text-indigo-200 mb-6">Are you sure you want to cancel this event? This action cannot be undone.</p>
              <div className="flex gap-4 w-full justify-center">
                <button
                  onClick={closeCancelModal}
                  className="flex-1 px-4 py-2 border border-white/10 text-indigo-200 rounded-lg hover:bg-white/10 transition font-medium"
                >
                  No, Go Back
                </button>
                <button
                  onClick={confirmCancelEvent}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white rounded-lg hover:from-red-400 hover:to-pink-400 transition font-medium"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2 justify-center"><Loader2 className="w-4 h-4 animate-spin" /> Canceling...</span>
                  ) : (
                    "Yes, Cancel Event"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{/* ... */}</style>
    // End of main div

    </div>
  );
};

export default Dashboard;