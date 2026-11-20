import { Link } from 'wouter';
import { Play, Clock } from 'lucide-react';
import type { Video } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

type VideoCardProps = {
  video: Video;
  compact?: boolean;
};

export function VideoCard({ video, compact = false }: VideoCardProps) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Link
      href={`/video/${video.id}`}
      className="group block"
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-surface shadow-sm">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm">
            <Play className="w-5 h-5" fill="white" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
          {video.duration}
        </div>
        {compact && (
          <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
            <Clock className="w-3 h-3 mr-1" /> {formatDate(video.uploadDate)}
          </div>
        )}
      </div>
      <div className={compact ? 'mt-2' : 'mt-3'}>
        <h3 className={`font-semibold text-text line-clamp-2 ${isRTL ? 'text-right' : 'text-left'}`}>
          {video.title}
        </h3>
        <p className="text-xs text-text-secondary mt-1 truncate">
          {video.uploader}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-medium text-text-secondary">
            {video.views.toLocaleString(language)} مشاهدات / {video.views.toLocaleString('en')} views
          </span>
        </div>
      </div>
    </Link>
  );
}
