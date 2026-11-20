export type Video = {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  uploadDate: string;
  uploader: string;
  uploaderAvatar?: string;
};

export type Playlist = {
  id: string;
  name: string;
  description: string;
  videoIds: string[];
  createdAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  playlists: string[];
  likedVideos: string[];
  watchHistory: string[];
};

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'تعلم تطوير تطبيقات الجوال بلغةdart',
    description: 'دورة شاملة لتعلم تطوير التطبيقات باستخدام Flutter ولغة Dart من الصفر إلى الاحتراف.',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab77bdbc79?w=800&q=80',
    duration: '12:45',
    views: 12500,
    likes: 890,
    uploadDate: '2026-10-15',
    uploader: 'مطور تطبيقات',
    uploaderAvatar: 'https://i.pravatar.cc/150?u=1',
  },
  {
    id: '2',
    title: 'طهي أكلة المندي اليمني بأفضل طريقة',
    description: 'طريقة preparar المندي اليمني التقليدي خطوة بخطوة مع شرح المكونات.',
    url: 'https://www.w3schools.com/html/movie.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    duration: '8:30',
    views: 8400,
    likes: 620,
    uploadDate: '2026-10-20',
    uploader: 'مطبخ يمني',
    uploaderAvatar: 'https://i.pravatar.cc/150?u=2',
  },
  {
    id: '3',
    title: 'رحلة إلى صحراء ورملة في حضرموت',
    description: 'استكشاف المناظر الطبيعية الخلابة في صحراء ورملة وأجواء вечерية رائعة.',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1533234130209-e1e9e0462c4a?w=800&q=80',
    duration: '15:20',
    views: 21000,
    likes: 1540,
    uploadDate: '2026-11-01',
    uploader: 'مستكشف',
    uploaderAvatar: 'https://i.pravatar.cc/150?u=3',
  },
  {
    id: '4',
    title: 'Build a Video Platform with React',
    description: 'Learn how to build a complete video sharing platform using React, Tailwind CSS and Node.js.',
    url: 'https://www.w3schools.com/html/movie.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    duration: '22:15',
    views: 15600,
    likes: 1120,
    uploadDate: '2026-11-05',
    uploader: 'Code Master',
    uploaderAvatar: 'https://i.pravatar.cc/150?u=4',
  },
  {
    id: '5',
    title: 'نصائح للحفاظ على الصحة في الشتاء',
    description: 'مجموعة من النصائح الطبية عملية للحفاظ على صحتك durante موسم الشتاء.',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1559757175-57e7deb09554?w=800&q=80',
    duration: '6:40',
    views: 5300,
    likes: 410,
    uploadDate: '2026-11-10',
    uploader: 'صحتك أولا',
    uploaderAvatar: 'https://i.pravatar.cc/150?u=5',
  },
];

export const mockPlaylists: Playlist[] = [
  {
    id: 'p1',
    name: 'دورات programming',
    description: 'أفضل دورات البرمجة والتطوير',
    videoIds: ['1', '4'],
    createdAt: '2026-10-20',
  },
  {
    id: 'p2',
    name: 'وصفات يمنية تقليدية',
    description: 'أشهى الأكلات اليمنية التقليدية',
    videoIds: ['2'],
    createdAt: '2026-11-01',
  },
];

export const mockUser: User = {
  id: 'u1',
  name: 'أحمد علي',
  email: 'ahmed@example.com',
  avatar: 'https://i.pravatar.cc/150?u=u1',
  playlists: ['p1', 'p2'],
  likedVideos: ['1', '3'],
  watchHistory: ['1', '2', '4'],
};
