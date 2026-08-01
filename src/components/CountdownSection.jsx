import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Heart, Sparkles, Cake, Plane, Gift } from 'lucide-react';
import { calculateTimeRemaining, formatArabicDate } from '../utils/dateUtils.js';
import confetti from 'canvas-confetti';

const CountdownCard = ({ event }) => {
  const [time, setTime] = useState(() => calculateTimeRemaining(event.targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining(event.targetDate);
      setTime(remaining);
      if (remaining.isPast && remaining.days === 0 && remaining.hours === 0 && remaining.minutes === 0) {
        // Trigger celebratory confetti on event arrival
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [event.targetDate]);

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'cake':
        return <Cake className="w-6 h-6 text-pink-500" />;
      case 'plane':
        return <Plane className="w-6 h-6 text-sky-500" />;
      case 'gift':
        return <Gift className="w-6 h-6 text-amber-500" />;
      default:
        return <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-lg hover:shadow-xl transition-all space-y-5 relative overflow-hidden group">
      {/* Accent Background Glow */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-400 via-pink-500 to-amber-400" />

      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-rose-50 border border-rose-100">
              {renderIcon(event.iconName)}
            </span>
            <h3 className="text-xl font-bold text-rose-950">{event.title}</h3>
          </div>
          {event.description && (
            <p className="text-xs text-gray-600 line-clamp-2 pt-1">{event.description}</p>
          )}
        </div>

        <div className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full whitespace-nowrap border border-rose-100">
          <Calendar className="w-3.5 h-3.5 inline ml-1" />
          {formatArabicDate(event.targetDate.slice(0, 10))}
        </div>
      </div>

      {/* Countdown Clock Grid */}
      {time.isPast ? (
        <div className="bg-gradient-to-r from-amber-500 to-rose-500 text-white p-4 rounded-2xl text-center shadow-inner space-y-1">
          <Sparkles className="w-6 h-6 mx-auto animate-bounce" />
          <p className="font-extrabold text-lg">حان الموعد السعيد! 🎉❤️</p>
          <p className="text-xs opacity-90">اليوم نحتفل بهاذ المناسبة الخاصة جداً</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
          <div className="bg-rose-50/80 p-3 rounded-2xl border border-rose-100">
            <span className="block text-xl sm:text-2xl font-black text-rose-900">{time.days}</span>
            <span className="text-xs text-rose-600 font-semibold">يوم</span>
          </div>
          <div className="bg-rose-50/80 p-3 rounded-2xl border border-rose-100">
            <span className="block text-xl sm:text-2xl font-black text-rose-900">{time.hours}</span>
            <span className="text-xs text-rose-600 font-semibold">ساعة</span>
          </div>
          <div className="bg-rose-50/80 p-3 rounded-2xl border border-rose-100">
            <span className="block text-xl sm:text-2xl font-black text-rose-900">{time.minutes}</span>
            <span className="text-xs text-rose-600 font-semibold">دقيقة</span>
          </div>
          <div className="bg-rose-50/80 p-3 rounded-2xl border border-rose-100">
            <span className="block text-xl sm:text-2xl font-black text-rose-900">{time.seconds}</span>
            <span className="text-xs text-rose-600 font-semibold">ثانية</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const CountdownSection = ({ events }) => {
  return (
    <section className="py-12 px-4 max-w-6xl mx-auto dir-rtl space-y-8">
      {/* Section Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
          <Clock className="w-3.5 h-3.5" />
          <span>عداد أيامنا القادمة والمناسبات القريبة</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-950">
          نعد الثواني بشوق لأيامنا القادمة ⏳❤️
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          كل مناسبة قادمة هي فرصة جديدة لنصنع حكايات وذكريات لا تُمحى
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => (
          <CountdownCard key={ev.id} event={ev} />
        ))}
      </div>
    </section>
  );
};
