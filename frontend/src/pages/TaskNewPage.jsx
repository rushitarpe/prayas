import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TaskForm from '../components/tasks/TaskForm';
import Toast from '../components/tasks/Toast';

const TaskNewPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  const handleSubmit = async (taskData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.message || t('tasks.taskCreateFailed'), 'error');
        return;
      }

      showToast(t('tasks.taskCreated'), 'success');
      setTimeout(() => {
        navigate('/dashboard?tab=tasks');
      }, 1500);
    } catch (error) {
      console.error('Error creating task:', error);
      showToast(t('auth.somethingWentWrong'), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070d19] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          show={toast.show}
          onClose={handleCloseToast}
        />
      )}

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Back Link */}
        <Link
          to="/dashboard?tab=tasks"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 mb-8 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('auth.backToSignIn').replace(/:.*/, '').trim() || t('common.cancel')}</span>
        </Link>

        {/* Card Container */}
        <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/80 rounded-3xl p-6 md:p-10 shadow-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              {t('tasks.addNewTask')}
            </h1>
            <p className="text-gray-400 text-sm">
              {t('tasks.createFirstTask')}
            </p>
          </div>

          <TaskForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default TaskNewPage;
