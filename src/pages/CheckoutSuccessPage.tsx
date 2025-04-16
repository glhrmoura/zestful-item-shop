
import React, { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useCart } from '../context/CartContext';
import { CheckCircle, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const CheckoutSuccessPage = () => {
  const { clearCart } = useCart();
  
  // Clear the cart once the payment is successful
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
          <p className="text-lg text-gray-700 mb-6">
            Your order has been successfully placed.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 text-left mb-8">
            <h2 className="text-lg font-semibold mb-4">Order Details</h2>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Order Number:</span>
                <span className="font-medium text-gray-900">#ORD-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-medium text-gray-900">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="font-medium text-gray-900">Credit Card</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Method:</span>
                <span className="font-medium text-gray-900">Standard Shipping</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-8">
            We've sent a confirmation email with all the details of your order. 
            If you have any questions, please contact our customer support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button>
                Continue Shopping
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline">
                Go to Home
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutSuccessPage;
