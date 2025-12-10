import { useTheme } from './ThemeContext';
import vibeBackground from '@/assets/vibe-background.jpg';
import classicalBackground from '@/assets/classical-background.jpg';

/**
 * BackgroundLayer Component
 * 
 * Manages the dynamic background of the application based on the selected theme.
 * It handles:
 * 1. The main background image/color
 * 2. An overlay for better text contrast
 * 3. Ambient glow effects specific to each theme
 */
const BackgroundLayer = () => {
  const { theme } = useTheme();

  // Determine the background style (image or gradient) based on current theme
  const getBackgroundStyle = () => {
    switch (theme) {
      case 'vibe':
        return {
          backgroundImage: `url(${vibeBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        };
      case 'classical':
        return {
          backgroundImage: `url(${classicalBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      case 'none':
        return {
          background: 'linear-gradient(180deg, hsl(220 20% 6%) 0%, hsl(220 25% 3%) 100%)',
        };
      default:
        return {};
    }
  };

  // Determine the overlay gradient to ensure content readability
  const getOverlay = () => {
    switch (theme) {
      case 'vibe':
        return 'bg-gradient-to-b from-background/40 via-background/60 to-background/90';
      case 'classical':
        return 'bg-gradient-to-b from-background/50 via-background/70 to-background/95';
      case 'none':
        return '';
      default:
        return '';
    }
  };

  return (
    <>
      {/* Main Background Layer */}
      <div
        className="fixed inset-0 transition-all duration-700"
        style={getBackgroundStyle()}
      />

      {/* Overlay Layer for Contrast */}
      <div className={`fixed inset-0 ${getOverlay()} transition-all duration-700`} />

      {/* Theme-specific Ambient Glow Effects */}
      {theme === 'vibe' && (
        <>
          <div className="fixed top-0 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px] animate-pulse" />
          <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-neon-purple/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </>
      )}
      {theme === 'classical' && (
        <>
          <div className="fixed top-1/4 right-1/3 w-72 h-72 bg-amber-500/5 rounded-full blur-[100px] animate-pulse" />
          <div className="fixed bottom-1/3 left-1/4 w-64 h-64 bg-orange-400/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        </>
      )}
      {theme === 'none' && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-muted/5 rounded-full blur-[150px]" />
      )}
    </>
  );
};

export default BackgroundLayer;
