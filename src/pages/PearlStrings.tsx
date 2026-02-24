// pages/PearlStrings.tsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CategoryPage } from '../components/Shared/CategoryPage';
import { BlogPost } from '../types/findings';

import enPearlStrings from '../data/text/en/pearlStrings.json';
import zhPearlStrings from '../data/text/zh/pearlStrings.json';
import jaPearlStrings from '../data/text/ja/pearlStrings.json';
import esPearlStrings from '../data/text/es/pearlStrings.json';

const languageMap = {
  en: enPearlStrings,
  zh: zhPearlStrings,
  ja: jaPearlStrings,
  es: esPearlStrings,
};

const mockBlogs: BlogPost[] = [
  {
    id: 10,
    title: 'Types of Pearl Strings',
    description: 'Learn about different types of pearls and their stringing methods.',
    image: 'https://picsum.photos/200/150?random=400',
    date: '2024-02-15'
  },
  {
    id: 11,
    title: 'Pearl Grading Guide',
    description: 'Understanding pearl quality and grading systems.',
    image: 'https://picsum.photos/200/150?random=401',
    date: '2024-02-08'
  },
  {
    id: 12,
    title: 'Caring for Pearl Strings',
    description: 'Essential tips for maintaining your pearl jewelry.',
    image: 'https://picsum.photos/200/150?random=402',
    date: '2024-02-01'
  }
];

const PearlStrings: React.FC = () => {
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
        console.error('Failed to load pearl strings content:', err);
        setPageContent(languageMap.en);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [currentLanguage]);

  return (
    <CategoryPage
      category="pearlStrings"
      categoryTitle="Pearl Strings"
      pageContent={pageContent}
      isLoading={isLoading}
      mockBlogs={mockBlogs}
    />
  );
};

export default PearlStrings;