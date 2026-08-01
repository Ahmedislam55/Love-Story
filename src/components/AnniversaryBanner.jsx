import React, { useEffect, useState } from 'react';
import { Sparkles, Bell, X } from 'lucide-react';
import { isTodayAnniversary } from '../utils/dateUtils.js';
import confetti from 'canvas-confetti';

export const AnniversaryBanner = ({
  startDate,
  upcomingEvents,
  partnerNames,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [todayEvent, setTodayEvent] = useState(null);

  useEffect(() => {
    // Check if today is relationship anniversary
    if (isTodayAnniversary(startDate)) {
      setTodayEvent(`اليوم هو العيد السنوي لقصة حب ${partnerNames}! 🎉❤️`);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.2 } });
      return;
    }

    // Check if any upcoming event lands on today
    const nowStr = new Date().toISOString().slice(0, 10);
    const matched = upcomingEvents.find((e) => e.targetDate.startsWith(nowStr));
    if (matched) {
      setTodayEvent(`اليوم نحتفل بـ: ${matched.title} 🎉`);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.2 } });
    }
  }, [startDate, upcomingEvents, partnerNames]);

  if (!todayEvent || !isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 text-white py-3 px-4 shadow-md sticky top-16 z-30 dir-rtl border-b border-rose-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm font-bold">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-white/20 rounded-full animate-bounce">
            <Bell className="w-4 h-4 text-amber-200 fill-amber-200" />
          </div>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>تنبيه المناسبات: {todayEvent}</span>
          </span>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="p-1 rounded-full hover:bg-white/20 transition-colors"
          title="إغلاق التنبيه"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
