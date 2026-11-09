import React, { useState } from 'react';
import { STORY_TITLE, STORY_SUBTITLE, STORY_MESSAGE } from '../data/storyData';
import { portraitImg, portraitBase64 } from '../assets/storyImages';
import { soundFx } from '../utils/audioSynthesis';
import { Play, Sparkles, BookOpen, Users, Volume2 } from 'lucide-react';

interface StartScreenProps {
  onStartStory: () => void;
  onOpenCharacterGuide: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStartStory, onOpenCharacterGuide }) => {
  const [heroSrc, setHeroSrc] = useState<string>(portraitImg);

  const handleStart = () => {
    onStartStory();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 text-center overflow-hidden">
      {/* Gentle Floating Light & Flower Embellishments */}
      <div className="absolute top-10 left-12 w-64 h-64 bg-amber-300/30 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-10 right-12 w-72 h-72 bg-rose-300/25 rounded-full blur-3xl animate-pulse-glow pointer-events-none delay-1000" />

      {/* Decorative Floral Badges */}
      <div className="absolute top-8 left-8 text-3xl animate-float-slow select-none opacity-80">🌸</div>
      <div className="absolute top-12 right-12 text-3xl animate-float-slow select-none opacity-80 delay-500">✨</div>
      <div className="absolute bottom-16 left-16 text-3xl animate-float-slow select-none opacity-80 delay-700">🌺</div>
      <div className="absolute bottom-12 right-16 text-3xl animate-float-slow select-none opacity-80 delay-1000">🌼</div>

      {/* Centerpiece Hero Card */}
      <div className="relative z-10 max-w-3xl w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-amber-200/90 text-center">
        {/* School Name Kicker */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white font-extrabold text-xs sm:text-sm mb-4 shadow-md border border-white/50 tracking-wide font-['Quicksand']">
          <BookOpen className="w-4 h-4 text-white" />
          <span>TRƯỜNG MẦM NON AN ĐÔNG – THÀNH PHỐ HUẾ</span>
        </div>

        {/* Big Preschool Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-3 drop-shadow-sm font-['Quicksand']">
          {STORY_TITLE}
        </h1>

        {/* Core Educational Message */}
        <div className="my-3 py-2 px-5 inline-block rounded-2xl bg-rose-50 border border-rose-200">
          <p className="text-sm sm:text-base md:text-lg font-bold text-rose-600 tracking-wide">
            {STORY_MESSAGE}
          </p>
        </div>

        {/* Character Illustration Preview Container */}
        <div className="my-6 relative rounded-2xl overflow-hidden border-2 border-amber-200/80 shadow-inner aspect-[16/9] max-h-72 mx-auto">
          <img
            src={heroSrc}
            alt="Bác Cấp Dưỡng và các bạn nhỏ mầm non"
            loading="eager"
            decoding="async"
            onError={() => {
              if (heroSrc === portraitImg) {
                setHeroSrc('/images/portrait.webp');
              } else if (heroSrc === '/images/portrait.webp') {
                setHeroSrc('/images/portrait.jpg');
              } else {
                setHeroSrc(portraitBase64);
              }
            }}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex items-end justify-center p-4">
            <span className="text-white text-xs sm:text-sm font-bold bg-slate-900/60 px-4 py-1.5 rounded-full backdrop-blur-md">
              Bác cấp dưỡng hiền hậu & Bé Mai mầm non 5 tuổi
            </span>
          </div>
        </div>

        {/* Main CTA Button: BẮT ĐẦU CÂU CHUYỆN */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-6">
          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-4 rounded-3xl bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500 hover:from-rose-600 hover:to-amber-600 text-white font-extrabold text-lg sm:text-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 ring-4 ring-amber-300/60 cursor-pointer"
          >
            <Play className="w-6 h-6 fill-white" />
            <span>BẮT ĐẦU CÂU CHUYỆN</span>
          </button>

          <button
            onClick={onOpenCharacterGuide}
            className="w-full sm:w-auto px-5 py-3.5 rounded-3xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-sm border border-amber-300 shadow-sm transition-all hover:scale-102 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Users className="w-4 h-4 text-amber-700" />
            <span>Xem Giới Thiệu Nhân Vật</span>
          </button>
        </div>

        {/* Feature Badges */}
        <div className="mt-7 pt-5 border-t border-amber-100 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1.5 text-rose-700 font-bold">
            <Volume2 className="w-4 h-4 text-rose-600" />
            Giọng cô giáo ấm áp đồng bộ theo audio mẫu
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Tốc độ linh hoạt từng slide (0.88x - 0.98x)
          </span>
          <span>·</span>
          <span>Nhạc nền tự giảm khi đọc</span>
          <span>·</span>
          <span>10 cảnh 2D nguyên bản</span>
        </div>
      </div>
    </div>
  );
};
