export interface StoryScene {
  id: number;
  title: string;
  durationSeconds: number;
  narrationText: string;
  imagePath: string;
  cameraMotion: 'zoom-in' | 'pan-horizontal' | 'gentle-push' | 'steady-glow' | 'focus-detail' | 'celebrate';
  visualDescription: string;
  motionDescription: string;
  characterFocus: string;
  interactiveTips?: string[];
  speechRatePercent: string; // e.g. "-8%", "-10%", "-4%", "-12%"
  speechRateMultiplier: number; // e.g. 0.92, 0.90, 0.98, 0.88
  speechPitch: string; // e.g. "+1Hz", "+0.5Hz", "+1.5Hz"
  speechCategory: string; // "Mở đầu, giới thiệu" | "Kể chuyện" | "Miêu tả nhân vật" | "Đoạn cảm động, ý nghĩa" | "Đoạn kết, giáo dục"
  holdAfterSeconds: number; // Duration to hold the slide after narration ends (1-2s)
  audioSrc?: string; // Direct audio file from the reference recording
}

export interface QuizQuestion {
  id: number;
  numberText: string;
  question: string;
  hint: string;
  options: {
    text: string;
    isCorrect: boolean;
    icon: string;
  }[];
  explanation: string;
}

export interface VoiceSettings {
  selectedVoiceURI: string;
  rate: number;
  pitch: number;
  volume: number;
  bgMusicEnabled: boolean;
  bgMusicVolume: number;
  autoPlayNext: boolean;
  useSystemVoice?: boolean;
  duckingEnabled?: boolean;
  playReferenceAudio?: boolean;
}
