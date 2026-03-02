import React, { useEffect, useState } from "react";
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  Users, 
  MapPin,
  Sparkles,
  Loader2,
  CalendarDays,
  GraduationCap,
  ChevronRight,
  Search,
  Filter,
  Bell
} from 'lucide-react';
import api from "../../services/api";
import dummyEvents from "../../utils/dummyEvents.json";
import dummyTimetable from "../../utils/dummyStudentTimetable.json";

const Dashboard = () => {
  const [tab, setTab] = useState("events");
  const [eventTab, setEventTab] = useState("upcoming");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timetable, setTimetable] = useState([]);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchTimetable();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [searchTerm, events]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await api.get("/events");
      // Filter out canceled events if canceled more than 1 day ago
      const now = new Date();
      const filtered = (res.data || []).filter(event => {
        if (event.status !== "canceled") return true;
        if (!event.canceledAt) return false;
        const canceledAt = new Date(event.canceledAt);
        const diffMs = now - canceledAt;
        return diffMs <= 24 * 60 * 60 * 1000; // 1 day in ms
      });
      setEvents(filtered);
      setFilteredEvents(filtered);
    } catch (err) {
      // Same logic for dummyEvents fallback
      const now = new Date();
      const filtered = (dummyEvents || []).filter(event => {
        if (event.status !== "canceled") return true;
        if (!event.canceledAt) return false;
        const canceledAt = new Date(event.canceledAt);
        const diffMs = now - canceledAt;
        return diffMs <= 24 * 60 * 60 * 1000;
      });
      setEvents(filtered);
      setFilteredEvents(filtered);
    }
    setLoading(false);
  };

  const fetchTimetable = async () => {
    try {
      setTimetable(dummyTimetable);
    } catch (err) {
      setTimetable(dummyTimetable);
    }
  };

  const filterEvents = () => {
    if (!searchTerm.trim()) {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  const getDayGradient = (day) => {
    const gradients = {
      Monday: "from-blue-500 to-indigo-500",
      Tuesday: "from-purple-500 to-pink-500",
      Wednesday: "from-indigo-500 to-purple-500",
      Thursday: "from-pink-500 to-rose-500",
      Friday: "from-orange-500 to-red-500"
    };
    return gradients[day] || "from-indigo-500 to-purple-500";
  };

  // Split events into upcoming and past
  const now = new Date();
  const upcomingEvents = filteredEvents.filter(e => {
    let eventDate;
    if (e.time) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-2">
                Student Dashboard
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              </h1>
              <p className="text-indigo-200 mt-1">Welcome back! Ready for another productive day?</p>
            </div>
          </div>

          {/* Notification Bell */}
          <button className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition relative">
            <Bell className="w-5 h-5 text-indigo-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
          </button>
        </div>

        {/* Tabs with enhanced styling */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex gap-2 bg-white/5 backdrop-blur-sm p-1 rounded-2xl border border-white/10 w-fit">
            <button
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                tab === "events"
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                  : "text-indigo-200 hover:bg-white/10"
              }`}
              onClick={() => setTab("events")}
            >
              <CalendarDays className="w-5 h-5" />
              Events
            </button>
            <button
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                tab === "timetable"
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                  : "text-indigo-200 hover:bg-white/10"
              }`}
              onClick={() => setTab("timetable")}
            >
              <BookOpen className="w-5 h-5" />
              Timetable
            </button>
          </div>

          {/* Search Bar - Only for events tab */}
          {tab === "events" && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-300" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-9 pr-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
              />
            </div>
          )}
        </div>

        {/* Tab Content */}
        {tab === "events" && (
          <div>
            {/* Sub-tabs for Upcoming and Past Events */}
            <div className="flex gap-2 mb-6 bg-white/5 backdrop-blur-sm p-1 rounded-2xl border border-white/10 w-fit">
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
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mb-4" />
                <p className="text-indigo-300">Loading amazing events for you...</p>
              </div>
            ) : (
              <>
                {(eventTab === "upcoming" ? upcomingEvents : pastEvents).length === 0 ? (
                  <div className="text-center py-20 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <Calendar className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
                    <p className="text-indigo-300">Check back later for {eventTab === "upcoming" ? "upcoming" : "past"} events!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(eventTab === "upcoming" ? upcomingEvents : pastEvents).map((event, index) => (
                      <div
                        key={event._id || index}
                        className="group relative bg-gradient-to-br from-indigo-900/50 via-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105"
                      >
                        {/* Gradient Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-2xl transition-all duration-300"></div>
                        
                        {/* Event Category Badge (Left) */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-full text-xs text-indigo-300">
                            {event.category || "Academic"}
                          </span>
                        </div>

                        {/* Event Status Badge (Right) */}
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border border-white/10 backdrop-blur-sm ${
                            event.status === "canceled"
                              ? "bg-red-500/20 text-red-300"
                              : event.status === "completed"
                              ? "bg-green-500/20 text-green-300"
                              : event.status === "upcoming"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-indigo-500/20 text-indigo-300"
                          }`}>
                            {event.status ? event.status.charAt(0).toUpperCase() + event.status.slice(1) : "Active"}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 pr-20 mt-6">{event.title}</h3>
                        <p className="text-indigo-200 text-sm mb-4 line-clamp-2">{event.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-indigo-300">
                            <Calendar className="w-4 h-4 mr-2 text-pink-400" />
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              weekday: 'short',
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="flex items-center text-sm text-indigo-300">
                            <Clock className="w-4 h-4 mr-2 text-purple-400" />
                            {event.time}
                          </div>
                          {event.location && (
                            <div className="flex items-center text-sm text-indigo-300">
                              <MapPin className="w-4 h-4 mr-2 text-indigo-400" />
                              {event.location}
                            </div>
                          )}
                        </div>

                        {/* Attendees Info */}
                        {event.attendees && (
                          <div className="flex items-center justify-between text-sm border-t border-white/10 pt-3">
                            <div className="flex items-center text-indigo-300">
                              <Users className="w-4 h-4 mr-1" />
                              <span>{event.attendees} attending</span>
                            </div>
                            <button className="text-pink-400 hover:text-pink-300 transition flex items-center gap-1">
                              <span>Join</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {tab === "timetable" && (
          <div className="space-y-8">
            {/* Stylish Day Selection Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 ${
                    selectedDay === day
                      ? `bg-gradient-to-br ${getDayGradient(day)} shadow-xl scale-105`
                      : "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {/* Animated Background Effect */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300"></div>
                  
                  <div className="relative">
                    <p className={`text-sm font-medium mb-1 ${
                      selectedDay === day ? "text-white" : "text-indigo-300"
                    }`}>
                      {day.substring(0, 3)}
                    </p>
                    <p className={`text-xs ${
                      selectedDay === day ? "text-white/80" : "text-indigo-400"
                    }`}>
                      {day === selectedDay ? "Selected" : "View schedule"}
                    </p>
                  </div>

                  {/* Decorative dot */}
                  <div className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${
                    selectedDay === day ? "bg-white" : "bg-indigo-500"
                  }`}></div>
                </button>
              ))}
            </div>

            {/* Main Timetable Display - Stylish Grid */}
            <div className="bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
              {/* Header with selected day */}
              <div className={`bg-gradient-to-r ${getDayGradient(selectedDay)} px-6 py-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{selectedDay}'s Schedule</h2>
                      <p className="text-white/80 text-sm">{timetable.find(d => d.day === selectedDay)?.classes.length || 0} classes today</p>
                    </div>
                  </div>
                  <div className="text-white/80 text-sm">
                    {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Classes Grid */}
              <div className="p-6">
                <div className="grid gap-4">
                  {timetable
                    .find(d => d.day === selectedDay)
                    ?.classes.map((cls, idx) => (
                      <div
                        key={idx}
                        className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                      >
                        {/* Time indicator bar */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${getDayGradient(selectedDay)} rounded-l-2xl`}></div>
                        
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pl-4">
                          {/* Left side - Subject and details */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`p-2 bg-gradient-to-r ${getDayGradient(selectedDay)} rounded-xl`}>
                                <BookOpen className="w-4 h-4 text-white" />
                              </div>
                              <h3 className="text-lg font-semibold text-white">{cls.subject}</h3>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              <div className="flex items-center text-indigo-300">
                                <Clock className="w-4 h-4 mr-1 text-purple-400" />
                                {cls.time}
                              </div>
                              <div className="flex items-center text-indigo-300">
                                <MapPin className="w-4 h-4 mr-1 text-pink-400" />
                                Room {cls.room || "101"}
                              </div>
                              <div className="flex items-center text-indigo-300">
                                <Users className="w-4 h-4 mr-1 text-indigo-400" />
                                Prof. {cls.professor || "Smith"}
                              </div>
                            </div>
                          </div>

                          {/* Right side - Status */}
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-white/10 rounded-full text-xs text-indigo-300">
                              {cls.type || "Lecture"}
                            </span>
                            <button className="p-2 hover:bg-white/10 rounded-xl transition">
                              <ChevronRight className="w-4 h-4 text-indigo-300" />
                            </button>
                          </div>
                        </div>

                        {/* Hover effect overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${getDayGradient(selectedDay)} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                      </div>
                    ))}
                </div>

                {/* Empty state for no classes */}
                {(!timetable.find(d => d.day === selectedDay)?.classes.length) && (
                  <div className="text-center py-12">
                    <div className="p-4 bg-white/5 rounded-2xl inline-block mb-3">
                      <Calendar className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">No classes scheduled</h3>
                    <p className="text-indigo-300 text-sm">Enjoy your day off!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-white">Next Class</h3>
                </div>
                <p className="text-2xl font-bold text-white mb-1">
                  {timetable.find(d => d.day === selectedDay)?.classes[0]?.subject || "No classes"}
                </p>
                <p className="text-indigo-300 text-sm">
                  {timetable.find(d => d.day === selectedDay)?.classes[0]?.time || "Free time"}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-white">Today's Total</h3>
                </div>
                <p className="text-2xl font-bold text-white mb-1">
                  {timetable.find(d => d.day === selectedDay)?.classes.length || 0} Classes
                </p>
                <p className="text-indigo-300 text-sm">
                  {timetable.find(d => d.day === selectedDay)?.classes.length || 0} hours of learning
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;