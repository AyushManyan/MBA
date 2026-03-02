import React from "react";
import { 
  Sparkles, 
  Heart, 
  Target, 
  Users, 
  Rocket, 
  Zap,
  Shield,
  Globe,
  Coffee,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';

const About = () => {
  const missionPoints = [
    {
      icon: <Target className="w-6 h-6 text-indigo-400" />,
      title: "Our Mission",
      description: "To revolutionize how students manage their break time by creating meaningful connections and memorable experiences."
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-400" />,
      title: "Our Vision",
      description: "A world where every break becomes an opportunity for growth, learning, and community building."
    },
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      title: "Our Values",
      description: "Community-first approach, innovation in education technology, and unwavering commitment to user experience."
    }
  ];

  const stats = [
    { number: "2024", label: "Founded", icon: Rocket },
    { number: "10K+", label: "Students", icon: Users },
    { number: "500+", label: "Events", icon: BookOpen },
    { number: "50+", label: "Universities", icon: Globe }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former university administrator passionate about student life",
      image: "👩‍💼",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Full-stack developer with 10+ years of ed-tech experience",
      image: "👨‍💻",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Community",
      bio: "Student engagement specialist and event planner",
      image: "👩‍🎓",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  const values = [
    {
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      title: "Innovation",
      description: "Constantly pushing boundaries to create better solutions"
    },
    {
      icon: <Shield className="w-5 h-5 text-green-400" />,
      title: "Trust",
      description: "Building secure and reliable platforms for our users"
    },
    {
      icon: <Heart className="w-5 h-5 text-red-400" />,
      title: "Community",
      description: "Putting students and organizers at the heart of everything"
    },
    {
      icon: <Coffee className="w-5 h-5 text-orange-400" />,
      title: "Wellness",
      description: "Promoting healthy break habits and work-life balance"
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl mb-6 shadow-lg shadow-purple-500/25">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            About{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              SmartBreak
            </span>
          </h1>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
            We're on a mission to transform how students experience their breaks, 
            creating meaningful connections and unforgettable moments.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Our{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Story
              </span>
            </h2>
            <p className="text-lg text-indigo-200 leading-relaxed">
              SmartBreak was born from a simple observation: students struggle to make the most of their break time. 
              Between classes, study sessions, and personal commitments, finding meaningful ways to spend breaks 
              became a challenge.
            </p>
            <p className="text-lg text-indigo-200 leading-relaxed">
              What started as a small project in a university dorm room has grown into a comprehensive platform 
              serving thousands of students across multiple universities. We've built more than just an app – 
              we've created a community.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm border-2 border-white/20">JD</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm border-2 border-white/20">MC</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white text-sm border-2 border-white/20">ER</div>
              </div>
              <p className="text-sm text-indigo-300">Founded by students, for students</p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl p-4 border border-white/10">
                    <Rocket className="w-8 h-8 text-indigo-400 mb-2" />
                    <p className="text-white font-semibold">2024</p>
                    <p className="text-xs text-indigo-300">Founded</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-4 border border-white/10">
                    <Users className="w-8 h-8 text-purple-400 mb-2" />
                    <p className="text-white font-semibold">10K+</p>
                    <p className="text-xs text-indigo-300">Users</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-2xl p-4 border border-white/10">
                    <Globe className="w-8 h-8 text-pink-400 mb-2" />
                    <p className="text-white font-semibold">50+</p>
                    <p className="text-xs text-indigo-300">Universities</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-4 border border-white/10">
                    <Award className="w-8 h-8 text-orange-400 mb-2" />
                    <p className="text-white font-semibold">5★</p>
                    <p className="text-xs text-indigo-300">Rating</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -z-10 -top-4 -right-4 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Mission/Vision/Values Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {missionPoints.map((item, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-2xl transition-all duration-300"></div>
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl border border-white/10 w-fit mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-indigo-200">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            What We Stand{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              For
            </span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="p-2 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg w-fit mx-auto mb-3">
                  {value.icon}
                </div>
                <h3 className="text-white font-semibold mb-1">{value.title}</h3>
                <p className="text-xs text-indigo-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>



        {/* Contact Section */}
        <div className="bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Get in Touch</h3>
              <p className="text-indigo-200 mb-6">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-indigo-300">
                  <Mail className="w-5 h-5 text-pink-400" />
                  <span>hello@smartbreak.com</span>
                </div>
                <div className="flex items-center gap-3 text-indigo-300">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-indigo-300">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                  <span>123 University Ave, Suite 100</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <textarea
                placeholder="Your Message"
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              ></textarea>
              <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-105">
                Send Message
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

export default About;