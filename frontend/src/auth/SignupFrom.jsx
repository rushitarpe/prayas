import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useTranslation } from 'react-i18next';
import GoogleAuth from '../component/shared/GoogleAuth';

const Toast = ({ message, type }) => (
  <div className={`fixed top-4 right-4 flex items-center gap-2 px-4 py-3 rounded shadow-lg animate-in fade-in slide-in-from-top-4 ${
    type === 'success' 
      ? 'bg-green-500 text-white' 
      : 'bg-red-500 text-white'
  }`}>
    {type === 'success' ? (
      <Check className="w-5 h-5" />
    ) : (
      <AlertCircle className="w-5 h-5" />
    )}
    <p className="font-medium">{message}</p>
  </div>
);

const SignupForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username) {
      newErrors.username = t('auth.usernameRequired');
    }
    if (!formData.email) {
      newErrors.email = t('auth.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.invalidEmail');
    }
    if (formData.password.length < 8) {
      newErrors.password = t('auth.passwordMinLength');
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.passwordMismatch');
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });
      const data = await res.json();
      
      if(data.success === false) {
        setLoading(false);
        showToast(data.message || t('auth.signupFailed'), "error");
        return;
      }
      
      if(res.ok) {
        showToast(t('auth.signupSuccess'), "success");
        dispatch(signInSuccess(data));
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (error) {
      console.error('Error submitting signup form:', error);
      showToast(t('auth.somethingWentWrong'), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-600 p-6">
      {toast.show && <Toast message={toast.message} type={toast.type} />}
      <div className="relative w-full max-w-4xl flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">
        <div className="w-full md:w-1/2 p-6 text-white text-center md:text-left animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500 animate-text-glow">
            {t('auth.welcomeSignup')}
          </h1>
          <p className="text-lg mt-4">{t('auth.joinCommunity')}</p>
          <p className="mt-6 text-white/80">{t('auth.signUpExplore')}</p>
          <div className="mt-6 p-4 bg-white/20 rounded-lg shadow-md animate-bounce">
            <p className="text-white text-lg font-semibold">{t('auth.exclusiveBenefits')}</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6 animate-slide-in-right">
          <div className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl p-6 md:p-8 border border-white/20">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white animate-pulse">{t('auth.signUpTitle')}</h2>
              <p className="text-white/80">{t('auth.createAccount')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-white/60" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={t('auth.usernamePlaceholder')}
                    required
                  />
                  {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                </div>
              </div>
              
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
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={t('auth.emailPlaceholder')}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={t('auth.passwordPlaceholder')}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-white/60" /> : <Eye className="h-5 w-5 text-white/60" />}
                  </button>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-white/60" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={t('auth.confirmPasswordPlaceholder')}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5 text-white/60" /> : <Eye className="h-5 w-5 text-white/60" />}
                  </button>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-300 animate-button-glow disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? t('auth.creatingAccount') : t('auth.createAccountBtn')}
              </button>
              <GoogleAuth/>
            </form>

            <p className="mt-6 text-center text-white/80">
              {t('auth.alreadyHaveAccount')}{' '}
              <Link to='/sign-in' className="text-blue-400 font-semibold hover:text-blue-300">
                {t('common.signIn')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;