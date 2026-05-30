import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { 
  MessageSquare, 
  Trash2, 
  Calendar, 
  Heart, 
  Loader 
} from 'lucide-react';
import Toast from '../../components/tasks/Toast';
import ConfirmDialog from '../../components/tasks/ConfirmDialog';

const DashboardComments = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user || { currentUser: null });
  
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, commentId: null });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/comment/getcomments?limit=100');
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments || []);
      } else {
        showToast(t('auth.somethingWentWrong'), 'error');
      }
    } catch (error) {
      console.error("Error fetching all comments:", error);
      showToast(t('auth.somethingWentWrong'), 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDeleteTrigger = (commentId) => {
    setConfirmDialog({ isOpen: true, commentId });
  };

  const handleConfirmDelete = async () => {
    const commentId = confirmDialog.commentId;
    setConfirmDialog({ isOpen: false, commentId: null });
    if (!commentId || !currentUser?._id) return;

    try {
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        showToast(t('dashboard.commentDeletedSuccess'), 'success');
        setComments(comments.filter(c => c._id !== commentId));
      } else {
        showToast(data.message || t('auth.somethingWentWrong'), 'error');
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
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
        message={t('dashboard.deleteCommentConfirm')}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDialog({ isOpen: false, commentId: null })}
      />

      <div>
        <h2 className="text-xl font-bold text-white">{t('dashboard.allComments')}</h2>
        <p className="text-xs text-gray-400 mt-1">Moderate and review all member comments globally.</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
          <Loader className="w-8 h-8 animate-spin text-purple-500" />
          <span className="text-sm font-semibold">{t('common.loading')}</span>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-20 bg-gray-950/30 backdrop-blur-xl border border-gray-800/60 rounded-2xl p-8">
          <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-base font-bold text-white mb-1">{t('dashboard.noCommentsYet')}</h3>
        </div>
      ) : (
        <div className="overflow-x-auto bg-gray-950/40 backdrop-blur-xl border border-gray-800/80 rounded-2xl shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-850 text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
                <th className="py-4 px-6">{t('dashboard.commentContent')}</th>
                <th className="py-4 px-6">Post ID</th>
                <th className="py-4 px-6">{t('dashboard.author')}</th>
                <th className="py-4 px-6">{t('dashboard.likes')}</th>
                <th className="py-4 px-6">{t('dashboard.date')}</th>
                <th className="py-4 px-6 text-right">{t('dashboard.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-900/60 text-sm">
              {comments.map((comment) => (
                <tr key={comment._id} className="hover:bg-white/5 transition-colors duration-150">
                  <td className="py-4 px-6 font-semibold text-white max-w-sm break-words leading-relaxed">
                    {comment.content}
                  </td>
                  <td className="py-4 px-6 text-gray-450 font-mono text-xs">
                    {comment.postId}
                  </td>
                  <td className="py-4 px-6 text-gray-300 font-semibold">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-[10px] text-gray-400 font-bold border border-gray-700">
                        C
                      </div>
                      <span className="truncate max-w-[120px]">{comment.userId}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-300 font-bold">
                    <div className="flex items-center gap-1.5 text-pink-500 text-xs">
                      <Heart className="w-4 h-4 fill-pink-500/20" />
                      <span>{comment.numberOfLikes}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-400">
                    <div className="flex items-center gap-1 text-xs">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleDeleteTrigger(comment._id)}
                      className="p-2 rounded-xl bg-rose-950/20 text-rose-450 hover:text-white border border-rose-500/20 hover:bg-rose-600 transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardComments;