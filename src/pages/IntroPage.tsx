import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setShowLoginPage } from '@/store/loginSlice';

const IntroPage = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <h1 className="text-4xl font-extrabold text-red-600 mb-4 tracking-wide">VISION STREAM</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
        Discover, create, and share your world.
      </p>
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8">
        The next generation of secured video streaming.
      </h2>

      <div className="flex gap-6 mb-12">
        <NavLink to='/signup'>
          <button className="px-6 py-3 text-lg font-semibold rounded-md bg-red-600 text-white border-2 border-red-600 hover:bg-transparent hover:text-red-600 transition">
            Join Vision Stream
          </button>
        </NavLink>
        <NavLink to='/login'>
          <button
            className="px-6 py-3 text-lg font-semibold rounded-md border-2 border-gray-400 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white dark:border-gray-600 transition"
            onClick={() => dispatch(setShowLoginPage(true))}
          >
            Sign In
          </button>
        </NavLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
        <FeatureItem
          icon="🔒"
          title="Fully Secured"
          description="Protect your content and profile with our robust security features."
        />
        <FeatureItem
          icon="💬"
          title="Integrated Comments"
          description="Engage with viewers and creators instantly with deep integration."
        />
        <FeatureItem
          icon="👤"
          title="Channel Management"
          description="Everything you need to grow and manage your brand in one place."
        />
      </div>
    </div>
  );
};

const FeatureItem: React.FC<{ icon: string, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 mt-2">{description}</p>
  </div>
);

export default IntroPage;
