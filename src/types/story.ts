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
}
