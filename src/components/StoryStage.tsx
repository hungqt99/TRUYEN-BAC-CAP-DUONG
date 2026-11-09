import React from 'react';
import { StoryScene } from '../types/story';
import { Maximize2, Minimize2, Volume2 } from 'lucide-react';

interface StoryStageProps {
  scene: StoryScene;
  activeWordIndex: number;
  isSpeaking: boolean;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onQuickPlay: () => void;
}

export const StoryStage: React.FC<StoryStageProps> = ({
  scene,
  isSpeaking,
  isFullscreen,
  onToggleFullscreen,
  onQuickPlay,
}) => {
  return (
    <div
      className={`w-full flex flex-col items-center select-none transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between p-3 sm:p-5'
          : 'max-w-5xl mx-auto'
      }`}
    >
      {/* Top Header Bar for the Stage */}
      <div className="w-full flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-slate-900 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span>{scene.title}</span>
          </span>

          <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200">
            Trường Mầm Non An Đông – TP. Huế
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Audio Play Button */}
          <button
            onClick={onQuickPlay}
            title={isSpeaking ? 'Tạm dừng giọng đọc' : 'Phát giọng đọc kể chuyện'}
            className={`px-3.5 py-1.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
              isSpeaking
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-white hover:bg-amber-100 text-slate-700 border border-slate-300'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span className="hidden xs:inline">{isSpeaking ? 'Đang đọc...' : 'Nghe cô đọc'}</span>
          </button>

          {/* Fullscreen Projector Toggle */}
          <button
            onClick={onToggleFullscreen}
            title={isFullscreen ? 'Thu nhỏ' : 'Chế độ máy chiếu mầm non (Toàn màn hình)'}
            className="p-2 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-sm transition-all cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Image Frame - 100% Full Uncropped Original Artwork */}
      <div
        className={`relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl border-2 sm:border-4 border-amber-200/90 bg-amber-50/30 flex items-center justify-center transition-all ${
          isFullscreen
            ? 'flex-1 max-h-[82vh] w-auto aspect-[16/9] mx-auto'
            : 'aspect-[16/9]'
        }`}
      >
        <img
          key={scene.id}
          src={scene.imagePath}
          alt={scene.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain object-center transition-opacity duration-500"
        />

        {/* Fullscreen Subtitle Overlay (Only visible in Fullscreen Mode) */}
        {isFullscreen && (
          <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
            <div className="bg-slate-950/85 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3.5 text-center shadow-2xl max-w-4xl mx-auto">
              <p className="text-white text-base sm:text-xl md:text-2xl font-bold leading-relaxed font-['Quicksand'] drop-shadow-md">
                {scene.narrationText}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Normal Mode: Clean Unobstructed Story Subtitle Card Below the Artwork */}
      {!isFullscreen && (
        <div className="w-full mt-3 bg-white/95 backdrop-blur-md border-2 border-amber-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-md">
          <div className="flex items-start gap-3.5">
            <span className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-400 text-slate-900 font-extrabold flex items-center justify-center text-sm sm:text-base shadow-xs">
              {scene.id}
            </span>
            <div className="flex-1">
              <p className="text-slate-800 text-base sm:text-lg md:text-xl font-bold leading-relaxed tracking-wide font-['Quicksand']">
                {scene.narrationText}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
