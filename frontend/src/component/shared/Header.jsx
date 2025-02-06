import React, { useState } from 'react';
import { Home, ClipboardList, Phone, Users, Menu, X, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from './extra/logo.png';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log('Search query:', searchQuery);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
            {/* Logo */}   
            <Link to={"/"}> 
          <div className="flex items-center space-x-4 group">
            
            <div className="relative transform transition-transform duration-300 ">
                <img src={logo} alt="Logo" className="h-18 w-18"  />
            </div>
            <div className="flex items-center overflow-hidden">
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400 bg-clip-text text-transparent animate-gradient-x hover:scale-110 transition-transform duration-200" 
                    style={{ 
                      textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial'
                    }}>
                Pra
                <Link to={"/"}/>
              </span>
              <div className="relative">
                <span className="text-4xl font-bold text-gray-700 hover:text-blue-600 transition-colors duration-300">
                  yas
                </span>
                <span className="absolute -right-4 top-0 h-2 w-2 rounded-full bg-blue-600 animate-bounce"></span>
              </div>
            </div>
          </div>
          </Link>
          <form 
            onSubmit={handleSearchSubmit} 
            className={`relative  w- max-w-md rounded-md  shadow-sm transition-all duration-300 ${isSearchFocused ? 'z-10' : ''}`}
          >
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-opacity duration-300 ${isSearchFocused ? 'opacity-100' : 'opacity-0'}`}>
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`block w-full pl-10 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${isSearchFocused ? 'bg-white border border-blue-500' : 'bg-gray-100 border-transparent'}`}
              placeholder="Search..."
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </form>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { icon: <Link to='/'><Home className="w-5 h-5 inline gap-2" />  Home </Link>},
              { icon:<Link to='/task'> <ClipboardList className="w-5 h-5 inline gap-2" /> Tasks </Link>},
              { icon:<Link to='/contact'> <Phone className="w-5 h-5 inline gap-2" /> Contact </Link> },
              { icon:<Link to='/about'><Users className="w-5 h-5 inline gap-2" /> About Us </Link>  }
            ].map((item, index) => (
              <a 
                key={item.text}
                href="#" 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transform hover:scale-105 transition-all duration-200 hover:text-blue-600"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="transform hover:rotate-12 transition-transform duration-200">
                  {item.icon}
                </span>
                <span>{item.text}</span>
              </a>
            ))}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4 ml-4">
              <Link to="/sign-in">
              <button className="text-blue-600 hover:text-blue-700 font-medium transform hover:scale-105 transition-all duration-200 hover:bg-blue-100 px-4 py-2 rounded-lg">
                Sign In
              </button>
              </Link>
              <Link to="/sign-up">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transform hover:scale-105 transition-all duration-200 hover:shadow-lg">
                Sign Up
              </button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 transition-transform duration-200 hover:scale-110"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 animate-spin-slow" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {[
                { icon: <Home className="w-5 h-5" />, text: 'Home' },
                { icon: <ClipboardList className="w-5 h-5" />, text: 'Tasks' },
                { icon: <Phone className="w-5 h-5" />, text: 'Contact' },
                { icon: <Users className="w-5 h-5" />, text: 'About Us' }
              ].map((item, index) => (
                <a
                  key={item.text}
                  href="#"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-2 py-1 hover:bg-gray-50 rounded-lg transform hover:scale-105 transition-all duration-200"
                  style={{
                    animation: 'slideIn 0.3s ease-out forwards',
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <span className="transform hover:rotate-12 transition-transform duration-200">
                    {item.icon}
                  </span>
                  <span>{item.text}</span>
                </a>
              ))}
              
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <button className="text-blue-600 hover:text-blue-700 font-medium px-2 py-1 hover:bg-blue-50 rounded-lg transform hover:scale-105 transition-all duration-200">
                  Sign In
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transform hover:scale-105 transition-all duration-200 hover:shadow-lg">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;