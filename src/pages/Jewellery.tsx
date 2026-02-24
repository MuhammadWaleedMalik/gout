// pages/Jewellery.tsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CategoryPage } from '../components/Shared/CategoryPage';
import { BlogPost } from '../types/findings';

// Import language files
import enJewellery from '../data/text/en/jewellery.json';
import zhJewellery from '../data/text/zh/jewellery.json';
import jaJewellery from '../data/text/ja/jewellery.json';
import esJewellery from '../data/text/es/jewellery.json';

const languageMap = {
  en: enJewellery,
  zh: zhJewellery,
  ja: jaJewellery,
  es: esJewellery,
};

const mockBlogs: BlogPost[] = [
  {
    id: 4,
    title: 'Jewellery Care Guide',
    description: 'How to properly care for and maintain your precious jewellery pieces.',
    image: 'https://picsum.photos/200/150?random=200',
    date: '2024-02-01'
  },
  {
    id: 5,
    title: 'Trending Jewellery Styles',
    description: 'Discover the hottest jewellery trends of the season.',
    image: 'https://picsum.photos/200/150?random=201',
    date: '2024-01-25'
  },
  {
    id: 6,
    title: 'Choosing Your Perfect Piece',
    description: 'Tips for selecting jewellery that matches your style and occasion.',
    image: 'https://picsum.photos/200/150?random=202',
    date: '2024-01-20'
  }
];

const Jewellery: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [pageContent, setPageContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadContent = () => {
      setIsLoading(true);
      try {
        const content = languageMap[currentLanguage?.code as keyof typeof languageMap] || languageMap.en;
        setPageContent(content);
      } catch (err) {
        console.error('Failed to load jewellery content:', err);
        setPageContent(languageMap.en);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [currentLanguage]);

  return (
    <CategoryPage
      category="jewellery"
      categoryTitle="Jewellery"
      pageContent={pageContent}
      isLoading={isLoading}
      mockBlogs={mockBlogs}
    />
  );
};

export default Jewellery;