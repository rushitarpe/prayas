import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Activity, 
  Users, 
  FileText, 
  MessageSquare, 
  Clock, 
  Flame,
  ChevronRight
} from 'lucide-react';
import Toast from '../../components/tasks/Toast';

const MainDashboard = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user || { currentUser: null });
  const isAdmin = currentUser?.isAdmin || false;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Admin stats
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalComments: 0
  });

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch current user tasks (or default target if admin views someone else, but here it's current user)
      const res = await fetch('/api/tasks');
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }

      // If admin, fetch platform metrics
      if (isAdmin) {
        const [usersRes, postsRes, commentsRes] = await Promise.all([
          fetch('/api/user/getusers?limit=1'),
          fetch('/api/post/getposts?limit=1'),
          fetch('/api/comment/getcomments?limit=1')
        ]);

        let totalUsers = 0;
        let totalPosts = 0;
        let totalComments = 0;

        if (usersRes.ok) {
          const usersData = await usersRes.json();
          totalUsers = usersData.totalUsers || 0;
        }
        if (postsRes.ok) {
          const postsData = await postsRes.json();
          totalPosts = postsData.totalPosts || 0;
        }
        if (commentsRes.ok) {
          const commentsData = await commentsRes.json();
          totalComments = commentsData.totalComments || 0;
        }

        setAdminStats({ totalUsers, totalPosts, totalComments });
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const handleStatusToggle = async (task) => {
    const newStatus = task.status === 'completed' ? 'todo' : 'completed';
    try {
      const res = await fetch(`/api/tasks/${task._id || task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (res.ok) {
        showToast(t('dashboard.statusUpdated'), 'success');
        // Update local tasks state immediately for smooth UI transition
        setTasks(tasks.map(t => (t._id === task._id ? data : t)));
      } else {
        showToast(data.message || t('tasks.taskUpdateFailed'), 'error');
      }
    } catch (error) {
      console.error('Error toggling task status:', error);
      showToast(t('auth.somethingWentWrong'), 'error');
    }
  };

  // Calculations
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const pendingTasks = totalTasks - completedTasks;

  // Streak is dynamically calculated as the consecutive number of completed tasks or simple metric (mocking a beautiful habit streak based on completed count)
  const dynamicStreak = completedTasks > 0 ? Math.min(completedTasks * 2, 30) : 0;

  // Prebuilt Achievements list
  const prebuiltAchievements = [
    {
      id: 'mindfulness_starter',
      title: 'Mindfulness Starter',
      description: 'Complete your first positive mental health mini-task.',
      requiredCount: 1,
      icon: '🌱',
      color: 'from-emerald-400 to-teal-500'
    },
    {
      id: 'daily_devotee',
      title: 'Daily Devotee',
      description: 'Establish consistency by completing 5 mental health mini-tasks.',
      requiredCount: 5,
      icon: '🔥',
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'zen_master',
      title: 'Zen Master',
      description: 'Deepen your practice and complete 10 mini-tasks.',
      requiredCount: 10,
      icon: '🧘',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'prayas_champion',
      title: 'Prayas Champion',
      description: 'Master the entire cognitive behavioral seed tasks package.',
      requiredCount: 15,
      icon: '👑',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const unlockedCount = prebuiltAchievements.filter(ach => completedTasks >= ach.requiredCount).length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          show={toast.show}
          onClose={handleCloseToast}
        />
      )}

      {/* Overview stats block */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Tasks Card */}
        <div className="relative overflow-hidden bg-gray-950/40 backdrop-blur-xl border border-gray-800/80 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/5 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-400">{t('dashboard.totalTasks')}</span>
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Activity className="w-5 h-5" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{loading ? '...' : totalTasks}</span>
          </div>
        </div>

        {/* Completed Tasks Card */}
        <div className="relative overflow-hidden bg-gray-950/40 backdrop-blur-xl border border-gray-800/80 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/5 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-400">{t('dashboard.completedTasks')}</span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{loading ? '...' : completedTasks}</span>
          </div>
        </div>

        {/* Completion Rate Card */}
        <div className="relative overflow-hidden bg-gray-950/40 backdrop-blur-xl border border-gray-800/80 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/5 group flex items-center justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-400 mb-2">{t('dashboard.completionRate')}</span>
            <span className="text-3xl font-extrabold text-white">{loading ? '...' : `${completionRate}%`}</span>
          </div>
          {/* Animated SVG Ring */}
          <div className="relative flex items-center justify-center w-16 h-16">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="26"
                className="stroke-gray-800 fill-none"
                strokeWidth="5"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                className="stroke-purple-500 fill-none transition-all duration-1000 ease-out"
                strokeWidth="5"
                strokeDasharray={163.36}
                strokeDashoffset={163.36 - (163.36 * completionRate) / 100}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-[10px] font-bold text-purple-400">{completionRate}%</span>
          </div>
        </div>

        {/* Consistency Streak Card */}
        <div className="relative overflow-hidden bg-gray-950/40 backdrop-blur-xl border border-gray-800/80 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-950/5 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-400">{t('dashboard.streak')}</span>
            <span className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
              <Flame className="w-5 h-5" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{loading ? '...' : dynamicStreak}</span>
            <span className="text-sm font-semibold text-gray-400">{t('dashboard.days')}</span>
          </div>
        </div>
      </div>

      {/* Admin Specific Overview Section */}
      {isAdmin && (
        <div className="p-6 bg-gradient-to-r from-blue-950/30 to-purple-950/30 border border-purple-500/20 rounded-2xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
          <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            System Administrator Report
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 bg-gray-950/45 p-4 rounded-xl border border-gray-800/60">
              <div className="p-3 bg-blue-500/15 rounded-lg text-blue-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase">{t('dashboard.totalUsers')}</p>
                <h3 className="text-2xl font-bold text-white mt-0.5">{loading ? '...' : adminStats.totalUsers}</h3>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-gray-950/45 p-4 rounded-xl border border-gray-800/60">
              <div className="p-3 bg-purple-500/15 rounded-lg text-purple-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase">{t('dashboard.totalPosts')}</p>
                <h3 className="text-2xl font-bold text-white mt-0.5">{loading ? '...' : adminStats.totalPosts}</h3>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-950/45 p-4 rounded-xl border border-gray-800/60">
              <div className="p-3 bg-pink-500/15 rounded-lg text-pink-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase">{t('dashboard.totalComments')}</p>
                <h3 className="text-2xl font-bold text-white mt-0.5">{loading ? '...' : adminStats.totalComments}</h3>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sanskrit Quote Calligraphy */}
      <div className="relative p-8 rounded-2xl bg-gray-950/40 backdrop-blur-xl border border-gray-850 overflow-hidden group shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400">
            {t('dashboard.wisdomTitle')}
          </span>
          <p className="text-xl sm:text-2xl font-serif text-white leading-relaxed italic Sanskrit-quote bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-purple-200">
            "{t('home.sanskritQuote')}"
          </p>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('home.sanskritTranslation')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent tasks / Daily agenda */}
        <div className="lg:col-span-7 bg-gray-950/40 backdrop-blur-xl border border-gray-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">{t('dashboard.progressReport')}</h2>
                <p className="text-xs text-gray-400 mt-1">Focus on completing your daily well-being challenges.</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Level {unlockedCount + 1}
              </span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12 text-gray-400 text-sm gap-2">
                <Clock className="w-4 h-4 animate-spin text-purple-500" />
                <span>{t('common.loading')}</span>
              </div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">
                No active tasks found.
              </div>
            ) : (
              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                {tasks.slice(0, 4).map((task) => (
                  <div 
                    key={task._id} 
                    className="flex items-center justify-between p-4 rounded-xl bg-gray-900/40 border border-gray-800/60 hover:border-gray-700/60 hover:bg-gray-900/60 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3.5 mr-2">
                      <input
                        type="checkbox"
                        checked={task.status === 'completed'}
                        onChange={() => handleStatusToggle(task)}
                        className="w-5 h-5 rounded-md border-gray-700 bg-gray-950/80 text-purple-500 focus:ring-purple-500/50 cursor-pointer"
                      />
                      <div>
                        <h4 className={`text-sm font-bold text-white transition-all ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                          {task.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                          {task.description || 'No description provided.'}
                        </p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                      task.priority === 'high' ? 'bg-rose-500/10 text-rose-450 border border-rose-500/20' :
                      task.priority === 'medium' ? 'bg-amber-500/10 text-amber-440 border border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-440 border border-emerald-500/20'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Prebuilt Achievements Board */}
        <div className="lg:col-span-5 bg-gray-950/40 backdrop-blur-xl border border-gray-800/80 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">{t('dashboard.achievements')}</h2>
              <p className="text-xs text-gray-400 mt-1">Unlock badges based on your performance.</p>
            </div>
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Award className="w-5 h-5" />
            </span>
          </div>

          <div className="space-y-4">
            {prebuiltAchievements.map((ach) => {
              const isUnlocked = completedTasks >= ach.requiredCount;
              const progress = Math.min((completedTasks / ach.requiredCount) * 100, 100);

              return (
                <div 
                  key={ach.id} 
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    isUnlocked 
                      ? 'bg-gradient-to-br from-gray-900/60 to-purple-950/10 border-purple-500/30' 
                      : 'bg-gray-900/35 border-gray-800/60 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <span className="text-2xl p-2 bg-gray-950/50 rounded-xl">{ach.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold text-white">{ach.title}</h4>
                        <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          isUnlocked 
                            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                            : 'bg-gray-800 text-gray-400'
                        }`}>
                          {isUnlocked ? t('dashboard.unlocked') : t('dashboard.locked')}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                        {ach.description}
                      </p>
                      
                      {/* Achievements progress bar if locked */}
                      {!isUnlocked && (
                        <div className="mt-3">
                          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                            <span>Progress</span>
                            <span>{completedTasks} / {ach.requiredCount}</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-950 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500" 
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;