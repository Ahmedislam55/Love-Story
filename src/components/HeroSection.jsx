import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, Clock, Gift, ArrowLeft } from 'lucide-react';
import { calculateTimeElapsed } from '../utils/dateUtils.js';

export const HeroSection = ({
  profile,
  onExploreMemories,
  onOpenDaily,
}) => {
  const [elapsed, setElapsed] = useState(() => calculateTimeElapsed(profile.startDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(calculateTimeElapsed(profile.startDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [profile.startDate]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-100/70 via-rose-50/50 to-white pt-10 pb-16 px-4 dir-rtl">
      {/* Glow Backdrop */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-300/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-rose-200 text-rose-600 text-xs sm:text-sm font-semibold shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span>رحلة عشقنا بدأت منذ {profile.startDate}</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        </div>

        {/* Heading Names */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-rose-950 tracking-tight leading-tight">
            <span>{profile.partnerOne}</span>
            <span className="inline-block mx-3 text-rose-500 animate-pulse">❤️</span>
            <span>{profile.partnerTwo}</span>
          </h1>

          <p className="text-lg sm:text-2xl font-serif text-rose-800/90 max-w-2xl mx-auto leading-relaxed italic">
            "{profile.heroQuote}"
          </p>
          <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
            {profile.heroSubquote}
          </p>
        </div>

        {/* Live Relationship Counter Widget */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-xl max-w-3xl mx-auto transform hover:scale-[1.01] transition-all">
          <div className="flex items-center justify-center gap-2 text-rose-700 font-bold mb-4">
            <Clock className="w-5 h-5 text-rose-500 animate-spin" style={{ animationDuration: '10s' }} />
            <span className="text-base sm:text-lg">مضى على حبنا حتى هذه اللحظة:</span>
          </div>

          {/* Big Days Badge */}
          <div className="mb-6 bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 px-6 rounded-2xl shadow-inner max-w-md mx-auto">
            <div className="text-3xl sm:text-5xl font-black tracking-tight">
              {elapsed.totalDays.toLocaleString('ar-EG')} يوماً
            </div>
            <div className="text-xs sm:text-sm font-medium text-rose-100 mt-0.5">
              من الحب والاحترام والسعادة المتواصلة ❤️
            </div>
          </div>

          {/* Detailed Clock Units Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 text-center">
            <div className="bg-rose-50/80 p-3 rounded-2xl border border-rose-100">
              <span className="block text-xl sm:text-2xl font-bold text-rose-900">{elapsed.years}</span>
              <span className="text-xs text-rose-600 font-medium">سنة</span>
            </div>
            <div className="bg-rose-50/80 p-3 rounded-2xl border border-rose-100">
              <span className="block text-xl sm:text-2xl font-bold text-rose-900">{elapsed.months}</span>
              <span className="text-xs text-rose-600 font-medium">شهر</span>
            </div>
            <div className="bg-rose-50/80 p-3 rounded-2xl border border-rose-100">
              <span className="block text-xl sm:text-2xl font-bold text-rose-900">{elapsed.days}</span>
              <span className="text-xs text-rose-600 font-medium">يوم</span>
            </div>
            <div className="bg-rose-50/80 p-3 rounded-2xl border border-rose-100">
              <span className="block text-xl sm:text-2xl font-bold text-rose-900">{elapsed.hours}</span>
              <span className="text-xs text-rose-600 font-medium">ساعة</span>
            </div>
            <div className="bg-rose-50/80 p-3 rounded-2xl border border-rose-100">
              <span className="block text-xl sm:text-2xl font-bold text-rose-900">{elapsed.minutes}</span>
              <span className="text-xs text-rose-600 font-medium">دقيقة</span>
            </div>
            <div className="bg-rose-50/80 p-3 rounded-2xl border border-rose-100">
              <span className="block text-xl sm:text-2xl font-bold text-rose-900">{elapsed.seconds}</span>
              <span className="text-xs text-rose-600 font-medium">ثانية</span>
            </div>
          </div>
        </div>

        {/* Hero Quick Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onExploreMemories}
            className="flex items-center gap-2 px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-rose-300/50 transition-all transform hover:-translate-y-0.5 text-sm sm:text-base"
          >
            <Heart className="w-5 h-5 fill-white" />
            <span>تصفح شريط ذكرياتنا</span>
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenDaily}
            className="flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow-md transition-all text-sm sm:text-base"
          >
            <Gift className="w-5 h-5" />
            <span>افتح رسالة المفاجأة اليومية</span>
          </button>
        </div>
      </div>
    </section>
  );
};
