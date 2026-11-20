import { useState, useEffect } from 'react';
import { Search, Grid, List, RefreshCw } from 'lucide-react';
import { VideoCard } from './VideoCard';
import { mockVideos } from '../data/mockData';
import type { Video } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';
import { VideoCardSkeleton } from './SkeletonLoader';

export function Home() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);
  const videos: Video[] = mockVideos;

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredVideos = videos.filter(
    (v) =>
      v.title.toLowerCase().includes(query.toLowerCase()) ||
      v.description.toLowerCase().includes(query.toLowerCase()) ||
      v.uploader.toLowerCase().includes(query.toLowerCase())
  );

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <h1 className={`text-3xl font-bold text-text mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            الرائجة / Trending
          </h1>
          <p className="text-text-secondary">{videos.length} فيديو متاح / {videos.length} videos available</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-2.5 rounded-lg border border-border-color bg-white hover:bg-surface transition-colors text-text-secondary hover:text-primary"
            title="تحديث / Refresh"
            disabled={isLoading}
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <div className="relative w-full sm:w-72">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary ${isRTL ? 'right-3 left-auto' : ''}`} />
            <input
              type="text"
              placeholder="ابحث عن فيديو / Search videos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border-color bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all"
              dir="auto"
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-1 rounded-lg border border-border-color bg-bg-secondary">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-secondary hover:text-text'}`}
              title="Grid view"
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-primary text-white' : 'text-text-secondary hover:text-text'}`}
              title="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <VideoCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredVideos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center text-text-secondary mb-4">
            <Search size={24} />
          </div>
          <h3 className="text-lg font-semibold text-text mb-2">لا توجد نتائج / No results found</h3>
          <p className="text-text-secondary">حاول البحث بكلمات مفتاحية أخرى / Try different search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} compact={viewMode === 'list'} />
          ))}
        </div>
      )}
    </div>
  );
}
