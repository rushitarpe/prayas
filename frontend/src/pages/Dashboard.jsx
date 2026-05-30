import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';

import DashboardComments from '../component/shared/DashboardComments';
import DashboardPosts from '../component/shared/DashboardPosts';
import DashboardProfile from '../component/shared/DashboardProfile';
import DashboardSidebar from '../component/shared/DashboardSidebar';
import DashboardUsers from '../component/shared/DashboardUsers';
import MainDashboard from '../component/shared/MainDashboard';
import BottomNavBar from '../component/shared/BottomNavBar';
import DashBoardAdminPost from '../component/shared/DashBoardAdminPost';

// Tasks components
import TaskList from '../components/tasks/TaskList';
import TaskFilter from '../components/tasks/TaskFilter';
import Toast from '../components/tasks/Toast';
import ConfirmDialog from '../components/tasks/ConfirmDialog';
import TaskDetailModal from '../components/tasks/TaskDetailModal';

const Dashboard = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user || { currentUser: null });
  const [tab, setTab] = useState('');

  // Tasks states
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    frequency: 'all',
    difficulty: 'all',
    sortBy: 'dueDate',
    sortOrder: 'asc'
  });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, task: null });
  const [selectedDetailTask, setSelectedDetailTask] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  const fetchTasks = async () => {
    setLoadingTasks(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.status && filters.status !== 'all') {
        queryParams.append('status', filters.status);
      }
      if (filters.priority && filters.priority !== 'all') {
        queryParams.append('priority', filters.priority);
      }
      if (filters.frequency && filters.frequency !== 'all') {
        queryParams.append('frequency', filters.frequency);
      }
      if (filters.difficulty && filters.difficulty !== 'all') {
        queryParams.append('difficulty', filters.difficulty);
      }
      if (filters.sortBy) {
        queryParams.append('sortBy', filters.sortBy);
      }
      if (filters.sortOrder) {
        queryParams.append('sortOrder', filters.sortOrder);
      }

      const res = await fetch(`/api/tasks?${queryParams.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setTasks(data);
      } else {
        showToast(data.message || t('tasks.taskUpdateFailed'), 'error');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      showToast(t('auth.somethingWentWrong'), 'error');
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    const searchFromUrl = urlParams.get('search');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      setTab('dashboard');
    }
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    if (tab === 'tasks') {
      fetchTasks();
    }
  }, [tab, filters]);

  const handleStatusToggle = async (task, customUpdates = null) => {
    let body = {};
    if (customUpdates) {
      body = customUpdates;
    } else if (task && task.status === 'in-progress') {
      body = { status: 'in-progress' };
    } else {
      const newStatus = task.status === 'completed' ? 'todo' : 'completed';
      body = { status: newStatus };
    }

    try {
      const res = await fetch(`/api/tasks/${task._id || task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok) {
        showToast(t('tasks.taskUpdated'), 'success');
        fetchTasks();
        return data;
      } else {
        showToast(data.message || t('tasks.taskUpdateFailed'), 'error');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      showToast(t('auth.somethingWentWrong'), 'error');
    }
  };

  const handleDeleteTrigger = (task) => {
    setConfirmDialog({ isOpen: true, task });
  };

  const handleConfirmDelete = async () => {
    const task = confirmDialog.task;
    setConfirmDialog({ isOpen: false, task: null });
    if (!task) return;

    try {
      const res = await fetch(`/api/tasks/${task._id || task.id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (res.ok) {
        showToast(t('tasks.taskDeleted'), 'success');
        fetchTasks();
      } else {
        showToast(data.message || t('tasks.taskDeleteFailed'), 'error');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      showToast(t('auth.somethingWentWrong'), 'error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-[#030712] text-white">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          show={toast.show}
          onClose={handleCloseToast}
        />
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={t('tasks.deleteTask')}
        message={t('tasks.deleteConfirm')}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDialog({ isOpen: false, task: null })}
      />

      {/* Sidebar */}
      <div className="hidden md:block w-[280px] flex-shrink-0">
        <DashboardSidebar />
      </div>

      <BottomNavBar />

      <div className="flex-1 min-h-[90vh] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          {tab && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-gray-800/40 pb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  {t('dashboard.welcomeUser', { name: currentUser?.username || t('header.user') })}
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  {t('footer.aboutUsDesc').split('.')[0]}.
                </p>
              </div>
            </div>
          )}

          {/* Profile */}
          {tab === 'profile' && <DashboardProfile />}

          {/* News articles */}
          {tab === 'posts' && <DashboardPosts />}

          {/* For the admin Post */}
          {tab === 'admin-posts' && <DashBoardAdminPost />}

          {/* Users */}
          {tab === 'users' && <DashboardUsers />}

          {/* Comments */}
          {tab === 'comments' && <DashboardComments />}

          {/* Dashboard main component */}
          {tab === 'dashboard' && <MainDashboard />}

          {/* Tasks tab rendering */}
          {tab === 'tasks' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <TaskFilter
                onFilterChange={setFilters}
                currentFilters={filters}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
              <TaskList
                tasks={searchQuery.trim()
                  ? tasks.filter(t => 
                      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()))
                    )
                  : tasks
                }
                loading={loadingTasks}
                onDelete={handleDeleteTrigger}
                onStatusToggle={handleStatusToggle}
                onCardClick={setSelectedDetailTask}
              />
              <TaskDetailModal
                task={selectedDetailTask}
                isOpen={!!selectedDetailTask}
                onClose={() => setSelectedDetailTask(null)}
                onStatusToggle={async (updatedTask, customUpdates) => {
                  const data = await handleStatusToggle(updatedTask, customUpdates);
                  if (data) {
                    setSelectedDetailTask(data);
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;