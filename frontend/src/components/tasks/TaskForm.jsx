import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, AlertCircle } from 'lucide-react';

const TaskForm = ({ initialData = null, onSubmit, loading = false }) => {
  const { t } = useTranslation();

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (e) {
      return '';
    }
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'todo',
        priority: initialData.priority || 'medium',
        dueDate: formatDateForInput(initialData.dueDate)
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Title is required validation
    if (!formData.title.trim()) {
      setErrors({ title: t('tasks.titleRequired') });
      return;
    }

    // Submit formatted data
    onSubmit({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-gray-300 mb-2">
          {t('tasks.taskTitle')} *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-gray-900 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
            errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-purple-500'
          }`}
          placeholder={t('tasks.taskTitlePlaceholder')}
          required
        />
        {errors.title && (
          <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.title}</span>
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-gray-300 mb-2">
          {t('tasks.taskDescription')}
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none transition-all"
          placeholder={t('tasks.taskDescriptionPlaceholder')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-semibold text-gray-300 mb-2">
            {t('tasks.status')}
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
          >
            <option value="todo">{t('tasks.todo')}</option>
            <option value="in-progress">{t('tasks.inProgress')}</option>
            <option value="completed">{t('tasks.completed')}</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="priority" className="block text-sm font-semibold text-gray-300 mb-2">
            {t('tasks.priority')}
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
          >
            <option value="low">{t('tasks.low')}</option>
            <option value="medium">{t('tasks.medium')}</option>
            <option value="high">{t('tasks.high')}</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label htmlFor="dueDate" className="block text-sm font-semibold text-gray-300 mb-2">
            {t('tasks.dueDate')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white font-bold hover:scale-[1.01] hover:shadow-lg hover:shadow-purple-950/20 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed transition-all duration-200"
        >
          {loading 
            ? t('tasks.saving') 
            : initialData 
            ? t('tasks.updateTask') 
            : t('tasks.createTask')}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
