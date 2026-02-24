// pages/Rocks.tsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CategoryPage } from '../components/Shared/CategoryPage';
import { BlogPost } from '../types/findings';

import enRocks from '../data/text/en/rocks.json';
import zhRocks from '../data/text/zh/rocks.json';
import jaRocks from '../data/text/ja/rocks.json';
import esRocks from '../data/text/es/rocks.json';

const languageMap = {
  en: enRocks,
  zh: zhRocks,
  ja: jaRocks,
  es: esRocks,
};

const mockBlogs: BlogPost[] = [
  {
    id: 16,
    title: 'Rock Identification Guide',
    description: 'Learn how to identify different types of rocks and minerals.',
    image: 'https://picsum.photos/200/150?random=600',
    date: '2024-02-25'
  },
  {
    id: 17,
    title: 'Rock Collecting Tips',
    description: 'Essential tips for starting your rock collection.',
    image: 'https://picsum.photos/200/150?random=601',
    date: '2024-02-18'
  },
  {
    id: 18,
    title: 'Displaying Rock Collections',
    description: 'Creative ways to display your rock specimens.',
    image: 'https://picsum.photos/200/150?random=602',
    date: '2024-02-10'
  }
];

const Rocks: React.FC = () => {
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
        console.error('Failed to load rocks content:', err);
        setPageContent(languageMap.en);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [currentLanguage]);

  return (
    <CategoryPage
      category="rocks"
      categoryTitle="Rocks"
      pageContent={pageContent}
      isLoading={isLoading}
      mockBlogs={mockBlogs}
    />
  );
};

export default Rocks;