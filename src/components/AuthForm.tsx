import { useState } from 'react';
import { Link } from 'wouter';
import { Mail, Lock, User, ArrowRight, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

type Mode = 'login' | 'signup';

export function AuthForm() {
  const { language } = useLanguage();
  const { login, signup, isLoading } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError(language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
      return;
    }

    if (mode === 'login') {
      try {
        await login(email, password);
      } catch (err: any) {
        setError(err.message || language === 'ar' ? 'فشل تسجيل الدخول' : 'Login failed');
      }
    } else {
      if (!name) {
        setError(language === 'ar' ? 'يرجى إدخال الاسم' : 'Please enter your name');
        return;
      }
      try {
        await signup(name, email, password);
      } catch (err: any) {
        setError(err.message || language === 'ar' ? 'فشل إنشاء الحساب' : 'Signup failed');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl border border-border-color shadow-lg p-8">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary mb-4"
          >
            <ChevronLeft className="w-4 h-4" />{' '}
            {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
          </Link>

          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-text mb-2">
            {mode === 'login' ? (language === 'ar' ? 'تسجيل الدخول' : 'Sign In') : (language === 'ar' ? 'إنشاء حساب' : 'Create Account')}
          </h2>
          <p className="text-text-secondary">
            {mode === 'login'
              ? (language === 'ar' ? 'مرحباً بعودتك إلى Mvideo' : 'Welcome back to Mvideo')
              : (language === 'ar' ? 'انضم إلى مجتمع Mvideo اليوم' : 'Join the Mvideo community today')}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 items-start mb-6">
            <Lock className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                الاسم الكامل / Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل اسمك الكامل...' : 'Enter your full name...'}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border-color bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              البريد الإلكتروني / Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني...' : 'Enter your email...'}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border-color bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              كلمة المرور / Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل كلمة المرور...' : 'Enter your password...'}
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-border-color bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary"
                aria-label={showPassword ? 'إخفاء كلمة المرور / Hide password' : 'إظهار كلمة المرور / Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-6 py-4 rounded-xl font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              isLoading
                ? 'bg-slate-200 text-slate-500'
                : 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/25'
            }`}
          >
            {isLoading ? (
              <>
                <ArrowRight className="w-5 h-5 animate-spin mr-2" />
                جاري المعالجة... / Processing...
              </>
            ) : mode === 'login'
              ? (language === 'ar' ? 'تسجيل الدخول' : 'Sign In')
              : (language === 'ar' ? 'إنشاء حساب' : 'Create Account')}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border-color text-center">
          <p className="text-sm text-text-secondary">
            {mode === 'login'
              ? (language === 'ar' ? 'ليس لديك حساب؟ ' : "Don't have an account? ")
              : (language === 'ar' ? 'لديك حساب بالفعل؟ ' : 'Already have an account? ')}
          </p>
          <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-primary font-medium underline hover:text-primary-hover"
          >
            {mode === 'login'
              ? (language === 'ar' ? 'إنشاء حساب جديد' : 'Create Account')
              : (language === 'ar' ? 'تسجيل الدخول' : 'Sign In')}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-border-color">
          <p className="text-xs text-text-secondary mb-4 text-center uppercase tracking-wider">
            أو / Or
          </p>
          <button
            onClick={() => {}}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border-color bg-white hover:bg-surface transition-colors text-sm font-medium text-text"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.75 3.28-8.09z"
              />
              <path fill="#4285F4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07h2.53v1.31c-.2.41-.49.79-.87 1.08 1.16.48 2.52.74 3.97.74s2.81-.27 3.97-.74c-.38-.29-.67-.67-.87-1.08V7.07H12c-.78.52-1.29 1.36-1.29 2.28s.51 1.76 1.29 2.28v4.51h-2.53v-1.31c.2-.41.49-.79.87-1.08-1.16-.48-2.52-.74-3.97-.74s-2.81.27-3.97.74c.38.29.67.67.87 1.08v1.31H5.84z" />
              <path fill="#34A853" d="M12 7.05c2.2 0 4 .85 5.21 2.09l3.31-3.21C18.04 2.94 15.22 2 12 2c-3.87 0-7 2.12-7 7s3.13 7 7 7c1.86 0 3.52-.78 4.72-2.04l-3.42-2.64c-.62-.48-1.14-1.11-1.6-1.82 0 0-1.75.97-3.7.29z" />
            </svg>
            {language === 'ar' ? 'تسجيل الدخول بجوجل' : 'Sign in with Google'}
          </button>
        </div>
      </div>
    </div>
  );
}
