
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ProductGrid } from '../components/Product/ProductGrid';
import { ProductFilters } from '../components/Product/ProductFilters';
import { products } from '../data/products';
import { Product } from '../types';

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  
  const allCategories = Array.from(new Set(products.map(p => p.category)));
  const maxPrice = Math.max(...products.map(p => p.price));
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeCategories, setActiveCategories] = useState<string[]>(
    categoryParam && categoryParam !== 'all' 
      ? [categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)] 
      : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [sortBy, setSortBy] = useState<string>('featured');
  
  useEffect(() => {
    applyFilters();
  }, [activeCategories, priceRange, sortBy]);
  
  const applyFilters = () => {
    let filtered = [...products];
    
    // Apply category filter
    if (activeCategories.length > 0) {
      filtered = filtered.filter(product => 
        activeCategories.includes(product.category)
      );
    }
    
    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default: // 'featured' - we'll assume the original order is the featured order
        break;
    }
    
    setFilteredProducts(filtered);
  };
  
  const resetFilters = () => {
    setActiveCategories([]);
    setPriceRange([0, maxPrice]);
    setSortBy('featured');
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-gray-600">
            Discover our collection of {filteredProducts.length} products
          </p>
        </div>
        
        {/* Filters & Sorting Bar (Mobile) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6 md:hidden">
          <div className="w-full sm:w-auto">
            <select 
              className="w-full border rounded-md p-2 bg-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <ProductFilters 
            categories={allCategories}
            activeCategories={activeCategories}
            onCategoryChange={setActiveCategories}
            priceRange={priceRange}
            maxPrice={maxPrice}
            onPriceChange={setPriceRange}
            onReset={resetFilters}
          />
          
          {/* Products */}
          <div className="flex-1">
            {/* Sorting (Desktop) */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
              
              <div>
                <select 
                  className="border rounded-md p-2 bg-white"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>
            
            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms.
                </p>
                <button 
                  className="text-primary hover:underline"
                  onClick={resetFilters}
                >
                  Reset all filters
                </button>
              </div>
            )}
            
            {/* Product Grid */}
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
