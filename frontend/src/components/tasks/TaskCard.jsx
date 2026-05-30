import React from 'react';
import { Calendar, Trash2, Edit, AlertCircle, Lock, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import TaskStatusBadge from './TaskStatusBadge';

const TaskCard = ({ task, onDelete, onStatusToggle, onCardClick }) => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user || { currentUser: null });

  const getSequenceLabel = () => {
    if (!task.dayNumber) return null;
    if (task.frequency === 'weekly') return `Week ${task.dayNumber}`;
    if (task.frequency === 'monthly') return `Month ${task.dayNumber}`;
    return `Day ${task.dayNumber}`;
  };

  const isCompleted = task.status === 'completed';
  const hasDueDate = !!task.dueDate;
  
  // Overdue check (only if not completed and dueDate is before today)
  const getDueDateStatus = () => {
    if (!hasDueDate) return { text: t('tasks.noDueDate'), color: 'text-gray-500', isOverdue: false };
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);
    
    if (due.getTime() < today.getTime()) {
      return { 
        text: isCompleted ? due.toLocaleDateString() : `${t('tasks.overdue')} (${due.toLocaleDateString()})`, 
        color: isCompleted ? 'text-gray-400' : 'text-rose-450 font-bold', 
        isOverdue: !isCompleted 
      };
    } else if (due.getTime() === today.getTime()) {
      return { text: t('tasks.dueToday'), color: 'text-amber-400 font-semibold', isOverdue: false };
    }
    
    return { text: due.toLocaleDateString(), color: 'text-gray-400', isOverdue: false };
  };

  const dueDateStatus = getDueDateStatus();

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'low':
        return 'bg-gray-900/60 text-gray-400 border-gray-800';
      case 'medium':
        return 'bg-amber-950/40 text-amber-440 border-amber-850/40';
      case 'high':
        return 'bg-rose-950/40 text-rose-400 border-rose-800/40';
      default:
        return 'bg-gray-900/60 text-gray-400 border-gray-800';
    }
  };

  const getDifficultyStyle = () => {
    switch (task.difficulty) {
      case 'easy':
        return 'bg-emerald-950/30 text-emerald-400 border-emerald-800/20';
      case 'easy+':
        return 'bg-teal-950/30 text-teal-300 border-teal-800/20';
      case 'medium':
        return 'bg-blue-950/30 text-blue-400 border-blue-800/20';
      case 'medium+':
        return 'bg-amber-950/30 text-amber-400 border-amber-800/20';
      case 'hard-':
        return 'bg-orange-950/30 text-orange-400 border-orange-800/20';
      case 'hard':
        return 'bg-rose-950/30 text-rose-400 border-rose-800/20';
      default:
        return 'bg-gray-950/30 text-gray-400 border-gray-800';
    }
  };

  return (
    <div 
      onClick={(e) => {
        if (task.isLocked) return;
        if (e.target.type === 'checkbox' || e.target.closest('button') || e.target.closest('a')) {
          return;
        }
        if (onCardClick) onCardClick(task);
      }}
      className={`group bg-gray-800/90 hover:bg-gray-800 border transition-all duration-300 rounded-2xl p-5 shadow-lg flex flex-col justify-between ${
        task.isLocked 
          ? 'border-gray-850 opacity-45 cursor-not-allowed select-none bg-gray-900/40 hover:bg-gray-900/40 hover:shadow-none' 
          : isCompleted 
          ? 'border-gray-800 opacity-70 hover:opacity-90' 
          : dueDateStatus.isOverdue 
          ? 'border-rose-900/60 hover:shadow-rose-950/20' 
          : 'border-gray-750 hover:border-gray-700 hover:shadow-cyan-950/15'
      }`}
    >
      <div>
        {/* Top Info: Status Badge, Day number, Difficulty, & Priority */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            {task.dayNumber && (
              <span className="px-2 py-0.5 rounded bg-purple-950/50 text-purple-400 border border-purple-800/30 text-[10px] font-extrabold uppercase">
                {getSequenceLabel()}
              </span>
            )}
            {task.isLocked ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-950/80 text-gray-500 border border-gray-800 text-[10px] font-extrabold uppercase">
                <Lock className="w-3 h-3 text-purple-500/60 animate-pulse" />
                Locked
              </span>
            ) : (
              <TaskStatusBadge status={task.status} />
            )}
          </div>
          
          <div className="flex items-center gap-1.5">
            {task.difficulty && (
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${getDifficultyStyle()}`}>
                {task.difficulty}
              </span>
            )}
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${getPriorityColor()}`}>
              {t(`tasks.${task.priority}`)}
            </span>
          </div>
        </div>

        {/* Title and Completion Checkbox */}
        <div className="flex items-start gap-3 mb-2">
          <input
            type="checkbox"
            checked={isCompleted}
            disabled={task.isLocked || (task.status === 'in-progress' && (task.frequency === 'weekly' || task.frequency === 'monthly'))}
            onChange={() => !task.isLocked && onStatusToggle(task)}
            className="mt-1 w-5 h-5 rounded-md border-gray-700 bg-gray-900 text-purple-600 focus:ring-purple-500 focus:ring-offset-gray-900 cursor-pointer disabled:cursor-not-allowed"
            title={
              task.isLocked 
                ? "Complete previous days first" 
                : task.status === 'in-progress' && (task.frequency === 'weekly' || task.frequency === 'monthly')
                ? "Open details to check off daily sub-day progression"
                : isCompleted 
                ? t('tasks.markTodo') 
                : t('tasks.markComplete')
            }
          />
          
          <h4 className={`text-base font-bold text-white leading-snug break-words flex-1 transition-all ${
            isCompleted ? 'line-through text-gray-500' : ''
          }`}>
            {task.title}
          </h4>
        </div>

        {/* Description */}
        {task.description && (
          <p className={`text-xs text-gray-400 mb-4 ml-8 leading-relaxed line-clamp-2 ${
            isCompleted ? 'line-through text-gray-600' : ''
          }`}>
            {task.description}
          </p>
        )}
      </div>

      {/* Footer Info: Due Date & Actions */}
      <div className="flex items-center justify-between border-t border-gray-700/50 pt-4 mt-4 ml-8">
        <div className="flex items-center gap-1.5 text-xs">
          {dueDateStatus.isOverdue ? (
            <AlertCircle className="w-3.5 h-3.5 text-rose-450" />
          ) : (
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
          )}
          <span className={dueDateStatus.color}>
            {dueDateStatus.text}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {task.status === 'todo' && !task.isLocked && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onStatusToggle(task, { status: 'in-progress' });
              }}
              className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-extrabold text-[10px] uppercase hover:scale-105 active:scale-95 transition-all shadow-md shadow-purple-950/20 flex items-center gap-1 cursor-pointer"
            >
              <Play className="w-2.5 h-2.5 fill-current" />
              Start Task
            </button>
          )}

          {/* Action Buttons: Visible ONLY to Admins, hidden for locked tasks */}
          {currentUser?.isAdmin && !task.isLocked && (
            <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
              <Link
                to={`/tasks/${task._id || task.id}`}
                className="p-1.5 rounded-lg bg-gray-950/40 text-gray-400 hover:text-white hover:bg-gray-700 border border-transparent hover:border-gray-600 transition-all"
                title={t('common.edit')}
              >
                <Edit className="w-3.5 h-3.5" />
              </Link>
              
              <button
                type="button"
                onClick={() => onDelete(task)}
                className="p-1.5 rounded-lg bg-gray-950/40 text-gray-400 hover:text-rose-450 hover:bg-rose-950/40 border border-transparent hover:border-rose-900/40 transition-all"
                title={t('common.delete')}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
