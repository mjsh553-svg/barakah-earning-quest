import { Article, User, AuthState, Category } from './types';
import { INITIAL_ARTICLES } from './mock-data';

const STORAGE_KEYS = {
  ARTICLES: 'eb_articles',
  USER: 'eb_user',
  THEME: 'eb_theme',
};

class Store {
  private articles: Article[] = [];
  private user: User | null = null;
  private listeners: (() => void)[] = [];

  constructor() {
    this.init();
  }

  private init() {
    const savedArticles = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    if (savedArticles) {
      this.articles = JSON.parse(savedArticles);
    } else {
      this.articles = INITIAL_ARTICLES;
      this.saveArticles();
    }

    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Articles
  getArticles() {
    return this.articles;
  }

  addArticle(article: Omit<Article, 'id'>) {
    const newArticle = { ...article, id: crypto.randomUUID() };
    this.articles = [newArticle, ...this.articles];
    this.saveArticles();
    this.notify();
  }

  updateArticle(id: string, updates: Partial<Article>) {
    this.articles = this.articles.map(a => a.id === id ? { ...a, ...updates } : a);
    this.saveArticles();
    this.notify();
  }

  deleteArticle(id: string) {
    this.articles = this.articles.filter(a => a.id !== id);
    this.saveArticles();
    this.notify();
  }

  private saveArticles() {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(this.articles));
  }

  // Auth
  getUser() {
    return this.user;
  }

  login(email: string, name: string, role: 'user' | 'admin' = 'user') {
    const user: User = {
      id: crypto.randomUUID(),
      email,
      name,
      role,
      bookmarks: [],
    };
    this.user = user;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    this.notify();
  }

  logout() {
    this.user = null;
    localStorage.removeItem(STORAGE_KEYS.USER);
    this.notify();
  }

  // Bookmarks
  toggleBookmark(articleId: string) {
    if (!this.user) return;
    const isBookmarked = this.user.bookmarks.includes(articleId);
    const newBookmarks = isBookmarked 
      ? this.user.bookmarks.filter(id => id !== articleId)
      : [...this.user.bookmarks, articleId];
    
    this.user = { ...this.user, bookmarks: newBookmarks };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(this.user));
    this.notify();
  }
}

export const store = new Store();
