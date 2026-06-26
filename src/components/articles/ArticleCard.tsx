import { Link } from 'react-router-dom';
import { Bookmark, Clock, User } from 'lucide-react';
import { Article } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { store } from '@/lib/store';
import { useStore } from '@/hooks/use-store';
import { cn } from '@/lib/utils';

export function ArticleCard({ article, featured = false }: { article: Article, featured?: boolean }) {
  const { user } = useStore();
  const isBookmarked = user?.bookmarks.includes(article.id);

  return (
    <div className={cn(
      "group relative overflow-hidden rounded-2xl bg-card border border-border transition-all hover:shadow-lg",
      featured ? "flex flex-col md:flex-row gap-6 p-2" : "flex flex-col"
    )}>
      <Link 
        to={`/article/${article.id}`} 
        className={cn(
          "relative overflow-hidden",
          featured ? "w-full md:w-2/5 aspect-[16/9] md:aspect-square rounded-xl" : "w-full aspect-[16/9]"
        )}
      >
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary/90 text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {article.category}
          </span>
        </div>
      </Link>

      <div className={cn(
        "flex flex-col justify-between flex-1",
        featured ? "py-4 pr-4" : "p-4"
      )}>
        <div>
          <Link to={`/article/${article.id}`}>
            <h3 className={cn(
              "font-bold leading-snug group-hover:text-primary transition-colors",
              featured ? "text-2xl mb-2" : "text-lg mb-1"
            )}>
              {article.title}
            </h3>
          </Link>
          <p className={cn(
            "text-muted-foreground line-clamp-2",
            featured ? "text-base mb-4" : "text-sm mb-3"
          )}>
            {article.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-primary" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.publishDate}</span>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => store.toggleBookmark(article.id)}
            className={cn(
              "h-8 w-8 rounded-full",
              isBookmarked ? "text-accent bg-accent/10" : "text-muted-foreground"
            )}
          >
            <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-current")} />
          </Button>
        </div>
      </div>
    </div>
  );
}
