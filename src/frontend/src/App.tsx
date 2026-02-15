import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import HomePage from './pages/HomePage';
import CategoryGalleryPage from './pages/CategoryGalleryPage';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import FloatingContactButtons from './components/FloatingContactButtons';
import { useState } from 'react';
import { siteData } from './config/siteData';
import { Phone, MessageCircle } from 'lucide-react';

// Layout component that wraps all pages
function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setMenuOpen(true)} />
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <Outlet />
      </main>
      <FloatingContactButtons />
      <footer className="bg-card border-t border-border py-8 px-4 mt-16">
        <div className="container mx-auto">
          {/* Contact Section */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Contact Us</h3>
            <p className="text-2xl font-bold text-primary mb-4">{siteData.phone}</p>
            <div className="flex justify-center gap-4">
              <a
                href={`tel:${siteData.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </a>
              <a
                href={siteData.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground border-t border-border pt-6">
            <p>
              © {new Date().getFullYear()} Arun Events. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Define routes
const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/category/$slug',
  component: CategoryGalleryPage,
});

const routeTree = rootRoute.addChildren([indexRoute, categoryRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
