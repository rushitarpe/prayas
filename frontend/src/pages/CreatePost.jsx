import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, MenuItem, Button, InputLabel, FormControl, Select, CircularProgress, Snackbar, Alert } from "@mui/material";
import { getFilePreview, uploadFile } from "../lib/appwrite/uploadImage";
import ReactQuill from "react-quill";
import { useTranslation } from "react-i18next";
import "react-quill/dist/quill.snow.css";
import DashboardSidebar from "../component/shared/DashboardSidebar";
import BottomNavBar from "../component/shared/BottomNavBar";

const CreatePost = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [file, setFile] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const title = urlParams.get('title');
    const content = urlParams.get('content');
    const category = urlParams.get('category');
    
    const newFormData = {};
    if (title) newFormData.title = title;
    if (content) newFormData.content = content;
    if (category) newFormData.category = category;
    
    if (Object.keys(newFormData).length > 0) {
      setFormData(prev => ({ ...prev, ...newFormData }));
    }
  }, [location.search]);
  const [createPostError, setCreatePostError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError(t('createPost.selectImage'));
        showSnackbar(t('createPost.selectImage'), "warning");
        return;
      }

      setImageUploading(true);
      setImageUploadError(null);

      const uploadedFile = await uploadFile(file);
      const postImageUrl = getFilePreview(uploadedFile.$id);

      setFormData({ ...formData, image: postImageUrl });
      showSnackbar(t('createPost.imageUploaded'), "success");

      if (postImageUrl) {
        setImageUploading(false);
      }
    } catch (error) {
      setImageUploadError(t('createPost.imageUploadFailed'));
      console.log(error);
      showSnackbar(t('createPost.imageUploadFailed'), "error");
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        showSnackbar(t('createPost.publishFailed'), "error");
        setCreatePostError(data.message);
        return;
      }

      showSnackbar(t('createPost.publishSuccess'), "success");
      setCreatePostError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      showSnackbar(t('createPost.publishFailed'), "error");
      setCreatePostError(t('createPost.publishFailed'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-[#030712] text-white">
      {/* Sidebar spacer & column */}
      <div className="hidden md:block w-[280px] flex-shrink-0">
        <DashboardSidebar />
      </div>

      <BottomNavBar />

      <div className="flex-1 min-h-[90vh] pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Premium Background Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto bg-gray-950/40 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(59,130,246,0.1)] relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            {t('createPost.title')}
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto text-base">
            {t('createPost.subtitle')}
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
            <TextField
              label={t('createPost.postTitlePlaceholder')}
              variant="outlined"
              required
              fullWidth
              value={formData.title || ''}
              InputLabelProps={{ style: { color: '#9ca3af' } }}
              InputProps={{ 
                style: { color: 'white' },
                sx: {
                  bgcolor: 'rgba(17, 24, 39, 0.4)',
                  borderRadius: '12px',
                  '& fieldset': { borderColor: '#374151' },
                  '&:hover fieldset': { borderColor: '#4b5563' },
                  '&.Mui-focused fieldset': { borderColor: '#8b5cf6' }
                }
              }}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />

            <FormControl fullWidth>
              <InputLabel style={{ color: '#9ca3af' }}>{t('createPost.categoryLabel')}</InputLabel>
              <Select
                value={formData.category || ''}
                label={t('createPost.categoryLabel')}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{ color: 'white' }}
                sx={{
                  bgcolor: 'rgba(17, 24, 39, 0.4)',
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4b5563' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#8b5cf6' }
                }}
              >
                <MenuItem value="anxiety">{t('createPost.anxiety')}</MenuItem>
                <MenuItem value="loneliness">{t('createPost.loneliness')}</MenuItem>
                <MenuItem value="sadness">{t('createPost.sadness')}</MenuItem>
                <MenuItem value="overthinking">{t('createPost.overthinking')}</MenuItem>
                <MenuItem value="motivation">{t('createPost.motivation')}</MenuItem>
                <MenuItem value="achievement">{t('createPost.achievement')}</MenuItem>
                <MenuItem value="gratitude">{t('createPost.gratitude')}</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="w-full p-6 bg-gray-950/40 rounded-2xl border border-gray-800/80 shadow-2xl relative overflow-hidden group">
            <div className="relative">
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
                <Button 
                  variant="contained" 
                  component="label"
                  sx={{
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #3b82f6 30%, #8b5cf6 90%)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 7px 14px rgba(59, 130, 246, 0.3)'
                    }
                  }}
                >
                  {t('createPost.chooseImage')}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #3b82f6 30%, #8b5cf6 90%)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 7px 14px rgba(59, 130, 246, 0.3)'
                    }
                  }}
                  onClick={handleUploadImage}
                >
                  {imageUploading ? <CircularProgress size={24} color="inherit" /> : t('createPost.uploadImage')}
                </Button>
              </div>

              {formData.image && (
                <div className="mt-6 border border-gray-800 rounded-2xl p-2 relative overflow-hidden bg-gray-900/20">
                  <div className="relative">
                    <img
                      src={formData.image}
                      alt="Uploaded"
                      className="w-full h-96 object-cover rounded-xl shadow-2xl"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {imageUploadError && (
            <p className="text-red-500 font-semibold animate-pulse text-sm text-center">{imageUploadError}</p>
          )}

          <div className="relative rounded-2xl overflow-hidden border border-gray-850 shadow-inner">
            <ReactQuill
              theme="snow"
              value={formData.content || ''}
              placeholder={t('createPost.editorPlaceholder')}
              className="h-64 bg-white text-black border-none"
              required
              onChange={(value) => setFormData({ ...formData, content: value })}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white rounded-xl font-bold text-lg hover:scale-[1.01] hover:shadow-lg hover:shadow-purple-950/20 active:scale-95 transition-all duration-200"
          >
            {t('createPost.shareStory')}
          </button>

          {createPostError && (
            <p className="text-red-500 mt-4 text-center font-semibold animate-pulse">{createPostError}</p>
          )}
        </form>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%', borderRadius: '12px' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      </div>
    </div>
  );
};

export default CreatePost;