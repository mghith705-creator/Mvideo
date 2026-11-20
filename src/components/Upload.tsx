import { useState, useCallback } from 'react';
import {
  ChevronLeft,
  Video as VideoIcon,
  FileVideo,
  Loader2,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Link } from 'wouter';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { uploadVideoFile, uploadThumbnailFile, createVideo } from '../config/firebase';

export function Upload() {
  const { language, isRTL } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    if (selected && !selected.type.startsWith('video/')) {
      setError(language === 'ar' ? 'يرجى اختيار ملف فيديو صالح' : 'Please select a valid video file');
      return;
    }
    setFile(selected);
    setError('');
  }, [language]);

  const handleThumbnailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    if (selected && !selected.type.startsWith('image/')) {
      setError(language === 'ar' ? 'يرجى اختيار صورة صالحة للصورة المصغرة' : 'Please select a valid image file');
      return;
    }
    setThumbnail(selected);
    setError('');
  }, [language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError(language === 'ar' ? 'يجب تسجيل الدخول لرفع الفيديوهات' : 'Please sign in to upload videos');
      return;
    }
    if (!file) {
      setError(language === 'ar' ? 'يرجى اختيار ملف فيديو' : 'Please select a video file');
      return;
    }
    if (!title.trim()) {
      setError(language === 'ar' ? 'يرجى إدخال عنوان الفيديو' : 'Please enter a video title');
      return;
    }

    setStatus('uploading');
    setProgress(0);
    setError('');

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 200);

      // Upload video file
      const videoPath = `videos/${user?.uid}/${Date.now()}_${file.name}`;
      const videoUrl = await uploadVideoFile(file, videoPath);

      // Upload thumbnail if provided
      let thumbnailUrl = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80';
      if (thumbnail) {
        const thumbPath = `thumbnails/${user?.uid}/${Date.now()}_${thumbnail.name}`;
        thumbnailUrl = await uploadThumbnailFile(thumbnail, thumbPath);
      }

      clearInterval(progressInterval);
      setProgress(100);

      // Create video record in database
      await createVideo({
        title: title.trim(),
        description: description.trim(),
        url: videoUrl,
        thumbnail: thumbnailUrl,
        duration: '0:00', // Will be updated after video metadata loads
        uploaderId: user!.uid,
        uploaderName: user!.displayName || 'مستخدم',
        uploaderAvatar: user!.photoURL ?? undefined,
      });

      setStatus('success');
    } catch (err: any) {
      setError(err.message || language === 'ar' ? 'فشل رفع الفيديو' : 'Upload failed');
      setStatus('error');
    }
  };

  const reset = () => {
    setFile(null);
    setThumbnail(null);
    setTitle('');
    setDescription('');
    setStatus('idle');
    setError('');
    setProgress(0);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4 text-amber-600 dark:text-amber-400">
          <div className="w-8 h-8"><LockIcon /></div>
        </div>
        <h2 className="text-xl font-bold text-text mb-2">
          تسجيل الدخول مطلوب / Sign in required
        </h2>
        <p className="text-text-secondary mb-6">
          {language === 'ar'
            ? 'يجب تسجيل الدخول لرفع الفيديوهات إلى منصة Mvideo'
            : 'Please sign in to upload videos to Mvideo'}
        </p>
        <button
          onClick={() => {}}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          تسجيل الدخول / Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary mb-4"
        >
          <ChevronLeft className="w-4 h-4" />{' '}
          {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
        </Link>
        <h1 className={`text-2xl font-bold text-text mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
          رفع فيديو جديد / Upload Video
        </h1>
        <p className="text-text-secondary">
          {language === 'ar'
            ? 'ارفع فيديو خاص بك ليشاركه الآخرون على منصة Mvideo'
            : 'Upload your video to share with others on Mvideo'}
        </p>
      </div>

      {status === 'success' ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 text-green-600"><CheckCircle /></div>
          </div>
          <h3 className="text-lg font-semibold text-text mb-2">
            {language === 'ar' ? 'تم رفع الفيديو بنجاح!' : 'Video uploaded successfully!'}
          </h3>
          <p className="text-text-secondary mb-6">
            {language === 'ar'
              ? 'سيتم مراجعة الفيديو وظهوره في الصفحة الرئيسية قريباً'
              : 'Your video will be reviewed and appear on the home page soon'}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={reset}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
            >
              رفع فيديو آخر / Upload Another
            </button>
            <Link
              href="/"
              className="px-6 py-2 bg-white border border-border-color text-text rounded-lg hover:bg-surface transition-colors"
            >
              العودة للرئيسية / Back to Home
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 items-start">
              <div className="w-5 h-5 text-red-500 shrink-0 mt-0.5"><XCircle /></div>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Video file upload */}
          <div className="border-2 border-dashed border-border-color rounded-xl p-8 text-center hover:border-primary hover:bg-primary/5 transition-all group">
            <label className="block">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-8 h-8 text-primary group-hover:text-primary"><VideoIcon /></div>
                </div>
                <p className="font-semibold text-text">
                  {language === 'ar' ? 'اختر ملف فيديو' : 'Choose Video File'}
                </p>
                <p className="text-sm text-text-secondary">
                  {language === 'ar'
                    ? 'MP4، MOV، AVI، WebM (حتى 2 جيجابايت)'
                    : 'MP4, MOV, AVI, WebM (up to 2GB)'}
                </p>
              </div>
            </label>
            {file && (
              <div className="mt-4 flex items-center justify-center gap-3 text-sm">
                <div className="w-4 h-4 text-text-secondary"><FileVideo /></div>
                <span className="text-text truncate max-w-xs">{file.name}</span>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-xs text-red-500 hover:underline"
                >
                  {language === 'ar' ? 'إزالة' : 'Remove'}
                </button>
              </div>
            )}
          </div>

          {/* Thumbnail upload */}
          <div className="border-2 border-dashed border-border-color rounded-xl p-8 text-center hover:border-primary hover:bg-primary/5 transition-all group">
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-8 h-8 text-primary group-hover:text-primary"><ImageIcon /></div>
                </div>
                <p className="font-semibold text-text">
                  {language === 'ar' ? 'اختر صورة مصغرة (اختياري)' : 'Choose Thumbnail (Optional)'}
                </p>
                <p className="text-sm text-text-secondary">
                  {language === 'ar' ? 'JPG، PNG، WebM (حتى 5 ميجابايت)' : 'JPG, PNG, WebM (up to 5MB)'}
                </p>
              </div>
            </label>
            {thumbnail && (
              <div className="mt-4 flex items-center justify-center gap-3 text-sm">
                <div className="w-4 h-4 text-text-secondary"><ImageIcon /></div>
                <span className="text-text truncate max-w-xs">{thumbnail.name}</span>
                <button
                  type="button"
                  onClick={() => setThumbnail(null)}
                  className="text-xs text-red-500 hover:underline"
                >
                  {language === 'ar' ? 'إزالة' : 'Remove'}
                </button>
              </div>
            )}
          </div>

          {/* Title */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <label className="block text-sm font-medium text-text mb-2">
              العنوان / Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={language === 'ar' ? 'أدخل عنوان الفيديو...' : 'Enter video title...'}
              className="w-full px-4 py-3 rounded-lg border border-border-color bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all"
            />
          </div>

          {/* Description */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <label className="block text-sm font-medium text-text mb-2">
              الوصف / Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={language === 'ar' ? 'أضف وصفاً للفيديو...' : 'Add a description...'}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-border-color bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all"
            />
          </div>

          {/* Upload progress */}
          {status === 'uploading' && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-text-secondary mb-1">
                <span>{language === 'ar' ? 'جاري الرفع...' : 'Uploading...'}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-surface rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'uploading'}
            className={`w-full px-6 py-4 rounded-xl font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              status === 'uploading'
                ? 'bg-slate-200 text-slate-500'
                : 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/25'
            }`}
          >
            {status === 'uploading' ? (
              <>
                <div className="w-5 h-5 animate-spin mr-3"><Loader2 /></div>
                جاري الرفع... / Uploading...
              </>
            ) : language === 'ar' ? (
              'نشر الفيديو'
            ) : (
              'Publish Video'
            )}
          </button>
        </form>
      )}
    </div>
  );
}

// Simple lock icon for unauthenticated state
function LockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

// Simple image icon
function ImageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}
