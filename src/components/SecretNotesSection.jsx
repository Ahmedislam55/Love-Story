import React, { useState } from 'react';
import { Lock, Unlock, Heart, Sparkles, Eye, Feather } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SecretNotesSection = ({ notes }) => {
  const [unlockedIds, setUnlockedIds] = useState({});

  const toggleUnlock = (id) => {
    const isAlreadyUnlocked = !!unlockedIds[id];
    setUnlockedIds((prev) => ({ ...prev, [id]: !isAlreadyUnlocked }));

    if (!isAlreadyUnlocked) {
      // Trigger heart confetti explosion
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#fb7185', '#f472b6'],
      });
    }
  };

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto dir-rtl space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-bold">
          <Feather className="w-3.5 h-3.5" />
          <span>رسائل واعترافات مخصصة لقلبكِ فقط</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-950">
          رسائل حب مخفية تظهر عند الضغط ✉️❤️
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          اضغطي على أي ظرف لفك الختم الشمعي وقراءة الكلمات المكتوبة لكِ بعناية
        </p>
      </div>

      {/* Secret Envelopes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => {
          const isOpen = !!unlockedIds[note.id];

          return (
            <div
              key={note.id}
              onClick={() => toggleUnlock(note.id)}
              className={`cursor-pointer rounded-3xl p-6 transition-all duration-500 transform hover:-translate-y-1 select-none border shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[220px] ${
                isOpen
                  ? 'bg-gradient-to-br from-rose-50 via-white to-pink-50 border-rose-300 shadow-rose-200/50'
                  : 'bg-gradient-to-br from-rose-900 via-rose-950 to-gray-900 border-rose-800 text-white hover:border-rose-500'
              }`}
            >
              {/* Background Decorative Pattern */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-400 to-pink-500" />

              {/* Envelope Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                      isOpen
                        ? 'bg-rose-500 text-white shadow-md'
                        : 'bg-rose-800/80 text-rose-200 border border-rose-700'
                    }`}
                  >
                    {isOpen ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-base sm:text-lg leading-tight ${
                        isOpen ? 'text-rose-950' : 'text-rose-100'
                      }`}
                    >
                      {note.title}
                    </h3>
                    <p className={`text-xs ${isOpen ? 'text-rose-600' : 'text-rose-300'}`}>
                      {isOpen ? 'تم فك الرسالة ❤️' : 'انقري لفتح الرسالة المخفية'}
                    </p>
                  </div>
                </div>

                <Sparkles
                  className={`w-5 h-5 ${isOpen ? 'text-amber-500' : 'text-rose-400 opacity-60'}`}
                />
              </div>

              {/* Content Body */}
              <div className="my-4">
                {isOpen ? (
                  <div className="bg-white/80 p-4 rounded-2xl border border-rose-100 text-gray-800 text-sm leading-relaxed font-serif animate-fadeIn shadow-xs">
                    "{note.content}"
                  </div>
                ) : (
                  <div className="py-6 text-center space-y-2 text-rose-300/80">
                    <Heart className="w-8 h-8 mx-auto animate-pulse text-rose-500 fill-rose-500/30" />
                    <p className="text-xs italic">رسالة مغلقة بالختم الاحمر 💌</p>
                  </div>
                )}
              </div>

              {/* Envelope Footer */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-rose-200/40">
                <span className={isOpen ? 'text-rose-600 font-semibold' : 'text-rose-400'}>
                  {isOpen ? 'انقري للإغلاق' : 'انقري لفتح الختم'}
                </span>

                <div className="flex items-center gap-1 font-bold text-rose-500">
                  <span>اقرأي الرسالة</span>
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
