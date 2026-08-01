import React from 'react';
import { X, Calendar, MapPin, Music } from 'lucide-react';
import { formatArabicDate } from '../utils/dateUtils.js';

export const PhotoLightbox = ({ memory, onClose }) => {
  if (!memory) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 dir-rtl animate-fadeIn">
      <div className="relative bg-white rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image Container */}
        <div className="relative bg-black flex-1 flex items-center justify-center min-h-[280px] max-h-[60vh]">
          <img
            src={memory.imageUrl}
            alt={memory.title}
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Memory Information Footer */}
        <div className="p-6 bg-white space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-100 pb-3">
            <h3 className="text-xl sm:text-2xl font-bold text-rose-950">{memory.title}</h3>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatArabicDate(memory.date)}</span>
            </div>
          </div>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {memory.description}
          </p>

          <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 pt-1">
            {memory.location && (
              <span className="flex items-center gap-1 text-rose-700">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>المكان: {memory.location}</span>
              </span>
            )}
            {memory.songTitle && (
              <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                <Music className="w-3.5 h-3.5 text-amber-500" />
                <span>أغنية الذكرى: {memory.songTitle}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
