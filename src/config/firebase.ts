import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import type { DocumentData, QuerySnapshot } from 'firebase/firestore';
import {
  getFirestore,
  type Firestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
  onSnapshot,
} from 'firebase/firestore';
import {
  getStorage,
  type FirebaseStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'mvideo-demo.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'mvideo-demo',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'mvideo-demo.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:abcdef',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-DEMO',
};

let app: FirebaseApp | null = null;
let auth: ReturnType<typeof getAuth> | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  return app;
}

export function getFirebaseAuth() {
  if (!auth) {
    getFirebaseApp();
    auth = getAuth(app!);
  }
  return auth!;
}

export function getFirebaseDb(): Firestore {
  if (!db) {
    getFirebaseApp();
    db = getFirestore(app!);
  }
  return db;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (!storage) {
    getFirebaseApp();
    storage = getStorage(app!);
  }
  return storage;
}

export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  createdAt: string;
};

export async function signUp(email: string, password: string, displayName: string): Promise<AuthUser> {
  const auth = getFirebaseAuth();
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName });
  return mapAuthUser(userCredential.user);
}

export async function signIn(email: string, password: string): Promise<AuthUser> {
  const auth = getFirebaseAuth();
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return mapAuthUser(userCredential.user);
}

export async function signOutUser(): Promise<void> {
  const auth = getFirebaseAuth();
  await signOut(auth);
}

export async function resetPassword(email: string): Promise<void> {
  const auth = getFirebaseAuth();
  await sendPasswordResetEmail(auth, email);
}

export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  const auth = getFirebaseAuth();
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(mapAuthUser(user));
    } else {
      callback(null);
    }
  });
}

function mapAuthUser(user: User): AuthUser {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    createdAt: user.metadata.creationTime || new Date().toISOString(),
  };
}

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
  uploaderId: string;
  uploaderName: string;
  uploaderAvatar?: string;
  category?: string;
  tags?: string[];
};

export type Playlist = {
  id: string;
  name: string;
  description: string;
  videoIds: string[];
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
};

export type Comment = {
  id: string;
  videoId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  createdAt: string;
  likes: number;
};

export type UserProfile = {
  uid: string;
  name: string;
  email: string;
  avatar?: string;
  playlists: string[];
  likedVideos: string[];
  watchHistory: string[];
  createdAt: string;
};

export async function createVideo(video: Omit<Video, 'id' | 'views' | 'likes' | 'uploadDate'>): Promise<string> {
  const db = getFirebaseDb();
  const docRef = await addDoc(collection(db, 'videos'), {
    ...video,
    views: 0,
    likes: 0,
    uploadDate: serverTimestamp(),
  });
  return docRef.id;
}

export async function getVideo(id: string): Promise<Video | null> {
  const db = getFirebaseDb();
  const docSnap = await getDoc(doc(db, 'videos', id));
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Video;
}

export async function getAllVideos(): Promise<Video[]> {
  const db = getFirebaseDb();
  const q = query(collection(db, 'videos'), orderBy('uploadDate', 'desc'), limit(50));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Video));
}

export async function incrementViews(videoId: string): Promise<void> {
  const db = getFirebaseDb();
  const videoRef = doc(db, 'videos', videoId);
  await updateDoc(videoRef, { views: 1 });
}

export async function likeVideo(videoId: string, userId: string, like: boolean): Promise<void> {
  const db = getFirebaseDb();
  const videoRef = doc(db, 'videos', videoId);
  await updateDoc(videoRef, { likes: like ? 1 : -1 });

  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const userData = userSnap.data() as UserProfile;
    const likedVideos = like
      ? [...userData.likedVideos, videoId]
      : userData.likedVideos.filter((id) => id !== videoId);
    await updateDoc(userRef, { likedVideos });
  }
}

export async function createPlaylist(playlist: Omit<Playlist, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const db = getFirebaseDb();
  const docRef = await addDoc(collection(db, 'playlists'), {
    ...playlist,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getUserPlaylists(ownerId: string): Promise<Playlist[]> {
  const db = getFirebaseDb();
  const q = query(
    collection(db, 'playlists'),
    where('ownerId', '==', ownerId),
    orderBy('updatedAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Playlist));
}

export async function addVideoToPlaylist(playlistId: string, videoId: string): Promise<void> {
  const db = getFirebaseDb();
  const playlistRef = doc(db, 'playlists', playlistId);
  const playlistSnap = await getDoc(playlistRef);
  if (playlistSnap.exists()) {
    const playlist = playlistSnap.data() as Playlist;
    if (!playlist.videoIds.includes(videoId)) {
      await updateDoc(playlistRef, {
        videoIds: [...playlist.videoIds, videoId],
        updatedAt: serverTimestamp(),
      });
    }
  }
}

export async function addComment(comment: Omit<Comment, 'id' | 'createdAt' | 'likes'>): Promise<string> {
  const db = getFirebaseDb();
  const docRef = await addDoc(collection(db, 'comments'), {
    ...comment,
    likes: 0,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getVideoComments(videoId: string): Promise<Comment[]> {
  const db = getFirebaseDb();
  const q = query(
    collection(db, 'comments'),
    where('videoId', '==', videoId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Comment));
}

export async function createUserProfile(profile: UserProfile): Promise<void> {
  const db = getFirebaseDb();
  await setDoc(doc(db, 'users', profile.uid), {
    ...profile,
    createdAt: serverTimestamp(),
  });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const db = getFirebaseDb();
  const docSnap = await getDoc(doc(db, 'users', uid));
  if (!docSnap.exists()) return null;
  return { uid: docSnap.id, ...docSnap.data() } as UserProfile;
}

export async function updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
  const db = getFirebaseDb();
  await updateDoc(doc(db, 'users', uid), updates);
}

export async function uploadVideoFile(file: File, path: string): Promise<string> {
  const storage = getFirebaseStorage();
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function uploadThumbnailFile(file: File, path: string): Promise<string> {
  const storage = getFirebaseStorage();
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function deleteVideoFile(path: string): Promise<void> {
  const storage = getFirebaseStorage();
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
}

export function subscribeToVideos(callback: (videos: Video[]) => void) {
  const db = getFirebaseDb();
  const q = query(collection(db, 'videos'), orderBy('uploadDate', 'desc'));
  return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
    const videos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Video));
    callback(videos);
  });
}

export function subscribeToUserPlaylists(ownerId: string, callback: (playlists: Playlist[]) => void) {
  const db = getFirebaseDb();
  const q = query(
    collection(db, 'playlists'),
    where('ownerId', '==', ownerId),
    orderBy('updatedAt', 'desc')
  );
  return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
    const playlists = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Playlist));
    callback(playlists);
  });
}

export { collection, doc, query, where, orderBy, limit, serverTimestamp, Timestamp };
