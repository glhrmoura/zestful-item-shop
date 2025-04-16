
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';
import { X } from 'lucide-react';

interface ProductFiltersProps {
  categories: string[];
  activeCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  priceRange: [number, number];
  maxPrice: number;
  onPriceChange: (range: [number, number]) => void;
  onReset: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  activeCategories,
  onCategoryChange,
  priceRange,
  maxPrice,
  onPriceChange,
  onReset
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  
  // Format price from cents to dollars
  const formatPrice = (price: number) => `$${(price / 100).toFixed(0)}`;
  
  const handleCategoryChange = (category: string) => {
    const newCategories = activeCategories.includes(category)
      ? activeCategories.filter(c => c !== category)
      : [...activeCategories, category];
      
    onCategoryChange(newCategories);
  };
  
  const handlePriceChange = (value: number[]) => {
    setLocalPriceRange([value[0], value[1]]);
  };
  
  const applyPriceFilter = () => {
    onPriceChange([localPriceRange[0], localPriceRange[1]]);
  };
  
  const filterContent = (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <Checkbox 
                id={`category-${category}`}
                checked={activeCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <label 
                htmlFor={`category-${category}`}
                className="ml-2 text-sm text-gray-600 cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price Range */}
      <div>
        <h3 className="text-lg font-medium mb-4">Price Range</h3>
        <Slider
          defaultValue={[0, maxPrice]}
          min={0}
          max={maxPrice}
          step={500}
          value={[localPriceRange[0], localPriceRange[1]]}
          onValueChange={handlePriceChange}
          onValueCommit={applyPriceFilter}
          className="mb-6"
        />
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{formatPrice(localPriceRange[0])}</span>
          <span>{formatPrice(localPriceRange[1])}</span>
        </div>
      </div>
      
      {/* Filter Actions */}
      <div className="pt-2">
        <Button 
          onClick={onReset} 
          variant="outline" 
          className="w-full"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
  
  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden md:block w-64 pr-8">
        {filterContent}
      </div>
      
      {/* Mobile Filters Toggle Button */}
      <div className="md:hidden mb-4">
        <Button 
          onClick={() => setMobileFiltersOpen(true)}
          variant="outline"
          className="w-full"
        >
          Filters
        </Button>
      </div>
      
      {/* Mobile Filters Sidebar */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="fixed right-0 top-0 h-full w-3/4 bg-white p-6 shadow-lg overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileFiltersOpen(false)}
              >
                <X size={24} />
              </Button>
            </div>
            
            {filterContent}
            
            <div className="pt-8">
              <Button 
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
