import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { LogIn, UserPlus, ShieldCheck } from 'lucide-react';

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter an email');
      return;
    }

    // Mock admin logic
    const role = email === 'admin@barakah.com' ? 'admin' : 'user';
    const finalName = name || (isLogin ? email.split('@')[0] : '');

    store.login(email, finalName, role);
    toast.success(`Welcome back, ${finalName}!`);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-8 p-8 bg-card border border-border rounded-3xl shadow-xl relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative text-center space-y-2">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden shadow-lg border-2 border-primary-foreground/20">
             <img 
               src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/fa0537bf-42e2-4bbf-86cb-8be60accedf1/app-logo-f5269728-1782455864549.webp" 
               alt="Logo" 
               className="w-full h-full object-cover"
             />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Earn With Barakah</h1>
          <p className="text-muted-foreground">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Abdullah Ali"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>

          <Button type="submit" className="w-full h-12 rounded-xl font-bold text-lg shadow-lg shadow-primary/20">
            {isLogin ? <><LogIn className="mr-2 w-5 h-5" /> Sign In</> : <><UserPlus className="mr-2 w-5 h-5" /> Sign Up</>}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Quick Admin Access</span>
            </div>
          </div>

          <Button 
            type="button" 
            variant="outline" 
            className="w-full h-12 rounded-xl border-dashed border-2 hover:bg-primary/5 hover:border-primary/50"
            onClick={() => {
              setEmail('admin@barakah.com');
              setName('Admin');
              setIsLogin(true);
            }}
          >
            <ShieldCheck className="mr-2 w-5 h-5 text-primary" /> Login as Admin
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-bold hover:underline underline-offset-4"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
