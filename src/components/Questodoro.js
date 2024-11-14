
import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;
const VICTORY_SOUND_URL = "https://asset.cloudinary.com/dk9mn4cvz/bb608d26e95cb46b6dd8b9040fde2ec5";

const INTRO_MESSAGE = "🏰 Deep within the Eternal Tower, the Distraction Dragon holds many princesses captive in its chambers of time. ⏳ Every 25 minutes, the dragon's power wavers, creating a chance to rescue them one by one! 👑 With each focused quest, another princess is freed - followed by a 5-minute rest to restore your powers. ⚔️ Build your legend as the realm's greatest hero, rescuing princesses through the power of unwavering focus! 🌟 Your first quest awaits...";

const JOURNEY_VARIATIONS = [
  {
    progress: [
      "🌲 You enter the Mystic Forest, your focus sharp as a blade, ready to begin your quest...",
      "🦊 Forest spirits gather to witness your advance, sensing your growing determination...",
      "🌿 Ancient trees bow before your deepening concentration, clearing the path ahead...",
      "💫 The forest canopy glows with your gathered power, the tower now in sight...",
      "✨ The final clearing lies ahead, your focus at its peak!"
    ],
    victory: "🎉 Victory! Your unwavering focus has conquered the Forest Path! The princess is freed from the woodland tower! Rest now, brave hero... 🌟",
    rest: "🍃 You rest beneath the ancient trees, their magic restoring your powers..."
  },
  {
    progress: [
      "⛰️ You begin your ascent of the Peaks of Perseverance, determination in every step...",
      "🦅 Mountain eagles soar beside you, inspired by your focused climb...",
      "❄️ The thin air only strengthens your resolve as you scale higher...",
      "🌟 Summit winds carry whispers of victory as you near your goal...",
      "🏔️ The tower's spire pierces the clouds just ahead!"
    ],
    victory: "🎊 Triumph! You've conquered the Mountain Peak! The princess is rescued from the summit tower! Take your well-earned rest... ⛰️",
    rest: "🌄 You rest at the summit shrine, mountain winds restoring your strength..."
  },
  {
    progress: [
      "💎 You descend into the Focus Caverns, crystalline walls lighting your way...",
      "✨ Ancient crystals pulse in rhythm with your growing concentration...",
      "🔮 Your focused energy illuminates deeper passages ahead...",
      "💫 Crystal resonance guides you closer to your goal...",
      "🌟 The hidden tower chamber lies just beyond this crystal arch!"
    ],
    victory: "💫 Radiant victory! The Crystal Cave's princess is free! Your focus has shattered the dragon's spell! Rest in the crystal light... 💎",
    rest: "✨ Crystal energies swirl around you, replenishing your magical focus..."
  },
  {
    progress: [
      "⚡ You brave the Storm Keep's thundering halls, your focus cutting through chaos...",
      "🌩️ Lightning dances around you, responding to your concentrated power...",
      "🌪️ The storm's fury yields to your unwavering determination...",
      "⚔️ Electric energy surges with each focused step toward your goal...",
      "🏰 The storm parts before you, revealing the princess's chamber!"
    ],
    victory: "⚡ Electrifying triumph! The Storm Keep's princess breaks free! The tempest subsides with your victory! Rest amid calm skies... 🌩️",
    rest: "🌅 Peaceful skies shelter you as storm energies restore your power..."
  },
  {
    progress: [
      "📚 You enter the Timeless Library, where focus itself is sacred lore...",
      "🔮 Ancient tomes float around you, drawn to your concentrated mind...",
      "📜 Magical scrolls unfurl, marking your focused passage...",
      "✨ The library's wisdom merges with your determined spirit...",
      "🏛️ The princess's sealed archives lie within reach!"
    ],
    victory: "🎊 Scholarly triumph! The Library's princess is freed from her papyrus prison! Knowledge and victory are yours! Rest among the tomes... 📚",
    rest: "📖 Ancient wisdom flows through you, renewing your magical focus..."
  }
];

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};


