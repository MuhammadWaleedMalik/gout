// pages/Beads.tsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CategoryPage } from '../components/Shared/CategoryPage';
import { BlogPost } from '../types/findings';

import enBeads from '../data/text/en/beads.json';
import zhBeads from '../data/text/zh/beads.json';
import jaBeads from '../data/text/ja/beads.json';
import esBeads from '../data/text/es/beads.json';

const languageMap = {
  en: enBeads,
  zh: zhBeads,
  ja: jaBeads,
  es: esBeads,
};

const mockBlogs: BlogPost[] = [
  {
    id: 13,
    title: 'Bead Types and Materials',
    description: 'Comprehensive guide to different bead materials.',
    image: 'https://picsum.photos/200/150?random=500',
    date: '2024-02-20'
  },
  {
    id: 14,
    title: 'Creative Beading Projects',
    description: 'Inspiring ideas for your next beading project.',
    image: 'https://picsum.photos/200/150?random=501',
    date: '2024-02-12'
  },
  {
    id: 15,
    title: 'Bead Storage Solutions',
    description: 'Organize your bead collection efficiently.',
    image: 'https://picsum.photos/200/150?random=502',
    date: '2024-02-05'
  }
];

const Beads: React.FC = () => {
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
        console.error('Failed to load beads content:', err);
        setPageContent(languageMap.en);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [currentLanguage]);

  return (
    <CategoryPage
      category="beads"
      categoryTitle="Beads"
      pageContent={pageContent}
      isLoading={isLoading}
      mockBlogs={mockBlogs}
    />
  );
};

export default Beads;