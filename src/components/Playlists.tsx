import { useState, useEffect } from 'react';
import { Plus, Play, Trash2, Clock } from 'lucide-react';
import { Link } from 'wouter';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import {
  createPlaylist,
  subscribeToUserPlaylists,
  type Playlist,
} from '../config/firebase';
import { SkeletonLoader } from './SkeletonLoader';

export function Playlists() {
  const { language, isRTL } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setPlaylists([]);
      return;
    }
    setLoading(true);
    const unsubscribe = subscribeToUserPlaylists(user!.uid, (playlists) => {
      setPlaylists(playlists);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [isAuthenticated, user]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;
    if (!user) return;

    setLoading(true);
    try {
      await createPlaylist({
        name: newPlaylistName.trim(),
        description: '',
        videoIds: [],
        ownerId: user.uid,
        isPublic: false,
      });
      setNewPlaylistName('');
      setShowCreate(false);
    } catch (err: any) {
      alert(err.message || language === 'ar' ? 'فشل إنشاء القائمة' : 'Failed to create playlist');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (playlistId: string) => {
    if (!confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذه القائمة؟' : 'Are you sure you want to delete this playlist?')) {
      return;
    }
    setPlaylists(playlists.filter((p) => p.id !== playlistId));
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4 text-amber-600 dark:text-amber-400">
          <Play className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-text mb-2">
          تسجيل الدخول مطلوب / Sign in required
        </h2>
        <p className="text-text-secondary mb-6">
          {language === 'ar'
            ? 'يجب تسجيل الدخول لعرض قوائم التشغيل الخاصة بك'
            : 'Please sign in to view your playlists'}
        </p>
        <Link
          href="/login"
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          تسجيل الدخول / Sign In
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <PlaylistSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className={`text-2xl font-bold text-text mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            قوائم التشغيل / Playlists
          </h1>
          <p className="text-text-secondary">
            {language === 'ar'
              ? 'نظم الفيديوهات المفضلة لديك في قوائم تشغيل'
              : 'Organize your favorite videos into playlists'}
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          <span>{language === 'ar' ? 'إنشاء قائمة' : 'Create Playlist'}</span>
        </button>
      </div>

      {showCreate && (
        <div className="bg-white rounded-xl border border-border-color shadow-sm p-6 mb-8">
          <h3 className="font-semibold text-text mb-4">
            {language === 'ar' ? 'إنشاء قائمة تشغيل جديدة' : 'Create New Playlist'}
          </h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                اسم القائمة / Playlist Name
              </label>
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل اسم القائمة...' : 'Enter playlist name...'}
                className="w-full px-4 py-3 rounded-lg border border-border-color bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={!newPlaylistName.trim() || loading}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-medium disabled:opacity-50 hover:bg-primary-hover transition-colors"
              >
                {loading ? 'جاري الإنشاء...' : (language === 'ar' ? 'إنشاء' : 'Create')}
              </button>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="px-6 py-3 text-text-secondary hover:text-text transition-colors font-medium"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
            </div>
          </form>
        </div>
      )}

      {playlists.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center text-text-secondary mb-4">
            <Play className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-text mb-2">
            {language === 'ar' ? 'لا توجد قوائم تشغيل' : 'No playlists yet'}
          </h3>
          <p className="text-text-secondary max-w-xs">
            {language === 'ar'
              ? 'ابدأ بإنشاء أول قائمة تشغيل لتنظيم الفيديوهات المفضلة لديك.'
              : 'Start by creating your first playlist to organize your favorite videos.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="bg-white rounded-xl border border-border-color shadow-sm overflow-hidden hover:shadow-md transition-all group">
              <div className="h-48 relative overflow-hidden bg-surface">
                <div className="w-full h-full flex items-center justify-center text-text-secondary">
                  <Play className="w-8 h-8 opacity-50" />
                </div>
                <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {playlist.videoIds.length} فيديو / videos
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-text mb-1">{playlist.name}</h3>
                <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                  {playlist.description || (language === 'ar' ? 'لا يوجد وصف' : 'No description')}
                </p>
                <div className="flex items-center gap-2 text-xs text-text-secondary mb-4">
                  <Clock className="w-4 h-4" />
                  <span>{playlist.createdAt}</span>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/playlist/${playlist.id}`}
                    className="flex-1 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg text-center hover:bg-primary-hover transition-colors"
                  >
                    {language === 'ar' ? 'عرض القائمة' : 'View Playlist'}
                  </Link>
                  <button
                    onClick={() => handleDelete(playlist.id)}
                    className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Delete playlist"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PlaylistSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-border-color shadow-sm overflow-hidden">
      <div className="h-48 bg-surface">
        <SkeletonLoader width="80%" height="60%" radius="8px" />
      </div>
      <div className="p-4 space-y-3">
        <SkeletonLoader className="h-4 w-3/4" />
        <SkeletonLoader className="h-3 w-1/2" />
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <SkeletonLoader width="14px" height="14px" radius="full" />
          <SkeletonLoader className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}
