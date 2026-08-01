import React, { useState } from 'react';
import { X, Share2, Copy, Check, Heart, Sparkles, Send, Eye, Lock, ShieldCheck } from 'lucide-react';
import { encodeAppDataToUrl } from '../utils/urlSharing.js';

export const ShareModal = ({ isOpen, onClose, appData }) => {
  const [copiedDataLink, setCopiedDataLink] = useState(false);
  const [copiedCleanLink, setCopiedCleanLink] = useState(false);
  const [customText, setCustomText] = useState(
    `إهداء خاص لحبيبتي ❤️: ${appData.profile.heroQuote}`
  );

  if (!isOpen) return null;

  // Build the full shareable gift link containing all memories & settings
  const fullGiftUrl = encodeAppDataToUrl(appData, true);
  const cleanUrl = window.location.origin + window.location.pathname;

  const handleCopyGiftLink = () => {
    navigator.clipboard.writeText(fullGiftUrl);
    setCopiedDataLink(true);
    setTimeout(() => setCopiedDataLink(false), 3000);
  };

  const handleCopyCleanLink = () => {
    navigator.clipboard.writeText(cleanUrl);
    setCopiedCleanLink(true);
    setTimeout(() => setCopiedCleanLink(false), 3000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `${customText}\n\nشاهدي هدية حبنا الجميلة المحفوظة لكِ من هنا:\n${fullGiftUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 dir-rtl animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="text-center space-y-1.5 pt-1">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <Share2 className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-rose-950">مشاركة هدية الحب 🎁❤️</h3>
          <p className="text-xs text-gray-500">
            نسخ رابط الهدية لإرسالها بالكامل مع جميع الذكريات والصور والموسيقى
          </p>
        </div>

        {/* Info Callout Box explaining read-only viewer mode */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-xs text-emerald-950 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>حماية البيانات وضمان العرض بدون تعديل ✨</span>
          </div>
          <p className="text-[11px] text-emerald-900 leading-relaxed">
            عند نسخ رابط الهدية وإرساله لأي شخص، سيتم تضمين جميع ذكرياتك وأغنياتك ورسائلك المخصصة، وسيفتح لديهم في <strong className="text-emerald-950">وضع المشاهدة فقط (View Mode)</strong> بحيث يمكنهم الاستمتاع بقراءة الهدية وسماع الأغاني دون إمكانية تعديل أو حذف أي شيء!
          </p>
        </div>

        {/* Customizable Romantic Card Preview */}
        <div className="bg-gradient-to-br from-rose-500 via-pink-600 to-rose-700 p-5 rounded-2xl text-white shadow-md space-y-2.5 relative overflow-hidden">
          <Sparkles className="w-5 h-5 text-amber-300 absolute top-3 left-3" />
          <div className="flex items-center gap-2 text-xs font-bold text-rose-100">
            <Heart className="w-4 h-4 fill-white" />
            <span>رسالة الإهداء المصاحبة للرابط</span>
          </div>

          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            rows={2}
            className="w-full bg-white/20 backdrop-blur-md rounded-xl p-2.5 text-white text-xs focus:outline-hidden border border-white/30 resize-none leading-relaxed"
            placeholder="اكتب رسالة إهداء شخصية..."
          />

          <p className="text-[10px] text-rose-200 text-left">
            موقع {appData.profile.partnerOne} & {appData.profile.partnerTwo} ❤️
          </p>
        </div>

        {/* Direct Sharing Buttons */}
        <div className="space-y-2.5">
          {/* Main WhatsApp Share */}
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md text-sm"
          >
            <Send className="w-4 h-4" />
            <span>إرسال الهدية الكاملة عبر الواتساب (WhatsApp)</span>
          </button>

          {/* Copy Full Encoded Gift Link (RECOMMENDED) */}
          <button
            onClick={handleCopyGiftLink}
            className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md text-xs sm:text-sm"
          >
            {copiedDataLink ? (
              <>
                <Check className="w-4 h-4 text-amber-300" />
                <span className="text-amber-200">تم نسخ رابط الهدية الشامل بنجاح! 🎉</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-white" />
                <div className="text-right">
                  <span className="block font-bold">نسخ رابط الهدية الكامل (يتضمن ذكرياتك) 🎁</span>
                  <span className="block text-[10px] text-rose-100 font-normal">
                    يضمن إظهار كل تعديلاتك للطرف الآخر في وضع القراءة فقط
                  </span>
                </div>
              </>
            )}
          </button>

          {/* Copy Clean Base Link */}
          <button
            onClick={handleCopyCleanLink}
            className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all text-xs"
          >
            {copiedCleanLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">تم نسخ الرابط الرئيسي!</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-rose-600" />
                <span>نسخ رابط الموقع المباشر (بدون دمج البيانات)</span>
              </>
            )}
          </button>
        </div>

        {/* Password Reminder Callout */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-[11px] text-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold">
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span>كلمة سر فتح الموقع للطرف الآخر:</span>
          </div>
          <span className="font-mono font-bold text-rose-700 bg-amber-100 px-2 py-0.5 rounded text-xs dir-ltr">
            {appData.profile.adminPin || '1232001'}
          </span>
        </div>
      </div>
    </div>
  );
};
