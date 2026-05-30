import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  Trash2, 
  Tag, 
  Calendar, 
  User,
  Loader
} from 'lucide-react';
import Toast from '../../components/tasks/Toast';
import ConfirmDialog from '../../components/tasks/ConfirmDialog';

const DashBoardAdminPost = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user || { currentUser: null });
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, post: null });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const fetchAllPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/post/getposts?limit=100');
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      } else {
        showToast(t('auth.somethingWentWrong'), 'error');
      }
    } catch (error) {
      console.error("Error fetching all posts:", error);
      showToast(t('auth.somethingWentWrong'), 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const handleDeleteTrigger = (post) => {
    setConfirmDialog({ isOpen: true, post });
  };

  const handleConfirmDelete = async () => {
    const post = confirmDialog.post;
    setConfirmDialog({ isOpen: false, post: null });
    if (!post || !currentUser?._id) return;

    try {
      // In getPosts, we retrieve posts. The backend deletePost requires the owner's userId,
      // but wait! If we are an Admin, we bypassed the check! The controller signature is deletepost(postId, userId).
      // Let's pass the post's owner userId as req.params.userId!
      // In backend: router.delete("/deletepost/:postId/:userId", verifyToken, deletepost)
      // Since the post has a userId field, we can pass post.userId!
      // The backend check is `if (!req.user || (req.user.id !== req.params.userId && !req.user.isAdmin))`.
      // So if req.user.isAdmin is true, it passes! This works perfectly!
      const res = await fetch(`/api/post/deletepost/${post._id}/${post.userId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        showToast(t('dashboard.postDeletedSuccess'), 'success');
        setPosts(posts.filter(p => p._id !== post._id));
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
        onCancel={() => setConfirmDialog({ isOpen: false, post: null })}
      />

      <div>
        <h2 className="text-xl font-bold text-white">{t('dashboard.allPosts')}</h2>
        <p className="text-xs text-gray-400 mt-1">Moderate and manage all community articles globally.</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
          <Loader className="w-8 h-8 animate-spin text-purple-500" />
          <span className="text-sm font-semibold">{t('common.loading')}</span>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 bg-gray-950/30 backdrop-blur-xl border border-gray-800/60 rounded-2xl p-8">
          <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-base font-bold text-white mb-1">{t('dashboard.noPostsYet')}</h3>
        </div>
      ) : (
        <div className="overflow-x-auto bg-gray-950/40 backdrop-blur-xl border border-gray-800/80 rounded-2xl shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-850 text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
                <th className="py-4 px-6">{t('dashboard.postImage')}</th>
                <th className="py-4 px-6">{t('dashboard.postTitle')}</th>
                <th className="py-4 px-6">{t('dashboard.category')}</th>
                <th className="py-4 px-6">{t('dashboard.author')}</th>
                <th className="py-4 px-6">{t('dashboard.date')}</th>
                <th className="py-4 px-6 text-right">{t('dashboard.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-900/60 text-sm">
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-white/5 transition-colors duration-150 group">
                  <td className="py-3 px-6">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-14 h-9 object-cover rounded-md border border-gray-800 shadow"
                    />
                  </td>
                  <td className="py-3 px-6 font-bold text-white max-w-xs truncate">
                    {post.title}
                  </td>
                  <td className="py-3 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold">
                      <Tag className="w-3 h-3" />
                      {post.category || 'general'}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-gray-300 font-semibold flex items-center gap-2 mt-2 border-0">
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-[10px] text-gray-400 font-bold border border-gray-700">
                      U
                    </div>
                    <span className="truncate max-w-[100px]">{post.userId}</span>
                  </td>
                  <td className="py-3 px-6 text-gray-400">
                    <div className="flex items-center gap-1 text-xs">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-right">
                    <button
                      onClick={() => handleDeleteTrigger(post)}
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

export default DashBoardAdminPost;