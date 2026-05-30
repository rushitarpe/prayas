import React from 'react';
import { ClipboardList, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const EmptyState = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user || { currentUser: null });
  const isAdmin = currentUser?.isAdmin || false;

  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-16 rounded-3xl bg-gray-800/40 border border-gray-700/60 shadow-xl text-center max-w-lg mx-auto my-8">
      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-purple-500/30 mb-6 animate-bounce">
        <ClipboardList className="w-10 h-10 text-cyan-400" />
      </div>
      
      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
        {t('tasks.noTasks')}
      </h3>
      
      <p className="text-gray-400 text-sm md:text-base max-w-sm mb-8">
        {isAdmin 
          ? t('tasks.noTasksDesc')
          : "Try adjusting your filter options or check back soon to discover active mental health tasks!"}
      </p>
      
      {isAdmin && (
        <Link
          to="/tasks/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white font-semibold hover:scale-105 hover:shadow-lg hover:shadow-purple-900/40 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          {t('tasks.createFirstTask')}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
