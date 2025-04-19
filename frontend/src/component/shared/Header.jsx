import React, { useState } from 'react';
import { Home, ClipboardList, Phone, Users, Menu, X, Search, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log('Search query:', searchQuery);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo and Site Name */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg hover:shadow-[0_0_12px_rgba(79,70,229,0.7)] transition-shadow duration-300">
              <span className="text-xl font-bold text-white">P</span>
            </div>
            <span className="text-2xl font-bold text-white fancy-text transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:via-purple-500 hover:to-pink-400 hover:shadow-[0_0_20px_rgba(167,139,250,0.5)]">
              Prayas
            </span>
          </Link>

          {/* Search Form - Centered */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 rounded-full bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                placeholder="Search..."
              />
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { path: '/', icon: <Home className="w-5 h-5" />, text: 'Home' },
              { path: '/task', icon: <ClipboardList className="w-5 h-5" />, text: 'Tasks' },
              { path: '/contact', icon: <Phone className="w-5 h-5" />, text: 'Contact' },
              { path: '/about', icon: <Users className="w-5 h-5" />, text: 'About Us' }
            ].map((item) => (
              <Link
                key={item.text}
                to={item.path}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 hover:shadow-[0_0_8px_rgba(255,255,255,0.2)] py-1 px-2 rounded-md"
              >
                <span className="text-blue-400">{item.icon}</span>
                <span>{item.text}</span>
              </Link>
            ))}

            {/* User Profile or Auth Buttons */}
            {currentUser ? (
              <div className="relative ml-4">
                <button
                  onClick={handleDropdownToggle}
                  className="flex items-center space-x-2"
                >
                  <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-[0_0_12px_rgba(147,51,234,0.7)] transition-shadow duration-300">
                    {currentUser.profilePicture ? (
                      <img
                        src={currentUser.profilePicture}
                        alt={currentUser.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {currentUser.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-sm font-medium text-white">{currentUser.name}</p>
                      <p className="text-xs text-gray-400">{currentUser.email}</p>
                    </div>
                    <Link
                      to="/dashboard?tab=profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-5 ml-4">
                <Link
                  to="/sign-in"
                  className="text-sm font-medium text-gray-300 hover:text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition-all duration-200"
                >
                  Sign in
                </Link>
                <Link
                  to="/sign-up"
                  className="text-sm font-medium bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 hover:shadow-[0_0_12px_rgba(37,99,235,0.5)] transition-all duration-200"
                >
                  Sign up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-gray-800"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden px-2 pt-2 pb-4 space-y-2 bg-gray-800">
            {[
              { path: '/', text: 'Home', icon: <Home className="w-5 h-5" /> },
              { path: '/task', text: 'Tasks', icon: <ClipboardList className="w-5 h-5" /> },
              { path: '/contact', text: 'Contact', icon: <Phone className="w-5 h-5" /> },
              { path: '/about', text: 'About Us', icon: <Users className="w-5 h-5" /> }
            ].map((item) => (
              <Link
                key={item.text}
                to={item.path}
                className="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors duration-200"
              >
                <span className="text-blue-400">{item.icon}</span>
                <span>{item.text}</span>
              </Link>
            ))}
            
            <div className="pt-4 border-t border-gray-700 mt-2">
              {currentUser ? (
                <>
                  <div className="flex items-center px-3 py-2">
                    <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mr-3">
                      {currentUser.profilePicture ? (
                        <img
                          src={currentUser.profilePicture}
                          alt={currentUser.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {currentUser.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{currentUser.name}</p>
                      <p className="text-xs text-gray-400">{currentUser.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mt-2">
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-3 px-3 py-2">
                  <Link
                    to="/sign-in"
                    className="text-center py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/sign-up"
                    className="text-center py-2 text-base font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:shadow-[0_0_12px_rgba(37,99,235,0.5)]"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes glow {
          0% { text-shadow: 0 0 5px rgba(79, 70, 229, 0.5); }
          50% { text-shadow: 0 0 20px rgba(139, 92, 246, 0.8), 0 0 30px rgba(167, 139, 250, 0.5); }
          100% { text-shadow: 0 0 5px rgba(79, 70, 229, 0.5); }
        }
        
        .fancy-text:hover {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;