import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TextField, MenuItem, Button, InputLabel, FormControl, Select, CircularProgress, Snackbar, Alert } from "@mui/material"
import { getFilePreview, uploadFile } from "../lib/appwrite/uploadImage"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const CreatePost = () => {
  const navigate = useNavigate()

  const [file, setFile] = useState(null)
  const [imageUploadError, setImageUploadError] = useState(null)
  const [imageUploading, setImageUploading] = useState(false)
  const [formData, setFormData] = useState({})
  const [createPostError, setCreatePostError] = useState(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity })
  }

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image!")
        showSnackbar("Please select an image!", "warning")
        return
      }

      setImageUploading(true)
      setImageUploadError(null)

      const uploadedFile = await uploadFile(file)
      const postImageUrl = getFilePreview(uploadedFile.$id)

      setFormData({ ...formData, image: postImageUrl })
      showSnackbar("Image Uploaded Successfully!", "success")

      if (postImageUrl) {
        setImageUploading(false)
      }
    } catch (error) {
      setImageUploadError("Image upload failed")
      console.log(error)
      showSnackbar("Image upload failed!", "error")
      setImageUploading(false)
    }
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   try {
  //     const res = await fetch("/api/post/create", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     })

  //     const data = await res.json()

  //     if (!res.ok) {
  //       showSnackbar("Something went wrong! Please try again.", "error")
  //       setCreatePostError(data.message)
  //       return
  //     }

  //     showSnackbar("Article Published Successfully!", "success")
  //     setCreatePostError(null)
  //     navigate(`/post/${data.slug}`)
  //   } catch (error) {
  //     showSnackbar("Something went wrong! Please try again.", "error")
  //     setCreatePostError("Something went wrong! Please try again.")
  //   }
  // }

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen bg-black text-white border-4 border-blue-500 rounded-2xl shadow-2xl animate-glow-box">
      <h1 className="text-center text-4xl font-extrabold mb-10 animate-fadeIn text-white">
        Share Your Feelings
      </h1>

      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between animate-slideIn">
          <TextField
            label="Post Title (e.g., Feeling Anxious, A Bad Day)"
            variant="outlined"
            required
            fullWidth
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <FormControl fullWidth>
            <InputLabel style={{ color: 'white' }}>Category</InputLabel>
            <Select
              value={formData.category || ''}
              label="Category"
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{ color: 'white' }}
            >
              <MenuItem value="anxiety">Anxiety</MenuItem>
              <MenuItem value="loneliness">Loneliness</MenuItem>
              <MenuItem value="sadness">Sadness</MenuItem>
              <MenuItem value="overthinking">Overthinking</MenuItem>
              <MenuItem value="motivation">Seeking Motivation</MenuItem>
              <MenuItem value="achievement">Small Wins</MenuItem>
              <MenuItem value="gratitude">Gratitude</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="w-full p-6 bg-gray-900 rounded-xl border-4 border-blue-400 shadow-xl hover:shadow-2xl transition-all duration-300 animate-glow-box">
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
            <Button variant="contained" component="label">
              Choose Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleUploadImage}
            >
              {imageUploading ? <CircularProgress size={24} /> : "Upload Image"}
            </Button>
          </div>

          {formData.image && (
            <div className="mt-6 border-4 border-blue-500 rounded-xl p-2 animate-glow">
              <img
                src={formData.image}
                alt="Uploaded"
                className="w-full h-96 object-cover rounded-lg shadow-2xl border border-blue-500"
              />
            </div>
          )}
        </div>

        {imageUploadError && (
          <p className="text-red-500 animate-bounce">{imageUploadError}</p>
        )}

        <ReactQuill
          theme="snow"
          placeholder="Express your thoughts, what you're feeling, or any story you'd like to share..."
          className="h-64 bg-white text-black border border-gray-300 rounded-lg shadow-md focus:ring-4 focus:ring-blue-500 transition-all duration-300"
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />

        <Button
          variant="contained"
          color="success"
          type="submit"
          fullWidth
          style={{ height: "48px", fontWeight: "bold" }}
        >
          Share Your Story
        </Button>

        {createPostError && (
          <p className="text-red-500 mt-4 animate-bounce">{createPostError}</p>
        )}
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CreatePost;