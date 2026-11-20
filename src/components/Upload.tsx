import { useState } from 'react';
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

export function Upload() {
  const { language, isRTL } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    if (selected && !selected.type.startsWith('video/')) {
      setError(language === 'ar' ? 'يرجى اختيار ملف فيديو صالح' : 'Please select a valid video file');
      return;
    }
    setFile(selected);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError(language === 'ar' ? 'يرجى اختيار ملف فيديو' : 'Please select a video file');
      return;
    }
    if (!title.trim()) {
      setError(language === 'ar' ? 'يرجى إدخال عنوان الفيديو' : 'Please enter a video title');
      return;
    }

    setStatus('uploading');
    setError('');

    await new Promise((r) => setTimeout(r, 2500));
    setStatus('success');
  };

  const reset = () => {
    setFile(null);
    setTitle('');
    setDescription('');
    setStatus('idle');
    setError('');
  };

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
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-text mb-2">
            {language === 'ar' ? 'تم رفع الفيديو بنجاح!' : 'Video uploaded successfully!'}
          </h3>
          <p className="text-text-secondary mb-6">
            {language === 'ar'
              ? 'سيتم مراجعة الفيديو وظهوره في الصفحة الرئيسية قريباً'
              : 'Your video will be reviewed and appear on the home page soon'}
          </p>
          <button
            onClick={reset}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            رفع فيديو آخر / Upload Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 items-start">
              <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

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
                  <VideoIcon className="w-8 h-8 text-primary group-hover:text-primary" />
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
                <FileVideo className="w-4 h-4 text-text-secondary" />
                <span className="text-text">{file.name}</span>
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
                <Loader2 className="w-5 h-5 animate-spin mr-3" />
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
