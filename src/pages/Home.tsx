import React from 'react';
import { Link } from 'react-router-dom';
import { Plane as Plant, ShoppingBag, Truck, Warehouse } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to <span className="text-green-600">Greenify</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Connecting farmers directly with buyers for fresh agricultural produce
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <Link
            to="/auth"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Our Features
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            icon={<Plant className="h-8 w-8" />}
            title="Direct Marketplace"
            description="Connect directly with farmers and buyers for the freshest produce"
          />
          <Feature
            icon={<ShoppingBag className="h-8 w-8" />}
            title="Secure Payments"
            description="Safe and secure transactions for peace of mind"
          />
          <Feature
            icon={<Warehouse className="h-8 w-8" />}
            title="Storage Solutions"
            description="Find and book storage facilities for your produce"
          />
          <Feature
            icon={<Truck className="h-8 w-8" />}
            title="Transport & Delivery"
            description="Reliable transport services for your agricultural goods"
          />
        </div>
      </div>
    </div>
  );
};

const Feature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="pt-6">
    <div className="flow-root bg-white rounded-lg px-6 pb-8">
      <div className="-mt-6">
        <div className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
          {icon}
        </div>
        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{title}</h3>
        <p className="mt-5 text-base text-gray-500">{description}</p>
      </div>
    </div>
  </div>
);

export default Home;