
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/button';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  // Format price from cents to dollars with 2 decimal places
  const formattedPrice = (product.price / 100).toFixed(2);
  
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        {/* Product image */}
        <Link to={`/product/${product.id}`} className="block relative h-64 overflow-hidden">
          <img 
            src={product.imageUrl || "/images/products/placeholder.svg"} 
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/products/placeholder.svg";
            }}
          />
        </Link>
        
        {/* Out of stock badge */}
        {!product.inStock && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Out of Stock
          </div>
        )}
        
        {/* Quick actions */}
        <div className="absolute bottom-4 left-0 right-0 mx-auto w-3/4 flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            className="bg-white text-primary hover:bg-primary hover:text-white rounded-full flex-1"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              product.inStock && addToCart(product);
            }}
            disabled={!product.inStock}
          >
            <ShoppingCart size={16} className="mr-2" />
            Add to Cart
          </Button>
          
          <Link to={`/product/${product.id}`}>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white border-gray-200 rounded-full h-9 w-9"
            >
              <Eye size={16} />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-gray-900 font-medium text-lg mb-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-gray-900 font-semibold">
            ${formattedPrice}
          </span>
          
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
};
