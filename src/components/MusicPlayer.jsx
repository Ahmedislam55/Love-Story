import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, Disc, Tv } from 'lucide-react';
import { getYouTubeVideoId } from '../utils/youtube.js';

export const MusicPlayer = ({
  playlist,
  activeTrackId,
  onTrackChange,
  isPlaying,
  setIsPlaying,
}) => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const currentTrack = playlist.find((t) => t.id === activeTrackId) || playlist[0];
  const ytVideoId = currentTrack ? getYouTubeVideoId(currentTrack.url) : null;

  useEffect(() => {
    // Standard audio handling
    if (!audioRef.current || ytVideoId) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      return;
    }

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.log('Autoplay prevented by browser policy:', err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, activeTrackId, ytVideoId]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const playNextTrack = () => {
    if (playlist.length <= 1) return;
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    onTrackChange(playlist[nextIndex].id);
  };

  const playPrevTrack = () => {
    if (playlist.length <= 1) return;
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    onTrackChange(playlist[prevIndex].id);
  };

  if (!currentTrack) return null;

  // Cover image URL: if it's YouTube, we can also fallback to YouTube thumbnail!
  const displayCover = currentTrack.coverUrl || (ytVideoId ? `https://img.youtube.com/vi/${ytVideoId}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&auto=format&fit=crop&q=80');

  return (
    <>
      {/* HTML5 Audio Player for Direct MP3/Audio Links */}
      {!ytVideoId && (
        <audio
          ref={audioRef}
          src={currentTrack.url}
          onEnded={playNextTrack}
          loop={playlist.length === 1}
        />
      )}

      {/* YouTube Embedded Audio/Video Player */}
      {ytVideoId && isPlaying && (
        <div className={`fixed z-50 transition-all ${showVideo ? 'bottom-20 left-4 w-72 h-44 rounded-2xl overflow-hidden shadow-2xl border-2 border-rose-400 bg-black' : 'opacity-0 w-0 h-0 pointer-events-none'}`}>
          <iframe
            key={`${ytVideoId}-${isPlaying}`}
            width={showVideo ? '100%' : '1'}
            height={showVideo ? '100%' : '1'}
            src={`https://www.youtube.com/embed/${ytVideoId}?autoplay=1&enablejsapi=1&loop=1&playlist=${ytVideoId}`}
            title={currentTrack.title}
            allow="autoplay; encrypted-media"
            className="w-full h-full border-0"
          />
        </div>
      )}

      {/* Floating Bottom Audio Player Bar */}
      <div className="fixed bottom-16 md:bottom-6 left-4 z-40 dir-rtl">
        <div
          className={`bg-white/95 backdrop-blur-md rounded-2xl border border-rose-200 shadow-xl transition-all duration-300 ${
            isExpanded ? 'p-4 w-72 sm:w-80' : 'p-2.5 flex items-center gap-3'
          }`}
        >
          {/* Main Controls Row */}
          <div className="flex items-center gap-3 w-full">
            {/* Spinning Disc Cover */}
            <div
              onClick={() => setIsExpanded(!isExpanded)}
              className="relative cursor-pointer group flex-shrink-0"
            >
              <div
                className={`w-11 h-11 rounded-full overflow-hidden border-2 border-rose-400 shadow-xs ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '12s' }}
              >
                <img
                  src={displayCover}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                <Disc className="w-5 h-5" />
              </div>
            </div>

            {/* Track info snippet */}
            <div
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex-1 min-w-0 cursor-pointer"
            >
              <div className="flex items-center gap-1">
                <p className="text-xs font-bold text-rose-950 truncate">{currentTrack.title}</p>
                {ytVideoId && (
                  <span className="text-[9px] px-1.5 py-0.5 bg-red-100 text-red-700 font-extrabold rounded-full flex-shrink-0">
                    YouTube 🔴
                  </span>
                )}
              </div>
              <p className="text-[10px] text-gray-500 truncate">{currentTrack.artist}</p>
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center hover:bg-rose-700 transition-colors shadow-sm flex-shrink-0"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
          </div>

          {/* Expanded Playlist & Volume Drawer */}
          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-rose-100 space-y-3 animate-fadeIn">
              {/* Skip & Volume Bar */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={playPrevTrack}
                    className="p-1.5 text-gray-600 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>
                  <button
                    onClick={playNextTrack}
                    className="p-1.5 text-gray-600 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                  {ytVideoId && (
                    <button
                      onClick={() => setShowVideo(!showVideo)}
                      className={`p-1.5 rounded-lg transition-colors text-xs flex items-center gap-1 font-bold ${
                        showVideo ? 'bg-red-600 text-white' : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                      }`}
                      title="إظهار/إخفاء شاشة يوتيوب"
                    >
                      <Tv className="w-3.5 h-3.5" />
                      <span className="text-[10px]">{showVideo ? 'إخفاء' : 'الفيديو'}</span>
                    </button>
                  )}
                </div>

                {!ytVideoId && (
                  <div className="flex items-center gap-1.5 w-28">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-gray-500 hover:text-rose-600"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-4 h-4 text-rose-500" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setVolume(parseFloat(e.target.value));
                        setIsMuted(false);
                      }}
                      className="w-full accent-rose-500 h-1.5 bg-rose-100 rounded-lg cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Playlist Selection List */}
              <div className="space-y-1 max-h-32 overflow-y-auto pt-1">
                <p className="text-[10px] font-bold text-rose-800 uppercase tracking-wider mb-1">
                  قائمة الأغاني:
                </p>
                {playlist.map((track) => {
                  const isYt = getYouTubeVideoId(track.url) !== null;
                  return (
                    <div
                      key={track.id}
                      onClick={() => {
                        onTrackChange(track.id);
                        setIsPlaying(true);
                      }}
                      className={`p-1.5 rounded-lg text-xs flex items-center justify-between cursor-pointer transition-colors ${
                        track.id === currentTrack.id
                          ? 'bg-rose-100 text-rose-900 font-bold'
                          : 'hover:bg-rose-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="truncate">{track.title}</span>
                        {isYt && (
                          <span className="text-[8px] bg-red-100 text-red-600 px-1 py-0.2 rounded-sm font-bold flex-shrink-0">
                            YT
                          </span>
                        )}
                      </div>
                      {track.id === currentTrack.id && (
                        <Music className="w-3 h-3 text-rose-600 flex-shrink-0 animate-bounce" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
