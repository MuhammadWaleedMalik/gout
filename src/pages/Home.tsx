// Home.tsx
import React, { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// Import language files
import enHome from '../data/text/en/home.json';
import zhHome from '../data/text/zh/home.json';
import jaHome from '../data/text/ja/home.json';
import esHome from '../data/text/es/home.json';

const languageMap = {
  en: enHome,
  zh: zhHome,
  ja: jaHome,
  es: esHome,
};

interface HomeContent {
  header?: {
    logo?: string;
  };
  page1?: {
    title?: string;
    description?: string;
    backgroundImage?: string;
  };
  page2?: {
    title?: string;
    products?: Array<{
      name?: string;
      price?: string;
      image?: string;
    }>;
  };
  page3?: {
    title?: string;
    description?: string;
    backgroundImage?: string;
  };
  page4?: {
    title?: string;
    slides?: Array<{
      image?: string;
      title?: string;
      subtitle?: string;
    }>;
    blogs?: Array<{
      title?: string;
      description?: string;
      image?: string;
    }>;
  };
  page5?: {
    title?: string;
    description?: string;
    backgroundImage?: string;
  };
  page6?: {
    title?: string;
    description?: string;
    image?: string;
  };
  page7?: {
    title?: string;
    items?: Array<{
      title?: string;
      subtitle?: string;
      buttonText?: string;
    }>;
  };
  page8?: {
    title?: string;
    description?: string;
    backgroundImage?: string;
  };
  page9?: {
    title?: string;
    description?: string;
    image?: string;
  };
  page10?: {
    title?: string;
    mapUrl?: string;
  };
}

const Home: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const defaultContent = languageMap.en as HomeContent;
  const pageContent = languageMap[currentLanguage?.code as keyof typeof languageMap] || defaultContent;
  
  // State for slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const productsRef = useRef<HTMLDivElement>(null);

  // Sample product images array
  const productImages = [
    "https://bronnrocks.co.za/wp-content/uploads/2025/12/f58b5e31-e61a-4f84-abb0-724753a5a04e-300x300.png",
    "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251120_085530_1-300x225.jpg",
    "https://bronnrocks.co.za/wp-content/uploads/2026/02/IMG_20260204_110209-Photoroom-300x300.jpg",
    "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251125_085402_15-300x225.jpg",
    "https://bronnrocks.co.za/wp-content/uploads/2026/02/IMG_20260204_105012-Photoroom-300x300.jpg",
    "https://bronnrocks.co.za/wp-content/uploads/2025/11/Photoroom-20251125_095722_3-300x225.jpg",
    "https://bronnrocks.co.za/wp-content/uploads/2024/04/IMG-20240404-WA0173-150x150.jpg",
    "https://bronnrocks.co.za/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-09-at-16.24.39_b3393471-225x300.jpg",
  ];

  // Sample blog images array
  const blogImages = [
    "https://bronnrocks.co.za/wp-content/uploads/2025/08/The-Kyanite-Crystal-Meaning-1536x1152-1-400x250.webp",
    "https://bronnrocks.co.za/wp-content/uploads/2025/07/Article5_Blogpage_Rectangle-400x250.jpg",
    "https://bronnrocks.co.za/wp-content/uploads/2019/07/pexels-photo-634548.jpeg",
  ];

  // Sample slider images array
  const sliderImages = [
    "https://bronnrocks.co.za/wp-content/uploads/2025/08/The-Kyanite-Crystal-Meaning-1536x1152-1-400x250.webp",
    "https://bronnrocks.co.za/wp-content/uploads/2025/07/Article5_Blogpage_Rectangle-400x250.jpg",
    "https://bronnrocks.co.za/wp-content/uploads/2019/07/pexels-photo-634548.jpeg",
  ];

  // Sample oval images array
  const ovalImages = [
    "https://bronnrocks.co.za/wp-content/uploads/2025/07/brace-480x480.png",
    "https://bronnrocks.co.za/wp-content/uploads/2025/07/pea-480x480.png",
    "https://bronnrocks.co.za/wp-content/uploads/2025/07/chi-480x480.png",  
    "https://bronnrocks.co.za/wp-content/uploads/2025/07/silver-480x480.png",  
    "https://bronnrocks.co.za/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-29-at-12.01.59_dbf12858-600x800.jpg",  
    "https://bronnrocks.co.za/wp-content/uploads/2025/06/aven-crown-300x300.png",  
  ];

  const scrollToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const scrollToProduct = (index: number) => {
    if (productsRef.current) {
      const scrollAmount = index * 320; // Approximate width of each product card
      productsRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "Times New Roman" }}>
      {/* Page 1: Full background image */}
      <section className="h-screen relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${pageContent.page1?.backgroundImage || "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=2000"}')`
          }}
        >
          <div className="absolute  flex items-center justify-center">
            {/* <div className="text-center text-white px-4 max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                {pageContent.page1?.title || "Welcome to The Rockshop"}
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                {pageContent.page1?.description || "Discover unique gemstones, crystals, and handmade jewelry"}
              </p>
            </div> */}
          </div>
        </div>
      </section>

      {/* Page 2: Latest Products with horizontal scroll */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-8xl font-bold text-center mb-12 text-[#3971C3] shadow-lg">
            {pageContent.page2?.title || "Latest Products Listed"}
          </h2>
          
          <div 
            ref={productsRef}
            className="flex overflow-x-auto  space-x-6 pb-8 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {pageContent.page2?.products?.map((product, index) => (
              <div 
                key={index}
                className="min-w-[500px] bg-white border-black border-2  rounded-lg  overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img 
                  src={product.image || productImages[index % productImages.length]}
                  alt={product.name}
                  className="w-full h-64 object-contain"
                />
                <div className=" relative p-6 items-center justify-center align-middle">
                  <h3 className="text-xl font-semibold mb-2">{product.name || `Product ${index + 1}`}</h3>
                  <p className="text-2xl font-bold text-orange-500">
                    {product.price || `$${(99 + index * 10).toFixed(2)}`}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center space-x-3 mt-8">
            {pageContent.page2?.products?.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToProduct(index)}
                className={`w-3 h-3 rounded-full ${
                  index === 0 ? 'bg-orange-500' : 'bg-gray-300'
                } hover:bg-orange-400 transition-colors`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Page 3: About Us with background image */}
      <section className="h-screen relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${pageContent.page3?.backgroundImage || "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2000"}')`
          }}
        />
      </section>

      {/* Page 4: Gradient background with slider and blogs */}
      <section 
        className="py-20 px-4 md:px-8"
        style={{
          background: 'linear-gradient(90deg, #BECEDB 0%, #EDD0BC 100%)'
        }}
      >
        <div className="container mx-auto">
          {/* Slider */}
          <div className="mb-20">
            <div className="relative overflow-hidden rounded-xl shadow-2xl max-w-6xl mx-auto">
              <div className="relative h-96">
                <img 
                  src={sliderImages[currentSlide]}
                  alt={`Slide ${currentSlide + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {pageContent.page4?.slides?.[currentSlide]?.title || `Slide Title ${currentSlide + 1}`}
                  </h3>
                  <p className="text-xl text-white/90">
                    {pageContent.page4?.slides?.[currentSlide]?.subtitle || `Slide subtitle goes here ${currentSlide + 1}`}
                  </p>
                </div>
              </div>
              
              {/* Slider dots */}
              <div className="flex justify-center space-x-4 p-4 bg-white/10 backdrop-blur-sm">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-4 h-4 rounded-full ${
                      currentSlide === index ? 'bg-white' : 'bg-white/50'
                    } hover:bg-white transition-colors`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Blog Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pageContent.page4?.blogs?.map((blog, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={blog.image || blogImages[index % blogImages.length]}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{blog.title || `Blog Title ${index + 1}`}</h3>
                  <p className="text-gray-600">
                    {blog.description || `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Page 5: Another background image */}
      <section className="h-screen relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${pageContent.page5?.backgroundImage || "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2000"}')`
          }}
        />
      </section>

      {/* Page 6: Text on left, image on right */}
      <section className="py-20 px-45 md:px-48 bg-[#F1F5FF]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  items-center">
            <div className='bg-[#FF447B]    px-2'>
              <h2 className="text-6xl font-bold mb-6  text-white ">
                {pageContent.page6?.title || "Our Story"}
              </h2>
              <p className="text-xl font-bold mb-6  text-white ">
                {pageContent.page6?.description || "For over two decades, we've been curating the finest collection of gemstones and crystals from around the world. Our passion for natural beauty drives everything we do."}
              </p>
              <p className="text-lg text-white">
                Each piece in our collection is carefully selected for its unique beauty and energetic properties.
              </p>
            </div>
            <div className="relative">
              <img 
                src={pageContent.page6?.image || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000"}
                alt="Our Collection"
                className="rounded-xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Page 7: Products grid (2 rows of 3 items each) */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            {pageContent.page7?.title || "Our Collections"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {pageContent.page7?.items?.map((item, index) => (
              <div key={index} className="text-center">
                <div className="mb-6 mx-auto w-48 h-60 rounded-full overflow-hidden border-4 border-orange-100">
                  <img 
                    src={ovalImages[index % ovalImages.length]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title || "Bracelets"}</h3>
                <p className="text-gray-600 mb-6">
                  {item.subtitle || "We stock a wide range of bracelets in gemstones and stainless steel. As well as necklaces in stone and sterling silver set with stones. Our range changes often"}
                </p>
                <button className="bg-[#FF0F6A] text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors">
                  {item.buttonText || "Shop Now"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Page 8: Text overlay on background image */}
      <section className="h-screen relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${pageContent.page8?.backgroundImage || "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=2000"}')`
          }}
        >
          <div className="absolute flex  justify-center top-1/2 left-1/3 items-center">
            <div className="max-w-3xl mx-auto text-center text-blue-950 px-4">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {pageContent.page8?.title || "Hartbeespoort Dam"}
              </h2>
              <p className="text-xl md:text-2xl">
                {pageContent.page8?.description || "Hartbeespoort is a popular tourist spot just outside Johannesburg, known for its scenic dam, mountains, and weekend getaways. A visit to The Rockshop at Harties is a must—browse beautiful crystals, fossils, and silver jewellery, enjoy great coffee on the deck, and let the kids play in the Scratch Patch."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Page 9: Heading with image below */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            {pageContent.page9?.title || "Visit Our Store"}
          </h2>
          <img 
            src={pageContent.page9?.image || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000"}
            alt="Store Location"
            className="w-full h-auto rounded-xl shadow-2xl"
          />
        </div>
      </section>

      {/* Page 10: Map */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            {pageContent.page10?.title || "Find Us"}
          </h2>
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src={pageContent.page10?.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.123456789012!2d28.123456!3d-25.987654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e957d8b12345678%3A0x9876543210abcdef!2sThe%20Rockshop!5e0!3m2!1sen!2sza!4v1234567890123!5m2!1sen!2sza"}
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;