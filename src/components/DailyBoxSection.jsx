import React, { useState } from 'react';
import { Gift, CheckCircle2, ChevronRight, ChevronLeft, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DailyBoxSection = ({ messages }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [openedDays, setOpenedDays] = useState({ 1: true });

  const currentMsg = messages[selectedDayIndex] || messages[0];

  const handleOpenBox = (dayNumber) => {
    setOpenedDays((prev) => ({ ...prev, [dayNumber]: true }));
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#f43f5e', '#ec4899'],
    });
  };

  if (!currentMsg) return null;

  const isCurrentOpened = !!openedDays[currentMsg.dayNumber];

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto dir-rtl space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
          <Gift className="w-3.5 h-3.5 text-amber-600" />
          <span>صندوق مفاجآت الحب اليومية</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-950">
          هدية يومية تنتظرك كل صباح 🎁❤️
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
          جرعة سعادة متجددة ورسائل حب تفتح يومياً لإسعاد قلبك النقي
        </p>
      </div>

      {/* Main Daily Box Container */}
      <div className="bg-gradient-to-br from-amber-500 via-rose-500 to-pink-600 rounded-3xl p-1 shadow-2xl">
        <div className="bg-white rounded-[22px] p-6 sm:p-10 space-y-8 text-center relative overflow-hidden">
          {/* Top Day Switcher */}
          <div className="flex items-center justify-between gap-2 border-b border-rose-100 pb-4">
            <button
              disabled={selectedDayIndex === 0}
              onClick={() => setSelectedDayIndex((prev) => Math.max(0, prev - 1))}
              className="p-2 rounded-xl bg-rose-50 text-rose-700 disabled:opacity-40 hover:bg-rose-100 transition-colors flex items-center gap-1 text-xs font-bold"
            >
              <ChevronRight className="w-4 h-4" />
              <span>الرسالة السابقة</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
              <span className="font-black text-rose-950 text-base sm:text-lg">
                اليوم {currentMsg.dayNumber} من رحلتنا 🌟
              </span>
            </div>

            <button
              disabled={selectedDayIndex === messages.length - 1}
              onClick={() => setSelectedDayIndex((prev) => Math.min(messages.length - 1, prev + 1))}
              className="p-2 rounded-xl bg-rose-50 text-rose-700 disabled:opacity-40 hover:bg-rose-100 transition-colors flex items-center gap-1 text-xs font-bold"
            >
              <span>الرسالة التالية</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Box State */}
          <div className="py-4">
            {!isCurrentOpened ? (
              <div className="space-y-6 max-w-md mx-auto">
                <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto bg-gradient-to-tr from-amber-400 via-rose-500 to-pink-500 rounded-3xl flex items-center justify-center text-white shadow-xl transform hover:scale-105 transition-transform cursor-pointer">
                  <Gift className="w-12 h-12 animate-bounce" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-rose-950">صندوق الرسالة اليومية مغلق 🎁</h3>
                  {currentMsg.hint && (
                    <p className="text-xs text-amber-700 bg-amber-50 py-1.5 px-4 rounded-full inline-block font-semibold">
                      تلميح اليوم: {currentMsg.hint}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleOpenBox(currentMsg.dayNumber)}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-rose-600 text-white font-black rounded-2xl shadow-lg hover:shadow-amber-500/30 transition-all text-base transform hover:-translate-y-0.5"
                >
                  انقري هنا لفتح مفاجأة اليوم 🎉
                </button>
              </div>
            ) : (
              <div className="space-y-6 max-w-xl mx-auto animate-fadeIn">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>تم فتح رسالة اليوم بنجاح ❤️</span>
                </div>

                <div className="bg-rose-50/80 p-6 sm:p-8 rounded-3xl border border-rose-200 shadow-inner font-serif text-rose-950 text-lg sm:text-xl leading-relaxed">
                  "{currentMsg.message}"
                </div>

                <div className="flex items-center justify-center gap-2 text-rose-500 text-xs font-semibold">
                  <Heart className="w-4 h-4 fill-rose-500" />
                  <span>دمتِ لي أجمل وأغلى الأرزاق كل يوم</span>
                </div>
              </div>
            )}
          </div>

          {/* Days Navigation Pill Bar */}
          <div className="pt-4 border-t border-rose-100 flex items-center justify-center gap-2 overflow-x-auto py-2">
            {messages.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => setSelectedDayIndex(idx)}
                className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                  selectedDayIndex === idx
                    ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-300'
                    : openedDays[m.dayNumber]
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-gray-100 text-gray-500 hover:bg-rose-50'
                }`}
              >
                {m.dayNumber}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
