import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Users,
  Globe,
  Calendar,
  MessageSquare,
  Bell,
  User,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { resolveImageUrl } from '../utils/urlUtils';

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/', icon: LayoutDashboard },
    { name: 'Academic', path: '/academic', icon: BookOpen },
    { name: 'Resources', path: '/resources', icon: FileText },
    { name: 'Communities', path: '/communities', icon: Globe },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Students', path: '/students', icon: Users },
    { name: 'Messages', path: '/messages', icon: MessageSquare },
    { name: 'Notifications', path: '/notifications', icon: Bell },
  ];

  const isAdmin = user?.role === 'admin';

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-20 transition-all duration-300">

      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold">
          CC
        </div>

        <span className="font-bold text-brand-700 text-xl tracking-tight">
          CollegeConnect
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-4">

        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
          Main Menu
        </div>

        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-brand-50 text-brand-600 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-brand-600'
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${
                  isActive
                    ? 'text-brand-600'
                    : 'text-gray-400 group-hover:text-brand-600'
                }`}
              />

              {item.name}
            </Link>
          );
        })}

        {/* Admin Panel */}
        {isAdmin && (
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group ${
              location.pathname.startsWith('/admin')
                ? 'bg-amber-50 text-amber-600 font-semibold'
                : 'text-gray-600 hover:bg-gray-50 hover:text-amber-600'
            }`}
          >
            <ShieldCheck
              className={`w-5 h-5 ${
                location.pathname.startsWith('/admin')
                  ? 'text-amber-600'
                  : 'text-gray-400 group-hover:text-amber-600'
              }`}
            />

            Admin Panel
          </Link>
        )}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <Link
          to={`/profile/${user?._id}`}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-colors group"
        >
          <img
            src={
              resolveImageUrl(user?.profilePicture) ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.fullName || 'U'
              )}&background=3b6ff2&color=fff`
            }
            alt="User"
            className="w-9 h-9 rounded-full border border-gray-200 object-cover"
          />

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user?.fullName}
            </p>

            <p className="text-xs text-gray-500 truncate capitalize">
              {user?.role}
            </p>
          </div>

          <User className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        </Link>
      </div>

    </aside>
  );
}