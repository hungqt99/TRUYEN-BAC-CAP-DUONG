/**
 * Web Audio API synthesizer for preschool friendly sounds and ambient melody.
 * Works completely in-browser without external mp3 files.
 */

class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private bgGain: GainNode | null = null;
  private isBgPlaying = false;
  private bgTimer: number | null = null;
  private currentStep = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft nursery bell chime when switching scenes or clicking items
  playChime(noteFreq = 523.25) { // C5 default
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(noteFreq * 1.5, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.8);
    } catch {
      // Audio error suppressed
    }
  }

  // Celebratory reward fanfare for preschool quiz
  playSuccessFanfare() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const time = this.ctx!.currentTime + i * 0.12;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.15, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(time);
        osc.stop(time + 0.5);
      });
    } catch {
      // Audio error suppressed
    }
  }

  // Gentle bubbling sound for cooking pot
  playCookingBubble() {
    try {
      this.initContext();
      if (!this.ctx) return;
      for (let i = 0; i < 3; i++) {
        const time = this.ctx.currentTime + i * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(300 + Math.random() * 200, time);
        osc.frequency.exponentialRampToValueAtTime(600 + Math.random() * 300, time + 0.1);

        gain.gain.setValueAtTime(0.08, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + 0.12);
      }
    } catch {
      // Audio error suppressed
    }
  }

  // Soothing background lullaby chord progression
  startBackgroundMusic(volume = 0.08) {
    if (this.isBgPlaying) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      this.bgGain = this.ctx.createGain();
      this.bgGain.gain.setValueAtTime(volume, this.ctx.currentTime);
      this.bgGain.connect(this.ctx.destination);

      this.isBgPlaying = true;
      this.currentStep = 0;

      // Pentatonic warm soothing lullaby sequence: F4, A4, C5, D5, G4, C5
      const chordSequence = [
        [349.23, 440.00, 523.25], // F major
        [392.00, 493.88, 587.33], // G major
        [329.63, 392.00, 493.88], // E minor
        [440.00, 523.25, 659.25], // A minor
        [349.23, 440.00, 523.25], // F major
        [261.63, 329.63, 392.00], // C major
      ];

      const playChord = () => {
        if (!this.isBgPlaying || !this.ctx || !this.bgGain) return;
        const chord = chordSequence[this.currentStep % chordSequence.length];
        this.currentStep++;

        chord.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const chordGain = this.ctx!.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.1);

          chordGain.gain.setValueAtTime(0.001, this.ctx!.currentTime);
          chordGain.gain.linearRampToValueAtTime(0.03, this.ctx!.currentTime + 0.5);
          chordGain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 2.8);

          osc.connect(chordGain);
          chordGain.connect(this.bgGain!);

          osc.start(this.ctx!.currentTime + idx * 0.1);
          osc.stop(this.ctx!.currentTime + 3.0);
        });

        this.bgTimer = window.setTimeout(playChord, 3200);
      };

      playChord();
    } catch {
      this.isBgPlaying = false;
    }
  }

  setBackgroundVolume(vol: number) {
    if (this.bgGain && this.ctx) {
      this.bgGain.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime);
    }
  }

  stopBackgroundMusic() {
    this.isBgPlaying = false;
    if (this.bgTimer) {
      clearTimeout(this.bgTimer);
      this.bgTimer = null;
    }
    if (this.bgGain && this.ctx) {
      try {
        this.bgGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
      } catch {
        // Ignored
      }
    }
  }
}

export const soundFx = new SoundEffectsManager();
