import React, { useState } from 'react';
import { STORY_TITLE, STORY_MESSAGE } from '../data/storyData';
import { gratitudeImg, gratitudeBase64 } from '../assets/storyImages';
import { soundFx } from '../utils/audioSynthesis';
import { RotateCcw, Heart, Sparkles, Award, MessageCircleQuestion } from 'lucide-react';

interface EndScreenProps {
  onRestartStory: () => void;
  onGoToQuiz: () => void;
}

export const EndScreen: React.FC<EndScreenProps> = ({ onRestartStory, onGoToQuiz }) => {
  const [endImgSrc, setEndImgSrc] = useState<string>(gratitudeImg);

  const handleRestart = () => {
    onRestartStory();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 text-center overflow-hidden">
      {/* Floating Confetti / Petals */}
      <div className="absolute top-10 left-10 text-4xl animate-float-slow">🌸</div>
      <div className="absolute top-16 right-16 text-3xl animate-float-slow delay-300">⭐</div>
      <div className="absolute bottom-16 left-16 text-3xl animate-float-slow delay-700">🌺</div>
      <div className="absolute bottom-12 right-12 text-4xl animate-float-slow delay-1000">🎉</div>

      {/* Main Celebration Box */}
      <div className="relative z-10 max-w-3xl w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-amber-300 text-center animate-fade-in">
        {/* Award Badge */}
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-rose-400 text-white flex items-center justify-center mx-auto mb-4 shadow-xl">
          <Award className="w-9 h-9" />
        </div>

        <div className="inline-block px-4 py-1.5 rounded-full bg-rose-100 border border-rose-300 text-rose-800 font-extrabold text-xs sm:text-sm mb-3">
          TRƯỜNG MẦM NON AN ĐÔNG – THÀNH PHỐ HUẾ
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-2 font-['Quicksand']">
          Chúc Mừng Các Bé Yêu Trường Mầm Non An Đông!
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mb-4 font-medium">
          Các con vừa hoàn thành câu chuyện đầy ý nghĩa: <span className="font-bold text-amber-700">{STORY_TITLE}</span>
        </p>

        {/* The Big Educational Highlight */}
        <div className="my-5 p-4 sm:p-6 bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 rounded-2xl border-2 border-rose-300 shadow-sm">
          <div className="text-xs uppercase tracking-wider font-extrabold text-rose-500 mb-1">
            Thông điệp ý nghĩa
          </div>
          <div className="text-xl sm:text-3xl font-extrabold text-rose-700 tracking-wide font-['Quicksand']">
            {STORY_MESSAGE}
          </div>
          <p className="text-xs sm:text-sm text-slate-700 mt-2 font-medium">
            Mỗi ngày đến trường, các con hãy nhớ khoanh tay lễ phép chào bác cấp dưỡng, ăn ngoan hết suất và không làm rơi vãi nhé!
          </p>
        </div>

        {/* Character Image */}
        <div className="my-6 rounded-2xl overflow-hidden border-2 border-amber-200 aspect-[16/9] max-h-64 mx-auto shadow-md">
          <img
            src={endImgSrc}
            alt="Bác cấp dưỡng và bé Mai vẫy tay chào tạm biệt"
            loading="eager"
            decoding="async"
            onError={() => {
              if (endImgSrc === gratitudeImg) {
                setEndImgSrc('/images/gratitude.webp');
              } else if (endImgSrc === '/images/gratitude.webp') {
                setEndImgSrc('/images/gratitude.jpg');
              } else {
                setEndImgSrc(gratitudeBase64);
              }
            }}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Action Buttons: KỂ LẠI CÂU CHUYỆN */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-6">
          <button
            onClick={handleRestart}
            className="w-full sm:w-auto px-8 py-4 rounded-3xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-extrabold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>KỂ LẠI CÂU CHUYỆN</span>
          </button>

          <button
            onClick={onGoToQuiz}
            className="w-full sm:w-auto px-6 py-3.5 rounded-3xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-sm border border-amber-300 shadow-sm transition-all hover:scale-102 flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircleQuestion className="w-4 h-4 text-amber-700" />
            <span>Ôn Lại Câu Hỏi Đàm Thoại</span>
          </button>
        </div>
      </div>
    </div>
  );
};
