import React from "react";
import { 
  UserPlus, 
  CalendarPlus, 
  CalendarCheck, 
  Clock, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Bell,
  Smartphone,
  Zap
} from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="w-8 h-8 text-indigo-400" />,
      title: "Create Your Account",
      description: "Sign up as a student or organizer and get instant access to your personalized dashboard.",
      details: ["Free registration", "Choose your role", "Secure login"],
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: <CalendarPlus className="w-8 h-8 text-purple-400" />,
      title: "Organizers Create Events",
      description: "Set up engaging events, manage schedules, and send real-time notifications to attendees.",
      details: ["Easy event creation", "Custom notifications", "Attendee management"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <CalendarCheck className="w-8 h-8 text-pink-400" />,
      title: "Students Discover Events",
      description: "Browse through upcoming events and add them to your personalized timetable instantly.",
      details: ["Smart recommendations", "One-click registration", "Calendar sync"],
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-400" />,
      title: "Smart Schedule Integration",
      description: "Events and breaks are automatically integrated into your daily schedule with reminders.",
      details: ["Automatic scheduling", "Break time optimization", "Conflict prevention"],
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-yellow-400" />,
      title: "Enjoy Smarter Breaks",
      description: "Experience perfectly organized breaks with events that match your interests and schedule.",
      details: ["Personalized experience", "Real-time updates", "Community connection"],
      gradient: "from-yellow-500 to-amber-500"
    }
  ];

  const features = [
    {
      icon: <Bell className="w-6 h-6 text-indigo-400" />,
      title: "Real-time Notifications",
      description: "Never miss an important update"
    },
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      title: "Community Driven",
      description: "Connect with fellow students"
    },
    {
      icon: <Smartphone className="w-6 h-6 text-pink-400" />,
      title: "Mobile Friendly",
      description: "Access anywhere, anytime"
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "Lightning Fast",
      description: "Instant updates and sync"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl mb-6 shadow-lg shadow-purple-500/25">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            How It{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Works
            </span>
          </h1>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
            Discover how SmartBreak transforms your break time into productive, 
            enjoyable experiences with just a few simple steps.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="relative mb-24">
          {/* Connecting Line (hidden on mobile) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 transform -translate-x-1/2"></div>

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <div key={index} className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 0 ? '' : 'lg:flex-row-reverse'
              }`}>
                {/* Step Number */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 lg:relative lg:top-0 lg:left-0 lg:transform-none lg:w-1/3 flex justify-center">
                  <div className={`w-12 h-12 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 lg:w-16 lg:h-16`}>
                    <span className="text-xl lg:text-2xl font-bold text-white">{index + 1}</span>
                  </div>
                </div>

                {/* Content Card */}
                <div className={`w-full lg:w-2/3 mt-8 lg:mt-0 p-4 ${
                  index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'
                }`}>
                  <div className="group relative bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:shadow-xl hover:shadow-purple-500/10 ">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-2xl transition-all duration-300"></div>
                    
                    <div className="relative">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl border border-white/10">
                          {step.icon}
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white">{step.title}</h2>
                      </div>
                      
                      <p className="text-indigo-200 text-lg mb-6">
                        {step.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-indigo-300">
                            <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>

                      {/* Decorative Arrow */}
                      {/* {index < steps.length - 1 && (
                        <div className="hidden lg:block absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                          <ArrowRight className="w-6 h-6 text-indigo-400 rotate-90" />
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              SmartBreak
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105"
              >
                <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl w-fit mb-4 border border-white/10">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-indigo-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <div className="bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already enjoying smarter breaks with SmartBreak.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-105 shadow-lg flex items-center justify-center">
                Sign Up as Student
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
              <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 transition">
                Become an Organizer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <style jsx>{`
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
      `}</style> */}
    </div>
  );
};

export default HowItWorks;