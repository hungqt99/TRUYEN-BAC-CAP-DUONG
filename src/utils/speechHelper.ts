export interface VoiceOption {
  voice: SpeechSynthesisVoice;
  isVietnamese: boolean;
  isNorthernHint: boolean;
  label: string;
}

export class SpeechStoryteller {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private isSpeakingState = false;
  private isPausedState = false;
  private currentMode: 'audio' | 'speechSynthesis' = 'audio';
  private preloadedUrls = new Map<string, string>();
  private currentText = '';

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  // Pre-load audio for seamless instant playback with custom rate & pitch
  preloadText(text: string, rate = "-6%", pitch = "+1Hz") {
    if (typeof window === 'undefined') return;
    const cleanText = text.trim();
    const cacheKey = `${cleanText}_${rate}_${pitch}`;
    if (!cleanText || this.preloadedUrls.has(cacheKey)) return;

    const url = `/api/tts?text=${encodeURIComponent(cleanText)}`;
    this.preloadedUrls.set(cacheKey, url);

    // Pre-fetch in browser cache
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = url;
  }

  // Pre-fetch direct audio files into browser cache
  preloadAudioFiles(sources: string[]) {
    if (typeof window === 'undefined') return;
    sources.forEach((src) => {
      if (!src) return;
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = src;
    });
  }

  getAvailableVoices(): Promise<VoiceOption[]> {
    return new Promise((resolve) => {
      if (!this.synth) {
        resolve([]);
        return;
      }

      const updateVoices = () => {
        const voices = this.synth!.getVoices();
        const options: VoiceOption[] = voices.map((v) => {
          const isVi = v.lang.toLowerCase().startsWith('vi') || v.name.toLowerCase().includes('vietnam') || v.name.toLowerCase().includes('tiếng việt');
          const nameLower = v.name.toLowerCase();
          const isNorthern = nameLower.includes('linh') || nameLower.includes('north') || nameLower.includes('hà nội') || nameLower.includes('mai');
          
          let label = `${v.name} (${v.lang})`;
          if (isVi) {
            if (isNorthern) {
              label = `⭐ ${v.name} - Giọng Nữ Bắc gợi ý (${v.lang})`;
            } else {
              label = `🌸 ${v.name} - Tiếng Việt (${v.lang})`;
            }
          }

          return {
            voice: v,
            isVietnamese: isVi,
            isNorthernHint: isNorthern,
            label
          };
        });

        // Sort so Vietnamese voices appear at the top, Northern preferred
        options.sort((a, b) => {
          if (a.isVietnamese && !b.isVietnamese) return -1;
          if (!a.isVietnamese && b.isVietnamese) return 1;
          if (a.isNorthernHint && !b.isNorthernHint) return -1;
          if (!a.isNorthernHint && b.isNorthernHint) return 1;
          return a.voice.name.localeCompare(b.voice.name);
        });

        resolve(options);
      };

      const initialVoices = this.synth.getVoices();
      if (initialVoices.length > 0) {
        updateVoices();
      } else {
        this.synth.onvoiceschanged = () => {
          updateVoices();
        };
        setTimeout(updateVoices, 500);
      }
    });
  }

