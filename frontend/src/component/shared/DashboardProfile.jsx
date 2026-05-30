import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../../redux/user/userSlice";
import { getFilePreview, uploadFile } from "../../lib/appwrite/uploadImage";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { User, Mail, Lock, Eye, EyeOff, Trash2, LogOut, Camera } from 'lucide-react';

const DashboardProfile = () => {
  const { t } = useTranslation();
  const { currentUser, error, loading } = useSelector((state) => state.user || { currentUser: null });
  const profilePicRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ open: false, severity: 'info', message: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  useEffect(() => {
    if (currentUser && currentUser.profilePicture) {
      setImageFileUrl(currentUser.profilePicture);
    }
  }, [currentUser]);

  const showToast = (severity, message) => {
    setToast({ open: true, severity, message });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const uploadImage = async () => {
    if (!imageFile) return currentUser?.profilePicture || '';

    try {
      const uploadedFile = await uploadFile(imageFile);
      const profilePictureUrl = getFilePreview(uploadedFile.$id);
      return profilePictureUrl;
    } catch (error) {
      showToast('error', t('profile.imageUploadFailed'));
      console.log("Image upload failed: ", error);
      return currentUser?.profilePicture || '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateStart());
      const profilePicture = await uploadImage();

      const updateProfile = {
        ...formData,
        profilePicture,
      };

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateProfile),
      });

      const data = await res.json();

      if (data.success === false) {
        showToast('error', t('profile.updateFailed'));
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
        showToast('success', t('profile.updateSuccess'));
      }
    } catch (error) {
      showToast('error', t('profile.updateFailed'));
      dispatch(updateFailure(error.message));
    }
  };

  const handleOpenDialog = (e) => {
    e.preventDefault();
    setOpenDialog(true);
  };

  const handleCloseDialog = (e) => {
    e.preventDefault();
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    setOpenDialog(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
        showToast('error', data.message || t('profile.deleteFailed'));
      } else {
        dispatch(deleteUserSuccess());
        showToast('success', t('profile.deleteSuccess'));
      }
    } catch (error) {
      console.log(error);
      dispatch(deleteUserFailure(error.message));
      showToast('error', t('profile.deleteFailed'));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ProfileAvatar = ({ username }) => {
    const initial = username ? username.charAt(0).toUpperCase() : 'U';
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800">
        <span className="text-3xl font-bold text-purple-400">{initial}</span>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Title Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          {t('profile.updateTitle')}
        </h2>
        <p className="text-xs text-gray-400 mt-1">Update your password, email, profile picture, or manage account settings.</p>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch gap-8 w-full">
        {/* Left Side: Avatar selector glass card */}
        <div className="lg:w-1/3 bg-gray-950/40 backdrop-blur-xl border border-gray-800/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl" />
          
          <input
            type="file"
            accept="image/*"
            hidden
            ref={profilePicRef}
            onChange={handleImageChange}
          />
          
          <div className="relative mb-6">
            <div
              className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/35 cursor-pointer shadow-lg hover:shadow-purple-500/20 hover:border-purple-500/60 transition-all duration-300 relative bg-gray-800 group/avatar"
              onClick={() => profilePicRef.current.click()}
            >
              {(imageFileUrl || currentUser?.profilePicture) ? (
                <img
                  src={imageFileUrl || currentUser?.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover group-hover/avatar:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.querySelector('.fallback-avatar')?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`fallback-avatar ${(imageFileUrl || currentUser?.profilePicture) ? 'hidden' : ''}`}>
                <ProfileAvatar username={currentUser?.username} />
              </div>

              {/* Upload overlay */}
              <div className="absolute inset-0 bg-gray-950/60 opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center text-white transition-opacity duration-300">
                <Camera className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-1">
            {currentUser?.username || t('header.user')}
          </h3>
          <p className="text-xs text-gray-400 font-medium mb-4">
            {currentUser?.email || t('header.noEmail')}
          </p>
          
          <button
            onClick={() => profilePicRef.current.click()}
            className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 text-xs font-semibold text-gray-300 hover:text-white transition-all duration-200"
          >
            {t('profile.clickToChangePhoto')}
          </button>
        </div>

        {/* Right Side: Update details form */}
        <div className="lg:w-2/3 bg-gray-950/40 backdrop-blur-xl border border-gray-800/80 rounded-2xl p-8 shadow-xl relative overflow-hidden">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username field */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                {t('profile.usernamePlaceholder')}
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
                <input
                  type="text"
                  name="username"
                  defaultValue={currentUser?.username || ''}
                  className="w-full bg-gray-900/60 border border-gray-800 focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/35 text-white text-sm rounded-xl py-3 pl-11 pr-4 placeholder-gray-500 focus:outline-none transition-all duration-200"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                {t('profile.emailPlaceholder')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  defaultValue={currentUser?.email || ''}
                  className="w-full bg-gray-900/60 border border-gray-800 focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/35 text-white text-sm rounded-xl py-3 pl-11 pr-4 placeholder-gray-500 focus:outline-none transition-all duration-200"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                {t('profile.passwordPlaceholder')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="w-full bg-gray-900/60 border border-gray-800 focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/35 text-white text-sm rounded-xl py-3 pl-11 pr-11 placeholder-gray-500 focus:outline-none transition-all duration-200"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit btn */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white rounded-xl font-bold text-sm hover:scale-[1.01] hover:shadow-lg hover:shadow-purple-950/20 active:scale-95 transition-all duration-200"
            >
              {loading ? t('profile.updating') : t('profile.updateBtn')}
            </button>
          </form>
        </div>
      </div>

      {/* Danger Zone panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-7xl">
        {/* Delete Account */}
        <div className="p-6 bg-gray-950/40 backdrop-blur-xl border border-rose-500/10 rounded-2xl flex flex-col justify-between shadow-lg">
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5 text-rose-500">
              <Trash2 className="w-4 h-4" />
              Danger Zone
            </h4>
            <p className="text-xs text-gray-400 mb-5 leading-relaxed">
              Once you delete your account, there is no going back. Please be absolutely certain.
            </p>
          </div>
          <button 
            onClick={handleOpenDialog}
            className="w-full py-2.5 rounded-xl bg-rose-950/25 border border-rose-500/20 text-rose-450 hover:text-white hover:bg-rose-600 font-semibold text-xs active:scale-95 transition-all duration-200"
          >
            {t('profile.deleteAccount')}
          </button>
        </div>

        {/* Sign Out */}
        <div className="p-6 bg-gray-950/40 backdrop-blur-xl border border-gray-800/80 rounded-2xl flex flex-col justify-between shadow-lg">
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5 text-gray-300">
              <LogOut className="w-4 h-4 text-purple-400" />
              Sign Out Session
            </h4>
            <p className="text-xs text-gray-400 mb-5 leading-relaxed">
              Log out of your current session. You can sign back in at any time.
            </p>
          </div>
          <button 
            onClick={handleSignout}
            className="w-full py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 font-semibold text-xs hover:text-white hover:bg-gray-800 active:scale-95 transition-all duration-200"
          >
            {t('common.signOut')}
          </button>
        </div>
      </div>

      {/* Styled Dialog modal */}
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="delete-confirmation-description"
        PaperProps={{
          sx: {
            bgcolor: '#111827',
            backgroundImage: 'none',
            border: '1px solid #1f2937',
            borderRadius: '20px',
            color: 'white',
            p: 2
          }
        }}
      >
        <DialogTitle className="text-rose-500 font-bold text-lg">{t('profile.deleteConfirmTitle')}</DialogTitle>
        <DialogContent>
          <p id="delete-confirmation-description" className="text-sm text-gray-300">
            {t('profile.deleteConfirmMessage')}
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: '#9ca3af', fontWeight: 'bold' }}>
            {t('profile.cancelBtn')}
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            sx={{ 
              bgcolor: '#ef4444', 
              color: 'white', 
              fontWeight: 'bold',
              borderRadius: '10px',
              px: 3,
              '&:hover': { bgcolor: '#dc2626' }
            }} 
            variant="contained"
          >
            {t('profile.deleteBtn')}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={handleCloseToast} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: '100%', borderRadius: '12px' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DashboardProfile;
