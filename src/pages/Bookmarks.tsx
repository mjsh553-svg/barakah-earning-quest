import { useStore } from '@/hooks/use-store';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { Bookmark as BookmarkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function Bookmarks() {
  const { articles, user } = useStore();
  
  const bookmarkedArticles = articles.filter(article => 
    user?.bookmarks.includes(article.id)
  );

  if (!user) {
    return (
      <div className="py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <BookmarkIcon className="w-10 h-10 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Login to save articles</h2>
          <p className="text-muted-foreground">Keep track of your favorite earning opportunities.</p>
        </div>
        <Link to="/login">
          <Button size="lg" className="rounded-full px-8 font-bold">Login Now</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Your Bookmarks</h1>
        <p className="text-muted-foreground">Quickly access the opportunities you've saved.</p>
      </div>

      {bookmarkedArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
             <BookmarkIcon className="w-10 h-10 text-muted-foreground/30" />
          </div>
          <h3 className="text-xl font-bold mb-2">No bookmarks yet</h3>
          <p className="text-muted-foreground mb-6">Articles you save will appear here.</p>
          <Link to="/">
            <Button variant="outline" className="rounded-full font-bold">Browse Articles</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
