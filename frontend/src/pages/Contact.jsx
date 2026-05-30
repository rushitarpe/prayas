import React from 'react';
import { FaPhoneAlt, FaPaperPlane, FaGlobe, FaFacebook, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden flex items-center justify-center pt-28 pb-16 px-4">
      {/* Premium Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 rounded-3xl p-6 md:p-10 bg-gray-900/40 backdrop-blur-xl border border-gray-800/80 shadow-[0_0_50px_rgba(139,92,246,0.15)] relative z-10">

        <div className="text-white space-y-8 flex flex-col justify-center">
          <div>
            <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2">
              {t('contact.title')}
            </h2>
            <h3 className="text-lg text-gray-400 font-medium">{t('contact.subtitle')}</h3>
          </div>

          <ul className="space-y-6">
            <li className="flex items-center gap-4">
              <div className="bg-gradient-to-tr from-blue-500/20 to-purple-600/20 p-4 rounded-2xl border border-purple-500/20 text-2xl text-cyan-400 shadow-md">
                <FaPhoneAlt />
              </div>
              <span className="text-base text-gray-250 font-semibold">{t('contact.phone')}</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="bg-gradient-to-tr from-blue-500/20 to-purple-600/20 p-4 rounded-2xl border border-purple-500/20 text-2xl text-purple-400 shadow-md">
                <FaPaperPlane />
              </div>
              <span className="text-base text-gray-250 font-semibold">{t('contact.email')}</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="bg-gradient-to-tr from-blue-500/20 to-purple-600/20 p-4 rounded-2xl border border-purple-500/20 text-2xl text-pink-400 shadow-md">
                <FaGlobe />
              </div>
              <span className="text-base text-gray-250 font-semibold">{t('contact.website')}</span>
            </li>
          </ul>

          <div className="flex gap-4 pt-4">
            <a href="#" className="border border-gray-800 p-4 rounded-xl cursor-pointer bg-gray-950/40 text-gray-400 hover:text-white hover:border-purple-500/40 hover:bg-purple-950/20 hover:scale-105 transition-all text-xl" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" className="border border-gray-800 p-4 rounded-xl cursor-pointer bg-gray-950/40 text-gray-400 hover:text-white hover:border-purple-500/40 hover:bg-purple-950/20 hover:scale-105 transition-all text-xl" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="border border-gray-800 p-4 rounded-xl cursor-pointer bg-gray-950/40 text-gray-400 hover:text-white hover:border-purple-500/40 hover:bg-purple-950/20 hover:scale-105 transition-all text-xl" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div className="bg-gray-950/60 rounded-3xl p-6 md:p-8 border border-gray-800/80 shadow-2xl">
          <form className="space-y-6 text-white" onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-2xl font-bold text-white border-b border-gray-800 pb-3">{t('contact.sendMessage')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder={t('contact.firstName')} 
                className="p-3 bg-gray-900 border border-gray-800 text-white placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
              />
              <input 
                type="text" 
                placeholder={t('contact.lastName')} 
                className="p-3 bg-gray-900 border border-gray-800 text-white placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
              />
            </div>
            <input 
              type="email" 
              placeholder={t('contact.emailField')} 
              className="w-full p-3 bg-gray-900 border border-gray-800 text-white placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
            />
            <input 
              type="number" 
              placeholder={t('contact.phoneField')} 
              className="w-full p-3 bg-gray-900 border border-gray-800 text-white placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
            />
            <textarea 
              placeholder={t('contact.messagePlaceholder')} 
              className="w-full h-32 p-3 bg-gray-900 border border-gray-800 text-white placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all"
            ></textarea>

            <button 
              type="submit" 
              className="w-full py-3.5 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white rounded-xl font-bold hover:scale-[1.01] hover:shadow-lg hover:shadow-purple-950/20 active:scale-95 transition-all duration-200"
            >
              {t('contact.sendBtn')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
