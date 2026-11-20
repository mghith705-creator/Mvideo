# بناء تطبيق Mvideo لنظام أندرويد (APK)

## نظرة عامة

تم تحويل تطبيق Mvideo (تطبيق ويب React) إلى تطبيق أندرويد أصلي باستخدام **Capacitor 8**. يمكن بناء ملف APK وتثبيته على أي جهاز أندرويد.

## المتطلبات

### البرامج المطلوبة
- **Node.js** v18 أو أعلى
- **Java JDK** 17 أو أعلى
- **Android Studio** أو **Android SDK Command-line Tools**
- **Gradle** (يُثبّت تلقائياً مع Android Studio)

### تثبيت المتطلبات على نظام لينكس (Ubuntu/Debian)

```bash
# تثبيت Java JDK 17
sudo apt update
sudo apt install -y openjdk-17-jdk

# تثبيت Android Command-line Tools
mkdir -p $HOME/android-sdk/cmdline-tools
cd $HOME/android-sdk/cmdline-tools
wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
unzip commandlinetools-linux-11076708_latest.zip
mv cmdline-tools latest
rm commandlinetools-linux-11076708_latest.zip

# إضافة متغيرات البيئة
echo 'export ANDROID_HOME=$HOME/android-sdk' >> ~/.bashrc
echo 'export ANDROID_SDK_ROOT=$HOME/android-sdk' >> ~/.bashrc
echo 'export PATH=$PATH:$HOME/android-sdk/cmdline-tools/latest/bin' >> ~/.bashrc
echo 'export PATH=$PATH:$HOME/android-sdk/platform-tools' >> ~/.bashrc
source ~/.bashrc

# تثبيت مكونات Android SDK
yes | sdkmanager --licenses
sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.2"
```

## خطوات البناء

### الخطوة 1: تثبيت مكتبات المشروع

```bash
cd /home/user/Mvideo
npm install
```

### الخطوة 2: بناء تطبيق الويب

```bash
npm run build:web
```

هذا سيُنشئ مجلد `dist/` يحتوي على ملفات التطبيق المبنية.

### الخطوة 3: مزامنة مع منصة أندرويد

```bash
npx cap copy
npx cap sync android
```

### الخطوة 4: بناء ملف APK

```bash
cd android
./gradlew assembleRelease
```

### الخطوة 5: العثور على ملف APK

سيتم إنشاء ملف APK في المسار التالي:

```
android/app/build/outputs/apk/release/app-release-unsigned.apk
```

## تثبيت APK على الجهاز

```bash
# نقل APK إلى الجهاز
adb install android/app/build/outputs/apk/release/app-release-unsigned.apk

# أو نقل الملف يدوياً وتثبيته من مدير الملفات على الجهاز
```

## توقيع APK للنشر على متجر جوجل بلاي

لإصدار APK موقعًا للنشر على Google Play Store:

```bash
# إنشاء ملف توقيع (Keystore)
keytool -genkey -v -keystore mvideo-upload.keystore -alias mvideo -keyalg RSA -keysize 2048 -validity 10000

# تكوين التوقيع في android/app/build.gradle
# أضف إعدادات signingConfigs في قسم android

# بناء APK الموقع
cd android
./gradlew assembleRelease
```

## سكريبتات npm المتاحة

```bash
npm run build:web      # بناء تطبيق الويب فقط
npm run build          # بناء كامل مع فحص الأنواع (TypeScript)
npm run test           # تشغيل الاختبارات
npm run dev            # خادم التطوير
```

## استكشاف الأخطاء

| المشكلة | الحل |
|--------|------|
| `sdkmanager: command not found` | تأكد من إضافة `$HOME/android-sdk/cmdline-tools/latest/bin` إلى PATH |
| `license not accepted` | تشغيل `yes \| sdkmanager --licenses` |
| `Gradle version mismatch` | تحديث Gradle Wrapper في android/gradle/wrapper/ |
| `Capacitor sync failed` | تشغيل `npx cap sync android` بعد `npx cap copy` |

## هيكل المشروع المضافة

```
android/                 # مشروع أندرويد الأصلي (Capacitor)
  app/
    src/main/
      AndroidManifest.xml  # ملف تعريف التطبيق
      java/com/mvideo/app/
        MainActivity.java   # النشاط الرئيسي
      res/                 # الموارد (أيقونات، شاشة beginning، إلخ)
capacitor.config.ts      # إعدادات Capacitor
ANDROID_BUILD.md         # دليل البناء هذا
```

## ملاحظات

- ملف APK المُنشأ غير موقع (unsigned) ومناسب للاختبار فقط
- للنشر على Google Play Store، يجب توقيع APK بشهادة رقمية خاصة
- التطبيق يدعم وضع العمل دون اتصال (PWA) عبر Service Worker
