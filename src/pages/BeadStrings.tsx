// pages/BeadStrings.tsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CategoryPage } from '../components/Shared/CategoryPage';
import { BlogPost } from '../types/findings';

import enBeadStrings from '../data/text/en/beadStrings.json';
import zhBeadStrings from '../data/text/zh/beadStrings.json';
import jaBeadStrings from '../data/text/ja/beadStrings.json';
import esBeadStrings from '../data/text/es/beadStrings.json';

const languageMap = {
  en: enBeadStrings,
  zh: zhBeadStrings,
  ja: jaBeadStrings,
  es: esBeadStrings,
};

const mockBlogs: BlogPost[] = [
  {
    id: 7,
    title: 'Stringing Techniques for Beads',
    description: 'Learn different methods to string beads for professional results.',
    image: 'https://picsum.photos/200/150?random=300',
    date: '2024-02-10'
  },
  {
    id: 8,
    title: 'Choosing Bead String Materials',
    description: 'Selecting the right stringing material for your bead projects.',
    image: 'https://picsum.photos/200/150?random=301',
    date: '2024-02-05'
  },
  {
    id: 9,
    title: 'Bead String Maintenance',
    description: 'How to care for and maintain your bead strings.',
    image: 'https://picsum.photos/200/150?random=302',
    date: '2024-01-30'
  }
];

const BeadStrings: React.FC = () => {
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
        console.error('Failed to load bead strings content:', err);
        setPageContent(languageMap.en);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [currentLanguage]);

  return (
    <CategoryPage
      category="beadStrings"
      categoryTitle="Bead Strings"
      pageContent={pageContent}
      isLoading={isLoading}
      mockBlogs={mockBlogs}
    />
  );
};

export default BeadStrings;