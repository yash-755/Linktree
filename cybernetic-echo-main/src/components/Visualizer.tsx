import { useTheme } from "./ThemeContext";
import { useEffect, useRef } from "react";

/**
 * Visualizer Component
 *
 * Handles background music for themes:
 *  - "vibe" → beat.mp3
 *  - "classical" → classical.mp3
 *  - "none" or muted → no music
 */

const Visualizer = () => {
  const { theme, isMuted } = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // If muted OR theme = none → stop all audio
    if (isMuted || theme === "none") {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      return;
    }

    // Stop previously playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Choose correct music file
    const musicFile =
      theme === "classical"
        ? "/music/classical.mp3"
        : "/music/beat.mp3";

    const audio = new Audio(musicFile);
    audio.loop = true;      // Continuous looping music
    audio.volume = 0.7;     // Adjust volume

    audio.play().catch(() => {
      console.log("Autoplay blocked by browser.");
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, [theme, isMuted]);

  // Do not render equalizer if nothing should play
  if (isMuted || theme === "none") return null;

  // 🔥 IMPORTANT:
  // Below this line (line 55 onwards) your original visualizer animation continues!

  // Renders the digital bar equalizer for the 'vibe' theme
  const renderVibeVisualizer = () => {
    // Increased bar count to ensure full coverage on large screens (4k)
    // 200 bars * approx 9px per bar = ~1800px. Using 400 to be safe.
    const barCount = 400;
    const bars = Array.from({ length: barCount }, (_, i) => ({
      id: i,
      animDuration: 0.25 + (i % 8) * 0.06,
      animDelay: (i % 12) * 0.025,
    }));

    const BarGroup = ({ keyPrefix }: { keyPrefix: string }) => (
      <div className="flex items-end gap-[2px] md:gap-[3px] h-full flex-shrink-0">
        {bars.map((bar) => (
          <div
            key={`${keyPrefix}-${bar.id}`}
            className="w-1 md:w-1.5 bg-gradient-to-t from-neon-cyan via-neon-purple to-neon-pink rounded-full origin-bottom will-change-transform"
            style={{
              height: '100%',
              animation: `equalizer ${bar.animDuration}s ease-in-out infinite`,
              animationDelay: `${bar.animDelay}s`,
            }}
          />
        ))}
      </div>
    );

    return (
      <div className="relative w-full h-full overflow-hidden">
        {/* Inject animation keyframes locally to ensure they exist and work correctly */}
        <style>
          {`
            @keyframes seamless-loop {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}
        </style>

        {/* Dual-layer seamless scroll container */}
        <div
          className="absolute inset-0 flex will-change-transform"
          style={{
            width: 'fit-content',
            animation: 'seamless-loop 60s linear infinite', // Slower duration for smoother flow with more bars
          }}
        >
          {/* Layer A */}
          <BarGroup keyPrefix="a" />
          {/* Layer B - identical duplicate for seamless loop */}
          <BarGroup keyPrefix="b" />
        </div>
      </div>
    );
  };

  // Renders the smooth sine wave for the 'classical' theme
  const renderClassicalVisualizer = () => {
    const points = Array.from({ length: 60 }, (_, i) => i);
    return (
      <svg className="w-full h-full" viewBox="0 0 600 40" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(30 80% 55% / 0.3)" />
            <stop offset="50%" stopColor="hsl(30 80% 55% / 0.8)" />
            <stop offset="100%" stopColor="hsl(30 80% 55% / 0.3)" />
          </linearGradient>
        </defs>
        <path
          d={`M 0 20 ${points
            .map((i) => {
              const x = (i / points.length) * 600;
              const y = 20 + Math.sin((i / points.length) * Math.PI * 4) * 12;
              return `L ${x} ${y}`;
            })
            .join(' ')}`}
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="2"
          className="animate-pulse"
        >
          <animate
            attributeName="d"
            dur="2s"
            repeatCount="indefinite"
            values={`
              M 0 20 ${points.map((i) => `L ${(i / points.length) * 600} ${20 + Math.sin((i / points.length) * Math.PI * 4) * 12}`).join(' ')};
              M 0 20 ${points.map((i) => `L ${(i / points.length) * 600} ${20 + Math.sin((i / points.length) * Math.PI * 4 + Math.PI) * 12}`).join(' ')};
              M 0 20 ${points.map((i) => `L ${(i / points.length) * 600} ${20 + Math.sin((i / points.length) * Math.PI * 4) * 12}`).join(' ')}
            `}
          />
        </path>
      </svg>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 md:h-12 z-40 bg-gradient-to-t from-background/80 to-transparent backdrop-blur-sm">
      <div className="h-full w-full">
        {theme === 'vibe' && renderVibeVisualizer()}
        {theme === 'classical' && renderClassicalVisualizer()}
      </div>
    </div>
  );
};

export default Visualizer;
