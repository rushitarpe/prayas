import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  Trash2, 
  Calendar, 
  Tag, 
  Search,
  BookOpen,
  X,
  Heart,
  MessageCircle,
  Loader
} from 'lucide-react';
import Toast from '../components/tasks/Toast';
import ConfirmDialog from '../components/tasks/ConfirmDialog';

const PostFeed = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user || { currentUser: null });
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Modal for viewing full post reflections
  const [viewingPost, setViewingPost] = useState(null);
  
  // Deleting and Toast states
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, post: null });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const fetchFeedPosts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('limit', '100');
      if (selectedCategory && selectedCategory !== 'all') {
        queryParams.append('category', selectedCategory);
      }
      if (searchTerm) {
        queryParams.append('searchTerm', searchTerm);
      }

      const res = await fetch(`/api/post/getposts?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      } else {
        showToast(t('auth.somethingWentWrong'), 'error');
      }
    } catch (error) {
      console.error("Error fetching feed posts:", error);
      showToast(t('auth.somethingWentWrong'), 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedPosts();
  }, [selectedCategory, searchTerm]);

  const handleDeleteTrigger = (post, e) => {
    e.stopPropagation(); // Stop opening view modal
    setConfirmDialog({ isOpen: true, post });
  };

  const handleConfirmDelete = async () => {
    const post = confirmDialog.post;
    setConfirmDialog({ isOpen: false, post: null });
    if (!post || !currentUser?._id) return;

    try {
      // Admins bypass ownership inside backend controller deletepost
      const res = await fetch(`/api/post/deletepost/${post._id}/${post.userId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        showToast(t('dashboard.postDeletedSuccess'), 'success');
        setPosts(posts.filter(p => p._id !== post._id));
        if (viewingPost?._id === post._id) {
          setViewingPost(null);
        }
      } else {
        showToast(data.message || t('auth.somethingWentWrong'), 'error');
      }
    } catch (error) {
      console.error("Error deleting post from feed:", error);
      showToast(t('auth.somethingWentWrong'), 'error');
    }
  };

  const categories = [
    { value: 'all', label: 'All Reflections' },
    { value: 'gratitude', label: 'Gratitude' },
    { value: 'achievement', label: 'Achievements' },
    { value: 'anxiety', label: 'Anxiety' },
    { value: 'loneliness', label: 'Loneliness' },
    { value: 'sadness', label: 'Sadness' },
    { value: 'overthinking', label: 'Overthinking' },
    { value: 'motivation', label: 'Seeking Motivation' }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />

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

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Community Reflections
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            Read positive stories, completed task reflections, and shared mental health experiences from our safe community.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-gray-950/40 backdrop-blur-xl border border-gray-800/80 p-4 rounded-2xl shadow-lg">
          {/* Categories Tab Group */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  selectedCategory === cat.value
                    ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/25 border border-purple-500/30 text-white shadow-md'
                    : 'bg-transparent border border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search reflections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900/60 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
            />
          </div>
        </div>

        {/* Feed Posts Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400 gap-3">
            <Loader className="w-8 h-8 animate-spin text-purple-500" />
            <span className="text-sm font-semibold">{t('common.loading')}</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-24 bg-gray-950/30 backdrop-blur-xl border border-gray-800/60 rounded-3xl p-8">
            <BookOpen className="w-12 h-12 text-gray-500 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">No reflections shared yet</h3>
            <p className="text-sm text-gray-400 max-w-sm mb-6">
              Be the first to share your thoughts or task reflections with the community!
            </p>
            <Link
              to="/create-post"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Share Your Reflection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div 
                key={post._id} 
                onClick={() => setViewingPost(post)}
                className="group relative overflow-hidden bg-gray-950/40 backdrop-blur-xl border border-gray-800/80 rounded-2xl flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-purple-950/5"
              >
                {/* Cover Image */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-900 border-b border-gray-850">
                  <img
                    src={post.image || "https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-950/80 backdrop-blur-md border border-gray-800 text-[10px] font-extrabold uppercase text-purple-400">
                    <Tag className="w-3 h-3" />
                    {post.category || 'general'}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-gray-950/20">
                  <div>
                    {/* Author Meta */}
                    <div className="flex items-center gap-2.5 mb-3.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white border border-gray-700 shadow-inner">
                        {post.userId ? post.userId.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-200">Reflections User</p>
                        <p className="text-[10px] text-gray-400 font-semibold">{new Date(post.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug line-clamp-1 group-hover:text-purple-400 transition-colors duration-200 mb-2">
                      {post.title}
                    </h3>
                    <div className="text-xs text-gray-400 line-clamp-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>

                  {/* Actions (Delete for admin, click details for others) */}
                  <div className="flex items-center justify-between mt-6 border-t border-gray-900/60 pt-4 text-xs font-bold text-gray-400">
                    <span className="inline-flex items-center gap-1 text-[11px] group-hover:text-purple-400 transition-colors">
                      <BookOpen className="w-3.5 h-3.5" />
                      Read Full Story
                    </span>

                    {currentUser?.isAdmin && (
                      <button
                        onClick={(e) => handleDeleteTrigger(post, e)}
                        className="p-2 rounded-xl bg-rose-950/20 text-rose-450 hover:text-white border border-rose-500/20 hover:bg-rose-600 transition-all duration-200 relative z-20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Viewing full post modal overlay */}
      {viewingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col justify-between shadow-2xl relative animate-in zoom-in-95 duration-200">
            {/* Modal Header cover */}
            <div className="relative h-60 w-full bg-gray-950 border-b border-gray-800 flex-shrink-0">
              <img
                src={viewingPost.image || "https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600"}
                alt={viewingPost.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={() => setViewingPost(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-950/80 border border-gray-800 text-gray-400 hover:text-white transition-all shadow"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title inside cover */}
              <div className="absolute bottom-4 left-6 right-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30 text-[10px] font-extrabold uppercase mb-2">
                  {viewingPost.category || 'general'}
                </span>
                <h2 className="text-lg md:text-xl font-bold text-white drop-shadow-md">
                  {viewingPost.title}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-6">
              {/* Author Row */}
              <div className="flex items-center justify-between border-b border-gray-850 pb-4 text-xs font-semibold text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-[10px] font-bold text-purple-400 border border-gray-700">
                    {viewingPost.userId ? viewingPost.userId.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Reflections Member</p>
                    <p className="text-[10px] text-gray-400">Member ID: {viewingPost.userId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span>Published on {new Date(viewingPost.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Content text */}
              <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-4 font-normal" dangerouslySetInnerHTML={{ __html: viewingPost.content }} />
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-gray-850 bg-gray-950/40 flex justify-between items-center flex-shrink-0">
              <span className="text-[10px] text-gray-500 uppercase font-semibold">Prayas Community Space</span>
              <button
                onClick={() => setViewingPost(null)}
                className="px-5 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 font-bold hover:text-white hover:bg-gray-850 transition-all text-xs"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostFeed;
