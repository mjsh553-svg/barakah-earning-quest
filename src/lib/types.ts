export type Category = 'Freelancing' | 'AI Training' | 'Remote Jobs' | 'Surveys' | 'Digital Products' | 'Blogging' | 'Side Hustles';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: string;
  publishDate: string;
  imageUrl: string;
  isFeatured?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  bookmarks: string[]; // Article IDs
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
