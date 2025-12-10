import { Volume2, VolumeX } from 'lucide-react';
import { useTheme } from './ThemeContext';

/**
 * MusicButton Component
 * 
 * A floating toggle button for the audio visualizer.
 * Controls the global 'isMuted' state.
 * Shows a pulsing animation when music is active.
 */
const MusicButton = () => {
  const { isMuted, setIsMuted } = useTheme();

  return (
    <button
      onClick={() => setIsMuted(!isMuted)}
      className="fixed top-6 left-6 z-50 w-12 h-12 rounded-full glass-effect flex items-center justify-center neon-button group"
      aria-label={isMuted ? 'Unmute' : 'Mute'}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      ) : (
        <Volume2 className="w-5 h-5 text-primary animate-pulse" />
      )}
    </button>
  );
};

export default MusicButton;
