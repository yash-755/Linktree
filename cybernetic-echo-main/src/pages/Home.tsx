import { ThemeProvider } from '@/components/ThemeContext';
import BackgroundLayer from '@/components/BackgroundLayer';
import MusicButton from '@/components/MusicButton';
import ThemeSelector from '@/components/ThemeSelector';
import ProfileName from '@/components/ProfileName';
import LinksGrid from '@/components/LinksGrid';
import Visualizer from '@/components/Visualizer';

/**
 * Home Page Component
 * 
 * This is the main landing page of the application.
 * It orchestrates the visual elements including:
 * - Background animations
 * - Theme switching
 * - Music player control
 * - Profile information
 * - Links grid
 * - Audio visualizer
 */
const Home = () => {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen w-full overflow-hidden flex flex-col">
        <BackgroundLayer />

        {/* Top Controls: Music & Theme */}
        <MusicButton />
        <ThemeSelector />

        {/* Main Content Area */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-20">
          <ProfileName />
          <LinksGrid />
        </main>

        {/* Audio Visualizer Overlay */}
        <Visualizer />
      </div>
    </ThemeProvider>
  );
};

export default Home;
