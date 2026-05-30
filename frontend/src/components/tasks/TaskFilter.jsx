import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpDown, Filter } from 'lucide-react';

const TaskFilter = ({ onFilterChange, currentFilters }) => {
  const { t } = useTranslation();

  const handleStatusChange = (status) => {
    onFilterChange({ ...currentFilters, status });
  };

  const handlePriorityChange = (priority) => {
    onFilterChange({ ...currentFilters, priority });
  };

  const handleSortByChange = (e) => {
    onFilterChange({ ...currentFilters, sortBy: e.target.value });
  };

  const toggleSortOrder = () => {
    const sortOrder = currentFilters.sortOrder === 'asc' ? 'desc' : 'asc';
    onFilterChange({ ...currentFilters, sortOrder });
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-700 p-4 md:p-6 mb-8 shadow-xl">
      <div className="flex items-center gap-2 mb-4 text-cyan-400 font-semibold">
        <Filter className="w-5 h-5" />
        <span>{t('tasks.filterByStatus')}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Status Filters */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {t('tasks.status')}
          </label>
          <div className="flex flex-wrap gap-2">
            {['all', 'todo', 'in-progress', 'completed'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => handleStatusChange(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-300 ${
                  currentFilters.status === status
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-lg shadow-purple-900/30'
                    : 'bg-gray-900/40 text-gray-400 border-gray-700 hover:text-white hover:border-gray-600'
                }`}
              >
                {status === 'all'
                  ? 'All Tasks'
                  : status === 'todo'
                  ? t('tasks.todo')
                  : status === 'in-progress'
                  ? t('tasks.inProgress')
                  : t('tasks.completed')}
              </button>
            ))}
          </div>
        </div>

        {/* Priority Filters */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {t('tasks.priority')}
          </label>
          <div className="flex flex-wrap gap-2">
            {['all', 'low', 'medium', 'high'].map((priority) => (
              <button
                key={priority}
                type="button"
                onClick={() => handlePriorityChange(priority)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-300 ${
                  currentFilters.priority === priority
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white border-transparent shadow-lg shadow-rose-900/30'
                    : 'bg-gray-900/40 text-gray-400 border-gray-700 hover:text-white hover:border-gray-600'
                }`}
              >
                {priority === 'all'
                  ? 'All Tasks'
                  : priority === 'low'
                  ? t('tasks.low')
                  : priority === 'medium'
                  ? t('tasks.medium')
                  : t('tasks.high')}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filters */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Difficulty
          </label>
          <div className="flex flex-wrap gap-1.5">
            {['all', 'easy', 'easy+', 'medium', 'medium+', 'hard-', 'hard'].map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => onFilterChange({ ...currentFilters, difficulty: diff })}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase transition-all duration-300 border ${
                  currentFilters.difficulty === diff
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-transparent shadow-lg shadow-indigo-900/20'
                    : 'bg-gray-900/40 text-gray-400 border-gray-700 hover:text-white hover:border-gray-600'
                }`}
              >
                {diff === 'all' ? 'All Tasks' : diff}
              </button>
            ))}
          </div>
        </div>

        {/* Sorting controls */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {t('tasks.sortBy')}
          </label>
          <div className="flex gap-2">
            <select
              value={currentFilters.sortBy}
              onChange={handleSortByChange}
              className="flex-1 bg-gray-900/60 border border-gray-700 text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="dueDate">{t('tasks.sortByDueDate')}</option>
              <option value="createdAt">{t('tasks.sortByCreatedAt')}</option>
            </select>
            
            <button
              type="button"
              onClick={toggleSortOrder}
              className="px-3 py-1.5 rounded-lg bg-gray-900/60 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-all duration-300 flex items-center justify-center"
              title={currentFilters.sortOrder === 'asc' ? t('tasks.ascending') : t('tasks.descending')}
            >
              <ArrowUpDown className={`w-4 h-4 transition-transform duration-300 ${
                currentFilters.sortOrder === 'desc' ? 'rotate-180' : ''
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
