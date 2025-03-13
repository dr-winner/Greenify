import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Example product data (will be replaced with actual data from Supabase)
  const products = [
    {
      id: '1',
      name: 'Fresh Tomatoes',
      price: 2.99,
      quantity: 100,
      unit: 'kg',
      location: 'Accra Farm District',
      image_url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=500',
      farmer_name: 'John Doe'
    },
    {
      id: '2',
      name: 'Organic Carrots',
      price: 1.99,
      quantity: 50,
      unit: 'kg',
      location: 'Kumasi Region',
      image_url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=500',
      farmer_name: 'Jane Smith'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
          Marketplace
        </h1>
        <div className="flex space-x-4">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
              <p className="text-gray-600">by {product.farmer_name}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">
                  ${product.price}/{product.unit}
                </span>
                <span className="text-sm text-gray-500">
                  {product.quantity} {product.unit} available
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">{product.location}</p>
              <button className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                Contact Farmer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;