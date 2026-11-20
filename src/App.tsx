import { Switch, Route } from 'wouter';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { VideoPlayer } from './components/VideoPlayer';
import { Upload } from './components/Upload';
import { Playlists } from './components/Playlists';
import { Account } from './components/Account';
import { AuthForm } from './components/AuthForm';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={AuthForm} />
      <Route path="/video/:id" component={VideoPlayer} />
      <Route path="/upload" component={Upload} />
      <Route path="/playlists" component={Playlists} />
      <Route path="/account" component={Account} />
    </Switch>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <Navbar />
          <main className="pt-16 pb-8">
            <Routes />
          </main>
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}
