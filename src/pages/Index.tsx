
import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { ProductGrid } from '../components/Product/ProductGrid';
import { products } from '../data/products';
import { Button } from '../components/ui/button';
import { ArrowRight, ShoppingBag, Truck, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState(products.slice(0, 4));
  const featuredCategories = ["Electronics", "Fashion", "Home", "Fitness"];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100 py-20">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium mb-4">
              New Collection
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Discover Amazing Products for Your Lifestyle
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Shop the latest trends and find unique items that match your style. From electronics to fashion, we've got everything you need.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button 
                  className="bg-primary hover:bg-primary-dark text-white"
                  size="lg"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative z-10">
              <img 
                src="/images/products/headphones.jpg" 
                alt="Featured Product" 
                className="rounded-lg shadow-xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/products/placeholder.svg";
                }}
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4">
                <p className="text-gray-600 font-medium">Premium Headphones</p>
                <p className="text-primary font-bold">$249.99</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-secondary/30 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-primary/30 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of products across different categories to find what you're looking for.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <Link 
                to={`/products?category=${category.toLowerCase()}`} 
                key={category}
                className="group"
              >
                <div className="bg-gray-50 rounded-lg overflow-hidden aspect-square flex flex-col items-center justify-center p-8 transition-all hover:bg-gray-100">
                  <div className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 ${
                    index % 4 === 0 ? 'bg-blue-100 text-blue-600' : 
                    index % 4 === 1 ? 'bg-purple-100 text-purple-600' :
                    index % 4 === 2 ? 'bg-amber-100 text-amber-600' :
                    'bg-emerald-100 text-emerald-600'
                  }`}>
                    {index % 4 === 0 && <ShoppingBag className="h-8 w-8" />}
                    {index % 4 === 1 && <Shield className="h-8 w-8" />}
                    {index % 4 === 2 && <Truck className="h-8 w-8" />}
                    {index % 4 === 3 && <ShoppingBag className="h-8 w-8" />}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {category}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray-600">
                Handpicked products that our customers love
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
      
      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Shipping</h3>
              <p className="text-gray-600">
                Free delivery for all orders over $50. We ship all products within 24 hours.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="bg-secondary/10 p-3 rounded-full mb-4">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Payment</h3>
              <p className="text-gray-600">
                We ensure secure payment with multiple payment methods and fraud protection.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="bg-accent/10 p-3 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Returns</h3>
              <p className="text-gray-600">
                Return any item within 30 days if you're not completely satisfied.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Shopping Today
          </h2>
          <p className="max-w-2xl mx-auto text-lg mb-8 opacity-90">
            Join thousands of satisfied customers and experience our premium products and exceptional service.
          </p>
          <Link to="/products">
            <Button 
              className="bg-white hover:bg-gray-100 text-primary"
              size="lg"
            >
              Browse Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
