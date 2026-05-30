import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess, signInFailure, signInStart } from '../redux/user/userSlice';
import { useTranslation } from 'react-i18next';
import GoogleAuth from '../component/shared/GoogleAuth';

const Toast = ({ message, type }) => (
  <div className={`fixed top-4 right-4 flex items-center gap-2 px-4 py-3 rounded shadow-lg animate-in fade-in slide-in-from-top-4 ${
    type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
  }`}>
    {type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
    <p className="font-medium">{message}</p>
  </div>
);

const SigninForm = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const dispatch = useDispatch();
  const { error: errormessage, loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        [name]: name === 'email' ? t('auth.emailRequired') : t('auth.passwordRequired')
      }));
    }
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate empty fields
    let newErrors = {};
    if (!formData.email) newErrors.email = t('auth.emailRequired');
    if (!formData.password) newErrors.password = t('auth.passwordRequired');
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(signInStart());

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (!res.ok) {
        showToast(data.message || t('auth.signinFailed'), "error");
        dispatch(signInFailure(data.message));
        return;
      }
      
      showToast(t('auth.signinSuccess'), "success");
      dispatch(signInSuccess(data));
      setTimeout(() => navigate("/dashboard"), 1500);
      
    } catch (error) {
      console.error('Error submitting signin form:', error);
      showToast(t('auth.somethingWentWrong'), "error");
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-600 p-6">
      {toast.show && <Toast message={toast.message} type={toast.type} />}
      
      <div className="relative w-full max-w-4xl flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">
        <div className="w-full md:w-1/2 p-6 text-white text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
            {t('auth.welcomeSignin')}
          </h1>
          <p className="text-lg mt-4">{t('auth.excitedToSeeYou')}</p>
        </div>

        <div className="w-full md:w-1/2 p-6">
          <div className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl p-6 md:p-8 border border-white/20">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">{t('auth.signInTitle')}</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-white/60" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={t('auth.emailPlaceholder')}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-white/60" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
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

              <div className="flex justify-end">
                <Link to='/forgot-password' className='text-blue-400 text-sm hover:text-blue-300 transition-colors duration-200'>
                  {t('auth.forgotPassword')}
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
                disabled={loading}
              >
                {loading ? t('auth.signingIn') : t('auth.signInBtn')}
              </button>
              <GoogleAuth/>
            </form>
            

            <p className="mt-6 text-center text-white/80">
              {t('auth.dontHaveAccount')}{' '}
              <Link to="/sign-up" className="text-blue-400 font-semibold hover:text-blue-300">
                {t('common.signUp')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
