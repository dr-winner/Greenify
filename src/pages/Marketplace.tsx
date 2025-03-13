import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import debounce from 'lodash.debounce';
import toast from 'react-hot-toast';

interface FilterState {
  priceRange: [number, number];
  category: string;
  delivery: string;
  rating: number;
}

const categories = ['Vegetables', 'Fruits', 'Grains', 'Dairy', 'Meat'];
const deliveryOptions = ['All', 'Free Shipping', 'Express Delivery', 'Standard'];

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    category: 'All',
    delivery: 'All',
    rating: 0
  });

  // Example product data with more items
  const [products] = useState([
    {
      id: '1',
      name: 'Fresh Tomatoes',
      price: 2.99,
      quantity: 100,
      unit: 'kg',
      location: 'Accra Farm District',
      image_url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=500',
      farmer_name: 'Yesuvi Kapoe',
      rating: 4.5,
      category: 'Vegetables',
      delivery: 'Free Shipping',
      description: 'Fresh, locally grown tomatoes perfect for salads and cooking.'
    },
    {
      id: '2',
      name: 'Organic Carrots',
      price: 1.99,
      quantity: 50,
      unit: 'kg',
      location: 'Kumasi Region',
      image_url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=500',
      farmer_name: 'Addo Mensah',
      rating: 4.8,
      category: 'Vegetables',
      delivery: 'Express Delivery',
      description: 'Premium organic carrots harvested at peak ripeness.'
    },
    {
      id: '3',
      name: 'Golden Apples',
      price: 3.49,
      quantity: 200,
      unit: 'kg',
      location: 'Eastern Region',
      image_url: 'https://images.unsplash.com/photo-1569870499705-504209102861?auto=format&fit=crop&q=80&w=500',
      farmer_name: 'Kwame Asante',
      rating: 4.7,
      category: 'Fruits',
      delivery: 'Standard Delivery',
      description: 'Sweet and juicy golden apples, perfect for snacking.'
    },
    {
      id: '4',
      name: 'Fresh Spinach',
      price: 1.49,
      quantity: 80,
      unit: 'kg',
      location: 'Volta Region',
      image_url: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=500',
      farmer_name: 'Ama Boateng',
      rating: 4.6,
      category: 'Vegetables',
      delivery: 'Free Shipping',
      description: 'Tender and fresh spinach, great for salads and smoothies.'
    },
    {
      id: '5',
      name: 'Organic Bananas',
      price: 0.99,
      quantity: 150,
      unit: 'kg',
      location: 'Western Region',
      image_url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=500',
      farmer_name: 'Kofi Mensah',
      rating: 4.9,
      category: 'Fruits',
      delivery: 'Express Delivery',
      description: 'Naturally ripened organic bananas, rich in potassium.'
    },
    {
      id: '6',
      name: 'Sweet Potatoes',
      price: 1.29,
      quantity: 120,
      unit: 'kg',
      location: 'Northern Region',
      image_url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=500',
      farmer_name: 'Yaa Asantewaa',
      rating: 4.4,
      category: 'Vegetables',
      delivery: 'Standard Delivery',
      description: 'Naturally sweet and nutritious sweet potatoes.'
    },
    {
      id: '7',
      name: 'Green Bell Peppers',
      price: 2.49,
      quantity: 90,
      unit: 'kg',
      location: 'Ashanti Region',
      image_url: 'https://www.starnursery.com/wp-content/uploads/2018/09/greenBellPepper1.jpg',
      farmer_name: 'Kwabena Osei',
      rating: 4.3,
      category: 'Vegetables',
      delivery: 'Free Shipping',
      description: 'Crisp and fresh green bell peppers, ideal for cooking.'
    },
    {
      id: '8',
      name: 'Pineapples',
      price: 2.99,
      quantity: 70,
      unit: 'kg',
      location: 'Central Region',
      image_url: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=500',
      farmer_name: 'Esi Atta',
      rating: 4.7,
      category: 'Fruits',
      delivery: 'Express Delivery',
      description: 'Sweet and tangy pineapples, perfect for desserts.'
    },
    {
      id: '9',
      name: 'Cucumbers',
      price: 1.79,
      quantity: 110,
      unit: 'kg',
      location: 'Greater Accra',
      image_url: 'https://yardandgarden.extension.iastate.edu/files/cucumbers.jpg',
      farmer_name: 'Nana Yeboah',
      rating: 4.5,
      category: 'Vegetables',
      delivery: 'Standard Delivery',
      description: 'Fresh and crunchy cucumbers, great for salads.'
    },
    {
      id: '10',
      name: 'Avocados',
      price: 3.99,
      quantity: 60,
      unit: 'kg',
      location: 'Eastern Region',
      image_url: 'https://modernfarmer.com/wp-content/uploads/2024/02/shutterstock_2343484499-jpg.webp',
      farmer_name: 'Adwoa Safo',
      rating: 4.8,
      category: 'Fruits',
      delivery: 'Free Shipping',
      description: 'Creamy and nutritious avocados, perfect for guacamole.'
    },
    {
      id: '11',
      name: 'Red Onions',
      price: 1.99,
      quantity: 100,
      unit: 'kg',
      location: 'Volta Region',
      image_url: 'https://images.squarespace-cdn.com/content/v1/5de5df7f9f40c13aa6a8b579/1599183475729-668O0RQG0N41AIHKWEXU/intro-1597860204.jpg',
      farmer_name: 'Kwaku Ananse',
      rating: 4.2,
      category: 'Vegetables',
      delivery: 'Express Delivery',
      description: 'Sweet and flavorful red onions, ideal for cooking.'
    },
    {
      id: '12',
      name: 'Mangoes',
      price: 2.49,
      quantity: 130,
      unit: 'kg',
      location: 'Brong-Ahafo Region',
      image_url: 'https://www.greenlife.co.ke/wp-content/uploads/2022/04/Mangoes.jpg',
      farmer_name: 'Ama Serwaa',
      rating: 4.9,
      category: 'Fruits',
      delivery: 'Standard Delivery',
      description: 'Juicy and sweet mangoes, perfect for smoothies.'
    },
    {
      id: '13',
      name: 'Lettuce',
      price: 1.29,
      quantity: 85,
      unit: 'kg',
      location: 'Ashanti Region',
      image_url: 'https://www.johnnyseeds.com/dw/image/v2/BJGJ_PRD/on/demandware.static/-/Sites-jss-master/default/dw8289d84d/images/products/vegetables/05033_01_gatsbi_lettuce.jpg?sw=800&sh=800',
      farmer_name: 'Kofi Asare',
      rating: 4.4,
      category: 'Vegetables',
      delivery: 'Free Shipping',
      description: 'Crisp and fresh lettuce, great for salads.'
    },
    {
      id: '14',
      name: 'Oranges',
      price: 2.99,
      quantity: 140,
      unit: 'kg',
      location: 'Central Region',
      image_url: 'https://ohmyfacts.com/wp-content/uploads/2024/05/20-juicy-facts-about-oranges-you-didnt-know-1714667401.jpg',
      farmer_name: 'Yaw Boateng',
      rating: 4.6,
      category: 'Fruits',
      delivery: 'Express Delivery',
      description: 'Sweet and juicy oranges, packed with vitamin C.'
    },
    {
      id: '15',
      name: 'Green Beans',
      price: 1.99,
      quantity: 95,
      unit: 'kg',
      location: 'Western Region',
      image_url: 'https://media.istockphoto.com/id/175550906/photo/hands-filled-with-fresh-green-beans-from-the-garden.jpg?s=612x612&w=0&k=20&c=s7Dkvr6Mp5QJflmX8cLfd-J2SPzv3FHDLJRwl4y-9ic=',
      farmer_name: 'Esi Mensah',
      rating: 4.3,
      category: 'Vegetables',
      delivery: 'Standard Delivery',
      description: 'Fresh and tender green beans, perfect for stir-fries.'
    },
    {
      id: '16',
      name: 'Papayas',
      price: 3.49,
      quantity: 75,
      unit: 'kg',
      location: 'Eastern Region',
      image_url: 'https://www.dolefruithawaii.com/cdn/shop/products/papaya_basket_iso.jpg?v=1628102580&width=1920',
      farmer_name: 'Kwame Asante',
      rating: 4.7,
      category: 'Fruits',
      delivery: 'Free Shipping',
      description: 'Sweet and nutritious papayas, great for breakfast.'
    },
    {
      id: '17',
      name: 'Eggplants',
      price: 1.79,
      quantity: 65,
      unit: 'kg',
      location: 'Volta Region',
      image_url: 'https://www.nature-and-garden.com/wp-content/uploads/sites/4/2018/10/eggplant-1024x732.jpg',
      farmer_name: 'Ama Osei',
      rating: 4.5,
      category: 'Vegetables',
      delivery: 'Express Delivery',
      description: 'Fresh and versatile eggplants, ideal for grilling.'
    },
    {
      id: '18',
      name: 'Watermelons',
      price: 4.99,
      quantity: 50,
      unit: 'kg',
      location: 'Northern Region',
      image_url: 'https://bonnieplants.com/cdn/shop/products/sugar-baby-watermelon.jpg?v=1642630016',
      farmer_name: 'Kwaku Yeboah',
      rating: 4.8,
      category: 'Fruits',
      delivery: 'Standard Delivery',
      description: 'Sweet and refreshing watermelons, perfect for summer.'
    },
    {
      id: '19',
      name: 'Cabbage',
      price: 1.49,
      quantity: 100,
      unit: 'kg',
      location: 'Greater Accra',
      image_url: 'https://images.squarespace-cdn.com/content/v1/60d5fe5c9e25003cd4b3b2ed/1634316438635-27FNWQSMMPRHWXB0MLGJ/green-cabbage-envato.jpg',
      farmer_name: 'Nana Addo',
      rating: 4.2,
      category: 'Vegetables',
      delivery: 'Free Shipping',
      description: 'Fresh and crunchy cabbage, great for coleslaw.'
    },
    {
      id: '20',
      name: 'Pawpaw',
      price: 2.99,
      quantity: 60,
      unit: 'kg',
      location: 'Ashanti Region',
      image_url: 'https://www.angelicstarvision.co.za/cdn/shop/articles/Papaya.jpg?v=1674993198',
      farmer_name: 'Adwoa Safo',
      rating: 4.7,
      category: 'Fruits',
      delivery: 'Express Delivery',
      description: 'Sweet and nutritious pawpaw, perfect for desserts.'
    }
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);

  const debouncedSearch = debounce((term: string) => {
    setLoading(true);
    try {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.farmer_name.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    } catch (error) {
      toast.error('Error searching products');
    } finally {
      setLoading(false);
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm]);

  const applyFilters = () => {
    setLoading(true);
    try {
      const filtered = products.filter(product => {
        const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
        const matchesCategory = filters.category === 'All' || product.category === filters.category;
        const matchesDelivery = filters.delivery === 'All' || product.delivery === filters.delivery;
        const matchesRating = product.rating >= filters.rating;
        return matchesPrice && matchesCategory && matchesDelivery && matchesRating;
      });
      setFilteredProducts(filtered);
      setShowFilters(false);
    } catch (error) {
      toast.error('Error applying filters');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-4 md:mb-0"
        >
          Marketplace
        </motion.h1>
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
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white p-4 rounded-lg shadow-lg mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="0"
                    value={filters.priceRange[0]}
                    onChange={(e) => setFilters({...filters, priceRange: [Number(e.target.value), filters.priceRange[1]]})}
                    className="w-24 px-2 py-1 border rounded"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    min="0"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({...filters, priceRange: [filters.priceRange[0], Number(e.target.value)]})}
                    className="w-24 px-2 py-1 border rounded"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="All">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery</label>
                <select
                  value={filters.delivery}
                  onChange={(e) => setFilters({...filters, delivery: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {deliveryOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                <div className="flex items-center space-x-1">
                  {[1,2,3,4,5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setFilters({...filters, rating})}
                      className={`p-1 ${filters.rating >= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setFilters({
                    priceRange: [0, 1000],
                    category: 'All',
                    delivery: 'All',
                    rating: 0
                  });
                  applyFilters();
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full"
          />
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600">by {product.farmer_name}</p>
                  <p className="text-sm text-gray-500 mt-2">{product.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">
                      ${product.price}/{product.unit}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.quantity} {product.unit} available
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{product.location}</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      {product.delivery}
                    </span>
                  </div>
                  <button className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                    Contact Farmer
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Marketplace;