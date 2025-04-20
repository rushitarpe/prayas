import React, { useState, useEffect, useRef } from 'react';
import { Home, ClipboardList, Phone, Users, Menu, X, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutSuccess } from '../../redux/user/userSlice';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser } = useSelector((state) => state.user || { currentUser: null });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
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
      
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get first name safely
  const getFirstName = () => {
    if (currentUser && currentUser.name) {
      return currentUser.name.split(' ')[0];
    }
    return '';
  };

  return (
    <header className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo and Site Name - Improved positioning */}
          <Link to="/" className="flex items-center space-x-3 mr-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg hover:shadow-lg transition-shadow duration-300">
              <span className="text-xl font-bold text-white">P</span>
            </div>
            <span className="text-2xl font-bold text-white fancy-text transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:via-purple-500 hover:to-pink-400">
              Prayas
            </span>
          </Link>

          {/* Search Form */}
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
                className="block w-full pl-10 pr-3 py-2 rounded-full bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[{ path: '/', icon: <Home className="w-5 h-5" />, text: 'Home' },
              { path: '/task', icon: <ClipboardList className="w-5 h-5" />, text: 'Tasks' },
              { path: '/contact', icon: <Phone className="w-5 h-5" />, text: 'Contact' },
              { path: '/about', icon: <Users className="w-5 h-5" />, text: 'About Us' }].map((item) => (
              <Link
                key={item.text}
                to={item.path}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 hover:bg-gray-800 py-1 px-2 rounded-md"
              >
                <span className="text-blue-400">{item.icon}</span>
                <span>{item.text}</span>
              </Link>
            ))}

            {/* User Dropdown - Fixed to properly show user name */}
            {currentUser ? (
              <div className="relative ml-4" ref={dropdownRef}>
                <button
                  onClick={handleDropdownToggle}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg transition-shadow duration-300">
                     
                      <img
                        src={currentUser.profilePicture}
                        alt={currentUser.username || 'User'}
                        className="w-full h-full rounded-full object-cover"
                      />
                    
                  </div>
                  <span className="text-sm text-white font-medium hidden sm:inline-block">
                    {getFirstName()}
                  </span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-gray-900 bg-opacity-80 backdrop-blur-lg border border-gray-700 rounded-xl shadow-xl z-50 animate-fade-in-down">
                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="text-sm font-semibold text-white truncate">{currentUser.username|| "User"}</p>
                      <p className="text-xs text-gray-400 truncate">{currentUser.email || 'No email'}</p>
                    </div>
                    <Link
                      to="/dashboard?tab=profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded transition-colors duration-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded transition-colors duration-200"
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
                  className="text-sm font-medium bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-all duration-200"
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
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg py-2 px-4">
          {[{ path: '/', icon: <Home className="w-5 h-5" />, text: 'Home' },
            { path: '/task', icon: <ClipboardList className="w-5 h-5" />, text: 'Tasks' },
            { path: '/contact', icon: <Phone className="w-5 h-5" />, text: 'Contact' },
            { path: '/about', icon: <Users className="w-5 h-5" />, text: 'About Us' }].map((item) => (
            <Link
              key={item.text}
              to={item.path}
              className="flex items-center space-x-3 text-gray-300 hover:text-white py-3 border-b border-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-blue-400">{item.icon}</span>
              <span>{item.text}</span>
            </Link>
          ))}
          
          {currentUser ? (
            <>
              <Link
                to="/dashboard?tab=profile"
                className="flex items-center space-x-3 text-gray-300 hover:text-white py-3 border-b border-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Profile</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 text-gray-300 hover:text-white py-3"
              >
                <span>Sign out</span>
              </button>
            </>
          ) : (
            <div className="flex flex-col space-y-2 py-3">
              <Link
                to="/sign-in"
                className="text-center text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link
                to="/sign-up"
                className="text-center bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes glow {
          0% { text-shadow: 0 0 5px rgba(79, 70, 229, 0.5); }
          50% { text-shadow: 0 0 20px rgba(139, 92, 246, 0.8), 0 0 30px rgba(167, 139, 250, 0.5); }
          100% { text-shadow: 0 0 5px rgba(79, 70, 229, 0.5); }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .fancy-text:hover {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;