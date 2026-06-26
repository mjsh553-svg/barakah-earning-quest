import { useStore } from '@/hooks/use-store';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { Button } from '@/components/ui/button';
import { Category } from '@/lib/types';
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp, Sparkles } from 'lucide-react';

const CATEGORIES: { label: Category; icon: string }[] = [
  { label: 'Freelancing', icon: '💻' },
  { label: 'AI Training', icon: '🤖' },
  { label: 'Remote Jobs', icon: '🏠' },
  { label: 'Surveys', icon: '📝' },
  { label: 'Digital Products', icon: '📦' },
  { label: 'Blogging', icon: '✍️' },
  { label: 'Side Hustles', icon: '🚀' },
];

export function Home() {
  const { articles } = useStore();
  const featuredArticles = articles.filter(a => a.isFeatured);
  const recentArticles = articles.filter(a => !a.isFeatured);

  return (
    <div className="space-y-10 pb-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground md:px-12 md:py-16">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl mb-4">
            Earn Halal, <br />
            <span className="text-accent italic">Grow with Barakah.</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg">
            Discover ethical ways to earn money online while staying true to your values. 
            From freelancing to AI training, we've got you covered.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 border-none px-8 rounded-full font-bold">
              Explore Jobs
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 hover:bg-white/10 px-8 rounded-full font-bold">
              Join Community
            </Button>
          </div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-accent/10 rounded-full blur-2xl" />
      </section>

      {/* Categories Scroll */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <h2 className="text-2xl font-bold">Categories</h2>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              to={`/search?category=${cat.label}`}
              className="flex-shrink-0 flex flex-col items-center gap-3 p-4 bg-card border border-border rounded-2xl w-28 transition-all hover:border-primary/50 hover:shadow-md group"
            >
              <span className="text-3xl transition-transform group-hover:scale-110">{cat.icon}</span>
              <span className="text-[11px] font-bold text-center leading-tight">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Featured Opportunities</h2>
            </div>
            <Link to="/search" className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-6">
            {featuredArticles.map(article => (
              <ArticleCard key={article.id} article={article} featured />
            ))}
          </div>
        </section>
      )}

      {/* Recent Articles */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Latest Insights</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
