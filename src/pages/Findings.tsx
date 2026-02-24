// pages/Findings.tsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CategoryPage } from '../components/Shared/CategoryPage';
import { BlogPost } from '../types/findings';

// Import language files
import enFindings from '../data/text/en/findings.json';
import zhFindings from '../data/text/zh/findings.json';
import jaFindings from '../data/text/ja/findings.json';
import esFindings from '../data/text/es/findings.json';

const languageMap = {
  en: enFindings,
  zh: zhFindings,
  ja: jaFindings,
  es: esFindings,
};

const mockBlogs: BlogPost[] = [
  {
    id: 1,
    title: 'How to Choose the Right Finding',
    description: 'Learn about different types of findings and their uses in jewelry making.',
    image: 'https://picsum.photos/200/150?random=100',
    date: '2024-01-15'
  },
  {
    id: 2,
    title: 'Latest Trends in Jewelry Findings',
    description: 'Discover the newest trends in jewelry findings for 2024.',
    image: 'https://picsum.photos/200/150?random=101',
    date: '2024-01-10'
  },
  {
    id: 3,
    title: 'Caring for Your Jewelry Findings',
    description: 'Tips and tricks to maintain and care for your jewelry findings.',
    image: 'https://picsum.photos/200/150?random=102',
    date: '2024-01-05'
  }
];

const Findings: React.FC = () => {
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
        console.error('Failed to load findings content:', err);
        setPageContent(languageMap.en);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [currentLanguage]);

  return (
    <CategoryPage
      category="findings"
      categoryTitle="Findings"
      pageContent={pageContent}
      isLoading={isLoading}
      mockBlogs={mockBlogs}
    />
  );
};

export default Findings;