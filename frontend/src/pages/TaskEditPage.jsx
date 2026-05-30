import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TaskForm from '../components/tasks/TaskForm';
import Toast from '../components/tasks/Toast';

const TaskEditPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/tasks');
        const data = await res.json();
        if (res.ok) {
          const foundTask = data.find((t) => (t._id || t.id) === id);
          if (foundTask) {
            setTask(foundTask);
          } else {
            showToast(t('tasks.taskUpdateFailed'), 'error');
          }
        } else {
          showToast(data.message || t('tasks.taskUpdateFailed'), 'error');
        }
      } catch (error) {
        console.error('Error fetching task details:', error);
        showToast(t('auth.somethingWentWrong'), 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id, t]);

  const handleSubmit = async (updatedData) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.message || t('tasks.taskUpdateFailed'), 'error');
        return;
      }

      showToast(t('tasks.taskUpdated'), 'success');
      setTimeout(() => {
        navigate('/dashboard?tab=tasks');
      }, 1500);
    } catch (error) {
      console.error('Error updating task:', error);
      showToast(t('auth.somethingWentWrong'), 'error');
    } finally {
      setSaving(false);
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
              {t('tasks.editTask')}
            </h1>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Loader2 className="w-10 h-10 animate-spin text-purple-500 mb-4" />
              <span className="text-sm font-semibold">{t('common.loading')}</span>
            </div>
          ) : task ? (
            <TaskForm initialData={task} onSubmit={handleSubmit} loading={saving} />
          ) : (
            <div className="text-center text-red-400 font-semibold py-8">
              {t('tasks.taskUpdateFailed')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskEditPage;
