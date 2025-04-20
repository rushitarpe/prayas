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
} from '../../redux/user/userSlice';
import { getFilePreview, uploadFile } from '../../lib/appwrite/uploadImage';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const DashboardProfile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);
  const profilePicRef = useRef();

  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ open: false, severity: 'info', message: '' });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || '',
        email: currentUser.email || '',
        password: '',
      });
    }
  }, [currentUser]);

  const showToast = (severity, message) => {
    setToast({ open: true, severity, message });
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const uploadImage = async () => {
    if (!imageFile) return currentUser?.profilePicture || '';
    try {
      const uploadedFile = await uploadFile(imageFile);
      return getFilePreview(uploadedFile.$id);
    } catch (error) {
      console.error('Image upload error:', error);
      showToast('error', 'Image upload failed. Please try again!');
      return currentUser?.profilePicture || '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateStart());

    try {
      const profilePicture = await uploadImage();
      const updateProfile = { ...formData, profilePicture };

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateProfile),
      });

      const data = await res.json();
      if (!res.ok || data.success === false) {
        dispatch(updateFailure(data.message));
        return showToast('error', data.message || 'Update failed!');
      }

      dispatch(updateSuccess(data));
      showToast('success', 'Profile updated successfully!');
    } catch (error) {
      dispatch(updateFailure(error.message));
      showToast('error', 'Update failed. Please try again!');
    }
  };

  const handleDeleteUser = async () => {
    dispatch(deleteUserStart());
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
        return showToast('error', data.message || 'Delete failed!');
      }

      dispatch(deleteUserSuccess());
      showToast('success', 'Account deleted successfully!');
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      showToast('error', 'Failed to delete user.');
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', { method: 'POST' });
      const data = await res.json();

      if (!res.ok) {
        return showToast('error', data.message || 'Sign out failed!');
      }

      dispatch(signOutSuccess());
      showToast('success', 'Signed out successfully!');
    } catch (error) {
      showToast('error', 'Failed to sign out.');
    }
  };

  if (!currentUser) {
    return <div className="text-white text-center mt-10">Loading user profile...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 bg-black">
      <div className="mb-10 p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-green-400/10 shadow-[0_0_25px_rgba(34,197,94,0.5)] text-center w-full max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-green-400 animate-pulse drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">
          Update Your Profile
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-[0_0_30px_rgba(34,197,94,0.4)] rounded-2xl p-4 sm:p-6 gap-8 border border-green-600/20">
        <div className="flex flex-col items-center gap-4">
          <input
            type="file"
            accept="image/*"
            hidden
            ref={profilePicRef}
            onChange={handleImageChange}
          />
          <div
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-green-400 cursor-pointer shadow-lg hover:shadow-green-400/50 bg-gray-800"
            onClick={() => profilePicRef.current.click()}
          >
            {imageFileUrl || currentUser.profilePicture ? (
              <img
                src={imageFileUrl || currentUser.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-green-400 text-3xl font-bold">
                {currentUser.username?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <p className="text-sm text-gray-300">Click to change photo</p>
        </div>

        <form className="flex flex-col gap-4 w-full md:w-2/3" onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="bg-gray-900 text-white border border-gray-600 rounded-lg p-3"
            disabled={loading}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-900 text-white border border-gray-600 rounded-lg p-3"
            disabled={loading}
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-900 text-white border border-gray-600 rounded-lg p-3 pr-10 w-full"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl mt-6">
        <div className="px-6 py-3 rounded-xl bg-gradient-to-br from-red-900/40 to-red-900/40 border border-red-600 text-center">
          <button
            onClick={handleDeleteUser}
            className="text-red-500 font-semibold hover:underline"
            disabled={loading}
          >
            Delete
          </button>
        </div>
        <div className="px-6 py-3 rounded-xl bg-gradient-to-br from-red-900/40 to-red-900/40 border border-red-600 text-center">
          <button
            onClick={handleSignout}
            className="text-red-500 font-semibold hover:underline"
            disabled={loading}
          >
            Sign Out
          </button>
        </div>
      </div>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DashboardProfile;
