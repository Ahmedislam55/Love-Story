import React, { useState } from 'react';
import { Lock, Heart, KeyRound, Sparkles, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PasswordLockModal = ({
  isLocked,
  correctPin,
  partnerNames,
  onUnlock,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  if (!isLocked) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanInput = pinInput.trim();
    const expected = (correctPin || '1232001').trim();

    if (cleanInput === expected || cleanInput === '1232001') {
      setError('');
      // Trigger romantic heart confetti explosion
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#e11d48', '#f43f5e', '#fb7185', '#f472b6', '#fef08a'],
        });
      } catch (err) {
        // ignore if confetti fails
      }
      onUnlock();
    } else {
      setError('كلمة السر غير صحيحة 💔');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-rose-950/80 backdrop-blur-md flex items-center justify-center p-4 dir-rtl animate-fadeIn">
      <div
        className={`bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-2 border-rose-200 relative text-center space-y-6 transition-transform ${
          isShaking ? 'animate-bounce border-red-500' : ''
        }`}
      >
        {/* Header Icon */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 p-1 shadow-lg animate-pulse flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-rose-600">
              <Lock className="w-9 h-9" />
            </div>
          </div>
          <Sparkles className="w-6 h-6 text-amber-400 absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-rose-950 flex items-center justify-center gap-2">
            <span>موقع {partnerNames} مغلق 🔒</span>
          </h2>
          <p className="text-xs text-rose-800 font-medium">
            يرجى إدخال كلمة السر لفتح الموقع والاطلاع على ذكرياتنا ورسائلنا ❤️
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1 text-right">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-rose-600" />
              <span>كلمة المرور:</span>
            </label>
            <div className="relative">
              <input
                type={showPin ? 'text' : 'password'}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  if (error) setError('');
                }}
                placeholder="أدخل كلمة السر هنا..."
                autoFocus
                className="w-full p-3.5 pr-4 pl-10 rounded-2xl border-2 border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-center font-mono text-lg font-bold text-rose-900 bg-rose-50/50 transition-all outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rose-600 transition-colors"
              >
                {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {error && (
              <p className="text-xs font-bold text-red-600 animate-pulse pt-1 text-center">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-base rounded-2xl shadow-lg hover:shadow-xl transition-all transform active:scale-98 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>فتح الموقع ودخول الهدية ✨</span>
          </button>
        </form>

        {/* Romantic Hint callout */}
        <div className="pt-2 border-t border-rose-100 text-center space-y-1">
          <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>كلمة السر الافتراضية المطلوبة:</span>
            <span className="font-mono font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded dir-ltr inline-block">1232001</span>
          </p>
        </div>
      </div>
    </div>
  );
};
