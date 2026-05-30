import React from 'react';
import { useTranslation } from 'react-i18next';

const TaskStatusBadge = ({ status }) => {
  const { t } = useTranslation();

  const getStatusStyles = () => {
    switch (status) {
      case 'todo':
        return 'bg-gray-800 text-gray-400 border-gray-700';
      case 'in-progress':
        return 'bg-blue-900/40 text-blue-400 border-blue-800/60';
      case 'completed':
        return 'bg-green-900/40 text-green-400 border-green-800/60';
      default:
        return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'todo':
        return t('tasks.todo');
      case 'in-progress':
        return t('tasks.inProgress');
      case 'completed':
        return t('tasks.completed');
      default:
        return status;
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyles()}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        status === 'todo' ? 'bg-gray-400' : status === 'in-progress' ? 'bg-blue-400' : 'bg-green-400'
      }`}></span>
      {getStatusText()}
    </span>
  );
};

export default TaskStatusBadge;
