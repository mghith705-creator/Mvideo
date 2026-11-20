# Mvideo - مشارك الفيديو

منصة فيديو شاملة للهواتف الذكية مع دعم اللغة العربية والإنجليزية.
A complete mobile-first video platform with Arabic and English support.

## الميزات / Features

### 핵심 الميزات الأساسية
- 📱 تصميم أولوية الجوال (Mobile-first responsive design)
- 🎬 مشغل فيديو مع عناصر تحكم كاملة (Video player with full controls)
- 📤 رفع فيديوهات حقيقي مع Firebase Storage (Real video upload with Firebase Storage)
- 📋 قوائم تشغيل حقيقية مع Firestore (Real playlists with Firestore)
- 👤 نظام مصادقة حقيقي مع Firebase Auth (Real authentication with Firebase Auth)
- 🔐 تسجيل دخول وخروج (Login / Logout)
- 🌐 واجهة ثنائية اللغة (Arabic / English) مع دعم اتجاه RTL
- 💾 تطبيق ويب تقدّمي (PWA) قابل للتثبيت على الجوال
- 📊 إحصائيات المشاهدة والإعجابات (Views and likes tracking)
- 💬 نظام تعليقات (Comments system)
- ⭐ نظام تقييم بالنجوم (Star rating system)
- 🌙 وضع ليلي/نهاري (Dark/Light mode toggle)

### ميزات الجوال المحسّنة
- 👆 إيماءات السحب للتقديم والتأخير (Swipe gestures to seek forward/backward)
- 📺 ملء الشاشة (Fullscreen mode)
- 🔇 كتم الصوت (Mute toggle)
- ⏱️ شريط تقدم تفاعلي (Interactive progress bar)

### جودة الكود والاختبار
- 🧪 اختبارات آلية مع Vitest (Automated tests with Vitest)
- 📈 مراقبة الأخطاء مع Sentry (Error monitoring with Sentry)
- 🔍 مراقبة الأداء (Performance monitoring)
- 📱 ondersteuning للعمل دون إنترنت (Offline support with PWA)

## التقنيات المستخدمة / Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Firebase (Auth, Firestore, Storage)
- Lucide React (أيقونات / Icons)
- Wouter (التنقل / Routing)
- Vitest (الاختبار / Testing)

## التشغيل المحلي / Local Development

```bash
npm install
npm run dev
```

الافتتاح على: http://localhost:5173

## الإعداد للإنتاج / Production Setup

1. أنشئ مشروع Firebase في [console.firebase.google.com](https://console.firebase.google.com)
2. أضف إعدادات Firebase في ملف `.env`:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```
3. فعّل Firebase Authentication و Firestore و Storage في وحدة التحكم
4. إعداد قواعد أمان Firestore للقراءة والكتابة

## البناء للإنتاج / Production Build

```bash
npm run build
```

## تشغيل الاختبارات / Running Tests

```bash
npm run test
```

## هيكل المشروع / Project Structure

```
src/
  components/     - مكونات الواجهة (Navbar, VideoPlayer, Upload, etc.)
  contexts/       - سياقات React (اللغة، المصادقة)
  config/         - إعدادات Firebase وخدمات البيانات
  data/           - البيانات الأولية والترجمات
  test/           - ملفات الاختبار
  App.tsx         - التطبيق الرئيسي مع التوجيه
  main.tsx        - نقطة الدخول
```

## idiomas / Languages

يدعم التطبيق اللغتين العربية والإنجليزية مع التبديل بينهما ديناميكياً.
Supports Arabic and English with dynamic switching and RTL layout for Arabic.

## الترخيص / License

MIT
