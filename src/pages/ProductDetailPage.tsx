
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { ProductGrid } from '../components/Product/ProductGrid';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Check, 
  ChevronLeft
} from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, cartItems } = useCart();
  const product = products.find(p => p.id === Number(id));
  
  const isInCart = cartItems.some(item => item.id === Number(id));
  
  // Format price from cents to dollars
  const formattedPrice = product ? (product.price / 100).toFixed(2) : '0.00';
  
  // Get related products (same category, excluding current product)
  const relatedProducts = product 
    ? products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4) 
    : [];
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/products">
            <Button>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray-400 mx-1">/</span>
                <Link 
                  to={`/products?category=${product.category.toLowerCase()}`} 
                  className="text-gray-600 hover:text-primary"
                >
                  {product.category}
                </Link>
              </li>
              <li>
                <span className="text-gray-400 mx-1">/</span>
                <span className="text-gray-900 font-medium">{product.name}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      
      {/* Product Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Product Image */}
            <div className="lg:w-1/2">
              <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <img 
                  src={product.imageUrl || "/images/products/placeholder.svg"} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/products/placeholder.svg";
                  }}
                />
              </div>
            </div>
            
            {/* Product Info */}
            <div className="lg:w-1/2">
              <div className="mb-6">
                {/* Category tag */}
                <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full mb-4">
                  {product.category}
                </span>
                
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold mr-4">
                    ${formattedPrice}
                  </span>
                  
                  {!product.inStock && (
                    <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full">
                      Out of Stock
                    </span>
                  )}
                  
                  {product.inStock && (
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                      <Check className="w-3 h-3 mr-1" />
                      In Stock
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-8">
                  {product.description}
                </p>
              </div>
              
              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold mb-3">Key Features:</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Actions */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Button 
                  className={`flex-1 sm:flex-none ${isInCart ? 'bg-green-600 hover:bg-green-700' : ''}`} 
                  size="lg"
                  disabled={!product.inStock}
                  onClick={() => product.inStock && addToCart(product)}
                >
                  {isInCart ? (
                    <>
                      <Check className="mr-2" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
                
                <Button variant="outline" size="lg" className="sm:flex-none">
                  <Heart className="mr-2" />
                  Save
                </Button>
                
                <Button variant="outline" size="icon" className="sm:flex-none">
                  <Share2 />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetailPage;
