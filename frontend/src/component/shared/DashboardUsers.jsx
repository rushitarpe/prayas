import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  Trash2, 
  ShieldAlert, 
  Calendar, 
  Loader,
  Award,
  CheckCircle,
  X,
  Activity,
  Flame
} from 'lucide-react';
import Toast from '../../components/tasks/Toast';
import ConfirmDialog from '../../components/tasks/ConfirmDialog';

const DashboardUsers = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user || { currentUser: null });
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, user: null });
  
  // Selected user for progress decision/report
  const [selectedUser, setSelectedUser] = useState(null);
  const [userTasks, setUserTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/getusers?limit=100');
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      } else {
        showToast(t('auth.somethingWentWrong'), 'error');
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      showToast(t('auth.somethingWentWrong'), 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteTrigger = (user, e) => {
    e.stopPropagation(); // Prevent opening drawer
    if (user._id === currentUser?._id) {
      showToast("You cannot delete your own account from here!", "error");
      return;
    }
    setConfirmDialog({ isOpen: true, user });
  };

  const handleConfirmDelete = async () => {
    const user = confirmDialog.user;
    setConfirmDialog({ isOpen: false, user: null });
    if (!user || !currentUser?._id) return;

    try {
      const res = await fetch(`/api/user/delete/${user._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        showToast(t('dashboard.userDeletedSuccess'), 'success');
        setUsers(users.filter(u => u._id !== user._id));
        if (selectedUser?._id === user._id) {
          setSelectedUser(null);
        }
      } else {
        showToast(data.message || t('auth.somethingWentWrong'), 'error');
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      showToast(t('auth.somethingWentWrong'), 'error');
    }
  };

  const handleViewReport = async (user) => {
    setSelectedUser(user);
    setLoadingTasks(true);
    try {
      // Query the specific user's tasks using the admin endpoint we refined!
      const res = await fetch(`/api/tasks?userId=${user._id}`);
      if (res.ok) {
        const data = await res.json();
        setUserTasks(data);
      } else {
        showToast(t('auth.somethingWentWrong'), 'error');
      }
    } catch (error) {
      console.error("Error fetching selected user's tasks:", error);
      showToast(t('auth.somethingWentWrong'), 'error');
    } finally {
      setLoadingTasks(false);
    }
  };

  const handleAdminTaskToggle = async (task) => {
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
        // Update user tasks local state immediately
        setUserTasks(userTasks.map(ut => (ut._id === task._id ? data : ut)));
      } else {
        showToast(data.message || t('tasks.taskUpdateFailed'), 'error');
      }
    } catch (error) {
      console.error('Error toggling user task status:', error);
      showToast(t('auth.somethingWentWrong'), 'error');
    }
  };

  // Calculations for selected user
  const totalUserTasks = userTasks.length;
  const completedUserTasks = userTasks.filter(t => t.status === 'completed').length;
  const completionUserRate = totalUserTasks > 0 ? Math.round((completedUserTasks / totalUserTasks) * 100) : 0;
  
  const prebuiltAchievements = [
    { id: 'mindfulness_starter', title: 'Mindfulness Starter', requiredCount: 1, icon: '🌱' },
    { id: 'daily_devotee', title: 'Daily Devotee', requiredCount: 5, icon: '🔥' },
    { id: 'zen_master', title: 'Zen Master', requiredCount: 10, icon: '🧘' },
    { id: 'prayas_champion', title: 'Prayas Champion', requiredCount: 15, icon: '👑' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={t('common.delete')}
        message={t('dashboard.deleteUserConfirm')}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDialog({ isOpen: false, user: null })}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Users List */}
        <div className={`${selectedUser ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-6 transition-all duration-300`}>
          <div>
            <h2 className="text-xl font-bold text-white">{t('dashboard.allUsers')}</h2>
            <p className="text-xs text-gray-400 mt-1">
              {selectedUser ? "Select a user to review reports." : "Manage members, view progress reports, and decide their completion status."}
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
              <Loader className="w-8 h-8 animate-spin text-purple-500" />
              <span className="text-sm font-semibold">{t('common.loading')}</span>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-20 bg-gray-950/30 backdrop-blur-xl border border-gray-800/60 rounded-2xl p-8">
              <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-base font-bold text-white mb-1">{t('dashboard.noUsersYet')}</h3>
            </div>
          ) : (
            <div className="overflow-x-auto bg-gray-950/40 backdrop-blur-xl border border-gray-800/80 rounded-2xl shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-850 text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
                    <th className="py-4 px-4">{t('profile.usernamePlaceholder')}</th>
                    <th className="py-4 px-4">{t('profile.emailPlaceholder')}</th>
                    {!selectedUser && <th className="py-4 px-4">{t('dashboard.userJoined')}</th>}
                    <th className="py-4 px-4">{t('dashboard.role')}</th>
                    <th className="py-4 px-4 text-right">{t('dashboard.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900/60 text-sm">
                  {users.map((user) => (
                    <tr 
                      key={user._id} 
                      onClick={() => handleViewReport(user)}
                      className={`hover:bg-white/5 transition-colors duration-150 cursor-pointer ${selectedUser?._id === user._id ? 'bg-purple-500/10' : ''}`}
                    >
                      <td className="py-3 px-4 font-bold text-white flex items-center gap-3">
                        <img
                          src={user.profilePicture || "https://cdn-icons-png.flaticon.com/128/64/64572.png"}
                          alt={user.username}
                          className="w-8 h-8 rounded-full border border-gray-800"
                        />
                        <span className="truncate max-w-[120px]">{user.username}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-300 truncate max-w-[150px]">
                        {user.email}
                      </td>
                      {!selectedUser && (
                        <td className="py-3 px-4 text-gray-400">
                          <div className="flex items-center gap-1 text-xs">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                          </div>
                        </td>
                      )}
                      <td className="py-3 px-4">
                        {user.isAdmin ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-purple-500/15 text-purple-400 border border-purple-500/20 text-xs font-semibold">
                            Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-gray-800 text-gray-400 border border-transparent text-xs font-semibold">
                            User
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => handleDeleteTrigger(user, e)}
                          className="p-2 rounded-xl bg-rose-950/20 text-rose-450 hover:text-white border border-rose-500/20 hover:bg-rose-600 transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Column: Decide User Progress & Reports */}
        {selectedUser && (
          <div className="lg:col-span-6 bg-gray-950/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between animate-in slide-in-from-right-4 duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl" />
            
            {/* Drawer Header */}
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400">
                    {t('dashboard.adjustProgress')}
                  </span>
                  <h2 className="text-xl font-bold text-white mt-1">
                    {t('dashboard.userProgressTitle', { name: selectedUser.username })}
                  </h2>
                </div>
                <button 
                  onClick={() => setSelectedUser(null)}
                  className="p-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {loadingTasks ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
                  <Loader className="w-6 h-6 animate-spin text-purple-500" />
                  <span className="text-xs">{t('common.loading')}</span>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Aggregated Analytics Block */}
                  <div className="grid grid-cols-3 gap-4 bg-gray-900/40 border border-gray-800/60 p-4 rounded-xl">
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400 uppercase font-semibold">{t('dashboard.totalTasks')}</p>
                      <h4 className="text-xl font-bold text-white mt-1">{totalUserTasks}</h4>
                    </div>
                    <div className="text-center border-x border-gray-800/60">
                      <p className="text-[10px] text-gray-400 uppercase font-semibold">{t('dashboard.completedTasks')}</p>
                      <h4 className="text-xl font-bold text-emerald-400 mt-1">{completedUserTasks}</h4>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400 uppercase font-semibold">Rate</p>
                      <h4 className="text-xl font-bold text-purple-400 mt-1">{completionUserRate}%</h4>
                    </div>
                  </div>

                  {/* Prebuilt Achievements List */}
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-purple-400" />
                      {t('dashboard.unlockedAchievements')}
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {prebuiltAchievements.map((ach) => {
                        const isUnlocked = completedUserTasks >= ach.requiredCount;
                        return (
                          <div 
                            key={ach.id} 
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                              isUnlocked 
                                ? 'bg-purple-500/10 border-purple-500/30 text-white' 
                                : 'bg-gray-900/60 border-gray-800/60 text-gray-500'
                            }`}
                            title={isUnlocked ? 'Unlocked!' : `Complete ${ach.requiredCount} tasks to unlock`}
                          >
                            <span>{ach.icon}</span>
                            <span>{ach.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Task List / Decide Progress */}
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-blue-400" />
                      Decide Task Completion Status
                    </h4>
                    
                    <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                      {userTasks.map((task) => (
                        <div 
                          key={task._id} 
                          className="flex items-center justify-between p-3 rounded-lg bg-gray-950/50 border border-gray-850 hover:border-gray-800 transition-all duration-150"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={task.status === 'completed'}
                              onChange={() => handleAdminTaskToggle(task)}
                              className="w-4.5 h-4.5 rounded-md border-gray-700 bg-gray-950 text-purple-500 focus:ring-purple-500 cursor-pointer"
                            />
                            <div>
                              <h5 className={`text-xs font-bold text-white ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                                {task.title}
                              </h5>
                            </div>
                          </div>
                          
                          <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                            task.status === 'completed' 
                              ? 'bg-emerald-500/10 text-emerald-440 border border-emerald-500/20' 
                              : 'bg-gray-800 text-gray-400'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardUsers;