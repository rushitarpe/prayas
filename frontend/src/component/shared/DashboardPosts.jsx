import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  Trash2, 
  Edit3, 
  Calendar, 
  Tag, 
  Plus,
  AlertTriangle,
  Loader
} from 'lucide-react';
import Toast from '../../components/tasks/Toast';
import ConfirmDialog from '../../components/tasks/ConfirmDialog';

const DashboardPosts = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user || { currentUser: null });
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, postId: null });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const fetchUserPosts = async () => {
    if (!currentUser?._id) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      } else {
        showToast(t('auth.somethingWentWrong'), 'error');
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
      showToast(t('auth.somethingWentWrong'), 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [currentUser]);

  const handleDeleteTrigger = (postId) => {
    setConfirmDialog({ isOpen: true, postId });
  };

  const handleConfirmDelete = async () => {
    const postId = confirmDialog.postId;
    setConfirmDialog({ isOpen: false, postId: null });
    if (!postId || !currentUser?._id) return;

    try {
      const res = await fetch(`/api/post/deletepost/${postId}/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        showToast(t('dashboard.postDeletedSuccess'), 'success');
        setPosts(posts.filter(post => post._id !== postId));
      } else {
        showToast(data.message || t('auth.somethingWentWrong'), 'error');
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      showToast(t('auth.somethingWentWrong'), 'error');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={t('common.delete')}
        message={t('dashboard.deletePostConfirm')}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDialog({ isOpen: false, postId: null })}
      />

      <div className="flex justify-between items-center border-b border-gray-800/40 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white">{t('dashboard.yourPosts')}</h2>
          <p className="text-xs text-gray-400 mt-1">Manage and edit your published reflections.</p>
        </div>
        <Link
          to="/create-post"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs hover:scale-105 active:scale-95 transition-all duration-200 shadow-md shadow-purple-950/20"
        >
          <Plus className="w-3.5 h-3.5" />
          {t('dashboard.createPost')}
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
          <Loader className="w-8 h-8 animate-spin text-purple-500" />
          <span className="text-sm font-semibold">{t('common.loading')}</span>
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-gray-950/30 backdrop-blur-xl border border-gray-800/60 rounded-2xl p-8">
          <div className="p-4 rounded-full bg-purple-500/10 text-purple-400 mb-4">
            <FileText className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{t('dashboard.noPostsYet')}</h3>
          <p className="text-sm text-gray-400 max-w-sm mb-6">
            Share your mental health journey, stories, or achievements in a safe space with our community.
          </p>
          <Link
            to="/create-post"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-200"
          >
            {t('dashboard.createPost')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div 
              key={post._id} 
              className="group relative overflow-hidden bg-gray-950/40 backdrop-blur-xl border border-gray-800/80 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/5"
            >
              {/* Cover Image */}
              <div className="relative h-44 w-full overflow-hidden bg-gray-900 border-b border-gray-850">
                <img
                  src={post.image || "https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-950/80 backdrop-blur-md border border-gray-800 text-[10px] font-extrabold uppercase text-purple-400">
                  <Tag className="w-3 h-3" />
                  {post.category || 'general'}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-gray-400 text-[10px] font-semibold uppercase tracking-wider mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-base font-bold text-white line-clamp-1 leading-tight group-hover:text-purple-400 transition-colors duration-200">
                    {post.title}
                  </h3>
                  <div className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                {/* Card Footer Actions */}
                <div className="flex justify-end items-center gap-2 mt-5 border-t border-gray-900/60 pt-4">
                  <Link
                    to={`/dashboard?tab=posts`} // Safe path or toggle a details modal if needed
                    onClick={() => showToast("Click details view coming soon!", "info")}
                    className="p-2 rounded-xl bg-gray-900 text-gray-400 hover:text-white border border-gray-850 hover:bg-gray-850 transition-all duration-200"
                  >
                    <FileText className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDeleteTrigger(post._id)}
                    className="p-2 rounded-xl bg-rose-950/20 text-rose-450 hover:text-white border border-rose-500/20 hover:bg-rose-600 transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPosts;