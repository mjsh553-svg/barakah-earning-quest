import { Moon, Sun, Bell, Menu } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center overflow-hidden">
             <img 
               src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/fa0537bf-42e2-4bbf-86cb-8be60accedf1/app-logo-f5269728-1782455864549.webp" 
               alt="Earn With Barakah" 
               className="w-full h-full object-cover"
             />
          </div>
          <span className="font-bold text-lg text-primary tracking-tight">Earn With Barakah</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-background" />
          </Button>
          <div className="hidden md:flex ml-4">
             {/* Desktop Navigation would go here */}
          </div>
        </div>
      </div>
    </header>
  );
}
