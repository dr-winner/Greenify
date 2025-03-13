import React from 'react';
import { useTransactionStore } from '../store/transactionStore';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';

const Transactions = () => {
  const { user } = useAuthStore();
  const { getTransactionsByUser } = useTransactionStore();
  
  if (!user) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <p className="text-gray-600">Please sign in to view your transactions</p>
      </div>
    );
  }

  const transactions = getTransactionsByUser(user.id);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getDeliveryIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Transaction History</h1>
      
      {transactions.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions</h3>
          <p className="mt-1 text-sm text-gray-500">
            You haven't made any transactions yet.
          </p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <motion.li
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={transaction.product.image_url}
                      alt={transaction.product.name}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">
                        {transaction.product.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Quantity: {transaction.quantity} {transaction.product.unit}
                      </p>
                      <p className="text-sm text-gray-500">
                        Total: ${transaction.total_amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-gray-500">Status</span>
                      {getStatusIcon(transaction.status)}
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-gray-500">Delivery</span>
                      {getDeliveryIcon(transaction.delivery_status)}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </p>
                      <p className={`text-sm ${
                        transaction.payment_status === 'paid' 
                          ? 'text-green-600' 
                          : transaction.payment_status === 'failed'
                          ? 'text-red-600'
                          : 'text-yellow-600'
                      }`}>
                        {transaction.payment_status.charAt(0).toUpperCase() + 
                         transaction.payment_status.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default Transactions;