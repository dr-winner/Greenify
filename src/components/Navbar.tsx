import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, History } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const { user, signOut } = useAuthStore();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Sprout className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Greenify</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/marketplace" className="text-gray-700 hover:text-green-600">
              Marketplace
            </Link>
            {user && (
              <Link to="/transactions" className="flex items-center text-gray-700 hover:text-green-600">
                <History className="h-5 w-5 mr-1" />
                Transactions
              </Link>
            )}
            {user ? (
              <button
                onClick={() => signOut()}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/auth"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;