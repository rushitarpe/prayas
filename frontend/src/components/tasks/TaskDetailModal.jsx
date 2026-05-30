import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Calendar, 
  Tag, 
  AlertCircle, 
  CheckCircle2, 
  Play, 
  Share2, 
  Info,
  Clock,
  Check,
  Lock
} from 'lucide-react';

const TaskDetailModal = ({ task, isOpen, onClose, onStatusToggle }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (!isOpen || !task) return null;

  const isWeeklyOrMonthly = task.frequency === 'weekly' || task.frequency === 'monthly';
  const hasSubDays = isWeeklyOrMonthly && (task.status === 'in-progress' || task.status === 'completed');
  const totalSubDays = task.frequency === 'weekly' ? 7 : 30;
  const currentProgressPercent = Math.min(100, Math.round(((task.activeSubDay || 0) / totalSubDays) * 100));

  const handleSubDayClick = async (dayIndex) => {
    if (dayIndex !== (task.activeSubDay || 0) + 1) return;
    setLoading(true);
    await onStatusToggle(task, { activeSubDay: dayIndex });
    setLoading(false);
  };

  const handleAction = async (newStatus) => {
    setLoading(true);
    await onStatusToggle(task, { status: newStatus });
    setLoading(false);
  };

  const handleShare = () => {
    onClose();
    // Redirect to create-post with URL search params prefilled
    const titleParam = encodeURIComponent(`Completed: ${task.title}`);
    const contentParam = encodeURIComponent(
      `<p>Today, I completed my well-being task: <strong>${task.title}</strong>!</p><p>Here is my reflection on how it made me feel...</p>`
    );
    const categoryParam = encodeURIComponent('achievement');
    navigate(`/create-post?title=${titleParam}&content=${contentParam}&category=${categoryParam}`);
  };

  // Themed placeholder image if none exists
  const coverImage = task.imageUrl || "https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-gray-900 border border-gray-800 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col justify-between shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Cover Illustration */}
        <div className="relative h-56 w-full bg-gray-950 border-b border-gray-800 flex-shrink-0">
          <img
            src={coverImage}
            alt={task.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-950/80 border border-gray-800 text-gray-400 hover:text-white transition-all shadow"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title inside cover */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-purple-500/25 text-purple-400 border border-purple-500/30 text-[10px] font-extrabold uppercase mb-2">
              {task.frequency || 'daily'} Scope
            </span>
            <h2 className="text-xl font-extrabold text-white drop-shadow-md">
              {task.title}
            </h2>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-6">
          {/* Metadata badges row */}
          <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-400 border-b border-gray-850 pb-4">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="capitalize">Schedule: {task.frequency || 'daily'}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-blue-400" />
              <span className="capitalize">Priority: {task.priority || 'medium'}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-pink-400" />
              <span>Status: <span className="text-white capitalize">{task.status}</span></span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-400" />
              How to complete this challenge
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {task.description || 'Follow this mental health challenge to build mindfulness, clear your thoughts, and boost your daily emotional wellbeing.'}
            </p>
          </div>

          {/* Sequential Day-by-Day Checklist */}
          {hasSubDays && (
            <div className="space-y-4 pt-5 border-t border-gray-800/60">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  Daily Progress Checklist
                </span>
                <span className="text-purple-400 text-xs font-extrabold">
                  {task.activeSubDay || 0} / {totalSubDays} Days ({currentProgressPercent}%)
                </span>
              </h4>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-gray-950 rounded-full overflow-hidden border border-gray-800/40 p-[2px]">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out shadow-lg shadow-purple-500/20"
                  style={{ width: `${currentProgressPercent}%` }}
                />
              </div>

              {/* Day Grid */}
              <div className={`grid gap-2 ${
                task.frequency === 'weekly' 
                  ? 'grid-cols-4 sm:grid-cols-7' 
                  : 'grid-cols-5 sm:grid-cols-10'
              }`}>
                {Array.from({ length: totalSubDays }, (_, i) => {
                  const day = i + 1;
                  const isDayCompleted = day <= (task.activeSubDay || 0);
                  const isDayActive = day === (task.activeSubDay || 0) + 1 && task.status !== 'completed';
                  const isDayLocked = day > (task.activeSubDay || 0) + 1 || (task.status === 'completed' && !isDayCompleted);

                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={loading || !isDayActive}
                      onClick={() => handleSubDayClick(day)}
                      className={`relative aspect-square rounded-xl flex flex-col items-center justify-center border transition-all duration-300 ${
                        isDayCompleted
                          ? 'bg-gradient-to-br from-emerald-500/15 to-teal-500/10 text-emerald-400 border-emerald-500/25 font-bold shadow-md shadow-emerald-950/10 cursor-default'
                          : isDayActive
                          ? 'bg-gradient-to-br from-purple-500/15 to-blue-500/10 text-white border-purple-500/50 cursor-pointer font-extrabold hover:scale-105 active:scale-95 shadow-md shadow-purple-950/30 border-2 border-dashed hover:border-purple-400'
                          : 'bg-gray-950/30 text-gray-600 border-gray-850 opacity-40 cursor-not-allowed font-medium'
                      }`}
                      title={
                        isDayCompleted 
                          ? `Day ${day} Completed` 
                          : isDayActive 
                          ? `Complete Day ${day} Challenge!` 
                          : `Day ${day} Locked`
                      }
                    >
                      {/* Pulse effect overlay for active day */}
                      {isDayActive && (
                        <span className="absolute inset-0 rounded-xl border border-purple-400/55 animate-ping opacity-20" />
                      )}
                      
                      <span className="text-[11px]">{day}</span>
                      
                      <span className="mt-0.5">
                        {isDayCompleted ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : isDayLocked ? (
                          <Lock className="w-2.5 h-2.5 text-gray-700" />
                        ) : (
                          <Play className="w-2.5 h-2.5 text-purple-400 animate-pulse" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
              
              {/* Streak Alert / Instructions */}
              {task.status === 'in-progress' && (
                <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-gray-950/60 border border-gray-850/80 text-[11px] text-gray-400 leading-normal">
                  <Clock className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p>
                    <span className="font-semibold text-white">Daily Streak Rules:</span> Complete each day in order. You must complete the next day within a 36-hour grace window since your last check-in, otherwise your progress resets to Day 1.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Gamified Completed Reflection Card */}
          {task.status === 'completed' && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/20 to-teal-950/20 border border-emerald-500/20 space-y-3.5 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl" />
              <div className="flex items-center gap-3 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                <h4 className="text-sm font-bold">Challenge Completed Successfully!</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Congratulations on completing this mini-task! Share your journey, insights, or how it improved your mood with the community reflection board.
              </p>
              <button
                onClick={handleShare}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-md shadow-emerald-950/15"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share Reflection via Post
              </button>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="p-6 border-t border-gray-850 bg-gray-950/40 flex justify-between items-center gap-4 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 font-bold hover:text-white hover:bg-gray-850 transition-all text-xs"
          >
            Close View
          </button>

          <div className="flex gap-2.5">
            {task.status === 'todo' && (
              <button
                disabled={loading}
                onClick={() => handleAction('in-progress')}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:scale-105 active:scale-95 transition-all duration-200 text-xs inline-flex items-center gap-1.5 shadow-md shadow-purple-950/20"
              >
                <Play className="w-3.5 h-3.5" />
                {task.frequency === 'daily' ? 'Start Task' : 'I am currently doing this task'}
              </button>
            )}

            {task.status !== 'completed' && (!isWeeklyOrMonthly || task.status !== 'in-progress') && (
              <button
                disabled={loading}
                onClick={() => handleAction('completed')}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold hover:scale-105 active:scale-95 transition-all duration-200 text-xs inline-flex items-center gap-1.5 shadow-md shadow-emerald-950/15"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Complete Task
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
