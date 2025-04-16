
import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/button';
import { X, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

export const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  
  // Format price from cents to dollars
  const formattedPrice = (item.price / 100).toFixed(2);
  const formattedTotalPrice = ((item.price * item.quantity) / 100).toFixed(2);
  
  return (
    <div className="flex items-center py-4 border-b last:border-b-0">
      {/* Product Image */}
      <div className="w-20 h-20 mr-4">
        <Link to={`/product/${item.id}`}>
          <img 
            src={item.imageUrl || "/images/products/placeholder.svg"} 
            alt={item.name} 
            className="w-full h-full object-cover rounded"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/products/placeholder.svg";
            }}
          />
        </Link>
      </div>
      
      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          {/* Product Name & Info */}
          <div className="mb-2 sm:mb-0">
            <Link 
              to={`/product/${item.id}`} 
              className="text-lg font-medium text-gray-900 hover:text-primary"
            >
              {item.name}
            </Link>
            <p className="text-sm text-gray-500 line-clamp-1">
              {item.category}
            </p>
            <p className="text-sm text-gray-900 mt-1 sm:hidden">
              ${formattedPrice}
            </p>
          </div>
          
          {/* Price - Desktop */}
          <div className="hidden sm:block text-right sm:text-center sm:w-24">
            <p className="text-sm text-gray-700">${formattedPrice}</p>
          </div>
        </div>
        
        {/* Actions Row */}
        <div className="flex items-center justify-between mt-3">
          {/* Quantity Selector */}
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus size={16} />
            </Button>
            
            <span className="mx-3 text-gray-800 w-6 text-center">
              {item.quantity}
            </span>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus size={16} />
            </Button>
          </div>
          
          {/* Total & Remove */}
          <div className="flex items-center space-x-4">
            <p className="text-gray-900 font-medium">
              ${formattedTotalPrice}
            </p>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-gray-400 hover:text-red-500"
              onClick={() => removeFromCart(item.id)}
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
