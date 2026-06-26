import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '@/hooks/use-store';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bookmark, Share2, Clock, User, Globe, Send, Mail, Copy } from 'lucide-react';
import { store } from '@/lib/store';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { articles, user } = useStore();
  
  const article = articles.find(a => a.id === id);
  const isBookmarked = user?.bookmarks.includes(article?.id || '');

  if (!article) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Article not found</h2>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => store.toggleBookmark(article.id)}
            className={cn("rounded-full", isBookmarked && "text-accent bg-accent/10")}
          >
            <Bookmark className={cn("w-5 h-5", isBookmarked && "fill-current")} />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleShare} className="rounded-full">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-6 py-2 border-y border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Author</span>
                <span className="text-sm font-bold">{article.author}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Published</span>
                <span className="text-sm font-bold">{article.publishDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-xl border border-border/50">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed italic mb-8 border-l-4 border-primary pl-6 py-2 bg-muted/30 rounded-r-xl">
            {article.excerpt}
          </p>
          <div className="space-y-6 text-foreground/90 leading-relaxed whitespace-pre-wrap">
            {article.content}
            
            <p>
              In Islam, seeking a halal livelihood is an obligation upon every Muslim. The concept of "Barakah" (blessing) in one's earnings is not just about the quantity, but the quality and the ethical means by which it is obtained.
            </p>
            
            <h3 className="text-2xl font-bold text-primary mt-8 mb-4">Key Steps to Success</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>Ensure your work does not conflict with Islamic values.</li>
              <li>Be honest and transparent in all your dealings.</li>
              <li>Seek knowledge continuously to improve your craft.</li>
              <li>Maintain your religious obligations while working.</li>
            </ul>

            {/* Ad Placeholder Simulation */}
            <div className="my-10 p-8 border-2 border-dashed border-border rounded-2xl bg-muted/50 text-center">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Advertisement</p>
              <p className="text-sm text-muted-foreground italic">Google AdMob Placeholder</p>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-border">
          <h4 className="font-bold mb-4">Share this article</h4>
          <div className="flex gap-4">
             <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-500 hover:text-white hover:border-blue-500"><Globe className="w-5 h-5" /></Button>
             <Button variant="outline" size="icon" className="rounded-full hover:bg-sky-400 hover:text-white hover:border-sky-400"><Send className="w-5 h-5" /></Button>
             <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-700 hover:text-white hover:border-blue-700"><Mail className="w-5 h-5" /></Button>
             <Button variant="outline" size="icon" className="rounded-full" onClick={handleShare}><Copy className="w-5 h-5" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
