import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Feed from '../components/Feed';
import AnnouncementBanner from '../components/AnnouncementBanner';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Users, BookOpen } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Welcome Hero Section */}
        <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-3xl p-8 text-white shadow-lg shadow-brand-200 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-brand-400/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-brand-200" />
              <span className="text-sm font-medium text-brand-100">Welcome back!</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Hello, {user?.fullName?.split(' ')[0]}! 👋
            </h1>
            <p className="text-brand-100 text-lg opacity-90 mb-6 max-w-md">
              Stay connected with your campus, discover new resources, and grow together.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/students"
                className="px-4 py-2 bg-white text-brand-600 rounded-xl font-semibold text-sm hover:bg-brand-50 transition-colors shadow-sm"
              >
                Find Peers
              </Link>
              <Link
                to="/academic"
                className="px-4 py-2 bg-brand-500/30 text-white border border-white/20 rounded-xl font-semibold text-sm hover:bg-brand-500/40 transition-colors"
              >
                Academic Hub
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-gray-900">Campus Feed</h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-50">Latest</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-400 rounded-full text-xs font-medium cursor-pointer hover:bg-gray-200">Trending</span>
              </div>
            </div>

            <AnnouncementBanner />
            <Feed />
          </div>

          {/* Right Sidebar - Quick Links / Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-600" />
                Quick Access
              </h3>
              <div className="space-y-3">
                <Link to="/communities" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                  <span className="text-sm text-gray-600 group-hover:text-brand-600">Communities</span>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">12</span>
                </Link>
                <Link to="/events" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                  <span className="text-sm text-gray-600 group-hover:text-brand-600">Upcoming Events</span>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">4</span>
                </Link>
                <Link to="/resources" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                  <span className="text-sm text-gray-600 group-hover:text-brand-600">Study Materials</span>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">89</span>
                </Link>
                <Link to="/academic" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                  <span className="text-sm text-gray-600 group-hover:text-brand-600">Q&A Forum</span>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">23</span>
                </Link>
              </div>
            </div>

            <div className="bg-brand-50 rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h3 className="font-bold text-brand-700 mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Daily Tip
              </h3>
              <p className="text-sm text-brand-600 leading-relaxed">
                Did you know you can create your own community for specific courses? Start one today and collaborate with classmates!
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
