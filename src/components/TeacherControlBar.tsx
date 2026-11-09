import React, { useState } from 'react';
import { VoiceOption } from '../utils/speechHelper';
import { VoiceSettings } from '../types/story';
import {
  Play,
  Pause,
  RotateCcw,
  Square,
  ChevronLeft,
  ChevronRight,
  Settings,
  Music,
  Gauge,
  Sliders,
  Check,
  AlertCircle
} from 'lucide-react';

interface TeacherControlBarProps {
  currentSceneId: number;
  totalScenes: number;
  currentSceneCategory?: string;
  currentSceneRate?: number;
  isSpeaking: boolean;
  isPaused: boolean;
  isPlayingReference?: boolean;
  hasVietnameseVoice: boolean;
  voices: VoiceOption[];
  voiceSettings: VoiceSettings;
  onUpdateSettings: (settings: Partial<VoiceSettings>) => void;
  onPlaySpeech: () => void;
  onPauseSpeech: () => void;
  onResumeSpeech: () => void;
  onReplaySpeech: () => void;
  onStopSpeech: () => void;
  onPrevScene: () => void;
  onNextScene: () => void;
  onSelectScene: (id: number) => void;
  onPlayReferenceAudio?: () => void;
}

export const TeacherControlBar: React.FC<TeacherControlBarProps> = ({
  currentSceneId,
  totalScenes,
  currentSceneCategory = 'Kể chuyện',
  currentSceneRate = 0.92,
  isSpeaking,
  isPaused,
  isPlayingReference = false,
  hasVietnameseVoice,
  voices,
  voiceSettings,
  onUpdateSettings,
  onPlaySpeech,
  onPauseSpeech,
  onResumeSpeech,
  onReplaySpeech,
  onStopSpeech,
  onPrevScene,
  onNextScene,
  onSelectScene,
  onPlayReferenceAudio,
}) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto mt-4 px-2 select-none">
      {/* 10 Scene Progression Step Indicator */}
      <div className="bg-white/90 backdrop-blur-md border border-amber-200/90 rounded-2xl p-2.5 mb-3 shadow-md">
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {Array.from({ length: totalScenes }).map((_, index) => {
            const sceneNum = index + 1;
            const isCurrent = sceneNum === currentSceneId;
            const isPassed = sceneNum < currentSceneId;

            let badgeStyle = "bg-amber-50 text-slate-500 border border-amber-200/60 hover:bg-amber-100";
            if (isCurrent) {
              badgeStyle = "bg-rose-500 text-white font-extrabold shadow-md ring-2 ring-rose-300 scale-105";
            } else if (isPassed) {
              badgeStyle = "bg-amber-200/70 text-amber-900 font-bold border border-amber-300";
            }

            return (
              <button
                key={sceneNum}
                onClick={() => onSelectScene(sceneNum)}
                className={`shrink-0 px-2.5 py-1.5 rounded-xl text-xs md:text-sm transition-all flex items-center gap-1.5 cursor-pointer ${badgeStyle}`}
              >
                <span>Cảnh {sceneNum}</span>
                {isPassed && <Check className="w-3 h-3 text-amber-800" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Toolbar */}
      <div className="bg-white/95 backdrop-blur-lg border border-amber-200 rounded-3xl p-3 sm:p-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
        {/* Left: Previous Scene Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevScene}
            disabled={currentSceneId === 1}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-amber-100 text-slate-700 font-bold text-xs sm:text-sm border border-slate-200 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Cảnh trước</span>
          </button>

          <span className="text-xs sm:text-sm font-bold text-slate-700 px-2">
            {currentSceneId} / {totalScenes}
          </span>

          <button
            onClick={onNextScene}
            disabled={currentSceneId === totalScenes}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-amber-100 text-slate-700 font-bold text-xs sm:text-sm border border-slate-200 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm"
          >
            <span className="hidden sm:inline">Cảnh sau</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Center: The Required Core Audio Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {/* 1. NGHE LỜI CÔ */}
          {!isSpeaking || isPaused ? (
            <button
              onClick={isPaused ? onResumeSpeech : onPlaySpeech}
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isPaused ? 'TIẾP TỤC' : 'NGHE LỜI CÔ'}</span>
            </button>
          ) : (
            /* 2. TẠM DỪNG */
            <button
              onClick={onPauseSpeech}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
            >
              <Pause className="w-4 h-4 fill-white" />
              <span>TẠM DỪNG</span>
            </button>
          )}

          {/* 3. ĐỌC LẠI */}
          <button
            onClick={onReplaySpeech}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm border border-slate-300 shadow-sm transition-all hover:scale-102"
          >
            <RotateCcw className="w-4 h-4 text-slate-600" />
            <span>ĐỌC LẠI</span>
          </button>

          {/* 4. DỪNG */}
          <button
            onClick={onStopSpeech}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-2xl bg-white hover:bg-rose-50 text-rose-600 font-bold text-xs sm:text-sm border border-rose-200 shadow-sm transition-all hover:scale-102"
          >
            <Square className="w-4 h-4 fill-rose-600" />
            <span>DỪNG</span>
          </button>
        </div>

        {/* Right: Teacher Playback Mode & Settings */}
        <div className="flex items-center gap-2">
          {/* Auto Advance Toggle */}
          <button
            onClick={() => onUpdateSettings({ autoPlayNext: !voiceSettings.autoPlayNext })}
            title={voiceSettings.autoPlayNext ? 'Đang bật tự động chuyển cảnh' : 'Chế độ giáo viên tự chuyển cảnh'}
            className={`px-3 py-2 rounded-2xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              voiceSettings.autoPlayNext
                ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                : 'bg-slate-100 border-slate-300 text-slate-600'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${voiceSettings.autoPlayNext ? 'bg-emerald-500' : 'bg-slate-400'}`} />
            <span className="hidden md:inline">
              {voiceSettings.autoPlayNext ? 'Tự chuyển cảnh' : 'Cô điều khiển'}
            </span>
          </button>

          {/* Voice Settings Gear */}
          <button
            onClick={() => setShowSettingsModal(!showSettingsModal)}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-300 transition-all shadow-sm hover:scale-105"
            title="Cài đặt giọng đọc cô giáo & nhạc nền"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calibrated Storyteller Voice Status & Reference Audio Toolbar */}
      <div className="mt-2.5 bg-rose-50/90 border border-rose-200 text-rose-950 px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm flex flex-wrap items-center justify-between gap-2 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="font-bold text-rose-900">Giọng đọc đồng bộ:</span>
          <span className="px-2.5 py-0.5 rounded-lg bg-amber-100/90 border border-amber-300 text-amber-950 font-bold text-xs">
            {currentSceneCategory} ({currentSceneRate}x)
          </span>
          <span className="hidden lg:inline text-slate-700 text-xs">
            · Tự động giảm nhạc nền khi đọc (Ducking)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onPlayReferenceAudio && (
            <button
              onClick={onPlayReferenceAudio}
              title="Nghe file ghi âm mẫu gốc do bạn cung cấp (1 phút 01 giây)"
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
                isPlayingReference
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-white hover:bg-rose-100 text-rose-800 border border-rose-300'
              }`}
            >
              <span>{isPlayingReference ? '⏹ Đang phát file mẫu' : '🎧 Nghe Audio Mẫu Gốc (1:01)'}</span>
            </button>
          )}

          <span className="text-[11px] font-bold text-rose-700 bg-white border border-rose-200 px-2.5 py-0.5 rounded-full">
            Chuẩn Mầm Non An Đông
          </span>
        </div>
      </div>

      {/* Teacher Settings Drawer / Modal */}
      {showSettingsModal && (
        <div className="mt-3 bg-white/95 backdrop-blur-md border border-amber-200 rounded-3xl p-5 shadow-xl animate-fade-in text-slate-800">
          <div className="flex items-center justify-between border-b border-amber-100 pb-3 mb-4">
            <h4 className="font-extrabold text-base flex items-center gap-2 text-slate-800">
              <Sliders className="w-5 h-5 text-amber-600" />
              <span>Cài Đặt Giọng Đọc Cô Giáo & Nhạc Nền Mầm Non</span>
            </h4>
            <button
              onClick={() => setShowSettingsModal(false)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1 rounded-xl bg-slate-100"
            >
              Đóng
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Voice Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Nguồn Giọng Đọc Tiếng Việt
              </label>
              <select
                value={voiceSettings.useSystemVoice ? voiceSettings.selectedVoiceURI : 'vietnamese_audio_stream'}
                onChange={(e) => {
                  if (e.target.value === 'vietnamese_audio_stream') {
                    onUpdateSettings({ useSystemVoice: false, selectedVoiceURI: '' });
                  } else {
                    onUpdateSettings({ useSystemVoice: true, selectedVoiceURI: e.target.value });
                  }
                }}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium text-slate-700"
              >
                <option value="vietnamese_audio_stream">
                  ⭐ Giọng cô giáo nữ tiếng Việt chuẩn (Tự nhiên, truyền cảm - Khuyên dùng)
                </option>
                {voices.filter(v => v.isVietnamese).map((v) => (
                  <option key={v.voice.voiceURI} value={v.voice.voiceURI}>
                    {v.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                Ứng dụng tự động phát giọng đọc nữ tiếng Việt chuẩn, êm dịu, không lo thiết bị thiếu gói giọng.
              </p>
            </div>

            {/* Reading Speed Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5" />
                  <span>Tốc Độ Đọc (Chậm vừa phải cho trẻ)</span>
                </label>
                <span className="text-xs font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-lg">
                  {voiceSettings.rate}x
                </span>
              </div>
              <input
                type="range"
                min="0.65"
                max="1.15"
                step="0.05"
                value={voiceSettings.rate}
                onChange={(e) => onUpdateSettings({ rate: parseFloat(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Rất chậm</span>
                <span>Chuẩn mầm non (0.85x)</span>
                <span>Nhanh hơn</span>
              </div>
            </div>

            {/* Pitch Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Cao Độ Giọng (Pitch)
                </label>
                <span className="text-xs font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-lg">
                  {voiceSettings.pitch}
                </span>
              </div>
              <input
                type="range"
                min="0.8"
                max="1.3"
                step="0.05"
                value={voiceSettings.pitch}
                onChange={(e) => onUpdateSettings({ pitch: parseFloat(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Background Lullaby Music */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-amber-600" />
                  <span>Nhạc Nền Ru Êm Dịu (Lullaby Chime)</span>
                </label>
                <button
                  onClick={() => onUpdateSettings({ bgMusicEnabled: !voiceSettings.bgMusicEnabled })}
                  className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all ${
                    voiceSettings.bgMusicEnabled
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {voiceSettings.bgMusicEnabled ? 'Đang bật' : 'Đang tắt'}
                </button>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.2"
                step="0.01"
                disabled={!voiceSettings.bgMusicEnabled}
                value={voiceSettings.bgMusicVolume}
                onChange={(e) => onUpdateSettings({ bgMusicVolume: parseFloat(e.target.value) })}
                className="w-full accent-emerald-500 cursor-pointer disabled:opacity-30"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Giai điệu ngũ cung thư thái giúp trẻ tập trung nghe kể chuyện.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
