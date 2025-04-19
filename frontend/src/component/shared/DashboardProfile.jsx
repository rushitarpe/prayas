import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const DashboardProfile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const profilePicRef = useRef();
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 bg-black">
      <div className="mb-10 p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-green-400/10 shadow-[0_0_25px_rgba(34,197,94,0.5)] text-center w-full max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-green-400 animate-pulse drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">
           Update Your Profile 
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-[0_0_30px_rgba(34,197,94,0.4)] rounded-2xl p-4 sm:p-6 gap-8 border border-green-600/20 transition-shadow hover:shadow-[0_0_45px_rgba(34,197,94,0.6)]">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center gap-4">
          <input
            type="file"
            accept="image/*"
            hidden
            ref={profilePicRef}
            onChange={handleImageChange}
          />

          <div
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-green-400 cursor-pointer shadow-lg hover:shadow-green-400/50 transition-shadow"
            onClick={() => profilePicRef.current.click()}
          >
            <img
              src={currentUser.profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-gray-300">Click to change photo</p>
        </div>

        {/* Form Section */}
        <form className="flex flex-col gap-4 w-full md:w-2/3">
          <input
            type="text"
            placeholder="Username"
            defaultValue={currentUser.username}
            className="bg-gray-900 text-white border border-gray-600 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            placeholder="Email"
            defaultValue={currentUser.email}
            disabled
            className="bg-gray-900 text-white border border-gray-600 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-900 text-white border border-gray-600 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
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
          <button className="text-red-500 font-semibold text-sm hover:underline hover:text-red-400 transition">
            Delete
          </button>
        </div>
        <div className="px-6 py-3 rounded-xl bg-gradient-to-br from-red-900/40 via-black to-red-900/40 shadow-[0_0_20px_rgba(239,68,68,0.4)] border border-red-600 text-center">
          <button className="text-red-500 font-semibold text-sm hover:underline hover:text-red-400 transition">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;