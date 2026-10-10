import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, User, LogOut } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#2e7d32] to-[#4caf50] flex items-center justify-center">
              <span className="text-white font-bold text-xl">SB</span>
            </div>
            <span className="text-2xl text-[#2e7d32]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              SkillBridge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`hover:text-[#2e7d32] transition-colors ${
                isActive('/') ? 'text-[#2e7d32]' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/opportunities"
              className={`hover:text-[#2e7d32] transition-colors ${
                isActive('/opportunities') ? 'text-[#2e7d32]' : 'text-gray-700'
              }`}
            >
              Opportunities
            </Link>
            <Link
              to="/about"
              className={`hover:text-[#2e7d32] transition-colors ${
                isActive('/about') ? 'text-[#2e7d32]' : 'text-gray-700'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`hover:text-[#2e7d32] transition-colors ${
                isActive('/contact') ? 'text-[#2e7d32]' : 'text-gray-700'
              }`}
            >
              Contact
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => navigate(user.role === 'volunteer' ? '/volunteer-dashboard' : '/ngo-dashboard')}
                  className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white rounded-full"
                >
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-[#2e7d32] text-[#2e7d32] hover:bg-[#e8f5e9] rounded-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => navigate('/login')}
                  variant="outline"
                  className="border-[#2e7d32] text-[#2e7d32] hover:bg-[#e8f5e9] rounded-full"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white rounded-full"
                >
                  Register
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#2e7d32]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              to="/"
              className={`block py-2 hover:text-[#2e7d32] ${
                isActive('/') ? 'text-[#2e7d32]' : 'text-gray-700'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/opportunities"
              className={`block py-2 hover:text-[#2e7d32] ${
                isActive('/opportunities') ? 'text-[#2e7d32]' : 'text-gray-700'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Opportunities
            </Link>
            <Link
              to="/about"
              className={`block py-2 hover:text-[#2e7d32] ${
                isActive('/about') ? 'text-[#2e7d32]' : 'text-gray-700'
              }`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`block py-2 hover:text-[#2e7d32] ${
                isActive('/contact') ? 'text-[#2e7d32]' : 'text-gray-700'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            {user ? (
              <>
                <Button
                  onClick={() => {
                    navigate(user.role === 'volunteer' ? '/volunteer-dashboard' : '/ngo-dashboard');
                    setIsOpen(false);
                  }}
                  className="w-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white rounded-full mt-2"
                >
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                <Button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  variant="outline"
                  className="w-full border-[#2e7d32] text-[#2e7d32] hover:bg-[#e8f5e9] rounded-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    navigate('/login');
                    setIsOpen(false);
                  }}
                  variant="outline"
                  className="w-full border-[#2e7d32] text-[#2e7d32] hover:bg-[#e8f5e9] rounded-full mt-2"
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    navigate('/register');
                    setIsOpen(false);
                  }}
                  className="w-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white rounded-full"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
