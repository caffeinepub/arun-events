import { useEffect, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { CloseIcon, PhoneIcon } from './icons';
import { categories, siteData } from '../config/siteData';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleCategoryClick = (slug: string) => {
    navigate({ to: `/category/${slug}` });
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Menu */}
      <nav
        ref={menuRef}
        className={`fixed left-0 top-0 h-full w-64 bg-sidebar text-sidebar-foreground z-[101] transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <h2 className="text-lg font-semibold text-sidebar-primary">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-sidebar-accent rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-sidebar-ring"
            aria-label="Close menu"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          <div className="py-2">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategoryClick(category.slug)}
                className="w-full text-left px-4 py-3 hover:bg-sidebar-accent transition-colors border-b border-sidebar-border/50 focus:outline-none focus:bg-sidebar-accent"
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="p-4 mt-4">
            <a
              href={`tel:${siteData.phone}`}
              className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <PhoneIcon className="w-5 h-5" />
              <span className="font-semibold">Call: {siteData.phone}</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
