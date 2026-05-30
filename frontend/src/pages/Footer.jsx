import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  const location = useLocation();

  if (
    location.pathname.startsWith('/dashboard') || 
    location.pathname.startsWith('/tasks/') ||
    location.pathname === '/create-post' ||
    location.pathname === '/feed'
  ) {
    return null;
  }

  return (
    <div className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Us */}
        <div>
          <h2 className="text-lg font-semibold mb-4">{t('footer.aboutUsTitle')}</h2>
          <p className="text-gray-400 text-sm">
            {t('footer.aboutUsDesc')}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h2>

          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/" className="hover:text-white">
                {t('common.home')}
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-white">
                {t('common.aboutUs')}
              </Link>
            </li>

            <li>
              <Link to="/task" className="hover:text-white">
                {t('common.tasks')}
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-white">
                {t('common.contact')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="text-lg font-semibold mb-4">{t('footer.contactTitle')}</h2>

          <p className="text-gray-400 text-sm">
            {t('footer.address')}
          </p>

          <p className="text-gray-400 text-sm">{t('footer.email')}</p>

          <p className="text-gray-400 text-sm">{t('footer.phone')}</p>
        </div>
      </div>

      {/* Social Media and Copyright */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        <p>{t('footer.followUs')}</p>

        <div className="flex justify-center space-x-4 mt-3">
          <a href="#" className="hover:text-white">
            {t('footer.facebook')}
          </a>

          <a href="#" className="hover:text-white">
            {t('footer.twitter')}
          </a>

          <a href="#" className="hover:text-white">
            {t('footer.linkedin')}
          </a>

          <a href="#" className="hover:text-white">
            {t('footer.instagram')}
          </a>
        </div>

        <p className="mt-4">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </p>
      </div>
    </div>
  );
}

export default Footer;