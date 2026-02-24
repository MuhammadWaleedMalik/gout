// pages/Checkout.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Package, Shield, Truck, Lock, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getProductById } from './data/products';

interface CheckoutContent {
  pageTitle: string;
  orderSummary: string;
  productDetails: string;
  quantity: string;
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
  shippingInfo: string;
  shippingMethod: string;
  standardShipping: string;
  expressShipping: string;
  deliveryTime: string;
  paymentDetails: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  cardHolderName: string;
  billingAddress: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  placeOrder: string;
  secureCheckout: string;
  returnToCart: string;
  continueShopping: string;
  orderConfirmation: string;
  estimatedDelivery: string;
  days: string;
  freeShipping: string;
  securePayment: string;
  moneyBack: string;
  privacyNote: string;
}

// Mock language content
const mockContent: Record<string, CheckoutContent> = {
  en: {
    pageTitle: "Checkout",
    orderSummary: "Order Summary",
    productDetails: "Product Details",
    quantity: "Quantity",
    subtotal: "Subtotal",
    shipping: "Shipping",
    tax: "Tax",
    total: "Total",
    shippingInfo: "Shipping Information",
    shippingMethod: "Shipping Method",
    standardShipping: "Standard Shipping",
    expressShipping: "Express Shipping",
    deliveryTime: "Delivery Time",
    paymentDetails: "Payment Details",
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    cvc: "CVC",
    cardHolderName: "Cardholder Name",
    billingAddress: "Billing Address",
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    address: "Address",
    city: "City",
    zipCode: "ZIP/Postal Code",
    country: "Country",
    placeOrder: "Place Order",
    secureCheckout: "Secure Checkout",
    returnToCart: "Return to Cart",
    continueShopping: "Continue Shopping",
    orderConfirmation: "Order Confirmation",
    estimatedDelivery: "Estimated Delivery",
    days: "days",
    freeShipping: "Free Shipping",
    securePayment: "Secure Payment",
    moneyBack: "30-Day Money Back",
    privacyNote: "Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy."
  }
};

