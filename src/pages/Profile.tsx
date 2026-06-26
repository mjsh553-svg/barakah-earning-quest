import { useStore } from '@/hooks/use-store';
import { Button } from '@/components/ui/button';
import { store } from '@/lib/store';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, LogOut, Bell, ShieldCheck, ChevronRight, Bookmark } from 'lucide-react';
import { toast } from 'sonner';

export function Profile() {
  const { user } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    store.logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col items-center text-center space-y-4 py-8 bg-card border border-border rounded-3xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-primary/10" />
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center relative z-10 border-4 border-background shadow-lg">
          <User className="w-12 h-12 text-primary-foreground" />
        </div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground flex items-center justify-center gap-1">
            <Mail className="w-3.5 h-3.5" />
            {user.email}
          </p>
          {user.role === 'admin' && (
            <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-accent/20 text-accent-foreground text-xs font-bold rounded-full border border-accent/30">
              <ShieldCheck className="w-3 h-3" />
              ADMIN
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold px-1">Settings & Preferences</h2>
        <div className="grid gap-2">
          <button 
            onClick={() => navigate('/bookmarks')}
            className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:bg-muted/50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Bookmark className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold">My Bookmarks</p>
                <p className="text-xs text-muted-foreground">{user.bookmarks.length} articles saved</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:bg-muted/50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="font-bold">Notifications</p>
                <p className="text-xs text-muted-foreground">Manage your push alerts</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          {user.role === 'admin' && (
            <button 
              onClick={() => navigate('/admin')}
              className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:bg-muted/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-bold">Admin Dashboard</p>
                  <p className="text-xs text-muted-foreground">Manage app content</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          )}

          <Button 
            variant="ghost" 
            className="w-full justify-start p-6 rounded-2xl text-destructive hover:text-destructive hover:bg-destructive/5 font-bold"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 w-5 h-5" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