  // Primary method to speak pure Vietnamese
  speak(
    text: string,
    options: {
      audioSrc?: string;
      voiceURI?: string;
      rate?: number;
      ratePercent?: string;
      pitch?: number;
      pitchHz?: string;
      volume?: number;
      useSystemVoice?: boolean;
      onStart?: () => void;
      onEnd?: () => void;
      onPause?: () => void;
      onResume?: () => void;
      onError?: (err: unknown) => void;
      onWord?: (charIndex: number, charLength: number) => void;
    }
  ) {
    this.stop();
    this.currentText = text;

    // Check if user explicitly selected a local device voice
    if (options.useSystemVoice && this.synth) {
      const voices = this.synth.getVoices();
      const viVoice = options.voiceURI
        ? voices.find((v) => v.voiceURI === options.voiceURI && v.lang.startsWith('vi'))
        : voices.find((v) => v.lang.startsWith('vi'));

      // ONLY use Web Speech API if an actual Vietnamese voice exists on this device
      if (viVoice) {
        this.currentMode = 'speechSynthesis';
        this.speakWithSpeechSynthesis(text, viVoice, options);
        return;
      }
    }

    // 1. If direct authentic audio file exists from reference recording, play it directly!
    if (options.audioSrc && !options.useSystemVoice) {
      this.currentMode = 'audio';
      this.speakWithAudioFile(options.audioSrc, text, options);
      return;
    }

    // 2. High Quality Route: Natural Vietnamese Teacher Voice via /api/tts
    this.currentMode = 'audio';
    this.speakWithAudio(text, options);
  }

