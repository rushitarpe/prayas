import React from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';

const TaskList = ({ tasks = [], loading = false, onDelete, onStatusToggle, onCardClick }) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <Loader2 className="w-10 h-10 animate-spin text-purple-500 mb-4" />
        <span className="text-sm font-semibold">{t('common.loading')}</span>
      </div>
    );
  }

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  // Filter tasks into their respective categories
  const dailyTasks = tasks.filter(task => task.frequency === 'daily');
  const weeklyTasks = tasks.filter(task => task.frequency === 'weekly');
  const monthlyTasks = tasks.filter(task => task.frequency === 'monthly');

  return (
    <div className="space-y-12 my-8">
      {/* 1. DAILY TASKS SECTION */}
      <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900/10 via-indigo-950/15 to-transparent border border-blue-900/20 shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-blue-500/10 text-cyan-400 rounded-xl border border-blue-500/20 text-xl font-bold flex items-center justify-center">
              🌅
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-extrabold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                Daily Routine Progression
              </h2>
              <p className="text-xs text-gray-450 mt-0.5">
                Sequential habit-building. Checking off a task unlocks the next day. Missed days reset streak back to Day 1.
              </p>
            </div>
          </div>
        </div>
        
        {dailyTasks.length === 0 ? (
          <p className="text-xs text-gray-500 italic pl-4 py-2 border-l border-dashed border-gray-800">
            No daily tasks match your active filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyTasks.map((task) => (
              <TaskCard
                key={task._id || task.id}
                task={task}
                onDelete={onDelete}
                onStatusToggle={onStatusToggle}
                onCardClick={onCardClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2. WEEKLY TASKS SECTION */}
      <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300 delay-75">
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900/10 via-fuchsia-950/15 to-transparent border border-purple-900/20 shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20 text-xl font-bold flex items-center justify-center">
              ⚡
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-extrabold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-fuchsia-400">
                Weekly Well-being Challenges (Intermediate Level)
              </h2>
              <p className="text-xs text-gray-455 mt-0.5">
                Active self-reflection and healthy routine habits to complete throughout the week.
              </p>
            </div>
          </div>
        </div>

        {weeklyTasks.length === 0 ? (
          <p className="text-xs text-gray-500 italic pl-4 py-2 border-l border-dashed border-gray-800">
            No weekly challenges match your active filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {weeklyTasks.map((task) => (
              <TaskCard
                key={task._id || task.id}
                task={task}
                onDelete={onDelete}
                onStatusToggle={onStatusToggle}
                onCardClick={onCardClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* 3. MONTHLY TASKS SECTION */}
      <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300 delay-150">
        <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-900/10 via-rose-950/15 to-transparent border border-pink-900/20 shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-pink-500/10 text-pink-400 rounded-xl border border-pink-500/20 text-xl font-bold flex items-center justify-center">
              🏆
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-extrabold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-400">
                Monthly Mindset Milestones (Intermediate Level)
              </h2>
              <p className="text-xs text-gray-455 mt-0.5">
                High-reflection monthly commitments aimed at deep personal exploration and long-term goal setting.
              </p>
            </div>
          </div>
        </div>

        {monthlyTasks.length === 0 ? (
          <p className="text-xs text-gray-500 italic pl-4 py-2 border-l border-dashed border-gray-800">
            No monthly milestones match your active filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {monthlyTasks.map((task) => (
              <TaskCard
                key={task._id || task.id}
                task={task}
                onDelete={onDelete}
                onStatusToggle={onStatusToggle}
                onCardClick={onCardClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
