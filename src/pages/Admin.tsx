import { useState } from 'react';
import { useStore } from '@/hooks/use-store';
import { Button } from '@/components/ui/button';
import { store } from '@/lib/store';
import { Plus, Edit2, Trash2, LayoutGrid, List, Eye, Settings } from 'lucide-react';
import { Article } from '@/lib/types';
import { ArticleForm } from '@/components/admin/ArticleForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';

export function Admin() {
  const { articles } = useStore();
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      store.deleteArticle(id);
    }
  };

  const openEdit = (article: Article) => {
    setEditingArticle(article);
    setIsFormOpen(true);
  };

  const openCreate = () => {
    setEditingArticle(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your Barakah content and opportunities.</p>
        </div>
        <Button onClick={openCreate} className="rounded-xl font-bold px-6 shadow-lg shadow-primary/20">
          <Plus className="mr-2 w-5 h-5" /> New Article
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-card border border-border rounded-2xl space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Total Articles</p>
          <p className="text-3xl font-bold">{articles.length}</p>
        </div>
        <div className="p-6 bg-card border border-border rounded-2xl space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Featured</p>
          <p className="text-3xl font-bold text-primary">{articles.filter(a => a.isFeatured).length}</p>
        </div>
        <div className="p-6 bg-card border border-border rounded-2xl space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Active Categories</p>
          <p className="text-3xl font-bold text-accent">{new Set(articles.map(a => a.category)).size}</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-bold flex items-center gap-2">
            <List className="w-5 h-5 text-primary" />
            Manage Articles
          </h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="w-8 h-8"><Settings className="w-4 h-4" /></Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/50 text-xs uppercase tracking-wider font-bold">
                <th className="px-6 py-4">Article</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={article.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-bold text-sm line-clamp-1">{article.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="font-bold text-[10px]">{article.category}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {article.publishDate}
                  </td>
                  <td className="px-6 py-4">
                    {article.isFeatured ? (
                      <Badge className="bg-primary/10 text-primary border-primary/20">Featured</Badge>
                    ) : (
                      <Badge variant="secondary">Standard</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-blue-500"
                        onClick={() => openEdit(article)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(article.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle>{editingArticle ? 'Edit Article' : 'Publish New Article'}</DialogTitle>
          </DialogHeader>
          <ArticleForm 
            initialData={editingArticle || undefined} 
            onSuccess={() => setIsFormOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
