import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-600 p-6">
      <div className="relative w-full max-w-4xl flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">
        {/* Welcome Back Section */}
        <div className="w-full md:w-1/2 p-6 text-white text-center md:text-left animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500 animate-text-glow">Welcome Back!</h1>
          <p className="text-lg mt-4">We're excited to see you again.</p>
          <p className="mt-6 text-white/80">Sign in to continue your journey with Prayas.</p>
          <div className="mt-6 p-4 bg-white/20 rounded-lg shadow-md">
            <p className="text-white text-lg font-semibold">Your adventure awaits!</p>
          </div>
        </div>

        {/* Sign In Form */}
        <div className="w-full md:w-1/2 p-6 animate-slide-in-right">
          <div className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl p-6 md:p-8 border border-white/20">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white animate-pulse">Sign In</h2>
              <p className="text-white/80">Access your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-white/60" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
                    placeholder="Email address"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-white/60" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-white/60" /> : <Eye className="h-5 w-5 text-white/60" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-300 animate-button-glow"
              >
                Sign In
              </button>
            </form>

            <p className="mt-6 text-center text-white/80">
              Don't have an account? <Link to='/sign-up' > <a  className="text-blue-400 font-semibold hover:text-blue-300">Sign up</a></Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;