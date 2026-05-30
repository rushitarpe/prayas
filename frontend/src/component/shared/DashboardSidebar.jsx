import React from 'react';
import { FaHome, FaUser, FaUsers, FaPen, FaSignOutAlt, FaClipboardList, FaGlobe } from 'react-icons/fa';
import { BiMessageDetail } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import { signOutSuccess } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillPostcardFill } from "react-icons/bs";
import { useTranslation } from 'react-i18next';

const DashboardSidebar = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch(); 
    const location = useLocation();
    const currentUser = useSelector((state) => state.user.currentUser);
    
    // Helper to check active tab
    const getActiveTab = () => {
      const urlParams = new URLSearchParams(location.search);
      return urlParams.get('tab') || '';
    };

    const activeTab = getActiveTab();

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

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-[280px] z-40 bg-gray-950/85 backdrop-blur-2xl border-r border-gray-800/60 p-6 flex flex-col justify-between shadow-2xl transition-all duration-300">
      <div className="flex flex-col gap-6 flex-1">
        {/* Brand/Subtitle */}
        <div className="px-3 py-1 border-b border-gray-800/60 pb-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {t('dashboard.title')}
          </h2>
        </div>

        <nav className="flex flex-col gap-2">
          {currentUser && (
            <Link to="/dashboard?tab=dashboard" className="no-underline text-inherit">
              <NavItem 
                icon={<FaHome className="w-4 h-4" />} 
                label={t('dashboard.mainDashboard')} 
                isActive={activeTab === 'dashboard'}
              />
            </Link>
          )}
          
          <Link to="/dashboard?tab=profile" className="no-underline text-inherit">
            <NavItem 
              icon={<FaUser className="w-4 h-4" />} 
              label={t('common.profile')} 
              isActive={activeTab === 'profile'}
            />
          </Link>

          <Link to="/dashboard?tab=tasks" className="no-underline text-inherit">
            <NavItem 
              icon={<FaClipboardList className="w-4 h-4" />} 
              label={t('dashboard.myTasks')} 
              isActive={activeTab === 'tasks'}
            />
          </Link>

          <Link to="/feed" className="no-underline text-inherit">
            <NavItem 
              icon={<FaGlobe className="w-4 h-4" />} 
              label={t('common.feed')} 
              isActive={location.pathname === '/feed'}
            />
          </Link>

          <Link to="/create-post" className="no-underline text-inherit">
            <NavItem 
              icon={<FaPen className="w-4 h-4" />} 
              label={t('dashboard.createPost')} 
              isActive={location.pathname === '/create-post'}
            />
          </Link>

          <Link to="/dashboard?tab=posts" className="no-underline text-inherit">
            <NavItem 
              icon={<BiMessageDetail className="w-4 h-4" />} 
              label={t('dashboard.yourPosts')} 
              isActive={activeTab === 'posts'}
            />
          </Link>

          {currentUser && currentUser.isAdmin && (
            <div className="border-t border-gray-800/60 my-2 pt-2">
              <span className="block px-3 text-[10px] font-bold uppercase tracking-wider text-gray-550 mb-2">
                Admin Panel
              </span>
              <div className="flex flex-col gap-2">
                <Link to="/dashboard?tab=users" className="no-underline text-inherit">
                  <NavItem 
                    icon={<FaUsers className="w-4 h-4" />} 
                    label={t('dashboard.allUsers')} 
                    isActive={activeTab === 'users'}
                  />
                </Link>

                <Link to="/dashboard?tab=admin-posts" className="no-underline text-inherit">
                  <NavItem 
                    icon={<BsFillPostcardFill className="w-4 h-4" />} 
                    label={t('dashboard.allPosts')} 
                    isActive={activeTab === 'admin-posts'}
                  />
                </Link>

                <Link to="/dashboard?tab=comments" className="no-underline text-inherit">
                  <NavItem 
                    icon={<BiMessageDetail className="w-4 h-4" />} 
                    label={t('dashboard.allComments')} 
                    isActive={activeTab === 'comments'}
                  />
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
      
      <button 
        onClick={handleSignout}
        className="w-full mt-auto p-3 text-sm font-semibold bg-rose-600/10 hover:bg-rose-600 text-rose-450 hover:text-white rounded-xl flex items-center justify-center gap-2 border border-rose-500/20 transition-all duration-300 active:scale-95 shadow-md shadow-rose-950/10"
      >
        <FaSignOutAlt className="w-4 h-4" /> 
        <span>{t('common.signOut')}</span>
      </button>
    </aside>
  );
};

const NavItem = ({ icon, label, isActive }) => {
  return (
    <div
      className={`flex items-center gap-3 text-sm font-semibold p-3 cursor-pointer rounded-xl transition-all duration-300 ease-in-out ${
        isActive 
          ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/25 border border-purple-500/30 text-white shadow-lg shadow-purple-950/20' 
          : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
      }`}
    >
      <span className={isActive ? 'text-cyan-400' : 'text-gray-400'}>{icon}</span>
      <span>{label}</span>
    </div>
  );
};

export default DashboardSidebar;