const IntroModal = ({ onStartGame }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDone, setIsDone] = useState(false);
    const [isSkipped, setIsSkipped] = useState(false);
  
    const playStartSound = () => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.2, audioContext.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.3);
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.start(audioContext.currentTime + i * 0.1);
        osc.stop(audioContext.currentTime + i * 0.1 + 0.3);
      });
    };
  
    const skipTyping = () => {
      setIsSkipped(true);
      setDisplayedText(INTRO_MESSAGE);
      setIsDone(true);
    };
  
    const typeText = useCallback(() => {
      if (isSkipped) return;
      let charIndex = 0;
  
      const intervalId = setInterval(() => {
        if (charIndex <= INTRO_MESSAGE.length) {
          setDisplayedText(INTRO_MESSAGE.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(intervalId);
          setIsDone(true);
        }
      }, 50);
  
      return () => clearInterval(intervalId);
    }, [isSkipped]);
  
    useEffect(() => {
      const timer = typeText();
      return () => timer;
    }, [typeText]);
  
    const handleStart = () => {
      playStartSound();
      setTimeout(() => onStartGame(), 800);
    };
  
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4 sm:p-6">
        <div 
          className="relative max-w-2xl w-full mx-4"
          onClick={!isDone ? skipTyping : undefined}
        >
          <div className="absolute inset-0 border-4 border-indigo-500/30" />
          <div className="absolute inset-2 border-2 border-indigo-500/20" />
          
          <div className="bg-black p-6 sm:p-8 m-4 relative">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-500/50 -translate-x-1 -translate-y-1" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-indigo-500/50 translate-x-1 -translate-y-1" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-indigo-500/50 -translate-x-1 translate-y-1" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-500/50 translate-x-1 translate-y-1" />
            
            <div className="min-h-[200px] flex flex-col justify-between">
              <div className="text-base sm:text-lg text-indigo-200 leading-relaxed">
                {displayedText}
                <span className="animate-pulse">▊</span>
              </div>
              
              {isDone && (
                <div className="flex justify-center mt-6 sm:mt-8">
                  <button
                    onClick={handleStart}
                    className="px-6 sm:px-8 py-3 bg-indigo-900/50 border-2 border-indigo-500/30 text-indigo-100 hover:bg-indigo-800/50 transition-all transform hover:scale-105 text-lg sm:text-xl relative overflow-hidden"
                    style={{
                      textShadow: '0 0 10px rgba(129, 140, 248, 0.5)',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent animate-[shine_2s_infinite_linear]" />
                    Begin Quest
                  </button>
                </div>
              )}
  
              {!isDone && (
                <div className="absolute bottom-2 right-2 text-xs text-indigo-400 opacity-50">
                  Click anywhere to skip
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const selectRandomJourney = () => JOURNEY_VARIATIONS[Math.floor(Math.random() * JOURNEY_VARIATIONS.length)];

  const playQuestSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    [440, 523.25, 659.25].forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.15);
      gain.gain.setValueAtTime(0.15, audioContext.currentTime + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.15 + 0.3);
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.start(audioContext.currentTime + i * 0.15);
      osc.stop(audioContext.currentTime + i * 0.15 + 0.3);
    });
  };
  
  const Questodoro = () => {
    const [showIntro, setShowIntro] = useState(true);
    const [timeLeft, setTimeLeft] = useState(WORK_TIME);
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [message, setMessage] = useState('');
    const [questCount, setQuestCount] = useState(0);
    const [currentJourney, setCurrentJourney] = useState(selectRandomJourney());
    const [progressIndex, setProgressIndex] = useState(0);
  
    // Timer effect with journey progress (no sound here)
    useEffect(() => {
      let interval;
      if (isRunning && timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft(prev => {
            const newTime = prev - 1;
            // Update journey progress every 5 minutes (300 seconds) without sound
            if (!isBreak && newTime > 0 && (WORK_TIME - newTime) % 300 === 0) {
              const newIndex = Math.floor((WORK_TIME - newTime) / 300);
              if (newIndex < currentJourney.progress.length) {
                setProgressIndex(newIndex);
                setMessage(currentJourney.progress[newIndex]);
              }
            }
            return newTime;
          });
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [isRunning, currentJourney, isBreak]);
  
    // Session completion effect with sounds
    useEffect(() => {
      if (timeLeft === 0) {
        if (!isBreak) {
          // Play victory sound at end of 25-min session
          const audio = new Audio(VICTORY_SOUND_URL);
          audio.play().catch(error => console.log('Audio playback failed:', error));
          setMessage(currentJourney.victory);
          setQuestCount(prev => prev + 1);
          setTimeLeft(BREAK_TIME);
          setIsBreak(true);
        } else {
          // Play quest sound at end of break
          playQuestSound();
          setMessage(currentJourney.rest);
          setTimeLeft(WORK_TIME);
          setIsBreak(false);
          setCurrentJourney(selectRandomJourney());
          setProgressIndex(0);
        }
        setIsRunning(false);
      }
    }, [timeLeft, isBreak, currentJourney]);
  
    // Handle timer start/stop with sound only at start of 25-min session
    const handleTimerToggle = () => {
      if (!isRunning) {
        if (!isBreak) {
          playQuestSound(); // Only play sound when starting a 25-min session
        }
        setMessage(currentJourney.progress[progressIndex]);
      } else {
        setMessage("🐉 The dragon's dark magic interrupts your quest!");
      }
      setIsRunning(!isRunning);
    };
  
    const resetTimer = () => {
      setTimeLeft(WORK_TIME);
      setIsRunning(false);
      setIsBreak(false);
      setMessage("✨ The sands of time reverse. Your quest begins anew! ⚔️");
      setCurrentJourney(selectRandomJourney());
      setProgressIndex(0);
    };
  
    if (showIntro) {
      return <IntroModal onStartGame={() => setShowIntro(false)} />;
    }
  
    return (
      <div className="min-h-screen bg-black text-gray-100">
        <div className="relative min-h-screen flex flex-col p-4 sm:p-6">
          <header className="py-3 sm:py-4 px-4 sm:px-6 bg-black rounded-lg border border-indigo-900/30 mb-4 sm:mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide"
                  style={{
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                    letterSpacing: '0.05em'
                  }}>
                Questodoro
              </h1>
              <div className="text-sm sm:text-base bg-black px-3 py-1 sm:px-4 sm:py-2 rounded-md border border-indigo-900/30">
                <span className="text-indigo-300">Quests:</span>{' '}
                <span className="text-indigo-100">{questCount} 🏆</span>
              </div>
            </div>
          </header>
  
          <main className="flex-1 flex flex-col items-center justify-center gap-6 sm:gap-8 p-4 sm:p-6 bg-black rounded-lg border border-indigo-900/30">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full" />
              <div className="relative bg-black px-8 sm:px-12 py-6 sm:py-8 rounded-xl border border-indigo-900/30">
                <div className="text-5xl sm:text-7xl font-bold text-indigo-100 mb-2" style={{
                  textShadow: '0 0 30px rgba(129, 140, 248, 0.3)'
                }}>
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm sm:text-base text-indigo-300 text-center">
                  {isBreak ? "REST PERIOD" : "QUEST TIME"} • {isRunning ? "ACTIVE" : "PAUSED"}
                </div>
              </div>
            </div>
  
            <div className="w-full max-w-2xl bg-black p-4 sm:p-6 rounded-xl border border-indigo-900/30">
              <p className="text-base sm:text-lg text-indigo-100 text-center min-h-[48px] sm:min-h-[60px] flex items-center justify-center">
                {message || "Your quest awaits, brave hero... ⚔️"}
              </p>
            </div>
  
            <div className="flex gap-4 sm:gap-6">
              <button
                onClick={handleTimerToggle}
                className={`p-4 sm:px-8 sm:py-4 rounded-xl transition-all ${
                  isRunning 
                    ? 'bg-black border-rose-900/50 text-rose-300' 
                    : 'bg-black border-emerald-900/50 text-emerald-300'
                } border hover:bg-black/50`}
              >
                {isRunning ? 
                  <Pause size={20} className="sm:w-6 sm:h-6" /> : 
                  <Play size={20} className="sm:w-6 sm:h-6" />
                }
              </button>
              <button
                onClick={resetTimer}
                className="p-4 sm:px-8 sm:py-4 rounded-xl bg-black border border-indigo-900/50 text-indigo-300 transition-all hover:bg-black/50"
              >
                <RefreshCw size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
          </main>
  
          <footer className="mt-4 sm:mt-6 bg-black p-3 sm:p-4 rounded-lg border border-indigo-900/30">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-xs sm:text-sm text-indigo-300">
              <div className="flex gap-4 sm:gap-8">
                <div>MODE: {isBreak ? "REST 🌟" : "QUEST ⚔️"}</div>
                <div>LEVEL: {Math.floor(questCount / 4) + 1} 📈</div>
              </div>
              <div className="flex gap-4 sm:gap-8 items-center">
                <div>PROGRESS: {Math.floor((1 - timeLeft / (isBreak ? BREAK_TIME : WORK_TIME)) * 100)}% ✨</div>
                <div>
                  by{' '}
                  <a 
                    href="https://www.linkedin.com/in/mariana-oka/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-bold text-indigo-300 hover:text-indigo-100 transition-colors"
                  >
                    mariana
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  };
  
  export default Questodoro;