import { useState } from 'react';
import { Plus, Play, Trash2, Clock } from 'lucide-react';
import { Link } from 'wouter';
import { useLanguage } from '../contexts/LanguageContext';
import { mockPlaylists, mockVideos, type Playlist, type Video } from '../data/mockData';

export function Playlists() {
  const { language, isRTL } = useLanguage();
  const [playlists, setPlaylists] = useState<Playlist[]>([...mockPlaylists]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showCreate, setShowCreate] = useState(false);

  const videosById: Record<string, Video> = {};
  mockVideos.forEach((v) => {
    videosById[v.id] = v;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;
    const playlist: Playlist = {
      id: `p${Date.now()}`,
      name: newPlaylistName,
      description: '',
      videoIds: [],
      createdAt: new Date().toISOString().split('T')[0],
    };
    setPlaylists([...playlists, playlist]);
    setNewPlaylistName('');
    setShowCreate(false);
  };

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
                disabled={!newPlaylistName.trim()}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-medium disabled:opacity-50 hover:bg-primary-hover transition-colors"
              >
                {language === 'ar' ? 'إنشاء' : 'Create'}
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
          {playlists.map((playlist) => {
            const videos = playlist.videoIds.map((id) => videosById[id]).filter(Boolean);
            return (
              <div key={playlist.id} className="bg-white rounded-xl border border-border-color shadow-sm overflow-hidden hover:shadow-md transition-all group">
                <div className="h-48 relative overflow-hidden bg-surface">
                  {videos.length > 0 ? (
                    <img
                      src={videos[0].thumbnail}
                      alt={playlist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-secondary">
                      <Play className="w-8 h-8 opacity-50" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {videos.length} فيديو / videos
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-text mb-1">{playlist.name}</h3>
                  <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                    {playlist.description || (language === 'ar' ? 'لا يوجد وصف' : 'No description')}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-text-secondary mb-4">
                    <Clock className="w-3 h-3" />
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
                      onClick={() => setPlaylists(playlists.filter((p) => p.id !== playlist.id))}
                      className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Delete playlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
