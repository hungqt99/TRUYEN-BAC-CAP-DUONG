import React, { useState } from 'react';
import { StoryScene } from '../types/story';
import { soundFx } from '../utils/audioSynthesis';
import { Maximize2, Minimize2, Sparkles, Volume2, Heart } from 'lucide-react';

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
  activeWordIndex,
  isSpeaking,
  isFullscreen,
  onToggleFullscreen,
  onQuickPlay,
}) => {
  const [clickedEffect, setClickedEffect] = useState<{ x: number; y: number; text: string } | null>(null);

  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const praises = ['🌸 Bé ngoan', '⭐ Giỏi quá', '❤️ Yêu bác cấp dưỡng', '🥕 Rau tươi ngon', '🥣 Canh ngọt'];
    const randomPraise = praises[Math.floor(Math.random() * praises.length)];

    setClickedEffect({ x, y, text: randomPraise });
    setTimeout(() => {
      setClickedEffect(null);
    }, 1200);
  };

  // Determine dynamic camera movement CSS class based on scene script
  const getCameraMotionClass = () => {
    switch (scene.cameraMotion) {
      case 'zoom-in':
        return 'scale-105 transition-transform duration-[12000ms] ease-out';
      case 'focus-detail':
        return 'scale-115 translate-y-[-4%] transition-transform duration-[12000ms] ease-out';
      case 'pan-horizontal':
        return 'scale-105 translate-x-[-2%] transition-transform duration-[14000ms] ease-out';
      case 'gentle-push':
        return 'scale-108 transition-transform duration-[15000ms] ease-out';
      case 'celebrate':
        return 'scale-102 transition-transform duration-[8000ms] ease-in-out';
      case 'steady-glow':
      default:
        return 'scale-103 transition-transform duration-[10000ms] ease-linear';
    }
  };

  return (
    <div
      onClick={handleStageClick}
      className={`relative w-full overflow-hidden rounded-3xl bg-amber-50/40 shadow-xl border-4 border-amber-200/70 select-none group cursor-pointer transition-all ${
        isFullscreen ? 'h-screen w-screen rounded-none border-none shadow-none' : 'aspect-[16/9] max-h-[68vh]'
      }`}
    >
      {/* Background Story Image & Synchronized Gate Sign */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`relative w-full h-full ${getCameraMotionClass()}`}>
          <img
            key={scene.id}
            src={scene.imagePath}
            alt={scene.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />

          {/* Scene 1: Authentic Gate Signboard Replacement - TRƯỜNG MẦM NON AN ĐÔNG */}
          {scene.id === 1 && (
            <>
              {/* Main Arch Board */}
              <div
                className="absolute z-10 pointer-events-none flex items-center justify-center text-center select-none"
                style={{
                  top: '14.2%',
                  left: '32%',
                  width: '36%',
                  height: '11.8%',
                }}
              >
                <div className="w-full h-full bg-[#FFFBF0] border-[2px] sm:border-[3px] border-amber-400 rounded-lg sm:rounded-2xl shadow-md flex items-center justify-center px-1.5 py-0.5 relative overflow-hidden">
                  <span className="absolute top-0.5 left-1 text-[8px] sm:text-xs">🌸</span>
                  <span className="absolute top-0.5 right-1 text-[8px] sm:text-xs">🌼</span>
                  <span className="absolute bottom-0.5 left-1 text-[8px] sm:text-xs">🍀</span>
                  <span className="absolute bottom-0.5 right-1 text-[8px] sm:text-xs">🌸</span>

                  <h1 className="font-extrabold text-[#D92D20] text-[10px] sm:text-base md:text-xl lg:text-2xl tracking-wider font-['Quicksand'] uppercase drop-shadow-xs whitespace-nowrap">
                    TRƯỜNG MẦM NON AN ĐÔNG
                  </h1>
                </div>
              </div>

              {/* Sub-sign below arch: XIN CHÀO! */}
              <div
                className="absolute z-10 pointer-events-none flex items-center justify-center text-center select-none"
                style={{
                  top: '29.2%',
                  left: '43.3%',
                  width: '13.8%',
                  height: '7.8%',
                }}
              >
                <div className="w-full h-full bg-[#E8F5E9] border-[1.5px] sm:border-2 border-emerald-500 rounded-md sm:rounded-lg shadow-xs flex items-center justify-center px-1">
                  <span className="font-extrabold text-emerald-800 text-[8px] sm:text-xs md:text-sm tracking-wide uppercase whitespace-nowrap">
                    XIN CHÀO!
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Soft Vignette and Lighting Scrim for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-900/25 pointer-events-none" />
      </div>

      {/* Animated Preschool Overlays (Tailored to Scene) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Scene 1 & 10: Floating Petals and Sunlight Rays */}
        {(scene.id === 1 || scene.id === 7 || scene.id === 10) && (
          <>
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute top-1/4 left-1/5 text-pink-300/80 animate-float-slow text-2xl">🌸</div>
            <div className="absolute top-1/3 right-1/4 text-amber-200/80 animate-float-slow text-xl delay-700">✨</div>
            <div className="absolute bottom-1/3 left-1/3 text-pink-400/70 animate-float-slow text-lg delay-1000">🌺</div>
          </>
        )}

        {/* Scene 2, 3, 5: Gentle Kitchen Steam & Cozy Glow */}
        {(scene.id === 2 || scene.id === 3 || scene.id === 5) && (
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-4">
            <span className="w-4 h-12 rounded-full bg-white/40 blur-sm animate-steam" />
            <span className="w-5 h-14 rounded-full bg-white/35 blur-sm animate-steam delay-300" />
            <span className="w-3 h-10 rounded-full bg-white/50 blur-sm animate-steam delay-700" />
          </div>
        )}

        {/* Scene 4: Fresh Produce Sparkles */}
        {scene.id === 4 && (
          <div className="absolute top-16 right-16 flex items-center gap-2 bg-emerald-900/60 backdrop-blur-md px-4 py-2 rounded-full text-emerald-100 border border-emerald-400/40 text-sm font-bold shadow-lg">
            <span>🥦 Rau củ tươi ngon sạch sẽ</span>
          </div>
        )}

        {/* Scene 6: Delicious Warm Meal Label */}
        {scene.id === 6 && (
          <div className="absolute top-6 left-6 flex items-center gap-2 bg-amber-900/60 backdrop-blur-md px-4 py-2 rounded-full text-amber-100 border border-amber-300/40 text-sm font-bold shadow-lg">
            <span>🍚 Cơm dẻo canh ngọt thơm ngon</span>
          </div>
        )}

        {/* Scene 10: Special Message Banner */}
        {scene.id === 10 && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center animate-bounce duration-1000">
            <div className="inline-block bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 text-white font-extrabold text-base md:text-2xl px-6 py-2.5 rounded-full shadow-2xl border-2 border-white/80 tracking-wider">
              ❤️ BÉ NGOAN – BIẾT YÊU THƯƠNG – BIẾT ƠN ❤️
            </div>
          </div>
        )}
      </div>

      {/* Interactive Click Ripple/Praise Effect */}
      {clickedEffect && (
        <div
          style={{ left: clickedEffect.x, top: clickedEffect.y }}
          className="absolute z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none transform animate-ping flex items-center gap-1.5 bg-amber-400 text-amber-950 font-bold px-3 py-1.5 rounded-full shadow-lg text-sm"
        >
          <Sparkles className="w-4 h-4 text-amber-900" />
          <span>{clickedEffect.text}</span>
        </div>
      )}

      {/* Top Bar on Stage: Scene Number & School Context & Projector Mode Button */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-900/75 backdrop-blur-md border border-white/20 text-white px-3.5 py-1.5 rounded-full shadow-md text-xs md:text-sm font-bold tracking-wide">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span>{scene.title}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 bg-rose-950/70 backdrop-blur-md border border-rose-300/30 text-rose-100 px-3 py-1.5 rounded-full shadow-sm text-xs font-semibold">
            <span>Trường MN An Đông · TP. Huế</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Voice Audio Trigger */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickPlay();
            }}
            title={isSpeaking ? 'Đang đọc lời cô' : 'Bấm để nghe cô đọc'}
            className={`p-2.5 rounded-full backdrop-blur-md border transition-all text-white shadow-lg ${
              isSpeaking
                ? 'bg-rose-500 border-rose-300 animate-pulse'
                : 'bg-slate-900/60 hover:bg-slate-900/90 border-white/20 hover:scale-105'
            }`}
          >
            <Volume2 className="w-4 h-4 text-white" />
          </button>

          {/* Fullscreen / Projector Mode */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFullscreen();
            }}
            title={isFullscreen ? 'Thu nhỏ' : 'Chế độ máy chiếu mầm non (Toàn màn hình)'}
            className="p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 backdrop-blur-md border border-white/20 text-white transition-all shadow-lg hover:scale-105"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Bottom Subtitle / Narration Banner with High Legibility */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-auto">
        <div className="bg-slate-900/85 backdrop-blur-lg border border-white/20 rounded-2xl p-3.5 md:p-5 shadow-2xl transition-all">
          <div className="flex items-start gap-3">
            <div className="hidden sm:flex shrink-0 w-9 h-9 rounded-xl bg-amber-400 text-slate-900 font-bold items-center justify-center text-xs shadow-md">
              {scene.id}
            </div>

            <div className="flex-1">
              <p className="text-white text-base sm:text-lg md:text-2xl font-semibold leading-relaxed drop-shadow-sm tracking-wide font-['Quicksand']">
                {scene.narrationText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
