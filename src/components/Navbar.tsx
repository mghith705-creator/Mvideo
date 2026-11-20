import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  Home,
  Play,
  User,
  LogOut,
  Menu,
  X,
  Plus,
  Globe,
  ShieldAlert,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const links = [
  { href: '/', labelKey: 'الرئيسية / Home', icon: Home },
  { href: '/upload', labelKey: 'رفع فيديو / Upload', icon: Plus },
  { href: '/playlists', labelKey: 'قوائم التشغيل / Playlists', icon: Play },
  { href: '/account', labelKey: 'الحساب / Account', icon: User },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const { logout, isAuthenticated, isLoading } = useAuth();
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border-color dark:bg-slate-900/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
              M
            </div>
            <span className="font-arabic">Mvideo</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location === link.href || (link.href !== '/' && location.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-surface hover:text-text'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:block">{link.labelKey}</span>
                </Link>
              );
            })}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-surface hover:text-text transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:block">
                  {language === 'ar' ? 'English' : 'العربية'}
                </span>
              </button>
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={logout}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-surface hover:text-text transition-colors disabled:opacity-50"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/20"
                >
                  تسجيل الدخول / Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-text-secondary hover:bg-surface"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border-color dark:border-slate-700">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location === link.href || (link.href !== '/' && location.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:bg-surface hover:text-text'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.labelKey}</span>
                </Link>
              );
            })}
            <div className="pt-4 border-t border-border-color dark:border-slate-700">
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:bg-surface hover:text-text transition-colors"
              >
                <Globe className="w-5 h-5" />
                <span>{language === 'ar' ? 'English' : 'العربية'}</span>
              </button>
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:bg-surface hover:text-text transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>تسجيل الخروج / Logout</span>
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/20"
                >
                  <ShieldAlert className="w-5 h-5" />
                  <span>تسجيل الدخول / Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
