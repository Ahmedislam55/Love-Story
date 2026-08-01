import React, { useState } from 'react';
import { Heart, Calendar, MapPin, Music, Search, Eye, Sparkles } from 'lucide-react';
import { formatArabicDate } from '../utils/dateUtils.js';

const CATEGORY_LABELS = {
  all: { label: 'كل الذكريات', icon: '✨' },
  first_meet: { label: 'أول لقاء', icon: '💘' },
  special_date: { label: 'مناسبات خاصة', icon: '🎉' },
  trip: { label: 'رحلات وسفريات', icon: '✈️' },
  milestone: { label: 'خطوات محورية', icon: '💍' },
  general: { label: 'أيام جميلة', icon: '🌸' },
};

export const TimelineSection = ({
  memories,
  onSelectMemory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sort memories chronologically (newest first or oldest first)
  const sortedMemories = [...memories].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const filteredMemories = sortedMemories.filter((mem) => {
    const matchesCat = selectedCategory === 'all' || mem.category === selectedCategory;
    const matchesQuery =
      mem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (mem.location && mem.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto dir-rtl space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>شريط ذكريات حبنا الخالدة</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-950">
          محطات وصور رسمت قصة عشقنا 📸
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          اضغطي على أي صورة لاسترجاع تفاصيل اليوم والأغنية والمكان المحفور في قلبي
        </p>
      </div>

      {/* Filter Bar & Controls */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-rose-100 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {Object.entries(CATEGORY_LABELS).map(([key, { label, icon }]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedCategory === key
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث في الذكريات..."
                className="w-full pr-9 pl-3 py-1.5 rounded-xl border border-rose-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-rose-400 bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Memory Timeline List */}
      {filteredMemories.length === 0 ? (
        <div className="text-center py-16 bg-white/60 rounded-3xl border border-rose-100 p-8 space-y-3">
          <Heart className="w-12 h-12 text-rose-300 mx-auto" />
          <h3 className="text-lg font-bold text-gray-700">لم يتم العثور على ذكريات تطابق هذا البحث</h3>
          <p className="text-xs text-gray-500">يمكنك استعراض بقية التصنيفات أو تغيير كلمة البحث</p>
        </div>
      ) : (
        <div className="relative border-r-2 border-rose-300/60 mr-4 sm:mr-8 pr-6 sm:pr-10 space-y-10">
          {filteredMemories.map((mem) => (
            <div key={mem.id} className="relative group">
              {/* Timeline Heart Dot */}
              <div className="absolute -right-[31px] sm:-right-[47px] top-6 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md border-2 border-white group-hover:scale-110 transition-transform">
                <Heart className="w-4 h-4 fill-white" />
              </div>

              {/* Memory Card */}
              <div className="bg-white rounded-3xl overflow-hidden border border-rose-100 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 grid grid-cols-1 md:grid-cols-12">
                {/* Photo Preview Column */}
                <div className="md:col-span-5 relative overflow-hidden bg-rose-950 min-h-[220px] group-hover:brightness-105">
                  <img
                    src={mem.imageUrl}
                    alt={mem.title}
                    className="w-full h-full object-cover min-h-[220px] max-h-[320px] group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  
                  {/* Category Tag Badge */}
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-rose-700 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                    {CATEGORY_LABELS[mem.category]?.icon} {CATEGORY_LABELS[mem.category]?.label || 'ذكرى'}
                  </span>

                  {/* Quick View Button */}
                  <button
                    onClick={() => onSelectMemory(mem)}
                    className="absolute bottom-3 right-3 bg-rose-600/90 text-white hover:bg-rose-600 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 backdrop-blur-xs transition-colors shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>عرض الصورة الكاملة</span>
                  </button>
                </div>

                {/* Content Details Column */}
                <div className="md:col-span-7 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-rose-600 font-semibold">
                      <span className="flex items-center gap-1 bg-rose-50 px-3 py-1 rounded-full">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatArabicDate(mem.date)}
                      </span>
                      {mem.location && (
                        <span className="flex items-center gap-1 text-gray-500">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          {mem.location}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-rose-950 pt-1">
                      {mem.title}
                    </h3>

                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                      {mem.description}
                    </p>
                  </div>

                  {/* Song or Memory Footer */}
                  <div className="pt-3 border-t border-rose-100 flex items-center justify-between text-xs">
                    {mem.songTitle ? (
                      <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl font-medium">
                        <Music className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
                        <span>أغنية اليوم: {mem.songTitle}</span>
                      </div>
                    ) : (
                      <span className="text-rose-400 italic font-serif">ذكرى لا تُنسى ❤️</span>
                    )}

                    <button
                      onClick={() => onSelectMemory(mem)}
                      className="text-rose-600 font-bold hover:underline"
                    >
                      تفاصيل أكثر ←
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
