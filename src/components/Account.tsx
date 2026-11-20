import { Link } from 'wouter';
import {
  User as UserIcon,
  LogOut,
  Play,
  Clock,
  ThumbsUp,
  Settings,
  Mail,
  Sun,
  Moon,
  ShieldAlert,
} from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { SkeletonLoader } from './SkeletonLoader';

export function Account() {
  const { language, isRTL } = useLanguage();
  const { user, profile, logout, isAuthenticated, isLoading } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  // Unauthenticated state
  if (!isAuthenticated || isLoading) {
    if (isLoading) {
      return (
        <div className="max-w-md mx-auto px-4 py-12">
          <SkeletonLoader className="h-96 w-full" radius="8px" />
        </div>
      );
    }

    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-border-color shadow-lg p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-text mb-2">
            {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
          </h2>
          <p className="text-text-secondary mb-6">
            {language === 'ar'
              ? 'سجل الدخول للوصول إلى حسابك وقوائم التشغيل الخاصة بك'
              : 'Sign in to access your account and playlists'}
          </p>
          <Link
            href="/login"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors"
          >
            {language === 'ar' ? 'تسجيل الدخول الآن' : 'Sign In Now'}
          </Link>
        </div>
      </div>
    );
  }

  // Authenticated state
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary mb-4"
        >
          <LogOut className="w-4 h-4" />{' '}
          {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
        </Link>
        <h1 className={`text-2xl font-bold text-text ${isRTL ? 'text-right' : 'text-left'}`}>
          الحساب / Account
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-3">
          <div className="flex flex-col items-center text-center mb-8">
            <img
              src={user?.photoURL || profile?.avatar || 'https://i.pravatar.cc/150'}
              alt={user?.displayName || profile?.name || 'User'}
              className="w-24 h-24 rounded-full border-4 border-primary mb-4 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://i.pravatar.cc/150';
              }}
            />
            <h3 className="text-lg font-bold text-text">
              {user?.displayName || profile?.name || 'مستخدم'}
            </h3>
            <p className="text-sm text-text-secondary">
              {user?.email || profile?.email || ''}
            </p>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                document.documentElement.classList.toggle('dark', !darkMode);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border-color ${
                darkMode ? 'bg-primary text-white' : 'bg-surface hover:bg-surface hover:text-text'
              } transition-all group`}
            >
              <div className="flex items-center gap-3">
                <Sun className="w-5 h-5" />
                <Moon className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'الوضع الليلي' : 'Dark Mode'}
                </span>
              </div>
              {darkMode ? 'تشغيل' : 'إيقاف'}/{darkMode ? 'On' : 'Off'}
            </button>
          </div>

          <div className="pt-4 border-t border-border-color">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span>{language === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              label={language === 'ar' ? 'قوائم التشغيل' : 'Playlists'}
              value={profile?.playlists.length || 0}
              icon={Play}
              color="bg-blue-500"
            />
            <StatCard
              label={language === 'ar' ? 'الفيديوهات المعجوبة' : 'Liked Videos'}
              value={profile?.likedVideos.length || 0}
              icon={ThumbsUp}
              color="bg-red-500"
            />
            <StatCard
              label={language === 'ar' ? 'سجل المشاهدة' : 'Watch History'}
              value={profile?.watchHistory.length || 0}
              icon={Clock}
              color="bg-purple-500"
            />
          </div>

          {/* Profile info */}
          <div className="bg-white rounded-xl border border-border-color shadow-sm p-6">
            <h3 className="font-semibold text-text mb-4">
              {language === 'ar' ? 'معلومات الملف الشخصي' : 'Profile Information'}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center text-text-secondary">
                  <UserIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium text-text">{user?.displayName || profile?.name || ''}</p>
                  <p className="text-sm text-text-secondary">{user?.email || profile?.email || ''}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border-color">
                <label className="block text-sm font-medium text-text mb-2">
                  {language === 'ar' ? 'تعديل الاسم' : 'Edit Name'}
                </label>
                <input
                  type="text"
                  defaultValue={user?.displayName || profile?.name || ''}
                  className="w-full px-4 py-3 rounded-lg border border-border-color bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-xl border border-border-color shadow-sm p-6">
            <h3 className="font-semibold text-text mb-4">
              {language === 'ar' ? 'الإجراءات السريعة' : 'Quick Actions'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ActionButton
                icon={Mail}
                label={language === 'ar' ? 'تعديل الملف الشخصي' : 'Edit Profile'}
                onClick={() => {}}
              />
              <ActionButton
                icon={Settings}
                label={language === 'ar' ? 'الإعدادات' : 'Settings'}
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
};

function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-surface rounded-xl p-5 border border-border-color">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-text-secondary">{label}</span>
        <div className={`${color} flex items-center justify-center`}>
          <Icon className="w-4 h-4" fill="white" />
        </div>
      </div>
      <div className="text-2xl font-bold text-text">{value}</div>
    </div>
  );
}

type ActionButtonProps = {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
};

function ActionButton({ icon: Icon, label, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border-color bg-white hover:bg-surface transition-colors text-left text-sm font-medium text-text"
    >
      <Icon className="w-5 h-5 text-text-secondary" />
      <span>{label}</span>
    </button>
  );
}
