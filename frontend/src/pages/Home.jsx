import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Sun, Users, Target, Star, ChevronRight, Play, Check, ArrowRight, Menu, X, Calendar, TrendingUp, Shield, Sparkles, Zap, Brain } from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedNumbers, setAnimatedNumbers] = useState({ users: 0, tasks: 0, success: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const testimonials = [
    {
      name: "Sarah M.",
      text: t('home.testimonial1Text'),
      rating: 5
    },
    {
      name: "Michael K.",
      text: t('home.testimonial2Text'),
      rating: 5
    },
    {
      name: "Priya S.",
      text: t('home.testimonial3Text'),
      rating: 5
    }
  ];

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: t('home.personalizedTasks'),
      description: t('home.personalizedTasksDesc')
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: t('home.progressTracking'),
      description: t('home.progressTrackingDesc')
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('home.communitySupport'),
      description: t('home.communitySupportDesc')
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('home.safeSecure'),
      description: t('home.safeSecureDesc')
    }
  ];

  const tasks = [
    { name: t('home.taskGratitude'), duration: t('home.duration5min'), category: t('home.catMindfulness') },
    { name: t('home.taskBreathing'), duration: t('home.duration3min'), category: t('home.catRelaxation') },
    { name: t('home.taskAffirmations'), duration: t('home.duration2min'), category: t('home.catSelfCare') },
    { name: t('home.taskKindness'), duration: t('home.duration10min'), category: t('home.catConnection') },
    { name: t('home.taskNatureWalk'), duration: t('home.duration15min'), category: t('home.catPhysical') },
    { name: t('home.taskCreative'), duration: t('home.duration10min'), category: t('home.catCreativity') }
  ];

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

  useEffect(() => {
    const animateNumbers = () => {
      const targets = { users: 10000, tasks: 50000, success: 92 };
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
  }, []);

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
                <span>{t('common.appName').toUpperCase()}</span>
                <Zap className="w-5 h-5" />
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-bold mb-8 animate-text-glow">
                {t('home.heroTitle1')} 
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> 
                  {t('home.heroTitle2')} 
                </span>
                {t('home.heroTitle3')}
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12 opacity-0 animate-fade-in-scale" style={{animationDelay: '0.5s'}}>
                {t('home.heroDescription')}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <div className="space-y-8 opacity-0 animate-slide-in-right" style={{animationDelay: '1s'}}>
                <div className="flex flex-col sm:flex-row gap-6">
                  <button className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full 
                  font-semibold text-lg hover:scale-105 transition-all duration-300 transform 
                  hover:shadow-2xl flex items-center justify-center space-x-2
                  onClick={() => navigate('/sign-up')}">
                    <span>{t('home.startJourney')}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="group glass-effect text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{t('home.watchDemo')}</span>
                  </button>
                </div>

                <div className="flex items-center space-x-8 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>{t('common.freeToStart')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>{t('common.scientificallyBacked')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>{t('common.privacyFocused')}</span>
                  </div>
                </div>
              </div>

              <div className="relative animate-float">
                <div className="glass-effect rounded-3xl p-8 shadow-2xl transform hover:rotate-1 transition-transform duration-500">
                  <div className="bg-gray-900 bg-opacity-80 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">{t('home.todaysTask')}</h3>
                      <Sun className="w-6 h-6 text-yellow-400 animate-spin" style={{animationDuration: '8s'}} />
                    </div>
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-4 rounded-xl transform hover:scale-105 transition-transform duration-300">
                        <h4 className="font-medium text-purple-300">{t('home.taskGratitude')}</h4>
                        <p className="text-sm text-purple-200 mt-1">{t('home.gratitudeDesc')}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-purple-300">{t('home.fiveMinutes')}</span>
                          <button className="bg-purple-600 text-white px-4 py-1 rounded-full text-xs hover:bg-purple-700 hover:scale-110 transition-all duration-300">
                            {t('home.start')}
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="glass-effect p-3 rounded-lg text-center transform hover:scale-110 transition-transform duration-300">
                          <div className="text-2xl font-bold text-blue-400 animate-pulse">15</div>
                          <div className="text-xs text-blue-300">{t('home.daysStreak')}</div>
                        </div>
                        <div className="glass-effect p-3 rounded-lg text-center transform hover:scale-110 transition-transform duration-300">
                          <div className="text-2xl font-bold text-green-400 animate-pulse">92%</div>
                          <div className="text-xs text-green-300">{t('home.moodScore')}</div>
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

            {/* Sanskrit Quote Section - Repositioned */}
            <div className="max-w-4xl mx-auto text-center mb-20">
              <div className="glass-effect border-l-4 border-purple-400 p-8 rounded-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-purple-300 mb-4 animate-text-glow">
                    {t('home.sanskritQuote')}
                  </p>
                  <p className="text-lg text-gray-300 opacity-0 animate-fade-in-scale" style={{animationDelay: '1s'}}>
                    {t('home.sanskritTranslation')}
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
                <div className="text-purple-200">{t('home.livesTransformed')}</div>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-5xl font-bold mb-2 text-blue-300">{animatedNumbers.tasks.toLocaleString()}+</div>
                <div className="text-blue-200">{t('home.tasksCompleted')}</div>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-5xl font-bold mb-2 text-green-300">{animatedNumbers.success}%</div>
                <div className="text-green-200">{t('home.successRate')}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                {t('home.whyChoose')}
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {t('home.whyChooseDesc')}
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
                {t('home.howItWorks')}
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {t('home.howItWorksDesc')}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 animate-pulse-glow">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{t('home.step1Title')}</h3>
                <p className="text-gray-300">
                  {t('home.step1Desc')}
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 animate-pulse-glow" style={{animationDelay: '0.5s'}}>
                  2
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{t('home.step2Title')}</h3>
                <p className="text-gray-300">
                  {t('home.step2Desc')}
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 animate-pulse-glow" style={{animationDelay: '1s'}}>
                  3
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{t('home.step3Title')}</h3>
                <p className="text-gray-300">
                  {t('home.step3Desc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Tasks Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                {t('home.sampleTasks')}
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {t('home.sampleTasksDesc')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task, index) => (
                <div key={index} className="glass-effect p-6 rounded-xl border border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-purple-600 bg-opacity-80 text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
                      {task.category}
                    </span>
                    <span className="text-gray-400 text-sm">{task.duration}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{task.name}</h3>
                  <button className="text-purple-400 hover:text-purple-300 font-medium flex items-center space-x-1 group">
                    <span>{t('common.learnMore')}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-900 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              {t('home.whatUsersSay')}
            </h2>
            <p className="text-purple-200 text-xl mb-12">
              {t('home.whatUsersSayDesc')}
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
              {t('home.ctaTitle')}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('home.ctaDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                {t('common.startFreeToday')}
              </button>
              <button className="glass-effect text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 border border-gray-600">
                {t('common.learnMore')}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;