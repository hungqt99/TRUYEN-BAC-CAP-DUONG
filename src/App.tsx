import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SCENES, QUIZ_QUESTIONS, STORY_TITLE } from './data/storyData';
import { VoiceSettings } from './types/story';
import { speechStoryteller, VoiceOption } from './utils/speechHelper';
import { soundFx } from './utils/audioSynthesis';
import { StoryStage } from './components/StoryStage';
import { TeacherControlBar } from './components/TeacherControlBar';
import { Scene9Quiz } from './components/Scene9Quiz';
import { StartScreen } from './components/StartScreen';
import { EndScreen } from './components/EndScreen';
import { CharacterGuideModal } from './components/CharacterGuideModal';
import {
  BookOpen,
  Volume2,
  Users,
  Tv,
  MessageCircleQuestion,
  Sparkles,
  Maximize2,
  Minimize2
} from 'lucide-react';

export default function App() {
  // Navigation & Screen View State
  const [appState, setAppState] = useState<'start' | 'story' | 'end'>('start');
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isQuizModeInScene9, setIsQuizModeInScene9] = useState(false);
  const [isCharacterGuideOpen, setIsCharacterGuideOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Speech State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [availableVoices, setAvailableVoices] = useState<VoiceOption[]>([]);
  const [hasViVoice, setHasViVoice] = useState(true);

  // Voice & Playback Settings
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    selectedVoiceURI: '',
    rate: 0.88,
    pitch: 1.05,
    volume: 1,
    bgMusicEnabled: false,
    bgMusicVolume: 0.06,
    autoPlayNext: true,
  });

  const appContainerRef = useRef<HTMLDivElement>(null);
  const currentScene = SCENES[currentSceneIndex];

  // Initialize available voices and preload scene audio on mount
  useEffect(() => {
    // Preload audio for all 10 story scenes for zero latency
    SCENES.forEach((scene) => {
      speechStoryteller.preloadText(scene.narrationText);
    });

    speechStoryteller.getAvailableVoices().then((voices) => {
      setAvailableVoices(voices);
      const viVoice = voices.find((v) => v.isVietnamese);
      setHasViVoice(!!viVoice);

      if (viVoice && !voiceSettings.selectedVoiceURI) {
        setVoiceSettings((prev) => ({
          ...prev,
          selectedVoiceURI: viVoice.voice.voiceURI,
        }));
      }
    });

    return () => {
      speechStoryteller.stop();
      soundFx.stopBackgroundMusic();
    };
  }, []);

  // Sync Background Music
  useEffect(() => {
    if (voiceSettings.bgMusicEnabled && appState === 'story') {
      soundFx.startBackgroundMusic(voiceSettings.bgMusicVolume);
    } else {
      soundFx.stopBackgroundMusic();
    }
  }, [voiceSettings.bgMusicEnabled, voiceSettings.bgMusicVolume, appState]);

  // Handle Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      appContainerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Update Settings
  const handleUpdateSettings = (newSettings: Partial<VoiceSettings>) => {
    setVoiceSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Play Speech for Current Scene
  const handlePlayCurrentScene = useCallback((customText?: string) => {
    const textToRead = customText || currentScene.narrationText;

    speechStoryteller.speak(textToRead, {
      voiceURI: voiceSettings.selectedVoiceURI,
      rate: voiceSettings.rate,
      pitch: voiceSettings.pitch,
      volume: voiceSettings.volume,
      useSystemVoice: voiceSettings.useSystemVoice,
      onStart: () => {
        setIsSpeaking(true);
        setIsPaused(false);
      },
      onEnd: () => {
        setIsSpeaking(false);
        setIsPaused(false);

        // Auto Advance if enabled and not currently reading custom text in quiz
        if (voiceSettings.autoPlayNext && !customText) {
          if (currentSceneIndex < SCENES.length - 1) {
            setTimeout(() => {
              setCurrentSceneIndex((prev) => prev + 1);
            }, 1400);
          } else {
            // Reached end of Scene 10
            setTimeout(() => {
              setAppState('end');
              soundFx.playSuccessFanfare();
            }, 2000);
          }
        }
      },
      onPause: () => setIsPaused(true),
      onResume: () => setIsPaused(false),
      onError: () => {
        setIsSpeaking(false);
        setIsPaused(false);
      },
      onWord: (charIdx) => {
        setActiveWordIndex(charIdx);
      },
    });
  }, [currentScene, voiceSettings, currentSceneIndex]);

  // Whenever Scene Changes in story mode: auto-read if autoPlayNext or just stopped (silent transition, no chime)
  useEffect(() => {
    if (appState === 'story') {
      if (voiceSettings.autoPlayNext) {
        const timer = setTimeout(() => {
          handlePlayCurrentScene();
        }, 500);
        return () => clearTimeout(timer);
      } else {
        speechStoryteller.stop();
        setIsSpeaking(false);
        setIsPaused(false);
      }
    }
  }, [currentSceneIndex, appState]);

  // Audio Control Handlers
  const handlePause = () => {
    speechStoryteller.pause();
    setIsPaused(true);
  };

  const handleResume = () => {
    speechStoryteller.resume();
    setIsPaused(false);
  };

  const handleStop = () => {
    speechStoryteller.stop();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const handleReplay = () => {
    speechStoryteller.stop();
    handlePlayCurrentScene();
  };

  // Scene Navigation
  const handlePrevScene = () => {
    if (currentSceneIndex > 0) {
      speechStoryteller.stop();
      setCurrentSceneIndex((prev) => prev - 1);
    }
  };

  const handleNextScene = () => {
    if (currentSceneIndex < SCENES.length - 1) {
      speechStoryteller.stop();
      setCurrentSceneIndex((prev) => prev + 1);
    } else {
      speechStoryteller.stop();
      setAppState('end');
    }
  };

  const handleSelectScene = (sceneId: number) => {
    speechStoryteller.stop();
    setCurrentSceneIndex(sceneId - 1);
  };

  const handleStartStory = () => {
    speechStoryteller.stop();
    setCurrentSceneIndex(0);
    setAppState('story');
  };

  const handleRestartStory = () => {
    speechStoryteller.stop();
    setCurrentSceneIndex(0);
    setAppState('story');
  };

  const handleGoToQuiz = () => {
    speechStoryteller.stop();
    setCurrentSceneIndex(8); // Scene 9 is index 8
    setIsQuizModeInScene9(true);
    setAppState('story');
  };

  return (
    <div
      ref={appContainerRef}
      className="min-h-screen bg-[#FFFDF9] text-slate-800 flex flex-col justify-between selection:bg-amber-200 selection:text-amber-950"
    >
      {/* Top Bar Contract (3 Zones, strictly single row, clean anti-slop) */}
      {!isFullscreen && (
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8 shadow-xs">
          {/* Zone 1: Brand Title */}
          <button
            onClick={() => {
              speechStoryteller.stop();
              setAppState('start');
            }}
            className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-amber-600 transition-colors flex items-center gap-2 cursor-pointer font-['Quicksand']"
          >
            <span className="w-8 h-8 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold text-sm shadow-xs">
              👩‍🍳
            </span>
            <div className="flex flex-col text-left">
              <span className="leading-tight">{STORY_TITLE}</span>
              <span className="text-[10px] text-rose-700 font-bold tracking-tight">MN An Đông · TP. Huế</span>
            </div>
          </button>

          {/* Zone 2: 4 Clean Single-Line Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <button
              onClick={() => {
                speechStoryteller.stop();
                setAppState('start');
              }}
              className={`hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                appState === 'start' ? 'text-amber-600 font-bold underline underline-offset-4' : ''
              }`}
            >
              Mở đầu
            </button>
            <button
              onClick={() => {
                setAppState('story');
                if (currentSceneIndex === 8) setIsQuizModeInScene9(false);
              }}
              className={`hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                appState === 'story' && !isQuizModeInScene9 ? 'text-amber-600 font-bold underline underline-offset-4' : ''
              }`}
            >
              10 Cảnh truyện
            </button>
            <button
              onClick={handleGoToQuiz}
              className={`hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                appState === 'story' && currentSceneIndex === 8 && isQuizModeInScene9
                  ? 'text-amber-600 font-bold underline underline-offset-4'
                  : ''
              }`}
            >
              Đàm thoại lớp học
            </button>
            <button
              onClick={() => setIsCharacterGuideOpen(true)}
              className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Giới thiệu nhân vật
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            {appState === 'start' ? (
              <button
                onClick={handleStartStory}
                className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-amber-500 rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all shadow-sm hover:scale-102 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Kể chuyện ngay
              </button>
            ) : (
              <button
                onClick={toggleFullscreen}
                className="px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-700 bg-amber-100 hover:bg-amber-200 rounded-xl border border-amber-300 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                title="Bật/Tắt chế độ máy chiếu mầm non"
              >
                <Tv className="w-4 h-4 text-amber-800" />
                <span className="hidden sm:inline">Chế độ máy chiếu</span>
              </button>
            )}
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center">
        {/* State 1: Start Screen */}
        {appState === 'start' && (
          <StartScreen
            onStartStory={handleStartStory}
            onOpenCharacterGuide={() => setIsCharacterGuideOpen(true)}
          />
        )}

        {/* State 2: 10 Scenes Story Mode */}
        {appState === 'story' && (
          <div className={`w-full max-w-6xl mx-auto px-3 sm:px-6 py-3 flex-1 flex flex-col justify-center ${isFullscreen ? 'p-0 max-w-none' : ''}`}>
            {/* Story Visual Stage (occupies 65–75% of presentation viewport) */}
            <StoryStage
              scene={currentScene}
              activeWordIndex={activeWordIndex}
              isSpeaking={isSpeaking}
              isFullscreen={isFullscreen}
              onToggleFullscreen={toggleFullscreen}
              onQuickPlay={() => {
                if (isSpeaking) {
                  handlePause();
                } else {
                  handlePlayCurrentScene();
                }
              }}
            />

            {/* Optional Interactive Mode for Scene 9: Only if explicitly clicked */}
            {currentScene.id === 9 && isQuizModeInScene9 && (
              <div className="mt-3">
                <Scene9Quiz
                  onSpeakQuestion={(text) => handlePlayCurrentScene(text)}
                  onConcludeQuiz={() => {
                    setTimeout(() => {
                      setCurrentSceneIndex(9); // Move to Scene 10
                    }, 1200);
                  }}
                />
              </div>
            )}

            {/* Teacher Control Bar Deck */}
            <TeacherControlBar
              currentSceneId={currentScene.id}
              totalScenes={SCENES.length}
              isSpeaking={isSpeaking}
              isPaused={isPaused}
              hasVietnameseVoice={hasViVoice}
              voices={availableVoices}
              voiceSettings={voiceSettings}
              onUpdateSettings={handleUpdateSettings}
              onPlaySpeech={() => handlePlayCurrentScene()}
              onPauseSpeech={handlePause}
              onResumeSpeech={handleResume}
              onReplaySpeech={handleReplay}
              onStopSpeech={handleStop}
              onPrevScene={handlePrevScene}
              onNextScene={handleNextScene}
              onSelectScene={handleSelectScene}
            />
          </div>
        )}

        {/* State 3: End Screen */}
        {appState === 'end' && (
          <EndScreen
            onRestartStory={handleRestartStory}
            onGoToQuiz={handleGoToQuiz}
          />
        )}
      </main>

      {/* Footer */}
      {!isFullscreen && (
        <footer className="border-t border-amber-200/60 bg-white/70 py-3.5 px-6 text-center text-xs text-slate-500 select-none">
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <span className="font-semibold text-slate-700">Trường Mầm Non An Đông – Thành Phố Huế</span>
            <span className="font-semibold text-rose-600">
              Bé biết yêu thương – Bé biết kính trọng – Bé biết ơn
            </span>
            <span>Chuyện kể mầm non</span>
          </div>
        </footer>
      )}

      {/* Unified Character Design Modal */}
      <CharacterGuideModal
        isOpen={isCharacterGuideOpen}
        onClose={() => setIsCharacterGuideOpen(false)}
      />
    </div>
  );
}
