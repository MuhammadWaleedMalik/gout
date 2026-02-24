// types/findings.ts
export interface Finding {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  date?: string;
}

export interface FindingsContent {
  pageTitle: string;
  pageDescription: string;
  categoryTitle: string;
  searchPlaceholder: string;
  viewDetails: string;
  blogSectionTitle: string;
  previous: string;
  next: string;
  showingResults: string;
  noResults: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}