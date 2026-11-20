import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import { Link } from 'wouter';
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  MessageCircle,
  Play,
  ChevronLeft,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockVideos } from '../data/mockData';
import type { Video } from '../data/mockData';

export function VideoPlayer() {
  const params = useParams<{ id?: string }>();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const videoId = params?.id;
  const video: Video | undefined = mockVideos.find((v) => v.id === videoId);

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<{ user: string; text: string; avatar: string }[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const found = mockVideos.find((v) => v.id === videoId);
    if (found) {
      setLikes(found.likes);
      setComments([
        { user: 'مستخدم تجريبي', text: 'فيديو ممتاز جداً!', avatar: 'https://i.pravatar.cc/150?u=c1' },
        { user: 'Test User', text: 'Great content, thanks!', avatar: 'https://i.pravatar.cc/150?u=c2' },
      ]);
    }
  }, [videoId]);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      { user: 'You', text: newComment, avatar: 'https://i.pravatar.cc/150?u=me' },
    ]);
    setNewComment('');
  };

  if (!video) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 mb-4">
          <Play className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-semibold text-text mb-2">
          الفيديو غير موجود / Video not found
        </h2>
        <Link
          href="/"
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          العودة للصفحة الرئيسية / Back to Home
        </Link>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary mb-6"
      >
        <ChevronLeft className="w-4 h-4" />{' '}
        {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
      </Link>

      <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl aspect-video mb-6 relative">
        <video
          className="w-full h-full"
          controls
          poster={video.thumbnail}
          preload="metadata"
        >
          <source src={video.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {!isPlaying && (
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-colors"
            aria-label="Play video"
          >
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center text-slate-900 hover:bg-white transition-all">
              <Play className="w-8 h-8" />
            </div>
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 lg:flex-1 space-y-6">
          <div>
            <h1 className={`text-2xl font-bold text-text mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {video.title}
            </h1>
            <div className="flex items-center gap-3 mb-3">
              <img
                src={video.uploaderAvatar || 'https://i.pravatar.cc/150'}
                alt={video.uploader}
                className="w-10 h-10 rounded-full border-2 border-border-color"
              />
              <div>
                <p className="font-medium text-text text-sm">{video.uploader}</p>
                <p className="text-xs text-text-secondary">
                  {formatDate(video.uploadDate)} •{' '}
                  {video.views.toLocaleString(language)} مشاهدات /{' '}
                  {video.views.toLocaleString('en')} views
                </p>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl p-4 border border-border-color">
            <p className={`text-text-secondary leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {video.description}
            </p>
          </div>

          <div className="flex gap-2 sm:gap-4">
            <button
              onClick={toggleLike}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                liked
                  ? 'bg-red-500 text-white'
                  : 'bg-white border border-border-color text-text hover:bg-surface'
              }`}
            >
              <ThumbsUp className="w-4 h-4" fill={liked ? 'white' : 'currentColor'} />
              <span>{likes}</span>
            </button>
            <button
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium border border-border-color text-text hover:bg-surface transition-all"
            >
              <ThumbsDown className="w-4 h-4" />
              <span>إعجاب سلبي / Dislike</span>
            </button>
            <button
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium border border-border-color text-text hover:bg-surface transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>مشاركة / Share</span>
            </button>
          </div>
        </div>

        <div className="lg:w-80 flex-shrink-0 space-y-6 hidden lg:block">
          <h3 className="text-lg font-semibold text-text">
            فيديوهات ذات صلة / Related Videos
          </h3>
          <div className="space-y-4">
            {mockVideos
              .filter((v) => v.id !== video.id)
              .slice(0, 4)
              .map((v) => (
                <div key={v.id} className="flex gap-3 group cursor-pointer">
                  <div className="relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-surface">
                    <img
                      src={v.thumbnail}
                      alt={v.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                      {v.duration}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-text line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                      {v.title}
                    </h4>
                    <p className="text-xs text-text-secondary mt-0.5">
                      {v.views.toLocaleString(language)} مشاهدات
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl border border-border-color shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border-color">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-text">
              التعليقات / Comments ({comments.length})
            </h3>
          </div>
        </div>

        <div className="px-6 py-4 border-b border-border-color flex gap-3">
          <img
            src="https://i.pravatar.cc/150?u=me"
            alt="user"
            className="w-10 h-10 rounded-full border-2 border-border-color"
          />
          <form onSubmit={handleComment} className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="أضف تعليقاً / Add a comment..."
              rows={2}
              className="w-full resize-none border-none focus:ring-0 text-sm text-text placeholder:text-text-secondary"
            />
          </form>
          <button
            onClick={handleComment}
            disabled={!newComment.trim()}
            className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-hover transition-colors text-sm font-medium"
          >
            نشر / Post
          </button>
        </div>

        <div className="py-4 space-y-4">
          {comments.length === 0 ? (
            <div className="px-6 text-center text-text-secondary text-sm py-8">
              لا توجد تعليقات بعد / No comments yet
            </div>
          ) : (
            comments.map((c, i) => (
              <div key={i} className="px-6 py-3 border-b border-surface/50 last:border-0 flex gap-3">
                <img
                  src={c.avatar}
                  alt={c.user}
                  className="w-10 h-10 rounded-full border-2 border-border-color"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-semibold text-text">{c.user}</span>
                    <span className="text-xs text-text-secondary">الآن / just now</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {c.text}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
