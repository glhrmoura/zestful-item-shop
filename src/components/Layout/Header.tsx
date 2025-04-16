
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Search 
} from 'lucide-react';
import { Button } from '../ui/button';

export const Header: React.FC = () => {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            ZestShop
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">
              Shop
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={20} />
            </Button>
            
            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden pt-4 pb-2 space-y-3">
            <Link 
              to="/" 
              className="block py-2 text-gray-700 hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="block py-2 text-gray-700 hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/about" 
              className="block py-2 text-gray-700 hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 text-gray-700 hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        )}
        
        {/* Search Bar */}
        {searchOpen && (
          <div className="pt-4 pb-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
