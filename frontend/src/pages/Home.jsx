import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sun, Users, Target, Star, ChevronRight, Play, Check, ArrowRight, Menu, X, Calendar, TrendingUp, Shield, Sparkles, Zap, Brain } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedNumbers, setAnimatedNumbers] = useState({ users: 0, tasks: 0, success: 0 });
  const [realStats, setRealStats] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('daily');

  // Actual task data from the app's task catalog
  const actualTasks = {
    daily: [
      {
        title: 'Gratitude Journaling',
        description: 'Write down 3 things you are grateful for today.',
        priority: 'medium',
        category: 'Mindfulness',
        imageUrl: 'https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: 'Mindful Breathing',
        description: 'Take 5 minutes to focus on your breathing using the 4-4-4 technique.',
        priority: 'high',
        category: 'Relaxation',
        imageUrl: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: 'Positive Affirmations',
        description: 'Say 3 positive affirmations in front of a mirror to boost confidence.',
        priority: 'low',
        category: 'Self-Care',
        imageUrl: 'https://images.pexels.com/photos/2682452/pexels-photo-2682452.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: 'Random Act of Kindness',
        description: 'Do something kind for someone today, no matter how small.',
        priority: 'medium',
        category: 'Connection',
        imageUrl: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: 'Hydration Check',
        description: 'Drink 8 glasses of water today to keep your body and mind energized.',
        priority: 'low',
        category: 'Physical',
        imageUrl: 'https://images.pexels.com/photos/1458687/pexels-photo-1458687.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: 'Gentle Stretching',
        description: 'Spend 5 minutes doing light body stretches to release muscle tension.',
        priority: 'medium',
        category: 'Physical',
        imageUrl: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: 'De-clutter Workspace',
        description: 'Spend 5 minutes cleaning and organizing your desk or immediate room.',
        priority: 'medium',
        category: 'Self-Care',
        imageUrl: 'https://images.pexels.com/photos/3747505/pexels-photo-3747505.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: 'Soothing Music Break',
        description: 'Close your eyes and listen to 3 relaxing songs without any distractions.',
        priority: 'low',
        category: 'Relaxation',
        imageUrl: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: 'Digital Screen Detox',
        description: 'Turn off all screens for 1 hour before going to bed to reset your mind.',
        priority: 'high',
        category: 'Self-Care',
        imageUrl: 'https://images.pexels.com/photos/1251860/pexels-photo-1251860.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: 'Nourishing Meal',
        description: 'Enjoy a healthy, fresh snack or a well-balanced meal today.',
        priority: 'low',
        category: 'Physical',
        imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: 'Nature Sight',
        description: 'Look out the window or step outside for 2 minutes to look at trees or sky.',
        priority: 'low',
        category: 'Mindfulness',
        imageUrl: 'https://images.pexels.com/photos/518485/pexels-photo-518485.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: 'Send Appreciation',
        description: 'Send a quick text expressing gratitude to a friend who helped you recently.',
        priority: 'medium',
        category: 'Connection',
        imageUrl: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600'
      }
    ],
    weekly: [
      {
        title: '💫 Write a positive affirmation for yourself',
        description: 'Create 3 affirmations and repeat them daily for the week.',
        priority: 'low',
        category: 'Self-Care',
        imageUrl: 'https://images.pexels.com/photos/2682452/pexels-photo-2682452.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: '🚶 Go for a walk without your phone',
        description: 'Leave phone at home, focus on surroundings.',
        priority: 'low',
        category: 'Mindfulness',
        imageUrl: 'https://images.pexels.com/photos/518485/pexels-photo-518485.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: '🍷 Plan and host a small gathering with friends',
        description: 'Invite friends over, cook/prepare, spend quality time.',
        priority: 'medium',
        category: 'Connection',
        imageUrl: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: '💌 Write a detailed letter to someone you appreciate',
        description: 'Express gratitude and specific reasons why they matter.',
        priority: 'medium',
        category: 'Connection',
        imageUrl: 'https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: '🎓 Take a short online class (30-60 mins)',
        description: 'TED Talk, workshop, or skill-building class.',
        priority: 'medium',
        category: 'Growth',
        imageUrl: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: '🎯 Set a specific goal and create an action plan',
        description: 'Define goal, identify steps, commit to timeline.',
        priority: 'high',
        category: 'Growth',
        imageUrl: 'https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600'
      }
    ],
    monthly: [
      {
        title: '✍️ Write down 3 things you accomplished this week',
        description: 'Reflect on your achievements, no matter how small.',
        priority: 'low',
        category: 'Mindfulness',
        imageUrl: 'https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: '🎵 Create a playlist of 10 songs that make you happy',
        description: 'Curate your own feel-good music collection.',
        priority: 'low',
        category: 'Creativity',
        imageUrl: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: '🏋️ Start an exercise routine (3 days, 20 mins each)',
        description: 'Commit to a consistent workout schedule.',
        priority: 'medium',
        category: 'Physical',
        imageUrl: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: '🧠 Learn a new skill online (complete 2-3 lessons)',
        description: 'Duolingo, Codecademy, or any learning platform.',
        priority: 'medium',
        category: 'Growth',
        imageUrl: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: '📅 Research and schedule a mental health appointment',
        description: 'Find a therapist/counselor and book a session.',
        priority: 'high',
        category: 'Self-Care',
        imageUrl: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        title: '📊 Create a 30-day personal improvement plan',
        description: 'Set goals, identify obstacles, plan actions.',
        priority: 'high',
        category: 'Growth',
        imageUrl: 'https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600'
      }
    ]
  };

  const testimonials = [
    {
      name: "Sarah M.",
      text: "PRAYAS helped me find joy in small moments. The daily tasks are simple but incredibly powerful.",
      rating: 5
    },
    {
      name: "Michael K.",
      text: "I never thought 5-minute activities could make such a difference. My mood has improved significantly.",
      rating: 5
    },
    {
      name: "Priya S.",
      text: "The community support and personalized tasks made all the difference in my healing journey.",
      rating: 5
    }
  ];

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Personalized Mini-Tasks",
      description: "Daily activities tailored to your mood and preferences, designed to build positive momentum"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Progress Tracking",
      description: "Visual insights into your emotional journey with detailed mood patterns and achievements"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Support",
      description: "Connect with others on similar journeys in a safe, supportive environment"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe & Secure",
      description: "Your mental health data is protected with enterprise-grade security"
    }
  ];

  const priorityColors = {
    low: { bg: 'from-emerald-600/20 to-teal-600/20', border: 'border-emerald-500/30', text: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300' },
    medium: { bg: 'from-amber-600/20 to-orange-600/20', border: 'border-amber-500/30', text: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300' },
    high: { bg: 'from-rose-600/20 to-red-600/20', border: 'border-rose-500/30', text: 'text-rose-400', badge: 'bg-rose-500/20 text-rose-300' }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fetch real stats from the public API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        if (res.ok) {
          const data = await res.json();
          setRealStats(data);
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    // Only animate once we have real data
    const targets = realStats
      ? { users: realStats.totalUsers, tasks: realStats.totalCompletedTasks, success: realStats.successRate }
      : null;

    if (!targets) return;

    const animateNumbers = () => {
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setAnimatedNumbers({
          users: Math.floor(targets.users * easeOut),
          tasks: Math.floor(targets.tasks * easeOut),
          success: Math.floor(targets.success * easeOut)
        });

        if (step >= steps) {
          clearInterval(timer);
          setAnimatedNumbers(targets);
        }
      }, stepTime);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateNumbers();
      }
    }, { threshold: 0.5 });

    const statsElement = document.getElementById('stats-section');
    if (statsElement) observer.observe(statsElement);

    return () => observer.disconnect();
  }, [realStats]);

  const displayedTasks = actualTasks[activeTab] || actualTasks.daily;

  return (
    <div className="min-h-screen bg-[#030712] text-white relative overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
          50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.6); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 10px rgba(147, 51, 234, 0.5); }
          50% { text-shadow: 0 0 20px rgba(147, 51, 234, 0.8); }
        }
        @keyframes particle-float {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-gradient-shift { animation: gradient-shift 8s ease infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-slide-in-right { animation: slide-in-right 1s ease-out forwards; }
        .animate-fade-in-scale { animation: fade-in-scale 0.8s ease-out forwards; }
        .animate-text-glow { animation: text-glow 2s ease-in-out infinite; }
        .gradient-bg {
          background: linear-gradient(-45deg, #0f0f23, #1a1a2e, #16213e, #0f0f23);
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .particle {
          animation: particle-float 10s linear infinite;
        }
        .task-card-img {
          width: 100%;
          height: 140px;
          object-fit: cover;
          border-radius: 12px 12px 0 0;
        }
        .tab-active {
          background: linear-gradient(135deg, rgba(147, 51, 234, 0.4), rgba(59, 130, 246, 0.4));
          border-color: rgba(147, 51, 234, 0.6);
        }
      `}</style>
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-500 rounded-full particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Interactive Cursor Effect */}
      <div 
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transition: 'all 0.1s ease-out'
        }}
      />

      <div className="gradient-bg relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-full text-white font-semibold mb-8 animate-pulse-glow">
                <Brain className="w-5 h-5" />
                <span>PRAYAS</span>
                <Zap className="w-5 h-5" />
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-bold mb-8 animate-text-glow">
                Transform Your  
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> 
                  Mental Health 
                </span>
                 One Small Step at a Time
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12 opacity-0 animate-fade-in-scale" style={{animationDelay: '0.5s'}}>
                Rediscover happiness through simple, achievable mini-tasks designed by mental health experts. Start your journey toward a brighter, more fulfilling life today.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <div className="space-y-8 opacity-0 animate-slide-in-right" style={{animationDelay: '1s'}}>
                <div className="flex flex-col sm:flex-row gap-6">
                  <button 
                    className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full 
                    font-semibold text-lg hover:scale-105 transition-all duration-300 transform 
                    hover:shadow-2xl flex items-center justify-center space-x-2"
                    onClick={() => navigate('/sign-up')}
                  >
                    <span>Start Your Journey</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="group glass-effect text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Watch Demo</span>
                  </button>
                </div>

                <div className="flex items-center space-x-8 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Free to start</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Scientifically backed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Privacy focused</span>
                  </div>
                </div>
              </div>

              <div className="relative animate-float">
                <div className="glass-effect rounded-3xl p-8 shadow-2xl transform hover:rotate-1 transition-transform duration-500">
                  <div className="bg-gray-900 bg-opacity-80 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">Today's Task</h3>
                      <Sun className="w-6 h-6 text-yellow-400 animate-spin" style={{animationDuration: '8s'}} />
                    </div>
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-4 rounded-xl transform hover:scale-105 transition-transform duration-300">
                        <h4 className="font-medium text-purple-300">Gratitude Journaling</h4>
                        <p className="text-sm text-purple-200 mt-1">Write down 3 things you are grateful for today.</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-purple-300">5 minutes</span>
                          <button className="bg-purple-600 text-white px-4 py-1 rounded-full text-xs hover:bg-purple-700 hover:scale-110 transition-all duration-300">
                            Start
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="glass-effect p-3 rounded-lg text-center transform hover:scale-110 transition-transform duration-300">
                          <div className="text-2xl font-bold text-blue-400 animate-pulse">15</div>
                          <div className="text-xs text-blue-300">Days Streak</div>
                        </div>
                        <div className="glass-effect p-3 rounded-lg text-center transform hover:scale-110 transition-transform duration-300">
                          <div className="text-2xl font-bold text-green-400 animate-pulse">92%</div>
                          <div className="text-xs text-green-300">Mood Score</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-float">
                  <Star className="w-8 h-8 text-white animate-pulse" />
                </div>
              </div>
            </div>

            {/* Sanskrit Quote Section */}
            <div className="max-w-4xl mx-auto text-center mb-20">
              <div className="glass-effect border-l-4 border-purple-400 p-8 rounded-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-purple-300 mb-4 animate-text-glow">
                    उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः। न हि सुप्तस्य सिंहस्य प्रविशन्ति मुखे मृगाः॥
                  </p>
                  <p className="text-lg text-gray-300 opacity-0 animate-fade-in-scale" style={{animationDelay: '1s'}}>
                    Success comes only through effort, not by mere wishes. Even a lion cannot have deer walk into its mouth while sleeping.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats-section" className="py-20 bg-gradient-to-r from-purple-900 to-blue-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center text-white">
              <div className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-5xl font-bold mb-2 text-purple-300">{animatedNumbers.users.toLocaleString()}+</div>
                <div className="text-purple-200">Active Users</div>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-5xl font-bold mb-2 text-blue-300">{animatedNumbers.tasks.toLocaleString()}+</div>
                <div className="text-blue-200">Tasks Completed</div>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-5xl font-bold mb-2 text-green-300">{animatedNumbers.success}%</div>
                <div className="text-green-200">Completion Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Why Choose PRAYAS?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our platform combines evidence-based practices with modern technology to create a personalized mental health journey that fits your lifestyle.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="glass-effect p-8 rounded-2xl hover:shadow-xl transition-all duration-500 border border-gray-700 transform hover:scale-105 hover:-translate-y-2 opacity-0 animate-fade-in-scale" style={{animationDelay: `${index * 200}ms`}}>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 transform hover:rotate-12 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gray-900 bg-opacity-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                How PRAYAS Works
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Simple steps to start your mental health journey
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 animate-pulse-glow">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Sign Up & Assess</h3>
                <p className="text-gray-300">
                  Create your account and complete a quick mood assessment to help us understand your current state and preferences.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 animate-pulse-glow" style={{animationDelay: '0.5s'}}>
                  2
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Get Daily Tasks</h3>
                <p className="text-gray-300">
                  Receive personalized mini-tasks each day, designed to gradually improve your mood and build positive habits.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 animate-pulse-glow" style={{animationDelay: '1s'}}>
                  3
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Track Progress</h3>
                <p className="text-gray-300">
                  Monitor your emotional journey with detailed insights, celebrate achievements, and connect with a supportive community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Actual Tasks Section - with tabs and real data */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Explore Our Task Catalog
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                45+ carefully designed activities across daily, weekly, and monthly frequencies to build lasting positive habits
              </p>

              {/* Frequency Tabs */}
              <div className="inline-flex gap-2 p-1.5 bg-gray-800/60 rounded-2xl border border-gray-700/50">
                {['daily', 'weekly', 'monthly'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 capitalize ${
                      activeTab === tab
                        ? 'tab-active text-white shadow-lg'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/40'
                    }`}
                  >
                    {tab} Tasks
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedTasks.map((task, index) => {
                const colors = priorityColors[task.priority] || priorityColors.low;
                return (
                  <div key={index} className={`rounded-2xl overflow-hidden border ${colors.border} hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 bg-gray-900/60`}>
                    <img 
                      src={task.imageUrl} 
                      alt={task.title}
                      className="task-card-img"
                      loading="lazy"
                    />
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
                          {task.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.badge} uppercase tracking-wide`}>
                          {task.priority}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{task.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{task.description}</p>
                      <button 
                        className="text-purple-400 hover:text-purple-300 font-medium flex items-center space-x-1 group"
                        onClick={() => navigate('/sign-up')}
                      >
                        <span>Get started</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <button 
                onClick={() => navigate('/sign-up')}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 text-purple-300 px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 hover:border-purple-400/50"
              >
                <span>Sign up to unlock all 45+ tasks</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-900 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-purple-200 text-xl mb-12">
              Real stories from people who transformed their lives with PRAYAS
            </p>

            <div className="glass-effect rounded-2xl p-8 shadow-2xl border border-gray-700">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-xl text-gray-200 mb-6 italic">
                "{testimonials[currentTestimonial].text}"
              </p>
              <p className="text-gray-300 font-semibold">
                {testimonials[currentTestimonial].name}
              </p>
            </div>

            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-purple-400' : 'bg-gray-600'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Mental Health?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already started their journey toward better mental health. Your transformation begins with a single step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                onClick={() => navigate('/sign-up')}
              >
                Start Free Today
              </button>
              <button 
                className="glass-effect text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 border border-gray-600"
                onClick={() => navigate('/about')}
              >
                Learn More
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;