# Mvideo - مشارك الفيديو

منصة فيديو شاملة للهواتف الذكية مع دعم اللغة العربية والإنجليزية.
A complete mobile-first video platform with Arabic and English support.

## الميزات / Features

- 📱 تصميم أولوية الجوال (Mobile-first responsive design)
- 🎬 مشغل فيديو مع عناصر تحكم كاملة (Video player with full controls)
- 📤 رفع فيديوهات (Video upload)
- 📋 قوائم تشغيل (Playlists)
- 👤 حسابات المستخدمين (User accounts)
- 🔐 تسجيل دخول وخروج (Login / Logout)
- 🌐 واجهة ثنائية اللغة (Arabic / English) مع دعم اتجاه RTL
- 💾 تطبيق ويب تقدّمي (PWA) قابل للتثبيت على الجوال
- 📊 إحصائيات المشاهدة والإعجابات (Views and likes tracking)
- 💬 نظام تعليقات (Comments system)

## التقنيات المستخدمة / Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS v4
- Lucide React (أيقونات / Icons)
- Wouter (التنقل / Routing)

## التشغيل المحلي / Local Development

```bash
npm install
npm run dev
```

الافتتاح على: http://localhost:5173

## البناء للإنتاج / Production Build

```bash
npm run build
```

## هيكل المشروع / Project Structure

```
src/
  components/    - مكونات الواجهة (Navbar, VideoPlayer, Upload, etc.)
  contexts/      - سياقات React (اللغة، المصادقة)
  data/          - البيانات الوهمية والترجمات
  App.tsx        - التطبيق الرئيسي مع التوجيه
  main.tsx       - نقطة الدخول
```

## idiomas / Languages

يدعم التطبيق اللغتين العربية والإنجليزية مع التبديل بينهما ديناميكياً.
Supports Arabic and English with dynamic switching and RTL layout for Arabic.
