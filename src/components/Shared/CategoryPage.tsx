// components/Shared/CategoryPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Finding, BlogPost, PaginationProps } from '../../types/findings';
import { getProductsByCategory } from '../../pages/data/products';

interface CategoryPageProps {
  category: string;
  categoryTitle: string;
  pageContent: any;
  isLoading: boolean;
  mockBlogs: BlogPost[];
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = (): number[] => {
    const pages: number[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        <div className="flex space-x-1">
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${currentPage === pageNum
                  ? 'bg-[#E62E62] text-white'
                  : 'border border-gray-300 hover:bg-gray-50'
                }`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

const BlogCard: React.FC<{ blog: BlogPost }> = ({ blog }) => {
  return (
    <Link
      to={`/blog/${blog.id}`}
      className="block group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200"
    >
      <div className="h-40 overflow-hidden bg-gray-100">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://picsum.photos/200/150?random=${blog.id}`;
          }}
        />
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-[#E62E62] transition-colors line-clamp-2">
          {blog.title}
        </h4>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {blog.description}
        </p>
        {blog.date && (
          <div className="mt-2 text-xs text-gray-500 border-t pt-2">
            {new Date(blog.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        )}
      </div>
    </Link>
  );
};

const ProductCard: React.FC<{ product: Finding; viewDetailsText: string }> = ({ product, viewDetailsText }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200"
    >
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://picsum.photos/300/200?random=${product.id}`;
          }}
        />
        <div className="absolute top-2 right-2 bg-[#E62E62] text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md">
          New
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-[#E62E62] transition-colors">
          {product.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            {product.price}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/product/${product.id}`;
            }}
            className="px-4 py-2 bg-[#E62E62] text-white rounded-lg hover:bg-[#970f36] transition-colors text-sm font-medium shadow-sm hover:shadow-md"
          >
            {viewDetailsText}
          </button>
        </div>
      </div>
    </Link>
  );
};

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  categoryTitle,
  pageContent,
  isLoading,
  mockBlogs
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<Finding[]>([]);
  const itemsPerPage = 12;

  // Load products for this category
  useEffect(() => {
    const categoryProducts = getProductsByCategory(category);
    setProducts(categoryProducts);
  }, [category]);

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    
    return products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.price.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, products]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading || !pageContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E62E62]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-20">
      {/* Hero Section */}
      <div className="bg-white text-black py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="relative max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={pageContent.searchPlaceholder}
                className="block w-full pl-10 pr-3 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#E62E62] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
              {pageContent.pageTitle}
            </h1>
            <p className="text-lg sm:text-xl text-black max-w-3xl">
              {pageContent.pageDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Products */}
          <div className="lg:w-3/4">
            {/* Category Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {pageContent.categoryTitle}
              </h2>
              <p className="text-gray-600 mt-2">
                {filteredProducts.length === 0 ? (
                  pageContent.noResults
                ) : (
                  pageContent.showingResults
                    .replace('{current}', currentItems.length.toString())
                    .replace('{total}', filteredProducts.length.toString())
                )}
              </p>
            </div>

            {/* Products Grid - 3 columns per row */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Results Found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search terms or browse our full collection
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-6 py-2 bg-[#E62E62] text-white rounded-lg hover:bg-[#970f36] transition-colors"
                >
                  View All {categoryTitle}
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {currentItems.map((item) => (
                    <ProductCard
                      key={item.id}
                      product={item}
                      viewDetailsText={pageContent.viewDetails}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>

          {/* Right Side - Blogs */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                {pageContent.blogSectionTitle}
              </h3>

              <div className="space-y-6">
                {mockBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-gradient-to-r from-pink-50 to-red-50 rounded-lg border border-pink-100">
                <h4 className="font-semibold text-[#E62E62] mb-2 text-lg">
                  Why Choose Our {categoryTitle}?
                </h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-center">
                    <span className="text-[#E62E62] mr-2">✓</span>
                    Premium quality materials
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#E62E62] mr-2">✓</span>
                    Handcrafted with precision
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#E62E62] mr-2">✓</span>
                    Wide variety of styles
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#E62E62] mr-2">✓</span>
                    Competitive pricing
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#E62E62] mr-2">✓</span>
                    Worldwide shipping
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-pink-200">
                  <Link 
                    to="/contact" 
                    className="text-[#E62E62] text-sm font-medium hover:underline"
                  >
                    Need help? Contact our experts →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};