import { HamburgerIcon } from './icons';
import { siteData } from '../config/siteData';

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <button
          onClick={onMenuToggle}
          className="p-2 -ml-2 text-foreground hover:bg-accent rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Open menu"
        >
          <HamburgerIcon className="w-6 h-6" />
        </button>

        <h1 className="text-xl md:text-2xl font-bold text-primary">
          {siteData.brandName}
        </h1>

        <div className="hidden md:block text-xs text-muted-foreground max-w-xs text-right">
          {siteData.serviceLocations.join(' | ')}
        </div>
        
        <div className="md:hidden w-6" />
      </div>
      
      <div className="md:hidden px-4 pb-2 text-xs text-muted-foreground text-center">
        {siteData.serviceLocations.join(' | ')}
      </div>
    </header>
  );
}
