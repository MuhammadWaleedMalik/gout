// pages/ProductDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getProductById, getProductsByCategory } from './data/products';
import { Finding } from '../types/findings';
interface ProductDetailContent {
  backToShop: string;
  addToCart: string;
  buyNow: string;
  description: string;
  specifications: string;
  shippingInfo: string;
  reviews: string;
  relatedProducts: string;
  inStock: string;
  outOfStock: string;
  quantity: string;
  freeShipping: string;
  securePayment: string;
  easyReturns: string;
  shareProduct: string;
  addToWishlist: string;
  category: string;
  sku: string;
  tags: string;
}

// Mock language content
const mockContent: Record<string, ProductDetailContent> = {
  en: {
    backToShop: "Back to Shop",
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    description: "Description",
    specifications: "Specifications",
    shippingInfo: "Shipping Information",
    reviews: "Customer Reviews",
    relatedProducts: "Related Products",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    quantity: "Quantity",
    freeShipping: "Free Shipping",
    securePayment: "Secure Payment",
    easyReturns: "Easy Returns",
    shareProduct: "Share Product",
    addToWishlist: "Add to Wishlist",
    category: "Category",
    sku: "SKU",
    tags: "Tags"
  }
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [content, setContent] = useState<ProductDetailContent | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Finding | null>(null);
  
  // Find the product from shared data
  useEffect(() => {
    setIsLoading(true);
    const productId = parseInt(id || '0');
    const foundProduct = getProductById(productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Redirect to findings page if product not found
      navigate('/findings');
    }
    
    // Load language content
    const langContent = mockContent[currentLanguage?.code || 'en'] || mockContent.en;
    setContent(langContent);
    
    setIsLoading(false);
  }, [id, currentLanguage, navigate]);

  // Related products (from same category, excluding current product)
  const relatedProducts = product ? 
    getProductsByCategory(product.category)
      .filter(p => p.id !== product?.id)
      .slice(0, 4) : [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E62E62]"></div>
      </div>
    );
  }

  if (!product || !content) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Product Not Found</h2>
        <button
          onClick={() => navigate('/findings')}
          className="px-6 py-2 bg-[#E62E62] text-white rounded-lg hover:bg-[#970f36] transition-colors"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} of ${product.title} to cart`);
    // You can add Redux/Context or API call here
  };

  const handleBuyNow = () => {
    // Buy now logic here
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-[#E62E62] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              {content.backToShop}
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{product.category}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Main Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Product Images */}
          <div>
            {/* Main Image */}
            <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/500/500?random=${product.id}`;
                  }}
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {[product.image, product.image, product.image, product.image].map((img, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-lg overflow-hidden cursor-pointer hover:border-[#E62E62] transition-colors"
                >
                  <img
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-20 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/100/100?random=${product.id}-${index}`;
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Product Actions */}
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => {}}
                className="flex-1 flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title={content.shareProduct}
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </button>
              <button
                onClick={() => {}}
                className="flex-1 flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title={content.addToWishlist}
              >
                <Heart className="w-5 h-5 mr-2" />
                Wishlist
              </button>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div>
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-gray-500">{content.category}:</span>
                <span className="text-sm font-medium text-gray-700 capitalize">{product.category}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(24 reviews)</span>
                </div>
                <div className="text-sm text-green-600 flex items-center">
                  <Check className="w-4 h-4 mr-1" />
                  {content.inStock}
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">{product.price}</div>
              <div className="text-sm text-gray-500">Including VAT</div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{content.description}</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-2">{content.quantity}</h3>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-lg hover:bg-gray-50"
                >
                  -
                </button>
                <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-300">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-lg hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>


// In ProductDetail.tsx, update the action buttons section:
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
  <button
    onClick={handleAddToCart}
    className="flex items-center justify-center px-6 py-3 bg-[#E62E62] text-white rounded-lg hover:bg-[#970f36] transition-colors text-lg font-medium"
  >
    <ShoppingCart className="w-5 h-5 mr-2" />
    {content.addToCart}
  </button>
  <Link
    to={`/checkout/${product.id}`}
    className="flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors text-lg font-medium"
  >
    {content.buyNow}
  </Link>
</div>
            {/* Product Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center space-x-3 p-3 bg-white border rounded-lg">
                <Truck className="w-6 h-6 text-[#E62E62]" />
                <div>
                  <div className="font-medium">{content.freeShipping}</div>
                  <div className="text-sm text-gray-500">Worldwide</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white border rounded-lg">
                <Shield className="w-6 h-6 text-[#E62E62]" />
                <div>
                  <div className="font-medium">{content.securePayment}</div>
                  <div className="text-sm text-gray-500">100% Secure</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white border rounded-lg">
                <RotateCcw className="w-6 h-6 text-[#E62E62]" />
                <div>
                  <div className="font-medium">{content.easyReturns}</div>
                  <div className="text-sm text-gray-500">30 Days</div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{content.specifications}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-gray-600">{content.category}:</span>
                    <span className="text-gray-900 capitalize">{product.category}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-gray-600">{content.sku}:</span>
                    <span className="text-gray-900">{product.category.toUpperCase()}-{product.id.toString().padStart(3, '0')}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-gray-600">{content.tags}:</span>
                    <span className="text-gray-900">Jewelry, Stones, Handmade</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{content.relatedProducts}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200"
                >
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://picsum.photos/300/200?random=${relatedProduct.id}`;
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-[#E62E62] transition-colors line-clamp-1">
                      {relatedProduct.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {relatedProduct.description}
                    </p>
                    <div className="text-lg font-bold text-gray-900">
                      {relatedProduct.price}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;