  private speakWithAudioFile(
    src: string,
    fallbackText: string,
    options: {
      rate?: number;
      volume?: number;
      onStart?: () => void;
      onEnd?: () => void;
      onPause?: () => void;
      onResume?: () => void;
      onError?: (err: unknown) => void;
      onWord?: (charIndex: number, charLength: number) => void;
    }
  ) {
    try {
      const audio = new Audio(src);
      audio.playbackRate = options.rate ?? 1.0;
      if ('preservesPitch' in audio) {
        (audio as unknown as { preservesPitch?: boolean }).preservesPitch = true;
      }
      audio.volume = options.volume ?? 1;

      audio.onplay = () => {
        this.isSpeakingState = true;
        this.isPausedState = false;
        options.onStart?.();
      };

      audio.onpause = () => {
        if (!audio.ended) {
          this.isPausedState = true;
          options.onPause?.();
        }
      };

      audio.onended = () => {
        this.isSpeakingState = false;
        this.isPausedState = false;
        this.audioElement = null;
        options.onEnd?.();
      };

      audio.onerror = (e) => {
        console.warn(`Audio file ${src} failed to load, falling back to TTS...`, e);
        this.speakWithAudio(fallbackText, options);
      };

      this.audioElement = audio;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Playback error or autoplay blocked, fallback to TTS:', err);
          this.speakWithAudio(fallbackText, options);
        });
      }
    } catch {
      this.speakWithAudio(fallbackText, options);
    }
  }

  // Play the actual provided reference sample audio directly
  playReferenceAudio(options: {
    volume?: number;
    onStart?: () => void;
    onEnd?: () => void;
    onPause?: () => void;
    onError?: (err: unknown) => void;
  }) {
    this.stop();
    this.currentMode = 'audio';
    try {
      const audio = new Audio('/audio/reference_story.m4a');
      audio.volume = options.volume ?? 1;

      audio.onplay = () => {
        this.isSpeakingState = true;
        this.isPausedState = false;
        options.onStart?.();
      };

      audio.onpause = () => {
        if (!audio.ended) {
          this.isPausedState = true;
          options.onPause?.();
        }
      };

      audio.onended = () => {
        this.isSpeakingState = false;
        this.isPausedState = false;
        this.audioElement = null;
        options.onEnd?.();
      };

      audio.onerror = (e) => {
        this.isSpeakingState = false;
        this.isPausedState = false;
        options.onError?.(e);
      };

      this.audioElement = audio;
      audio.play().catch((err) => {
        options.onError?.(err);
      });
    } catch (e) {
      options.onError?.(e);
    }
  }

  private speakWithAudio(
    text: string,
    options: {
      rate?: number;
      ratePercent?: string;
      pitch?: number;
      pitchHz?: string;
      volume?: number;
      onStart?: () => void;
      onEnd?: () => void;
      onPause?: () => void;
      onResume?: () => void;
      onError?: (err: unknown) => void;
      onWord?: (charIndex: number, charLength: number) => void;
    }
  ) {
    try {
      const url = `/api/tts?text=${encodeURIComponent(text.trim())}`;
      const audio = new Audio(url);
      audio.playbackRate = options.rate ?? 0.92;
      (audio as unknown as { preservesPitch?: boolean }).preservesPitch = true;
      audio.volume = options.volume ?? 1;

      audio.onplay = () => {
        this.isSpeakingState = true;
        this.isPausedState = false;
        options.onStart?.();
      };

      audio.onpause = () => {
        if (!audio.ended) {
          this.isPausedState = true;
          options.onPause?.();
        }
      };

      audio.onended = () => {
        this.isSpeakingState = false;
        this.isPausedState = false;
        this.audioElement = null;
        options.onEnd?.();
      };

      audio.onerror = (e) => {
        console.warn('Audio TTS failed, attempting fallback...', e);
        // Fallback to local speech synthesis if available
        if (this.synth) {
          const viVoice = this.synth.getVoices().find((v) => v.lang.startsWith('vi'));
          if (viVoice) {
            this.speakWithSpeechSynthesis(text, viVoice, options);
            return;
          }
        }
        this.isSpeakingState = false;
        this.isPausedState = false;
        options.onError?.(e);
      };

      this.audioElement = audio;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Playback error / autoplay blocked:', err);
          options.onError?.(err);
        });
      }
    } catch (err) {
      options.onError?.(err);
    }
  }

  private speakWithSpeechSynthesis(
    text: string,
    voice: SpeechSynthesisVoice,
    options: {
      rate?: number;
      pitch?: number;
      volume?: number;
      onStart?: () => void;
      onEnd?: () => void;
      onPause?: () => void;
      onResume?: () => void;
      onError?: (err: unknown) => void;
      onWord?: (charIndex: number, charLength: number) => void;
    }
  ) {
    if (!this.synth) return;

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice;
      utterance.lang = 'vi-VN';
      utterance.rate = options.rate ?? 0.88;
      utterance.pitch = options.pitch ?? 1.05;
      utterance.volume = options.volume ?? 1;

      utterance.onstart = () => {
        this.isSpeakingState = true;
        this.isPausedState = false;
        options.onStart?.();
      };

      utterance.onend = () => {
        this.isSpeakingState = false;
        this.isPausedState = false;
        this.currentUtterance = null;
        options.onEnd?.();
      };

      utterance.onerror = (e) => {
        this.isSpeakingState = false;
        this.isPausedState = false;
        this.currentUtterance = null;
        options.onError?.(e);
      };

      utterance.onpause = () => {
        this.isPausedState = true;
        options.onPause?.();
      };

      utterance.onresume = () => {
        this.isPausedState = false;
        options.onResume?.();
      };

      utterance.onboundary = (e) => {
        if (e.name === 'word') {
          options.onWord?.(e.charIndex, (e as unknown as { charLength?: number }).charLength || 5);
        }
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch (err) {
      options.onError?.(err);
    }
  }

  pause() {
    if (this.currentMode === 'audio' && this.audioElement && !this.audioElement.paused) {
      this.audioElement.pause();
      this.isPausedState = true;
    } else if (this.currentMode === 'speechSynthesis' && this.synth && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.isPausedState = true;
    }
  }

  resume() {
    if (this.currentMode === 'audio' && this.audioElement && this.audioElement.paused) {
      this.audioElement.play().catch(() => {});
      this.isPausedState = false;
    } else if (this.currentMode === 'speechSynthesis' && this.synth && this.synth.paused) {
      this.synth.resume();
      this.isPausedState = false;
    }
  }

  stop() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.audioElement = null;
    }
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
    this.isSpeakingState = false;
    this.isPausedState = false;
  }

  isSpeaking() {
    if (this.currentMode === 'audio' && this.audioElement) {
      return !this.audioElement.paused && !this.audioElement.ended;
    }
    return this.synth ? this.synth.speaking : false;
  }

  isPaused() {
    return this.isPausedState;
  }

  getCurrentText() {
    return this.currentText;
  }
}

export const speechStoryteller = new SpeechStoryteller();
