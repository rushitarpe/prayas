import React from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ForgotPassword = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-600 p-6">
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 border border-white/20 text-white text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white/20 rounded-full animate-pulse">
            <Mail className="h-12 w-12 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-4">{t('auth.forgotPasswordTitle')}</h2>
        
        <p className="text-white/80 mb-6 leading-relaxed">
          {t('auth.forgotPasswordMessage')}
        </p>

        <div className="bg-white/20 rounded-lg p-4 mb-8">
          <p className="text-sm font-semibold mb-1 text-white/90">
            {t('auth.forgotPasswordEmail')}
          </p>
          <a
            href="mailto:rushitarpe44@gmail.com"
            className="text-yellow-300 font-bold hover:underline break-all"
          >
            rushitarpe44@gmail.com
          </a>
        </div>

        <Link
          to="/sign-in"
          className="inline-flex items-center gap-2 text-white/90 hover:text-white hover:scale-105 transition-all duration-300 font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('auth.backToSignIn')}
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
