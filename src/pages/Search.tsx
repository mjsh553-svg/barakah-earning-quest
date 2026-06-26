import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '@/hooks/use-store';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Category } from '@/lib/types';
import { cn } from '@/lib/utils';

const CATEGORIES: Category[] = [
  'Freelancing', 'AI Training', 'Remote Jobs', 'Surveys', 'Digital Products', 'Blogging', 'Side Hustles'
];

export function Search() {
  const { articles } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  
  const activeCategory = searchParams.get('category') as Category | null;

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesQuery = article.title.toLowerCase().includes(query.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !activeCategory || article.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [articles, query, activeCategory]);

  const handleCategoryToggle = (category: Category) => {
    if (activeCategory === category) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Discover</h1>
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, jobs, guides..."
            className="pl-12 h-14 text-lg rounded-2xl border-border focus:ring-primary/20 transition-all"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-primary" />
            <span className="font-bold text-sm">Filter by Category</span>
          </div>
          {activeCategory && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                searchParams.delete('category');
                setSearchParams(searchParams);
              }}
              className="text-xs text-primary font-bold hover:bg-transparent"
            >
              Clear
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryToggle(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                activeCategory === cat 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-background border-border hover:border-primary/30"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'Result' : 'Results'} Found
          </h2>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
               <SearchIcon className="w-10 h-10 text-muted-foreground/30" />
            </div>
            <h3 className="text-xl font-bold mb-2">No articles found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
