import React from 'react';
import { CHARACTERS_INFO } from '../data/storyData';
import { Users, X, Heart, Sparkles, CheckCircle } from 'lucide-react';

interface CharacterGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CharacterGuideModal: React.FC<CharacterGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border-2 border-amber-200 animate-fade-in relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5 border-b border-amber-100 pb-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Nhân Vật Hoạt Hình 2D Đồng Nhất
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Đặc điểm tạo hình chuẩn mầm non xuyên suốt cả 10 cảnh truyện
            </p>
          </div>
        </div>

        {/* Characters List */}
        <div className="space-y-4">
          {CHARACTERS_INFO.map((char, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 hover:bg-amber-50 transition-all flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-rose-500 text-white text-xs font-extrabold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="font-extrabold text-base text-slate-800">
                    {char.name}
                  </h4>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-amber-200 text-amber-800">
                  {char.role}
                </span>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-9">
                <p className="mb-1">
                  <strong className="text-slate-800">Ngoại hình đồng nhất:</strong> {char.appearance}
                </p>
                <p className="text-rose-700 font-medium flex items-center gap-1.5 mt-1">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 shrink-0" />
                  <span>{char.moral}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Art Style Note */}
        <div className="mt-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-start gap-2.5">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Phong cách đồ họa:</span> Hoạt hình 2D thiếu nhi Việt Nam, gam màu pastel ấm áp, đường nét sạch sẽ, tỷ lệ khung hình 16:9 chuẩn giáo dục mầm non.
          </div>
        </div>

        <div className="mt-5 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all"
          >
            Đã Hiểu & Tiếp Tục
          </button>
        </div>
      </div>
    </div>
  );
};
