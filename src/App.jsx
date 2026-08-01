import React, { useState } from 'react';
import { Navbar } from './components/Navbar.jsx';
import { HeroSection } from './components/HeroSection.jsx';
import { TimelineSection } from './components/TimelineSection.jsx';
import { CountdownSection } from './components/CountdownSection.jsx';
import { SecretNotesSection } from './components/SecretNotesSection.jsx';
import { DailyBoxSection } from './components/DailyBoxSection.jsx';
import { MusicPlayer } from './components/MusicPlayer.jsx';
import { AnniversaryBanner } from './components/AnniversaryBanner.jsx';
import { PhotoLightbox } from './components/PhotoLightbox.jsx';
import { ShareModal } from './components/ShareModal.jsx';
import { FloatingHearts } from './components/FloatingHearts.jsx';
import { PasswordLockModal } from './components/PasswordLockModal.jsx';
import { loadAppData } from './utils/storage.js';
import { isReadOnlyFromUrl } from './utils/urlSharing.js';
import { Heart, Gift } from 'lucide-react';

export default function App() {
  const [appData, setAppData] = useState(() => loadAppData());
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Password Lock State (Default password requested: 1232001)
  const [isSiteLocked, setIsSiteLocked] = useState(() => {
    return sessionStorage.getItem('love_story_site_unlocked') !== 'true';
  });

  const isReadOnly = isReadOnlyFromUrl();

  // Audio Player State
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState(
    appData.profile.activeTrackId || appData.playlist[0]?.id || '1'
  );

  const handleUnlockSite = () => {
    setIsSiteLocked(false);
    sessionStorage.setItem('love_story_site_unlocked', 'true');
    // Start the background song right away — this fires from the user's
    // "unlock" click, so browsers will allow the audio/video to play.
    setIsPlayingMusic(true);
  };

  const partnerNames = `${appData.profile.partnerOne} & ${appData.profile.partnerTwo}`;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="top" className="min-h-screen bg-gradient-to-b from-rose-100/60 via-rose-50/40 to-pink-100/50 text-gray-800 flex flex-col relative font-sans selection:bg-rose-500 selection:text-white">
      {/* Site Entry Lock Modal (Requires Password 1232001) */}
      <PasswordLockModal
        isLocked={isSiteLocked}
        correctPin={appData.profile.adminPin || '1232001'}
        partnerNames={partnerNames}
        onUnlock={handleUnlockSite}
      />

      {/* Floating Hearts Particle Effect */}
      <FloatingHearts active={appData.profile.enableHearts !== false} />

      {/* Viewer Mode Banner if viewing a shared gift link */}
      {isReadOnly && (
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white text-xs font-bold py-2 px-4 text-center shadow-md flex items-center justify-center gap-2 dir-rtl relative z-50">
          <Gift className="w-4 h-4 animate-bounce" />
          <span>أنت الآن تستمتع بصفحة الهدية الخاصة في وضع القراءة والمشاهدة ✨❤️</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        onOpenShare={() => setIsShareOpen(true)}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={() => setIsPlayingMusic((prev) => !prev)}
        partnerNames={partnerNames}
      />

      {/* Special Occasion Anniversary Banner */}
      <AnniversaryBanner
        startDate={appData.profile.startDate}
        upcomingEvents={appData.upcomingEvents}
        partnerNames={partnerNames}
      />

      {/* Hero Header Section */}
      <HeroSection
        profile={appData.profile}
        onExploreMemories={() => scrollToSection('memories')}
        onOpenDaily={() => scrollToSection('daily')}
      />

      {/* Main View Area - everything visible on one home page, scroll to browse */}
      <main className="flex-1 pb-24 relative z-10">
        <div id="memories" className="scroll-mt-20">
          <TimelineSection
            memories={appData.memories}
            onSelectMemory={(mem) => setSelectedMemory(mem)}
          />
        </div>

        <div id="countdowns" className="scroll-mt-20">
          <CountdownSection events={appData.upcomingEvents} />
        </div>

        <div id="notes" className="scroll-mt-20">
          <SecretNotesSection notes={appData.secretNotes} />
        </div>

        <div id="daily" className="scroll-mt-20">
          <DailyBoxSection messages={appData.dailyMessages} />
        </div>
      </main>

      {/* Floating Background Audio Player */}
      <MusicPlayer
        playlist={appData.playlist}
        activeTrackId={activeTrackId}
        onTrackChange={(id) => setActiveTrackId(id)}
        isPlaying={isPlayingMusic}
        setIsPlaying={setIsPlayingMusic}
      />

      {/* Photo Lightbox Modal */}
      <PhotoLightbox
        memory={selectedMemory}
        onClose={() => setSelectedMemory(null)}
      />

      {/* Gift Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        appData={appData}
      />

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-rose-100 py-8 px-4 text-center text-xs text-rose-800/80 space-y-2 dir-rtl relative z-10">
        <div className="flex items-center justify-center gap-1.5 font-bold text-sm text-rose-950">
          <span>صُنعت بحب وشغف خصيصاً لـ</span>
          <span className="text-rose-600">{appData.profile.partnerTwo}</span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
        </div>
        <p className="text-gray-500 max-w-md mx-auto">
          "في كل لحظة وكل ثانية، يزداد حبنا عمقاً وجمالاً مع مرور الأيام" ❤️
        </p>
      </footer>
    </div>
  );
}
