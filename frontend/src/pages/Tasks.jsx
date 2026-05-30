import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ClipboardList, ArrowRight, ShieldCheck, Sparkles, Clock } from 'lucide-react';

const Tasks = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user || { currentUser: null });
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard?tab=tasks');
    }
  }, [currentUser, navigate]);

  if (currentUser) {
    return null; // Prevents flashing while redirecting
  }

  return (
    <div className="min-h-screen bg-[#070d19] text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl w-full text-center relative z-10 py-16">
        {/* Large Premium Icon Container */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-500/20 to-purple-600/20 rounded-3xl border border-purple-500/35 flex items-center justify-center shadow-2xl animate-pulse">
            <ClipboardList className="h-12 w-12 text-cyan-400" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          {t('tasks.pageTitle')}
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('tasks.loginDesc')}
        </p>

        {/* Action Button */}
        <div className="flex justify-center mb-16">
          <Link
            to="/sign-in"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white font-bold text-lg hover:scale-105 hover:shadow-xl hover:shadow-purple-900/30 transition-all duration-300 shadow-lg"
          >
            {t('tasks.loginToManage')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Core Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-gray-800 pt-16">
          <div className="bg-gray-800/40 border border-gray-700/50 p-6 rounded-2xl">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg w-fit mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              {t('home.personalizedTasks')}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              {t('home.personalizedTasksDesc')}
            </p>
          </div>

          <div className="bg-gray-800/40 border border-gray-700/50 p-6 rounded-2xl">
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg w-fit mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              {t('home.progressTracking')}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              {t('home.progressTrackingDesc')}
            </p>
          </div>

          <div className="bg-gray-800/40 border border-gray-700/50 p-6 rounded-2xl">
            <div className="p-2 bg-pink-500/10 text-pink-400 rounded-lg w-fit mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              {t('home.safeSecure')}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              {t('home.safeSecureDesc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;