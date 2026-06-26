import { useState } from 'react';
import { Article, Category } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { store } from '@/lib/store';
import { toast } from 'sonner';

const CATEGORIES: Category[] = [
  'Freelancing', 'AI Training', 'Remote Jobs', 'Surveys', 'Digital Products', 'Blogging', 'Side Hustles'
];

export function ArticleForm({ 
  initialData, 
  onSuccess 
}: { 
  initialData?: Article; 
  onSuccess: () => void 
}) {
  const [formData, setFormData] = useState<Partial<Article>>(
    initialData || {
      title: '',
      excerpt: '',
      content: '',
      category: 'Freelancing',
      author: 'Admin',
      publishDate: new Date().toISOString().split('T')[0],
      imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800',
      isFeatured: false,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (initialData) {
      store.updateArticle(initialData.id, formData);
      toast.success('Article updated successfully');
    } else {
      store.addArticle(formData as Omit<Article, 'id'>);
      toast.success('Article published successfully');
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Article Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter a catchy title"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select 
            value={formData.category} 
            onValueChange={val => setFormData({ ...formData, category: val as Category })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={e => setFormData({ ...formData, author: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          value={formData.imageUrl}
          onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
          placeholder="Brief summary for the card view"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Full Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={e => setFormData({ ...formData, content: e.target.value })}
          placeholder="Write your article here..."
          rows={8}
          required
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
        <div className="space-y-0.5">
          <Label>Featured Article</Label>
          <p className="text-xs text-muted-foreground">Show in the hero section</p>
        </div>
        <Switch
          checked={formData.isFeatured}
          onCheckedChange={val => setFormData({ ...formData, isFeatured: val })}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1 font-bold">
          {initialData ? 'Update Article' : 'Publish Article'}
        </Button>
      </div>
    </form>
  );
}