const Checkout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [content, setContent] = useState<CheckoutContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardHolderName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>('');

  // Find the product
  useEffect(() => {
    setIsLoading(true);
    const productId = parseInt(id || '0');
    const foundProduct = getProductById(productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/findings');
    }
    
    // Load language content
    const langContent = mockContent[currentLanguage?.code || 'en'] || mockContent.en;
    setContent(langContent);
    
    setIsLoading(false);
  }, [id, currentLanguage, navigate]);

  // Calculate prices
  const subtotal = product ? parseFloat(product.price.replace('$', '')) * quantity : 0;
  const shippingCost = shippingMethod === 'standard' ? 5.99 : 14.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shippingCost + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate order number
    const newOrderNumber = `ORD-${Date.now().toString().slice(-8)}`;
    setOrderNumber(newOrderNumber);
    setOrderPlaced(true);
    setIsSubmitting(false);
    
    // In real app, send data to backend
    console.log('Order placed:', {
      product,
      quantity,
      shippingMethod,
      formData,
      total
    });
  };

  if (isLoading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E62E62]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Product Not Found</h2>
        <button
          onClick={() => navigate('/findings')}
          className="px-6 py-2 bg-[#E62E62] text-white rounded-lg hover:bg-[#970f36] transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {content.orderConfirmation}!
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Your order has been placed successfully!
            </p>
            <p className="text-gray-700 font-medium mb-8">
              Order Number: <span className="text-[#E62E62]">{orderNumber}</span>
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{product.title}</h4>
                      <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                      <p className="font-bold text-gray-900">{product.price}</p>
                    </div>
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-medium">${shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax:</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-lg font-bold text-gray-900">Total:</span>
                      <span className="text-lg font-bold text-[#E62E62]">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Delivery Information</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-medium">Name:</span> {formData.fullName}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Email:</span> {formData.email}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Address:</span> {formData.address}, {formData.city}, {formData.country}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Phone:</span> {formData.phone}
                  </p>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      {content.estimatedDelivery}: {shippingMethod === 'standard' ? '5-7' : '1-2'} {content.days}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-gray-600">
              A confirmation email has been sent to {formData.email}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate(`/product/${product.id}`)}
                className="px-6 py-3 border-2 border-[#E62E62] text-[#E62E62] rounded-lg hover:bg-[#E62E62] hover:text-white transition-colors font-medium"
              >
                View Product Again
              </button>
              <button
                onClick={() => navigate('/findings')}
                className="px-6 py-3 bg-[#E62E62] text-white rounded-lg hover:bg-[#970f36] transition-colors font-medium"
              >
                {content.continueShopping}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-[#E62E62] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {content.returnToCart}
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{content.pageTitle}</h1>
          <div className="flex items-center space-x-2 text-sm">
            <Lock className="w-4 h-4 text-green-600" />
            <span className="text-gray-600">{content.secureCheckout}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Truck className="w-6 h-6 text-[#E62E62]" />
                  <h2 className="text-xl font-bold text-gray-900">{content.shippingInfo}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.fullName} *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E62E62] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.email} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E62E62] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.phone} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E62E62] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.country} *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E62E62] focus:border-transparent"
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="ZA">South Africa</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.address} *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E62E62] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.city} *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E62E62] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.zipCode} *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E62E62] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">{content.shippingMethod}</h2>
                <div className="space-y-4">
                  <label className="flex items-center space-x-4 p-4 border-2 rounded-lg cursor-pointer hover:border-[#E62E62] transition-colors">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="text-[#E62E62] focus:ring-[#E62E62]"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{content.standardShipping}</span>
                        <span className="font-bold">$5.99</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {content.deliveryTime}: 5-7 {content.days}
                      </p>
                    </div>
                  </label>
                  
                  <label className="flex items-center space-x-4 p-4 border-2 rounded-lg cursor-pointer hover:border-[#E62E62] transition-colors">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="text-[#E62E62] focus:ring-[#E62E62]"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{content.expressShipping}</span>
                        <span className="font-bold">$14.99</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {content.deliveryTime}: 1-2 {content.days}
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <CreditCard className="w-6 h-6 text-[#E62E62]" />
                  <h2 className="text-xl font-bold text-gray-900">{content.paymentDetails}</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.cardHolderName} *
                    </label>
                    <input
                      type="text"
                      name="cardHolderName"
                      value={formData.cardHolderName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E62E62] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.cardNumber} *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E62E62] focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {content.expiryDate} *
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E62E62] focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {content.cvc} *
                      </label>
                      <input
                        type="text"
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E62E62] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Lock className="w-4 h-4" />
                    <span>{content.privacyNote}</span>
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#E62E62] text-white rounded-lg hover:bg-[#970f36] transition-colors text-lg font-bold disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Processing...
                  </span>
                ) : (
                  `${content.placeOrder} - $${total.toFixed(2)}`
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Package className="w-6 h-6 text-[#E62E62]" />
                  <h2 className="text-xl font-bold text-gray-900">{content.orderSummary}</h2>
                </div>
                
                {/* Product Details */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">{content.productDetails}</h3>
                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{product.title}</h4>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{content.quantity}:</span>
                      <div className="flex items-center border rounded">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">{product.price}</span>
                  </div>
                </div>
                
                {/* Price Breakdown */}
                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{content.subtotal}:</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{content.shipping}:</span>
                    <span className="font-medium">${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{content.tax}:</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-lg font-bold text-gray-900">{content.total}:</span>
                    <span className="text-lg font-bold text-[#E62E62]">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Security Features */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="w-6 h-6 text-green-600" />
                  <h3 className="font-bold text-gray-900">Secure Shopping</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Truck className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{content.freeShipping}</p>
                      <p className="text-sm text-gray-600">Orders over $100</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Lock className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{content.securePayment}</p>
                      <p className="text-sm text-gray-600">SSL Encrypted</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{content.moneyBack}</p>
                      <p className="text-sm text-gray-600">Guarantee</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;