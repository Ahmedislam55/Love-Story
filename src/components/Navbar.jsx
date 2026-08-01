import React from 'react';
import { Heart, Calendar, Lock, Gift, Music, Share2, Sparkles } from 'lucide-react';

export const Navbar = ({
  activeTab,
  setActiveTab,
  onOpenShare,
  isPlayingMusic,
  onToggleMusic,
  partnerNames,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-xs dir-rtl">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand logo & couple names */}
        <div 
          onClick={() => setActiveTab('memories')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-rose-900 text-lg sm:text-xl leading-tight flex items-center gap-1.5">
              <span>{partnerNames}</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </h1>
            <p className="text-xs text-rose-500 font-medium">قصة حبنا الخالدة ❤️</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-rose-50/80 p-1.5 rounded-full border border-rose-100">
          <button
            onClick={() => setActiveTab('memories')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === 'memories'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-rose-700 hover:bg-rose-100/60'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>ذكرياتنا</span>
          </button>

          <button
            onClick={() => setActiveTab('countdowns')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === 'countdowns'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-rose-700 hover:bg-rose-100/60'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>عد تنازلي</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === 'notes'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-rose-700 hover:bg-rose-100/60'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>رسائل مخفية</span>
          </button>

          <button
            onClick={() => setActiveTab('daily')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === 'daily'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-rose-700 hover:bg-rose-100/60'
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>صندوق اليوم</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Background Music Button */}
          <button
            onClick={onToggleMusic}
            title={isPlayingMusic ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
            className={`p-2.5 rounded-full border transition-all flex items-center justify-center ${
              isPlayingMusic
                ? 'bg-rose-500 text-white border-rose-600 shadow-md animate-pulse'
                : 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100'
            }`}
          >
            <Music className="w-4 h-4" />
          </button>

          {/* Share Button */}
          <button
            onClick={onOpenShare}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-medium rounded-full text-xs shadow-sm hover:opacity-95 transition-opacity"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>مشاركة الرابط</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-rose-200 px-3 py-2 flex items-center justify-around shadow-lg dir-rtl">
        <button
          onClick={() => setActiveTab('memories')}
          className={`flex flex-col items-center gap-0.5 text-xs font-medium ${
            activeTab === 'memories' ? 'text-rose-600 font-bold' : 'text-gray-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${activeTab === 'memories' ? 'fill-rose-600' : ''}`} />
          <span>الذكريات</span>
        </button>

        <button
          onClick={() => setActiveTab('countdowns')}
          className={`flex flex-col items-center gap-0.5 text-xs font-medium ${
            activeTab === 'countdowns' ? 'text-rose-600 font-bold' : 'text-gray-500'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>العد التنازلي</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`flex flex-col items-center gap-0.5 text-xs font-medium ${
            activeTab === 'notes' ? 'text-rose-600 font-bold' : 'text-gray-500'
          }`}
        >
          <Lock className="w-5 h-5" />
          <span>سرية</span>
        </button>

        <button
          onClick={() => setActiveTab('daily')}
          className={`flex flex-col items-center gap-0.5 text-xs font-medium ${
            activeTab === 'daily' ? 'text-rose-600 font-bold' : 'text-gray-500'
          }`}
        >
          <Gift className="w-5 h-5" />
          <span>صندوق الحب</span>
        </button>

        <button
          onClick={onOpenShare}
          className="flex flex-col items-center gap-0.5 text-xs font-medium text-amber-600"
        >
          <Share2 className="w-5 h-5" />
          <span>مشاركة</span>
        </button>
      </div>
    </header>
  );
};
