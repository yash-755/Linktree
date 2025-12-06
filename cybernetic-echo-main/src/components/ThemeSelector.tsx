import { useState, useRef, useEffect } from 'react';
import { Headphones, Music, Circle, Palette } from 'lucide-react';
import { useTheme, ThemeType } from './ThemeContext';

// Define available themes with their labels and icons
const themes: { id: ThemeType; label: string; icon: React.ReactNode }[] = [
  { id: 'vibe', label: 'Vibe With Beats', icon: <Headphones className="w-5 h-5" /> },
  { id: 'classical', label: 'Classical Music', icon: <Music className="w-5 h-5" /> },
  { id: 'none', label: 'None', icon: <Circle className="w-5 h-5" /> },
];

/**
 * ThemeSelector Component
 * 
 * A floating button that opens a dropdown menu to select the application theme.
 * Handles:
 * - Toggling the dropdown visibility
 * - Closing the dropdown when clicking outside
 * - Updating the global theme context
 */
const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Effect to close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed top-6 right-6 z-50" ref={dropdownRef}>
      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full glass-effect neon-button flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Select theme"
      >
        <Palette className="w-5 h-5 text-primary" />
      </button>

      {/* Theme Selection Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-3 right-0 min-w-[180px] glass-effect rounded-2xl overflow-hidden animate-fade-in border border-primary/20 shadow-lg shadow-primary/10">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-200 hover:bg-primary/10 ${theme === t.id
                  ? 'text-primary bg-primary/5'
                  : 'text-foreground/80 hover:text-foreground'
                }`}
            >
              <span className={theme === t.id ? 'text-primary' : 'text-muted-foreground'}>
                {t.icon}
              </span>
              <span className="text-sm font-medium">{t.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
