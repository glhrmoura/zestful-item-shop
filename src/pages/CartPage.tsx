
import React from 'react';
import { Layout } from '../components/Layout';
import { CartItemComponent } from '../components/Cart/CartItem';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { createCheckoutSession } from '../utils/stripe';
import { ChevronLeft, ShoppingBag } from 'lucide-react';

const CartPage = () => {
  const { cartItems, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  
  // Format total from cents to dollars
  const formattedTotal = (cartTotal / 100).toFixed(2);
  
  // Calculate shipping based on cart total
  const freeShippingThreshold = 5000; // $50.00
  const shippingCost = cartTotal >= freeShippingThreshold ? 0 : 799; // $7.99
  const formattedShipping = (shippingCost / 100).toFixed(2);
  
  // Calculate tax (e.g., 8%)
  const taxRate = 0.08;
  const taxAmount = cartTotal * taxRate;
  const formattedTax = (taxAmount / 100).toFixed(2);
  
  // Calculate order total
  const orderTotal = cartTotal + shippingCost + taxAmount;
  const formattedOrderTotal = (orderTotal / 100).toFixed(2);
  
  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    
    try {
      const items = cartItems.map(item => ({
        price: item.price,
        name: item.name,
        quantity: item.quantity
      }));
      
      const { url } = await createCheckoutSession(items);
      
      if (url === '/checkout/success') {
        // For demo purposes, we'll navigate directly
        navigate('/checkout/success');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet. Explore our shop to find amazing products.
            </p>
            <Link to="/products">
              <Button>
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                {/* Table Header (desktop) */}
                <div className="hidden sm:flex border-b pb-4 mb-2 font-medium">
                  <div className="flex-1">Product</div>
                  <div className="w-24 text-center">Price</div>
                </div>
                
                {/* Cart Items */}
                <div className="space-y-0">
                  {cartItems.map(item => (
                    <CartItemComponent key={item.id} item={item} />
                  ))}
                </div>
                
                {/* Cart Actions */}
                <div className="flex justify-between items-center mt-8 pt-4 border-t">
                  <Link to="/products">
                    <Button variant="outline">
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => clearCart()}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${formattedTotal}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600 font-medium">Free</span>
                    ) : (
                      <span className="font-medium">${formattedShipping}</span>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${formattedTax}</span>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${formattedOrderTotal}</span>
                    </div>
                    {cartTotal < freeShippingThreshold && (
                      <p className="text-green-600 text-sm mt-2">
                        Add ${((freeShippingThreshold - cartTotal) / 100).toFixed(2)} more to get free shipping!
                      </p>
                    )}
                  </div>
                </div>
                
                <Button 
                  className="w-full mb-4" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
                
                <div className="text-center text-sm text-gray-500">
                  <p>Secure checkout powered by Stripe</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
