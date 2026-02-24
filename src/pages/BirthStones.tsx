// pages/Birthstones.tsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CategoryPage } from '../components/Shared/CategoryPage';
import { BlogPost } from '../types/findings';

import enBirthstones from '../data/text/en/birthstones.json';
import zhBirthstones from '../data/text/zh/birthstones.json';
import jaBirthstones from '../data/text/ja/birthstones.json';
import esBirthstones from '../data/text/es/birthstones.json';

const languageMap = {
  en: enBirthstones,
  zh: zhBirthstones,
  ja: jaBirthstones,
  es: esBirthstones,
};

const mockBlogs: BlogPost[] = [
  {
    id: 22,
    title: 'Birthstone Meanings',
    description: 'Discover the meanings behind each birthstone.',
    image: 'https://picsum.photos/200/150?random=800',
    date: '2024-03-05'
  },
  {
    id: 23,
    title: 'Birthstone Jewelry Ideas',
    description: 'Creative jewelry designs featuring birthstones.',
    image: 'https://picsum.photos/200/150?random=801',
    date: '2024-02-28'
  },
  {
    id: 24,
    title: 'Birthstone Care Guide',
    description: 'How to care for and maintain birthstone jewelry.',
    image: 'https://picsum.photos/200/150?random=802',
    date: '2024-02-20'
  }
];

const Birthstones: React.FC = () => {
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
        console.error('Failed to load birthstones content:', err);
        setPageContent(languageMap.en);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [currentLanguage]);

  return (
    <CategoryPage
      category="birthstones"
      categoryTitle="Birthstones"
      pageContent={pageContent}
      isLoading={isLoading}
      mockBlogs={mockBlogs}
    />
  );
};

export default Birthstones;