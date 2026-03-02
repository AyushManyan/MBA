import React from "react";
import { 
  Sparkles,
  Calendar,
  Bell,
  Users,
  Clock,
  Smartphone,
  Zap,
  Shield,
  BarChart3,
  Globe,
  Sun,
  Moon,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const Features = () => {
  const mainFeatures = [
    {
      icon: <Calendar className="w-8 h-8 text-indigo-400" />,
      title: "Personalized Break Scheduling",
      description: "AI-powered scheduling that adapts to your preferences and study patterns for optimal break times.",
      benefits: ["Smart time allocation", "Study-break balance", "Personalized recommendations"],
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: <Bell className="w-8 h-8 text-purple-400" />,
      title: "Real-time Event Updates",
      description: "Instant notifications for event changes, reminders, and important announcements.",
      benefits: ["Push notifications", "Email alerts", "In-app updates"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Users className="w-8 h-8 text-pink-400" />,
      title: "Easy Event Management",
      description: "Powerful tools for organizers to create, manage, and analyze events effortlessly.",
      benefits: ["Drag-and-drop interface", "Attendee tracking", "Analytics dashboard"],
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-400" />,
      title: "Timetable Integration",
      description: "Seamlessly integrate events with your existing academic schedule and calendars.",
      benefits: ["Google Calendar sync", "Conflict detection", "Smart scheduling"],
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const secondaryFeatures = [
    {
      icon: <Smartphone className="w-6 h-6 text-indigo-400" />,
      title: "Mobile First",
      description: "Fully responsive design that works perfectly on all devices"
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      title: "Lightning Fast",
      description: "Optimized performance for instant updates and loading"
    },
    {
      icon: <Shield className="w-6 h-6 text-pink-400" />,
      title: "Secure & Private",
      description: "Enterprise-grade security to protect your data"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-orange-400" />,
      title: "Analytics Dashboard",
      description: "Track engagement and optimize your events"
    },
    {
      icon: <Globe className="w-6 h-6 text-indigo-400" />,
      title: "Multi-platform",
      description: "Access from web, mobile, or tablet anytime"
    },
    {
      icon: <Sun className="w-6 h-6 text-purple-400" />,
      title: "Dark Mode",
      description: "Easy on the eyes with beautiful dark theme"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users", icon: Users },
    { number: "500+", label: "Events Monthly", icon: Calendar },
    { number: "50+", label: "Universities", icon: Globe },
    { number: "99.9%", label: "Uptime", icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl mb-6 shadow-lg shadow-purple-500/25">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Powerful{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Features
            </span>
          </h1>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
            Everything you need to organize, discover, and manage events smarter. 
            Built for students and organizers with cutting-edge technology.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105"
            >
              <stat.icon className="w-8 h-8 text-indigo-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-sm text-indigo-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-2xl transition-all duration-300"></div>
              
              <div className="relative">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl border border-white/10">
                    {feature.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-white">{feature.title}</h2>
                </div>
                
                <p className="text-indigo-200 text-lg mb-6">
                  {feature.description}
                </p>

                <div className="space-y-2 mb-6">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-indigo-300">
                      <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <button className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition group/btn">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition" />
                </button>
              </div>

              {/* Decorative gradient line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            </div>
          ))}
        </div>

        {/* Secondary Features Grid */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            And so much{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              more...
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryFeatures.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg border border-white/10">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-indigo-300 text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dark Mode Showcase */}
        <div className="bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 mb-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
                  <Moon className="w-6 h-6 text-white" />
                </div>
                <Sun className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Beautiful Dark Mode
              </h3>
              <p className="text-indigo-200 text-lg mb-6">
                Experience a stunning dark theme that's easy on your eyes during late-night study sessions. 
                Perfect for students who burn the midnight oil.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-sm text-indigo-300">
                  Eye-friendly
                </span>
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300">
                  Battery saving
                </span>
                <span className="px-3 py-1 bg-pink-500/20 border border-pink-500/30 rounded-full text-sm text-pink-300">
                  Modern design
                </span>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-white/10 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1 text-center text-sm text-indigo-300">Dark Mode Preview</div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-indigo-900/50 rounded w-3/4"></div>
                  <div className="h-4 bg-purple-900/50 rounded w-1/2"></div>
                  <div className="h-4 bg-pink-900/50 rounded w-2/3"></div>
                  <div className="h-4 bg-indigo-900/50 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to experience these features?
            </h2>
            <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
              Join thousands of students and organizers who are already using SmartBreak to transform their break time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-105 shadow-lg flex items-center justify-center">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
              <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 transition">
                View Documentation
              </button>
            </div>
          </div>
        </div>
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
      `}</style>
    </div>
  );
};

export default Features;