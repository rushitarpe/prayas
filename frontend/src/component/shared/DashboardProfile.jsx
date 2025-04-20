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
import { getFilePreview, uploadFile } from "../../lib/appwrite/uploadImage"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

const DashboardProfile = () => {
  const { currentUser } = useSelector((state) => state.user || { currentUser: null });
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
      showToast('error', 'Image upload failed. Please try again!');
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
        showToast('error', 'Update user failed. Please try again!');
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
        showToast('success', 'User updated successfully.');
      }
    } catch (error) {
      showToast('error', 'Update user failed. Please try again!');
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
        showToast('error', data.message || 'Failed to delete user.');
      } else {
        dispatch(deleteUserSuccess());
        showToast('success', 'Account deleted successfully.');
      }
    } catch (error) {
      console.log(error);
      dispatch(deleteUserFailure(error.message));
      showToast('error', 'An error occurred while deleting the account.');
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
      <div className="w-full h-full flex items-center justify-center bg-gray-700">
        <span className="text-3xl font-bold text-green-400">{initial}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 bg-black">
      <div className="mb-10 p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-green-400/10 shadow-[0_0_25px_rgba(34,197,94,0.5)] text-center w-full max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-green-400 animate-pulse drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">
          Update Your Profile
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-[0_0_30px_rgba(34,197,94,0.4)] rounded-2xl p-4 sm:p-6 gap-8 border border-green-600/20 transition-shadow hover:shadow-[0_0_45px_rgba(34,197,94,0.6)]">
        <div className="flex flex-col items-center gap-4">
          <input
            type="file"
            accept="image/*"
            hidden
            ref={profilePicRef}
            onChange={handleImageChange}
          />
          <div
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-green-400 cursor-pointer shadow-lg hover:shadow-green-400/50 transition-shadow relative bg-gray-800"
            onClick={() => profilePicRef.current.click()}
          >
            {(imageFileUrl || currentUser?.profilePicture) ? (
              <img
                src={imageFileUrl || currentUser?.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.querySelector('.fallback-avatar')?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`fallback-avatar ${(imageFileUrl || currentUser?.profilePicture) ? 'hidden' : ''}`}>
              <ProfileAvatar username={currentUser?.username} />
            </div>
          </div>
          <p className="text-sm text-gray-300">Click to change photo</p>
        </div>

        <form className="flex flex-col gap-4 w-full md:w-2/3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            defaultValue={currentUser?.username || ''}
            className="bg-gray-900 text-white border border-gray-600 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={currentUser?.email || ''}
            className="bg-gray-900 text-white border border-gray-600 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="bg-gray-900 text-white border border-gray-600 rounded-lg p-3 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
              onChange={handleChange}
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
            className="bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition shadow-md shadow-green-400/20"
          >
            Update Profile
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl mt-6">
        <div className="px-6 py-3 rounded-xl bg-gradient-to-br from-red-900/40 via-black to-red-900/40 shadow-[0_0_20px_rgba(239,68,68,0.4)] border border-red-600 text-center">
          <button 
            onClick={handleOpenDialog}
            className="text-red-500 font-semibold text-sm hover:underline hover:text-red-400 transition"
          >
            Delete
          </button>
        </div>
        <div className="px-6 py-3 rounded-xl bg-gradient-to-br from-red-900/40 via-black to-red-900/40 shadow-[0_0_20px_rgba(239,68,68,0.4)] border border-red-600 text-center">
          <button 
            onClick={handleSignout}
            className="text-red-500 font-semibold text-sm hover:underline hover:text-red-400 transition"
          >
            Sign Out
          </button>
        </div>
      </div>

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="delete-confirmation-description"
      >
        <DialogTitle className="text-red-500 font-bold text-lg">Delete Account</DialogTitle>
        <DialogContent>
          <p id="delete-confirmation-description" className="text-sm text-black dark:text-black">
            Are you absolutely sure you want to delete your account? This action cannot be undone!
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={handleCloseToast} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DashboardProfile;
