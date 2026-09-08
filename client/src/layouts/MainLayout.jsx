import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Fixed width, fixed position */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64 transition-all duration-300">
        <Header />
        <main className="p-4 md:p-8 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
