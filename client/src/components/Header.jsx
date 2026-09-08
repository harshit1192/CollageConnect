import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { getConversations } from '../services/messageService';
import NotificationBell from './NotificationBell';
import GlobalSearchBar from './GlobalSearchBar';
import { Menu, LogOut, Bell, MessageSquare } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const refreshUnread = () => {
    getConversations()
      .then((convs) => setUnreadCount(convs.reduce((sum, c) => sum + c.unreadCount, 0)))
      .catch(() => {});
  };

  useEffect(() => {
    refreshUnread();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('receive-message', refreshUnread);
    return () => socket.off('receive-message', refreshUnread);
  }, [socket]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-10 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 md:hidden text-gray-600"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Brand (Mobile only) */}
        <Link to="/" className="font-bold text-brand-700 text-lg md:hidden">
          CC
        </Link>

        {/* Search Bar - Hidden on very small screens, visible on md+ */}
        <div className="hidden sm:block w-full max-w-md">
          <GlobalSearchBar />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Messages Shortcut */}
        <Link
          to="/messages"
          className="p-2 rounded-full text-gray-500 hover:text-brand-600 hover:bg-brand-50 relative transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Link>

        {/* Notifications */}
        <NotificationBell />

        <div className="h-6 w-px bg-gray-200 mx-1" />

        {/* User Profile Quick Access */}
        <Link
          to={`/profile/${user?._id}`}
          className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-gray-100 transition-colors group"
        >
          <img
            src={user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || 'U')}&background=3b6ff2&color=fff`}
            alt={user?.fullName}
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
          />
          <span className="hidden md:block text-sm font-medium text-gray-700 group-hover:text-brand-600 transition-colors">
            {user?.fullName?.split(' ')[0]}
          </span>
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          title="Log out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
