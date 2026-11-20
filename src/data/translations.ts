export type Language = 'ar' | 'en';

export type TranslationKeys = {
  appName: string;
  home: string;
  upload: string;
  playlists: string;
  account: string;
  language: string;
  switchToArabic: string;
  switchToEnglish: string;
  welcome: string;
  welcomeSub: string;
  trending: string;
  myPlaylists: string;
  uploadVideo: string;
  title: string;
  description: string;
  selectFile: string;
  chooseFile: string;
  publish: string;
  publishing: string;
  login: string;
  logout: string;
  email: string;
  password: string;
  signIn: string;
  signUp: string;
  noAccount: string;
  alreadyHaveAccount: string;
  profile: string;
  settings: string;
  darkMode: string;
  notifications: string;
  watchHistory: string;
  likedVideos: string;
  noVideos: string;
  noVideosDesc: string;
  noPlaylists: string;
  noPlaylistsDesc: string;
  createPlaylist: string;
  playlistName: string;
  addVideo: string;
  views: string;
  likes: string;
  shares: string;
  comments: string;
  uploadDate: string;
  related: string;
  commentsSection: string;
  addComment: string;
  post: string;
  error: string;
  tryAgain: string;
  videoUploaded: string;
  playlistCreated: string;
  videoAdded: string;
  back: string;
  search: string;
};

export const translations: Record<Language, TranslationKeys> = {
  ar: {
    appName: 'Mvideo',
    home: 'الرئيسية',
    upload: 'رفع فيديو',
    playlists: 'قوائم التشغيل',
    account: 'الحساب',
    language: 'اللغة',
    switchToArabic: 'العربية',
    switchToEnglish: 'الإنجليزية',
    welcome: 'مرحباً بك في Mvideo',
    welcomeSub: 'منصة الفيديو الخاصة بك لمشاركة ومشاهدة المحتوى',
    trending: 'الرائجة',
    myPlaylists: 'قوائم التشغيل الخاصة بي',
    uploadVideo: 'رفع فيديو جديد',
    title: 'العنوان',
    description: 'الوصف',
    selectFile: 'اختيار ملف فيديو',
    chooseFile: 'اختر ملف',
    publish: 'نشر الفيديو',
    publishing: 'جاري النشر...',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    noAccount: 'ليس لديك حساب؟',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    darkMode: 'الوضع الليلي',
    notifications: 'الإشعارات',
    watchHistory: 'سجل المشاهدة',
    likedVideos: 'الفيديوهات المعجوبة',
    noVideos: 'لا توجد فيديوهات',
    noVideosDesc: 'ابدأ برفع أول فيديو لك أو استعرض الفيديوهات الرائجة.',
    noPlaylists: 'لا توجد قوائم تشغيل',
    noPlaylistsDesc: 'أنشئ قائمة تشغيل جديدة لتنظيم الفيديوهات المفضلة لديك.',
    createPlaylist: 'إنشاء قائمة تشغيل',
    playlistName: 'اسم القائمة',
    addVideo: 'إضافة فيديو',
    views: 'مشاهدات',
    likes: 'إعجابات',
    shares: 'مشاركات',
    comments: 'تعليقات',
    uploadDate: 'تاريخ الرفع',
    related: 'فيديوهات ذات صلة',
    commentsSection: 'التعليقات',
    addComment: 'أضف تعليقاً...',
    post: 'نشر',
    error: 'حدث خطأ',
    tryAgain: 'محاولة مرة أخرى',
    videoUploaded: 'تم رفع الفيديو بنجاح',
    playlistCreated: 'تم إنشاء قائمة التشغيل بنجاح',
    videoAdded: 'تم إضافة الفيديو للقائمة',
    back: 'العودة',
    search: 'بحث',
  },
  en: {
    appName: 'Mvideo',
    home: 'Home',
    upload: 'Upload',
    playlists: 'Playlists',
    account: 'Account',
    language: 'Language',
    switchToArabic: 'العربية',
    switchToEnglish: 'English',
    welcome: 'Welcome to Mvideo',
    welcomeSub: 'Your video platform for sharing and watching content',
    trending: 'Trending',
    myPlaylists: 'My Playlists',
    uploadVideo: 'Upload New Video',
    title: 'Title',
    description: 'Description',
    selectFile: 'Select Video File',
    chooseFile: 'Choose File',
    publish: 'Publish Video',
    publishing: 'Publishing...',
    login: 'Login',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    noAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    profile: 'Profile',
    settings: 'Settings',
    darkMode: 'Dark Mode',
    notifications: 'Notifications',
    watchHistory: 'Watch History',
    likedVideos: 'Liked Videos',
    noVideos: 'No Videos',
    noVideosDesc: 'Start by uploading your first video or browse trending videos.',
    noPlaylists: 'No Playlists',
    noPlaylistsDesc: 'Create a new playlist to organize your favorite videos.',
    createPlaylist: 'Create Playlist',
    playlistName: 'Playlist Name',
    addVideo: 'Add Video',
    views: 'Views',
    likes: 'Likes',
    shares: 'Shares',
    comments: 'Comments',
    uploadDate: 'Upload Date',
    related: 'Related Videos',
    commentsSection: 'Comments',
    addComment: 'Add a comment...',
    post: 'Post',
    error: 'An error occurred',
    tryAgain: 'Try Again',
    videoUploaded: 'Video uploaded successfully',
    playlistCreated: 'Playlist created successfully',
    videoAdded: 'Video added to playlist',
    back: 'Back',
    search: 'Search',
  },
};
